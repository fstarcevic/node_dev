const express = require('express')
const expresshandlebars = require('express-handlebars')

/*const mysql = require('mysql')
const mysqldevapi = require('@mysqldevapi')

connection = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'Trek5200',
    database: 'userprice'
})
*/
const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => res.render('about'))

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.render('404')
})

app.use((err, res, req, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen (port, () => console.log ('express started on server ' + 'pres ctrl-c for exit'))