/*
This is really just for rapid prototyping.
Eventualy swap this with a DB connection and better API.
*/
const fetch = require('node-fetch')

const data = require('./data.json').map(d => {
  fetch(d.source).then(response => {
    response.text().then(text => {
      d.content = text
    })
  })
})

module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}
