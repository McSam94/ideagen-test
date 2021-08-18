const path = require('path')

const resources = ['constants.scss']

module.exports = resources.map((file) => path.resolve(__dirname, file))
