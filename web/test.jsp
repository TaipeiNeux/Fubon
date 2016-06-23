<%@ page import="com.fubon.webservice.bean.RQBean" %>
<%@ page import="com.fubon.webservice.WebServiceAgent" %>
<%@ page import="com.fubon.webservice.bean.RSBean" %>
<%@ page import="com.neux.garden.authorization.LoginUserBean" %>
<%@ page import="com.fubon.utils.ProjUtils" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.neux.utility.utils.date.DateUtil" %>
<%@ page import="com.neux.utility.orm.dal.dao.module.IDao" %>
<%@ page import="com.neux.garden.dbmgr.DaoFactory" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>

<%
    request.setCharacterEncoding("utf-8");

    HashMap hm = new HashMap();

    IDao dao = DaoFactory.getDefaultDao();
    String date = null;

    if (date == null) {
        date = DateUtil.getTodayString().substring(0,8);
    }

    HashMap semesterRegion = ProjUtils.getSemesterRegion(dao);   // 取得學期日期區間
    HashMap applyDateRegion = ProjUtils.getApplyDateRegion(dao);  // 取得學年度申請日期區間

    String s1_sDate = (String) semesterRegion.get("s1_sDate");        // 上學期起日
    String s1_eDate = (String) semesterRegion.get("s1_eDate");        // 上學期迄日
    String s2_sDate = (String) semesterRegion.get("s2_sDate");        // 下學期起日
    String s2_eDate = (String) semesterRegion.get("s2_eDate");        // 下學期迄日
    String s1_applySDate = (String) applyDateRegion.get("s1_sDate");  // 上學期申請起日
    String s1_applyEDate = (String) applyDateRegion.get("s1_eDate");  // 上學期申請迄日
    String s2_applySDate = (String) applyDateRegion.get("s2_sDate");  // 下學期申請起日
    String s2_applyEDate = (String) applyDateRegion.get("s2_eDate");  // 下學期申請迄日
    String semester_sDate = "";                                       // 學期定義起日
    String semester_eDate = "";                                       // 學期定義迄日
    String apply_sDate = "";                                          // 學期申請起日
    String apply_eDate = "";                                          // 學期申請迄日

    int eduYear = Integer.parseInt(date.substring(0, date.length() - 4));
    int semester = 0;

    if (s1_sDate.compareTo(date.substring(date.length() - 4)) > 0) {
        // 當日日期小於上學期起日 --> 已跨年 --> 學年度應為上一年度
        eduYear--;
    }

    int s1_sYear = eduYear;
    int s1_eYear = (s1_eDate.compareTo(s1_sDate) < 0) ? (s1_sYear + 1) : s1_sYear;
    int s2_sYear = (s2_sDate.compareTo(s1_eDate) < 0) ? (s1_eYear + 1) : s1_eYear;
    int s2_eYear = (s2_eDate.compareTo(s2_sDate) < 0) ? (s2_sYear + 1) : s2_sYear;
    int s1_applySYear = eduYear;
    int s1_applyEYear = (s1_applyEDate.compareTo(s1_applySDate) < 0) ? (s1_applySYear + 1) : s1_applySYear;
    int s2_applySYear = (s2_applySDate.compareTo(s1_applyEDate) < 0) ? (s1_applyEYear + 1) : s1_applyEYear;
    int s2_applyEYear = (s2_applyEDate.compareTo(s2_applySDate) < 0) ? (s2_applySYear + 1) : s2_applySYear;

    s1_sDate = s1_sYear + s1_sDate;
    s1_eDate = s1_eYear + s1_eDate;
    s2_sDate = s2_sYear + s2_sDate;
    s2_eDate = s2_eYear + s2_eDate;

    if ((date.compareTo(s1_sDate) >= 0) && (date.compareTo(s1_eDate) <= 0)) {
        // 上學期
        semester = 1;
        semester_sDate = s1_sDate;
        semester_eDate = s1_eDate;
        //apply_sDate = s1_sDate;
        //apply_eDate = s1_eDate;
        apply_sDate = s1_applySYear + s1_applySDate;
        apply_eDate = s1_applyEYear + s1_applyEDate;

    } else if ((date.compareTo(s2_sDate) >= 0) && (date.compareTo(s2_eDate) <= 0)) {
        // 下學期
        semester = 2;
        semester_sDate = s2_sDate;
        semester_eDate = s2_eDate;
        //apply_sDate = s2_sDate;
        //apply_eDate = s2_eDate;
        apply_sDate = s2_applySYear + s2_applySDate;
        apply_eDate = s2_applyEYear + s2_applyEDate;

    }

    String sEduYear = String.valueOf(eduYear - 1911);
    String sSemester = String.valueOf(semester);

    String preApplyDate = ProjUtils.getPreApplyDate(dao, sEduYear, sSemester);

    // 將目前計算所得之學年度及學期以 HashMap 來存放
    hm.put("eduYear", sEduYear);
    hm.put("semester", sSemester);
    hm.put("semester_sDate", semester_sDate);
    hm.put("semester_eDate", semester_eDate);
    hm.put("apply_sDate", apply_sDate);
    hm.put("apply_eDate", apply_eDate);
    hm.put("now_Date", date);
    hm.put("preApplyDate", preApplyDate);

    out.println(hm.get("eduYear") + "<BR>");
    out.println(hm.get("semester") + "<BR>");
    out.println(hm.get("semester_sDate") + "<BR>");
    out.println(hm.get("semester_eDate") + "<BR>");
    out.println(hm.get("apply_sDate") + "<BR>");
    out.println(hm.get("apply_eDate") + "<BR>");
    out.println(hm.get("now_Date") + "<BR>");
    out.println(hm.get("preApplyDate") + "<BR>");

//    RQBean rqBean = new RQBean();
//    rqBean.setTxId("EB382607");
//    rqBean.addRqParam("FUNC","1");
//    rqBean.addRqParam("ACNO_SL","20001410029087");
//
//    rqBean.addRqParam("STR_DATE","20150101");
//    rqBean.addRqParam("END_DATE","20151231");
//
//
//    RSBean rsBean = WebServiceAgent.callWebService(rqBean);
//    out.println(rsBean.getTxnString());


//    RQBean rqBean = new RQBean();
//    rqBean.setTxId("EB032153");
//    rqBean.addRqParam("CUST_NO","A226563890");
//
//    RSBean rsBean = WebServiceAgent.callWebService(rqBean);
//
//    String hspSck = rsBean.getServiceHeader().getHSPSCK();
//    out.println("hspSck = " + hspSck);
//    out.println(rsBean.getTxnString());
//
//    rqBean = new RQBean();
//    rqBean.setTxId("EB032153");
//    rqBean.addRqParam("CUST_NO","A226563890");
//    rqBean.addRqParam("FUNC_01","2");
//    rqBean.addRqParam("COD_01","8001");
//    rqBean.addRqParam("TYP_01","2");
////    rqBean.addRqParam("TEL_NO_01","neux.titanteng@gmail.com");
//    rqBean.addRqParam("ADDR_011","neux.titanteng@gmail.com");
//    rqBean.addRqParam("ADDR_012","neux.titanteng@gmail.com");
//
//    rqBean.setHeaderPageFlg("3");
//    rqBean.setHeaderDBAppn(hspSck);
//
//    rsBean = WebServiceAgent.callWebService(rqBean);
//
//    out.println(rsBean.getTxnString());
%>