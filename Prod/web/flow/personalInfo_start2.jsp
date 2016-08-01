<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding("utf-8");
%>

<body class="personalinfo_0">
<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>
<div class="wrapper">


    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>


    <div class="contentArea">
        <!-- 由flow.js自己長 -->
        <div class="processTab"></div>

        <div class="processArea">
            <div class="stepArea">

            </div>

            <div class="processOutBox">
                <div class="processBox">
                    <form id="mainForm">
                        <h2 class="who whos">申請人基本資料</h2>
                            <div class="editBtnBoxTop editBtnbot">
                                    <a href="personalInfo_flow.jsp" class="editBtn">修改</a>
                                </div>
                        <div class="processInner">
                            <div class="dan">
                                <div class="editBtnBoxTop">
                                    <a href="personalInfo_flow.jsp" class="editBtn">修改</a>
                                </div>
                                <h2 class="who">申請人基本資料</h2>
                                <div class="may">
                                    <div class="joy bgfff">
                                        <div class="left">
                                            <p>身分證字號</p>
                                        </div>
                                        <div class="right">
                                            <p>A123****89</p>
                                        </div>
                                    </div>
                                    <div class="joy ">
                                        <div class="left">
                                            <p>姓名</p>
                                        </div>
                                        <div class="right">
                                            <p>王*明</p>
                                        </div>
                                    </div>
                                    <div class="joy bgfff">
                                        <div class="left">
                                            <p>生日</p>
                                        </div>
                                        <div class="right">
                                            <p>民國75年10月8日</p>
                                        </div>
                                    </div>
                                    <div class="joy">
                                        <div class="left">
                                            <p>婚姻狀況</p>
                                        </div>
                                        <div class="right">
                                            <p>未婚</p>
                                        </div>
                                    </div>
                                    <div class="joy bgfff">
                                        <div class="left">
                                            <p>戶籍電話</p>
                                        </div>
                                        <div class="right">
                                            <p>(02) ******78</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="may omega">
                                    <div class="joy bgfff">
                                        <div class="left">
                                            <p>通訊電話</p>
                                        </div>
                                        <div class="right">
                                            <p>(02) ******78</p>
                                        </div>
                                    </div>
                                    <div class="joy">
                                        <div class="left">
                                            <p>Email</p>
                                        </div>
                                        <div class="right">
                                            <p>****45@gmail.com</p>
                                        </div>
                                    </div>
                                    <div class="joy bgfff">
                                        <div class="left">
                                            <p>行動電話</p>
                                        </div>
                                        <div class="right">
                                            <p>09*****541</p>
                                        </div>
                                    </div>
                                    <div class="joy ">
                                        <div class="left">
                                            <p>戶籍地址</p>
                                        </div>
                                        <div class="right">
                                            <p>新北市*********54號8樓</p>
                                        </div>
                                    </div>
                                    <div class="joy bgfff">
                                        <div class="left">
                                            <p>通訊地址</p>
                                        </div>
                                        <div class="right">
                                            <p>新北市*********54號8樓</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="notice">
                    <h3>注意事項:</h3>
                    <p>為符合「金融監督管理委員會指定非公務機關個人資料檔案安全維護辦法」之規定，本行就學貸款服務專區內，涉及個人資料之交易，部分資料將以遮蔽之方式進行保護，若導致您無法確認資料之正確性，請您至本行櫃檯辦理或洽客戶服務專線02-8751-6665按5將有專人竭誠為您服務。</p>
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

<!-- 各別流程才各別載入所需的js -->

<script src="js/prog/personalInfo_start.js"></script>
</body>
