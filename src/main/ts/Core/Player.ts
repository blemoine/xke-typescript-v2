class Player {
    constructor(private _score:number = 0) {

    }



    get score():string {
        if (this._score <= 1) {
            return '' + this._score + ' point';
        } else {
            return '' + this._score + ' points';
        }
    }

    addPoints(points:number) {
        this._score += points;
    }

    displayScore() {
        $('#score').html(this.score);
    }
}