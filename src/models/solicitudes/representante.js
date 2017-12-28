/**
 * Modelo representante.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const representante = sequelize.define('representante', {
    id_representante: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
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
        representante.belongsTo(models.persona, { as: 'persona', foreignKey: { name: 'fid_persona', allowNull: true } });
        representante.belongsTo(models.solicitud, { as: 'solicitud', foreignKey: { name: 'fid_solicitud', allowNull: true } });
        representante.belongsTo(models.parametro, { as: 'clave_rol_empresa', foreignKey: { name: 'rol_empresa', allowNull: true } });
      },
      tableName: 'representante',
    },
  });
  return representante;
};
