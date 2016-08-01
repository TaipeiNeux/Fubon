<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="com.neux.garden.dbmgr.DaoFactory" %>
<%@ page import="com.neux.utility.orm.bean.DataObject" %>
<%@ page import="java.util.Vector" %>
<%@ page import="com.neux.utility.orm.dal.dao.module.IDao" %>
<%@ page import="com.neux.utility.utils.jsp.info.JSPMapInfo" %>
<%@ page import="com.neux.utility.orm.dal.SQLCommand" %>
<%@ page language="java" contentType="text/html; charset=utf-8"%>

<%
    request.setCharacterEncoding("utf-8");
    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false);

    IDao dao = DaoFactory.getDefaultDao();
    Vector<DataObject> result = new Vector<DataObject>();
    SQLCommand query = new SQLCommand("select TopicNo,DataNo,Title from Document_Data");
    dao.queryByCommand(result,query,null,DaoFactory.getDefaultDataObject("Document_Data"));
%>

<html>
<body>

<form action="document_data_act.jsp" method="post" enctype="multipart/form-data">
    <input type="hidden" name="action" value="<%=JSPMapInfo.INSERT%>"/>
    分類代碼：<input type="text" name="TopicNo"/>
    資料代碼：<input type="text" name="DataNo"/>
    標題：<input type="text" name="Title"/>
    上傳檔案：<input type="file" name="file"/>

    <button type="submit">新增</button>
</form>

<table border="1">
    <thead>
    <tr>
        <th>分類代碼</th>
        <th>資料代碼</th>
        <th>標題</th>
    </tr>
    </thead>

    <tbody>
    <%
        for(DataObject d : result) {
    %>
    <tr>
        <form action="document_data_act.jsp" method="post" enctype="multipart/form-data">
            <input type="hidden" name="DataNo" value="<%=d.getValue("DataNo")%>"/>
            <input type="hidden" name="action" value="<%=JSPMapInfo.MODIFY%>"/>
            <td><%=d.getValue("TopicNo")%></td>
            <td><%=d.getValue("DataNo")%></td>
            <td><%=d.getValue("Title")%></td>
            <td>
                修改檔案：<input type="file" name="file"/>
                <button type="submit">送出</button>
            </td>
        </form>
    </tr>
    <%
        }
    %>
    </tbody>
</table>

</body>
</html>