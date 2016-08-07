$(document).ready(function() {

    //定義每個步驟要對應的javascript function
    var stepEventHandler = {
        "deferment1": deferment_1,
        "deferment2": deferment_2,
        "deferment3_1": deferment_3_1,
        "deferment3_2": deferment_3_2,
        "deferment4": deferment_4
    };

    var nextEventHanlder = {
        "deferment1": deferment_1_valid,
        "deferment2": deferment_2_valid,
        "deferment3_1": deferment_3_1_valid,
        "deferment3_2": deferment_3_2_valid,
        "deferment4": deferment_4_valid
    };

    var nextEventErrorHanlder = {
        "deferment3_2": deferment_3_2_Error
    };

    if (jumpStep == 'null') {
        jumpStep = '';
    }

    g_ajax({
        url: 'flow?action=continue&flowId=deferment',
        //url: 'json/延期還款4.json',
        //url: 'json/延期還款3_2.json',
        //url: 'json/延期還款3_1.json',
        //url: 'json/延期還款2.json',
        //url: 'json/延期還款1.json',
        //url: 'json/延期還款0.json',
        data: {
            step: jumpStep
        },
        callback: function(content) {

            //開始長流程畫面
            buildFlow(content, stepEventHandler, nextEventHanlder, nextEventErrorHanlder);
        }
    });

});

var eliIndex; //選取的"符合的申請資格"之index
var eligibilityText; //選取的"符合的申請資格"之字串
var reasonSelectorValue; //選取的"延後/提前還款原因"之下拉式選單之value的值
var selectYear; //"延後/提前還款原因"之年
var selectMonth; //"延後/提前還款原因"之月
var selectDay; //"延後/提前還款原因"之日

function deferment_3_2_Error(json) {

    var errorCount = json.Content.errorCount;
    errorCount = parseInt(errorCount);

    //當錯誤超過三次就改成popup，關閉後回上一頁
    if (errorCount >= 3) {
        var nextBtn = $('div.nextBtn');
        var prev = nextBtn.find('.prev');
        prev.off('click').on('click', function(ev) {
            ev.preventDefault();
            window.location = 'deferment.jsp?step=deferment3_1';
        });

        defaultErrorHandler(json, function() {
            $('div.nextBtn .prev').removeClass('confirm').trigger('click');
        });
    } else {
        $('div.error-msg').text(json.Header.errorMsg);
    }


}

function deferment_1_valid() {
    var resFinal = true;
    var res = true;
    var errorMsg = ''; //依不同選取狀況塞不同的error message.
    var err = $('#selectDate').find('.error-msg'); //日期的錯誤訊息
    var errSelector = $('#reason').find('.error-msg'); //原因的錯誤訊息

    if (reasonSelectorValue == '' || reasonSelectorValue == undefined) {
        errSelector.text('請選擇延後/提前還款原因');
        res = false;
    } else {
        err.text('');
        res = true;
    }

    switch (reasonSelectorValue) {
        case '1':
            errorMsg = '預計畢業日期';
            break;
        case '2':
            errorMsg = '預計畢業日期';
            break;
        case '4':
            errorMsg = '預計役畢日期';
            break;
        case '5':
            errorMsg = '預計實習期滿日期';
            break;
        case '6':
            errorMsg = '預計休學/退學日期';
            break;
        case '7':
            errorMsg = '預計提早畢業日期';
            break;
    }
    if (errorMsg != '') {
        var resFinal = GardenUtils.valid.validForm({
            type: "show",
            showAllErr: false,
            formId: ["mainForm"],
            validEmpty: [{
                name: 'selectYear',
                msg: errorMsg,
                group: 'selectYear'
            }, {
                name: 'selectMonth',
                msg: errorMsg,
                group: 'selectYear'
            }, {
                name: 'selectDay',
                msg: errorMsg,
                group: 'selectYear'
            }],
            validNumber: [{
                name: 'selectYear',
                msg: errorMsg,
                allowEmpty: false,
                group: 'selectYear'
            }, {
                name: 'selectMonth',
                msg: errorMsg,
                allowEmpty: false,
                group: 'selectYear'
            }, {
                name: 'selectDay',
                msg: errorMsg,
                allowEmpty: false,
                group: 'selectYear'
            }],
            validDecimal: [],
            validEmail: [],
            validDate: [{
                name: ['selectYear', 'selectMonth', 'selectDay'],
                msg: errorMsg,
                //val: $('[name="selectYear"]').val() + '/' + $('[name="selectMonth"]').val() + '/' + $('[name="selectDay"]').val(),
                splitEle: '/',
                format: 'ch',
                allowEmpty: false,
                group: 'selectYear'
            }],
            validMobile: [],
            errorDel: [],
            customizeFun: function(customizeValidResult) {
                var current = new Date();
                var currentYear = current.getFullYear(); //現在的年
                var currentMonth = current.getMonth() + 1; //現在的月
                var currentDay = current.getDate(); //現在的日
				
                var selectYearInput = $('[name="selectYear"]'); //輸入的年
                var fullYearInput = parseInt(selectYearInput.val()) + 1911;
                var selectMonthInput = $('[name="selectMonth"]'); //輸入的月
                var monthInput = parseInt(selectMonthInput.val());
                var selectDayInput = $('[name="selectDay"]'); //輸入的日
                var eliIndex_hidden = $('[name="eliIndex"]');
                var input = new Date(fullYearInput +'/'+ monthInput +'/'+ selectDayInput.val());

                //選項1、2、4、5，控管年月日不得早於系統日且只能晚於系統日十年內
                if (eliIndex_hidden.val() == '1' || eliIndex_hidden.val() == '2' || eliIndex_hidden.val() == '4' || eliIndex_hidden.val() == '5') {
                    var  futrueTenYear = current.getFullYear() + 10;
					var  future = new Date( futrueTenYear + '/' + currentMonth + '/' + currentDay );
                    if (future - input < 0) {
                        customizeValidResult.push({
                            obj: $('[name="selectYear"]'),
                            msg: '不得晚於系統日十年'
                        });
                    } else if (input - current < 0) {
                        customizeValidResult.push({
                            obj: $('[name="selectYear"]'),
                            msg: '不得早於系統日'
                        });
                    }
                }
                //選項6、7，控管年月日不得早於系統日5年
                else if (eliIndex_hidden.val() == '6' || eliIndex_hidden.val() == '7') {
					var  passFiveYear = current.getFullYear() - 5;
					var  pass = new Date( passFiveYear + '/' + currentMonth + '/' + currentDay );
                    if (input - pass < 0) {
                        customizeValidResult.push({
                            obj: $('[name="selectYear"]'),
                            msg: '不得早於系統日五年'
                        });
                    }
                    
                    //如果選擇的是"提早畢業",「預定畢業日期」不得晚於會員歷史資料最近一次貸款紀錄之應畢業日期
                    if(eliIndex_hidden.val() == '7'){
                        var lastGraduationDate = $('[name="lastGraduationDateHidden"]').val();    
                        
                        if(lastGraduationDate.length == 5){
                            //上次畢業日期格式只有年月共五碼
                            //所以以下個月的1日比較  ex:上次10706 就以1070701比較 
                            var graduation_year = parseInt(lastGraduationDate.substr(0,3)) + 1911;   
                            var graduation_month = parseInt(lastGraduationDate.substr(3,2)) + 1; 
                            var lastDate = new Date( graduation_year + '/' + graduation_month );

                            //輸入的日期大於等於上次日期就表示晚於上次填寫之應畢業日期
                            if(input - lastDate > (-86400000)){   //一天86400000毫秒
                                customizeValidResult.push({
                                    obj: $('[name="selectYear"]'),
                                    msg: '不得晚於上次填寫之應畢業日期'
                                });
                            }
                            
                        }
                        
                    }
                }
            }
        });

    } else {
        err.text('');
        resFinal = true;
    }

    //alert(resFinal);
    if (resFinal == true && res == true) {
        return true;
    } else {
        return false;
    }
}

function deferment_2_valid() {
    var radioResult = true;
    //若原因為"繼續於國內升學",則多檢查是否有選擇"請確認學生證是否有本期註冊章"的radio
    var yes = $('#registerStamp_y:checked');
    var no = $('#registerStamp_n:checked');
    var yesLen = yes.length;
    var noLen = no.length;

    //檢查是否有點選radio
    if (eliIndex == '1' || eliIndex == '3') {
        if (yesLen <= 0 && noLen <= 0) {
            $('#hasStamp').show();
            radioResult = false;
        } else {
            $('#hasStamp').hide();
            radioResult = true;
        }
    }

    //檢查文件是否都有上傳
	var mustUploadFiles = ['isPositive', 'isNegative'];
	var isPosTag = true;
	var isNegTag = true;
	var addTag = true;
	var studentPosTag = true;
	var studentNegTag = true;
	
	//先檢查有幾個相同類型文件的檔案
	$.each(mustUploadFiles, function(index, value){
		var len = $('.'+value+'').length;
		if(len == 1){
			var text =  $('#'+value+'Img_0').text();
			
			if( text == '無' ){
				$('#hasDocument').show();
				if(value == 'isPositive'){
					isPosTag = false;
				}
				else if(value == 'isNegative'){
					isNegTag = false;
				}
			}
			else{
				$('#hasDocument').hide();
				if(value == 'isPositive'){
					isPosTag = true;
				}
				else if(value == 'isNegative'){
					isNegTag = true;
				}
			}
		}
	});

    if (eliIndex == '2' || eliIndex == '4' || eliIndex == '5' || eliIndex == '6' || eliIndex == '7') {
        var len = $('.additional').length;
		if(len == 1){
			var text =  $('#additionalImg_0').text();
			if( text == '無' ){
				$('#hasDocument').show();
				addTag = false;
			}
			else{
				$('#hasDocument').hide();
				addTag = true;
			}
		}
    } 
	else if (eliIndex == '1' || eliIndex == '3') {
        if (yesLen != 0) {
            var selectUploadFiles = ['studentIdPositive', 'studentIdNegative'];
	
			//先檢查有幾個相同類型文件的檔案
			$.each(selectUploadFiles, function(index, value){
				var len = $('.'+value+'').length;
				if(len == 1){
					var text =  $('#'+value+'Img_0').text();
					if( text == '無' ){
						$('#hasDocument').show();
						if(value == 'studentIdPositive'){
							studentPosTag = false;
						}
						else if(value == 'studentIdNegative'){
							studentNegTag = false;
						}
					}
					else{
						$('#hasDocument').hide();
						if(value == 'studentIdPositive'){
							studentPosTag = true;
						}
						else if(value == 'studentIdNegative'){
							studentNegTag = true;
						}
					}
				}
			});
        } else if (noLen != 0) {
            var len = $('.additional').length;
			if(len == 1){
				var text =  $('#additionalImg_0').text();
				if( text == '無' ){
					$('#hasDocument').show();
					addTag = false;
				}
				else{
					$('#hasDocument').hide();
					addTag = true;
				}
			}
        }
    }

    //檢查上傳文件合計大小是否超過10MB
    //var size = $('.fileSize');
	var trClassArray = [ 'studentIdPositive', 'studentIdNegative', 'additional' ];
	
	var sizeSum = 0;
	var isPosSize = 0;
	var isNegSize = 0;
	
	//2016-07-23 added by titan 直接算所有的檔案大小加總
	var fileSizeArray = ['fileSize_isPositive','fileSize_isNegative','fileSize_studentIdPositive','fileSize_additional'];
	$.each(fileSizeArray,function(i,className){
		$('.' + className).each(function(j,sizeHidden){
			var size = $(sizeHidden).val();
			console.debug('className = ' + className + ',size = ' + size);
			sizeSum += parseInt(size);
		});
	});
	
	console.debug('sizeSum = ' + sizeSum);
	
	//先把必上傳的文件之size加起來
	/**
	isPosLen = $('.fileSize_isPositive').length;
	isNegLen = $('.fileSize_isNegative').length;
	
	for(var i = 0; i <= isPosLen-1; i++){
		var oneSize = parseInt($('[name="isPositive_hidden'+i+'"]').val());
		isPosSize = isPosSize + oneSize;
	}
	
	for(var i = 0; i <= isNegLen-1; i++){
		var oneSize = parseInt($('[name="isNegative_hidden'+i+'"]').val());
		isNegSize = isNegSize + oneSize;
	}
	
	sizeSum = isPosSize + isNegSize;
	
	//再把選擇性上傳的文件之size加起來
**/
	
	
	var sizeResult = true;
	//10MB = 10000000
	
    if (sizeSum > 10000000) {
        $('#documentSize').show();
        sizeResult = false;
    } else {
        $('#documentSize').hide();
        sizeResult = true;
    }
	
	/*alert(isPosTag);
	alert(isNegTag);
	alert(addTag);
	alert(studentPosTag);
	alert(studentNegTag);*/
	if(isPosTag == false || isNegTag == false || addTag == false || studentPosTag == false || studentNegTag == false){
		$('#hasDocument').show();
	}
	else{
		$('#hasDocument').hide();
	}
	
	
    if (sizeResult == true && radioResult == true && isPosTag == true && isNegTag == true && addTag == true && studentPosTag == true && studentNegTag == true) {
        return true;
    } else {
        return false;
    }

    //return true;
}

function deferment_3_1_valid() {
    //檢查上傳文件合計大小是否超過10MB
    
	
	return true;
}

function deferment_3_2_valid() {
    //檢查是否輸入六位數
    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: [{
            name: 'codeInput',
            msg: '交易驗證碼'
        }],
        validNumber: [],
        validDecimal: [],
        validEmail: [],
        validDate: [],
        errorDel: [],
        customizeFun: function(customizeValidResult) {
            var codeInput = $('[name="codeInput"]').val();
            if (codeInput.length != 6) {
                customizeValidResult.push({
                    obj: $('[name="codeInput"]'),
                    msg: '限輸入6位數字'
                });
            }
        }
    });

    if (res == true) {
        return true;
    } else {
        return false;
    }
}

function deferment_4_valid() {
    return true;
}

function deferment_1(content) {

    /*2016-06-02 added by titan for unbind preBtn*/
    var nextBtn = $('div.nextBtn');
    nextBtn.append('<a href="#" class="gray prev noBindingPreEvent">上一步</a>');

    var prev = nextBtn.find('.prev');
    prev.off('click').on('click', function(ev) {
        ev.preventDefault();
        window.location = 'deferment_0.jsp';
    });

    var eligibilityTextValue = content.eligibilityText; //步驟1選擇的原因
    var seYear = content.selectYear;
    var seMonth = content.selectMonth;
    var seDay = content.selectDay;
    var eligibilityText0 = content.eligibilityText0; //步驟0選擇的原因
    var lastGraduationDate = content.lastGraduationDate; //步驟0選擇的原因
    //var radioInput = $('#reasonSelector');
    var reasonSelector = $('#reasonSelector'); //下拉式選單
    var selectDate = $('#selectDate'); //日期選項
    var deferralTip = $('#deferralTip'); //延畢的提醒字串
    var showReason = $('#showReason'); //日期title
    selectYear = $('[name="selectYear"]');
    selectMonth = $('[name="selectMonth"]');
    selectDay = $('[name="selectDay"]');
    ReasonDate = $('[name="ReasonDate"]');
    var eliIndexSelector = $('[name="eliIndex"]'); //紀錄下拉式選單中選取的值是哪一個
    var lastGraduationDateHidden = $('[name="lastGraduationDateHidden"]'); //紀錄下拉式選單中選取的值是哪一個
    var jsonEligibility = modal.getEligibilityStatus();
    console.debug(jsonEligibility);
    var eligibilityArr = jsonEligibility.eligibility;
    var eligibilityArray = [];

    //限制輸入的長度
    selectYear.attr('maxLength', '3');
    selectMonth.attr('maxLength', '2');
    selectDay.attr('maxLength', '2');
    
    //將之前填寫的畢業日期塞入hidden
    lastGraduationDateHidden.val(lastGraduationDate);

    //長選項
    eligibilityArray.push('<option value="">請選擇</option>');
    $.each(eligibilityArr, function(i, eligibilityData) {
        eligibilityArray.push('<option value=' + eligibilityData.getEligibilityId + '>' + eligibilityData.getEligibilityName + '</option>');
    });
    reasonSelector.append(eligibilityArray.join(''));
    reasonSelector.selectpicker('refresh');

    //點取選項後,依勾選資料對應帶出「填寫欄位」
    reasonSelector.on('change', function() {
        //var optionPicked = $(this).parent().find('select');
        var optionPicked = $(this).find("option:selected").val();
        $('#reason').find('.error-msg').text('');
        $('#selectDate').find('.error-msg').text('');
        selectYear.val('');
        selectMonth.val('');
        selectDay.val('');
        selectDate.hide();
        deferralTip.hide();
        switch (optionPicked) {
            case '1':
                showReason.text('預計畢業日期');
                ReasonDate.val('預計畢業日期');
                selectDate.show();
                break;
            case '2':
                showReason.text('預計畢業日期');
                ReasonDate.val('預計畢業日期');
                selectDate.show();
                break;
            case '3':
                showReason.text('(延畢者應每學期申請延期一次)');
                ReasonDate.val('延畢者應每學期申請延期一次');
                deferralTip.show();
                break;
            case '4':
                showReason.text('預計役畢日期');
                ReasonDate.val('預計役畢日期');
                selectDate.show();
                break;
            case '5':
                showReason.text('預計實習期滿日期');
                ReasonDate.val('預計實習期滿日期');
                selectDate.show();
                break;
            case '6':
                showReason.text('預計休學/退學日期');
                ReasonDate.val('預計休學/退學日期');
                selectDate.show();
                break;
            case '7':
                showReason.text('預計提早畢業日期');
                ReasonDate.val('預計提早畢業日期');
                selectDate.show();
                break;
        }

        reasonSelectorValue = optionPicked;
        console.debug(reasonSelectorValue);
        eliIndexSelector.val(optionPicked);

        var thisOption = reasonSelector.parent().find('button span');
        var thisOptionText = thisOption.text();
        var eligibilityText = $('[name="eligibilityText"]');

        //將選取的項目之字串存起來
        eligibilityText.val(thisOptionText);
    });

    //帶預設(下拉式選單)
    //如果步驟一沒有先選,就代步驟0的值
    if (eligibilityTextValue == '' || eligibilityTextValue == null || eligibilityTextValue == 'null') {
        console.debug('step0');
        var eligiText = eligibilityText0;
    }
    //否則帶入步驟1的值
    else {
        console.debug('step1');
        var eligiText = eligibilityTextValue;
    }

    $.each(eligibilityArr, function(i, op) {
        if (op.getEligibilityName == eligiText) {
            var optionSelected = reasonSelector.find('option[value=' + (i + 1) + ']');
            optionSelected.prop('selected', 'true');
            optionSelected.trigger('change');
            reasonSelector.trigger('change');
            return false;
        }
    });


    //待預設值(日期)
    selectYear.val(seYear);
    selectMonth.val(seMonth);
    selectDay.val(seDay);

}

//上傳證明文件須依上步驟學生所選定的申請原因，連動帶出以下學生要上傳的證明文件名稱
function deferment_2(content) {
    showUploadFiles(content, 'Y', '2');
    uploadEvent();
}

function deferment_3_1(content) {
    
    /*2016-06-02 added by titan for unbind preBtn*/
    var nextBtn = $('div.nextBtn');
    var prev = nextBtn.find('.prev');
    prev.off('click').on('click', function(ev) {
        ev.preventDefault();
        modal.resetDefermentSize();
        window.location = 'deferment.jsp?step=deferment1';
    });

    var eligibilityText = content.eligibilityText;
    var selectYear = content.selectYear;
    var selectMonth = content.selectMonth;
    var selectDay = content.selectDay;
    var cellPhone = content.mobile;
    var causeText = $('#causeText');
    var graDate = $('#graDate');
    var date = $('[name="date"]');
    var cell = $('#cell');

    //日期
    graDate.text(selectYear + '年' + selectMonth + '月' + selectDay + '日');
    date.val(selectYear + '年' + selectMonth + '月' + selectDay + '日');

    if (eligibilityText == '延畢') {
        $('#gDate').hide();
        eligibilityText = eligibilityText + ' (延畢者應每學期申請延期一次)';
    }
    
    //延後/提前還款原因
    causeText.text(eligibilityText);
	
	//動態長紀錄size和副檔名的hidden
	console.debug(content.uploadFile);
	var docItem = content.uploadFile;
	$.each(docItem, function(index, value){
		var currentIndex = 0;
		
		console.debug('value = ' + value);
		
		$.each(value, function(i, v) {
			//塞副檔名和size到hidden中
			
			console.debug(i + '=' + v);
			
			var sizeArray = '<input type="hidden" class="fileSize_'+index+'" name="'+index+'_hidden'+currentIndex+'" value="">';
			var FilenameExtension = '<input type="hidden" class="fileNameExtension" name="'+index+'Name_hidden'+currentIndex+'" value="">';
			$('.processInner').prepend(sizeArray);
			$('.processInner').prepend(FilenameExtension);
			var sizeHidden = $('[name="'+index+'_hidden'+currentIndex+'"]');
			var nameHidden = $('[name="'+index+'Name_hidden'+currentIndex+'"]');
			sizeHidden.val(v.size);
			nameHidden.val(v.fileNameExtension);
			currentIndex++;
		});
	});

    uploadEvent();

    //帶入前步驟上傳的文件
    showUploadFiles(content, 'N','3_1');
	var upload = $('.file-upload');
	upload.removeClass('file-upload').addClass('file-modify');


    //帶入電話號碼
    cell.text(cellPhone);
}

function deferment_3_2(content) {

    /*2016-06-02 added by titan for unbind preBtn*/
    var nextBtn = $('div.nextBtn');
    var prev = nextBtn.find('.prev');
    prev.off('click').on('click', function(ev) {
        ev.preventDefault();
        modal.resetDefermentSize();
        window.location = 'deferment.jsp?step=deferment1';
    });

    var imgSrc = content.code_img;
    var mobileNumber = content.mobile;
    var img = $('#img');
    var mobile = $('#mobile')
    var codeInput = $('[name="codeInput"]');


    codeInput.attr('maxlength', '6');
    img.attr('src', imgSrc);
    mobile.text(mobileNumber);

    g_countdown({
        minute: 4,
        second: 59,
        modal_id: 'modal_deferment_3_2',
        deadline_class: 'applyDate'
    });

    $('#modal_deferment_3_2').on('hide.bs.modal', function() {
        window.location = 'deferment.jsp?step=deferment3_1';
    });

}

function deferment_4(content) {
    console.debug(content);
    var applyDate = new Date();
    var applyYear = applyDate.getFullYear();
    var applyMonth = applyDate.getMonth() + 1;
    var applyDay = applyDate.getDate();
    var applyHours = applyDate.getHours();
    var applyMinutes = applyDate.getMinutes();
    var applySeconds = applyDate.getSeconds();
    var eligibilityText = content.eligibilityText;
    var ReasonDate = content.ReasonDate;
    var ReasonTime = content.date;
    /*var appYear = $('[name="appYear"]');
    var appMonth = $('[name="appMonth"]');
    var appDay = $('[name="appDay"]');
    var appHours = $('[name="appHours"]');
    var appMinutes = $('[name="appMinutes"]');
    var appSeconds = $('[name="appSeconds"]');*/

    var checkArr = [];

    /*appYear.val(applyYear);
    appMonth.val(applyMonth);
    appDay.val(applyDay);
    appHours.val(applyHours);
    appMinutes.val(applyMinutes);
    appSeconds.val(applySeconds);*/

    checkArr.push(applyMonth, applyDay, applyHours, applyMinutes, applySeconds);
    $.each(checkArr, function(index, value) {
        if (value < 10) {
            value = "0" + value;
            switch (index) {
                case 0:
                    applyMonth = value;
                    break;
                case 1:
                    applyDay = value;
                    break;
                case 2:
                    applyHours = value;
                    break;
                case 3:
                    applyMinutes = value;
                    break;
                case 4:
                    applySeconds = value;
                    break;
            }
        }
    });

    var date = applyYear + '/' + applyMonth + '/' + applyDay + ' ' + applyHours + ':' + applyMinutes + ':' + applySeconds;

    $('#applyDate').text(date);
    $('#applyReason').text(eligibilityText);

    if (eligibilityText != '延畢') {
        $('#applyReasonDate').text(ReasonDate + ' 民國' + ReasonTime);
    } 
    else {
        $('#applyReasonDate').text('('+ReasonDate+')');
    }
}

//綁上傳事件
function uploadEvent(input) {

	var defaultFileArray = $('input[type="file"]');

	if(input != undefined) {
		defaultFileArray = input;
	}

//    alert(defaultFileArray.length);

    defaultFileArray.off('change').on('change', function(ev) {
        ev.preventDefault();

        var inputFile = $(this);
		var fileModify = inputFile.parents('td.file-modify:first');
		var docId = fileModify.attr('docid');
		
		if(docId == undefined) {
			docId = '';
		}
		
        var inputFileName = inputFile.attr('name');
		var inputTitle = inputFileName.split('F')[0];
		var buttonId = inputFile.parent().attr('id');
		var currentIndex = buttonId.substr(-1,1);
        var tr = inputFile.parents('tr:first');
        var selected_file_name = $(this).val();
        var fileSize = inputFile.context.files[0].size;

        console.debug(inputTitle);
        console.debug(fileSize);
        console.debug(selected_file_name.substr(-3, 3));
        
        var selectedFileArr = selected_file_name.split("\\");
        var thisFileName = selectedFileArr.pop();
        var fileType = selected_file_name.substr(-3, 3);
        
        

        //先檢查上傳文件格式
        fileType = fileType.toLowerCase();
        if (fileType != 'peg' && fileType != 'jpg' && fileType != 'png' && fileType != 'pdf' && fileType != 'tif' && fileType != 'gif') {
            $('#documentType').show();
            $('#documentLength').hide();
            $('.ajax-loader').hide();
        } 
        else {
            $('#documentType').hide();
            $('.ajax-loader').hide();
			
            //再檢查字數
            if (thisFileName.length > 24) {
                $('#documentLength').show();
                $('#documentType').hide();
                $('.ajax-loader').hide();
            }
            
            // not click cancel
            else if (selected_file_name != '' || selected_file_name != tr.find('td.file-en').text()) {
                $('#documentType').hide();
                $('#documentLength').hide();
                //產生一個form物件放在body底下
                if ($('#uploadForm').length != 0) $('#uploadForm').remove();

                var form = $('<form id="uploadForm" method="post" action="data?action=uploadDefermentDocument&docId='+docId+'" enctype="Multipart/Form-Data" style="display:none;"></form>').prependTo('body');

                //inputFile.clone().appendTo(form);
				
                inputFile.appendTo(form);
				
				//alert(form.html());
				if ($('.ajax-loader').length == 0) {
		            $('<div class="ajax-loader" style="display: none;"><div class="b-loading"><span class="m-icon-stack"><i class="m-icon m-icon-fubon-blue is-absolute"></i><i class="m-icon m-icon-fubon-green"></i></span></div></div>').prependTo($('body'));
		        }
		        $('.ajax-loader').show();
				setTimeout(function() {
                GardenUtils.ajax.uploadFile(form, 'data?action=uploadDefermentDocument&docId=' + docId, function(response) {

                    console.debug(response);
					var sizeArray = '<input type="hidden" class="fileSize_'+inputTitle+'" name="'+inputTitle+'_hidden'+currentIndex+'" value="">';
					var FilenameExtension = '<input type="hidden" class="fileNameExtension" name="'+inputTitle+'Name_hidden'+currentIndex+'" value="">';
						
                    if (response.isSuccess == 'Y') {   //上傳成功
						var newFile = response.docId;
					
						if(tr.find('td.file-upload a').text() == '上傳檔案' || tr.find('td.file-upload a').text() == '上傳更多'){
							var nextIndex = parseInt(currentIndex) +1;
							if( inputTitle == 'additional' ){
                                addNewFile(tr, inputTitle, nextIndex,'上傳更多');
                            }
							$('.processInner').prepend(sizeArray);
							$('.processInner').prepend(FilenameExtension);
						}
						
                        tr.find('td.file-upload a').text('修改檔案');
                        tr.find('td.file-upload').removeClass('file-upload').addClass('file-modify');
                        tr.find('td.file-en').text(response.src);
                        tr.find('td.file-view a').addClass('active');
                        form.find('input[type="file"]').appendTo(tr.find('td.file-modify a'));
						tr.find('td.file-modify').attr('docid',newFile);
						
						//塞副檔名和size到hidden中
						
						/*alert(inputTitle);
						alert(currentIndex);
						alert($('[name="'+inputTitle+'_hidden'+currentIndex+'"]').length);
						alert($('[name="'+inputTitle+'Name_hidden'+currentIndex+'"]').length);
						*/
						
						var sizeHidden = $('[name="'+inputTitle+'_hidden'+currentIndex+'"]');
						var nameHidden = $('[name="'+inputTitle+'Name_hidden'+currentIndex+'"]');
						sizeHidden.val(fileSize);
						nameHidden.val(fileType);

                        //更新預覽的圖及小網顯示的圖
                        
                        var previewURL = 'data?action=downloadDefermentDocument&isPreview=Y&docId=';
                        var newURL = previewURL + newFile;
                        tr.next('tr').find('iframe').attr("src", newURL);
                        tr.find('td.file-photo img').attr("src", newURL);
						
                        $('.ajax-loader').hide();
                    } 
					else {
                        if (selected_file_name != '') alert('Upload Fail!!');
                        form.find('input[type="file"]').appendTo(tr.find('td.file-modify'));

                        $('.ajax-loader').hide();
                    }
                $('.ajax-loader').hide();
	                });
		        }, 200);
            }
        }
    });
}

//顯示文件項目的字串
function showFileString(name){
	switch(name){
		case 'isPositive':
			return '身分證正面影本';
		case 'isNegative':
			return '身分證反面影本';
		case 'studentIdPositive':
			return '學生證正面影本(須蓋有繼續升學學校之註冊章戳)';
		case 'studentIdNegative':
			return '學生證反面影本(須蓋有繼續升學學校之註冊章戳)';
		case 'additional':
			switch(eliIndex){
				case '1':
					return '在學證明';
				case '2':
					return '教育主管機關核准文件影本';
				case '3':
					return '在學證明';
				case '4':
					return '鄉鎮市區公所兵役課出具之「應徵（召）服兵役證明書」或入營徵集令影本';
				case '5':
					return '教育實習證影本';
				case '6':
					return '相關休學、退學證明文件';
				case '7':
					return '畢業證書影本';
			}
	}
}

//動態長出同項目的新的上傳檔案
function addNewFile(tr, compareName, nextIndex,uploadDisplayName) {
	var trView;
    
    if(tr != null){
        trView = tr.next();  
    }

	console.debug('---------------------------');
	console.debug(compareName);
	
	//動態再長一個"上傳檔案"的li
	var fileName = showFileString(compareName);
	var newTr = $('<tr id="'+compareName+'_'+nextIndex+'" class="'+compareName+'">' +
				'<td class="file-photo">' +
					'<a>' +
						'<img id="'+compareName+'Photo_img_'+nextIndex+'" src="">' +
					'</a>' +
				'</td>' +
				'<td class="file-zh">'+fileName+'</td>' +
				'<td class="file-en" id="'+compareName+'Img_'+nextIndex+'">無</td>' +
				'<td class="file-upload">'+
					'<a class = "upload" id="'+compareName+'Upload_'+nextIndex+'">'+uploadDisplayName+'<input type="file" name="'+compareName+'File_'+nextIndex+'" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>' +
				'</td>' +
				'<td class="file-view">' +
					'<a id="'+compareName+'View_'+nextIndex+'"></a>' +
				'</td>' +
			'</tr>' +
			'<tr id="'+compareName+'_view_'+nextIndex+'" style="display:none">' +
				'<td class="clickView" colspan="4" style="display:none" id="'+compareName+'ViewTag_'+nextIndex+'">' +
					'<div class="dowitemContent" style="display:block">' +
						'<div class="imgBox">' +
							'<iframe id="'+compareName+'ViewImg_'+nextIndex+'" src="" style="width:100%; height: 100%;"></iframe>' +
						'</div>' +
					'</div>' +
				'</td>' +
		    '</tr>');

    if(tr != null){
        newTr.insertAfter(trView);
    }
    else if(tr == null){
        $('#uploadObj').append(newTr);
    }
	
	uploadEvent(newTr.find('input[type="file"]'));

    //綁預覽事件
    newTr.find('.file-view a').off('click').on('click', function() {
        previewClickHandler($(this));
    });

    return newTr;
}

//帶預設值for上傳檔案
function showUploadFiles(content, hasRadio, step) {
	console.debug(content);
    eliIndex = content.eliIndex;

	var studentIdCardRadio = $('#studentIdCardRadio');
    var previewURL = 'data?action=downloadDefermentDocument&isPreview=Y&docId=';
	var fileItem = content.uploadFile;
    var fileIndex = 0;

	var defaultName = '上傳檔案';
	if(step == '3_1'){
		defaultName = '修改檔案';
	}
	
    //長額外的文件項目    
    switch (eliIndex) {
        case '1':{
            studentIdCardRadio.show();
            var studentIdPositive = $('.studentIdPositive');
            var studentIdNegative = $('.studentIdNegative');
            var studentIdPositive_view = $('#studentIdPositive_view_0');
            var studentIdNegative_view = $('#studentIdNegative_view_0');
            var studentIdRadioPicked = studentIdCardRadio.find('input');
            var itemName = 'additional';
            var additionName = showFileString(itemName);
            addNewFile(null, itemName, fileIndex++,defaultName);
            
            var RadioClicked = content.RadioClicked;
            var RadioClickedHidden = $('[name="RadioClicked"]');
            //檢查是否需要點選radio
            if (hasRadio == 'Y') { //step2
                studentIdRadioPicked.on('click', function(ev) {
					
                    var pickId = $(this).attr('id');
                    if (pickId == 'registerStamp_y') { //若學生證有本期註冊章,就顯示學生證正反面
                        var addition = $('.additional');
						studentIdPositive.show();
                        studentIdPositive_view.show();
                        studentIdNegative.show();
                        studentIdNegative_view.show();
                        RadioClickedHidden.val('Y');
                        addition.hide();
                    } else if (pickId == 'registerStamp_n') { //若學生證無本期註冊章,就顯示在學證明
						var addition = $('.additional');
                        studentIdPositive.hide();
                        studentIdPositive_view.hide();
                        studentIdNegative.hide();
                        studentIdNegative_view.hide();
                        RadioClickedHidden.val('N');
                        addition.show();
                    }
                });

            } else if (hasRadio == 'N') { //step3-1
                var addition = $('.additional');
				if (RadioClicked == 'Y') { //若前一步是選擇"是",就顯示學生證正反面
                    studentIdPositive.show();
                    studentIdPositive_view.show();
                    studentIdNegative.show();
                    studentIdNegative_view.show();
                    addition.hide();
                } else if (RadioClicked == 'N') { //若前一步是選擇"否",就顯示在學證明
                    studentIdPositive.hide();
                    studentIdPositive_view.hide();
                    studentIdNegative.hide();
                    studentIdNegative_view.hide();
                    addition.show();
                }
            }

            if (hasRadio == 'Y') {
                $('.additional').hide();
            } else {
                if (RadioClicked == 'Y') {
                    $('.additional').hide();
                }
            }

            break;
        }
        case '2':
        {
			var itemName = 'additional';
            var additionName = showFileString(itemName);
            addNewFile(null, itemName, fileIndex++,defaultName);
            break;
        }
        case '3':
        {
            studentIdCardRadio.show();
            var studentIdPositive = $('.studentIdPositive');
            var studentIdNegative = $('.studentIdNegative');
            var studentIdPositive_view = $('#studentIdPositive_view_0');
            var studentIdNegative_view = $('#studentIdNegative_view_0');
            var studentIdRadioPicked = studentIdCardRadio.find('input');
            var itemName = 'additional';
			var addition = $('.additional');
            var additionName = showFileString(itemName);
            addNewFile(null, itemName, fileIndex++,defaultName);
            var RadioClicked = content.RadioClicked;
            var RadioClickedHidden = $('[name="RadioClicked"]');
            //檢查是否需要點選radio
            if (hasRadio == 'Y') { //step2
                studentIdRadioPicked.on('click', function(ev) {

                    var pickId = $(this).attr('id');

                    if (pickId == 'registerStamp_y') { //若學生證有本期註冊章,就顯示學生證正反面
                        var addition = $('.additional');
						studentIdPositive.show();
                        studentIdPositive_view.show();
                        studentIdNegative.show();
                        studentIdNegative_view.show();
                        RadioClickedHidden.val('Y');
                        addition.hide();
                    } else if (pickId == 'registerStamp_n') { //若學生證無本期註冊章,就顯示在學證明
                        var addition = $('.additional');
						studentIdPositive.hide();
                        studentIdPositive_view.hide();
                        studentIdNegative.hide();
                        studentIdNegative_view.hide();
                        RadioClickedHidden.val('N');
                        addition.show();
                    }
                });

            } else if (hasRadio == 'N') { //step3-1
                if (RadioClicked == 'Y') { //若前一步是選擇"是",就顯示學生證正反面
                    studentIdPositive.show();
                    studentIdPositive_view.show();
                    studentIdNegative.show();
                    studentIdNegative_view.show();
                    addition.hide();
                } else if (RadioClicked == 'N') { //若前一步是選擇"否",就顯示在學證明
                    studentIdPositive.hide();
                    studentIdPositive_view.hide();
                    studentIdNegative.hide();
                    studentIdNegative_view.hide();
                    addition.show();
                }
            }

            if (hasRadio == 'Y') {
                $('.additional').hide();
            } else {
                if (RadioClicked == 'Y') {
                    $('.additional').hide();
                }
            }
            break;
        }

        case '4':
            var itemName = 'additional';
            var additionName = showFileString(itemName);
            addNewFile(null, itemName, fileIndex++,defaultName);
            break;
        case '5':
            var itemName = 'additional';
            var additionName = showFileString(itemName);
            addNewFile(null, itemName, fileIndex++,defaultName);
            break;

        case '6':
            var itemName = 'additional';
            var additionName = showFileString(itemName);
            addNewFile(null, itemName, fileIndex++,defaultName);
            break;
        case '7':
            var itemName = 'additional';
            var additionName = showFileString(itemName);
            addNewFile(null, itemName, fileIndex++,defaultName);
            break;
    }

    //var informationArr = ['Photo_img', 'Img', 'Upload', 'File', 'View', '_view', 'ViewImg'];
    $.each(fileItem, function(item, docContent) {    //跑文件項目
        console.debug(item);
        console.debug(docContent);
        var itemName = item.split('F')[0];
        console.debug('itemName = ' + itemName);
        if(docContent == '' || docContent == undefined){
            newFileName = '無';
        }
        else{
            console.debug('================================================');
            $.each(docContent, function(index, value) {    //跑文件項目裡的檔案
                console.debug('~~~~~~~~~~~~~~~~~~~~'+index+'~~~~~~~~~~~~~~~~~~~~~');
//                console.debug('fileIndex:'+fileIndex+'/fileName:'+fileName+'/docId:'+docId+'/size:'+size+'/fileNameExtension:'+fileNameExtension);

                var dataArr = [];
                var docId = value.docId;
                var size = value.size;
                var fileName = value.fileName;
                var fileNameExtension = value.fileNameExtension;
                var fileURL = previewURL + docId;    //檔案路徑
                console.debug(fileURL);

                if(docId != undefined && docId != '') {

                    var itemNamePhoto_img;
                    var itemNameImg;
                    var itemNameUpload;
                    var itemNameFile;
                    var itemNameView;
                    var itemName_view;
                    var itemNameViewImg;
                    var fileItemName;
                    var item = showFileString(itemName);

                    //塞預設的資料
                    if(index == 0) {   //第一個代值
                        itemNamePhoto_img = $('#'+itemName+'Photo_img_'+index+'');
                        itemNameImg = $('#'+itemName+'Img_'+index+'');
                        itemNameUpload = $('#'+itemName+'Upload_'+index+'');
//                        itemNameFile = $('[name="'+itemName+'File_'+index+'');
                        itemNameView = $('#'+itemName+'View_'+index+'');
//                        itemName_view = $('#'+itemName+'_view_'+index+'');
                        itemNameViewImg = $('#'+itemName+'ViewImg_'+index+'');
                        fileItemName = $('#'+itemName+'_'+index+' .file-zh');


                    }
                    else{    //第一個以後用動態長的
                        console.debug('長下一個：' + $('#'+itemName+'_'+(index-1)).length);
                        var tr = $('#'+itemName+'_'+(index-1));
                        console.debug(tr);
                        console.debug(tr.html());

                        var newTr = addNewFile(tr, itemName, index,'修改檔案');

                        itemNamePhoto_img = newTr.find('#'+itemName+'Photo_img_'+index+'');
                        itemNameImg = newTr.find('#'+itemName+'Img_'+index+'');
                        itemNameUpload = newTr.find('#'+itemName+'Upload_'+index+'');
//                        itemNameFile = newTr.find('[name="'+itemName+'File_'+index+'');
                        itemNameView = newTr.find('#'+itemName+'View_'+index+'');
//                        itemName_view = newTr.find('#'+itemName+'_view_'+index+'');
                        itemNameViewImg = newTr.find('#'+itemName+'ViewImg_'+index+'');
                        fileItemName = newTr.find('#'+itemName+'_'+index+' .file-zh');
                    }

                    itemNamePhoto_img.attr("src", fileURL);
                    itemNameImg.text(fileName);
//                    itemNameUpload.text('修改檔案');
                    itemNameUpload.parent().removeClass('file-upload').addClass('file-modify');
                    itemNameView.addClass('active');
                    itemNameViewImg.attr("src", fileURL);
                    fileItemName.text(item);
					
					itemNameUpload.parents('td.file-modify').attr('docid',docId);
                }

            });
        }
    });


    //按預覽按鈕
	$('.file-view a').off('click').on('click', function() {
        previewClickHandler($(this));
    });
    
    
}

function previewClickHandler(obj) {

    if (obj.hasClass('active')) {
        var thisID = obj.attr('id');
        var itemName = thisID.split('View_')[0];
        var fileIndex = thisID.split('View_')[1];
        var fileName = $('#' + itemName + 'Img_' + fileIndex).text();
        if(fileName != undefined) {
            fileName = fileName.substring(fileName.lastIndexOf('.')+1);
        }
		fileName = fileName.toLowerCase();
//			var fileName = $('[name="'+itemName+'Name_hidden'+fileIndex+'"]').val();

        previewDocument($('#'+itemName+'ViewTag_'+fileIndex+' iframe').attr('src'), fileName);
    }
}