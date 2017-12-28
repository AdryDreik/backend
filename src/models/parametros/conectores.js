/**
 * Modelo conectores.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const conectores = sequelize.define('conectores', {
    id_conectores: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    palabra: {
      type: DataType.TEXT,
      field: 'palabra',
      xlabel: 'palabra',
      allowNull: false,
    },
    estado: {
      type: DataType.STRING(10),
      field: 'estado',
      xlabel: 'estado',
      allowNull: true,
      defaultValue: 'ACTIVO',
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
    tableName: 'conectores',
  });
  return conectores;
};
