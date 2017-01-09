const electron = require('electron'),
      app = electron.app,
      ipc = electron.ipcMain,
      lib = require('./lib');

var win = null;

ipc.on('drawing-pad', function(event, payload) { lib.createDrawingPad(payload) });

app.on('ready', function() { win = lib.createWindow(); });

app.on('window-all-closed', function()
{
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', function()
{
    if (win === null)
    {
        lib.createWindow();
    }
});
