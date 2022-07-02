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
// profile
app.get('/profile', function (req,res) {
    res.render('profile')
});
// éngimes
app.get('/enigme', function (req,res) {
    // console.log(req.query);
    res.render('enigme',{
        titre: req.query.q
    })
});


app.get('/enigme/:id', function (req,res) {
    res.render('enigme_details',)
});
// devinettes
app.get('/devinettes', function (req,res) {
    // console.log(req.query);
    res.render('devinettes',{
        titre: req.query.q
    })
});
app.get('/devinettes/:id', function (req,res) {
    res.render('enigme_details',)
});
// le sage
app.get('/lesage', function (req,res) {
    // console.log(req.query);
    res.render('lesage',{
        titre: req.query.q
    })
});
app.get('/lesage/:id', function (req,res) {
    res.render('enigme_details',)
});

// connexion modal
app.get('/connexion', function (req,res) {
    // console.log(req.query);
    res.render('connexion')
});

// run server
-app.listen (port, () => console.log (`Exemple d'application écoutant sur le port ${port} !`))
