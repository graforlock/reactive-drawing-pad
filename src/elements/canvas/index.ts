import { Dimensions } from '../../interfaces';

class Canvas
{
    private node: HTMLCanvasElement = document.createElement('canvas');

    constructor(DOMNode: HTMLElement, dimensions: Dimensions)
    {
        this.node.height = dimensions.height;
        this.node.width = dimensions.width;

        this.render(DOMNode);
    }

    public getCtx(): CanvasRenderingContext2D
    {
        return this.node.getContext('2d');
    }

    public getNode(): HTMLCanvasElement
    {
        return this.node;
    }

    private render(DOMNode: HTMLElement = document.body) :void
    {
        DOMNode.appendChild(this.node);
    }
}

export default Canvas;