/* import algo from "asdfasdf"; */

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

let db = null;
module.exports = (app) => {
  if (!db) {
    const config = app.src.config.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );

    db = {
      sequelize,
      Sequelize,
      models: {},
    };


    const dirModels = path.join(__dirname, 'models');
    // Obtiene los modelos del directorio "models".
    fs.readdirSync(dirModels).forEach(dir => {
      if (fs.statSync(`${dirModels}/${dir}`).isDirectory()) {
        const subDirModels = path.join(dirModels, dir);
        if (dir !== 'ejemplos') // TODO: commentar si esque se quieren cargar los modelos de ejemplos
          fs.readdirSync(subDirModels).forEach(file => {
            const pathFile = path.join(subDirModels, file);
            const model = sequelize.import(pathFile);
          // console.log("---->"+model);
          // Almacena los objetos modelo en un JSON.
            db.models[model.name] = model;
          });
      } else {
        const pathFile = path.join(dirModels, dir);
        const model = sequelize.import(pathFile);
        // console.log("---->"+model);
        // Almacena los objetos modelo en un JSON.
        db.models[model.name] = model;
      }
    });
    console.log('cargando asociaciones....');
    Object.keys(db.models).forEach(key => {
      console.log(`---->${key + db.models[key]}`);
      // Control de relaciones(associate) de los modelos.
      if (db.models[key].associate !== undefined) {
        db.models[key].associate(db.models);
      }
    });
  }
  return db;
};
