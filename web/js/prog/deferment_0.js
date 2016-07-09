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
	
		ev.preventDefault();
	
        //如果沒有勾選原因就按下一步,則會顯示錯誤訊息
        if (eligibilityText == undefined) {
            $('#selectMsg').show();
            goNextStep = false;
        } else {

			var mainForm = $('#mainForm');
            var jsondeferment = modal.deferment(mainForm);
            console.debug(jsondeferment);

            var isLogin = jsondeferment.isLogin;
            var isEtabs = jsondeferment.isEtabs;
            var isArrears = jsondeferment.isArrears;
			var hasAccount = jsondeferment.hasAccount;//是否有貸款帳號

			
            if (isLogin == 'Y') { //有登入
			
				if(hasAccount == 'N' || isArrears == 'N') {
                    redirectNoPermit('1','「延後/提前還款」');
                }
                else if(isEtabs == 'N') {
                    redirectNoPermit('2','「延後/提前還款」');
                }
				else {
					goNextStep = true;
				}
                
            } else if (isLogin == 'N'){ //未登入
				goNextStep = false;
                window.location.href = 'deferment.jsp';
            }
						
        }

       //alert(goNextStep);

        //要是符合條件,則跳轉至step1
        if (goNextStep) {
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