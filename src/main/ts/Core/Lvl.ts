module Lvl {

    export class Level {

        brickDestroyedListeners:Array<(Brick) => boolean>  = [];

        constructor(public bricks:Brick[]) {
        }

        finished():boolean {
            return this.bricks.filter((brick) => brick.destructible).length == 0;
        }

        collidingBrick(ball:Ball):Brick {
            return this.bricks.filter((brick) => !brick.isNotColliding(ball))[0];
        }

        updateCollidingBrick(ball:Ball) {
            var collidingBrick = this.collidingBrick(ball);
            if (collidingBrick.destructible) {
                collidingBrick.live = collidingBrick.live - 1;
            }

            var destroyedBricks = this.bricks.filter((brick) =>  brick.live <= 0);
            this.brickDestroyedListeners.forEach((listener) => {
                destroyedBricks.forEach((brick) => listener(brick));
            });

            this.bricks = this.bricks.filter((brick) =>  brick.live > 0);
        }
    }

    export interface LevelDescriptor {
        bricks:Brick[];
    }

    export var levelsDescriptor:LevelDescriptor[] = Lvl.levelsDescriptor || [];

    levelsDescriptor.push({
        bricks: [
            new Brick(90, 50),
            new Brick(90 + Brick.width, 50),
            new Brick(90, 50 + Brick.height),
            new Brick(90 + Brick.width, 50 + Brick.height)
        ]
    });

    levelsDescriptor.push({
        bricks: [
            new Brick(90 + Brick.width, 50),
            new Brick(90 + Brick.width, 50 + Brick.height),
            new Brick(90 + 2 * Brick.width, 50),
            new Brick(90 + 2 * Brick.width, 50 + Brick.height),
            new IndestructibleBrick(90, 50),
            new IndestructibleBrick(90, 50 + Brick.height),
            new IndestructibleBrick(90, 50 + Brick.height),
            new IndestructibleBrick(90 + 3 * Brick.width, 50),
            new IndestructibleBrick(90 + 3 * Brick.width, 50 + Brick.height)
        ]
    });

    levelsDescriptor.push({
        bricks: [
            new Brick(90 + Brick.width, 50 + Brick.height),
            new Brick(90 + 2 * Brick.width, 50),
            new ThreeLiveBrick(90 + Brick.width, 50),
            new ThreeLiveBrick(90 + 2 * Brick.width, 50 + Brick.height),
            new IndestructibleBrick(90, 50),
            new IndestructibleBrick(90, 50 + Brick.height),
            new IndestructibleBrick(90, 50 + Brick.height),
            new IndestructibleBrick(90 + 3 * Brick.width, 50),
            new IndestructibleBrick(90 + 3 * Brick.width, 50 + Brick.height)
        ]
    });


    export function createLevel(index:number):Level {
        var descriptor = levelsDescriptor[index];
        return new Level(descriptor.bricks.slice(0));
    }

}