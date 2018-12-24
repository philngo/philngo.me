const data = require('./data.json').map(d => {
  return d.content = require(d.source)
})

module.exports = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}
