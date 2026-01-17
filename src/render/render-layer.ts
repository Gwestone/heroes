import type {Renderer} from "./renderer.ts";

export interface RenderLayer{
    render(renderer: Renderer): void;
}