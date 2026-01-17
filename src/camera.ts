import {Vector} from "./vector.ts";

export class Camera {
    private position: Vector;
    private viewPort: Vector;
    constructor(x: number, y: number, width: number, height: number) {
        this.position = new Vector(x, y);
        this.viewPort = new Vector(width, height);
    }
    getPosition() {
        return this.position.clone();
    }
    getRightCorner() {
        return this.position.clone()
            .addScaledVector(this.viewPort, -0.5);
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
        if (tempLeftCorner.getX() > 100 * 32)
            return this.position.setX(32 * 100 - this.viewPort.getX() / 2);

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
        if (tempLeftCorner.getY() > 100 * 32)
            return this.position.setY(32 * 100 - this.viewPort.getY() / 2);

        return this.position.setY(newPosY);
    }
    getViewPort() {
        return this.viewPort;
    }
}