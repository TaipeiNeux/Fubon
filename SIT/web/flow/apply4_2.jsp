<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>


        <div class="processMap">
            <input type="hidden" name="idSelected" value="" />
			<input type="hidden" name="people" value="" />
            <input type="hidden" name="dateSelected" value="" />
            <input type="hidden" name="dateTemp" value="" />
            <input type="hidden" name="timeSelected" value="" />
            <input type="hidden" name="btnId" value="" />

            <div class="branchSelect">
                <h2 class="titlesq">選擇所在地區</h2>
                <div class="baelArea">
                    <div class="bael" id="citySelectpicker">
                        <h3 class="select_a">請選擇</h3>
                        <select class="selectpicker" title="請選擇" name="cityId" value=""></select>
                    </div>
                    <div class="bael" id="zipSelectpicker">
                        <h3 class="select_b">請選擇</h3>
                        <select class="selectpicker" title="請選擇" name="zipCode" value=""></select>
                    </div>
                    <!--<div class="baelBtn" role="button" id="submitBranch">確認</div>-->
                    <div class="baelBtn">
                        <a class="pobtn-dblu" id="submitBranch">確認</a>
                    </div>
                </div>
                <div class="regionArea" style="display:none">
                    <!--<div class="region">
                        <a class="pobmo" id="cityRegionText"></a>
                    </div>-->

                    <div class="region">

                        <div class="mapAreaS" active>
                            <div class="refrashBranch">
                                <input type="text" name="" value="" class="mapInput" id="cityRegionText" readonly="">
                                <span class="placeholder" id="triangleInput"></span>
                            </div>
                        </div>

                    </div>


                    <ul class="regionIcon">
                        <li id="cityRegionIcon"></li>
                        <li id="zipRegionIcon"></li>
                    </ul>
                    <h3 class="pen">請選擇預約對保分行</h3>
                    <ul class="regionPlace">

                    </ul>
                </div>
            </div>
            <div class="branchMap" id="branchMap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.2569474719126!2d121.56064821493663!3d25.05927884343181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442ab8d9d238e55%3A0x938a813a77d91aa7!2z5Y-w5YyX5a-M6YKm6YqA6KGM!5e0!3m2!1szh-TW!2stw!4v1458622059261" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen=""></iframe>
            </div>

            <div class="calendarArea">
                <div class="reservationArea" id="calendar"></div>
                <div class="reservationTime" id="appointment">
                    <input type="radio" name="time" id="time1" class="css-checkbox_c">
                    <label for="time1" class="css-label_c timeLeft" id="timeLabel1">AM09:00-10:00 尚可預約
                        <span id="number1" class="number">3</span>人
                    </label>
                    <input type="radio" name="time" id="time2" class="css-checkbox_c">
                    <label for="time2" class="css-label_c timeRight" id="timeLabel2">AM10:00-11:00 尚可預約
                        <span id="number2" class="number">3</span>人
                    </label>
                    <input type="radio" name="time" id="time3" class="css-checkbox_c">
                    <label for="time3" class="css-label_c timeLeft" id="timeLabel3">AM11:00-12:00 尚可預約
                        <span id="number3" class="number">3</span>人
                    </label>
                    <input type="radio" name="time" id="time4" class="css-checkbox_c">
                    <label for="time4" class="css-label_c timeRight" id="timeLabel4">PM01:00-02:00 尚可預約
                        <span id="number4" class="number">3</span>人
                    </label>
					<input type="radio" name="time" id="time5" class="css-checkbox_c">
                    <label for="time5" class="css-label_c timeLeft" id="timeLabel5">PM02:00-03:00 尚可預約
                        <span id="number5" class="number">3</span>人
                    </label>
					<input type="radio" name="time" id="time6" class="css-checkbox_c">
                    <label for="time6" class="css-label_c timeLeft" id="timeLabel6">PM03:00-04:00 尚可預約
                        <span id="number6" class="number">3</span>人
                    </label>
                </div>
                <div class="reservationInfo">
                    <div id="branchsInfo" class="col-sm-6">
                        <h5 class="timeBold">已預約對保分行:</h5>
                        <div class="Fernando">
                            <h5 id="bName" class="bInfo">埔墘分行</h5>
                            <h5 id="bAddr" class="bInfo">台北縣板橋市中山路二段１４３號</h5>
                            <h5 id="bTel" class="bInfo">Tel (02)8953-5118</h5>
                        </div>
                    </div>
                    <div id="branchDate" class="col-sm-6">
                        <h5 class="timeBold">對保時間:</h5>
                        <div class="Fernando">
                            <h5 id="bDate" class="bInfo"></h5>
                            <h5 id="bTime" class="bInfo"></h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>