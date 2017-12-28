// 'use strict';

module.exports = {
  up(queryInterface) {
    // ADMIN
    const rolesRutasArray = [];
    for (let i = 1; i <= 7; i += 1) {
      const rolAcceso = {
        fid_ruta: i,
        fid_rol: 1,
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      };
      rolesRutasArray.push(rolAcceso);
    }

    return queryInterface.bulkInsert('rol_ruta', rolesRutasArray, {});
  },

  down() {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:z
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
