
//大鱼喂小鱼的产生的圆圈，和大鱼吃果实产生的圆圈的对象是一样的，
var haloObj = function () {
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}
haloObj.prototype.num = 5;
haloObj.prototype.init = function () {
    for (var i = 0, l = this.num; i < l ; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
        this.x[i] = 0;
        this.y[i] = 0
    }
}
haloObj.prototype.draw = function () {
    ctx1.save();
    ctx1.lineWidth = 5;
    for (var i = 0, l = this.num; i < l ; i++) {
        if (this.alive[i]) {
            this.r[i] += deltaTime * 0.05;
            if (this.r[i] > 70) {
                this.alive[i] = false;
                return;
            }
            var alpha = 1 - this.r[i] / 70;
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.strokeStyle = "rgba(255, 9, 8," + alpha + ")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
}
haloObj.prototype.born = function (fruitX, fruitY) {
    for (var i = 0, l = this.num; i < l ; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = fruitX;
            this.y[i] = fruitY;
            return;
        }
    }
}