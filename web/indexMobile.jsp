<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <%@ include file="include/head.jsp" %>
        <% request.setCharacterEncoding( "utf-8"); %>
            <script src="js/jquery-ui.min.js"></script>

            <body class="index">

                <div class="mobileMenu">
                    <%@ include file="include/mobile_menu.jsp" %>
                </div>

                <div class="wrapper">

                    <div class="headerArea">
                        <%@ include file="include/headerArea.jsp" %>
                    </div>
                    <form id="mainForm" method="post">
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
                                        <a href="javascript:;" class="gonext"></a>
                                    </div>
                                </div>
                                <div class="bannerRight">
                                    <form id="basicInformation" method="post">
                                        <div id="isNotLogin" class="personal mobile">
                                            <h2 class="loginMobile">立即登入</h2>
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
                                                <span>
                <img src="img/fu-10.png" alt="">
              </span>
                                                <input type="password" name="studentPassword" placeholder="使用者密碼" autocomplete="off">
                                            </div>
                                            <div class="loginBox">
                                                    <a href="forgetPassword.jsp">忘記代碼/密碼</a>
                                                    <a href="register.jsp">註冊會員</a>
                                                </div>
                                            <div class="loginBtn">
                                                <a href="javascript:;" class="pobtn-srb" id="loginBtn">登入</a>
                                            </div>
                                        </div>
                                    </form>
                                    <div id="isLogin" class="personal personalin">
                                        <h4>Hi ,
            <span>王*明</span> 你好!</h4>
                                        <p>您已於YYYY/MM/DD HH:MM:SS儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p>
                                        <a href="#" class="pobtn-srw reset">重新申請</a>
                                        <a href="apply.jsp" class="pobtn-srb">繼續填寫</a>
                                    </div>
                                    
                                </div>
                            </section>
                        </div>
                    </form>
                    <div class="sidebarArea" style="display:none">
                        <%@ include file="include/sidebarArea.jsp" %>
                    </div>
                    <div class="footerArea">
                        <%@ include file="include/footerArea.jsp" %>
                    </div>


                </div>


                <!-- 各別流程才各別載入所需的js -->

                <script src="js/prog/index.js"></script>
                <script src="js/prog/greeting.js"></script>