//动态设置rem值
    var docEl=document.documentElement;
    function setFontSize() {
        //获取rem基准值
        var rem=docEl.clientWidth/25;
        //动态设置html的fontSize
        docEl.style.fontSize=rem+'px';
    }
    setFontSize();
    //绑定屏幕尺寸变化事件
    window.addEventListener("resize", setFontSize);
