/**
 * Modelo feriado.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const feriado = sequelize.define('feriado', {
    id_feriado: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    fecha: {
      type: DataType.DATEONLY,
      field: 'fecha',
      xlabel: 'Fecha',
      allowNull: false,
    },
    descripcion: {
      type: DataType.TEXT,
      field: 'descripcion',
      xlabel: 'Descripcion',
      allowNull: true,
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
    tableName: 'feriado',
  });
  return feriado;
};
