import { StreamSink } from 'sodiumjs';
import Cursor from '../cursor';

export default class sCursor extends Cursor
{
    public sEventSink: StreamSink<Event>;

    constructor(eventType: string = 'click',
                context: Window | HTMLElement | Element = window,
                sSink = new StreamSink<Event>())
    {
        const sHandler = (event: Event) => { sSink.send(event); };
        super(sHandler, context);

        this.sEventSink = sSink;
        this.setEvent(eventType);
        this.addEvent();
    }
}