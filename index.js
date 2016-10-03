'use strict'

const { BrowserWindow } = require('electron')

module.exports = function WinChanger () {
  let state = {
    minimized: false
  }
  return Object.assign(state,
    showToggler(state),
    windowSwitcher(state),
    windowCloser(state)
  )
}

function showToggler (state) {
  return {
    toggleAllShow: function toggleAllShow () {
      const wins = BrowserWindow.getAllWindows()
      if (!state.minimized) {
        wins.forEach(w => w.minimize())
      } else {
        wins.forEach(w => w.restore())
      }
      state.minimized = !state.minimized
    }
  }
}

function windowSwitcher (state) {
  return {
    switchWindow: function switchWindow () {
      try {
        const allWindows = BrowserWindow.getAllWindows()
        const focusedWindow = BrowserWindow.getFocusedWindow()
        if (!focusedWindow) return allWindows[0].focus()
        const currentIndex = allWindows
          .map(w => w.id)
          .indexOf(focusedWindow.id)
        const lastIndex = allWindows.length - 1
        const nextIndex = currentIndex + 1 > lastIndex
          ? 0
          : currentIndex + 1
        allWindows[nextIndex].focus()
      } catch (e) {
        console.error(e)
      }
    }
  }
}

function windowCloser (state) {
  return {
    closeWindow: function closeWindow() {
      try {
        const allWindows = BrowserWindow.getAllWindows()
        const focusedWindow = BrowserWindow.getFocusedWindow()
        if (!focusedWindow) return // only close focused window
        focusedWindow.close()
        state.switchWindow()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
