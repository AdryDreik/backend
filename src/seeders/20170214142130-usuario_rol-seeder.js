// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('usuario_rol', [
      // ADMINISTRADOR
      {
        fid_usuario: 1,
        fid_rol: 1,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
    ], {});
  },

  down() {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
