/// <reference path="Brick.ts" />
/// <reference path="Ball.ts" />

module Lvl {

    export class Level {
        constructor(public bricks:Brick[]) {
        }

        finished():boolean {
            return this.bricks.filter((brick) => brick.destructible).length == 0;
        }

        collidingBrick(ball:Ball):Brick {
            return this.bricks.filter((brick) => {
                return !brick.isNotColliding(ball);
            })[0];
        }

        updateCollidingBrick(ball:Ball) {
            var collidingBrick = this.collidingBrick(ball);
            if (collidingBrick.destructible) {
                collidingBrick.live = collidingBrick.live - 1;
            }
            this.bricks = this.bricks.filter((brick) => {
                return brick.live > 0;
            });
        }
    }

    export interface LevelDescriptor {
        bricks:Brick[];
    }

    export var levelsDescriptor:LevelDescriptor[] = Lvl.levelsDescriptor || [];

    export function createLevel(index:number):Level {
        var descriptor = levelsDescriptor[index];
        return new Level(descriptor.bricks.slice(0));
    }

}