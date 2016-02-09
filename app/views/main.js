/* @flow */

const View = require('ampersand-view')
const Board = require('./board')

module.exports = View.extend({
  template:  '<div class="game" data-hook="game"></div>',

  subviews: {
    game: {
      hook: 'game',
      prepareView (el) {
        return new Board({
          el: el
        })
      }
    }
  }
})
