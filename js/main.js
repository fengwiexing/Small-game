
//函数入口
document.body.onload = agme;
//二个画布
var can1,
    can2,
    //二个画布的绘画环境
    ctx1,
    ctx2,
    //鼠标坐标
    mx,
    my,

    //记录开始时间
    lastTime,
    //每一帧绘制所有的时间
    deltaTime,

    //第一个画布绘制的背景图片
    bgPic = new Image(),
    //画布的尺寸
    canWidth,
    canHeight,

    //海奎对象
    ane,

    //果实对象
    fruit,

    //大鱼对象
    mom,
    //尾巴图片
    momTail = [],
    //眼睛图片
    momEye = [],
    //二种血量图片
    momBodyOra = [],
    momBodyBlue = [],

    //小鱼对象
    baby,
    //尾巴图片
    babyTail = [],
    //眼睛图片
    babyEye = [],
    //血量图片
    babyBody = [],

    //分值对象
    data,

    //大鱼吃果实产生的画圆，
    wave,
   //大鱼喂小鱼产生的画圆，
    halo,
    //漂浮物对象
    dust,
    //漂浮物图片
    dustPic=[];






//入口函数
function agme() {
    init();
    //开始时间
    lastTime =Date.now();
    deltaTime = 0;
    //背景图
    bgPic.src = 'css/src/background.jpg';
    bgPic.onload = function () {
       gameloop();
    }
}
//初始化数据
function init() {
    //获取画布
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2');
    ctx2 = can2.getContext('2d');
    canWidth = can1.width;
    canHeight = can1.height;
    //初始化鼠标坐标
    mx = canWidth / 2;
    my = canHeight / 2;
    //海奎
    ane = new aneObj();
    ane.init();
    //果实
    fruit = new fruitObj();
    fruit.init();
    //大鱼
    mom = new momObj();
    mom.init();
    //尾巴图片
    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "/css/src/bigTail" + i + ".png";
    }
    //眼睛图片
    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "/css/src/bigEye" + i + ".png";
    }
    //血量图片
    for (var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = "/css/src/bigSwim" + i + ".png";
        momBodyBlue[i].src = "/css/src/bigSwimBlue" + i + ".png";
    }

    //小鱼
    baby = new babyObj();
    baby.init();
    //尾巴图片
    for (var i=0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "/css/src/bigTail" + i + ".png";
    }
    //眼睛图片
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "/css/src/babyEye" + i + ".png";
    }
    //血量图片
    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "/css/src/babyFade" + i + ".png";
    }

    //计算分值
    data = new dataObj();

    //大鱼吃果实产生的画圆，
    wave = new waveObj();
    wave.init();

    //大鱼喂小鱼产生的画圆，
    halo = new haloObj();
    halo.init();

    //漂浮物图片
    dust = new dustObj();
    dust.init();
    //漂浮物图片
    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "/css/src/dust" + i + ".png";
    } 
}

//动画帧函数
function gameloop() {
    //每一帧的开始时间
    var now = Date.now();
    //每一帧所用的时间
    deltaTime = now - lastTime;
    window.requestAnimationFrame(gameloop);
    //上一帧时间
    lastTime = now;

    //绘制背景
    drawBackground();
  
    //海奎
    ane.draw();

    //果实
    fruit.draw();

    //控制屏幕有果实
    fruitMonitor();

   //清除画布1
    ctx1.clearRect(0, 0, canWidth, canHeight);
    //大鱼
    mom.draw();

    //小鱼
    baby.draw();

    //大鱼和果实的碰撞检测
    momFruitsCollision();
    //大鱼和小鱼的碰撞检测，就是大鱼喂小鱼
    momBabyCollision();

    //计算分值
    data.draw();

    //绘制特效鱼进食产生的圆圈
    wave.draw();
    halo.draw();

    //漂浮物
    dust.draw();
   
}