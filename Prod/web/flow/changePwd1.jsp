<%@ page language="java" contentType="text/html; charset=utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>

<div class="parents antcoco">
	<div class="joy swata">
	  	<div class="left">
	    	<p>新的使用者代碼</p>
	  	</div>
	  	<div class="right">
	    	<input class="input_L" type="text" name="userAccount" maxlength="10" placeholder="請輸入">
	    	<span class="susi">(請輸入6-10位英數字)</span>
	    	<div class="error-msg"/>
	  	</div>
	</div>
	<div class="joy swata">
	  	<div class="left">
	    	<p>新的使用者密碼</p>
	  	</div>
	  	<div class="right">
	    	<input class="input_L" type="password" name="userPwd" maxlength="16" placeholder="請輸入">
	    	<span class="susi">(請輸入6-16位英數字)</span>
	    	<div class="error-msg"/>
	  	</div>
	</div>
	<div class="joy swata">
	  	<div class="left">
	    	<p>新的使用者密碼</p>
	  	</div>
	  	<div class="right">
		    <input class="input_L" type="password" name="userPwdCheck" maxlength="16" placeholder="請再次輸入">
		    <span class="susi">(請輸入6-16位英數字)</span>
		    <div class="error-msg"/>
	  	</div>
	</div>
</div>
<div class="earth">
<p class="casomTitle">注意事項:</p>
<ol class="casom">
	<li>為提升您的交易安全，「使用者代碼」需為 6 至 10 位，「使用者密碼」需為 6 至 16 位（英文字一律視為大寫）。</li>
	<li>「使用者代碼」及「使用者密碼」須包括英文及數字；不得為相同的英數字、連續英文字或連號數字。</li>
	<li>使用者代碼及密碼設定，請勿使用個人顯性資料（如生日、身分證、車號、電話號碼、帳號及相關資料號碼），以策安全。</li>
	<li>「使用者代碼」或「使用者密碼」不得與「身分證字號」全部或部分重複。</li>
	<li>「使用者密碼」不得與「使用者代碼」全部或部分重複。</li>
</ol>
</div>