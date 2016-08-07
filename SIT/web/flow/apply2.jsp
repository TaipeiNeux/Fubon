<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

        <form id="mainForm">
<input type="hidden" name="lastIsGuarantor" value="" />
            <input type="hidden" name="isRecordHidden" value="" />
            <input type="hidden" name="isChangeHidden" value="" />
            <input type="hidden" name="adultHidden" value="" />
            <input type="hidden" name="guarantorText" value="" />
            <input type="hidden" name="showInfo" value="" />
            <input type="hidden" name="isGuarantor" value="" />
            <input type="hidden" name="isIncomeTax" value="" />
            <input type="hidden" name="string_father" value="" />
            <input type="hidden" name="string_mother" value="" />
            <input type="hidden" name="string_thirdParty" value="" />
            <input type="hidden" name="string_spouse" value="" />
            <input type="hidden" name="thirdPartyTitle" value="" />
			<input type="hidden" name="relationshipTitle" value="" />
			<input type="hidden" name="user_birthday_hidden" value="" />

            <input type="hidden" name="father_sameAddrHidden" value="" />
            <input type="hidden" name="mother_sameAddrHidden" value="" />
            <input type="hidden" name="thirdParty_sameAddrHidden" value="" />
            <input type="hidden" name="spouse_sameAddrHidden" value="" />
            
            <input type="hidden" name="father_RadioBtn" value="" />
            <input type="hidden" name="mother_RadioBtn" value="" />
            <input type="hidden" name="thirdParty_RadioBtn" value="" />
            <input type="hidden" name="spouse_RadioBtn" value="" />
            
            <input type="hidden" name="father_checkbox" value="" />
            <input type="hidden" name="mother_checkbox" value="" />
			
            <input type="hidden" name="isSpouseForeignerHidden" value="" />
			
			<input type="hidden" name="father_String" value="" />
            <input type="hidden" name="mother_String" value="" />
            <input type="hidden" name="thirdParty_String" value="" />
            <input type="hidden" name="spouse_String" value="" />

            <div class="incomeTaxRadio" id="incomeTaxRadio" style="display:none">
                <span class="oneLine">
                    <div class="left">
                        <p class="incomeTaxString">請選擇合計所得對象(可複選)</p>
                    </div>
                </span>
                <span class="oneLine fathermather">
                    <div class="right radioGuarantor">
                        <div class="sp">
                            <input type="checkbox" name="incomeTax_purchaser" id="incomeTaxFather" class="sqr-checkbox">
                            <label for="incomeTaxFather" class="sqr-label" id="fatherCkeckbox">父親</label>
                            <input type="checkbox" name="incomeTax_purchaser" id="incomeTaxMother" class="sqr-checkbox">
                            <label for="incomeTaxMother" class="sqr-label" id="motherCkeckbox">母親</label>
                            <div class="error-msg" id="checkboxGroup" style="display:none"></div>
                        </div>
                     </div>
                </span>
            </div>

            <div class="parents" id="father">
                <a href="#" class="Millia">
                    <img class="closeBtn" src="img/phoneclose.png" alt="close">
                    <img class="openBtn" src="img/phoneopen.png" alt="open">
                </a>
                <h3 class="snopy father"><span class="oneLine" id="fatherTitle">父親</span>
                <span class="sspy">
                    <div class="oneLine">
                        <div class="left">
                            <p class="stringOrRadio"></p>
                        </div>
                    </div>
                        <div class="oneLine">
                            <div class="right radioGuarantor" style="display:none">
                                <div class="sp">
                                    <input type="radio" name="father_purchaser" id="dadT" class="css-checkbox_c">
                                    <label for="dadT" class="css-label_c" >是</label>
                                    <input type="radio" name="father_purchaser" id="dadF" class="css-checkbox_c">
                                    <label for="dadF" class="css-label_c" >否</label>
                                </div>
                            </div>
                        </div>
                   </span>
<div class="error-msg" id="tip0" style="display:none">請勾選是否擔任連帶保證人</div> 
                </h3>
                <div class="famy">
                    <div class="famyInner">
                        <div class="joy finp">
                            <div class="left">
                                <p>身分證字號</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="father_id">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp" id="fName">
                            <div class="left">
                                <p>姓名</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="father_name">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>生日</p>
                            </div>
                            <div class="right">
                                民國
                                <input type="text" class="input_s" name="father_birthday0"> 年
                                <input type="text" class="input_s" name="father_birthday2"> 月
                                <input type="text" class="input_s" name="father_birthday4"> 日
                                <div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="famy">
                    <div class="famyInner">
                        <!--<div class="joy finp">
                            <div class="left">
                                <p>戶籍電話</p>
                            </div>
                            <div class="right">
                                (
                                <input type="text" class="input_s" name="father_regionCode_domi"> )
                                <input type="text" class="input_m" name="father_phone_domi">
								<div class="error-msg"></div>
                            </div>
                        </div>-->
                        <div class="joy finp">
                            <div class="left">
                                <p>通訊電話</p>
                            </div>
                            <div class="right">
                                (
                                <input type="text" class="input_s" name="father_regionCode"> )
                                <input type="text" class="input_m" name="father_phone">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp" id="fCell">
                            <div class="left">
                                <p>行動電話</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="father_mobile">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sodif" id="domicileAddr">
                    <div class="joy finp">
                        <div class="left">
                            <p>戶籍地址</p>
                        </div>
                        <div class="right">
                            <div class="sp mb10">
                                <div class="radioArea">
                                    <input type="checkbox" name="R_address_dad" id="R_address_1_father" class="css-checkbox">
                                    <label for="R_address_1_father" class="css-label radGroup2">同申請人戶籍地址</label>
                                </div>
                                <div class="radioArea" style="display:none">
                                    <input type="radio" name="R_address_dad" id="R_address_2_dad" class="css-checkbox_c">
                                    <label for="R_address_2_dad" class="css-label_c radGroup2">同申請人通訊地址</label>
                                </div>
                            </div>
                            <select class="selectpicker input_y" name="father_cityId_domi">

                            </select>
                            <select class="selectpicker input_y zip_y" name="father_zipCode_domi">
                                <option value="">選擇鄉鎮市區</option>
                            </select>

                            <select class="selectpicker input_y liner_y" name="father_liner_domi">
                                <option value="">選擇村/里</option>
                            </select>
                            <input type="text" class="input_s" name="father_neighborhood_domi"> 
							<span>鄰</span>
                            <input type="text" class="input_m input_ed" name="father_address_domi">
                            <div class="error-msg"></div>
                        </div>
                    </div>
                </div>
                <!--<div class="sodif">
                    <div class="joy finp" id="fAddr">
                        <div class="left">
                            <p>通訊地址</p>
                        </div>
                        <div class="right">
                            <div class="sp mb10">
                                <div class="radioArea">
                                    <input type="radio" name="M_address_dad" id="M_address_1_dad" class="css-checkbox_c">
                                    <label for="M_address_1_dad" class="css-label_c radGroup2">同戶籍地址</label>
                                </div>
                                <div class="radioArea">
                                    <input type="checkbox" name="M_address_dad" id="M_address_2_dad" class="css-checkbox">
                                    <label for="M_address_2_dad" class="css-label radGroup2">同申請人戶籍地址</label>
                                </div>
                                <div class="radioArea" style="display:none">
                                    <input type="radio" name="M_address_dad" id="M_address_3_dad" class="css-checkbox_c">
                                    <label for="M_address_3_dad" class="css-label_c radGroup2">同申請人通訊地址</label>
                                </div>
                            </div>
                            <select class="selectpicker input_y" name="father_cityId">

                            </select>
                            <select class="selectpicker input_y zip_y" name="father_zipCode">
                                <option value="">選擇鄉鎮市區</option>
                            </select>
							<input type="text" class="input_s" id="father_linerName" name="father_linerName">
                            <select class="selectpicker input_y liner_y" name="father_liner">
                                <option value="">選擇村/里</option>
                            </select>
                            <input type="text" class="input_s" name="father_neighborhood"> 
							<span>鄰</span>
                            <input type="text" class="input_m" name="father_address">
							<div class="error-msg"></div>
                        </div>
                    </div>
                </div>-->
            </div>
            <div class="parents" id="mother">
                <a href="#" class="Millia">
                    <img class="closeBtn" src="img/phoneclose.png" alt="close">
                    <img class="openBtn" src="img/phoneopen.png" alt="open">
                </a>
                <h3 class="snopy mather"><span class="oneLine" id="motherTitle">母親</span>
               <span class="sspy">
                       <div class="oneLine">
                        <div class="left">
                            <p class="stringOrRadio"></p>
                        </div>
                   </div>
                        <div class="oneLine">
                        <div class="right radioGuarantor" style="display:none">
                            <div class="sp">
                                 <input type="radio" name="mother_purchaser" id="momT" class="css-checkbox_c">
                                <label for="momT" class="css-label_c" >是</label>
                                <input type="radio" name="mother_purchaser" id="momF" class="css-checkbox_c">
                                <label for="momF" class="css-label_c" >否</label>
                            </div>
                        </div>
                   </div>
                    </span>
                    <div class="error-msg" id="tip1" style="display:none">請勾選是否擔任連帶保證人</div> 

            </h3>
                <div class="famy">
                    <div class="famyInner">

                        <div class="joy finp">
                            <div class="left">
                                <p>身分證字號</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="mother_id">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>姓名</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="mother_name">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>生日</p>
                            </div>
                            <div class="right">
                                民國
                                <input type="text" class="input_s" name="mother_birthday0"> 年
                                <input type="text" class="input_s" name="mother_birthday2"> 月
                                <input type="text" class="input_s" name="mother_birthday4"> 日
                                <div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="famy">
                    <div class="famyInner">
                        <!--<div class="joy finp">
                            <div class="left">
                                <p>戶籍電話</p>
                            </div>
                            <div class="right">
                                (
                                <input type="text" class="input_s" name="mother_regionCode_domi"> )
                                <input type="text" class="input_m" name="mother_phone_domi">
								<div class="error-msg"></div>
                            </div>
                        </div>-->
                        <div class="joy finp">
                            <div class="left">
                                <p>通訊電話</p>
                            </div>
                            <div class="right">
                                (
                                <input type="text" class="input_s" name="mother_regionCode"> )
                                <input type="text" class="input_m" name="mother_phone">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>行動電話</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="mother_mobile">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sodif" id="domicileAddr">
                    <div class="joy finp">
                        <div class="left">
                            <p>戶籍地址</p>
                        </div>
                        <div class="right">
                            <div class="sp mb10">
                                <div class="radioArea">
                                    <input type="checkbox" name="R_address_mon" id="R_address_1_mother" class="css-checkbox">
                                    <label for="R_address_1_mother" class="css-label radGroup2">同申請人戶籍地址</label>
                                </div>
                                <div class="radioArea" style="display:none">
                                    <input type="radio" name="R_address_mon" id="R_address_2_mon" class="css-checkbox_c">
                                    <label for="R_address_2_mon" class="css-label_c radGroup2">同申請人通訊地址</label>
                                </div>
                            </div>
                            <select class="selectpicker input_y" name="mother_cityId_domi">

                            </select>
                            <select class="selectpicker input_y zip_y" name="mother_zipCode_domi">
                                <option value="">選擇鄉鎮市區</option>
                            </select>
                            <select class="selectpicker input_y liner_y" name="mother_liner_domi">
                                <option value="">選擇村/里</option>
                            </select>
                            <input type="text" class="input_s" name="mother_neighborhood_domi"> 
							<span>鄰</span>
                            <input type="text" class="input_m input_ed" name="mother_address_domi">
                            <div class="error-msg"></div>
                        </div>
                    </div>
                </div>
                <!--<div class="sodif">
                    <div class="joy finp">
                        <div class="left">
                            <p>通訊地址</p>
                        </div>
                        <div class="right">
                            <div class="sp mb10">
                                <div class="radioArea">
                                    <input type="radio" name="M_address_mon" id="M_address_1_mon" class="css-checkbox_c">
                                    <label for="M_address_1_mon" class="css-label_c radGroup2">同戶籍地址</label>
                                </div>
                                <div class="radioArea">
                                    <input type="checkbox" name="M_address_mon" id="M_address_2_mon" class="css-checkbox">
                                    <label for="M_address_2_mon" class="css-label radGroup2">同申請人戶籍地址</label>
                                </div>
                                <div class="radioArea" style="display:none">
                                    <input type="radio" name="M_address_mon" id="M_address_3_mon" class="css-checkbox_c">
                                    <label for="M_address_3_mon" class="css-label_c radGroup2">同申請人通訊地址</label>
                                </div>
                            </div>
                            <select class="selectpicker input_y" name="mother_cityId">

                            </select>
                            <select class="selectpicker input_y zip_y" name="mother_zipCode">
                                <option value="">選擇鄉鎮市區</option>
                            </select>
							<input type="text" class="input_s" id="mother_linerName" name="mother_linerName">
                            <select class="selectpicker input_y liner_y" name="mother_liner">
                                <option value="">選擇村/里</option>
                            </select>
                            <input type="text" class="input_s" name="mother_neighborhood"> 
							<span>鄰</span>
                            <input type="text" class="input_m" name="mother_address">
                        </div>
                    </div>
                </div>-->
            </div>
            <div class="parents" id="thirdParty">
                <a href="#" class="Millia">
                    <img class="closeBtn" src="img/phoneclose.png" alt="close">
                    <img class="openBtn" src="img/phoneopen.png" alt="open">
                </a>
                <h3 class="snopy thirdParty"><span class="oneLine oneNigh" id="thirdPartyTitle">第三人</span>
                <span class="sspy sspyMid"><span class="oneLine oneHigh">
                        <div class="left Mid">
                            <p class="stringOrRadio"></p>
                        </div>
                    </span>
                       <span class="oneLine">
                        <div class="right radioGuarantor" style="display:none">
                            <div class="sp">
                               <input type="radio" name="thirdParty_purchaser" id="otherT" class="css-checkbox_c">
                                <label for="otherT" class="css-label_c" >是</label>
                                <input type="radio" name="thirdParty_purchaser" id="otherF" class="css-checkbox_c">
                                <label for="otherF" class="css-label_c" >否</label>
                            </div>
                        </div>
                    </span>
                    </span>
                    <div class="error-msg" id="tip2" style="display:none">請勾選是否擔任連帶保證人</div> 

            </h3>
                <div class="sodif sodleft">
                    <div class="joy finp">
                        <div class="left relationship">
                            <p>與申請人之關係</p>
                        </div>
                        <div class="right">
                            <select class="selectpicker input_y relationship_y" name="thirdParty_relationship">
                                <option value="">請選擇</option>
                                <option value="4A">兄弟</option>
                                <option value="4B">姊妹</option>
                                <option value="4C">姊弟</option>
                                <option value="4D">兄妹</option>
                                <option value="5A">祖孫</option>
                                <option value="5B">外祖</option>
                                <option value="5C">外婆</option>
                                <option value="7A">他親</option>
                                <option value="8A">朋友</option>
                            </select>
                            <div class="error-msg"></div>
                        </div>
                    </div>
                </div>
                <div class="famy">
                    <div class="famyInner famyOut">
                        <div class="joy finp">
                            <div class="left">
                                <p>身分證字號</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="thirdParty_id">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>姓名</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="thirdParty_name">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>生日</p>
                            </div>
                            <div class="right">
                                民國
                                <input type="text" class="input_s" name="thirdParty_birthday0"> 年
                                <input type="text" class="input_s" name="thirdParty_birthday2"> 月
                                <input type="text" class="input_s" name="thirdParty_birthday4"> 日
                                <div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="famy">
                    <div class="famyInner">
                        <div class="joy finp">
                            <div class="left">
                                <p>戶籍電話</p>
                            </div>
                            <div class="right">
                                (
                                <input type="text" class="input_s" name="thirdParty_regionCode_domi"> )
                                <input type="text" class="input_m" name="thirdParty_phone_domi">
								<div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>-->
                <div class="famy">
                    <div class="famyInner">
                        <div class="joy finp">
                            <div class="left">
                                <p>通訊電話</p>
                            </div>
                            <div class="right">
                                (
                                <input type="text" class="input_s" name="thirdParty_regionCode"> )
                                <input type="text" class="input_m" name="thirdParty_phone">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>行動電話</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="thirdParty_mobile">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sodif" id="domicileAddr">
                    <div class="joy finp">
                        <div class="left">
                            <p>戶籍地址</p>
                        </div>
                        <div class="right">
                            <div class="sp mb10">
                                <div class="radioArea">
                                    <input type="checkbox" name="R_address_third" id="R_address_1_thirdParty" class="css-checkbox">
                                    <label for="R_address_1_thirdParty" class="css-label radGroup2">同申請人戶籍地址</label>
                                </div>
                                <div class="radioArea" style="display:none">
                                    <input type="radio" name="R_address_third" id="R_address_2_third" class="css-checkbox_c">
                                    <label for="R_address_2_third" class="css-label_c radGroup2">同申請人通訊地址</label>
                                </div>
                            </div>
                            <select class="selectpicker input_y" name="thirdParty_cityId_domi">

                            </select>
                            <select class="selectpicker input_y zip_y" name="thirdParty_zipCode_domi">
                                <option value="">選擇鄉鎮市區</option>
                            </select>
                            <select class="selectpicker input_y liner_y" name="thirdParty_liner_domi">
                                <option value="">選擇村/里</option>
                            </select>
                            <input type="text" class="input_s fourty" name="thirdParty_neighborhood_domi"> 
							<span>鄰</span>
                            <input type="text" class="input_m input_ed" name="thirdParty_address_domi">
                            <div class="error-msg"></div>
                        </div>
                    </div>
                </div>
                <!--<div class="sodif">
                    <div class="joy finp">
                        <div class="left">
                            <p>通訊地址</p>
                        </div>
                        <div class="right">
                            <div class="sp mb10">
                                
                                <div class="radioArea">
                                    <input type="radio" name="M_address_third" id="M_address_1_third" class="css-checkbox_c">
                                    <label for="M_address_1_third" class="css-label_c radGroup2">同戶籍地址</label>
                                </div>
                                <div class="radioArea">
                                    <input type="checkbox" name="M_address_third" id="M_address_2_third" class="css-checkbox">
                                    <label for="M_address_2_third" class="css-label radGroup2">同申請人戶籍地址</label>
                                </div>
                                <div class="radioArea" style="display:none">
                                    <input type="radio" name="M_address_third" id="M_address_3_third" class="css-checkbox_c">
                                    <label for="M_address_3_third" class="css-label_c radGroup2">同申請人通訊地址</label>
                                </div>
                            </div>
                            <select class="selectpicker input_y" name="thirdParty_cityId">
							</select>
                            <select class="selectpicker input_y zip_y" name="thirdParty_zipCode">
                                <option value="">選擇鄉鎮市區</option>
                            </select>
							<input type="text" class="input_s" id="thirdParty_linerName" name="thirdParty_linerName">
                            
                            <select class="selectpicker input_y liner_y" name="thirdParty_liner">
                                <option value="">選擇村/里</option>
                            </select>
                            <input type="text" class="input_s" name="thirdParty_neighborhood"> 
							<span>鄰</span>
                            <input type="text" class="input_m" name="thirdParty_address">
                        </div>
                    </div>
                </div>-->
            </div>
            <div class="parents" id="spouse">
                <a href="#" class="Millia">
                    <img class="closeBtn" src="img/phoneclose.png" alt="close">
                    <img class="openBtn" src="img/phoneopen.png" alt="open">
                </a>
                <h3 class="snopy spouse"><span class="oneLine" id="spouseTitle">配偶</span>
                 <span class="sspy">
                       <span class="oneLine">
                        <div class="left">
                            <p class="stringOrRadio"></p>
                        </div>
                     </span>
                       <span class="oneLine">
                        <div class="right radioGuarantor" style="display:none">
                            <div class="sp">
                               <input type="radio" name="spouse_purchaser" id="spoT" class="css-checkbox_c">
                                <label for="spoT" class="css-label_c" >是</label>
                                <input type="radio" name="spouse_purchaser" id="spoF" class="css-checkbox_c">
                                <label for="spoF" class="css-label_c" >否</label>
                            </div>
                       ) </div>
                     </span>
                    </span>
                    <div class="error-msg" id="tip3" style="display:none">請勾選是否擔任連帶保證人</div> 

            </h3>
                <div class="famy">
                    <div class="famyInner">
                        <div class="joy finp">
                            <div class="left">
                                <p>身分證字號</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="spouse_id">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>姓名</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="spouse_name">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>生日</p>
                            </div>
                            <div class="right">
                                民國
                                <input type="text" class="input_s" name="spouse_birthday0"> 年
                                <input type="text" class="input_s" name="spouse_birthday2"> 月
                                <input type="text" class="input_s" name="spouse_birthday4"> 日
                                <div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="famy">
                    <div class="famyInner">
                        <div class="joy finp">
                            <div class="left">
                                <p>戶籍電話</p>
                            </div>
                            <div class="right">
                                (
                                <input type="text" class="input_s" name="spouse_regionCode_domi"> )
                                <input type="text" class="input_m" name="spouse_phone_domi">
								<div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>-->
                <div class="famy">
                    <div class="famyInner">
                        <div class="joy finp">
                            <div class="left">
                                <p>通訊電話</p>
                            </div>
                            <div class="right">
                                (
                                <input type="text" class="input_s" name="spouse_regionCode"> )
                                <input type="text" class="input_m" name="spouse_phone">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                        <div class="joy finp">
                            <div class="left">
                                <p>行動電話</p>
                            </div>
                            <div class="right">
                                <input type="text" class="input_L" name="spouse_mobile">
                                <div class="error-msg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sodif" id="domicileAddr">
                    <div class="joy finp">
                        <div class="left">
                            <p>戶籍地址</p>
                        </div>
                        <div class="right">
                            <div class="sp mb10">
                                <div class="radioArea">
                                    <input type="checkbox" name="R_address_sp" id="R_address_1_spouse" class="css-checkbox">
                                    <label for="R_address_1_spouse" class="css-label radGroup2">同申請人戶籍地址</label>
                                </div>
                                <div class="radioArea" style="display:none">
                                    <input type="radio" name="R_address_sp" id="R_address_2_sp" class="css-checkbox_c">
                                    <label for="R_address_2_sp" class="css-label_c radGroup2">同申請人通訊地址</label>
                                </div>
                            </div>
                            <select class="selectpicker input_y" name="spouse_cityId_domi">

                            </select>
                            <select class="selectpicker input_y zip_y" name="spouse_zipCode_domi">
                                <option value="">選擇鄉鎮市區</option>
                            </select>
                            <select class="selectpicker input_y liner_y" name="spouse_liner_domi">
                                <option value="">選擇村/里</option>
                            </select>
                            <input type="text" class="input_s" name="spouse_neighborhood_domi"> 
							<span>鄰</span>
                            <input type="text" class="input_m input_wifs" name="spouse_address_domi">
                            <div class="error-msg"></div>
                        </div>
                    </div>
                    <!--<div class="joy finp">
                        <div class="left">
                            <p>通訊地址</p>
                        </div>
                        <div class="right">
                            <div class="sp mb10">
                                <div class="radioArea">
                                    <input type="radio" name="M_address_sp" id="M_address_1_sp" class="css-checkbox_c">
                                    <label for="M_address_1_sp" class="css-label_c radGroup2">同戶籍地址</label>
                                </div>
                                <div class="radioArea">
                                    <input type="checkbox" name="M_address_sp" id="M_address_2_sp" class="css-checkbox">
                                    <label for="M_address_2_sp" class="css-label radGroup2">同申請人戶籍地址</label>
                                </div>
                                <div class="radioArea" style="display:none">
                                    <input type="radio" name="M_address_sp" id="M_address_3_sp" class="css-checkbox_c">
                                    <label for="M_address_3_sp" class="css-label_c radGroup2">同申請人通訊地址</label>
                                </div>
                            </div>
                            <select class="selectpicker input_y" name="spouse_cityId">
                            </select>
                            <select class="selectpicker input_y zip_y" name="spouse_zipCode">
                                <option value="">選擇鄉鎮市區</option>
                            </select>
							<input type="text" class="input_s" id="spouse_linerName" name="spouse_linerName">
                            <select class="selectpicker input_y liner_y" name="spouse_liner">
                                <option value="">選擇村/里</option>
                            </select>
                            <input type="text" class="input_s" name="spouse_neighborhood"> 
							<span>鄰</span>
                            <input type="text" class="input_m" name="spouse_address">
                        </div>
                    </div>-->
                </div>
            </div>

        </form>

        <div class="earth nopd">
            <h3 class="casomTitle">注意事項:</h3>
            <ol class="casom">
               <!--  <li>若欲修改關係人資料，請關係人本人攜帶身分證正本及原留印鑑，至本行各<a href="" class="underblue" data-toggle="modal" data-target="#branches2">服務據點</a>辦理。</li> -->
                <li>若欲修改關係人資料，請關係人本人攜帶身分證正本及原留印鑑，至本行各<a href="https://www.fubon.com/banking/locations/locations.htm" class="underblue" target="_blank">服務據點</a>辦理。</li>
                <li>為符合「金融監督管理委員會指定非公務機關個人資料檔案安全維護辦法」之規定，本行就學貸款服務專區內，涉及個人資料之交易，部分資料將以遮蔽之方式進行保護，若導致您無法確認資料之正確性，請您至本行櫃檯辦理或洽客戶服務專線02-8751-6665按5將有專人竭誠為您服務。
                </li>
            </ol>
        </div>


        <!-- Modal -->
        <div class="modal fade pomodal" id="branches2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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