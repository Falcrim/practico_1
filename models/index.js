const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.restaurantes = require("./restaurante.model.js")(sequelize, Sequelize);
db.hamburguesas = require("./hamburguesa.model.js")(sequelize, Sequelize);
db.resenhas = require("./resenha.model.js")(sequelize, Sequelize);

//Relacion entre restaurantes y hamburguesas
db.restaurantes.hasMany(db.hamburguesas, { as: "hamburguesas", foreignKey: "restauranteId" });
db.hamburguesas.belongsTo(db.restaurantes, {
    foreignKey: "restauranteId",
    as: "restaurante",
});

//Relacion entre hamburguesas y resenhas
db.hamburguesas.hasMany(db.resenhas, { as: "resenhas", foreignKey: "hamburguesaId" });
db.resenhas.belongsTo(db.hamburguesas, {
    foreignKey: "hamburguesaId",
    as: "hamburguesa",
});
//Relacion entre usuarios y resenhas
db.usuarios.hasMany(db.resenhas, { as: "resenhas", foreignKey: "usuarioId" });
db.resenhas.belongsTo(db.usuarios, {
    foreignKey: "usuarioId",
    as: "usuario",
});

module.exports = db;