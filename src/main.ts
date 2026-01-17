import {Camera} from "./camera.ts";
import {MOUSE_BUTTONS} from "./mouse.ts";
import {FRAME_INTERVAL_MS} from "./config.ts";

function main(){
    console.info("Game started");
    const canvas = document.querySelector("#mainCanvas") as HTMLCanvasElement;
    if (!canvas) {
        console.error("Cant initialize canvas");
        return;
    }

    const camera = new Camera(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);
    canvas.width = camera.getViewPort().getX();
    canvas.height = camera.getViewPort().getY();

    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        console.error("Can't find canvas context");
        return;
    }

    addEventListener("mousedown", (e) => {
        if (e.buttons !== MOUSE_BUTTONS.LEFT) return;
    });

    addEventListener("mousemove", (e) => {
        if (e.buttons !== MOUSE_BUTTONS.MIDDLE) return;
        camera.move(e.movementX, e.movementY);
    });

    addEventListener("mouseup", (e) => {
        if (e.buttons !== MOUSE_BUTTONS.LEFT) return;
    });

    let previousTimeMs = 0;

    function update() {
        requestAnimationFrame((currentTimeMs) => {
            const deltaTimeMs = currentTimeMs - previousTimeMs;
            previousTimeMs = currentTimeMs;
            //console.info("Frame rendering", deltaTimeMs);

            //clear function
            ctx.clearRect(0, 0, camera.getViewPort().getX(), camera.getViewPort().getY());

            ctx?.beginPath();

            for (let i = 0; i < 100; i++) {
                ctx.moveTo(32 * i - camera.getRightCorner().getX(), 0);
                ctx.lineTo(32 * i - camera.getRightCorner().getX(), camera.getViewPort().getY());
            }

            for (let i = 0; i < 100; i++) {
                ctx.moveTo(0, i * 32 - camera.getRightCorner().getY());
                ctx.lineTo(camera.getViewPort().getX(), i * 32 - camera.getRightCorner().getY());
            }

            ctx.stroke();

            if (deltaTimeMs >= FRAME_INTERVAL_MS) {
                updatePhysics();
                // Synchronize next frame to arrive on time
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