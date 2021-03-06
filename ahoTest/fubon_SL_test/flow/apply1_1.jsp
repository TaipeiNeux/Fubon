<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

        <input type="hidden" name="id" value="" />
        <input type="hidden" name="d_phone" value="" />
        <input type="hidden" name="name_hidden" value="" />
        <input type="hidden" name="birthdayDay_hidden" value="" />
        <input type="hidden" name="birthTarget_hidden" value="" />
        <input type="hidden" name="birthday" value="" />
        <input type="hidden" name="t_phone" value="" />
        <input type="hidden" name="email_hidden" value="" />
        <input type="hidden" name="domicileAddress_hidden" value="" />
        <input type="hidden" name="teleAddress_hidden" value="" />
        <input type="hidden" name="isRecord" value="" />
		<input type="hidden" name="marryStatus" value="" />
			<input type="hidden" class="userAddress" name="domiCityIdHidden" value="" />
            <input type="hidden" class="userAddress" name="domiZipCoodeHidden" value="" />
            <input type="hidden" class="userAddress" name="domiLinerHidden" value="" />
            <input type="hidden" name="sameAddrHidden" value="" />

        <div class="joy joy_first">
            <div class="sandy">
                <p>身分證字號</p>
                <p class="susi" id="joyId"></p>
            </div>
            <div class="twoDiv nameArea">
                <div class="left left_name">
                    <p>姓名</p>
                </div>
                <div class="right right_name">
                    <input type="text" placeholder="" class="input_m" name="name" id="joyName">
                    <div class="error-msg" />
                </div>
            </div>
            <div class="twoDiv threeDiv">
                <div class="left left_bri">
                    <p>生日</p>
                </div>
                <div class="right right_year">
                    民國
                    <input type="text" class="input_s" name="birthday0"> 年
                    <input type="text" class="input_s" name="birthday2"> 月
                    <input type="text" class="input_s" name="birthday4"> 日
                    <div class="error-msg"></div>
                </div>
                
            </div>

            
        </div>
        <div class="joy nina joy_two">
            <div class="left">
                <p>婚姻狀況</p>
            </div>
            <div class="right" id="marryRadio">
                <div class="radioArea">
                    <input type="radio" name="marry" id="single" class="css-checkbox_c">
                    <label for="single" class="css-label_c radGroup2">未婚</label>
                </div>
                <div class="radioArea">
                    <input type="radio" name="marry" id="married" class="css-checkbox_c">
                    <label for="married" class="css-label_c radGroup2">已婚(含離婚或配偶過世)</label>
                </div>
                <div class="error-msg" />
            </div>
        </div>
        <div id="basicInformation">
            <div class="joy nina">
                <div class="left">
                    <p>戶籍電話</p>
                </div>
                <div class="right">
                    (
                    <input type="text" class="input_s" name="DomicileArea"> )
                    <input type="text" class="input_m" name="DomicilePhone">
                    <div class="error-msg" />
                </div>

            </div>
            <div class="joy nina">
                <div class="left">
                    <p>通訊電話</p>
                </div>
                <div class="right">
                    (
                    <input type="text" class="input_s" name="areaTelephone"> )
                    <input type="text" class="input_m" name="telephone">
                    <div class="error-msg" />
                </div>
            </div>
            <div class="joy nina">
                <div class="left">
                    <p>行動電話</p>
                </div>
                <div class="right">
                    <input type="text" placeholder="" class="input_L" name="cellPhone">
                    
                    <div class="error-msg" />
                </div>
            </div>
            <div class="joy nina">
                <div class="left">
                    <p>Email</p>
                </div>
                <div class="right">
                    <input type="text" name="email" placeholder="" class="input_L">
                    <div class="error-msg" />
                </div>
            </div>
            <div class="joy nina" id="domicileAddr">
                <div class="left">
                    <p>戶籍地址</p>
                </div>
                <div class="right">
                    <select class="selectpicker input_y" name="domicileCityId">

                    </select>
                    <select class="selectpicker input_y zip_y" name="domicileZipCode">
                        <option value="">選擇鄉鎮市區</option>
                    </select>
                    <select class="selectpicker input_y liner_y" name="domicileLiner">
                        <option value="">選擇村/里</option>
                    </select>
                    <input type="text" name="DomicileNeighborhood" id="dNeighborhood" class="input_s">
                    <span>鄰</span>
                    <input type="text" name="DomicileAddress" id="dAddress" class="input_m">
                    <div class="error-msg" />
                </div>
            </div>
            <div class="joy nina" id="addr">
                <div class="left">
                    <p>通訊地址</p>
                </div>
                <div class="right">
                    <div class="sp">
                        <input type="checkbox" name="purchaser" id="add" class="css-checkbox">
                        <label for="add" class="css-label">同戶籍地址</label>
                    </div>
                    <select class="selectpicker input_y" name="cityId">

                    </select>
                    <select class="selectpicker input_y zip_y" name="zipCode">
                        <option value="">選擇鄉鎮市區</option>
                    </select>
                    
                    <input type="text" class="input_m" id="address" name="address">
                    <div class="error-msg" />
                </div>
            </div>
        </div>
        <div class="earth">
            <h3 class="casomTitle">注意事項:</h3>
            <ol class="casom">
                <li>不開放線上修改之個人資料，您可透過以下兩種方式辦理：
                    <ul>
                        <li>(1)透過客服:可撥打客服專線02-8751-6665按5由專人為您服務</li>
                        <li>(2)透過臨櫃:請您本人攜帶身分證正本及原留印鑑，至本行各<a href="https://www.fubon.com/banking/locations/locations.htm" class="underblue" target="_blank">服務據點</a>辦理個人基本資料變更</li>
                    </ul>
                </li>
                <li>
                    為符合「金融監督管理委員會指定非公務機關個人資料檔案安全維護辦法」之規定，本行就學貸款服務專區內，涉及個人資料之交易，部分資料將以遮蔽之方式進行保護，若導致您無法確認資料之正確性，請您至本行櫃檯辦理或洽客戶服務專線02-8751-6665按5將有專人竭誠為您服務。
                </li>
            </ol>

        </div>


        <!-- Modal -->
        <div class="modal fade pomodal" id="branches" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body">
                        <h3>提醒您</h3>
                        <p>你好，為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」
                            <a href="" class="passIcon passpdf"><img src="img/akk-04.png"></a>，將可透過本服務專區「我要申請｣功能完成線上續貸，還可享有免手續費優惠。</p>
                        <p class="blue">填寫完畢，請將紙本郵寄至104 台北市中山區中山北路二段50號3樓 就學貸款組收
                            <br>本行設定完畢後，將以Email通知您，即可進行線上續貸</p>
                    </div>
                </div>
            </div>
        </div>