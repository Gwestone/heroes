export class Vector {
    private x: number;
    private y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    addVector(vector: Vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    addScaledVector(vector: Vector, scale: number) {
        this.x += vector.x * scale;
        this.y += vector.y * scale;
        return this;
    }
    add(x: number, y: number) {
        this.x += x;
        this.y += y;
        return this;
    }
    subtract(vector: Vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    multiply(vector: Vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }
    divide(scalar: number) {
        this.x  = this.x / scalar;
        this.y  = this.y / scalar;
        return this;
    }
    dot(vector: Vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    scalar() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    getX() {
        return this.x;
    }
    setX(x: number) {
        this.x = x;
        return this;
    }
    getY() {
        return this.y;
    }
    setY(y: number) {
        this.y = y;
        return this;
    }
}