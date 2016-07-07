<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

        <div class="candysan mobill">
           <input type="hidden" name="accordingToBill_sum_hidden" value="0" />
           <!--<input type="hidden" name="freedom_sum_hidden" value="0" />
		   <input type="hidden" name="accordingToBill_sum" value="0" />-->
           <input type="hidden" name="freedom_sum" value="0" />
           <input type="hidden" name="loanPrice" value="0" />
           <input type="hidden" name="loanAmt" value="" />
           <input type="hidden" name="stageSelectValue" value="" />
            <h3 class="snopy appmoney">申貸金額</h3>
            <div class="zoe2">請選擇申貸金額計算方式<div class="error-msg" id="errorTip" style="display:none">請勾選計算方式</div></div>
            <div class="baka firstTitle">
                <div class="left first">
                    <div class="radioArea">
                        <input type="radio" name="purchaser" id="apm_1" class="css-checkbox_c" value="1">
                        <label for="apm_1" class="css-label_c radGroup2">依註冊繳費單登載之可貸金額</label>
                    </div>
                </div>
                <div class="right" id="loans" style="display:none">
                    <input type="text" class="input_f" id="loansSum" name="loansSum" value=""> 元
					<div class="error-msg"></div>
                </div>
            </div>
            <div id="accordingToBill" style="display:none">
                <div class="nma">
                    <div class="baka dollars">
                        <div class="left holy">
                            <h4 class="blue">*可另加貸以下項目</h4>
                        </div>
                        <div class="right gp">
                            <img src="img/gh.png" alt="">
                        </div>
                    </div>
                    <div id="accordingToBillPlusOthers">
                        <div class="baka dollars">
                            <div class="left">
                                <h4 class="">1.書籍費
<!--                      <span class="hig">(如已含在可貸金額，請勿填寫)</span>-->
                    </h4>
                            </div>
                            <div class="right">
                                <input type="text" class="input_f" id="accordingToBill_book" name="accordingToBill_book" value=""> 元
								<div class="error-msg"></div>
							</div>
                        </div>
                        <div class="baka dollars">
                            <div class="left">
                                <h4 class="">2.住宿費
<!--                      <span class="hig">(如已含在可貸金額，請勿填寫)</span>-->
                    </h4>
                            </div>
                            <div class="right">
                                <input type="text" class="input_f" id="accordingToBill_live" name="accordingToBill_live" value=""> 元
								<div class="error-msg"></div>
						   </div>
                        </div>
                        <div class="baka dollars">
                            <div class="left">
                                <h4>3.海外研習費
<!--                      <span class="hig">(限學海飛颺或學海惜珠得獎)</span>-->
                    </h4>
                            </div>
                            <div class="right">
                                <input type="text" class="input_f" id="accordingToBill_abroad" name="accordingToBill_abroad" value=""> 元
								<div class="error-msg"></div>
							</div>
                        </div>
                        <div class="baka dollars">
                            <div class="left">
                                <h4>4.生活費
<!--                      <span class="hig">(限低收入戶或中低收入戶)</span>-->
                    </h4>
                            </div>
                            <div class="right">
                                <input type="text" class="input_f" id="accordingToBill_life" name="accordingToBill_life" value=""> 元
								<div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="baka dollars damn">
                            <div class="left holy">
                                <h4 class="blue">*應另扣除以下項目</h4>
                                <h4 style="visibility: hidden;">display:none</h4>
                            </div>
                            <div class="right gp">
                                <img src="img/ah.png" alt="">
                            </div>
                        </div>
                    </div>

                    <div id="accordingToBilldivisionPublicExpense">
                        <div class="baka dollars">
                            <div class="left">
                                <h4 class="">1.教育補助費或助學公費</h4>
                            </div>
                            <div class="right">
                                <input type="text" class="input_f" value="" id="accordingToBill_publicExpense" name="accordingToBill_publicExpense"> 元
								<div class="error-msg"></div>
							</div>
                        </div>
                        <div class="baka dollars borderBottom">
                            <h6>(如您的註冊繳費單所登載的可貸金額已扣除此項費用，請勿填寫
                    <br>如您的註冊繳費單所登載的可貸金額未扣除此項費用，請於此欄位填寫金額)</h6>
                        </div>
                    </div>
                </div>
                <div class="sum supersum">
                    <h3>本次申貸金額</h3>
                    <input type="text" value="0" id="accordingToBill_sum" readonly> 元
					<div class="error-msg"></div>
                </div>
            </div>
            <div class="zoe">
                <div class="radioArea">
                    <input type="radio" name="purchaser" id="apm_2" class="css-checkbox_c" value="2">
                    <label for="apm_2" class="css-label_c radGroup2">自行選擇申貸項目</label>
                </div>
            </div>
            <div id="freedom" style="display:none">
                <div id="freedomPlusOthers">
                    <div class="famy">
                        <div class="famyInner">

                            <div class="baka">
                                <div class="left">
                                    <h4>1.學雜費</h4>
                                    <span>(含學分費)</span>
                                </div>
                                <div class="right">
                                    <input type="text" class="input_f" id="freedom_credit" name="freedom_credit" value=""> 元
									<div class="error-msg"></div>
								</div>
                            </div>
                            <div class="baka">
                                <div class="left xman">
                                    <h4>2.學校平安保險</h4>
                                </div>
                                <div class="right">
                                    <input type="text" class="input_f" id="freedom_FPA" name="freedom_FPA" value=""> 元
									<div class="error-msg"></div>
								</div>
                            </div>
                            <div class="baka">
                                <div class="left xman">
                                    <h4>3.實習費</h4>
                                </div>
                                <div class="right">
                                    <input type="text" class="input_f" id="freedom_practice" name="freedom_practice" value=""> 元
									<div class="error-msg"></div>
							   </div>
                            </div>
                            <div class="baka">
                                <div class="left xman">
                                    <h4>4.音樂指導費</h4>
                                </div>
                                <div class="right">
                                    <input type="text" class="input_f" id="freedom_music" name="freedom_music" value=""> 元
									<div class="error-msg"></div>
							   </div>
                            </div>
                        </div>
                    </div>
                    <div class="famy hell">
                        <div class="famyInner">
                            <div class="baka excla">
                                <div class="left">
                                    <h4 class="">5.書籍費</h4>
<!--                                    <span>(如已含在可貸金額，請勿填寫)</span>-->
                                </div>
                                <div class="right">
                                    <input type="text" class="input_f" id="freedom_book" name="freedom_book" value=""> 元
									<div class="error-msg"></div>
								</div>
                            </div>
                            <div class="baka excla">
                                <div class="left">
                                    <h4 class="">6.住宿費</h4>
<!--                                    <span>(如已含在可貸金額，請勿填寫)</span>-->
                                </div>
                                <div class="right">
                                    <input type="text" class="input_f" id="freedom_live" name="freedom_live" value=""> 元
									<div class="error-msg"></div>
								</div>
                            </div>
                            <div class="baka excla">
                                <div class="left">
                                    <h4>7.海外研習費</h4>
                                    <span>(限學海飛颺或學海惜珠得獎)</span>
                                </div>
                                <div class="right">
                                    <input type="text" class="input_f" id="freedom_abroad" name="freedom_abroad" value=""> 元
									<div class="error-msg"></div>
							   </div>
                            </div>
                            <div class="baka excla">
                                <div class="left">
                                    <h4>8.生活費</h4>
                                    <span>(限低收入戶或中低收入戶)</span>
                                </div>
                                <div class="right">
                                    <input type="text" class="input_f" id="freedom_life" name="freedom_life" value=""> 元
									<div class="error-msg"></div>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vic">
                    <h5 class="blue">*應扣除教育補助費或助學公費</h5>
                    <input type="text" class="input_f" id="freedom_publicExpense" name="freedom_publicExpense" value=""> 元
					<div class="error-msg"></div>
				
                <div class="baka tyg">
                    <h6>(如您的註冊繳費單所登載的可貸金額已扣除此項費用，請勿填寫
                  <br>如您的註冊繳費單所登載的可貸金額未扣除此項費用，請於此欄位填寫金額)</h6>
                </div>
                </div>
                <div class="sum">
                    <h3>本次申貸金額</h3>
                    <input type="text" value="0" id="freedom_sum" readonly> 元
					<div class="error-msg"></div>
			   </div>
            </div>
        </div>

       
    <a href="" class="modalBtn" data-toggle="modal" data-target="#loanErrorMsg" style="display:none"></a>
        
       <!-- Modal -->
<div class="modal fade pomodal" id="loanErrorMsg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="modal-body">
                <p>請輸入大於0之整數</p>
                <p>如有疑問，請洽本行客服專線02-8771-6665按5</p>
                <p>提醒您!可先點選下方「儲存｣按鈕，儲存本次填寫資料，下次使用本功能將預設帶入已填寫資料。</p>
            </div>
        </div>
    </div>
</div>