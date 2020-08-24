const express = require('express');
const exphbs  = require('express-handlebars');
const port = process.env.PORT || 3000;
const app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// My Router

const router = require("./routers");

app.use('/', router);

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.listen(port);