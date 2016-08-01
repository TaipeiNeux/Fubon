<%@ page import="org.json.JSONObject" %>
<%@ page import="com.fubon.utils.ElectronicPayUtils" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>


<body class="myElectronicPay_1">
<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>
<%
    request.setCharacterEncoding("utf-8");

    JSONObject jsonObject = ElectronicPayUtils.getElectronicPay(loginUserBean);

    out.println("<!--");
    out.println(jsonObject.toString());
    out.println("-->");

    //繳款單明細
    JSONArray details = jsonObject.getJSONArray("details");

    //繳款單基本資料
    String name = jsonObject.getString("name");
    String sex = jsonObject.getString("sex");
    String paymentDate = jsonObject.getString("payment_date");
    String balance = ProjUtils.toComma(jsonObject.getString("balance"));
    String overdueDate = jsonObject.getString("overdue_date");
    String sum = ProjUtils.toComma(jsonObject.getString("sum"));
    String deadline = jsonObject.getString("deadline");

    //Barcode
    JSONObject barcodeSrc = jsonObject.getJSONObject("barcodeSrc");
    String barcode1 = barcodeSrc.getString("barcode1");
    String barcode2 = barcodeSrc.getString("barcode2");
    String barcode3 = barcodeSrc.getString("barcode3");
%>

<div class="processInner">
<div class="pomodal cheetah">

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
                    for(int i = 0;i<details.length();i++) {
                        JSONObject detail = details.getJSONObject(i);
                        String val = detail.getString("account");
                %>
                <h5><%=val%></h5>
                <%
                    }
                %>
            </li>
            <li id="principalLi">
                <h4><span>應繳</span><span>本金</span></h4>
                <%
                    for(int i = 0;i<details.length();i++) {
                        JSONObject detail = details.getJSONObject(i);
                        String val = detail.getString("principal");
                %>
                <h5><%=ProjUtils.toComma(val)%></h5>
                <%
                    }
                %>
            </li>
            <li id="interestLi">
                <h4><span>應繳</span><span>利息</span></h4>
                <%
                    for(int i = 0;i<details.length();i++) {
                        JSONObject detail = details.getJSONObject(i);
                        String val = detail.getString("interest");
                %>
                <h5><%=ProjUtils.toComma(val)%></h5>
                <%
                    }
                %>
            </li>
            <li id="penaltyLi">
                <h4><span>違約金</span><span>/逾期息</span></h4>
                <%
                    for(int i = 0;i<details.length();i++) {
                        JSONObject detail = details.getJSONObject(i);
                        String val = detail.getString("penalty");
                %>
                <h5><%=ProjUtils.toComma(val)%></h5>
                <%
                    }
                %>
            </li>
            <li id="paymentLi">
                <h4><span>應繳</span><span>金額</span></h4>
                <%
                    for(int i = 0;i<details.length();i++) {
                        JSONObject detail = details.getJSONObject(i);
                        String val = detail.getString("payment");
                %>
                <h5><%=ProjUtils.toComma(val)%></h5>
                <%
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
                <h5>繳款
                    <br>期限</h5>
                <p><%=deadline%></p>
            </li>
            <li>
                <h5>借款戶</h5>
                <p><%=name%> <%=sex%></p>
            </li>
            <li>
                <h5>繳款
                    <br>編號</h5>
                <p>9998874496754799</p>
            </li>
            <li>
                <h5>應繳
                    <br>總金額</h5>
                <p><%=sum%></p>
            </li>
            <li>
                <span>收迄章</span>
            </li>
        </ul>
        <p>※為保障您的權益，繳款後，請保留繳款證明，以供備查。</p>
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
                    <th>應繳金額</th>
                    <th>繳款帳號</th>
                    <th>應繳金額</th>
                    <th>繳款帳號</th>
                    <th>應繳金額</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <%
                        int tdCount = 0;
                        for(int i = 1;i<=details.length();i++) {
                            JSONObject detail = details.getJSONObject(i-1);
                            String account = detail.getString("account");
                            String principal = detail.getString("principal");

                            tdCount ++;

                            out.println("<td>"+account+"</td>");
                            out.println("<td>"+principal+"</td>");

                            if(i % 3 == 0) {
                                out.println("</tr>");
                                out.println("<tr>");
                                tdCount = 0;
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
</body>