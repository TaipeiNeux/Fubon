
<%@ page language="java" contentType="text/html; charset=utf-8" %>




<!DOCTYPE html -ms-overflow-style: scrollbar;>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta name="author" content="">
  <meta name="copyright" CONTENT="">
  <meta name="URL" content="">

  <meta property="og:url" content="" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />
  <meta property="og:image" content="" />

  <title>台北富邦銀行 | 就學貸款</title>
  <link rel="shortcut icon" href="img/favicon.ico?v=2">
  <link rel="shortcut icon" href="http://garden.decoder.com.tw/portal/demo/fubon/img/favicon.ico">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/bootstrap-select.min.css">

  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/customize.css">
  <link rel="stylesheet" href="css/processBar.css">
  <link rel="stylesheet" href="css/jquery.mmenu.all.css">
 
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="js/html5shiv.min.js"></script>
  <script src="js/respond.min.js"></script>
  <![endif]-->
  
  <link rel="stylesheet" href="css/loading/fonts.css">
  <link rel="stylesheet" href="css/loading/layout.css">
  
  <!--[if IE]>
  <link rel="stylesheet" type="text/css" href="css/ie.css">
  <![endif]-->
	
	
	<script>
	//for browser setting
if(window.console == undefined) {
    var em = function(){};
    window.console = {log: em, debug: em, info: em, warn: em};
}


if (typeof(console) == '') {
    var em = function(){};
    console = {log: em, debug: em, info: em, warn: em};
}

if(console.log == undefined || console.log == 'undefined') {
    var em = function(){};
    console.log = em;
}

if(console.debug == undefined || console.debug == 'undefined') {
    var em = function(){};
    console.debug = em;
}

if(console.info == undefined || console.info == 'undefined') {
    var em = function(){};
    console.info = em;
}

if(console.warn == undefined || console.warn == 'undefined') {
    var em = function(){};
    console.warn = em;
}


//for fix ie8 no Object.keys function
if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}


if (typeof(Array.prototype.indexOf) === 'undefined') {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}
	</script>
	
	<script src="js/jquery-1.12.1.js"></script>
	<!--
	<script src="js/jquery-ui.min.js"></script>
	-->
    <script src="js/bootstrap.js"></script>
    <script src="js/bootstrap-select.min.js"></script>
    <script src="js/jquery.mmenu.all.min.js"></script>
    <script src="js/prog/modal.js"></script>
    <script src="js/prog/GardenUtils.js"></script>
    <script src="js/prog/flow.js"></script>
    <script src="js/prog/linkage.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/prog/bootstrap_select_arrow.js"></script>
	<!--
    <script src="js/bootstrap-slider.min.js"></script>
	-->

	<script src="js/bootstrap-slider.js"></script>
</head>


<script src="js/jquery-ui.min.js"></script>
<body class="">

<div class="mobileMenu">
    



<!-- 手機板_左邊選單 -->
<nav id="mobileMenu_left_area" class="mobileMenu_left_area">
  <ul>
    <li><a href="javascript:;">登入</a></li>
    <li><a href="index.jsp?target=1">申請流程</a></li>
    <li><a href="apply_00.jsp" class="applyBtn" >我要申請</a></li>
    <li><a href="javascript:;">帳務查詢</a>
      <ul class="Inset">
        <li><a href="myloan.jsp">我的貸款</a></li>
        <li><a href="repaymentInquiry.jsp">還款明細查詢</a></li>
      </ul>
    </li>
    <li><a href="javascript:;">延期還款</a>
      <ul class="Inset">
        <li><a href="deferment_0.jsp">延後/提前還款</a></li>
        <li><a href="principal.jsp">緩繳本金/延長還款期間</a></li>
      </ul>
    </li>
    <li><a href="javascript:;">繳款資訊</a>
      <ul class="Inset">
        <li><a href="payment.jsp">繳款方式說明</a></li>
        <li><a href="myElectronicPay_1.jsp">我的電子繳款單</a></li>
        <!--<li><a href="javascript:;" onclick="alert('系統建置中');return false;">立即繳款</a></li>-->
      </ul>
    </li>
    <li><a href="javascript:;">個人資料</a>
      <ul class="Inset">
        <li><a href="personalInfo_start.jsp">變更基本資料</a></li>
        <li><a href="changePwd.jsp">變更代碼/密碼</a></li>
      </ul>
    </li>
  </ul>
</nav>
<!-- /手機板_左邊選單 -->


<!-- 手機板_右邊選單 -->
<nav id="mobileMenu_right_area" class="mobileMenu_right_area">
  <ul>
    
	<!--<li><a href="javascript:;">Q&A</a></li>-->
    <li><a href="sub_1.jsp?target=1">貸款試算</a></li>
    <li><a href="sub_1.jsp?target=2">對保分行</a></li>
    <li><a href="sub_1.jsp?target=3">表單．文件下載</a></li>
  </ul>
</nav>
<!-- /手機板_右邊選單 -->

</div>

<div class="wrapper">
    <div class="headerArea">
        
<!--
null
-->



<div class="navIcon">
    <!--<a href="#left_menu_area"></a>-->
    <a href="#mobileMenu_left_area"></a>
</div>

<div class="chatIcon">
    <a href="javascript:;"></a>
</div>

<div class="right_navIcon">
    <a href="#right_menu_area"></a>
</div>


<header class="header">
    <div class="logo">
        <a href="index.jsp" class="logo1">
      <span class="img">
        <img src="img/fu-01.png" alt="">
      </span>
        </a>
    </div>
    <div class="loginArea" style="display: none;">
        <a href="">登出</a>
    </div>
</header>



<nav class="navArea">
    <ul>
        <li><a href="index.jsp?target=1">申請流程</a></li>
        <li><a href="apply_00.jsp" class="applyBtn">我要申請</a></li>
        <li><a href="#" data-target="navContent-3">帳務查詢</a></li>
        <li><a href="#" data-target="navContent-4">延期還款</a></li>
        <li><a href="#" data-target="navContent-5">繳款資訊</a></li>
        <li><a href="#" data-target="navContent-6">個人資料</a></li>
        <li><a href="#">線上問答</a></li>
    </ul>
</nav>

<!-- 帳務查詢 -->
<div class="navContent navContent-3">
    <ul>
        <li>
      <span class="imgbox">
        <img src="img/dgj-01.png" alt="">
      </span>
            <div class="texArea">
                <h3>我的貸款</h3>
                <p>查詢我的貸款詳細資訊。</p>
                <a href="myloan.jsp" class="clickhere">登入查詢</a>
            </div>
        </li>
        <li>
      <span class="imgbox">
        <img src="img/dgj-02.png" alt="">
      </span>
            <div class="texArea">
                <h3>還款明細查詢</h3>
                <p>查詢我的還款明細資訊。</p>
                <a href="repaymentInquiry.jsp" class="clickhere">登入查詢</a>
            </div>
        </li>
    </ul>
</div>

<!-- 延期還款 -->
<div class="navContent navContent-4">
    <ul>
        <li>
      <span class="imgbox">
        <img src="img/feo-01.png" alt="">
      </span>
            <div class="texArea">
                <h3>延後/提前還款</h3>
                <p>提供線上申請延後/提前還款服務。</p>
                <a href="deferment_0.jsp" class="clickhere">了解更多</a>
            </div>
        </li>
        <li>
      <span class="imgbox">
        <img src="img/feo-02.png" alt="">
      </span>
            <div class="texArea">
                <h3>緩繳本金/延長還款期間</h3>
                <p>僅提供您書面申請服務(申請書下載)。</p>
                <a href="principal.jsp" class="clickhere">了解更多</a>
            </div>
        </li>
    </ul>
</div>

<!-- 繳款資訊 -->
<div class="navContent navContent-5">
    <ul>
        <li>
      <span class="imgbox">
        <img src="img/dgj-01.png" alt="">
      </span>
            <div class="texArea">
                <h3>繳款方式說明</h3>
                <p>提供您多元繳款方式，歡迎多加利用。</p>
                <a href="payment.jsp" class="clickhere">了解更多</a>
            </div>
        </li>
        <li>
      <span class="imgbox">
        <img src="img/dgj-01.png" alt="">
      </span>
            <div class="texArea">
                <h3>我的電子繳款單</h3>
                <p>電子繳款通知單查詢及列印下載服務。</p>
                <a href="myElectronicPay_1.jsp" class="clickhere">登入查詢</a>
            </div>
        </li>
    </ul>
</div>

<!-- 個人資料 -->
<div class="navContent navContent-6">
    <ul>
        <li>
      <span class="imgbox">
        <img src="img/dgj-01.png" alt="">
      </span>
            <div class="texArea">
                <h3>變更基本資料</h3>
                <p>查詢/變更個人基本資料。</p>
                <a href="personalInfo_start.jsp" class="clickhere">登入變更</a>
            </div>
        </li>
        <li>
      <span class="imgbox">
        <img src="img/deft.png" alt="">
      </span>
            <div class="texArea">
                <h3>變更代碼/密碼</h3>
                <p>變更就學貸款服務專區會員代碼/密碼。</p>
                <a href="changePwd.jsp" class="clickhere">登入變更</a>
            </div>
        </li>
    </ul>
</div>


<div class="path applyAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li><a href="apply_00.jsp" class="active">我要申請</a></li>
    </ul>
</div>

<div class="path paymentAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="#">繳款資訊</a></li>
        <li><a href="" class="active">立即繳款</a></li>
    </ul>
</div>

<div class="path personalinfoAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="personalInfo_start.jsp">個人資料</a></li>
        <li><a href="personalInfo_start.jsp" class="active">變更基本資料</a></li>
    </ul>
</div>

<div class="path forgetPasswordAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        
        <li><a href="forgetPassword.jsp" class="active">重設代碼/密碼</a></li>
    </ul>
</div>

<div class="path changePwdAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="changePwd.jsp" >個人資料</a></li>
        <li><a href="changePwd.jsp" class="active">變更代碼/密碼</a></li>
    </ul>
</div>

<div class="path defermentAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="deferment_0.jsp" >延期還款</a></li>
        <li><a href="deferment_0.jsp" class="active" >延後/提前還款</a></li>
    </ul>
</div>

<div class="path principalAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="#">延期還款</a></li>
        <li><a href="principal.jsp" class="active">緩繳本金/延長還款期間</a></li>
    </ul>
</div>

<div class="path memberLoginAath">
    
    <ul>
        <li class="path_home"><a href="">首頁</a></li>
        <li><a href="register.jsp" class="active">我要申請</a></li>
    </ul>
    

</div>


<div class="path repaymentInquiryAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="#">帳務查詢</a></li>
        <li><a href="repaymentInquiry.jsp" class="active">還款明細查詢</a></li>
    </ul>
</div>

<div class="path myloanAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="" >帳務查詢</a></li>
        <li><a href="myloan.jsp" class="active">我的貸款</a></li>
    </ul>
</div>

<div class="path registerAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li><a href="register.jsp" class="active">註冊會員</a></li>
    </ul>
</div>

<div class="path myElectronicPayAath">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="#">繳款資訊</a></li>
        <li><a href="myElectronicPay_1.jsp" class="active" >我的電子繳款單</a></li>
    </ul>
</div>

<div class="path PaymentInstructions">
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="#">繳款資訊</a></li>
        <li><a href="payment.jsp" class="active" >繳款方式說明</a></li>
    </ul>
</div>


    </div>

    <div class="contentArea">
        <div class="processArea">

            <div class="processOutBox">
                <div class="processBox">
                    <div class="processInner">

                        <div class="talkwall">
                            <p>Hi 你好，</p>
                            <div class="tonypan">
                                <p>如果您使用IE8 (含)以下版本瀏覽器，建議您升級您的IE瀏覽器，或使用其他瀏覽器軟體 Google Chrome、Firefox，並搭配 1024 x 768 以上之螢幕解析度，以獲得最佳瀏覽體驗.。</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="footerArea">
        



<script src="js/prog/script.js"></script>
<script src="js/prog/qa.js"></script>

<footer class="footer">
  <div class="copyright">
    <p>©台北富邦商業銀行股份有限公司</p>
    <p>建議瀏覽器版本：IE9 、Chrome40 、Safari5 、FireFox 30 以上</p>
  </div>
</footer>


    </div>


</div>
</body>
