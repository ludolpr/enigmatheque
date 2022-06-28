// message du console log
console.log('ludolpr console log');


// import module global

const express = require('express');
const {
    engine
} = require('express-handlebars');
const app = express();


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
app.listen(1990);



// En === Fr
// breaking change ====	changement incompatible
// bringing ES6 to the Node Community! === ES6 pour la communauté Node!
// bug === bogue
// changelog ===	journal des modifications
// debugging === débogage
// drop-in === replacement	version alternative
// event loop ===	boucle événementielle
// handler ===	gestionnaire
// icu ===	icu
// memory footprint	=== occupation mémoire
// open governance model ===	modèle de gouvernance ouvert
// package ===	paquets
// patch === correctif
// roadmap === feuille de route
// slide decks ===	présentations
// standards === normes
// streams	flux (streams) *(ajouter le mot anglais également)
// socket ===	connecteur
// tracing ===	traçage
// working group ===	groupe de travail
// assertion failure ===	échec d'affirmation



// Note de configuration possible   

// var http = require('http');
 
// var serv = http.createServer( //création d'un serveur web
 
//   function (req, res) { //callback sur les requêtes HTTP
//       //construction d'une réponse HTTP
//       res.writeHead(200, {'Content-Type': 'text/plain'});
//       res.write('Hello world !');
 
//       res.end(); //envoi de la réponse
//   }
 
// );
 
// serv.listen(8000); //commence à accepter les requêtes
 
// console.log("Server running at http://localhost:8000");