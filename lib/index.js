const electron = require('electron'),
    BrowserWindow = electron.BrowserWindow,
    constants = require('../dist/constants'),
    LOCALHOST = constants.LOCALHOST,
    DEFAULT_DIMENSIONS = constants.DEFAULT_DIMENSIONS;

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
    var win = new BrowserWindow(Object.assign(DEFAULT_DIMENSIONS, {useContentSize: true, center: true}));
    win.loadURL(LOCALHOST);
    win.on('closed', function()
    {
        win = null;
    });
    return win;
};
