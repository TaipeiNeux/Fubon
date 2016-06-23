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
    SQLCommand query = new SQLCommand("select a.AplyNo,a.AplyIdNo,a.Applicant from AplyMemberTuitionLoanDtl a , AplyMemberTuitionLoanDtl_Doc b where 1=1 and a.AplyIdNo = b.AplyIdNo group by a.AplyNo,a.AplyIdNo,a.Applicant");
    dao.queryByCommand(result,query,null,null);
%>

<html>
<body>

<table border="1">
    <thead>
    <tr>
        <th>案件流水號</th>
        <th>申請人身份證</th>
        <th>姓名</th>
        <th>申請文件</th>
        <th>上傳時間</th>
        <th>案件狀態</th>
    </tr>
    </thead>

    <tbody>
    <%
        for(DataObject d : result) {
            String aplyNo = d.getValue("AplyNo");
            String aplyIdNo = d.getValue("AplyIdNo");

            String status = "查無資料";
            SQLCommand getStatus = new SQLCommand("select * from AplyMemberTuitionLoanDtl where AplyIdNo = ?");
            getStatus.addParamValue(aplyIdNo);
            Vector<DataObject> statusRS = new Vector<DataObject>();
            dao.queryByCommand(statusRS,getStatus,null,null);

            if(statusRS.size() != 0) {
                status = statusRS.get(0).getValue("AplyCaseType");

                if("1".equalsIgnoreCase(status)) status = "線上續貸";
                else if("2".equalsIgnoreCase(status)) status = "分行對保";
            }

            DataObject docObject = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl_Doc");
            docObject.setValue("AplyIdNo",aplyIdNo);
            Vector<DataObject> tmp = new Vector<DataObject>();
            dao.query(tmp,docObject,null);

            StringBuffer html = new StringBuffer();
            StringBuffer timeHTML = new StringBuffer();
            for(DataObject doc : tmp) {
                String DocId = doc.getValue("DocId");
                String DocType = doc.getValue("DocType");
                String CreateTime = doc.getValue("CreateTime");

                if("1".equalsIgnoreCase(DocType)) {
                    DocType = "身份證正面影本";
                }
                else if("2".equalsIgnoreCase(DocType)) {
                    DocType = "身份證反面影本面";
                }
                else if("3".equalsIgnoreCase(DocType)) {
                    DocType = "註冊繳費";
                }
                else if("4".equalsIgnoreCase(DocType)) {
                    DocType = "低收入戶";
                }


                html.append("<a href=\"../data?action=downloadApplyDocument&docId="+DocId+"\" target=\"_blank\">"+DocType+"</a><br>");
                timeHTML.append("<p>"+CreateTime+"</p>");
            }
    %>
    <tr>
        <td><%=aplyNo%></td>
        <td><%=aplyIdNo%></td>
        <td><%=d.getValue("Applicant")%></td>
        <td><%=html.toString()%></td>
        <td><%=timeHTML.toString()%></td>
        <td><%=status%></td>
    </tr>
    <%
        }
    %>
    </tbody>
</table>

</body>
</html>