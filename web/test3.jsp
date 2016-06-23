<%@ page import="com.neux.utility.utils.jsp.info.JSPMailInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="com.fubon.utils.bean.MailBean" %>
<%@ page import="com.fubon.utils.MessageUtils" %>
<%@ page import="com.fubon.servlet.AuthServlet" %>
<%@ page import="java.util.Set" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%
    request.setCharacterEncoding("utf-8");


    Set<String> keys = AuthServlet.getLoginUserId();

    for(String key : keys) {
        out.println(key + ":" + AuthServlet.getSessionLoginBean(key).getSessionId() + "<BR>");
    }

%>