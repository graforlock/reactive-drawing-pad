import Dimensions from './dimensions';

interface ExtendedWindow extends Electron.BrowserWindow
{
    drawingPad: Dimensions;
}

export default ExtendedWindow;