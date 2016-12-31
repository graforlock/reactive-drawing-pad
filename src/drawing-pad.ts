import {Stream, Transaction, CellLoop} from 'sodiumjs';

import sCursor from './elements/s-cursor';
import sInput from './elements/s-input';
import Line from './elements/line';
import Canvas from './elements/canvas';

import {Coords, pageXY, Dimensions} from './interfaces';
import Drawing from './enums/drawing';


class DrawingPad
{
    /**
     *  Converts MouseEvent into the valid / acceptable
     *  pageXY type data.
     */
    private toXY(stream: {a: MouseEvent, b: Drawing}): pageXY
    {
        let {a, b} = stream;
        switch (b)
        {
            case Drawing.END:
                /* NaN is guaranteed not to draw on the canvas. */
                return {x: NaN, y: NaN};
            case Drawing.START:
                return {x: a.pageX, y: a.pageY};
        }
    }
    constructor(canvasId: string = 'trigger',
                dimensions: Dimensions = {height: 300, width: 200 },
                initial : Coords = {x0: 0, y0: 0, x1: 0, y1: 0})
    {
        /**
         *  Transactional value processing initialisation.
         */
        Transaction.run(() : void => {

            /**
             *  General Canvas setup placement.
             */
            const canvasParentNode: HTMLElement = document.getElementById(canvasId),
                  canvas          : Canvas      = new Canvas(canvasParentNode, dimensions);

             /**
              *  Input elements exposing a listenable stream.
              *  Both mounted to the canvasParent for convenience.
              */
            const sColorPicker: sInput<string> = new sInput<string>('color', '#00000',canvasParentNode),
                  sRange      : sInput<number> = new sInput<number>('range', 1, canvasParentNode);

            /**
             *  Mouse events exposing listenable streams, followed by
             *  the respective mappings of each MouseEvent.
             */
            const mouseDown : sCursor = new sCursor('mousedown', canvas.getNode()),
                  mouseUp   : sCursor = new sCursor('mouseup'),
                  mouseOver : sCursor = new sCursor('mousemove'),
                  sMouseDown: Stream<Drawing> = mouseDown.sEventSink.map(u => Drawing.START),
                  sMouseUp  : Stream<Drawing> = mouseUp.sEventSink.map(u => Drawing.END),
                  sMouseOver: Stream<Event>   = mouseOver.sEventSink.map(event => event);

            /**
             *  Stream of Mouse events that toggle drawing mode
             *  either by 'mousedown' or 'mouseup'.
             */
            const sToggleDraw: Stream<Drawing> = sMouseUp.orElse(sMouseDown);

            /**
             *  Mouse mode is being accumulated together with
             *  'mouseover' page coordinates. It is then mapped
             *  to a compatible format via .toXY() method.
             */
            const sDelta: Stream<pageXY> = sMouseOver
                  .snapshot(sToggleDraw.hold(Drawing.END), (a: MouseEvent, b: Drawing) => ({a, b}))
                  .map(this.toXY);

            /**
             *  Cell value is prepared to being looped in a transactional
             *  fashion. Coordinates are converted to acceptable canvas format.
             *  This results in accumulating MouseEvent's current values with
             *  previous values in order to allow drawing a canvas line
             *  on click and drag.
             */
            const coordsLoop: CellLoop<Coords> = new CellLoop<Coords>(),
                  sLines: Stream<Coords> = sDelta
                      .snapshot(coordsLoop, (e: MouseEvent, previous: Coords): Coords => {
                            let x: number = e.x - canvas.getNode().offsetLeft,
                                y: number = e.y - canvas.getNode().offsetTop;
                            return {
                                x0: previous.x1,
                                y0: previous.y1,
                                x1: x,
                                y1: y
                            };
                    });
            /**
             * Start value of the looped Cell is set.
             * Lines stream is converted into the Cell with
             * initial value.
             */
            coordsLoop.loop(sLines.hold(initial));

            /**
             * Listening to the latest value of the line coordinate
             * stream. Afterwards, the Line class is created that
             * physically draws the lines onto the canvas.
             */
            sLines.listen((coords: Coords): Line => new Line(canvas, coords, sColorPicker.sValue, sRange.sValue));
        });
    }
}

export default DrawingPad;