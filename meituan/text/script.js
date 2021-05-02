//状态标记
var loading = true;
var start = 1;//当前页
var length = 5;//每页条数

//列表滚动加载数据
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
    var scrollHeight = $(document).height();   //当前页面的总高度
    var clientHeight = $(this).height();    //当前可视的页面高度
    var totalHeight = parseFloat(clientHeight) + parseFloat(scrollTop);

    if (scrollHeight - totalHeight < 40) {  //注：-40 上拉加载更灵敏
        if (!loading) {
            loading = true;
            $('#loading').show();
            $('#loading').text("正在加载...");
            start += 1;

            //加载数据
            loadData(start, length);
        } else {
            return false;
        }
    }
});


function loadData(start, length) {
    $.get("../index/JSON/homelist.json", {start: start, length: length}, function (result) {
        var dataList = result.resultData.records;
        if (dataList.length > 0) {
            var opthtml = "";
            dataList.forEach((value, index, array) => {
                ///拼接html
                opthtml += ""
            });
            $("#listDiv").append(opthtml)
        } else {
            $('#loading').text("完全加载");
            //延时隐藏
            // setTimeout(() => {
            //     $("#loading").hide();
            // }, 1000)
            return false;
        }
        setTimeout(() => {
            //内容获取后，隐藏加载提示
            $("#loading").hide();
            loading = false;
        }, 1000)
    });
}

