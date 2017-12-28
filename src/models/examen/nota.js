module.exports = (sequelize, DataType) => {
    const nota = sequelize.define('nota', {
        id_nota: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            xlabel: 'Id nota',
        },
        id: {
            type: DataType.INTEGER,
            field: 'id',
            xlabel: 'id',
            allowNull: false,
        },
        nota: {
            type: DataType.INTEGER,
            field: 'nota',
            xlabel: 'nota',
            allowNull: false,
        },
        tiempo: {
            type: DataType.INTEGER,
            field: 'tiempo',
            xlabel: 'tiempo',
            allowNull: false,
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
            allowNull: true,
        },
    }, {
            createdAt: '_fecha_creacion',
            updatedAt: '_fecha_modificacion',
            classMethods: {
                tableName: 'nota',
            },
        });
    return nota;
};
