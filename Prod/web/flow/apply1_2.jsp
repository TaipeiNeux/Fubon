<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>


        <h3 class="snopy home">家庭狀況</h3>

        <h2 class="fi">請選擇家庭狀況<div class="error-msg" id="errTip" style="display:none">請勾選家庭狀況</div></h2>
        
        <input type="hidden" name="isChanged" value="" />
        <input type="hidden" name="familyStatus" value="" />
        <input type="hidden" name="guarantorStatus" value="" />
		<input type="hidden" name="incomeTaxArr" value="" />
        <input type="hidden" name="familyStatusLevel1" value="" />
        <input type="hidden" name="familyStatusLevel2" value="" />
        <input type="hidden" name="familyStatusLevel1Text" value="" />
        <input type="hidden" name="familyStatusLevel2Text" value="" />
        <input type="hidden" name="applicantAdult" value="" />
        <input type="hidden" name="userMarriedHidden" value="" />
		<input type="hidden" name="isSpouseForeignerHidden" value="" />
        
        <div class="unMarried">
            <ul class="famillyStatusArea" id="famillyStatusAreaUnmarried">
                <li>
                    <div class="radioArea">
                        <input type="radio" name="status" id="marriage" class="css-checkbox_c">
                        <label for="marriage" class="css-label_c radGroup2">父母雙方健在且婚姻關係持續中</label>
                    </div>
                    <ul class="sub" id="marriageSub">
                        <li class="sub1">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="marriage1" class="css-checkbox_c">
                                <label id="marriage1_label" for="marriage1" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub2">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="marriage2" class="css-checkbox_c">
                                <label id="marriage2_label" for="marriage2" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub3">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="marriage3" class="css-checkbox_c">
                                <label id="marriage3_label" for="marriage3" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub4">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="marriage4" class="css-checkbox_c">
                                <label id="marriage4_label" for="marriage4" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="radioArea">
                        <input type="radio" name="status" id="divorce" class="css-checkbox_c">
                        <label for="divorce" class="css-label_c radGroup2">父母離婚</label>
                    </div>
                    <ul class="sub" id="divorceSub">
                        <li class="sub1">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="divorce1" class="css-checkbox_c">
                                <label id="divorce1_label" for="divorce1" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub2">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="divorce2" class="css-checkbox_c">
                                <label id="divorce2_label" for="divorce2" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub3">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="divorce3" class="css-checkbox_c">
                                <label id="divorce3_label" for="divorce3" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub4">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="divorce4" class="css-checkbox_c">
                                <label id="divorce4_label" for="divorce4" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="radioArea">
                        <input type="radio" name="status" id="passAway_one" class="css-checkbox_c">
                        <label for="passAway_one" class="css-label_c radGroup2">父母一方過世</label>
                    </div>
                    <ul class="sub" id="passAway_oneSub">
                        <li class="sub1">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="passAway_one1" class="css-checkbox_c">
                                <label id="passAway_one1_label" for="passAway_one1" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub2">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="passAway_one2" class="css-checkbox_c">
                                <label id="passAway_one2_label" for="passAway_one2" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub3">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="passAway_one3" class="css-checkbox_c">
                                <label id="passAway_one3_label" for="passAway_one3" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub4">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="passAway_one4" class="css-checkbox_c">
                                <label id="passAway_one4_label" for="passAway_one4" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="radioArea">
                        <input type="radio" name="status" id="passAway_both" class="css-checkbox_c">
                        <label for="passAway_both" class="css-label_c radGroup2">父母雙方過世</label>
                    </div>
                </li>
            </ul>
        </div>

        <div class="married">
            <ul class="famillyStatusArea" id="famillyStatusAreaMarried">
                <li>
                    <div class="radioArea">
                        <input type="radio" name="status" id="spouse_national" class="css-checkbox_c">
                        <label for="spouse_national" id="spouse_national_input" class="css-label_c radGroup2">配偶為本國人
                            <div></div>
                        </label>
                    </div>
                    <ul class="sub" id="spouse_nationalSub">
                        <li class="sub1">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_national1" class="css-checkbox_c">
                                <label id="spouse_national1_label" for="spouse_national1" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub2">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_national2" class="css-checkbox_c">
                                <label id="spouse_national2_label" for="spouse_national2" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub3">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_national3" class="css-checkbox_c">
                                <label id="spouse_national3_label" for="spouse_national3" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub4">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_national4" class="css-checkbox_c">
                                <label id="spouse_national4_label" for="spouse_national4" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="radioArea">
                        <input type="radio" name="status" id="spouse_foreigner" class="css-checkbox_c">
                        <label for="spouse_foreigner" class="css-label_c radGroup2">配偶非為本國人</label>
                    </div>
                    <ul class="sub" id="spouse_foreignerSub">
                        <li class="sub1">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_foreigner1" class="css-checkbox_c">
                                <label id="spouse_foreigner1_label" for="spouse_foreigner1" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub2">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_foreigner2" class="css-checkbox_c">
                                <label id="spouse_foreigner2_label" for="spouse_foreigner2" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub3">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_foreigner3" class="css-checkbox_c">
                                <label id="spouse_foreigner3_label" for="spouse_foreigner3" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="radioArea">
                        <input type="radio" name="status" id="spouse_divorce" class="css-checkbox_c">
                        <label for="spouse_divorce" class="css-label_c radGroup2">離婚</label>
                    </div>
                    <ul class="sub" id="spouse_divorceSub">
                        <li class="sub1">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_divorce1" class="css-checkbox_c">
                                <label id="spouse_divorce1_label" for="spouse_divorce1" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub2">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_divorce2" class="css-checkbox_c">
                                <label id="spouse_divorce2_label" for="spouse_divorce2" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub3">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_divorce3" class="css-checkbox_c">
                                <label id="spouse_divorce3_label" for="spouse_divorce3" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="radioArea">
                        <input type="radio" name="status" id="spouse_passAway" class="css-checkbox_c">
                        <label for="spouse_passAway" class="css-label_c radGroup2">配偶過世</label>
                    </div>
                    <ul class="sub" id="spouse_passAwaySub">
                        <li class="sub1">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_passAway1" class="css-checkbox_c">
                                <label id="spouse_passAway1_label" for="spouse_passAway1" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub2">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_passAway2" class="css-checkbox_c">
                                <label id="spouse_passAway2_label" for="spouse_passAway2" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                        <li class="sub3">
                            <div class="radioArea">
                                <input type="radio" name="gua" id="spouse_passAway3" class="css-checkbox_c">
                                <label id="spouse_passAway3_label" for="spouse_passAway3" class="css-label_c radGroup2"></label>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- Modal -->
  <div class="modal fade pomodal" id="Specialcir1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body">
          <h3>特殊情形</h3>
          <p>原則上未成年人辦理就學貸款應提供父母雙方為連帶保證人，惟有特殊情形時(重病、精神錯亂、失蹤、在監受長期徒刑)而無法導致父母任一方無法行使親權時，由父或母一方擔任保證人。</p>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">確定</button></div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade pomodal" id="Specialcir2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body">
          <h3>特殊情形</h3>
          <p>原則上未成年人辦理就學貸款應提供父母雙方為連帶保證人，惟有特殊情形時(重病、精神錯亂、失蹤、在監受長期徒刑)而無法導致父母任一方無法行使親權時，由父或母一方擔任保證人。</p>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">確定</button></div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade pomodal" id="ThirdGuardianship" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body">
          <h3>第三人監護</h3>
          <p>如為未成年人無父母或父母均不能行使權利義務時及受監護宣告之人，且已辦理監護登記者，應以戶籍謄本之記事欄位所登載之監護權人為就學貸款連帶保證人。</p>
        </div>
        <div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">確定</button></div>
      </div>
    </div>
  </div>