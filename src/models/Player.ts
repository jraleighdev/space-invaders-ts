import { Bullet } from "./Bullet";
import { Game } from "./Game";
import { GameObject } from "./GameObject";

export class Player extends GameObject {

    public static readonly Height = 30;
    public static readonly Width = 30;
    public static readonly Speed = 5;

    private _leftPressed = false;
    private _rightPressed = false;

    get leftPressed(): boolean {
        return this._leftPressed;
    }

    set leftPressed(value: boolean) {
        this._leftPressed = value;
    }

    get rightPressed() {
        return this._rightPressed;
    }

    set rightPressed(value: boolean) {
        this._rightPressed = value;
    }

    public bullets: Bullet[] = []

    constructor(
        x: number,
        y: number,
        public ctx: CanvasRenderingContext2D,
    ) {
        super(x, y, Player.Height, Player.Width)
    }

    processMoves() {
        this.bullets.filter(bullet => bullet.reachedEnd || bullet.hitAlien).forEach(x => {
            const index = this.bullets.indexOf(x)
            this.bullets.splice(index, 1);
        });
        if (this.leftPressed) {
            this.left();
        } else if (this.rightPressed) {
            this.right();
        }
    }

    draw(): void {
        this.processMoves();
        this.ctx.save();
        this.ctx.translate(this.x + Player.Width / 2, this.y + Player.Height / 2);
        this.ctx.translate(
            -this.x - Player.Width / 2,
            -this.y - Player.Height / 2
        );
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.x, this.y, Player.Height, Player.Width);
        // this.visualizePoints(this.ctx);
        this.ctx.restore();
        this.bullets.forEach(x => {
            x.move();
            x.draw();
        });
    }

    left(): void {
        if (this.x > Game.Margin) {
            this.x -= Player.Speed;
        }
    }

    right(): void {
        if (this.topRightPoint.x < Game.GameWidth - Game.Margin) {
            this.x += Player.Speed;
        }
    }

    shoot(): void {
        // console.log(this)
        this.bullets.push(new Bullet(this.topLeftPoint.x, this.topLeftPoint.y, this.ctx));
    }

}