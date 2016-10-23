//大鱼和果实的碰撞检测
function momFruitsCollision() {
    //如果小鱼死亡
    if (baby.gameOver) return;

    //历遍所有的果实
    for (var i = 0; i < fruit.num; i++) {
        //如果果实在屏幕上
        if (fruit.alive[i]) {
            //fruit.x[i], fruit.y[i]为果实的坐标，mom.x, mom.y为大鱼坐标
            //calLength2()返回直角三角形斜边的平方,
            var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);

            //如果这个l的平方大于200时大鱼就吃掉果实，也就是大鱼和果实的距离小于20px时
            if (l < 400) {
                //果实被吃掉
                fruit.bade(i);
                //记录大鱼吃掉到果实
                data.fruitNum=true;
             
                //如果吃到蓝色的果实，否则分值为1；
                if (fruit.fruitType[i] == 'blue') {
                    //吃到蓝色果实分值为2；
                    data.double = 2;
                } else {
                    //吃到黄色果实
                    data.double = 1;
                }
               //计算大鱼吃的的果实的分值
                data.addScore();

                //大鱼吃到果实后设置大鱼血量，
                mom.momBodyCount++;
                if (mom.momBodyCount > 7) {
                    //血量图片只有8张
                    mom.momBodyCount = 7;
                }
                //大鱼吃果实产生的圆圈
                wave.born(fruit.x[i], fruit.y[i]);
            }
        }
    }
}

//小鱼跟大鱼的碰撞检测
function momBabyCollision() {
    //如果小鱼死亡
    if (baby.gameOver) return;
           //mom.x, mom.y为大鱼的坐标，baby.x, baby.y为小鱼坐标
            ////calLength2()返回直角三角形斜边的平方,
    var l = calLength2(mom.x, mom.y, baby.x, baby.y);

    //如果这个l大于400时大鱼就碰到小鱼，也就是大鱼和小鱼的距离小于20px时因为这个l就是这个距离的平方值、
        if (l < 400) {
                //如果大鱼吃到果实就充满小鱼的血量
            if (data.fruitNum) {
                //如果大鱼吃到果实就充满小鱼的血量，血量图片为第一张
                    baby.babyBodyCount = 0; 
                    data.fruitNum = false;
                    //喂小鱼产生的圆圈
                    halo.born(mom.x, mom.y);
                }
                //重置大鱼的血量图片为第一张
                    mom.momBodyCount = 0;
            }
}