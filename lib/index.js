const electron = require('electron'),
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
    var win = new BrowserWindow(
        {
            width: data.a.width + 2,
            height: data.a.height + 2,
            useContentSize: true,
            center: true
        });
    win.loadURL(filePath('route'));
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
