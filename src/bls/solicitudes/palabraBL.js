const config = require('konfig')();
const util = require('./../../lib/util');
const  SpanishStemmer = require('snowball-stemmer.jsx/dest/spanish-stemmer.common.js').SpanishStemmer;
const stemmer = new SpanishStemmer();

const palabraUnica = (nombreEmpresa, conectores, sequelize, unicas) => {
  return new Promise((resolve, reject) => {
    nombreEmpresa = util.convierteMinuscula(util.eliminaEspaciosExtremos(util.eliminaDobleEspacio(util.eliminaAcentos(util.eliminarCaracteresEspeciales(nombreEmpresa)))));
    if (nombreEmpresa == '')  resolve(true);
    
    const sql = `select conectoras('${nombreEmpresa}')`;
    sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })
      .then(respuesta => {
        if (!respuesta[0]) {
          throw new Error("No se obtuvieron respuestas ");
        }
        const nombreArray = respuesta[0].conectoras.trim().split(' ');
        const buscarUnicos = [];

        nombreArray.reduce((previus, current, index, array) => {
          return previus
            .then(() => {
              return asyncUnicas(nombreArray[index], unicas);
            });
        }, Promise.resolve());

        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
};


const asyncUnicas = (palabra, unicas) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      unicas.findOrCreate({where: {palabra}, defaults: {_usuario_creacion: 1, _usuario_modificacion: 1, cantidad : 1}})
        .spread((unica, created) => {
          if (created == false) {
            unicas.update({
              cantidad: unica.get().cantidad + 1
            },{
              where: {
                id_unicas: unica.get().id_unicas
              }
            })
              .then(respuesta => {
                resolve(true);
              })
              .catch(error => reject(error));
          }
        });
    }, 3000);
  });
};

const lematizarTabla = (modelo) => {
  return new Promise((resolve, reject) => {
    modelo.findAll({where: {estado: 'ACTIVO'}})    
      .then(respuesta => {
        if(!respuesta) throw new Error("No se encontraron resultados");
        for(var i = 0; i < respuesta.length; i++) {
          modelo.update({
            palabra_raiz: lematizacion(respuesta[i].palabra)
          }, {
            where:{
              // id_genericas: respuesta[i].id_genericas
              // id_excluidas: respuesta[i].id_excluidas
              id_sinonimos: respuesta[i].id_sinonimos

            }
          })
            .then(lematizado => {
              if (lematizado > 0) {
                console.log("actualizado");
              } else {
                reject("Ocurrio un error al actualizar");
              }
            });
        }
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
};


const lematizacion = (palabra) => {
  return stemmer.stemWord(palabra);  
};


module.exports = {
  palabraUnica,
  lematizarTabla,
  lematizacion
};

