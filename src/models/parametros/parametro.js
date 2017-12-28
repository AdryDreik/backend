/**
 * Módulo que mapea los PARAMETROS existentes, conjunto de valores parametricos
 * que son asignados a distintas tablas.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const parametro = sequelize.define('parametro', {
    clave: {
      type: DataType.STRING,
      primaryKey: true,
      xlabel: 'ID',
    },
    valor: {
      type: DataType.TEXT,
      field: 'valor',
      xlabel: 'Valor',
      allowNull: false,
    },
    grupo: {
      type: DataType.TEXT,
      field: 'grupo',
      xlabel: 'Grupo',
      allowNull: false,
    },
    estado: {
      type: DataType.STRING(30),
      field: 'estado',
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: { args: [['ACTIVO', 'INACTIVO', 'ELIMINADO']], msg: 'El campo estado sólo permite valores: ACTIVO, INACTIVO o ELIMINADO.' },
      },
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    tableName: 'parametro',
  });
  return parametro;
};
