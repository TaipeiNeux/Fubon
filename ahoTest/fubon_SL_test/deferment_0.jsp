<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="include/head.jsp" %>
<%
    request.setCharacterEncoding("utf-8");
%>
<script src="js/jquery-ui.min.js"></script>
<body class="deferment_0">
<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>
<div class="wrapper">


    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>


    <div class="contentArea">

        <div class="processArea only_process">

            <div class="processOutBox">
                <div class="processBox">
                    <form id="mainForm">
                        <div class="processInner"><input type="hidden" name="eligibilityIndex" value="">
                            <input type="hidden" name="eligibilityText0" value="">

                            <p class="jasqa">Hi 你好，
                                <br> 只要你有簽署「<a href="" class="underblue" data-toggle="modal" data-target="#Loancovenants">就學貸款網路服務契約條款</a>」，同時符合以下申請資格，即可線上申請就學貸款延後/提前還款期間的服務囉!
                            </p>
							
							<a href="" class="underblue" data-toggle="modal" data-target="#noRecord" style="display:none"></a>
                            
							<div class="xica">
                                <h4>請擇一勾選您所符合的申請資格</h4>
								<div class="error-msg" id="selectMsg" style="display:none">請勾選您所符合的申請資格</div>
        </div>
                            <ul class="famillyStatusArea">
                                <li>
                                    <div class="radioArea">
                                        <input type="radio" name="sch" id="sch_1" class="css-checkbox_c" value="">
                                        <label for="sch_1" class="css-label_c radGroup2">繼續於國內升學</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="radioArea">
                                        <input type="radio" name="sch" id="sch_2" class="css-checkbox_c" value="">
                                        <label for="sch_2" class="css-label_c radGroup2">繼續於國外升學(須個案經中央教育主管機關核准)</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="radioArea">
                                        <input type="radio" name="sch" id="sch_3" class="css-checkbox_c" value="">
                                        <label for="sch_3" class="css-label_c radGroup2">延畢</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="radioArea">
                                        <input type="radio" name="sch" id="sch_4" class="css-checkbox_c" value="">
                                        <label for="sch_4" class="css-label_c radGroup2">服義務兵役</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="radioArea">
                                        <input type="radio" name="sch" id="sch_5" class="css-checkbox_c" value="">
                                        <label for="sch_5" class="css-label_c radGroup2">參加教育實習</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="radioArea">
                                        <input type="radio" name="sch" id="sch_6" class="css-checkbox_c" value="">
                                        <label for="sch_6" class="css-label_c radGroup2">休學/退學</label>
                                    </div>
                                </li>
                                <li>
                                    <div class="radioArea">
                                        <input type="radio" name="sch" id="sch_7" class="css-checkbox_c" value="">
                                        <label for="sch_7" class="css-label_c radGroup2">提早畢業</label>
                                    </div>
                                </li>
                            </ul>


                            <!-- Modal -->
                            <div class="modal fade pomodal" id="Loancovenants" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog long-dialog" role="document">
                                    <div class="modal-content">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <div class="modal-body">
                                            <h3>提醒您</h3>
                                            <ol class="pabo">
                                                <li>為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」
                                                    <a href="pdf/16.就學貸款業務網路服務申請書暨契約條款(DE50).pdf" class="passIcon pdf" target="_blank">
														<img src="img/akk-04.png">
                                                    </a>，將可透過本服務專區申請「延後/提前還款」。
                                                </li>
                                                <li>填寫完畢，請將紙本郵寄至104臺北市中山區中山北路2段50號3樓 「台北富邦銀行就學貸款組收」</li>
                                                <li>如有疑問，請洽客戶服務專線02-8751-6665按5。</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
							<!-- Modal -->
                            <div class="modal fade pomodal" id="noRecord" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <div class="modal-body">
                                            <h3>提醒您</h3>
                                            <ol class="pabo">
                                                <li>目前查無你於本行有就學貸款應繳金額紀錄，如有疑問，請洽客戶服務專線02-8751-6665按5。</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
							</div>
                    </form>
                </div>
            </div>
            <div class="nextBtn">
                <a href="#" class="blu">下一步</a>
            </div>
        </div>


        <div class="nextBtn">

        </div>
    </div>



    <div class="sidebarArea">
        <%@ include file="include/sidebarArea_QA.jsp" %>
    </div>
    <div class="footerArea">
        <%@ include file="include/footerArea.jsp" %>
    </div>

</div>

<!-- 各別流程才各別載入所需的js -->
<script src="js/prog/deferment_0.js?v=<%=System.currentTimeMillis()%>"></script>
<!--<script src='fullcalendar/lib/jquery.min.js'></script>-->
</body>
