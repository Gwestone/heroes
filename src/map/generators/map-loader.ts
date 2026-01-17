import type {IMapGenerator} from "./map-generator.ts";

export class MapLoader implements IMapGenerator {
    generateMobs(_width: number, _height: number): Array<number> {
        return [];
    }

    generateObjects(_width: number, _height: number): Array<number> {
        return [];
    }

    generateTiles(_width: number, _height: number): Array<number> {
        return [];
    }

}