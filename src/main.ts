import DrawingPad from './drawing-pad';
import sInput from './elements/s-input';
import sSubmit from './elements/s-submit';

import {Dimensions} from './interfaces';

import * as R from 'ramda';
import {Cell, Stream, Tuple2, StreamLoop, Transaction} from 'sodiumjs';


type NTuple2<T, A> = number | Tuple2<T, A>;
type Hash = string;

class DrawingApp {
    private static state: StreamLoop<NTuple2<Dimensions, string>[]>;

    public static main(DOMNode: HTMLElement = document.getElementById('controls-container')): void {
        Transaction.run((): void => {
            DrawingApp.state = new StreamLoop<Tuple2<Dimensions, Hash>[]>();

            const sHeightInput: sInput<number> = new sInput<number>('number', 200, DOMNode),
                sWidthInput: sInput<number> = new sInput<number>('number', 300, DOMNode),
                sButton: sSubmit = new sSubmit('Create new canvas', DOMNode);

            const height: Cell<number> = sHeightInput.value.map(value => Number(value)),
                width: Cell<number> = sWidthInput.value.map(value => Number(value));

            const sHeight: Stream<NTuple2<Dimensions, Hash>> =
                    Cell.switchS(height.map(v => sButton.sSink.map(() => v))),
                sWidth: Stream<NTuple2<Dimensions, Hash>> =
                    Cell.switchS(width.map(v => sButton.sSink.map(() => v)));

            const sDelta: Stream<NTuple2<Dimensions, Hash>> = sHeight
                .merge(sWidth, (height: number, width: number): NTuple2<Dimensions, Hash> =>
                    new Tuple2({height, width}, String(Math.random())));

            DrawingApp.state.loop(
                sDelta.snapshot(
                    DrawingApp.state.hold([]),
                    (delta: NTuple2<Dimensions, Hash>, accum: NTuple2<Dimensions, Hash>[]): NTuple2<Dimensions, Hash>[] => R.append(delta, accum))
            );
        });

        this.state.listen((drawingPads: NTuple2<Dimensions, Hash>[]): void => {
            drawingPads.forEach((drawingPad: Tuple2<Dimensions, Hash>, index: number): void => {
                // Instantiate drawing pads
            })
        });
    }
}

DrawingApp.main();
