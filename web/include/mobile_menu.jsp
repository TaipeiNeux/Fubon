<%@ page import="com.neux.garden.authorization.LoginUserBean" %>
<%@ page import="com.fubon.utils.ProjUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%
    request.setCharacterEncoding("utf-8");
    LoginUserBean loginUserBean = ProjUtils.getLoginBean(request.getSession());

    boolean isLogin = loginUserBean != null;
%>
<!-- 手機板_左邊選單 -->
<nav id="mobileMenu_left_area" class="mobileMenu_left_area">
  <ul>
    <li><a href="javascript:;"><%=isLogin ? "登出" : "登入"%></a></li>
    <li><a href="index.jsp?target=1">申請流程</a></li>
    <li><a href="apply_00.jsp" class="applyBtn" >我要申請</a></li>
    <li><a href="javascript:;">帳務查詢</a>
      <ul class="Inset">
        <li><a href="myloan.jsp">我的貸款</a></li>
        <li><a href="repaymentInquiry.jsp">還款明細查詢</a></li>
      </ul>
    </li>
    <li><a href="javascript:;">延期還款</a>
      <ul class="Inset">
        <li><a href="deferment_0.jsp">延後/提前還款</a></li>
        <li><a href="principal.jsp">緩繳本金/延長還款期間</a></li>
      </ul>
    </li>
    <li><a href="payment.jsp">繳款資訊</a>
	<!--
      <ul class="Inset">
        <li><a href="payment.jsp">繳款方式說明</a></li>
        <li><a href="myElectronicPay_1.jsp">我的電子繳款單</a></li>
        <li><a href="javascript:;" onclick="alert('系統建置中');return false;">立即繳款</a></li>
      </ul>
	  -->
    </li>
    <li><a href="javascript:;">個人資料</a>
      <ul class="Inset">
        <li><a href="personalInfo_start.jsp">變更基本資料</a></li>
        <li><a href="changePwd.jsp">變更代碼/密碼</a></li>
      </ul>
    </li>
  </ul>
</nav>
<!-- /手機板_左邊選單 -->


<!-- 手機板_右邊選單 -->
<nav id="mobileMenu_right_area" class="mobileMenu_right_area">
  <ul>
    
	<!--<li><a href="javascript:;">Q&A</a></li>-->
    <li><a href="sub_1.jsp?target=1">貸款試算</a></li>
    <li><a href="sub_1.jsp?target=2">對保分行</a></li>
    <li><a href="sub_1.jsp?target=3">表單．文件下載</a></li>
  </ul>
</nav>
<!-- /手機板_右邊選單 -->
