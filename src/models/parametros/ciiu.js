/**
 * Modelo CIIU.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const ciiu = sequelize.define('ciiu', {
    clave: {
      type: DataType.STRING(10),
      primaryKey: true,
      xlabel: 'clave',
    },
    valor: {
      type: DataType.TEXT,
      field: 'valor',
      xlabel: 'valor',
      allowNull: false,
    },
    incluye: {
      type: DataType.TEXT,
      field: 'incluye',
      xlabel: 'incluye',
      allowNull: true,
    },
    excluye: {
      type: DataType.TEXT,
      field: 'excluye',
      xlabel: 'excluye',
      allowNull: true,
    },
    h_uno: {
      type: DataType.INTEGER,
      field: 'h_uno',
      xlabel: 'h_uno',
      allowNull: true,
    },
    h_dos: {
      type: DataType.INTEGER,
      field: 'h_dos',
      xlabel: 'h_dos',
      allowNull: true,
    },
    h_tres: {
      type: DataType.INTEGER,
      field: 'h_tres',
      xlabel: 'h_tres',
      allowNull: true,
    },
    h_cuatro: {
      type: DataType.INTEGER,
      field: 'h_cuatro',
      xlabel: 'h_cuatro',
      allowNull: true,
    },
    h_cinco: {
      type: DataType.INTEGER,
      field: 'h_cinco',
      xlabel: 'h_cinco',
      allowNull: true,
    },
    grupo: {
      type: DataType.TEXT,
      field: 'grupo',
      xlabel: 'grupo',
      allowNull: true,
    },
    estado: {
      type: DataType.STRING(10),
      field: 'estado',
      xlabel: 'estado',
      defaultValue: 'ACTIVO',
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
    tableName: 'ciiu',
  });
  return ciiu;
};
