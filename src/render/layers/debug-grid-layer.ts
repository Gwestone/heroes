import type {RenderLayer} from "../render-layer.ts";
import type {Renderer} from "../renderer.ts";

export class DebugGridLayer implements RenderLayer{
    render(renderer: Renderer): void {

        const context = renderer.getContext();
        const camera = renderer.getCamera();

        context.beginPath();

        for (let i = 0; i < 100; i++) {
            context.moveTo(32 * i - camera.getRightCorner().getX(), 0);
            context.lineTo(32 * i - camera.getRightCorner().getX(), camera.getViewPort().getY());
        }

        for (let i = 0; i < 100; i++) {
            context.moveTo(0, i * 32 - camera.getRightCorner().getY());
            context.lineTo(camera.getViewPort().getX(), i * 32 - camera.getRightCorner().getY());
        }

        context.stroke();
    }

}