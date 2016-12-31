class Element
{
    protected nodeType: string;
    protected node: HTMLElement;

    constructor(nodeType: string = 'div', DOMNode: HTMLElement = document.body)
    {
        this.nodeType = nodeType;
        this.node = document.createElement(nodeType);
        this.render(DOMNode);
    }

    protected render(DOMNode: HTMLElement): void
    {
        DOMNode.appendChild(this.node);
    }
}

export default Element;