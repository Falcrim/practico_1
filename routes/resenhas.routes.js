// const { requireUser } = require("../middlewares/requires-user.js");

const { requireUser } = require("../middlewares/requires-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/resenha.controller.js");

    router.get("/:id", controller.listResenha);

    router.get("/:id/create", requireUser, controller.createResenha);
    router.post("/:id/create", requireUser, controller.insertResenha);

    //router.post("/:id/delete", controller.deleteResenha);
    // router.get("/:id/edit", controller.editResenha);
    // router.post("/:id/edit", controller.updateResenha);

    app.use('/resenhas', router);

};