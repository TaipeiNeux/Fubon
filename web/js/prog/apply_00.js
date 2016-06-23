//產生招呼語
var jsonLoginStatus = modal.getLoginStatus();
console.debug(jsonLoginStatus);
var objList = jsonLoginStatus.content.objList; //需要攜帶的完整文件
var contentArr = eightGreeting();
var msgArr = contentArr[1];
var msg = msgArr[0];
var st = contentArr[2];
var msgArr = [];

console.debug(st);
console.debug(st.length);

if (st.length == 2) {
    GardenUtils.display.popup({
        title: '提醒您',
        content: '<p>為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」<a href="pdf/16.就學貸款業務網路服務申請書暨契約條款(DE50).pdf" class="passIcon passpdf" target="_blank"><img src="img/akk-04.png"></a>，將可透過本服務專區「我要申請｣功能完成線上續貸，還可享有免手續費優惠。</p><p>填寫完畢，請將紙本郵寄至104 臺北市中山區中山北路二段50號3樓 「台北富邦銀行就學貸款組收｣<br>如有疑問，請洽客戶服務專線02-8751-6665按5</p>',
        closeCallBackFn: function() {},
        isShowSubmit: false
    });
    $('button.btn').on('click', function() {

        var caseIndex = st.substr(1, 1);
        console.debug(caseIndex);

        switch (caseIndex) {
            case '0':
                modal.resetApply();
                window.location = 'apply.jsp';
                break;
            case '1':
                var firSemesterStart = msg.split(",")[0];
                var firSemesterEnd = msg.split(",")[1];
                var secSemesterStart = msg.split(",")[2];
                var secSemesterEnd = msg.split(",")[3];

                if (firSemesterStart.length != 5) {
                    firSemesterStart = '0' + firSemesterStart;
                }

                msgArr.push('<p>Hi, 你好!</p><div class="tonypan"><p>就學貸款開放申請及對保作業期間如下：</p><p>上學期：' + firSemesterStart + '日起，至' + firSemesterEnd + '止</p><p>下學期：' + secSemesterStart + '日起，至' + secSemesterEnd + '止</p></div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
                break;
            case '2':
                var name = msg.split(",")[0];
                var time = msg.split(",")[1];
                msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p><a href="javascript:;" class="pobtn-srw"  id="gBtn">重新申請</a><a href="apply.jsp" class="pobtn-srb">繼續填寫</a>');
                break;
            case '3':
                var name = msg.split(",")[0];
                var time = msg.split(",")[1];
                msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，目前審核狀態為「尚未審核｣，若您欲修改申請資料，請點選「修改資料｣按鈕進行修改。</p><a href="apply.jsp" class="pobtn-srb">修改資料</a>');
                break;
            case '4':
                var name = msg.split(",")[0];
                var time = msg.split(",")[1];
                msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，目前審核狀態為「審核中｣。</div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
                break;
            case '5':
                var name = msg.split(",")[0];
                var time = msg.split(",")[1];
                msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，審核結果為「通過｣。請您自行下載 或列印 申請書(收執聯)後交付學校，方可完成就學貸款申請。</div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
                break;
            case '6':
                var name = msg.split(",")[0];
                var time = msg.split(",")[1];
                msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，審核結果為「未通過｣，請您儘速修改並重新送出申請。如有疑問，請洽客戶服務專線02-8751-6665按5。</p><a href="apply.jsp" class="pobtn-srb">修改資料</a>');
                //alert(msgArr);
                break;
            case '7':
                var name = msg.split(",")[0];
                var time = msg.split(",")[1];
                //var carryObj = msg.split(",")[2];
                var bName = msg.split(",")[2];
                var bAddr = msg.split(",")[3];
                var bTel = msg.split(",")[4];
                var res = msg.split(",")[5];
                var resYear = res.substr(0, 4);
                var resMonth = res.substr(5, 2);
                var resDay = res.substr(8, 2);
                var resTimeStart = res.substr(11, 5);
                var resTimeStartHour = resTimeStart.substr(0, 2);

                var timeStart = parseInt(resTimeStartHour);
                var timeEnd = timeStart + 1;
                timeEnd = '' + timeEnd;
                if (timeEnd.length < 2) {
                    var resTimeEnd = '0' + timeEnd + ':00';
                } else {
                    var resTimeEnd = timeEnd + ':00';
                }

                if (resTimeStart.length != 4) {
                    timeStart = '0' + timeStart.toString();
                    timeEnd = '0' + timeEnd;
                }

                msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，提醒您攜帶以下證件至預約對保分行辦理。</p><ul class="nasiBtn" id="carryObjList"></ul></div><div class="tonypan"><p>預約對保分行:' + bName + '</p><p>(' + bAddr + ')</p><p>' + bTel + '</p><p>預約對保時間:' + resYear + '/' + resMonth + '/' + resDay + ' ' + resTimeStart + '-' + resTimeEnd + '</p></div>');

                //將需要攜帶的文件顯示在網頁上
                var list = $('#carryObjList');
                //list.append(objList.join(''));     Titan值加好後,再把註解拿掉

                break;
        }
        $('.talkwall').empty();
        $('.talkwall').append(msgArr.join(''));
    });
} else {
    switch (st) {
        /*case '00':    //壓黑
		GardenUtils.display.popup({
            title: '提醒您',
            content: '<p>為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」<a href="" class="passIcon passpdf"><img src="img/akk-04.png"></a>，將可透過本服務專區「我要申請｣功能完成線上續貸，還可享有免手續費優惠。</p><p>填寫完畢，請將紙本郵寄至104 臺北市中山區中山北路二段50號3樓 「台北富邦銀行就學貸款組收｣<br>如有疑問，請洽客戶服務專線02-8751-6665按5</p>',
            closeCallBackFn: function() {},
            isShowSubmit: false
        });
        break;*/
        case '0': //直接進入我要申請的step1-1頁面
            modal.resetApply();
            window.location = 'apply.jsp';
            break;
        case '1':
            var firSemesterStart = msg.split(",")[0];
            var firSemesterEnd = msg.split(",")[1];
            var secSemesterStart = msg.split(",")[2];
            var secSemesterEnd = msg.split(",")[3];

            if (firSemesterStart.length != 5) {
                firSemesterStart = '0' + firSemesterStart;
            }

            msgArr.push('<p>Hi, 你好!</p><div class="tonypan"><p>就學貸款開放申請及對保作業期間如下：</p><p>上學期：' + firSemesterStart + '日起，至' + firSemesterEnd + '止</p><p>下學期：' + secSemesterStart + '日起，至' + secSemesterEnd + '止</p></div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
            break;
        case '2':
            var name = msg.split(",")[0];
            var time = msg.split(",")[1];
            //alert(msg);
            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p><a href="javascript:;" class="pobtn-srw" id="gBtn">重新申請</a><a href="apply.jsp" class="pobtn-srb">繼續填寫</a>');
            break;
        case '3':
            var name = msg.split(",")[0];
            var time = msg.split(",")[1];
            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，目前審核狀態為「尚未審核｣，若您欲修改申請資料，請點選「修改資料｣按鈕進行修改。</p><a href="apply.jsp" class="pobtn-srb">修改資料</a>');
            break;
        case '4':
            var name = msg.split(",")[0];
            var time = msg.split(",")[1];
            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，目前審核狀態為「審核中｣。</div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
            break;
        case '5':
            var name = msg.split(",")[0];
            var time = msg.split(",")[1];
            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，審核結果為「通過｣。請您自行下載 或列印 申請書(收執聯)後交付學校，方可完成就學貸款申請。</div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
            break;
        case '6':
            var name = msg.split(",")[0];
            var time = msg.split(",")[1];
            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，審核結果為「未通過｣，請您儘速修改並重新送出申請。如有疑問，請洽客戶服務專線02-8751-6665按5。</p><a href="apply.jsp" class="pobtn-srb">修改資料</a>');
            break;
        case '7':
            var name = msg.split(",")[0];
            var time = msg.split(",")[1];
            //var carryObj = msg.split(",")[2];
            var bName = msg.split(",")[2];
            var bAddr = msg.split(",")[3];
            var bTel = msg.split(",")[4];
            var res = msg.split(",")[5];
            var resYear = res.substr(0, 4);
            var resMonth = res.substr(5, 2);
            var resDay = res.substr(8, 2);
            var resTimeStart = res.substr(11, 5);
            var resTimeStartHour = resTimeStart.substr(0, 2);

            var timeStart = parseInt(resTimeStartHour);
            var timeEnd = timeStart + 1;
            timeEnd = '' + timeEnd;
            if (timeEnd.length < 2) {
                var resTimeEnd = '0' + timeEnd + ':00';
            } else {
                var resTimeEnd = timeEnd + ':00';
            }

            if (resTimeStart.length != 4) {
                timeStart = '0' + timeStart.toString();
                timeEnd = '0' + timeEnd;
            }

            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，提醒您攜帶以下證件至預約對保分行辦理。</p><ul class="nasiBtn" id="carryObjList"></ul></div><div class="tonypan"><p>預約對保分行:' + bName + '</p><p>(' + bAddr + ')</p><p>' + bTel + '</p><p>預約對保時間:' + resYear + '/' + resMonth + '/' + resDay + ' ' + resTimeStart + '-' + resTimeEnd + '</p></div>');

            //將需要攜帶的文件顯示在網頁上
            var list = $('#carryObjList');
            //list.append(objList.join(''));   Titan值加好後,再把註解拿掉

            break;
    }

    //alert(msgArr);

    $('.talkwall').empty();
    $('.talkwall').append(msgArr.join(''));

}

$('.tonypan .pobtn-srw').click(function(ev) {
    ev.preventDefault();

    modal.resetApply();
    window.location = 'apply.jsp';
});