import { StreamSink } from 'sodiumjs';

import sInput from '../s-input';

class sSubmit extends sInput<string>
{
    public sSink: StreamSink<string>;

    constructor(initValue: string, DOMNode: HTMLElement = document.body, sSink: StreamSink<string> = new StreamSink<string>())
    {
        super('submit', initValue, DOMNode, sSink);
        this.sSink = sSink;
    }

    protected setEventHandler(): void
    {
        this.node
            .addEventListener('click', (event: any) => this.sSink.send(this.value.sample()));
    }
}

export default sSubmit;