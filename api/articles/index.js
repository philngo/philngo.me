const fs = require('fs')

const data = require('./data.json').map(d => {
  return d.content = fs.readFile(d.source, 'utf8')
})

module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}
