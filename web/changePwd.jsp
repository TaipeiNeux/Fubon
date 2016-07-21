<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding("utf-8");
    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false);
    String step = queryStringInfo.getParam("step");

    step = StringEscapeUtils.escapeHtml4(step);
%>
<script src="js/jquery-ui.min.js"></script>
<body class="apply_1_step1">

<script>
    var jumpStep = '<%=step%>';
</script>

<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>
<div class="wrapper">


    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>


    <div class="contentArea">
        <!-- 由flow.js自己長 -->
        <div class="processTab"><div class="processBox"></div></div>

        <div class="processArea">
            <div class="stepArea">

            </div>

            <div class="processOutBox">
                <div class="processBox">
                    <form id="mainForm">
                        <div class="processInner"></div>
                    </form>
                    <div class="nextBtn"></div>
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

<!-- 各別流程才各別載入所需的js -->
<link href='fullcalendar/fullcalendar.css' rel='stylesheet' />
<link href='fullcalendar/fullcalendar.print.css' rel='stylesheet' media='print' />
<script src="js/prog/validAccountAndPwd.js?v=<%=System.currentTimeMillis()%>"></script>
<script src="js/prog/changePwd.js?v=<%=System.currentTimeMillis()%>"></script>
<script src='fullcalendar/lib/moment.min.js'></script>
<script src='fullcalendar/fullcalendar.min.js'></script>
<!--<script src='fullcalendar/lib/jquery.min.js'></script>-->
</body>
