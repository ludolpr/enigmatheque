// import module global

const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 1990;
const morgan = require("morgan");
const bodyParser = require('body-parser');
app.use(morgan("dev"));
const { cutStr } = require('./helpers/index');
const methodOverride = require('method-override');
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);


// Import des middlewares
const { isAdmin } = require("./api/middlewares/admin");

// // Utilisation du middleware pour toute les routes suivante
// app.use(isAdmin);


// config handlebars
app.engine(

  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    // Ici nous définissons notre nouveau layout
    // Que nous avons créé dans ./views/layouts/adminLayout
    adminLayout: "adminLayout",
    helpers :{
      cutStr
    }
  })
  
)



// // Utilisation du middleware pour toute les routes suivante
// app.use(isAdmin);

// sessions des membres
var sessionStore = new MySQLStore(require('./api/config/config_db'));

app 
.use(
  expressSession({
    secret: "securite",
    name: "poti-gato",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);

// Session Connexion for HBS
app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  next();
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// dotenv
require("dotenv").config();
// app set
app.set("view engine", ".hbs");
app.set("views", "./views");

// route fichier static
app.use("/assets", express.static("public"));
app.use(methodOverride('_method'))


// Router
const ROUTER = require("./api/config/router");
app.use(ROUTER);


/* ERROR 404 */
// A Mettre a la fin
app.get('/*', function (req, res) {
  res.render('page404',{
  });
})

// run server
app.listen(port, () =>
  console.log(`Ludolpr: Exemple d'application sur le port ${port} ! Lancé le : ${new Date().toLocaleString()});`)
);
