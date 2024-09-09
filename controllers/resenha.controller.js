const db = require("../models");


exports.listResenha = async function (req, res) {
    const resenhado = await checkResenha(req.session.usuario.id,req.params.id);
    const resenhas = await db.resenhas.findAll({
        include: 'usuario',
        where: { hamburguesaId: req.params.id }
    });
    res.render('resenhas/list.ejs', { resenhas: resenhas, hamburguesaId: req.params.id, resenhado});
}

exports.createResenha = async function (req, res) {
    res.render('resenhas/form.ejs', { resenha: null, errors: null, hamburguesaId: req.params.id });
}
exports.insertResenha = function (req, res) {
    //console.log(req.session.usuario.id, "HOLAA");
    // const { errors, resenha } = validateResenhaForm(req);
    // if (errors) {
    //     res.render('resenhas/form.ejs', { resenha: resenha });
    //     return;
    // }
    //mostrar los valores del formulario
    db.resenhas.create({
        texto: req.body.texto,
        puntuacion: req.body.puntuacion,
        usuarioId: req.session.usuario.id,
        hamburguesaId: req.body.hamburguesaId
    }).then(() => {
        res.redirect('/resenhas/' + req.body.hamburguesaId);
    });
}

const checkResenha = async function (usuarioId, hamburguesaId) {
    return await db.resenhas.findOne({
        where: {
            usuarioId: usuarioId,
            hamburguesaId: hamburguesaId
        }
    });
} 

// const validateResenhaForm = function (req) {
//     if (!req.body.nombre || !req.body.descripcion) {
//         const errors = {
//             nombre: !req.body.nombre,
//             descripcion: !req.body.descripcion
//         };
//         errors.message = 'Todos los campos son obligatorios';
//         const resenha = {
//             nombre: req.body.nombre,
//             descripcion: req.body.descripcion
//         };
//         return { errors, resenha };
//     }
//     return { errors: null, resenha: null };
// }


// exports.deleteResenha = async function (req, res) {
//     const id = req.params.id;
//     const resenha = await db.resenhas.findByPk(id);
//     await resenha.destroy();
//     res.redirect('/resenhas');
// }


// exports.editResenha = async function (req, res) {
//     const id = req.params.id;
//     const resenha = await db.resenhas.findByPk(id);

//     res.render('resenhas/form.ejs', { resenha: resenha, errors: null });
// }
// exports.updateResenha = async function (req, res) {
//     const validacion = validateResenhaForm(req);
//     const errors = validacion.errors;
//     const resenhaErrors = validacion.resenha;
//     if (errors) {

//         res.render('resenhas/form.ejs', { resenha: resenhaErrors, errors: errors });
//         return;
//     }
//     const id = req.params.id;
//     const resenha = await db.resenhas.findByPk(id);

//     resenha.nombre = req.body.nombre;
//     resenha.descripcion = req.body.descripcion;
//     await resenha.save();
//     res.redirect('/resenhas');
// }