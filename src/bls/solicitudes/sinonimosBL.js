const util = require('../../lib/util');
const fs = require('fs');


const guardarSinonimos = (sinonimos, sequelize) => {
  return new Promise ((resolve, reject) => {
    sinonimos.findAll()
      .then(respuesta => {
        const resultado = respuesta;
        if (respuesta) {
          const rutaArchivo = `${__dirname}/../../../sinonimos.txt`;
          vaciaArchivo(rutaArchivo).then(() => {
          }).then(async () => {
            for(var i = 0; i < respuesta.length; i++) {
              if (respuesta[i].estado == "ACTIVO") {
                let nuevaCadena = respuesta[i].sinonimos.split('|');
                let cadenaSinonimo = '';
                let cadenaSinConectores = '';
                for(var j = 0; j < nuevaCadena.length; j++) {
                  cadenaSinConectores = await limpiarConectoras(sequelize, nuevaCadena[j].trim());
                  if (j == (nuevaCadena.length -1)) {
                    if (cadenaSinConectores != '') {
                      cadenaSinonimo = `${cadenaSinonimo}${cadenaSinConectores.trim()}`;
                    }
                  }
                  else {
                    if (cadenaSinConectores != '') {                    
                      cadenaSinonimo = `${cadenaSinonimo}${cadenaSinConectores},`;
                    }
                  }
                }
                const palabra = await limpiarConectoras(sequelize, respuesta[i].palabra);
                if (palabra.trim() != '' && cadenaSinonimo.trim() != '') {
                  cadenaSinonimo = cadenaSinonimo.charAt(cadenaSinonimo.length-1) == ','? cadenaSinonimo.substr(0, cadenaSinonimo.length-1) : cadenaSinonimo;
                  let dato = `${util.eliminaAcentos(respuesta[i].palabra)} => ${util.eliminaAcentos(cadenaSinonimo)}\n`;
                  // let dato = `INSERT INTO sinonimos (palabra, sinonimos, estado, _fecha_creacion, _fecha_modificacion) VALUES ('${util.eliminaAcentos(respuesta[i].palabra)}','${util.eliminaAcentos(cadenaSinonimo)}', 'ACTIVO', 'now()', 'now()'); \n`;
                  fs.appendFile(rutaArchivo, dato, (err) => {
                    if (err) throw err;
                  });
                }
              }
            }
            if (i == respuesta.length) {
              resolve(respuesta);
            }
          });
        }
      })
      .catch(error => reject(error));
  });
};

const insertarPalabra = (sequelize, palabra, sinonimos) => {
  return new Promise(async (resolve, reject) =>  {
    const rutaArchivo = `${__dirname}/../../../sinonimos.txt`;
    let validado = {};
    try{
      validado = await validarCaracteres(palabra, sinonimos);
    } catch(err) {
      reject(err);
    }
    palabra = validado.palabra;
    sinonimos = validado.sinonimos;
    sinonimos = sinonimos.split(',');
    let palabraSinonimo = '';
    for(var i = 0; i < sinonimos.length; i++) {
      const palabraSinConectores = await limpiarConectoras(sequelize, sinonimos[i].trim());
      if (i == (sinonimos.length -1)) {
        if (palabraSinConectores != '') {
          palabraSinonimo = `${palabraSinonimo}${palabraSinConectores}`;
        }
      } else {
        if (palabraSinConectores != '') {        
          palabraSinonimo = `${palabraSinonimo}${palabraSinConectores},`;
        }
      }
    }
    palabra = await limpiarConectoras(sequelize, palabra);
    if (palabra.trim() != '' && palabraSinonimo.trim() != '') {
      palabraSinonimo = palabraSinonimo.charAt(palabraSinonimo.length-1) == ','? palabraSinonimo.substr(0, palabraSinonimo.length-1) : palabraSinonimo;
      // const dato = `${util.eliminaAcentos(palabra).trim()} => ${util.eliminaAcentos(palabraSinonimo).trim()}\n`;
      const dato = {
        palabra: util.eliminaAcentos(palabra).trim(),
        sinonimos: util.eliminaAcentos(palabraSinonimo).trim()
      };
      resolve(dato);
      // fs.appendFile(rutaArchivo, dato, (err) => {
      //   if (err) throw err;
      //   console.log("Sinonimo Guardado Exitosamente", dato);
      // });
    } else {
      reject('No se puede insertar palabras conectoras');
    }
  });
};

const validarCaracteres = (palabra, sinonimos) => {
  return new Promise((resolve, reject) => {
    const caracteresAdmitidos = /[a-zA-Z0-9&_\.-@?¿\s]+$/g;
    if (!palabra.match(caracteresAdmitidos || !sinonimos.match(caracteresAdmitidos))) {
      reject("No puede usar carácteres especiales.");
    }
    const dato = {
      palabra,
      sinonimos
    };
    resolve(dato);
  });
};

const actualizarArchivo = (Sinonimos) => {
  return new Promise((resolve, reject) => {
    Sinonimos.findAll({where: {estado: 'ACTIVO'}})
      .then(async respuesta => {
        const rutaArchivo = `${__dirname}/../../../sinonimos.txt`;
        await vaciaArchivo(rutaArchivo);
        for(var i = 0; i < respuesta.length; i++) {
          let dato = `${respuesta[i].palabra} => ${respuesta[i].sinonimos}\n`;
          fs.appendFile(rutaArchivo, dato, (err) => {
            if (err) throw err;
          });
        }
        if (i == respuesta.length) resolve(true);
      }).catch(error => reject("No se logró actualizar el archivo de sinonimos"));
  });
};


const vaciaArchivo = (rutaArchivo) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(rutaArchivo, "", (err) => {
      if (err) {
        reject(err);
      }
      console.log("archivo vaciado");
      resolve();
    });
  });
};

async function limpiarConectoras(sequelize, cadena) {
  return new Promise((resolve, reject) => {
    const sql = `select conectoras('${cadena}')`;
    sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT
    })
      .then(respuesta => {
        if(!respuesta[0]) {
          console.log("se limpio toda la palabra xD", respuesta);
        }
        resolve(respuesta[0].conectoras);
      })
      .catch(error => {
        reject(error);
      });
  });
};




module.exports = {
  guardarSinonimos,
  insertarPalabra,
  actualizarArchivo,
  validarCaracteres,
  vaciaArchivo
};
