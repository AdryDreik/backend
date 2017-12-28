// 'use strict';

module.exports = {
  up(queryInterface) {
    let rolesMenusArray = [];

    // ADMIN 1
    const obj = [
      { fid_menu: 2,
        fid_rol: 1,
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date() },
    ];
    rolesMenusArray = rolesMenusArray.concat(obj);

    return queryInterface.bulkInsert('rol_menu', rolesMenusArray, {});
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
