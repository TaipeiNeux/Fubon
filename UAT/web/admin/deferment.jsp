<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="com.neux.garden.dbmgr.DaoFactory" %>
<%@ page import="com.neux.utility.orm.bean.DataObject" %>
<%@ page import="java.util.Vector" %>
<%@ page import="com.neux.utility.orm.dal.dao.module.IDao" %>
<%@ page import="com.neux.utility.utils.jsp.info.JSPMapInfo" %>
<%@ page language="java" contentType="text/html; charset=utf-8"%>

<%
    request.setCharacterEncoding("utf-8");
    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false);

    IDao dao = DaoFactory.getDefaultDao();
    Vector<DataObject> result = new Vector<DataObject>();
    dao.query(result,DaoFactory.getDefaultDataObject("Deferment_Flow"),null);
%>

<html>
<body>

<table border="1">
    <thead>
    <tr>
        <th>案件流水號</th>
        <th>申請人身份證</th>
        <th>IP</th>
        <th>延期還款原因</th>
        <th>預計時間</th>
        <th>申請時間</th>
        <th>申請文件</th>
    </tr>
    </thead>

    <tbody>
    <%
        for(DataObject d : result) {
            String logId = d.getValue("LogId");

            DataObject docObject = DaoFactory.getDefaultDataObject("Deferment_Doc");
            docObject.setValue("FlowLogId",logId);
            Vector<DataObject> tmp = new Vector<DataObject>();
            dao.query(tmp,docObject,null);

            StringBuffer html = new StringBuffer();
            for(DataObject doc : tmp) {
                String DocId = doc.getValue("DocId");
                String DocType = doc.getValue("DocType");

                if("1".equalsIgnoreCase(DocType)) {
                    DocType = "身份證正面影本";
                }
                else if("2".equalsIgnoreCase(DocType)) {
                    DocType = "身份證反面影本面";
                }
                else if("3".equalsIgnoreCase(DocType)) {
                    DocType = "學生證正面";
                }
                else if("4".equalsIgnoreCase(DocType)) {
                    DocType = "學生證反面";
                }
                else if("5".equalsIgnoreCase(DocType)) {
                    DocType = "附加證明";
                }


                html.append("<a href=\"../data?action=downloadDefermentDocument&docId="+DocId+"\" target=\"_blank\">"+DocType+"</a><br>");
            }
    %>
    <tr>
        <td><%=logId%></td>
        <td><%=d.getValue("AplyIdNo")%></td>
        <td><%=d.getValue("IP")%></td>
        <td><%=d.getValue("Eligibility")%></td>
        <td><%=d.getValue("ForecastDate")%></td>
        <td><%=d.getValue("CreateTime")%></td>
        <td><%=html.toString()%></td>
    </tr>
    <%
        }
    %>
    </tbody>
</table>

</body>
</html>