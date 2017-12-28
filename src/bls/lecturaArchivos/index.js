/* global _path */
import csvParser from 'csv-parser';

const fs = require('fs');

const csv = () => {
  return new Promise((resolve, reject) => {
    const path = `${_path}/datos.csv`;
    const stream = csvParser({
      raw: false,
      separator: ',',
      quote: '"',
      escape: '"',
      newline: '\n',
      strict: true,
    });
    const arrayValores = [];
    fs.createReadStream(path)
      .pipe(stream)
      .on('data', (data) => {
        arrayValores.push({
          id: data.Id,
          nota: data.Nota,
          tiempo: data.Tiempo,
        });
      })
      .on('end', () => {
        resolve(arrayValores);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

const registrando = (tabla, datos) => {
  const promises = [];
  return new Promise((resolve, reject) => {
    for (let index = 0; index < datos.length; index += 1) {
      const options = {
        id: datos[index].id,
        nota: datos[index].nota,
        tiempo: datos[index].tiempo,
      };
      promises.push(tabla.create(options));
    }
    Promise.all(promises)
      .then(() => resolve(true))
      .catch((err) => reject(err))
  })
};

module.exports = {
  csv,
  registrando,
};
