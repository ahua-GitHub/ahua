
(function(){

            // 订单详情模版字符串
    var itemBottomTmpl = '<div class="bottom-content">'+
        '<div class="shop-icon">'+
        '<div class="dot-num hide" ></div>'+
        '</div>'+
        '<div class="price-content">'+
        '<p class="total-price">¥<span class="total-price-span">0</span></p>'+
        '<p class="other-price">另需配送&nbsp;¥<span class="shipping-fee"></span></p>'+
        '</div>'+
        '<div class="submit-btn">去结算</div>'+
        '</div>';

    var itemTopTmpl = '<div class="choose-content hide">'+
        '<div class="content-top">'+
        '<div class="clear-car">清空购物车</div>'+
        '</div>'+
        '</div>';
    //变成jquery对象
    var $strBottom = $(itemBottomTmpl);
    var $strTop = $(itemTopTmpl);

    // 点击事件函数
    function addClick(){
        //点击购物车
        $('.shop-bar').on('click','.shop-icon', function(e){
            //toggle()显示则隐藏,隐藏则显示
            $('.mask').toggle();
            $strTop.toggle();
        });
        //点击购物车内的加号
            $strTop.on('click','.plus', function(e){
            //冒泡,在当前点击元素的父元素下查找.count,也就是购物车加减号中间的商品数量
            var $count = $(e.currentTarget).parent().find('.count');
            // 商品数量加一
            $count.text(parseInt($count.text()||'0')+1);

            //给点击加号的那条商品列表挂载数据
            var $item = $(e.currentTarget).parents('.choose-item').first();

            var itemData = $item.data('itemData');

            // window.ShopBar.addItems(itemData);

            itemData.chooseCount = itemData.chooseCount +1;

            renderItems();
            //通过为左边商品列表绑定点击数据来改变右侧商品详情的数据
            // $('.content-left-item.active').click();
            window.right.add();

        });
        $strTop.on('click','.minus', function(e){

            var $count = $(e.currentTarget).parent().find('.count');
            var val = Math.max((parseInt($count.text()||'0')-1),0);

            if ($count.text() == 0) return;
            var $item = $(e.currentTarget).parents('.choose-item');

            var itemData = $item.data('itemData');

            // window.ShopBar.minusItem(itemData);

            $count.text(val);

            itemData.chooseCount = itemData.chooseCount -1;
            renderItems();
            //找到当前右侧详情的数据进行联动
            $('.content-left-item').first().click();

        });
    }

    //配送费
    function changeShippingPrice(val){
        $strBottom.find('.shipping-fee').text(val);
    }
    //改变购物车总价格
    function changeTotalPrice(val){
        $strBottom.find('.total-price-span').text(val);
    }

    //购物车商品总数
    function changeDot(){
        var $counts = $strTop.find('.count');
        var total = 0;
        for (var i = 0 ; i < $counts.length ; i++) {
            total += parseFloat($($counts[i]).text());
        }
        //购物车无内容则小红点消失
        if (total > 0) {
            $('.dot-num').show().text(total);
        } else {
            $('.dot-num').hide();
        }

    }

    //渲染购物车列表
    function renderItems() {
        $($strTop).find('.choose-item').remove();
        var list = window.food_spu_tags;
        var tmpl =  '<div data-id="$id" class="choose-item">'+
            '<div class="item-name">$name</div>'+
            '<div class="price">¥<span class="total">$price</span></div>'+
            '<div class="select-content">'+
            '<div class="minus"></div>'+
            '<div class="count">$chooseCount</div>'+
            '<div class="plus"></div>'+
            '</div>'+
            '</div>';
        //定义商品总价格
        var totalPrice = 0;
        //遍历左侧商品列表
        list.forEach(function(item){
            // 遍历右侧商品明细
            item.spus.forEach(function(_item){
                //判断商品数量
                if (_item.chooseCount > 0) {
                    var price = _item.min_price*_item.chooseCount;
                    // 字符串替换
                    var row = tmpl.replace('$id',_item.id)
                        .replace('$name',_item.name)
                        .replace('$price',price)
                        .replace('$chooseCount',_item.chooseCount);
                    totalPrice += price;
                    $row = $(row);
                    $row.data('itemData',_item);
                    $($strTop).append($row);
                }
            })
        })
        //改变购物车总价格
        changeTotalPrice(totalPrice);
        //购物车商品总数
        changeDot();
    }

    // function addItems(item){
    //     // $($strTop).find('.choose-item').remove();
    //     var repeatItem = $($strTop).find('[data-id='+item.id+']');
    //     if (repeatItem.length === 0) {
    //         var row = tmpl.replace('$id',item.id)
    //             .replace('$name',item.name)
    //             .replace('$price',item.min_price)
    //             .replace('$chooseCount',1);
    //         var $row = $(row);
    //         $($strTop).append($row);
    //     } else {
    //         var total = repeatItem.find('.total');
    //         var count = repeatItem.find('.count');
    //         var totalPrice = (parseFloat(count.text())+1)*item.min_price;
    //         total.text(totalPrice);
    //         count.text((parseFloat(count.text())+1));
    //     }
    //     var totalPrice = parseFloat($('.total-price-span').text()) + item.min_price
    //     changeTotalPrice(totalPrice);
    //     changeDot();
    // }
    //
    // function minusItem(item){
    //     var repeatItem = $($strTop).find('[data-id='+item.id+']').first();
    //     var count = repeatItem.find('.count');
    //     var total = repeatItem.find('.total');
    //     if (parseFloat(count.text()) === 1) {
    //         repeatItem.remove();
    //     } else {
    //         var totalPrice = (parseFloat(count.text())-1)*item.min_price;
    //         count.text(parseFloat(count.text())-1);
    //         total.text(totalPrice);
    //     }
    //
    //     var totalPrice = Math.max(parseFloat($('.total-price-span').text()) - item.min_price,0)
    //
    //     changeTotalPrice(totalPrice);
    //     changeDot();
    // }

    //清空购物车
    $strTop.on('click','.clear-car', function(e){
        var list = window.food_spu_tags;
        list.forEach(function(item){
            // 遍历右侧商品明细
            item.spus.forEach(function(_item){
                //将商品数量设为0
                _item.chooseCount = 0
            })
        })
        //改变购物车总价格
        changeTotalPrice(0);
        //渲染购物车列表
        renderItems()
        //点击左侧商品列表,实现右侧商品详情的刷新
        $('.content-left-item').first().click();
    })


    function init(){

        $('.shop-bar').append($strTop);
        $('.shop-bar').append($strBottom);
        addClick();
    }

    window.ShopBar = {
        // changeTotalPrice:changeTotalPrice,
        changeShippingPrice:changeShippingPrice,
        // addItems:addItems,
        // minusItem:minusItem,
        renderItems:renderItems
    }


    init()


})();
