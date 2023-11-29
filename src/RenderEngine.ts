import { Assets } from "./Assets";
import { GameState, Item } from "./types/GameState";

export const setup = (context: CanvasRenderingContext2D) => {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.fillStyle = '#80af49'
    context.fillRect(0, 0, window.innerWidth, window.innerHeight)
}

export const render = (context: CanvasRenderingContext2D, gameState: GameState, assets: Assets) => {
    drawPlayer(context, assets);
    drawWorld(context, assets, gameState.items, 0, 0);
};


const drawSprite = (ctx: CanvasRenderingContext2D, assets: Assets, spriteName: string, x: number, y: number) => {
    const asset = assets['sprites.png'];
    const sprite = asset.sprites[spriteName];
    ctx.drawImage(asset.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, sprite.sw, sprite.sh);
}

const drawWorld = (ctx: CanvasRenderingContext2D, assets: Assets, items: Item[], offset_x: number, offset_y: number) => {
    items.forEach((item) => drawSprite(ctx, assets, item.type, item.coords.x-offset_x, item.coords.y-offset_y));
}

const drawPlayer = (ctx: CanvasRenderingContext2D, assets: Assets) => {
    ctx.save();
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    ctx.translate(-assets['sprites.png'].sprites['player'].sw/2, -assets['sprites.png'].sprites['player'].sh/2)
    drawSprite(ctx, assets, 'player', 0, 0);
    ctx.restore();
}