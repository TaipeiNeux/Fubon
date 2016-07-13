<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

	
		<input type="hidden" name="branchName" value="" />
        <input type="hidden" name="branchAddr" value="" />
        <input type="hidden" name="branchTel" value="" />
        <input type="hidden" name="reservation" value="" />
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
                
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>通訊電話</p>
                    </div>
                    <div class="right">
                        <p name="spouse_phone"></p>
                    </div>
                </div>
                <div class="joy abon ">
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
                        <p class="changeText">學雜費</p>
                    </div>
                    <div class="right">
                        <p class="student_credit">0元</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>學校平安保險</p>
                    </div>
                    <div class="right">
                        <p class="student_FPA">0元</p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>實習費</p>
                    </div>
                    <div class="right">
                        <p class="student_practice">0元</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>音樂指導費</p>
                    </div>
                    <div class="right">
                        <p class="student_music">0元</p>
                    </div>
                </div>
            </div>
            <div class="may omega">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>書籍費</p>
                    </div>
                    <div class="right">
                        <p class="student_book">0元</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>住宿費</p>
                    </div>
                    <div class="right">
                        <p class="student_live">0元</p>
                    </div>
                </div>
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>海外研習費</p>
                    </div>
                    <div class="right">
                        <p class="student_abroad">0元</p>
                    </div>
                </div>
                <div class="joy abon">
                    <div class="left">
                        <p>生活費</p>
                    </div>
                    <div class="right">
                        <p class="student_life">0元</p>
                    </div>
                </div>
            </div>
            <div class="maya">
                <div class="joy swataX bgfff">
                    <div class="left noob">
                        <p>應扣除教育補助費或助學公費</p>
                        <p class="student_publicExpense">0元</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="dan jam">
            <div class="appcont">本次申貸金額
                <span class="student_sum totalMoney"></span><span class="bill"></span>
            </div>
        </div>
    </div>
    <div class="wrap">
       <h3 class="snopy pen lastTitle">對保分行</h3>
        <div class="dan bankSelect">
           <h2 style="text-indent:-9999px">對保</h2>
            <div class="editBtnBoxbottom lastBtn">
                <a href="apply.jsp?step=apply_online_4" class="editBtn">修改</a>
            </div>
            <div class="maya may storeLeft">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>預約對保分行</p>
                    </div>
                    <div class="right">
                        <p id="branchNameAddr">木新分行(台北市文山區木新路三段236號)</p>
                        <p id="branchPh">(02)2938-3791</p>
                    </div>
                </div>
            </div>
            <div class="maya may storeRight">
                <div class="joy abon bgfff">
                    <div class="left">
                        <p>預約對保時間</p>
                    </div>
                    <div class="right">
                        <p id="branchDateTime">2016/05/12 14:28:56</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
       