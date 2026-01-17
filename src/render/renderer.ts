import {Camera} from "../camera.ts";
import {MOUSE_BUTTONS} from "../mouse.ts";
import type {RenderLayer} from "./render-layer.ts";
import type {Vector} from "../vector.ts";

export class Renderer {

    private canvas!: HTMLCanvasElement;
    private context!: CanvasRenderingContext2D;
    private camera!: Camera;
    private renderLayers: RenderLayer[] = [];
    private worldDim: Vector;

    constructor(worldDim: Vector) {

        this.worldDim = worldDim;
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
        this.camera = new Camera(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, this.worldDim.getX(), this.worldDim.getY());
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
        for(const layer of this.renderLayers){
            layer.render(this);
        }
    }

    private clear() {
        const viewPort = this.camera.getViewPort();
        this.context.clearRect(0, 0, viewPort.getX(), viewPort.getY());
    }

    addRenderLayer(layer: RenderLayer): void {
        this.renderLayers.push(layer);
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    getCamera(): Camera{
        return this.camera;
    }
}