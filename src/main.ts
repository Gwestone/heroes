import {FRAME_INTERVAL_MS} from "./config.ts";
import {Renderer} from "./renderer.ts";

function main(){
    console.info("Game started");
    const renderer = new Renderer();

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