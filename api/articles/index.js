/*
This is really just for rapid prototyping.
Eventualy swap this with a DB connection and better API.
*/
const https = require('https')

const data = require('./data.json').map(d => {
  https.get(d.source, (response) => {
    let data = ''
    resp.on('data', (chunk) => { data += chunk })
    resp.on('end', () => { d.content = data })
  })
})

module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}
