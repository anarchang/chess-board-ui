/* @flow */

const Collection = require('ampersand-collection')

const View = require('../models/view')

module.exports = Collection.extend({
  model: View
})
