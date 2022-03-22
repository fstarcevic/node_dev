const { rmSync } = require('fs')
const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase()
    switch(path){
        case'':
            res.writeHead(200, {'content-type':'text/plain'})
            res.end('Homepage')
            break
        case'/about':
            res.writeHead(200, {'content-type':'text/plain'})
            res.end('Abaout')
            break
        default:
            res.writeHead(404, {'content-type':'text/plain'})
            res.end('Not Found')
            break

    }
})

server.listen(port, ()=> console.log(`server started on port ${port}; ` + 'press ctrl+C to get out ...'))