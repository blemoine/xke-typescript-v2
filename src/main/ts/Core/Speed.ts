class Speed {
    constructor(public x:number = 0, public y:number = 0) {
    }

    norm():number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    angleToFrame() {
        var norm = this.norm();
        var cos = this.x / norm;
        var sin = this.y / norm;

        var signe = Math.asin(sin) > 0 ? 1 : -1;
        return signe * Math.acos(cos);
    }

    rotate(angle) {
        var norm = this.norm();
        this.x = norm * Math.cos(angle);
        this.y = norm * Math.sin(angle);
    }
}