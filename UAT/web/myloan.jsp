<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page import="com.neux.utility.utils.PropertiesUtil" %>
<%@ page import="com.fubon.webservice.bean.RQBean" %>
<%@ page import="com.fubon.webservice.bean.RSBean" %>
<%@ page import="com.fubon.webservice.WebServiceAgent" %>
<%@ page import="com.fubon.utils.DBUtils" %>
<%@ page import="org.dom4j.Document" %>
<%@ page import="org.dom4j.DocumentHelper" %>
<%@ page import="com.fubon.servlet.DataServlet" %>
<%@ page import="org.json.JSONArray" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding( "utf-8");

    LoginUserBean loginUserBean2 = ProjUtils.getLoginBean(request.getSession());

    String hasAccount = StringUtils.isNotEmpty(loginUserBean2.getCustomizeValue("acnoSlList")) ? "Y" : "N";//是否有貸款帳號
    String isArrears = loginUserBean2.getCustomizeValue("isArrear"); //是否不欠款
    String isEtabs = ProjUtils.isEtabs(loginUserBean2) ? "Y" : "N"; //有無線上註記
    String[] acnoSlList = loginUserBean2.getCustomizeValue("acnoSlList").split(",");
    JSONArray client_detail = new JSONArray();

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
                    "        <LOAN_AMT>30,720</LOAN_AMT>\n" +
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
                    "        <LOAN_AMT>30,720</LOAN_AMT>\n" +
                    "        <LOAN_BAL>30,720</LOAN_BAL>\n" +
                    "        <INT_DATE>108/06/30</INT_DATE>\n" +
                    "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                    "        <INT_FLG>N</INT_FLG>\n" +
                    "        <WORK_FLG>N</WORK_FLG>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT>661</INS_AMT>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM>1041</YR_TERM>\n" +
                    "        <DOC_NO>019001</DOC_NO>\n" +
                    "        <CRE_BRH>-320</CRE_BRH>\n" +
                    "        <INT_RATE>1.6200</INT_RATE>\n" +
                    "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                    "        <LOAN_BAL></LOAN_BAL>\n" +
                    "        <INT_DATE>108/06/30</INT_DATE>\n" +
                    "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                    "        <INT_FLG>N</INT_FLG>\n" +
                    "        <WORK_FLG>N</WORK_FLG>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT></INS_AMT>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM>1042</YR_TERM>\n" +
                    "        <DOC_NO>013429</DOC_NO>\n" +
                    "        <CRE_BRH>-705</CRE_BRH>\n" +
                    "        <INT_RATE>1.6200</INT_RATE>\n" +
                    "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                    "        <LOAN_BAL>30,708</LOAN_BAL>\n" +
                    "        <INT_DATE>108/06/30</INT_DATE>\n" +
                    "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                    "        <INT_FLG>N</INT_FLG>\n" +
                    "        <WORK_FLG>N</WORK_FLG>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT>661</INS_AMT>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM>0880</YR_TERM>\n" +
                    "        <DOC_NO>013429</DOC_NO>\n" +
                    "        <CRE_BRH>-705</CRE_BRH>\n" +
                    "        <INT_RATE>1.6200</INT_RATE>\n" +
                    "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                    "        <LOAN_BAL>30,708</LOAN_BAL>\n" +
                    "        <INT_DATE>108/06/30</INT_DATE>\n" +
                    "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                    "        <INT_FLG>N</INT_FLG>\n" +
                    "        <WORK_FLG>N</WORK_FLG>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT>661</INS_AMT>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM/>\n" +
                    "        <DOC_NO/>\n" +
                    "        <CRE_BRH/>\n" +
                    "        <INT_RATE/>\n" +
                    "        <LOAN_AMT/>\n" +
                    "        <LOAN_BAL/>\n" +
                    "        <INT_DATE/>\n" +
                    "        <NEXT_INT_DATE/>\n" +
                    "        <INT_FLG/>\n" +
                    "        <WORK_FLG/>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT/>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM/>\n" +
                    "        <DOC_NO/>\n" +
                    "        <CRE_BRH/>\n" +
                    "        <INT_RATE/>\n" +
                    "        <LOAN_AMT/>\n" +
                    "        <LOAN_BAL/>\n" +
                    "        <INT_DATE/>\n" +
                    "        <NEXT_INT_DATE/>\n" +
                    "        <INT_FLG/>\n" +
                    "        <WORK_FLG/>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT/>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM/>\n" +
                    "        <DOC_NO/>\n" +
                    "        <CRE_BRH/>\n" +
                    "        <INT_RATE/>\n" +
                    "        <LOAN_AMT/>\n" +
                    "        <LOAN_BAL/>\n" +
                    "        <INT_DATE/>\n" +
                    "        <NEXT_INT_DATE/>\n" +
                    "        <INT_FLG/>\n" +
                    "        <WORK_FLG/>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT/>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM/>\n" +
                    "        <DOC_NO/>\n" +
                    "        <CRE_BRH/>\n" +
                    "        <INT_RATE/>\n" +
                    "        <LOAN_AMT/>\n" +
                    "        <LOAN_BAL/>\n" +
                    "        <INT_DATE/>\n" +
                    "        <NEXT_INT_DATE/>\n" +
                    "        <INT_FLG/>\n" +
                    "        <WORK_FLG/>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT/>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM/>\n" +
                    "        <DOC_NO/>\n" +
                    "        <CRE_BRH/>\n" +
                    "        <INT_RATE/>\n" +
                    "        <LOAN_AMT/>\n" +
                    "        <LOAN_BAL/>\n" +
                    "        <INT_DATE/>\n" +
                    "        <NEXT_INT_DATE/>\n" +
                    "        <INT_FLG/>\n" +
                    "        <WORK_FLG/>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT/>\n" +
                    "    </TxRepeat>\n" +
                    "    <TxRepeat>\n" +
                    "        <YR_TERM/>\n" +
                    "        <DOC_NO/>\n" +
                    "        <CRE_BRH/>\n" +
                    "        <INT_RATE/>\n" +
                    "        <LOAN_AMT/>\n" +
                    "        <LOAN_BAL/>\n" +
                    "        <INT_DATE/>\n" +
                    "        <NEXT_INT_DATE/>\n" +
                    "        <INT_FLG/>\n" +
                    "        <WORK_FLG/>\n" +
                    "        <PARTIAL_FLG/>\n" +
                    "        <INS_AMT/>\n" +
                    "    </TxRepeat>\n" +
                    "    <C_NAME>合計：</C_NAME>\n" +
                    "    <LOAN_AMT_TOT>122,856</LOAN_AMT_TOT>\n" +
                    "    <LOAN_BAL_TOT>122,856</LOAN_BAL_TOT>\n" +
                    "</root>\n";
        }

        Document doc = DocumentHelper.parseText(responses);


        DataServlet.setMyLoanAccountDetail(doc,client_detail,false,acnoSl,"");


    }

    if("N".equalsIgnoreCase(hasAccount) || "N".equalsIgnoreCase(isArrears) || client_detail.length() == 0) {
        request.getRequestDispatcher("noPermit.jsp?typeId=1&name="+ java.net.URLEncoder.encode("查詢「我的貸款」","utf-8")).forward(request,response);
    }
    else if("N".equalsIgnoreCase(isEtabs)) {
        request.getRequestDispatcher("noPermit.jsp?typeId=2&name="+ java.net.URLEncoder.encode("查詢「我的貸款」","utf-8")).forward(request,response);
    }
    else{

%>


<body class="myloan">

<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>



  <div class="wrapper">

      <div class="headerArea">
          <%@ include file="include/headerArea.jsp" %>
      </div>

    <div class="contentArea">

      <div class="processArea" style="display:none;">
        <div class="processOutBox">
          <div class="processBox myloan_Box">
            <div class="processInner myloan_Inner" >
              <h3 class="snopy detail">就學貸款總餘額（臺幣）
                <span class="morebig"></span>
              </h3>
              
       <p class="casomTitle">注意事項:</p>
              <ol class="casom">
                <li>本查詢功能為即時交易查詢功能，不等同於電子繳款通知單之應繳金額。</li>
                <li>適用利率採機動計息者，期適用利率會隨「指標利率」或「加碼利率採分段式計算」變動而調整。</li>
                <li>欲查詢指標利率請至【網路銀行】貸款> <a href="https://ebank.taipeifubon.com.tw/B2C/cfhqu/cfhqu014/CFHQU014_Home.faces" class="underblue" target="_blank">貸款指標利率查詢</a>。</li>
                <li>轉帳款項如不足清償全部債務時，依各項費用(含代墊之保險費及訴訟費)、違約金、利息、延遲息及本金之順序抵充。</li>
                <li>若您於非本行櫃檯以匯款方式繳款，請於匯款單填入上述分行名稱及貸款帳號。</li>
                <li class="remind">※提醒您:請特別關心上列有「<span class="blu">* &nbsp; *</span>」號註記之貸款，是否已按時繳款成功!您可前往「【網路銀行】貸款>貸款應繳款項查詢」功能查詢<br />
                目前實際欠繳金額，或洽客戶服務專線02-8751-6665。<br />
                ※如已完成繳款，請毋須理會此項提醒註記。</li>
              </ol>
            </div>
          </div>
        </div>
		<!-- 
        <div class="nextBtn">
          <a href="" class="lan">開始查詢</a>
        </div>
		-->
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
<script src="js/prog/myloan.js?v=<%=System.currentTimeMillis()%>"></script>

<%
    }
%>