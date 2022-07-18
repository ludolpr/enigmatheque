// Import Module global
const express = require('express');
const {
    engine
} = require('express-handlebars');
const app = express();

const array = [{
    id: 1,
    name: 'America',
    image: '/assets/Ressources/america.png',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}, {
    id: 2,
    name: 'Asia',
    image: "/assets/Ressources/asia.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}, {
    id: 3,
    name: 'Australia',
    image: "/assets/Ressources/australia.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}, {
    id: 1,
    name: 'America',
    image: '/assets/Ressources/america.png',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}, {
    id: 2,
    name: 'Asia',
    image: "/assets/Ressources/asia.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}, {
    id: 3,
    name: 'Australia',
    image: "/assets/Ressources/australia.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}, {
    id: 1,
    name: 'America',
    image: '/assets/Ressources/america.png',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}, {
    id: 2,
    name: 'Asia',
    image: "/assets/Ressources/asia.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}, {
    id: 3,
    name: 'Australia',
    image: "/assets/Ressources/australia.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}]

const {
    limitArray, upper
} = require('./helpers')

// Config Handlebars
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: {
        limit: limitArray,
        upper
    }
}));
app.set('view engine', '.hbs');
app.set('views', './views');

// Route fichier static
app.use('/assets', express.static('public'))

// Router
app.get('/', function (req, res) {
    res.render('home', {
        kakawait: array
    })
})

app.get('/contact', function (req, res) {
    res.render('contact')
})

// Run server
app.listen(3000);