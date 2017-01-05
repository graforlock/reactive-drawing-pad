const electron = require('electron'),
      app = electron.app,
      lib = require('./lib');

var win = null;
const server = require('./server.js'),
    io = server.io;

io.on('connection', function(socket)
{
    socket.on('drawing-pad', lib.createDrawingPad);
});

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
