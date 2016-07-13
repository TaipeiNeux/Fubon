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
                var currentYear = current.getFullYear() - 1911; //現在的年
                var currentMonth = current.getMonth() + 1; //現在的月
                var currentDay = current.getDate(); //現在的日
                var selectYearInput = $('[name="selectYear"]'); //輸入的年
                var fullYearInput = parseInt(selectYearInput.val()) + 1911;
                var selectMonthInput = $('[name="selectMonth"]'); //輸入的月
                var monthInput = parseInt(selectMonthInput.val()) - 1;
                var selectDayInput = $('[name="selectDay"]'); //輸入的日
                var eliIndex_hidden = $('[name="eliIndex"]');

                var future = new Date(current.getFullYear() + 10, current.getMonth(), current.getDate());
                var pass = new Date(current.getFullYear() - 5, current.getMonth(), current.getDate());
                var input = new Date(fullYearInput, monthInput, selectDayInput.val());

                //選項1、2、4、5，控管年月日不得早於系統日且只能晚於系統日十年內
                if (eliIndex_hidden.val() == '1' || eliIndex_hidden.val() == '2' || eliIndex_hidden.val() == '4' || eliIndex_hidden.val() == '5') {
                    var divFuture = Math.round((future - input) / (1000 * 60 * 60 * 24));
                    var divCurrent = Math.round((input - current) / (1000 * 60 * 60 * 24));
                    if (divFuture < 0) {
                        customizeValidResult.push({
                            obj: $('[name="selectYear"]'),
                            msg: '不得晚於系統日十年'
                        });
                    } else if (divCurrent < -1) {
                        customizeValidResult.push({
                            obj: $('[name="selectYear"]'),
                            msg: '不得早於系統日'
                        });
                    }
                }
                //選項6、7，控管年月日不得早於系統日5年
                else if (eliIndex_hidden.val() == '6' || eliIndex_hidden.val() == '7') {
                    var divSec = Math.round((input - pass) / (1000 * 60 * 60 * 24));
                    if (divSec < 0) {
                        customizeValidResult.push({
                            obj: $('[name="selectYear"]'),
                            msg: '不得早於系統日五年'
                        });
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
    var result = true;
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
    var idpText = $('#idPositiveImg').text();
    var idnText = $('#idNegativeImg').text();
    if (idpText == '無' || idnText == '無') {
        $('#hasDocument').show();
        result = false;
    } else {
        $('#hasDocument').hide();
        result = true;
    }

    if (eliIndex == '2' || eliIndex == '4' || eliIndex == '5' || eliIndex == '6' || eliIndex == '7') {
        var addText = $('#additionalImg').text();
        if (addText == '無') {
            $('#hasDocument').show();
            result = false;
        } else {
            $('#hasDocument').hide();
            result = true;
        }
    } else if (eliIndex == '1') {
        if (yesLen != 0) {
            var spText = $('#studentIdPositiveImg').text();
            var snText = $('#studentIdNegativeImg').text();
            if (spText == '無' || snText == '無') {
                $('#hasDocument').show();
                result = false;
            } else {
                $('#hasDocument').hide();
                result = true;
            }
        } else if (noLen != 0) {
            var addText = $('#additionalImg').text();
            if (addText == '無') {
                $('#hasDocument').show();
                result = false;
            } else {
                $('#hasDocument').hide();
                result = true;
            }
        }
    }

    //檢查上傳文件合計大小是否超過10MB
    var size = $('.fileSize');
    var sizeSum = 0;
    for (var i = 0; i <= size.length - 1; i++) {
        var thisSize = size.eq(i).val();
        if (thisSize != '') {
            sizeSum = sizeSum + parseInt(thisSize);
        }
    }
    if (sizeSum > 10000000) {
        $('#documentSize').show();
        result = false;
    } else {
        $('#documentSize').hide();
        result = true;
    }

    if (result == true && radioResult == true) {
        return true;
    } else {
        return false;
    }

    //return true;
}

function deferment_3_1_valid() {
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
    nextBtn.append('<a href="#" class="gray prev  noBindingPreEvent">上一步</a>');

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
    var jsonEligibility = modal.getEligibilityStatus();
    console.debug(jsonEligibility);
    var eligibilityArr = jsonEligibility.eligibility;

    var eligibilityArray = [];

    //限制輸入的長度
    selectYear.attr('maxLength', '3');
    selectMonth.attr('maxLength', '2');
    selectDay.attr('maxLength', '2');

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

    /*reasonSelector.on('change', function() {
		var thisOption = reasonSelector.parent().find('button span');
		//alert(thisOption.length);
        var thisOptionText = thisOption.text();
		
		//alert(thisOptionText);
        //var eligibilityIndex = $('[name="eligibilityIndex"]');
        var eligibilityText = $('[name="eligibilityText"]');

        //將選取的項目之字串存起來
        eligibilityText.val(thisOptionText);
    });*/

}

//上傳證明文件須依上步驟學生所選定的申請原因，連動帶出以下學生要上傳的證明文件名稱
function deferment_2(content) {
    showUploadFiles(content, 'Y');
    uploadEvent();
}

function deferment_3_1(content) {

    /*2016-06-02 added by titan for unbind preBtn*/
    var nextBtn = $('div.nextBtn');
    var prev = nextBtn.find('.prev');
    prev.off('click').on('click', function(ev) {
        ev.preventDefault();
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

    //延後/提前還款原因
    causeText.text(eligibilityText);
    //日期
    graDate.text(selectYear + '年' + selectMonth + '月' + selectDay + '日');
    date.val(selectYear + '年' + selectMonth + '月' + selectDay + '日');

    if (eligibilityText == '延畢') {
        $('#gDate').hide();
    }

    //帶入前步驟上傳的文件
    showUploadFiles(content, 'N');
    uploadEvent();

    //帶入電話號碼
    cell.text(cellPhone);
}

function deferment_3_2(content) {

    /*2016-06-02 added by titan for unbind preBtn*/
    var nextBtn = $('div.nextBtn');
    var prev = nextBtn.find('.prev');
    prev.off('click').on('click', function(ev) {
        ev.preventDefault();
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
    } else {
        $('#applyReasonDate').text(ReasonDate);
    }
}

//綁上傳事件
function uploadEvent() {
    $('input[type="file"]').on('click', function(ev) {
        if ($('.ajax-loader').length == 0) {
            $('<div class="ajax-loader" style="display: none;"><div class="b-loading"><span class="m-icon-stack"><i class="m-icon m-icon-fubon-blue is-absolute"></i><i class="m-icon m-icon-fubon-green"></i></span></div></div>').prependTo($('body'));
        }
        $('.ajax-loader').show();
    });

    $('input[type="file"]').on('change', function(ev) {
        ev.preventDefault();

        var inputFile = $(this);
        var inputFileName = inputFile.attr('name');
        var inputTitle = inputFileName.split('F')[0];
        var inputHidden = $('[name="' + inputTitle + '_hidden"]');
        var tr = inputFile.parents('tr:first');
        var selected_file_name = $(this).val();
        var fileSize = inputFile.context.files[0].size;

        //checkSize(fileSize);


        console.debug(fileSize);
        console.debug(selected_file_name.substr(-3, 3));

        var selectedFileArr = selected_file_name.split("\\");
        var thisFileName = selectedFileArr.pop();

        var fileType = selected_file_name.substr(-3, 3);

        fileType = fileType.toLowerCase();
        //alert(fileType);

        if (fileType != 'peg' && fileType != 'jpg' && fileType != 'png' && fileType != 'pdf' && fileType != 'tif' && fileType != 'gif') {
            $('#documentType').show();
            $('#documentLength').hide();
            $('.ajax-loader').hide();
        } else {
            $('#documentType').hide();
            $('.ajax-loader').hide();
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

                var form = $('<form id="uploadForm" method="post" action="data?action=uploadDefermentDocument" enctype="Multipart/Form-Data" style="display:none;"></form>').prependTo('body');

                //inputFile.clone().appendTo(form);
                inputFile.appendTo(form);

                GardenUtils.ajax.uploadFile(form, 'data?action=uploadDefermentDocument', function(response) {

                    console.debug(response);

                    if (response.isSuccess == 'Y') {
                        inputHidden.val(fileSize);
                        tr.find('td.file-upload a').text('修改檔案');
                        tr.find('td.file-upload').removeClass('file-upload').addClass('file-modify');
                        tr.find('td.file-en').text(response.src);
                        tr.find('td.file-view a').addClass('active');
                        form.find('input[type="file"]').appendTo(tr.find('td.file-modify'));

                        //更新預覽的圖及小網顯示的圖
                        var newFile = response.docId;
                        var previewURL = 'data?action=downloadDefermentDocument&isPreview=Y&docId=';
                        var newURL = previewURL + newFile;
                        tr.next('tr').find('iframe').attr("src", newURL);
                        tr.find('td.file-photo img').attr("src", newURL);

                        $('.ajax-loader').hide();

                    } else {
                        if (selected_file_name != '') alert('Upload Fail!!');
                        form.find('input[type="file"]').appendTo(tr.find('td.file-modify'));

                        $('.ajax-loader').hide();
                    }
                });
            }
        }


    });
}

//帶預設值for上傳檔案
function showUploadFiles(content, hasRadio) {
    console.debug('showUploadFiles', content);
    eliIndex = content.eliIndex;
    var isNegativeFile = content.uploadFile.isNegativeFile;
    var isPositiveFile = content.uploadFile.isPositiveFile;
    var studentIdNegativeFile = content.uploadFile.studentIdNegativeFile;
    var studentIdPositiveFile = content.uploadFile.studentIdPositiveFile;
    var additionalFile = content.uploadFile.additionalFile;
    var isNegativeFile_docId = content.uploadFile.isNegativeFile_docId;
    var isPositiveFile_docId = content.uploadFile.isPositiveFile_docId;
    var studentIdNegativeFile_docId = content.uploadFile.studentIdNegativeFile_docId;
    var studentIdPositiveFile_docId = content.uploadFile.studentIdPositiveFile_docId;
    var additionalFile_docId = content.uploadFile.additionalFile_docId;

    var additionalArr = [];
    var studentIdCardRadio = $('#studentIdCardRadio');
    var uploadObj = $('#uploadObj');
    var idPositivePhoto = $('#idPositivePhoto');
    var idPositiveImg = $('#idPositiveImg');
    var idPositiveUpload = $('#idPositiveUpload');
    var idPositiveChange = $('#idPositiveChange');
    var idPositiveView = $('#idPositiveView');
    var idPositiveViewImg = $('#idPositiveViewImg');
    var idNegativePhoto = $('#idNegativePhoto');
    var idNegativeImg = $('#idNegativeImg');
    var idNegativeUpload = $('#idNegativeUpload');
    var idNegativeChange = $('#idNegativeChange');
    var idNegativeView = $('#idNegativeView');
    var idNegativeViewImg = $('#idNegativeViewImg');
    var studentIdPositivePhoto = $('#studentIdPositivePhoto');
    var studentIdPositiveImg = $('#studentIdPositiveImg');
    var studentIdPositiveUpload = $('#studentIdPositiveUpload');
    var studentIdPositiveChange = $('#studentIdPositiveChange');
    var studentIdPositiveView = $('#studentIdPositiveView');
    var studentIdPositiveViewImg = $('#studentIdPositiveViewImg');
    var studentIdPositive = $('#studentIdPositive');
    var studentIdPositive_view = $('#studentIdPositive_view');
    var studentIdNegativePhoto = $('#studentIdNegativePhoto');
    var studentIdNegativeImg = $('#studentIdNegativeImg');
    var studentIdNegativeUpload = $('#studentIdNegativeUpload');
    var studentIdNegativeChange = $('#studentIdNegativeChange');
    var studentIdNegativeView = $('#studentIdNegativeView');
    var studentIdNegativeViewImg = $('#studentIdNegativeViewImg');
    var studentIdNegative = $('#studentIdNegative');
    var studentIdNegative_view = $('#studentIdNegative_view');

    var previewURL = 'data?action=downloadDefermentDocument&isPreview=Y&docId=';

    var isPositiveFileURL = previewURL + isPositiveFile_docId;
    var isNegativeFileURL = previewURL + isNegativeFile_docId;
    var studentIdNegativeFileURL = previewURL + studentIdNegativeFile_docId;
    var studentIdPositiveFileURL = previewURL + studentIdPositiveFile_docId;
    var additionalFileURL = previewURL + additionalFile_docId;

    switch (eliIndex) {
        case '1':
            //addition.hide();
            studentIdCardRadio.show();
            //var studentIdRadio = studentIdCardRadio.find('input:checked');
            var studentIdRadioPicked = studentIdCardRadio.find('input');

            additionalArr.push('<tr id="addition" style="display:none">' +
                '<td class="file-photo"><a><img id="additionalPhoto" src=""></a></td>' +
                '<td class="file-zh">在學證明</td><td class="file-en" id="additionalImg">無</td>' +
                '<td class="file-modify"><a id="additionalChange" style="display:none">修改檔案</a>' +
                '<input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td>' +
                '<td class="file-upload"><a id="additionalUpload">上傳檔案</a>' +
                '<input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td>' +
                '<td class="file-view"><a id="additionalView"></a></td></tr><tr>' +
                '<td class="clickView" colspan="4" id="add" style="display:none">' +
                '<div class="dowitemContent" style="display:block"><div class="imgBox">' +
                '<iframe id="additionalViewImg" src="" style="width:100%; height: 100%;"></iframe></div></div></td></tr>');

            uploadObj.append(additionalArr.join(''));

            var addition = $('#addition');

            //等Titan給我值, 就拿掉
            /*studentIdRadioPicked.on('click', function() {
                var pickId = $(this).attr('id');
                if (pickId == 'registerStamp_y') { //選擇"是"
                    studentIdPositive.show();
                    studentIdPositive_view.show();
                    studentIdNegative.show();
                    studentIdNegative_view.show();
                    addition.hide();
                } else if (pickId == 'registerStamp_n') { //選擇"否"
                    studentIdPositive.hide();
                    studentIdPositive_view.hide();
                    studentIdNegative.hide();
                    studentIdNegative_view.hide();
                    addition.show();

                }
            });*/


            var RadioClicked = content.RadioClicked;
            var RadioClickedHidden = $('[name="RadioClicked"]');
            //檢查是否需要點選radio
            if (hasRadio == 'Y') { //step2   
                studentIdRadioPicked.on('click', function() {
                    var pickId = $(this).attr('id');
                    if (pickId == 'registerStamp_y') { //若學生證有本期註冊章,就顯示學生證正反面
                        studentIdPositive.show();
                        studentIdPositive_view.show();
                        studentIdNegative.show();
                        studentIdNegative_view.show();
                        RadioClickedHidden.val('Y');
                        addition.hide();
                    } else if (pickId == 'registerStamp_n') { //若學生證無本期註冊章,就顯示在學證明
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

            additionItem(additionalFile, additionalFile_docId, additionalFileURL);

            if (hasRadio == 'Y') {
                addition.hide();
            } else {
                if (RadioClicked == 'Y') {
                    addition.hide();
                }
            }

            break;
        case '2':
            additionalArr.push('<tr id="addition" style="display:none"><td class="file-photo"><a><img id="additionalPhoto" src=""></a></td><td class="file-zh">教育主管機關核准文件影本</td><td class="file-en" id="additionalImg">無</td><td class="file-modify"><a id="additionalChange" style="display:none">修改檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-upload"><a id="additionalUpload">上傳檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-view"><a id="additionalView"></a></td></tr><tr><td class="clickView" colspan="4" id="add" style="display:none"><div class="dowitemContent" style="display:block"><div class="imgBox"><iframe id="additionalViewImg" src="" style="width:100%; height: 100%;"></iframe></div></div></td></tr>');

            uploadObj.append(additionalArr.join(''));
            var addition = $('#addition');
            addition.show();
            additionItem(additionalFile, additionalFile_docId, additionalFileURL);
            break;

        case '3':
            studentIdCardRadio.show();
            //var studentIdRadio = studentIdCardRadio.find('input:checked');
            var studentIdRadioPicked = studentIdCardRadio.find('input');

            additionalArr.push('<tr id="addition" style="display:none"><td class="file-photo"><a><img id="additionalPhoto" src=""></a></td><td class="file-zh">在學證明</td><td class="file-en" id="additionalImg">無</td><td class="file-modify"><a id="additionalChange" style="display:none">修改檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-upload"><a id="additionalUpload">上傳檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-view"><a id="additionalView"></a></td></tr><tr><td class="clickView" colspan="4" id="add" style="display:none"><div class="dowitemContent" style="display:block"><div class="imgBox"><iframe id="additionalViewImg" src="" style="width:100%; height: 100%;"></iframe></div></div></td></tr>');

            uploadObj.append(additionalArr.join(''));
            var addition = $('#addition');

            //等Titan給我值, 就拿掉
            /*studentIdRadioPicked.on('click', function() {
                var pickId = $(this).attr('id');
                if (pickId == 'registerStamp_y') { //選擇"是"
                    studentIdPositive.show();
                    studentIdPositive_view.show();
                    studentIdNegative.show();
                    studentIdNegative_view.show();
                    addition.hide();
                } else if (pickId == 'registerStamp_n') { //選擇"否"
                    studentIdPositive.hide();
                    studentIdPositive_view.hide();
                    studentIdNegative.hide();
                    studentIdNegative_view.hide();
                    addition.show();

                }
            });*/


            var RadioClicked = content.RadioClicked;
            var RadioClickedHidden = $('[name="RadioClicked"]');
            //檢查是否需要點選radio
            if (hasRadio == 'Y') { //step2   
                studentIdRadioPicked.on('click', function() {
                    var pickId = $(this).attr('id');
                    if (pickId == 'registerStamp_y') { //若學生證有本期註冊章,就顯示學生證正反面
                        studentIdPositive.show();
                        studentIdPositive_view.show();
                        studentIdNegative.show();
                        studentIdNegative_view.show();
                        RadioClickedHidden.val('Y');
                        addition.hide();
                    } else if (pickId == 'registerStamp_n') { //若學生證無本期註冊章,就顯示在學證明
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

            additionItem(additionalFile, additionalFile_docId, additionalFileURL);

            if (hasRadio == 'Y') {
                addition.hide();
            } else {
                if (RadioClicked == 'Y') {
                    addition.hide();
                }
            }
            break;
        case '4':
            additionalArr.push('<tr id="addition" style="display:none"><td class="file-photo"><a><img id="additionalPhoto" src=""></a></td><td class="file-zh">鄉鎮市區公所兵役課出具之「應徵（召）服兵役證明書」或入營徵集令影本</td><td class="file-en" id="additionalImg">無</td><td class="file-modify"><a id="additionalChange" style="display:none">修改檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-upload"><a id="additionalUpload">上傳檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-view"><a id="additionalView"></a></td></tr><tr><td class="clickView" colspan="4" id="add" style="display:none"><div class="dowitemContent" style="display:block"><div class="imgBox"><iframe id="additionalViewImg" src="" style="width:100%; height: 100%;"></iframe></div></div></td></tr>');

            uploadObj.append(additionalArr.join(''));
            var addition = $('#addition');
            addition.show();
            additionItem(additionalFile, additionalFile_docId, additionalFileURL);
            break;
        case '5':
            additionalArr.push('<tr id="addition" style="display:none"><td class="file-photo"><a><img id="additionalPhoto" src=""></a></td><td class="file-zh">教育實習證影本</td><td class="file-en" id="additionalImg">無</td><td class="file-modify"><a id="additionalChange" style="display:none">修改檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-upload"><a id="additionalUpload">上傳檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-view"><a id="additionalView"></a></td></tr><tr><td class="clickView" colspan="4" id="add" style="display:none"><div class="dowitemContent" style="display:block"><div class="imgBox"><iframe id="additionalViewImg" src="" style="width:100%; height: 100%;"></iframe></div></div></td></tr>');

            uploadObj.append(additionalArr.join(''));
            var addition = $('#addition');
            addition.show();
            additionItem(additionalFile, additionalFile_docId, additionalFileURL);
            break;

        case '6':
            additionalArr.push('<tr id="addition" style="display:none"><td class="file-photo"><a><img id="additionalPhoto" src=""></a></td><td class="file-zh">相關休學、退學證明文件</td><td class="file-en" id="additionalImg">無</td><td class="file-modify"><a id="additionalChange" style="display:none">修改檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-upload"><a id="additionalUpload">上傳檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-view"><a id="additionalView"></a></td></tr><tr><td class="clickView" colspan="4" id="add" style="display:none"><div class="dowitemContent" style="display:block"><div class="imgBox"><iframe id="additionalViewImg" src="" style="width:100%; height: 100%;"></iframe></div></div></td></tr>');

            uploadObj.append(additionalArr.join(''));
            additionItem(additionalFile, additionalFile_docId, additionalFileURL)
            break;
        case '7':
            additionalArr.push('<tr id="addition" style="display:none"><td class="file-photo"><a><img id="additionalPhoto" src=""></a></td><td class="file-zh">畢業證書影本</td><td class="file-en" id="additionalImg">無</td><td class="file-modify"><a id="additionalChange" style="display:none">修改檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-upload"><a id="additionalUpload">上傳檔案</a><input type="file" name="additionalFile" style="position: absolute;top: 18px;opacity: 0;"></td><td class="file-view"><a id="additionalView"></a></td></tr><tr><td class="clickView" colspan="4" id="add" style="display:none"><div class="dowitemContent" style="display:block"><div class="imgBox"><iframe id="additionalViewImg" src="" style="width:100%; height: 100%;"></iframe></div></div></td></tr>');

            uploadObj.append(additionalArr.join(''));
            var addition = $('#addition');
            addition.show();
            additionItem(additionalFile, additionalFile_docId, additionalFileURL);
            break;
    }

    var clickView = $('.clickView');

    if (isPositiveFile_docId != '') {
        idPositivePhoto.attr("src", isPositiveFileURL);
        idPositiveImg.text(isPositiveFile);
        idPositiveUpload.parent().remove();
        idPositiveChange.show();
        idPositiveView.addClass('active');
        idPositiveViewImg.attr("src", isPositiveFileURL);
    } else {
        idPositiveChange.parent().remove();
    }

    if (isNegativeFile_docId !== '') {
        idNegativePhoto.attr("src", isNegativeFileURL);
        idNegativeImg.text(isNegativeFile);
        idNegativeUpload.parent().remove();
        idNegativeChange.show();
        idNegativeView.addClass('active');
        idNegativeViewImg.attr("src", isNegativeFileURL);
    } else {
        idNegativeChange.parent().remove();
    }


    if (studentIdPositiveFile_docId != '') {
        studentIdPositivePhoto.attr("src", studentIdPositiveFileURL);
        studentIdPositiveImg.text(studentIdPositiveFile);
        studentIdPositiveUpload.parent().remove();
        studentIdPositiveChange.show();
        studentIdPositiveView.addClass('active');
        studentIdPositiveViewImg.attr("src", studentIdPositiveFileURL);
    } else {
        studentIdPositiveChange.parent().remove();
    }

    if (studentIdNegativeFile_docId != '') {
        studentIdNegativePhoto.attr("src", studentIdNegativeFileURL);
        studentIdNegativeImg.text(studentIdNegativeFile);
        studentIdNegativeUpload.parent().remove();
        studentIdNegativeChange.show();
        studentIdNegativeView.addClass('active');
        studentIdNegativeViewImg.attr("src", studentIdNegativeFileURL);
    } else {
        studentIdNegativeChange.parent().remove();
    }

    //按預覽按鈕
    idPositiveView.on('click', function() {
        if (idPositiveView.hasClass('active')) {

            previewDocument($('#pos iframe').attr('src'));

            /*if ($("#pos").is(":hidden")) {
                clickView.hide();
                $('#pos').show();
            } else {
                $('#pos').hide();
            }*/
        }
    });

    idNegativeView.on('click', function() {
        if (idNegativeView.hasClass('active')) {

            previewDocument($('#neg iframe').attr('src'));

            /*if ($("#neg").is(":hidden")) {
                clickView.hide();
                $('#neg').show();
            } else {
                $('#neg').hide();
            }*/

        }
    });

    studentIdPositiveView.on('click', function() {
        if (studentIdPositiveView.hasClass('active')) {
            previewDocument($('#sPos iframe').attr('src'));

            /*if ($("#sPos").is(":hidden")) {
                clickView.hide();
                $('#sPos').show();
            } else {
                $('#sPos').hide();
            }*/
        }
    });

    studentIdNegativeView.on('click', function() {
        if (studentIdNegativeView.hasClass('active')) {

            previewDocument($('#sNeg iframe').attr('src'));

            /*if ($("#sNeg").is(":hidden")) {
                clickView.hide();
                $('#sNeg').show();
            } else {
                $('#sNeg').hide();
            }*/
        }
    });

    studentIdNegativeView.on('click', function() {
        if (studentIdNegativeView.hasClass('active')) {

            previewDocument($('#sNeg iframe').attr('src'));

            /*if ($("#sNeg").is(":hidden")) {
                clickView.hide();
                $('#sNeg').show();
            } else {
                $('#sNeg').hide();
            }*/
        }
    });
}

//額外需要上傳的資料
function additionItem(additionalFile, additionalFile_docId, additionalFileURL) {
    var additionalPhoto = $('#additionalPhoto');
    var additionalImg = $('#additionalImg');
    var additionalUpload = $('#additionalUpload');
    var additionalChange = $('#additionalChange');
    var additionalView = $('#additionalView');
    var additionalViewImg = $('#additionalViewImg');
    var addition = $('#addition');
    var clickView = $('.clickView');

    if (additionalFile_docId != '') {
        additionalPhoto.attr("src", additionalFileURL);
        additionalImg.text(additionalFile);
        additionalUpload.parent().remove();
        additionalChange.show();
        additionalView.addClass('active');
        additionalViewImg.attr("src", additionalFileURL);
    } else {
        additionalChange.parent().remove();
    }

    addition.show();

    //按預覽按鈕
    additionalView.on('click', function() {
        if (studentIdNegativeView.hasClass('active')) {
            previewDocument($('#add iframe').attr('src'));

            /*if (additionalView.hasClass('active')) {
                      if ($("#add").is(":hidden")) {
                          clickView.hide();
                          $('#add').show();
                      } else {
                          $('#add').hide();
                      }
                  }*/
        }
    });
}