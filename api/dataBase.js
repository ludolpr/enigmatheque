
// Import modules
const express = require("express");
const app = express()
const db = require('./config/db')


/*
 *  CRUD ENIGME
 *****************/
app
.get("/enigme", async (req, res) => {
  // // Async
  const dbEnigmes = await db.query('SELECT * FROM enigme')
  res.render("enigme",{
    db: dbEnigmes
  });

  // // Sync
  // db.query('SELECT * FROM enigme', function (err, data) {
  //   if(err) throw err;

  //   res.render("enigme",{
  //     db: data
  //   });
  // });
})

// POST ENIGME 
.post('/enigme', (req, res) => {
  const { titre, content } = req.body;
  // Ajout d'une enigme
  db.query(`INSERT INTO enigme (titre, content) VALUES ('${titre}', '${content}');`, function(err, data){
    if(err) throw err;

    // Redirection vers la page énigmes
    res.redirect('/enigme');
  })
})


// contact page
// app.get('/enigme', (req, res) => {

//   // Récupération de tout les articles
//   db.query(`SELECT * FROM perso`, function (err, data) {
//     if (err) throw err;

//     // Rendu de la page admin avec les data de la requête précédente
//     res.render('enigme', {
//       layout: "admin",  //contact peut
//       db:data
//     });
//   })

// });
