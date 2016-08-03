<%@ page import="java.util.UUID" %>
<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>

<%
    request.setCharacterEncoding("utf-8");
    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false);
    String action = queryStringInfo.getParam("action");

    String pageURL = "index.jsp";
    if("login".equalsIgnoreCase(action)) {
        pageURL = "memberLogin.jsp";
    }
    else if("register".equalsIgnoreCase(action)) {
        pageURL = "register.jsp";
    }

    String uuid = UUID.randomUUID().toString();

    response.setHeader("Cache-Control", "no-store, no-cache");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);
%>

<html xmlns="http://www.w3.org/1999/xhtml"><head>
<head>
    <title>台北富邦銀行 | 就學貸款</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <link rel="shortcut icon" href="img/favicon.ico?v=2">
    <script src="js/jquery-1.12.1.js"></script>
    <script>
        var _TOKENKEY = '<%=uuid%>';

        function getToken() {
            return _TOKENKEY;
        }

            //mike detect ipad 
        $(window).on("orientationchange", function() {
            console.log("width" + $(window).width());
            $("#frame1").css("width", $(window).width());
            $("#frame1").css("min-width", $(window).width());
            $("#frame1").css("max-width", $(window).width());

        });

        function getWidth(){
            return $(window).width();
        }

        function iframeScrollTop(){
           // $("#frame1").contents().scrollTop(0);
           console.log("iframeScrollTop");
            var myIframe = document.getElementById('frame1');
            myIframe.onload = function () {
                myIframe.contentWindow.scrollTo(0,0);
            }
           console.log("iframeScrollTop finish");
        }
    </script>
    <style>
        #frame1{
            max-width:100%;
            max-height:100%;
            min-width:100%;
            min-height:100%;
            width:100%;
            height:100%;
           
        }
    </style>
	
	<!--[if lt IE 9]>
    <script src="js/html5shiv.min.js?v=<%=System.currentTimeMillis()%>"></script>
    <script src="js/respond.min.js?v=<%=System.currentTimeMillis()%>"></script>
	<script>
		window.location = 'browser.jsp'
	</script>

    <![endif]-->
</head>

<frameset id="frameSet" rows="*" style="border: 0px">
    <frame id="frame1" name="frame1" src="<%=pageURL%>?_token=<%=uuid%>">
</frameset>
