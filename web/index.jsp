<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<% request.setCharacterEncoding("utf-8"); %>

<script src="js/jquery-ui.min.js"></script>
<body class="index">

<div class="ajax-loader" style="display: block;"><div class="b-loading"><span class="m-icon-stack"><i class="m-icon m-icon-fubon-blue is-absolute"></i><i class="m-icon m-icon-fubon-green"></i></span></div></div>

<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>

<div class="wrapper">

<div class="wrapper-blocker"></div>
<div class="headerArea">
    <%@ include file="include/headerArea.jsp" %>
</div>
<div id="mainForm" method="post">
<input type="hidden" class="loginMsg" name="loginMsg" value="" />
<input type="hidden" class="determineStstus" name="determineStstus" value="" />
<div class="contentArea">
<section class="bannerArea">

    <div class="bannerLeft">
        <div class="container">
            <img src="img/fu-155.png" alt="">
            <div class="btnArea">
                <a href="sub_2.jsp#?1" class="pobtn-srw">了解更多</a>
                <a id="applyButton" class="pobtn-srb apply">立即申請</a>

            </div>
            <div class="smbtnArea">
                <a href="register.jsp" class="pobtn-srw" id="registerMobile">註冊會員</a>
                <a href="javascript:;" class="pobtn-srb" id="loginMobile">立即登入</a>
            </div>
            <a href="javascript:;" class="gonext"></a>
        </div>
    </div>
    <div class="bannerRight">
        <div id="basicInformation" method="post">
            <div id="isNotLogin" class="personal" style="display:none;">
                <div class="inputArea perinputArea">
                    <h3 class="pertitle">立即登入</h3>
                    <div class="loginBox">
                        <a href="forgetPassword.jsp">忘記代碼/密碼</a>
                        <a href="register.jsp">註冊會員</a>
                    </div>
                </div>
                <!-- Edit by JiaRu 160604
                <div class="inputArea">
                  <span>
                    <img src="img/fu-08.png" alt="">
                  </span>
                  <input type="text" name="studentId" placeholder="身分證字號">
				</div>
                <div class="inputArea">
                  <span>
                    <img src="img/fu-09.png" alt="">
                  </span>
                  <input type="password" name="studentCode" placeholder="使用者代碼" autocomplete="off">
                </div>
                <div class="inputArea">
				<div class="insideArea">
                  <span>
                    <img src="img/fu-10.png" alt="">
                  </span>
                  <input type="password" name="studentPassword" placeholder="使用者密碼" autocomplete="off">
                </div>
				</div>
                -->
                <div class="inputArea">
              <span>
                <img src="img/fu-08.png" alt="">
              </span>
                    <input type="text" name="studentId" placeholder="身分證字號">
                    <label class="error"></label>
                </div>
                <div class="inputArea">
              <span>
                <img src="img/fu-09.png" alt="">
              </span>
                    <input type="password" name="studentCode" placeholder="使用者代碼" autocomplete="off">
                    <label class="error"></label>
                </div>
                <div class="inputArea">
              <span>
                <img src="img/fu-10.png" alt="">
              </span>
                    <input type="password" name="studentPassword" placeholder="使用者密碼" autocomplete="off">
                    <label class="error"></label>
                </div>
                <div class="loginBtn">
                    <a href="javascript:;" class="pobtn-srb" id="loginBtn">登入</a>
                </div>
            </div>
        </div>
        <div id="isLogin" class="personal personalin">
            <h4>
                <span></span></h4>
            <p></p>
            <a href="#" class="pobtn-srw reset"></a>
            <a href="apply.jsp" class="pobtn-srb"></a>
        </div>
        <div class="news">
            <h3>最新消息</h3>
            <div id="owl-carousel_news" class="owl-carousel_news owl-carousel owl-theme owl-loaded">
                
            </div>
        </div>

    </div>
    <a href="javascript:;" class="godownBtn"></a>
</section>

<section class="Introduction" id="Introduction">
    <div class="container">
        <div class="border_title">
            <h2 class="zh">就學貸款介紹</h2>
            <h4 class="en">Introduction</h4>
        </div>
        <div class="introArea">
            <div class="intrBox">
                <div class="smicon">
                    <img src="img/fu-14.png">
                </div>
                <h4 class="intr" id="dot2">•</h4>
                <h3 class="intr">什麼是就學貸款?</h3>

                <p class="intrP">政府設置就學貸款目的係培育國家人才，幫助在學學生求學期間，毋須顧慮學費，專心向學所提供的一項優惠貸款；但就學貸款並非社會福利，亦非就學補助，畢業後，借款者應即擔負起攤還本息的還款責任。</p>
                <a href="sub_2.jsp#?1" class="mo">了解更多</a>
            </div>
            <div class="intrBox">
                <div class="smicon">
                    <img src="img/fu-13.png">
                </div>
                <h4 class="intr" id="dot1">•</h4>
                <h3 class="intr">就學貸款有申請資格限制嗎?</h3>
                <p class="intrP">凡於國內設有戶籍之本國國民，且就讀於經各級主管機關立案之台北市公私立學校，具正式學籍者；家庭年所得總額符合規範之內，即享有就學貸款申請資格。</p>
                <a href="sub_2.jsp#?2" class="mo">了解更多</a>
            </div>
        </div>
    </div>
</section>

<section id="ApplicationProcess" class="ApplicationProcess">
    <div class="container">
        <div class="border_title">
            <h2 class="zh">申請流程</h2>
            <h4 class="en">Application process</h4>
        </div>
        <div class="aplicaTab">
            <ul>
                <li class="active"><a href="javascript:;">首次申請</a></li>
                <li><a href="javascript:;">線上續貸</a></li>
            </ul>
        </div>
        <div class="activity_content ">
            <div class="application_step app1 active">
                <div class="container">
                    <ul class="">
                        <li>
                            <a href="javascript:;">
                                <h2><span class="first_apply">註冊會員</span></h2>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <h2><span class="first_apply">填寫<br>就學貸款申請書</span></h2>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <h2><span class="first_apply">預約對保分行</span></h2>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <h2><span class="first_apply">送出申請書</span></h2>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <h2><span class="first_apply">前往預約分行<br>完成對保作業</span></h2>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="application_step app2">
                <div class="container">
                    <ul class="">
                        <li>
                            <a href="javascript:;">
                                <h2><span class='online_loan'>填寫<br>就學貸款申請書</span></h2>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <h2><span class='online_loan'>上傳證明文件</span></h2>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <h2><span class='online_loan'>送出申請書<br>等待審核</span></h2>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <h2><span class='online_loan'>審核完成<br>列印收執聯交付學校</span></h2>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="Application">

    <div class="container">
        <div class="appHf">
            <div class="border_title">
                <h2 class="zh">我要申請</h2>
                <h4 class="en">Application</h4>
            </div>
            <div class="csBoxArea">
                <div class="csBox csBox_1">
                    <a href="javascript:;">首次申請就學貸款</a>
                    <p>輕鬆三步驟 助您快速完成就學貸款申辦
                        <br> 加入會員 > 線上填寫申請書 > 分行對保</p>
                </div>
                <div class="csBox csBox_2">
                    <a href="javascript:;">再次申請就學貸款</a>
                    <p>就學貸款線上對保開辦囉！
                        <br> 台北富邦銀行開放線上申辦免親臨分行，提供您最簡便快速的線上續貸服務！</p>
                </div>
            </div>
            <div class="csA">
                <a href="apply_00.jsp" class="pobtn-srw">立即申請</a>
            </div>
        </div>
        <div class="appHf appHfR" id="selectAddr">
            <div class="optBox">
                <h3 class="opt">請選擇對保分行</h3>
                <div class="mapSelectArea active">
                    <input type="text" name="" value="" class="mapInput" readonly>
                    <span class="placeholder"></span>
                    <div class="seOutArea" id="addrName">
                        <div class="seArea" id="addrCity">
                            <h4>選擇縣市</h4>
                            <ul class="seAreaUL" id="cityUl">

                            </ul>
                        </div>
                        <div class="seArea" id="addrZip">
                            <h4>選擇區域</h4>
                            <ul class="seAreaUL" id="zipUl">

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="mapArea" id="mapArea">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.2569474719126!2d121.56064821493663!3d25.05927884343181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab8d9d238e55%3A0x938a813a77d91aa7!2z5Y-w5YyX5a-M6YKm6YqA6KGM!5e0!3m2!1szh-TW!2stw!4v1458622059261" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
</section>

<section class="Service">
    <div class="container">
        <div class="border_title">
            <h2 class="zh">申貸後服務</h2>
            <h4 class="en">Service</h4>
        </div>
        <ul class="SerBox">
            <li class="sebg_1" data-target="umopen-1">
                <h3>帳務查詢</h3>
                <p>即時查詢貸款餘額、利率與還款明細，快速掌握零時差！</p>
                <div class="umArea">
                <span class="himg">
                <img src="img/fu-24.png" alt="">
              </span>
                    <a href="<%=isLogin ? "myloan.jsp" : "memberLogin.jsp"%>" class="pobtn-bla">我要查詢</a>
                </div>
                <div class="umopen">
                    <h3>帳務查詢</h3>
                    <p>即時查詢貸款餘額、利率與還款明細，快速掌握零時差！</p>
                    <ul>
                        <li><a href="<%=isLogin ? "myloan.jsp" : "memberLogin.jsp"%>" class="files">我的貸款</a></li>
                        <li><a href="<%=isLogin ? "repaymentInquiry.jsp" : "memberLogin.jsp"%>" class="files">還款明細查詢</a></li>
                    </ul>
                </div>
            </li>
            <li class="sebg_2" data-target="umopen-2">
                <h3>延期還款</h3>
                <p>申請延期還款免煩惱，線上申辦簡單又便利！</p>
                <div class="umArea">
                                            <span class="himg">
                <img src="img/fu-22.png" alt="">
              </span>
                    <a href="<%=isLogin ? "apply.jsp" : "memberLogin.jsp"%>" class="pobtn-bla">我要申請</a>
                </div>
                <div class="umopen">
                    <h3>延期還款</h3>
                    <p>申請延期還款免煩惱，線上申辦簡單又便利！</p>
                    <ul>
                        <li><a href="deferment_0.jsp" class="files">延後/提前還款(線上填寫)</a></li>
                        <li><a href="principal.jsp" class="files">緩繳本金/延長還款期間(下載申請書)</a></li>
                    </ul>
                </div>
            </li>
            <li class="sebg_3" data-target="umopen-3">
                <h3>繳款資訊</h3>
                <p>查詢繳款資訊、還可以補印繳款單，再也不怕帳單不見囉！</p>
                <div class="umArea">
                                            <span class="himg">
                <img src="img/fu-23.png" alt="">
              </span>
                    <a href="javascript:;" class="pobtn-bla">我要查詢</a>
                </div>
                <div class="umopen">
                    <h3>繳款資訊</h3>
                    <p>查詢繳款資訊、還可以補印繳款單，再也不怕帳單不見囉！</p>
                    <ul>
                        <li><a href="<%=isLogin ? "payment.jsp" : "memberLogin.jsp"%>" class="files">繳款方式說明</a></li>
                        <li><a href="<%=isLogin ? "myElectronicPay_1.jsp" : "memberLogin.jsp"%>" class="files">我的電子繳款單</a></li>
                        <!--<li><a href="" class="files" onclick="alert('系統建置中');return false;">立即繳款</a></li>-->
                    </ul>
                </div>
            </li>
            <li class="sebg_4" data-target="umopen-4">
                <h3>個人資料</h3>
                <p>如果有搬家、更換聯絡方式，記得來修改才能繼續收到本行相關資訊唷！</p>
                <div class="umArea">
                                            <span class="himg">
                <img src="img/fu-25.png" alt="">
              </span>
                    <a href="javascript:;" class="pobtn-bla">我要變更</a>
                </div>
                <div class="umopen">
                    <h3>個人資料</h3>
                    <p>如果有搬家、更換聯絡方式，記得來修改才能繼續收到本行相關資訊唷！</p>
                    <ul>
                        <li><a href="<%=isLogin ? "personalInfo_start.jsp" : "memberLogin.jsp"%>" class="files" >變更基本資料</a></li>
                        <li><a href="<%=isLogin ? "changePwd.jsp" : "memberLogin.jsp"%>" class="files" >變更代碼/密碼</a></li>
                    </ul>
                </div>
            </li>
        </ul>
        <ul class="umopen_s">
            <div class="umopen umopen-1">
                <p>即時查詢貸款餘額、利率與還款明細，快速掌握零時差！</p>
                <ul>
                    <li><a href="<%=isLogin ? "myloan.jsp" : "memberLogin.jsp"%>" class="files">我的貸款</a></li>
                    <li><a href="<%=isLogin ? "repaymentInquiry.jsp" : "memberLogin.jsp"%>" class="files" >還款明細查詢</a></li>
                </ul>
            </div>
            <div class="umopen umopen-2">
                <p>申請延期還款免煩惱，線上申辦簡單又便利！</p>
                <ul>
                    <li><a href="deferment_0.jsp" class="files">延後/提前還款(線上填寫)</a></li>
                    <li><a href="principal.jsp" class="files">緩繳本金/延長還款期間(下載申請書)</a></li>
                </ul>
            </div>
            <div class="umopen umopen-3">
                <p>查詢繳款資訊、還可以補印繳款單，再也不怕帳單不見囉！</p>
                <ul>
                    <li><a href="payment.jsp" class="files">繳款方式說明</a></li>
                    <li><a href="<%=isLogin ? "myloan.jsp" : "memberLogin.jsp"%>" class="files">我的電子繳款單</a></li>
                    <!--<li><a href="" class="files" onclick="alert('系統建置中');return false;">立即繳款</a></li>-->
                </ul>
            </div>
            <div class="umopen umopen-4">
                <p>如果有搬家、更換聯絡方式，記得來修改才能繼續收到本行相關資訊唷！</p>
                <ul>
                    <li><a href="<%=isLogin ? "personalInfo.jsp" : "memberLogin.jsp"%>" class="files">變更基本資料</a></li>
                    <li><a href="<%=isLogin ? "changePwd.jsp" : "memberLogin.jsp"%>" class="files">變更代碼/密碼</a></li>
                </ul>
            </div>
        </ul>
    </div>
</section>

</div>
</div>
<div class="sidebarArea">
    <%@ include file="include/sidebarArea.jsp" %>
</div>
<div class="footerArea">
    <%@ include file="include/footerArea.jsp" %>
</div>


</div>


<!-- 各別流程才各別載入所需的js -->
<script src="js/prog/determimeGreeting.js"></script>
<script src="js/prog/index.js"></script>

    </body>                