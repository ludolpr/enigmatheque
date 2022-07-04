// import module global

const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 1990;
const morgan = require("morgan");

app.use(morgan("dev"));

// config handlebars
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    // Ici nous définissons notre nouveau layout
    // Que nous avons créé dans ./views/layouts/adminLayout
    adminLayout: "adminLayout",
  })
);

app.set("view engine", ".hbs");
app.set("views", "./views");

// route fichier static
app.use("/assets", express.static("public"));

// Router
const ROUTER = require("./api/router");
app.use(ROUTER);

// run server
app.listen(port, () =>
  console.log(`Ludolpr: Exemple d'application sur le port ${port} !`)
);
