const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

const data = require('./urls.json')

function writeFile(cb) {
    fs.writeFile(
        path.join(__dirname, "urls.json"), 
        JSON.stringify(data, null, 2),
        err => {
            if(err) throw err

            cb(JSON.stringify({message: "ok"}))
        }
    )
}

http.createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query

    res.writeHead(200, {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
    })

    // POST
    if(req.method === 'POST') {
        req.on('data', new_data => {
            data.urls.push(JSON.parse(new_data))
            return writeFile((message) => res.end(message))
        })
    }

    // DELETE
    if(req.method === 'DELETE' || req.method === 'OPTIONS' || del) {               
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return writeFile((message) => res.end(message))   
    }

    // GET all resources
    if(req.method === 'GET' || !name || !url) {
        return res.end(JSON.stringify(data))
    }

    //data.urls.push({name, url})

    //return writeFile((message) => res.end(message))

}).listen(3000, () => console.log('Api is running'))