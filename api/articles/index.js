/*
This is really just for rapid prototyping.
Eventualy swap this with a DB connection and better API.
*/
const data = require('./data.json')

/*
Can't use writeHead here, see the following:
https://github.com/zeit/now-cli/issues/1670#issuecomment-440753564
*/
module.exports = (req, res) => {
  res.write(JSON.stringify(data))
  res.end()
}
