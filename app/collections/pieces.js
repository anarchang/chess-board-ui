/* @flow */

const Collection = require('ampersand-rest-collection')

const View = require('../models/piece')

module.exports = Collection.extend({
  model: View,
  mainIndex: 'id',

  url: '/piece'
})
