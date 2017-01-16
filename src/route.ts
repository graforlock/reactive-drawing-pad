import DrawingPad from './drawing-pad';
import { Dimensions, ExtendedWindow } from './interfaces';

import {remote} from 'electron';

class Route
{
    private static currentWindow: ExtendedWindow = <ExtendedWindow>remote.getCurrentWindow();
    private static settings: Dimensions = Route.currentWindow.drawingPad;
    public static main(): void
    {
        new DrawingPad('container', Route.settings);
    }
}

Route.main();