<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page import="com.neux.utility.utils.PropertiesUtil" %>
<%@ page import="com.fubon.webservice.bean.RQBean" %>
<%@ page import="com.fubon.webservice.bean.RSBean" %>
<%@ page import="com.fubon.webservice.WebServiceAgent" %>
<%@ page import="com.fubon.utils.DBUtils" %>
<%@ page import="org.dom4j.Document" %>
<%@ page import="org.dom4j.DocumentHelper" %>
<%@ page import="org.dom4j.Element" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="com.neux.garden.log.GardenLog" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding( "utf-8");

    LoginUserBean loginUserBean2 = ProjUtils.getLoginBean(request.getSession());

    String hasAccount = StringUtils.isNotEmpty(loginUserBean2.getCustomizeValue("acnoSlList")) ? "Y" : "N";//是否有貸款帳號
    String isArrears = loginUserBean2.getCustomizeValue("isArrear"); //是否不欠款
    String isEtabs = ProjUtils.isEtabs(loginUserBean2) ? "Y" : "N"; //有無線上註記

    //如果有貸款帳號的話，就要再把結餘款是0的拿掉
    if("Y".equalsIgnoreCase(hasAccount)) {
        try{
            boolean hasMoneyAccount = false;

            String[] acnoSlList = loginUserBean2.getCustomizeValue("acnoSlList").split(",");

            for(String acnoSl: acnoSlList) {

                if(StringUtils.isEmpty(acnoSl)) continue;

                String responses = null;

                String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
                if(!"sit".equalsIgnoreCase(env)) {
                    RQBean rqBean = new RQBean();
                    rqBean.setTxId("EB382609");
                    rqBean.addRqParam("ACNO_SL",acnoSl);

                    RSBean rsBean = WebServiceAgent.callWebService(rqBean);
                    if(rsBean.isSuccess()) {
                        responses = rsBean.getTxnString();
                    }
                    else {
                        throw new Exception("查詢電文失敗:" + rsBean.getErrorMsg());
                    }

                }
                else {

                    responses = "<root>\n" +
                            "    <CRLN_AMT>800,000</CRLN_AMT>\n" +
                            "    <AVAIL_BAL>677,144</AVAIL_BAL>\n" +
                            "    <CUST_NO>E124876190</CUST_NO>\n" +
                            "    <CUST_NAME>陳ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ</CUST_NAME>\n" +
                            "    <PROD_STAG/>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM>1031</YR_TERM>\n" +
                            "        <DOC_NO>035003</DOC_NO>\n" +
                            "        <CRE_BRH>-705</CRE_BRH>\n" +
                            "        <INT_RATE>1.6200</INT_RATE>\n" +
                            "        <LOAN_AMT>0</LOAN_AMT>\n" +
                            "        <LOAN_BAL>30,720</LOAN_BAL>\n" +
                            "        <INT_DATE>108/06/30</INT_DATE>\n" +
                            "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                            "        <INT_FLG>N</INT_FLG>\n" +
                            "        <WORK_FLG>N</WORK_FLG>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT>661</INS_AMT>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM>1032</YR_TERM>\n" +
                            "        <DOC_NO>028153</DOC_NO>\n" +
                            "        <CRE_BRH>-705</CRE_BRH>\n" +
                            "        <INT_RATE>1.6200</INT_RATE>\n" +
                            "        <LOAN_AMT>0</LOAN_AMT>\n" +
                            "        <LOAN_BAL>30,720</LOAN_BAL>\n" +
                            "        <INT_DATE>108/06/30</INT_DATE>\n" +
                            "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                            "        <INT_FLG>N</INT_FLG>\n" +
                            "        <WORK_FLG>N</WORK_FLG>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT>661</INS_AMT>\n" +
                            "    </TxRepeat>\n" +
                            "    <C_NAME>合計：</C_NAME>\n" +
                            "    <LOAN_AMT_TOT>122,856</LOAN_AMT_TOT>\n" +
                            "    <LOAN_BAL_TOT>122,856</LOAN_BAL_TOT>\n" +
                            "</root>\n";
                }

                Document doc = DocumentHelper.parseText(responses);
                Element root = doc.getRootElement();


                for (Iterator i = root.elementIterator("TxRepeat"); i.hasNext();) {
                    Element foo = (Element) i.next();
                    String yrTerm = foo.elementText("YR_TERM").trim();
                    if (yrTerm.equals(""))
                        continue;

                    String loanAmt = foo.element("LOAN_AMT").getText().trim();
                    String loanBal = foo.element("LOAN_BAL").getText().trim();
                    String insAmt = foo.element("INS_AMT").getText().trim();

                    loanAmt = StringUtils.replace(loanAmt, " ", "");
                    loanBal = StringUtils.replace(loanBal, " ", "");
                    insAmt = StringUtils.replace(insAmt, " ", "");

                    GardenLog.log(GardenLog.DEBUG, "loanAmt = [" + loanAmt + "]");
                    GardenLog.log(GardenLog.DEBUG, "loanBal = [" + loanBal + "]");
                    GardenLog.log(GardenLog.DEBUG, "insAmt = [" + insAmt + "]");

                    if (StringUtils.isEmpty(loanBal) || "0".equalsIgnoreCase(loanBal) || StringUtils.isEmpty(insAmt)
                            || "0".equalsIgnoreCase(insAmt)) {
                        continue;
                    }

                    hasMoneyAccount = true;
                }


            }

            if(!hasMoneyAccount) {
                hasAccount = "N";
            }
        }catch(Exception e) {
            e.printStackTrace();
            GardenLog.log(GardenLog.ERROR,"repaymentInquiry.jsp:"+e.getMessage());
        }

    }

    if("N".equalsIgnoreCase(hasAccount) || "N".equalsIgnoreCase(isArrears)) {
        request.getRequestDispatcher("noPermit.jsp?typeId=1&name="+ java.net.URLEncoder.encode("進行「還款明細查詢」","utf-8")).forward(request,response);
    }
    else if("N".equalsIgnoreCase(isEtabs)) {
        request.getRequestDispatcher("noPermit.jsp?typeId=2&name="+ java.net.URLEncoder.encode("進行「還款明細查詢」","utf-8")).forward(request,response);
    }
    else{
%>

<link rel="stylesheet" href="css/bootstrap-datetimepicker.min.css" />
<!--<link rel="stylesheet" href="css/styles_repaymentInquiry.css">-->
<script src="js/moment-with-locales.js"></script>
<script src="js/bootstrap-datetimepicker.js"></script>
<!--<script src="js/bootstrap-datepicker.zh-TW.js"></script>-->

<body class="repaymentInquiry_">

<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>

<div class="wrapper">

    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>

    <div class="contentArea">

        <!-- 查詢區塊 -->
        <div class="processArea searchArea" style="display:none;">
            <div class="processOutBox">
                <div class="processBox">
                    <div class="processInner">
                        <h3 class="snopy detail">請選擇查詢內容 <span>（提供最近一年的交易明細查詢）</span></h3>
                        <div class="joy nina">
                            <div class="left">
                                <p>貸款帳號</p>
                            </div>
                            <div class="right account">

                                <div class="form-group">
                                    <label for="sel1"></label>
                                    <select class="form-control input_m" id="accounts">

                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="joy nina">
                            <div class="left">
                                <p>查詢期間</p>
                            </div>
                            <div class="right">
                                <div class="radioArea">
                                    <input type="radio" name="near" id="near3" class="css-checkbox_c" checked="checked">
                                    <label for="near3" class="css-label_c radGroup2">近三個月</label>
                                </div>
                                <div class="radioArea">
                                    <input type="radio" name="near" id="near6" class="css-checkbox_c">
                                    <label for="near6" class="css-label_c radGroup2">近六個月</label>
                                </div>
                                <div class="radioArea">
                                    <input type="radio" name="near" id="near12" class="css-checkbox_c">
                                    <label for="near12" class="css-label_c radGroup2">近一年</label>
                                </div>
                            </div>
                        </div>
                        <div class="joy nina">
                            <div class="left">
                            </div>
                            <div class="right">
                                <div class="radioArea" id="customizeQuery">
                                    <input type="radio" name="near" id="near0" class="css-checkbox_c">
                                    <label for="near0" class="css-label_c radGroup2">自訂查詢</label>
                                </div>
                                <div class="mydatetimepickerArea">
                                    <span class="star star_1"> 起 </span>
                                    <div class="input_date">
                                        <div class='input-group date mydatetimepicker' id='datetimepicker1'>
                                            <input type="text" class="form-control" placeholder="YYYY/MM/DD"/>
                        <span class="input-group-addon">
                          <span class="datIcon"></span>
                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mydatetimepickerArea">
                                    <span class="star star_2"> 至 </span>
                                    <div class="input_date">
                                        <div class='input-group date mydatetimepicker' id='datetimepicker2'>
                                            <input type="text" class="form-control" placeholder="YYYY/MM/DD"/>
                        <span class="input-group-addon">
                          <span class="datIcon"></span>
                        </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="error-msg"></div>
                            </div>
                        </div>

                        <div class="nextBtn innerBtn">
                            <a class="lan loadSearchBtn">開始查詢</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nextBtn outerBtn">
                <a class="lan loadSearchBtn">開始查詢</a>
            </div>

        </div>

        <!-- 查詢結果 -->
        <!--   -->      <div class="processArea searchResult hidden">
        <div class="processOutBox">
            <div class="processBox">
                <div class="processInner">
                    <h3 class="snopy detail">查詢結果</h3>
                    <div class="repayTableArea">
                        <div class="repayTable">
                            <div class="lgVersion"></div>
                            <div class="smVersion">
                            </div>
                        </div>
                    </div>
                    <p class="casomTitle">注意事項:</p>
                    <ol class="casom">
                        <li>本查詢功能為即時交易查詢功能，不等同於電子繳款通知單之應繳金額。</li>
                        <li>本貸款自起息日起，每月(或半年)攤還本息一次，逾期加收延遲息及違約金，如屆期未接獲通知。仍請依貸款契約約定，自行到本行繳納。</li>
                    </ol>
                </div>
            </div>
        </div>

    </div>

    </div>




    <div class="sidebarArea">
        <%@ include file="include/sidebarArea_QA.jsp" %>
    </div>
    <div class="footerArea">
        <%@ include file="include/footerArea.jsp" %>
    </div>
</div>

</body>

<script src="js/prog/repaymentInquiry.js?v=<%=System.currentTimeMillis()%>"></script>

<%
    }
%>