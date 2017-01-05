const electron = require('electron'),
      app = electron.app,
      BrowserWindow = electron.BrowserWindow;

var win = null;
const server = require('./server.js'),
    io = server.io,
    LOCALHOST = 'http://localhost:8000';

function createWindow()
{
    win = new BrowserWindow({width: 500, height: 500, useContentSize: true, center: true});
    win.loadURL(LOCALHOST);
    win.on('closed', function()
    {
        win = null;
    });
}

io.on('connection', function(socket)
{
    socket.on('drawing-pad', function(data)
    {
        var win = new BrowserWindow(
            {
                width: data.a.width + 2,
                height: data.a.height + 2,
                useContentSize: true
            });
        win.loadURL(LOCALHOST + '/drawing-pad/'+ data.a.width +'/'+ data.a.height +'/');
        win.on('closed', function()
        {
            win = null;
        });
    });
});

app.on('ready', createWindow);

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
        createWindow();
    }
});
