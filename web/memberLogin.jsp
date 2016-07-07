<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <%@ include file="include/head.jsp" %>
        <% request.setCharacterEncoding( "utf-8"); %>

            <body class="memberLogin_1">

                <div class="mobileMenu">
                    <%@ include file="include/mobile_menu.jsp" %>
                </div>

                <div class="wrapper">

                    <div class="headerArea">
                        <%@ include file="include/headerArea.jsp" %>
                    </div>

                    <div class="contentArea">

                        <div class="memberArea">
                           <section class="bannerArea">

                                <div class="bannerLeft">
                                    <div class="container">
                                        <img src="img/fu-155.png" alt="">
                                        <div class="btnArea">
                                            <a href="sub_2.jsp#?1" class="pobtn-srw">了解更多</a>
                                            <a id="applyButton" class="pobtn-srb apply">立即申請</a>

                                        </div>
                                        <a href="javascript:;" class="gonext"></a>
                                    </div>
                                </div>
                            </section>
                            <div class="pada bgpp">
                                <h2>註冊會員</h2>
                                <div class="kim">
                                    <a href="#" class="qrCodeRegister" id="QR1"><img src="img/yw.png" alt="QR Code"></a>
                                    <!--<a href="#" id="PC1" style="display:none"><img src="img/yt.png" alt="QR Code"></a>-->
                                    <div class="kinnim" id="hi1">
                                        <p>Hi,您好!</p>
                                        <p>還不是就學貸款服務專區的會員嗎?</p>
                                        <p>快來註冊會員，立即體驗更優質的就學貸款服務!</p>
                                    </div>
                                    <div id="circleBtn">
                                        <a href="#"><img src="img/de-01.png" alt="會員申請"></a>
                                        <a href="#"><img src="img/de-02.png" alt="會員登入"></a>
                                        <a href="#"><img src="img/de-03.png" alt="申請就學貸款"></a>
                                    </div>
                                    <div class="padaBtn" id="registerBtn">
                                        <a href="register.jsp" class="pobtn-srb register">立即註冊</a>
                                    </div>

                                    <div id="registerQR" style="display:none">
                                       <h2 style="color:7C7C7C" class="QRtitle">掃描 QR code</h2>
                                        <div class="QRCODE"><img src="img/register.png" style="width:200px"></div>
                                        <a href="register.jsp" style="color:7C7C7C" class="QRLink greyBorder">註冊會員</a>
                                    </div>
                                </div>
                            </div>
                            <div class="pada ">
                                <h2>立即登入</h2>
                                <div class="cate">
                                    <div class="catey">
                                        <a href="#" class="qrCodeLogin" id="QR2"><img src="img/yw.png" alt="QR Code"></a>
                                        <div class="kinnim" id="hi2">
                                            <p>Hi,您好!</p>
                                            <p>已經是就學貸款服務專區的會員嗎?</p>
                                            <p>請輸入身分證字號、使用者代碼、使用者密碼，立即登入</p>
                                        </div>
                                        <!-- <p>使用喔!</p> -->
                                    </div>
                                    <div class="catey" id="loginInput">
                                        <div class="inputArea">
                                            <span>
                  <img src="img/fu-08.png" alt="">
                </span>
                                            <input name="studentId" placeholder="身分證字號" type="text">
                                        </div>
                                        <div class="inputArea">
                                            <span>
                  <img src="img/fu-09.png" alt="">
                </span>
                                            <input name="studentCode" placeholder="使用者代碼" type="password">
                                        </div>
                                        <div class="inputArea">
                                            <span>
                  <img src="img/fu-10.png" alt="">
                </span>
                                            <input name="studentPassword" placeholder="使用者密碼" type="password">
                                        </div>
                                        <div class="loginBox">
                                            <a href="forgetPassword.jsp">忘記代碼/密碼</a>
                                            <a href="register.jsp">註冊會員</a>
                                        </div>
                                    </div>
                                    <div class="padaBtn" id="loginBtn">
                                        <a href="#" class="pobtn-dv loginBtn">登入</a>
                                    </div>
                                    
                                    <div id="loginQR" style="display:none">
                                       <h2 style="color:white" class="QRtitle">掃描 QR code</h2>
                                        <div class="QRCODE"><img src="img/indexMobile.png" style="width:200px"></div>
                                        <a href="#" style="color:white" class="QRLink whiteBorder applyBtn">我要申請</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div class="sidebarArea">
                        <%@ include file="include/sidebarArea_QA.jsp" %>
                    </div>
                    <div class="footerArea">
                        <%@ include file="include/footerArea.jsp" %>
                    </div>

                </div>
                <script src="js/prog/memberLogin.js"></script>