$(document).ready(function() {

    //定義每個步驟要對應的javascript function
    var stepEventHandler = {
        "changePwd1": changePwd1,
        "changePwd2_1": changePwd2_1,
        "changePwd2_2": changePwd2_2,
        "changePwd3": changePwd3
    };

    var nextEventHanlder = {
        "changePwd1": changePwd1_valid,
        "changePwd2_2": changePwd2_2_valid
    };
	
	var nextEventErrorHanlder = {
        "changePwd1": changePwd1_Error,
		"changePwd2_2": changePwd2_2_Error
    };

    g_ajax({
        url: 'flow?action=continue&flowId=changePwd',
        //url: 'json/changePwd1.json',
        //url: 'json/changePwd2_1.json',
        //url: 'json/changePwd2_2.json',
        //url: 'json/changePwd3.json',
        data: {},
        callback: function(content) {

            //開始長流程畫面
            buildFlow(content, stepEventHandler, nextEventHanlder,nextEventErrorHanlder);
        }
    });

});


function changePwd1_Error(json) {

	$('div.error-msg:last').text(json.Header.errorMsg);
	

}

function changePwd2_2_Error(json) {

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

function changePwd1(content){

    var user_id = content.id, 
        user_pwd_old = content.password;

    $('<input type="hidden" name="userID" value="'+user_id+'" >').prependTo( $('.antcoco') );
    $('<input type="hidden" name="userPwd_old" value="'+user_pwd_old+'" >').prependTo( $('.antcoco') );

    $('[name="userAccount"], [name="userPwd"], [name="userPwdCheck"]').blur(function(){
        $(this).val( $(this).val().toUpperCase() );
    });

} // end changePwd1 function

function changePwd2_1(content){

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

} // end changePwd2_1 function

function changePwd2_2(content){

    g_countdown({
        minute: 4,
        second: 59,
        modal_id: 'modal_changePwd_2_2',
        deadline_class: 'deadline' 
    });
    
    /*countdown({
        minute: 4,
        second: 59,
        modal_id: 'modal_changePwd_2_2'
    });

    var today = new Date();
    var deadline = today.getFullYear()+'/'+padLeft({str: (today.getMonth()+1), len: 2})+'/'+padLeft({str: today.getDate(), len: 2})+' '
                +padLeft({str: today.getHours(), len: 2})+':'+padLeft({str: (today.getMinutes()+5), len: 2})+':'+padLeft({str: today.getSeconds(), len: 2});
    $('.deadline').text( deadline );
    */

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

} // end changePwd2_2 function

function countdown( conf ){
    var countdownnumber = conf.second;
    var countdownnumber_min = conf.minute;
    var countdownid;
    countdownfunc();

    function countdownfunc(){
        var tmp_time = padLeft({str: countdownnumber_min, len: 2})+':'+padLeft({str: countdownnumber, len: 2});
        $('.death').html(tmp_time);

        if (countdownnumber==0 && countdownnumber_min ==0 ){ 
            $("#"+conf.modal_id).modal('show');

            $('#'+conf.modal_id+' a.submitBtn').on('click', function(){
                $("#"+conf.modal_id).modal('hide');
            }); 

            clearTimeout(countdownid);
        }
        else if(countdownnumber == 0){

            countdownnumber_min--;
            countdownnumber =4;
            countdownid=setTimeout(countdownfunc,1000);
        }
        else{
            countdownnumber--;
            countdownid=setTimeout(countdownfunc,1000);
        }
    }
    
    $('.submitBtn').on('click', function(){
        window.location = 'changePwd.jsp?step=changePwd2_1';
    });
    
} // end countdown function

function padLeft(conf){
    var str = conf.str.toString();
    if(str.length >= conf.len)
        return str;
    else
        return padLeft({str: '0'+str, len: conf.len});
} // end padLeft function

function changePwd3(content) {
    
    //取得的user資料
    var result = content.changePwdResult;
    var date = content.changePwdDate;
    var time = content.changePwdTime;

    //畫面上要顯示的user資料之tag id
    var changePwdResult = $('#changePwdResult');
    var changePwdDate = $('#changePwdDate');
    var changePwdTime = $('#changePwdTime');

    changePwdResult.text( (result == 'success')? '變更成功!':'變更失敗!' );
    changePwdResult.addClass( (result == 'success')? 'nike': 'deny' );
    changePwdDate.text(date);
    changePwdTime.text(time);

} // end changePwd3 function


/** changePwd Valid **/

function changePwd1_valid() { // 不可與前次密碼相同

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

} // end changePwd1_valid function

function changePwd2_2_valid() {

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
} // end changePwd2_2_valid function

