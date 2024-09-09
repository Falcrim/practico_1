const db = require("../models");
// const sha1 = require('sha1');
exports.listRestaurante = async function (req, res) {
    const restaurantes = await db.restaurantes.findAll();
    res.render('restaurantes/list.ejs', { restaurantes: restaurantes });

}

exports.createRestaurante = async function (req, res) {
    res.render('restaurantes/form.ejs', { restaurante: null, errors: null });
}
exports.insertRestaurante = function (req, res) {
    const { errors, restaurante } = validateRestauranteForm(req);
    if (errors) {
        res.render('restaurantes/form.ejs', { restaurante: restaurante });
        return;
    }
    //para acceder al usuario que está loggeado
    
    db.restaurantes.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    }).then(() => {
        res.redirect('/restaurantes');
    });
}

exports.editRestaurante = async function (req, res) {
    const id = req.params.id;
    const restaurante = await db.restaurantes.findByPk(id);

    res.render('restaurantes/form.ejs', { restaurante: restaurante, errors: null });
}
exports.updateRestaurante = async function (req, res) {
    const validacion = validateRestauranteForm(req);
    const errors = validacion.errors;
    const restauranteErrors = validacion.restaurante;
    if (errors) {

        res.render('restaurantes/form.ejs', { restaurante: restauranteErrors, errors: errors });
        return;
    }
    const id = req.params.id;
    const restaurante = await db.restaurantes.findByPk(id);

    restaurante.nombre = req.body.nombre;
    restaurante.descripcion = req.body.descripcion;
    await restaurante.save();
    res.redirect('/restaurantes');
}
exports.deleteRestaurante = async function (req, res) {
    const id = req.params.id;
    const restaurante = await db.restaurantes.findByPk(id);
    await restaurante.destroy();
    res.redirect('/restaurantes');
}

const validateRestauranteForm = function (req) {
    if (!req.body.nombre || !req.body.descripcion) {
        const errors = {
            nombre: !req.body.nombre,
            descripcion: !req.body.descripcion
        };
        errors.message = 'Todos los campos son obligatorios';
        const restaurante = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        };
        return { errors, restaurante };
    }
    return { errors: null, restaurante: null };
}

exports.uploadProfileGet = async function (req, res) {
    const id = req.params.id;
    const restaurante = await db.restaurantes.findByPk(id);
    res.render('restaurantes/uploadProfile.ejs', { restaurante: restaurante, errors: null });
}
exports.uploadProfilePost = async function (req, res) {

    const id = req.params.id;
    const restaurante = await db.restaurantes.findByPk(id);
    if (!req.files?.photo) {
        res.render('restaurantes/uploadProfile.ejs', { errors: { message: 'Debe seleccionar una imagen' }, restaurante });
        return;
    }
    const image = req.files.photo;
    // eslint-disable-next-line no-undef
    const path = __dirname + '/../public/images/profile/' + restaurante.id + '.jpg';

    image.mv(path, function (err) {
        if (err) {
            res.render('restaurantes/uploadProfile.ejs', { errors: { message: 'Error al subir la imagen' }, restaurante });
            console.log(err);
            return;
        }
        res.redirect('/restaurantes');
    });
}