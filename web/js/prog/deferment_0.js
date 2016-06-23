$(document).ready(function() {
    var eligibilityText; //選取的"符合的申請資格"之字串
    var eligibilityIndex; //選取的"延後/提前還款原因"之下拉式選單之value的值
    var selectYear; //"延後/提前還款原因"之年
    var selectMonth; //"延後/提前還款原因"之月
    var selectDay; //"延後/提前還款原因"之日
    var goNextStep = true; //檢查是否有資格進入下一步


    var eligibility = '';
    var radioInput = $('.radioArea').find('input');

    //勾選完原因,就將其原因存放至hidden中
    radioInput.on('click', function() {
        var thisRadio = $(this);
        var thisRadioText = thisRadio.parent().find('label').text();
        //var eligibilityIndex = $('[name="eligibilityIndex"]');
        eligibilityText = $('[name="eligibilityText0"]');

        //將選取的項目之字串存起來
        eligibilityText.val(thisRadioText);
        //eligibilityIndex.val(thisRadioText);
    });

    //按下一步
    $('div.nextBtn a').click(function(ev) {
        //如果沒有勾選原因就按下一步,則會顯示錯誤訊息
        if (eligibilityText == undefined) {
            $('#selectMsg').show();
            goNextStep = false;
        } else {
            ev.preventDefault();

			var mainForm = $('#mainForm');
            var jsondeferment = modal.deferment(mainForm);
            console.debug(jsondeferment);

            var isLogin = jsondeferment.isLogin;
            var isEtabs = jsondeferment.isEtabs;
            var hasData = jsondeferment.hasData;
            var isArrears = jsondeferment.isArrears;

			
            if (isLogin == 'Y') { //有登入
                if (isEtabs == 'N') { //沒有簽訂線上註記
                   
                    GardenUtils.display.popup({
                        title: '提醒您',
                        content: '<p>為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」<a href="pdf/16.就學貸款業務網路服務申請書暨契約條款(DE50).pdf" class="passIcon passpdf" target="_blank"><img src="img/akk-04.png"></a>，將可透過本服務專區「我要申請｣功能完成線上續貸，還可享有免手續費優惠。</p><p>填寫完畢，請將紙本郵寄至104 臺北市中山區中山北路二段50號3樓 「台北富邦銀行就學貸款組收｣<br>如有疑問，請洽客戶服務專線02-8751-6665按5</p>',
                        closeCallBackFn: function() {},
                        isShowSubmit: false
                    });
                    goNextStep = false;
                } 
                else if (isEtabs == 'Y') { //有簽訂線上註記
                    if (hasData == 'N' || (hasData == 'Y' && isArrears == 'N')) {
                        //客戶已簽訂線上註記，但就學貸款未有歷史撥貸資料或就學貸款有歷史撥貸資料但無尚欠者
                        GardenUtils.display.popup({
                            title: '提醒您',
                            content: '<p>目前查無你於本行有就學貸款應繳金額紀錄，如有疑問，請洽客戶服務專線02-8751-6665按5。</p>',
                            closeCallBackFn: function() {},
                            isShowSubmit: false
                        });
                        goNextStep = false;
                    } 
                    else if (hasData == 'Y' && isArrears == 'Y') {
					
                        //客戶已簽訂線上註記，但就學貸款未有歷史撥貸資料或就學貸款有歷史撥貸資料但無尚欠者
                        goNextStep = true;
                    }
                }
            } else if (isLogin == 'N'){ //未登入
				goNextStep = false;
                window.location.href = 'memberLogin.jsp';
            }
						
        }

       //alert(goNextStep);

        //要是符合條件,則跳轉至step1
        if (goNextStep == true) {
            var form = $('#mainForm');

            $.ajax({
                url: 'data?action=saveDeferment0',
                data: form.serialize(),
                success: function(json) {

                    console.debug(json);
                    window.location = 'deferment.jsp';

                }
            });
        }
        
    });

});