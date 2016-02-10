/* @flow */

const View = require('ampersand-view')

const PieceView = require('./piece')
const Piece = require('../models/piece')
const PieceCollection = require('../collections/pieces')

module.exports = View.extend({
  template:  require('../templates/board.html'),

  subviews: {
    piece: {
      hook: 'pieces',
      prepareView (el) {
        let pieceCollection = new PieceCollection()
        pieceCollection.fetch()

        return this.renderCollection(pieceCollection, PieceView, el)
      }
    }
  }

})
