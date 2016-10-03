'use strict'

const { BrowserWindow } = require('electron')

const showToggler = require('./lib/show-toggler')
const windowSwitcher = require('./lib/window-switcher')

module.exports = function WinChanger () {
  let state = {
    minimized: false
  }
  return Object.assign(state,
    showToggler(state),
    windowSwitcher(state)
  )
}
