// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('rol', [
      {
        // 1
        nombre: 'ADMIN',
        descripcion: 'Administrador',
        peso: 0,
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
