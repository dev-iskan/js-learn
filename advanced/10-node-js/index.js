const fs = require('fs')
const http = require('http')
const url = require('url')

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8') // returns string
const laptopData = JSON.parse(json) // parse to json


const server = http.createServer((req, res) => {

  const pathName = url.parse(req.url, true).pathname // pathname in url
  const id = url.parse(req.url, true).query.id // id from query


  if(pathName === '/products' || pathName === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    res.end('This is Products page response')
  } else if (pathName === '/laptop' && id < laptopData.length) {
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    // async function to read file
    fs.readFile(`${__dirname}/templates/laptop.html`, 'utf-8', (err, readData) => {
      const laptop = laptopData[id]
      let output = readData.replace(/{%PRODUCTNAME%}/g, laptop.productName)
      output = output.replace(/{%IMAGE%}/g, laptop.image)
      output = output.replace(/{%PRICE%}/g, laptop.price)
      output = output.replace(/{%SCREEN%}/g, laptop.screen)
      output = output.replace(/{%CPU%}/g, laptop.cpu)
      output = output.replace(/{%STORAGE%}/g, laptop.storage)
      output = output.replace(/{%RAM%}/g, laptop.ram)
      output = output.replace(/{%DESCRIPTION%}/g, laptop.description)
      res.end(output)
    })
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    })
    res.end('Url was not found on the server')
  }

}) // create server

server.listen(1337, '127.0.0.1', () => {
  console.log('Listening for requests')
}) // listen to the server