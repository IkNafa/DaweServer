var express = require('express');
var bodyparser = require('body-parser');
const path = require('path');

var pedidosRouter = require('./routes/pedidos.js');
var videocanvasRouter = require('./routes/videocanvas.js');
var usuariosMongoRouter = require('./routes/usuarios.js');

var app = express();

app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pedidos', pedidosRouter);
app.use('/videocanvas', videocanvasRouter);
app.use('/usuarios_mongo', usuariosMongoRouter);

module.exports = app;