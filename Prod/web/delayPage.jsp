<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding( "utf-8");

    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false);
    String loginMsg = queryStringInfo.getParam("loginMsg");
    String determineStstus = queryStringInfo.getParam("determineStstus");

%>
<script src="js/jquery-ui.min.js"></script>

<body class="delayPage">

<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>

<div class="wrapper">
    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>

    <div class="contentArea">
        <div class="processArea">

            <div class="processOutBox">
                <div class="processBox">
                    <div class="processInner">

                        <div class="talkwall">
                            
                            <p class="pcView">您目前尚無貸款資料或屬特殊貸款狀態；如有疑問，請洽客戶服務專線<a href="tel:0287516665">02-8751-6665</a>按5</p>
                            
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="footerArea">
        <%@ include file="include/footerArea.jsp" %>
    </div>


</div>

<!-- 各別流程才各別載入所需的js -->
<script src="js/prog/determimeGreeting.js"></script>
<script src="js/prog/apply_00.js"></script>

</body>
