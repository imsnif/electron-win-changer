const { BrowserWindow } = require('electron')

module.exports = function windowSwitcher (state) {
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
