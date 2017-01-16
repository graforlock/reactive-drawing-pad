const electron = require('electron'),
    ipcMain = electron.ipcMain;
    BrowserWindow = electron.BrowserWindow,
    constants = require('../constants'),
    LOCALHOST = constants.LOCALHOST,
    DEFAULT_DIMENSIONS = constants.DEFAULT_DIMENSIONS,
    path = require('path');

const filePath = function(fileName)
{
    return 'file://' + path.join(__dirname, '../dist/views/'+ fileName +'.html');
};

exports.createDrawingPad = function(data)
{
    var height = data.a.height,
        width  = data.a.width;
    var win = new BrowserWindow(
        {
            width: width + 2,
            height: height + 2,
            useContentSize: true,
            center: true
        });
    win.loadURL(filePath('route'));
    win.drawingPad = {height: height, width: width};
    win.on('closed', function()
    {
        win = null;
    });
    return win;
};

exports.createWindow = function()
{
    var win = new BrowserWindow(Object.assign(DEFAULT_DIMENSIONS, {useContentSize: true, center: true}));
    win.loadURL(filePath('index'));
    win.on('closed', function()
    {
        win = null;
    });
    return win;
};
