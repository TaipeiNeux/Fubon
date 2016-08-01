//移到目標位置
var url = window.location.toString();
var target = parseInt(url.substr(-1));
var isInt = !isNaN(target);
var index = 0;

if (isInt == true) {
    switch (target) {
        case 1:
            $(function() {
                GardenUtils.plugin.screenMoveToDiv({
                    moveToDivObj: 'introduction',
                    minHeight: getHeaderHeight()
                });
            });
            break;
        case 2:
            $(function() {
                GardenUtils.plugin.screenMoveToDiv({
                    moveToDivObj: 'qualifications',
                    minHeight: getHeaderHeight()
                });
            });
            break;
    }
}

//
// list 項目 設定一樣高
(function($, window, document, undefined) {
    'use strict';

    var $list = $('.list'),
        $items = $list.find('.list__item'),
        setHeights = function() {
            $items.css('height', 'auto');

            var perRow = Math.floor($list.width() / $items.width());
            if (perRow == null || perRow < 2) return true;

            for (var i = 0, j = $items.length; i < j; i += perRow) {
                var maxHeight = 0,
                    $row = $items.slice(i, i + perRow);

                $row.each(function() {
                    var itemHeight = parseInt($(this).outerHeight());
                    if (itemHeight > maxHeight) maxHeight = itemHeight;
                });
                $row.css('height', maxHeight);
            }
        };
    if ($(window).width() > 768) {
        setHeights();
    }
    $(window).on('resize', setHeights);

})(jQuery, window, document);


//會員判斷是否已登入
/*modal.getLoginInfo(function(json) {

    window.loginInfo = json;

    
    //若沒有登入時，按立即申請時會alert
    if (json.isLogin == 'N') {
        $('.applyBtn').click(function(ev) {
            ev.preventDefault();

            alert('請先登入');
        });
    }
});*/
