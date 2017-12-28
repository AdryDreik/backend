import ngeohash from 'ngeohash';
import moment from 'moment';

const config = require('konfig')();

// funciones que se utilizaran en estas lógicas de negocio

const obtenerLatitudLongitud = (datos) => {
  if (datos) {
    const ubicacion = ngeohash.decode(datos);
    return { latitud: ubicacion.latitude, longitud: ubicacion.longitude };
  } else {
    return '';
  }
};

/**
 * Function para convertir las respuesta al formato adecuado de los inputsTags
 * @param {Object} datos Este datos es el req.body[atributo]
 * @return {String} atributo transformado y concatenado con comas
 */

const formatoInputTags = (campo) => {
  let ngTags = [];
  if (campo && campo.length > 0) {
    campo = campo.split(',');
    const formatoCorrecto = [];
    campo.forEach((val) => {
      formatoCorrecto.push({ name: val });
    });
    ngTags = formatoCorrecto;
  }
  return ngTags;
};


/**
 * Function para convertir a la forma correcta de los representantes
 * @param {Object} representantes Este datos es el req.body[atributo]
 * @return {String} atributo transformado y concatenado con comas
 */

const obtenerRepresentantes = (representantes) => {
  let formatoRepresentates = [];
  if (!representantes) {
    formatoRepresentates = [];
  } else {
    representantes.forEach((val) => {
      formatoRepresentates.push({
        persona: {
          correo: val.persona.correo,
          nombres: val.persona.nombres,
          primer_apellido: val.persona.primer_apellido,
          segundo_apellido: val.persona.segundo_apellido,
          documento_identidad: val.persona.documento_identidad,
          fecha_nacimiento: val.persona.fecha_nacimiento,
          genero: val.persona.genero,
          id_persona: val.persona.id_persona,
          nacionalidad: {
            clave: val.persona.clave_nacionalidad.clave,
            valor: val.persona.clave_nacionalidad.valor,
            grupo: val.persona.clave_nacionalidad.grupo,
          },
        },
        rol_empresa: {
          clave: val.clave_rol_empresa.clave,
          valor: val.clave_rol_empresa.valor,
          grupo: val.clave_rol_empresa.grupo,
        },
        tipo_documento: {
          clave: val.persona.clave_tipo_documento_identidad.clave,
          valor: val.persona.clave_tipo_documento_identidad.valor,
          grupo: val.persona.clave_tipo_documento_identidad.grupo,
        },
      });
    });
  }
  return formatoRepresentates;
};

module.exports = {
    // ************************ funciones ***************************
   /**
   * Funcion para modificar todas las solicitudes enviadas
   * @param {Array} response Array que tiene todos los id's
   * @return {Array} Retorna el array compuesto
   */
  respuestaGacetaModificar: (response) => {
    const _nR = [];
    response.forEach((sol) => {
      _nR.push({
        id_reserva: sol.id_solicitud,
        estado: 'eliminado',
      });
    });
    return _nR;
  },

  /**
   * Funcion para validar los representantes
   * @param {Object} datos Array de representantes
   * @return {json} objeto Donde se tiene el mensaje y la respuesta
   */

  validarRepresentantes: (datos) => {
    let bandera = true;
    if (datos && datos.length === 0) {
      return {
        finalizado: true,
        mensaje: 'Los representantes son requeridos.',
      };
    } else {
      for (let i = 0; i < datos.length; i += 1) {
      
        if (datos[i].tipo_documento.clave && datos[i].tipo_documento.clave === 'CI') {
          if (
            datos[i].persona &&
            datos[i].tipo_documento &&
            datos[i].rol_empresa &&
            datos[i].rol_empresa.clave &&
            datos[i].persona.id_persona) {
            // algun codigo extra
          } else {
            return {
              finalizado: true,
              mensaje: 'Faltan parametros para crear representantes',
            };
          }
        }
      }
      bandera = false;
    }

    if (!bandera) {
      return {
        finalizado: false,
      };
    }
  },

  /**
   * Funcion para validar los balances (activos, pasivos, etc)
   * @param {Object} datos Array de los balances
   * @return {json} objeto Donde se tiene el mensaje y la respuesta
   */

  validarBalances: (datos) => {
    if (datos && datos.length === 0) {
      return {
        finalizado: true,
        mensaje: 'Los balances son requeridos.',
      };
    }
    return {
      finalizado: false,
    };
  },

  /**
   * Funcion para validar los capitales (capital, capital_autorizado, capital_sucrito y capital_pagado)
   * @param {Object} datos Array de los capitales
   * @param {string} tipoEmpresa Tipo de la Empresa
   * Capital autorizado no menor a Bs. 100
   * Capital suscrito No puede ser menor al 50% del capital autorizado
   * Capital pagado No puede ser menor a 25 % del capital suscrito
   * @return {json} objeto Donde se tiene el mensaje y la respuesta
   */

  validarCapital: (datos, tipoEmpresa) => {
    if (tipoEmpresa === '009') {
      return {
        finalizado: false,
      };
    } else {
      if (datos && datos.length === 1) {
        if (!parseFloat(datos[0].monto) > 0) {
          return {
            finalizado: true,
            mensaje: 'El monto del capital financiero tiene que ser mayor a cero.',
          };
        } else {
          return {
            finalizado: false,
          };
        }
      } else {
        let montoPivote;
        let montoSuscrito;
        let montoPagado;
        for (let i = 0; i < datos.length; i += 1) {
          if (datos[i].clave) {
            switch (datos[i].clave) {
              case 'capital_autorizado':
                montoPivote = parseFloat(datos[i].monto);
                break;
              case 'capital_suscrito':
                montoSuscrito = parseFloat(datos[i].monto);
                break;
              case 'capital_pagado':
                montoPagado = parseFloat(datos[i].monto);
                break;
              default:
                break;
            }
          }
        }
        if (montoPivote < 100) {
          return {
            finalizado: true,
            mensaje: 'El capital autorizado tiene que ser mayor o igual a 100',
          };
        } else {
          if (!(montoSuscrito >= (montoPivote / 2))) {
            return {
              finalizado: true,
              mensaje: `El capital suscrito tiene que ser mayor o igual a ${montoPivote / 2}`,
            };
          } else {
            if (!(montoPagado >= (montoSuscrito / 4))) {
              return {
                finalizado: true,
                mensaje: `El capital pagado tiene que ser mayor o igual a ${montoSuscrito / 4}`,
              };
            }
          }
        }
        if (montoSuscrito > montoPivote) {
          return {
            finalizado: true,
            mensaje: 'El capital suscrito no puede ser mayor al capital autorizado',
          };
        }
        if (montoPagado > montoSuscrito) {
          return {
            finalizado: true,
            mensaje: 'El capital pagado no puede ser mayor al capital suscrito',
          };
        }
        return {
          finalizado: false,
        };
      }
    }
  },


  /**
   * Funcion para validar las fechas de apertura del balance
   * @param {date} inicio Fecha de inicio de apertura
   * @param {date} fin Fecha fin de apertura
   * @return {json} objeto Donde se tiene el mensaje y la respuesta
   * @description SE COMENTO ESTE CODIGO POR ORDEN DE GOBIERNO ELECTRONICO - 21/07/2017
   */

  validarFechas: (inicio, fin) => {
    // const fechaFin = moment(fin).format('YYYY-MM-DD');
    // const fechaInicio = moment(inicio).format('YYYY-MM-DD');
    // const fechaActual = moment(new Date()).format('YYYY-MM-DD');

    // if (fechaInicio > fechaFin) {
    //   return {
    //     finalizado: true,
    //     mensaje: 'las fechas de inicio no puede ser mayor a la fecha de finalización.',
    //   };
    // }
    // if (fechaFin > fechaActual) {
    //   return {
    //     finalizado: false,
    //     mensaje: 'las fechas de finalización solo puede ser hasta hoy',
    //   };
    // }
    return {
      finalizado: false,
    };
  },

    /**
   * Function para crear representantes manualmente y retornarlos como json
   * @param {object} body es el conjunto de datos del representante
   * @return {String} atributo transformado
   */

  creacionRepresentantesManual: (body) => {
    const personas = [];
    let obtenerPersona = {};

    for (let cont = 0; cont < body.representantes.length; cont += 1) {
      const tipoDoc = body.representantes[cont].tipo_documento.clave;
      if (tipoDoc === 'CI') {
        if (body.representantes[cont].rol_empresa &&
          body.representantes[cont].rol_empresa.clave &&
          body.representantes[cont].persona &&
          body.representantes[cont].persona.id_persona) {            
          body.representantes[cont].persona.primer_apellido = body.representantes[cont].persona.primer_apellido || '';
          body.representantes[cont].persona.segundo_apellido = body.representantes[cont].persona.segundo_apellido || '';
          obtenerPersona = {
            correo: body.representantes[cont].persona.correo,
            documento_identidad: body.representantes[cont].persona.documento_identidad,
            fecha_nacimiento: body.representantes[cont].persona.fecha_nacimiento,
            complemento: '',
            expedido: (body.representantes[cont].persona.expedido) ? body.representantes[cont].persona.expedido.valor.toUpperCase() : '',
            nombres: body.representantes[cont].persona.nombres.toUpperCase(),
            primer_apellido: body.representantes[cont].persona.primer_apellido.toUpperCase(),
            segundo_apellido: (body.representantes[cont].persona.segundo_apellido) ? body.representantes[cont].persona.segundo_apellido.toUpperCase() : '',
            genero: body.representantes[cont].persona.genero,
            clave_tipo_documento_identidad: {
              clave: 'CI',
              valor: 'CÉDULA DE IDENTIDAD',
            },
            clave_nacionalidad: body.representantes[cont].persona.nacionalidad,
          };
          personas.push({
            persona: obtenerPersona,
            clave_rol_empresa: body.representantes[cont].rol_empresa,
          });
        }
      } else {
        obtenerPersona = {
          correo: body.representantes[cont].persona.correo,
          documento_identidad: body.representantes[cont].persona.documento_identidad,
          complemento_documento: '',
          expedido: '',
          fecha_nacimiento: body.representantes[cont].persona.fecha_nacimiento,
          nombres: body.representantes[cont].persona.nombres.toUpperCase(),
          primer_apellido: body.representantes[cont].persona.primer_apellido.toUpperCase(),
          segundo_apellido: (body.representantes[cont].persona.segundo_apellido) ? body.representantes[cont].persona.segundo_apellido.toUpperCase() : '',
          direccion: '',
          genero: body.representantes[cont].persona.genero,
          clave_tipo_documento_identidad: body.representantes[cont].tipo_documento,
          clave_nacionalidad: body.representantes[cont].persona.nacionalidad,
        };
        personas.push({
          persona: obtenerPersona,
          clave_rol_empresa: body.representantes[cont].rol_empresa,
        });
      }
    }
    return personas;
  },

  /**
   * Funcion para calcular los dias de plazo dependiendo del tipo de empresa
   * @param {String} tipoEmpresa Tipo de empresa
   * @param {String} diasPlazo Dias plazo
   * @return {Date} retorna la fecha fin sumando los dias plazo
   */

  diasPlazo: (parametro, tipoEmpresa) => {
    return new Promise((resolve, reject) => {
      const opt = {
        where: {
          clave: {
            $like: `${tipoEmpresa}_PLAZO`,
          },
        },
        attributes: ['valor'],
      };
      parametro.findAll(opt)
        .then((response) => {
          resolve(response[0].valor);
        })
        .catch(() => {
          reject(new Error('Error al tratar de calcular los dias de plazo'));
        });
    });
  },

  /**
   * Funcion para adicionar atributos personalizados
   * @param {Object} res Objecto de la consulta del sequelize
   * @return {Object} copyRes Objecto de la consulta modificada del sequelize
   */

  adicionandoOpciones: (parametro, res, dpa) => {
    return new Promise((resolve, reject) => {
      const copyRes = res.toJSON();
      const tipoEmpresa = res.clave_tipo_sociedad_empresa;
      const capital = [];
      const activoCorriente = [];
      const activoNoCorriente = [];
      const pasivo = [];
      const patrimonio = [];
      let balanceManual = [];

      if (copyRes.balances && copyRes.balances.length > 0) {
        for (let j = 0; j < copyRes.balances.length; j += 1) {
          let indice = (copyRes.balances[j].clave_atributo_fijo) ? copyRes.balances[j].clave_atributo_fijo : copyRes.balances[j].clave_atributo_manual;
          indice = indice.toUpperCase().trim().replace(/_/g, ' ');
          switch (copyRes.balances[j].clave_subtipo) {
            case 'ACTIVO_CORRIENTE':
              if (copyRes.balances[j].clave_atributo_fijo) {
                activoCorriente.push({
                  atributo_fijo: indice,
                  valor: indice,
                  monto: copyRes.balances[j].valor,
                });
              } else {
                activoCorriente.push({
                  atributo_manual: indice,
                  valor: indice,
                  monto: copyRes.balances[j].valor,
                });
              }
              break;
            case 'ACTIVO_NO_CORRIENTE':
              if (copyRes.balances[j].clave_atributo_fijo) {
                activoNoCorriente.push({
                  atributo_fijo: indice,
                  valor: indice,
                  monto: copyRes.balances[j].valor,
                });
              } else {
                activoNoCorriente.push({
                  atributo_manual: indice,
                  valor: indice,
                  monto: copyRes.balances[j].valor,
                });
              }
              break;
            case 'PASIVO':
              if (copyRes.balances[j].clave_atributo_fijo) {
                pasivo.push({
                  atributo_fijo: indice,
                  valor: indice,
                  monto: copyRes.balances[j].valor,
                });
              } else {
                pasivo.push({
                  atributo_manual: indice,
                  valor: indice,
                  monto: copyRes.balances[j].valor,
                });
              }
              break;
            case 'PATRIMONIO':
              if (copyRes.balances[j].clave_atributo_fijo) {
                patrimonio.push({
                  atributo_fijo: indice,
                  valor: indice,
                  monto: copyRes.balances[j].valor,
                });
              } else {
                patrimonio.push({
                  atributo_manual: indice,
                  valor: indice,
                  monto: copyRes.balances[j].valor,
                });
              }
              break;
            default:
              break;
          }
        }

        balanceManual = [
          {
            tipo: 'ACTIVO',
            valor: 'ACTIVO',
            monto: 0,
            subtipos: [{
              subtipo: 'ACTIVO_CORRIENTE',
              valor: 'ACTIVO CORRIENTE',
              monto: 0,
              descripcion: activoCorriente,
            },
            {
              subtipo: 'ACTIVO_NO_CORRIENTE',
              valor: 'ACTIVO NO CORRIENTE',
              monto: 0,
              descripcion: activoNoCorriente,
            },
            ],
          },
          {
            tipo: 'PASIVO_PATRIMONIO',
            valor: 'PASIVO + PATRIMONIO',
            monto: 0,
            subtipos: [{
              subtipo: 'PASIVO',
              valor: 'PASIVO',
              monto: 0,
              descripcion: pasivo,
            },
            {
              subtipo: 'PATRIMONIO',
              valor: 'PATRIMONIO',
              monto: 0,
              descripcion: patrimonio,
            },
            ],
          },
        ];
      } else {
        balanceManual = [
          {
            tipo: 'ACTIVO',
            valor: 'ACTIVO',
            monto: 0,
            subtipos: [{
              subtipo: 'ACTIVO_CORRIENTE',
              valor: 'ACTIVO CORRIENTE',
              monto: 0,
              descripcion: [{
                atributo_fijo: 'DISPONIBLE',
                valor: 'DISPONIBLE',
                monto: 0,
              },
              {
                atributo_fijo: 'EXIGIBLE',
                valor: 'EXIGIBLE',
                monto: 0,
              },
              {
                atributo_fijo: 'REALIZABLE',
                valor: 'REALIZABLE',
                monto: 0,
              },
              {
                atributo_fijo: 'OTROS',
                valor: 'OTROS',
                monto: 0,
              },
              ],
            },
            {
              subtipo: 'ACTIVO_NO_CORRIENTE',
              valor: 'ACTIVO NO CORRIENTE',
              monto: 0,
              descripcion: [{
                atributo_fijo: 'ACTIVO_NO_CORRIENTE',
                valor: 'ACTIVO NO CORRIENTE',
                monto: 0,
              },
              {
                atributo_fijo: 'OTROS',
                valor: 'OTROS',
                monto: 0,
              },
              ],
            },
            ],
          },
          {
            tipo: 'PASIVO_PATRIMONIO',
            valor: 'PASIVO + PATRIMONIO',
            monto: 0,
            subtipos: [{
              subtipo: 'PASIVO',
              valor: 'PASIVO',
              monto: 0,
              descripcion: [{
                atributo_fijo: 'PASIVO_CORRIENTE',
                valor: 'PASIVO CORRIENTE',
                monto: 0,
              },
              {
                atributo_fijo: 'PASIVO_NO_CORRIENTE',
                valor: 'PASIVO NO CORRIENTE',
                monto: 0,
              },
              ],
            },
            {
              subtipo: 'PATRIMONIO',
              valor: 'PATRIMONIO',
              monto: 0,
              descripcion: [{
                atributo_fijo: 'CAPITAL',
                valor: 'CAPITAL',
                monto: 0,
              }],
            },
            ],
          },
        ];
      }

      // Modificando para los ngTipos
      copyRes.telefono = formatoInputTags(copyRes.telefono);
      copyRes.fax = formatoInputTags(copyRes.fax);
      copyRes.correo_electronico = formatoInputTags(copyRes.correo_electronico);
      copyRes.telefono_contacto = formatoInputTags(copyRes.telefono_contacto);
      copyRes.correo_area_comercial = formatoInputTags(copyRes.correo_area_comercial);

      // Modificando a la forma correcta de los representantes
      copyRes.representantes = obtenerRepresentantes(copyRes.representantes);

      const opciones = {
        where: {
          clave: {
            $like: `EMPRESA_${tipoEmpresa}%`,
          },
          grupo: 'LABEL_CAPITAL_EMPRESAS_SOCIEDADES',
        },
        attributes: ['clave', 'valor', 'grupo'],
      };
      let sw = true;
      parametro.findAll(opciones)
        .then((response) => {
          response.forEach((sol) => {
            if (`EMPRESA_${tipoEmpresa}_CAPITAL_SUSCRITO`.indexOf(sol.clave) !== -1) {
              capital.push({
                clave: 'capital_suscrito',
                tipo_capital: sol.valor,
                monto: copyRes.capital_suscrito || 0,
              });
            }
            if (`EMPRESA_${tipoEmpresa}_CAPITAL_PAGADO`.indexOf(sol.clave) !== -1) {
              capital.push({
                clave: 'capital_pagado',
                tipo_capital: sol.valor,
                monto: copyRes.capital_pagado || 0,
              });
            }
            if (`EMPRESA_${tipoEmpresa}_CAPITAL_AUTORIZADO`.indexOf(sol.clave) !== -1) {
              capital.push({
                clave: 'capital_autorizado',
                tipo_capital: sol.valor,
                monto: copyRes.capital_autorizado || 0,
              });
            }
            if (`EMPRESA_${tipoEmpresa}_CAPITAL_ASIGNADO`.indexOf(sol.clave) !== -1) {
              capital.push({
                clave: 'capital_asignado',
                tipo_capital: sol.valor,
                monto: copyRes.capital_asignado || 0,
              });
            }
          });
          delete copyRes.capital_asignado;
          delete copyRes.capital_autorizado;
          delete copyRes.capital_pagado;
          delete copyRes.capital_suscrito;
          delete copyRes.balances;
          copyRes.capital = capital;
          copyRes.balance = balanceManual;
          copyRes.geohash = obtenerLatitudLongitud(copyRes.geohash);
          if (copyRes.dpa) {
            const obtenerMunicipio = {
              attributes: ['id_dpa', 'departamento', 'provincia', 'municipio'],
              where: { codMunicipio: copyRes.dpa },
              order: 'municipio ASC',
            };
            return dpa.findOne(obtenerMunicipio);
          } else {
            sw = false;
            return true;
          }
        })
        .then((response) => {
          let dpaFormateado;
          if (response && sw) {
            dpaFormateado = {
              id_dpa: response.id_dpa,
              departamento: response.departamento,
              provincia: {
                id_dpa: response.id_dpa,
                provincia: response.provincia,
                municipio: {
                  id_dpa: response.id_dpa,
                  codMunicipio: copyRes.dpa,
                  municipio: response.municipio,
                },
              },
            };
          } else {
            dpaFormateado = null;
          }
          copyRes.principales_productos_servicios = copyRes.objeto_empresa;
          copyRes.dpa = dpaFormateado;
          resolve(copyRes);
        })
        .catch((err) => {
          reject(new Error(err.message));
        });
    });
  },

  /**
   * Funcion para manipular los datos retornarlos como objetos planos y/o añadidos
   * @param {object} datos Objecto que tiene la consulta
   */

  formateandoResultadoSolicitudes: (datosParametros, solicitudRespuesta, tipoEmpresa) => {
    const objetoTotal = {};
    const capital = [];
    return new Promise((resolve) => {
      datosParametros.forEach((sol) => {
        if (`EMPRESA_${tipoEmpresa}_CAPITAL_SUSCRITO`.indexOf(sol.clave) !== -1) {
          capital.push({
            clave: 'capital_suscrito',
            tipo_capital: sol.valor,
            monto: solicitudRespuesta.capital_suscrito || 0,
          });
        }
        if (`EMPRESA_${tipoEmpresa}_CAPITAL_PAGADO`.indexOf(sol.clave) !== -1) {
          capital.push({
            clave: 'capital_pagado',
            tipo_capital: sol.valor,
            monto: solicitudRespuesta.capital_pagado || 0,
          });
        }
        if (`EMPRESA_${tipoEmpresa}_CAPITAL_AUTORIZADO`.indexOf(sol.clave) !== -1) {
          capital.push({
            clave: 'capital_autorizado',
            tipo_capital: sol.valor,
            monto: solicitudRespuesta.capital_autorizado || 0,
          });
        }
        if (`EMPRESA_${tipoEmpresa}_CAPITAL_ASIGNADO`.indexOf(sol.clave) !== -1) {
          capital.push({
            clave: 'capital_asignado',
            tipo_capital: sol.valor,
            monto: solicitudRespuesta.capital_asignado || 0,
          });
        }
      });
      objetoTotal.capital = capital;
      const activoCorriente = [];
      const activoNoCorriente = [];
      const pasivo = [];
      const patrimonio = [];
      let balanceManual = [];
      if (solicitudRespuesta.balances && solicitudRespuesta.balances.length > 0) {
        for (let j = 0; j < solicitudRespuesta.balances.length; j += 1) {
          let indice = (solicitudRespuesta.balances[j].clave_atributo_fijo) ? solicitudRespuesta.balances[j].clave_atributo_fijo : solicitudRespuesta.balances[j].clave_atributo_manual;
          indice = indice.toUpperCase().trim().replace(/_/g, ' ');
          switch (solicitudRespuesta.balances[j].clave_subtipo) {
            case 'ACTIVO_CORRIENTE':
              if (solicitudRespuesta.balances[j].clave_atributo_fijo) {
                activoCorriente.push({
                  atributo_fijo: indice,
                  valor: indice,
                  monto: solicitudRespuesta.balances[j].valor,
                });
              } else {
                activoCorriente.push({
                  atributo_manual: indice,
                  valor: indice,
                  monto: solicitudRespuesta.balances[j].valor,
                });
              }
              break;
            case 'ACTIVO_NO_CORRIENTE':
              if (solicitudRespuesta.balances[j].clave_atributo_fijo) {
                activoNoCorriente.push({
                  atributo_fijo: indice,
                  valor: indice,
                  monto: solicitudRespuesta.balances[j].valor,
                });
              } else {
                activoNoCorriente.push({
                  atributo_manual: indice,
                  valor: indice,
                  monto: solicitudRespuesta.balances[j].valor,
                });
              }
              break;
            case 'PASIVO':
              if (solicitudRespuesta.balances[j].clave_atributo_fijo) {
                pasivo.push({
                  atributo_fijo: indice,
                  valor: indice,
                  monto: solicitudRespuesta.balances[j].valor,
                });
              } else {
                pasivo.push({
                  atributo_manual: indice,
                  valor: indice,
                  monto: solicitudRespuesta.balances[j].valor,
                });
              }
              break;
            case 'PATRIMONIO':
              if (solicitudRespuesta.balances[j].clave_atributo_fijo) {
                patrimonio.push({
                  atributo_fijo: indice,
                  valor: indice,
                  monto: solicitudRespuesta.balances[j].valor,
                });
              } else {
                patrimonio.push({
                  atributo_manual: indice,
                  valor: indice,
                  monto: solicitudRespuesta.balances[j].valor,
                });
              }
              break;
            default:
              break;
          }
        }

        balanceManual = [
          {
            tipo: 'ACTIVO',
            valor: 'ACTIVO',
            monto: 0,
            subtipos: [{
              subtipo: 'ACTIVO_CORRIENTE',
              valor: 'ACTIVO CORRIENTE',
              monto: 0,
              descripcion: activoCorriente,
            },
            {
              subtipo: 'ACTIVO_NO_CORRIENTE',
              valor: 'ACTIVO NO CORRIENTE',
              monto: 0,
              descripcion: activoNoCorriente,
            },
            ],
          },
          {
            tipo: 'PASIVO_PATRIMONIO',
            valor: 'PASIVO + PATRIMONIO',
            monto: 0,
            subtipos: [{
              subtipo: 'PASIVO',
              valor: 'PASIVO',
              monto: 0,
              descripcion: pasivo,
            },
            {
              subtipo: 'PATRIMONIO',
              valor: 'PATRIMONIO',
              monto: 0,
              descripcion: patrimonio,
            },
            ],
          },
        ];
      } else {
        balanceManual = [
          {
            tipo: 'ACTIVO',
            valor: 'ACTIVO',
            monto: 0,
            subtipos: [{
              subtipo: 'ACTIVO_CORRIENTE',
              valor: 'ACTIVO CORRIENTE',
              monto: 0,
              descripcion: [{
                atributo_fijo: 'DISPONIBLE',
                valor: 'DISPONIBLE',
                monto: 0,
              },
              {
                atributo_fijo: 'EXIGIBLE',
                valor: 'EXIGIBLE',
                monto: 0,
              },
              {
                atributo_fijo: 'REALIZABLE',
                valor: 'REALIZABLE',
                monto: 0,
              },
              {
                atributo_fijo: 'OTROS',
                valor: 'OTROS',
                monto: 0,
              },
              ],
            },
            {
              subtipo: 'ACTIVO_NO_CORRIENTE',
              valor: 'ACTIVO NO CORRIENTE',
              monto: 0,
              descripcion: [{
                atributo_fijo: 'ACTIVO_NO_CORRIENTE',
                valor: 'ACTIVO NO CORRIENTE',
                monto: 0,
              },
              {
                atributo_fijo: 'OTROS',
                valor: 'OTROS',
                monto: 0,
              },
              ],
            },
            ],
          },
          {
            tipo: 'PASIVO_PATRIMONIO',
            valor: 'PASIVO + PATRIMONIO',
            monto: 0,
            subtipos: [{
              subtipo: 'PASIVO',
              valor: 'PASIVO',
              monto: 0,
              descripcion: [{
                atributo_fijo: 'PASIVO_CORRIENTE',
                valor: 'PASIVO CORRIENTE',
                monto: 0,
              },
              {
                atributo_fijo: 'PASIVO_NO_CORRIENTE',
                valor: 'PASIVO NO CORRIENTE',
                monto: 0,
              },
              ],
            },
            {
              subtipo: 'PATRIMONIO',
              valor: 'PATRIMONIO',
              monto: 0,
              descripcion: [{
                atributo_fijo: 'CAPITAL',
                valor: 'CAPITAL',
                monto: 0,
              }],
            },
            ],
          },
        ];
      }
      objetoTotal.balance = balanceManual;
      resolve(objetoTotal);
    });
  },

  /**
   * Funcion para retornar el numero de dias anticipados
   * @param tipoSociedad
   * @return dias
   */
  diasAnticipados: (tipoSociedad) => {
    const arrayOpcionesDias = config.app.dias_anticipacion_notificacion;
    for (let i = 0; i < arrayOpcionesDias.length; i += 1) {
      if (arrayOpcionesDias[i].activo && arrayOpcionesDias[i].codigo === tipoSociedad) {
        return arrayOpcionesDias[i].dias;
      }
    }
    return 0;
  },

  /**
   * Funcion que genera el sql para obtener todos los registros de la tabla solicitudes
   * @param nothing
   * @return sql
   */

  generaSql: () => {
    const date = new Date();
    const dia = moment(date).format('YYYY-MM-DD');
    const sql = [];
    const arrayOpcionesDias = config.app.dias_anticipacion_notificacion;
    arrayOpcionesDias.forEach((objeto) => {
      if (objeto.activo) {
        const sqlTmp = `(SELECT dpa, fecha_reserva, clave_tipo_sociedad_empresa, email_solicitud, nombre_empresa, codigo_ticket FROM solicitud WHERE (date (fecha_fin_dia_reserva) - integer '${objeto.dias}') = '${dia}' AND estado = 'RESERVADO' AND clave_tipo_sociedad_empresa = '${objeto.codigo}')`;
        sql.push(sqlTmp);
      }
    });
    return sql.join(' UNION ');
  },

  /**
   * Funcion para adicionar atributos personalizados
   * @param {Object} res Objecto de la consulta del sequelize
   * @return {Object} copyRes Objecto de la consulta modificada del sequelize
   */

  adicionandoOpcionesReporte: (parametro, dpa, res) => {
    return new Promise((resolve, reject) => {
      const copyRes = res;
      const tipoEmpresa = res.clave_tipo_sociedad_empresa;
      const capital = [];
      let opciones = {
        where: {
          clave: {
            $like: `EMPRESA_${tipoEmpresa}%`,
          },
          grupo: 'LABEL_CAPITAL_EMPRESAS_SOCIEDADES',
        },
        attributes: ['clave', 'valor', 'grupo'],
      };

      parametro.findAll(opciones)
        .then((response) => {
          response.forEach((sol) => {
            if (`EMPRESA_${tipoEmpresa}_CAPITAL_SUSCRITO`.indexOf(sol.clave) !== -1) {
              capital.push({
                clave: 'capital_suscrito',
                tipo_capital: sol.valor,
                monto: copyRes.capital_suscrito,
              });
            }
            if (`EMPRESA_${tipoEmpresa}_CAPITAL_PAGADO`.indexOf(sol.clave) !== -1) {
              capital.push({
                clave: 'capital_pagado',
                tipo_capital: sol.valor,
                monto: copyRes.capital_pagado,
              });
            }
            if (`EMPRESA_${tipoEmpresa}_CAPITAL_AUTORIZADO`.indexOf(sol.clave) !== -1) {
              capital.push({
                clave: 'capital_autorizado',
                tipo_capital: sol.valor,
                monto: copyRes.capital_autorizado,
              });
            }
            if (`EMPRESA_${tipoEmpresa}_CAPITAL_ASIGNADO`.indexOf(sol.clave) !== -1) {
              capital.push({
                clave: 'capital_asignado',
                tipo_capital: sol.valor,
                monto: copyRes.capital_asignado,
              });
            }
          });
          delete copyRes.capital_asignado;
          delete copyRes.capital_autorizado;
          delete copyRes.capital_pagado;
          delete copyRes.capital_suscrito;
          copyRes.capital = capital;
          opciones = {
            where: {
              codMunicipio: copyRes.dpa,
            },
            attributes: ['departamento', 'provincia', 'municipio'],
          };
          return dpa.findOne(opciones);
        })
        .then((response) => {
          copyRes.dpa = response;
          const tipoEmp = {
            where: {
              clave: tipoEmpresa,
              grupo: 'EMPRESA',
            },
            attributes: ['clave', 'valor', 'grupo'],
          };
          return parametro.findOne(tipoEmp);
        })
        .then((response) => {
          copyRes.clave_tipo_sociedad_empresa = response.valor.toUpperCase();
          if (tipoEmpresa === '009') {
            return true;
          } else {
            const gestionFiscal = {
              where: {
                clave: copyRes.clave_gestion_fiscal,
                grupo: 'GESTION_FISCAL',
              },
              attributes: ['clave', 'valor', 'grupo'],
            };
            return parametro.findOne(gestionFiscal);
          }
        })
        .then((response) => {
          copyRes.clave_gestion_fiscal = (tipoEmpresa === '009') ? '' : response.valor.toUpperCase();
          resolve(copyRes);
        })
        .catch((err) => {
          reject(new Error(err.message));
        });
    });
  },

  /**
   * Funcion para retorna el valor del capital
   * @param {String} atributo Atributo del tipo de capital
   * @return {Integer} valor monto del capital
   */

  valorCapital: (atributo, body) => {
    if (body.capital && body.capital.length > 0) {
      const bloqueCapital = body.capital;
      for (let i = 0; i < bloqueCapital.length; i += 1) {
        if (bloqueCapital[i].clave.trim() === atributo.trim()) {
          return bloqueCapital[i].monto;
        }
      }
    }
    return 0;
  },

  /**
   * Function para obtener la ubicacion a partir de la latitud y longitud
   * @param {Object} datos Este datos es el req.body
   * @return {String} atributo transformado
   */

  obtenerGeoreferenciacion: (datos) => {
    if (datos) {
      return ngeohash.encode(datos.latitud, datos.longitud);
    }
    return 0;
  },

  /**
   * Function para convertir las respuesta a String verificando si es Array o no
   * @param {Object} datos Este datos es el req.body[atributo]
   * @return {String} atributo transformado y concatenado con comas
   */

  responseToString: (datos) => {
    const obj = [];
    if (Array.isArray(datos)) {
      datos.forEach((data) => {
        if (data.name) obj.push(data.name);
      });
    } else {
      obj.push(datos);
    }
    return obj.join(', ');
  },

  // ******************* fin de funciones *************************
};
