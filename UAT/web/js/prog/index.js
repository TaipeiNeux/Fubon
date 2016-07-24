// 首頁畫面寬高配置
setBannerAreaHeight();
/* edit by JiaRu 160622: remove to script.js*/
function setBannerAreaHeight() {
    if ($(window).width() >= 769) {
        var BannerAreaH = ($(window).height()) - (146 + 300);
        $('.bannerArea').css({
            'height': BannerAreaH
        });
    } else if ($(window).width() < 769) {
        $('.bannerArea').css({
            'height': 'inherit'
        });
    }
}

$(window).resize(function() {
    setBannerAreaHeight();
});

//------------------------------------------------------------------------------
/*$(document).ready(function() {
    $.getScript('js/owl.carousel.min.js', function() {
        var owl = $("#owl-demo");

        owl.owlCarousel({
            items: 10, //10 items above 1000px browser width
            itemsDesktop: [2000, 3], //5 items between 1000px and 901px
            itemsDesktopSmall: [900, 3], // betweem 900px and 601px
            itemsTablet: [600, 1], //2 items between 600 and 0
            itemsMobile: false // itemsMobile disabled - inherit from itemsTablet option
        });

        // Custom Navigation Events
        $(".next").click(function() {
            owl.trigger('owl.next');
        });

        $(".prev").click(function() {
            owl.trigger('owl.prev');
        });
    });
});*/


//我要申請選取地圖
var selectAddr = $('#selectAddr');
var addrName = $('#addrName');
var mapInput = $('.mapInput');
var addrCity = $('#addrCity');
var addrZip = $('#addrZip');
var cityUl = $('#cityUl');
var zipUl = $('#zipUl');
var regionText = '';
var regionTextCity = '';
var regionTextZip = '';
var mapId = 'mapArea';

addrCity.hide();
addrZip.hide();



$('.placeholder, .mapInput').on('click', function() {
    //地址
    var jsonCity = modal.getCity('Y');
    console.debug(jsonCity);
    var cityArr = jsonCity.cities;
    var cityArray = [];
    var zipArr = jsonCity.cities;
    var zipArray = [];

    cityUl.empty();
    cityArray = [];

    $.each(cityArr, function(i, cityData) {
        cityArray.push('<li value=' + cityData.cityId + '>' + cityData.cityName + '</li>');
    });
    cityUl.append(cityArray.join(''));
    addrCity.show();

    cityUl.find('li').off().on('click', function() {
        var cId = $(this).val();
        $('.seOutArea .seAreaUL li.gray').removeClass('gray');
        $(this).addClass('gray');
        regionTextCity = $(this).text();

        if (cId < 10) {
            cId = '0' + cId;
        }

        console.debug(cId);

        zipUl.empty();
        zipArray = [];

        var cityId = $(this).val();
        var jsonZip = modal.getZip(cId, 'Y');
        console.debug(jsonZip);

        zipArr = jsonZip.zipcodes;
        var zipArray = [];
        $.each(zipArr, function(i, zipData) {
            zipArray.push('<li value=' + zipData.zipcode + '>' + zipData.areaName + '</li>');
        });

        zipUl.append(zipArray.join(''));

        addrZip.show();

        zipUl.find('li').off().on('click', function() {
            console.debug($(this).val());
            regionTextZip = $(this).text();

            var jsonBranch = modal.getBranch($(this).val());
            var branchArr = jsonBranch.branches;
            console.debug(branchArr.length);
            var branchNameArray = [];
            var branchAddrArray = [];
            var branchTelArray = [];


            $.each(branchArr, function(i, branchData) { //長分行資訊
                branchNameArray.push(branchData.branchName);
                branchAddrArray.push(branchData.addr);
                branchTelArray.push(branchData.tel);
            });
            
            
            
            
            if(branchArr.length > 1){
                    addressMap(mapId, branchNameArray, branchAddrArray, branchTelArray,13);
                }
                else{
                    addressMap(mapId, branchNameArray, branchAddrArray, branchTelArray);
                }
            
            
            regionText = regionTextCity + ',' + regionTextZip;
            /*
            if (branchArray.length == 0) {

                console.debug(regionText);

                addressMap(regionText);

            } else {
                addressMap(branchArray);
            }
			*/

            mapInput.val(regionText);
            addrCity.hide();
            addrZip.hide();

        });

    });

});

/*
function addressMap(branchNameArray,branchAddrArray,branchTelArray) {

	var dialogArray = [];
	$.each(branchNameArray,function(i,branchName){
		dialogArray.push('<h3 class="google_dialog_title">' + branchName + '</h3><p class="google_dialog_addr">' + branchAddrArray[i] + '</p><p class="google_dialog_tel">'+branchTelArray[i]+'</p>');
	});
	

    GardenUtils.plugin.showGoogleMap({
        divId: 'mapArea',
        address: branchAddrArray,
        icon: 'img/marker_bank.png',
        dialog: dialogArray
    });
}
*/



/*
//會員判斷是否已登入
modal.getLoginInfo(function(json) {

    window.loginInfo = json;

    if (json.isLogin == 'N') {
        //$('#isNotLogin').removeClass('personalin');
        //$('#isLogin').addClass('personalin');
        $('#isNotLogin').show();
        $('#isLogin').hide();

        $('#mobileMenu_left_area > ul > li:first').hide();
        $('.loginArea').hide();

        $('a.apply').click(function(ev) {
            ev.preventDefault();

            alert('請先登入');
        });

        $('.applyBtn').click(function(ev) {
            ev.preventDefault();

            alert('請先登入');
        });

    } else {
        $('.smbtnArea').hide();
        $('#isNotLogin').hide();
        $('#isLogin').show();

        //2016-05-03 by titan 先加上登出按鈕



        $('#isLogin .reset').click(function(ev) {
            ev.preventDefault();

            modal.resetApply();
            window.location = 'apply.jsp';
        });

        //$('#isNotLogin').addClass('personalin');
        //$('#isLogin').removeClass('personalin');

    }
});
*/

//限制輸入的長度
$('[name="studentId"],[name="studentCode"]').attr('maxLength', '10');
$('[name="studentPassword"]').attr('maxLength', '16');


//首頁：登入綁身份證轉大寫
$('[name="studentId"],[name="studentCode"],[name="studentPassword"]').on('blur', function(ev) {
    ev.preventDefault();

    $(this).val($(this).val().toUpperCase());
});

// 首頁: 立即登入
/*$('.smbtnArea a').on('click', function(ev) {
    ev.preventDefault();

    if ($(this).hasClass('pobtn-srw')) {
        //$('.smbtnArea a.pobtn-srw').addClass('active').addClass('blueBG');
        //$('.smbtnArea a.pobtn-srb').removeClass('active').removeClass('blueBG');

        $('.personal').slideUp(350);
    } else {
        //$('.smbtnArea a.pobtn-srb').addClass('active').addClass('blueBG');
        //$('.smbtnArea a.pobtn-srw').removeClass('active').removeClass('blueBG');
        $('.personal').slideDown(350);
    }

    if (window.loginInfo.isLogin == 'N') {
        $('#isNotLogin').show();
        $('#isLogin').hide();
    } else {
        $('#isNotLogin').hide();
        $('#isLogin').show();
    }

});*/

//會員登入防呆
/*var logInBtn = $('.loginBtn');
logInBtn.on('click', function() {

    var res = GardenUtils.valid.validForm({
        type: "alert",
        formId: ["basicInformation"],
        validEmpty: [{
            name: 'studentId',
            msg: '身分證字號'
        }, {
            name: 'studentCode',
            msg: '使用者代碼'
        }, {
            name: 'studentPassword',
            msg: '使用者密碼'
        }],
        validNumber: [],
        validDecimal: [],
        validEmail: [],
        validDate: [],
        errorDel: [],
        customizeFun: function() {}
    });

    if (res) {
        var studentId = $('[name="studentId"]').val();
        var studentCode = $('[name="studentCode"]').val();
        var studentPassword = $('[name="studentPassword"]').val();

        var result = modal.login(studentId, studentCode, studentPassword);
        if (result.errorCode == '0') {
            location.reload();
        } else {
            alert(result.errorCode + '\n' + result.errorMsg);
        }
    }

});*/

// 申請流程 tab
$('.aplicaTab ul li a').on('click', function() {
    var cum = $(this).parent().index() + 1;
    $('.aplicaTab ul li').removeClass('active');
    $(this).parent().addClass('active');
    $('.activity_content [class^=app]').removeClass('active');
    $('.activity_content .app' + cum + '').addClass('active');
});

//------------------------------------------------------------------------------

// 申貸後服務 (web)
var hover_off = false;
var hover_count = 100;

$('.SerBox > li .umopen').mouseover(function() {
    hover_off = false;
    $(this).addClass('active');
});
$('.SerBox > li .umopen').mouseout(function() {
    hover_off = true;
    setTimeout(myMouseOut, hover_count);
});

function myMouseOut() {
    if (hover_off) {
        $('.SerBox > li .umopen').removeClass('active');
    }
}
$('.SerBox > li').on('mouseover', function() {
    $('.SerBox > li').removeClass('active');
    $(this).addClass('active');
    $('.SerBox > li .umopen').removeClass('active');
    $(this).find('.umopen').addClass('active');
});

// 申貸後服務 (mobile)
$('.SerBox > li').on('click', function() {
    var umopen = $(this).index() + 1;
    $('.SerBox > li').removeClass('active');
    $(this).addClass('active');
    $('.umopen_s .umopen').removeClass('active');
    $('.umopen_s .umopen-' + umopen + '').addClass('active');
});

//trigger first
if ($(window).width() < 769) {
    $('.SerBox > li:first').trigger('click');
}

$('.godownBtn').click(function(ev) {
    ev.preventDefault();

    GardenUtils.plugin.screenMoveToDiv({
        moveToDivObj: 'Introduction',
        minHeight: getHeaderHeight()
    });
});

/*
$('.btnArea a.apply').on('click', function() {
    loginMsg.appendTo(form);
    determineStstus.appendTo(form);
    form.submit();
});
*/

$('.QAArea').css({
    'height': '800px',
    'overflow-y': 'scroll'
});

//移到目標位置
var url = window.location.toString();
var target = parseInt(url.substr(-1));
var isInt = !isNaN(target);
var index = 0;

if (isInt == true) {
    if (target == 1) {
        $(function() {

            setTimeout(function() {

                //點選小網的"申請流程"
                if ($(window).width() <= 769) {
                    $('#mobileMenu_right_area').show();
                    $('.wrapper').css('left', '0px');
                }

                GardenUtils.plugin.screenMoveToDiv({
                    moveToDivObj: 'ApplicationProcess',
                    minHeight: getHeaderHeight()
                });
            }, 700);

        });
    }

}
$('.sidebar').show();


g_ajax({
    url: 'auth?action=getLoginInfo&v=' + new Date().getTime(),
    data: {},
    datatype: 'json',
    callback: function(json) {
        window.loginInfo = json;

        if (json.isLogin == 'Y') { //還沒有登入
            //產生招呼語
            var contentArr = eightGreeting(json);
			console.debug(contentArr);
            var contentMessage = contentArr[0];
            $('#isLogin').empty();
            $('#isLogin').append(contentMessage.join(''));

            $('#isLogin .pobtn-srw').click(function(ev) {
                ev.preventDefault();

                modal.resetApply();
                window.location = 'apply.jsp';
            });
			
			$('#isLogin').show();
			$('.loginArea').show();
        }
		
		var getDefaultAddress = modal.getDefaultAddress();

		addressMap(mapId, [getDefaultAddress.branchName], [getDefaultAddress.addr], [getDefaultAddress.tel]);

		//輪播最新消息
		modal.getNews(function(json) {

		    var newsArray = [];
		    $.each(json.news, function(i, newsData) {
		        newsArray.push('<div class="owl-item cloned" style="width: 100%; margin-right: 10px;"><div class="item"><h5 class="title">' + newsData.Title + '</h5><p class="news_content">' + newsData.Content + '</p></div></div>');
		    });

		    $('#owl-carousel_news').empty().append(newsArray.join(''));



		    $('#owl-carousel_news').owlCarousel({
		        items: 5,
		        loop: true,
		        margin: 10,
		        dots: true,
		        autoplay: true,
		        autoplayTimeout: 10000,
		        autoplayHoverPause: true,
		        smartSpeed: 600,
		        responsive: {
		            0: {
		                items: 1
		            }
		        }
		    });


		});
    }
});
