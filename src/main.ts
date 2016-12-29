import {Stream, Transaction, CellLoop} from 'sodiumjs';
import sCursor from './s-cursor/index';
import Coords from './interfaces/coords';
import pageXY from './interfaces/xy';
import Drawing from './enums/drawing';

class DrawingPad {
    private toXY(stream: {a: MouseEvent, b: Drawing}): pageXY
    {
        let {a, b} = stream;
        switch (b)
        {
            case Drawing.END:
                return {x: NaN, y: NaN};
            case Drawing.START:
                return {x: a.pageX, y: a.pageY};
        }
    }
    constructor(canvasId: string = 'trigger',
                initial : Coords = {x0: 0, y0: 0, x1: 0, y1: 0})
    {
        Transaction.run(() => {

            const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
            const mouseDown : sCursor = new sCursor('mousedown', canvas),
                  mouseUp   : sCursor = new sCursor('mouseup'),
                  mouseOver : sCursor = new sCursor('mousemove'),
                  sMouseDown: Stream<Drawing> = mouseDown.sEventSink.map(u => Drawing.START),
                  sMouseUp  : Stream<Drawing> = mouseUp.sEventSink.map(u => Drawing.END),
                  sMouseOver: Stream<Event>   = mouseOver.sEventSink.map(event => event);

            const sToggleDraw: Stream<Drawing|Event> = sMouseUp.orElse(sMouseDown);

            const sDelta: Stream<pageXY> = sMouseOver
                  .snapshot(sToggleDraw.hold(Drawing.END), (a: MouseEvent, b: Drawing) => ({a, b}))
                  .map(this.toXY);

            const cLoop = new CellLoop();
            const sLines = sDelta.snapshot(cLoop, (e: MouseEvent, previous: Coords) => {
                let x = e.x - canvas.offsetLeft,
                    y = e.y - canvas.offsetTop;
                return {
                    x0: previous.x1,
                    y0: previous.y1,
                    x1: x,
                    y1: y
                };
            });

            cLoop.loop(sLines.hold(initial));

            sLines.listen((coords) => {
                let ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.lineJoin = "round";
                ctx.moveTo(coords.x0, coords.y0);
                ctx.lineTo(coords.x1, coords.y1);
                ctx.closePath();
                ctx.stroke();
            });

        });
    }
}

new DrawingPad('canvas-1');
new DrawingPad('canvas-2');