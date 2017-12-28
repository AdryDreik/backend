/**
 * Modelo actividad.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const actividad = sequelize.define('actividad', {
    id_actividad: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    tipo_actividad: {
      type: DataType.STRING(30),
      field: 'tipo_actividad',
      xlabel: 'TipoActividad',
      allowNull: true,
    },
    clase: {
      type: DataType.STRING(30),
      field: 'clase',
      xlabel: 'Clase',
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
    classMethods: {
      associate: (models) => {
        actividad.belongsTo(models.solicitud, { as: 'actividades', foreignKey: { name: 'fid_solicitud', targetKey: 'id_solicitud', allowNull: false } });
      },
      tableName: 'actividad',
    },
  });
  return actividad;
};
