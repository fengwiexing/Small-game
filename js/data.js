var dataObj = function () {
    this.fruitNum = false;//大鱼是否吃到果实
    this.double = 1;//默认吃到黄色的果实分值为1
    this.score = 0;
    this.H = 0;
}

dataObj.prototype.draw = function () {
    var w = canWidth / 2,
        h = canHeight - 30;
    //绘制显示信息
    ctx1.save();
    ctx1.fillStyle = 'white';
    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center';
    ctx1.shadowColor = "#999";
    ctx1.shadowOffsetX = 2;
    ctx1.shadowOffsetY = 2;
    //如果小鱼死亡
    if (baby.gameOver) {

        if (this.H >= canHeight / 2) {
            ctx1.fillText('小鱼儿饿死了 ', w, this.H);
            ctx1.fillText('SCORE: ' + this.score, w, h);
            return;
        }
        //动态传入提示信息
        this.H = this.H++ > canHeight / 2?canHeight / 2:this.H++;
        ctx1.fillText('小鱼儿饿死了 ', w, this.H);
        ctx1.fillText('SCORE: ' + this.score, w, h);
        return;
    }
    //绘制显示分数
    ctx1.fillText('SCORE: ' + this.score, w, h);
    ctx1.restore();
}
//计算分值
dataObj.prototype.addScore = function () {
    this.score += this.double * 100;
   
}