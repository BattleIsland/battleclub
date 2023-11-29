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
    if (gameState.thisPlayerState.weaponIdx === 1) {
        drawHandUnderGun(context, assets, gameState.thisPlayerState.direction);
        drawGun(context, assets, gameState.thisPlayerState.direction);
        drawHandOverGun(context, assets, gameState.thisPlayerState.direction);
    } else if (gameState.thisPlayerState.weaponIdx === 2) {
        drawHandsWithoutGun(context, assets, gameState.thisPlayerState.direction);
    }
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

const drawGun = (ctx: CanvasRenderingContext2D, assets: Assets, rotation: number) => {
    ctx.save();
    // move to middle
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    // rotate
    ctx.rotate(rotation*Math.PI/180);
    // offset by width
    ctx.translate(assets['sprites.png'].sprites['gun'].sw+assets['sprites.png'].sprites['player'].sw/2-2, -assets['sprites.png'].sprites['gun'].sh/2);
    // flip across y axis
    ctx.scale(-1, 1);
    drawSprite(ctx, assets, 'gun', 0, 0);
    ctx.restore();
}

const drawHandUnderGun = (ctx: CanvasRenderingContext2D, assets: Assets, rotation: number) => {
    ctx.save();
    // move to middle
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    // rotate
    ctx.rotate(rotation*Math.PI/180);
    // offset by width
    ctx.translate(assets['sprites.png'].sprites['gun'].sw+assets['sprites.png'].sprites['hand'].sw/2, -assets['sprites.png'].sprites['hand'].sh/2);
    // flip across y axis
    ctx.scale(-1, 1);
    drawSprite(ctx, assets, 'hand', 0, 0);
    ctx.restore();
}

const drawHandOverGun = (ctx: CanvasRenderingContext2D, assets: Assets, rotation: number) => {
    ctx.save();
    // move to middle
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    // rotate
    ctx.rotate(rotation*Math.PI/180);
    // offset by width
    ctx.translate(assets['sprites.png'].sprites['player'].sw/2+assets['sprites.png'].sprites['hand'].sw/2, -assets['sprites.png'].sprites['hand'].sh/2)
    // flip across y axis
    ctx.scale(-1, 1)
    drawSprite(ctx, assets, 'hand', 0, 0)
    ctx.restore()
}

const drawHandsWithoutGun = (ctx: CanvasRenderingContext2D, assets: Assets, rotation: number) => {
    ctx.save();
    // move to middle
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    // rotate
    ctx.rotate(rotation*Math.PI/180);
    // offset by width
    ctx.translate(assets['sprites.png'].sprites['player'].sw/2+assets['sprites.png'].sprites['hand'].sw/4, -assets['sprites.png'].sprites['hand'].sh/2)
    // flip across y axis
    ctx.scale(-1, 1)
    drawSprite(ctx, assets, 'hand', 0, 30)
    drawSprite(ctx, assets, 'hand', 0, -30)
    ctx.restore()
}