/* @flow */

const Model = require('ampersand-model')

module.exports = Model.extend({
  props: {
    top: 'number',
    left: 'number',
    piece_id: 'string'
  }
})
