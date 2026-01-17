import {FRAME_INTERVAL_MS} from "./config.ts";
import {Renderer} from "./render/renderer.ts";
import {DebugGridLayer} from "./render/layers/debug-grid-layer.ts";

function main(){
    console.info("Game started");
    const renderer = new Renderer();
    renderer.addRenderLayer(new DebugGridLayer());

    let previousTimeMs = 0;

    function update() {
        requestAnimationFrame((currentTimeMs) => {
            const deltaTimeMs = currentTimeMs - previousTimeMs;
            previousTimeMs = currentTimeMs;

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