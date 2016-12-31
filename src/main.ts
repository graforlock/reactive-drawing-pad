import {Stream, Transaction, Cell, CellLoop, StreamSink} from 'sodiumjs';

import sCursor from './elements/s-cursor';
import sColorPicker from './elements/s-color-picker';
import Line from './elements/line';
import Canvas from './elements/canvas';

import {Coords, pageXY} from './interfaces';
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
        Transaction.run(() : void => {

            const colorPicker: sColorPicker = new sColorPicker();

            const canvasParentNode: HTMLElement = document.getElementById(canvasId),
                  canvas: Canvas = new Canvas(canvasParentNode);

            const mouseDown : sCursor = new sCursor('mousedown', canvas.getNode()),
                  mouseUp   : sCursor = new sCursor('mouseup'),
                  mouseOver : sCursor = new sCursor('mousemove'),
                  sMouseDown: Stream<Drawing> = mouseDown.sEventSink.map(u => Drawing.START),
                  sMouseUp  : Stream<Drawing> = mouseUp.sEventSink.map(u => Drawing.END),
                  sMouseOver: Stream<Event>   = mouseOver.sEventSink.map(event => event);

            const sToggleDraw: Stream<Drawing|Event> = sMouseUp.orElse(sMouseDown);

            const sDelta: Stream<pageXY> = sMouseOver
                  .snapshot(sToggleDraw.hold(Drawing.END), (a: MouseEvent, b: Drawing) => ({a, b}))
                  .map(this.toXY);

            const cLoop: CellLoop<Coords> = new CellLoop<Coords>(),
                  sLines: Stream<Coords> = sDelta
                      .snapshot(cLoop, (e: MouseEvent, previous: Coords): Coords => {
                            let x: number = e.x - canvas.getNode().offsetLeft,
                                y: number = e.y - canvas.getNode().offsetTop;
                            return {
                                x0: previous.x1,
                                y0: previous.y1,
                                x1: x,
                                y1: y
                            };
                    });

            cLoop.loop(sLines.hold(initial));

            sLines.listen((coords: Coords): Line => new Line(canvas, coords, colorPicker.sColor));

        });
    }
}

new DrawingPad('canvas-1');
new DrawingPad('canvas-2');