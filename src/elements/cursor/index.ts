export default class Cursor
{
    private context: Window | HTMLElement | Element;
    private handler: (event: Event) => void;
    private eventType: string;

    constructor(handler = function(event: Event) {},
                context: Window | HTMLElement | Element = window)
    {
        this.context = context;
        this.handler = handler;
    }

    protected addEvent = (): void  => this.context.addEventListener(this.eventType, this.handler);
    protected setEvent(eventType: string): void
    {
        this.eventType = eventType;
    }
}