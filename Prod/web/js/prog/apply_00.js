//產生招呼語
if ($('.ajax-loader').length == 0) {
    $('<div class="ajax-loader" style="display: none;"><div class="b-loading"><span class="m-icon-stack"><i class="m-icon m-icon-fubon-blue is-absolute"></i><i class="m-icon m-icon-fubon-green"></i></span></div></div>').prependTo($('body'));
}


//顯示Ajax轉轉圖，另外讓主頁面hide	
$('.ajax-loader').show();
setTimeout(function() {

$.ajax({
    url: 'auth?action=getLoginInfo&v=' + new Date().getTime(),
    data: {},
    datatype:'json',
    success: function(json) {
        //content = $.parseJSON(content);
        console.debug(json);
        var jsonLoginStatus = json;
        console.debug(jsonLoginStatus);
        var objList = jsonLoginStatus.content.objList; //需要攜帶的完整文件
        var contentArr = eightGreeting(jsonLoginStatus);
        var msgArr = contentArr[1];
        var msg = msgArr[0];
        var st = contentArr[2];
		var obj = contentArr[3];
        var msgArr = [];
		var reasonTag = false;   //判斷是否要顯示未通過的原因
		var carryTag = false;   //判斷是否要顯示攜帶的文件
	
		console.debug(st);
        console.debug(st.length);

		var isForward = false;
		
        if (st.length == 2) {
            var caseIndex = st.substr(1, 1);
                    console.debug(caseIndex);

                    switch (caseIndex) {
                        case '0':
                            modal.resetApply();
                            window.location = 'apply.jsp';
							isForward = true;
                            break;
                        case '1':
                            var firSemesterStart = msg.split(",")[0];
                            var firSemesterEnd = msg.split(",")[1];
                            var secSemesterStart = msg.split(",")[2];
                            var secSemesterEnd = msg.split(",")[3];

                            if (firSemesterStart.length != 5) {
                                firSemesterStart = '0' + firSemesterStart;
                            }

                            //2016-06-25 added by titan 顯示文字全部依後台資料庫顯示
                            msgArr.push('<p>Hi, 你好!</p>' + jsonLoginStatus.content.noPeriodDisplayHTML);
                            //msgArr.push('<p>Hi, 你好!</p><div class="tonypan"><p>就學貸款開放申請及對保作業期間如下：</p><p>上學期：' + firSemesterStart + '日起，至' + firSemesterEnd + '止</p><p>下學期：' + secSemesterStart + '日起，至' + secSemesterEnd + '止</p></div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
                            break;
                        case '2':
                            var name = msg.split(",")[0];
                            var time = msg.split(",")[1];
                            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p><a href="javascript:;" class="pobtn-srw"  id="gBtn">重新申請</a><a href="apply.jsp" class="pobtn-srb">繼續填寫</a>');
                            break;
                        case '3':
                            var name = msg.split(",")[0];
                            var time = msg.split(",")[1];
                            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，目前審核狀態為「尚未審核｣，若您欲修改申請資料，請點選「修改資料｣按鈕進行修改。</p><a href="apply.jsp?step=apply_document_5_1" class="pobtn-srb">修改資料</a>');
                            break;
                        case '4':
                            var name = msg.split(",")[0];
                            var time = msg.split(",")[1];
                            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，目前審核狀態為「審核中｣。</div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
                            break;
                        case '5':
                            var name = msg.split(",")[0];
                            var time = msg.split(",")[1];
                            msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，審核結果為「通過｣。<br>請您自行下載<a href="print/print.jsp" class="passIcon passpdf pdfImg" target="_blank"><img src="img/akk-04.png"></a>或列印<a href="print/print.jsp" class="passIcon passpdf printerImg" target="_blank"><img src="img/akk-03.png"></a>申請書(收執聯)後交付學校，方可完成就學貸款申請。<br>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。</p></div>');
                            break;

                        case '6':
							reasonTag = true;
                            var name = msg.split(";")[0];
							var time = msg.split(";")[1];
							var reasonText = msg.split(";")[2];
							var reasonArr = [];
							console.debug(reasonText);
							var reasonOption = reasonText.split("&");
							
							for(var i = 0; i <= reasonOption.length-2; i ++){
								reasonArr.push('<p>• ' + reasonText.split("&")[(i+1)] + '</p>');
							}
							
							console.debug(reasonArr);
							
							msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，審核結果為「未通過｣，請您儘速修改並重新送出申請。<p>未通過原因如下:<p class=reasonText></p></p>如有疑問，請洽客戶服務專線02-8751-6665按5。</p><a href="apply.jsp?step=apply_document_5_1" class="pobtn-srb">修改資料</a>');
							break;
                        case '7':
							var name = msg.split(";")[0];
		                    var time = msg.split(";")[1];
		                    //var carryObj = msg.split(",")[2];
		                    var bName = msg.split(";")[2];
		                    var bAddr = msg.split(";")[3];
		                    var bTel = msg.split(";")[4];
		                    var reservation = msg.split(";")[5];
							carryTag = true;              
		                    msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，提醒您攜帶以下證件至預約對保分行辦理。</p><ul class="nasiBtn" id="carryObjList"></ul></div><div class="tonypan"><p>預約對保分行:' + bName + ' ' + bTel + '</p><p>(' + bAddr + ')</p><p>預約對保時間:' + reservation + '</p></div>');
		                    break;                        
                    }
                    $('.talkwall').empty();
                    $('.talkwall').append(msgArr.join(''));
			
			GardenUtils.display.popup({
                title: '提醒您',
                content: '<p>為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」<a href="pdf/16.就學貸款業務網路服務申請書暨契約條款(DE50).pdf" class="passIcon passpdf" target="_blank"><img src="img/akk-04.png"></a>，將可透過本服務專區「我要申請｣功能完成線上續貸，還可享有免手續費優惠。</p><p>填寫完畢，請將紙本郵寄至104 臺北市中山區中山北路二段50號3樓 「台北富邦銀行就學貸款組收｣<br>如有疑問，請洽客戶服務專線02-8751-6665按5</p>',
                closeCallBackFn: function() {
					modal.getUpdatePopupStatus();
				},
                isShowSubmit: false
            });
        } 
		else {
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
					isForward = true;
                    break;
                case '1':
                    var firSemesterStart = msg.split(";")[0];
                    var firSemesterEnd = msg.split(";")[1];
                    var secSemesterStart = msg.split(";")[2];
                    var secSemesterEnd = msg.split(";")[3];

                    if (firSemesterStart.length != 5) {
                        firSemesterStart = '0' + firSemesterStart;
                    }

                    //2016-06-25 added by titan 顯示文字全部依後台資料庫顯示
                    msgArr.push('<p>Hi, 你好!</p>' + jsonLoginStatus.content.noPeriodDisplayHTML);
                    //msgArr.push('<p>Hi, 你好!</p><div class="tonypan"><p>就學貸款開放申請及對保作業期間如下：</p><p>上學期：' + firSemesterStart + '日起，至' + firSemesterEnd + '止</p><p>下學期：' + secSemesterStart + '日起，至' + secSemesterEnd + '止</p></div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
                    break;
                case '2':
                    var name = msg.split(";")[0];
                    var time = msg.split(";")[1];
                    //alert(msg);
                    msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '儲存一筆申請資料，請選擇要繼續填寫，或是清除上次填寫資料後重新申請?</p><a href="javascript:;" class="pobtn-srw" id="gBtn">重新申請</a><a href="apply.jsp" class="pobtn-srb">繼續填寫</a>');
                    break;
                case '3':
                    var name = msg.split(";")[0];
                    var time = msg.split(";")[1];
                    msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，目前審核狀態為「尚未審核｣，若您欲修改申請資料，請點選「修改資料｣按鈕進行修改。</p><a href="apply.jsp?step=apply_document_5_1" class="pobtn-srb">修改資料</a>');
                    break;
                case '4':
                    var name = msg.split(";")[0];
                    var time = msg.split(";")[1];
                    msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，目前審核狀態為「審核中｣。</div><p>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。<span></p></div>');
                    break;
                case '5':
                    var name = msg.split(";")[0];
                    var time = msg.split(";")[1];
                    msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，審核結果為「通過｣。<br>請您自行下載<a href="print/print.jsp" class="passIcon passpdf pdfImg" target="_blank"><img src="img/akk-04.png"></a>或列印<a href="print/print.jsp" class="passIcon passpdf printerImg" target="_blank"><img src="img/akk-03.png"></a>申請書(收執聯)後交付學校，方可完成就學貸款申請。<br>如有疑問，請洽<span class="blue">客戶服務專線 02-8751-6665 按5。</p></div>');
                    break;
                case '6':
					reasonTag = true;
                    var name = msg.split(";")[0];
                    var time = msg.split(";")[1];
                    var reasonText = msg.split(";")[2];
					var reasonArr = [];
					console.debug(reasonText);
					var reasonOption = reasonText.split("&");
					
					for(var i = 0; i <= reasonOption.length-2; i ++){
						reasonArr.push('<p>• ' + reasonText.split("&")[(i+1)] + '</p>');
					}
					
					console.debug(reasonArr);
					
                    msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，審核結果為「未通過｣，請您儘速修改並重新送出申請。<p>未通過原因如下:<p class=reasonText></p></p>如有疑問，請洽客戶服務專線02-8751-6665按5。</p><a href="apply.jsp?step=apply_document_5_1" class="pobtn-srb">修改資料</a>');
					break;
                case '7':
                    var name = msg.split(";")[0];
                    var time = msg.split(";")[1];
                    //var carryObj = msg.split(",")[2];
                    var bName = msg.split(";")[2];
                    var bAddr = msg.split(";")[3];
                    var bTel = msg.split(";")[4];
                    var reservation = msg.split(";")[5];
					carryTag = true;              
                    msgArr.push('<p>Hi,<span>' + name + '</span> 你好!</p><div class="tonypan"><p>您已於' + time + '完成線上送出申請資料，提醒您攜帶以下證件至預約對保分行辦理。</p><ul class="nasiBtn" id="carryObjList"></ul></div><div class="tonypan"><p>預約對保分行:' + bName + ' ' + bTel + '</p><p>(' + bAddr + ')</p><p>預約對保時間:' + reservation + '</p></div>');
                    break;
            }

            //alert(msgArr);

            $('.talkwall').empty();
            $('.talkwall').append(msgArr.join(''));
			
			if(carryTag){
				//將需要攜帶的文件顯示在網頁上
                var list = $('#carryObjList');   
				list.append(obj.join(''));
				
				//若點選"特殊情形證明文件"
			    $('#SpecialStatus').on('click', function() {
			        GardenUtils.display.popup({
			            title: '',
			            content: '<div class="left"><p>‧若為失蹤:</p><p>需檢附警察機關報案「受(處)理查尋人口案件登記表」或戶籍謄本登載失蹤。</p><br><p>‧若為重病或精神錯亂:</p><p>需檢附合格醫院最近六個月內所核發重病或精神錯亂之證明文件。</p><br><p>‧若為在監服刑:</p><p>需檢附在監服刑執行證明文件。</p><br><p>‧若為家庭暴力:</p><p>需檢附法院所核發有效之通常保護令(未指定暫時監護權項目)或各地方政府出具之受暴證明。</p></div>',
			            closeCallBackFn: function() {},
			            isShowSubmit: false
			        });
			    });
	
			}
			
			if(reasonTag){
				$('.reasonText').append(reasonArr.join(''));
			}
        }

        $('.tonypan .pobtn-srw').click(function(ev) {
            ev.preventDefault();

            modal.resetApply();
            window.location = 'apply.jsp';
        });
		
		if(!isForward) {
			$('.ajax-loader').hide();
			$('div.processArea').show();
		}
    }
});

},100);



