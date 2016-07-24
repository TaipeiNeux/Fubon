<%@ page import="org.json.JSONObject" %>
<%@ page import="com.fubon.utils.ElectronicPayUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page import="org.apache.commons.lang3.StringEscapeUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>

<%
    request.setCharacterEncoding("utf-8");

    LoginUserBean loginUserBean2 = ProjUtils.getLoginBean(request.getSession());

    String hasAccount = StringUtils.isNotEmpty(loginUserBean2.getCustomizeValue("acnoSlList")) ? "Y" : "N";//是否有貸款帳號
    String isArrears = loginUserBean2.getCustomizeValue("isArrear"); //是否不欠款
    String isEtabs = ProjUtils.isEtabs(loginUserBean2) ? "Y" : "N"; //有無線上註記

    System.out.println("hasAccount = " + hasAccount);
    System.out.println("isArrears = " + isArrears);
    System.out.println("isEtabs = " + isEtabs);

    String name = "";
    String sex = "";
    String paymentDate = "";
    String balance = "";
    String overdueDate = "";
    String sum = "";
    String deadline = "";
    String barcode1 = "";
    String barcode2 = "";
    String barcode3 = "";

    JSONArray details = null;
    if("N".equalsIgnoreCase(hasAccount) || "N".equalsIgnoreCase(isArrears)) {
        request.getRequestDispatcher("noPermit.jsp?typeId=4&name=" + java.net.URLEncoder.encode("查詢「我的電子繳款單」","utf-8")).forward(request,response);
    }
    else if("N".equalsIgnoreCase(isEtabs)) {
        request.getRequestDispatcher("noPermit.jsp?typeId=2&name="+ java.net.URLEncoder.encode("查詢「我的電子繳款單」","utf-8")).forward(request,response);
    }
    else {
        JSONObject jsonObject = ElectronicPayUtils.getElectronicPay(loginUserBean2);

//            out.println("<!--");
//            out.println(jsonObject.toString());
//            out.println("-->");

        if("N".equalsIgnoreCase(jsonObject.getString("isSuccess"))) {
            request.getRequestDispatcher("noPermit.jsp?typeId=3&name="+ java.net.URLEncoder.encode("查詢「我的電子繳款單」","utf-8")).forward(request,response);
        }
        else {
            //繳款單明細
            details = jsonObject.getJSONArray("details");

            //繳款單基本資料
            name = jsonObject.getString("name");
            sex = jsonObject.getString("sex");
            paymentDate = jsonObject.getString("payment_date");
            balance = ProjUtils.toComma(jsonObject.getString("balance"));
            overdueDate = jsonObject.getString("overdue_date");
            sum = ProjUtils.toComma(jsonObject.getString("sum"));
            deadline = jsonObject.getString("deadline");

            //Barcode
            JSONObject barcodeSrc = jsonObject.getJSONObject("barcodeSrc");
            barcode1 = barcodeSrc.getString("barcode1");
            barcode2 = barcodeSrc.getString("barcode2");
            barcode3 = barcodeSrc.getString("barcode3");
        }


%>

<body class="myElectronicPay_1">
<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>


<div class="wrapper">

<div class="headerArea">
    <%@ include file="include/headerArea.jsp" %>
</div>

<div id="mobile_barcode_block" style="display:none;">
	<p class="mobile7_11_title">7-11超商代收專區(超商繳款免付手續費)</p>
	<div class=" top">            
            <div class="morena">
                        <span class="img">
                          <img src="<%=barcode1%>">
                        </span>
                <%--<p>0501016CH(條碼一)</p>--%>
            </div>
            <div class="morena">
                        <span class="img">
                          <img src="<%=barcode2%>">
                        </span>
                <%--<p>9998874496754799(條碼二)</p>--%>
            </div>
            <br>
            <div class="morena">
                        <span class="img">
                          <img src="<%=barcode3%>">
                        </span>
                <%--<p>9998874496754799(條碼二)</p>--%>
            </div>
        </div>
</div>

<div class="contentArea">

<div class="processArea">
<div class="processOutBox">
<div class="processBox">
<div class="processInner">
<div class="pomodal cheetah">



<div class="printorsave">
    <a href="#" class="save">
        <img src="img/save-01.png">
    </a>
    <a href="#" class="print">
        <img src="img/save-02.png">
    </a>
</div>
<h3 class="pomodal"><span>台北富邦銀行</span><span class="ABBA">就學貸款電子繳款通知單</span></h3>
<h4 class="mipa" id="name"><%=name%></h4> <h4 class="mipa"><%=sex%></h4>
<div class="lightWon xiWon">
    <ul class="busus">
        <li>
            <p>繳款單年月</p>
            <h3 id="paymentDate"><%=paymentDate%></h3>
        </li>
        <li>
            <p>就學貸款餘額（截至<%=deadline%>底止）</p>
            <h3 id="balance"><%=balance%></h3>
        </li>
        <li>
            <p>利息/違約金/逾期息計算迄日</p>
            <h3 id="overdueDate"><%=overdueDate%></h3>
        </li>
        <li>
            <p>本期應繳總金額</p>
            <h3 id="payment"><%=sum%></h3>
        </li>
        <li>
            <p>還款期限【註】</p>
            <h3 id="deadline"><%=deadline%></h3>
        </li>
    </ul>
</div>
<h3 class="snopy detail oom">本期應繳還款明細</h3>
<div class="repayTableArea">
    <div class="repayTable resaTable">
        <ul class="resa">
            <li id="accountLi">
                <h4>繳款帳號</h4>
                <%
                    if(details != null) {
                        for(int i = 0;i<details.length();i++) {
                            JSONObject detail = details.getJSONObject(i);
                            String val = detail.getString("account");
                %>
                <h5><%=val%></h5>
                <%
                        }
                    }
                %>
            </li>
            <li id="principalLi">
                <h4><span>應繳</span><span>本金</span></h4>
                <%
                    if(details != null) {
                        for(int i = 0;i<details.length();i++) {
                            JSONObject detail = details.getJSONObject(i);
                            String val = detail.getString("principal");
                %>
                <h5><%=ProjUtils.toComma(val)%></h5>
                <%
                        }
                    }
                %>
            </li>
            <li id="interestLi">
                <h4><span>應繳</span><span>利息</span></h4>
                <%
                    if(details != null) {
                        for(int i = 0;i<details.length();i++) {
                            JSONObject detail = details.getJSONObject(i);
                            String val = detail.getString("interest");
                %>
                <h5><%=ProjUtils.toComma(val)%></h5>
                <%
                        }
                    }
                %>
            </li>
            <li id="penaltyLi">
                <h4><span>違約金</span><span>/逾期息</span></h4>
                <%
                    if(details != null) {
                        for(int i = 0;i<details.length();i++) {
                            JSONObject detail = details.getJSONObject(i);
                            String val = detail.getString("penalty");
                %>
                <h5><%=ProjUtils.toComma(val)%></h5>
                <%
                        }
                    }
                %>
            </li>
            <li id="paymentLi">
                <h4><span>應繳</span><span>金額</span></h4>
                <%
                    if(details != null) {
                        for(int i = 0;i<details.length();i++) {
                            JSONObject detail = details.getJSONObject(i);
                            String val = detail.getString("payment");
                %>
                <h5><%=ProjUtils.toComma(val)%></h5>
                <%
                        }
                    }
                %>
            </li>
        </ul>
        <ul class="rema jbway">
            <li>
                <h4 id="sumTitle">本期應繳總金額</h4>
                <h5 id="sum"><i><%=sum%></i></h5>
            </li>
        </ul>
    </div>
</div>
<p class="blue">【註】： 本單所載之違約金/逾期息金額為計算至當月月底止，若您的就學貸款帳款已逾期，請您盡速繳款，並可至全省 7-11之ibon或本行重新查詢應繳總金額及繳款，謝謝您~
</p>
<div class="ibonArea">
    <div class="left">
        <h4>繳款人收執聯</h4>
        <ul class="ibonbox wona">
            <li>
                <h5>繳款<br>期限</h5>
                <p><%=deadline%></p>
            </li>
            <li>
                <h5>借款戶</h5>
                <p><%=name%> <%=sex%></p>
            </li>
            <li>
                <h5>繳款<br>編號</h5>
                <p>9998874496754799</p>
            </li>
            <li>
                <h5>應繳<br>總金額</h5>
                <p><%=sum%></p>
            </li>
            <li>
                <span>收迄章</span>
            </li>
        </ul>
        <p class="copy">※為保障您的權益，繳款後，請保留繳款證明，以供備查。</p>
    </div>
    <div class="right">
        <div class=" top">
            <h4>7-11 超商代收專用區 ( 超商繳款免另付手續費 ) </h4>
            <div class="morena">
                        <span class="img">
                          <img src="<%=barcode1%>">
                        </span>
                <%--<p>0501016CH(條碼一)</p>--%>
            </div>
            <div class="morena">
                        <span class="img">
                          <img src="<%=barcode2%>">
                        </span>
                <%--<p>9998874496754799(條碼二)</p>--%>
            </div>
            <br>
            <div class="morena">
                        <span class="img">
                          <img src="<%=barcode3%>">
                        </span>
                <%--<p>9998874496754799(條碼二)</p>--%>
            </div>
        </div>
        <div class=" bottom">
            <div>
                <div class="sofiwan">
                    <h5>台北富邦銀行全行代理收款存查聯</h5>
                    <h5>就學貸款繳款明細</h5>
                </div>
                <div class="ant">
                    <h6>中華民國 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;年 &nbsp; &nbsp; &nbsp; &nbsp; 月 &nbsp; &nbsp; &nbsp; &nbsp; 日</h6>
                    <h6>( 交易代號 : 3B0714其他預收款 )</h6>
                </div>
            </div>
            <table class="ibonbox">
                <thead>
                <tr>
                    <th>繳款帳號</th>
                    <th>應繳<br />金額</th>
                    <th>繳款帳號</th>
                    <th>應繳<br />金額</th>
                    <th>繳款帳號</th>
                    <th>應繳<br />金額</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <%
                        int tdCount = 0;
                        if(details != null) {

                            for(int i = 1;i<=details.length();i++) {
                                JSONObject detail = details.getJSONObject(i-1);
                                String account = detail.getString("account");
                                String principal = detail.getString("principal");
                                String accountBarcode = detail.getString("accountBarcode");

                                tdCount ++;

//                                out.println("<td>"+account+"</td>");
                                out.println("<td><img src=\""+accountBarcode+"\"/></td>");
                                out.println("<td>"+ProjUtils.toComma(principal)+"</td>");

                                if(i % 3 == 0) {
                                    out.println("</tr>");
                                    out.println("<tr>");
                                    tdCount = 0;
                                }
                            }
                        }

                        //要填滿3個td
                        if(tdCount != 3) {
                            for(int i=0;i<3-tdCount;i++) {
                                out.println("<td></td>");
                                out.println("<td></td>");
                            }
                        }
                    %>
                </tr>

                <tr>
                    <td>借款戶 : <%=name%> <%=sex%></td>
                    <td colspan="3">利息/違約金/逾期息計算迄日:<%=overdueDate%></td>
                    <td>應繳總金額</td>
                    <td><%=sum%></td>
                </tr>
                </tbody>
            </table>
            <ul class="ssti">
                <li>主管</li>
                <li>會計</li>
                <li>出納</li>
                <li>覆核</li>
                <li>記帳</li>
            </ul>
        </div>
    </div>
</div>
</div>
</div>
<div class="barCode">
    <a href="#" id="printMobileBarCode">產生條碼</a>
    <p class="barCodewords">提醒您，產生條碼後即可至全省7-11便利超商出示條碼進行繳款。</p>
</div>
<p class="casomTitle">注意事項:</p>
<ol class="casom">
    <li>本貸款自起息日起，每月(或半年)攤還本息一次，逾期加收延遲息及違約金，如屆期未接獲通知，仍請依貸款契約約定，自行到本行繳納。 </li>
    <li>本單所載之相關繳款資料，如因提前還款或其他因素致與本行電腦系統所登載之資料不符時，仍以本行電腦系統之資料為準。 </li>
    <li>本貸款利率依繳款方式之不同，按下列方式計算：
        <ul class="noliststyle">
            <li>(1) 繳款方式為「月繳」之貸款利率：按教育部之公告及規定，現行利率計算係依中華郵政股份有限公司一年期定期儲蓄存款 機動利率為指標利率加碼計算。</li>
            <li>(2) 繳款方式為「半年繳」之貸款利率：自計息起日至計息迄日止之利率計算係按教育部之公告及規定分段計算。</li>
            <li>(3) 有關本貸款借款人負擔利率訊息，請至台北富邦銀行網站〈就學貸款借款人負擔利率公告〉查詢。 </li>
        </ul>
    </li>
    <li>如逾本單所示之繳款期限日期，應繳金額將有所變動，故繳款前，請先與本行洽詢正確繳款金額。 </li>
    <li>為符合「金融監督管理委員會指定非公務機關個人資料檔案安全維護辦法」之規定,本行就學貸款專區內,涉及個人資料之交易,部分資料將以遮 蔽之方式進行保護,若導致您無法確認資料之正確性,請您至本行櫃檯辦理或洽24HR 客服中心 02-8751-6665 按 5 將有專人竭誠為您服務。</li>
</ol>

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


<!-- 各別流程才各別載入所需的js -->
<script src="js/prog/myElectronicPay_1.js?v=<%=System.currentTimeMillis()%>"></script>
<script src="js/prog/bootstrap_select_arrow.js?v=<%=System.currentTimeMillis()%>"></script>

<%
    }
%>