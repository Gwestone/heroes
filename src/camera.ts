import {Vector} from "./vector.ts";

class Camera {
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
            .addScaledVector(this.viewPort, 0.5);
    }
    moveTo(x: number, y: number) {
        this.position = new Vector(x, y);
    }
    move(dx: number, dy: number) {
        this.moveHorizontally(dx);
        this.moveVertically(dy);
    }
    moveHorizontally(dx: number) {
        const newPosX = this.position.getX() + dx;

        if (this.viewPort.getX() / 2 - newPosX < 0) return;
        if (this.viewPort.getX() / 2 - newPosX + this.viewPort.getX() > 100 * 32) return;

        return this.position.setX(newPosX);
    }
    moveVertically(dy: number) {
        const newPosY = this.position.getY() + dy;

        if (newPosY - this.viewPort.getY() / 2 < 0) return;
        if (newPosY + this.viewPort.getY() / 2 > 100 * 32) return;

        return this.position.setY(newPosY);
    }
}