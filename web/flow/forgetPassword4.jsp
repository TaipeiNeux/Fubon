<%@ page language="java" contentType="text/html; charset=utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>

<div class=" antcoco">
	<div class="joy nina">
    	<div class="left">
     		<p>申請結果</p>
    	</div>
    	<div class="right">
      		<p id="forgetPasswordResult" class=""></p>
    	</div>
  	</div>
  	<div class="joy nina">
    	<div class="left">
      		<p>申請時間</p>
    	</div>
    	<div class="right">
      	<p id="forgetPasswordDate" class="whatdate"></p>
      	<p id="forgetPasswordTime" class="whattime"></p>
    	</div>
  	</div>
</div>
<div class=" antcoco">
  <h3 class="snopy pen">歡迎立即登入使用!</h3>
  <div class="may">
    <div class="inputArea">
      <span>
        <img src="img/fu-08.png" alt="">
      </span>
      <input name="studentId" placeholder="身分證字號" type="text" maxlength="10">
    </div>
    <div class="inputArea">
      <span>
        <img src="img/fu-09.png" alt="">
      </span>
      <input name="studentCode" placeholder="使用者代碼" type="password" maxlength="10">
    </div>
    <div class="inputArea">
      <span>
        <img src="img/fu-10.png" alt="">
      </span>
      <input name="studentPassword" placeholder="使用者密碼" type="password" maxlength="16">
    </div>
    <div class="loginBtn">
      <a href="javascript:;" class="pobtn-srb">登入</a>
    </div>
  </div>
</div>