import DrawingPad from './drawing-pad';
import sInput from './elements/s-input';
import sSubmit from './elements/s-submit';

import { Cell, Stream, Tuple2 } from 'sodiumjs';

type NTuple2 = number | Tuple2<number, number>;

class DrawingApp
{
    public static main(DOMNode: HTMLElement = document.getElementById('controls-container')): void
    {
        const sHeightInput: sInput<number> = new sInput<number>('number', 200, DOMNode),
              sWidthInput : sInput<number> = new sInput<number>('number', 300, DOMNode),
              sButton     : sSubmit = new sSubmit('Create new canvas', DOMNode);

        const height: Cell<number> = sHeightInput.sValue.map(value => Number(value)),
              width : Cell<number> = sWidthInput.sValue.map(value => Number(value));

        const sHeight: Stream<NTuple2> = Cell.switchS(height.map(v => sButton.sSink.map(() => v))),
              sWidth: Stream<NTuple2> = Cell.switchS(width.map(v => sButton.sSink.map(() => v)));

        const merged: Stream<NTuple2> = sHeight
                                .merge(sWidth, (a: number, b: number): NTuple2 => new Tuple2(a, b));
              merged.listen((v: any) => console.log(v));
    }
}

DrawingApp.main();
