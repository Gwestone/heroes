import {Vector} from "./vector.ts";

export class Camera {
    private position: Vector;
    private viewPort: Vector;
    private worldSpace: Vector;
    constructor(x: number, y: number, width: number, height: number, worldWidth: number, worldHeight: number) {
        this.position = new Vector(x, y);
        this.viewPort = new Vector(width, height);
        this.worldSpace = new Vector(worldWidth, worldHeight);
    }
    getPosition() {
        return this.position.clone();
    }
    getViewPort() {
        return this.viewPort.clone();
    }
    getTopLeftCorner() {
        return this.position.clone()
            .addScaledVector(this.viewPort, -0.5);
    }
    getBotRightCorner() {
        return this.getTopLeftCorner().addVector(this.viewPort);
    }
    moveTo(x: number, y: number) {
        this.position = new Vector(x, y);
    }
    move(dx: number, dy: number) {
        this.moveHorizontally(dx);
        this.moveVertically(dy);
    }
    moveHorizontally(dx: number) {
        const newPosX = this.position.getX() - dx;

        const tempRightCorner = this.position
            .clone()
            .setX(newPosX)
            .addScaledVector(this.viewPort, -0.5);

        const tempLeftCorner = tempRightCorner
            .clone()
            .addVector(this.viewPort);

        //instead of canceling move I clamp it to border to prevent jitter
        if (tempRightCorner.getX() < 0)
            return this.position.setX(this.viewPort.getX() / 2);
        if (tempLeftCorner.getX() > this.worldSpace.getX())
            return this.position.setX(
                this.worldSpace.getX() - this.viewPort.getX() / 2
            );

        return this.position.setX(newPosX);
    }
    moveVertically(dy: number) {
        const newPosY = this.position.getY() - dy;

        const tempRightCorner = this.position
            .clone()
            .setY(newPosY)
            .addScaledVector(this.viewPort, -0.5);

        const tempLeftCorner = tempRightCorner
            .clone()
            .addVector(this.viewPort);

        //instead of canceling move I clamp it to border to prevent jitter
        if (tempRightCorner.getY() < 0)
            return this.position.setY(this.viewPort.getY() / 2);
        if (tempLeftCorner.getY() > this.worldSpace.getY())
            return this.position.setY(
                this.worldSpace.getY() - this.viewPort.getY() / 2
            );

        return this.position.setY(newPosY);
    }
}