module Lvl {

    declare var Brick;
    declare var IndestructibleBrick;
    declare var ThreeLiveBrick;


    export class Level {

        brickDestroyedListeners:Array<(IBrick) => boolean> = [];

        constructor(public bricks:IBrick[]) {
        }

        finished():boolean {
            return this.bricks.filter((brick) => brick.destructible).length == 0;
        }

        collidingBrick(ball:Ball):IBrick {
            return this.bricks.filter((brick) => brick.isColliding(ball))[0];
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
        bricks:IBrick[];
    }

    export var levelsDescriptor:Array< () => LevelDescriptor> = Lvl.levelsDescriptor || [];


    levelsDescriptor.push(() => {
        if (typeof Brick != 'undefined') {
            return {bricks: [
                new Brick(90, 50),
                new Brick(90 + Brick.width, 50),
                new Brick(90, 50 + Brick.height),
                new Brick(90 + Brick.width, 50 + Brick.height)
            ]}
        } else {
            throw new Error('You must define Brick')
        }
    });


    levelsDescriptor.push(() => {
        if (typeof Brick != 'undefined' && typeof IndestructibleBrick != 'undefined') {
            return {bricks: [
                new Brick(90 + Brick.width, 50),
                new Brick(90 + Brick.width, 50 + Brick.height),
                new Brick(90 + 2 * Brick.width, 50),
                new Brick(90 + 2 * Brick.width, 50 + Brick.height),
                new IndestructibleBrick(90, 50),
                new IndestructibleBrick(90, 50 + Brick.height),
                new IndestructibleBrick(90, 50 + Brick.height),
                new IndestructibleBrick(90 + 3 * Brick.width, 50),
                new IndestructibleBrick(90 + 3 * Brick.width, 50 + Brick.height)
            ]}
        } else {
            throw new Error('You must define Brick')
        }
    });

    levelsDescriptor.push(() => {
        if (typeof Brick != 'undefined' && typeof IndestructibleBrick != 'undefined' && ThreeLiveBrick != 'undefined') {
            return {bricks: [
                new Brick(90 + Brick.width, 50 + Brick.height),
                new Brick(90 + 2 * Brick.width, 50),
                new ThreeLiveBrick(90 + Brick.width, 50),
                new ThreeLiveBrick(90 + 2 * Brick.width, 50 + Brick.height),
                new IndestructibleBrick(90, 50),
                new IndestructibleBrick(90, 50 + Brick.height),
                new IndestructibleBrick(90, 50 + Brick.height),
                new IndestructibleBrick(90 + 3 * Brick.width, 50),
                new IndestructibleBrick(90 + 3 * Brick.width, 50 + Brick.height)
            ]}
        } else {
            throw new Error('You must define Brick')
        }
    });

    export function createLevel(index:number):Level {
        var descriptor = levelsDescriptor[index]();
        return new Level(descriptor.bricks.slice(0));
    }

}