import { Cell, StreamSink  } from 'sodiumjs';

class sColorPicker
{
    private colorPicker: HTMLInputElement = document.createElement('input');

    public sColor: Cell<string>;

    constructor(initColor: string = '#000000',
                sSink: StreamSink<string> = new StreamSink<string>())
    {
        this.sColor = sSink.hold(initColor);
        this.setEventHandler(sSink);
        this.render();
    }

    private setEventHandler(sSink: StreamSink<string>): void
    {
        this.colorPicker
            .addEventListener('input', (event: any) => sSink.send(event.target.value));
    }

    private render(DOMNode: HTMLElement = document.body): void
    {
        this.colorPicker.type = 'color';
        this.colorPicker.value = this.sColor.sample();
        DOMNode.appendChild(this.colorPicker);
    }
}

export default sColorPicker;