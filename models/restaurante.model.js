module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("restaurante", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
    return Restaurante;
}
