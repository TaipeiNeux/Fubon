<%@ page import="com.neux.utility.utils.jsp.info.JSPMailInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="com.fubon.utils.bean.MailBean" %>
<%@ page import="com.fubon.utils.MessageUtils" %>
<%@ page import="com.fubon.servlet.AuthServlet" %>
<%@ page import="java.util.Set" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%
    request.setCharacterEncoding("utf-8");


    String uri = request.getRequestURI();
    out.println(request.getQueryString());

%>