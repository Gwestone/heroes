import type {RenderLayer} from "../render-layer.ts";
import type {Renderer} from "../renderer.ts";
import {TILES} from "../../map/tile-definitions.ts";
import type {Vector} from "../../vector.ts";

export class TileLayer implements RenderLayer{

    private tiles: number[];
    private gridDim: Vector;
    constructor(tiles: Array<number>, gridDim: Vector) {
        this.tiles = tiles;
        this.gridDim = gridDim;
    }

    render(renderer: Renderer): void {

        const offsetX =  - renderer.getCamera().getTopLeftCorner().getX();
        const offsetY =  - renderer.getCamera().getTopLeftCorner().getY();

        const startCol = Math.floor(renderer.getCamera().getTopLeftCorner().getX() / 32);
        const endCol = Math.ceil(renderer.getCamera().getBotRightCorner().getX() / 32);
        const startRow = Math.floor(renderer.getCamera().getTopLeftCorner().getY() / 32);
        const endRow = Math.ceil(renderer.getCamera().getBotRightCorner().getY() / 32);

        for (let y = startRow; y < endRow; y++) {
            for (let x = startCol; x < endCol; x++) {
                const tileId = this.tiles[y * this.gridDim.getX() + x];
                const def = TILES[tileId];
                renderer.getContext().fillStyle = def.color;
                renderer.getContext().fillRect(32 * x + offsetX, 32 * y + offsetY, 32, 32);
            }
        }
    }

}