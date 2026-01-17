import type {IMapGenerator} from "./generators/map-generator.ts";
import {IslandGenerator} from "./generators/island-generator.ts";
import {Vector} from "../vector.ts";

export class GameMap {
    private generator!: IMapGenerator;
    private readonly tiles!: number[];
    private readonly objects!: number[];
    private readonly mobs!: number[];
    private readonly width: number;
    private readonly height: number;

    constructor(width: number, height: number, template: string) {
        if (template === "island") {
            this.generator = new IslandGenerator();
        }
        this.width = width;
        this.height = height;
        this.tiles = this.generator.generateTiles(this.width, this.height);
        this.objects = this.generator.generateObjects(this.width, this.height);
        this.mobs = this.generator.generateMobs(this.width, this.height);
    }

    getTiles(){
        return this.tiles;
    }
    getMobs(){
        return this.mobs;
    }
    getObjects(){
        return this.objects;
    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    getGridSpaceDim() {
        return new Vector(this.width, this.height);
    }
    getWorldSpaceDim() {
        return new Vector(this.width, this.height).multiply(32);
    }
}