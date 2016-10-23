
//大鱼吃到果实产生的圆圈
var waveObj = function () {
    //圆圈坐标
    this.x = [];
    this.y = [];

    this.alive = [];//圆圈是否闲置

    this.r = [];//圆圈半径
}
//设置有10个圆圈
waveObj.prototype.num = 10;

waveObj.prototype.init = function () {
    for (var i = 0, l = this.num; i < l ; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
    }
}
waveObj.prototype.draw = function () {
    ctx1.save();
    ctx1.lineWidth = 3;//圆圈线条宽度
    for (var i = 0, l = this.num; i < l ; i++) {
        //圆圈是否可用
        if ( this.alive[i]) {
            this.r[i] += deltaTime * 0.05;//圆圈动态半径

            //圆圈半径大于50
            if (this.r[i] > 50) { 
                this.alive[i] = false;//圆圈回收，圆圈不可用
                return;
            }
            //圆圈透明度，随半径的增大越透明
            var alpha = 1 - this.r[i] / 50;
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
            ctx1.stroke();
        }
    }
    ctx1.restore();
}

//大鱼吃到果实要绘制的函数
waveObj.prototype.born = function (fruitX, fruitY) {
    //
    for (var i = 0, l = this.num; i < l ; i++) {
        if (!this.alive[i]) {

            //设置圆圈可用
            this.alive[i] = true;
            //初始绘制圆圈的半径
            this.r[i] = 10;
            //设置要绘制圆圈的坐标
            this.x[i] = fruitX;
            this.y[i] = fruitY;
            return;
        }
    }
}