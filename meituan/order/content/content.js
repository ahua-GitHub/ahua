(function () {
    //订单模板
     var itemTmpl='<div class="content-item">' +
                     '<div class="detail">' +
                        '<img src="$img-url">'+
                        '<div class="detail-content">' +
                            '<div class="detail-content-header">' +
                                '<div class="detail-content-name one-line">$name</div>'+'<span>></span>'+
                                '<div class="detail-content-over">$state</div>'+
                            '</div>'+
                            '<div class="detail-content-main">$order</div>'+
                        '</div>'+
                     '</div>'+
                     '<div class="judge">' +
                        '<div class="judge-text">评价</div>'+
                     '</div>'+
                '</div>';

     

    function getList() {
        $.get('json/orders.json', function (data) {
            console.log(data);
            var list=data.data.digestlist||[];
            //渲染列表
            initContentList(list);
        })
    }
    function Menu(data) {
        var array=data.product_list||[];
        var str='';
        array.forEach(function (item,index) {
            var Str='<div class="menu-content">'+
                        '<div class="menu-text">$product_name</div>'+
                        '<div class="menu-num">x$product_count</div>'+
                    '</div>';
            Str=Str.replace('$product_name',item.product_name)
                .replace('$product_count',item.product_count);
            str=str+Str;

        })
        str=str+'<div class="menu-all">'+
                    '<div class="menu-more">...</div>'+
                    '<div class="menu-money">总计$product_count个菜，实付￥<span>$total</span></div>'+
                '</div>';
        str=str.replace('$total',data.total)
                .replace('$product_count',data.product_count);
        return str;
    }

    function initContentList(list) {
        list.forEach(function (item) {
            var str=itemTmpl.replace('$img-url',item.poi_pic)
                .replace('$name',item.poi_name)
                .replace('$state',item.status_description)
                .replace('$order',Menu(item));
            $('.order-list').append(str);
        })
    }
    getList();

})()
