const electron = require('electron'),
      app = electron.app,
      BrowserWindow = electron.BrowserWindow,
      fs = require('fs');

const phantomjs = require('phantomjs-prebuilt'),
      webdriverio = require('webdriverio'),
      wdOpts = { desiredCapabilities: { browserName: 'phantomjs' } },
      browser = phantomjs.run('--webdriver=4444');

const mustache = require('mustache');

const server = require('./server.js'),
    io = server.io,
    router = server.app,
    LOCALHOST = 'http://localhost:8000';

router.use('/drawing-pad', function (req, res)
{
    res.sendFile(__dirname + "/dist/route.html");
});

io.on('connection', function(socket)
{
    socket.on('drawing-pad', function(data)
    {
        browser.then(function(program)
        {
            webdriverio.remote(wdOpts).init().url(LOCALHOST + '/drawing-pad')
                .getHTML('body', false)
                .then(function(html) {
                    var html = {content: html},
                        template = fs.readFileSync(__dirname + '/dist/template.html');
                    var result = mustache.to_html(template, html.content);
                    console.log(result);
                });
        });
    });
});

function createWindow()
{
    var win = new BrowserWindow({width: 900, height: 700, useContentSize: true});
        win.loadURL(LOCALHOST);

    win.webContents.openDevTools();
    win.on('closed', function()
    {
        win = null;
    });
}

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
