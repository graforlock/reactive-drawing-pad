import DrawingPad from './drawing-pad';

import { Dimensions } from './interfaces';

class Route
{
    private static settings: Dimensions = (<any>window).drawingPad;
    public static main(): void
    {
        new DrawingPad('container', Route.settings);
    }
}

Route.main();