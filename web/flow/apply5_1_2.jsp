<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

        <h5 class="tic">
                <span class="death">0<div class="death" id="mins">4</div>:<div class="death" id="sec">59</div></span>秒後取消交易
            </h5>
        <br>
        
        <h4 class="mipa">請輸入本行寄發到您手機號碼<div class="mipa" id="mobile">09111111111</div></h4>
        <h4 class="mipa">的六位數交易驗證碼;<br/>如有疑問,請洽客戶服務專線 02-8751-6665 按 5。</h4>
        <div class="joy finp">
            <div class="left">
                <p>交易代碼</p>
            </div>
            <div class="right">
                <span>
                  <img id="img" src="" alt="">
                </span>
            </div>
        </div>
        <div class="joy finp">
            <div class="left">
                <p>交易驗證碼</p>
            </div>
            <div class="right">
                <input type="text" placeholder="請輸入六位數交易驗證碼" class="verfi input_L" name="codeInput">
                <div class="error-msg"></div>
                <div>
                    <p class="ss">有效截止時間為</p>
                    <p class="ss applyDate" id="applyDate"></p>
                    <p class="ss">（依本行系統時間為主）</p>
                </div>
            </div>
        </div>
		
		<div class="modal fade pomodal apply" id="modal_apply_5_1_2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
	  <div class="modal-content">
	    
	    <div class="modal-body">
	      <h3>本次交易可輸入交易驗證碼的時間已逾時，請重新操作</h3>
			
	        <a href="apply.jsp?step=apply_document_5_1" class="pobtn-srb submitBtn" style="">確定</a>
	    </div>
	  </div>
	</div>
</div>