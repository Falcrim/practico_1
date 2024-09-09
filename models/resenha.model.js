module.exports = (sequelize, Sequelize) => {
    const Resenha = sequelize.define("resenha", {
        texto: {
            type: Sequelize.STRING
        },
        puntuacion: {
            type: Sequelize.INTEGER
        },
        usuarioId: {
            type: Sequelize.INTEGER
        },
        hamburguesaId: {
            type: Sequelize.INTEGER
        },
    });
    return Resenha;
}
