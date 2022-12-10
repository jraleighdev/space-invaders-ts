import { GameObject } from "./GameObject";

export class Alien extends GameObject {
    public static readonly Height = 20;
    public static readonly Width = 20;
    public static readonly Speed = 1.5;

    hitByBullet = false;

    color = 'green';

    constructor(
        x: number,
        y: number,
        public column: number,
        public row: number,
        public ctx: CanvasRenderingContext2D
    ) {
        super(x, y, Alien.Height, Alien.Width)
    }

    move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        this.ctx.translate(
            -this.x - this.width / 2,
            -this.y - this.height / 2
        )
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.height, this.width);
        this.ctx.restore();
    }
}

export enum Direction {
    Right = 0,
    Left = 1
}