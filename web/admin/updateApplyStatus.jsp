<%@ page import="com.neux.garden.dbmgr.DaoFactory" %>
<%@ page import="com.neux.utility.orm.dal.dao.module.IDao" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.orm.bean.DataObject" %>
<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8"%>

<%
    request.setCharacterEncoding("utf-8");
    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request, false);

    String aplyNo = queryStringInfo.getParam("aplyNo");
    String aplyStatus = queryStringInfo.getParam("aplyStatus");

    IDao dao = DaoFactory.getDefaultDao();

    DataObject aplyMemberTuitionLoanDtl = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl");
    aplyMemberTuitionLoanDtl.setValue("AplyNo",aplyNo);

    if(dao.querySingle(aplyMemberTuitionLoanDtl,null)) {

        if("DELETE".equalsIgnoreCase(aplyStatus)) {
            dao.delete(aplyMemberTuitionLoanDtl);
        }
        else {

            aplyMemberTuitionLoanDtl.setValue("AplyStatus",aplyStatus);
            dao.update(aplyMemberTuitionLoanDtl);

            DataObject aplyMemberTuitionLoanDtlReason = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl_reason");
            aplyMemberTuitionLoanDtlReason.setValue("AplyNo",aplyNo);
            if(dao.querySingle(aplyMemberTuitionLoanDtlReason,null)) {

                for(int i=0;i<19;i++) {
                    String reason = queryStringInfo.getParam("Reason" + (i+1));

                    if(StringUtils.isEmpty(reason)) {
                        reason = "N";
                    }

                    aplyMemberTuitionLoanDtlReason.setValue("Reason" + (i+1),reason);
                }

                dao.update(aplyMemberTuitionLoanDtlReason);
            }
            else {

                aplyMemberTuitionLoanDtlReason.setValue("AplyNo",aplyNo);
                aplyMemberTuitionLoanDtlReason.setValue("AplyIdNo",aplyMemberTuitionLoanDtl.getValue("AplyIdNo"));

                for(int i=0;i<19;i++) {
                    String reason = queryStringInfo.getParam("Reason" + (i+1));

                    if(StringUtils.isEmpty(reason)) {
                        reason = "N";
                    }

                    aplyMemberTuitionLoanDtlReason.setValue("Reason" + (i+1),reason);
                }

                System.out.println(aplyMemberTuitionLoanDtlReason.toXml());

                dao.insert(aplyMemberTuitionLoanDtlReason);
            }




        }
    }
%>

<script>
    window.location = 'apply_log.jsp';
</script>