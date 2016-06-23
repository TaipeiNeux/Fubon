<%@ page language="java" contentType="text/html; charset=utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>
<div class="parents antcoco">
    <h3 class="snopy pen">會員基本資料</h3>
    <div class="joy abon">
      	<div class="left">
        	<p>身分證字號</p>
      	</div>
      	<div class="right">
          <input class="input_L" type="text" name="id" maxlength="10">
			    <div class="error-msg"/>
      	</div>
    </div>
    <div class="joy abon">
      	<div class="left">
        	<p>姓名</p>
      	</div>
      	<div class="right">
        	<input class="input_L" type="text" name="name" maxlength="10">
	        <!--<span class="susi">(請輸入2-20位中文字)</span>-->
			<div class="error-msg"/>
      	</div>
    </div>
    <div class="joy abon">
      	<div class="left">
        	<p>生日</p>
      	</div>
      	<div class="right">
        	民國
        	<input class="input_s" type="text" name="birthday_y" maxlength="3"> 年
        	<input class="input_s" type="text" name="birthday_m" maxlength="2"> 月
        	<input class="input_s" type="text" name="birthday_d" maxlength="2"> 日
			<div class="error-msg"/>
      	</div>
    </div>
    <div class="joy abon">
      	<div class="left">
        	<p>行動電話</p>
      	</div>
      	<div class="right">
        	<input class="input_L" type="text" name="cellPhone" maxlength="10">
			<div class="error-msg"/>
      	</div>
    </div>
    <div class="joy abon">
      	<div class="left">
        	<p>Email</p>
      	</div>
      	<div class="right">
        	<input class="input_L" type="text" name="email" maxlength="40">
<!--	        <span class="susi">(請輸入少於40位)</span>-->
			<div class="error-msg"/>
      	</div>
    </div>
</div>
<div class="parents antcoco">
    <h3 class="snopy pen">使用者代碼及密碼</h3>
    <div class="joy abon">
      	<div class="left">
        	<p>使用者代碼</p>
      	</div>
      	<div class="right">
	        <input class="input_L" type="text" placeholder="請輸入" name="userAccount" maxlength="10">
	        <span class="susi">(請輸入6-10位英數字)</span>
			<div class="error-msg"/>
      	</div>
    </div>
    <div class="joy abon">
      	<div class="left">
        	<p>使用者密碼</p>
      	</div>
      	<div class="right">
	       	<input class="input_L" type="password" placeholder="請輸入" name="userPwd" maxlength="16">
	        <span class="susi">(請輸入6-16位英數字)</span>
			<div class="error-msg"/>
      	</div>
    </div>
    <div class="joy abon">
      	<div class="left">
        	<p>使用者密碼</p>
      	</div>
      	<div class="right">
	        <input class="input_L" type="password" placeholder="請再次輸入" name="userPwdCheck" maxlength="16">
	        <span class="susi">(請輸入6-16位英數字)</span>
			<div class="error-msg"/>
      	</div>
    </div>
</div>
<p class="casomTitle">注意事項:</p>
<ol class="casom">
<li>為提升您的交易安全，「使用者代碼」需為 6 至 10 位，「使用者密碼」需為 6 至 16 位（英文字一律視為大寫）。</li>
<li>「使用者代碼」及「使用者密碼」須包括英文及數字；不得為相同的英數字、連續英文字或連號數字。</li>
<li>使用者代碼及密碼設定，請勿使用個人顯性資料（如生日、身分證、車號、電話號碼、帳號及相關資料號碼），以策安全。</li>
<li>「使用者代碼」或「使用者密碼」不得與「身分證字號」全部或部分重複。</li>
<li>「使用者密碼」不得與「使用者代碼」全部或部分重複。</li>
</ol>