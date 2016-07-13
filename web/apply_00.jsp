<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding( "utf-8");

    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false);
    String loginMsg = queryStringInfo.getParam("loginMsg");
    String determineStstus = queryStringInfo.getParam("determineStstus");

    loginMsg = StringEscapeUtils.escapeHtml4(loginMsg);
    determineStstus = StringEscapeUtils.escapeHtml4(determineStstus);
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
        <div class="processArea" style="display:none;">

            <div class="processOutBox">
                <div class="processBox">
                    <div class="processInner">

                        <div class="talkwall">
                            <p></p>
                            <div class="tonypan">
                                <p></p>
                                <p></p>
                                <p></p>
                            </div>
                            <p>
                                <span class="blue"></span>
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
