/* @flow */

const Collection = require('ampersand-collection')

const View = require('../models/piece')

module.exports = Collection.extend({
  model: View
})
