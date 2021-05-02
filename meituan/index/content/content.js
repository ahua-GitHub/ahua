(function () {
    //获取类目的模板字符串
    var itemTmpl=   '<a class="item-content" href="../Menu/menu.html">'+
                        '<img class="item-img" src="$pic-url">'+
                        '$brand'+
                        '<div class="item-info-content">'+
                            '<p class="item-title">$name</p>'+
                            '<div class="item-desc">'+
                                '<div class="item-desc-star">$wm_poi_score</div>'+
                                '<div class="item-desc-sales">月售$mouthNmu</div>'+
                                '<div class="item-desc-distance">&nbsp;$distance</div>'+
                                '<div class="item-desc-time">$time&nbsp;|</div>'+
                            '</div>'+
                            '<div class="item-price">'+
                                '<div class="item-pre-price">$min_price_tip</div>'+
                            '</div>'+
                            '<div class="item-other">$other</div>'+
                        '</div>'+
                    '</a>'
    var  page=0;
    var loading=false;

        //获取商家列表
    function getList() {
        page++;
        //防止在同一时间内多次触发滚动加载
        loading=true;//开始ajax请求时设为true
        $.get('JSON/homelist.json',function (data) {
            console.log(data);
            //未获取到就设为空数组
            var list=data.data.poilist||[];
            //初始化，渲染商家列表数据
            initContentList(list);
        })
        loading=false;//ajax结束时设为false
    }
    //星级评分
    function star(data){
        //获取的值是数字转换成字符串，因为要将数字的整数部分和小数部分分开，如果没有评分设置为空字符
        var starScore=data.wm_poi_score.toString()||'';
        //字符串分割，把小数点前后的数字分开存放在数组里面
        var scoreArr=starScore.split(".");
        //满星
        var fullStar=parseInt(scoreArr[0]);
        //半星，小数点后大于5为一个半星，小于5为空
        var halfStar=parseInt(scoreArr[1])>=5?1:0;
        //0星
        var nullStar=5-fullStar-halfStar;

        var stars="";
        //满星
        for (var i=0;i<fullStar;i++){
            stars+='<div class="star fullStar"></div>'
        }
        //半星
        for (var j=0;j<halfStar;j++){
            stars+='<div class="star halfStar"></div>'
        }
        //0星
        for (var k=0;k<nullStar;k++){
            stars+='<div class="star nullStar"></div>'
        }
        return stars;
    }
    //判断是否是新到或者品牌
    function getBrand(data) {
        if (data.brand_type){
            return '<div class="brand brand-pin">品牌</div>'
        }else {
            return '<div class="brand brand-xin">新到</div>'
        }
    }
    //月售数量判断，超过999就改为999+
    function mouth(data) {
        if (data.month_sale_num>999){
            return '999+';
        }else {
            return data.month_sale_num;
        }
    }
    //渲染商家活动
    function others(data) {
        var array=data.discounts2;
        var str='';
        array.forEach(function (item,index) {
            //商家活动模板字符串
            var Str='<div class="other-content">'+
                        '<img src="$icon-url" class="icon_url">'+
                        '<p class="other-text one-line">$other-text</p>'+
                    '</div>'
            //占位符替换数据
            Str=Str.replace('$icon-url',item.icon_url)
                    .replace('$other-text',item.info);
            //将图片和文字和在一起的字符串拼接
            str=str+Str;
        })
        return str;
    }
    //初始化，渲染商家列表数据
    function initContentList(list) {
        //遍历list中的数据，然后对占位符进行替换
        list.forEach(function (item,index) {
            var str=itemTmpl.replace('$name',item.name)
                            .replace('$pic-url',item.pic_url)
                            .replace('$min_price_tip',item.min_price_tip)
                            .replace('$mouthNmu',mouth(item))
                            .replace('$distance',item.distance)
                            .replace('$time',item.mt_delivery_time)
                            .replace('$brand',getBrand(item))
                            .replace('$other',others(item))
                            .replace('$wm_poi_score',star(item));
            //将模板字符串添加到content-list-wrap中去
            $('.content-list-wrap').append(str);
        })
    }
    //滚动加载
    function rolling() {
        window.addEventListener('scroll',function () {
            // 视窗的高度
            var clientHeight=document.documentElement.clientHeight;
            //body的高度
            var scrollHeight=document.body.scrollHeight;
            //视窗距离body的高度
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            //滑动到底部
            if ((scrollTop+clientHeight)>=(scrollHeight-30)){
                //最多加载5页
                if (page<5){
                    //如果正在加载json数据，上一个请求还未结束则不会重复滚动加载 。同一时间内只会触发一次滚动加载
                    if (loading){
                        return
                    }
                    getList();
                }else {
                    $('.loading').text('加载完成');
                }
            }
        })
    }
    getList();
    rolling();
})()