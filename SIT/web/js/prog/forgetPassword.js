$(document).ready(function() {

    //定義每個步驟要對應的javascript function
    var stepEventHandler = {
        "forgetPassword1": forgetPassword1,
        "forgetPassword2": forgetPassword2,
        "forgetPassword3_1": forgetPassword3_1,
        "forgetPassword3_2": forgetPassword3_2,
        "forgetPassword4": forgetPassword4
    };

    var nextEventHanlder = {
        "forgetPassword1": forgetPassword1_valid,
        "forgetPassword2": forgetPassword2_valid,
        "forgetPassword3_2": forgetPassword3_2_valid
    };
	
	var nextEventErrorHanlder = {
        "forgetPassword1": forgetPassword1_Error,
		"forgetPassword2": forgetPassword2_Error,
		"forgetPassword3_2": forgetPassword3_2_Error
    };
    
    if (jumpStep == 'null') {
        jumpStep = '';
    }

    g_ajax({
        url: 'flow?action=continue&flowId=forgetPassword',
        //url: 'json/forgetPassword1.json',
        //url: 'json/forgetPassword2.json',
        //url: 'json/forgetPassword3_1.json',
        //url: 'json/forgetPassword3_2.json',
        //url: 'json/forgetPassword4.json',
        data: {
            step: jumpStep
        },
        callback: function(content) {

            //開始長流程畫面
            buildFlow(content, stepEventHandler, nextEventHanlder,nextEventErrorHanlder);
        }
    });

});

function forgetPassword1_Error(json){
	$('div.error-msg').text('');
	$('div.error-msg:last').text(json.Header.errorMsg);
}

function forgetPassword2_Error(json){
	$('div.error-msg').text('');
	$('div.error-msg:last').text(json.Header.errorMsg);
}

function forgetPassword3_2_Error(json){
	var errorCount = json.Content.errorCount;
	errorCount = parseInt(errorCount);

	//當錯誤超過三次就改成popup，關閉後回上一頁
	if(errorCount >= 3) {
		defaultErrorHandler(json,function(){
			$('div.nextBtn .prev').removeClass('confirm').trigger('click');			
		});
	}
	else {
		$('div.error-msg').text(json.Header.errorMsg);
	}
}

function forgetPassword1(content){

    $('[name="id"]').blur(function(){
        $(this).val( $(this).val().toUpperCase() );
    });

} // end forgetPassword2 function

function forgetPassword2(content){

    var user_id = content.id, 
        user_pwd_old = content.password;

    $('<input type="hidden" name="userID" value="'+user_id+'" >').prependTo( $('.antcoco') );
    $('<input type="hidden" name="userPwd_old" value="'+user_pwd_old+'" >').prependTo( $('.antcoco') );

    $('[name="userAccount"], [name="userPwd"], [name="userPwdCheck"]').blur(function(){
        $(this).val( $(this).val().toUpperCase() );
    });

} // end forgetPassword2 function

function forgetPassword3_1(content){

    //取得的user資料
    var account = content.account;
    var password = content.password;
    var hasAppropriation = content.hasAppropriation,
        sendType = (hasAppropriation == 'Y' ? '手機號碼':' Email ' ),
        sendType_val = (hasAppropriation == 'Y' ? content.mobile : content.email );

    //畫面上要顯示的user資料之tag id
    var userAccount = $('#userAccount');
    var userPwd = $('#userPwd');
    var sendType_ele = $('span.sendType');
    var sendType_val_ele = $('span.sendType_val');

    userAccount.text(account);

    var pwdStr = ''
    for(var i=0; i<password.length; ++i){
        pwdStr += '●';
    }
    userPwd.text(pwdStr);

    sendType_ele.text(sendType);
    sendType_val_ele.text(sendType_val);
	
	if ($(window).width() <= 768) {
		$('.sendType').eq(0).after('<br>');
	}

} // end forgetPassword3_1 function

function forgetPassword3_2(content){    
    g_countdown({
        minute: 0,
        second: 3,
        modal_id: 'modal_forgetPassword_2_2',
        deadline_class: 'deadline' 
    });
    
    $('#modal_forgetPassword_2_2').on('hide.bs.modal', function () {
        window.location = 'forgetPassword.jsp?step=forgetPassword3_1';
    });
	
    // countdown({
    //     minute: 0,
    //     second: 10,
    //     modal_id: 'modal_forgetPassword_2_2',
    //     deadline_class: 'deadline' 
    // });

    /*var today = new Date();
    var deadline = today.getFullYear()+'/'+padLeft({str: (today.getMonth()+1), len: 2})+'/'+padLeft({str: today.getDate(), len: 2})+' '
                +padLeft({str: today.getHours(), len: 2})+':'+padLeft({str: (today.getMinutes()+5), len: 2})+':'+padLeft({str: today.getSeconds(), len: 2});
    $('.deadline').text( deadline );*/

    //取得的user資料
    var hasAppropriation = content.hasAppropriation,
        sendType = (hasAppropriation == 'Y' ? '手機號碼':' Email' ),
        sendType_val = (hasAppropriation == 'Y' ? content.mobile : content.email );
    var codeImg = content.code_img;
    
    
    //畫面上要顯示的user資料之tag id
    var sendType_ele = $('span.sendType');
    var sendType_val_ele = $('span.sendType_val');
    var code_img = $('#code_img');

    sendType_ele.text(sendType);
    sendType_val_ele.text(sendType_val);
    code_img.attr('src', codeImg);

} // end forgetPassword3_2 function

function countdown( conf ){

    // countdown({
    //     minute: 4,
    //     second: 59,
    //     modal_id: 'modal_forgetPassword_2_2',
    //     deadline_class: 'deadline' 
    // });

    var countdownnumber = conf.second;
    var countdownnumber_min = conf.minute;
    var countdownid;
    clearTimeout(countdownid);

    _acorssDay();
    countdownfunc();

    function tmp_padLeft(conf){
        var str = conf.str.toString();
        if(str.length >= conf.len)
            return str;
        else
            return tmp_padLeft({str: '0'+str, len: conf.len});
    } // end padLeft function


    function countdownfunc(){
        var tmp_time = tmp_padLeft({str: countdownnumber_min, len: 2})+':'+tmp_padLeft({str: countdownnumber, len: 2});
        $('.death').html(tmp_time);

        if (countdownnumber==0 && countdownnumber_min ==0 ){ 
            $("#"+conf.modal_id).modal('show');

            $('#'+conf.modal_id+' a.submitBtn').on('click', function(){
                $("#"+conf.modal_id).modal('hide');

                location.reload();
            }); 

            clearTimeout(countdownid);
        }
        else if(countdownnumber == -1){

            countdownnumber_min--;
            countdownnumber = 59;
            countdownid=setTimeout(countdownfunc,10);
        }
        else{
            countdownnumber--;
            countdownid=setTimeout(countdownfunc,1000);
        }
    }
    
    function _acorssDay(){
        var d_all = new Date();
        var d = new Date( d_all.getFullYear(), d_all.getMonth() , d_all.getDate() , d_all.getHours(), d_all.getMinutes()+5 , d_all.getSeconds() );
        
        var tmp_time = tmp_padLeft({str: d.getMinutes(), len: 2})+':'+tmp_padLeft({str: d.getSeconds(), len: 2});
        $("."+countdown.deadline).html( d.getFullYear()+'/'+(d.getMonth())+'/'+d.getDate()+' '+d.getHours()+':'+ tmp_time );
       
    }   

} // end countdown function

function padLeft(conf){
    var str = conf.str.toString();
    if(str.length >= conf.len)
        return str;
    else
        return padLeft({str: '0'+str, len: conf.len});
} // end padLeft function

function forgetPassword4(content) {
    
    //取得的user資料
    var result = content.forgetPasswordResult;
    var date = content.forgetPasswordDate;
    var time = content.forgetPasswordTime;

    //畫面上要顯示的user資料之tag id
    var forgetPasswordResult = $('#forgetPasswordResult');
    var forgetPasswordDate = $('#forgetPasswordDate');
    var forgetPasswordTime = $('#forgetPasswordTime');

    forgetPasswordResult.text( (result == 'success')? '申請成功':'申請失敗' );
    forgetPasswordResult.addClass( (result == 'success')? 'nike': 'deny' );
    forgetPasswordDate.text(date);
    forgetPasswordTime.text(time);

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
	
} // end forgetPassword4 function


/** forgetPassword Valid **/


function forgetPassword1_valid() {

    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: [{
            name: 'id',
            msg: '身分證字號'
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
        }],
        validIdentity: [{
            name: 'id',
            msg: '身分證字號',
            allowEmpty : false
        }],
        validNumber: [{
            name: 'birthday_y',
            msg: '生日',
            allowEmpty : false,
            group: 'birthday'
        }, {
            name: 'birthday_m',
            msg: '生日',
            allowEmpty : false,
            group: 'birthday'
        }, {
            name: 'birthday_d',
            msg: '生日',
            allowEmpty : false,
            group: 'birthday'
        }],
        validDecimal: [],
        validChinese: [],
        validEmail: [],
        validMobile: [],
        validDate: [{
            name: ['birthday_y', 'birthday_m', 'birthday_d'],
            msg: '生日',
            //val: $('[name="birthday_y"]').val()+'/'+$('[name="birthday_m"]').val()+'/'+$('[name="birthday_d"]').val(),
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
                    msg: '身分證字號輸入長度不符'
                });
            }

            var birth = new Date(parseInt($('[name="birthday_y"]').val())+1911, $('[name="birthday_m"]').val(), $('[name="birthday_d"]').val());
            var today = new Date();
            var b_birthNow = birth - today;

            if( b_birthNow > 0){
                customizeValidResult.push({
                    obj: $('[name="birthday_y"]'),
                    msg: '生日格式錯誤',
                    group: 'birthday'
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
} // end forgetPassword1_valid function

function forgetPassword2_valid() { // 不可與前次密碼相同

    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: [{
            name: 'userAccount',
            msg: '使用者代碼'
        }, {
            name: 'userPwd',
            msg: '使用者密碼'
        }, {
            name: 'userPwdCheck',
            msg: '使用者密碼確認'
        }],
        validIdentity: [],
        validNumber: [],
        validDecimal: [],
        validEmail: [],
        validDate: [],
        errorDel: [],
        customizeFun: function(customizeValidResult) {

            var user_id = $('[name="userID"]').val(),
                user_pwd_old = $('[name="userPwd_old"]').val();

            var user_account = $('[name="userAccount"]').val(), account_minLen = 6, account_maxLen = 10;
            if (user_account.length<account_minLen || user_account.length>account_maxLen) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼輸入長度不符'
                });
            } else if(!isValidChar(user_account)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼限輸入英數字'
                });

            } else if(!isNumericAlphabetMix(user_account)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼須包括英文及數字'
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
                    }]
                );

                if(errMsg != '') {
                    customizeValidResult.push({
                        obj: $('[name="userAccount"]'),
                        msg: '使用者代碼'+errMsg
                    });
                }
            }

            var user_pwd = $('[name="userPwd"]').val(), pwd_minLen = 6, pwd_maxLen = 16;
            if (user_pwd.length<pwd_minLen || user_pwd.length>pwd_maxLen) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼輸入長度不符'
                });
            } else if(!isValidChar(user_pwd)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼限輸入英數字'
                });

            } else if(!isNumericAlphabetMix(user_pwd)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼須包括英文及數字'
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
            } /*else if( user_pwd !== user_pwd_old ){
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '新的使用者密碼不可與原使用者密碼相同'
                });
            } */else {
                var errMsg = isSubstr(user_pwd,
                    [{
                        val: user_id,
                        text: '身分證字號'
                    },{
                        val: user_account,
                        text: '使用者代碼'
                    }]
                );

                if(errMsg != '') {
                    customizeValidResult.push({
                        obj: $('[name="userPwd"]'),
                        msg: '使用者密碼'+errMsg
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

} // end forgetPassword2_valid function

function forgetPassword3_2_valid() {

    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: [{
            name: 'codeInput',
            msg: '交易驗證碼'
        }],
        validIdentity: [],
        validNumber: [],
        validDecimal: [],
        validEmail: [],
        validDate: [],
        errorDel: [],
        customizeFun: function(customizeValidResult) {

            var codeInput = $('[name="codeInput"]').val(), code_Len = 6;
            if (codeInput.length != code_Len) {
                customizeValidResult.push({
                    obj: $('[name="codeInput"]'),
                    msg: '限輸入 '+code_Len+' 位數字'
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
} // end forgetPassword3_2_valid function

