<%@ page import="com.neux.garden.authorization.LoginUserBean" %>
<%@ page import="com.fubon.utils.ProjUtils" %>
<%@ page import="com.neux.garden.dbmgr.DaoFactory" %>
<%@ page import="com.neux.utility.orm.dal.dao.module.IDao" %>
<%@ page import="com.neux.utility.orm.bean.DataObject" %>
<%@ page import="com.fubon.utils.ElectronicPayUtils" %>
<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=utf-8" language="java" %>

<%

    request.setCharacterEncoding("utf-8");
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);

    IDao dao = DaoFactory.getDefaultDao();
    LoginUserBean loginUserBean = ProjUtils.getLoginBean(session);
    String userId = loginUserBean.getUserId();

    NumberFormat nf = NumberFormat.getInstance();
    nf.setGroupingUsed(true);

    //取得本學期申請案件
    DataObject aplyMemberCase = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);

    int addrCutLen = 86;


    // 連帶保證人關係

    HashMap asGuarMap = new HashMap();

    asGuarMap.put(aplyMemberCase.getValue("RES1_REL"), "");
    asGuarMap.put(aplyMemberCase.getValue("RES2_REL"), "");
    asGuarMap.put(aplyMemberCase.getValue("RES3_REL"), "");
    asGuarMap.put(aplyMemberCase.getValue("WAR_REL"), "");


    String eduYear = aplyMemberCase.getValue("eduYear");                           // 學年度
    String semester = "1".equals(aplyMemberCase.getValue("semester")) ? "上" : "下";        // 學期

    // 填寫日期(分為年月日三欄)
    String[] aplyDateList = ProjUtils.getDateList(aplyMemberCase.getValue("APLYDATE"));


    // 將預計前往日期切分為為年月日三欄
    String[] expectDateList = ProjUtils.getDateList(aplyMemberCase.getValue("EXPECTDATE"));

    //帶出預約對保分行資料
    Map<String,String> searchMap = new LinkedHashMap<String, String>();
    searchMap.put("b.BranchId",aplyMemberCase.getValue("EXPECTBRANCHID")); //就貸組預設的分行代號
    Vector<DataObject> ret = ProjUtils.getBranch(searchMap, DaoFactory.getDefaultDao());
    DataObject branch = ret.size() != 0 ? ret.get(0) : DaoFactory.getDefaultDataObject("Branch");

    // 申請人資料
    String aplyNo = aplyMemberCase.getValue("BillNo");
    String aplyIdNo = aplyMemberCase.getValue("AplyIdNo");
    String aplyName = aplyMemberCase.getValue("Applicant");
    String marriageDesc = ProjUtils.toMarryNewName(aplyMemberCase.getValue("Marriage"));
    String sex = (aplyIdNo.charAt(1) == '1') ? "男" : "女";
    String sexTitle = (aplyIdNo.charAt(1) == '1') ? "先生" : "小姐";

    String aplyTelNo1 = getTelNo(aplyMemberCase, new String[] {"APLYTELNO1_1", "APLYTELNO1_2", "APLYTELNO1_3"});

    String aplyTelNo2 = getTelNo(aplyMemberCase, new String[] {"APLYTELNO2_1", "APLYTELNO2_2", "APLYTELNO2_3"});

    String aplyCellphone = aplyMemberCase.getValue("APLYCELLPHONENO");

    String aplyEmail = aplyMemberCase.getValue("APLYEMAIL");

    String aplyAddr1 = ProjUtils.toFullAddress(dao, aplyMemberCase, "AplyZip1", "Aply1Village", "AplyAddr1_3", "AplyAddr1");

    String aplyAddr1Style = (aplyAddr1.getBytes().length > addrCutLen) ? "text-10" : "text-12";

    String aplyAddr2 = ProjUtils.toFullAddress(dao, aplyMemberCase, "AplyZip2", "Aply2Village", "AplyAddr2_3", "AplyAddr2");

    String aplyAddr2Style = (aplyAddr2.getBytes().length > addrCutLen) ? "text-10" : "text-12";



    // 出生日期(分為年月日三欄)
    String[] userBDList = ProjUtils.getDateList(aplyMemberCase.getValue("APLYBIRTHDAY"));



    // 就讀學校資料

    String schoolCode = aplyMemberCase.getValue("SCHOOLCODE");

    String schoolName = ProjUtils.toSchoolName(dao,schoolCode);

    String schoolNameStyle = (schoolName.getBytes().length > 20) ? "text-10" : "text-12";

    String schoolType1 = aplyMemberCase.getValue("SCHOOLTYPE1");

    String schoolType2 = aplyMemberCase.getValue("SCHOOLTYPE2");

    String schoolType3 = aplyMemberCase.getValue("SCHOOLTYPE3");

    int scType1_1 = schoolType1.equals("1") ? 1 : 0;

    int scType1_2 = (scType1_1 == 0) ? 1 : 0;

    int scType2_1 = schoolType2.equals("1") ? 1 : 0;

    int scType2_2 = (scType2_1 == 0) ? 1 : 0;

    int scType3_1 = (schoolType3.equals("1")) ? 1 : 0;

    int scType3_2 = (schoolType3.equals("2")) ? 1 : 0;

    int scType3_3 = (schoolType3.equals("3")) ? 1 : 0;

    int scType3_4 = (schoolType3.equals("4")) ? 1 : 0;

    int scType3_5 = (schoolType3.equals("5")) ? 1 : 0;

    int scType3_6 = (schoolType3.equals("6")) ? 1 : 0;

    int scType3_7 = (schoolType3.equals("7")) ? 1 : 0;

    int scType3_8 = (schoolType3.equals("8")) ? 1 : 0;

    int scType3_9 = (schoolType3.equals("9")) ? 1 : 0;

    int scType3_A = (schoolType3.equals("A")) ? 1 : 0;

    String subject = aplyMemberCase.getValue("SUBJECT");

    String subjectStyle = (subject.getBytes().length > 20) ? "text-10" : "text-12";

    char class1 = "零一二三四五六七八九十".charAt(Integer.parseInt(aplyMemberCase.getValue("CLASS1")));

    String class2 = aplyMemberCase.getValue("CLASS2");

    if (class2.equals("")) class2 = "&nbsp;&nbsp;&nbsp;&nbsp;";

    String learnId = aplyMemberCase.getValue("LEARNID");



    // 入學日期(分為年月日三欄)

    String[] enterDateList = ProjUtils.getDateList(aplyMemberCase.getValue("ENTERDT") + "01");



    // 應畢業年月(分為年月日三欄)

    String[] graduateDateList = ProjUtils.getDateList(aplyMemberCase.getValue("FINISHDT") + "00");



    // 貸款金額相關資料

    int ssFlag_Y = ("Y".equals(aplyMemberCase.getValue("SCHOLARSHIPFLAG"))) ? 1 : 0;

    int ssFlag_N = (ssFlag_Y == 0) ? 1 : 0;

    String scholarship = null;

    if (ssFlag_Y == 1) {

        scholarship = aplyMemberCase.getValue("SCHOLARSHIP");

        if (scholarship.trim().length() == 0) {

            scholarship = StringUtils.leftPad(scholarship,24,"&nbsp;");

        } else {
            scholarship = formatNumber(scholarship);
        }

    } else {

        scholarship = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

    }



    int workFlag_Y = ("1".equals(aplyMemberCase.getValue("SCHOOLWORKFLAG"))) ? 1 : 0;

    int workFlag_N = (workFlag_Y == 0) ? 1 : 0;



    String renderAmt = formatNumber(aplyMemberCase.getValue("RENDERAMT"));

    String cRenderAmt = ProjUtils.getChineseAmtString(aplyMemberCase.getValue("RENDERAMT"), 7, " ", "data-text");

    String cLoanAmt = ProjUtils.getChineseAmtString(aplyMemberCase.getValue("LOANAMT"), 7, " ", "data-text");



    // 合計所得

    String showIncomeAddOnDesc = "合計所得";

    boolean faIncomeAddOnFlag  = "Y".equals(aplyMemberCase.getValue("FA_INCOMEADDON"));

    boolean maIncomeAddOnFlag  = "Y".equals(aplyMemberCase.getValue("MA_INCOMEADDON"));

    boolean gd1IncomeAddOnFlag = "Y".equals(aplyMemberCase.getValue("GD1_INCOMEADDON"));

    boolean gd2IncomeAddOnFlag = "Y".equals(aplyMemberCase.getValue("GD2_INCOMEADDON"));

    boolean paIncomeAddOnFlag  = "Y".equals(aplyMemberCase.getValue("PA_INCOMEADDON"));



    // 父親資料

    String faStatus = aplyMemberCase.getValue("FA_STATUS");

    String faStatusDesc = faStatus.equals("1") ? "" : ProjUtils.getParentStatusDesc(faStatus);

    if (faIncomeAddOnFlag)  faStatusDesc += (!faStatusDesc.equals("") ? "<br>" : "") + showIncomeAddOnDesc;

    String faIdNo = aplyMemberCase.getValue("FA_IDNO");

    String faName, faAddr, faAddrStyle, faTelNo, faCellphone, faAsGuar;

    if (faIdNo.equals("")) {

        faName = faAddr = faAddrStyle = faTelNo = faCellphone = faAsGuar = "";

    } else {

        faName = aplyMemberCase.getValue("FA_NAME");

        faAddr = ProjUtils.toFullAddress(dao, aplyMemberCase, "Fa_Zip", "FaVillage", "Fa_Addr_3", "FaAddr");

        faAddrStyle = "text-10"; //(faAddr.getBytes().length > addrCutLen) ? "text-10" : "text-12";

        faTelNo = getTelNo(aplyMemberCase, new String[] {"FA_TELNO1", "FA_TELNO2", "FA_TELNO3"});

        faCellphone = aplyMemberCase.getValue("FA_CELLPHONENO");

        faAsGuar = (asGuarMap.get("fa") == null) ? "否" : "是";

    }



    // 母親資料

    String maStatus = aplyMemberCase.getValue("MA_STATUS");

    String maStatusDesc = maStatus.equals("1") ? "" : ProjUtils.getParentStatusDesc(maStatus);

    if (maIncomeAddOnFlag)  maStatusDesc += (!maStatusDesc.equals("") ? "<br>" : "") + showIncomeAddOnDesc;

    String maIdNo = aplyMemberCase.getValue("MA_IDNO");

    String maName, maAddr, maAddrStyle, maTelNo, maCellphone, maAsGuar;

    if (maIdNo.equals("")) {

        maName = maAddr = maAddrStyle = maTelNo = maCellphone = maAsGuar = "";

    } else {

        maName = aplyMemberCase.getValue("MA_NAME");

        maAddr = ProjUtils.toFullAddress(dao, aplyMemberCase, "Ma_Zip", "MaVillage", "Ma_Addr_3", "MaAddr");

        maAddrStyle = "text-10"; //(maAddr.getBytes().length > addrCutLen) ? "text-10" : "text-12";

        maTelNo = getTelNo(aplyMemberCase, new String[] {"MA_TELNO1", "MA_TELNO2", "MA_TELNO3"});

        maCellphone = aplyMemberCase.getValue("MA_CELLPHONENO");

        maAsGuar = (asGuarMap.get("ma") == null) ? "否" : "是";

    }



    // 監護人一資料
    //TODO 帶出備註
    String gd1RelDesc = "";

    if (gd1IncomeAddOnFlag)  gd1RelDesc += (!gd1RelDesc.equals("") ? "<br>" : "") + showIncomeAddOnDesc;

    String gd1IdNo = aplyMemberCase.getValue("GD1_IDNO");

    String gd1Name, gd1Addr, gd1AddrStyle, gd1TelNo, gd1Cellphone, gd1AsGuar;

    if (gd1IdNo.equals("")) {

        gd1Name = gd1Addr = gd1AddrStyle = gd1TelNo = gd1Cellphone = gd1AsGuar = "";

    } else {

        gd1Name = aplyMemberCase.getValue("GD1_NAME");

        gd1Addr = ProjUtils.toFullAddress(dao, aplyMemberCase, "Gd1_Zip", "Gd1Village", "Gd1_Addr_3", "Gd1Addr");

        gd1AddrStyle = "text-10"; //(gd1Addr.getBytes().length > addrCutLen) ? "text-10" : "text-12";

        gd1TelNo = getTelNo(aplyMemberCase, new String[] {"GD1_TELNO1", "GD1_TELNO2", "GD1_TELNO3"});

        gd1Cellphone = aplyMemberCase.getValue("GD1_CELLPHONENO");

        gd1AsGuar = (asGuarMap.get("gd1") == null) ? "否" : "是";

    }



    // 監護人二資料
    //TODO
    String gd2RelDesc = "";

    if (gd2IncomeAddOnFlag)  gd2RelDesc += (!gd2RelDesc.equals("") ? "<br>" : "") + showIncomeAddOnDesc;

    String gd2IdNo = aplyMemberCase.getValue("GD2_IDNO");

    String gd2Name, gd2Addr, gd2AddrStyle, gd2TelNo, gd2Cellphone, gd2AsGuar;

    if (gd2IdNo.equals("")) {

        gd2Name = gd2Addr = gd2AddrStyle = gd2TelNo = gd2Cellphone = gd2AsGuar = "";

    } else {

        gd2Name = aplyMemberCase.getValue("GD2_NAME");

        gd2Addr = ProjUtils.toFullAddress(dao, aplyMemberCase, "Gd2_Zip", "Gd2Village", "Gd2_Addr_3", "Gd2Addr");

        gd2AddrStyle = "text-10"; //(gd2Addr.getBytes().length > addrCutLen) ? "text-10" : "text-12";

        gd2TelNo = getTelNo(aplyMemberCase, new String[] {"GD2_TELNO1", "GD2_TELNO2", "GD2_TELNO3"});

        gd2Cellphone = aplyMemberCase.getValue("GD2_CELLPHONENO");

        gd2AsGuar = (asGuarMap.get("gd2") == null) ? "否" : "是";

    }



    // 配偶資料

    String paStatusDesc = paIncomeAddOnFlag ? showIncomeAddOnDesc : "";

    String paIdNo = aplyMemberCase.getValue("PA_IDNO");

    String paName, paAddr, paAddrStyle, paTelNo, paCellphone, paAsGuar;

    if (paIdNo.equals("")) {

        paName = paAddr = paAddrStyle = paTelNo = paCellphone = paAsGuar = "";

    } else {

        paName = aplyMemberCase.getValue("PA_NAME");

        paAddr = ProjUtils.toFullAddress(dao, aplyMemberCase, "Pa_Zip", "PaVillage", "Pa_Addr_3", "PaAddr");

        paAddrStyle = "text-10"; //(paAddr.getBytes().length > addrCutLen) ? "text-10" : "text-12";

        paTelNo = getTelNo(aplyMemberCase, new String[] {"PA_TELNO1", "PA_TELNO2", "PA_TELNO3"});

        paCellphone = aplyMemberCase.getValue("PA_CELLPHONENO");

        paAsGuar = (asGuarMap.get("1A") == null) ? "否" : "是";

    }



    // 其他連帶保證人資料

    String warRel = aplyMemberCase.getValue("WAR_REL");

    String warIdNo = aplyMemberCase.getValue("WAR_IDNO");

    String warName, warAddr, warAddrStyle, warTelNo, warCellphone, warAsGuar, warRelDesc;

    if (warIdNo.equals("") || warRel.equals("1A")) {

        warName = warIdNo = warAddr = warAddrStyle = warTelNo = warCellphone = warAsGuar = warRelDesc = "";

    } else {

        warName = aplyMemberCase.getValue("WAR_NAME");

        warAddr = ProjUtils.toFullAddress(dao, aplyMemberCase, "War_Zip", "WarVillage", "War_Addr_3", "WarAddr");

        warAddrStyle = "text-10"; //(warAddr.getBytes().length > addrCutLen) ? "text-10" : "text-12";

        warTelNo = getTelNo(aplyMemberCase, new String[] {"WAR_TELNO1", "WAR_TELNO2", "WAR_TELNO3"});

        warCellphone = aplyMemberCase.getValue("WAR_CELLPHONENO");

        warAsGuar = "是";

        //TODO
        warRelDesc = "";

    }



    // 需不需簽立借據

    String signBill = aplyMemberCase.getValue("SIGNBILL");

    String displaySignBill = null;

    String signBillDesc = null;

    if (signBill != null && signBill.equals("N")) {

        displaySignBill = "0";

        signBillDesc = "0 (不需)";

    } else {

        displaySignBill = "1";

        signBillDesc = "1 (需)";

    }

    //帶出審核完成時間
    String verifyDate = aplyMemberCase.getValue("VerifyDate");
    if(StringUtils.isNotEmpty(verifyDate) && verifyDate.length() ==8) {
        verifyDate = ProjUtils.toBirthday(verifyDate);

        verifyDate = verifyDate.substring(0,3) + "." + verifyDate.substring(3,5) + "." + verifyDate.substring(5);
    }

    String[] checkIcon = {

            "<img src=\"noncheck.gif\" align=\"absmiddle\" width=\"12\" height=\"12\">",

            "<img src=\"checked.gif\" align=\"absmiddle\" width=\"12\" height=\"12\">",

    };

%>

<%!

    private String formatNumber(String number) {
        if(StringUtils.isNotEmpty(number)) {
            try{
                NumberFormat nf = NumberFormat.getInstance();
                nf.setGroupingUsed(true);

                return nf.format(Double.parseDouble(number));
            }catch(Exception e) {
                e.printStackTrace();
            }
        }

        return number;
    }

    private String getTelNo(DataObject aplyMemberCase, String[] telNoList) {

        StringBuffer sb = new StringBuffer();



        if (aplyMemberCase != null && telNoList != null && telNoList.length == 3) {

            String telNo1 = aplyMemberCase.getValue(telNoList[0]);

            String telNo2 = aplyMemberCase.getValue(telNoList[1]);

            String telNo3 = aplyMemberCase.getValue(telNoList[2]);



            if (telNo1 != null && !telNo1.equals("") && telNo2 != null && !telNo2.equals("")) {

                sb.append("(").append(telNo1).append(")").append(telNo2);

                if (telNo3 != null && !telNo3.equals("")) sb.append("#").append(telNo3);

            }

        }



        return sb.toString();

    }

%>

<html>

<head>

    <title>就學貸款申請書</title>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <link rel="stylesheet" href="print.css" type="text/css">

    <script language="JavaScript" src="GetVerticalStr.js"></script>

    <script language="JavaScript" src="DisRightClick.js"></script>

</head>

<body bgcolor="#FFFFFF" text="#000000" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">

<form name="form1" method="post" action="">


<%

    int pages = 3;

    for (int i = 1; i <= pages; i++) {

%>

<table width="100%" border="0" cellspacing="0" cellpadding="2" align="center">

<tr>

<td align="center">

<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#FFFFFF">

<tr>

    <td class="main-title" align="center" nowrap>

        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#FFFFFF">

            <tr valign="middle">

                <td class="main-title" nowrap width="40%"></td>

                <td class="main-title" nowrap align="8%">台北富邦銀行高級中等以上學校學生就學貸款&nbsp;</td>

                <td class="main-title" nowrap align="1%">申　請<br>撥款通知</td>

                <td class="main-title" nowrap align="1%">&nbsp;書</td>

                <td class="text-10"    nowrap width="40%"></td>

            </tr>

        </table>

    </td>

    <td class="main-title" align="center" colspan="2"></td>

</tr>

<tr><td height="2" colspan="3"></td></tr>

<tr>

    <td>

        <table width="100%" border="0" cellspacing="0" cellpadding="1">

            <tr>

                <td class="text-10">　申請人（借款人）向  貴行申請高級中等以上學校學生就學貸款，並邀同連帶保證人，簽立「台北富邦銀行高級中等以上學校學生就學貸款借據」在案。茲檢具有關資料及證明文件，請將本次請撥金額，撥交予本申請暨撥款通知書所載就讀學校為荷。</td>

            </tr>

            <tr>

                <td class="text-10">　申請人特此聲明：上開證明文件，如係依主管機關規定，免於每學期請撥款項時檢附戶籍謄本，本申請暨撥款通知書所載相關資料即為戶籍現況；前開戶籍現況及其他各項資料全部屬實正確無誤，如有虛偽不實，願負一切法律責任。</td>

            </tr>

            <tr>

                <td class="text-10">　此致　<B>台北富邦商業銀行股份有限公司</B></td>

            </tr>

        </table>

    </td>

    <td rowspan="14" class="text-12">&nbsp;</td>

    <td rowspan="14" class="text-12" valign="top">

        <script language="JavaScript">

            <!--

            getVerticalStr('<B>本申請暨撥款通知書共計三聯：一聯由銀行收執、一聯由學生轉交學校存執、另一聯由學生存執</B>',100,'L','text-16');

            //-->

        </script>

    </td>

</tr>

<tr height="2">

    <td></td>

</tr>

<tr>

    <td class="text-10">

        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#FFFFFF">

            <tr>

                <td class="text-12" nowrap align="left">

                    填寫日期： <U><span class="data-text"><%=aplyDateList[0]%></span></U> 年 <U><span class="data-text"><%=aplyDateList[1]%></span></U> 月 <U><span class="data-text"><%=aplyDateList[2]%></span></U> 日

                </td>

                <td class="text-12" nowrap align="right">

                    申貸學期： <U><span class="data-text"><%=eduYear%></span></U> 學年度 <U><span class="data-text"><%=semester%></span></U> 學期

                </td>

            </tr>

        </table>

    </td>

</tr>

<tr>

    <td align="center">

        <table width="100%" border="1" bordercolor="#000000" cellspacing="0" cellpadding="1" class="table-frame">

            <tr>

                <td class="cap" nowrap>

                    <span class="text-10">申請人(借款人)</span>

                </td>

                <td class="text-12" nowrap>

                    <span class="data-text"><%=aplyName%></span>

                </td>

                <td class="cap" nowrap rowspan="2">

                    <span class="text-10">借款人<br>親自簽章</span>

                </td>

                <td class="text-12" nowrap rowspan="2" colspan="3">

                    &nbsp;

                </td>

                <td class="cap" nowrap>

                    <span class="text-10">行動電話</span>

                </td>

                <td class="text-12" nowrap>

                    <span class="data-text"><%=aplyCellphone%></span>

                </td>

            </tr>

            <tr>

                <td class="cap" nowrap>

                    <span class="text-10">身分證統一編號</span>

                </td>

                <td class="text-12" nowrap>

                    <span class="data-text"><%=aplyIdNo%></span>

                </td>

                <td class="cap" nowrap>

                    <span class="text-10">聯絡電話(1)</span>

                </td>

                <td class="text-12" nowrap>

                    <span class="data-text"><%=aplyTelNo1%></span>

                </td>

            </tr>

            <tr>

                <td class="cap" nowrap width="15%">

                    <span class="text-10">出生日期</span>

                </td>

                <td class="text-12" nowrap width="20%">

                    <span class="data-text"><%=userBDList[0]%></span> 年

                    <span class="data-text"><%=userBDList[1]%></span> 月

                    <span class="data-text"><%=userBDList[2]%></span> 日

                </td>

                <td class="cap" nowrap width="10%">

                    <span class="text-10">婚姻狀況</span>

                </td>

                <td class="text-12" nowrap align="center" width="8%">

                    <span class="data-text"><%=marriageDesc%></span>

                </td>

                <td class="cap" nowrap width="10%">

                    <span class="text-10">性別</span>

                </td>

                <td class="text-12" nowrap align="center" width="8%">

                    <span class="data-text"><%=sex%></span>

                </td>

                <td class="cap" nowrap width="10%">

                    <span class="text-10">聯絡電話(2)</span>

                </td>

                <td class="text-12" nowrap width="19%">

                    <span class="data-text"><%=aplyTelNo2%></span>

                </td>

            </tr>

            <tr height="20">

                <td class="cap" nowrap>

                    <span class="text-10">戶籍地址</span>

                </td>

                <td class="<%=aplyAddr1Style%>" colspan="7">

                    <span class="data-text"><%=aplyAddr1%></span>

                </td>

            </tr>

            <tr height="20">

                <td class="cap" nowrap>

                    <span class="text-10">通訊地址</span>

                </td>

                <td class="<%=aplyAddr2Style%>" colspan="7">

                    <span class="data-text"><%=aplyAddr2%></span>

                </td>

            </tr>

            <tr>

                <td class="cap" nowrap>

                    <span class="text-10">E-Mail 帳號</span>

                </td>

                <td class="text-12" nowrap colspan="7">

                    <span class="data-text"><%=aplyEmail%></span>

                </td>

            </tr>

        </table>

    </td>

</tr>

<tr>

    <td>

        <table width="100%" border="0" cellspacing="0" cellpadding="1">

            <!--

                            <tr align="left" valign="top">

              <td class="text-8" width="1%" nowrap rowspan="2">註：</td>

              <td class="text-8" width="1%" nowrap>1.</td>

              <td class="text-8" width="98%">前開「戶籍地址」為就學貸款到期還款通知書寄送地址，「繳款單寄送地址」為繳款單寄送之通訊地址。繳款期間，若戶籍或通訊地址變更，請檢附借款人身分證正反面影本親至本行全省各分行或以書面郵寄通知本行消金台北作業管理中心就學貸款科。已開辦本行網路銀行者，可直接作線上更改通訊地址。</td>

            </tr>

            <tr align="left" valign="top">

              <td class="text-8" width="1%" nowrap>2.</td>

              <td class="text-8" width="98%">本次請撥金額若成功撥交予本申請暨撥款通知書所載就讀學校後，本行將發送該訊息至上開「E-MAIL帳號」通知借款人。</td>

            </tr>

                            -->

            <tr align="left" valign="top">

                <td class="text-8" width="1%" nowrap rowspan="2">註：</td>

                <td class="text-8" width="99%">本次請撥金額若成功撥交予本申請暨撥款通知書所載就讀學校後，本行將發送該訊息至上開「E-MAIL帳號」通知借款人。</td>

            </tr>

        </table>

    </td>

</tr>

<tr height="2">

    <td></td>

</tr>

<tr>

    <td>

        <table width="100%" border="1" bordercolor="#000000" cellspacing="0" cellpadding="1" class="table-frame">

            <tr>

                <td class="text-10" width="35%">

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">

                        <tr>

                            <td class="text-10" nowrap width="10%">就讀學校：</td>

                            <td class="text-10" nowrap width="10%"><span class="text-12 data-text"><%=schoolCode%></span> </td>

                            <td class="text-10"><span class="<%=schoolNameStyle%> data-text"><%=schoolName%></span></td>

                        </tr>

                        <tr>

                            <td class="text-10" nowrap>科　系：</td>

                            <td class="text-10" colspan="2"><span class="<%=subjectStyle%> data-text"><%=subject%></span> </td>

                        </tr>

                    </table>

                </td>

                <td class="text-10" nowrap width="10%">

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">

                        <tr>

                            <td class="text-10" nowrap width="50%" align="center">

                                <%=checkIcon[scType1_1]%>公<br><br>

                                <%=checkIcon[scType1_2]%>私

                            </td>

                            <td class="text-10" nowrap width="50%" align="center">

                                <%=checkIcon[scType2_1]%>日<br><br>

                                <%=checkIcon[scType2_2]%>夜

                            </td>

                        </tr>

                    </table>

                </td>

                <td class="text-10" nowrap colspan="3">

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">

                        <tr height="22">

                            <td class="text-10" nowrap colspan="2">

                                <%=checkIcon[scType3_7]%>高中職

                                <%=checkIcon[scType3_8]%>五專

                                <%=checkIcon[scType3_6]%>二專

                                <%=checkIcon[scType3_5]%>二技

                                <%=checkIcon[scType3_4]%>大學、四技

                                <%=checkIcon[scType3_3]%>大學醫學（牙醫）系

                                <%=checkIcon[scType3_A]%>七年一貫制

                            </td>

                        </tr>

                        <tr height="22">

                            <td class="text-10" nowrap width="1%">

                                <%=checkIcon[scType3_9]%>學士後&nbsp;

                            </td>

                            <td class="text-10" nowrap width="99%">

                                <%=checkIcon[scType3_2]%>碩士班（修業年限以二年計，若未畢業應每學期辦理延期）<br>

                                <%=checkIcon[scType3_1]%>博士班（修業年限以四年計，若未畢業應每學期辦理延期）

                            </td>

                        </tr>

                    </table>

                </td>

            </tr>

            <tr>

                <td class="text-10" nowrap colspan="2">

                    班級：<span class="text-12"><span class="data-text"><%=class1%></span> 年 <span class="data-text"><%=class2%></span> 班</span>&nbsp;&nbsp;&nbsp;&nbsp;

                    學號：<span class="text-12 data-text"><%=learnId%></span>

                </td>

                <td class="text-10" nowrap width="20%">

                    入學年月：<span class="text-12"><span class="data-text"><%=enterDateList[0]%></span> 年 <span class="data-text"><%=enterDateList[1]%></span> 月</span>

                </td>

                <td class="text-10" nowrap width="20%">

                    應畢業年月：<span class="text-12"><span class="data-text"><%=graduateDateList[0]%></span> 年 <span class="data-text"><%=graduateDateList[1]%></span> 月</span>

                </td>

                <td class="text-10" nowrap width="15%">

                    在職專班：<%=checkIcon[workFlag_N]%>否；<%=checkIcon[workFlag_Y]%>是

                </td>

            </tr>

            <tr>

                <td class="text-10" nowrap colspan="5">

                    申請人（借款人）是否享有公費、學雜費減免或教育部助學金？

                    <%=checkIcon[ssFlag_N]%>否；<%=checkIcon[ssFlag_Y]%>是，NT$ <U><span class="data-text"><%=scholarship%></span></U> 元。

                </td>

            </tr>

        </table>

    </td>

</tr>

<tr>

    <td>

        <table width="100%" border="0" cellspacing="0" cellpadding="1">

            <tr align="left" valign="top">

                <td class="text-8" width="1%" nowrap>註：</td>

                <td class="text-8">以上申請人（借款人）之相關學籍資料如與所就讀學校提供之資料不符時，本行得經確認後逕行修正，申請人（借款人）無須重新填寫本申請暨撥款通知書。</td>

            </tr>

        </table>

    </td>

</tr>

<tr height="2">

    <td></td>

</tr>

<tr>

    <td>

        <table width="100%" border="1" bordercolor="#000000" cellspacing="0" cellpadding="1" class="table-frame">

            <tr>

                <td class="text-12" nowrap>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">

                        <tr>

                            <td class="text-12" nowrap colspan="2" align="left">

                                申貸額度新台幣（大寫）<%=cLoanAmt%>整。

                            </td>

                        </tr>

                        <tr><td height="5" colspan="2"></td></tr>

                        <tr>

                            <td class="text-12" nowrap width="80%" align="left">

                                本次請撥金額新台幣（大寫）<%=cRenderAmt%>整。

                            </td>

                            <td class="text-16" nowrap width="20%" align="right">

                                <span class="data-text">&nbsp;&nbsp;<%=renderAmt%></span>元整

                            </td>

                        </tr>

                        <tr>

                            <td class="text-8" colspan="2">

                                申請人（借款人）如享有公費或教育部各項補助（例如教育部「齊一公私立高中職（含五專前三年）學費方案」補助等），本行得逕依申請人（借款人）就讀學校通報本行之就學貸款申貸名冊內之貸款金額，修正本次請撥金額，申請人（借款人）無須重新填寫本申請暨撥款通知書。

                            </td>

                        </tr>

                    </table>

                </td>

            </tr>

            <tr>

                <td class="text-10">

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">

                        <tr valign="top">

                            <td class="text-8" nowrap width="5%">

                                借款用途：

                            </td>

                            <td class="text-8">

                                繳交學雜費、實習費、書籍費、住宿費、學生團體保險費、音樂指導費、海外研修費及生活費。

                            </td>

                        </tr>

                    </table>

                </td>

            </tr>

        </table>

    </td>

</tr>

<tr height="2">

    <td></td>

</tr>

<tr>

<td>

<table width="100%" border="1" bordercolor="#000000" cellspacing="0" cellpadding="1" class="table-frame">

<tr align="center">

    <td class="cap" nowrap width="2%" rowspan="7">

        <span class="text-10">關<br><br><br><br><br><br>係<br><br><br><br><br><br>人</span>

    </td>

    <td class="cap" nowrap width="5%">

        <span class="text-10">稱謂</span>

    </td>

    <td class="cap" nowrap width="10%">

        <span class="text-10">姓名</span>

    </td>

    <td class="cap" nowrap width="10%">

        <span class="text-10">身分證<br>統一編號</span>

    </td>

    <td class="cap" nowrap width="45%">

        <span class="text-10">戶籍地址</span>

    </td>

    <td class="cap" nowrap width="10%">

        <span class="text-10">聯絡電話</span>

    </td>

    <td class="cap" nowrap width="8%">

        <span class="text-10">兼任連帶<br>保證人</span>

    </td>

    <td class="cap" nowrap width="10%">

        <span class="text-10">備註</span>

    </td>

</tr>

<tr height="36">

    <td align="center" nowrap class="text-10">

        父親

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=faName%></span>

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=faIdNo%></span>

    </td>

    <td class="<%=faAddrStyle%>">

        <span class="data-text"><%=faAddr%></span>

    </td>

    <td nowrap class="text-10 lh-16">

        <span class="data-text"><%=faTelNo%></span>

        <% if (!faCellphone.equals("")) { %>

        <br>

        <span class="data-text"><%=faCellphone%></span>

        <% } %>

    </td>

    <td align="center" nowrap class="text-10">

        <span class="data-text"><%=faAsGuar%></span>

    </td>

    <td align="center" class="text-10">

        <span class="data-text"><%=faStatusDesc%></span>

    </td>

</tr>

<tr height="36">

    <td align="center" nowrap class="text-10">

        母親

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=maName%></span>

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=maIdNo%></span>

    </td>

    <td class="<%=maAddrStyle%>">

        <span class="data-text"><%=maAddr%></span>

    </td>

    <td nowrap class="text-10 lh-16">

        <span class="data-text"><%=maTelNo%></span>

        <% if (!maCellphone.equals("")) { %>

        <br>

        <span class="data-text"><%=maCellphone%></span>

        <% } %>

    </td>

    <td align="center" nowrap class="text-10">

        <span class="data-text"><%=maAsGuar%></span>

    </td>

    <td align="center" class="text-10">

        <span class="data-text"><%=maStatusDesc%></span>

    </td>

</tr>

<tr height="36">

    <td align="center" nowrap class="text-10">

        監護人一

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=gd1Name%></span>

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=gd1IdNo%></span>

    </td>

    <td class="<%=gd1AddrStyle%>">

        <span class="data-text"><%=gd1Addr%></span>

    </td>

    <td nowrap class="text-10 lh-16">

        <span class="data-text"><%=gd1TelNo%></span>

        <% if (!gd1Cellphone.equals("")) { %>

        <br>

        <span class="data-text"><%=gd1Cellphone%></span>

        <% } %>

    </td>

    <td align="center" nowrap class="text-10">

        <span class="data-text"><%=gd1AsGuar%></span>

    </td>

    <td align="center" class="text-10">

        <span class="data-text"><%=gd1RelDesc%></span>

    </td>

</tr>

<tr height="36">

    <td align="center" nowrap class="text-10">

        監護人二

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=gd2Name%></span>

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=gd2IdNo%></span>

    </td>

    <td class="<%=gd2AddrStyle%>">

        <span class="data-text"><%=gd2Addr%></span>

    </td>

    <td nowrap class="text-10 lh-16">

        <span class="data-text"><%=gd2TelNo%></span>

        <% if (!gd2Cellphone.equals("")) { %>

        <br>

        <span class="data-text"><%=gd2Cellphone%></span>

        <% } %>

    </td>

    <td align="center" nowrap class="text-10">

        <span class="data-text"><%=gd2AsGuar%></span>

    </td>

    <td align="center" class="text-10">

        <span class="data-text"><%=gd2RelDesc%></span>

    </td>

</tr>

<tr height="36">

    <td align="center" nowrap class="text-10">

        配偶

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=paName%></span>

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=paIdNo%></span>

    </td>

    <td class="<%=paAddrStyle%>">

        <span class="data-text"><%=paAddr%></span>

    </td>

    <td nowrap class="text-10 lh-16">

        <span class="data-text"><%=paTelNo%></span>

        <% if (!paCellphone.equals("")) { %>

        <br>

        <span class="data-text"><%=paCellphone%></span>

        <% } %>

    </td>

    <td align="center" nowrap class="text-10">

        <span class="data-text"><%=paAsGuar%></span>

    </td>

    <td align="center" class="text-10">

        <span class="data-text"><%=paStatusDesc%></span>

    </td>

</tr>

<tr height="36">

    <td align="center" nowrap class="text-10">

        其他<br>連帶<br>保證人

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=warName%></span>

    </td>

    <td nowrap class="text-10">

        <span class="data-text"><%=warIdNo%></span>

    </td>

    <td class="<%=warAddrStyle%>">

        <span class="data-text"><%=warAddr%></span>

    </td>

    <td nowrap class="text-10 lh-16">

        <span class="data-text"><%=warTelNo%></span>

        <% if (!warCellphone.equals("")) { %>

        <br>

        <span class="data-text"><%=warCellphone%></span>

        <% } %>

    </td>

    <td align="center" nowrap class="text-10">

        <span class="data-text"><%=warAsGuar%></span>

    </td>

    <td align="center" class="text-10">

        <span class="data-text"><%=warRelDesc%></span>

    </td>

</tr>

</table>

</td>

</tr>

<tr>

    <td class="text-10">

        <table width="100%" border="0" cellspacing="0" cellpadding="1">

            <tr valign="top">

                <td class="text-8" colspan="2">填表須知：</td>

            </tr>

            <tr valign="top">

                <td class="text-8" width="1%" nowrap>1.</td>

                <td class="text-8">本表於申請人（借款人）每一學程第一次辦理時，作為貸款申請書暨撥款通知之用，其後於該學程內各學期貸款時，僅作為撥款通知之用。</td>

            </tr>

            <tr valign="top">

                <td class="text-8" width="1%" nowrap>2.</td>

                <td class="text-8">關係人欄(1)父母未離婚，或父母雖已離婚但未協議擔任子女監護人，法定代理人由父母雙方共同擔任者，父母欄均須填寫。(2)父母離婚，由單方(父或母)任監護人，得僅填父親或母親欄。(3)學生已婚，填配偶欄。(4)父母雙亡或不能行使監護權，由父母以外之第三人擔任監護人者，填監護人欄。</td>

            </tr>

            <tr valign="top">

                <td class="text-8" width="1%" nowrap>3.</td>

                <td class="text-8">本借款係依政府主管機關相關規定辦理並依規定補貼利息，爰此，申請人（借款人）茲同意本行得將其個人資料及本借款相關資料提供予主管機關、臺北市政府、或提供予申請人（借款人）所就讀之學校轉傳送予主管機關。</td>

            </tr>

        </table>

    </td>

</tr>

<tr>

    <td>

        <table width="100%" border="0" cellspacing="0" cellpadding="1" bgcolor="#FFFFFF">

            <tr>

                <td class="text-10" nowrap width="30%" align="center">

                    <img src='<%=ElectronicPayUtils.getBarCodeImg(aplyMemberCase.getValue("APLYIDNO"))%>' width="200" height="50"><br>

                    <%if(!"0000000000".equalsIgnoreCase(aplyMemberCase.getValue("RENDERAMT"))){%>

                    <img src='<%=ElectronicPayUtils.getBarCodeImg(aplyMemberCase.getValue("RENDERAMT"))%>' width="200" height="50"><br>


                    <%}%>

                </td>

                <td class="text-10" width="10%" align="center">

                    <table width="50" border="1" bordercolor="#000000" cellspacing="0" bgcolor="#FFFFFF" class="table-frame" id="table1">

                        <tr>

                            <td class="text-10" align="center">

                                <B>本單請妥善保存每學期對保時須攜帶本聯核驗</B>

                            </td>

                        </tr>

                    </table>

                </td>

                <td class="text-10" nowrap width="27%">
                    <div style="width:115px;height:95px;border:2px solid #DF2E2C;margin:0 auto;">
                        <div style="width:115px;height:35px;border-bottom:2px solid #DF2E2C;">
                            <p style="font-size:12px; text-align:center;margin:0;color:#DF2E2C;">台 北 富 邦 銀 行</P><P style="font-size:12px;margin:0;color:#DF2E2C;text-align:center;">已辦理就學貸款申請</p>
                        </div>
                        <div style="width:115px;height:30px;border-bottom:2px solid #DF2E2C;">
                            <p style="color:#DF2E2C;text-align:center;margin:0;line-height:30px;"><%=verifyDate%></p>
                        </div>
                        <div style="margin-top:5px;">
                            <p style="text-align:center;margin:0;color:#DF2E2C;font-size:12px;">
                                線 上 續 貸 專 用
                            </p>
                        </div>
                    </div>
<!--                    <img src="print.png" />-->

                    <%--<table width="100%" border="1" bordercolor="#000000" cellspacing="0" cellpadding="1" class="table-frame">--%>

                        <%--<tr>--%>

                            <%--<td class="text-10" nowrap colspan="2" align="center">--%>

                                <%--核對本人身分證及簽章無誤--%>

                            <%--</td>--%>

                        <%--</tr>--%>

                        <%--<tr>--%>

                            <%--<td colspan="2">--%>

                                <%--<table width="100%" border="0" cellspacing="0" cellpadding="0">--%>

                                    <%--<tr>--%>

                                        <%--<td class="text-10" nowrap width="99%" align="center">--%>

                                            <%--<span class="text-14">&nbsp;</span>--%>

                                        <%--</td>--%>

                                        <%--<td class="text-10" nowrap width="1%" align="right">--%>

                                            <%--<span class="text-14">&nbsp;分行</span>--%>

                                        <%--</td>--%>

                                    <%--</tr>--%>

                                <%--</table>--%>

                            <%--</td>--%>

                        <%--</tr>--%>

                        <%--<tr height="55">--%>

                            <%--<td class="text-10" nowrap width="20%" align="left">--%>

                                <%--<span class="text-14">核對人</span>--%>

                            <%--</td>--%>

                            <%--<td class="text-10" nowrap>--%>

                                <%--<span class="text-14">&nbsp;</span>--%>

                            <%--</td>--%>

                        <%--</tr>--%>

                    <%--</table>--%>

                </td>

                <td class="text-10" nowrap width="3%">　</td>

                <td class="text-10" nowrap width="30%">

                    <span class="box lh-16"><span class="text-14">客服專線：(02)8751-6665 按5</span></span><br><br>

                    <%--<span class="text-12 lh-16">對保日期：<span class="data-text"></span></span><br>--%>

                    <%--<span class="text-12 lh-16">對保分行：<span class="data-text"></span></span><br>--%>

                    <span class="text-12 lh-16">學校代碼：<span class="data-text"><%=schoolCode%></span></span><br>

                    <%--<span class="text-12 lh-16">簽立借據：<span class="data-text"></span></span><br>--%>

                    <span class="text-12 lh-16">對保編號：<span class="data-text"><%=aplyNo%></span></span><br>

                    <%--<span class="text-12 lh-16">排序編號：<span class="data-text"></span></span><br>--%>

                    <%--<span class="text-12 lh-16">修改編號：<span class="data-text"><%=StringUtils.leftPad(aplyMemberCase.getValue("UPDATESN"),8,"0")%></span></span><br>--%>

                </td>

            </tr>

        </table>

    </td>

</tr>

</table>

</td>

</tr>

</table>

<%   if (i < pages) { %>

<p style='page-break-after:always;line-height:1px;'>&nbsp;</p>

<% } } %>

</form>

</body>

</html>