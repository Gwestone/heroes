export interface IMapGenerator {
    generateTiles(width: number, height: number): Array<number>;
    generateObjects(width: number, height: number): Array<number>;
    generateMobs(width: number, height: number): Array<number>;
}