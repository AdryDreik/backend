/**
 * Modelo nombres_tentativos.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const nombre_tentativo = sequelize.define('nombre_tentativo', {
    id_nombre_tentativo: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    nombre_empresa: {
      type: DataType.STRING(500),
      field: 'nombre_empresa',
      xlabel: 'NombreEmpresa',
      allowNull: true,
    },
    mensaje: {
      type: DataType.STRING(500),
      field: 'mensaje',
      xlabel: 'Mensaje',
      allowNull: true,
    },
    estado: {
      type: DataType.STRING(500),
      field: 'estado',
      xlabel: 'Estado',
      allowNull: false,
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      //allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    tableName: 'nombres_tentativos',
  });
  return nombre_tentativo;
};
