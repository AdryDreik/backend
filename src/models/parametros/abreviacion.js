/**
 * Modelo abreviacion.
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
    const abreviacion = sequelize.define('abreviacion', {
        id_abreviacion: {
            type: DataType.INTEGER,
            primaryKey: true,
            xlabel: 'ID',
            autoIncrement: true,
        },
        abreviacion: {
            type: DataType.TEXT,
            field: 'abreviacion',
            xlabel: 'abreviacion',
            allowNull: false,
        },
        descripcion: {
            type: DataType.TEXT,
            field: 'descripcion',
            xlabel: 'descripcion',
            allowNull: false,
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
        tableName: 'abreviacion',
    });
    return abreviacion;
};