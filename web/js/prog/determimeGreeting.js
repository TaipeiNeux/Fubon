//八種招呼語的判斷
function eightGreeting() {
    var jsonLoginStatus = modal.getLoginStatus();
    console.debug(jsonLoginStatus);

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
        var firstSemesterStart = jsonLoginStatus.content.firstSemesterStart;
        var firstSemesterEnd = jsonLoginStatus.content.firstSemesterEnd;
        var secondSemesterStart = jsonLoginStatus.content.secondSemesterStart;
        var secondSemesterEnd = jsonLoginStatus.content.secondSemesterEnd;

		/**/
        var draftYear = jsonLoginStatus.content.draft.appYear;
        var draftMonth = jsonLoginStatus.content.draft.appMonth;
        var draftDay = jsonLoginStatus.content.draft.appDay;
        var draftHour = jsonLoginStatus.content.draft.appHour;
        var draftMin = jsonLoginStatus.content.draft.appMin;
        var draftSec = jsonLoginStatus.content.draft.appSec;
		
		
        var onlineYear = jsonLoginStatus.content.online.appYear;
        var onlineMonth = jsonLoginStatus.content.online.appMonth;
        var onlineDay = jsonLoginStatus.content.online.appDay;

        var documentYear = jsonLoginStatus.content.document.appYear;
        var documentMonth = jsonLoginStatus.content.document.appMonth;
        var documentDay = jsonLoginStatus.content.document.appDay;

        var branchName = jsonLoginStatus.content.branchName;
        var branchAddr = jsonLoginStatus.content.branchAddr;
        var branchTel = jsonLoginStatus.content.branchTel;
        var carryObjArr = jsonLoginStatus.content.carryObjArr;
        var reservation = jsonLoginStatus.content.reservation;

        
        //判斷是上學期還是下學期
        var firstMonthStart = firstSemesterStart.substr(0,2);
        var firstDayStart = firstSemesterStart.substr(2,2);
        var firstMonthEnd = parseInt(firstSemesterEnd.substr(0,2));
        var firstDayEnd = parseInt(firstSemesterEnd.substr(2,2));
        var secondMonthEnd = parseInt(secondSemesterEnd.substr(0,2));
        var secondDayEnd = parseInt(secondSemesterEnd.substr(2,2));
        var secondMonthStart = secondSemesterStart.substr(0,2);
        var secondDayStart = secondSemesterStart.substr(2,2);
        var semester = jsonLoginStatus.content.semester;
		var currentDate = new Date();
		var currentDateM = currentDate.getMonth()+1;
		var currentDateD = currentDate.getDate();
		var overTwoMonth;
        
		if( semester == '1' ){  //上學期
			if(currentDateM - firstMonthEnd > 2){
				overTwoMonth = true;
			}
			else if(currentDateM - firstMonthEnd == 2){
				if(currentDateD - firstDayEnd >= 1){
					overTwoMonth = true;
				}
				else{
					overTwoMonth = false;
				}
			}
			else{
				overTwoMonth = false;
			}
            
		}
		else if( semester == '2' ){   //下學期
			if(currentDateM - secondMonthEnd > 2){
				overTwoMonth = true;
			}
			else if(currentDateM - secondMonthEnd == 2){
				if(currentDateD - secondDayEnd >= 1){
					overTwoMonth = true;
				}
				else{
					overTwoMonth = false;
				}
			}
			else{
				overTwoMonth = false;
			}
		}
        
        firstMonthEnd = '' + firstMonthEnd;
            firstDayEnd = '' + firstDayEnd;
            
            if(firstMonthEnd.length != 2){
                firstMonthEnd = '0' + firstMonthEnd;
            }
            if(firstDayEnd.length != 2){
                firstDayEnd = '0' + firstDayEnd;
            }
            
        secondMonthEnd = '' + secondMonthEnd;
            secondDayEnd = '' + secondDayEnd;
        
        if(secondMonthEnd.length != 2){
                secondMonthEnd = '0' + secondMonthEnd;
            }
            if(secondDayEnd.length != 2){
                secondDayEnd = '0' + secondDayEnd;
            }
        
        var contentMessage = []; //首頁的灰色框框的訊息
        var pageMessage = []; //apply_00頁面裡的訊息
        var loginMsg = $('[name="loginMsg"]');
        var determineStstus = '';

        var message = {
            "message_1": '<h4>Hi, 你好!</h4><p>就學貸款開放申請及對保作業期間如下：</p><p>上學期：' + firstMonthStart + '/' + firstDayStart + '日起，至' + firstMonthEnd + '/' + firstDayEnd + '止</p><p>下學期：' + secondMonthStart + '/' + secondDayStart + '日起，至' + secondMonthEnd + '/' + secondDayEnd + '止</p><p>如有疑問，請洽客戶服務專線 02-8751-6665 按5。<span></p>',

            "message_2": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + draftYear + '/' + draftMonth + '/' + draftDay + ' ' + draftHour + ':' + draftMin + ':' + draftSec + '儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p><a href="javascript:;" class="pobtn-srw">重新申請</a><a href="apply.jsp" class="pobtn-srb">繼續填寫</a>',
            //Json測試用
            //"message_2": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineMonth + '/' + onlineMonth + '/' + onlineMonth + ' ' + onlineMonth + ':' + onlineMonth + ':' + onlineMonth + '儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p><a href="javascript:;" class="pobtn-srw">重新申請</a><a href="apply.jsp" class="pobtn-srb">繼續填寫</a>',

            "message_3": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + '完成線上送出申請資料，目前審核狀態為「尚未審核｣，若您欲修改申請資料，請點選「修改資料｣按鈕進行修改。</p><a href="apply.jsp" class="pobtn-srb">修改資料</a>',

            "message_4": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + '完成線上送出申請資料，目前審核狀態為「審核中｣。如有疑問，請洽客戶服務專線02-8751-6665 按5。</p>',

            "message_5": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + '完成線上送出申請資料，審核結果為「通過｣。請您自行下載 或列印 申請書(收執聯)後交付學校，方可完成就學貸款申請。</div>如有疑問，請洽客戶服務專線02-8751-6665 按5。</p>',

            "message_6": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + onlineYear + '/' + onlineMonth + '/' + onlineDay + '完成線上送出申請資料，審核結果為「未通過｣，請您儘速修改並重新送出申請。如有疑問，請洽客戶服務專線02-8751-6665按5。</p><a href="apply.jsp" class="pobtn-srb">修改資料</a>',

            "message_7": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>您已於' + documentYear + '/' + documentMonth + '/' + documentDay + '完成線上送出申請資料，提醒您攜帶相關文件至預約對保分行辦理。</p><div class="branchInfoBr"><p>預約對保分行:' + branchName + '</p><p>(' + branchAddr + ')</p><p>' + branchTel + '</p></div><p>預約對保時間:' + reservation + '</p>',

            "message_0": '<h4>Hi,<span>' + appName + '</span> 你好!</h4><p>本行已開放就學貸款申請作業，歡迎立即申請!</p>',
        };
       
        var messageInfo = {
            "message_1": + firstMonthStart + '/' + firstDayStart + ',' + firstMonthEnd + '/' + firstDayEnd + ',' + secondMonthStart + '/' + secondDayStart + ',' + secondMonthEnd + '/' + secondDayEnd,

            "message_2": appName + ',' + draftYear + '/' + draftMonth + '/' + draftDay + ' ' + draftHour + ':' + draftMin + ':' + draftSec,
            //Json測試用
            //"message_2": onlineYear + ',' + onlineYear + '/' + onlineYear + '/' + onlineYear + ' ' + onlineYear + ':' + onlineYear + ':' + onlineYear ,


            "message_3": appName + ',' + onlineYear + '/' + onlineMonth + '/' + onlineDay,

            "message_4": appName + ',' + onlineYear + '/' + onlineMonth + '/' + onlineDay,

            "message_5": appName + ',' + onlineYear + '/' + onlineMonth + '/' + onlineDay,

            "message_6": appName + ',' + onlineYear + '/' + onlineMonth + '/' + onlineDay,

            "message_7": appName + ',' + documentYear + '/' + documentMonth + '/' + documentDay + ',' + branchName + ',' + branchAddr + ',' + branchTel + ',' + reservation,
        };


        //是否轉導到訊息頁
        var isForward = false;

        //判斷是不是對保期間
        if (isPeriod == 'Y') {
            //無簽訂線上服務註記及有撥款紀錄的客戶要彈跳推廣訊息(且本學期沒有彈跳過訊息者)
            //if (isRecord == 'Y' && isEtabs == 'N' && isPopUp == 'N') {
            if (isEtabs == 'N' && isPopUp == 'N' && isRecord == 'Y') {
                if (appCases == 'Y') {
                    if (kindOfCases == '1') {
                        switch (censor) {
                            case '1':
                                contentMessage.push(message.message_3);
                                pageMessage.push(messageInfo.message_3);
                                determineStstus = '03';
                                break;
                            case '2':
                                contentMessage.push(message.message_4);
                                pageMessage.push(messageInfo.message_4);
                                determineStstus = '04';
                                //isForward = true;
                                break;
                            case '3':
                                contentMessage.push(message.message_5);
                                pageMessage.push(messageInfo.message_5);
                                determineStstus = '05';
                                //isForward = true;
                                break;
                            case '4':
                                contentMessage.push(message.message_6);
                                pageMessage.push(messageInfo.message_6);
                                determineStstus = '06';
                                break;
                        }
                        loginMsg.val(pageMessage);
                    } else if (kindOfCases == '2') {
                        contentMessage.push(message.message_7);
                        pageMessage.push(messageInfo.message_7);
                        loginMsg.val(pageMessage);
                        determineStstus = '07';
                    }
                } else if (appCases == 'N') {
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

                //呼叫壓黑的function
                /*GardenUtils.display.popup({
                    title: '提醒您',
                    content: '<p>為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」<a href="" class="passIcon passpdf"><img src="img/akk-04.png"></a>，將可透過本服務專區「我要申請｣功能完成線上續貸，還可享有免手續費優惠。</p><p>填寫完畢，請將紙本郵寄至104 臺北市中山區中山北路二段50號3樓 「台北富邦銀行就學貸款組收｣<br>如有疑問，請洽客戶服務專線02-8751-6665按5</p>',
                    closeCallBackFn: function() {},
                    isShowSubmit: false
                });*/
            } else if (isEtabs == 'Y' || isPopUp == 'Y' || isRecord == 'N') {
                if (appCases == 'Y') {
                    if (kindOfCases == '1') { //訊息為3 or 4 or 5 or 6
                        switch (censor) {
                            case '1':
                                contentMessage.push(message.message_3);
                                pageMessage.push(messageInfo.message_3);
                                determineStstus = '3';
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
                                //isForward = true;
                                break;
                            case '4':
                                contentMessage.push(message.message_6);
                                pageMessage.push(messageInfo.message_6);
                                determineStstus = '6';
                                break;
                        }
                        loginMsg.val(pageMessage);
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
        } 
		else if (isPeriod == 'N') {
            if (appCases == 'N') { //訊息為1
                contentMessage.push(message.message_1);
                pageMessage.push(messageInfo.message_1);
                loginMsg.val(pageMessage);
                determineStstus = '1';
                //isForward = true;
            } else if (appCases == 'Y') {
                if (kindOfCases == '1') { //訊息為4 or 5 or 6 or 7
                    if(overTwoMonth == false){
						switch (censor) {
	                        case '1':
	                            contentMessage.push(message.message_4);
	                            pageMessage.push(messageInfo.message_4);
	                            determineStstus = '4';
	                            //isForward = true;
	                            break;
	                        case '2':
	                            contentMessage.push(message.message_5);
	                            pageMessage.push(messageInfo.message_5);
	                            determineStstus = '5';
	                            //isForward = true;
	                            break;
	                        case '3':
	                            contentMessage.push(message.message_6);
	                            pageMessage.push(messageInfo.message_6);
	                            determineStstus = '6';
	                            break;
	                        case '4':
	                            contentMessage.push(message.message_7);
	                            pageMessage.push(messageInfo.message_7);
	                            determineStstus = '7';
	                            //isForward = true;
	                            break;
						}
						loginMsg.val(pageMessage);
					}
					else{
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
    return [contentMessage, pageMessage, determineStstus];
}