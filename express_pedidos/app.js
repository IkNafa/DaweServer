var express = require('express');
var bodyparser = require('body-parser');
const path = require('path');

var pedidosRouter = require('./routes/pedidos.js');

var app = express();

app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pedidos', pedidosRouter);

module.exports = app;