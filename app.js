const fs = require('fs')
const http = require('http')
const port = process.env.PORT || 3000

function serveStaticFile(res, path, contentType, responsCode = 200){
    fs.readFile(__dirname + path, (err, data) => {
        if(err){
            res.writeHead(500, {'content-type':'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responsCode, {'content-type': contentType})
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase()
    switch(path){
        case'':
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case'/about':
            serveStaticFile(res, 'public/about.html', 'text/html')
            break
        case'/img/logo.png':
            serveStaticFile(res, '/public/img/logo.png', 'image/png')
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
            break
    }
})

server.listen(port, ()=> console.log(`server started on port ${port}; ` + 'press ctrl+C to get out ...'))