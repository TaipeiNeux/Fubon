<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding("utf-8");
%>
<script src="js/jquery-ui.min.js"></script>
<body class="PaymentInstructions">
<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>
<div class="wrapper">


    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>

	
    <div class="contentArea">

      <section class="loan">
        <div class="container">
          <div class="border_title">
            <h2 class="zh">繳款方式說明</h2>
            <h4 class="en">Payment Instructions</h4>
          </div>
          <div class="qusp PaymentloanUL">
            <div class="quspitem">
              <div class="quspitemInner">
                <span class="pho">
                  <img src="img/sas-01.png" alt="">
                </span>
                <div class="text">
                  <h4>本行帳戶自動扣繳</h4>
                  <p class="jubif">您可於本行開立活期帳戶，委託本行按期扣繳，只要一次性的約定扣繳設定，即可每月自動由本行帳戶扣繳，省卻您每次繳款程序，歡迎您多加利用。</p>
                  <a href="javascript:;" class="more" rel="#loanitemArea_1">了解更多</a>
                </div>
              </div>
              <div class="yuquspArea">
                <div class="loanitemArea_1"></div>
              </div>
            </div>
            <div class="quspitem">
              <div class="quspitemInner">
                <span class="pho">
                  <img src="img/sas-08.png" alt="">
                </span>
                <div class="text">
                  <h4>本行網路銀行/行動銀行繳款</h4>
                  <p class="jubif">台北富邦銀行提供您網路銀行、行動銀行及網路ATM等繳款管道，讓您不受時空地點限制，可隨時線上繳款。</p>
                  <a href="javascript:;" class="more" rel="#loanitemArea_2">了解更多</a>
                </div>
              </div>
              <div class="yuquspArea">
                <div class="loanitemArea_2"></div>
              </div>
            </div>
            <div class="atquspArea">
              <div id="loanitemArea_1" class="loanitemArea_1"></div>
              <div id="loanitemArea_2" class="loanitemArea_2"></div>
            </div>
            <div class="quspitem">
              <div class="quspitemInner">
                <span class="pho">
                  <img src="img/sas-06.png" alt="">
                </span>
                <div class="text">
                  <h4>他行帳戶自動扣繳</h4>
                  <p class="jubif">您可透過他行帳戶約定自動扣繳，日後即可每月按期由您所設定的他行帳戶自動扣繳。</p>
                  <a href="javascript:;" class="more" rel="#loanitemArea_3">了解更多</a>
                </div>
              </div>
              <div class="yuquspArea">
                <div class="loanitemArea_3"></div>
              </div>
            </div>
            <div class="quspitem">
              <div class="quspitemInner">
                <span class="pho">
                  <img src="img/sas-04.png" alt="">
                </span>
                <div class="text">
                  <h4>ATM轉帳</h4>
                  <p class="jubif">您可在本行或他行貼有自動化服務跨行轉帳標誌之提款機轉帳繳納。(如繳款單有多筆不同就學貸款帳號時，請逐一分開轉帳)</p>
                  <a href="javascript:;" class="more" rel="#loanitemArea_4">了解更多</a>
                </div>
              </div>
              <div class="yuquspArea">
                <div class="loanitemArea_4"></div>
              </div>
            </div>
            <div class="atquspArea">
              <div id="loanitemArea_3" class="loanitemArea_3"></div>
              <div id="loanitemArea_4" class="loanitemArea_4"></div>
            </div>
            <div class="quspitem">
              <div class="quspitemInner">
                <span class="pho">
                  <img src="img/sas-05.png" alt="">
                </span>
                <div class="text">
                  <h4>跨行匯款</h4>
                  <p class="jubif">您可至任一銀行、郵局、信用合作社及農會辦理跨行電匯，即可繳交台北富邦銀行就學貸款。(如繳款單有多筆不同就學貸款帳號時，請逐一分開匯款)</p>
                  <a href="javascript:;" class="more" rel="#loanitemArea_5">了解更多</a>
                </div>
              </div>
              <div class="yuquspArea">
                <div class="loanitemArea_5"></div>
              </div>
            </div>
            <div class="quspitem">
              <div class="quspitemInner">
                <span class="pho">
                  <img src="img/sas-02.png" alt="">
                </span>
                <div class="text">
                  <h4>本行臨櫃或全省7-11便利商店繳款</h4>
                  <p class="jubif">您可持本行寄發之繳款通知單至7-11便利商店門市款納或透過7-11門市列印繳費單繳</p>
                  <a href="javascript:;" class="more" rel="#loanitemArea_6">了解更多</a>
                </div>
              </div>
              <div class="yuquspArea">
                <div class="loanitemArea_6"></div>
              </div>
            </div>
            <div class="atquspArea">
              <div id="loanitemArea_5" class="loanitemArea_5"></div>
              <div id="loanitemArea_6" class="loanitemArea_6"></div>
            </div>
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
  <script src="js/prog/payment.js"></script>
</body>