import { GameObject } from "./GameObject";
import { Player } from "./Player";

export class Bullet extends GameObject {
    
    public static readonly Height = 10;
    public static readonly Width = 10;
    public static readonly Speed = 5;

    get reachedEnd(): boolean {
        return this.bottomLeftPoint.y === 0;
    }

    hitAlien = false;

    constructor(x: number, y: number, public ctx: CanvasRenderingContext2D) {
        super(x, y, Bullet.Height, Bullet.Width)
    } 

    move(): void {
        this.y -= Bullet.Speed;
    }

    draw(): void {
        this.ctx.save();
        this.ctx.translate(this.x + ((Player.Width / 2) - Bullet.Width) + Bullet.Width , this.y - Bullet.Height / 2);
        this.ctx.translate(
            -this.x - this.width / 2,
            -this.y - this.height / 2
        )
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.height, this.width);
        // this.visualizePoints(this.ctx);
        this.ctx.restore();
    }
} 