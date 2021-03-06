const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
]

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => {
    
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: randomFortune})

});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.render('404');
});

app.use((err, res, req, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
});

app.use(express.static(__dirname + '/public'))



app.listen (port, () => console.log ('express started on server ' + 'pres ctrl-c for exit'));