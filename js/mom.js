var momObj = function () {
    //大鱼坐标
    this.x;
    this.y;
    this.angle = 0;

    //大鱼尾巴图片摇动时间间隔
    this.momTailIimer = 0;
    //大鱼尾巴图片计数
    this.momTailCount = 0;

    //大鱼眨眼睛时间间隔
    this.momEyeIimer = 0;
    //大鱼尾巴图片计数
    this.momEyeCount = 0;
    //大鱼眨眼睛时间间隔
    this.momEyeInterval = 1000;

    //血量图片计数
    this.momBodyCount = 0;
}
momObj.prototype.init = function () {
    //初始化大鱼坐标
    this.x = canWidth / 2;
    this.y = canHeight / 2;
    //给画布1绑定鼠标移动事件
    can1.addEventListener("mousemove", onMouseMove, false);
   
}
momObj.prototype.draw = function () {

    //让大鱼的坐标趋向于鼠标的坐标
    this.x = lerpDistance(mx, this.x, 0.97);
    this.y = lerpDistance(my, this.y, 0.97);

    //计算偏移角度
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    //鼠标和大鱼之间的角度差
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;//返回的是-PI到PI之间值
    //让大鱼的角度趋向于鼠标的角度
    this.angle = lerpAngle(beta, this.angle, 0.5);

    //尾巴摇动
    var momTailIimer = this.momTailIimer += deltaTime;
    //当时间大于50毫秒时
    if (momTailIimer > 50) {
        //设置下帧图片，共8张图片
        this.momTailCount = (this.momTailCount + 1) % 8;
        //重置间隔时间
        this.momTailIimer %= 50;
    }

    //眨眼睛
    this.momEyeIimer += deltaTime;
    //this.babyEyeIimer 和 this.babyEyeIimer两个时间间隔来控制睁开眼，和闭眼的时长
    if (this.momEyeIimer > this.momEyeInterval) {

        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeIimer %= this.momEyeInterval;

        if (this.momEyeCount == 0) {
            //睁开眼睛到闭眼的时间间隔
            this.momEyeInterval = Math.random() * 2500 + 200;
        } else {
            //闭眼到睁开眼睛的时间间隔
            this.momEyeInterval = 200;
        }
    }


    //设置摇动尾巴的第几张图片
    var momTailCount = this.momTailCount;
    //设置眼睛的第几张图片
    var momEyeCount = this.momEyeCount;

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    //绘制摆的尾巴
    ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width / 2 + 30, -momTail[momTailCount].height / 2);

    //绘制血量图的身体
    var momBodyCount = this.momBodyCount;
    //如果大鱼吃到蓝色果实
    if (data.double == 1) {
        //大鱼吃到蓝色果实，改变血量图片颜色
        ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width / 2, -momBodyOra[momBodyCount].height / 2);
    } else {
       //大鱼吃到黄色果实，改变血量图片颜色
        ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width / 2, -momBodyBlue[momBodyCount].height / 2);
    }
   
    //绘制会眨眼的眼睛
    ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width / 2, -momEye[momEyeCount].height / 2);
    ctx1.restore();
}
//大鱼跟鼠标游动
function onMouseMove(e) {
    //如果小鱼死亡
    if (baby.gameOver) return;
    //设置鼠标坐标值
    if (e.offSetX || e.layerX) {
        mx = e.offSetX == undefined ? e.layerX : e.offSetX;
        my = e.offSetY == undefined ? e.layerY : e.offSetY;
    }
}