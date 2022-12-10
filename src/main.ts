import { Game } from "./models/Game";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

const game = new Game(ctx);
game.draw();

const update = () => {
    game.draw()
    requestAnimationFrame(update);
}

update();

window.addEventListener('keydown', (event: KeyboardEvent) => {
    const k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            game.player.leftPressed = true;
        } else if (k == 39 || k == 68) {
            // right arrow or d
            game.player.rightPressed = true;
        }
    }, 1);
})

window.addEventListener('keypress', (event: KeyboardEvent) => {
    const k = event.keyCode;
    setTimeout(() => {
        if (k == 32) {
            game.player.shoot();
        }
    }, 1);
})

window.addEventListener('keyup', (event: KeyboardEvent) => {
    const k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            game.player.leftPressed = false;
        } else if (k == 39 || k == 68) {
            // right arrow or d
            game.player.rightPressed = false;
        }
    }, 1);
})
