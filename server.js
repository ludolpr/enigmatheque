// import module global

// dotenv mis en haut pour l'appel des données sécurisé
require("dotenv").config();


const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const { PORT_NODE } = process.env;
const morgan = require("morgan");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);

// app.use(morgan("dev"));

// // Utilisation du middleware pour toute les routes suivante
// app.use(isAdmin);
/// Swagger Config
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require("./back/config/swagger.json")

// Générateur Swagger // Uncomment pour crée le json
// const expressOasGenerator = require('express-oas-generator');
// expressOasGenerator.init(app, {})

// config handlebars
const { cutStr, upper } = require('./helpers/index');
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    // Ici nous définissons notre nouveau layout
    // Que nous avons créé dans ./views/layouts/adminLayout
    adminLayout: "adminLayout",
    helpers :{
      cutStr, upper
    }
  })
  
)

// // Utilisation du middleware pour toute les routes suivante
// app.use(isAdmin);
// config pour la db

// sessions des membres
var sessionStore = new MySQLStore(require('./back/config/dbConfig'));

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
  console.log("md session", req.session);
  res.locals.user = req.session.user;
  next();
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app set
app.set("view engine", ".hbs");
app.set("views", "./views");

// route fichier static
app.use("/assets", express.static("public"));
app.use(methodOverride('_method'))


// Route  de l'app
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const ROUTER = require("./back/router/route");
app.use("/", ROUTER);




app.listen(PORT_NODE, () =>
  console.log(`Ludolpr: Exemple d'application sur le port ${PORT_NODE} ! Lancé le : ${new Date().toLocaleString()});`)
);

module.exports = {db, app}