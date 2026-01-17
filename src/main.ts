function main(){
    console.info("Game started");
    const canvas = document.querySelector("#mainCanvas") as HTMLCanvasElement;
    if (!canvas) {
        console.error("Cant initialize canvas");
        return;
    }

    const viewPort = {width: window.innerWidth, height: window.innerHeight};
    canvas.width = viewPort.width;
    canvas.height = viewPort.height;

    let camera = {pos: {x: viewPort.width / 2, y: viewPort.height / 2}}

    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        console.error("Can't find canvas context");
        return;
    }

    addEventListener("mousedown", (e) => {
        if (e.buttons !== 1) return;
        const cameraRightTopX = camera.pos.x - viewPort.width / 2;
        const cameraRightTopY = camera.pos.y - viewPort.height / 2;

        const clickedX = cameraRightTopX + e.clientX;
        const clickedY = cameraRightTopY + e.clientY;

        console.log("camera", cameraRightTopX, cameraRightTopY);
        console.log("event", e.clientX, e.clientY);
        console.log("click", clickedX, clickedY);
    });

    function updateHorisontalCamera(e: MouseEvent) {
        const newPosX = camera.pos.x + e.movementX;

        //console.log(newPosX);
        //console.log(viewPort.width / 2 - newPosX);
        //console.log((newPosX + viewPort.width / 2));

        if (viewPort.width / 2 - newPosX < 0) return;
        if (viewPort.width / 2 - newPosX + viewPort.width > 100 * 32) return;

        camera.pos.x = newPosX;
    }

    function updateVerticalCamera(e: MouseEvent) {
        const newPosY = camera.pos.y + e.movementY;

        if (newPosY - viewPort.height / 2 < 0) return;
        if (newPosY + viewPort.height / 2 > 100 * 32) return;

        camera.pos.y = newPosY;
    }

    addEventListener("mousemove", (e) => {
        if (e.buttons !== 4) return;
        updateHorisontalCamera(e);
        updateVerticalCamera(e);
    })

    addEventListener("mouseup", (e) => {
        //console.log(e);
    });

    const MAX_FPS = 60;
    const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
    let previousTimeMs = 0;

    const map = [...Array<number>(100)].map(_=> Array(100));

    function update() {
        requestAnimationFrame((currentTimeMs) => {
            const deltaTimeMs = currentTimeMs - previousTimeMs;
            previousTimeMs = currentTimeMs;
            //console.info("Frame rendering", deltaTimeMs);

            //clear function
            ctx.clearRect(0, 0, viewPort.width, viewPort.height);

            ctx?.beginPath();

            for (let i = 0; i < 100; i++) {
                ctx.moveTo(-viewPort.width / 2 + camera.pos.x + 32 * i, 0);
                ctx.lineTo(-viewPort.width / 2 + camera.pos.x + 32 * i, viewPort.height);
            }

            for (let i = 0; i < 100; i++) {
                ctx.moveTo(0, viewPort.height / 2 + camera.pos.y - i * 32);
                ctx.lineTo(viewPort.width,viewPort.height / 2 + camera.pos.y -  i * 32);
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