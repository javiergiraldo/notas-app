const express = require('express');
const path = require('path');
//import path from 'path';
//const exphbs = require('express-handlebars');
import exphbs from "express-handlebars";
const methodOverride = require('method-override');
const session = require('express-session');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 5300);
app.set('views', path.join(__dirname, 'views'));
app.engine(
    ".hbs", 
    exphbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));


// Global Variables

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'));
});