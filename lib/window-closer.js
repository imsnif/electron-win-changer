const { BrowserWindow } = require('electron')

module.exports = function windowCloser (state) {
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
