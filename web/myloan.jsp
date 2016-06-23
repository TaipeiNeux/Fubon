
<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding( "utf-8");
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

      <div class="processArea">
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
                <li>欲查詢指標利率請至【網路銀行】貸款> <a href="" class="underblue">貸款指標利率查詢</a>。</li>
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
<script src="js/prog/myloan.js"></script>