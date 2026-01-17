import {FRAME_INTERVAL_MS} from "./config.ts";
import {Renderer} from "./render/renderer.ts";
import {GameMap} from "./map/gameMap.ts";
import {TileLayer} from "./render/layers/tile-layer.ts";
import {DebugGridLayer} from "./render/layers/debug-grid-layer.ts";

function main(){
    console.info("Game started");

    console.debug("Loading map...");

    const map = new GameMap(100, 100, "island");

    console.debug("Map loaded successfully.");

    const renderer = new Renderer(map.getWorldSpaceDim());
    renderer.addRenderLayer(new TileLayer(map.getTiles(), map.getGridSpaceDim()));
    renderer.addRenderLayer(new DebugGridLayer(map.getGridSpaceDim()));

    let previousTimeMs = 0;

    function update() {
        requestAnimationFrame((currentTimeMs) => {
            const deltaTimeMs = currentTimeMs - previousTimeMs;
            previousTimeMs = currentTimeMs;
            console.debug("Frame rate: ", 1000 / deltaTimeMs);

            renderer.render();

            if (deltaTimeMs >= FRAME_INTERVAL_MS) {
                updatePhysics();
                previousTimeMs = currentTimeMs - (deltaTimeMs % FRAME_INTERVAL_MS);
            }

            update();
        });
    }

    update();

    console.info("Game ended");
}

function updatePhysics(){

}

main();