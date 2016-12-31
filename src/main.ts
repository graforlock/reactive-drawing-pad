import DrawingPad from './drawing-pad';

class DrawingApp
{
    public static main(): void
    {
        new DrawingPad('canvas-1');
        new DrawingPad('canvas-2');
    }
}

DrawingApp.main();
