const electron = require('electron'),
    BrowserWindow = electron.BrowserWindow,
    LOCALHOST = require('../dist/constants').LOCALHOST;

exports.createDrawingPad = function(data)
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
    return win;
};

exports.createWindow = function()
{
    var win = new BrowserWindow({width: 500, height: 500, useContentSize: true, center: true});
    win.loadURL(LOCALHOST);
    win.on('closed', function()
    {
        win = null;
    });
    return win;
};
