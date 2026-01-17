import {Camera} from "./camera.ts";
import {MOUSE_BUTTONS} from "./mouse.ts";

export class Renderer {

    private canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private camera!: Camera;

    constructor() {

        this.initCanvas();
        this.initCamera();
        this.initEvents();

    }

    private initCanvas() {
        this.canvas = document.querySelector("#mainCanvas") as HTMLCanvasElement;
        if (!this.canvas) {
            console.error("Cant initialize canvas");
            return;
        }

        const context = this.canvas.getContext('2d');
        if (context === null) {
            console.error("Can't find canvas context");
            return;
        }
        this.context = context;
    }

    private initCamera() {
        this.camera = new Camera(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight);
        this.canvas.width = this.camera.getViewPort().getX();
        this.canvas.height = this.camera.getViewPort().getY();
    }

    //TODO refactor events handling into separate module
    private initEvents(){
        addEventListener("mousedown", (e) => {
            if (e.buttons !== MOUSE_BUTTONS.LEFT) return;
        });

        addEventListener("mousemove", (e) => {
            if (e.buttons !== MOUSE_BUTTONS.MIDDLE) return;
            this.camera.move(e.movementX, e.movementY);
        });

        addEventListener("mouseup", (e) => {
            if (e.buttons !== MOUSE_BUTTONS.LEFT) return;
        });
    }

    render(){
        this.clear();
        this.renderDebugGrid();
    }

    private renderDebugGrid() {
        this.context.beginPath();

        for (let i = 0; i < 100; i++) {
            this.context.moveTo(32 * i - this.camera.getRightCorner().getX(), 0);
            this.context.lineTo(32 * i - this.camera.getRightCorner().getX(), this.camera.getViewPort().getY());
        }

        for (let i = 0; i < 100; i++) {
            this.context.moveTo(0, i * 32 - this.camera.getRightCorner().getY());
            this.context.lineTo(this.camera.getViewPort().getX(), i * 32 - this.camera.getRightCorner().getY());
        }

        this.context.stroke();
    }

    private clear() {
        const viewPort = this.camera.getViewPort();
        this.context.clearRect(0, 0, viewPort.getX(), viewPort.getY());
    }
}