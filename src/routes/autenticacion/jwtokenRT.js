import jwt from 'jwt-simple';
import crypto from 'crypto';

module.exports = (app) => {
  const Usuario = app.src.db.models.usuario;
  const Persona = app.src.db.models.persona;
  const UsuarioRol = app.src.db.models.usuario_rol;
  const Rol = app.src.db.models.rol;
  const RolMenu = app.src.db.models.rol_menu;
  const Menu = app.src.db.models.menu;


  /**
   * @function obtenerDatos
   * @param {string} email
   * @param {string} password
   * @param {integer} auditUsuario
   * @param {integer} idRolSolicitado
   */

  const obtenerDatos = (email, password, auditUsuario, idRolSolicitado) => {
    return new Promise((resolve, reject) => {
      let usuario;
      let rol;
      let rolDevuelto;
      let condiciones = {};
      const rolesAdicionales = [];
      if (auditUsuario && auditUsuario.id_usuario) {
        condiciones = {
          id_usuario: auditUsuario.id_usuario,
          estado: 'ACTIVO',
        };
      } else {
        condiciones = {
          usuario: email,
          contrasena: password,
          estado: 'ACTIVO',
        };
      }

      Usuario.findOne({
        where: condiciones,
        include: [{
          model: Persona,
          as: 'persona',
          attributes: ['id_persona', 'nombres', 'primer_apellido', 'segundo_apellido'],
        }],
      })
      .then((user) => {
        if (user && user.id_usuario) {
          usuario = user;
          return UsuarioRol.findAll({
            attributes: ['fid_rol'],
            where: {
              fid_usuario: usuario.id_usuario,
              estado: 'ACTIVO',
            },
            include: [{
              model: Rol,
              as: 'rol',
              attributes: ['id_rol', 'nombre', 'peso'],
              order: [
                ['peso', 'ASC'],
              ],
            }],
          });
        } else {
          reject(new Error('Los datos de acceso son incorrectos.'));
        }
      })
      .then((roles) => {
        if (roles.length > 0) {
          if (!idRolSolicitado) {
            let rolDefecto = roles[0];
            roles.forEach((r) => {
              if (r.rol.peso < rolDefecto.rol.peso) {
                rolDefecto = r;
              }
            });
            roles.forEach((r) => {
              if (r.fid_rol !== rolDefecto.fid_rol) {
                rolesAdicionales.push(r.rol);
              }
            });
            rolDevuelto = rolDefecto;
            return rolDevuelto;
          } else {
            roles.forEach((r) => {
              if (r.fid_rol === idRolSolicitado) {
                rolDevuelto = r;
              } else {
                rolesAdicionales.push(r.rol);
              }
            });
            if (!rolDevuelto || !rolDevuelto.fid_rol) {
              reject(new Error('No cuenta con privilegios para el rol solicitado.'));
            }
            return rolDevuelto;
          }
        } else {
          reject(new Error('El usuario no tiene asignado ningún rol.'));
        }
      })
        .then((role) => {
          rol = role;
          return RolMenu.findAll({
            attributes: ['method_get', 'method_post', 'method_put', 'method_delete'],
            where: {
              fid_rol: rol.fid_rol,
              estado: 'ACTIVO',
            },
            include: [{
              model: Menu,
              as: 'menu',
              attributes: [
                ['nombre', 'label'],
                ['ruta', 'url'],
                ['icono', 'icon'], 'fid_menu_padre',
              ],
              include: [{
                model: Menu,
                as: 'menu_padre',
                attributes: ['id_menu', ['nombre', 'label'],
                  ['ruta', 'url'],
                  ['icono', 'icon'],
                ],
              }],
            }],
          });
        })
        .then((rolesMenusRes) => {
          let menuEntrar1 = null;
          const menusDevolverAux = [];
          for (let rm = 0; rm < rolesMenusRes.length; rm += 1) {
            // Obteniendo al padre
            const padre = rolesMenusRes[rm].menu.menu_padre;
            const objPadre = JSON.stringify(padre);
            let existe = false;
            for (let i = 0; i < menusDevolverAux.length; i += 1) {
              if (JSON.stringify(menusDevolverAux[i]) === objPadre) {
                existe = true;
                break;
              }
            }
            if (!existe) {
              menusDevolverAux.push(padre);
            }
          }
          const menusDevolver = [];
          for (let padreI = 0; padreI < menusDevolverAux.length; padreI += 1) {
            const padre = JSON.parse(JSON.stringify(menusDevolverAux[padreI]));
            padre.submenu = [];
            if (padre.url && !menuEntrar1) {
              menuEntrar1 = `/${padre.url}`;
            }
            for (let rmI = 0; rmI < rolesMenusRes.length; rmI += 1) {
              if (padre.id_menu === rolesMenusRes[rmI].menu.fid_menu_padre) {
                const hijo = JSON.parse(JSON.stringify(rolesMenusRes[rmI].menu));
                delete hijo.menu_padre;
                hijo.permissions = {};
                hijo.permissions.read = rolesMenusRes[rmI].method_get;
                hijo.permissions.create = rolesMenusRes[rmI].method_post;
                hijo.permissions.update = rolesMenusRes[rmI].method_put;
                hijo.permissions.delete = rolesMenusRes[rmI].method_delete;
                padre.submenu.push(hijo);
                if (!menuEntrar1) {
                  menuEntrar1 = `/${hijo.url}`;
                }
              }
            }
            menusDevolver.push(padre);
          }
          // Aqui buscar al Menu de usuario
          const ven = new Date();
          ven.setDate(ven.getDate() + 1);
          const payload = {
            id_usuario: usuario.id_usuario,
            usuario: usuario.usuario,
            id_rol: rol ? rol.fid_rol : 0,
            id_persona: usuario.persona.id_persona,
            vencimiento: ven,
          };
          const usuarioEnviar = {
            id_usuario: usuario.id_usuario,
            nombres: usuario.persona.nombres,
            apellidos: `${usuario.persona.primer_apellido} ${usuario.persona.segundo_apellido}`,
            email: usuario.email,
            usuario: usuario.usuario,
            rol: rolDevuelto.rol.nombre,
            estado: usuario.estado,
            roles: rolesAdicionales,
          };
          const resultado = {
            finalizado: true,
            mensaje: 'Obtención de datos exitoso.',
            token: jwt.encode(payload, app.settings.secretAGETIC),
            datos: {
              usuario: usuarioEnviar,
              menu: menusDevolver,
              menuEntrar: menuEntrar1,
            },
          };
          resolve(resultado);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  };

  app.post('/autenticar', (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.status(412).json({
        finalizado: false,
        mensaje: 'Los datos Usuario y Contraseña son obligatorios.',
        datos: {},
      });
    }
    const email = req.body.username;
    const contrasena = req.body.password;
    const password = crypto.createHash('md5').update(contrasena).digest('hex');

    obtenerDatos(email, password)
      .then((respuesta) => {
        res.status(200).json(respuesta);
      })
      .catch((error) => {
        res.status(412).json({
          finalizado: false,
          mensaje: error,
          datos: {},
        });
      });
  });
};
