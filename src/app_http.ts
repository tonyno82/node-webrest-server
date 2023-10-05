import fs from 'fs'
import http from 'http'


const server = http.createServer((req, res) => {
    console.log(req.url)


    // res.writeHead(200, {'Content-Type': 'text/html'})
    // res.write(`<h1>URL ${req.url}</h1>`)
    // res.end()

    // const data = {name: 'John Doe', age: 30, city: 'New York'}
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.end(JSON.stringify(data))

    if ( req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(htmlFile)
        // const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8')
        // res.writeHead(200, {'Content-Type': 'text/css'})
        // res.write(cssFile)
        // const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8')
        // res.writeHead(200, {'Content-Type': 'application/javascript'})
        res.end()
    }

    // } else {
    //     res.writeHead(404, {'Content-Type': 'text/html'})
    //     res.end()
    // }
    if (req.url === '/css/styles.css') {
        const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8')
        res.writeHead(200, {'Content-Type': 'text/css'})
        res.end(cssFile)
    }
    if (req.url === '/js/app.js') {
        const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8')
        res.writeHead(200, {'Content-Type': 'application/javascript'})
        res.end(jsFile)
    }
})

server.listen(8080, () => {
    console.log('Server running on port 8080')
})