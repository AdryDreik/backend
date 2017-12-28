const fs = require('fs');

const sinonimosBL = require('./sinonimosBL');

const actualizarArchivo = (Unicas) => {
  return new Promise((resolve, reject) => {
    Unicas.findAll()
      .then(async respuesta => {
        const rutaArchivo = `${__dirname}/../../../unicas.txt`;
        try {
          await sinonimosBL.vaciaArchivo(rutaArchivo);
        } catch(err) {
          console.log("Ocurrio un error al escribir las palabras unicas", err);
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
      .catch(error => reject("No se pudo actualizar los datos de palabras unicas."));
  });
};

module.exports = {
  actualizarArchivo
};
