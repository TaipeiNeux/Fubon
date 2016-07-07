<%@ page language="java" contentType="text/html; charset=utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>

    <h5 class="tic">交易驗證碼有效時間
				<span class="death">0<div class="death" id="mins">4</div>:<div class="death" id="sec">59</div></span>
            </h5>
        <br>
		<div class="tip">
        
        </div>
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
                <div class="time-out">
                    <p class="ss">有效截止時間為</p>
                    <p class="ss applyDate" id="applyDate"></p>
                    <p class="ss">（依本行系統時間為主）</p>
                </div>
            </div>
        </div>
        	  
			  <!-- Modal -->
  <div class="modal fade pomodal" id="myModal_person_2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> -->
        <div class="modal-body">
          <h3>本次交易可輸入交易驗證碼的時間已逾時，請重新操作</h3>
          <!-- <p class='blue'>是否確認「取消」本交易? </p>
			<p> 提醒您，當您確認「取消」本交易後，本行將不保留您本次所填寫的資料；</p>
			
			<br><p> 若您僅是要修改部分資料，請點選頁面上的「修改」按鈕，即可更新資料。</p>

		  
		  
		  <p>你好，為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」
            <a href="" class="passIcon passpdf">
              <img src="img/akk-04.png">
            </a>，將可透過本服務專區「我要申請｣功能完成線上續貸，還可享有免手續費優惠。</p>
          <p class="blue">填寫完畢，請將紙本郵寄至104 台北市中山區中山北路二段50號3樓 就學貸款組收
            <br>本行設定完畢後，將以Email通知您，即可進行線上續貸</p> -->
			
            <a href="" class="pobtn-srb">確定</a>
        </div>
      </div>
    </div>
  </div>
  
<div class="modal fade pomodal personalInfo" id="modal_personalInfo_2_1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
	  <div class="modal-content">
	    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	      <span aria-hidden="true">&times;</span>
	    </button>
	    <div class="modal-body">
	      <h3>本次交易可輸入交易驗證碼的時間已逾時，請重新操作</h3>
			
	        <a href="personalInfo_flow.jsp?step=personalInfo_2_1" class="pobtn-srb submitBtn">確定</a>
	    </div>
	  </div>
	</div>
</div>