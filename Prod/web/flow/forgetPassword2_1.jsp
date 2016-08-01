<%@ page language="java" contentType="text/html; charset=utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>

<div class="antcoco">
	<h3 class="snopy noborder">請確認新的使用者代碼及密碼</h3>
	<div class="may">
	  <div class="joy bgfff">
	    <div class="left">
	      <p>新的使用者代碼</p>
	    </div>
	    <div class="right">
	      <p id="userAccount"></p>
	    </div>
	  </div>
	  <div class="joy">
	    <div class="left">
	      <p>新的使用者密碼</p>
	    </div>
	    <div class="right">
	      <p id="userPwd"></p>
	    </div>
	  </div>
	</div>
	<div class="ubt">
		<img src="img/pk-01.png"/> 
		<p class="beforeImg">
		  	按「確認」後,本行將寄發六位數交易驗證碼至您<span class="sendType"></span><span class="blue sendType_val"></span> ;
		  	<br> 若該<span class="sendType"></span>錯誤或 5 分鐘內未收到交易驗證碼,請洽客服專線 02-8751-6665 按 5。
		</p>
	</div>
</div>