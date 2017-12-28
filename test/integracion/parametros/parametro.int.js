
// /**
// *Archivo para realizar pruebas integrales
// */

// const request = require('supertest');
// const should = require('should');

// let seccionRespuesta = '';
// let divisionRespuesta = '';
// let grupoRespuesta = '';
// let server;
// global.server = {};
// require('babel-core/register')({
//   ignore: /node_modules/,
// });

// console.log('************************ se esta ejecutando el archivo parametro.js ***********************');
// describe('Iniciando el test', () => {
//   before((done) => {
//     server = require('../../../index');
//     done();
//   });

// // Opciones de peticion para el verbo GET

//   it('>>> GET (Lista) Se obtiene una lista completa de /api/v1/parametro', (done) => {
//     request(server)
//     .get('/api/v1/parametro')
//     .expect(200)
//     .end((err, res) => {
//       if (err) return done(err);
//       res.body.datos.count.should.be.above(0);
//       res.body.datos.rows.length.should.be.above(0);
//       res.body.datos.rows.forEach((parametros) => {
//         parametros.clave.should.be.not.null();
//         parametros.clave.should.be.not.empty();
//         parametros.valor.should.be.not.null();
//         parametros.valor.should.be.not.empty();
//       });
//       done();
//     });
//   });
//   // Obteniendo secciones

//   it('>>> GET (Lista) Se obtiene una lista completa de /api/v1/parametro/ciiu/seccion', (done) => {
//     request(server)
//     .get('/api/v1/parametro/ciiu/seccion')
//     .expect(200)
//     .end((err, res) => {
//       if (err) return done(err);
//       res.body.datos.count.should.be.above(0);
//       res.body.datos.rows.length.should.be.above(0);
//       res.body.datos.rows.forEach((parametros) => {
//         parametros.clave.should.be.not.null();
//         parametros.clave.should.be.not.empty();
//         parametros.valor.should.be.not.null();
//         parametros.valor.should.be.not.empty();
//         seccionRespuesta = parametros.clave;
//       });
//       done();
//     });
//   });
//   // Obteniendo divisiones

//   it('>>> GET (Lista) Se obtiene una lista completa de /api/v1/parametro/ciiu/seccion/:id_seccion/division', (done) => {
//     request(server)
//     .get(`/api/v1/parametro/ciiu/seccion/${seccionRespuesta}/division`)
//     .expect(200)
//     .end((err, res) => {
//       if (err) return done(err);
//       res.body.datos.count.should.be.above(0);
//       res.body.datos.rows.length.should.be.above(0);
//       res.body.datos.rows.forEach((parametros) => {
//         parametros.clave.should.be.not.null();
//         parametros.clave.should.be.not.empty();
//         parametros.valor.should.be.not.null();
//         parametros.valor.should.be.not.empty();
//         divisionRespuesta = parametros.clave;
//       });
//       done();
//     });
//   });
//   // Obteniendo grupos

//   it('>>> GET (Lista) Se obtiene una lista completa de /api/v1/parametro/ciiu/seccion/:id_seccion/division/:id_division/grupo', (done) => {
//     request(server)
//     .get(`/api/v1/parametro/ciiu/seccion/${seccionRespuesta}/division/${divisionRespuesta}/grupo`)
//     .expect(200)
//     .end((err, res) => {
//       if (err) return done(err);
//       res.body.datos.count.should.be.above(0);
//       res.body.datos.rows.length.should.be.above(0);
//       res.body.datos.rows.forEach((parametros) => {
//         parametros.clave.should.be.not.null();
//         parametros.clave.should.be.not.empty();
//         parametros.valor.should.be.not.null();
//         parametros.valor.should.be.not.empty();
//         grupoRespuesta = parametros.clave;
//       })
//       done();
//     });
//   });
//   // Obteniendo clases

//   it('>>> GET (Lista) Se obtiene una lista completa de /api/v1/parametro/ciiu/seccion/:id_seccion/division/:id_division/grupo/:id_grupo/clase', (done) => {
//     request(server)
//     .get(`/api/v1/parametro/ciiu/seccion/${seccionRespuesta}/division/${divisionRespuesta}/grupo/${grupoRespuesta}/clase`)
//     .expect(200)
//     .end((err, res) => {
//       if (err) return done(err);
//       res.body.datos.count.should.be.above(0);
//       res.body.datos.rows.length.should.be.above(0);
//       res.body.datos.rows.forEach((parametros) => {
//         parametros.clave.should.be.not.null();
//         parametros.clave.should.be.not.empty();
//         parametros.valor.should.be.not.null();
//         parametros.valor.should.be.not.empty();
//       });
//       done();
//     });
//   });
// });
