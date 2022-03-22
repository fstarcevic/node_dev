const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content_type':'text/plain'})
    res.end('Hello World!')
})

server.listen(port, ()=> console.log(`server started on port ${port}; ` + 'press ctrl+C to get out ...'))