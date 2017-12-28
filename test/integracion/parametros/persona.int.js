// /**
// * Archivo para realizar pruebas integrales
// */

//   const request = require('supertest');
//   const should = require('should');

//   let objetoConsumir = '';
//   let server;
//   global.server = {};
//   require('../../registrarBabel');

//   console.log('************************ se esta ejecutando el archivo persona.js *********************');

//   describe('Iniciando el test', () => {
//     before((done) => {
//       server = require('../../../index');
//       done();
//     });

//     // Opciones de peticion para el verbo POST
//     // Peticion a la ruta de /api/v1/parametro/persona/segip con parametrs erroneos

//     it('>>> Respuesta a (POST) /api/v1/parametro/persona/segip con un json correcto', (done) => {
//       objetoConsumir = {
//         documento_identidad: '4168465',
//         fecha_nacimiento: '10/02/1989',
//       };
//       request(server)
//       .post('/api/v1/parametro/persona/segip')
//       .set('Content-Type', 'application/json')
//       .send(objetoConsumir)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         res.body.datos.should.be.json;
//         res.body.datos.should.have.property('documento_identidad');
//         res.body.datos.should.have.property('complemento');
//         res.body.datos.should.have.property('nombres');
//         res.body.datos.should.have.property('primer_apellido');
//         res.body.datos.should.have.property('segundo_apellido');
//         res.body.datos.should.have.property('fecha_nacimiento');
//         res.body.datos.documento_identidad.should.be.not.null();
//         res.body.datos.nombres.should.be.not.null();
//         res.body.datos.fecha_nacimiento.should.be.not.null();
//         done();
//       });
//     });


//     // Peticion a la ruta /api/v1/parametro/persona/segip/solicitante cuando se
//     // trata de adicionar un usuario de SEGIP pero con un json erroneo

//     it('>>> Respuesta a (POST) /api/v1/parametro/persona/segip/solicitante con un json erroneo', (done) => {
//       objetoConsumir = {
//         cedula_identidad: '',
//         fecha_nacimiento: '',
//       };
//       request(server)
//         .post('/api/v1/parametro/persona/segip/solicitante')
//         .set('Content-Type', 'application/json')
//         .send(objetoConsumir)
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           res.body.datos.should.be.json;
//           done();
//         });
//     });

//     // Peticion a la ruta /api/v1/parametro/persona/segip/solicitante cuando se
//     // trata de adicionar un usuario de SEGIP pero con un json correcto

//     it('>>> Respuesta a (POST) /api/v1/parametro/persona/segip/solicitante con un json correcto', (done) => {
//       objetoConsumir = {
//         documento_identidad: '4168465',
//         fecha_nacimiento: '10/02/1989',
//       };
//       request(server)
//         .post('/api/v1/parametro/persona/segip/solicitante')
//         .set('Content-Type', 'application/json')
//         .send(objetoConsumir)
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           res.body.datos.should.be.not.null();
//           res.body.datos.should.be.json;
//           res.body.datos.should.have.property('id_persona');
//           res.body.datos.should.have.property('documento_identidad');
//           res.body.datos.should.have.property('complemento');
//           res.body.datos.should.have.property('fecha_nacimiento');
//           res.body.datos.should.have.property('nombres');
//           res.body.datos.should.have.property('primer_apellido');
//           res.body.datos.should.have.property('segundo_apellido');
//           res.body.datos.should.have.property('nacionalidad');
//           res.body.datos.should.have.property('tipo_documento_identidad');
//           res.body.datos.id_persona.should.be.not.null();
//           res.body.datos.id_persona.should.be.not.NaN();
//           res.body.datos.documento_identidad.should.be.not.null();
//           res.body.datos.nombres.should.be.not.null();
//           res.body.datos.primer_apellido.should.be.not.null();
//           done();
//         });
//     });

//   // Peticion a la ruta /api/v1/parametro/persona/segip/solicitante cuando se
//   // ya existe un registro con ese documento de identidad almacenada en la base de datos

//     it('>>> Respuesta a (POST) /api/v1/parametro/persona/segip/solicitante con un json correcto', (done) => {
//       objetoConsumir = {
//         documento_identidad: '4168465',
//         fecha_nacimiento: '10/02/1989',
//       };

//       request(server)
//         .post('/api/v1/parametro/persona/segip/solicitante')
//         .set('Content-Type', 'application/json')
//         .send(objetoConsumir)
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           res.body.datos.should.be.not.null();
//           res.body.datos.should.be.json;
//           res.body.datos.should.have.property('id_persona');
//           res.body.datos.should.have.property('documento_identidad');
//           res.body.datos.should.have.property('complemento');
//           res.body.datos.should.have.property('fecha_nacimiento');
//           res.body.datos.should.have.property('nombres');
//           res.body.datos.should.have.property('primer_apellido');
//           res.body.datos.should.have.property('segundo_apellido');
//           res.body.datos.should.have.property('nacionalidad');
//           res.body.datos.id_persona.should.be.not.null();
//           res.body.datos.id_persona.should.be.not.NaN();
//           res.body.datos.documento_identidad.should.be.not.null();
//           res.body.datos.nombres.should.be.not.null();
//           res.body.datos.primer_apellido.should.be.not.null();
//           done();
//         });
//     });
//   });
