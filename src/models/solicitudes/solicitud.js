/**
 * Modelo solicitud para el registro de empresa.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const solicitud = sequelize.define('solicitud', {
    id_solicitud: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    email_solicitud: {
      type: DataType.STRING(500),
      field: 'email_solicitud',
      xlabel: 'emailSolicitud',
      allowNull: false,
    },
    nombre_empresa: {
      type: DataType.STRING(500),
      field: 'nombre_empresa',
      xlabel: 'NombreEmpresa',
      allowNull: false,
      validate: {
        len: { args: [1, 500], msg: 'El campo \'Nombre o Razón Social\' permite un mínimo de 1 caracter y un máximo de 500 caracteres' },
      },
    },
    nombre_dividido: {
      type: DataType.JSONB,
      field: 'nombre_dividido',
      xlabel: 'nombre_dividido',
      allowNull: true,
    },
    fecha_reserva: {
      type: DataType.DATEONLY,
      field: 'fecha_reserva',
      xlabel: 'FechaReserva',
      allowNull: false,
    },
    dias_reserva: {
      type: DataType.INTEGER,
      field: 'dias_reserva',
      xlabel: 'DiasReserva',
      allowNull: false,
    },
    fecha_fin_dia_reserva: {
      type: DataType.DATEONLY,
      field: 'fecha_fin_dia_reserva',
      xlabel: 'FechaFinDiaReserva',
      allowNull: true,
    },
    fecha_fin_hora_reserva: {
      type: DataType.TIME,
      field: 'fecha_fin_hora_reserva',
      xlabel: 'FechaFinHoraReserva',
      allowNull: true,
    },
    fecha_fin_hora_dia_reserva: {
      type: DataType.DATEONLY,
      field: 'fecha_fin_hora_dia_reserva',
      xlabel: 'FechaFinHoraDiaReserva',
      allowNull: true,
    },
    clave_tipo_sociedad_empresa: {
      type: DataType.STRING(500),
      field: 'clave_tipo_sociedad_empresa',
      xlabel: 'ClaveTipoSociedadEmpresa',
      allowNull: false,
    },
    codigo_ticket: {
      type: DataType.STRING(500),
      field: 'codigo_ticket',
      xlabel: 'CodigoTicket',
      allowNull: true,
      unique: true,
    },
    calle_avenida: {
      type: DataType.TEXT,
      field: 'calle_avenida',
      xlabel: 'CalleAvenida',
      allowNull: true,
    },
    estado: {
      type: DataType.STRING(500),
      field: 'estado',
      xlabel: 'Estado',
      allowNull: true,
      defaultValue: 'CREADO',
      validate: {
        isIn: {
          args: [['ACTIVO', 'INACTIVO', 'CREADO', 'RESERVADO', 'EN_PROCESO', 'ELIMINADO', 'PRESENTADO', 'APROBADO', 'OBSERVADO']],
          msg: 'El campo estado sólo permite valores: ACTIVO, INACTIVO, ELIMINADO, CREADO, EN_PROCESO o RESERVADO.',
        },
      },
    },
    numero: {
      type: DataType.STRING(500),
      field: 'numero',
      xlabel: 'Numero',
      allowNull: true,
    },
    zona: {
      type: DataType.STRING(500),
      field: 'zona',
      xlabel: 'Zona',
      allowNull: true,
    },
    unidad_vecinal: {
      type: DataType.TEXT,
      field: 'unidad_vecinal',
      xlabel: 'UnidadVecinal',
      allowNull: true,
    },
    manzana: {
      type: DataType.STRING(500),
      field: 'manzana',
      xlabel: 'Manzana',
      allowNull: true,
    },
    edificio: {
      type: DataType.STRING(500),
      field: 'edificio',
      xlabel: 'Edificio',
      allowNull: true,
    },
    piso: {
      type: DataType.STRING(500),
      field: 'piso',
      xlabel: 'Piso',
      allowNull: true,
    },
    numero_oficina: {
      type: DataType.STRING(500),
      field: 'numero_oficina',
      xlabel: 'NumeroOficina',
      allowNull: true,
    },
    numero_casilla_postal: {
      type: DataType.STRING(500),
      field: 'numero_casilla_postal',
      xlabel: 'NumeroCasillaPostal',
      allowNull: true,
    },
    referencia: {
      type: DataType.TEXT,
      field: 'referencia',
      xlabel: 'Referencia',
      allowNull: true,
    },
    dpa: {
      type: DataType.STRING(500),
      field: 'dpa',
      xlabel: 'Dpa',
      allowNull: true,
    },
    geohash: {
      type: DataType.STRING(500),
      field: 'geohash',
      xlabel: 'Geohash',
      allowNull: true,
    },
    telefono: {
      type: DataType.STRING(500),
      field: 'telefono',
      xlabel: 'Telefono',
      allowNull: true,
    },
    correo_electronico: {
      type: DataType.STRING(500),
      field: 'correo_electronico',
      xlabel: 'CorreoElectronico',
      allowNull: true,
    },
    fax: {
      type: DataType.STRING(500),
      field: 'fax',
      xlabel: 'Fax',
      allowNull: true,
    },
    pagina_web: {
      type: DataType.STRING(500),
      field: 'pagina_web',
      xlabel: 'PaginaWeb',
      allowNull: true,
    },
    persona_contacto: {
      type: DataType.TEXT,
      field: 'persona_contacto',
      xlabel: 'PersonaContacto',
      allowNull: true,
    },
    telefono_contacto: {
      type: DataType.STRING(500),
      field: 'telefono_contacto',
      xlabel: 'TelefonoContacto',
      allowNull: true,
    },
    telefono_area_comercial: {
      type: DataType.STRING(500),
      field: 'telefono_area_comercial',
      xlabel: 'TelefonoArearComercial',
      allowNull: true,
    },
    correo_area_comercial: {
      type: DataType.STRING(500),
      field: 'correo_area_comercial',
      xlabel: 'CorreoAreaComercial',
      allowNull: true,
    },
    principales_productos_servicios: {
      type: DataType.TEXT,
      field: 'principales_productos_servicios',
      xlabel: 'PrincipalesProductosServicios',
      allowNull: true,
      validate: {
        len: { args: [0, 300], msg: 'El campo \'Objeto de la empresa\' permite un mínimo de 0 caracteres y un máximo de 300 caracteres' }
      },
    },
    objeto_empresa: {
      type: DataType.TEXT,
      field: 'objeto_empresa',
      xlabel: 'ObjectoEmpresa',
      allowNull: true,
      validate: {
        len: { args: [0, 300], msg: 'El campo \'Objeto de la empresa\' permite un mínimo de 0 caracteres y un máximo de 300 caracteres' }
      },
    },
    capital_suscrito: {
      type: DataType.DOUBLE,
      field: 'capital_suscrito',
      xlabel: 'CapitalSuscrito',
      allowNull: true,
    },
    capital_pagado: {
      type: DataType.DOUBLE,
      field: 'capital_pagado',
      xlabel: 'CapitalPagado',
      allowNull: true,
    },
    capital_autorizado: {
      type: DataType.DOUBLE,
      field: 'capital_autorizado',
      xlabel: 'CapitalAutorizado',
      allowNull: true,
    },
    capital_asignado: {
      type: DataType.DOUBLE,
      field: 'capital_asignado',
      xlabel: 'CapitalAsignado',
      allowNull: true,
    },
    clave_gestion_fiscal: {
      type: DataType.STRING(500),
      field: 'clave_gestion_fiscal',
      xlabel: 'ClaveGestionFiscal',
      allowNull: true,
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull: true,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
    },
    fecha_inicio_apertura: {
      type: DataType.DATEONLY,
      field: 'fecha_inicio_apertura',
      xlabel: 'FechaInicioApertura',
      allowNull: true,
    },
    fecha_fin_apertura: {
      type: DataType.DATEONLY,
      field: 'fecha_fin_apertura',
      xlabel: 'FechaFinApertura',
      allowNull: true,
    },
    ruta_documento_subido: {
      type: DataType.TEXT,
      field: 'ruta_documento_subido',
      xlabel: 'RutaDocumentoSubido',
      allowNull: true,
    },
    estado_documento_subido: {
      type: DataType.BOOLEAN,
      field: 'estado_documento_subido',
      xlabel: 'EstadoDicumentoSubido',
      allowNull: true,
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    classMethods: {
      associate: (models) => {
        solicitud.hasMany(models.representante, { as: 'representantes', foreignKey: { name: 'fid_solicitud', allowNull: true } });
        solicitud.hasMany(models.actividad, { as: 'actividades', foreignKey: { name: 'fid_solicitud', allowNull: false } });
        solicitud.hasMany(models.balance, { as: 'balances', foreignKey: { name: 'fid_solicitud', allowNull: false } });
        solicitud.belongsTo(models.ciiu, { as: 'ciiu', foreignKey: { name: 'fid_ciiu', allowNull: false, xchoice: 'clave' } });
      },
      tableName: 'solicitud',
    },
  });
  return solicitud;
};
