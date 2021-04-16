
var screen=document.getElementById('screen');
var pic1=document.getElementById('pic1');
var pic2=document.getElementById('pic2');
var plane=document.getElementById('plane');
//点击游戏开始
var jsStart=document.getElementById("startMenu");
jsStart.onclick = function start(){
    starGame();
    jsStart.style.display="none";

};


function starGame() {
    //控制背景移动
    var bjTimer=setInterval(function () {
        pic1.style.top=pic1.offsetTop+1+'px';
        pic2.style.top=pic2.offsetTop+1+'px';
        if (pic1.offsetTop>=700){
            pic1.style.top=-700+'px';
        }
        if (pic2.offsetTop>=700) {
            pic2.style.top = -700 + 'px';
        }
    },10);
//鼠标控制飞机移动
//    setInterval(remove,10);
    document.addEventListener('mousemove', mousemovePlane);
    function mousemovePlane(el){
        var x = el.pageX - screen.offsetLeft - plane.offsetWidth/2;
        var y = el.pageY - screen.offsetTop - plane.offsetHeight/2;
        plane.style.top = y + 'px';
        plane.style.left = x + 'px';
        //判断鼠标移动出屏幕，小飞机停止在边缘
        switch (true) {
            case el.pageX<screen.offsetLeft+plane.offsetWidth/2:
                plane.style.top =el.pageY-screen.offsetTop-plane.offsetHeight/2+'px';
                plane.style.left=0+'px';
                break;
            case el.pageY<screen.offsetTop+plane.offsetHeight/2:
                plane.style.top =0+'px';
                plane.style.left =el.pageX-screen.offsetLeft-plane.offsetWidth/2+ 'px';
                break;
            case el.pageX>(screen.offsetWidth+screen.offsetLeft-60):
                // plane.style.top = y + 'px';
                plane.style.left=screen.offsetWidth-80+'px';
                break;
            case (el.pageX<screen.offsetLeft+plane.offsetWidth/2 && el.pageY<screen.offsetTop+plane.offsetHeight/2):
                plane.style.left=0+'px';
                plane.style.top =0+'px';
                break;
        }
        planX=plane.style.left;
        planY=plane.style.top;
    }
//键盘控制飞机移动
 /*       document.onkeydown=function(event) {
        var event=event||window.event;
        var speedL=18;
        var speedR=18;
        var speedT=18;
        var speedB=18;
        if (plane.offsetLeft>=screen.offsetWidth-plane.offsetWidth){
            speedR=0;
        }if (plane.offsetLeft<=0){
            speedL=0;
        }if (plane.offsetTop>=screen.offsetHeight-plane.offsetHeight){
            speedB=0;
        }if (plane.offsetTop<=0){
            speedT=0;
        }
        switch (event.keyCode) {
            case 65:plane.style.left=plane.offsetLeft-speedL+'px';break;
            case 68:plane.style.left=plane.offsetLeft+speedR+'px';break;
            case 87:plane.style.top=plane.offsetTop-speedT+'px';break;
            case 83:plane.style.top=plane.offsetTop+speedB+'px';break;
        }
    };*/

//子弹发射
    var bulletTimer=setInterval(function () {
        var bullet=document.createElement('div');
        bullet.className='bullet';
        screen.appendChild(bullet);
        bullet.style.left=plane.offsetLeft+52+'px';
        bullet.style.top=plane.offsetTop-35+'px';

        //让子弹飞
        var bulletFly=setInterval(function () {
            bullet.style.top=bullet.offsetTop-5+'px';
            if (bullet.offsetTop<0){
                clearInterval(bulletFly);
                screen.removeChild(bullet);
            }
        },40);

    },500);
//随机数
    function randomNum(min,max) {
        return parseInt(Math.random()*(max-min)+min);
    }

    //敌人落下
    var tankTimer=setInterval(tanksDown,1000);
    function tanksDown() {
        var tank=document.createElement('div');
        tank.className='tank';
        screen.appendChild(tank);
        tank.style.left=randomNum(0,700)+'px';
        var tankDown=setInterval(function () {
            tank.style.top=tank.offsetTop+2+'px';
            if (tank.offsetTop>screen.offsetHeight){
                clearInterval(tankDown);
                screen.removeChild(tank);
            }
        },10);
        tank.timer=tankDown;
    }
    var current=0;
    var crashTimer=setInterval(clickCrash,50);
    function clickCrash () {
        var bullets=document.getElementsByClassName("bullet");
        var tanks=document.getElementsByClassName("tank");
        //判断子弹是否击中物体
        for (var i=0;i<tanks.length;i++){
            for (var j=0;j<bullets.length;j++){
                var t=tanks[i];
                var b=bullets[j];
                if (crash(b,t)){
                    current++;
                    var score=document.getElementById('score');
                    //计算分数
                    score.innerHTML='您的得分为：'+current;
                    //物体被子弹击中后停止定时器并消失
                    clearInterval(tanks.timer);
                    clearInterval(bullets.timer);
                    screen.removeChild(b);
                    screen.removeChild(t);
                }
            }
        }
    }
//十秒后下落提速
   /* function tanksTimer() {
        clearInterval(tankTimer);
        setInterval(tanksDown,800);
    }
    setTimeout(tanksTimer,1000*10);*/


    //死亡检测`
    var dieTimer=setInterval(function () {
        var tanks=document.getElementsByClassName('tank');
        //物体下落到最低端时游戏结束
        for (var i=0;i<tanks.length;i++){
            var tank=tanks[i];
            if (parseInt(tank.style.top)>715){
                for (var j = 0; j < 100; j++) {
                    clearInterval(j);
                }

                gameOver();
            }
            //物体与飞机相撞时游戏结束
            if(crash(tank,plane)) {
                for (var j = 0; j < 100; j++) {
                    clearInterval(j);
                }
                    gameOver();
                }
            }
    },50);

//游戏结束
    function gameOver() {
        document.removeEventListener('mousemove', mousemovePlane);
                var span=document.createElement('span');
        span.className="gameOver";
        screen.appendChild(span);
        span.innerHTML='你输了，继续打卡学习吧!!!';
        var again=document.createElement('button');
        again.className='again';
        screen.appendChild(again);
        again.innerHTML="重新开始";
        again.onclick=function () {
            window.location.reload();
            again.style.display="none";
        }

    }

//碰撞检测
    function crash(obj1,obj2) {
        var obj1Left=obj1.offsetLeft;
        var obj2Left=obj2.offsetLeft;
        var obj1Width=obj1Left+obj1.offsetWidth;
        var obj2Width=obj2Left+obj2.offsetWidth;
        var obj1Top=obj1.offsetTop;
        var obj2Top=obj2.offsetTop;
        var  obj1Height=obj1Top+obj1.offsetHeight;
        var  obj2Height=obj2Top+obj2.offsetHeight;
        var left1;
        var top1;

        if (!(obj1Left>obj2Width||obj1Width<obj2Left||obj1Top>obj2Height||obj1Height<obj2Top)){
            return true
        }else {
            return false
        }

    }
}





