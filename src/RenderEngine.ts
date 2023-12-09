import { Assets } from "./Assets";
import { GameState, Item } from "./types/GameState";

export const setup = (context: CanvasRenderingContext2D) => {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.fillStyle = '#80af49'
    context.fillRect(0, 0, window.innerWidth, window.innerHeight)
}

export const render = (context: CanvasRenderingContext2D, gameState: GameState, assets: Assets) => {
    drawPlayerWithWeapon(context, assets, context.canvas.width / 2, context.canvas.height / 2, gameState.thisPlayerState.direction, gameState.thisPlayerState.weaponIdx);
    drawWorld(context, assets, gameState, gameState.thisPlayerState.coordinates.x, gameState.thisPlayerState.coordinates.y);
};

const drawPlayerWithWeapon = (context: CanvasRenderingContext2D, assets: Assets, x: number, y: number, direction: number, weaponIdx: number) => {
    drawPlayer(context, assets, x, y);
    if (weaponIdx === 1) {
        drawHandUnderGun(context, assets, x, y, direction);
        drawGun(context, assets, x, y, direction);
        drawHandOverGun(context, assets, x, y, direction);
    } else if (weaponIdx === 2) {
        drawHandsWithoutGun(context, assets, x, y, direction)
    }
}


const drawSprite = (ctx: CanvasRenderingContext2D, assets: Assets, spriteName: string, x: number, y: number) => {
    const asset = assets['sprites.png'];
    const sprite = asset.sprites[spriteName];
    ctx.drawImage(asset.image, sprite.sx, sprite.sy, sprite.sw, sprite.sh, x, y, sprite.sw, sprite.sh);
}

const drawWorld = (ctx: CanvasRenderingContext2D, assets: Assets, gameState: GameState, player_offset_x: number, player_offset_y: number) => {
    const offset_x = player_offset_x - ctx.canvas.width / 2;
    const offset_y = player_offset_y - ctx.canvas.height / 2;
    gameState.items.forEach((item) => drawSprite(ctx, assets, item.type, item.coords.x-offset_x, item.coords.y-offset_y));
    gameState.otherPlayerStates.forEach((player) => drawPlayerWithWeapon(ctx, assets, player.coordinates.x - offset_x, player.coordinates.y - offset_y, player.direction, 1));
}

const drawPlayer = (ctx: CanvasRenderingContext2D, assets: Assets, x: number, y: number) => {
    ctx.save();
    ctx.translate(-assets['sprites.png'].sprites['player'].sw/2, -assets['sprites.png'].sprites['player'].sh/2)
    drawSprite(ctx, assets, 'player', x, y);
    ctx.restore();
}

const drawGun = (ctx: CanvasRenderingContext2D, assets: Assets, x: number, y: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    // rotate
    ctx.rotate(rotation*Math.PI/180);
    // offset by width
    ctx.translate(assets['sprites.png'].sprites['gun'].sw+assets['sprites.png'].sprites['player'].sw/2-2, -assets['sprites.png'].sprites['gun'].sh/2);
    // flip across y axis
    ctx.scale(-1, 1);
    drawSprite(ctx, assets, 'gun', 0, 0);
    ctx.restore();
}

const drawHandUnderGun = (ctx: CanvasRenderingContext2D, assets: Assets, x: number, y: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    // rotate
    ctx.rotate(rotation*Math.PI/180);
    // offset by width
    ctx.translate(assets['sprites.png'].sprites['gun'].sw+assets['sprites.png'].sprites['hand'].sw/2, -assets['sprites.png'].sprites['hand'].sh/2);
    // flip across y axis
    ctx.scale(-1, 1);
    drawSprite(ctx, assets, 'hand', 0, 0);
    ctx.restore();
}

const drawHandOverGun = (ctx: CanvasRenderingContext2D, assets: Assets, x: number, y: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
    // rotate
    ctx.rotate(rotation*Math.PI/180);
    // offset by width
    ctx.translate(assets['sprites.png'].sprites['player'].sw/2+assets['sprites.png'].sprites['hand'].sw/2, -assets['sprites.png'].sprites['hand'].sh/2)
    // flip across y axis
    ctx.scale(-1, 1)
    drawSprite(ctx, assets, 'hand', 0, 0)
    ctx.restore()
}

const drawHandsWithoutGun = (ctx: CanvasRenderingContext2D, assets: Assets, x: number, y: number, rotation: number) => {
    ctx.save();
    ctx.translate(x, y);
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