// const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/restaurante.controller.js");

    router.get("/", controller.listRestaurante);
    router.get("/create", controller.createRestaurante);
    router.post("/create", controller.insertRestaurante);
    router.get("/:id/edit", controller.editRestaurante);
    router.post("/:id/edit", controller.updateRestaurante);
    router.post("/:id/delete", controller.deleteRestaurante);
    router.get("/:id/profile", controller.uploadProfileGet);
    router.post("/:id/profile", controller.uploadProfilePost);

    app.use('/restaurantes', router);

};