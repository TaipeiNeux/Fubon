<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="com.neux.garden.dbmgr.DaoFactory" %>
<%@ page import="com.neux.utility.orm.bean.DataObject" %>
<%@ page import="java.util.Vector" %>
<%@ page import="com.neux.utility.orm.dal.dao.module.IDao" %>
<%@ page import="com.neux.utility.utils.jsp.info.JSPMapInfo" %>
<%@ page import="com.neux.utility.orm.dal.QueryConfig" %>
<%@ page import="com.neux.utility.orm.dal.dao.order.Order" %>
<%@ page import="org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8"%>


<%
    request.setCharacterEncoding("utf-8");
    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false);

    String action = queryStringInfo.getParam("action");

    IDao dao = DaoFactory.getDefaultDao();
    Vector<DataObject> result = new Vector<DataObject>();

    if("otp_log".equalsIgnoreCase(action)) {
        dao.query(result,DaoFactory.getDefaultDataObject("OTP_Log"),new QueryConfig().addOrder("CreateTime", Order.DESC));
    }
    else if("mail_log".equalsIgnoreCase(action)) {
        dao.query(result,DaoFactory.getDefaultDataObject("Mail_Log"),new QueryConfig().addOrder("CreateTime", Order.DESC));
    }
    else if("esb_log".equalsIgnoreCase(action)) {
        dao.query(result,DaoFactory.getDefaultDataObject("ESB_Log"),new QueryConfig().addOrder("CreateTime", Order.DESC));
    }


%>

<html>
<body>

<form action="log.jsp" method="post">

    Log類型：
    <select name="action">
        <option value="">請選擇</option>
        <option value="otp_log">OTP</option>
        <option value="mail_log">Mail</option>
        <option value="esb_log">電文</option>
    </select>


    <button type="submit">查詢</button>
</form>

<table border="1">

    <%
        if("otp_log".equalsIgnoreCase(action)) {

    %>
    <thead>
    <tr>
        <th>手機</th>
        <th>EMail</th>
        <th>IP</th>
        <th>交易代碼</th>
        <th>驗證碼</th>
        <th>建立時間</th>
        <th>簡訊內容</th>
    </tr>
    </thead>

    <tbody>
    <%
        for(DataObject d : result) {
    %>
    <tr>
        <td><%=d.getValue("Mobile")%></td>
        <td><%=d.getValue("Email")%></td>
        <td><%=d.getValue("IP")%></td>
        <td><%=d.getValue("OTPNumber")%></td>
        <td><%=d.getValue("OTPCode")%></td>
        <td><%=d.getValue("CreateTime")%></td>
        <td><%=d.getValue("SmsContent")%></td>
    </tr>
    <%
        }
    %>
    </tbody>
    <%
    }
    else if("mail_log".equalsIgnoreCase(action)) {
    %>
    <thead>
    <tr>
        <th>EMail</th>
        <th>標題</th>
        <th>內容</th>
        <th>建立時間</th>
    </tr>
    </thead>

    <tbody>
    <%
        for(DataObject d : result) {
    %>
    <tr>
        <td><%=d.getValue("Email")%></td>
        <td><%=d.getValue("Title")%></td>
        <td><%=d.getValue("Content")%></td>
        <td><%=d.getValue("CreateTime")%></td>
    </tr>
    <%
        }
    %>
    </tbody>

    <%
        }
        else if("esb_log".equalsIgnoreCase(action)) {
              %>
    <thead>
    <tr>
        <th>HsyDay</th>
        <th>HsyTime</th>
        <th>SPName</th>
        <th>HWSID</th>
        <th>UUID</th>
        <th>HSTANO</th>
        <th>HTLID</th>
        <th>HRETRN</th>
        <th>TxId</th>
        <th>上行</th>
        <th>下行</th>
        <th>CreateTime</th>
    </tr>
    </thead>

    <tbody>
    <%
        for(DataObject d : result) {
    %>
    <tr>
        <td><%=d.getValue("HsyDay")%></td>
        <td><%=d.getValue("HsyTime")%></td>
        <td><%=d.getValue("SPName")%></td>
        <td><%=d.getValue("HWSID")%></td>
        <td><%=d.getValue("UUID")%></td>
        <td><%=d.getValue("HSTANO")%></td>
        <td><%=d.getValue("HTLID")%></td>
        <td><%=d.getValue("HRETRN")%></td>
        <td><%=d.getValue("TxId")%></td>
        <td><%=StringEscapeUtils.escapeHtml4(d.getValue("RQTxnString"))%></td>
        <td><%=StringEscapeUtils.escapeHtml4(d.getValue("RSTxnString"))%></td>
        <td><%=d.getValue("CreateTime")%></td>
    </tr>
    <%
        }
    %>
    </tbody>

    <%
        }
    %>

</table>

</body>
</html>