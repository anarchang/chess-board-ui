/* @flow */

const Model = require('ampersand-model')

module.exports = Model.extend({
  props: {
    id: 'number',
    top: 'number',
    left: 'number',
    pieceType: 'int'
  }
})
