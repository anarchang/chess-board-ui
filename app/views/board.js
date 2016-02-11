/* @flow */

const View = require('ampersand-view')

const PieceView = require('./piece')
const Piece = require('../models/piece')
const PieceCollection = require('../collections/pieces')

module.exports = View.extend({
  template:  require('../templates/board.html'),

  props: {
    conn: 'any' // Websocket
  },

  collections: {
    pieceCollection: PieceCollection
  },

  initialize () {
    let pieces = this.pieceCollection
    this.conn = new WebSocket("ws://localhost:3000/ws")
    this.conn.onmessage = function(evt) {
      console.log(`Received websocket message: ${evt.data}`)
      let updatedPieceId = evt.data
      console.log(`updatedPieceId: ${updatedPieceId}`)
      let pieceModel = pieces.get(updatedPieceId)
      if (pieceModel) {
        console.log(`update piece`)
        pieceModel.fetch()
      }
    }
  },

  subviews: {
    piece: {
      hook: 'pieces',
      prepareView (el) {
        this.pieceCollection.fetch()

        return this.renderCollection(this.pieceCollection, PieceView, el)
      }
    }
  }

})
