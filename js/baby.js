var babyObj = function () {
    //小鱼坐标
    this.x;
    this.y;
    //小鱼尾巴图片摇动时间间隔
    this.babyTailIimer = 0;
    //小鱼尾巴图片计数
    this.babyTailCount = 0;

    //小鱼眨眼睛时间间隔
    this.babyEyeIimer = 0;
    //小鱼尾巴图片计数
    this.babyEyeCount = 0;
    //小鱼眨眼睛时间间隔
    this.babyEyeInterval = 1000;

    //小鱼血量图片时间间隔
    this.babyBodyIimer = 0;
    //小鱼血量图片计数
    this.babyBodyCount = 0;

    //小鱼是否生存
    this.gameOver = false;


    //小鱼的初始旋转角度
    this.angle=0
}
babyObj.prototype.init = function () {
    this.x = canWidth / 2;
    this.y = canHeight / 2;
}
babyObj.prototype.draw = function () {

    //让小鱼的坐标趋向于大鱼的坐标
    this.x = lerpDistance(mom.x, this.x, 0.99);
    this.y = lerpDistance(mom.y, this.y, 0.99);

    //计算偏移角度
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    //大鱼和小鱼之间的角度差
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;//返回的是-PI到PI之间值
    //让小鱼的角度趋向于大鱼的角度
    this.angle = lerpAngle(beta, this.angle, 0.5);

    //尾巴摇动
    var babyTailIimer = this.babyTailIimer += deltaTime;
    //当时间大于50毫秒时
    if (babyTailIimer > 50) {
        //设置下帧图片，共8张图片
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        //重置间隔时间
        this.babyTailIimer %= 50;
    }

    //眨眼睛
    this.babyEyeIimer += deltaTime;
    //this.babyEyeIimer 和 this.babyEyeIimer两个时间间隔来控制睁开眼，和闭眼的时长
    if (this.babyEyeIimer > this.babyEyeInterval) {

        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeIimer %= this.babyEyeInterval;
 
        if (this.babyEyeCount == 0) {
            //睁开眼睛到闭眼的时间间隔
            this.babyEyeInterval = Math.random() * 2500 + 200;
        } else {
            //闭眼到睁开眼睛的时间间隔
            this.babyEyeInterval = 200;
        }
    }

    //血量图片
    this.babyBodyIimer += deltaTime;

    //每过500毫秒改变一张血量图片
    if (this.babyBodyIimer > 450) {
        //血量图片张数
        this.babyBodyCount = this.babyBodyCount + 1;

        this.babyBodyIimer = 0;

        //血量图片最后一张
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            //小鱼死亡
            this.gameOver = true;
        }
    }

    //设置摇动尾巴的第几张图片
    var babyTailCount = this.babyTailCount;
    //设置眼睛的第几张图片
    var babyEyeCount = this.babyEyeCount;
    //设置血量的第几张图片
    var babyBodyCount = this.babyBodyCount;
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    //小鱼尾巴摆动图片
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width / 2 + 23, -babyTail[babyTailCount].height / 2);
    //小鱼血量身体图片
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width / 2, -babyBody[babyBodyCount].height / 2);
    //小鱼眨眼睛图片
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width / 2, -babyEye[babyEyeCount].height / 2);
    ctx1.restore();
}