// message du console log
console.log('ludolpr console log');


// import module global

const express = require('express');
const {
    engine
} = require('express-handlebars');
const app = express();
const port = 1990

// config handlebars
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './views');

// route fichier static
app.use('/assets', express.static('public'))

// router
app.get('/', function (req,res) {
    res.render('home')
   
})
app.get('/proposer', function (req,res) {
    res.render('proposer')
});


// run server
-app.listen (port, () => console.log (`Exemple d'application écoutant sur le port ${port} !`))
