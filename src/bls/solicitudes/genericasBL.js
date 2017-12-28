const util = require('../../lib/util');
const fs = require('fs');
const sinonimosBL = require('./sinonimosBL');


const actualizarArchivo = (Genericas) =>{
  return new Promise((resolve, reject) => {
    Genericas.findAll({where: {estado: 'ACTIVO'}})
      .then(async respuesta => {
        const rutaArchivo = `${__dirname}/../../../genericas.txt`;
        try{
          await sinonimosBL.vaciaArchivo(rutaArchivo);
        }catch(err) {
          console.log("Ocurrio un error al escribir el archivo de genericas", err);
        }

        const dato = [];
        for(var i = 0; i < respuesta.length; i++) {
          dato.push(respuesta[i].palabra);
        }
        fs.appendFile(rutaArchivo, dato, (err) => {
          if (err) throw err;
        });
        resolve(true);
      })
      .catch(error => reject("No se pudo actualizar el archivo de genericas."));
  });
};

const validarCaracteres = (palabra) => {
  return new Promise((resolve, reject) => {
    const caracteresAdmitidos = /[a-zA-Z0-9&_\.-@,?¿\s]+$/g;
    if (!palabra.match(caracteresAdmitidos)) {
      reject("No puede usar carácteres especiales.");
    }
    const dato = {
      palabra
    };
    resolve(dato);
  });
};

module.exports = {
  actualizarArchivo,
  validarCaracteres
};
