// /**
//  *Archivo para realizar pruebas integrales
//  */
// import shortid from 'shortid';

// const request = require('supertest');

// const should = require('should');

// let server;

// require('../../registrarBabel');

// let solicitudRespuesta = '';

// describe('Iniciando el test', () => {

//   before((done) => {
//     server = require('../../../index');
//     done();
//   });

//   // Opciones de peticion para el verbo POST
//   // Nota: Para cada ejecucion de la prueba se deben cambiar los nombres las razones sociales por el buscador.
//   /* it('>>> POST (Objeto) Configurar la constante crear_solicitud segun el modelo solicitud /api/v1/solicitud', (done) => {
//     const crearSolicitud = {
//       email: 'dbarra@agetic.gob.bo',
//       nombre: shortid.generate(),
//       persona: true,
//       tipo_empresa: '002',
//       actividades: [{
//         tipo_actividad: '1',
//         clase: 'R90',
//       }],
//     };

//     request(server)
//       .post('/api/v1/solicitud')
//       .set('Content-Type', 'application/json')
//       .send(crearSolicitud)
//       .expect(201)
//       .end((err, res) => {
//         if (err) return done(err);
//         res.body.datos.should.have.property('id_solicitud');
//         res.body.datos.email_solicitud.should.be.not.null();
//         res.body.datos.email_solicitud.should.be.not.empty();
//         res.body.datos.codigo_ticket.should.be.not.null();
//         res.body.datos.codigo_ticket.should.be.not.empty();
//         res.body.datos.clave_tipo_sociedad_empresa.should.be.not.null();
//         res.body.datos.clave_tipo_sociedad_empresa.should.be.not.empty();
//         solicitudRespuesta = res.body.datos;
//         done();
//       });
//   });
// */
//   // Opciones de peticion para el verbo GET

//  /* it('>>> GET (Lista) Se obtiene una lista completa de /api/v1/solicitud/:codigo_ticket', (done) => {
//     request(server)
//       .get(`/api/v1/solicitud/${solicitudRespuesta.codigo_ticket}`)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         res.body.datos.should.have.property('id_solicitud');
//         res.body.datos.should.have.property('nombre_empresa');
//         res.body.datos.should.have.property('dias_reserva');
//         res.body.datos.should.have.property('codigo_ticket');
//         res.body.datos.should.have.property('clave_tipo_sociedad_empresa');
//         done();
//       });
//   });

//   // Opciones de peticion para el verbo PUT

//   const solicitudModificado = {
//     id_solicitud: solicitudRespuesta.id_solicitud,
//     email_solicitud: solicitudRespuesta.email_solicitud,
//     nombre_empresa: solicitudRespuesta.nombre_empresa,
//     fecha_reserva: '2017-06-16T04:00:00.000Z',
//     dias_reserva: 10,
//     clave_tipo_sociedad_empresa: solicitudRespuesta.clave_tipo_sociedad_empresa,
//     codigo_ticket: solicitudRespuesta.codigo_ticket,
//     clave_gestion_fiscal: '0331',
//     fecha_fin_dia_reserva: '2017-07-03T04:00:00.000Z',
//     objeto_empresa: null,
//     principales_productos_servicios: null,
//     capital: [
//       {
//         clave: 'capital_pagado',
//         tipo_capital: 'Capital Social',
//         monto: '1000',
//       },
//     ],
//     balance: [
//       {
//         tipo: 'ACTIVO',
//         valor: 'Activo',
//         monto: 200,
//         subtipos: [
//           {
//             subtipo: 'ACTIVO_CORRIENTE',
//             valor: 'Activo corriente',
//             monto: 200,
//             descripcion: [
//               {
//                 atributo_fijo: 'DISPONIBLE',
//                 valor: 'DISPONIBLE',
//                 monto: 200,
//               },
//               {
//                 atributo_fijo: 'EXIGIBLE',
//                 valor: 'EXIGIBLE',
//                 monto: 0,
//               },
//               {
//                 atributo_fijo: 'REALIZABLE',
//                 valor: 'REALIZABLE',
//                 monto: 0,
//               },
//               {
//                 atributo_fijo: 'OTROS',
//                 valor: 'OTROS',
//                 monto: 0,
//               },
//             ],
//           },
//           {
//             subtipo: 'ACTIVO_NO_CORRIENTE',
//             valor: 'ACTIVO NO CORRIENTE',
//             monto: 0,
//             descripcion: [
//               {
//                 atributo_fijo: 'ACTIVO_FIJO_N',
//                 valor: 'ACTIVO NO CORRIENTE',
//                 monto: 0,
//               },
//               {
//                 atributo_fijo: 'OTROS',
//                 valor: 'OTROS',
//                 monto: 0,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         tipo: 'PASIVO_PATRIMONIO',
//         valor: 'PASIVO + PATRIMONIO',
//         monto: 0,
//         subtipos: [
//           {
//             subtipo: 'PASIVO',
//             valor: 'PASIVO',
//             monto: 0,
//             descripcion: [
//               {
//                 atributo_fijo: 'PASIVO_CORRIENTE',
//                 valor: 'PASIVO CORRIENTE',
//                 monto: 0,
//               },
//               {
//                 atributo_fijo: 'PASIVO_NO_CORRIENTE',
//                 valor: 'PASIVO NO CORRIENTE',
//                 monto: 0,
//               },
//             ],
//           },
//           {
//             subtipo: 'PATRIMONIO',
//             valor: 'PATRIMONIO',
//             monto: 0,
//             descripcion: [
//               {
//                 atributo_fijo: 'CAPITAL',
//                 valor: 'CAPITAL',
//                 monto: 0,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     telefono: [
//       {
//         name: 123123213,
//       },
//     ],
//     fax: [
//       {
//         name: 123123123,
//       },
//     ],
//     correo_electronico: [
//       {
//         name: 'asdasd@com.com',
//       },
//     ],
//     telefono_contacto: [
//       {
//         name: 12312312321,
//       },
//     ],
//     correo_area_comercial: [
//       {
//         name: 'asdasdasd@com.cm',
//       },
//     ],
//     representantes: [
//       {
//         persona: {
//           nacionalidad: {
//             clave: 'AFG',
//             valor: 'Afganistán',
//             grupo: 'PAISES',
//           },
//           documento_identidad: 123123123,
//           fecha_nacimiento: '0111-01-01T04:00:00.000Z',
//           genero: 'M',
//           primer_apellido: 'asdasd',
//           segundo_apellido: 'asdasd',
//           nombres: 'aaaas',
//         },
//         rol_empresa: {
//           clave: 2170,
//           valor: 'Representante Legal',
//           grupo: 'ROLES_EMPRESARIALES',
//         },
//         valido: false,
//         tipo_documento: {
//           clave: 'PASS',
//           valor: 'Pasaporte',
//           grupo: 'TIPO_DOCUMENTO_IDENTIDAD',
//         },
//       },
//     ],
//     empresa: 'Sociedad de Responsabilidad Limitada',
//     dpa: '080102',
//     geohash: {
//       latitud: -16.833461100339775,
//       longitud: -62.89947509765626,
//     },
//     zona: 'asdasd',
//     calle_avenida: 'asdasd',
//     numero: 123123,
//     referencia: 'asdasd',
//     manzana: 'asdasd',
//     edificio: 'asd',
//     piso: 12321,
//     unidad_vecinal: 'asdasd',
//     numero_oficina: 13213,
//     numero_casilla_postal: 12321,
//     persona_contacto: 'asdasdasd',
//     fecha_inicio_apertura: '2017-06-08T04:00:00.000Z',
//     fecha_fin_apertura: '2017-06-11T04:00:00.000Z',
//     aceptar: true,
//   }; */

//  /* it('>>> PUT (Objecto) Modificar la constante solicitudModificado para que sea correcto /api/v1/solicitud', (done) => {
//     request(server)
//       .put(`/api/v1/solicitud/${solicitudRespuesta.id_solicitud}`)
//       .set('Content-Type', 'application/json')
//       .send(solicitudModificado)
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         res.body.datos.should.be.not.null();
//         done();
//       });
//   }); */
// });
