<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="com.neux.garden.dbmgr.DaoFactory" %>
<%@ page import="com.neux.utility.orm.bean.DataObject" %>
<%@ page import="java.util.Vector" %>
<%@ page import="com.neux.utility.orm.dal.dao.module.IDao" %>
<%@ page import="com.neux.utility.utils.jsp.info.JSPUploadConf" %>
<%@ page import="com.neux.utility.utils.PropertiesUtil" %>
<%@ page import="com.neux.utility.utils.jsp.info.JSPMapInfo" %>
<%@ page import="java.io.File" %>
<%@ page import="java.sql.PreparedStatement" %>
<%@ page import="java.io.FileInputStream" %>
<%@ page import="java.sql.Timestamp" %>
<%@ page import="com.neux.utility.utils.date.DateUtil" %>
<%@ page import="com.neux.utility.orm.ORMAPI" %>
<%@ page import="com.neux.utility.orm.hdl.connection.SQLConnection" %>
<%@ page import="java.sql.Connection" %>
<%@ page language="java" contentType="text/html; charset=utf-8"%>

<%
    request.setCharacterEncoding("utf-8");

    boolean isSuccess = false;
    String uploadTempFolder = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("uploadTempFolder");

    //上傳檔案設定檔
    JSPUploadConf uploadConf = new JSPUploadConf();
    uploadConf.setAutoCreatePath(true);
    uploadConf.setUploadPath(uploadTempFolder);

    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false,uploadConf);
    String action = queryStringInfo.getParam("action");
    String TopicNo = queryStringInfo.getParam("TopicNo");
    String DataNo = queryStringInfo.getParam("DataNo");
    String Title = queryStringInfo.getParam("Title");
    File file = queryStringInfo.getUploadFilesMap().get("file");

    IDao dao = DaoFactory.getDefaultDao();
    DataObject documentData = DaoFactory.getDefaultDataObject("Document_Data");

    if(JSPMapInfo.INSERT.equalsIgnoreCase(action)) {
        documentData.setValue("TopicNo",TopicNo);
        documentData.setValue("DataNo",DataNo);
        documentData.setValue("Title",Title);

        dao.insert(documentData);

        //轉成binary後透過原生JDBC物件來更新資料
        Connection conn = null;
        PreparedStatement ps = null;
        FileInputStream is = null;
        try{
            conn = ((SQLConnection)ORMAPI.getConnection("db")).getConnection();

            ps = conn.prepareStatement("update Document_Data set Data = ? where DataNo = ?");

            is = new FileInputStream(file);
            ps.setBinaryStream(1, is, (int) file.length());
            ps.setString(2,DataNo);
            ps.execute();

            isSuccess = true;
        }catch(Exception e) {
            e.printStackTrace();
        }finally{

            if(is != null) {
                is.close();
            }

            if(ps != null) {
                ps.close();
            }


            if(conn != null) {
                conn.close();
            }


        }

    }

    String msg = isSuccess ? "儲存成功" : "儲存失敗";
%>

<script>
    alert('<%=msg%>');
    history.back(-1);
</script>