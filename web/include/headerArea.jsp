<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
    request.setCharacterEncoding("utf-8");

    //boolean isLogin = loginUserBean != null;

    String nav = "index";
    String loginSuccessPage = "";
    String funcName = "";
    //如果沒登入的話，才判斷session中有沒有預計前往的網頁
    if(!isLogin) {
        loginSuccessPage = String.valueOf(session.getAttribute("loginSuccessPage"));

		out.println("<!--");
		out.println(loginSuccessPage);
		out.println("-->");
		
        if("apply_00.jsp".equalsIgnoreCase(loginSuccessPage) || "apply.jsp".equalsIgnoreCase(loginSuccessPage)) {
            nav = "apply";
            funcName = "我要申請";
        }
        else if("myloan.jsp".equalsIgnoreCase(loginSuccessPage)) {
            nav = "myloan";
            funcName = "我的貸款";
        }
        else if("repaymentInquiry.jsp".equalsIgnoreCase(loginSuccessPage)) {
            nav = "repaymentInquiry";
            funcName = "還款明細查詢";
        }
        else if("deferment.jsp".equalsIgnoreCase(loginSuccessPage)) {
            nav = "deferment";
            funcName = "延後/提前還款";
        }
        else if("myElectronicPay_1.jsp".equalsIgnoreCase(loginSuccessPage)) {
            nav = "myElectronicPay";
            funcName = "我的貸款";
        }
        else if("personalInfo_start.jsp".equalsIgnoreCase(loginSuccessPage) || "personalInfo_flow".equalsIgnoreCase(loginSuccessPage)) {
            nav = "personalInfo";
            funcName = "變更基本資料";
        }
        else if("changePwd.jsp".equalsIgnoreCase(loginSuccessPage)) {
            nav = "changePwd";
            funcName = "變更代碼/密碼";
        }

    }

%>


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
    <%
        if("index".equalsIgnoreCase(nav)) {
    %>
    <ul>
        <li class="path_home"><a href="">首頁</a></li>
        <li><a href="register.jsp" class="active">我要申請</a></li>
    </ul>
    <%
    } else if("apply".equalsIgnoreCase(nav)) {
    %>
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li><a href="apply_00.jsp" class="active">我要申請</a></li>
    </ul>
    <%
    } else if("myloan".equalsIgnoreCase(nav)) {
    %>
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="" >帳務查詢</a></li>
        <li><a href="myloan.jsp" class="active">我的貸款</a></li>
    </ul>
    <%
        } else if("repaymentInquiry".equalsIgnoreCase(nav)) {
    %>
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="#">帳務查詢</a></li>
        <li><a href="repaymentInquiry.jsp" class="active">還款明細查詢</a></li>
    </ul>
    <%

        } else if("deferment".equalsIgnoreCase(nav)) {
    %>
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="deferment_0.jsp" >延期還款</a></li>
        <li><a href="deferment_0.jsp" class="active" >延後/提前還款</a></li>
    </ul>
    <%

        } else if("myElectronicPay".equalsIgnoreCase(nav)) {
    %>
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="#">繳款資訊</a></li>
        <li><a href="myElectronicPay_1.jsp" class="active" >我的電子繳款單</a></li>
    </ul>
    <%
        } else if("personalInfo".equalsIgnoreCase(nav)) {
    %>
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="personalInfo_start.jsp">個人資料</a></li>
        <li><a href="personalInfo_start.jsp" class="active">變更基本資料</a></li>
    </ul>
    <%
        } else if("changePwd".equalsIgnoreCase(nav)) {
    %>
    <ul>
        <li class="path_home"><a href="index.jsp">首頁</a></li>
        <li class="underline"><a href="changePwd.jsp" >個人資料</a></li>
        <li><a href="changePwd.jsp" class="active">變更代碼/密碼</a></li>
    </ul>
    <%
        }
    %>

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

