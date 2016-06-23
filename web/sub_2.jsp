<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ include file="include/head.jsp" %>
<% request.setCharacterEncoding( "utf-8"); %>
<script src="js/jquery-ui.min.js"></script>
<body class="sub">
<div class="mobileMenu">
    <%@ include file="include/mobile_menu.jsp" %>
</div>
<div class="wrapper">

    <div class="headerArea">
        <%@ include file="include/headerArea.jsp" %>
    </div>
<form id="mainForm">					
 <input type="hidden" class="loginMsg" name="loginMsg" value="" />
<input type="hidden" class="determineStstus" name="determineStstus" value="" />		
    <div class="contentArea">
        <section class="subbanner"></section>

        <section class="loan" id="introduction">
            <div class="container">
                <div class="border_title">
                    <h2 class="zh">就學貸款介紹</h2>
                    <h4 class="en">Introduction</h4>
                    <section class="imm">
                        <a class="applyBtn">立即申請</a>
                    </section>
                </div>
                <ul class="loanUL list">
                    <li class="list__item">
                                        <span class="pho">
              <img src="img/ssd-01.png" alt="">
            </span>
                        <div class="text">
                            <h4>借款人/連帶保證人</h4>
                            <div class="textbox">
                                <p class="titlep">借款人:</p>
                                <p class="subp">須為學生本人</p>
                                <p class="titlep">連帶保證人 :</p>
                                <ol class="disi">
                                    <li>
                                        未成年學生借款，由法定代理人父母雙方允許並共同擔任連帶保證人
                                    </li>
                                    <li>
                                        其他例外情形，依就學貸款相關規範辦理</li>
                                </ol>
                            </div>
                        </div>
                    </li>
                    <li class="list__item">
                                        <span class="pho">
              <img src="img/ssd-02.png" alt="">
            </span>
                        <div class="text">
                            <h4>對保手續費</h4>
                            <div class="textbox">
                                <p class="titlep">親臨對保分行辦理:</p>
                                <p class="subp">每次申貸之對保手續費新臺幣100元</p>
                                <p class="titlep">線上續貸:</p>
                                <p class="subp">免收對保手續費<a href="#" class="underblue" onclick="alert('系統建置中');return false;">查詢線上續貸資格</a></p>
                            </div>
                        </div>
                    </li>
                    <li class="list__item">
                                        <span class="pho">
              <img src="img/ssd-03.png" alt="">
            </span>
                        <div class="text">
                            <h4>借款利率</h4>
                            <div class="textbox">
                                <p class="titlep">開始還款前:</p>
                                <p class="subp">依郵政儲金一年期定期儲蓄存款機動利率+1.4%機動計息</p>
                                <p class="titlep">開始還款後:</p>
                                <p class="subp">依郵政儲金一年期定期儲蓄存款機動利率+0.55%機動計息</p>
                                <div class="bidy">
                                    註 : 1.政府補貼利息請參考「利息補貼｣說明
                                    <br> 2.加碼後之利率由教育部公告之；加碼數由教育部適時檢討調整
									<br> 3.為嘉惠就學貸款學生，本行自99年9月1日起主動吸收開始還款後由學生負擔之就學貸款利率年息0.06%
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list__item">
                                        <span class="pho">
              <img src="img/ya-01.png" alt="">
            </span>
                        <div class="text">
                            <h4>利息補貼</h4>
                            <div class="textbox">
                                <p class="titlep">家庭年收入新臺幣114萬元(含)以下:</p>
                                <p class="subp">在學期間及畢業(或役畢或教育實習期滿)後一年內利息政府全額補貼</p>
                                <p class="titlep">家庭年收入逾新臺幣114萬元至120萬元(含):</p>
                                <p class="subp">在學期間及畢業(或役畢或教育實習期滿)後一年內利息政府半額補貼</p>
                                <p class="titlep">家庭年收入逾新臺幣120萬元以上:</p>
                                <p class="subp">學生本人及其兄弟姊妹有二人以上就讀經各級主管機關立案之國內高級中等以上公私立學校，具正式學籍者，在學期間及畢業(或役畢或教育實習期滿)後一年內利息自行負擔</p>
                            </div>
                        </div>
                    </li>
                    <li class="list__item">
                                        <span class="pho">
              <img src="img/ya-02.png" alt="">
            </span>
                        <div class="text">
                            <h4>還款期間</h4>
                            <div class="textbox">
                                <p class="titlep">開始還款日:</p>
                                <p class="subp">於最後教育階段學業完成後滿一年之次日開始還款 </p>
                                <p class="subp"><a href="" class="underblue" onclick="alert('系統建置中');return false;">查詢延後/提前還款資格</a></p>
                                <p class="titlep">還款期間:</p>
                                <p class="subp">同一教育階段的就學貸款，以借款一學期得有一年償還期限</p>
                                <div class="bidy">
                                    舉例 : 某學生於A大學向本行申貸8個學期的就學貸款，於畢業滿一年後 總共需要分8年償還
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list__item">
                                        <span class="pho">
              <img src="img/ya-04.png" alt="">
            </span>
                        <div class="text">
                            <h4>提前還款違約金</h4>
                            <div class="textbox">
                                <p>於任意時間皆可提前還款且不收取違約金</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>


        <section class="qualifications" id="qualifications">
            <div class="container">
                <div class="border_title">
                    <h2 class="zh">申請資格</h2>
                    <h4 class="en">Eligibility</h4>
                </div>
                <div class="saArea">
                    <h3>申請人資格</h3>
                    <p>應符合以下條件:</p>
                    <ul class="conLi">
                        <li>申請人須為學生本人</li>
                        <li>須為國內設有戶籍之本國國民</li>
                        <li>就讀於以下經各級主管機關立案之台北市公私立學校，具正式學籍者</li>
                        <ul>
                            <li>（1）有固定修業年限之高級中等以上學校及進修學校</li>
                            <li>（2）無固定修業年限之專科以上進修學院（校）</li>
                        </ul>
                    </ul>
                    <h3>家庭年所得總額</h3>
                    <p>應符合以下任一條件：</p>
                    <ul class="conLi">
                        <li>家庭年所得總額為新臺幣120 萬元（含）以下</li>
                        <li>家庭年所得總額超過新臺幣120 萬元，且學生本人及其兄弟姊妹有二人以上就讀經各級主管機關立案之國內公私立學校</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</form>

    <div class="sidebarArea">
        <%@ include file="include/sidebarArea_QA.jsp" %>
    </div>
    <div class="footerArea">
        <%@ include file="include/footerArea.jsp" %>
    </div>


</div>


<!-- 各別流程才各別載入所需的js -->
<script src="js/prog/sub_2.js"></script>
