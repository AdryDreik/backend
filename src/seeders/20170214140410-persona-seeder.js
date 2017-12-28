// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('persona', [{
      documento_identidad: '0000001',
      complemento_documento: '00',
      expedido: 'LP',
      fecha_nacimiento: '1980/01/01',
      nombres: 'ADMIN',
      primer_apellido: 'ADMIN',
      segundo_apellido: 'ADMIN',
      genero: 'M',
      estado: 'ACTIVO',
      _usuario_creacion: 1,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date(),
      tipo_documento_identidad: 'CI',
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
