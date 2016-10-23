var aneObj = function () {

    this.tootx = [];//控制点的X坐标

    this.headx = [];//海奎顶点的结束x坐标
    this.heady = [];//海奎顶点的结束y坐标

    this.amp=[];//海奎左右摆动范围的值

    this.alpha = 0;//传入正弦函数的值
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.tootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.tootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random()*50+30;
    }
}
aneObj.prototype.draw = function () {

    this.alpha = this.alpha > 10000 ? 0 : this.alpha;
    this.alpha += deltaTime * 0.0008;
   // this.alpha += 0.005;
    var l = Math.sin(this.alpha)//正弦函数，无论传入的参数是多少，返回的都是-1到1之间来回平滑过度；

    ctx2.save();
    ctx2.globalAlpha = 0.6;//设置海奎的透明度
    ctx2.lineWidth = 20;   //设置海奎宽度
    ctx2.lineCap = 'round'; //设置海奎为圆头
    ctx2.strokeStyle ="#3b154e" ;
  
 
     var  x = this.tootx;
    for (var i = 0,k=this.num; i < k; i++) {
        ctx2.beginPath();
        ctx2.moveTo(x[i], canHeight);//开始坐标
        //二次贝赛曲线
        this.headx[i] = x[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(x[i], canHeight - 160, this.headx[i], this.heady[i]);

        ctx2.stroke();
    }
    ctx2.restore();
}