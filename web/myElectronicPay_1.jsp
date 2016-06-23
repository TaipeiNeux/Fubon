<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <%@ include file="include/head.jsp" %>
        <% request.setCharacterEncoding( "utf-8"); %>

            <body class="myElectronicPay_1">
                <div class="mobileMenu">
                    <%@ include file="include/mobile_menu.jsp" %>
                </div>
                <div class="wrapper">

                    <div class="headerArea">
                        <%@ include file="include/headerArea.jsp" %>
                    </div>

					
        <div class="contentArea">

            <div class="processArea">
                <div class="processOutBox">
                    <div class="processBox">
                        <div class="processInner">
                            <div class="pomodal cheetah">
                                <div class="printorsave">
                                    <a href="">
                                        <img src="img/save-01.png">
                                    </a>
                                    <a href="">
                                        <img src="img/save-02.png">
                                    </a>
                                </div>
                                <h3>台北富邦銀行就學貸款電子繳款通知單</h3>
                                <h4 class="mipa" id="name">吳*名</h4> <h4 class="mipa">先生</h4>
                                <div class="lightWon xiWon">
                                    <ul class="busus">
                                        <li>
                                            <p>繳款單年月</p>
                                            <h3 id="paymentDate">2016/03/09</h3>
                                        </li>
                                        <li>
                                            <p>就學貸款餘額（截至101/03月底止）</p>
                                            <h3 id="balance">604,896</h3>
                                        </li>
                                        <li>
                                            <p>利息/違約金/逾期息計算迄日</p>
                                            <h3 id="overdueDate">2016/03/09</h3>
                                        </li>
                                        <li>
                                            <p>本期應繳總金額</p>
                                            <h3 id="payment">4,100</h3>
                                        </li>
                                        <li>
                                            <p>還款期限【註】</p>
                                            <h3 id="deadline">2016/03/09</h3>
                                        </li>
                                    </ul>
                                </div>
                                <h3 class="snopy detail">本期應繳還款明細</h3>
                                <div class="repayTableArea">
                                    <div class="repayTable resaTable">
                                        <ul class="resa">
                                            <li id="accountLi">
                                                <h4>繳款帳號</h4>
                                                <h5>9420001200039167</h5>
                                                <h5>9420001200039167</h5>
                                                <h5>9420001200039167</h5>
                                                <h5>9420001200039167</h5>
                                                <h5>9420001200039167</h5>
                                            </li>
                                            <li id="principalLi">
                                                <h4>應繳本金</h4>
                                                <h5>56,255</h5>
                                                <h5>56,255</h5>
                                                <h5>56,255</h5>
                                                <h5>56,255</h5>
                                                <h5>56,255</h5>
                                            </li>
                                            <li id="interestLi">
                                                <h4>應繳利息</h4>
                                                <h5>29,564</h5>
                                                <h5>29,564</h5>
                                                <h5>29,564</h5>
                                                <h5>29,564</h5>
                                                <h5>29,564</h5>
                                            </li>
                                            <li id="penaltyLi">
                                                <h4>違約金/逾期息</h4>
                                                <h5>2,025</h5>
                                                <h5>2,025</h5>
                                                <h5>2,025</h5>
                                                <h5>2,025</h5>
                                                <h5>2,025</h5>
                                            </li>
                                            <li id="paymentLi">
                                                <h4>應繳金額</h4>
                                                <h5>2,025</h5>
                                                <h5>2,025</h5>
                                                <h5>2,025</h5>
                                                <h5>2,025</h5>
                                                <h5>2,025</h5>
                                            </li>
                                        </ul>
                                        <ul class="rema jbway">
                                            <li>
                                                <h4 id="sumTitle">本期應繳總金額</h4>
                                                <h5 id="sum">206,259</h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <p class="blue">【註】： 本單所載之違約金/逾期息金額為計算至當月月底止，若您的就學貸款帳款已逾期，請您盡速繳款，並可至全省 7-11之ibon或本行重新查詢應繳總金額及繳款，謝謝您~
                                </p>
                                <div class="ibonArea">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="casomTitle">注意事項:</p>
                    <ol class="casom">
                        <li>本貸款自起息日起，每月(或半年)攤還本息一次，逾期加收延遲息及違約金，如屆期未接獲通知，仍請依貸款契約約定，自行到本行繳納。 </li>
                        <li>本單所載之相關繳款資料，如因提前還款或其他因素致與本行電腦系統所登載之資料不符時，仍以本行電腦系統之資料為準。 </li>
                        <li>本貸款利率依繳款方式之不同，按下列方式計算：
                            <ul class="noliststyle">
                                <li>(1) 繳款方式為「月繳」之貸款利率：按教育部之公告及規定，現行利率計算係依中華郵政股份有限公司一年期定期儲蓄存款 機動利率為指標利率加碼計算。</li>
                                <li>(2) 繳款方式為「半年繳」之貸款利率：自計息起日至計息迄日止之利率計算係按教育部之公告及規定分段計算。</li>
                                <li>(3) 有關本貸款借款人負擔利率訊息，請至台北富邦銀行網站〈就學貸款借款人負擔利率公告〉查詢。 </li>
                            </ul>
                        </li>
                        <li>如逾本單所示之繳款期限日期，應繳金額將有所變動，故繳款前，請先與本行洽詢正確繳款金額。 </li>
                        <li>為符合「金融監督管理委員會指定非公務機關個人資料檔案安全維護辦法」之規定,本行就學貸款專區內,涉及個人資料之交易,部分資料將以遮 蔽之方式進行保護,若導致您無法確認資料之正確性,請您至本行櫃檯辦理或洽24HR 客服中心 02-8751-6665 按 5 將有專人竭誠為您服務。</li>
                    </ol>
                </div>
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

                <script src="js/prog/bootstrap_select_arrow.js"></script>
                <script src="js/prog/myElectronicPay_1.js"></script>