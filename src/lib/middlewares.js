import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jwt-simple';
import helmet from 'helmet';
import logger from './logger';
// Importa la libreria jwt-simple.
const config = require('konfig')();

module.exports = (app) => {
  // Constante que almacena la congifuracion.
  const configuracion = app.src.config.config;
  // Establece el puerto
  app.set('port', configuracion.puerto);
  // Establece la llave secreta
  app.set('secretAGETIC', configuracion.jwtSecret);
  // Realiza el uso de morgan para generar logs.
  app.use(morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  }));
  app.use(helmet());
  // //Showtests
  app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' &&
      req.query.test === '1';
    next();
  });
  // Realiza el uso y configuracion de cors.
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: true,
    headers: 'Cache-Control, Pragma, Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    // "Cache-Control": "private, no-cache, no-store, must-revalidate",
    // "Expires": "-1",
    // "Pragma": "no-cache",
  }));

  // const listaDominios = config.app.dominios.urls;
  // const corsOptions = {
  //   origin: function (origin, callback) {
  //     if (listaDominios.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('No se puede acceder al sistema, restringido por permisos'))
  //     }
  //   }
  // }

  // Realiza el uso de "bodyParser" para la recepcion de Json como body.
  app.use(bodyParser.json());

  // Realiza el uso de la autenticacion de passport.
  app.use(app.src.auth.initialize());

  // eliminar ids en caso de que lo envien por si quieren hacer sqlinjection
  // app.use((req, res, next) => {
  //     delete req.body.id;
  //     next();
  // });
  // para generar un espacio publico, archivos estaticos
  app.use(express.static('public'));

  // app.use(express.static(__dirname + '/public'));
  // verifica si hay errores en el formato json
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      res.status(400).json({
        mensaje: 'Problemas en el formato JSON',
      });
    } else {
      res.status(500).send('Error interno!');
    }
  });
  // Autenticación -- JWTOKEN
  // app.use('/api', cors(corsOptions), (req, res, next) => {
  app.use('/api', (req, res, next) => {
    if (req.method !== 'OPTIONS') {
      try {
        const RolRuta = app.src.db.models.rol_ruta;
        const Ruta = app.src.db.models.ruta;
        // Middlewares modificado para las rutas de actualizacion de estado
        if (req.path.includes('/autenticar')) {
          // check header or url parameters or post parameters for token
          const token = req.headers.authorization.split(' ')[1];
          // decode token
          if (token && req.headers.authorization) {
            // verifies secret and checks exp
            const tokenDecoded = jwt.decode(token, app.get('secretAGETIC'));
            if (tokenDecoded) {
              RolRuta.findAll({
                attributes: ['method_get', 'method_post', 'method_put', 'method_delete'],
                where: {
                  fid_rol: tokenDecoded.id_rol,
                  estado: 'ACTIVO',
                },
                include: [{
                  model: Ruta,
                  as: 'ruta',
                  attributes: ['ruta'],
                  where: {
                    estado: 'ACTIVO',
                  },
                }],
              }).then((rolesRutas) => {
                let rutaPermitida = false;
                for (let i = 0; i < rolesRutas.length; i += 1) {
                  const ruta = rolesRutas[i];
                  if (req.originalUrl === ruta.ruta.ruta ||
                    req.originalUrl.substring(0, req.originalUrl.length - 1) === ruta.ruta.ruta ||
                    req.originalUrl.indexOf(ruta.ruta.ruta) >= 0) {
                    if ((req.method === 'GET' && ruta.method_get) ||
                      (req.method === 'POST' && ruta.method_post) ||
                      (req.method === 'PUT' && ruta.method_put) ||
                      (req.method === 'DELETE' && ruta.method_delete)) {
                      rutaPermitida = true;
                      break;
                    }
                  }
                }
                if (rutaPermitida) {
                  // Insertando los datos para auditoria en el req.body
                  req.body.audit_usuario = {
                    id_usuario: tokenDecoded.id_usuario,
                    id_persona: tokenDecoded.id_persona,
                    id_rol: tokenDecoded.id_rol,
                    usuario: tokenDecoded.usuario,
                  };
                  next();
                } else {
                  return res.status(403).send({
                    finalizado: false,
                    mensaje: 'Usted no tiene acceso a dichos recursos.',
                    datos: {},
                  });
                }
              })
              .catch(() => {
                res.status(403).send({
                  finalizado: false,
                  mensaje: 'Falló la autenticación del token.',
                  datos: {},
                });
              });
            } else {
              return res.status(403).send({
                finalizado: false,
                mensaje: 'Falló la autenticación del token.',
                datos: {},
              });
            }
          } else {
            return res.status(403).send({
              finalizado: false,
              mensaje: 'Falló la autenticación.',
              datos: {},
            });
          }
        } else {
          next();
        }
      } catch (err) {
        return res.status(403).send({
          finalizado: false,
          mensaje: 'Usted no tiene acceso a dichos recursos.',
          datos: {},
        });
      }
    } else {
      next();
    }
  });
  // Autenticación -- JWTOKEN - FIN
};
