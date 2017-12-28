// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('menu', [

      // --------------------- ADMINISTRACIÓN -------------------------------
      // 1
      {
        nombre: 'ADMINISTRACIÓN',
        descripcion: 'Administración',
        orden: 100,
        ruta: '',
        icono: 'cog',
        method_get: false,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 2
      {
        nombre: 'USUARIOS',
        descripcion: 'Administración de usuarios',
        orden: 1,
        ruta: 'usuarios',
        icono: 'group',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        fid_menu_padre: 1,
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 3
      {
        nombre: 'RUTAS',
        descripcion: 'Administración de rutas',
        orden: 2,
        ruta: 'rutas',
        icono: 'code',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        fid_menu_padre: 1,
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 4
      {
        nombre: 'ROLES',
        descripcion: 'Administración de roles',
        orden: 3,
        ruta: 'roles',
        icono: 'credit_card',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        fid_menu_padre: 1,
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 5
      {
        nombre: 'MENÚS',
        descripcion: 'Administración de menús',
        orden: 4,
        ruta: '',
        icono: '',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        fid_menu_padre: 1,
        _usuario_creacion: 1,
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
