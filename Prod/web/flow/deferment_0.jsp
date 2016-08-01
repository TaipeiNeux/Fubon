<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

       <input type="hidden" name="eligibilityIndex" value="">
       <input type="hidden" name="eligibilityText" value="">
       
        <p class="jasqa">Hi 你好，
            <br> 只要你有簽署「<a href="" class="underblue" data-toggle="modal" data-target="#Loancovenants">就學貸款網路服務契約條款</a>」，同時符合以下申請資格，即可線上申請就學貸款延後/提前還款期間的服務囉!
        </p>
        <div class="xica">
            <h4>請擇一勾選您所符合的申請資格</h4>
        </div>
        <ul class="famillyStatusArea">
            <li>
                <div class="radioArea">
                    <input type="radio" name="sch" id="sch_1" class="css-checkbox_c" checked="checked" value="">
                    <label for="sch_1" class="css-label_c radGroup2">繼續於國內升學</label>
                </div>
            </li>
            <li>
                <div class="radioArea">
                    <input type="radio" name="sch" id="sch_2" class="css-checkbox_c" checked="checked" value="">
                    <label for="sch_2" class="css-label_c radGroup2">繼續於國外升學(符合教育主管機關所訂之學校)</label>
                </div>
            </li>
            <li>
                <div class="radioArea">
                    <input type="radio" name="sch" id="sch_3" class="css-checkbox_c" checked="checked" value="">
                    <label for="sch_3" class="css-label_c radGroup2">延畢</label>
                </div>
            </li>
            <li>
                <div class="radioArea">
                    <input type="radio" name="sch" id="sch_4" class="css-checkbox_c" checked="checked" value="">
                    <label for="sch_4" class="css-label_c radGroup2">服義務兵役</label>
                </div>
            </li>
            <li>
                <div class="radioArea">
                    <input type="radio" name="sch" id="sch_5" class="css-checkbox_c" checked="checked" value="">
                    <label for="sch_5" class="css-label_c radGroup2">參加教育實習</label>
                </div>
            </li>
            <li>
                <div class="radioArea">
                    <input type="radio" name="sch" id="sch_6" class="css-checkbox_c" checked="checked" value="">
                    <label for="sch_6" class="css-label_c radGroup2">休學/退學</label>
                </div>
            </li>
            <li>
                <div class="radioArea">
                    <input type="radio" name="sch" id="sch_7" class="css-checkbox_c" checked="checked" value="">
                    <label for="sch_7" class="css-label_c radGroup2">提早畢業</label>
                </div>
            </li>
        </ul>


        <!-- Modal -->
        <div class="modal fade pomodal" id="Loancovenants" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body">
                        <h3>提醒您</h3>
                        <ol class="pabo">
                            <li>本服務僅提供已簽署「就學貸款網路服務契約條款」之就學貸款客戶方可使用，歡迎您立即下載「就學貸款網路服務契 約條款」
                                <a href="" class="passIcon passpdf">
                                    <img src="img/akk-04.png">
                                </a>
                            </li>
                            <li>填妥相關資料並檢附證明文件後，掛號郵寄本行辦理(郵寄地址:104台北市中山區中山北路2段50號3樓「台北富邦銀行 就學貸款收」)
                            </li>
                            <li>如有疑問，請洽本行客服專線02-8751-6665按5</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>