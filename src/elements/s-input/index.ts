import { Cell, StreamSink  } from 'sodiumjs';

import Element from '../element';

class sInput<T> extends Element
{
    private inputType: string;

    protected node: HTMLInputElement;

    public value: Cell<T>;

    constructor(inputType: string,
                initValue: T,
                DOMNode: HTMLElement = document.body,
                sSink: StreamSink<T> = new StreamSink<T>())
    {
        super('input', DOMNode);
        this.inputType = inputType;
        this.value = sSink.hold(initValue);
        this.setEventHandler(sSink);
        this.setType();
    }

    protected setEventHandler(sSink: StreamSink<T>): void
    {
        this.node
            .addEventListener('input', (event: any) => sSink.send(event.target.value));
    }

    private setType(): void
    {
        this.node.type = this.inputType;
        this.node.value = String(this.value.sample());
    }
}

export default sInput;