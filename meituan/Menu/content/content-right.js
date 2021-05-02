(function () {

    var string='<div class="content-right-item">' +
                    '<img class="content-right-item-img" src=$picture />'+
                    '<div class="content-right-item-content">' +
                        '<p class="content-right-item-title">$title</p>'+
                        '<div class="content-right-item-detail">$description</div>'+
                        '<div class="content-right-item-praise">赞$praise</div>'+
                        '<div class="content-right-item-price">' +
                            '<div class="content-right-item-money">' +
                                '<div class="content-right-item-money-num">$price</div>'+
                                '<div class="content-right-item-unit">/$price-unit</div>'+
                            '</div>'+
                            '<div class="content-right-item-num">' +
                                '<div class="content-right-item-sub">-</div>'+
                                '<div class="content-right-item-amount">$chooseNum</div>'+
                                '<div class="content-right-item-add">+</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    function interRightList(list) {
        console.log(list);
        //每次调用interRightList都会在".content-right"中添加元素,所以调用前应该先将其清空
        $('.content-right').html(" ");
        list.forEach(function (item,index) {
            if(!item.chooseCount){
                item.chooseCount=0;
            }
            var str=string.replace('$picture',item.picture)
                .replace('$title',item.name)
                .replace('$description',item.description)
                .replace('$praise',item.praise_num)
                .replace('$price',item.min_price)
                .replace('$price-unit',item.unit)
                .replace('$chooseNum',item.chooseCount);
            //把html字符串转换为jquery对象
            var $str=$(str);
            //将data数据挂在$str上
            $str.data('itemData',item);
            $('.content-right').append($str);

        })
    }
    //渲染右侧title
    function interRightTitle(str){
        $('.right-title').text(str);
    }


function addClick() {
        //点击事件
    $('.content-right-item').on('click','.content-right-item-add',function (e) {
        //获取到数字所在的div元素,对其进行加减操作(从当前节点的父元素往下查找)
        var $count=$(e.currentTarget).parent().find('.content-right-item-amount');
        //如果获取不到则设为0
        $count.text(parseInt($count.text()||0)+1);
        //获取到挂载有data数据的节点(因为数据挂载在上文str中,也就是content-right-item上)
        var $item=$(e.currentTarget).parents('.content-right-item');
        //获取到节点上的data数据
        var itemData = $item.data('itemData');
        //点击加1
        itemData.chooseCount = itemData.chooseCount +1;

        window.ShopBar.renderItems();


    })
}
function subClick() {
    $('.content-right-item-sub').on('click',function (e) {
        var $count=$(e.currentTarget).parent().find('.content-right-item-amount');
        if ($count.text()==0)
            return;
        $count.text(parseInt($count.text())-1);

        var $item=$(e.currentTarget).parents('.content-right-item').first();
        var itemData = $item.data('itemData');
        itemData.chooseCount = itemData.chooseCount -1;
        window.ShopBar.renderItems();

    })
}

function inter(data){
    interRightList(data.spus);
    interRightTitle(data.name);
    addClick();
    subClick();
}
//对外暴露的方法,refresh一次就会调用一次inter
    window.right={
        refresh:inter,
        // add:addClick
    }

})()
















