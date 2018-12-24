module.exports = (req, res) => {
  const data = { test: "data" }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
}
