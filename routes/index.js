module.exports = app => {
    require('./usuarios.routes')(app);
    require('./home.routes')(app);
    require('./restaurantes.routes')(app);
    require('./hamburguesas.routes')(app);
    require('./resenhas.routes')(app);  
}