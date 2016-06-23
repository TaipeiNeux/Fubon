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
<script>
    var loginMsg = '<%=loginMsg%>';
    var determineStstus = '<%=determineStstus%>';
</script>
<body class="apply_00">

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
                            <p>Hi 你好，</p>
                            <div class="tonypan">
                                <p>本行開放就學貸款申請即對保作業期間如下 :</p>
                                <p>上學期 : 08/01 日起，至 09/30 底止</p>
                                <p>下學期 : 01/15 日起，至 02/28 底止</p>
                            </div>
                            <p>如有疑問，請洽本行
                                <span class="blue">客服專線 (02) 8751-6665 按5</span>
                            </p>
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
