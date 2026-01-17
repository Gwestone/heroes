import {IslandGenerator} from "./generators/island-generator.ts";

const generator = new IslandGenerator();
export const tiles = generator.generateTiles(100, 100);