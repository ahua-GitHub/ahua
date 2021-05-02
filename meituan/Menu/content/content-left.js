(function () {
    //左侧模板字符串
    var string='<div class="content-left-item">$getItemContent</div>';


    //请求数据
    function getList() {
        $.get('json/food.json',function (data) {
            console.log(data)

            window.food_spu_tags = data.data.food_spu_tags || [];
            initContentList(window.food_spu_tags);
            //配送费
            window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee || 0);
        })
    }
    //渲染内容
    function getItemContent(data) {
        //如果有图标就渲染出来,没有就只返回名字
        if(data.icon){
            return '<img class="item-icon" src='+data.icon+'\>'+data.name;
        }
        else {
            return data.name;
        }
    }
    //渲染列表
    function initContentList(list) {
        console.log(list)
        list.forEach(function (item,index) {
            var str=string.replace('$getItemContent',getItemContent(item));
            //把html字符串转换为jquery对象
            var $target=$(str);
            $target.data('itemData',item);
            $('.content-left').append($target);
        })
        $('.content-left-item').first().click();
    }
    //为左边列表第一个绑定点击事件
    $('.left-item.active').click();
    function addClick() {
        $('.content').on('click','.content-left-item',function (e) {
             var $target=$(e.currentTarget);
                $target.addClass('active');
                $target.siblings().removeClass('active');
            window.right.refresh($target.data('itemData'));
            window.ShopBar.changeShippingPrice($target.data.shipping_fee_tip)
        })
    }

    getList();
    addClick();
})()

















