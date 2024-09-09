module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/hamburguesa.controller.js");

    router.get("/", controller.listHamburguesa);
    router.get("/:id/list", controller.listHamburguesas);

    router.get("/:id/create", controller.createHamburguesa);
    router.post("/:id/create", controller.insertHamburguesa);

    router.get("/:id/edit", controller.editHamburguesa);
    router.post("/:id/edit", controller.updateHamburguesa);

    router.post("/:id/delete", controller.deleteHamburguesa);

    router.get("/:id/preview", controller.uploadProfileGet);
    router.post("/:id/preview", controller.uploadProfilePost);

    //vista de usuarios
    router.get("/:id/detail/list", controller.detailListHamburguesas);
    //router.get(":id/detail", controller.detailHamburguesa);

    app.use('/hamburguesas', router);

};