const db = require("../models");
const fs = require('fs');

exports.listHamburguesa = function (req, res) {
    db.hamburguesas.findAll({
        include: 'restaurante'
    }).then(hamburguesas => {
        res.render('hamburguesas/list.ejs', { hamburguesas: hamburguesas });
    });
}
//Lista por restaurante Id
exports.listHamburguesas = async function (req, res) {
    const restaurante = await db.restaurantes.findByPk(req.params.id);
    db.hamburguesas.findAll({
        where: {
            restauranteId: req.params.id
        }
    }).then(hamburguesas => {
        res.render('hamburguesas/list.ejs', { hamburguesas: hamburguesas, restaurante: restaurante });
    });
}

//Vista para los usuarios
exports.detailListHamburguesas = async function (req, res) {
    const restaurante = await db.restaurantes.findByPk(req.params.id);
    db.hamburguesas.findAll({
        where: {
            restauranteId: req.params.id
        }
    }).then(hamburguesas => {
        res.render('hamburguesas/dashboard.ejs', { hamburguesas: hamburguesas, restaurante: restaurante });
    });
}


exports.createHamburguesa = async function (req, res) {
    const restaurantes = await db.restaurantes.findAll();
    const restauranteId = await db.restaurantes.findByPk(req.params.id);
    res.render('hamburguesas/form.ejs', { hamburguesa: null, restaurantes, restauranteId });
}
exports.insertHamburguesa = function (req, res) {
    db.hamburguesas.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        restauranteId: req.body.restauranteId
    }).then(() => {
        res.redirect('/hamburguesas/' + req.body.restauranteId + '/list');
    });
}
exports.editHamburguesa = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);
    const restaurantes = await db.restaurantes.findAll();

    res.render('hamburguesas/form.ejs', { hamburguesa: hamburguesa, restaurantes, restauranteId: hamburguesa.restauranteId });
}
exports.updateHamburguesa = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);

    hamburguesa.nombre = req.body.nombre;
    hamburguesa.descripcion = req.body.descripcion;
    hamburguesa.restauranteId = req.body.restauranteId;
    await hamburguesa.save();
    res.redirect('/hamburguesas/' + req.body.restauranteId + '/list');
}
exports.deleteHamburguesa = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);
    const restauranteId = hamburguesa.restauranteId;
    // eslint-disable-next-line no-undef
    const imagePath = __dirname + '/../public/images/preview/' + hamburguesa.id + '.jpg';
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.log(err);
        }
    });
    await hamburguesa.destroy();
    res.redirect('/hamburguesas/' + restauranteId + '/list');
}

exports.uploadProfileGet = async function (req, res) {
    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id);
    res.render('hamburguesas/uploadProfile.ejs', { hamburguesa: hamburguesa, errors: null });
}
exports.uploadProfilePost = async function (req, res) {

    const id = req.params.id;
    const hamburguesa = await db.hamburguesas.findByPk(id, {
        include: 'restaurante'
    });
    if (!req.files?.photo) {
        res.render('hamburguesas/uploadProfile.ejs', { errors: { message: 'Debe seleccionar una imagen' }, hamburguesa });
        return;
    }
    const image = req.files.photo;
    // eslint-disable-next-line no-undef
    const path = __dirname + '/../public/images/preview/' + hamburguesa.id + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            res.render('hamburguesas/uploadProfile.ejs', { errors: { message: 'Error al subir la imagen' }, hamburguesa });
            console.log(err);
            return;
        }
        res.redirect('/hamburguesas/' + hamburguesa.restauranteId + '/list');
    });
}