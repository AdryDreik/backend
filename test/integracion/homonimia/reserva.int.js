const request = require('supertest');
const should = require('should');
var assert = require('assert');

let server;
global.server = {};

require('babel-core/register')({
    ignore: /node_modules/,
});
require('babel-polyfill');

describe('Iniciando el test', (done) => {
    before((done) => {
        server = require('../../../index');
        done();
    });

    console.log('************************ se esta ejecutando el archivo reserva.js (Test de Integracion) ***********************');

    it('POST::  cemento soboce (Reservado) nombre no valido', (done) => {
        const obj2 = {
            "nombre": "abril de cielo",
            "razonSocial": "abril de cielo",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "52102",
            "objetoSocial": "abarrotes abril"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: abarrotes abril de cielo (Utiliza palabras genericas) nombre no valido', (done) => {
        const obj = {
            "nombre": "abril de cielo",
            "razonSocial": "abril de cielo",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "52102",
            "objetoSocial": "abarrotes abril"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: empresa de telefonia ENTELEQUI nombre valido', (done) => {
        const obj = {
            "nombre": "ENTELEQUI",
            "razonSocial": "ENTELEQUI",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "61900",
            "objetoSocial": "empresa de telefonia"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                ///assert.equal(result, true, 'No es Homonimia');
                done();
            });
    });

    it('POST :: empresa azucarera azucar bolivia (El nombre no puede ser utilizado.) nombre no valido', (done) => {
        const obj = {
            "nombre": "azucar bolivia",
            "razonSocial": "azucar bolivia",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10721",
            "objetoSocial": "empresa azucarera"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: empresa de bebidas SALVIETTI DEL SUR (El nombre no puede ser utilizado.) nombre no valido', (done) => {
        const obj = {
            "nombre": "salvietti del sur",
            "razonSocial": "salvietti del sur",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "11041",
            "objetoSocial": "empresa de bebidas"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                assert.ifError(result)
                done();
            });
    });

    it('POST :: empresa de bebidas SALVIETY DEL SUR (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "salviety del sur",
            "razonSocial": "salviety del sur",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "11041",
            "objetoSocial": "empresa de bebidas"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: EMPRESA DE VINO VINOS&VINOS (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "vinos&vinos",
            "razonSocial": "vinos&vinos",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "11021",
            "objetoSocial": "empresa de vino y vino"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                done();
            });
    });

    it('POST :: EMPRESA DE VINO ACTIVIDAD (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "ACTIVIDAD",
            "razonSocial": "ACTIVIDAD",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "11021",
            "objetoSocial": "empresa de vino y vino"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                done();
            });
    });

    it('POST :: EMPRESA DE EMBUTIDOS TORRITO(El nombre no puede ser utilizado.) nombre no valido', (done) => {
        const obj = {
            "nombre": "torrito",
            "razonSocial": "torrito",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10106",
            "objetoSocial": "EMPRESA DE EMBUTIDOS"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: DROGERIA YNTY (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "ynty",
            "razonSocial": "ynty",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "21000",
            "objetoSocial": "drogeria"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: FARMACIA COPACABANA (palabras genericas.) nombre no valido', (done) => {
        const obj = {
            "nombre": "copacabana",
            "razonSocial": "copacabana",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "47731",
            "objetoSocial": "farmacia"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: EMPRESA PAN CASERO  (El nombre NO puede ser utilizado.) nombre NO valido', (done) => {
        const obj = {
            "nombre": "pan casero",
            "razonSocial": "pan casero",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10719",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: EMPRESA PAN CASERO 20  (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "pan casero 20",
            "razonSocial": "pan casero 20",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10719",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                done();
            });
    });

    it('POST :: EMPRESA EL DON CASERO (El nombre NO puede ser utilizado.) nombre NO valido', (done) => {
        const obj = {
            "nombre": "el don casero",
            "razonSocial": "el don casero",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10719",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    // ---------
    it('POST :: EMPRESA siglo 20 & x (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "siglo 20 & x",
            "razonSocial": "siglo 20 & x",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10733",
            "objetoSocial": "empresa siglo xxi"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                done();
            });
    });

    it('POST :: EMPRESA  CENTERARIO Y "100&C" (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "centenario y \"100&c\"",
            "razonSocial": "centenario y \"100&c\"",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "41000",
            "objetoSocial": "empresa contructora"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == false);
                done();
            });
    });

    it('POST :: EMPRESA  "D & M" (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "D & M",
            "razonSocial": "D & M",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "41000",
            "objetoSocial": "empresa contructora"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                done();
            });
    });

    it('POST :: EMPRESA DURALIT (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "duralit",
            "razonSocial": "duralit",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "41000",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

    it('POST :: EMPRESA  Alianza Vida (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "Alianza Vida",
            "razonSocial": "Alianza Vida",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "65110",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

    it('POST :: EMPRESA  Tahuamanu (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "Tahuamanu",
            "razonSocial": "Tahuamanu",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10798",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

    it('POST :: La Vitalicia (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "La Vitalicia",
            "razonSocial": "La Vitalicia",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "65110",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

    it('POST :: La Vitalicia (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "Saguapac",
            "razonSocial": "Saguapac",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "36000",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

    it('POST :: pil&pil-l (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "pil&pil-l",
            "razonSocial": "pil&pil-l",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10501",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

    it('POST :: La Vitalicia (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "Saguapac",
            "razonSocial": "Saguapac",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "36000",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

    it('POST :: pil&pil-l (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "pil&pil-l",
            "razonSocial": "pil&pil-l",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "10501",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

    it('POST ::tijoll ll (El nombre puede ser utilizado.) nombre valido', (done) => {
        const obj = {
            "nombre": "tijoll ll",
            "razonSocial": "tijoll ll",
            "tipo_empresa": {
                "clave": "001",
                "valor": "Empresa Unipersonal o Comerciante Individual",
                "grupo": "EMPRESA"
            },
            "persona": false,
            "ciiu": "61100",
            "objetoSocial": "empresa"
        }
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                let result = res.body.nombreValido;
                assert(res.body.nombreValido == true);
                assert.equal(result, true, 'No es Homonimia');

                done();
            });
    });

});

describe('realizando test deveriamos darnos falso por existir homonimia ', () => {
    const query100 = {
        "nombre": "arbol",
        "razonSocial": "arbol",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "47922",
        "objetoSocial": "comercio"
    }
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});

describe('realizando test deveria darnos false por ser genericas ', () => {
    const query100 = {
        "nombre": "capital social",
        "razonSocial": "capital social",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "1122",
        "objetoSocial": "comercio"
    }
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});

describe('realizando test deveriamos darnos true por ser nombre valido', () => {
    const query100 = {
        "nombre": "capital social yayawasy",
        "razonSocial": "capital social yayawasy",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "1122",
        "objetoSocial": "comercio"
    }

    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});

describe('realizando test deveriamos darnos true por ser nombre valido', () => {
    const query100 = {
        "nombre": "farmacia sococe",
        "razonSocial": "farmacia sococe",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "47731",
        "objetoSocial": "comercializacion"
    }

    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});




describe('realizando test deveriamos darnos true por ser nombre valido', () => {
    const query100 = {
        "nombre": "la española",
        "razonSocial": "la española",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "11041",
        "objetoSocial": "bebidas"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('realizando test deveriamos darnos false por ser nombre con palabras genericas', () => {
    const query100 = {
        "nombre": "empresa de telecomunicaciones entel",
        "razonSocial": "empresa de telecomunicaciones entel",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "61200",
        "objetoSocial": "servicios"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});


describe('realizando test deveriamos darnos false por ser nombre no valido', () => {
    const query100 = {
        "nombre": "la cascada",
        "razonSocial": "la cascada",
        "tipo_empresa": {
            "clave": "002",
            "valor": "Sociedad de Responsabilidad Limitada",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "11041",
        "objetoSocial": "fabricacion bebidas"
    }
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});


describe('realizando test deveriamos darnos true por ser nombre valido', () => {
    const query100 = {
        "nombre": "mutual la segunda",
        "razonSocial": "mutual la segunda",
        "tipo_empresa": {
            "clave": "009",
            "valor": "Entidad Financiera de Vivienda",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "64193",
        "objetoSocial": "creditos"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('realizando test deveriamos darnos false por ser nombre existente', () => {
    const query100 = {
        "nombre": "mutun",
        "razonSocial": "mutun",
        "tipo_empresa": {
            "clave": "008",
            "valor": "Sociedad en Comandita por Acciones",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "7100",
        "objetoSocial": "explotacion minerales"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});


describe('realizando test deveriamos darnos false por ser nombre ya existente', () => {
    const query100 = {
        "nombre": "pollos copacabana",
        "razonSocial": "pollos copacabana",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "56111",
        "objetoSocial": "venta comida"
    }
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});





















describe('realizando test deveriamos darnos true por ser nombre valido', () => {
    const query100 = {
        "nombre": "firma de abogados siglo XX",
        "razonSocial": "firma de abogados siglo XX",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "69100",
        "objetoSocial": "servicios juridicos"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});

describe('realizando test usando caracter & deveria resultar true al ser nombre valido', () => {
    const query100 = {
        "nombre": "BOLET & TERRERO Y ZAPATA HNOS S.R.L.",
        "razonSocial": "BOLET & TERRERO Y ZAPATA HNOS S.R.L.",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "69100",
        "objetoSocial": "servicios juridicos"
    }
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('realizando test usando caracter & deveria resutar false al ser existente el nombre', () => {
    const query100 = {
        "nombre": "pil andina & perla andina",
        "razonSocial": "pil andina & perla andina",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "10501",
        "objetoSocial": "elaboracion deribados de leche"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});


describe('realizando test usando caracter resultante false por existeir dicha empresa', () => {
    const query100 = {
        "nombre": "Christie's Jewellers S.R.L",
        "razonSocial": "Christie's Jewellers S.R.L",
        "tipo_empresa": {
            "clave": "008",
            "valor": "Sociedad en Comandita por Acciones",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "46454",
        "objetoSocial": "joyas"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});


describe('realizando test usando numeros deveria resultar true al ser nombre valido', () => {
    const query100 = {
        "nombre": "Empresa Eléctrica Corani 1999 S.A.",
        "razonSocial": "Empresa Eléctrica Corani 1999 S.A.",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "35103",
        "objetoSocial": "distribucion electrica"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});



describe('realizando test usando numeros romanos deveria resultar true al ser nombre con palabras genericas', () => {
    const query100 = {
        "nombre": "comidas del siglo XX - xxi",
        "razonSocial": "comidas del siglo XX - xxi",
        "tipo_empresa": {
            "clave": "003",
            "valor": "Sociedad Anónima",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "56112",
        "objetoSocial": "elaboracion alimenticia"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});


describe('realizando test usando caracteres como las comillas dobles y simples', () => {
    const query100 = {
        "nombre": "universidad privada 'el \"pedagogo feliz\"'",
        "razonSocial": "universidad privada 'el \"pedagogo feliz\"'",
        "tipo_empresa": {
            "clave": "002",
            "valor": "Sociedad de Responsabilidad Limitada",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "85302",
        "objetoSocial": "enseñanza"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('realizando test no acepta aun siendo una variacion de palabras con el nombre imba', () => {
    const query100 = {
        "nombre": "balanceados de alimentos imba s.r.l.",
        "razonSocial": "balanceados de alimentos imba s.r.l.",
        "tipo_empresa": {
            "clave": "002",
            "valor": "Sociedad de Responsabilidad Limitada",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "10800",
        "objetoSocial": "distribucion productos"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});


describe('realizando test con nombre QUIPUS NO ACEPTA PERO QUIPUS 2 si acepta', () => {
    const query100 = {
        "nombre": "quipus 2",
        "razonSocial": "quipus 2",
        "tipo_empresa": {
            "clave": "002",
            "valor": "Sociedad de Responsabilidad Limitada",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "26200",
        "objetoSocial": "comercio celulares"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('realizando test con nombre fino que acepta sin problemas (no deberia aceptar)', () => {
    const query100 = {
        "nombre": "aceites fino",
        "razonSocial": "aceites fino",
        "tipo_empresa": {
            "clave": "002",
            "valor": "Sociedad de Responsabilidad Limitada",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "10401",
        "objetoSocial": "elaboracion de aceite"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('realizando test con cooperativa ya existente deberia darnos false', () => {
    const query100 = {
        "nombre": "cooperativa san martin de porres santa cruz",
        "razonSocial": "cooperativa san martin de porres santa cruz",
        "tipo_empresa": {
            "clave": "008",
            "valor": "Sociedad en Comandita por Acciones",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "64192",
        "objetoSocial": "creditos"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query100)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});



// ------------------------------------- + --------------------------------------------------------------------------------
describe('::Test de Homonimia::', (done) => {
    const obj1 = {
        "nombre": "CONSTRUCTORA Y CONSULTORA CONSERNO",
        "razonSocial": "CONSTRUCTORA Y CONSULTORA CONSERNO",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "74930",
        "objetoSocial": "consultora de economia"
    };
    it('POST:: CONSTRUCTORA Y CONSULTORA CONSERNO (no Reservado) nombre no valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj1)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj2 = {
        "nombre": "pension la sauceñita",
        "razonSocial": "pension la sauceñita",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "56120",
        "objetoSocial": "comida"
    };
    it('POST:: pension la sauceñita (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj3 = {
        "nombre": "la sauceñita",
        "razonSocial": "la sauceñita",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "56120",
        "objetoSocial": "comida"
    };
    it('POST:: la sauceñita (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj3)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj4 = {
        "nombre": "NOSERING",
        "razonSocial": "NOSERING",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "73100",
        "objetoSocial": "publicidad"
    };
    it('POST:: NOSERING (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj4)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj5 = {
        "nombre": "ELBUENGUSTO",
        "razonSocial": "ELBUENGUSTO",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "56120",
        "objetoSocial": "comida"
    };
    it('POST:: ELBUENGUSTO (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj5)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });

    const obj6 = {
        "nombre": "Inti",
        "razonSocial": "Inti",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "21000",
        "objetoSocial": "medicamento"
    };
    it('POST:: Inti (Reservado) nombre no valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj6)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == false);
                done();
            });
    });

    const obj7 = {
        "nombre": "DELI",
        "razonSocial": "DELI",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "10733",
        "objetoSocial": "comida"
    };
    it('POST:: DELI (Reservado) nombre no valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj7)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == false);
                done();
            });
    });

    const obj8 = {
        "nombre": "lepton solutions",
        "razonSocial": "lepton solutions",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "20299",
        "objetoSocial": "quimico"
    };
    it('POST:: lepton solutions (no Reservado) nombre  valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj8)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });

    const obj9 = {
        "nombre": "qori llajta",
        "razonSocial": "qori llajta",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "55106",
        "objetoSocial": "alojamiento"
    };
    it('POST:: qori llajta (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj9)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });

    const obj10 = {
        "nombre": "SERVICIOS AUTOMOTRIZ  josbed",
        "razonSocial": "SERVICIOS AUTOMOTRIZ  josbed",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "45209",
        "objetoSocial": "servicio"
    };
    it('POST:: SERVICIOS AUTOMOTRIZ  josbed (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj10)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj11 = {
        "nombre": "SERVICIOS AUTOMOTRIZ EN GENERAL JOSBET",
        "razonSocial": "SERVICIOS AUTOMOTRIZ EN GENERAL JOSBET",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "45209",
        "objetoSocial": "servicio"
    };
    it('POST:: SERVICIOS AUTOMOTRIZ EN GENERAL JOSBET (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj11)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj12 = {
        "nombre": "SERVICIOS AUTOMOTRIZ EN GENERAL UN MILLON DE AMIGOS",
        "razonSocial": "SERVICIOS AUTOMOTRIZ EN GENERAL UN MILLON DE AMIGOS",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "45209",
        "objetoSocial": "servicio"
    };
    it('POST:: SERVICIOS AUTOMOTRIZ EN GENERAL UN MILLON DE AMIGOS (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj12)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj13 = {
        "nombre": "SERVICIOS AUTOMOTRIZ EN GENERAL ARLET",
        "razonSocial": "SERVICIOS AUTOMOTRIZ EN GENERAL ARLET",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "45209",
        "objetoSocial": "automotriz"
    };
    it('POST:: SERVICIOS AUTOMOTRIZ EN GENERAL ARLET (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj13)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj14 = {
        "nombre": "KONKER",
        "razonSocial": "KONKER",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "41000",
        "objetoSocial": "casa"
    };
    it('POST:: KONKER (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj14)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj15 = {
        "nombre": "Inti guard",
        "razonSocial": "Inti guard",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "21000",
        "objetoSocial": "medicamento"
    };
    it('POST:: Inti guard (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj15)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });

    const obj16 = {
        "nombre": "qori wasi",
        "razonSocial": "qori wasi",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "47112",
        "objetoSocial": "bebidas"
    };
    it('POST:: qori wasi (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj16)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj17 = {
        "nombre": "SERVICIOS AUTOMOTRIZ LEON DE JUDA",
        "razonSocial": "SERVICIOS AUTOMOTRIZ LEON DE JUDA",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "45209",
        "objetoSocial": "vheiculo"
    };
    it('POST:: SERVICIOS AUTOMOTRIZ LEON DE JUDA (Reservado) nombre no valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj18)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == false);
                done();
            });
    });
    const obj18 = {
        "nombre": "CONSERNO",
        "razonSocial": "CONSERNO",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "71101",
        "objetoSocial": "arquitectura"
    };
    it('POST:: CONSERNO (Reservado) nombre no valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj18)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == false);
                done();
            });
    });
    const obj19 = {
        "nombre": "SERVICIOS AUTOMOTRIZ MOTORS CENTER",
        "razonSocial": "SERVICIOS AUTOMOTRIZ MOTORS CENTER",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "45209",
        "objetoSocial": "vheiculo"
    };
    it('POST:: SERVICIOS AUTOMOTRIZ MOTORS CENTER (Reservado) nombre no valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj19)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == false);
                done();
            });
    });
    const obj20 = {
        "nombre": "ENLACES",
        "razonSocial": "ENLACES",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "26400",
        "objetoSocial": "equipos"
    };
    it('POST:: ENLACES (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj20)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj21 = {
        "nombre": "Credit cars infinite",
        "razonSocial": "Credit cars infinite",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "77100",
        "objetoSocial": "vehiculo"
    };
    it('POST:: Credit cars infinite (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj21)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj22 = {
        "nombre": "Credit CARS deuz joshua",
        "razonSocial": "Credit CARS deuz joshua",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "45300",
        "objetoSocial": "vheiculo"
    };
    it('POST:: Credit CARS deuz joshua (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj22)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
    const obj23 = {
        "nombre": "CASLLUS",
        "razonSocial": "CASLLUS",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "41000",
        "objetoSocial": "edificacion"
    };
    it('POST:: CASLLUS (no Reservado) nombre valido', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(obj23)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nombreValido == true);
                done();
            });
    });
});




describe('validando empresa ACONTAR', () => {
    const query2 = {
        "nombre": "ACONTAR",
        "razonSocial": "ACONTAR",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "64922",
        "objetoSocial": "prestamos"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('Validando lal homonimia con el nombre Distribución integral de alimentos y bebidas mangiare', () => {
    const query2 = {
        "nombre": "Distribución integral de alimentos y bebidas mangiare",
        "razonSocial": "Distribución integral de alimentos y bebidas mangiare",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "10800",
        "objetoSocial": "elaboracion de alimentos"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('Validando homonimia de la empresa azteca', () => {
    const query2 = {
        "nombre": "azteca",
        "razonSocial": "azteca",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "47721",
        "objetoSocial": "venta de calzado"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('Validando homonimia de la empresa prizma', () => {
    const query2 = {
        "nombre": "prizma",
        "razonSocial": "prizma",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "32110",
        "objetoSocial": "fabricacion de joyas"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('Validando homonimia de la empresa canchari blanco hermanos', () => {
    const query2 = {
        "nombre": "canchari blanco hermanos",
        "razonSocial": "canchari blanco hermanos",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "23941",
        "objetoSocial": "cemento"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('Validando homonimia de la empresa hermanos cabla', () => {
    const query2 = {
        "nombre": "hermanos cabla",
        "razonSocial": "hermanos cabla",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "56111",
        "objetoSocial": "churasquerias"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});


describe('Validando homonimia de la empresa CONSULTORA ACONTAR', () => {
    const query2 = {
        "nombre": "CONSULTORA ACONTAR",
        "razonSocial": "CONSULTORA ACONTAR",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "64922",
        "objetoSocial": "prestamos"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});



describe('Validando homonimia de la empresa CONSULTORA RODRIGUEZ', () => {
    const query2 = {
        "nombre": "CONSULTORA RODRIGUEZ",
        "razonSocial": "CONSULTORA RODRIGUEZ",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "41000",
        "objetoSocial": "edificaciones"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});



describe('Validando homonimia de la empresa canchari hermanos', () => {
    const query2 = {
        "nombre": "canchari hermanos",
        "razonSocial": "canchari hermanos",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "11022",
        "objetoSocial": "elaboracion de bebidas alcoholicas"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});

describe('realizando test validando la homonimia de la empresa ASECONT', () => {
    const query2 = {
        "nombre": "ASECONT",
        "razonSocial": "ASECONT",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "66122",
        "objetoSocial": "casa de cambio"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == true);
                done();
            });
    });
});

describe('realizando test validando la homonimia de la empresa cb importaciones', () => {
    const query2 = {
        "nombre": "cb importaciones",
        "razonSocial": "cb importaciones",
        "tipo_empresa": {
            "clave": "001",
            "valor": "Empresa Unipersonal o Comerciante Individual",
            "grupo": "EMPRESA"
        },
        "persona": false,
        "ciiu": "33200",
        "objetoSocial": "equipos industriales"
    };
    it('POST', (done) => {
        request(server)
            .post('/api/v1/buscar_empresa')
            .set('Content-Type', 'application/json')
            .send(query2)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                // if(res.body.nombreValido){console.log('no es homonimia');}else{console.log('es homonimia');}
                assert(res.body.nombreValido == false);
                done();
            });
    });
});