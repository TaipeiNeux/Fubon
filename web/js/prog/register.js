$(document).ready(function() {

    //定義每個步驟要對應的javascript function
    var stepEventHandler = {
        "register1": register1,
        "register2": register2,
        "register3": register3,
        "register4": register4
    };

    var nextEventHanlder = {
        "register1": register1_valid,
        "register2": register2_valid
    };

    g_ajax({
        url: 'flow?action=continue&flowId=register',
        //url: 'json/register1.json',
        //url: 'json/register2.json',
        //url: 'json/register3.json',
        //url: 'json/register4.json',
        data: {},
        callback: function(content) {

            //開始長流程畫面
            buildFlow(content, stepEventHandler, nextEventHanlder);
        }
    });

});

function register1(content){
    
    console.debug(content);

    $('.memberTerms').append( content.memberTerms );
    $('.obligations').append( content.obligations );
    
    /** toogle click **/
    $('.toggleBtn a.green').on('click', function(ev){
		ev.preventDefault();
        var targetEle = $( '.'+ $(this).parent().attr('toggleTarget') );

        if( $(this).hasClass('toggleOpen') ){
            targetEle.css('height', (parseInt(targetEle.css('height'))*4+20)+'px');
            $(this).next().removeClass('hidden');
            $(this).addClass('hidden');
        } else {
            targetEle.css('height', ((parseInt(targetEle.css('height'))-20)/4)+'px');
            $(this).prev().removeClass('hidden');
            $(this).addClass('hidden');
        }
    });
	
	
	/*2016-06-02 added by titan for unbind preBtn*/
	var nextBtn = $('div.nextBtn');
	var prev = nextBtn.find('.prev');
	prev.off('click').on('click',function(ev){
		ev.preventDefault();
		
		window.location = 'index.jsp';
    });
	
} // end register1 function

function register2(content){

    $('[name="userAccount"], [name="userPwd"], [name="userPwdCheck"], [name="id"]').blur(function(){
        $(this).val( $(this).val().toUpperCase() );
    });
} // end register2 function

function register3(content) {
    console.debug('register3', content);

    //把得到的資料塞進畫面中
    //
    //取得的user資料
    var id = content.id;
    var name = content.name;
    var birthday = content.birthday;
    var mobile = content.mobile;
    var email = content.email;
    var account = content.account;
    var password = content.password;

    //畫面上要顯示的user資料之tag id
    var userId = $('#userID');
    var userName = $('#userName');
    var userBirthday = $('#userBirthday');
    var userMobile = $('#userMobile');
    var userEmail = $('#userEmail');
    var userAccount = $('#userAccount');
    var userPwd = $('#userPwd');

    userId.text(id);
    userName.text(name);
    userBirthday.text('民國'+birthday.substring(0,3)+'年'+birthday.substring(3,5)+'月'+birthday.substring(5,7)+'日');
    userMobile.text(mobile.substring(0,4)+'-'+mobile.substring(4,7)+'-'+mobile.substring(7,10));
    userEmail.text(email);
    userAccount.text(account);

    var pwdStr = ''
    for(var i=0; i<password.length; ++i){
        pwdStr += '●';
    }
    userPwd.text(pwdStr);
} // end register3 function

function register4(content) {
    console.debug('register4', content);

    //把得到的資料塞進畫面中
    //
    //取得的user資料
    var result = content.registerResult;
    var date = content.registerDate;
    var time = content.registerTime;
	var errorCode = content.errorCode;
	var errorMsg = content.errorMsg;

    //畫面上要顯示的user資料之tag id
    var registerResult = $('#registerResult');
    var registerDate = $('#registerDate');
    var registerTime = $('#registerTime');

	var resultMsg = '';
	
	if(result == 'success') {
		resultMsg = '申請成功';
	}
	else {
	
		//2016-07-06 added by titan加上當errorCode是10的時候，要顯示html
		if(errorCode == '10') {
			errorMsg = '該身分證字號已為本服務專區會員，請您於<a href="index.jsp" class="underline blue">首頁</a>直接登入。<br>若您已忘記使用者代碼或密碼，可點選[首頁&gt;<a href="forgetPassword.jsp" class="underline blue">忘記代碼/密碼</a>]功能進行重設。';
		}
	
		resultMsg = '申請失敗('+errorCode+')' + errorMsg;
	}
	
    registerResult.html( resultMsg );
    registerResult.addClass( (result == 'success')? 'nike': 'deny' );
    registerDate.text(date.substr(0,4) + '/' + date.substr(5,2) + '/' + date.substr(8,2));
    registerTime.text(time);
	
	//若失敗則不顯示登入
	if(result != 'success') {
		$('.antcoco:eq(1)').hide();
	}
	
	//首頁：登入綁身份證轉大寫
	$('[name="studentId"]').on('blur', function(ev) {
	    ev.preventDefault();

	    $(this).val($(this).val().toUpperCase());
	});
	
	var logInBtn = $('.loginBtn');
	logInBtn.on('click', function(ev) {
		ev.preventDefault();
		memberLogin();
	});
	
} // end register4 function

/** Register Valid **/

function register1_valid() {

    /** 確認勾選同意事項 **/
    var checkBoxEle = $('input[name="purchaser"]');
    //console.log('register1_valid', checkBoxEle.prop('checked'));
    if( !checkBoxEle.prop('checked') ){
        checkBoxEle.parent().find('.error-msg').text('請勾選');
    } else {
        checkBoxEle.parent().find('.error-msg').text('');
		return true;
    }

} // end register1_valid function

function register2_valid() {
    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: [{
            name: 'id',
            msg: '身分證字號'
        }, {
            name: 'name',
            msg: '姓名'
        }, {
            name: 'birthday_y',
            msg: '生日',
            group: 'birthday'
        }, {
            name: 'birthday_m',
            msg: '生日',
            group: 'birthday'
        }, {
            name: 'birthday_d',
            msg: '生日',
            group: 'birthday'
        }, {
            name: 'cellPhone',
            msg: '行動電話，如有疑問，請洽客戶服務專線02-8751-6665按5'
        }, {
            name: 'email',
            msg: 'Email，如有疑問，請洽客戶服務專線02-8751-6665按5'
        }, {
            name: 'userAccount',
            msg: '使用者代碼'
        }, {
            name: 'userPwd',
            msg: '使用者密碼'
        }, {
            name: 'userPwdCheck',
            msg: '使用者密碼'
        }],
        validIdentity: [{
            name: 'id',
            msg: '身分證字號',
            allowEmpty : false
        }],
        validNumber: [{
            name: 'birthday_y',
            /** --start  0629  驗證訊息為 : 限輸入錯字, 沒有生日  **/
            msg: '',
            /** --end  0629  驗證訊息為 : 限輸入錯字, 沒有生日  **/
            allowEmpty : false,
            group: 'birthday'
        }, {
            name: 'birthday_m',
            /** --start  0629  驗證訊息為 : 限輸入錯字, 沒有生日  **/
            msg: '',
            /** --end  0629  驗證訊息為 : 限輸入錯字, 沒有生日  **/
            allowEmpty : false,
            group: 'birthday'
        }, {
            name: 'birthday_d',
            /** --start  0629  驗證訊息為 : 限輸入錯字, 沒有生日  **/
            msg: '',
            /** --end  0629  驗證訊息為 : 限輸入錯字, 沒有生日  **/
            allowEmpty : false,
            group: 'birthday'
        }, {
            name: 'cellPhone',
            msg: '',
            allowEmpty : false
        }
        ],
        validDecimal: [],
        validChinese: [{
            name: 'name',
            /** --start 0629  忠毅 register的錯誤訊息是: 限輸入中文字 (沒有姓名)  **/
            msg: ''
            /** --end 0629  忠毅 register的錯誤訊息是: 限輸入中文字 (沒有姓名)  **/
        }],
        validEmail: [{
            name: 'email',
            msg: 'Email'
        }],
        validMobile: [{
            name: 'cellPhone',
            msg: '行動電話'
        }],
        validDate: [{
            name: ['birthday_y', 'birthday_m', 'birthday_d'],
            msg: '生日',
            splitEle: '/',
            format: 'ch',
            allowEmpty: false,
            group: 'birthday'
        }],
        errorDel: [],
        customizeFun: function(customizeValidResult) {

            var user_id = $('[name="id"]').val();
            if (user_id.length < 10 || user_id.length > 10) {
                customizeValidResult.push({
                    obj: $('[name="id"]'),
                    /** --start 0629  忠毅 SRS: 輸入長度不符  **/ 
                    msg: '輸入長度不符'
                    //msg: '身分證字號輸入長度不符'
                });
            }

            var user_name = $('[name="name"]').val();
            if (user_name.length < 2 ) {
                customizeValidResult.push({
                    obj: $('[name="name"]'),
                    /** --start 0629  忠毅 register的錯誤訊息是: 姓名格式錯誤  **/ 
                    msg: '姓名格式錯誤'
                    /** --end 0629  忠毅 register的錯誤訊息是: 姓名格式錯誤  **/
                });
            }
            /**  0629--start 忠毅 改成上限 20 個字 **/
			else if (user_name.length > 20) {
            /**  0629--end 忠毅 改成上限 20 個字 **/
                customizeValidResult.push({
                    obj: $('[name="name"]'),
                    msg: '姓名長度過長'
                });
            }

            var birth = new Date(parseInt($('[name="birthday_y"]').val())+1911, $('[name="birthday_m"]').val(), $('[name="birthday_d"]').val());
            var today = new Date();
            var b_birthNow = birth - today;

            if( b_birthNow > 0 ){

                /** --start  0629 若已有生日錯誤出現,則不要在顯示   **/
                var birth_check = 0;
                $('.error-msg').each(function(){

                    var str1 = "生日格式";
                    var str2 = $(this).text();
                    var s_num = str1.indexOf(str2);
                 //   alert(str2);
                    if ( s_num >= 0)
                        birth_check++;
                });

                if( birth_check == 0 ){
                    
                    customizeValidResult.push({
                        obj: $('[name="birthday_y"]'),
                        msg: '生日格式錯誤'
                    });
                }   
                /** --end  0629 若已有生日錯誤出現,則不要在顯示   **/
            }

            var user_email = $('[name="email"]').val();
            if (user_email.length > 40) {
                customizeValidResult.push({
                    obj: $('[name="email"]'),
                    msg: 'Email格式錯誤'
                });
            }

            var user_account = $('[name="userAccount"]').val(), account_minLen = 6, account_maxLen = 10;
            if (user_account.length<account_minLen || user_account.length>account_maxLen) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    /**  0629 只有輸入長度不符  **/
                    msg: '輸入長度不符'
                });
            } else if(!isValidChar(user_account)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    /** --start 0629  忠毅 SRS: 限輸入英數字  **/ 
                    msg: '限輸入英數字'
                    //msg: '使用者代碼限輸入英數字'
                });

            } else if(!isNumericAlphabetMix(user_account)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    /** --start 0629  忠毅 SRS: 須包含英文及數字  **/ 
                    msg: '須包含英文及數字'
                    //msg: '使用者代碼須包括英文及數字'
                });

            } else if(isSameChar(user_account)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼不得為相同數字或字元'
                });

            } else if(isContinuousChar(user_account, account_maxLen)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼不得為連續數字或字元'
                });
            } else {
                var errMsg = isSubstr(user_account,
                    [{
                        val: user_id,
                        text: '身分證字號'
                    },{
                        val: $('[name="birthday_y"]').val()+$('[name="birthday_m"]').val()+$('[name="birthday_d"]').val(),
                        text: '生日'
                    }]
                );

                if(errMsg != '') {
                    customizeValidResult.push({
                        obj: $('[name="userAccount"]'),
                        msg: ''+errMsg
                    });
                }
            }

            var user_pwd = $('[name="userPwd"]').val(), pwd_minLen = 6, pwd_maxLen = 16;
            if (user_pwd.length<pwd_minLen || user_pwd.length>pwd_maxLen) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    /** --start 0629  忠毅 SRS: 輸入長度不符  **/ 
                    msg: '輸入長度不符'
                    //msg: '使用者密碼輸入長度不符'

                });
            } else if(!isValidChar(user_pwd)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    /** --start 0629  忠毅 SRS: 限輸入英數字  **/ 
                    msg: '限輸入英數字'
                    //msg: '使用者密碼限輸入英數字'
                });

            } else if(!isNumericAlphabetMix(user_pwd)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    /** --start 0629  忠毅 SRS: 須包含英文及數字  **/ 
                    msg: '須包含英文及數字'
                   // msg: '使用者密碼須包括英文及數字'
                });

            } else if(isSameChar(user_pwd)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼不得為相同數字或字元'
                });

            } else if(isContinuousChar(user_pwd, pwd_maxLen)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼不得為連續數字或字元'
                });
            } else {
                var errMsg = isSubstr(user_pwd,
                    [{
                        val: user_id,
                        text: '身分證字號'
                    },{
                        val: $('[name="birthday_y"]').val()+$('[name="birthday_m"]').val()+$('[name="birthday_d"]').val(),
                        text: '生日'
                    },{
                        val: user_account,
                        
                        text: '使用者代碼'
                       }
                     ]
                    
                );

               

                if(errMsg != '')  {
                    customizeValidResult.push({
                        obj: $('[name="userPwd"]'),
                        msg: ''+errMsg
                    });
                }
            }

            var user_pwd_Check = $('[name="userPwdCheck"]').val();
            if( user_pwd_Check !== user_pwd ){
                customizeValidResult.push({
                    obj: $('[name="userPwdCheck"]'),
                    msg: '確認密碼錯誤'
                });
            }
            
        } // end customizeFun
    }); // end validForm

    //alert(res);
    if (res == true) {
        return true;
    } else {
        return false;
    }
} // end register2_valid function


