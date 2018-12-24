/*
This is really just for rapid prototyping.
Eventualy swap this with a DB connection and better API.
*/
const data = require('./data.json')

module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}
