//屏幕
var screen=document.getElementById('screen')
//飞机
var plane=document.getElementById('plane')
//结束菜单
var gameOver=document.getElementById('gameOver')
//重新开始按钮
var again=document.getElementById('again')
//子弹
var bullets=document.getElementsByClassName('bullet')
//学习通
var tanks=document.getElementsByClassName('tank')
//分数
var score=document.getElementById('score')
//开始按钮
var Start=document.getElementById("start")
//开始页面
var startMenu=document.getElementById('startMenu')
//暂停图标
var changeImg=document.getElementById('change-img')
//暂停文字
var changeText=document.getElementById('change-text')
//定义游戏状态 0:暂停 1:开始 2:结束
var gameState=1
//子弹速度
var buSpeed=10
//坦克速度
var taSpeed=2
//定义分数
var current=0


//点击游戏开始
Start.onclick = function start(){
    starGame()
    startMenu.style.display="none"
}

//初始化游戏
function starGame() {

    //鼠标控制飞机移动
    document.addEventListener('mousemove', mousemovePlane)
    //键盘控制飞机移动 w↑ s↓ ←a d→
    document.addEventListener('keydown',onkeydown)
    //  生成子弹
    var bulletTimer=setInterval(bullet,400)
    //生成学习通
    var tankTimer=setInterval(tank,1500)
    //学习通，子弹移动
    var moveTimer=setInterval(move,20)

    //暂停,开始
    changeImg.addEventListener('click',function () {
        //暂停
        if (gameState===1){
            gameState=0
            clearInterval(tankTimer)
            clearInterval(bulletTimer)
            clearInterval(moveTimer)
            document.removeEventListener('mousemove', mousemovePlane);
            document.removeEventListener('keydown',onkeydown);
            changeText.innerHTML='开始'
            changeImg.src='img/begin.png'
        }else if (gameState===0){
            //开始
            gameState=1
            setInterval(tank,1500)
            setInterval(move,20)
            setInterval(bullet,400)
            document.addEventListener('mousemove', mousemovePlane)
            document.addEventListener('keydown',onkeydown)
            changeText.innerHTML='暂停'
            changeImg.src='img/pause.png'
        }
    })
    //鼠标控制飞机移动
    function mousemovePlane(el){
        //飞机坐标
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
    //定义键盘上下左右控制飞机移动的速度
        var speedL=18;
        var speedR=18;
        var speedT=18;
        var speedB=18;
        switch (event.keyCode) {
            case 65:plane.style.left=plane.offsetLeft-speedL+'px';break;
            case 68:plane.style.left=plane.offsetLeft+speedR+'px';break;
            case 87:plane.style.top=plane.offsetTop-speedT+'px';break;
            case 83:plane.style.top=plane.offsetTop+speedB+'px';break;
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

        if (!(obj1Left>obj2Width||obj1Width<obj2Left||obj1Top>obj2Height||obj1Height<obj2Top)){
            return true
        }else {
            return false
        }

    }
    //生成学习通
    function tank() {
        var tank = document.createElement('div');
        tank.className='tank';
        screen.appendChild(tank);
        tank.style.left=randomNum(120,screen.offsetWidth-120)+'px';
        tank.style.top=0+'px';
    }
    //生成子弹
    function bullet() {
        var bullet = document.createElement('div');
        bullet.className='bullet';
        screen.appendChild(bullet);
        bullet.style.left=plane.offsetLeft+plane.offsetWidth/2-5+'px';
        bullet.style.top=plane.offsetTop+'px';

    }
    //学习通/子弹运动,死亡检测,分数
    function move () {

        //让子弹飞
        for (var i = 0;i<bullets.length;i++){

            bullets[i].style.top = bullets[i].offsetTop - buSpeed + 'px';

            if (bullets[i].offsetTop<-100){
                screen.removeChild(bullets[i]);
            }
        }
        //    学习通落下
        for (var j = 0; j < tanks.length; j++) {

            tanks[j].style.top = tanks[j].offsetTop + taSpeed + 'px';

            if (tanks[j].offsetTop > screen.offsetHeight) {

                screen.removeChild(tanks[j])
            }
        }
        //判断子弹是否击中物体
        for (var m=0;m<tanks.length;m++){
            for (var n=0;n<bullets.length;n++){
                if (crash(tanks[m],bullets[n])){
                    current++;
                    screen.removeChild(tanks[m]);
                    screen.removeChild(bullets[n]);
                    //计算分数
                    score.innerHTML='得分：'+current;
                }
            }
        }
        //死亡检测
        for (var c=0;c<tanks.length;c++){
            var tank=tanks[c];
            // 物体下落到最低端时游戏结束
            // if (parseInt(tank.style.top)>715){
            //     for (var j = 0; j < 100; j++) {
            //         clearInterval(j);
            //     }
            //
            //     gameEnd();
            // }

            // 物体与飞机相撞时游戏结束
            if(crash(tank,plane)) {
                gameEnd();
            }
        }
    }
    //游戏结束
    function gameEnd() {
        // 取消鼠标控制
        document.removeEventListener('mousemove', mousemovePlane);
        //取消键盘控制
        document.removeEventListener('keydown',onkeydown);
        //学习通,子弹暂停
        clearInterval(moveTimer);
        clearInterval(bulletTimer);
        clearInterval(tankTimer);
        //结束页面显示
        gameOver.style.opacity='1';
        //点击重新开始
        again.onclick=function () {
            window.location.reload();
            gameOver.style.opacity='0';
        }
    }
    //  随机数
    function randomNum(min,max) {
        return parseInt(Math.random()*(max-min)+min);
    }
}





