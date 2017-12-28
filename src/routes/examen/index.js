const lecturas = require('../../bls/lecturaArchivos');

module.exports = (app) => {

    const nota = app.src.db.models.nota;
    app.route('/api/v1/examen/csv')
        .get((req, res) => {
            lecturas.csv()
                .then((response) => {
                    return lecturas.registrando(nota, response);
                })
                .then(() => {
                    res.status(200).json({
                        finalizado: true,
                        mensaje: "Se registraron satisfactoriamente.",
                    }); 

                })
                .catch(error => {
                    throw new Error(error.message);
                });
        });
};
