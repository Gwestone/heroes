import type {IMapGenerator} from "./map-generator.ts";
import {TILE_MEADOW, TILE_ROCK, TILE_SAND, TILE_SEA} from "../tile-definitions.ts";

export class IslandGenerator implements IMapGenerator {
    generateMobs(_w: number, _h: number): number[] {
        return [];
    }

    generateObjects(_w: number, _h: number): number[] {
        return [];
    }

    generateTiles(width: number, height: number): Array<number> {
        let data: number[] = new Array(width * height).fill(TILE_SEA);
        const centerX = width / 2;
        const centerY = height / 2;
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

        // --- PHASE 1: Base Terrain Generation ---
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = y * width + x;

                // 1. Distance from center
                const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                const normalizedDist = dist / (maxDist * 0.65);

                // 2. Subtle Noise
                const noise = (Math.random() - 0.5) * 0.08;
                const elevation = (1 - normalizedDist) + noise;

                // 3. Layering
                if (elevation < 0.25) {
                    data[index] = TILE_SEA;
                } else if (elevation < 0.75) {
                    data[index] = TILE_MEADOW;
                } else {
                    data[index] = TILE_ROCK;
                }
            }
        }

        // --- PHASE 2: River Carving ---
        // We carve the river BEFORE applying beaches.
        // This ensures the beach pass detects the river banks as "coasts".
        this.carveRiver(data, width, height);

        // --- PHASE 3: Generate Beaches ---
        // Runs on the whole map, converting any Land touching Water into Sand.
        data = this.applyBeaches(data, width, height);

        // --- PHASE 4: Strict Cleanup ---
        // Removes artifacts and ensures clean separation.
        data = this.removeArtifacts(data, width, height);
        data = this.removeArtifacts(data, width, height); // Double pass

        return data;
    }

    private applyBeaches(input: number[], width: number, height: number): number[] {
        const output = [...input];
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const idx = y * width + x;
                const tile = input[idx];

                // If I am Land (Meadow/Rock)
                if (tile === TILE_MEADOW || tile === TILE_ROCK) {
                    const up = input[(y - 1) * width + x];
                    const down = input[(y + 1) * width + x];
                    const left = input[y * width + (x - 1)];
                    const right = input[y * width + (x + 1)];

                    // If I touch the Sea, turn me to Sand
                    // This creates a 1-tile buffer around ALL water (Ocean + River)
                    if (up === TILE_SEA || down === TILE_SEA || left === TILE_SEA || right === TILE_SEA) {
                        output[idx] = TILE_SAND;
                    }
                }
            }
        }
        return output;
    }

    private carveRiver(data: number[], width: number, height: number) {
        const centerX = width / 2;
        const centerY = height / 2;
        const riverBaseRadius = 1.5;

        for (let y = 0; y < height; y++) {
            // Sinuous path
            const riverCenterX = centerX + Math.sin(y / 15) * 5;

            // Delta Logic: Flares out at top and bottom
            const distFromCenterY = Math.abs(y - centerY) / centerY;
            const deltaFactor = Math.pow(distFromCenterY, 3) * 6;
            const currentRiverRadius = riverBaseRadius + deltaFactor;

            for (let x = 0; x < width; x++) {
                const index = y * width + x;
                const distFromRiverX = Math.abs(x - riverCenterX);

                // --- Land Bridge Logic (Hourglass) ---
                // Center (dist=0) -> 1 tile wide (0.5 radius)
                // Shore (dist=w/2) -> 5 tiles wide (2.5 radius)
                const distFromMapCenterX = Math.abs(x - centerX);
                const bridgeHalfHeight = 0.5 + (distFromMapCenterX / (width / 2)) * 2.0;

                const distFromBridgeY = Math.abs(y - centerY);
                const isInsideBridge = distFromBridgeY <= bridgeHalfHeight;

                // --- Carving ---
                // Strictly cuts water. No sand logic here (handled by applyBeaches).
                if (distFromRiverX < currentRiverRadius) {
                    if (!isInsideBridge) {
                        // Only cut if we aren't already water (optimization)
                        if (data[index] !== TILE_SEA) {
                            data[index] = TILE_SEA;
                        }
                    }
                }
            }
        }
    }

    private removeArtifacts(input: number[], width: number, height: number): number[] {
        const output = [...input];

        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const idx = y * width + x;
                const tile = input[idx];

                const up = input[(y - 1) * width + x];
                const down = input[(y + 1) * width + x];
                const left = input[y * width + (x - 1)];
                const right = input[y * width + (x + 1)];

                // 1. Remove Single Dots (Despeckle)
                if (tile !== up && tile !== down && tile !== left && tile !== right) {
                    output[idx] = up;
                    continue;
                }

                // 2. Remove Trapped Water Pockets
                if (tile === TILE_SEA) {
                    if (up !== TILE_SEA && down !== TILE_SEA && left !== TILE_SEA && right !== TILE_SEA) {
                        output[idx] = up;
                    }
                }

                // 3. Remove Mini Sand Islands in Grass
                if (tile === TILE_SAND) {
                    if (up !== TILE_SEA && down !== TILE_SEA && left !== TILE_SEA && right !== TILE_SEA) {
                        output[idx] = TILE_MEADOW;
                    }
                }

                // 4. Remove Mini Grass Islands in Water
                if (tile === TILE_MEADOW || tile === TILE_ROCK) {
                    if (up === TILE_SEA && down === TILE_SEA && left === TILE_SEA && right === TILE_SEA) {
                        output[idx] = TILE_SEA;
                    }
                }
            }
        }
        return output;
    }
}