const fs = require('fs')

module.exports = (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}
