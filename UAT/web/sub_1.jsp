<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <%@ include file="include/head.jsp" %>
        <% request.setCharacterEncoding( "utf-8"); %>

            <body class="sub">
                <div class="mobileMenu">
                    <%@ include file="include/mobile_menu.jsp" %>
                </div>
                <div class="wrapper">

                    <div class="headerArea">
                        <%@ include file="include/headerArea.jsp" %>
                    </div>


                    <form id="mainForm">
                        <div class="contentArea">
                            
                            <section class="QA" id="QA" style="display:none;">
                                <div class="container">
                                    <div class="border_title">
                                        <h2 class="zh">Q & A</h2>
                                        <h4 class="en">Common problem</h4>
                                    </div>
                                    <div class="QandAArea">
                                      <div class="QAListArea">
                                        <div class="QAListTab">
                                          <ul>
                                            
                                          </ul>
                                        </div>
                                        
                                      </div>
                                    </div>
                                </div>
                                <div class="QAArea">
                                          
                                </div>
                            </section>

                            <section class="Spreadsheets" id="compute" style="display:none;">
                                <div class="container">
                                    <div class="border_title">
                                        <h2 class="zh">貸款試算</h2>
                                        <h4 class="en">Spreadsheets</h4>
                                    </div>
                                    <div class="magicScrollbar">
                                        <ul class="computeList">
                                            <li>
                                                <h3>貸款金額</h3>
                                                <div class="sliderRangebar">
                                                    <input id="Ran-1" type="text" data-slider-min="0" data-slider-max="9999999" data-slider-step="1" data-slider-value="0" />                                                    
                                                </div>
                                                <input id="Ran-1-SliderVal" class="val" value="0">
                                                <p class="valback">元</p>
                                                <div class="err-message"></div>
                                            </li>
                                            <li>
                                                <h3>年利率</h3>
                                                <div class="sliderRangebar">
                                                    <input id="Ran-2" type="text" data-slider-min="1" data-slider-max="20" data-slider-step="0.01" data-slider-value="1.15">

                                                </div>

                                                <input id="Ran-2-SliderVal" class="val" value="1.15">
                                                <p class="valback">%</p>
                                                <div class="err-message"></div>
                                            </li>
                                            <li>
                                                <h3>借款學期數</h3>
                                                <div class="sliderRangebar">
                                                    <input id="Ran-3" type="text" data-slider-min="1" data-slider-max="30" data-slider-step="1" data-slider-value="1">

                                                </div>
                                                <input id="Ran-3-SliderVal" class="val" value="1">
                                                <p class="valback">學期</p>
                                                <div class="err-message"></div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="magicScrollbar_total">
                                        <div class="totalVal">
                                            <div class="totalVal-inner">
                                                <h3>每月應還本息</h3>
                                                <div id="demo">
                                                    <input type="text" value="0" readonly>
                                                </div>
                                                <span>元</span>
                                                <div class="dha" id="month">（預計還款12個月）</div>
                                            </div>
                                        </div>
                                        <div class="MoreLinkArea">
                                            <div class="MoreLink">
                                                <p>注意事項:</p>
                                                <ol class="noteLi">
                                                    <li>目前就學貸款利率為1.15%，提供您參考，實際利率以營業單位牌告利率為準。</li>
                                                    <li>本試算僅供參考。</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>



                            <section class="Application subApplication" id="loanBranchs" style="display:none;">

                                <div class="container">
                                    <div class="appHf">

                                        <div class="baelArea">
                                            <div class="border_title">
                                                <h2 class="zh">對保分行</h2>
                                                <h4 class="en">Service location</h4>
                                            </div>
                                            <div class="minMap">
                                                <div class="selectBranch">
                                                    <div class="bael" id="citySelectpicker">
                                                        <h3 class="select_a">選擇縣市</h3>
                                                        <select class="selectpicker" title="請選擇" id="citySelector" value="" data-dropup-auto="false">
                                                        </select>
                                                        <div class="error-message"></div>
                                                    </div>
                                                    <div class="bael" id="zipSelectpicker">
                                                        <h3 class="select_b">選擇區域</h3>
                                                        <select class="selectpicker" title="請選擇" id="zipSelector" value="" data-dropup-auto="false">
                                                        </select>
                                                        <div class="error-message"></div>
                                                    </div>
                                                    <div id="position" style="display:none"></div>
                                                    <div class="baelBtn">
                                                        <a class="pobtn-dblu" id="getBranch">確認</a>
                                                    </div>
                                                </div>
                                                <div class="regionArea">
                                                    <div class="region">
                                                        
                                                            <div class="mapAreaS" active>
                                                               <div class="refrashBranch">
                                                                <input type="text" name="" value="" class="mapInput" id="mapInputS" readonly="">
                                                                <span class="placeholder" id="triangleInput"></span>
                                                                </div>
                                                            </div>
                                                        
                                                    </div>
                                                    <ul class="regionIcon">
                                                        <li id="cityRegionIcon"></li>
                                                        <li id="zipRegionIcon"></li>
                                                    </ul>
                                                    <h4 class="brTi">分行列表</h4>
                                                    <ul class="regionPlace">

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mapArea" id="branchMap"></div>
                            </section>

                            <section class="Download" id="download" style="display:none;">
                                <div class="container">
                                    <div class="border_title">
                                        <h2 class="zh">表單‧文件下載</h2>
                                        <h4 class="en">Download</h4>
                                    </div>
                                    <div class="dowArea">
                                        <div class="dow">
                                            <a href="javascript:;" class="downloadtab active">借款人專用表單</a>
                                            <div class="dowContentArea_s">
                                                <div class="dowContent dowContent-1" data-target="dowContent-1" style="display: block;">
                                                    <ul>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款切結書_利息負擔全額或半額專用</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款申請暨撥款通知書</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款償還期限異動通知書暨切結書</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款緩繳本金/還款期間延長申請書暨切結書</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>台北富邦銀行ACH委託自動轉帳扣繳授權書(就學貸款專用)</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dow">
                                            <a href="javascript:;" class="downloadtab">保證人專用表單</a>
                                            <div class="dowContentArea_s">
                                                <div class="dowContent dowContent-2" data-target="dowContent-2" style="display: block;">
                                                    <ul>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款保證書</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款切結書_另一方未能辦理對保時專用</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款保證人資料表</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dow">
                                            <a href="javascript:;" class="downloadtab">借/保人共用表單</a>
                                            <div class="dowContentArea_s">
                                                <div class="dowContent dowContent-3" data-target="dowContent-3" style="display: block;">
                                                    <ul>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款扣繳借款本息約定書</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款借據</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款授權書</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>個人資料變更申請書</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款業務網路服務申請書暨契約條款</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dow">
                                            <a href="javascript:;" class="downloadtab">參考文件</a>
                                            <div class="dowContentArea_s">
                                                <div class="dowContent dowContent-4" data-target="dowContent-4" style="display: block;">
                                                    <ul>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款作業須知</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>辦理104學年度下學期就學貸款對保分行地址及電話一覽表</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款線上申請及對保流程</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div class="dowitem">
                                                                <h2>就學貸款各項證明文件申請書</h2>
                                                                <div class="dowlink">
                                                                    <a href="javascript:;" class="searching"></a>
                                                                    <a href="javascript:;" class="pdf"></a>
                                                                    <a href="javascript:;" class="print"></a>
                                                                </div>
                                                            </div>
                                                            <div class="dowitemContent">
                                                                <div class="imgBox">
                                                                    <img src="img/dh.jpg" alt="">
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dowContentArea">
                                    <div class="dowContent dowContent-1 active">
                                        <ul>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款切結書_利息負擔全額或半額專用</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent" style="display: none;">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款申請暨撥款通知書</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款償還期限異動通知書暨切結書</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款緩繳本金/還款期間延長申請書暨切結書</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>台北富邦銀行ACH委託自動轉帳扣繳授權書(就學貸款專用)</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="dowContent dowContent-2">
                                        <ul>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款保證書</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款切結書_另一方未能辦理對保時專用</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款保證人資料表</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="dowContent dowContent-3">
                                        <ul>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款扣繳借款本息約定書</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款借據</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款授權書</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>個人資料變更申請書</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款業務網路服務申請書暨契約條款</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="dowContent dowContent-4">
                                        <ul>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款作業須知</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent" style="display: none;">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>辦理104學年度下學期就學貸款對保分行地址及電話一覽表</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款線上申請及對保流程</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="dowitem">
                                                    <h2>就學貸款各項證明文件申請書</h2>
                                                    <div class="dowlink">
                                                        <a href="javascript:;" class="searching"></a>
                                                        <a href="javascript:;" class="pdf"></a>
                                                        <a href="javascript:;" class="print"></a>
                                                    </div>
                                                </div>
                                                <div class="dowitemContent">
                                                    <div class="imgBox">
                                                        <img src="img/dh.jpg" alt="">
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </form>


                    <div class="sidebarArea">
                    </div>

                    <div class="footerArea">
                        <%@ include file="include/footerArea.jsp" %>
                    </div>


                </div>


                <!-- 各別流程才各別載入所需的js -->

                <script src="js/prog/bootstrap_select_arrow.js"></script>
                <script src="js/prog/sub_1.js"></script>
				