<%@ page import="com.fubon.utils.DBUtils" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%
    request.setCharacterEncoding("utf-8");

    Connection conn = DBUtils.getConnection("jdbc/pib");

    out.println("conn = " + conn);
    if(conn != null) {
        try{
            ResultSet rs = conn.prepareStatement("select * from VILLAGE").executeQuery();
            while(rs.next()) {
                out.println(rs.getString("CITY_CODE_1") + "</br>");
                out.println(rs.getString("ZIPCODE") + "</br>");
                out.println(rs.getString("LOCALE") + "</br>");
                out.println(rs.getString("VILLAGE_NAME") + "</br>");
            }
        }catch(Exception e) {
            e.printStackTrace();
        }finally{
            try{
                conn.close();
            }catch(Exception ex) {
                ;
            }
        }
    }
%>