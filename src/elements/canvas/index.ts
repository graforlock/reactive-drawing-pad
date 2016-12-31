class Canvas
{
    private node: HTMLCanvasElement = document.createElement('canvas');

    constructor(DOMNode: HTMLElement, height: number = 300, width: number = 200)
    {
        this.node.height = height;
        this.node.width = width;

        this.render(DOMNode);
    }

    public getCtx()
    {
        return this.node.getContext('2d');
    }

    public getNode()
    {
        return this.node;
    }


    private render(DOMNode: HTMLElement = document.body) :void
    {
        DOMNode.appendChild(this.node);
    }
}

export default Canvas;