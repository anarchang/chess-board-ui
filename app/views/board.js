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
        let piece = new Piece({top: 11.5, left: 20, piece_id: 'white_queen'})
        let pieceCollection = new PieceCollection(piece)
        return this.renderCollection(pieceCollection, PieceView, el)
      }
    }
  }

})
