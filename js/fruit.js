var fruitObj = function () {
    this.alive = [];//果实是否可用
    //果实坐标
    this.x=[];
    this.y = [];

    //果实大小
    this.l = [];

    //果实长大和漂浮的速度
    this.spd = [];
    this.fruitType = [];//果实类型

    this.orange = new Image();//黄色果实图片
    this.blue = new Image(); //蓝色果实图片

    this.No =[];//果实长在哪个海奎上
}
fruitObj.prototype.num = 30;//设置30个果实

fruitObj.prototype.init = function () {
    for (var i = 0,l=this.num; i < l; i++) {
        this.alive[i] = false;

        this.x[i]=0;
        this.y[i] = 0;

        this.No[i] = 0;
        this.fruitType[i] = "";

        //速度
        this.spd[i] = Math.random() * 0.05 + 0.003;
    }

    this.orange.src = 'css/src/fruit.png';
    this.blue.src = 'css/src/blue.png';
}
fruitObj.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        //控制果实类型
        var pic = this.orange;
        if (this.fruitType[i] == "blue") {
            pic = this.blue;
        }

        //果实的x坐标，因为海奎是摆动的，所以果实还没长大之前也要跟随海奎的X坐标动态改变
        var NO = ane.headx[this.No[i]];

        //果实大小
        var L = this.l[i];

        //检查可用的果实，也就是显示在屏幕上的果实
        if (this.alive[i]) {
            //控制deltaTime的值，就是当切换窗口时，再切换回来这个值可能会很大
            deltaTime = deltaTime > 30 ? 30 : deltaTime;

          //控制果实大小，果实小于15，说明果实还没长大
            if (L < 15) {
                //果实不断增大
                this.l[i] += deltaTime * this.spd[i];
                L = this.l[i];
               //果实还没有成熟把它设置在海奎那里随海奎摆动
                ctx2.drawImage(pic, NO - L * 0.5, ane.heady[this.No[i]] - L * 0.5, L, L);

                //设置果实成熟后最后一次在海奎上的X坐标
               this.x[i] = NO;
           }
            else {
                //果实成熟改变果实的Y坐标，让果实上浮
               this.y[i] -= deltaTime * this.spd[i];
               //果实成熟脱离海奎 果实不在随海奎摆动
               ctx2.drawImage(pic, this.x[i] - L * 0.5, this.y[i] - L * 0.5, L, L);
                }
            //海奎的y坐标小于0时，把它设置为false;
                if (this.y[i] < 8) {
                    this.alive[i] = false;//果实闲置
                }
        }
     
    }
}
fruitObj.prototype.born = function (i) {

    //随机设置果实生长的位置
    this.No[i] = Math.floor(Math.random() * (ane.num - 1));
    //设置果实的Y坐标
    this.y[i] = ane.heady[this.No[i]];

    //果实大小
    this.l[i] = 0;

    //果实可用
    this.alive[i] = true;

    //随机设置果实的类型
    var aa = Math.random();
    if (aa < 0.7) {
        this.fruitType[i] = 'orange';//黄色果实为70%
    } else {
        this.fruitType[i] = 'blue';//蓝色果实为30%
    }
}

//检查屏幕上有多少个果实
function fruitMonitor() {
    var num = 0;//记录屏幕果实数量
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) num++;

    }
    //屏幕小于14个就生成新的海奎
    if (num < 15) {
        //生成海奎
        sendFruit();
        return;
    }
}

function sendFruit() {
   
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}
//该方法是被collision文件调用，用于被鱼吃掉的果实；
fruitObj.prototype.bade = function (i) { 
    this.alive[i] = false;
}