/**
 * Modelo balance.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const balance = sequelize.define('balance', {
    id_balance: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    clave_tipo: {
      type: DataType.STRING(50),
      field: 'clave_tipo',
      xlabel: 'ClaveTipo',
      allowNull: false,
    },
    clave_subtipo: {
      type: DataType.STRING(50),
      field: 'clave_subtipo',
      xlabel: 'ClaveSubtipo',
      allowNull: false,
    },
    clave_atributo_fijo: {
      type: DataType.STRING(50),
      field: 'clave_atributo_fijo',
      xlabel: 'ClaveAtributoFijo',
      allowNull: true,
    },
    clave_atributo_manual: {
      type: DataType.STRING(50),
      field: 'clave_atributo_manual',
      xlabel: 'ClaveAtributoManual',
      allowNull: true,
    },
    valor: {
      type: DataType.DOUBLE,
      field: 'valor',
      xlabel: 'Valor',
      allowNull: false,
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
        balance.belongsTo(models.solicitud, { as: 'balances', foreignKey: { name: 'fid_solicitud', targetKey: 'id_solicitud', allowNull: true, xchoice: 'nombre_empresa' } });
      },
      tableName: 'balance',
    },
  });
  return balance;
};
