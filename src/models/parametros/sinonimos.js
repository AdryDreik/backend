/**
 * Modelo sinonimos.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const sinonimos = sequelize.define('sinonimos', {
    id_sinonimos: {
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
    sinonimos: {
      type: DataType.TEXT,
      field: 'sinonimos',
      xlabel: 'sinonimos',
      allowNull: false,
    },
    palabra_raiz: {
      type: DataType.TEXT,
      field: 'palabra_raiz',
      xlabel: 'palabra_raiz',
      allowNull: true
    },    
    estado: {
      type: DataType.STRING(10),
      field: 'estado',
      xlabel: 'estado',
      allowNull: true,
      defaultValue: 'ACTIVO',
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    tableName: 'sinonimos',
  });
  return sinonimos;
};
