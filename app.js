const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();
const hbs = expressHandlebars.create({
    defaultLayout: 'main',
});

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => res.render('about'));

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