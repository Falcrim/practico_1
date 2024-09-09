module.exports = (sequelize, Sequelize) => {
    const Hamburguesa = sequelize.define("hamburguesa", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING  
        },
        restauranteId: {
            type: Sequelize.INTEGER
        },
    });
    return Hamburguesa;
}
