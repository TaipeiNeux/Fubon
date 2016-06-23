

$(document).ready(function() {	

    //------------------------------------------------------------------------------

    $('body').attr('id', 'body');
    $('.scrollToTop').click(function(ev) {
        ev.preventDefault();
        GardenUtils.plugin.screenMoveToDiv({
            moveToDivObj: 'body'
        });
    });

    $('#mobileMenu_left_area > ul > li:first > a').click(function(ev) {
        ev.preventDefault();

        modal.logout();

        location = 'index.jsp';
    });


    $('.loginArea').click(function(ev) {
        ev.preventDefault();

		GardenUtils.display.popup({
			title: '',
			content: '<p>Hi, 你好!<BR>請確認是否登出就學貸款服務專區？<br><div style="text-align: center;"><button type="button" class="btn btn-default continue">繼續使用</button><button type="button" class="btn btn-default cancel">直接登出</button></div></p>',
			closeCallBackFn: function() {},
			showCallBackFn : function(popupView) {
			
				$('.modal-dialog .cancel').off('click').on('click',function(ev){
					ev.preventDefault();
					
					modal.logout();

					location = 'index.jsp';
				});
				
				$('.modal-dialog .continue').off('click').on('click',function(ev){
					ev.preventDefault();
					popupView.modal('hide');
				});
			},
			isShowSubmit: false,
			isShowClose : false
		});
		
    });

    //2016-05-12 added by titan 加入scroll bar到1/5就fix住
    $(window).on('scroll', function(ev) {
        controlHeader();
    });


    // 主功能列
    $(document).on('click', '.navArea ul li a', function() {
        var navContent = $(this).parent().index() + 1;
        $('.navArea ul li a').removeClass('active');
        $(this).addClass('active');
        $('.navContent').removeClass('active');
        $('.navContent-' + navContent + '').addClass('active');
		
		controlHeader();
    });

    $(document).on('mouseleave', '.navArea ul li:nth-child(1) a', function() {
        $('.navArea ul li a').removeClass('active');
    });
    $(document).on('mouseleave', '.navArea ul li:nth-child(2) a', function() {
        $('.navArea ul li a').removeClass('active');
    });

	/*
	$(document).on('mouseleave', 'nav.navArea > ul > li > a.active', function() {
        $('.navContent').removeClass('active');
        $('.navArea ul li a').removeClass('active');
    });
	*/
	
    $(document).on('mouseleave', '.navContent', function() {
        $('.navContent').removeClass('active');
        $('.navArea ul li a').removeClass('active');
    });


	/**
    $('.navArea ul li a:eq(0)').on('click', function(ev) {
        ev.preventDefault();
        GardenUtils.plugin.screenMoveToDiv({
            moveToDivObj: 'ApplicationProcess',
            minHeight: getHeaderHeight()
        });
    });
**/


    // 手機板 左 選單收合
    $(document).on('click', '.navIcon a', function() {
        $('.mobileMenu_right_area').hide();
        $('.mobileMenu_left_area').show();
        $(this).toggleClass('active_left');
        $('.wrapper').animate({
            left: $('.wrapper').css('left') == "275px" ? "0px" : "275px"
        }, 300);
        $('.headerArea').animate({
            left: $('.headerArea').css('left') == "275px" ? "0px" : "275px"
        }, 300);

    });

    // 手機板 右 選單收合
    $(document).on('click', '.right_navIcon a', function() {
        $('.mobileMenu_left_area').hide();
        $('.mobileMenu_right_area').show();
        $(this).toggleClass('active_right');
        $('.wrapper').animate({
            left: $('.wrapper').css('left') == "-275px" ? "0px" : "-275px"
        }, 300);

        $('.headerArea').animate({
            left: $('.headerArea').css('left') == "-275px" ? "0px" : "-275px"
        }, 300);
    });


    // 手機板 左 選單 其子選單收合
    $(document).on('click', '.mobileMenu_left_area ul li', function() {
        $(this).find('ul').slideToggle(250);
    });

    /**
    $('.navArea ul li a:eq(2),.navArea ul li a:eq(3),.navArea ul li a:eq(4),.navArea ul li a:eq(5)').on('click', function(ev) {
        ev.preventDefault();

        var dataTarget = $(this).attr('data-target');
        $('.navArea ul li').removeClass('active');
        $(this).parent().addClass('active');

        $('.' + dataTarget).slideToggle(350);
    });
**/


    //------------------------------------------------------------------------------

    // 我要申請
    $('.csBox a').on('click', function() {
        $(this).parent().toggleClass('active');
        $(this).parent().find('p').slideToggle(250);
    });

    //------------------------------------------------------------------------------

    /**
        // 首頁 Q&A tab
      $(document).on('click', '.QandAtab a', function() {
        $('.QandAContent').toggle("slide", {
          direction: "right"
        }, 400);
      });


      // Q & A
      function QAListTabset() {
        if ($(window).width() >= 768) {
          $('.QAListTab > ul > li:first-child > a').addClass('active');
        } else if ($(window).width() < 768) {
          $('.QAListTab > ul > li > a').removeClass('active');
        }
      }

      $(document).on('click', '.QAListTab > ul > li > a', function() {
        var qaindex = $(this).parent().index() + 1;

        if ($(window).width() >= 768) {
          $('.QAListTab > ul > li > a').removeClass('active');
          $(this).addClass('active');
          $('.QAArea .QAList').removeClass('active');
          $('.QAArea .qaList-' + qaindex + '').addClass('active');
        } else if ($(window).width() < 768) {
          $(this).toggleClass('active');
          $('.QAArea_s .qaList-' + qaindex + '').slideToggle(250);
        }
      });


      $(document).on('click', '.QAList ul > li a', function() {
        $(this).addClass('active');
        $(this).parent().find('.AnserContent').slideToggle(250);
        $(this).find('.maicon').toggleClass('active');
      });

    **/

    //------------------------------------------------------------------------------

    // 就學貸款介紹
    $('.loanUL li').on('click', function() {
        if ($(window).width() < 768) {
            $(this).toggleClass('active');
            $(this).find('.pho').toggleClass('active');
            $(this).find('.textbox').slideToggle(250);
        }
    });


    //------------------------------------------------------------------------------

    // css 設定
    //dowContentAreaSetting();
    // function dowContentAreaSetting() {
    //   if ($(window).width() >= 1024) {
    //     $('.dowContentArea').css({'display':'block';});
    //     $('.dowContentArea_s').css({'display':'none';});
    //   }else if ($(window).width() < 1024) {
    //     $('.dowContentArea').css({'display':'none';});
    //     $('.dowContentArea_s').css({'display':'block';});
    //   }
    // }

    //------------------------------------------------------------------------------
    // 繳款方式說明 (PaymentInstructions.html) web
    var quspindex;

    $('[class^="loanitemArea"]').hide();
    $('.qusp .more').on('click', function() {
        var dataTarget = $(this).attr('rel');
        $('[class^="loanitemArea"]').not(dataTarget).hide().removeClass('active');
        $(dataTarget).toggle().addClass('active');

        $(this).parents('.quspitem').toggleClass('active').siblings().removeClass('active');
    });

    // 繳款方式說明 (PaymentInstructions.html) mobile
    $('.quspitemInner').on('click', function() {
        quspindex = $(this).closest('.quspitem').index('.quspitem') + 1;
        $(this).siblings('.yuquspArea').find('.loanitemArea_' + quspindex + '').slideToggle(250);
    });

    $('.downloadtab').on('click', function() {
        var dop = $(this).parent().index() + 1;
        $('.downloadtab').removeClass('active');
        $(this).addClass('active');
        $('.dowContentArea .dowContent').removeClass('active');
        $('.dowContentArea .dowContent-' + dop + '').addClass('active');
        $('.dowContentArea_s .dowContent-' + dop + '').slideToggle('active');
    });

    // 表單、文件下載   (web)
    $('.downloadtab').on('click', function() {
        var dop = $(this).parent().index() + 1;
        $('.downloadtab').removeClass('active');
        $(this).addClass('active');
        $('.dowContentArea .dowContent').removeClass('active');
        $('.dowContentArea .dowContent-' + dop + '').addClass('active');
        $('.dowContentArea_s .dowContent-' + dop + '').slideToggle('active');
    });

    // 表單、文件下載   (pad)
    $('.dow h3').on('click', function() {
        $(this).toggleClass('active');
        $(this).parent().find('.dowContentArea_s .dowContent').slideToggle(250);
    });

    /**
  // 表單、文件下載  searching
  $(document).on('click', '.dowlink a.searching', function() {
    $(this).toggleClass('active');
    $(this).parent().parent().parent().find('.dowitemContent').slideToggle('active');
  });
**/

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


    //------------------------------------------------------------------------------
    wilbeckset();

    function wilbeckset() {
        if ($(window).width() > 768) {
            $('.apply_5_step1 .wilbeckChild').css({
                'display': 'block'
            });
            $('.apply_5_step1 .fcc').css({
                'display': 'block'
            });
        }
    }

    $('.apply_5_step1 .wilbeck h3').on('click', function() {
        if ($(window).width() <= 768) {
            $(this).parent().find('.wilbeckChild').slideToggle(250);
        }
    });

    $('.apply_5_step1 .dan h2').on('click', function() {
        if ($(window).width() <= 768) {
            $(this).parent().find('.fcc').slideToggle(250);
        }
    });

    //-----------------------------------------------------------------------------


    $(document).on('click', '.lightWon .picabtn', function() {
        $(this).toggleClass('active');
        $(this).parent().find('.repayTableOuter').slideToggle(250);
    });
    //-----------------------------------------------------------------------------



    //-----------------------------------------------------------------------------


    //QAListTabset();
    $(window).resize(function() {
        //QAListTabset();
        wilbeckset();
        setBannerAreaHeight();
    });
	
	//2016-06-10 added by titan 綁全站input有name的輸入完後過濾空白
	var trimSpaceName = [];
	$('input[name]').each(function(){
		var $this = $(this);
		trimSpaceName.push($this.attr('name'));
	});
	
	GardenUtils.format.inputTrimSpace({
		name : trimSpaceName
	});

}); //(document).ready

function getHeaderHeight() {
    if ($(window).width() <= 769) {
        return 30;
    } else {
        //return 145;
        return $('.navArea').height();
    }
}

//會員判斷是否已登入
modal.getLoginInfo(function(json) {

    window.loginInfo = json;

    if (json.isLogin == 'N') {     //還沒有登入
        //$('#isNotLogin').removeClass('personalin');
        //$('#isLogin').addClass('personalin');
		
		$('#applyButton').text('註冊會員');
		$('#applyButton').removeClass('apply').addClass('regBtn');;
		
		if($(window).width() >= 768) {
			$('#isNotLogin').show();
			$('#isLogin').hide();
		}
        
        //$('#mobileMenu_left_area > ul > li:first').hide();
        $('#mobileMenu_left_area > ul > li:first').on('click', function(){
           window.location = 'memberLogin.jsp';
        });
		
        $('.loginArea').hide();
		
		$('.regBtn').click(function(ev){
			ev.preventDefault();
			window.location = 'register.jsp';
		});

        $('a.apply').click(function(ev) {
            ev.preventDefault();
            window.location = 'memberLogin.jsp';
        });

        $('.applyBtn').click(function(ev) {
            window.location = 'memberLogin.jsp';
        });
		
		$('.csA a').click(function(ev) {
            ev.preventDefault();
            window.location = 'memberLogin.jsp';
        });
        
        

    } else {      //已經登入
        $('.smbtnArea').hide();
        $('#isNotLogin').hide();
        $('#isLogin').show();
		$('.loginArea').show();
        
        $('a.apply').click(function(ev) {
            ev.preventDefault();
            window.location = 'apply_00.jsp';
        });
        
        $('.applyBtn').click(function(ev) {
            window.location = 'apply_00.jsp';
        });
		
		$('.csA a').click(function(ev) {
            ev.preventDefault();
            window.location = 'apply_00.jsp';
        });

        //2016-05-03 by titan 先加上登出按鈕

        $('#isLogin .reset').click(function(ev) {
            ev.preventDefault();

            modal.resetApply();
            window.location = 'apply.jsp';
        });
        
        //$('#isNotLogin').addClass('personalin');
        //$('#isLogin').removeClass('personalin');
		
		//2016-06-10 added by titan
		//系統判斷客戶閒置不可超過10分鐘,並於閒置第9分鐘時，壓黑顯示訊息。	
		GardenUtils.plugin.useCountDown({
	            totalTime : 600, //總時間(秒)
	            countDownTime : 60, //倒數多少時間後呼叫countDownFn(秒)
	            countDownFn : function(){
					GardenUtils.display.popup({
						title: '',
						content: '<p>Hi, 你好!你在本服務專區已閒置超過9分鐘，本系統將於59秒後動登出<br>若你需繼續使用，請按 繼續使用；或按 直接登出 登出本服務專區。<br><div style="text-align: center;"><button type="button" class="btn btn-default continue">繼續使用</button><button type="button" class="btn btn-default cancel">直接登出</button></div></p>',
						closeCallBackFn: function() {},
						showCallBackFn : function(popupView) {
							
							$('.modal-dialog .cancel').off('click').on('click',function(ev){
								ev.preventDefault();
								
								modal.logout();

								location = 'index.jsp';
							});
							
							$('.modal-dialog .continue').off('click').on('click',function(ev){
								ev.preventDefault();
								popupView.modal('hide');
							});
						},
						isShowSubmit: false,
						isShowClose : false
				});
				}, //倒數多少時間後呼叫的function
	            overTimeFn : function(){
					modal.logout();
					window.location = 'index.jsp';
				} //時間到了的function
		});
    }
});

//首頁：登入綁身份證轉大寫
$('[name="studentId"]').on('blur', function(ev) {
    ev.preventDefault();

    $(this).val($(this).val().toUpperCase());
});

// 首頁: 立即登入
$('#loginMobile').on('click', function(ev) {
    ev.preventDefault();

    if ($(this).hasClass('pobtn-srb')) {
        //$('.smbtnArea a.pobtn-srw').addClass('active').addClass('blueBG');
        //$('.smbtnArea a.pobtn-srb').removeClass('active').removeClass('blueBG');

        $('.personal').slideUp(350);     //收合
    } else {
        //$('.smbtnArea a.pobtn-srb').addClass('active').addClass('blueBG');
        //$('.smbtnArea a.pobtn-srw').removeClass('active').removeClass('blueBG');
        $('.personal').slideDown(350);   //展開
    }

    if (window.loginInfo.isLogin == 'N') {
        $('#isNotLogin').show();
        $('#isLogin').hide();
    } else if (window.loginInfo.isLogin == 'Y') {
        $('#isNotLogin').hide();
        $('#isLogin').show();
    }

});

$('#registerMobile').on('click', function(ev) {
    ev.preventDefault();
	//alert('系統建置中');
    window.location = 'memberLogin.jsp';
});

//會員登入防呆
var logInBtn = $('.loginBtn');
logInBtn.on('click', function(ev) {
	ev.preventDefault();
	memberLogin();
});

function memberLogin() {
	var errStr = ''; 
    var studentId = $('[name="studentId"]').val();
    var studentCode = $('[name="studentCode"]').val();
    var studentPassword = $('[name="studentPassword"]').val();

    /*var res = GardenUtils.valid.validForm({
        type: "alert",
        formId: ["mainForm"],
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
        customizeFun: function() {
        }
    });*/
    /* Edit by JiaRu 160604
	//身分證字號
	if( studentId == '' || studentId == undefined ){
		errStr = errStr + '請輸入身分證字號\n';
	}
	else{
		if( checkVal( studentId ) == false ){
			errStr = errStr + '身分證字號限輸入英數字\n';
		}
		else if(studentId.length != 10){
			errStr = errStr + '身分證字號輸入長度不符\n';
		}
	}
	console.debug(studentCode.length);
	
	//使用者代碼
	if( studentCode == '' || studentCode == undefined ){
		errStr = errStr + '請輸入使用者代碼\n';
	}
	else{
		if( checkVal( studentCode ) == false ){
			errStr = errStr + '使用者代碼限輸入英數字\n';
		}
		else if(studentCode.length < 6){
			errStr = errStr + '使用者代碼輸入長度不符\n';
		}
	}
	
	//使用者密碼
	if( studentPassword == '' || studentPassword == undefined ){
		errStr = errStr + '請輸入使用者密碼';
	}
	else{
		if( checkVal( studentPassword ) == false ){
			errStr = errStr + '使用者密碼限輸入英數字';
		}
		else if(studentPassword.length < 6){
			errStr = errStr + '使用者密碼輸入長度不符';
		}
	}
    */
    // Edit by JiaRu 160604
    //身分證字號
    if( studentId == '' || studentId == undefined ){
        errStr = errStr + '請輸入身分證字號\n';
        $('[name="studentId"]').parent().find('.error').text('請輸入身分證字號');
    }
    else{
        if( checkVal( studentId ) == false ){
            errStr = errStr + '身分證字號限輸入英數字\n';
            $('[name="studentId"]').parent().find('.error').text('身分證字號限輸入英數字');
        }
        else if(studentId.length != 10){
            errStr = errStr + '身分證字號輸入長度不符\n';
            $('[name="studentId"]').parent().find('.error').text('身分證字號輸入長度不符');
        }
    }
	
    console.debug(studentCode.length);
    
    //使用者代碼
    if( studentCode == '' || studentCode == undefined ){
        errStr = errStr + '請輸入使用者代碼\n';
        $('[name="studentCode"]').parent().find('.error').text('請輸入使用者代碼');
    }
    else{
        if( checkVal( studentCode ) == false ){
            errStr = errStr + '使用者代碼限輸入英數字\n';
            $('[name="studentCode"]').parent().find('.error').text('使用者代碼限輸入英數字');
        }
        else if(studentCode.length < 6){
            errStr = errStr + '使用者代碼輸入長度不符\n';
            $('[name="studentCode"]').parent().find('.error').text('使用者代碼輸入長度不符');
        }
    }
    
    //使用者密碼
    if( studentPassword == '' || studentPassword == undefined ){
        errStr = errStr + '請輸入使用者密碼';
        $('[name="studentPassword"]').parent().find('.error').text('請輸入使用者密碼');
    }
    else{
        if( checkVal( studentPassword ) == false ){
            errStr = errStr + '使用者密碼限輸入英數字';
            $('[name="studentPassword"]').parent().find('.error').text('使用者密碼限輸入英數字');
        }
        else if(studentPassword.length < 6){
            errStr = errStr + '使用者密碼輸入長度不符';
            $('[name="studentPassword"]').parent().find('.error').text('使用者密碼輸入長度不符');
        }
    }
	
	if(errStr != ''){
		//alert(errStr);
		errStr = '';
	}
	else{     
		//登入
		var result = modal.login(studentId, studentCode, studentPassword);

		
		//判斷是否有重覆登入
		if (result.errorCode == '97') {
			GardenUtils.display.popup({
				title: '',
				content: '<p>您已於'+result.LastSignOn+'登入本服務專區並且尚未登出。<br>若要繼續登入(捨棄上次登入)點選「確定」按鈕;<BR>若要取消本次登入(保留上次登入)請點選「取消｣按鈕。<br><div style="text-align: center;"><button type="button" class="btn btn-default cancel">取消</button><button type="button" class="btn btn-default continue">確定</button></div></p>',
				closeCallBackFn: function() {},
				showCallBackFn : function(popupView) {
				
					$('.modal-dialog .cancel').off('click').on('click',function(ev){
						ev.preventDefault();
						
						popupView.modal('hide');						
					});
					
					$('.modal-dialog .continue').off('click').on('click',function(ev){
						ev.preventDefault();
						
						var result = modal.login(studentId, studentCode, studentPassword,'Y');
						window.location = 'index.jsp';
					});
				},
				isShowSubmit: false,
				isShowClose : false
			});
		}
		else if (result.errorCode == '0') {
            //alert('success');
			window.location = 'index.jsp';
        } else {
		
			var failCount = result.failCount;
			var errorMsg = result.errorMsg;
			var failMsg = '';
			if(failCount == 1) {
				failMsg = '<p>使用者密碼輸入錯誤一次(連續錯誤三次將被鎖定，你可使用<a href="forgetPassword.jsp" class="underline hyperlink">忘記代碼/密碼進行</a>重設；如有疑問，請洽客戶服務專線02-8751-6665 按5)</p>';
			}
			else if(failCount == 2) {
				failMsg = '<p>使用者密碼輸入錯誤二次(連續錯誤三次將被鎖定，你可使用<a href="forgetPassword.jsp" class="underline hyperlink">忘記代碼/密碼</a>進行重設；如有疑問，請洽客戶服務專線02-8751-6665 按5)</p>';
			}
			else if(failCount >= 3) {
				failMsg = '<p>使用者密碼連續輸入錯誤三次，已被鎖定 (你可使用<a href="forgetPassword.jsp" class="underline hyperlink">忘記代碼/密碼進行</a>重設；如有疑問，請洽客戶服務專線02-8751-6665 按5)</p>';
			}
			else {
				failMsg = '<p>'+errorMsg+'</p>';
			}
		
			GardenUtils.display.popup({
				title : '',
                content : failMsg,
                closeCallBackFn : function(){},
                isShowSubmit : false
			});
		
            //alert(result.errorMsg);
        }
	}
	
	
    /*if (res) {

        var result = modal.login(studentId, studentCode, studentPassword);

        if (result.errorCode == '0') {
            location.reload();
        } else {
            alert(result.errorCode + '\n' + result.errorMsg);
        }
    }*/
}

//檢查是否為英文或數字
function checkVal( str ) {
    var regExp = /^[\d|a-zA-Z0-9]+$/;
    if (regExp.test(str))
        return true;
    else
        return false;
}

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

$('.godownBtn').click(function(ev) {
    ev.preventDefault();

    GardenUtils.plugin.screenMoveToDiv({
        moveToDivObj: 'Introduction',
        minHeight: getHeaderHeight()
    });
});

function controlHeader() {
	var current = document.body.scrollTop;

        if ($(window).width() >= 768) {
            var current = document.body.scrollTop;
            if (current > 200) {
                $('nav.navArea').addClass('fixtop');
                $('.header').hide();
                $('.scrollToTop').show();
				
				$('div.navContent').each(function(){
					var content = $(this);
					if(content.hasClass('active')) {
						//content.css('margin-top','60px');
						content.addClass('fix');
					}
				});
				
				$('.QandAtab').addClass('fix');
				$('.sidebar').addClass('fix');
				
            } else {
                $('nav.navArea').removeClass('fixtop');
				
				
                $('.header').show();
                $('.scrollToTop').hide();
				
				$('div.navContent').each(function(){
					var content = $(this);
					if(content.hasClass('active')) {
						//content.css('margin-top','0px');
						content.removeClass('fix');
					}
				});
				
				$('.QandAtab').removeClass('fix');
				$('.sidebar').removeClass('fix');
            }
        } else {

            if (current > 200) {
                $('.scrollToTop').show();
            } else {
                $('.scrollToTop').hide();
            }

			$('div.navContent').each(function(){
					var content = $(this);
					if(content.hasClass('active')) {
						//content.css('margin-top','0px');
						content.removeClass('fix');
					}
				});
				
				$('.QandAtab').removeClass('fix');
				$('.sidebar').removeClass('fix');
				
            $('nav.navArea').removeClass('fixtop');
            $('.header').show();
        }
}

// 長對保分行地圖
function addressMap(mapId, branchNameArray,branchAddrArray,branchTelArray,zoom) {

    var dialogArray = [];
    $.each(branchNameArray,function(i,branchName){
        dialogArray.push('<h3 class="google_dialog_title">' + branchName + '</h3><p class="google_dialog_addr">' + branchAddrArray[i] + '</p><p class="google_dialog_tel">'+branchTelArray[i]+'</p>');
    });
    

    GardenUtils.plugin.showGoogleMap({
        divId: mapId,//'mapArea',
        zoom: zoom,
        address: branchAddrArray,
        icon: 'img/marker_bank.png',
        dialog: dialogArray,
        scrollwheel: false,
        showDialog: true
    });
}

//將input轉為label
function inputToLabel(input) {
	var value = input.val();
	var name = input.attr('name');
    
	var label = $('<p class="susi" id="label_'+name+'">'+value+'</p><input type="hidden" name="'+name+'" value="'+value+'" />');
    
    label.insertAfter(input);
	input.remove();
    
    $('#label_'+name).addClass('labelInline');
}

//將select轉為label
function domicileToLabel(domicileAddrRightDiv,domicileCityName,domicileZipCodeName,domicileLiner,domiNei,domiAddr) {
    
	var label = $('<p class="susi" id="label_domicile" class="labelInline">'+domicileCityName+domicileZipCodeName+domicileLiner+domiNei+domiAddr+'</p>');
    
	//alert(domicileAddrRightDiv.find('.bootstrap-select').length);
	
	domicileAddrRightDiv.children().hide();
	
	//var noneDiv = $('<div style="display:none"></div>').append(domicileAddrRightDiv.html());
	//domicileAddrRightDiv.empty();
	//noneDiv.appendTo(domicileAddrRightDiv);
    label.appendTo(domicileAddrRightDiv);
    
}

function isMobileWidth() {
	return $(window).width() < 768;
}
