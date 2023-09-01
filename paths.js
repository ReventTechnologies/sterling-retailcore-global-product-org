const path = require('path')

module.exports = {
  //Root of the application
  root: path.normalize(path.resolve('./')),

  // Source files
  src: path.normalize(path.resolve(__dirname, './src')),
}
