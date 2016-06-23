<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding("utf-8");
%>
<script src="js/jquery-ui.min.js"></script>
<body class="principal">
<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>
<div class="wrapper">


    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>


		<div class="contentArea">

      <section class="qualifications">
        <div class="container">
          <div class="saArea">
            <p class="vazo">Hi 你好,
              <br> 若你符合以下申請資格，即可下載
              <a href="pdf/11.就學貸款緩繳本金還款期間延長申請書暨切結書(DE29).pdf" class="passIcon pdf" target="_blank">「緩繳本金/延長還款期間<img src="img/akk-04.png">」
              </a>
              ，以書面向本行提出申請。<br>在填妥相關資料並檢附證明文件後，掛號郵寄本行辦理(郵寄地址:104台北市中山區中山北路2段50號3樓「台北富邦銀行就學貸款組收」) ，即可進行申請喔!</p>
            <h3>緩繳本金申請資格</h3>
            <p class="nike malen">您的前一年度平均每月所得未達 3 萬元</p>
            <p class="nike malen">您已取得低收入戶或中低收入戶證明文件</p>
            <h3>延長還款期間申請資格</h3>
            <p class="nike malen">您已申請緩繳貸款本金三次</p>
            <p class="nike malen">您因個人需要</p>
          </div>
        </div>
      </section>

    </div>

      <div class="sidebarArea">
          <%@ include file="include/sidebarArea_QA.jsp" %>
      </div>
      <div class="footerArea">
          <%@ include file="include/footerArea.jsp" %>
      </div>

  </div>
</body>