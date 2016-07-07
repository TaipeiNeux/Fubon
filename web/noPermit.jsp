<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding("utf-8");

    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request, false);
    String typeId = queryStringInfo.getParam("typeId");
    String name = queryStringInfo.getParam("name");
%>
<script src="js/jquery-ui.min.js"></script>

<body class="nopermit">

<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>

<div class="wrapper">
    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>

    <div class="contentArea">
        <div class="processArea">

            <div class="processOutBox">
                <div class="processBox">
                    <div class="processInner">

                        <div class="talkwall">

                            <div class="tonypan">
                                <%
                                    if("1".equalsIgnoreCase(typeId)) {
                                %>
                                <p>您目前尚無貸款資料或屬特殊貸款狀態；如有疑問，請洽客戶服務專線02-8751-6665按5</p>
                                <br>
                                <br>
                                <br>
                                <%
                                }
                                else if("2".equalsIgnoreCase(typeId))
                                {
                                %>
                                <p>為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」<a href="pdf/16.就學貸款業務網路服務申請書暨契約條款(DE50).pdf" class="passIcon passpdf" target="_blank"><img src="img/akk-04.png"></a>，將可透過本服務專區申請「<%=name%>｣。</p><p>填寫完畢，請將紙本郵寄至104 臺北市中山區中山北路二段50號3樓 「台北富邦銀行就學貸款組收｣<br>如有疑問，請洽客戶服務專線02-8751-6665按5</p>
                                <%
                                    }
                                %>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="footerArea">
            <%@ include file="include/footerArea.jsp" %>
        </div>


    </div>


</body>
