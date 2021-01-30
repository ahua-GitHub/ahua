var header=document.getElementById('header');
var outline=document.getElementById('outline');
var item=outline.getElementsByTagName('li');
var nav=document.getElementById('nav');
var aItem=nav.getElementsByTagName('a');
var underline=document.getElementById('underline');
var bgPic=document.getElementById('bgPic');
var bOne=document.getElementById('bOne');
var bTwo=document.getElementById('bTwo');
var bThere=document.getElementById('bThere');
var aRise=document.getElementById('aRise');
var aRiseTwo=document.getElementById('aRiseTwo');
var pDrop=document.getElementById('pDrop');


var phone=document.getElementById('phone');
var screenOne=document.getElementById('screenOne');
var screenTwo=document.getElementById('screenTwo');
var screenOneHeight=screenOne.offsetHeight-100;
var screenTwoHeight=screenTwo.offsetHeight+screenOneHeight;
var iDrop=document.getElementById('iDrop');
var aRiseOne=document.getElementById('aRiseOne');
var aRiseThere=document.getElementById('aRiseThere');
var box=document.getElementById('box');

var screenThere=document.getElementById('screenThere');
var screenThereHeight=screenThere.offsetHeight+screenTwoHeight;
var pRiseFour=document.getElementById('pRiseFour');
var aRiseFour=document.getElementById('aRiseFour');
var phoneItemOne=document.getElementById('phoneItemOne');
var phoneItemTwo=document.getElementById('phoneItemTwo');
var phoneItemThere=document.getElementById('phoneItemThere');
var phoneItemFour=document.getElementById('phoneItemFour');

var screenFour=document.getElementById('screenFour');
var screenFourHeight=screenFour.offsetHeight+screenThereHeight;
var pDropFive=document.getElementById('pDropFive');
var aRiseFive=document.getElementById('aRiseFive');
var bgRiseFive=document.getElementById('bgRiseFive');


window.document.addEventListener('scroll',function () {
        for (var b=0;b<aItem.length;b++){
                if (aItem[b].className=='state'){
                        underline.style.right=443-b*57+'px';
                        // console.log(b);
                }
        }
        var top=document.documentElement.scrollTop;
        if (top<header.offsetHeight){
                header.style.animation='headerOver 1s forwards';
                outline.style.animation='';
        }
        else if (top>header.offsetHeight&&top<screenOneHeight){
              header.style.animation='header 1s forwards';
                switchColor(0);
                switchColorNav(0)
        }else if (top>screenOneHeight&&top<screenTwoHeight){//第二屏特效
                bgPic.style.animation='bgPic 1s ease forwards';
                bOne.style.animation='bOne 2s forwards';
                bTwo.style.animation='bTwo 2s forwards';
                bThere.style.animation='bThere 2s forwards';
                pDrop.style.animation='pDrop 0.8s linear forwards';
                aRise.style.animation='aRise 0.8s forwards';
                aRiseTwo.style.animation='aRiseTwo 0.8s forwards';
                outline.style.animation='outline 1.5s forwards';
                header.style.animation='header 1s forwards';
                switchColor(1);
                switchColorNav(1)
        }else if (top>screenTwoHeight&&top<screenThereHeight){//  第三屏特效
                phone.style.animation='phone 1s forwards';
                iDrop.style.animation='iDrop 1s forwards';
                aRiseOne.style.animation='aRiseOne 1s forwards';
                aRiseThere.style.animation='aRiseThere 1s forwards';
                box.style.animation='box 1s forwards';
                header.style.animation='header 1s forwards';
                switchColor(2);
                switchColorNav(2)
        }else if (top>screenThereHeight&&top<screenFourHeight){//第四屏特效
                pRiseFour.style.animation='pRiseFour 1s forwards';
                aRiseFour.style.animation='aRiseFour 1s forwards';
                phoneItemOne.style.animation='phoneItemOne 1s 0.4s forwards';
                phoneItemTwo.style.animation='phoneItemTwo 1s 0.4s forwards';
                phoneItemThere.style.animation='phoneItemThere 1s 0.8s forwards';
                phoneItemFour.style.animation='phoneItemFour 1s 1.2s forwards';
                header.style.animation='header 1s forwards';
                switchColor(3);
                switchColorNav(3)
        }else if(top>screenThereHeight){
                pDropFive.style.animation='pDropFive 1s forwards';
                aRiseFive.style.animation='aRiseFive 1s forwards';
                bgRiseFive.style.animation='bgRiseFive 1s forwards';
                header.style.animation='header 1s forwards';
                switchColor(4);
                switchColorNav(4)
        }
});

//滑动到不同屏幕大纲栏高亮
function switchColor(n) {
        for (var i=0;i<item.length;i++){
                item[i].className='';//消除所有大纲栏的样式
        }
        item[n].className='state';//为当前大纲栏设置state属性
}
//滑到不同屏幕导航栏高亮
function switchColorNav(n) {
        for (var i=0;i<aItem.length;i++){
                aItem[i].className='';
        }
        aItem[n].className='state';
}
//点击导航栏或大纲跳转到相应屏
function jump(i) {
        aItem[i].onclick=function () {
                document.documentElement.scrollTop=i*790;
        };
        item[i].onclick=function () {
                document.documentElement.scrollTop=i*790;
        }
}
for (var i=0;i<item.length;i++){
        jump(i);             //跳转代码如果直接写在循环内部结果就是i=item.length
}


//滑动门
for(var a=0;a<aItem.length;a++){
        transform(a,aItem);
}

//
var aWidth=aItem[0].offsetWidth;
var navWidth=nav.offsetWidth-aWidth;
// alert(navWidth);
underline.style.right=navWidth+'px';

function transform(inx,val) {
        val[inx].addEventListener('mouseover',function () {
                underline.style.right=navWidth-inx*aWidth+'px';
        });
        val[inx].addEventListener('mouseout',function () {
                for (var a=0;a<aItem.length;a++){
                        if (val[a].className=='state'){
                                underline.style.right=navWidth-aWidth*a+'px';
                        }
                }
        })
}







