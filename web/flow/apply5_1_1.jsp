<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>
	
	<input type="hidden" class="fileSize" name="idCardPosition_hidden" value="">
       <input type="hidden" class="fileSize" name="idCardNegative_hidden" value="">
       <input type="hidden" class="fileSize" name="registration_hidden" value="">
       <input type="hidden" class="fileSize" name="lowIncome_hidden" value="">
	   
	   <input type="hidden" name="idCardPositionViewName_hidden" value="">
       <input type="hidden" name="idCardNegativeViewName_hidden" value="">
       <input type="hidden" name="registrationViewName_hidden" value="">
       <input type="hidden" name="lowIncomeViewName_hidden" value="">
	
	<div class="wrap">
        <h3 class="snopy pen">申請人基本資料</h3>
        <div class="dan" id="applicant">
            <h2 class="who">申請人</h2>
            <div class="editBtnBoxbottom">
                <a href="apply.jsp?step=apply1_1" class="editBtn">修改</a>
            </div>
            <div class="may">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>身分證字號</p>
                    </div>
                    <div class="right">
                        <p name="applicant_id"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>姓名</p>
                    </div>
                    <div class="right">
                        <p name="applicant_name"></p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>生日</p>
                    </div>
                    <div class="right">
                        <p name="applicant_birthday"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>婚姻狀況</p>
                    </div>
                    <div class="right">
                        <p name="applicant_marryStatus"></p>
                    </div>
                </div>
            </div>
            <div class="may omega">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>戶籍電話</p>
                    </div>
                    <div class="right">
                        <p name="applicant_phone_domi"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>通訊電話</p>
                    </div>
                    <div class="right">
                        <p name="applicant_phone">(02)</p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>行動電話</p>
                    </div>
                    <div class="right">
                        <p name="applicant_mobile"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>Email</p>
                    </div>
                    <div class="right">
                        <p name="applicant_email">asd</p>
                    </div>
                </div>
            </div>
            <div class="maya">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>戶籍地址</p>
                    </div>
                    <div class="right">
                        <p name="applicant_address_domi"></p>
                    </div>
                </div>
            </div>
            <div class="maya">
                <div class="joy abon">
                    <div class="left">
                        <p>通訊地址</p>
                    </div>
                    <div class="right">
                        <p name="applicant_address">新北市板橋區</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="dan">
            <h2 class="home">家庭狀況</h2>
            <div class="editBtnBoxbottom">
                <a href="apply.jsp?step=apply1_2" class="editBtn">修改</a>
            </div>
            <div class="maya">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>家庭狀況</p>
                    </div>
                    <div class="right">
                        <p id="status1"></p>
                        <!--<p class="stF" id="status2"></p>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="wrap">
        <h3 class="snopy pen mt40">關係人基本資料</h3>

        <div class="dan" id="father">
            <h2 class="father">父親
                <span id="isGuarantor_father">(為連帶保證人/合計所得對象）</span>
              </h2>
            <div class="editBtnBoxbottom">
                <a href="apply.jsp?step=apply2" class="editBtn">修改</a>
            </div>
            <div class="may">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>身分證字號</p>
                    </div>
                    <div class="right">
                        <p name="father_id"></p>
                    </div>
                </div>
                
                <div class="joy abon">
                    <div class="left">
                        <p>姓名</p>
                    </div>
                    <div class="right">
                        <p name="father_name"></p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>生日</p>
                    </div>
                    <div class="right">
                        <p name="father_birthday"></p>
                    </div>
                </div>
            </div>
            <div class="may omega">
                <!--<div class="joy abon bgfff">
                    <div class="left">
                        <p>戶籍電話</p>
                    </div>
                    <div class="right">
                        <p name="father_phone_domi"></p>
                    </div>
                </div>-->
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>通訊電話</p>
                    </div>
                    <div class="right">
                        <p name="father_phone"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>行動電話</p>
                    </div>
                    <div class="right">
                        <p name="father_mobile"></p>
                    </div>
                </div>
            </div>
            <div class="maya">
                <div class="joy abon">
                    <div class="left">
                        <p>戶籍地址</p>
                    </div>
                    <div class="right">
                        <p name="father_addr_domi"></p>
                    </div>
                </div>
            </div>
            <!--<div class="maya">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>通訊地址</p>
                    </div>
                    <div class="right">
                        <p name="father_addr"></p>
                    </div>
                </div>
            </div>-->
        </div>
        <div class="dan" id="mother">
            <h2 class="mather">母親
                <span id="isGuarantor_mother">(為連帶保證人/合計所得對象)</span>
              </h2>
            <div class="editBtnBoxbottom">
                <a href="apply.jsp?step=apply2" class="editBtn">修改</a>
            </div>
            <div class="may">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>身分證字號</p>
                    </div>
                    <div class="right">
                        <p name="mother_id"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>姓名</p>
                    </div>
                    <div class="right">
                        <p name="mother_name"></p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>生日</p>
                    </div>
                    <div class="right">
                        <p name="mother_birthday"></p>
                    </div>
                </div>
            </div>
            <div class="may omega">
                <!--<div class="joy abon bgfff">
                    <div class="left">
                        <p>戶籍電話</p>
                    </div>
                    <div class="right">
                        <p name="mother_phone_domi"></p>
                    </div>
                </div>-->

                <div class="joy abon bgfff">
                    <div class="left">
                        <p>通訊電話</p>
                    </div>
                    <div class="right">
                        <p name="mother_phone"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>行動電話</p>
                    </div>
                    <div class="right">
                        <p name="mother_mobile"></p>
                    </div>
                </div>
            </div>
            <div class="maya">
                <div class="joy abon">
                    <div class="left">
                        <p>戶籍地址</p>
                    </div>
                    <div class="right">
                        <p name="mother_addr_domi"></p>
                    </div>
                </div>
            </div>
            <!--<div class="maya">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>通訊地址</p>
                    </div>
                    <div class="right">
                        <p name="mother_addr"></p>
                    </div>
                </div>
            </div>-->
        </div>
        <div class="dan" id="thirdParty">
            <h2 class="thirdParty">第三人
                <span id="isGuarantor_thirdParty">(為連帶保證人/合計所得對象）</span>
              </h2>
            <div class="editBtnBoxbottom">
                <a href="apply.jsp?step=apply2" class="editBtn">修改</a>
            </div>
            <div class="may">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>身分證字號</p>
                    </div>
                    <div class="right">
                        <p name="thirdParty_id"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>姓名</p>
                    </div>
                    <div class="right">
                        <p name="thirdParty_name"></p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>生日</p>
                    </div>
                    <div class="right">
                        <p name="thirdParty_birthday"></p>
                    </div>
                </div>
            </div>
            <div class="may omega">
                <!--<div class="joy abon bgfff">
                    <div class="left">
                        <p>戶籍電話</p>
                    </div>
                    <div class="right">
                        <p name="thirdParty_phone_domi"></p>
                    </div>
                </div>-->
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>通訊電話</p>
                    </div>
                    <div class="right">
                        <p name="thirdParty_phone"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>行動電話</p>
                    </div>
                    <div class="right">
                        <p name="thirdParty_mobile"></p>
                    </div>
                </div>
            </div>
            <div class="maya">
                <div class="joy abon">
                    <div class="left">
                        <p>戶籍地址</p>
                    </div>
                    <div class="right">
                        <p name="thirdParty_addr_domi"></p>
                    </div>
                </div>
                <!--<div class="maya">
                    <div class="joy abon bgfff">
                        <div class="left">
                            <p>通訊地址</p>
                        </div>
                        <div class="right">
                            <p name="thirdParty_addr"></p>
                        </div>
                    </div>
                </div>-->
            </div>
        </div>
        <div class="dan" id="spouse">
            <h2 class="spouse">配偶
                <span id="isGuarantor_spouse">(為連帶保證人/合計所得對象）</span>
              </h2>
            <div class="editBtnBoxbottom">
                <a href="apply.jsp?step=apply2" class="editBtn">修改</a>
            </div>
            <div class="may">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>身分證字號</p>
                    </div>
                    <div class="right">
                        <p name="spouse_id"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>姓名</p>
                    </div>
                    <div class="right">
                        <p name="spouse_name"></p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>生日</p>
                    </div>
                    <div class="right">
                        <p name="spouse_birthday"></p>
                    </div>
                </div>
            </div>
            <div class="may omega">
                <!--<div class="joy abon bgfff">
                    <div class="left">
                        <p>戶籍電話</p>
                    </div>
                    <div class="right">
                        <p name="spouse_phone_domi"></p>
                    </div>
                </div>-->
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>通訊電話</p>
                    </div>
                    <div class="right">
                        <p name="spouse_phone"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>行動電話</p>
                    </div>
                    <div class="right">
                        <p name="spouse_mobile"></p>
                    </div>
                </div>
            </div>
            <div class="maya">
                <div class="joy abon">
                    <div class="left">
                        <p>戶籍地址</p>
                    </div>
                    <div class="right">
                        <p name="spouse_addr_domi"></p>
                    </div>
                </div>
                <!--<div class="maya">
                    <div class="joy abon bgfff">
                        <div class="left">
                            <p>通訊地址</p>
                        </div>
                        <div class="right">
                            <p name="spouse_addr"></p>
                        </div>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
    <div class="wrap">
        <h3 class="snopy pen mt40">就讀學校及申貸金額
            </h3>

        <div class="dan" id="student">
            <h2 class="hat">就讀學校</h2>
            <div class="editBtnBoxbottom">
                <a href="apply.jsp?step=apply3_1" class="editBtn">修改</a>
            </div>
            <div class="may">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>教育階段</p>
                    </div>
                    <div class="right">
                        <p name="student_EducationStage">大學</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>學校名稱</p>
                    </div>
                    <div class="right">
                        <p name="student_name">私立 銘傳大學</p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>科系所</p>
                    </div>
                    <div class="right">
                        <p name="student_department">中國語文學系</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>在職專班</p>
                    </div>
                    <div class="right">
                        <p name="student_onTheJob">否</p>
                    </div>
                </div>
            </div>
            <div class="may omega">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>升學年級</p>
                    </div>
                    <div class="right">
                        <p name="student_class">一年甲班</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>學號</p>
                    </div>
                    <div class="right">
                        <p name="student_id">498523185</p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>入學日期</p>
                    </div>
                    <div class="right">
                        <p name="student_month_enter"></p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>預計畢業時間</p>
                    </div>
                    <div class="right">
                        <p name="student_month_graduation"></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="dan moneyAlign">
            <h2 class="appmoney">申貸金額
              </h2>
            <div class="editBtnBoxbottom">
                <a href="apply.jsp?step=apply3_2" class="editBtn">修改</a>
            </div>
            <div class="may">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>學雜費</p>
                    </div>
                    <div class="right">
                        <p class="student_credit">0</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>學校平安保險</p>
                    </div>
                    <div class="right">
                        <p class="student_FPA">0</p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>實習費</p>
                    </div>
                    <div class="right">
                        <p class="student_practice">0</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>音樂指導費</p>
                    </div>
                    <div class="right">
                        <p class="student_music">0</p>
                    </div>
                </div>
            </div>
            <div class="may omega">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>書籍費</p>
                    </div>
                    <div class="right">
                        <p class="student_book">0</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>住宿費</p>
                    </div>
                    <div class="right">
                        <p class="student_live">0</p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>海外研習費</p>
                    </div>
                    <div class="right">
                        <p class="student_abroad">0</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>生活費</p>
                    </div>
                    <div class="right">
                        <p class="student_life">0</p>
                    </div>
                </div>
            </div>
            <div class="maya">
                <div class="joy swataX bgfff">
                    <div class="left noob">
                        <p>應扣除教育補助費或助學公費</p>
                        <p class="student_publicExpense">0</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="dan jam">
            <div class="appcont">本次申貸金額
                <span class="student_sum totalMoney"></span><span class="bill">元</span>
            </div>
        </div>

    </div>
    <div class="wrap">
        <h3 class="snopy pen mt40">上傳文件
            </h3>
            <div class="error-msg" id="documentType" style="display:none">上傳檔案格式限PNG、JPG、PDF、TIF、GIF</div>
            <div class="error-msg" id="documentLength" style="display:none">上傳檔案名稱限20個字</div>
			<div class="error-msg" id="documentSize" style="display:none">上傳檔案大小合計限10MB</div>
        <table class="mqua">
            <thead>
                <tr>
                    <th colspan="2">檔案名稱</th>
                    <th>檔案上傳</th>
                    <th>預覽</th>
                </tr>
            </thead>
            <tbody id="uploadObj">
                <tr>
                    <td class="file-photo">
                        <a>
                            <img id="idPositivePhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">身份證正面影本</td>
                    <td class="file-en" id="idPositiveImg">無</td>
                    <td class="file-modify"><a id="idPositiveChange" style="display:none">修改檔案</a>
						<input type="file" name="isPositiveFile" style="position: absolute;top: 18px;opacity: 0;">
					</td>
                    <td class="file-upload"><a id="idPositiveUpload">上傳檔案</a>
                        <input type="file" name="isPositiveFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-view">
                        <a id="idPositiveView" class=""></a>
                    </td>

                </tr>

                <tr>
                    <td class="clickView" colspan="4" style="display:none" id="pos">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="idPositiveViewImg" src="img/dh.jpg">-->
                                <iframe id="idPositiveViewImg" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td class="file-photo">
                        <a>
                            <img id="idNegativePhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">身份證反面影本</td>
                    <td class="file-en" id="idNegativeImg">無</td>
                    <td class="file-modify"><a id="idNegativeChange" style="display:none">修改檔案</a>
						<input type="file" name="isPositiveFile" style="position: absolute;top: 18px;opacity: 0;">
					</td>
                    <td class="file-upload"><a id="idNegativeUpload">上傳檔案</a>
                        <input type="file" name="isNegativeFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-view">
                        <a id="idNegativeView"></a>
                    </td>
                </tr>

                <tr>
                    <td class="clickView" colspan="4" style="display:none" id="neg">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="idNegativeViewImg" src="img/dh.jpg">-->
                                <iframe id="idNegativeViewImg" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td class="file-photo">
                        <a>
                            <img id="registerPhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">註冊繳費單
                        <span>（含註冊繳費單、住宿費用）</span>
                    </td>
                    <td class="file-en" id="registerImg">無</td>
                    <td class="file-modify"><a id="registerChange" style="display:none">修改檔案</a>
						<input type="file" name="isPositiveFile" style="position: absolute;top: 18px;opacity: 0;">
					</td>
                    <td class="file-upload"><a id="registerUpload">上傳檔案</a>
                        <input type="file" name="registerFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-view">
                        <a id="registerView"></a>
                    </td>
                </tr>

                <tr>
                    <td class="clickView" colspan="4" style="display:none" id="reg">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="registerViewImg" src="">-->
                                <iframe id="registerViewImg" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>
                
                
            </tbody>
        </table>
    </div>
        <div class="tip_d">
            <p>按「確認」後，本行將寄發六位數交易驗證碼至您手機號碼</p>
                <span><div class="tip_tel">0911111111</div>;</span>
            <p>若該手機號碼錯誤或5分鐘內未收到交易驗證碼，請洽客戶服務專線<span class="tip_s">02-8751-6665</span>按<span class="tip_s">5</span>。</p>
        </div>    
                    