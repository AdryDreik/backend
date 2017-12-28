/**
 * Modelo dpa.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const dpa = sequelize.define('dpa', {
    id_dpa: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    c_ut: {
      type: DataType.STRING(10),
      field: 'codUnidadTerritorial',
      xlabel: 'CodUnidadTerritorial',
      allowNull: false,
    },
    departamento: {
      type: DataType.STRING(15),
      field: 'departamento',
      xlabel: 'Departamento',
      allowNull: false,
    },
    provincia: {
      type: DataType.STRING(100),
      field: 'provincia',
      xlabel: 'Provincia',
      allowNull: false,
    },
    cod_pro: {
      type: DataType.STRING(10),
      field: 'codProvincia',
      xlabel: 'CodProvincia',
      allowNull: false,
    },
    municipio: {
      type: DataType.STRING(50),
      field: 'municipio',
      xlabel: 'Municipio',
      allowNull: false,
    },
    cod_mun: {
      type: DataType.STRING(10),
      field: 'codMunicipio',
      xlabel: 'CodMunicipio',
      allowNull: false,
    },
    estado: {
      type: DataType.STRING(30),
      field: 'estado',
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: {
          args: [['ACTIVO', 'INACTIVO', 'ELIMINADO']],
          msg: 'El campo estado sólo permite valores: ACTIVO, INACTIVO o ELIMINADO.',
        },
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
    classMethods: {
      associate: (models) => {
        dpa.belongsTo(models.dpa, { as: 'dpa_superior', foreignKey: { name: 'fid_dpa_superior', targetKey: 'id_dpa', allowNull: true, xchoice: 'nombre' } });
      },
      /*buscarProvincias: (codDepartamento) => dpa.findAll({
        attributes: ['codProvincia', 'provincia'],
        //where: sequelize.literal(`"dpa"."estado" = 'ACTIVO' AND (SUBSTRING("dpa"."codProvincia",1,2) = '${codDepartamento}')`),
        where: sequelize.literal(`"dpa"."estado" = 'ACTIVO' AND "dpa"."codProvincia" LIKE  '${codDepartamento}%'`),
        order: 'provincia ASC'
      },*/
    /*  buscarMunicipios: (codDepartamento) => dpa.findAll({
          attributes: ['id_dpa', 'municipio'],
          //where: sequelize.literal(`"dpa"."estado" = 'ACTIVO' AND "dpa"."codMunicipio",1,2) = '${codDepartamento}')`),
          where: sequelize.literal(`"dpa"."estado" = 'ACTIVO' AND "dpa"."codMunicipio" LIKE  '${codDepartamento}%'`),
          order: 'municipio ASC'
        },
      ),*/
    },
    tableName: 'dpa',
  });
  return dpa;
};
