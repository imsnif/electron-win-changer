const { BrowserWindow } = require('electron')

module.exports = function showToggler (state) {
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
