import type {RenderLayer} from "../render-layer.ts";
import type {Renderer} from "../renderer.ts";
import type {Vector} from "../../vector.ts";

export class DebugGridLayer implements RenderLayer{

    private gridDim: Vector;
    constructor(gridDim: Vector) {
        this.gridDim = gridDim;
    }

    render(renderer: Renderer): void {

        const context = renderer.getContext();
        const camera = renderer.getCamera();

        context.beginPath();

        for (let i = 0; i < this.gridDim.getX(); i++) {
            context.moveTo(32 * i - camera.getTopLeftCorner().getX(), 0);
            context.lineTo(32 * i - camera.getTopLeftCorner().getX(), camera.getViewPort().getY());
        }

        for (let i = 0; i < this.gridDim.getY(); i++) {
            context.moveTo(0, i * 32 - camera.getTopLeftCorner().getY());
            context.lineTo(camera.getViewPort().getX(), i * 32 - camera.getTopLeftCorner().getY());
        }

        context.stroke();
    }

}