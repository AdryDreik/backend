/**
 * Modelo unicas.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const unicas = sequelize.define('unicas', {
    id_unicas: {
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
    cantidad: {
      type: DataType.INTEGER,
      field: 'cantidad',
      xlabel: 'Cantidad',
      allowNull: true
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull: false
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación'
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    tableName: 'unicas'
  });
  return unicas;
};
