//八種招呼語的判斷
function eightGreeting() {
    var jsonLoginStatus = modal.getLoginStatus();
    var allObj;
    console.debug(jsonLoginStatus);
	if(jsonLoginStatus.content.appCases == 'Y' && jsonLoginStatus.content.kindOfCases == '2'){
		allObj = determineCarryObj(jsonLoginStatus);
	}
	
    if (jsonLoginStatus.isLogin == 'Y') {

        var isPeriod = jsonLoginStatus.content.isPeriod; //紀錄是否為對保期間
        var isRecord = jsonLoginStatus.content.isRecord; //紀錄是否有撥款紀錄
        var isEtabs = jsonLoginStatus.content.isEtabs; //紀錄是否有簽訂線上服務註記
        var isPopUp = jsonLoginStatus.content.isPopUp; //紀錄此學期是否已經彈跳過
        var appCases = jsonLoginStatus.content.appCases; //紀錄本學期是否有申請案件
        var tempCases = jsonLoginStatus.content.tempCases; //紀錄是否有暫存案件
        var kindOfCases = jsonLoginStatus.content.kindOfCases; //紀錄案件種類(1:線上續貸/2:分行對保);
        var censor = jsonLoginStatus.content.censor; //紀錄審核狀態 1:尚未審核;2:審核中;3:審核合完成通過;4:審核完成未通過

        var appName = jsonLoginStatus.name;
        var reason = jsonLoginStatus.content.reasons;
        var firstSemesterStart = jsonLoginStatus.content.firstSemesterStart;
        var firstSemesterEnd = jsonLoginStatus.content.firstSemesterEnd;
        var secondSemesterStart = jsonLoginStatus.content.secondSemesterStart;
        var secondSemesterEnd = jsonLoginStatus.content.secondSemesterEnd;

		var reasonTexts = '';
		console.debug(reason);
		$.each(reason, function(i, v){
			reasonTexts = reasonTexts + '&' + v ;
		});
		//alert('reasonTexts:'+reasonTexts);
		
        /****/
        var draftYear = jsonLoginStatus.content.draft.appYear;
        var draftMonth = jsonLoginStatus.content.draft.appMonth;
        var draftDay = jsonLoginStatus.content.draft.appDay;
        var draftHour = jsonLoginStatus.content.draft.appHour;
        var draftMin = jsonLoginStatus.content.draft.appMin;
        var draftSec = jsonLoginStatus.content.draft.appSec;
        

        var onlineYear = jsonLoginStatus.content.online.appYear;
        var onlineMonth = jsonLoginStatus.content.online.appMonth;
        var onlineDay = jsonLoginStatus.content.online.appDay;
        var onlineHour = jsonLoginStatus.content.online.appHour;
        var onlineMin = jsonLoginStatus.content.online.appMin;
        var onlineSec = jsonLoginStatus.content.online.appSec;
        
        var documentYear = jsonLoginStatus.content.document.appYear;
        var documentMonth = jsonLoginStatus.content.document.appMonth;
        var documentDay = jsonLoginStatus.content.document.appDay;

        var branchName = jsonLoginStatus.content.branchName;
        var branchAddr = jsonLoginStatus.content.branchAddr;
        var branchTel = jsonLoginStatus.content.branchTel;
        var carryObjArr = jsonLoginStatus.content.carryObjArr;
        var reservation = jsonLoginStatus.content.reservation;


        //判斷是上學期還是下學期
        var firstMonthStart = firstSemesterStart.substr(0, 2);
        var firstDayStart = firstSemesterStart.substr(2, 2);
        var firstMonthEnd = parseInt(firstSemesterEnd.substr(0, 2));
        var firstDayEnd = parseInt(firstSemesterEnd.substr(2, 2));
        var secondMonthEnd = parseInt(secondSemesterEnd.substr(0, 2));
        var secondDayEnd = parseInt(secondSemesterEnd.substr(2, 2));
        var secondMonthStart = secondSemesterStart.substr(0, 2);
        var secondDayStart = secondSemesterStart.substr(2, 2);
        var semester = jsonLoginStatus.content.semester;
        var currentDate = new Date();
        var currentDateM = currentDate.getMonth() + 1;
        var currentDateD = currentDate.getDate();
        var overTwoMonth;
        

        if (semester == '1') { //上學期
            if (currentDateM - firstMonthEnd > 2) {
                overTwoMonth = true;
            } else if (currentDateM - firstMonthEnd == 2) {
                if (currentDateD - firstDayEnd >= 1) {
                    overTwoMonth = true;
                } else {
                    overTwoMonth = false;
                }
            } else {
                overTwoMonth = false;
            }

        } else if (semester == '2') { //下學期
            if (currentDateM - secondMonthEnd > 2) {
                overTwoMonth = true;
            } else if (currentDateM - secondMonthEnd == 2) {
                if (currentDateD - secondDayEnd >= 1) {
                    overTwoMonth = true;
                } else {
                    overTwoMonth = false;
                }
            } else {
                overTwoMonth = false;
            }
        }

        firstMonthEnd = '' + firstMonthEnd;
        firstDayEnd = '' + firstDayEnd;

        if (firstMonthEnd.length != 2) {
            firstMonthEnd = '0' + firstMonthEnd;
        }
        if (firstDayEnd.length != 2) {
            firstDayEnd = '0' + firstDayEnd;
        }

        secondMonthEnd = '' + secondMonthEnd;
        secondDayEnd = '' + secondDayEnd;

        if (secondMonthEnd.length != 2) {
            secondMonthEnd = '0' + secondMonthEnd;
        }
        if (secondDayEnd.length != 2) {
            secondDayEnd = '0' + secondDayEnd;
        }

        var message = {
			//顯示文字全部依後台資料庫顯示
            "message_1": '<p>Hi, 你好!</p>' + jsonLoginStatus.content.noPeriodDisplayHTML,

            "message_2": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + draftYear + '/' + draftMonth + '/' + draftDay + ' ' + draftHour + ':' + draftMin + ':' + draftSec + '儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p><a href="javascript:;" class="pobtn-srw">重新申請</a><a href="apply.jsp" class="pobtn-srb">繼續填寫</a>',
            //Json測試用
            //"message_2": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + ' ' + onlineHour + ':' + onlineMin + ':' + onlineSec + '儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p><a href="javascript:;" class="pobtn-srw">重新申請</a><a href="apply.jsp" class="pobtn-srb">繼續填寫</a>',

            "message_3": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + '完成線上送出申請資料，目前審核狀態為「尚未審核｣，若您欲修改申請資料，請點選「修改資料｣按鈕進行修改。</p><a href="apply.jsp?step=apply_document_5_1" class="pobtn-srb">修改資料</a>',

            "message_4": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + '完成線上送出申請資料，目前審核狀態為「審核中｣。如有疑問，請洽客戶服務專線02-8751-6665 按5。</p>',

            "message_5": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + '完成線上送出申請資料，審核結果為「通過｣。<br>請您自行下載<a href="print/print.jsp" class="passIcon passpdf pdfImg" target="_blank"><img src="img/akk-044.png"></a>或列印<a href="print/print.jsp" class="passIcon passpd printerImgf" target="_blank"><img src="img/akk-033.png"></a>申請書(收執聯)後交付學校，方可完成就學貸款申請。</div><br>如有疑問，請洽客戶服務專線02-8751-6665 按5。</p>',

            "message_6": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + '完成線上送出申請資料，審核結果為「未通過｣，請您儘速修改並重新送出申請。如有疑問，請洽客戶服務專線02-8751-6665按5。</p><a href="apply.jsp?step=apply_document_5_1" class="pobtn-srb">修改資料</a>',

            "message_7": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + documentYear + '/' + documentMonth + '/' + documentDay + '完成線上送出申請資料，提醒您攜帶<a href="apply_00.jsp" class="relatedDocuments">相關證件</a>至預約對保分行辦理。</p><div class="branchInfoBr"><p>預約對保分行:' + branchName + '  ' + branchTel + '</p><p>(' + branchAddr + ')</p></div><p>預約對保時間:' + reservation + '</p>',

            "message_0": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>本行已開放就學貸款申請作業，歡迎<a href="apply.jsp" class="immediately">立即申請</a>!</p>',
        };
        
        var messageInfo = {
            "message_1": +firstMonthStart + '/' + firstDayStart + ';' + firstMonthEnd + '/' + firstDayEnd + ';' + secondMonthStart + '/' + secondDayStart + ';' + secondMonthEnd + '/' + secondDayEnd,

            "message_2": appName + ';' + draftYear + '/' + draftMonth + '/' + draftDay + ' ' + draftHour + ':' + draftMin + ':' + draftSec,
            //Json測試用
            //"message_2": onlineYear + ';' + onlineYear + '/' + onlineYear + '/' + onlineYear + ' ' + onlineYear + ':' + onlineYear + ':' + onlineYear,


            "message_3": appName + ';' + onlineYear + '/' + onlineMonth + '/' + onlineDay,

            "message_4": appName + ';' + onlineYear + '/' + onlineMonth + '/' + onlineDay,

            "message_5": appName + ';' + onlineYear + '/' + onlineMonth + '/' + onlineDay,

            "message_6": appName + ';' + onlineYear + '/' + onlineMonth + '/' + onlineDay + ';' + reasonTexts,

            "message_7": appName + ';' + documentYear + '/' + documentMonth + '/' + documentDay + ';' + branchName + ';' + branchAddr + ';' + branchTel + ';' + reservation
        };
        
        var contentMessage = []; //首頁的灰色框框的訊息
        var pageMessage = []; //apply_00頁面裡的訊息
        var loginMsg = $('[name="loginMsg"]');
        var determineStstus = '';

        //是否轉導到訊息頁
        var isForward = false;

        //判斷是不是對保期間
        if (isPeriod == 'Y') {
            //無簽訂線上服務註記且已有撥款紀錄且本學期沒有彈跳過訊息者要彈跳推廣訊息
            if (isEtabs == 'N' && isPopUp == 'N' && isRecord == 'Y') {
                if (appCases == 'Y') {
                    if (kindOfCases == '1') {
                        var popUp = true;
                        var result = fourMessage(popUp, censor, contentMessage, pageMessage, determineStstus, loginMsg, message, messageInfo);
                        contentMessage = result[0];
                        pageMessage = result[1];
                        determineStstus = result[2];

                    } 
                    else if (kindOfCases == '2') {
                        contentMessage.push(message.message_7);
                        pageMessage.push(messageInfo.message_7);
                        loginMsg.val(pageMessage);
                        determineStstus = '07';
                    }
                } 
                else if (appCases == 'N') {
                    if (tempCases == 'N') {
                        contentMessage.push(message.message_0);
                        determineStstus = '00';
                    } else if (tempCases == 'Y') {
                        contentMessage.push(message.message_2);
                        pageMessage.push(messageInfo.message_2);
                        loginMsg.val(pageMessage);
                        determineStstus = '02';
                    }
                }

            } else{
                if (appCases == 'Y') {
                    if (kindOfCases == '1') { //訊息為3 or 4 or 5 or 6
                        var popUp = false;
                        var result = fourMessage(popUp, censor, contentMessage, pageMessage, determineStstus, loginMsg, message, messageInfo);
                        
                        console.debug(result);
                        
                        contentMessage = result[0];
                        pageMessage = result[1];
                        determineStstus = result[2];

                    } else if (kindOfCases == '2') { //訊息為7
                        contentMessage.push(message.message_7);
                        pageMessage.push(messageInfo.message_7);
                        loginMsg.val(pageMessage);
                        determineStstus = '7';
                        //isForward = true;
                    }
                } else if (appCases == 'N') {
                    if (tempCases == 'N') {
                        contentMessage.push(message.message_0);
                        determineStstus = '0';
                        //window.location.href = 'apply.jsp';
                    } else if (tempCases == 'Y') { //訊息為2
                        contentMessage.push(message.message_2);
                        pageMessage.push(messageInfo.message_2);
                        loginMsg.val(pageMessage);
                        determineStstus = '2';
                    }
                }
            }
        } else if (isPeriod == 'N') {
            if (appCases == 'N') { //訊息為1
                contentMessage.push(message.message_1);
                pageMessage.push(messageInfo.message_1);
                loginMsg.val(pageMessage);
                determineStstus = '1';
                //isForward = true;
            } else if (appCases == 'Y') {
                if (kindOfCases == '1') { //訊息為3 or 4 or 5 or 6
                    if (overTwoMonth == false) { //沒有超過兩個月
                        var popUp = false;
                        var result = fourMessage(popUp, censor, contentMessage, pageMessage, determineStstus, loginMsg, message, messageInfo);
                        contentMessage = result[0];
                        pageMessage = result[1];
                        determineStstus = result[2];

                    } else { //超過兩個月
                        contentMessage.push(message.message_1);
                        pageMessage.push(messageInfo.message_1);
                        loginMsg.val(pageMessage);
                        determineStstus = '1';
                    }

                } else if (kindOfCases == '2') { //訊息為1
                    contentMessage.push(message.message_1);
                    pageMessage.push(messageInfo.message_1);
                    loginMsg.val(pageMessage);
                    determineStstus = '1';
                    //isForward = true;
                }
            }
        }
    }
    return [contentMessage, pageMessage, determineStstus, allObj];
}


//產生message 3, 4, 5, 6
function fourMessage(popUp, censor, contentMessage, pageMessage, determineStstus, loginMsg, message, messageInfo) {

    switch (censor) {
        case '1':
            contentMessage.push(message.message_3);
            pageMessage.push(messageInfo.message_3);
            determineStstus = '3';
            //isForward = true;
            break;
        case '2':
            contentMessage.push(message.message_4);
            pageMessage.push(messageInfo.message_4);
            determineStstus = '4';
            //isForward = true;
            break;
        case '3':
            contentMessage.push(message.message_5);
            pageMessage.push(messageInfo.message_5);
            determineStstus = '5';
            break;
        case '4':
            contentMessage.push(message.message_6);
            pageMessage.push(messageInfo.message_6);
            determineStstus = '6';
            //isForward = true;
            break;
    }
    loginMsg.val(pageMessage);

    if (popUp) { //需要彈跳訊息
        determineStstus = '0' + determineStstus;
    }

    return [contentMessage, pageMessage, determineStstus];
}