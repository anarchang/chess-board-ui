/* @flow */

const View = require('ampersand-view')

const piece_templates = [
    require('../templates/WhiteQueen.html'),
    // BlackQueen
    // WhiteKing
    // BlackKing
    // WhiteRook
    // BlackRook
    // WhiteBishop
    // BlackBishop
    // WhiteKnight
    // BlackNight
    // WhitePawn
    // BlackPawn
  ]

module.exports = View.extend({
  template () {
    console.log(`piece view model piece_type ${this.model.pieceType}`)
    return piece_templates[this.model.pieceType]
  },

  derived: {
    css_style: {
      deps: ['model.top', 'model.left'],
      fn () {
        return `top: ${this.model.top}px; left: ${this.model.left}px;`
      }
    }
  },

  bindings: {
    css_style: {
      type: 'attribute',
      name: 'style'
    }
  },

  events: {
    'dragend': 'drop',
  },

  drop (e) {
    this.model.top = e.clientY - 60
    this.model.left = e.clientX

    this.model.save()
  }
})
