var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// My Router

const router = require("./routers");

app.use('/', router);

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(3000);