/* @flow */

const App = require('ampersand-app')
const _ = require('lodash')
const MainView = require('./views/main')
const Router = require('ampersand-router')
const domReady = require('domready')

let app = module.exports = App.extend({
  router: new Router(),
  initialize () {
    console.log(`ampersand initialize ${document.body}`)
    // Create and attach our main view
    this.view = new MainView({el: document.body}).render()

    // this kicks off our backbutton tracking (browser history)
    // and will cause the first matching handler in the router
    // to fire.
    this.router.history.start({ pushState: true });
  }
})

// attach our app to `window` so we can
// easily access it from the console.
window.app = app

// run it on domReady
domReady(_.bind(app.initialize, app));
