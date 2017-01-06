import * as R from 'ramda';
import {Cell, Stream, Tuple2, StreamLoop, Transaction} from 'sodiumjs';
import {Model} from "../typings";

import Sockets from './services/sockets';

import sInput from './elements/s-input';
import sSubmit from './elements/s-submit';

import {LOCALHOST} from '../constants';

class DrawingApp
{
    private static socket: Sockets<Model> = new Sockets<Model>(LOCALHOST);
    private static state: StreamLoop<Model[]>;

    public static main(DOMNode: HTMLElement = document.getElementById('controls-container')): void
    {
        Transaction.run((): void =>
        {
            DrawingApp.state = new StreamLoop<Model[]>();

            const sHeightInput: sInput<number> = new sInput<number>('number', 200, DOMNode),
                  sWidthInput: sInput<number> = new sInput<number>('number', 300, DOMNode),
                  sButton: sSubmit = new sSubmit('Create new canvas', DOMNode);

            const height: Cell<number> = sHeightInput.value.map(value => Number(value)),
                  width: Cell<number> = sWidthInput.value.map(value => Number(value));

            const sHeight: Stream<Model> = Cell.switchS(height.map(v => sButton.sSink.map(() => v))),
                  sWidth: Stream<Model> = Cell.switchS(width.map(v => sButton.sSink.map(() => v)));

            const sDelta: Stream<Model> = sHeight
                .merge(sWidth, (height: number, width: number): Model =>
                    new Tuple2({height, width}, Date.now()));

            DrawingApp.state.loop(
                sDelta.snapshot(
                    DrawingApp.state.hold([]), (delta: Model, accum: Model[]): Model[] =>
                        R.append(delta, accum))
            );
        });

        this.state.listen((drawingPads: Model[]): void =>
        {
            DrawingApp.socket.emit('drawing-pad', drawingPads[drawingPads.length - 1]);
        });
    }
}

DrawingApp.main();
