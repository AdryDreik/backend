// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('usuario', [
      // ADMINISTRADOR
      {
        email: 'admin',
        usuario: 'admin',
        contrasena: '21232f297a57a5a743894a0e4a801fc3',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_persona: 1,
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
