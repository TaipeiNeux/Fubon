<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding( "utf-8");
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

<%
    String hasAccount = StringUtils.isNotEmpty(loginUserBean.getCustomizeValue("acnoSlList")) ? "Y" : "N";//是否有貸款帳號
    String isArrears = loginUserBean.getCustomizeValue("isArrear"); //是否不欠款
    String isEtabs = ProjUtils.isEtabs(loginUserBean) ? "Y" : "N"; //有無線上註記

    if("N".equalsIgnoreCase(hasAccount) || "N".equalsIgnoreCase(isArrears)) {
        request.getRequestDispatcher("noPermit.jsp?typeId=1&name=進行「還款明細查詢」").forward(request,response);
    }
    else if("N".equalsIgnoreCase(isEtabs)) {
        request.getRequestDispatcher("noPermit.jsp?typeId=2&name=進行「還款明細查詢」").forward(request,response);
    }
    else{
%>

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

<script src="js/prog/repaymentInquiry.js"></script>

<%
    }
%>