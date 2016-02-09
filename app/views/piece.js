/* @flow */

const View = require('ampersand-view')

module.exports = View.extend({
  template:  require('../templates/piece.html'),

  props: {
    board: 'state' // Board
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
  }
})
