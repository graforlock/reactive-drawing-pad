import { Cell } from 'sodiumjs';

import Canvas from '../canvas';
import { Coords, Shape } from '../../interfaces';

class Line implements Shape
{
    public ctx: CanvasRenderingContext2D;
    public coords: Coords;

    private lineJoin: string;
    private strokeStyle: Cell<string>;

    constructor(canvas: Canvas, coords: Coords, strokeStyle: Cell<string>,
                lineJoin: string = 'round')
    {
        this.ctx = canvas.getCtx();
        this.coords = coords;
        this.lineJoin = lineJoin;
        this.strokeStyle = strokeStyle;
        this.draw();
    }

    private draw() :void
    {
        this.ctx.beginPath();
        this.ctx.lineJoin = this.lineJoin;
        this.strokeStyle.listen((style: string) => this.ctx.strokeStyle = style);
        this.ctx.moveTo(this.coords.x0, this.coords.y0);
        this.ctx.lineTo(this.coords.x1, this.coords.y1);
        this.ctx.closePath();
        this.ctx.stroke();
    }
}

export default Line;