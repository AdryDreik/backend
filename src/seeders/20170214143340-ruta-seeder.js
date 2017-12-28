// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('ruta', [
      // 1
      {
        ruta: '/api/v1/usuario_rol',
        descripcion: 'Ruta para administrar usuarios y sus respectivos roles',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 2
      {
        ruta: '/api/v1/rol_menu',
        descripcion: 'Ruta para administrar roles y sus respectivos menus',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 3
      {
        ruta: '/api/v1/rol_ruta',
        descripcion: 'Ruta para administrar roles y sus respectivas rutas',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 4
      {
        ruta: '/api/v1/menu',
        descripcion: 'Ruta para administrar menús',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 5
      {
        ruta: '/api/v1/rol',
        descripcion: 'Ruta para administrar roles',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 6
      {
        ruta: '/api/v1/ruta',
        descripcion: 'Ruta para administrar rutas',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 7
      {
        ruta: '/api/v1/examen',
        descripcion: 'Para administrar las apis del examen',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
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
