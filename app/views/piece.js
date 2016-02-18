/* @flow */

const View = require('ampersand-view')
const Draggabilly = require('draggabilly')

const piece_templates = [
    require('../templates/White_Queen.html'),
    require('../templates/Black_Queen.html'),
    require('../templates/White_King.html'),
    require('../templates/Black_King.html'),
    require('../templates/White_Rook.html'),
    require('../templates/Black_Rook.html'),
    require('../templates/White_Bishop.html'),
    require('../templates/Black_Bishop.html'),
    require('../templates/White_Knight.html'),
    require('../templates/Black_Knight.html'),
    require('../templates/White_Pawn.html'),
    require('../templates/Black_Pawn.html')
  ]

module.exports = View.extend({
  template () {
    return piece_templates[this.model.pieceType]
  },

  initialize () {
    this.on('change:rendered', this.createDraggabilly)
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

  createDraggabilly () {
    var element = this.queryByHook('draggable')
    var draggabilly = new Draggabilly(element)
    if (element && element.style && element.style.position) {
      element.style.position = 'absolute'
    }
    draggabilly.on('dragEnd', (event, pointer) => {
      var element = this.queryByHook('draggable')
      if (element && element.style && element.style.top && element.style.left) {

        var left = parseInt(element.style.left)
        var top = parseInt(element.style.top)
        this.model.set({'left': left, 'top': top})
        this.model.save()
      }

    })
  }
})
