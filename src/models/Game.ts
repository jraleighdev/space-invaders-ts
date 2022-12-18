import { Alien, Direction } from "./Alien";
import { Player } from "./Player";

export class Game {
    public static GameHeight = 800;
    public static GameWidth = 800;
    public static Margin = 10;

    public player: Player;
    public aliens: Alien[][] = [];
    public direction: Direction = Direction.Right;
    public speedModifier = 1;

    constructor(
        public ctx: CanvasRenderingContext2D
    ) {
        this.player = new Player(Game.GameWidth / 2 + Player.Width / 2, Game.GameHeight - Game.Margin - Player.Height, ctx)
        const alienMargin = 10;
        const numberOfColumns = Math.ceil((Game.GameWidth - Game.Margin * 2) / (Alien.Width + alienMargin)) - 4
        const numberOfRows = 10;
        for (let i = 1; i <= numberOfColumns; i++) {
            const column: Alien[] = [];
            for (let j = 1; j <= numberOfRows; j++) {
                const x = Game.Margin + (alienMargin + Alien.Width) * i;
                const y = (alienMargin + Alien.Height) * j;
                column.push(new Alien(x, y, i - 1, j - 1, this.ctx));
            }
            this.aliens.push(column);
        }
    }

    private flatAliens(): Alien[] {
        const tempArray: Alien[] = [];
        for (let i = 0; i <= this.aliens.length - 1; i++) {
            const column = this.aliens[i];
            for (let j = 0; j <= column.length - 1; j++) {
                tempArray.push(column[j])
            }
        }
        return tempArray;
    }

    public moveAliens() {
        let xMax = 0;
        let xMin = 0
        let yMax = 0;
        for (let i = 0; i <= this.aliens.length - 1; i++) {
            const column = this.aliens[i];
            for (let j = 0; j <= column.length - 1; j++) {
                const alien = column[j];
                if (alien.hitByBullet) {
                    console.log(alien);
                    column.splice(j, 1);
                    continue;
                }
                if (i == 0) {
                    xMax = alien.bottomRightPoint.x;
                    xMin = alien.bottomLeftPoint.x;
                    yMax = alien.bottomLeftPoint.y;
                } else if (alien.bottomLeftPoint.x < xMin) {
                    xMin = alien.bottomLeftPoint.x
                } else if (alien.bottomRightPoint.x > xMax) {
                    xMax = alien.bottomRightPoint.x;
                } else if (alien.bottomLeftPoint.y > yMax) {
                    yMax = alien.bottomLeftPoint.y
                }
            }

        }

        let directionSwitched = false;

        switch (this.direction) {
            case Direction.Right:
                if (xMax > Game.GameWidth - Game.Margin * 2) {
                    this.direction = Direction.Left;
                    directionSwitched = true;
                }
                break;
            case Direction.Left:
                if (xMin <= Game.Margin * 2) {
                    this.direction = Direction.Right
                    directionSwitched = true;
                }
        }

        this.flatAliens().forEach(alien => {
            let newX = alien.x
            // const newY = alien.y;
            switch (this.direction) {
                case Direction.Right:
                    newX += Alien.Speed * (this.speedModifier);
                    alien.color = 'green';
                    break;
                case Direction.Left:
                    newX -= Alien.Speed * (this.speedModifier);
                    alien.color = 'teal'
                    break;
            }

            const newY = directionSwitched ? alien.y += Alien.Speed * 2 * this.speedModifier : alien.y

            alien.move(newX, newY)
        })
    }

    checkBulletCollisions() {
        if (this.player.bullets.length === 0) return;
        for (let i = 0; i <= this.aliens.length - 1; i++) {
            const column = this.aliens[i];
            if (column.length > 0) {
                const alien = column[column.length - 1];
                const bullet = this.player.bullets[0];
                const checkY = bullet.topCenterPoint.y + 2 < alien.bottomLeftPoint.y;
                const checkX = bullet.topCenterPoint.x > alien.bottomLeftPoint.x && bullet.topCenterPoint.x < alien.bottomRightPoint.x;
                bullet.hitAlien = checkX && checkY;
                if (bullet.hitAlien) {
                    if (this.speedModifier < 3) this.speedModifier += .03;
                    alien.hitByBullet = true;
                    break;
                }
            }
        }
    }

    public draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, Game.GameHeight, Game.GameWidth);
        this.ctx.strokeStyle = 'white'
        this.ctx.strokeRect(0, 0, Game.GameHeight, Game.GameWidth);
        this.flatAliens().forEach(x => x.draw());
        this.checkBulletCollisions();
        this.moveAliens();
        this.player.draw();
    }
}