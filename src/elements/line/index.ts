import { Cell } from 'sodiumjs';

import Canvas from '../canvas';
import { Coords, Shape } from '../../interfaces';

class Line implements Shape
{
    public ctx: CanvasRenderingContext2D;
    public coords: Coords;

    private lineJoin: string;
    private lineWidth: Cell<number>;
    private strokeStyle: Cell<string>;

    constructor(canvas: Canvas, coords: Coords,
                strokeStyle: Cell<string>,
                lineWidth: Cell<number>,
                lineJoin: string = 'round')
    {
        this.ctx = canvas.getCtx();
        this.coords = coords;
        this.lineWidth = lineWidth;
        this.lineJoin = lineJoin;
        this.strokeStyle = strokeStyle;
        this.draw();
    }

    private draw() :void
    {
        this.ctx.beginPath();
        this.ctx.lineJoin = this.lineJoin;
        this.strokeStyle.listen((color: string) => this.ctx.strokeStyle = color);
        this.lineWidth.listen((width: number) => this.ctx.lineWidth = width);
        this.ctx.moveTo(this.coords.x0, this.coords.y0);
        this.ctx.lineTo(this.coords.x1, this.coords.y1);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}

export default Line;