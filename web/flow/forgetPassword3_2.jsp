<%@ page language="java" contentType="text/html; charset=utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>

<h5 class="tic">交易驗證碼有效時間
	<span class="death"></span>
</h5>
<br>
<h4 class="mipa">請輸入本行寄發到您<span class="sendType"></span> <span class="sendType_val"></span> 的六位數交易驗證碼；
	<br>如有疑問，請洽本行客服專線02-8751-6665按5。
</h4>
<div class="parents">
	<div class="joy finp">
	  <div class="left">
	    <p>交易代碼</p>
	  </div>
	  <div class="right">
	    <span id="trasactionCode">
	      <img id="code_img" src="" alt="">
	    </span>
	  </div>
	</div>
	<div class="joy finp">
	  <div class="left">
	    <p>交易驗證碼</p>
	  </div>
	  <div class="right">
	    <input placeholder="請輸入六位數交易驗證碼" class="verfi input_L" type="text" name="codeInput" maxlength="6">
	    <div class="error-msg"/>
	    <p class="ss">交易驗證碼有效截止時間為 <span class="deadline"></span>（依本行系統時間為主）</p>
	  </div>
	</div>
</div>

<div class="modal fade pomodal forgetPassword" id="modal_forgetPassword_2_2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
	  <div class="modal-content">
	    <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
	      <span aria-hidden="true">&times;</span>
	    </button>-->
	    <div class="modal-body">
	      <h3>本次交易可輸入交易驗證碼的時間已逾時，請重新操作</h3>
			
	        <a href="#" class="pobtn-srb submitBtn">確定</a>
	    </div>
	  </div>
	</div>
</div>