import * as R from 'ramda';
import {Cell, Stream, Tuple2, StreamLoop, Transaction} from 'sodiumjs';
import {Model} from "../typings";

import sInput from './elements/s-input';
import sSubmit from './elements/s-submit';

import {ipcRenderer} from 'electron';

class DrawingApp
{
    private static state: Stream<Model>;

    public static main(DOMNode: HTMLElement = document.getElementById('controls-container')): void
    {
        Transaction.run((): void =>
        {
            const sHeightInput: sInput<number> = new sInput<number>('number', 200, DOMNode),
                  sWidthInput: sInput<number> = new sInput<number>('number', 300, DOMNode),
                  sButton: sSubmit = new sSubmit('Create new canvas', DOMNode);

            const height: Cell<number> = sHeightInput.value.map(value => Number(value)),
                  width: Cell<number> = sWidthInput.value.map(value => Number(value));

            const sHeight: Stream<Model> = Cell.switchS(height.map(v => sButton.sSink.map(() => v))),
                  sWidth: Stream<Model> = Cell.switchS(width.map(v => sButton.sSink.map(() => v)));

            DrawingApp.state = sHeight
                .merge(sWidth, (height: number, width: number): Model =>
                    new Tuple2({height, width}, Date.now()));
        });

        DrawingApp.state.listen((drawingPad: Model): void =>
        {
            ipcRenderer.send('drawing-pad', drawingPad);
        });
    }
}

DrawingApp.main();
