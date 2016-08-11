$(document).ready(function() {
    //定義每個步驟要對應的javascript function
    var stepEventHandler = {
        "apply1_1": apply1_1,
        "apply1_2": apply1_2,
        "apply2": apply2,
        "apply3_1": apply3_1,
        "apply3_2": apply3_2,
        "apply_document_4": apply4_1,
        "apply_online_4": apply4_2,
        "apply_document_5_1": apply5_1_1,
        "apply_document_5_2": apply5_1_2,
        "apply_online_5": apply5_2,
        "apply_document_6": apply6_1,
        "apply_online_6": apply6_2
    };

    var nextEventHanlder = {
        "apply1_1": apply1_1_valid,
        "apply1_2": apply1_2_valid,
        "apply2": apply2_valid,
        "apply3_1": apply3_1_valid,
        "apply3_2": apply3_2_valid,
        "apply_document_4": apply4_1_valid,
        "apply_online_4": apply4_2_valid,
        "apply_document_5_1": apply5_1_1_valid,
        "apply_document_5_2": apply5_1_2_valid,
        "apply_online_5": apply5_2_valid
    };

    if (jumpStep == 'null') {
        jumpStep = '';
    }

    //2016-07-08 added by titan ，填入每個步驟需要控制input的事件
    var getInputEventHandler = {
        "apply1_1": function() {
            return {
                DomicileNeighborhood: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                DomicileAddress: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                address: {
                    convertFullWidth: true,
                    focusClearVal: true
                }
            };
        },
        "apply2": function() {
            return {
                father_neighborhood_domi: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                father_address_domi: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                mother_neighborhood_domi: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                mother_address_domi: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                thirdParty_neighborhood_domi: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                thirdParty_address_domi: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                spouse_neighborhood_domi: {
                    convertFullWidth: true,
                    focusClearVal: true
                },
                spouse_address_domi: {
                    convertFullWidth: true,
                    focusClearVal: true
                }
            };
        }
    };

    g_ajax({
        url: 'flow?action=continue&flowId=apply',
        //url: 'json/我要申請步驟6-2.json',
        //url: 'json/我要申請步驟6-1.json',
        //url: 'json/我要申請步驟5-2.json',
        //url: 'json/我要申請步驟5-1-2.json',
        //url: 'json/我要申請步驟5-1-1.json',
        //url: 'json/我要申請步驟4-2.json',
        //url: 'json/我要申請步驟4-1.json',
        //url: 'json/我要申請步驟3-2.json',
        //url: 'json/我要申請步驟3-1.json',
        //url: 'json/我要申請步驟2.json',
        //url: 'json/我要申請步驟1-2.json',
        //url: 'json/我要申請步驟1-1.json',
        //url: 'json/線上對保最後畫面.json',
        data: {
            step: jumpStep
        },
        callback: function(content) {
            /*console.debug(content);
             console.debug(stepEventHandler);
             console.debug(nextEventHanlder);*/

            //開始長流程畫面
            buildFlow(content, stepEventHandler, nextEventHanlder, undefined, getInputEventHandler);
        }
    });

});

var familyStatus;
var guarantorStatus;
var incomeTax;
var showInfo;
var isGuarantor;
var fatherDiv;
var motherDiv;
var thirdPartyDiv;
var spouseDiv;
var guarantorText;
var guarantorTextTemp;
//var loanChoiced; //step 3-2 選擇的貸款方式(1:依註冊繳費單登載之可貸金額; 2:自行選擇申貸項目)
var userMarried;
var domiLinerHidden;
var domiCityIdHidden;
var domiZipCoodeHidden;
var teleLinerHidden;
var teleZipcodeHidden;
var teleCityIdHidden;
var educationLevel; //educationLevel代表教育階段(1:博士 2:碩士 3:專科/大學 4:高中 5:國中 6:國小)
var department; //就讀科系	
var loanHidden;
var cityArr;
var zipArr;
var linerArr;
var isDayArr;
var zipCode;
var results;
var preLevel1;
var preLevel2;
var isAdult;
var nationalId;
var educationStageId;
var dayNightId;
//var sSelectValue;
var lastEnterDate;
var thirdPartyTitle; //判斷第三人是要叫監護權人或連帶保證人

function apply1_1_valid() {
    var validEmptyArray = [{
        name: 'name',
        msg: '姓名'
    }, {
        name: 'birthday0',
        msg: '生日',
        group: 'birthday'
    }, {
        name: 'birthday2',
        msg: '生日',
        group: 'birthday'
    }, {
        name: 'birthday4',
        msg: '生日',
        group: 'birthday'
    }, {
        name: 'email',
        msg: 'Email，如有疑問，請洽客戶服務專線02-8751-6665按5'
    }, {
        name: 'DomicileArea',
        msg: '戶籍電話',
        group: 'domicilePhone'
    }, {
        name: 'DomicilePhone',
        msg: '戶籍電話',
        group: 'domicilePhone'
    }, {
        name: 'areaTelephone',
        msg: '通訊電話',
        group: 'tel'
    }, {
        name: 'telephone',
        msg: '通訊電話',
        group: 'tel'
    }, {
        name: 'cellPhone',
        msg: '行動電話，如有疑問，請洽客戶服務專線02-8751-6665按5'
    }, {
        name: 'address',
        msg: '通訊地址',
        group: 'addr'
    }, {
        name: 'cityId',
        msg: '通訊地址',
        group: 'addr'
    }, {
        name: 'zipCode',
        msg: '通訊地址',
        group: 'addr'
    }, ];

    //Foolproof
    var isRecord = $('[name="isRecord"]').val();
    if (isRecord == 'N') {
        validEmptyArray.push({
            name: 'DomicileNeighborhood',
            msg: '戶籍地址',
            group: 'domicileAddr'
        });
        validEmptyArray.push({
            name: 'DomicileAddress',
            msg: '戶籍地址',
            group: 'domicileAddr'
        });
        validEmptyArray.push({
            name: 'domicileCityId',
            msg: '戶籍地址',
            group: 'domicileAddr'
        });
        validEmptyArray.push({
            name: 'domicileZipCode',
            msg: '戶籍地址',
            group: 'domicileAddr'
        });

        validEmptyArray.push({
            name: 'domicileLiner',
            msg: '戶籍地址',
            group: 'domicileAddr'
        });
    }
    //string
    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: validEmptyArray,
        validNumber: [{
            name: 'birthday0',
            msg: '生日',
            allowEmpty: false,
            group: 'birthday'
        }, {
            name: 'birthday2',
            msg: '生日',
            allowEmpty: false,
            group: 'birthday'
        }, {
            name: 'birthday4',
            msg: '生日',
            allowEmpty: false,
            group: 'birthday',
            hasHiddenCode: true,
            hiddenTarget: $('input[name="birthdayDay_hidden"]').val()
        }, {
            name: 'DomicileArea',
            msg: '戶籍電話',
            allowEmpty: false,
            group: 'domicilePhone'
        }, {
            name: 'DomicilePhone',
            msg: '戶籍電話',
            allowEmpty: false,
            group: 'domicilePhone',
            hasHiddenCode: true,
            hiddenTarget: $('input[name="d_phone"]').val()
        }, {
            name: 'areaTelephone',
            msg: '通訊電話',
            allowEmpty: false,
            group: 'tel'
        }, {
            name: 'telephone',
            msg: '通訊電話',
            allowEmpty: false,
            group: 'tel',
            hasHiddenCode: true,
            hiddenTarget: $('input[name="t_phone"]').val()
        }],
        validDecimal: [],
        validEmail: [{
            name: 'email',
            msg: 'Email',
            allowEmpty: false,
            hasHiddenCode: true,
            hiddenTarget: $('input[name="email_hidden"]').val()
        }],
        validDate: [{
            name: ['birthday0', 'birthday2', 'birthday4'],
            msg: '生日',
            splitEle: '/',
            format: 'ch',
            allowEmpty: false,
            group: 'birthday',
            hasHiddenCode: true,
            hiddenTarget: $('input[name="birthTarget_hidden"]').val()
        }],
        validMobile: [{
            name: 'cellPhone',
            msg: '行動電話',
            hasHiddenCode: true,
            hiddenTarget: $('input[name="mobile_hidden"]').val()
        }],
        validChinese: [{
            name: 'name',
            msg: '姓名',
            hasHiddenCode: true,
            hiddenTarget: $('input[name="name_hidden"]').val()
        }],
        errorDel: [],
        customizeFun: function(customizeValidResult) {
            //檢查全部的地址字數是否為39個字以內
            //戶籍地址
            var domicileCityIdText = $('[name="domicileCityId"]').parent().find('button').attr('title');
            var domicileZipCodeText = $('[name="domicileZipCode"]').parent().find('button').attr('title');
            var domicileLinerText = $('[name="domicileLiner"]').parent().find('button').attr('title');
            var dNeighborhoodText = $('[name="DomicileNeighborhood"]').val();
            var dAddressText = $('[name="DomicileAddress"]').val();
            var domiAllAddr = domicileCityIdText + domicileZipCodeText + domicileLinerText + dNeighborhoodText + dAddressText;
            if (domiAllAddr.length > 39) {
                customizeValidResult.push({
                    obj: $('[name="domicileCityId"]'),
                    msg: '戶籍地址長度不可大於40位'
                });
            }
            //通訊地址
            var cityIdText = $('[name="cityId"]').parent().find('button').attr('title');
            var zipCodeText = $('[name="zipCode"]').parent().find('button').attr('title');
            var addressText = $('[name="address"]').val();
            var allAddr = cityIdText + zipCodeText + addressText;
            if (allAddr.length > 40) {
                customizeValidResult.push({
                    obj: $('[name="cityId"]'),
                    msg: '通訊地址長度不可大於40位'
                });
            }

            var year = parseInt($('[name="birthday0"]').val());
            var month = parseInt($('[name="birthday2"]').val());
            var day = $('[name="birthday4"]').val();
            var now = new Date();
            var now_year = now.getFullYear() - 1911;


            if (year.length < 2) {
                customizeValidResult.push({
                    obj: $('[name="birthday0"]'),
                    msg: '生日格式錯誤'
                });
            } else {
                var yearInt = parseInt(year);
                if (now_year < yearInt) {
                    customizeValidResult.push({
                        obj: $('[name="birthday0"]'),
                        msg: '生日格式錯誤'
                    });
                }
            }

            var userName = $('[name="name"]').val();
            if (userName.length < 2 || userName.length > 20) {
                customizeValidResult.push({
                    obj: $('[name="name"]'),
                    msg: '姓名格式錯誤'
                });
            }

            var domicilePhoneVal = $('[name="DomicilePhone"]').val();
            var domicileAreaVal = $('[name="DomicileArea"]').val();
            if (domicileAreaVal.length < 2 || domicilePhoneVal.length < 5) {
                customizeValidResult.push({
                    obj: $('[name="DomicileArea"]'),
                    msg: '戶籍電話格式錯誤',
                    group: 'domicilePhone'
                });
            } else {
                if (domicileAreaVal.length + domicilePhoneVal.length > 10) {
                    customizeValidResult.push({
                        obj: $('[name="DomicileArea"]'),
                        msg: '戶籍電話格式錯誤',
                        group: 'domicilePhone'
                    });
                }
            }

            var marryStatus = $('[name="marryStatus"]').val();
            if (marryStatus == "") {
                customizeValidResult.push({
                    obj: $('[name="marry"]'),
                    msg: '請勾選婚姻狀況'
                });
            }
            var telephone = $('[name="telephone"]').val();
            var areaTelephone = $('[name="areaTelephone"]').val();
            if (areaTelephone.length < 2 || telephone.length < 5) {
                customizeValidResult.push({
                    obj: $('[name="areaTelephone"]'),
                    msg: '通訊電話格式錯誤',
                    group: 'tel'
                });
            } else {
                if (areaTelephone.length + telephone.length > 10) {
                    customizeValidResult.push({
                        obj: $('[name="areaTelephone"]'),
                        msg: '通訊電話格式錯誤',
                        group: 'tel'
                    });
                }
            }

        }
    });
    //alert(res);
    if (res == true) {
        return true;
    } else {
        return false;
    }
}

function apply1_2_valid() {
    //Foolproof
    var result = null;
    var resultArr = [];
    if (userMarried == 'N') { //未婚
        $('.unMarried').find('input:checked').each(function() {
            var isParent = $(this).parent();
            result = isParent.find('label');
            resultArr.push(result.text());
        });
    } else { //已婚
        $('.married').find('input:checked').each(function() {
            var isParent = $(this).parent();
            result = isParent.find('label');
            resultArr.push(result.text());
        });
    }

    if (resultArr[1] == '父母雙方過世') {
        resultArr[0] = resultArr[1];
        resultArr.pop();
    }

    $('[name="familyStatusLevel1Text"]').val(resultArr[0]);
    $('[name="familyStatusLevel2Text"]').val(resultArr[1]);

    if (userMarried == 'N') { //未婚
        if ($('[name="familyStatusLevel2"]').val() == '0') {
            $('#errTip').show();
            return false;
        } else if ($('[name="familyStatusLevel2"]').val() == '' && $('[name="familyStatusLevel1"]').val() != '4') {
            $('#errTip').show();
            return false;
        } else {
            return true;
        }
    } else { //已婚
        if ($('[name="familyStatusLevel2"]').val() == '0') {
            $('#errTip').show();
            return false;
        } else if ($('[name="familyStatusLevel2"]').val() == '') {
            $('#errTip').show();
            return false;
        } else {
            return true;
        }
    }
}

function apply2_valid() {
    //Foolproof
    var family = '';
    var familyName = [];
    var result;
    var resultFinal = true;
    var show = $('[name="showInfo"]').val();
    var lastIsGuarantor = $('[name="lastIsGuarantor"]');
    var isGuarantorTag = $('[name="isGuarantor"]');
    var isIncomeTaxTag = $('[name="isIncomeTax"]');
    var adultHidden = $('[name="adultHidden"]');
    var thirdPartyTitle = $('#thirdPartyTitle');
    console.debug(show);
    console.debug(isGuarantor);
	
	//若為小網, 則會展開關係人下方的表格, 以免因為沒有展開表格, 使用者會不知道有錯誤訊息
	if ($(window).width() < 769) {
		$('.openBtn').trigger('click');
	}

    var family_arr = [],
        validArr = {
            validEmpty_arr: [],
            validNumber_arr: [],
            validIdentity_arr: [],
            validDate_arr: [],
            validMobile_arr: [],
            validChinese_arr: []
        };

    for (var i = 0; i <= 3; i++) { //依序檢查父親,母親,第三人,配偶的表格是否有展開
        var foolproofFamily = show.substr(i, 1);
        var canForeigner = isGuarantorTag.val().substr(i, 1) == '1' ? '0' : '1'; //可以是1，不可以是0

        //若值為1,則表示此關係人的表格有展開,即需要有防呆
        switch (i) {
            case 0:
                if (foolproofFamily == '1' || foolproofFamily == '3') {
                    family = 'father_';
                    //familyName = '父親';
                    familyName = '';
                    result = familyFoolproof(family, familyName, validArr, canForeigner, lastIsGuarantor.val(), isGuarantorTag.val(), 0);
                    resultFinal = result;

                    family_arr.push({
                        input: 'father_',
                        name: '父親'
                    });
                }
                break;
            case 1:
                if (foolproofFamily == '1' || foolproofFamily == '3') {
                    family = 'mother_';
                    //familyName = '母親';
                    familyName = '';
                    result = familyFoolproof(family, familyName, validArr, canForeigner, lastIsGuarantor.val(), isGuarantorTag.val(), 1);
                    if (resultFinal == true) {
                        if (result == false) {
                            resultFinal = result;
                        }
                    }

                    family_arr.push({
                        input: 'mother_',
                        name: '母親'
                    });
                }
                break;
            case 2:
                if (foolproofFamily == '1' || foolproofFamily == '3') {
                    //console.debug(thirdPartyTitle.text());
                    family = 'thirdParty_';
                    //familyName = thirdPartyTitle.text();
                    familyName = '';
                    result = familyFoolproof(family, familyName, validArr, canForeigner, lastIsGuarantor.val(), isGuarantorTag.val(), 2);
                    if (resultFinal == true) {
                        if (result == false) {
                            resultFinal = result;
                        }
                    }

                    family_arr.push({
                        input: 'thirdParty_',
                        name: thirdPartyTitle.text()
                    });
                }
                break;
            case 3:
                if (foolproofFamily == '1' || foolproofFamily == '3') {
                    family = 'spouse_';
                    //familyName = '配偶';
                    familyName = '';
                    result = familyFoolproof(family, familyName, validArr, canForeigner, lastIsGuarantor.val(), isGuarantorTag.val(), 3);
                    if (resultFinal == true) {
                        if (result == false) {
                            resultFinal = result;
                        }
                    }

                    family_arr.push({
                        input: 'spouse_',
                        name: '配偶'
                    });
                }
                break;
        }
    }

    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: validArr.validEmpty_arr,
        validNumber: validArr.validNumber_arr,
        validDecimal: [],
        validEmail: [],
        validIdentity: validArr.validIdentity_arr,
        validDate: validArr.validDate_arr,
        validMobile: validArr.validMobile_arr,
        validChinese: validArr.validChinese_arr,
        errorDel: [],
        customizeFun: function(customizeValidResult) {
            $.each(family_arr, function(i, family) {
                //檢查全部的地址字數是否為39個字以內
                //戶籍地址
                var domicileCityIdText = $('[name="' + family.input + 'cityId_domi"]').parent().find('button').attr('title');
                var domicileZipCodeText = $('[name="' + family.input + 'zipCode_domi"]').parent().find('button').attr('title');
                var domicileLinerText = $('[name="' + family.input + 'liner_domi"]').parent().find('button').attr('title');
                var dNeighborhoodText = $('[name="' + family.input + 'neighborhood_domi"]').val();
                var dAddressText = $('[name="' + family.input + 'address_domi"]').val();
                var domiAllAddr = domicileCityIdText + domicileZipCodeText + domicileLinerText + dNeighborhoodText + dAddressText;
                if (domiAllAddr.length > 39) {
                    customizeValidResult.push({
                        obj: $('[name="' + family.input + 'cityId_domi"]'),
                        msg: '戶籍地址長度不可大於40位'
                    });
                }

                var telephone = $('[name="' + family.input + 'phone"]').val();
                var areaTelephone = $('[name="' + family.input + 'regionCode"]').val();
                if (areaTelephone.length < 2 || telephone.length < 5) {
                    customizeValidResult.push({
                        obj: $('[name="' + family.input + 'regionCode"]'),
                        msg: '通訊電話格式錯誤',
                        group: '' + family.input + 'telephone'
                    });
                } else if (areaTelephone.length + telephone.length > 10) {
                    customizeValidResult.push({
                        obj: $('[name="' + family.input + 'phone"]'),
                        msg: '通訊電話格式錯誤',
                        group: '' + family.input + 'telephone'
                    });
                }
                var user_birthday = $('[name="user_birthday_hidden"]').val();
                console.log('user_birthday:', user_birthday);
                var birth = new Date(parseInt($('[name="' + family.input + 'birthday0"]').val()) + 1911, $('[name="' + family.input + 'birthday2"]').val());
                if (family.input == 'father_' || family.input == 'mother_') {
                    var user_birth = new Date(parseInt(user_birthday.substr(0, 3)) + 1911, user_birthday.substr(3, 2));

                    var b_birthDiff = birth - user_birth;

                    if (b_birthDiff > 0) {
                        customizeValidResult.push({
                            obj: $('[name="' + family.input + 'birthday0"]'),
                            msg: family.name + '出生需早於申請人',
                            group: '' + family.input + 'birthday'
                        });
                    }
                }

                var guarantorText = $('input[name="guarantorText"]').val();

                //if (family.name.localeCompare(guarantorText) == 0) {
                //alert(family.input);
                var today = new Date();
                if (family.input == 'thirdParty_') {
                    if (today.getFullYear() - (parseInt($('[name="' + family.input + 'birthday0"]').val()) + 1911) < 20) {
                        customizeValidResult.push({
                            obj: $('[name="' + family.input + 'birthday0"]'),
                            msg: '監護人需年滿20歲',
                            group: '' + family.input + 'birthday'
                        });
                    }
                }
                var userId = $('[name="' + family.input + 'id"]').val();
                var userId_arr = userId.split("");
                var isFatherForeigner = isIncomeTaxTag.val().substr(0, 1);
                var isMotherForeigner = isIncomeTaxTag.val().substr(1, 1);
                if (userId.length != 10) {
                    customizeValidResult.push({
                        obj: $('[name="' + family.input + 'id"]'),
                        msg: '輸入長度不符'
                    });
                } else if (family.input == 'father_' && userId_arr[1] != 1) {
                    if (isFatherForeigner != 1) {
                        customizeValidResult.push({
                            obj: $('[name="' + family.input + 'id"]'),
                            msg: '父親身分證第二碼需為1'
                        });
                    }
                } else if (family.input == 'mother_' && userId_arr[1] != 2) {
                    if (isMotherForeigner != 1) {
                        customizeValidResult.push({
                            obj: $('[name="' + family.input + 'id"]'),
                            msg: '母親身分證第二碼需為2'
                        });
                    }
                }

                var userName = $('[name="' + family.input + 'name"]').val();
                if (userName.length < 2 || userName.length > 20) {
                    customizeValidResult.push({
                        obj: $('[name="' + family.input + 'name"]'),
                        msg: '姓名格式錯誤'
                    });
                }

                //如果有顯示第三人的表格,則要對"與申請人之關係"的下拉式選單防呆
                if ($('[name="showInfo"]').val().substr(2, 1) == '1' && family.input == 'thirdParty_') {
                    var relationship = $('[name="thirdParty_relationship"]');
                    var relationshipOption = relationship.find('option:selected').val();
                    if (relationshipOption == '') {
                        customizeValidResult.push({
                            obj: $('[name="thirdParty_relationship"]'),
                            msg: '請輸入與申請人之關係'
                        });
                    }
                }
            });
        }
    });


    var radioResult = true; //檢查radio或checkbox有沒有點選
    //檢查合計所得對象是否有勾選
    if ($('#incomeTaxRadio').is(':visible')) {
        var fCheckbox = $('[name="father_checkbox"]');
        var mCheckbox = $('[name="mother_checkbox"]');
        if (fCheckbox.val() == '1' || mCheckbox.val() == '1') {
            $('#checkboxGroup').hide();
        } else {
            $('#checkboxGroup').text('請勾選合計所得對象');
            $('#checkboxGroup').show();
            radioResult = false;
        }
    }

    //如果已經輸入框都無誤, 則把error的文字刪除
    if (res) {
        $.each($('.error-msg'), function(i, v) {
            var div = $(v);
            if (div.attr('id') != 'checkboxGroup') {
                div.text('');
            }
        });
    }

    //2016-06-10 by added 因為resultFinal不可能是true，因為在上面的for loop就已經被回傳物件了
    //if( resultFinal == true && res == true && radioResult == true ){   
    if (res == true && radioResult == true) {
        return true;
    } else {
        return false;
    }

}

//全家人的防呆(step 2)
function familyFoolproof(family, familyName, validArr, canForeigner, lastIsG, nowIsG, index) {
    var guarantor = $('input[name="id_hidden"]').attr('guarantor');
    var isRecordHidden = $('[name="isRecordHidden"]');
    var isChangeHidden = $('[name="isChangeHidden"]');
    var isSpouseForeignerHidden = $('[name="isSpouseForeignerHidden"]');
    var guarantorName = family.split('_')[0];
    var currentGua = lastIsG.substr(index, 1);
    var nowGua = nowIsG.substr(index, 1);
    //alert(guarantorName);

    var validEmptyArray = [];

    // 需檢查空值之欄位
    validArr.validEmpty_arr.push({
        name: '' + family + 'id',
        msg: '' + familyName + '身分證字號'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'name',
        msg: '' + familyName + '姓名'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'birthday0',
        msg: '' + familyName + '生日',
        group: '' + family + 'birthday'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'birthday2',
        msg: '' + familyName + '生日',
        group: '' + family + 'birthday'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'birthday4',
        msg: '' + familyName + '生日',
        group: '' + family + 'birthday'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'regionCode_domi',
        msg: '' + familyName + '戶籍電話',
        group: '' + family + 'domicilePhone'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'phone_domi',
        msg: '' + familyName + '戶籍電話',
        group: '' + family + 'domicilePhone'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'regionCode',
        msg: '' + familyName + '通訊電話',
        group: '' + family + 'telephone'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'phone',
        msg: '' + familyName + '通訊電話',
        group: '' + family + 'telephone'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'mobile',
        msg: '' + familyName + '行動電話'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'neighborhood',
        msg: '' + familyName + '通訊地址',
        group: '' + family + 'addr'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'address',
        msg: '' + familyName + '通訊地址',
        group: '' + family + 'addr'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'cityId',
        msg: '' + familyName + '通訊地址',
        group: '' + family + 'addr'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'zipCode',
        msg: '' + familyName + '通訊地址',
        group: '' + family + 'addr'
    });
    validArr.validEmpty_arr.push({
        name: '' + family + 'liner',
        msg: '' + familyName + '通訊地址',
        group: '' + family + 'addr'
    });

    // 需檢查是否為數字之欄位
    validArr.validNumber_arr.push({
        name: '' + family + 'birthday0',
        msg: '' + familyName + '生日',
        allowEmpty: false,
        group: '' + family + 'birthday'
    });
    validArr.validNumber_arr.push({
        name: '' + family + 'birthday2',
        msg: '' + familyName + '生日',
        allowEmpty: false,
        group: '' + family + 'birthday'
    });
    validArr.validNumber_arr.push({
        name: '' + family + 'birthday4',
        msg: '' + familyName + '生日',
        allowEmpty: false,
        group: '' + family + 'birthday'
    });
    var mobile_numObj = {
        name: '' + family + 'mobile',
        msg: '' + familyName + '行動電話',
        allowEmpty: false
    };
    if (family == guarantorName + '_') {
        mobile_numObj['hasHiddenCode'] = true;
        mobile_numObj['hiddenTarget'] = $('div#' + guarantorName + ' input[name="mobile_hidden"]').val()
    }
    validArr.validNumber_arr.push(mobile_numObj);
    validArr.validNumber_arr.push({
        name: '' + family + 'regionCode',
        msg: '' + familyName + '通訊電話',
        allowEmpty: false,
        group: '' + family + 'telephone'
    });
    validArr.validNumber_arr.push({
        name: '' + family + 'phone',
        msg: '' + familyName + '通訊電話',
        allowEmpty: false,
        group: '' + family + 'telephone',
        hasHiddenCode: true,
        hiddenTarget: $('div#' + guarantorName + ' input[name="phone_hidden"]').val()
    });

    // 需檢查身分證格式之欄位
    var id_numObj = {
        name: '' + family + 'id',
        msg: '' + familyName + '身分證字號',
        allowEmpty: false
    };
    //若為合計所得對象,就開放外國人的檢核
    if (canForeigner == '1') {
        id_numObj.isForeigner = true;
    }
    console.debug(family);
    console.debug(id_numObj);

    //若配偶為外國人, 就開放外國人的檢核
    if (family == 'spouse_') {
        if (isSpouseForeignerHidden.val() == true) {
            id_numObj.isForeigner = true;
        }
    }

    if (family == guarantorName + '_') {
        id_numObj['hasHiddenCode'] = true;
        id_numObj['hiddenTarget'] = $('div#' + guarantorName + ' input[name="id_hidden"]').val()
            //alert(family+';'+guarantorName+':'+ $('div#' + guarantorName + ' input[name="id_hidden"]').val());
    }
    validArr.validIdentity_arr.push(id_numObj);

    // 需檢查日期格式之欄位
    validArr.validDate_arr.push({
        name: [family + 'birthday0', family + 'birthday2', family + 'birthday4'],
        msg: '生日',
        //val: $('[name="' + family + 'birthday0' + '"]').val() + '/' + $('[name="' + family + 'birthday2' + '"]').val() + '/' + $('[name="' + family + 'birthday4' + '"]').val(),
        splitEle: '/',
        format: 'ch',
        allowEmpty: false,
        group: family + 'birthday'
    });

    // 需檢查手機格式之欄位
    var mobileObj = {
        name: '' + family + 'mobile',
        msg: '' + familyName + '行動電話'
    };
    if (family == guarantorName + '_') {
        mobileObj['hasHiddenCode'] = true;
        mobileObj['hiddenTarget'] = $('div#' + guarantorName + ' input[name="mobile_hidden"]').val();
    }
    validArr.validMobile_arr.push(mobileObj);

    // 檢查是否輸入中文
    var nameObj = {
        name: '' + family + 'name',
        msg: '' + familyName + '姓名'
    };
    if (family == guarantorName + '_') {
        nameObj['hasHiddenCode'] = true;
        nameObj['hiddenTarget'] = $('div#' + guarantorName + ' input[name="name_hidden"]').val()
    }
    validArr.validChinese_arr.push(nameObj);

    if (isRecordHidden.val() == 'Y' && currentGua == '1' && nowGua == '1') {

    } else {
        var sameAddressHidden = $('[name="' + family + 'sameAddrHidden"]');
        if (sameAddressHidden.val() != 'Y') {
            console.debug(validArr.validEmpty_arr);
            validArr.validEmpty_arr.push({
                name: '' + family + 'neighborhood_domi',
                msg: '' + familyName + '戶籍地址',
                group: '' + family + 'domicileAddr'
            });
            validArr.validEmpty_arr.push({
                name: '' + family + 'address_domi',
                msg: '' + familyName + '戶籍地址',
                group: '' + family + 'domicileAddr'
            });
            validArr.validEmpty_arr.push({
                name: '' + family + 'cityId_domi',
                msg: '' + familyName + '戶籍地址',
                group: '' + family + 'domicileAddr'
            });
            validArr.validEmpty_arr.push({
                name: '' + family + 'zipCode_domi',
                msg: '' + familyName + '戶籍地址',
                group: '' + family + 'domicileAddr'
            });
            validArr.validEmpty_arr.push({
                name: '' + family + 'liner_domi',
                msg: '' + familyName + '戶籍地址',
                group: '' + family + 'domicileAddr'
            });
        }
    }

    console.debug('-----------------------------');
    console.debug(validArr.validEmpty_arr);

    return validArr;
}

function apply3_1_valid() {
    //Foolproof
    var selectValue = $('[name="student_educationStage"]').parent().find('button').attr('title');
    var selectValueHidden = $('[name="stageSelectValue"]');
    var lastDateHidden = $('[name="lastDate"]');
    var loanAmtHidden = $('[name="loanAmt"]')

    //0<「本次申貸金額｣<=選擇之教育階段可申貸總額度(高中職30萬.大學醫學(牙醫)系150萬.其他階段80萬)。
    if (selectValue == '大學醫學（牙醫）系') {
        selectValueHidden.val('1');
        loanAmtHidden.val('1,500,000');

    } else if (selectValue == '高中職') {
        selectValueHidden.val('2');
        loanAmtHidden.val('300,000');
    } else if (selectValue !== '請選擇') {
        selectValueHidden.val('0');
        loanAmtHidden.val('800,000');
    }

    var family = 'student_';

    var validArr = [{
        name: '' + family + 'educationStage',
        msg: '教育階段'
    }, {
        name: '' + family + 'isNational',
        msg: '學校名稱',
        group: '' + family + 'name'
    }, {
        name: '' + family + 'name',
        msg: '學校名稱',
        group: '' + family + 'name'
    }, {
        name: '' + family + 'isDay',
        msg: '學校名稱',
        group: '' + family + 'name'
    }, {
        name: '' + family + 'grade',
        msg: '升學年級'
    }, {
        name: '' + family + 'year_enter',
        msg: '入學日期',
        group: '' + family + 'enter'
    }, {
        name: '' + family + 'month_enter',
        msg: '入學日期',
        group: '' + family + 'enter'
    }];

    if (selectValueHidden.val() == '1') {
        //alert($('[name="' + family + 'department"]').length);
        validArr.push({
            name: '' + family + 'department',
            msg: '教育階段'
        });
    }

    console.debug(validArr);

    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: validArr,
        validNumber: [{
            name: 'student_year_enter',
            msg: '入學日期',
            allowEmpty: false,
            group: '' + family + 'enter'
        }, {
            name: 'student_month_enter',
            msg: '入學日期',
            allowEmpty: false,
            group: '' + family + 'enter'
        }],
        validDecimal: [],
        validEmail: [],
        validDate: [{
            name: ['student_year_enter', 'student_month_enter', '1'],
            msg: '入學日期',
            //val: $('[name="student_year_enter"]').val() + '/' + $('[name="student_month_enter"]').val() + '/1',
            splitEle: '/',
            format: 'ch',
            allowEmpty: false,
            group: '' + family + 'enter'
        }],
        errorDel: [],
        customizeFun: function(customizeValidResult) {
            var student_class = $('[name="student_class"]').val();
            if (student_class.length > 10) {
                customizeValidResult.push({
                    obj: $('[name="student_class"]'),
                    msg: '班級格式錯誤'
                });
            }
            var student_id = $('[name="student_id"]').val();
            if (student_id.length > 10) {
                customizeValidResult.push({
                    obj: $('[name="student_id"]'),
                    msg: '學號格式錯誤'
                });
            }

            /** edit by JiaRu 160523
             var student_year_enter = $('[name="student_year_enter"]').val();
             var d = new Date();
             var yearsAD = d.getFullYear();
             var years = yearsAD - 1911;
             var student_month_enter = $('[name="student_month_enter"]').val();

             if (student_month_enter.length == 1) {
                student_month_enter = '0' + student_month_enter;
            }
             lastDateHidden.val(student_year_enter + '/' + student_month_enter);

             if (student_year_enter.length < 2 || student_year_enter > years || student_month_enter <= 0 || student_month_enter > 12) {
                customizeValidResult.push({
                    obj: $('[name="student_year_enter"]'),
                    msg: '入學日期錯誤'
                });
            }
             **/

            console.debug(lastEnterDate);

            //填寫日期不得早於上次填寫之入學日期
            var student_year_enter = $('[name="student_year_enter"]').val();
            var student_month_enter = $('[name="student_month_enter"]').val();
            if (lastEnterDate != '') {
                var lastYear, lastMonth;
                if (lastEnterDate.length == 5) {
                    lastYear = lastEnterDate.substr(0, 3);
                    lastMonth = lastEnterDate.substr(3, 2);
                } else if (lastEnterDate.length == 4) {
                    lastYear = lastEnterDate.substr(0, 2);
                    lastMonth = lastEnterDate.substr(2, 2);
                }

                if (student_year_enter < lastYear) {

                    customizeValidResult.push({
                        obj: $('[name="student_year_enter"]'),
                        msg: '本次填寫日期不得早於上次填寫之入學日期'
                    });
                }
                if (student_year_enter == lastYear && student_month_enter < lastMonth) {

                    customizeValidResult.push({
                        obj: $('[name="student_year_enter"]'),
                        msg: '本次填寫日期不得早於上次填寫之入學日期'
                    });
                }
            }
        }
    });

    var visible = true;
    if ($('#overYear-msg').is(':visible')) {
        visible = false;
        $('#overYear-msg').hide();
    }

    if (res == true && visible == true) {
        return true;
    } else {
        return false;
    }
}

function apply3_2_valid() {
    //Foolproof    
    var errRes = true;
    var result = true;
    var errorTip = $('#errorTip');

    var bill = $('#apm_1:checked');
    var free = $('#apm_2:checked');
    var billLen = bill.length;
    var freeLen = free.length;
    var loanChoiced = $('[name="loanPrice"]').val();
    var sSelectValue = $('[name="stageSelectValue"]').val();
    var whiteList = $('[name="whiteListHidden"]').val();

    if (billLen <= 0 && freeLen <= 0) {
        errorTip.show();
        errRes = false;
    } else {
        errorTip.hide();
        errRes = true;
    }

    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: [],
        validNumber: [],
        validDecimal: [],
        validEmail: [],
        validDate: [],
        errorDel: [],
        customizeFun: function(customizeValidResult) {
            if (loanChoiced == '1') {
                var register = $('#loansSum').val();
                var sum = $('[name="accordingToBill_sum_hidden"]').val();
                var books = $('#accordingToBill_book').val();
                var life = $('#accordingToBill_life').val();

                if (register <= 0 || register == null) {
                    if (whiteList == 'N') {
                        customizeValidResult.push({
                            obj: $('#loansSum'),
                            msg: '請輸入申貸金額'
                        });
                    }
                }

                if (life > 40000) {
                    //alert("生活費不可大於30,000");
                    customizeValidResult.push({
                        obj: $('#accordingToBill_life'),
                        msg: '生活費不可大於40,000'
                    });
                }

                if (sSelectValue == '2') { //高中
                    if (books > 1000) {
                        //alert("書籍費不可大於1000");
                        customizeValidResult.push({
                            obj: $('#accordingToBill_book'),
                            msg: '金額不可大於1,000'
                        });
                    }
                    if (sum > 300000) {
                        //alert("申貸金額不可大於300,000");
                        customizeValidResult.push({
                            obj: $('#accordingToBill_sum'),
                            msg: '申貸金額不可大於300,000'
                        });
                    }
                } else { //非高中
                    if (books > 3000) {
                        //alert("書籍費不可大於3000");
                        customizeValidResult.push({
                            obj: $('#accordingToBill_book'),
                            msg: '金額不可大於3,000'
                        });
                    }
                    if (sSelectValue == '1') {
                        if (sum > 1500000) {
                            //alert("申貸金額不可大於1,500,000");
                            customizeValidResult.push({
                                obj: $('#accordingToBill_sum'),
                                msg: '申貸金額不可大於1,500,000'
                            });
                        }
                    } else {
                        if (sum > 800000) {
                            //alert("申貸金額不可大於800,000");
                            customizeValidResult.push({
                                obj: $('#accordingToBill_sum'),
                                msg: '申貸金額不可大於800,000'
                            });
                        }
                    }
                }

            } else if (loanChoiced == '2') {
                var sum = $('[name="freedom_sum"]').val();
                var books = $('#freedom_book').val();
                var life = $('#freedom_life').val();

                if (life > 40000) {
                    //alert("生活費不可大於30,000");
                    customizeValidResult.push({
                        obj: $('#freedom_life'),
                        msg: '生活費不可大於40,000'
                    });
                }

                if (sSelectValue == '2') { //高中
                    if (books > 1000) {
                        //alert("書籍費不可大於1000");
                        customizeValidResult.push({
                            obj: $('#freedom_book'),
                            msg: '金額不可大於1,000'
                        });
                    }
                    if (sum > 300000) {
                        //alert("申貸金額不可大於300,000");
                        customizeValidResult.push({
                            obj: $('#freedom_sum'),
                            msg: '申貸金額不可大於300,000'
                        });
                    }
                } else { //非高中
                    if (books > 3000) {
                        //alert("書籍費不可大於3000");
                        customizeValidResult.push({
                            obj: $('#freedom_book'),
                            msg: '金額不可大於3,000'
                        });
                    }
                    if (sSelectValue == '1') {
                        if (sum > 1500000) {
                            //alert("申貸金額不可大於1,500,000");
                            customizeValidResult.push({
                                obj: $('#freedom_sum'),
                                msg: '申貸金額不可大於1,500,000'
                            });
                        }
                    } else {
                        if (sum > 800000) {
                            //alert("申貸金額不可大於800,000");
                            customizeValidResult.push({
                                obj: $('#freedom_sum'),
                                msg: '申貸金額不可大於800,000'
                            });
                        }
                    }
                }
            }

        }
    });
    if (loanChoiced == '1') {
        var sum = $('[name="accordingToBill_sum_hidden"]').val();
        if (sum <= 0 && whiteList == 'N') {
            result = false;
            $('.modalBtn').trigger('click');
        } else {
            result = true;
            loanHidden.val(sum);
        }
    } else if (loanChoiced == '2') {
        var sum = $('[name="freedom_sum"]').val();

        if (sum <= 0 && whiteList == 'N') {
            result = false;
            $('.modalBtn').trigger('click');
        } else {
            result = true;
            loanHidden.val(sum);
        }
    }

    if (res == true && errRes == true && result == true) {
        return true;
    } else {
        return false;
    }
}

function apply4_1_valid() {
    //Foolproof
    //檢查文件是否都有上傳

    var result = true;
    var lowIncomeTaxResult = true;

    $.each($(".file-en"), function(i, input) {
        console.debug(input);
        input = $(input);
        if (input.attr('id') == 'lowIncomeImg_0') { //如果要檢查低收入戶,要先檢查低收入戶的選項是否有展開
            if (!($('#lowIncomeImg_0').is(':hidden'))) {
                if (!input.hasClass('new')) {
                    var thisText = input.text();
                    if (thisText == '無') {
                        $('#hasDocument').show();
                        lowIncomeTaxResult = false;
                    }
                }
            }
        } else {
            if (!input.hasClass('new')) {
                var thisText = input.text();
                if (thisText == '無') {
                    $('#hasDocument').show();
                    result = false;
                }
                //else {
                //$('#hasDocument').hide();
                //result = true;
                //}
            }
        }
    });

    //alert(result);

    //檢查上傳文件合計大小是否超過10MB
    //var size = $('.fileSize');
    var sizeSum = 0;
    var documentSizeErr = $('#documentSize');
    var sizeTag = true;

    //2016-07-23 added by titan 直接算所有的檔案大小加總
    var fileSizeArray = ['fileSize_idPositive', 'fileSize_idNegative', 'fileSize_register', 'fileSize_lowIncome'];
    $.each(fileSizeArray, function(i, className) {
        $('.' + className).each(function(j, sizeHidden) {
            var size = $(sizeHidden).val();
            console.debug('className = ' + className + ',size = ' + size);
            sizeSum += parseInt(size);
        });
    });

    console.debug('sizeSum = ' + sizeSum);

    if (sizeSum > 10000000) {
        sizeTag = false;
        documentSizeErr.show();
    } else {
        documentSizeErr.hide();
    }

    /**

     //檢查檔案總size
     var isPositive_hidden = $('[name="isPositive_hidden"]').val();
     var isNegative_hidden = $('[name="isNegative_hidden"]').val();
     var register_hidden = $('[name="register_hidden"]').val();
     var lowIncome_hidden = $('[name="lowIncome_hidden"]').val();
     var documentSizeErr = $('#documentSize');
     var hiddenArr = [isPositive_hidden, isNegative_hidden, register_hidden, lowIncome_hidden];
     var tenSize = 10000000;
     var totalSize = 0;
     var sizeTag = true;

     $.each(hiddenArr, function(i, v) {
        var toInt = parseInt(v);
        totalSize = totalSize + toInt;
    });

     if (tenSize - totalSize <= 0) {
        sizeTag = false;
        documentSizeErr.show();
    } else {
        documentSizeErr.hide();
    }
     **/

    if (result == true && sizeTag == true && lowIncomeTaxResult == true) {
        return true;
    } else {
        return false;
    }
}

function apply4_2_valid() {
    //Foolproof
    var tSelected = $('[name="timeSelected"]').val();
    if (tSelected == '' || tSelected == '0') {
        GardenUtils.display.popup({
            title: '',
            content: '<p>請選擇對保分行與預約時段<p><p>如有疑問，請洽客戶服務專線02-8751-6665按5。</p>',
            closeCallBackFn: function() {},
            isShowSubmit: false
        });
        return false;
    } else if (tSelected != '') {
        return true;
    }
}

function apply5_1_1_valid() {
    //Foolproof
    //檢查檔案總size
    var isPositive_hidden = $('[name="isPositive_hidden"]').val();
    var isNegative_hidden = $('[name="isNegative_hidden"]').val();
    var register_hidden = $('[name="register_hidden"]').val();
    var lowIncome_hidden = $('[name="lowIncome_hidden"]').val();
    var documentSizeErr = $('#documentSize');
    var hiddenArr = [isPositive_hidden, isNegative_hidden, register_hidden, lowIncome_hidden];
    var tenSize = 10000000;
    var totalSize = 0;
    var sizeTag = true;

    $.each(hiddenArr, function(i, v) {
        var toInt = parseInt(v);
        totalSize = totalSize + toInt;
    });

    if (tenSize - totalSize <= 0) {
        sizeTag = false;
        documentSizeErr.show();
    } else {
        documentSizeErr.hide();
    }

    if (sizeTag == true) {
        return true;
    } else {
        return false;
    }
}

function apply5_1_2_valid() {
    //Foolproof

    //string
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

    //alert(res);
    if (res == true) {
        return true;
    } else {
        return false;
    }
}

function apply5_2_valid() {
    //Foolproof
    return true;
}

function apply1_1(content) {
    console.debug(content);

    //把得到的資料塞進畫面中
    //
    //取得的user資料
    var id = content.id;
    var name = content.name;
    var birthday = content.birthday;
    //user_birthday = content.birthday;
    var domicileCityId = content.domicileAddress.cityId;
    var domicileZipCode = content.domicileAddress.zipCode;
    var domicileCityName = content.domicileAddress.cityName;
    var domicileZipCodeName = content.domicileAddress.zipCodeName;
    var domicileLiner = content.domicileAddress.liner;
    var cityId = content.teleAddress.cityId;
    var zipCode = content.teleAddress.zipCode;
    var liner = content.teleAddress.liner;
    var mobile = content.mobile;
    var email = content.email;
    var domicilePhone = content.domicilePhone.phone;
    var domicileCode = content.domicilePhone.regionCode;
    var phone = content.telePhone.phone;
    var code = content.telePhone.regionCode;
    var domiAddr = content.domicileAddress.address;
    var domiNei = content.domicileAddress.neighborhood;
    var addr = content.teleAddress.address;
    var nei = content.teleAddress.neighborhood;
    var isRecord = content.isRecord;
    var isPopUp = content.isPopUp;
    var isEtabs = content.isEtabs;
    var domiLinerName = content.domicileAddress.linerName;
    var lName = content.teleAddress.linerName;
    var yearBirthday = content.yearBirthday;
    var monthBirthday = content.monthBirthday;
    var dayBirthday = content.dayBirthday;

    //畫面上要顯示的user資料之tag id
    var userMarry = $('#married');
    var userId = $('#joyId');
    var userName = $('#joyName');
    var userBirthday = $('#joyBirthday');
    var userSingle = $('#single');
    var dNeighborhood = $('#dNeighborhood');
    var dLinerName = $('#domicileLinerName');
    var dAddress = $('#dAddress');
    var neighborhood = $('#neighborhood');
    var linerName = $('#linerName');
    var address = $('#address');
    var userMobile = $('[name="cellPhone"]');
    var userEmail = $('[name="email"]');
    var userDomiPhone = $('[name="DomicilePhone"]');
    var userDomiCode = $('[name="DomicileArea"]');
    var userPhone = $('[name="telephone"]');
    var userCode = $('[name="areaTelephone"]');
    var citySelect = $('[name="cityId"]');
    var domicileCitySelect = $('[name="domicileCityId"]');
    var zipSelect = $('[name="zipCode"]');
    var domicileZipSelect = $('[name="domicileZipCode"]');
    var linerSelect = $('[name="liner"]');
    var domicileLinerSelect = $('[name="domicileLiner"]');
    var marryHidden = $('[name="marryStatus"]');
    domiLinerHidden = $('[name="domiLinerHidden"]');
    domiCityIdHidden = $('[name="domiCityIdHidden"]');
    domiZipCoodeHidden = $('[name="domiZipCoodeHidden"]');
    teleLinerHidden = $('[name="teleLinerHidden"]');
    teleZipCodeHidden = $('[name="teleZipcodeHidden"]');
    teleCityIdHidden = $('[name="teleCityIdHidden"]');

    var d_phone = $('[name="d_phone"]');
    var t_phone = $('[name="t_phone"]');
    var name_hidden = $('[name="name_hidden"]');
    var birthday_hidden = $('[name="birthday"]');
    var birthdayDay_hidden = $('[name="birthdayDay_hidden"]');
    var birthTarget_hidden = $('[name="birthTarget_hidden"]');
    var email_hidden = $('[name="email_hidden"]');
    var domicileAddress_hidden = $('[name="domicileAddress_hidden"]');
    var teleAddress_hidden = $('[name="teleAddress_hidden"]');
    var sameAddrHidden = $('[name="sameAddrHidden"]');
    var birthday0 = $('[name="birthday0"]');
    var birthday2 = $('[name="birthday2"]');
    var birthday4 = $('[name="birthday4"]');
    var isRecordHidden = $('[name="isRecord"]');

    var addressObj = {
        'citySelectTele': citySelect,
        'zipSelectTele': zipSelect,
        'linerSelectTele': linerSelect,
        'neighborhoodTele': neighborhood,
        'addressTele': address
    };

    //無簽訂線上服務註記且已有撥款紀錄且本學期沒有彈跳過訊息者要彈跳推廣訊息
    if (isEtabs == 'N' && isPopUp == 'N' && isRecord == 'Y') {
        GardenUtils.display.popup({
            title: '提醒您',
            content: '<p>為提供更加便捷的就學貸款服務，只要簽署「就學貸款網路服務契約條款」<a href="pdf/16.就學貸款業務網路服務申請書暨契約條款(DE50).pdf" class="passIcon passpdf" target="_blank"><img src="img/akk-04.png"></a>，將可透過本服務專區「我要申請｣功能完成線上續貸，還可享有免手續費優惠。</p><p>填寫完畢，請將紙本郵寄至104 臺北市中山區中山北路二段50號3樓 「台北富邦銀行就學貸款組收｣<br>如有疑問，請洽客戶服務專線02-8751-6665按5</p>',
            closeCallBackFn: function() {
                modal.getUpdatePopupStatus();
            },
            isShowSubmit: false
        });
    }

    name_hidden.val(name);
    birthdayDay_hidden.val(dayBirthday);
    d_phone.val(domicilePhone);
    t_phone.val(phone);
    email_hidden.val(email);
    domicileAddress_hidden.val(domiAddr);
    teleAddress_hidden.val(addr);
    isRecordHidden.val(isRecord);

    //限制輸入的長度
    userDomiCode.attr('maxlength', '3');
    userDomiPhone.attr('maxlength', '8');
    userCode.attr('maxlength', '3');
    userPhone.attr('maxlength', '8');
    userMobile.attr('maxlength', '10');
    dAddress.attr('maxlength', '93');
    address.attr('maxlength', '93');
    birthday0.attr('maxlength', '3');
    birthday2.attr('maxlength', '2');
    birthday4.attr('maxlength', '2');
    userName.attr('maxlength', '20');

    //將生日分成三格
    /*var dayBirthday = birthday.substr(5, 2);
    var monthBirthday = birthday.substr(3, 2);
    var yearBirthday = birthday.substr(0, 3);

    if (yearBirthday.length == 2) {
        yearBirthday = '0' + yearBirthday;
    }
    if (monthBirthday.length == 1) {
        monthBirthday = '0' + monthBirthday;
    }
    if (dayBirthday.length == 1) {
        dayBirthday = '0' + dayBirthday;
    }
	*/


    //塞要比對是否隱碼的hidden
    birthTarget_hidden.val(yearBirthday + '/' + monthBirthday + '/' + dayBirthday);

    //塞要丟到db的hidden
    birthday0.val(yearBirthday);
    birthday2.val(monthBirthday);
    birthday4.val(dayBirthday);

    //及時更新生日
    birthday0.on('blur', function() {
        var y = birthday0.val();
        var m = birthday2.val();
        var d = birthday4.val();
        if (y.length != 3) {
            y = '0' + y;
            $(this).val(y);
        }
        if (m.length != 2) {
            m = '0' + m;
        }
        if (d.length != 2) {
            d = '0' + d;
        }
        birthday_hidden.val(y + m + d);
        //birthTarget_hidden.val(y + '/' + m + '/' + d);
    });

    birthday2.on('blur', function() {
        var y = birthday0.val();
        var m = birthday2.val();
        var d = birthday4.val();
        if (y.length != 3) {
            y = '0' + y;
        }
        if (m.length != 2) {
            m = '0' + m;
        }
        if (d.length != 2) {
            d = '0' + d;
        }
        birthday_hidden.val(y + m + d);
        //birthTarget_hidden.val(y + '/' + m + '/' + d);
    });

    birthday4.on('blur', function() {
        var y = birthday0.val();
        var m = birthday2.val();
        var d = birthday4.val();
        if (y.length != 3) {
            y = '0' + y;
        }
        if (m.length != 2) {
            m = '0' + m;
        }
        if (d.length != 2) {
            d = '0' + d;
        }
        birthday_hidden.val(y + m + d);
        //birthTarget_hidden.val(y + '/' + m + '/' + d);
    });


    //alert('test1');
    //2016-06-18 added by titan 綁半形轉全形
    /*
     GardenUtils.format.inputConvertFullWidth({
     name: ['DomicileNeighborhood', 'DomicileAddress', 'address']
     });
     */
    //alert('test2');

    //hidden
    $('[name="id"]').val(id);
    $('[name="name"]').val(name);
    $('[name="birthday"]').val(yearBirthday + monthBirthday + dayBirthday);

    console.debug(yearBirthday + monthBirthday + dayBirthday);

    //alert(birthday);

    userId.text(id);
    userName.text(name);
    userBirthday.text(birthday);
    userMobile.val(mobile);
    $('.processInner').prepend('<input type="hidden" value="' + content.mobile + '" name="mobile_hidden"/>');
    userEmail.val(email);
    userDomiCode.val(domicileCode);
    userDomiPhone.val(domicilePhone);
    userCode.val(code);
    userPhone.val(phone);
    dAddress.val(domiAddr);
    dNeighborhood.val(domiNei);
    address.val(addr);
    neighborhood.val(nei);
    dLinerName.val(domiLinerName);
    linerName.val(lName);

    //地址(下拉式選單)
    var jsonCity = modal.getCity();
    console.debug(jsonCity);
    cityArr = jsonCity.cities;
    var cityArray = [];
    cityArray.push('<option value="">選擇縣市</option>');

    $.each(cityArr, function(i, cityData) {
        cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });

    citySelect.append(cityArray.join(''));
    domicileCitySelect.append(cityArray.join(''));

    //代入預設值
    //若有撈到使用者的地址（city, zip）,則顯示
    //戶籍地址
    if (domicileCityId !== '') { //顯示city
        domicileCitySelect.find('option[value="' + domicileCityId + '"]').prop('selected', 'true');
        domiCityIdHidden.val(domicileCityId);
        if (domicileZipCode !== '') { //顯示zip
            var jsonZip = modal.getZip(domicileCityId);
            var zipArr = jsonZip.zipcodes;
            var zipArray = [];
            zipArray.push('<option value="">選擇鄉鎮市區</option>');
            $.each(zipArr, function(i, zipData) {
                zipArray.push('<option value=' + zipData.zipcode + '>' + zipData.areaName + '</option>');
            });

            domicileZipSelect.empty();
            domicileZipSelect.append(zipArray.join(''));
            domicileZipSelect.selectpicker('refresh');
            domicileZipSelect.find('option[value="' + domicileZipCode + '"]').prop('selected', 'true');
            domicileZipSelect.find('option[value="' + domicileZipCode + '"]').trigger('change');
            domiZipCoodeHidden.val(domicileZipCode);

            if (domicileLiner !== '') { //顯示liner
                var jsonLiner = modal.getLiner(domicileZipCode);
                console.debug(jsonLiner);
                var linerArr = jsonLiner.liners;
                console.debug(linerArr);
                var linerArray = [];
                linerArray.push('<option value="">選擇村/里</option>');
                $.each(linerArr, function(i, linerData) {
                    linerArray.push('<option value=' + linerData.linerId + '>' + linerData.linerName + '</option>');
                });

                domicileLinerSelect.empty();
                domicileLinerSelect.append(linerArray.join(''));
                domicileLinerSelect.selectpicker('refresh');
                domicileLinerSelect.find('option[value="' + domicileLiner + '"]').prop('selected', 'true');
                domicileLinerSelect.find('option[value="' + domicileLiner + '"]').trigger('change');
                domiLinerHidden.val(domicileLiner);


                //如果生日有隱碼,表示村里要從明碼轉成隱碼
                var hasHidden = '';
                if (birthday4.val() != '') {
                    hasHidden = birthday4.val().substr(1, 1);
                }
                if (hasHidden.indexOf("*") != -1) {
                    if (domicileLinerSelect.val() != '') {
                        hideLinerName(domicileLinerSelect);
                    }
                }
            }
        }
    }

    //通訊地址
    if (cityId !== '') { //顯示city
        citySelect.find('option[value="' + cityId + '"]').prop('selected', 'true');
        teleCityIdHidden.val(cityId);
        if (zipCode !== '') { //顯示zip
            var jsonZip = modal.getZip(cityId);
            var zipArr = jsonZip.zipcodes;
            var zipArray = [];
            zipArray.push('<option value="">選擇鄉鎮市區</option>');
            $.each(zipArr, function(i, zipData) {
                zipArray.push('<option value=' + zipData.zipcode + '>' + zipData.areaName + '</option>');
            });

            zipSelect.empty();
            zipSelect.append(zipArray.join(''));
            zipSelect.selectpicker('refresh');
            zipSelect.find('option[value="' + zipCode + '"]').prop('selected', 'true');
            zipSelect.find('option[value="' + zipCode + '"]').trigger('change');
            teleZipCodeHidden.val(zipCode);

            //alert(liner);

            if (liner !== '') { //顯示liner
                var jsonLiner = modal.getLiner(zipCode);
                console.debug(jsonLiner);
                var linerArr = jsonLiner.liners;
                console.debug(linerArr);
                var linerArray = [];
                linerArray.push('<option value="">選擇村/里</option>');
                $.each(linerArr, function(i, linerData) {
                    linerArray.push('<option value=' + linerData.linerId + '>' + linerData.linerName + '</option>');
                });

                linerSelect.empty();
                linerSelect.append(linerArray.join(''));
                linerSelect.selectpicker('refresh');

                linerSelect.find('option[value="' + liner + '"]').prop('selected', 'true');
                linerSelect.find('option[value="' + liner + '"]').trigger('change');
                teleLinerHidden.val(liner);

            }
        }
    }

    $('.selectpicker').selectpicker();
    citySelect.selectpicker('refresh');
    domicileCitySelect.selectpicker('refresh');

    //抓結婚狀況的預設(radio)
    if (content.marryStatus == 'Y') {
        userMarry.attr('checked', true);
        userSingle.attr('checked', false);
        marryHidden.val('Y');
    } else if (content.marryStatus == 'N') {
        userSingle.attr('checked', true);
        userMarry.attr('checked', false);
        marryHidden.val('N');
    } else if (content.marryStatus == '') {
        marryHidden.val('');
    }

    //test input to label
    //inputToLabel(userMobile);

    //有撥款紀錄者,不開放修改,將input轉為label
    if (isRecord == 'Y') { //續貸
        inputToLabel(dNeighborhood);
        inputToLabel(dAddress);
        inputToLabel(dLinerName);
        inputToLabel(userName);
        inputToLabel(birthday0);
        inputToLabel(birthday2);
        inputToLabel(birthday4);

        if (mobile != '') {
            inputToLabel(userMobile);
        }

        //取出戶藉地址的div的右邊
        var domicileAddrRightDiv = $('#domicileAddr .right');
        domicileToLabel(domicileAddrRightDiv, domicileCityName, domicileZipCodeName, domicileLiner, domiNei, domiAddr);
    }

    //點選結婚狀況的radio
    userSingle.on('click', function() {
        marryHidden.val('N');
    });
    userMarry.on('click', function() {
        marryHidden.val('Y');
    });

    //如果之前有勾選"同戶籍地址"的checkbox, 則帶入預設
    var sameAddr = content.sameAddr;
    if (sameAddr == 'Y') {
        $('#add').attr('checked', true);
        $('[name="sameAddrHidden"]').val('Y');
        //鎖死通訊地址
        lockAddress(addressObj, true);
    }

    //地址連動(zip)
    linkage.changeZipByCity(citySelect, cityArr, zipSelect);
    linkage.changeDomicileZipByCity(domicileCitySelect, cityArr, domicileZipSelect);

    //地址連動(liner)
    linkage.changeLinerByZip(zipSelect, zipArr, linerSelect);
    linkage.changeDomicileLinerByZip(domicileZipSelect, zipArr, domicileLinerSelect);

    domicileCitySelect.on('change', function() {
        var cityHidden = $(this).val();
        domiCityIdHidden.val(cityHidden);
        var zipHidden = domicileZipSelect.find('option:first').val();
        domiZipCoodeHidden.val(zipHidden);
    });
    citySelect.on('change', function() {
        var cityHidden = $(this).val();
        teleCityIdHidden.val(cityHidden);
        var zipHidden = zipSelect.find('option:first').val();
        teleZipCodeHidden.val(zipHidden);
    });
    zipSelect.on('change', function() {
        var zipHidden = $(this).val();
        teleZipCodeHidden.val(zipHidden);
        var linerHidden = linerSelect.find('option:first').val();
        teleLinerHidden.val(linerHidden);
    });
    domicileZipSelect.on('change', function() {
        var zipHidden = $(this).val();
        domiZipCoodeHidden.val(zipHidden);
        var linerHidden = domicileLinerSelect.find('option:first').val();
        domiLinerHidden.val(linerHidden);
    });
    linerSelect.on('change', function() {
        var linerHidden = $(this).val();
        teleLinerHidden.val(linerHidden);
    });
    domicileLinerSelect.on('change', function() {
        var linerHidden = $(this).val();
        domiLinerHidden.val(linerHidden);
    });

    var changeObj = [{
            'srcInput': 'domicileCityId',
            'toInput': 'cityId',
            'callback': function(select) {
                console.debug('1:' + select.val());
                select.selectpicker('refresh');
                select.trigger('change');
            }
        }, {
            'srcInput': 'domicileZipCode',
            'toInput': 'zipCode',
            'callback': function(select) {
                console.debug('2:' + select.val());
                select.selectpicker('refresh');
                select.trigger('change');
            }
        }, {
            'srcInput': 'domicileLiner',
            'toInput': 'address',
            'callback': function(select) {
                /*console.debug('3:' + select.val());
                 select.selectpicker('refresh');
                 select.trigger('change');*/
            }
        }, {
            'srcInput': 'DomicileNeighborhood',
            'toInput': 'address',
            'callback': function(select) {
                //select.selectpicker('refresh');
            }
        }, {
            'srcInput': 'DomicileAddress',
            'toInput': 'address',
            'callback': function(select) {
                //select.selectpicker('refresh');
            }
        }
        /*, {
         'srcInput': 'domicileLinerName',
         'toInput': 'address',
         'callback': function(select) {
         //select.selectpicker('refresh');
         }
         }*/
    ];

    //勾選'同戶籍地'
    $('#add').change(function() {
        var srcTemp = '';
        if (this.checked) {
            console.debug('check');
            sameAddrHidden.val('Y');
            $.each(changeObj, function(i, obj) {
                var src = $('[name="' + obj.srcInput + '"]').val();
                var to = $('[name="' + obj.toInput + '"]');
                var tagName = to.prop('tagName').toLowerCase();

                //將戶籍地的村/里,鄰,地址一同塞入通訊地址的輸入框
                if (obj.toInput == "address") {
                    console.debug(srcTemp);
                    if (obj.srcInput == "DomicileNeighborhood") {
                        src = (src == '') ? src : src + '鄰';
                        srcTemp = srcTemp + src;
                    } else if (obj.srcInput == "DomicileAddress") {
                        srcTemp = srcTemp + src;
                        src = srcTemp;
                    } else {
                        srcTemp = srcTemp + src;
                    }
                }

                console.debug(obj.srcInput + ':' + src + '=' + obj.toInput + ':' + to.val());

                to.val(src);

                console.debug(obj.srcInput + ':' + src + '=' + obj.toInput + ':' + to.val());

                if (obj.callback !== undefined) {
                    obj.callback.apply(window, [to]);
                }
            });
            //鎖死通訊地址
            lockAddress(addressObj, true);
        } else {
            sameAddrHidden.val('N');

            //不要鎖死通訊地址
            lockAddress(addressObj, false);
        }
    });
    if (domicileLiner != '' && domicileLiner != null) {
        var linerCurrent = $('#domicileAddr .liner_y button span').eq(0);
        linerCurrent.text('*');
    }

    //alert(sameAddrHidden.val());

    //帶"同戶籍地址"預設值
    /*if(sameAddrHidden.val() == 'Y'){
     $('#add').trigger('change');
     }*/
}

//將村里改為隱碼
function hideLinerName(selector) {
    var parent = selector.parent();
    var btn = parent.find('button');
    var span = btn.find('span:first');

    span.text('*');
}

function apply1_2(content) {
    console.debug(content);

    userMarried = content.marryStatus;
    var today = new Date();
    var userBirthday = content.birthday;
    var userYear, userMonth, userDay;
    if (userBirthday.length == 6) {
        userYear = userBirthday.substr(0, 2);
        userYear = parseInt(userYear) + 1911;

        userMonth = userBirthday.substr(2, 2);
        userMonth = parseInt(userMonth);

        userDay = userBirthday.substr(4, 2);
        userDay = parseInt(userDay);

    } else if (userBirthday.length == 7) {
        userYear = userBirthday.substr(0, 3);
        userYear = parseInt(userYear) + 1911;

        userMonth = userBirthday.substr(3, 2);
        userMonth = parseInt(userMonth);

        userDay = userBirthday.substr(5, 2);
        userDay = parseInt(userDay);
    }

    var adultHidden = $('[name = "applicantAdult"]');
    var userMarriedHidden = $('[name = "userMarriedHidden"]');
    userMarriedHidden.val(userMarried);
    //var userMonth = parseInt(userBirthday.substr(3, 2));
    //var userDay = parseInt(userBirthday.substr(5, 2));
    var level1 = content.familyStatusLevel1;
    var level2 = content.familyStatusLevel2;
    preLevel1 = content.familyStatusLevel1;
    preLevel2 = content.familyStatusLevel2;

    var isSpouseForeignerHidden = $('[name="isSpouseForeignerHidden"]');

    var status1 = $('#marriage1_label');
    var status2 = $('#marriage2_label');
    var status3 = $('#marriage3_label');
    var status4 = $('#marriage4_label');
    var status5 = $('#divorce1_label');
    var status6 = $('#divorce2_label');
    var status7 = $('#divorce3_label');
    var status8 = $('#divorce4_label');
    var status9 = $('#passAway_one1_label');
    var status10 = $('#passAway_one2_label');
    var status11 = $('#passAway_one3_label');
    var status12 = $('#passAway_one4_label');
    var status13 = $('#spouse_national1_label');
    var status14 = $('#spouse_national2_label');
    var status15 = $('#spouse_national3_label');
    var status16 = $('#spouse_national4_label');
    var status17 = $('#spouse_foreigner1_label');
    var status18 = $('#spouse_foreigner2_label');
    var status19 = $('#spouse_foreigner3_label');
    var status20 = $('#spouse_divorce1_label');
    var status21 = $('#spouse_divorce2_label');
    var status22 = $('#spouse_divorce3_label');
    var status23 = $('#spouse_passAway1_label');
    var status24 = $('#spouse_passAway2_label');
    var status25 = $('#spouse_passAway3_label');

    var guarantor1 = '父母雙方皆擔任連帶保證人';
    var guarantor2 = '父親擔任連帶保證人';
    var guarantor3 = '母親擔任連帶保證人';
    var guarantor4 = '第三人擔任連帶保證人';
    var guarantor5 = '父親健在，第三人擔任連帶保證人';
    var guarantor6 = '母親健在，第三人擔任連帶保證人';
    var guarantor7 = '配偶擔任連帶保證人';
    var guarantor8 = [];
    var guarantor9 = [];
    //var guarantor10 = '非父母之第三人監護';
    var guarantor11 = '父母共同監護';
    var guarantor12 = '父親監護';
    var guarantor13 = '母親監護';
    var guarantor14 = [];

    guarantor8.push('父親因<a href="" class="underblue" data-toggle="modal" data-target="#Specialcir1">特殊情形</a>，無法擔任連帶保證人');
    guarantor9.push('母親因<a href="" class="underblue" data-toggle="modal" data-target="#Specialcir2">特殊情形</a>，無法擔任連帶保證人');
    guarantor14.push('非父母之<a href="" class="underblue" data-toggle="modal" data-target="#ThirdGuardianship">第三人監護</a>');

    //判斷成年沒
    if (today.getFullYear() - userYear > 20) {
        //成年
        isAdult = true;
    } else if (today.getFullYear() - userYear < 20) {
        //未成年
        isAdult = false;
    } else if (today.getFullYear() - userYear == 20) {
        if (today.getMonth() + 1 - userMonth > 0) {
            //成年
            isAdult = true;
        } else if (today.getMonth() + 1 - userMonth < 0) {
            //未成年
            isAdult = false;
        } else if (today.getMonth() + 1 - userMonth == 0) {
            if (today.getDate() - userDay >= 0) {
                //成年
                isAdult = true;
            } else if (today.getDate() - userDay < 0) {
                //未成年
                isAdult = false;
            }
        }
    }

    if (isAdult === true) {
        adultHidden.val('Y');
    } else if (isAdult === false) {
        adultHidden.val('N');
    }

    //依據年齡,結婚狀況長選項
    if (userMarried == 'N') {
        //未婚
        $('.married').hide();
        if (isAdult === false) {
            //未成年
            //Level 1 選項被點選時
            status1.text(guarantor1);
            status2.append(guarantor8.join(''));
            status3.append(guarantor9.join(''));
            status4.append(guarantor14.join(''));
            status5.text(guarantor11);
            status6.text(guarantor12);
            status7.text(guarantor13);
            status8.append(guarantor14.join(''));
            status11.append(guarantor14.join(''));

            $('#passAway_oneSub').find('.sub4').hide();
        } else if (isAdult === true) {

            //成年
            //Level 1 選項被點選時
            status1.text(guarantor1);
            status2.text(guarantor2);
            status3.text(guarantor3);
            status4.text(guarantor4);
            status5.text(guarantor1);
            status6.text(guarantor2);
            status7.text(guarantor3);
            status8.text(guarantor4);
            status11.text(guarantor5);
            status12.text(guarantor6);
        }
        $('.sub').hide();
        $('#marriage').on('click', function() {
            $('.sub').hide();
            $('#marriageSub').show();
            $('[name="familyStatusLevel1"]').val('0');
            $('[name="familyStatusLevel2"]').val('0');
        });

        $('#divorce').on('click', function() {
            $('.sub').hide();
            $('#divorceSub').show();
            $('[name="familyStatusLevel1"]').val('0');
            $('[name="familyStatusLevel2"]').val('0');
        });

        $('#passAway_one').on('click', function() {
            status9.text(guarantor2);
            status10.text(guarantor3);

            $('.sub').hide();
            $('#passAway_oneSub').show();
            $('[name="familyStatusLevel1"]').val('0');
            $('[name="familyStatusLevel2"]').val('0');
        });

        $('#passAway_both').on('click', function() {
            $('.sub').hide();

        });

    } else if (userMarried == 'Y') {
        //已婚
        $('.unMarried').hide();

        //塞字串
        status13.text(guarantor7);
        status14.text(guarantor2);
        status15.text(guarantor3);
        status16.text(guarantor4);
        status17.text(guarantor2);
        status18.text(guarantor3);
        status19.text(guarantor4);
        status20.text(guarantor2);
        status21.text(guarantor3);
        status22.text(guarantor4);
        status23.text(guarantor2);
        status24.text(guarantor3);
        status25.text(guarantor4);
        $('.sub').hide();

        //Level 1 選項被點選時
        $('#spouse_national').on('click', function() {
            isSpouseForeignerHidden.val(false);
            $('.sub').hide();
            $('#spouse_nationalSub').show();
            $('[name="familyStatusLevel1"]').val('0');
            $('[name="familyStatusLevel2"]').val('0');
        });

        $('#spouse_foreigner').on('click', function() {
            isSpouseForeignerHidden.val(true);

            $('.sub').hide();
            $('#spouse_foreignerSub').show();
            $('[name="familyStatusLevel1"]').val('0');
            $('[name="familyStatusLevel2"]').val('0');
        });

        $('#spouse_divorce').on('click', function() {
            isSpouseForeignerHidden.val(false);
            $('.sub').hide();
            $('#spouse_divorceSub').show();
            $('[name="familyStatusLevel1"]').val('0');
            $('[name="familyStatusLevel2"]').val('0');
        });

        $('#spouse_passAway').on('click', function() {
            isSpouseForeignerHidden.val(false);

            $('.sub').hide();
            $('#spouse_passAwaySub').show();
            $('[name="familyStatusLevel1"]').val('0');
            $('[name="familyStatusLevel2"]').val('0');
        });
    }

    if (level2 != '') { //帶預設值點選radio
        if (userMarried == 'N') { //未婚
            switch (level1) {
                case '1':
                    $('#marriage').click();
                    $('#marriageSub').show();
                    var subIndex = $('#marriageSub input').eq((level2 - 1));
                    subIndex.click();
                    clickLevel2Option(userMarried, isAdult, level1, level2);
                    break;
                case '2':
                    $('#divorce').click();
                    $('#divorceSub').show();
                    var subIndex = $('#divorceSub input').eq((level2 - 1));
                    subIndex.click();
                    clickLevel2Option(userMarried, isAdult, level1, level2);
                    break;
                case '3':
                    $('#passAway_one').click();
                    $('#passAway_oneSub').show();
                    var subIndex = $('#passAway_oneSub input').eq((level2 - 1));
                    subIndex.click();
                    clickLevel2Option(userMarried, isAdult, level1, level2);
                    break;
                case '4':
                    $('#passAway_both').click();
                    clickLevel2Option(userMarried, isAdult, level1, level2);
                    break;
            }

        } else if (userMarried == 'Y') { //已婚
            //alert(level1);
            switch (level1) {
                case '1':
                    $('#spouse_national').click();
                    $('#spouse_nationalSub').show();
                    var subIndex = $('#spouse_nationalSub input').eq((level2 - 1));
                    subIndex.click();
                    clickLevel2Option(userMarried, isAdult, level1, level2);
                    break;
                case '2':
                    $('#spouse_foreigner').click();
                    $('#spouse_foreignerSub').show();
                    var subIndex = $('#spouse_foreignerSub input').eq((level2 - 1));
                    subIndex.click();
                    clickLevel2Option(userMarried, isAdult, level1, level2);
                    break;
                case '3':
                    $('#spouse_divorce').click();
                    $('#spouse_divorceSub').show();
                    var subIndex = $('#spouse_divorceSub input').eq((level2 - 1));
                    subIndex.click();
                    clickLevel2Option(userMarried, isAdult, level1, level2);
                    break;
                case '4':
                    $('#spouse_passAway').click();
                    $('#spouse_passAwaySub').show();
                    var subIndex = $('#spouse_passAwaySub input').eq((level2 - 1));
                    subIndex.click();
                    clickLevel2Option(userMarried, isAdult, level1, level2);
                    break;
            }
        }
    } else if (level2 == '') { //若沒有點選第二層的選項,則不會代預設值
        if (userMarried == 'N') {
            //未婚
            $('.married').hide();
            if (isAdult === false) {
                //未成年
                //Level 1 選項被點選時
                status2.empty();
                status3.empty();
                status4.empty();
                status8.empty();

                status1.text(guarantor1);
                status2.append(guarantor8.join(''));
                status3.append(guarantor9.join(''));
                status4.append(guarantor14.join(''));
                status5.text(guarantor11);
                status6.text(guarantor12);
                status7.text(guarantor13);
                status8.append(guarantor14.join(''));
            } else if (isAdult === true) {
                //成年
                //Level 1 選項被點選時
                status1.text(guarantor1);
                status2.text(guarantor2);
                status3.text(guarantor3);
                status4.text(guarantor4);
                status5.text(guarantor1);
                status6.text(guarantor2);
                status7.text(guarantor3);
                status8.text(guarantor4);
            }
            status9.text(guarantor2);
            status10.text(guarantor3);
            status11.text(guarantor5);
            status12.text(guarantor6);
            $('#marriageSub').hide();
            $('#divorceSub').hide();
            $('#passAway_oneSub').hide();


        } else if (userMarried == 'Y') {
            //已婚
            status13.text(guarantor7);
            status14.text(guarantor2);
            status15.text(guarantor3);
            status16.text(guarantor4);
            status17.text(guarantor2);
            status18.text(guarantor3);
            status19.text(guarantor4);

            status20.text(guarantor2);
            status21.text(guarantor3);
            status22.text(guarantor4);

            $('#spouse_nationalSub').hide();
            $('#spouse_foreignerSub').hide();
            $('#spouse_passAwaySub').hide();
            $('#spouse_divorceSub').hide();
        }
    }


    //Level 2 選項被點選時
    //未婚時的選項
    if (isAdult === false) {
        //未成年
        $('#marriageSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 1, pickedOption);
        });
        $('#divorceSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 2, pickedOption);
        });
        $('#passAway_oneSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 3, pickedOption);
        });
        $('#passAway_both').on('click', function() {
            var pickedOption;
            clickLevel2Option(userMarried, isAdult, 4, pickedOption);
        });
    } else if (isAdult === true) {
        //成年
        $('#marriageSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 1, pickedOption);
        });
        $('#divorceSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 2, pickedOption);
        });
        $('#passAway_oneSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 3, pickedOption);
        });
        $('#passAway_both').on('click', function() {
            var pickedOption;
            clickLevel2Option(userMarried, isAdult, 4, pickedOption);
        });
    }
    //
    //已婚時的選項
    $('#spouse_nationalSub').find('input').on('click', function() {
        var pickedOption = $(this).attr('id').substr(-1);
        clickLevel2Option(userMarried, isAdult, 1, pickedOption);
    });
    $('#spouse_foreignerSub').find('input').on('click', function() {
        var pickedOption = $(this).attr('id').substr(-1);
        clickLevel2Option(userMarried, isAdult, 2, pickedOption);
    });
    $('#spouse_divorceSub').find('input').on('click', function() {
        var pickedOption = $(this).attr('id').substr(-1);
        clickLevel2Option(userMarried, isAdult, 3, pickedOption);
    });
    $('#spouse_passAwaySub').find('input').on('click', function() {
        var pickedOption = $(this).attr('id').substr(-1);
        clickLevel2Option(userMarried, isAdult, 4, pickedOption);
    });
}

function apply2(content) {
    /*
     familyStatus: (填寫表格)
     每個字元代表意思:father mother thirdParty spouse
     0:免填寫(隱藏div)
     1:要填寫(顯示div)
     2:先顯示radio,若選擇'是',再顯示div(未成年)
     先顯示radio,若選擇'母親',再顯示其div; 若選擇'父親',再顯示其div(成年)

     guarantorStatus: (擔任連帶保證人)
     每個字元代表意思:father mother thirdParty spouse
     0:空白(不用做事)
     1:是(顯示"(為連帶保證人/合計所得對象)"字串)
     2:否(不顯示字串)
     3:是/否(顯示"(擔任連帶保證人)"的字串)(未成年)
     父親/母親(顯示"(請選擇合計所得對象(可複選))"的字串)(成年)

     incomeTax: (合計所得稅對象)
     每個字元代表意思: father mother thirdParty spouse
     0:沒有
     1:有
     另外寫一個判斷(因為是'本人+選擇的合計所得對象')
     */

    var familyStatus = content.familyStatus;
    var guarantorStatus = content.guarantorStatus;
    var incomeTax = content.incomeTax;
    var user_birthday = content.user_birthday;
    var adultTag = content.isAdult;
    var marryStatus = content.marryStatus;
    var isChanged = content.isChanged;
    var isRecord = content.isRecord;
    var relationship = content.relationship; //帶上次選擇的第三人之"與申請人之關係"之下拉式選單的預設值用
    var thirdPartyTitle = content.thirdPartyTitle; //帶第三人的稱呼之預設值(監護權人/連帶保證人)
    var guarantorText = content.guarantorText; //存放擔任連帶保證人的字串,第五步要用到
    var isSpouseForeigner = content.isSpouseForeigner;

    //申請人的戶藉資料
    var dAddr = content.domicileAddress.address;
    var dNei = content.domicileAddress.neighborhood;
    var dLinerName = content.domicileAddress.linerName;
    var tAddr = content.teleAddress.address;
    var tNei = content.teleAddress.neighborhood;
    var tLinerName = content.teleAddress.linerName;

    //帶上次是否有點選'是否擔任連帶保證人'之radio的預設值用
    var fatherRadioBtn = content.father_RadioBtn;
    var motherRadioBtn = content.mother_RadioBtn;
    var thirdPartyRadioBtn = content.thirdParty_RadioBtn;
    var spouseRadioBtn = content.spouse_RadioBtn;

    //帶上次是否有點選'是否為合計所得對象'之checkbox的預設值用
    var father_checkbox = content.father_checkbox;
    var mother_checkbox = content.mother_checkbox;

    //帶上次是否有點選'同申請人戶籍地址'之radio的預設值用
    var father_sameAddr = content.father_sameAddr;
    var mother_sameAddr = content.mother_sameAddr;
    var thirdParty_sameAddr = content.thirdParty_sameAddr;
    var spouse_sameAddr = content.spouse_sameAddr;
    var level1 = content.familyStatusLevel1;
    var level2 = content.familyStatusLevel2;

    //Hidden
    var adultHidden = $('[name="adultHidden"]');
    var guarantorTextHidden = $('[name="guarantorText"]');
    var isIncomeTaxHidden = $('[name="isIncomeTax"]');
    var isGuarantorHidden = $('[name="isGuarantor"]');
    var showInfoHidden = $('[name="showInfo"]');
    var thirdPartyTitleHidden = $('[name="thirdPartyTitle"]');
    var user_birthday_hidden = $('[name="user_birthday_hidden"]');
    var father_sameAddrHidden = $('[name="father_sameAddrHidden"]');
    var mother_sameAddrHidden = $('[name="mother_sameAddrHidden"]');
    var thirdParty_sameAddrHidden = $('[name="thirdParty_sameAddrHidden"]');
    var spouse_sameAddrHidden = $('[name="spouse_sameAddrHidden"]');
    var father_RadioBtnHidden = $('[name="father_RadioBtn"]');
    var mother_RadioBtnHidden = $('[name="mother_RadioBtn"]');
    var thirdParty_RadioBtnHidden = $('[name="thirdParty_RadioBtn"]');
    var spouse_RadioBtnHidden = $('[name="spouse_RadioBtn"]');
    var father_checkboxHidden = $('[name="father_checkbox"]');
    var mother_checkboxHidden = $('[name="mother_checkbox"]');
    var isRecordHidden = $('[name="isRecordHidden"]');
    var isChangeHidden = $('[name="isChangeHidden"]');
    var isSpouseForeignerHidden = $('[name="isSpouseForeignerHidden"]');

    var father_String = $('[name="father_String"]');
    var mother_String = $('[name="mother_String"]');
    var thirdParty_String = $('[name="thirdParty_String"]');
    var spouse_String = $('[name="spouse_String"]');


    //用於跑迴圈抓每個關係人的input, selecpicker等元素
    var familyArray = ['father', 'mother', 'thirdParty', 'spouse'];

    //var thirdPartyTitleText = $('#thirdPartyTitle'); //存放第三人的稱謂
    var father_RadioBtn = $('[name="father_RadioBtn"]');
    var mother_RadioBtn = $('[name="mother_RadioBtn"]');
    var thirdParty_RadioBtn = $('[name="thirdParty_RadioBtn"]');
    var spouse_RadioBtn = $('[name="spouse_RadioBtn"]');

    //撈到的值塞進hidden
    showInfoHidden.val(familyStatus);
    isGuarantorHidden.val(guarantorStatus);
    isIncomeTaxHidden.val(incomeTax);
    user_birthday_hidden.val(user_birthday);
    isRecordHidden.val(isRecord);
    isChangeHidden.val(isChanged);
    adultHidden.val(adultTag);
    isSpouseForeignerHidden.val(isSpouseForeigner);

    /* 必填的表格放上面, 選填的表格放下面 (start)*/
    //2016-06-10 added by titan固定的在最上面，挑選才出來的放下面，順序還是以父/母/第三人/配偶來排
    //作法是產生一塊空div，裡面有兩塊div分別放固定跟非固定最後讓這塊div的html長在第一塊parent
    var tmpDiv = $('<div></div>');
    var topDiv = $('<div></div>');
    var optionDiv = $('<div></div>');

    if (adultTag == 'N') {
        $.each(familyArray, function(i, family) {
            var identityStatus = familyStatus.substr(i, 1);
            if (identityStatus == '1' || identityStatus == '3') {
                $('#' + family).appendTo(topDiv);
            } else if (identityStatus == '0' || identityStatus == '2') {
                $('#' + family).appendTo(optionDiv);
            }
        });
    } else if (adultTag == 'Y') {
        $.each(familyArray, function(i, family) {
            var identityStatus = familyStatus.substr(i, 1);
            if (identityStatus == '1' || identityStatus == '3') {
                $('#' + family).appendTo(topDiv);
            } else if (identityStatus == '0' || identityStatus == '2') {
                $('#' + family).appendTo(optionDiv);
            }
        });
    }
    tmpDiv.append(topDiv.html());
    tmpDiv.append(optionDiv.html());

    $(tmpDiv.html()).insertAfter($('#incomeTaxRadio')); /**/
    /* 必填的表格放上面, 選填的表格放下面 (end)*/

    //使用bootstrap的selectpicker
    $('.selectpicker').selectpicker();

    /*塞四個關係人的city的選項(start)*/
    var cityArray = [];
    var jsonCity = modal.getCity();
    console.debug(jsonCity);
    cityArr = jsonCity.cities;

    //先把city的選項全塞進cityArray
    cityArray.push('<option value="">請選擇</option>');
    $.each(cityArr, function(i, cityData) {
        cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });

    //再跑迴圈塞進四個關係人的city的下拉式選單
    $.each(familyArray, function(index, value) {
        var citySelectpicker = $('[name="' + value + '_cityId_domi"]');
        citySelectpicker.append(cityArray.join(''));
        citySelectpicker.selectpicker('refresh');
    });
    /*塞四個關係人的city的選項(end)*/

    /*綁地址的下拉式選單之連動事件(start)*/
    $.each(familyArray, function(index, value) {
        var citySelectpicker = $('[name="' + value + '_cityId_domi"]');
        var zipSelectpicker = $('[name="' + value + '_zipCode_domi"]');
        var linerSelectpicker = $('[name="' + value + '_liner_domi"]');

        linkage.changeDomicileZipByCity(citySelectpicker, cityArr, zipSelectpicker);
        citySelectpicker.trigger('change');

        linkage.changeDomicileLinerByZip(zipSelectpicker, cityArr, linerSelectpicker);
        zipSelectpicker.trigger('change');
    });
    /*綁地址的下拉式選單之連動事件(end)*/

    /*塞全部關係人的資料(start)*/
    var lastIsGuarantor = content.lastIsGuarantor;
    $('[name="lastIsGuarantor"]').val(lastIsGuarantor);
    //alert(lastIsGuarantor);
    $.each(familyArray, function(index, value) {
        var div = $('#' + value + '');
        modal.getFamilyInfo(value, 'N', function(familyInfo) {
            setFamilyInfoValue(familyInfo, div);
            console.debug(familyInfo);

            //當已撥款且沒有更改家庭狀況，顯示的資料改為字串不得修改
            if (isRecord == 'Y') {
                if (lastIsGuarantor != '' && lastIsGuarantor.length == 4) {
                    var current = guarantorStatus.substr(index, 1);
                    var last = lastIsGuarantor.substr(index, 1);
                    console.debug(guarantorStatus);
                    console.debug(lastIsGuarantor);
                    if (current == '1' && last == '1') { //若之前是連帶保證人,就要轉字串
                        determineAddReadonly(value, familyInfo);
                    }
                }
            }

            //因為小版會被疊到(很怪)，所以先長完畫面後強制加width 86%後再拿掉
            //$(div).find('p.stringOrRadio').css('width', '86%');
        });
    });
    /*塞全部關係人的資料(end)*/

    /*塞連帶保證人的字串到hidden, 第五步要顯示的 (start)*/
    setGuarantorText(familyArray, guarantorStatus, guarantorTextHidden);
    /*塞連帶保證人的字串到hidden, 第五步要顯示的 (end)*/

    /*決定要呈現誰的表格&要不要長radio or checkbox (start)*/
    var determineTagObj = {
        familyStatus: familyStatus,
        guarantorStatus: guarantorStatus,
        incomeTax: incomeTax
    };

    if (marryStatus == 'N') {
        if (adultTag == 'N') { //未成年未婚
            showFamilyForm(familyArray, determineTagObj, adultTag);

            //未成年 --> 第三人的標題改成"監護權人"
            $('#thirdPartyTitle').text('監護權人');
            thirdPartyTitleHidden.val('監護權人');

        } else if (adultTag == 'Y') { //成年未婚
            showFamilyForm(familyArray, determineTagObj, adultTag);

            //已成年 --> 第三人的標題改成"連帶保證人"
            $('#thirdPartyTitle').text('連帶保證人');
            thirdPartyTitleHidden.val('連帶保證人');
        }
    } else if (marryStatus == 'Y') { //已婚
        showFamilyForm(familyArray, determineTagObj, null);

        //已婚 --> 第三人的標題改成"連帶保證人"
        $('#thirdPartyTitle').text('連帶保證人');
        thirdPartyTitleHidden.val('連帶保證人');
    }

    //"與申請人之關係"的下拉式選單帶入預設值
    if (relationship != '') {
        $('[name="thirdParty_relationship"]').val(relationship);
        $('[name="thirdParty_relationship"]').selectpicker('refresh');
        $('[name="relationshipTitle"]').val(relationship);
    }
    /*決定要呈現誰的表格&要不要長radio or checkbox (end)*/

    /*綁點選"與申請人之關係"的下拉式選單 (start)*/
    $('[name="thirdParty_relationship"]').on('change', function() {
        var $this = $(this).val();
        $('[name="relationshipTitle"]').val($this);
    });
    /*綁點選"與申請人之關係"的下拉式選單 (end)*/

    /*點選連帶保證人的radiobox button (start)*/
    //更新hidden的值(未成年的radio: 若選"是"則顯示div,且為連帶保證人, 反之亦然)
    $('#father input[name="father_purchaser"]').on('click', function() {
        var picked = $(this).attr('id').substr(-1);
        if (picked == 'T') { //選擇"是"
            father_RadioBtn.val('1');
            $('#father').find('.famy').show();
            $('#father').find('.sodif').show();
            updateFamilyStatus(0, true);
            setGuarantorText(familyArray, isGuarantorHidden.val(), guarantorTextHidden);
        } else if (picked == 'F') { //選擇"否"
            father_RadioBtn.val('2');
            $('#father').find('.famy').hide();
            $('#father').find('.sodif').hide();
            updateFamilyStatus(0, false);
            setGuarantorText(familyArray, isGuarantorHidden.val(), guarantorTextHidden);
        }
    });
    $('#mother input[name="mother_purchaser"]').on('click', function() {
        var picked = $(this).attr('id').substr(-1);
        if (picked == 'T') {
            mother_RadioBtn.val('1');
            $('#mother').find('.famy').show();
            $('#mother').find('.sodif').show();
            updateFamilyStatus(1, true);
            setGuarantorText(familyArray, isGuarantorHidden.val(), guarantorTextHidden);
        } else if (picked == 'F') {
            mother_RadioBtn.val('2');
            $('#mother').find('.famy').hide();
            $('#mother').find('.sodif').hide();
            updateFamilyStatus(1, false);
            setGuarantorText(familyArray, isGuarantorHidden.val(), guarantorTextHidden);
        }
    });
    $('#thirdParty input[name="thirdParty_purchaser"]').on('click', function() {
        var picked = $(this).attr('id').substr(-1);
        if (picked == 'T') {
            thirdParty_RadioBtn.val('1');
            $('#thirdParty').find('.famy').show();
            $('#thirdParty').find('.sodif').show();
            updateFamilyStatus(2, true);
            setGuarantorText(familyArray, isGuarantorHidden.val(), guarantorTextHidden);
        } else if (picked == 'F') {
            thirdParty_RadioBtn.val('2');
            $('#thirdParty').find('.famy').hide();
            $('#thirdParty').find('.sodif').hide();
            updateFamilyStatus(2, false);
            setGuarantorText(familyArray, isGuarantorHidden.val(), guarantorTextHidden);
        }
    });
    $('#spouse input[name="spouse_purchaser"]').on('click', function() {
        var picked = $(this).attr('id').substr(-1);
        if (picked == 'T') {
            spouse_RadioBtn.val('1');
            $('#spouse').find('.famy').show();
            $('#spouse').find('.sodif').show();
            updateFamilyStatus(3, true);
            setGuarantorText(familyArray, isGuarantorHidden.val(), guarantorTextHidden);
        } else if (picked == 'F') {
            spouse_RadioBtn.val('2');
            $('#spouse').find('.famy').hide();
            $('#spouse').find('.sodif').hide();
            updateFamilyStatus(3, false);
            setGuarantorText(familyArray, isGuarantorHidden.val(), guarantorTextHidden);
        }
    });
    /*點選連帶保證人的radiobox button (end)*/

    /*點選合計所得對象的checkbox (start)*/
    //更新hidden的值(成年的radio:若選"母親"則顯示母親div,且為合計所得對象; 若選父親,則顯示父親div,且為合計所得對象)
    var isFatherTax = incomeTax.substr(0, 1);
    var isMotherTax = incomeTax.substr(1, 1);
    var isFatherShow = familyStatus.substr(0, 1);
    var isMotherShow = familyStatus.substr(1, 1);
    var isFatherShowTag = familyStatus.substr(0, 1);
    var isMotherShowTag = familyStatus.substr(1, 1);
    var isFatherShowInfo = $('[name="showInfo"]').val().substr(0, 1);
    var isMotherShowInfo = $('[name="showInfo"]').val().substr(1, 1);
    var isFatherShowInfoTag = $('[name="showInfo"]').val().substr(0, 1);
    var isMotherShowInfoTag = $('[name="showInfo"]').val().substr(1, 1);
    var showInfoValue = $('[name = "showInfo"]').val();
    //點選父親是合計所得對象後的動作
    $('#incomeTaxFather').on('click', function() {
        if ($("#incomeTaxFather").prop("checked") === true) {
            $('#father').show();
            //更新紀錄合計所得對象的值
            if (isFatherShowTag == '1') { //是連帶保證人
                if (isFatherTax != '1') {
                    incomeTax = parseInt(incomeTax) + 1000;
                    isFatherTax = '1';
                    $('#father .stringOrRadio').text(' (為連帶保證人/合計所得對象)');
                    $('[name="father_String"]').val(' (為連帶保證人/合計所得對象)');
                }
            } else if (isFatherShowTag == '3') { //是連帶保證人
                incomeTax = parseInt(incomeTax) + 1000;
                $('#father .stringOrRadio').text(' (為連帶保證人/合計所得對象)');
                $('[name="father_String"]').val(' (為連帶保證人/合計所得對象)');
            } else { //不是連帶保證人
                if (isFatherTax != '1' && isFatherTax != '3') {
                    incomeTax = parseInt(incomeTax) + 1000;
                    isFatherTax = '1';
                    $('#father .stringOrRadio').text(' (為合計所得對象)');
                    $('[name="father_String"]').val(' (為合計所得對象)');
                }
            }


            //更新紀錄需要填寫表格的人的值
            if (isFatherShowInfoTag == '2') {
                if (isFatherShowInfo == '2') {
                    showInfoValue = parseInt(showInfoValue) - 1000;
                    showInfoValue = showInfoValue.toString();

                    while (showInfoValue.length <= 3) {
                        showInfoValue = '0' + showInfoValue;
                    }
                    isFatherShowInfo = '1';
                } else if (isFatherShowInfo == '0') {
                    showInfoValue = parseInt(showInfoValue) + 1000;
                    showInfoValue = showInfoValue.toString();

                    while (showInfoValue.length <= 3) {
                        showInfoValue = '0' + showInfoValue;
                    }
                    isFatherShowInfo = '1';
                }
            }
            //alert($('div#father input[name="id_hidden"]').length);
            if ($('div#father input[name="id_hidden"]').length == 0) {
                modal.getFamilyInfo('father', 'N', function(fatherInfo) {
                    setInfoValue(fatherInfo, $('#father'));
                });
            }
            father_checkboxHidden.val('1');
        } else if ($("#incomeTaxFather").prop("checked") === false) {
            //更新紀錄合計所得對象的值
            if (isFatherTax != '0' || isFatherShowTag == '3') {
                incomeTax = parseInt(incomeTax) - 1000;
                incomeTax = incomeTax.toString();

                while (incomeTax.length <= 3) {
                    incomeTax = '0' + incomeTax;
                }
                isFatherTax = '0';
            }
            if (isFatherShowTag == '1' || isFatherShowTag == '3') {
                //$('#father').hide();
                $('#father .stringOrRadio').text('(為連帶保證人)');
                $('[name="father_String"]').val(' (為連帶保證人)');
            }
            if (isFatherShow != '1' && isFatherShow != '3') {
                $('#father').hide();
            }

            //更新紀錄需要填寫表格的人的值
            if (isFatherShowInfoTag == '2') { //是連帶保證人
                if (isFatherShowInfo == '2') {
                    showInfoValue = parseInt(showInfoValue) - 2000;
                    showInfoValue = showInfoValue.toString();

                    while (showInfoValue.length <= 3) {
                        showInfoValue = '0' + showInfoValue;
                    }
                    isFatherShowInfo = '0';
                } else if (isFatherShowInfo == '1') {
                    showInfoValue = parseInt(showInfoValue) - 1000;
                    showInfoValue = showInfoValue.toString();

                    while (showInfoValue.length <= 3) {
                        showInfoValue = '0' + showInfoValue;
                    }
                    isFatherShowInfo = '0';
                }
            }
            father_checkboxHidden.val('2');
        }

        isIncomeTaxHidden.val(incomeTax);
        $('[name="showInfo"]').val(showInfoValue);
    });
    //點選母親是合計所得對象後的動作
    $('#incomeTaxMother').on('click', function() {
        if ($('#incomeTaxMother').prop("checked") === true) {
            $('#mother').show();
            if (isMotherShowTag == '1') { //是連帶保證人
                if (isMotherTax != '1') {
                    incomeTax = parseInt(incomeTax) + 100;
                    incomeTax = incomeTax.toString();

                    while (incomeTax.length <= 3) {
                        incomeTax = '0' + incomeTax;
                    }
                    isMotherTax = '1';
                    $('#mother .stringOrRadio').text(' (為連帶保證人/合計所得對象)');
                    $('[name="mother_String"]').val(' (為連帶保證人/合計所得對象)');
                }
            } else if (isMotherShowTag == '3') { //是連帶保證人
                incomeTax = parseInt(incomeTax) + 100;
                incomeTax = incomeTax.toString();
                while (incomeTax.length <= 3) {
                    incomeTax = '0' + incomeTax;
                    console.debug(incomeTax);
                }
                $('#mother .stringOrRadio').text(' (為連帶保證人/合計所得對象)');
                $('[name="mother_String"]').val(' (為連帶保證人/合計所得對象)');
            } else {
                incomeTax = parseInt(incomeTax) + 100;
                incomeTax = incomeTax.toString();

                while (incomeTax.length <= 3) {
                    incomeTax = '0' + incomeTax;
                }
                isMotherTax = '1';
                $('#mother .stringOrRadio').text(' (為合計所得對象)');
                $('[name="mother_String"]').val(' (為合計所得對象)');
            }

            //更新紀錄需要填寫表格的人的值
            if (isMotherShowInfoTag == '2') {
                if (isMotherShowInfo == '2') {
                    showInfoValue = parseInt(showInfoValue) - 100;
                    showInfoValue = showInfoValue.toString();

                    while (showInfoValue.length <= 3) {
                        showInfoValue = '0' + showInfoValue;
                    }
                    isMotherShowInfo = '1';
                } else if (isMotherShowInfo == '0') {
                    showInfoValue = parseInt(showInfoValue) + 100;
                    showInfoValue = showInfoValue.toString();

                    while (showInfoValue.length <= 3) {
                        showInfoValue = '0' + showInfoValue;
                    }
                    isMotherShowInfo = '1';
                }
            }
            if ($('div#mother input[name="id_hidden"]').length == 0) {
                modal.getFamilyInfo('mother', 'N', function(motherInfo) {
                    setInfoValue(motherInfo, $('#mother'));
                });
            }
            mother_checkboxHidden.val('1');
        } else if ($("#incomeTaxMother").prop("checked") === false) {
            if (isMotherTax != '0' || isMotherShowTag == '3') {
                incomeTax = parseInt(incomeTax) - 100;
                incomeTax = incomeTax.toString();

                while (incomeTax.length <= 3) {
                    incomeTax = '0' + incomeTax;
                }
                isMotherTax = '0';
            }
            if (isMotherShowTag == '1' || isMotherShowTag == '3') {
                //$('#mother').hide();
                $('#mother .stringOrRadio').text('(為連帶保證人)');
                $('[name="mother_String"]').val(' (為連帶保證人)');
            }
            if (isMotherShow != '1' && isMotherShow != '3') {
                $('#mother').hide();
            }

            //更新紀錄需要填寫表格的人的值
            if (isMotherShowInfoTag == '2') { //是連帶保證人
                if (isMotherShowInfo == '2') {
                    showInfoValue = parseInt(showInfoValue) - 200;
                    showInfoValue = showInfoValue.toString();

                    while (showInfoValue.length <= 3) {
                        showInfoValue = '0' + showInfoValue;
                    }
                    isMotherShowInfo = '0';
                } else if (isMotherShowInfo == '1') {
                    showInfoValue = parseInt(showInfoValue) - 100;
                    showInfoValue = showInfoValue.toString();

                    while (showInfoValue.length <= 3) {
                        showInfoValue = '0' + showInfoValue;
                    }
                    isMotherShowInfo = '0';
                }
            }
            mother_checkboxHidden.val('2');
        }
        isIncomeTaxHidden.val(incomeTax);
        $('[name="showInfo"]').val(showInfoValue);
    });
    /*點選合計所得對象的checkbox (end)*/

    //限制輸入的長度
    limitInput();

    /*如果之前有勾選"同戶籍地址"的checkbox, 則帶入預設 (start)*/
    /**/
    $.each(familyArray, function(i, familyStr) {
        var domiSelect = $('[name="' + familyStr + '_cityId_domi"]');
        var select = $('[name="' + familyStr + '_cityId"]');
        var domiZipSelect = $('[name="' + familyStr + '_zipCode_domi"]');
        var zipSelect = $('[name="' + familyStr + '_zipCode"]');
        var linerSelect = $('[name="' + familyStr + '_liner_domi"]');
        var linerName = $('[name="' + familyStr + '_linerName_domi"]');
        var dNeig = $('[name="' + familyStr + '_neighborhood_domi"]');
        var dAddress = $('[name="' + familyStr + '_address_domi"]');

        var isSameAddr = '';
        if (familyStr == 'father') {
            isSameAddr = father_sameAddr;
        } else if (familyStr == 'mother') {
            isSameAddr = mother_sameAddr;
        } else if (familyStr == 'thirdParty') {
            isSameAddr = thirdParty_sameAddr;
        } else if (familyStr == 'spouse') {
            isSameAddr = spouse_sameAddr;
        }

        var checkbox = $('#R_address_1_' + familyStr);

        var addressObj = {
            'citySelectTele': domiSelect,
            'zipSelectTele': domiZipSelect,
            'linerSelectTele': linerSelect,
            'neighborhoodTele': dNeig,
            'addressTele': dAddress
        };

        //如果之前已經有勾了，就將地址鎖定不得修改
        if (isSameAddr == 'Y') {
            $('[name="' + familyStr + '_sameAddrHidden"]').val(isSameAddr);
            checkbox.attr('checked', true);
            lockAddress(addressObj, true);
        }

        //綁定勾選同申請戶藉地址事件
        checkbox.change(function() {
            var sameAddrHidden = $('[name="' + familyStr + '_sameAddrHidden"]');

            if (this.checked) {
                sameAddrHidden.val('Y');

                sameDomiAddrWithApp(content, domiSelect, domiZipSelect, linerSelect);
                dNeig.val(dNei);
                dAddress.val(dAddr);
                linerName.val(dLinerName);

                //鎖死通訊地址
                lockAddress(addressObj, true);
            } else {
                sameAddrHidden.val('N');

                //不鎖死通訊地址
                lockAddress(addressObj, false);
            }
        });
    });
    /*如果之前有勾選"同戶籍地址"的checkbox, 則帶入預設 (end)*/

    /*帶radio button or checkbox的預設值 (start)*/
    //if (adultTag == 'N') {
    if (adultTag == 'N' && (level1 == '2' && level2 != '1')) {
        var radioBtnArr = [fatherRadioBtn, motherRadioBtn, thirdPartyRadioBtn, spouseRadioBtn];

        $.each(radioBtnArr, function(index, value) {
            var tempGua = guarantorStatus.substr(index, 1);
            if (value !== '' && tempGua == '3') {
                switch (index) {
                    case 0:
                        if (value == '1') {
                            $('#dadT').trigger('click');
                        } else if (value == '2') {
                            $('#dadF').trigger('click');
                        }
                        break;
                    case 1:
                        if (value == '1') {
                            $('#momT').trigger('click');
                        } else if (value == '2') {
                            $('#momF').trigger('click');
                        }
                        break;
                    case 2:
                        if (value == '1') {
                            $('#otherT').trigger('click');
                        } else if (value == '2') {
                            $('#otherF').trigger('click');
                        }
                        break;
                    case 3:
                        if (value == '1') {
                            $('#spoT').trigger('click');
                        } else if (value == '2') {
                            $('#spoF').trigger('click');
                        }
                        break;
                }
            }
        });
    }
    //else if (adultTag == 'Y') { 
    else if (adultTag == 'Y' && level1 == '2') { //帶checkbox的值
        var checkboxArr = [father_checkbox, mother_checkbox];

        $.each(checkboxArr, function(index, value) {
            //var tempShow = familyStatus.substr(index, 1);
            if (value !== '') {
                switch (index) {
                    case 0:
                        if (value == '1') {
                            $('#incomeTaxFather').trigger('click');
                        }
                        break;
                    case 1:
                        if (value == '1') {
                            $('#incomeTaxMother').trigger('click');
                        }
                        break;
                }
            }
        });
    }
    /*帶radio button or checkbox的預設值 (end)*/

    /*舊戶要帶入radio box 和 checkbox上次的值, 新戶直接帶否 (start) */
    var radioArr = ['father', 'mother', 'thirdParty', 'spouse'];
    if (isRecord == 'N') {
        var radioBtn = $('.parents .radioGuarantor');
        $.each(radioArr, function(index, value) {
            console.debug(value);
            var radioGuarantorDiv = $('#' + value + ' .radioGuarantor');
            var radioGuarantorInput = $('#' + value + ' .css-checkbox_c').eq(1);
            console.debug(radioGuarantorInput.attr('id'));

            if (radioGuarantorDiv.is(':visible')) {
                radioGuarantorInput.trigger('click');
            }
        });
    } else if (isRecord == 'Y') {
        var lastIsGuarantor = (content.lastIsGuarantor == '') ? '0000' : content.lastIsGuarantor;
        var lastIncomeTax = (content.lastIncomeTax == '') ? '0000' : content.lastIncomeTax;
        if (adultTag == 'N') { //未成年檢查連帶保證人
            $.each(radioArr, function(index, value) {
                var currentLastGua = lastIsGuarantor.substr(index, 1);
                var radioGuarantorDiv = $('#' + value + ' .radioGuarantor');
                var radioGuarantorInputYes = $('#' + value + ' .css-checkbox_c').eq(0);
                var radioGuarantorInputNo = $('#' + value + ' .css-checkbox_c').eq(1);

                if (radioGuarantorDiv.is(':visible')) {
                    if (currentLastGua == '0') { //連帶保證人的radio button選否
                        radioGuarantorInputNo.trigger('click');
                    } else if (currentLastGua == '1') { //連帶保證人的radio button選是
                        radioGuarantorInputYes.trigger('click');
                    }
                }
            });
        } else if (adultTag == 'Y') { //成年檢查合計所得對象
            var checkboxArr = ['Father', 'Mother'];
            var incomeTaxCheckBox = $('#incomeTaxRadio');
            if (incomeTaxCheckBox.is(':visible')) {
                $.each(checkboxArr, function(index, value) {
                    var currentLastTax = lastIncomeTax.substr(index, 1);
                    var checkboxInputFather = $('#incomeTaxFather');
                    var checkboxInputMother = $('#incomeTaxMother');
                    console.debug('==========================');
                    console.debug(value);
                    console.debug(checkboxInputFather.length);
                    console.debug(checkboxInputMother.length);

                    if (currentLastTax == '1') {
                        if (index == 0) {
                            checkboxInputFather.trigger("click");
                        } else if (index == 1) {
                            checkboxInputMother.trigger("click");
                        }

                    }
                });
            }
        }
    }
    /*舊戶要帶入radio box 和 checkbox上次的值, 新戶直接帶否 (end) */


    /*綁小網的收合按鈕之事件 (start)*/
    var father_close = $('#father .closeBtn');
    var father_open = $('#father .openBtn');
    var father_form1 = $('#father .famy');
    var father_form2 = $('#father .sodif');
    var mother_close = $('#mother .closeBtn');
    var mother_open = $('#mother .openBtn');
    var mother_form1 = $('#mother .famy');
    var mother_form2 = $('#mother .sodif');
    var thirdParty_close = $('#thirdParty .closeBtn');
    var thirdParty_open = $('#thirdParty .openBtn');
    var thirdParty_form1 = $('#thirdParty .famy');
    var thirdParty_form2 = $('#thirdParty .sodif');
    var spouse_close = $('#spouse .closeBtn');
    var spouse_open = $('#spouse .openBtn');
    var spouse_form1 = $('#spouse .famy');
    var spouse_form2 = $('#spouse .sodif');

    if ($(window).width() < 769) {
        //預設要點開第一個關係的表格
        $('.sodif').hide();
        $('.famy').hide();
        $('.closeBtn').hide();
        $('.closeBtn:first').show();
        $('.openBtn:first').hide();
        $('.sodif:first').show();
        $('.famy:first').show();
        $('.famy').eq(0).show();
        $('.famy').eq(1).show();

        //按下收合/展開的按鈕的事件
        father_close.on('click', function() {
            father_close.hide();
            father_open.show();
            father_form1.hide();
            father_form2.hide();
        });
        father_open.on('click', function() {
			//如果有擔任連帶保證人(radio選"是"), 則點選"展開"的按鈕, 下方表格會展開
			//如果沒有擔任連帶保證人(radio選"否"), 則點選"展開"的按鈕不會有反應
			var val = $('#dadF:checked').val();
			if(val == null) {
				father_close.show();
				father_open.hide();
				father_form1.show();
				father_form2.show();
			}
        });
        mother_close.on('click', function() {
            mother_close.hide();
            mother_open.show();
            mother_form1.hide();
            mother_form2.hide();
        });
        mother_open.on('click', function() {
			//如果有擔任連帶保證人(radio選"是"), 則點選"展開"的按鈕, 下方表格會展開
			//如果沒有擔任連帶保證人(radio選"否"), 則點選"展開"的按鈕不會有反應
			var val = $('#momF:checked').val();
			if(val == null) {
				mother_close.show();
				mother_open.hide();
				mother_form1.show();
				mother_form2.show();
			}
        });
        thirdParty_close.on('click', function() {
            thirdParty_close.hide();
            thirdParty_open.show();
            thirdParty_form1.hide();
            thirdParty_form2.hide();
        });
        thirdParty_open.on('click', function() {
			//如果有擔任連帶保證人(radio選"是"), 則點選"展開"的按鈕, 下方表格會展開
			//如果沒有擔任連帶保證人(radio選"否"), 則點選"展開"的按鈕不會有反應
			var val = $('#otherF:checked').val();
			if(val == null) {
				thirdParty_close.show();
				thirdParty_open.hide();
				thirdParty_form1.show();
				thirdParty_form2.show();
			}
        });
        spouse_close.on('click', function() {
            spouse_close.hide();
            spouse_open.show();
            spouse_form1.hide();
            spouse_form2.hide();
        });
        spouse_open.on('click', function() {
			//如果有擔任連帶保證人(radio選"是"), 則點選"展開"的按鈕, 下方表格會展開
			//如果沒有擔任連帶保證人(radio選"否"), 則點選"展開"的按鈕不會有反應
			var val = $('#spoF:checked').val();
			if(val == null) {
				spouse_close.show();
				spouse_open.hide();
				spouse_form1.show();
				spouse_form2.show();
			}
        });
    } else {
        //$('.sodif').show();
        //$('.famy').show();
        $('.closeBtn').hide();
        $('.openBtn').hide();
    }
    /*綁小網的收合按鈕之事件 (end)*/

    $('[name*="_id"]').blur(function() {
        $(this).val($(this).val().toUpperCase());
    });

    //2016-06-18 added by titan 綁半形轉全形
    /*
     GardenUtils.format.inputConvertFullWidth({
     name: ['father_neighborhood_domi', 'father_address_domi', 'mother_neighborhood_domi', 'mother_address_domi', 'thirdParty_neighborhood_domi', 'thirdParty_address_domi', 'spouse_neighborhood_domi', 'spouse_address_domi']
     });
     */
}

//塞連帶保證人的字串到hidden, 第五步要顯示的
function setGuarantorText(familyArray, guarantorStatus, guarantorTextHidden) {
    var allGuaText = '';
    $.each(familyArray, function(i, v) {
        if (guarantorStatus.length == 4) {
            var guaTemp = guarantorStatus.substr(i, 1);
            if (guaTemp == '1') {
                var guaTextTemp = $('#' + v + 'Title').text();
                allGuaText = allGuaText + ' ' + guaTextTemp;
            }
        }
    });
    guarantorTextHidden.val(allGuaText);
}

//限制input的長度for step 2, 跑迴圈套所有關係人的input
function limitInput() {

    for (var i = 0; i <= 3; i++) {
        var familyT = '';
        switch (i) {
            case 0:
                familyT = 'father_';
                break;
            case 1:
                familyT = 'mother_';
                break;
            case 2:
                familyT = 'thirdParty_';
                break;
            case 3:
                familyT = 'spouse_';
                break;
        }
        var limitId = $('[name="' + familyT + 'id"]');
        var limitYear = $('[name="' + familyT + 'birthday0"]');
        var limitMonth = $('[name="' + familyT + 'birthday2"]');
        var limitDay = $('[name="' + familyT + 'birthday4"]');
        var limitAddress_domi = $('[name="' + familyT + 'address_domi"]');
        var limitRegionCode = $('[name="' + familyT + 'regionCode"]');
        var limitPhone = $('[name="' + familyT + 'phone"]');
        var limitMobile = $('[name="' + familyT + 'mobile"]');
        var limitName = $('[name="' + familyT + 'name"]');

        limitId.attr('maxlength', '10');
        limitName.attr('maxlength', '20');
        limitYear.attr('maxlength', '3');
        limitMonth.attr('maxlength', '2');
        limitDay.attr('maxlength', '2');
        limitAddress_domi.attr('maxlength', '93');
        limitRegionCode.attr('maxlength', '3');
        limitPhone.attr('maxlength', '8');
        limitMobile.attr('maxlength', '10');
    }
}


//決定誰要展開表格
function showFamilyForm(familyArr, determineTagObj, adult) {
    var showForm = determineTagObj.familyStatus;
    var guarantorTag = determineTagObj.guarantorStatus;
    var incomeTaxTag = determineTagObj.incomeTax;

    $.each(familyArr, function(index, value) {
        var showFamilyTag = showForm.substr(index, 1); //決定要不要呈現表格的tag
        var currentDiv = $('#' + value);

        if (showFamilyTag == '0') { //隱藏表格
            var familyForm = $('#' + value);
            familyForm.hide();
        } else if (showFamilyTag == '1') {

            //塞"擔任連帶保證人"/"合計所得對象"的字串
            setFamilyString(determineTagObj, value);
        } else if (showFamilyTag == '2') { //先顯示radio,若選擇'是',再顯示div(未成年) / 先顯示checkbox,若選擇'母親',再顯示其div; 若選擇'父親',再顯示其div(成年)
            //塞"擔任連帶保證人"/"合計所得對象"的字串
            setFamilyString(determineTagObj, value);
            if (adult == 'N') { //未成年顯示radio button
                var radioTag = guarantorTag.substr(index, 1); //決定要不要呈現radio button
                //顯示radio button
                currentDiv.find('.radioGuarantor').show();
                //隱藏底下的輸入框,下拉式選單
                currentDiv.find('.famy').hide();
                currentDiv.find('.sodif').hide();
            } else if (adult == 'Y') { //成年顯示checkbox
                var parentsAllForm = $('#' + value);
                var incomeTaxRadioBtn = $('#incomeTaxRadio');
                incomeTaxRadioBtn.show();
                //一開始就把父母的表格藏起來
                parentsAllForm.hide();

            }
        } else if (showFamilyTag == '3') { //表格和checkbox要同時呈現
            var incomeTaxRadioBtn = $('#incomeTaxRadio');
            //塞"擔任連帶保證人"/"合計所得對象"的字串
            setFamilyString(determineTagObj, value);
            incomeTaxRadioBtn.show();
        }
    });
}

//塞關係人的字串(為擔任連帶保證人/合計所得對象)
function setFamilyString(determineTagObj, value) {
    var showForm = determineTagObj.familyStatus;
    var guarantorTag = determineTagObj.guarantorStatus;
    var incomeTaxTag = determineTagObj.incomeTax;
    var text = $('#' + value).find('p[class="stringOrRadio"]');
    var guarantorText = false;
    var incomeTaxText = false;
    var familyString = '';
    var familyArr = ['father', 'mother', 'thirdParty', 'spouse'];
    var DivIndex;
    var who = '';

    for (var i = 0; i <= 3; i++) {
        if (value == familyArr[i]) {
            DivIndex = i;
            who = familyArr[i];
            break;
        }
    }

    var guaCurrentIndex = guarantorTag.substr(DivIndex, 1);
    var incomeTaxCurrentIndex = incomeTaxTag.substr(DivIndex, 1);

    if (guaCurrentIndex == '0' || guaCurrentIndex == '2') {
        if (incomeTaxCurrentIndex == '1') {
            familyString = '(為合計所得對象)';
        }
    } else if (guaCurrentIndex == '1') {
        if (incomeTaxCurrentIndex == '0') {
            familyString = '(為連帶保證人)';
        } else if (incomeTaxCurrentIndex == '1') {
            familyString = '(為連帶保證人/合計所得對象)';
        }
    } else if (guaCurrentIndex == '3') {
        familyString = '擔任連帶保證人';
    }

    $('[name="' + who + '_String"]').val(familyString);
    text.append(familyString);
}

//塞關係人的資料
function setFamilyInfoValue(info, div) {
    var addressNameArr = ['cityId', 'zipCode', 'liner', 'neighborhood', 'address'];
    var addressValueArr = [];
    var divId = div.attr('id'); //每一塊div的id(ex:father, mother, thirdParty, spouse)
    console.debug('divID = ' + divId);

    $.each(info, function(propName, propValue) {
        if (propName == 'domicileAddress') { //如果是戶籍地址
            $.each(propValue, function(objName, objValue) {
                for (var i = 0; i <= 4; i++) {
                    if (addressNameArr[i] == objName) {
                        addressValueArr[i] = objValue;
                        break;
                    }
                }
            });

            $.each(addressNameArr, function(objName, objValue) {
                var inputName = divId + '_' + objValue + '_domi';
                var selector = $('[name="' + inputName + '"]');
                console.debug(addressValueArr[objName]);
                console.debug(objValue);
                setValue(inputName, addressValueArr[objName], objValue);

                selector.selectpicker('refresh');
                selector.trigger('change');

                if (objValue == 'liner' && addressValueArr[2] != '') {
                    hideLinerName(selector);
                }

            });
        } else if (typeof(propValue) === 'object') { //如果撈到的資料是物件,就再跑一次loop抓裡面的值
            $.each(propValue, function(objName, objValue) {
                var inputName = divId + '_' + objName;
                console.debug(inputName);
                setValue(inputName, objValue, objName);

            });
        } else { //否則直接把值塞進去
            var inputName = divId + '_' + propName;
            if (propName == 'birthday') { //生日
                for (var i = 0; i <= 4; i += 2) {
                    if (i == 0) { //年(三位數)
                        var birthdaySubstr = propValue.substr(i, 3);
                        div.find('[name="' + inputName + i + '"]').val(birthdaySubstr);
                    } else { //月or日(兩位數)
                        var birthdaySubstr = propValue.substr(i + 1, 2);
                        div.find('[name="' + inputName + i + '"]').val(birthdaySubstr);
                    }
                }
            } else {
                console.debug(inputName);
                setValue(inputName, propValue, propName);
            }
        }
    });

    function setValue(inputName, value, name) {
        div.find('[name="' + inputName + '"]').val(value);
        div.prepend('<input type="hidden" value="' + value + '" name="' + name + '_hidden" guarantor="' + divId + '"/>');
    }
}

//若為有撥款紀錄者，若前一步驟之家庭狀況選項沒有變更時，此步驟之所有欄位皆不允許修改
function determineAddReadonly(family, familyInfo) {

    var domicileCityName = familyInfo.domicileAddress.cityName;
    var domicileZipCodeName = familyInfo.domicileAddress.zipCodeName;

    var readonlyId = $('[name="' + family + '_id"]');
    var readonlyName = $('[name="' + family + '_name"]');
    var readonlyYear = $('[name="' + family + '_birthday0"]');
    var readonlyMonth = $('[name="' + family + '_birthday2"]');
    var readonlyDay = $('[name="' + family + '_birthday4"]');
    var readonlyReCode = $('[name="' + family + '_regionCode"]');
    var readonlyPhone = $('[name="' + family + '_phone"]');
    var readonlyMobile = $('[name="' + family + '_mobile"]');
    var readonlyNei = $('[name="' + family + '_neighborhood_domi"]');
    var readonlyAddr = $('[name="' + family + '_address_domi"]');
    var readonlyCity = $('[name="' + family + '_cityId_domi"]');
    var readonlyZip = $('[name="' + family + '_zipCode_domi"]');
    var readonlyLiner = $('[name="' + family + '_liner_domi"]');
    var readonlyRelation = $('[name="' + family + '_relationship"]');
    var stringSplit = $('#' + family + ' .stringOrRadio').text().split('為')[1];
    var domicileAddrRightDiv = $('#' + family + ' #domicileAddr .right');

    var readonlySame = $('[name="R_address_' + family + '"]');
    var gauStr = stringSplit.substr(0, 5);

    //將input轉成label
    inputToLabel(readonlyId);
    inputToLabel(readonlyName);
    inputToLabel(readonlyYear);
    inputToLabel(readonlyMonth);
    inputToLabel(readonlyDay);

    //如果為連帶保證人,則通訊電話及行動電話都不能開放修改
    if (readonlyMobile.val() != '') {
        if (gauStr == '連帶保證人') {
            inputToLabel(readonlyReCode);
            inputToLabel(readonlyPhone);
            inputToLabel(readonlyMobile);
        }
    }

    //不能點選下拉式選單
    domicileToLabel(domicileAddrRightDiv, domicileCityName, domicileZipCodeName, readonlyLiner.val(), readonlyNei.val(), readonlyAddr.val());

    //不能選取"同申請人戶籍地址"和"同申請人通訊地址"
    readonlySame.attr("disabled", "disabled");

}

function sameDomiAddr(changeObj, people) {
    console.debug(changeObj);
    console.debug(people);
    $.each(changeObj, function(i, obj) {
        var src = $('[name="' + people + '_' + obj.srcInput + '"]').val();
        var to = $('[name="' + people + '_' + obj.toInput + '"]');
        console.debug(to);
        var tagName = to.prop('tagName').toLowerCase();

        console.debug(obj.srcInput + ':' + src + '=' + obj.toInput + ':' + to.val());

        to.val(src);

        if (obj.callback !== undefined) {
            obj.callback.apply(window, [to]);
        }
    });
}

function sameDomiAddrWithApp(content, dCitySelect, dZipSelect, dlinerSelect) {
    var dCityId = content.domicileAddress.cityId;
    var dZipCode = content.domicileAddress.zipCode;
    var dLiner = content.domicileAddress.liner;

    dCitySelect.val(dCityId);
    dCitySelect.selectpicker('refresh');
    dCitySelect.trigger('change');
    //dCitySelect.find('option[value="' + dCityId + '"]').prop('selected', 'true');
    //dCitySelect.find('option[value="' + dCityId + '"]').trigger('change');

    console.debug(dCitySelect.length);
    console.debug(dZipSelect.length);
    console.debug(dlinerSelect.length);
    console.debug(dCityId);

    //顯示zip
    var jZip = modal.getZip(dCityId);
    var zipCodeArr = jZip.zipcodes;
    var zipCodeArray = [];
    $.each(zipCodeArr, function(i, zipData) {
        zipCodeArray.push('<option value=' + zipData.zipcode + '>' + zipData.areaName + '</option>');
    });

    dZipSelect.empty();
    dZipSelect.append(zipCodeArray.join(''));
    dZipSelect.selectpicker('refresh');
    dZipSelect.val(dZipCode);
    dZipSelect.trigger('change');
    //dZipSelect.find('option[value="' + dZipCode + '"]').prop('selected', 'true');
    //dZipSelect.find('option[value="' + dZipCode + '"]').trigger('change');

    //顯示liner
    if (dLiner != '') {
        var jLiner = modal.getLiner(dZipCode);
        var lArr = jLiner.liners;
        var lArray = [];
        $.each(lArr, function(i, linerData) {
            lArray.push('<option value=' + linerData.linerId + '>' + linerData.linerName + '</option>');
        });

        dlinerSelect.empty();
        dlinerSelect.append(lArray.join(''));
        dlinerSelect.selectpicker('refresh');
        dlinerSelect.val(dLiner);
        dlinerSelect.trigger('change');
    }
    //dlinerSelect.find('option[value="' + dLiner + '"]').prop('selected', 'true');
    //dlinerSelect.find('option[value="' + dLiner + '"]').trigger('change');
}

function sameAddrWithApp(content, citySelect, zipSelect, linerSelect) {
    var tCityId = content.teleAddress.cityId;
    var tZipCode = content.teleAddress.zipCode;
    var tLiner = content.teleAddress.liner;

    citySelect.find('option[value="' + tCityId + '"]').prop('selected', 'true');
    citySelect.find('option[value="' + tCityId + '"]').trigger('change');
    console.debug(citySelect.length);
    console.debug(zipSelect.length);
    console.debug(tCityId);
    //顯示zip
    var jZip = modal.getZip(tCityId);
    var zipCodeArr = jZip.zipcodes;
    var zipCodeArray = [];
    $.each(zipCodeArr, function(i, zipData) {
        zipCodeArray.push('<option value=' + zipData.zipcode + '>' + zipData.areaName + '</option>');
    });

    zipSelect.empty();
    zipSelect.append(zipCodeArray.join(''));
    zipSelect.selectpicker('refresh');
    zipSelect.find('option[value="' + tZipCode + '"]').prop('selected', 'true');
    zipSelect.find('option[value="' + tZipCode + '"]').trigger('change');

    //顯示liner
    var jLiner = modal.getLiner(tZipCode);
    var lArr = jLiner.liners;
    var lArray = [];
    $.each(lArr, function(i, linerData) {
        lArray.push('<option value=' + linerData.linerId + '>' + linerData.linerName + '</option>');
    });

    linerSelect.empty();
    linerSelect.append(lArray.join(''));
    linerSelect.selectpicker('refresh');
    linerSelect.find('option[value="' + tLiner + '"]').prop('selected', 'true');
    linerSelect.find('option[value="' + tLiner + '"]').trigger('change');
}

function updateFamilyStatus(sub, isClick) {
    var isGuarantor = $('[name="isGuarantor"]'); //連帶保證人的hidden
    var showInfo = $('[name="showInfo"]'); //需要顯示表格與否的hidden  
    var showInfoArrTemp = [];
    var isGuarantorArrTemp = [];
    var showInfoTemp = '';
    var isGuarantorTemp = '';

    for (var i = 0; i <= 3; i++) {
        showInfoArrTemp[i] = showInfo.val().substr(i, 1);
        isGuarantorArrTemp[i] = isGuarantor.val().substr(i, 1);
    }

    //如果選擇"是"
    if (isClick) {
        showInfoArrTemp[sub] = '1';
        isGuarantorArrTemp[sub] = '1';
    }
    //如果選擇"否"
    else {
        showInfoArrTemp[sub] = '0';
        isGuarantorArrTemp[sub] = '2';
    }

    //再將array裡的值塞成字串放進hidden中
    for (var j = 0; j <= 3; j++) {
        showInfoTemp = showInfoTemp + showInfoArrTemp[j];
        isGuarantorTemp = isGuarantorTemp + isGuarantorArrTemp[j];
    }
    isGuarantor.val(isGuarantorTemp);
    showInfo.val(showInfoTemp);
}

//Level 2 選項被點選時的動作
function clickLevel2Option(marry, adult, level1, level2) {
    var isChanged = $('[name = "isChanged"]');

    console.debug(marry + '/' + adult + '/' + level1 + '/' + level2);

    if (marry == 'N') { //未婚
        if (adult === false) { //未成年
            if (level1 == 1) {
                switch (level2) {
                    case '1':
                        familyStatus = '1100';
                        guarantorStatus = '1100';
                        incomeTax = '1100';
                        break;
                    case '2':
                        familyStatus = '1100';
                        guarantorStatus = '2100';
                        incomeTax = '1100';
                        break;
                    case '3':
                        familyStatus = '1100';
                        guarantorStatus = '1200';
                        incomeTax = '1100';
                        break;
                    case '4':
                        familyStatus = '0010';
                        guarantorStatus = '0010';
                        incomeTax = '0010';
                        break;
                }
            } else if (level1 == 2) {
                switch (level2) {
                    case '1':
                        familyStatus = '1100';
                        guarantorStatus = '1100';
                        incomeTax = '1100';
                        break;
                    case '2':
                        familyStatus = '1200';
                        guarantorStatus = '1300';
                        incomeTax = '1000';
                        break;
                    case '3':
                        familyStatus = '2100';
                        guarantorStatus = '3100';
                        incomeTax = '0100';
                        break;
                    case '4':
                        familyStatus = '2210';
                        guarantorStatus = '3310';
                        incomeTax = '0010';
                        break;
                }
            } else if (level1 == 3) {
                switch (level2) {
                    case '1':
                        familyStatus = '1000';
                        guarantorStatus = '1000';
                        incomeTax = '1000';
                        break;
                    case '2':
                        familyStatus = '0100';
                        guarantorStatus = '0100';
                        incomeTax = '0100';
                        break;
                    case '3':
                        familyStatus = '0010';
                        guarantorStatus = '0010';
                        incomeTax = '0010';
                        break;
                }
            } else if (level1 == 4) {
                familyStatus = '0010';
                guarantorStatus = '0010';
                incomeTax = '0010';
                console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
            }

        } else if (adult === true) { //成年
            if (level1 == 1) {
                switch (level2) {
                    case '1':
                        familyStatus = '1100'; //checkbox & form 同時出現
                        guarantorStatus = '1100';
                        incomeTax = '1100';
                        break;
                    case '2':
                        familyStatus = '1100';
                        guarantorStatus = '1200';
                        incomeTax = '1100';
                        break;
                    case '3':
                        familyStatus = '1100';
                        guarantorStatus = '2100';
                        incomeTax = '1100';
                        break;
                    case '4':
                        familyStatus = '1110';
                        guarantorStatus = '2210';
                        incomeTax = '1100';
                        break;
                }
            } else if (level1 == 2) {
                switch (level2) {
                    case '1':
                        familyStatus = '3300';
                        guarantorStatus = '1100';
                        incomeTax = '0000';
                        break;
                    case '2':
                        familyStatus = '1200';
                        guarantorStatus = '1000';
                        incomeTax = '0000';
                        break;
                    case '3':
                        familyStatus = '2100';
                        guarantorStatus = '0100';
                        incomeTax = '0000';
                        break;
                    case '4':
                        familyStatus = '2210';
                        guarantorStatus = '0010';
                        incomeTax = '0000';
                        break;
                }
            } else if (level1 == 3) {
                switch (level2) {
                    case '1':
                        familyStatus = '1000';
                        guarantorStatus = '1000';
                        incomeTax = '1000';
                        break;
                    case '2':
                        familyStatus = '0100';
                        guarantorStatus = '0100';
                        incomeTax = '0100';
                        break;
                    case '3':
                        familyStatus = '1010';
                        guarantorStatus = '2010';
                        incomeTax = '1000';
                        break;
                    case '4':
                        familyStatus = '0110';
                        guarantorStatus = '0210';
                        incomeTax = '0100';
                        break;
                }
                console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
            } else if (level1 == 4) {
                familyStatus = '0010';
                guarantorStatus = '0010';
                incomeTax = '0000';
            }

        }
    } else if (marry == 'Y') { //已婚
        if (level1 == 1) {
            switch (level2) {
                case '1':
                    familyStatus = '0001';
                    guarantorStatus = '0001';
                    incomeTax = '0001';
                    break;
                case '2':
                    familyStatus = '1001';
                    guarantorStatus = '1000';
                    incomeTax = '0001';
                    break;
                case '3':
                    familyStatus = '0101';
                    guarantorStatus = '0100';
                    incomeTax = '0001';
                    break;
                case '4':
                    familyStatus = '0011';
                    guarantorStatus = '0010';
                    incomeTax = '0001';
                    break;
            }
        } else if (level1 == 2) {
            switch (level2) {
                case '1':
                    familyStatus = '1001';
                    guarantorStatus = '1000';
                    incomeTax = '0001';
                    break;
                case '2':
                    familyStatus = '0101';
                    guarantorStatus = '0100';
                    incomeTax = '0001';
                    break;
                case '3':
                    familyStatus = '0011';
                    guarantorStatus = '0010';
                    incomeTax = '0001';
                    break;
            }
        } else if (level1 == 3) {
            switch (level2) {
                case '1':
                    familyStatus = '1000';
                    guarantorStatus = '1000';
                    incomeTax = '0000';
                    break;
                case '2':
                    familyStatus = '0100';
                    guarantorStatus = '0100';
                    incomeTax = '0000';
                    break;
                case '3':
                    familyStatus = '0010';
                    guarantorStatus = '0010';
                    incomeTax = '0000';
                    break;
            }
        } else if (level1 == 4) {
            switch (level2) {
                case '1':
                    familyStatus = '1000';
                    guarantorStatus = '1000';
                    incomeTax = '0000';
                    break;
                case '2':
                    familyStatus = '0100';
                    guarantorStatus = '0100';
                    incomeTax = '0000';
                    break;
                case '3':
                    familyStatus = '0010';
                    guarantorStatus = '0010';
                    incomeTax = '0000';
                    break;
            }
        }
    }

    console.debug(preLevel1 + '/' + preLevel2 + '/' + level1 + '/' + level2);

    if (preLevel1 == level1 && preLevel2 == level2) {
        isChanged.val('N');
    } else {
        isChanged.val('Y');
    }

    $('form input[name="familyStatus"]').val(familyStatus);
    $('form input[name="guarantorStatus"]').val(guarantorStatus);
    $('form input[name="familyStatusLevel1"]').val(level1);
    $('form input[name="familyStatusLevel2"]').val(level2);
    $('form input[name="incomeTaxArr"]').val(incomeTax);
}

//塞資料到input裡
function setInfoValue(info, div) {
    var divId = div.attr('id'); //每一塊div的id(ex:father, mother, thirdParty, spouse)
    var domicileCitySelector;
    var citySelector;
    var domicileZipSelector;
    var zipSelector;

    console.debug('divID = ' + divId);

    $.each(info, function(propName, propValue) {
        //console.debug(propName + ':' + propValue); //propName:得到的資料名稱; propValue:得到的資料的值

        if (typeof propValue === 'object') { //如果撈到的資料是物件,就再跑一次loop抓裡面的值
            $.each(propValue, function(objName, objValue) {
                //console.debug(objName + ':' + objValue);
                var inputName = divId + '_' + objName;
                //console.debug('inputName = ' + inputName);

                if (propName == 'domicilePhone') { //戶籍電話
                    div.find('[name="' + inputName + '_domi"]').val(objValue);
                } else if (propName == 'domicileAddress') { //戶籍地址
                    div.find('[name="' + inputName + '_domi"]').val(objValue);
                    //alert('[name="' + inputName + '_domi"]');
                    if (objName == 'cityId') {
                        var cityArray = [];
                        var jsonCity = modal.getCity();
                        console.debug(jsonCity);
                        cityArr = jsonCity.cities;

                        cityArray.push('<option value="">請選擇</option>');

                        $.each(cityArr, function(i, cityData) {
                            cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
                        });

                        //console.debug( inputName + "_domi");
                        div.find('[name="' + inputName + '_domi"]').append(cityArray.join(''));
                        div.find('[name="' + inputName + '_domi"]').selectpicker('refresh');
                        domicileCitySelector = div.find('[name="' + inputName + '_domi"]');
                        domicileCitySelector.trigger('change');

                    } else if (objName == 'zipCode') {
                        domicileZipSelector = div.find('[name="' + inputName + '_domi"]');
                        linkage.changeDomicileZipByCity(domicileCitySelector, cityArr, domicileZipSelector);
                        domicileZipSelector.trigger('change');
                    } else if (objName == 'liner') {
                        var domicileLinerSelector = div.find('[name="' + inputName + '_domi"]');
                        linkage.changeLinerByZip(domicileZipSelector, zipArr, domicileLinerSelector);
                        domicileLinerSelector.trigger('change');

                        if (objValue != '' && objValue != null) {
                            var linerCurrent = $('#' + divId + ' .liner_y button span').eq(0);
                            linerCurrent.text('*');
                        }

                    }
                } else if (propName == 'telePhone') { //通訊電話
                    if (objName == 'phone') {
                        div.prepend('<input type="hidden" value="' + objValue + '" name="' + propName + '_hidden" guarantor="' + divId + '"/>');
                    }
                    div.find('[name="' + inputName + '"]').val(objValue);
                } else if (propName == 'teleAddress') { //通訊地址
                    div.find('[name="' + inputName + '"]').val(objValue);
                    if (objName == 'cityId') {
                        var jsonCity = modal.getCity();
                        console.debug(jsonCity);
                        cityArr = jsonCity.cities;
                        var cityArray = [];
                        cityArray.push('<option value="">請選擇</option>');

                        $.each(cityArr, function(i, cityData) {
                            cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
                        });
                        div.find('[name="' + inputName + '"]').append(cityArray.join(''));
                        div.find('[name="' + inputName + '"]').selectpicker('refresh');
                        citySelector = div.find('[name="' + inputName + '"]');

                    } else if (objName == 'zipCode') {
                        zipSelector = div.find('[name="' + inputName + '"]');
                        linkage.changeZipByCity(citySelector, cityArr, zipSelector);
                    } else if (objName == 'liner') {
                        var linerSelector = div.find('[name="' + inputName + '"]');
                        linkage.changeLinerByZip(zipSelector, zipArr, linerSelector);

                    }
                } else if (propName == 'enterDate') { //入學日期
                    div.find('[name="' + inputName + '_enter"]').val(objValue);
                } else if (propName == 'graduationDate') { //畢業日期
                    div.find('[name="' + inputName + '_graduation"]').val(objValue);
                } else {
                    div.find('[name="' + inputName + '"]').val(objValue);
                }

            });
        } else { //如果撈到的資料不是物件,就直接塞字串進去
            var inputName = divId + '_' + propName;
            div.find('[name="' + inputName + '"]').val(propValue);

            div.prepend('<input type="hidden" value="' + propValue + '" name="' + propName + '_hidden" guarantor="' + divId + '"/>');

            if (propName == 'birthday') { //生日
                for (var i = 0; i <= 4; i += 2) {
                    if (i == 0) {
                        var birthdaySubstr = propValue.substr(i, 3);
                        div.find('[name="' + inputName + i + '"]').val(birthdaySubstr);
                    } else {
                        var birthdaySubstr = propValue.substr(i + 1, 2);
                        div.find('[name="' + inputName + i + '"]').val(birthdaySubstr);
                    }
                }
            }
            if (propName == 'student_id') {
                var studentId = $('[name="student_id"]')
                studentId.val(propValue);
            }

            //塞第三人的"與申請人之關係"的下拉式選單預設值
            if (divId == 'thirdParty' && propName == 'relationship' && propValue != '') {
                console.debug(propValue);
                div.find('[name="' + inputName + '"]').val(propValue);
                div.find('[name="' + inputName + '"]').trigger('change');
            }
        }
    });
}

//塞資料到text裡
function setInfoText(info, div) {
    var divId = div.attr('id'); //每一塊div的id
    var domiPhoneText = '';
    var telePhoneText = '';
    var domiCityIdText = '';
    var domiZipCodeText = '';
    var domiLinerText = '';
    var domiLinerText = '';
    var domiAddressText = '';
    var addressArr = [];

    $.each(info, function(propName, propValue) {
        //console.debug(propName + ':' + propValue);          //propName:得到的資料名稱; propValue:得到的資料的值

        if (typeof propValue === 'object') { //如果撈到的資料是物件,就再跑一次loop抓裡面的值
            $.each(propValue, function(objName, objValue) {
                //console.debug(objName + ':' + objValue);
                var inputName = divId + '_' + objName;

                if (propName == 'domicilePhone') { //戶籍電話
                    if (objName == 'regionCode') {
                        domiPhoneText = '(' + objValue + ')';
                    } else if (objName == 'phone') {
                        domiPhoneText = domiPhoneText + objValue;
                    }
                    div.find('[name="' + inputName + '_domi"]').text(domiPhoneText);
                }
                if (propName == 'domicileAddress') { //戶籍地址
                    if (objName == 'cityId') {
                        addressArr[0] = objValue;
                        //alert('cityId:'+domiCityIdText);
                    } else if (objName == 'zipCode') {
                        addressArr[1] = objValue;
                        //alert('zipCode:'+domiZipCodeText);
                    } else if (objName == 'liner') {
                        addressArr[2] = objValue;
                        //alert('liner:'+domiLinerText);
                    } else if (objName == 'neighborhood') {
                        if (objValue == '') {
                            addressArr[3] = objValue;
                        } else if (objValue != '') {
                            addressArr[3] = objValue + '鄰';
                        }

                        //alert('neighborhood:'+domiNeighborhoodText);
                    } else if (objName == 'address') {
                        addressArr[4] = objValue;
                        //alert('address:'+domiAddressText);
                    }

                    div.find('[name="' + divId + '_addr_domi"]').empty();
                    div.find('[name="' + divId + '_addr_domi"]').append(addressArr.join(''));
                }

                //通訊電話和通訊地址
                if (propName == 'telePhone') { //通訊電話
                    if (objName == 'regionCode') {
                        telePhoneText = '(' + objValue + ')';
                    } else if (objName == 'phone') {
                        telePhoneText = telePhoneText + objValue;
                    }
                    div.find('[name="' + inputName + '"]').text(telePhoneText);
                }
            });
        } else { //如果撈到的資料不是物件,就直接塞字串進去
            var inputName = divId + '_' + propName;
            div.find('[name="' + inputName + '"]').text(propValue);

            if (propName == 'marryStatus') { //婚姻狀況
                if (propValue == 'Y') {
                    div.find('[name="' + inputName + '"]').text('已婚(含離婚或配偶過世)');
                } else if (propValue == 'N') {
                    div.find('[name="' + inputName + '"]').text('未婚');
                }
            }
        }
    });
}


function apply3_1(content) {
    $('.selectpicker').selectpicker();

    var studentDiv = $('#student');
    var Serving = $('#Serving');
    var nojob = $('#nojob');
    var onTheJobHidden = $('[name="onTheJobHidden"]');
    setInfoValue(content, studentDiv);
    lastEnterDate = content.lastEnterDate;
    var eStage = content.EducationStage;
    var sday = content.school.isDay;
    var sNational = content.school.isNational;
    var sName = content.school.name;
    var gGrade = content.gradeClass.grade;
    var OnTheJob = content.OnTheJob;
    var departmentVal = content.department;
    //var studentId = content.student_id;

    //下拉式選單
    //教育階段
    var stageSelectValue = $('[name="stageSelectValue"]');
    var stageSelect = $('[name="student_educationStage"]');
    var isDaySelect = $('[name="student_isDay"]');
    var isNationalSelect = $('[name="student_isNational"]');
    var gradeSelect = $('[name="student_grade"]');
    var nameSelect = $('[name="student_name"]');
    var departmentSelect = $('[name="student_department"]');
    //var educationStage_hidden = $('[name="EducationStage_hidden"]');
    var jsonStage = modal.getEducationStage();
    console.debug(jsonStage);
    var stageArr = jsonStage.schooltype3;
    var stageArray = [];
    var year = 0; // 學制年級數(計算畢業年月)
    var classYear = 0; // 可選年級數(頁面顯示)
    var departmentInput = $('.departmentInput');
    var inputArr = ['<input type="text" class="input_m" name="student_department" value="' + departmentVal + '"><div class="error-msg"></div>'];
    var selectArr = ['<select class="selectpicker input_m nameLength" name="student_department"><option value="">請選擇</option><option value="醫學系" ' + (departmentVal == '醫學系' ? 'selected="true"' : '') + '>醫學系</option><option value="牙醫系" ' + (departmentVal == '牙醫系' ? 'selected="true"' : '') + '>牙醫系</option></select><div class="error-msg"></div>'];

    stageSelect.on('change', function() {
        var gradeArray = [];
        educationStageId = $(this).val();
        switch (educationStageId) {
            case '1': // 博士班
                classYear = 7;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                Serving.attr('disabled', false);
                break;

            case '2': // 碩士班
                classYear = 4;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                Serving.attr('disabled', false);
                break;

            case '3': // 大學醫學系
                gradeArray = [];
                gradeArray.push('<option value="">請選擇</option>');
                gradeSelect.empty();
                gradeSelect.append(gradeArray.join(''));
                gradeSelect.selectpicker('refresh');
                gradeSelect.val('');
                gradeSelect.trigger('change');

                departmentInput.children().remove();
                departmentInput.append(selectArr.join(''));
                $('.selectpicker').selectpicker();
                Serving.attr('disabled', false);

                $('[name="student_department"]').on('change', function() {
                    var departmentId = $(this).val();
                    $('[name="department"]').val(departmentId);

                    if (departmentId == '醫學系') {
                        classYear = 7;
                        //alert('1:'+classYear);
                    } else if (departmentId == '牙醫系') {
                        classYear = 6;
                        //alert('2:'+classYear);
                    }
                    //長"班級"的下拉式選單
                    gradeArray = [];
                    gradeArray.push('<option value="">請選擇</option>');
                    console.debug(classYear);
                    if (classYear != 0) {
                        for (var y = 1; y <= classYear; y++) {
                            gradeArray.push('<option value=' + y + '>' + y + '</option>');
                        }
                    }
                    gradeSelect.empty();
                    gradeSelect.append(gradeArray.join(''));
                    gradeSelect.selectpicker('refresh');
                });

                if (content.department !== '') {
                    if (department == '醫學系') {
                        $('[name="student_department"]').val('醫學系');
                        $('[name="student_department"]').trigger('change');
                    } else {
                        $('[name="student_department"]').val('牙醫系');
                        $('[name="student_department"]').trigger('change');
                    }
                }
                break;

            case '4': // 大專技院校
                classYear = 5;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                Serving.attr('disabled', false);
                break;

            case '5': // 二技
                classYear = 3;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                Serving.attr('disabled', false);
                break;

            case '6': // 二專
                classYear = 3;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                Serving.attr('disabled', false);
                break;

            case '7': // 高中職
                classYear = 4;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                //高中職的在職專班要預設為"否",且不能更改
                nojob.trigger('click');
                Serving.attr('disabled', 'disabled');
                onTheJobHidden.val('N');
                break;

            case '8': // 五專
                classYear = 5;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                Serving.attr('disabled', false);
                break;

            case '9': // 學士後第二專長學士學位學程
                classYear = 1;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                Serving.attr('disabled', false);
                break;

            case 'A': // 七年一貫
                classYear = 7;
                departmentInput.children().remove();
                departmentInput.append(inputArr.join(''));
                Serving.attr('disabled', false);
                break;

            default: // 錯誤
                classYear = 0;
                Serving.attr('disabled', false);
        }

        //長"班級"的下拉式選單
        if (educationStageId != 3) {
            gradeArray = [];
            gradeArray.push('<option value="">請選擇</option>');
            console.debug(classYear);

            for (var y = 1; y <= classYear; y++) {
                gradeArray.push('<option value=' + y + '>' + y + '</option>');
            }

            gradeSelect.empty();
            gradeSelect.append(gradeArray.join(''));
            gradeSelect.selectpicker('refresh');
        }

        stageSelectValue.val(eStage);
    });


    //點選教育階段的下拉式選單,就把value塞進變數中,最後要連動學校名稱用
    stageSelect.on('change', function() {
        educationStageId = $(this).val();
        linkage.changeSchoolName(nameSelect);
        stageSelectValue.val(educationStageId);
    });
    //點選公/私立的下拉式選單,就把value塞進變數中,最後要連動學校名稱用
    isNationalSelect.on('change', function() {
        nationalId = $(this).val();
        linkage.changeSchoolName(nameSelect);
    });
    //點選日/夜間的下拉式選單,就把value塞進變數中,最後要連動學校名稱用
    isDaySelect.on('change', function() {
        dayNightId = $(this).val();
        linkage.changeSchoolName(nameSelect);
    });

    var student_year_graduation = $('[name="student_year_graduation"]');
    var student_month_graduation = $('[name="student_month_graduation"]');
    var year_graduation_hidden = $('[name="year_graduation_hidden"]');
    var month_graduation_hidden = $('[name="month_graduation_hidden"]');
    var student_year_enter = $('[name="student_year_enter"]');
    var student_month_enter = $('[name="student_month_enter"]');
    var student_year_enterInt;
    var student_month_enterInt;
    var student_year_enterString;
    var student_month_enterString;
    var gradePicked;
    var gradeVal;

    //年級
    gradeSelect.on('change', function() {
        gradePicked = $(this).find('option:selected');
        gradeVal = gradePicked.val();
        computeGraduation(student_year_enter.val(), student_month_enter.val(), gradeVal, year);
    });

    //學校
    nameSelect.on('change', function() {
        schoolPicked = $(this).find('option:selected');
        year = schoolPicked.attr('class');
        computeGraduation(student_year_enter.val(), student_month_enter.val(), gradeVal, year);
    });

    //入學日期(年)
    student_year_enter.on('blur', function() {
        var dateCurrent = new Date();
        var dateCurrentYear = dateCurrent.getFullYear() - 1911;
        if (dateCurrentYear < student_year_enter.val()) {
            $('#overYear-msg').show();
            student_year_enter.val('');
            if ($('#ori-msg').text() != '') {
                $('#overYear-msg').hide();
            }
        } else {
            $('#overYear-msg').hide();
            computeGraduation(student_year_enter.val(), student_month_enter.val(), gradeVal, year);
        }
    });

    //入學日期(月)
    student_month_enter.on('blur', function() {
        var month_enter = student_month_enter.val();
        if (month_enter.length != 2) {
            month_enter = '0' + student_month_enter.val();
            student_month_enter.val(month_enter);
        }
        computeGraduation(student_year_enter.val(), student_month_enter.val(), gradeVal, year);
    });

    var eStage = content.EducationStage;
    var sday = content.school.isDay;
    var sNational = content.school.isNational;
    var sName = content.school.name;
    var enterDateYear = content.enterDate.year;
    var enterDateMonth = content.enterDate.month;

    isDaySelect.val(sday);
    stageSelect.val(eStage);
    isNationalSelect.val(sNational);
    student_year_enter.val(enterDateYear);
    student_month_enter.val(enterDateMonth);
    stageSelect.trigger('change');
    isDaySelect.trigger('change');
    isNationalSelect.trigger('change');

    gradeSelect.val(gGrade);
    gradeSelect.trigger('change');
    nameSelect.val(sName);
    nameSelect.trigger('change');

    if (enterDateYear != '' || enterDateYear != undefined) {
        student_year_enter.on('blur');
    }

    //限制輸入的長度
    departmentSelect.attr('maxlength', '20');
    student_year_enter.attr('maxlength', '3');
    student_month_enter.attr('maxlength', '2');
    $('[name="student_class"]').attr('maxlength', '10');
    $('[name="student_id"]').attr('maxlength', '10');

    //抓在職專班狀況的預設(radio)
    if (OnTheJob == 'Y') {
        Serving.trigger('click');
        $('[name="onTheJobHidden"]').val('Y');
    } else if (OnTheJob == 'N' || OnTheJob == '') {
        nojob.trigger('click');
        $('[name="onTheJobHidden"]').val('N');
    }

    //點選在職專班狀況的radio
    Serving.on('click', function() {
        $('[name="onTheJobHidden"]').val('Y');
    });
    nojob.on('click', function() {
        $('[name="onTheJobHidden"]').val('N');
    });
}

//計算畢業日期
function computeGraduation(student_year_enterString, student_month_enterString, gradeVal, year) {
    var gDate = $('#gDate');
    var gArray = [];
    var grYear = "";
    var grMonth = "";
    var current = new Date();
    var currentYear = current.getFullYear() - 1911;
    var year_graduation_hidden = $('[name="year_graduation_hidden"]');
    var month_graduation_hidden = $('[name="month_graduation_hidden"]');
    //student_year_enterString = student_year_enter.val();
    student_year_enterInt = parseInt(student_year_enterString);
    //student_month_enterString = student_month_enter.val();
    student_month_enterInt = parseInt(student_month_enterString);

    var checkInt = (!isNaN(student_year_enterInt));
    if (checkInt) {
        if (student_year_enterString.length == 2 || student_year_enterString.length == 3) {
            if (student_month_enterInt <= 12 && student_month_enterInt >= 1) {
                if (gradeVal !== '' && gradeVal !== undefined) {
                    if (year !== '' && year !== undefined) {
                        //var extraYear = ((year - gradeVal) < 1) ? 1 : (year - gradeVal);
                        /*var extraYear = ((gradeVal > year)) ? (gradeVal - year) : 0;
                         gradeVal = parseInt(gradeVal);
                         var more = (year - gradeVal > 0) ? year - gradeVal : 0;*/
                        var extraYear = ((year - gradeVal + 1) < 1) ? 1 : (year - gradeVal + 1);
                        grYear = "" + (currentYear + extraYear);
                        grMonth = "06";

                        gArray.length = 0;

                        year_graduation_hidden.val(grYear);
                        month_graduation_hidden.val(grMonth);
                    } else {
                        graduationSetZero(grYear, grMonth, year_graduation_hidden, month_graduation_hidden);
                    }
                } else {
                    graduationSetZero(grYear, grMonth, year_graduation_hidden, month_graduation_hidden);
                }
            } else {
                graduationSetZero(grYear, grMonth, year_graduation_hidden, month_graduation_hidden);
            }
        } else {
            graduationSetZero(grYear, grMonth, year_graduation_hidden, month_graduation_hidden);
        }
    } else {
        graduationSetZero(grYear, grMonth, year_graduation_hidden, month_graduation_hidden);
    }

    if (student_year_enterInt == grYear) {
        if (student_month_enterString > parseInt(grMonth)) {
            grYear++;
        }
    }

    gArray.push('民國<p name="student_year_graduation" class="gr"> ' + grYear + ' </p><p class="gr" id="yy">年</p><p name="student_month_graduation" class="gr"> ' + grMonth + ' </p><p class="gr" id="mm">  月</p>');

    gDate.empty();
    gDate.append(gArray.join(''));
}

//將畢業日期歸零
function graduationSetZero(grYear, grMonth, year_graduation_hidden, month_graduation_hidden) {
    grYear = '  ';
    grMonth = '  ';
    year_graduation_hidden.val(grYear);
    month_graduation_hidden.val(grMonth);
}

function apply3_2(content) {
    var freedomDiv = $('#freedom');
    var billDiv = $('#accordingToBill');
    var loans = $('#loansSum');
    var freedom = content.freedom;
    var accordingToBill = content.accordingToBill;
    console.debug(content);
    var loan = content.loans;
    var accHidden = $('[name="accordingToBill_sum_hidden"]');
    var freeHidden = $('[name="freedom_sum"]');
    var loanPriceHidden = $('[name="loanPrice"]');
    var stageSelectValueHidden = $('[name="stageSelectValue"]');
    var whiteListHidden = $('[name="whiteListHidden"]');
    loanHidden = $('[name="loansPrice"]');
    var sSelectValue = content.stageSelectValue;
    var whiteList = content.whiteList;

    whiteListHidden.val(whiteList);

    stageSelectValueHidden.val(sSelectValue);

    //選擇貸款的方式
    $('#apm_1').on('click', function() {
        $('#loans').show();
        $('#accordingToBill').show();
        $('#freedom').hide();
        $('#price').show();
        loanPriceHidden.val('1');
        loanChoiced = '1'; //申貸方式為'依註冊繳費單登載之可貸金額'
    });
    $('#apm_2').on('click', function() {
        $('#loans').hide();
        $('#freedom').show();
        $('#accordingToBill').hide();
        $('#price').hide();
        loanPriceHidden.val('2');
        loanChoiced = '2'; //申貸方式為'自行選擇申貸項目'
    });

    var accordingToBill_sum = $('#accordingToBill_sum');
    var freedom_sum = $('#freedom_sum');

    var accordingToBill_book = $('[name="accordingToBill_book"]');
    var accordingToBill_live = $('[name="accordingToBill_live"]');
    var accordingToBill_abroad = $('[name="accordingToBill_abroad"]');
    var accordingToBill_life = $('[name="accordingToBill_life"]');
    var accordingToBill_publicExpense = $('[name="accordingToBill_publicExpense"]');
    var freedom_credit = $('[name="freedom_credit"]');
    var freedom_FPA = $('[name="freedom_FPA"]');
    var freedom_practice = $('[name="freedom_practice"]');
    var freedom_music = $('[name="freedom_music"]');
    var freedom_book = $('[name="freedom_book"]');
    var freedom_live = $('[name="freedom_live"]');
    var freedom_abroad = $('[name="freedom_abroad"]');
    var freedom_life = $('[name="freedom_life"]');
    var freedom_publicExpense = $('[name="freedom_publicExpense"]');


    loans.attr('maxlength', '10');
    accordingToBill_book.attr('maxlength', '4');
    accordingToBill_live.attr('maxlength', '9');
    accordingToBill_abroad.attr('maxlength', '9');
    accordingToBill_life.attr('maxlength', '5');
    accordingToBill_publicExpense.attr('maxlength', '8');

    freedom_credit.attr('maxlength', '9');
    freedom_FPA.attr('maxlength', '9');
    freedom_practice.attr('maxlength', '9');
    freedom_music.attr('maxlength', '9');
    freedom_book.attr('maxlength', '4');
    freedom_live.attr('maxlength', '9');
    freedom_abroad.attr('maxlength', '9');
    freedom_life.attr('maxlength', '5');
    freedom_publicExpense.attr('maxlength', '8');


    //"依註冊繳費單登載之可貸金額"的金額計算
    var totalMoney;

    $('#loansSum, #accordingToBillPlusOthers .input_f, #accordingToBill_publicExpense').on('blur', function() {
        var $thisValue = $(this);
        var thisValue = $thisValue.val();
		thisValue = thisValue.trim();	
        var isInt = isInteger(thisValue);

        if (isNaN(parseInt($thisValue.val())) || (!isInt)) {
            $thisValue.val('');
        }
		else{
			$thisValue.val(thisValue);
		}

        var firstLoans = [{
            'money': loans.val()
        }, {
            'money': accordingToBill_book.val()
        }, {
            'money': accordingToBill_live.val()
        }, {
            'money': accordingToBill_abroad.val()
        }, {
            'money': accordingToBill_life.val()
        }, {
            'money': accordingToBill_publicExpense.val()
        }];
        console.debug(firstLoans);

        totalMoney = computeMoney(firstLoans, '1');
        accHidden.val(totalMoney);

        totalMoney = addDot(totalMoney);

        accordingToBill_sum.val(totalMoney);
        //}
    });

    $('#freedomPlusOthers .input_f, #freedom_publicExpense').on('blur', function() {
        var $thisValue = $(this);
        var thisValue = $thisValue.val();
		thisValue = thisValue.trim();	
        var isInt = isInteger(thisValue);

        if (isNaN(parseInt($thisValue.val())) || (!isInt)) {
            $thisValue.val('');
        }
		else{
			$thisValue.val(thisValue);
		}

        var secondLoans = [{
            'money': freedom_credit.val()
        }, {
            'money': freedom_FPA.val()
        }, {
            'money': freedom_practice.val()
        }, {
            'money': freedom_music.val()
        }, {
            'money': freedom_book.val()
        }, {
            'money': freedom_live.val()
        }, {
            'money': freedom_abroad.val()
        }, {
            'money': freedom_life.val()
        }, {
            'money': freedom_publicExpense.val()
        }]
        console.debug(secondLoans);

        totalMoney = computeMoney(secondLoans, '2');
        freeHidden.val(totalMoney);

        totalMoney = addDot(totalMoney);

        freedom_sum.val(totalMoney);
        //}
    });

    //帶預設
    if (loan == '1') {
        $('#apm_1').trigger('click');
        setEducationText(accordingToBill, billDiv);
        loans.val(content.accordingToBill.loansSum);
        loans.trigger('blur');
        //$('[name="accordingToBill_sum_hidden"]').val(content.accordingToBill_sum);
        //$('#accordingToBill_sum').val(content.accordingToBill_sum);
    } else if (loan == '2') {
        $('#apm_2').trigger('click');
        setEducationText(freedom, freedomDiv);
        freedom_credit.trigger('blur');
        //$('[name="freedom_sum_hidden"]').val(content.freedom_sum);
        //$('#freedom_sum').val(content.freedom_sum);
    }
}

function isInteger(obj) {
    var isInt = true;
    if (obj % 1 !== 0 || obj.indexOf('.') !== -1) {
        isInt = false;
    }
    return isInt;
}

function computeMoney(loansItem, radioIndex) {
    console.debug(loansItem);
    if (radioIndex == '1') {
        var sum = 0;
        $.each(loansItem, function(i, value) {
            var moneyString = "" + (value.money);
            var removeSpaceMoney = moneyString.replace(/\s+/g, "");
            var currentMoney = (isNaN(parseInt(removeSpaceMoney))) ? 0 : parseInt(removeSpaceMoney);

            if (i == 5) {
                sum = sum - currentMoney;
            } else {
                sum = sum + currentMoney;
            }
        });
    } else if (radioIndex == '2') {
        var sum = 0;

        $.each(loansItem, function(i, value) {
            var moneyString = "" + (value.money);
            var removeSpaceMoney = moneyString.replace(/\s+/g, "");
            var currentMoney = (isNaN(parseInt(removeSpaceMoney))) ? 0 : parseInt(removeSpaceMoney);

            if (i == 8) {
                sum = sum - currentMoney;
            } else {
                sum = sum + currentMoney;
            }
        });
    }
    return sum;
}

function apply4_1(content) {

    var loansIndex = content.loanPrice;
    var lifePriceOfBill = content.accordingToBill.life;
    var lifePriceOfFree = content.freedom.life;
    var lowIncomesArr = [];
    var uploadObj = $('#uploadObj');

    if (loansIndex == '1') {
        if (lifePriceOfBill > 0) {
            $('.lowIncome').show();
            uploadEvent($('#lowIncome').find('input[type="file"]'));
        } else {
            $('.lowIncome').hide();
        }
    } else if (loansIndex == '2') {
        if (lifePriceOfFree > 0) {
            $('.lowIncome').show();
            uploadEvent($('#lowIncome').find('input[type="file"]'));
        } else {
            $('.lowIncome').hide();
        }
    }
    //alert($('.file-view a').length);
    uploadEvent();
    showUploadFiles(content, '4');

    //綁預覽事件
    $('.file-view a').off('click').on('click', function() {
        previewClickHandler($(this));
    });

    if (loansIndex == '1') {
        if (lifePriceOfBill == 0) {
            $('.lowIncome').hide();
        }
    } else if (loansIndex == '2') {
        if (lifePriceOfFree == 0) {
            $('.lowIncome').hide();
        }
    }
}

function uploadEvent(input) {

    var defaultFileArray = $('input[type="file"]');

    if (input != undefined) {
        defaultFileArray = input;
    }

    //綁上傳事件
    defaultFileArray.off('change').on('change', function(ev) {
        ev.preventDefault();

        var inputFile = $(this);

        var fileModify = inputFile.parents('td.file-modify:first');
        var docId = fileModify.attr('docid');

        if (docId == undefined) {
            docId = '';
        }

        var inputFileName = inputFile.attr('name');
        var inputTitle = inputFileName.split('F')[0];
        var inputHidden = $('[name="' + inputTitle + '_hidden"]');
        var tr = inputFile.parents('tr:first');
        var selected_file_name = $(this).val();
        var fileSize = inputFile.context.files[0].size;
		var inputText = inputFile.parent().text();

        var buttonId = inputFile.parent().attr('id');
        var currentIndex = buttonId.substr(-1, 1);

        //checkSize(files);

        console.debug(selected_file_name);
        console.debug(selected_file_name.substr(-3, 3));

        var selectedFileArr = selected_file_name.split("\\");
        var thisFileName = selectedFileArr.pop();

        var fileType = selected_file_name.substr(-3, 3);
		
		//擋10個檔案
		var fileBtn = $('.file-modify');
        if (fileBtn.length == 10 && inputText != '修改檔案') {
            $('#documentNumber').show();
        } else {
            $('#documentNumber').hide();

			//先檢查上傳文件格式
			fileType = fileType.toLowerCase();
			console.debug(fileType);

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

					var form = $('<form id="uploadForm" method="post" action="data?action=uploadApplyDocument&docId=' + docId + '" enctype="Multipart/Form-Data" style="display:none;"></form>').prependTo('body');

					//inputFile.clone().appendTo(form);
					inputFile.appendTo(form);


					if ($('.ajax-loader').length == 0) {
						$('<div class="ajax-loader" style="display: none;"><div class="b-loading"><span class="m-icon-stack"><i class="m-icon m-icon-fubon-blue is-absolute"></i><i class="m-icon m-icon-fubon-green"></i></span></div></div>').prependTo($('body'));
					}
					$('.ajax-loader').show();
					setTimeout(function() {
						GardenUtils.ajax.uploadFile(form, 'data?action=uploadApplyDocument&docId=' + docId, function(response) {

							console.debug(response);
							var sizeArray = '<input type="hidden" class="fileSize_' + inputTitle + '" name="' + inputTitle + '_hidden' + currentIndex + '" value="">';
							var FilenameExtension = '<input type="hidden" class="fileNameExtension" name="' + inputTitle + 'Name_hidden' + currentIndex + '" value="">';

							if (response.isSuccess == 'Y') {
								var newFile = response.docId;

								if (tr.find('td.file-upload a').text() == '上傳檔案' || tr.find('td.file-upload a').text() == '上傳更多') {
									var nextIndex = parseInt(currentIndex) + 1;
									if (inputTitle == 'lowIncome' || inputTitle == 'register') {

										addNewFile(tr, inputTitle, nextIndex, '上傳更多');
									}
									$('.processInner').prepend(sizeArray);
									$('.processInner').prepend(FilenameExtension);
								}

								inputHidden.val(fileSize);
								tr.find('td.file-upload a').text('修改檔案');
								tr.find('td.file-upload').removeClass('file-upload').addClass('file-modify');
								tr.find('td.file-en').text(response.src).removeClass('new');
								tr.find('td.file-view a').addClass('active');
								form.find('input[type="file"]').appendTo(tr.find('td.file-modify a'));
								tr.find('td.file-modify').attr('docid', newFile);

								//塞副檔名到hidden中
								var sizeHidden = $('[name="' + inputTitle + '_hidden' + currentIndex + '"]');
								var nameHidden = $('[name="' + inputTitle + 'Name_hidden' + currentIndex + '"]');
								sizeHidden.val(fileSize);
								nameHidden.val(fileType);

								//                            var idName = tr.find('.file-view a').attr('id');
								//                            var nameHidden = $('[name="' + idName + 'Name_hidden"]');
								//                            nameHidden.val(fileType);

								//更新預覽的圖及小網顯示的圖

								var previewURL = 'data?action=downloadApplyDocument&isPreview=Y&docId=';
								var newURL = previewURL + newFile;

								tr.next('tr').find('iframe').attr("src", newURL);
								tr.find('td.file-photo img').attr("src", newURL);

								$('.ajax-loader').hide();

							} else {
								if (selected_file_name != '') alert('Upload Fail!!');
								form.find('input[type="file"]').appendTo(tr.find('td.file-modify'));

								$('.ajax-loader').hide();
							}

							$('.ajax-loader').hide();
						});
					}, 200);



				}
			}
		
		}
    });
}

//顯示文件項目的字串
function showFileString(name) {
    switch (name) {
        case 'idPositive':
            return '身分證正面影本';
        case 'idNegative':
            return '身分證反面影本';
        case 'register':
            return '註冊繳費單<span>（含註冊繳費單、住宿費用）</span>';
        case 'lowIncome':
            return '政府機關出具之低收入戶或中低收入戶證明';
    }
}

function previewClickHandler(obj) {

    if (obj.hasClass('active')) {
        var thisID = obj.attr('id');

        var itemName = thisID.split('View_')[0];
        var fileIndex = thisID.split('View_')[1];
        var fileName = $('#' + itemName + 'Img_' + fileIndex).text();
        if (fileName != undefined) {
            fileName = fileName.substring(fileName.lastIndexOf('.') + 1);
        }
        fileName = fileName.toLowerCase();
        //alert(fileName);

        previewDocument($('#' + itemName + 'ViewTag_' + fileIndex + ' iframe').attr('src'), fileName);
    }
}

//動態長出同項目的新的上傳檔案
function addNewFile(tr, compareName, nextIndex, uploadDisplayName) {
    var trView;

    if (tr != null) {
        trView = tr.next();
    }

    console.debug('---------------------------');
    console.debug(compareName);

    //動態再長一個"上傳檔案"的li
    var fileName = showFileString(compareName);
    var newTr = $('<tr id="' + compareName + '_' + nextIndex + '" class="' + compareName + '">' +
        '<td class="file-photo">' +
        '<a>' +
        '<img id="' + compareName + 'Photo_img_' + nextIndex + '" src="">' +
        '</a>' +
        '</td>' +
        '<td class="file-zh">' + fileName + '</td>' +
        '<td class="file-en new" id="' + compareName + 'Img_' + nextIndex + '">無</td>' +
        '<td class="file-upload">' +
        '<a class = "upload" id="' + compareName + 'Upload_' + nextIndex + '">' + uploadDisplayName + '<input type="file" name="' + compareName + 'File_' + nextIndex + '" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>' +
        '</td>' +
        '<td class="file-view">' +
        '<a id="' + compareName + 'View_' + nextIndex + '"></a>' +
        '</td>' +
        '</tr>' +
        '<tr id="' + compareName + '_view_' + nextIndex + '" style="display:none">' +
        '<td class="clickView" colspan="4" style="display:none" id="' + compareName + 'ViewTag_' + nextIndex + '">' +
        '<div class="dowitemContent" style="display:block">' +
        '<div class="imgBox">' +
        '<iframe id="' + compareName + 'ViewImg_' + nextIndex + '" src="" style="width:100%; height: 100%;"></iframe>' +
        '</div>' +
        '</div>' +
        '</td>' +
        '</tr>');

    if (tr != null) {
        newTr.insertAfter(trView);
    } else if (tr == null) {
        $('#uploadObj').append(newTr);
    }

    uploadEvent(newTr.find('input[type="file"]'));

    //綁預覽事件
    newTr.find('.file-view a').off('click').on('click', function() {
        previewClickHandler($(this));
    });

    return newTr;
}

function apply4_2(content) {
    var citySelect = $('[name="cityId"]');
    var zipSelect = $('[name="zipCode"]');
    var submitBranch = $('#submitBranch');
    var jsonBranch;
    var regionArea = $('.regionArea');
    var jsonCity = modal.getCity('Y');
    console.debug(jsonCity);
    cityArr = jsonCity.cities;
    var cityArray = [];
    var placeBranch = $('.regionPlace');
    var hideTag = 'cal';
    var regionTextArea = $('#cityRegionText');
    var selectors = $('.baelArea');
    var appointment = $('#appointment');
    var branchsInfo = $('#branchsInfo');
    var branchDate = $('#branchDate');
    var calendarArea = $('.calendarArea');
    var dateAppo;
    var mapId = 'branchMap';

    var cityPicked = content.area.cityId;
    var zipPicked = content.area.zipCode;
    var branchIndex = content.btnId;
    var datePicked = content.date;
    var timePicked = content.time;

    var getDefaultAddress = modal.getDefaultAddress();
    console.debug(getDefaultAddress);
    addressMap(mapId, [getDefaultAddress.branchName], [getDefaultAddress.addr], [getDefaultAddress.tel]);

    $('.selectpicker').selectpicker();

    //addressMap('台北市中山北路二段50號3樓');
    appointment.hide();
    branchsInfo.hide();
    branchDate.hide();
    calendarArea.hide();

    cityArray.push('<option value="">請選擇</option>')
    $.each(cityArr, function(i, cityData) {
        cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });

    citySelect.empty();
    citySelect.append(cityArray.join(''));
    citySelect.selectpicker('refresh');

    //地址連動(zip)
    linkage.changeBranchZipByCity(citySelect, cityArr, zipSelect, 'Y');

    regionTextArea.off().on('click', function(ev) {
        ev.preventDefault();
        regionArea.hide();
        selectors.show();
        $('.branchMap').show();
        addressMap(mapId, [getDefaultAddress.branchName], [getDefaultAddress.addr], [getDefaultAddress.tel]);
        calendarArea.hide();
    });

    var hasBookingObj = {};
    //$('#calendar').fullCalendar( 'refetchEvents' );

    submitBranch.off().on('click', function() { //按下'確認'鍵後的動作
        var cityId = $('[name="cityId"]').val();
        var zipCodeName = $('[name="zipCode"]').val();
        var dateSelected = $('[name="dateSelected"]');
        var idSelected = $('[name="idSelected"]');
        var timeSelected = $('[name="timeSelected"]');
        var people = $('[name="people"]');

        var citySelectpicked = $('#citySelectpicker button').attr('title');
        var zipSelectpicked = $('#zipSelectpicker button').attr('title');
        var cityRegionIcon = $('#cityRegionIcon');
        var zipRegionIcon = $('#zipRegionIcon');

        jsonBranch = modal.getBranch(zipCodeName);
        console.debug(jsonBranch);
        var branchArr = jsonBranch.branches;
        var branchArray = [];
        var regionText = citySelectpicked + ',' + zipSelectpicked; //放所在地區的字串

        if (zipCodeName !== '') { //若有正確選擇所在地區後的動作
            selectors.hide();
            regionArea.show();
            $.each(branchArr, function(i, branchData) { //長分行資訊
                branchArray.push('<li class="branchLi"> <div class="regionText"><a class="information"><h4 class="branchName">' + branchData.branchName + '</h4><p class="branchAddr">' + branchData.addr + '</p><p class="branchTel">Tel ' + branchData.tel + '</p><p class="branchId" name="' + branchData.branchId + '" style="display:none"></p></div><div class="regionPlaceBtn"><a class="reservation" id="btn' + i + '">我要預約</a><a class="position">分行位置</a></a></div></li>');
            });

            if (branchArray.length == 0) {
                console.debug(regionText);
                //addressMap(regionText);
            } else {
                var branchNameArray = [];
                var branchAddrArray = [];
                var branchTelArray = [];
                $.each(branchArr, function(i, branchData) { //長分行資訊
                    branchNameArray.push(branchData.branchName);
                    branchAddrArray.push(branchData.addr);
                    branchTelArray.push(branchData.tel);
                });

                if (branchArray.length > 1) {
                    addressMap(mapId, branchNameArray, branchAddrArray, branchTelArray, 14);
                } else {
                    addressMap(mapId, branchNameArray, branchAddrArray, branchTelArray);
                }

            }

            placeBranch.empty();
            placeBranch.append(branchArray.join(''));
            branchArray = [];


            var branchId;
            var reservation = $('.reservation');
            var region = $('.regionText');
            var firstAddress = $('.branchAddr:first').text(); //google map
            var reseration = $('.reseration');
            var position = $('.position');

            regionTextArea.val(regionText);
            cityRegionIcon.text(citySelectpicked);
            zipRegionIcon.text(zipSelectpicked);

            if (firstAddress == '') {
                //addressMap(regionText);
            } else {
                //addressMap(firstAddress);

                //點選「我要預約」
                //將已被預約的天數存成物件             
                reservation.on('click', function() {
                    var $this = $(this);
                    var thisBtn = $this.parent();
                    var thisText = thisBtn.parent().find('.regionText');
                    var thisName = thisText.find('.branchName').text(); //分行名稱
                    var thisAddr = thisText.find('.branchAddr').text(); //分行地址
                    var thisTel = thisText.find('.branchTel').text(); //分行電話
                    var thisBranch = thisText.find('.branchId').attr('name'); //分行ID
                    var pin = $('.branchName');
                    var thisPin = thisBtn.parent().find('.branchName');
                    var btnId = $('[name="btnId"]');
                    var siblings = thisBtn.siblings();

                    branchId = thisText.find('.branchId').attr('name'); //分行代碼
                    console.debug('branchId:' + branchId);
                    $('[name="idSelected"]').val(branchId);
                    //改分行資訊的底色
                    $('.regionText').removeClass('active');
                    thisText.addClass('active');

                    //移除日曆上的藍色樣式
                    $('.fc-day-number').removeClass('active');
                    $('.fc-day').removeClass('active');

                    //換左手邊的大頭針顏色
                    pin.removeClass('active');
                    thisPin.addClass('active');

                    //換左手邊的底色
                    reservation.removeClass('active');
                    $this.addClass('active');

                    //紀錄點選的分行在hidden中
                    var thisId = $this.attr('id');
                    var thisIndex = thisId.substr(-1, 1);
                    btnId.val(thisIndex);

                    //將地圖關閉
                    $('.branchMap').hide();

                    //顯示行事曆區塊
                    calendarArea.show();

                    //關閉每日可選擇的時間區塊
                    appointment.hide();

                    var month = new Date().getMonth() + 1;
                    var name = $('#bName');
                    var addr = $('#bAddr');
                    var tel = $('#bTel');
                    var dDate = $('#bDate');
                    var dTime = $('#bTime');

                    dDate.text('');
                    dTime.text('');
                    //timeSelected.val('0');
                    dateSelected.val('0');
                    //idSelected.val('0');
                    name.text(thisName);
                    addr.text(thisAddr);
                    tel.text(thisTel);
                    branchsInfo.show();
                    branchDate.show();

                    var calendarArr = [];
                    var calDate;
                    var calFull;

                    //抓這個分行的id
                    branchId = idSelected.val();
                    console.debug('branchId:' + branchId);

                    jsonBranch = modal.getFullString(month, branchId);
                    //jsonBranch = modal.getFullString(dateAppo, branchId); //傳日期及分行資訊去撈上可預約人物
                    console.debug(jsonBranch);

                    var noBusiness = jsonBranch.noBusiness;
                    var maxPeople = jsonBranch.maxPeople; //每個時段最多的人數
                    var booking = jsonBranch.booking; //已被預約
                    people.val(maxPeople);
                    hasBookingObj = [];
                    console.debug(booking);
                    $.each(booking, function(index, bookingObj) {
                        var date = bookingObj.date; //已被預約日期					
                        //                        var isFull = bookingObj.isFull;//是否已滿
                        //                        var times = bookingObj.times;//預約時段
                        //
                        //                        $.each(times,function(timeIndex,timeObj){
                        //                            var timeTotal = timeObj.total;//該時段可預約總人數
                        //                            var timeCount = timeObj.count;//已被預約人數
                        //                            var timeStr = timeObj.time;//時段
                        //                            var timeIsFull = timeObj.isFull;//該時段是否已滿
                        //                        });

                        //依照日來放物件
                        hasBookingObj[date] = bookingObj;

                    });

                    //2016-07-16 added by titan，修改判斷分行已滿寫法
                    var valueTimeArray = ['0900', '1000', '1100', '0100', '0200', '0300'];
                    var totalTimeCount = valueTimeArray.length; //總時段，以後會改成吃json的count					

                    $.each(jsonBranch.booking, function(index, obj) {
                        var date = obj.date;
                        var timeArray = obj.times;
                        var dateFullCount = 0;

                        $.each(timeArray, function(j, timeObj) {
                            var isFull = timeObj.isFull;

                            if (isFull == 'Y') {
                                dateFullCount++;
                            }
                        });

                        var title = '';
                        //如果底下時段已滿，就秀已滿
                        if (dateFullCount == totalTimeCount) {
                            title = '已滿';
                        }

                        //因為如果有放入title，在點擊時不會進入元件的dayClick，所以不是已滿的話就不要放title
                        if (title != '') {
                            calendarArr.push({
                                "title": title,
                                "start": date
                            });
                        } else {
                            calendarArr.push({
                                "start": date
                            });
                        }

                    });

                    var defaultTime;
                    if (datePicked != '') {
                        defaultTime = new Date(datePicked);
                    } else {
                        defaultTime = new Date();
                    }

                    //紀錄active的date
                    var activeDate;

                    $('#calendar').fullCalendar('removeEvents');
                    $('#calendar').fullCalendar('addEventSource', calendarArr);
                    $('#calendar').fullCalendar('rerenderEvents');
                    console.debug(calendarArr);

                    //長日曆					
                    $('#calendar').fullCalendar({
                        header: {},
                        //height: 400,
                        defaultDate: defaultTime,
                        select: function(startDate, endDate) {
                            if (liveDate > startDate) {
                                alert('Selected date has been passed');
                                return false;
                            } else {
                                //do your wish
                            }
                            calendar.fullCalendar('unselect');
                        },
                        titleFormat: {
                            month: 'YYYY年 MMMM'
                        },
                        dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        editable: false,
                        eventLimit: true, // allow "more" link when too many events
                        events: calendarArr,
                        dayRender: function(date, cell) {

                            console.debug(date);
                            console.debug(cell);

                            var data_date = cell.attr('data-date');

                            var compressDate = new Date(data_date);

                            //TODO for online open 9/30
                            //var date = new Date('2016-09-30 23:59:59');
                            var date = new Date(2016, 8, 30, 23, 59, 59);


                            if (compressDate - date > 0) {
                                $('td [data-date="' + data_date + '"]').addClass('fc-holiday');
                            }


                            if (activeDate != undefined && activeDate == data_date) {
                                $('td [data-date="' + data_date + '"]').addClass('active');
                            }
                        },
                        //這是點了標題的事件
                        eventClick: function(event, jsEvent, view) {

                            console.debug(event);
                            console.debug(jsEvent);
                            console.debug(view);

                            var start = event.start;
                            var date = new Date(start);

                            var year = date.getFullYear();
                            var month = date.getMonth();
                            var date = date.getDate();

                            month = month + 1;

                            if (month < 10) {
                                month = '0' + month;
                            }

                            var targetDate = year + '-' + (month) + '-' + date;
                            console.debug(targetDate);

                            var target = $('td.fc-day-number[data-date="' + targetDate + '"]');
                            var down = new $.Event("mousedown");
                            var up = new $.Event("mouseup");
                            down.which = up.which = 1;
                            down.pageX = up.pageX = target.offset().left;
                            down.pageY = up.pageY = target.offset().top;
                            target.trigger(down);
                            target.trigger(up);
                        },
                        //這是切換月份的事件
                        viewRender: function(view, element) {
                            console.debug('switch view');
                            console.debug(view);
                            console.debug(element);

                            $.each(noBusiness, function(i, noBusinessDay) {
                                console.debug('noBusinessDay = ' + noBusinessDay);
                                var td = element.find('[data-date="' + noBusinessDay + '"]');
                                console.debug(td.length);
                                //td.addClass('fc-sat');
                                td.addClass('fc-holiday');
                            });

                            //切換月份時，要把下面時段資訊先拿掉，還有對保時間也拿掉
                            appointment.hide();
                            //$('#bDate').text('');
                            //$('#bTime').text('');
							
							if($('[name="dateTemp"]').val() !== ''){					
								$('td [data-date="' + $('[name="dateTemp"]').val() + '"]').addClass('active'); 

								var aDate = new Date();
								var nowYear = aDate.getFullYear();
								var nowMonth = aDate.getMonth();
								var nowDay = aDate.getDate();
								
								var formatDate = $('[name="dateTemp"]').val();
								var formatDay = new Date(formatDate);
								var pickedYear = formatDay.getFullYear();
								var pickedMonth = formatDay.getMonth();
								var pickedDay = formatDay.getDate();
								
								var todayValue = false;
								if(nowYear == pickedYear && nowMonth == pickedMonth && nowDay == pickedDay){
									todayValue = true;
								}
								
								var bookingObj = hasBookingObj[formatDate];
								//var todayEle = $('td[data-date="'+ $('[name="dateTemp"]').val() +'"]');
								//var todayValue = todayEle.hasClass('fc-holiday');
								showPeople(valueTimeArray, bookingObj, todayValue, aDate);
								appointment.show();								
							}
                        },
                        //這是當點了不是標題的事件
                        dayClick: function(date, jsEvent, view) {
                            var myDate = new Date();

                            //判斷是否星期六或日
                            var isToday = $(this).hasClass('fc-today');
                            //var isHoliday = ($(this).hasClass('fc-sun') || $(this).hasClass('fc-sat'));
                            var isHoliday = $(this).hasClass('fc-holiday');

                            if (isHoliday) return false;

                            var data_date = $(this).attr('data-date');
                            var data_date_full = data_date + ' 23:59:59';

                            var chooseDate = new Date(data_date_full.replace(' ', 'T'));

                            //2016-07-08 added by titan
                            console.debug(myDate);
                            console.debug(chooseDate);
                            if (chooseDate >= myDate) {

                                $('#bTime').text('');

                                //將選取的日期加上藍色樣式
                                $('.fc-day').removeClass('active');
                                $('.fc-day-number').removeClass('active');
                                $('td [data-date="' + data_date + '"]').addClass('active');

                                activeDate = data_date;

                                //TRUE Clicked date smaller than today
							
                                dateAppo = date.format();

                                //取得當日預約物件
                                var bookingObj = hasBookingObj[dateAppo];
                                var number1 = $('#number1');
                                var number2 = $('#number2');
                                var number3 = $('#number3');
                                var number4 = $('#number4');
                                var surplusArr = [];

                                var clickMonth = parseInt(dateAppo.substr(5, 2));
                                console.debug(clickMonth);

                                //idSelected.val(branchId);

                                showPeople(valueTimeArray, bookingObj, isToday, myDate);


                                var dateAppoY = dateAppo.substr(0, 4);
                                var dateAppoM = dateAppo.substr(5, 2);
                                var dateAppoD = dateAppo.substr(8, 2);
                                var dateAppoTotal = dateAppoY + '/' + dateAppoM + '/' + dateAppoD;

                                dateSelected.val(dateAppo);
                                $('[name="dateTemp"]').val(dateAppo);
                                dDate.text(dateAppoTotal);

                                appointment.show();
                            } else {
                                //FLASE Clicked date larger than today + daysToadd
                                //alert('此日期不能選取');
                            }

                        }
                    });

                    //default active today
                    //$('.fc-week .fc-bg .fc-today').addClass('active');
                    //$('.fc-week .fc-content-skeleton .fc-today').addClass('active');

                    //小版時要把js的height拿掉
                    if ($(window).width() < 768) {
                        $('.fc-day-grid-container.fc-scroller').css('height', '100%');
                    }

                    $('#appointment').find('input').on('click', function() { //點選預約日期,右下方會產生日期和時間的資訊
                        var radioIndex = $(this).attr('id').substr(-1, 1);
                        var timeHour = $('#timeLabel' + radioIndex).text().substr(2, 2);
                        var timeMin = $('#timeLabel' + radioIndex).text().substr(5, 2);
                        var timeAppo = $('#timeLabel' + radioIndex).text().substr(0, 13);
                        var timeInfo = timeHour + timeMin;

                        //                        var dateAppoY = dateAppo.substr(0, 4);
                        //                        var dateAppoM = dateAppo.substr(5, 2);
                        //                        var dateAppoD = dateAppo.substr(8, 2);
                        //                        var dateAppoTotal = dateAppoY + '/' + dateAppoM + '/' + dateAppoD;
                        //
                        //                        dDate.text(dateAppoTotal);
                        dTime.text(timeAppo);
                        timeSelected.val(timeInfo);

                    });



                    var reservateBranch = content.idSelected;
                    if (reservateBranch == thisBranch) {
                        //日期
                        if (datePicked != '') {
                            var isTodayTrueOrFalse = $('td [data-date="' + datePicked + '"]').hasClass('fc-today');
                            var bookingObject = hasBookingObj[datePicked];

							 if ($('[name="dateTemp"]').val() == '') {
                                $('[name="dateTemp"]').val(datePicked);
                            }
							var datePick = $('[name="dateTemp"]').val();
							
                            console.debug(bookingObject);
                            var dDateTemp = $('#bDate');
                            var pickYY, pickMM, pickDD;
							var temp = $('[name="dateTemp"]').val();
                            if (temp.length == 10) {
                                pickYY = temp.substr(0, 4);
                                pickMM = temp.substr(5, 2);
                                pickDD = temp.substr(8, 2);
                            }
                            $('[name="dateSelected"]').val(pickYY + '/' + pickMM + '/' + pickDD);
                            dDateTemp.text(pickYY + '/' + pickMM + '/' + pickDD);
							
                            $('td [data-date="' + datePick + '"]').addClass('active');
                            
							var myDay = new Date();
                            showPeople(valueTimeArray, bookingObject, isTodayTrueOrFalse, myDay);
                            appointment.show();
                        }

                        //時間

                        if (timePicked != '') {
                            var fullTimeText = '';
                            var dTimeTemp = $('#bTime');
                            if ($('[name="timeSelected"]').val() == '') {
                                $('[name="timeSelected"]').val(timePicked);
                            }
                            if (timePicked == '0100') {
                                fullTimeText = 'PM 01:00-02:00';
                                dTimeTemp.text(fullTimeText);
                            } else if (timePicked == '0200') {
                                fullTimeText = 'PM 02:00-03:00';
                                dTimeTemp.text(fullTimeText);
                            } else if (timePicked == '0300') {
                                fullTimeText = 'PM 03:00-04:00';
                                dTimeTemp.text(fullTimeText);
                            } else {
                                var tempStart = parseInt(timePicked);
                                var tempEnd = tempStart + 100;
                                tempEnd = '' + tempEnd;
                                tempStart = '' + tempStart;
                                if (tempStart.length <= 3) {
                                    tempStart = '0' + tempStart;
                                }
                                tempStart = tempStart.substr(0, 2) + ':' + tempStart.substr(2, 2);
                                tempEnd = tempEnd.substr(0, 2) + ':' + tempEnd.substr(2, 2);
                                dTimeTemp.text('AM' + tempStart + '-' + tempEnd);
                            }
                            var timeSelect = $('[name="timeSelected"]').val();
                            switch (timeSelect) {
                                case '0900':
                                    $('#time1').trigger('click');
                                    $('[name="timeSelected"]').val('0900');
                                    break;
                                case '1000':
                                    $('#time2').trigger('click');
                                    $('[name="timeSelected"]').val('1000');
                                    break;
                                case '1100':
                                    $('#time3').trigger('click');
                                    $('[name="timeSelected"]').val('1100');
                                    break;
                                case '0100':
                                    $('#time4').trigger('click');
                                    $('[name="timeSelected"]').val('0100');
                                    break;
                                case '0200':
                                    $('#time5').trigger('click');
                                    $('[name="timeSelected"]').val('0200');
                                    break;
                                case '0300':
                                    $('#time6').trigger('click');
                                    $('[name="timeSelected"]').val('0300');
                                    break;
                            }
                        }



                    }


                });


                //google map
                position.on('click', function() {
                    var current = $(this).parent();
                    var currentLi = current.parent();
                    var currentName = currentLi.find('h4').text();
                    var currentAddr = currentLi.find('p:first').text();
                    var currentTel = currentLi.find('p.branchTel').text();


                    $('.branchMap').show();
                    calendarArea.hide();
                    //addressMap(currentAddr);


                    var branchNameArray = [];
                    var branchAddrArray = [];
                    var branchTelArray = [];

                    branchNameArray.push(currentName);
                    branchAddrArray.push(currentAddr);
                    branchTelArray.push(currentTel);

                    addressMap(mapId, branchNameArray, branchAddrArray, branchTelArray);

                });
            }

        } else {
            //alert('請選擇所在地區');
        }
    });

    //帶預設值
    //選擇縣市
    if (cityPicked != '') {
        citySelect.val(cityPicked);
        citySelect.trigger('change');
    }
    //選擇區域
    if (zipPicked != '') {
        zipSelect.val(zipPicked);
        zipSelect.trigger('change');
    }
    submitBranch.trigger('click');

    //選取分行
    if (branchIndex != '') {
        $('.branchLi .reservation').eq(branchIndex).trigger('click');
    }

    var bIndex = $('#btn' + branchIndex);
    var information = bIndex.parent().siblings();
    var infoName = information.find('.branchName').text();
    var infoAddr = information.find('.branchAddr').text();
    var infoTel = information.find('.branchTel').text();
    var infoId = information.find('.branchId').attr('name');

    var nameTemp = $('#bName');
    var addrTemp = $('#bAddr');
    var telTemp = $('#bTel');

    nameTemp.text(infoName);
    addrTemp.text(infoAddr);
    telTemp.text(infoTel);
    $('[name="idSelected"]').val(infoId);


}

function showPeople(valueTimeArray, bookingObj, isToday, myDate) {
    //長底下的時段
    console.debug(valueTimeArray);
    console.debug(bookingObj);
    console.debug(isToday);
    console.debug(myDate);
    $.each(valueTimeArray, function(i, value) {

        var timeMaxPeople = $('[name="people"]').val(); //先預設帶入這間分行每個時段的預設人數
        var timeCount = $('[name="people"]').val(); //該時段尚可預約人數
        var timeTotal = $('[name="people"]').val(); //該時段可預約總人數
        var timeIsFull = 'N';
        var appoRadio = $('#time' + (i + 1));
        var appoLabel = $('#timeLabel' + (i + 1));
        var appoP = $('#number' + (i + 1));

        //還原初始值
        appoRadio.removeAttr('checked');
        appoRadio.removeAttr('disabled');
        appoLabel.css("color", "white");
        appoP.css("color", "white");


        //如果當日當時段已有預約資料，就覆蓋預設值
        if (bookingObj != undefined) {
            console.debug(bookingObj);
            var times = bookingObj.times; //預約時段
            console.debug(times);
            $.each(times, function(timeIndex, timeObj) {
                timeTotal = timeObj.total; //該時段可預約總人數
                var timeCount2 = timeObj.count; //已被預約人數
                console.debug(timeObj);
                var timeStr = timeObj.time; //時段
                var timeIsFull2 = timeObj.isFull; //該時段是否已滿

                if (value == timeStr) {
                    timeCount = timeTotal - timeCount2;
                    timeIsFull = timeIsFull2;
                }
                //放入該時段目前還可預約人數
                $('#number' + (i + 1)).text(timeCount);

            });
        } else {
            //否則時段為最大預約人數
            var max = $('[name="people"]').val();
            $('#number' + (i + 1)).text(max);
            console.debug('max:' + max);

        }

		
		
        //if over time set full
        if (isToday) {
            var nowHour = myDate.getHours();

            var compareStr = value.substring(0, 2);
            if (parseInt(compareStr) < 9) {
                compareStr = parseInt(compareStr) + 12;
            }

            console.debug(nowHour);
            console.debug(compareStr);
            if (nowHour >= compareStr) {
                timeIsFull = 'Y';
            }
        }
		
		

        if (timeIsFull == 'Y') {

            appoRadio.attr("disabled", true);
            appoLabel.css("color", "#9D9D9D");
            appoP.css("color", "#9D9D9D");
        }

    });
}

function apply5_1_1(content) {
    console.debug(content);
    var status1 = $('#status1');
    var status2 = $('#status2');
    var applicantDiv = $('#applicant');
    var studentDiv = $('#student');
    var myPhone = $('#myPhone');
    var student_loansPrice = $('.student_sum');
    var student_credit = $('.student_credit');
    var student_FPA = $('.student_FPA');
    var student_practice = $('.student_practice');
    var student_music = $('.student_music');
    var student_book = $('.student_book');
    var student_live = $('.student_live');
    var student_life = $('.student_life');
    var student_abroad = $('.student_abroad');
    var student_publicExpense = $('.student_publicExpense');
    var applicant_address_domi = $('[name="applicant_address_domi"]');
    var applicant_address = $('[name="applicant_address"]');
    var addrTempDomi = '';
    var addrTempTel = '';
    var student_EducationStage = $('[name="student_EducationStage"]');
    var student_name = $('[name="student_name"]');
    var student_department = $('[name="student_department"]');
    var student_onTheJob = $('[name="student_onTheJob"]');
    var student_class = $('[name="student_class"]');
    var student_id = $('[name="student_id"]');
    var student_month_enter = $('[name="student_month_enter"]');
    var student_month_graduation = $('[name="student_month_graduation"]');
    var tipTel = $('.tip_tel');
    var thirdPartyTitleText = $('.thirdParty');

    var isGuarantorString_father = $('#isGuarantor_father');
    var isGuarantorString_mother = $('#isGuarantor_mother');
    var isGuarantorString_thirdParty = $('#isGuarantor_thirdParty');
    var isGuarantorString_spouse = $('#isGuarantor_spouse');

    var isPositive_hidden = $('[name="isPositive_hidden"]');
    var isNegative_hidden = $('[name="isNegative_hidden"]');
    var register_hidden = $('[name="register_hidden"]');
    var lowIncome_hidden = $('[name="lowIncome_hidden"]');

    var idCardPositionViewName_hidden = $('[name="idPositiveViewName_hidden"]');
    var idCardNegativeViewName_hidden = $('[name="idNegativeViewName_hidden"]');
    var registrationViewName_hidden = $('[name="registerViewName_hidden"]');
    var lowIncomeViewName_hidden = $('[name="lowIncomeViewName_hidden"]');

    var idCardPositionViewName = content.idPositiveViewName_hidden;
    var idCardNegativeViewName = content.idNegativeViewName_hidden;
    var registrationViewName = content.registerViewName_hidden;
    var lowIncomeViewName = content.lowIncomeViewName_hidden;

    var isPositiveSize = content.isPositive_hidden;
    var isNegativeSize = content.isNegative_hidden;
    var registerSize = content.register_hidden;
    var lowIncomeSize = content.lowIncome_hidden;

    idCardPositionViewName_hidden.val(idCardPositionViewName);
    idCardNegativeViewName_hidden.val(idCardNegativeViewName);
    registrationViewName_hidden.val(registrationViewName);
    lowIncomeViewName_hidden.val(lowIncomeViewName);

    isPositive_hidden.val(isPositiveSize);
    isNegative_hidden.val(isNegativeSize);
    register_hidden.val(registerSize);
    lowIncome_hidden.val(lowIncomeSize);

    fatherDiv = $('#father');
    motherDiv = $('#mother');
    thirdPartyDiv = $('#thirdParty');
    spouseDiv = $('#spouse');

    var familyStatusLevel1Text = content.familyStatusLevel1Text;
    var familyStatusLevel2Text = content.familyStatusLevel2Text;
    var loans = content.loans;
    var showInfo = content.showInfo;
    var isGuarantor = content.isGuarantor;
    var domiCity = content.domicileAddress.cityId;
    var domiZipCode = content.domicileAddress.zipCode;
    var domiLiner = content.domicileAddress.liner;
    var domiNeighborhood = content.domicileAddress.neighborhood;
    var domiAddress = content.domicileAddress.address;
    var telCity = content.teleAddress.cityId;
    var telZipCode = content.teleAddress.zipCode;
    var telLiner = content.teleAddress.liner;
    var telNeighborhood = content.teleAddress.neighborhood;
    var telAddress = content.teleAddress.address;
    var addr = content.addr;
    var tel = content.tel;
    var dateSelected = content.dateSelected;
    var timeSelected = content.timeSelected;
    var educationStage = content.EducationStage;
    var schoolName_isDay = content.school.isDay;
    var schoolName_isNational = content.school.isNational;
    var schoolName_name = content.school.name;
    var department = content.department;
    var OnTheJob = content.OnTheJob;
    var classId = content.gradeClass.class;
    var gradeId = content.gradeClass.grade;
    var studentId = content.student_id;
    var enterMonth = content.enterDate.month;
    var enterYear = content.enterDate.year;
    var graduationMonth = content.graduationDate.month;
    var graduationYear = content.graduationDate.year;
    var applicant_mobile = content.mobile;
    var thirdPartyText = content.thirdPartyTitle;

    var isGuarantor_father = content.father_String;
    var isGuarantor_mother = content.mother_String;
    var isGuarantor_thirdParty = content.thirdParty_String;
    var isGuarantor_spouse = content.spouse_String;

    //家庭狀況
    if (familyStatusLevel2Text == '') {
        status1.text(familyStatusLevel1Text);
    } else {
        status1.text(familyStatusLevel1Text + '，' + familyStatusLevel2Text);
    }

    //申請人資料
    setInfoText(content, applicantDiv);
    //addrTempDomi = domiCity+domiZipCode+domiLinerName+domiLiner+domiNeighborhood+'鄰'+domiAddress;
    domiNeighborhood = (domiNeighborhood == '') ? '' : domiNeighborhood + '鄰'
    addrTempDomi = domiCity + domiZipCode + domiLiner + domiNeighborhood + domiAddress;
    applicant_address_domi.text(addrTempDomi);
    //addrTempTel = telCity+telZipCode+telLinerName+telLiner+telNeighborhood+'鄰'+telAddress;
    if (telAddress.indexOf('鄰') == 0) {
        telAddress = telAddress.split('鄰')[1];
    }
    addrTempTel = telCity + telZipCode + telAddress;
    applicant_address.text(addrTempTel);
    tipTel.text(applicant_mobile);

    var dayBirthday = content.birthday.substr(5, 2);
    var monthBirthday = content.birthday.substr(3, 2);
    var yearBirthday = content.birthday.substr(0, 3);

    if (yearBirthday.length == 2) {
        yearBirthday = '0' + yearBirthday;
    }
    if (monthBirthday.length == 1) {
        monthBirthday = '0' + monthBirthday;
    }
    if (dayBirthday.length == 1) {
        dayBirthday = '0' + dayBirthday;
    }

    var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
    $('[name="applicant_birthday"]').text(birthdayStr);

    //塞學校的相關資訊
    educationStage = toEduStageName(educationStage);

    if (schoolName_isDay == '1') {
        schoolName_isDay = '日間';
    } else if (schoolName_isDay == '2') {
        schoolName_isDay = '夜間';
    }
    if (schoolName_isNational == '1') {
        schoolName_isNational = '公立';
    } else if (schoolName_isNational == '2') {
        schoolName_isNational = '私立';
    }
    var classString = (classId == "") ? "級" : classId + '班';
    var gradeAndClassInfo = gradeId + '年' + classString;
    var schoolFullInfo = schoolName_isNational + ' ' + schoolName_name + ' ' + schoolName_isDay + '部';
    var enterTime = "民國" + enterYear + '年' + enterMonth + '月';
    var leaveTime = "民國" + graduationYear + '年' + graduationMonth + '月';
    var schoolElementArr = [student_EducationStage, student_name, student_department, student_class, student_id, student_month_enter, student_month_graduation];
    var schoolStringArr = [educationStage, schoolFullInfo, department, gradeAndClassInfo, studentId, enterTime, leaveTime];
    student_onTheJob.text((OnTheJob == 'N') ? "否" : "是");
    setSchoolInformation(schoolElementArr, schoolStringArr);

    //保證人資料
    for (var i = 0; i <= 3; i++) {
        var showInfoD = showInfo.substr(i, 1);
        fatherDiv = $('#father');
        motherDiv = $('#mother');
        thirdPartyDiv = $('#thirdParty');
        spouseDiv = $('#spouse');
        switch (i) {
            case 0:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('father', 'Y', function(fatherInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(fatherInfo, fatherDiv);
                        var dayBirthday = fatherInfo.birthday.substr(5, 2);
                        var monthBirthday = fatherInfo.birthday.substr(3, 2);
                        var yearBirthday = fatherInfo.birthday.substr(0, 3);

                        if (yearBirthday.length == 2) {
                            yearBirthday = '0' + yearBirthday;
                        }
                        if (monthBirthday.length == 1) {
                            monthBirthday = '0' + monthBirthday;
                        }
                        if (dayBirthday.length == 1) {
                            dayBirthday = '0' + dayBirthday;
                        }

                        var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
                        $('[name="father_birthday"]').text(birthdayStr);
                    }, 'Y');
                } else {
                    $('#father').hide();
                }
                break;
            case 1:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('mother', 'Y', function(motherInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(motherInfo, motherDiv);
                        var dayBirthday = motherInfo.birthday.substr(5, 2);
                        var monthBirthday = motherInfo.birthday.substr(3, 2);
                        var yearBirthday = motherInfo.birthday.substr(0, 3);

                        if (yearBirthday.length == 2) {
                            yearBirthday = '0' + yearBirthday;
                        }
                        if (monthBirthday.length == 1) {
                            monthBirthday = '0' + monthBirthday;
                        }
                        if (dayBirthday.length == 1) {
                            dayBirthday = '0' + dayBirthday;
                        }

                        var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
                        $('[name="mother_birthday"]').text(birthdayStr);
                    }, 'Y');
                } else {
                    $('#mother').hide();
                }
                break;
            case 2:
                if (showInfoD == '1') {
                    var tempTitle = thirdPartyTitleText.text().split('(')[1];
                    var newTitle = thirdPartyText;
                    var tempArr = ['<span id="isGuarantor_thirdParty"></span>'];
                    thirdPartyTitleText.text(newTitle);
                    thirdPartyTitleText.append(tempArr.join(''));
                    modal.getFamilyInfo('thirdParty', 'Y', function(thirdPartyInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(thirdPartyInfo, thirdPartyDiv);
                        console.debug(thirdPartyInfo);
                        var dayBirthday = thirdPartyInfo.birthday.substr(5, 2);
                        var monthBirthday = thirdPartyInfo.birthday.substr(3, 2);
                        var yearBirthday = thirdPartyInfo.birthday.substr(0, 3);

                        if (yearBirthday.length == 2) {
                            yearBirthday = '0' + yearBirthday;
                        }
                        if (monthBirthday.length == 1) {
                            monthBirthday = '0' + monthBirthday;
                        }
                        if (dayBirthday.length == 1) {
                            dayBirthday = '0' + dayBirthday;
                        }

                        var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
                        $('[name="thirdParty_birthday"]').text(birthdayStr);
                    }, 'Y');
                } else {
                    $('#thirdParty').hide();
                }
                break;
            case 3:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('spouse', 'Y', function(spouseInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(spouseInfo, spouseDiv);
                        var dayBirthday = spouseInfo.birthday.substr(5, 2);
                        var monthBirthday = spouseInfo.birthday.substr(3, 2);
                        var yearBirthday = spouseInfo.birthday.substr(0, 3);

                        if (yearBirthday.length == 2) {
                            yearBirthday = '0' + yearBirthday;
                        }
                        if (monthBirthday.length == 1) {
                            monthBirthday = '0' + monthBirthday;
                        }
                        if (dayBirthday.length == 1) {
                            dayBirthday = '0' + dayBirthday;
                        }

                        var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
                        $('[name="spouse_birthday"]').text(birthdayStr);
                    }, 'Y');
                } else {
                    $('#spouse').hide();
                }
                break;
        }
    }
    var isGuarantorString_thirdParty = $('#isGuarantor_thirdParty');
    var elenemtArr = [isGuarantorString_father, isGuarantorString_mother, isGuarantorString_thirdParty, isGuarantorString_spouse];
    var stringArr = [isGuarantor_father, isGuarantor_mother, isGuarantor_thirdParty, isGuarantor_spouse];

    var updateString = '';

    $.each(stringArr, function(i, v) {
        console.debug(v);
        if (v.indexOf('(') == -1) {
            v = '(為' + v.substr(2, 5) + ')';
        }
        var currentEle = elenemtArr[i];
        currentEle.text(v);
    });

    //塞第三人的"與申請人之關係"的字串
    var relation = content.relationshipTitle;
    var rTitle = determineRelationship(relation);
    $('[name="thirdParty_relation"]').text(rTitle);

    /*申貸金額 (start)*/
    if (loans == '1') {
        var loansPrice = content.accordingToBill_sum;
        var abroad = content.accordingToBill.abroad;
        var book = content.accordingToBill.book;
        var loansSum = content.accordingToBill.loansSum;
        var life = content.accordingToBill.life;
        var live = content.accordingToBill.live;
        var publicExpense = content.accordingToBill.publicExpense;
        //存放金額
        var priceObj = [loansPrice, loansSum, abroad, book, life, live, publicExpense];
        //存放要顯示的元素
        var elementObj = [student_loansPrice, student_credit, student_abroad, student_book, student_life, student_live, student_publicExpense];
        var changeText = $('.changeText');
        changeText.text('依註冊繳費單登載之可貸金額');
        changeText.removeClass('changeTextShort');

        if (loansPrice.length > 3 && loansPrice.length <= 6) {

            var loansPrice0 = loansPrice.substr(0, loansPrice.length - 3);
            var loansPrice1 = loansPrice.substr(loansPrice.length - 3, 3);
            loansPrice = loansPrice0 + ',' + loansPrice1;
        } else if (loansPrice.length > 6) {
            var loansPrice0 = loansPrice.substr(0, 3);
            var loansPrice1 = loansPrice.substr(1, 3);
            var loansPrice2 = loansPrice.substr(4, 3);
            loansPrice = loansPrice0 + ',' + loansPrice1 + ',' + loansPrice2;
        }

        setLoanInformation(priceObj, elementObj);
    } else if (loans == '2') {
        var loansPrice = content.freedom_sum;
        var FPA = content.freedom.FPA;
        var abroad = content.freedom.abroad;
        var credit = content.freedom.credit;
        var music = content.freedom.music;
        var book = content.freedom.book;
        var life = content.freedom.life;
        var live = content.freedom.live;
        var practice = content.freedom.practice;
        var publicExpense = content.freedom.publicExpense;
        //存放金額
        var priceObj = [abroad, book, life, live, publicExpense, FPA, credit, music, loansPrice, practice];
        //存放要顯示的元素
        var elementObj = [student_abroad, student_book, student_life, student_live, student_publicExpense, student_FPA, student_credit, student_music, student_loansPrice, student_practice];
        var changeText = $('.changeText');
        changeText.text('學雜費');
        changeText.addClass('changeTextShort');

        if (loansPrice.length > 3 && loansPrice.length <= 6) {

            var loansPrice0 = loansPrice.substr(0, loansPrice.length - 3);
            var loansPrice1 = loansPrice.substr(loansPrice.length - 3, 3);
            loansPrice = loansPrice0 + ',' + loansPrice1;
        } else if (loansPrice.length > 6) {
            var loansPrice0 = loansPrice.substr(0, 3);
            var loansPrice1 = loansPrice.substr(1, 3);
            var loansPrice2 = loansPrice.substr(4, 3);
            loansPrice = loansPrice0 + ',' + loansPrice1 + ',' + loansPrice2;
        }

        setLoanInformation(priceObj, elementObj);
    }
    /*申貸金額 (end)*/

    //動態長紀錄size和副檔名的hidden
    console.debug(content.uploadFile);
    var docItem = content.uploadFile;
    $.each(docItem, function(index, value) {
        var currentIndex = 0;

        console.debug('value = ' + value);

        $.each(value, function(i, v) {
            //塞副檔名和size到hidden中

            console.debug(i + '=' + v);

            var sizeArray = '<input type="hidden" class="fileSize_' + index + '" name="' + index + '_hidden' + currentIndex + '" value="">';
            var FilenameExtension = '<input type="hidden" class="fileNameExtension" name="' + index + 'Name_hidden' + currentIndex + '" value="">';
            $('.processInner').prepend(sizeArray);
            $('.processInner').prepend(FilenameExtension);
            var sizeHidden = $('[name="' + index + '_hidden' + currentIndex + '"]');
            var nameHidden = $('[name="' + index + 'Name_hidden' + currentIndex + '"]');
            sizeHidden.val(v.size);
            nameHidden.val(v.fileNameExtension);
            currentIndex++;
        });
    });

    var loansIndex = content.loans;
    var lifePriceOfBill = content.accordingToBill.life;
    var lifePriceOfFree = content.freedom.life;
    var lowIncomesArr = [];
    var uploadObj = $('#uploadObj');

    if (loansIndex == '1') {
        if (lifePriceOfBill > 0) {
            $('.lowIncome').show();
            uploadEvent($('#lowIncome').find('input[type="file"]'));
        }
    } else if (loansIndex == '2') {
        if (lifePriceOfFree > 0) {
            $('.lowIncome').show();
            uploadEvent($('#lowIncome').find('input[type="file"]'));
        }
    }

    uploadEvent();

    //帶入前步驟上傳的文件
    showUploadFiles(content, '5');

    //綁預覽事件
    $('.file-view a').off('click').on('click', function() {
        previewClickHandler($(this));
    });

    if (loansIndex == '1') {
        if (lifePriceOfBill == 0) {
            $('.lowIncome').hide();
        }
    } else if (loansIndex == '2') {
        if (lifePriceOfFree == 0) {
            $('.lowIncome').hide();
        }
    }
}

//帶預設值for上傳檔案
function showUploadFiles(content, step) {
    console.debug(content);

    var defaultName = '上傳檔案';
    if (step == '5') {
        defaultName = '修改檔案';
    }

    var idCardPosition = content.uploadFile.idCardPosition;
    var idCardNegative = content.uploadFile.idCardNegative;
    var registration = content.uploadFile.registration;
    var lowIncome = content.uploadFile.lowIncome;
    var uploadObj = $('#uploadObj');

    var fileItem = content.uploadFile;
    var previewURL = 'data?action=downloadApplyDocument&isPreview=Y&docId=';

    $.each(fileItem, function(item, docContent) { //跑文件項目
        console.debug('--===~~~~////////~~~~===--');
		console.debug(item);
        console.debug(docContent);
        var itemName = item;

        if (itemName == 'idCardNegative') {
            itemName = 'idNegative';
        } else if (itemName == 'idCardPosition') {
            itemName = 'idPositive';
        } else if (itemName == 'lowIncome') {
            itemName = 'lowIncome';
        } else if (itemName == 'registration') {
            itemName = 'register';
        }
		
        var docLen = docContent.length;
        //alert(itemName);
        //alert(docContent.length);
        console.debug(docContent);
        console.debug('itemName = ' + itemName);
        if (docContent == '' || docContent == undefined) {
            newFileName = '無';
        } else {
            $.each(docContent, function(index, value) { //跑文件項目裡的檔案
                var dataArr = [];
                var docId = value.docId;
                var size = value.size;
                var fileName = value.fileName;
                var fileNameExtension = value.fileNameExtension;
                var fileURL = previewURL + docId; //檔案路徑
                console.debug(fileURL);

                if (docId != undefined && docId != '') {

                    var itemNamePhoto_img;
                    var itemNameImg;
                    var itemNameUpload;
                    var itemNameFile;
                    var itemNameView;
                    var itemName_view;
                    var itemNameViewImg;
                    var fileItemName;
                    var item = showFileString(itemName);

                    if (index == 0) { //第一個代值
                        itemNamePhoto_img = $('#' + itemName + 'Photo_img_' + index + '');
                        itemNameImg = $('#' + itemName + 'Img_' + index + '');
                        itemNameUpload = $('#' + itemName + 'Upload_' + index + '');
                        //                        itemNameFile = $('[name="'+itemName+'File_'+index+'');
                        itemNameView = $('#' + itemName + 'View_' + index + '');
                        //                        itemName_view = $('#'+itemName+'_view_'+index+'');
                        itemNameViewImg = $('#' + itemName + 'ViewImg_' + index + '');
                        fileItemName = $('#' + itemName + '_' + index + ' .file-zh');

                        if (itemName == 'lowIncome' || itemName == 'register') {
                            //如果是最後一個,就再多長一個"上傳更多"的li
                            if ((docLen - 1) == index) {
                                var tr = $('#' + itemName + '_' + index);
                                var newTr = addNewFile(tr, itemName, docLen, '上傳更多');

                                itemNamePhoto_img_more = newTr.find('#' + itemName + 'Photo_img_' + docLen + '');
                                itemNameImg_more = newTr.find('#' + itemName + 'Img_' + docLen + '');
                                itemNameUpload_more = newTr.find('#' + itemName + 'Upload_' + docLen + '');
                                itemNameView_more = newTr.find('#' + itemName + 'View_' + docLen + '');
                                itemNameViewImg_more = newTr.find('#' + itemName + 'ViewImg_' + docLen + '');
                                fileItemName_more = newTr.find('#' + itemName + '_' + docLen + ' .file-zh');

                                itemNameUpload_more.get(0).firstChild.nodeValue = '上傳更多';
                                fileItemName_more.text(item);
                            }
                        }
                    } else { //第一個以後用動態長的
                        console.debug('長下一個：' + $('#' + itemName + '_' + (index - 1)).length);
                        var tr = $('#' + itemName + '_' + (index - 1));
                        console.debug(tr);
                        console.debug(tr.html());

                        var newTr = addNewFile(tr, itemName, index, '修改檔案');

                        itemNamePhoto_img = newTr.find('#' + itemName + 'Photo_img_' + index + '');
                        itemNameImg = newTr.find('#' + itemName + 'Img_' + index + '');
                        itemNameUpload = newTr.find('#' + itemName + 'Upload_' + index + '');
                        itemNameView = newTr.find('#' + itemName + 'View_' + index + '');
                        itemNameViewImg = newTr.find('#' + itemName + 'ViewImg_' + index + '');
                        fileItemName = newTr.find('#' + itemName + '_' + index + ' .file-zh');

                        //如果是最後一個,就再多長一個"上傳更多"的li
                        if ((docLen - 1) == index) {
                            var tr = $('#' + itemName + '_' + index);
                            var newTr = addNewFile(tr, itemName, docLen, '上傳更多');

                            itemNamePhoto_img_more = newTr.find('#' + itemName + 'Photo_img_' + docLen + '');
                            itemNameImg_more = newTr.find('#' + itemName + 'Img_' + docLen + '');
                            itemNameUpload_more = newTr.find('#' + itemName + 'Upload_' + docLen + '');
                            itemNameView_more = newTr.find('#' + itemName + 'View_' + docLen + '');
                            itemNameViewImg_more = newTr.find('#' + itemName + 'ViewImg_' + docLen + '');
                            fileItemName_more = newTr.find('#' + itemName + '_' + docLen + ' .file-zh');

                            itemNameUpload_more.get(0).firstChild.nodeValue = '上傳更多';
                            fileItemName_more.text(item);
                        }
                    }

                    itemNamePhoto_img.attr("src", fileURL);
                    itemNameImg.text(fileName);
                    itemNameUpload.get(0).firstChild.nodeValue = '修改檔案';
                    itemNameUpload.parent().removeClass('file-upload').addClass('file-modify');
                    itemNameView.addClass('active');
                    itemNameViewImg.attr("src", fileURL);
                    if (index !== 0) {
                        fileItemName.text(item);
                    }
                    /*else{
						var itemArr = ['<td class="file-zh">註冊繳費單<span>（含註冊繳費單、住宿費用）</span></td>']; 
						fileItemName.append(itemArr.join(''));
					}*/


                    itemNameUpload.parents('td.file-modify').attr('docid', docId);
                }

            });
        }

    });

    //綁預覽事件
    /*newTr.find('.file-view a').off('click').on('click', function() {
        previewClickHandler($(this));
    });*/

}

function setEducationText(info, div) {
    console.debug(info);
    var divId = div.attr('id'); //每一塊div的id(student)
    var gradeClass = '';
    var schoolName = '';
    var entry = '';
    var graduation = '';
    $.each(info, function(propName, propValue) {
        console.debug(propName + ':' + propValue); //propName:得到的資料名稱; propValue:得到的資料的值
        if (typeof propValue === 'object') { //如果撈到的資料是物件,就再跑一次loop抓裡面的值
            $.each(propValue, function(objName, objValue) {
                var inputName = divId + '_' + objName;
                if (propName == 'gradeClass') { //年級   
                    if (objName == 'grade') {
                        gradeClass = objValue + '年';
                    } else if (objName == 'class') {
                        gradeClass = gradeClass + objValue + '班';
                    }
                    div.find('[name="' + inputName + '"]').text(gradeClass);
                }
                if (propName == 'school') { //學校名稱   
                    if (objName == 'isNational') {
                        if (objValue == 'Y') {
                            schoolName = '公立 ';
                        } else {
                            schoolName = '私立 ';
                        }
                    } else if (objName == 'name') {
                        schoolName = schoolName + objValue;
                    }
                    div.find('[name="' + inputName + '"]').text(schoolName);
                }
                if (propName == 'enterDate') { //入學日期
                    if (objName == 'year') {
                        entry = objValue + '年';
                    } else if (objName == 'month') {
                        entry = entry + objValue + '月';
                    }
                    div.find('[name="' + inputName + '_enter"]').text(entry);
                }
                if (propName == 'graduationDate') { //畢業日期
                    if (objName == 'year') {
                        graduation = objValue + '年';
                    } else if (objName == 'month') {
                        graduation = graduation + objValue + '月';
                    }
                    div.find('[name="' + inputName + '_graduation"]').text(graduation);
                }
            });
        } else { //如果撈到的資料不是物件,就直接塞字串進去
            var inputName = divId + '_' + propName;
            div.find('[name="' + inputName + '"]').text(propValue);
            div.find('[id="' + inputName + '"]').val(propValue);

            if (divId == 'accordingToBill' || div == 'freedom') {
                if (inputName == '') {
                    div.find('[id="' + inputName + '"]').val(0);
                }
            }

            if (propName == 'EducationStage') { //教育階段
                switch (propValue) {
                    case '1':
                        div.find('[name="' + inputName + '"]').text('博士');
                        break;
                    case '2':
                        div.find('[name="' + inputName + '"]').text('碩士');
                        break;
                    case '3':
                        div.find('[name="' + inputName + '"]').text('專科/大學');
                        break;
                    case '4':
                        div.find('[name="' + inputName + '"]').text('高中');
                        break;
                    case '5':
                        div.find('[name="' + inputName + '"]').text('國中');
                        break;
                    case '6':
                        div.find('[name="' + inputName + '"]').text('國小');
                        break;
                }
            }
        }
    });
}

function apply5_1_2(content) {

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
        modal_id: 'modal_apply_5_1_2',
        deadline_class: 'applyDate'
    });

    $('#modal_apply_5_1_2').on('hide.bs.modal', function() {
        window.location = 'apply.jsp?step=apply_document_5_1';
    });

    /*var imgSrc = content.code_img;
     var mobile = content.mobile;
     var applyDate = new Date();
     var applyYear = applyDate.getFullYear();
     var applyMonth = applyDate.getMonth() + 1;
     var applyDay = applyDate.getDate();
     var applyHours = applyDate.getHours();
     var applyMinutes = applyDate.getMinutes();
     var applySeconds = applyDate.getSeconds();
     var checkArr = [];

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


     var date = applyYear + '/' + applyMonth + '/' + applyDay + ' ' + applyHours + ':' + (applyMinutes + 5) + ':' + applySeconds;

     var min = $('#mins').text();
     var sec = $('#sec').text();
     var img = $('#img');

     $('#applyDate').text(date);
     $('#mobile').text(mobile);

     $('[name="codeInput"]').attr('maxlength', '6');

     img.attr('src', imgSrc);

     //倒數
     var countdown = function() {
     $('#sec').text($('#sec').text() - 1);
     if ($('#sec').text() < 10 && $('#sec').text() > 0) {

     $('#sec').text('0' + $('#sec').text());
     }
     if ($('#sec').text() == 0) {
     $('#sec').text(59);
     $('#mins').text($('#mins').text() - 1);
     min = min - 1;
     if (min < 0) {
     $('#mins').text(0);
     $('#sec').text('00');

     $("#modal_apply_5_1_2").modal('show');

     //按下確定後,關掉彈跳訊息及轉導到前一步驟
     $("#modal_apply_5_1_2 a.submitBtn").on('click', function() {
     $("#modal_apply_5_1_2").modal('hide');

     //轉導到前一步驟
     window.location = 'apply.jsp?step=apply_document_5_1';
     });
     clearInterval(start);
     }
     }
     }

     var start = setInterval(countdown, 1000);*/

}

/*function resetApply() {
    alert('您已超過一次性密碼有效時間，請重新操作。');

    //到前一步!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}*/

function apply5_2(content) {
    console.debug(content);
    var status1 = $('#status1');
    var status2 = $('#status2');
    //var guarantors = $('#guarantors');
    var applicantDiv = $('#applicant');
    var studentDiv = $('#student');
    //var student_sum = $('.student_sum');
    var myPhone = $('#myPhone');
    var student_loansPrice = $('.student_sum');
    var student_credit = $('.student_credit');
    var student_FPA = $('.student_FPA');
    var student_practice = $('.student_practice');
    var student_music = $('.student_music');
    var student_book = $('.student_book');
    var student_live = $('.student_live');
    var student_life = $('.student_life');
    var student_abroad = $('.student_abroad');
    var student_publicExpense = $('.student_publicExpense');
    var applicant_address_domi = $('[name="applicant_address_domi"]');
    var applicant_address = $('[name="applicant_address"]');
    var addrTempDomi = '';
    var addrTempTel = '';
    var student_EducationStage = $('[name="student_EducationStage"]');
    var student_name = $('[name="student_name"]');
    var student_department = $('[name="student_department"]');
    var student_onTheJob = $('[name="student_onTheJob"]');
    var student_class = $('[name="student_class"]');
    var student_id = $('[name="student_id"]');
    var student_month_enter = $('[name="student_month_enter"]');
    var student_month_graduation = $('[name="student_month_graduation"]');
    var branchNameAddr = $('#branchNameAddr');
    var branchPh = $('#branchPh');
    var branchDateTime = $('#branchDateTime');
    var thirdPartyTitleText = $('.thirdParty');

    var isGuarantorString_father = $('#isGuarantor_father');
    var isGuarantorString_mother = $('#isGuarantor_mother');

    var isGuarantorString_spouse = $('#isGuarantor_spouse');


    fatherDiv = $('#father');
    motherDiv = $('#mother');
    thirdPartyDiv = $('#thirdParty');
    spouseDiv = $('#spouse');

    var familyStatusLevel1Text = content.familyStatusLevel1Text;
    var familyStatusLevel2Text = content.familyStatusLevel2Text;
    var loans = content.loans;
    var showInfo = content.showInfo;
    var isGuarantor = content.isGuarantor;
    var domiCity = content.domicileAddress.cityId;
    var domiZipCode = content.domicileAddress.zipCode;
    var domiLiner = content.domicileAddress.liner;
    var domiNeighborhood = content.domicileAddress.neighborhood;
    var domiAddress = content.domicileAddress.address;
    var telCity = content.teleAddress.cityId;
    var telZipCode = content.teleAddress.zipCode;
    var telLiner = content.teleAddress.liner;
    var telNeighborhood = content.teleAddress.neighborhood;
    var telAddress = content.teleAddress.address;
    var branchName = content.branchName;
    var addr = content.addr;
    var tel = content.tel;
    var dateSelected = content.dateSelected;
    var timeSelected = content.timeSelected;
    var educationStage = content.EducationStage;
    var schoolName_isDay = content.school.isDay;
    var schoolName_isNational = content.school.isNational;
    var schoolName_name = content.school.name;
    var department = content.department;
    var OnTheJob = content.OnTheJob;
    var classId = content.gradeClass.class;
    var gradeId = content.gradeClass.grade;
    var studentId = content.student_id;
    var enterMonth = content.enterDate.month;
    var enterYear = content.enterDate.year;
    var graduationMonth = content.graduationDate.month;
    var graduationYear = content.graduationDate.year;
    var thirdPartyText = content.thirdPartyTitle;

    var isGuarantor_father = content.father_String;
    var isGuarantor_mother = content.mother_String;
    var isGuarantor_thirdParty = content.thirdParty_String;
    var isGuarantor_spouse = content.spouse_String;

    //家庭狀況
    if (familyStatusLevel2Text == '') {
        status1.text(familyStatusLevel1Text);
    } else {
        status1.text(familyStatusLevel1Text + '，' + familyStatusLevel2Text);
    }
    //status2.text(familyStatusLevel2Text);

    //申請人資料
    setInfoText(content, applicantDiv);
    //addrTempDomi = domiCity+domiZipCode+domiLinerName+domiLiner+domiNeighborhood+'鄰'+domiAddress;
    domiNeighborhood = (domiNeighborhood == '') ? '' : domiNeighborhood + '鄰'
    addrTempDomi = domiCity + domiZipCode + domiLiner + domiNeighborhood + domiAddress;
    applicant_address_domi.text(addrTempDomi);
    //addrTempTel = telCity+telZipCode+telLinerName+telLiner+telNeighborhood+'鄰'+telAddress;
    if (telAddress.indexOf('鄰') == 0) {
        telAddress = telAddress.split('鄰')[1];
    }
    addrTempTel = telCity + telZipCode + telAddress;
    applicant_address.text(addrTempTel);

    var dayBirthday = content.birthday.substr(5, 2);
    var monthBirthday = content.birthday.substr(3, 2);
    var yearBirthday = content.birthday.substr(0, 3);

    if (yearBirthday.length == 2) {
        yearBirthday = '0' + yearBirthday;
    }
    if (monthBirthday.length == 1) {
        monthBirthday = '0' + monthBirthday;
    }
    if (dayBirthday.length == 1) {
        dayBirthday = '0' + dayBirthday;
    }

    var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
    $('[name="applicant_birthday"]').text(birthdayStr);

    //塞學校的相關資訊
    educationStage = toEduStageName(educationStage);

    if (schoolName_isDay == '1') {
        schoolName_isDay = '日間';
    } else if (schoolName_isDay == '2') {
        schoolName_isDay = '夜間';
    }
    if (schoolName_isNational == '1') {
        schoolName_isNational = '公立';
    } else if (schoolName_isNational == '2') {
        schoolName_isNational = '私立';
    }
    var classString = (classId == "") ? "級" : classId + '班';
    var gradeAndClassInfo = gradeId + '年' + classString;
    var schoolFullInfo = schoolName_isNational + ' ' + schoolName_name + ' ' + schoolName_isDay + '部';
    var enterTime = "民國" + enterYear + '年' + enterMonth + '月';
    var leaveTime = "民國" + graduationYear + '年' + graduationMonth + '月';
    var schoolElementArr = [student_EducationStage, student_name, student_department, student_class, student_id, student_month_enter, student_month_graduation];
    var schoolStringArr = [educationStage, schoolFullInfo, department, gradeAndClassInfo, studentId, enterTime, leaveTime];
    student_onTheJob.text((OnTheJob == 'N') ? "否" : "是");
    setSchoolInformation(schoolElementArr, schoolStringArr);


    //保證人資料
    for (var i = 0; i <= 3; i++) {
        var showInfoD = showInfo.substr(i, 1);
        fatherDiv = $('#father');
        motherDiv = $('#mother');
        thirdPartyDiv = $('#thirdParty');
        spouseDiv = $('#spouse');

        switch (i) {
            case 0:
                if (showInfoD == '1' || showInfoD == '3') {
                    modal.getFamilyInfo('father', 'Y', function(fatherInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(fatherInfo, fatherDiv);
                        var dayBirthday = fatherInfo.birthday.substr(5, 2);
                        var monthBirthday = fatherInfo.birthday.substr(3, 2);
                        var yearBirthday = fatherInfo.birthday.substr(0, 3);

                        if (yearBirthday.length == 2) {
                            yearBirthday = '0' + yearBirthday;
                        }
                        if (monthBirthday.length == 1) {
                            monthBirthday = '0' + monthBirthday;
                        }
                        if (dayBirthday.length == 1) {
                            dayBirthday = '0' + dayBirthday;
                        }

                        var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
                        $('[name="father_birthday"]').text(birthdayStr);
                    }, 'Y');
                } else {
                    $('#father').hide();
                }
                break;
            case 1:
                if (showInfoD == '1' || showInfoD == '3') {
                    modal.getFamilyInfo('mother', 'Y', function(motherInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(motherInfo, motherDiv);
                        var dayBirthday = motherInfo.birthday.substr(5, 2);
                        var monthBirthday = motherInfo.birthday.substr(3, 2);
                        var yearBirthday = motherInfo.birthday.substr(0, 3);

                        if (yearBirthday.length == 2) {
                            yearBirthday = '0' + yearBirthday;
                        }
                        if (monthBirthday.length == 1) {
                            monthBirthday = '0' + monthBirthday;
                        }
                        if (dayBirthday.length == 1) {
                            dayBirthday = '0' + dayBirthday;
                        }

                        var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
                        $('[name="mother_birthday"]').text(birthdayStr);
                    }, 'Y');
                } else {
                    $('#mother').hide();
                }
                break;
            case 2:
                if (showInfoD == '1' || showInfoD == '3') {
                    var tempTitle = thirdPartyTitleText.text().split('(')[1];
                    var newTitle = thirdPartyText;
                    var tempArr = ['<span id="isGuarantor_thirdParty"></span>'];
                    thirdPartyTitleText.text(newTitle);
                    thirdPartyTitleText.append(tempArr.join(''));
                    modal.getFamilyInfo('thirdParty', 'Y', function(thirdPartyInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(thirdPartyInfo, thirdPartyDiv);
                        console.debug(thirdPartyInfo);
                        var dayBirthday = thirdPartyInfo.birthday.substr(5, 2);
                        var monthBirthday = thirdPartyInfo.birthday.substr(3, 2);
                        var yearBirthday = thirdPartyInfo.birthday.substr(0, 3);

                        if (yearBirthday.length == 2) {
                            yearBirthday = '0' + yearBirthday;
                        }
                        if (monthBirthday.length == 1) {
                            monthBirthday = '0' + monthBirthday;
                        }
                        if (dayBirthday.length == 1) {
                            dayBirthday = '0' + dayBirthday;
                        }

                        var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
                        $('[name="thirdParty_birthday"]').text(birthdayStr);
                    }, 'Y');
                } else {
                    $('#thirdParty').hide();
                }
                break;
            case 3:
                if (showInfoD == '1' || showInfoD == '3') {
                    modal.getFamilyInfo('spouse', 'Y', function(spouseInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(spouseInfo, spouseDiv);
                        var dayBirthday = spouseInfo.birthday.substr(5, 2);
                        var monthBirthday = spouseInfo.birthday.substr(3, 2);
                        var yearBirthday = spouseInfo.birthday.substr(0, 3);

                        if (yearBirthday.length == 2) {
                            yearBirthday = '0' + yearBirthday;
                        }
                        if (monthBirthday.length == 1) {
                            monthBirthday = '0' + monthBirthday;
                        }
                        if (dayBirthday.length == 1) {
                            dayBirthday = '0' + dayBirthday;
                        }

                        var birthdayStr = '民國' + yearBirthday + '年' + monthBirthday + '月' + dayBirthday + '日';
                        $('[name="spouse_birthday"]').text(birthdayStr);
                    }, 'Y');
                } else {
                    $('#spouse').hide();
                }
                break;
        }
    }
    var isGuarantorString_thirdParty = $('#isGuarantor_thirdParty');
    var elenemtArr = [isGuarantorString_father, isGuarantorString_mother, isGuarantorString_thirdParty, isGuarantorString_spouse];
    var stringArr = [isGuarantor_father, isGuarantor_mother, isGuarantor_thirdParty, isGuarantor_spouse];

    var updateString = '';

    $.each(stringArr, function(i, v) {
        console.debug(v);
        if (v.indexOf('(') == -1) {
            v = '(為' + v.substr(2, 5) + ')';
        }
        var currentEle = elenemtArr[i];
        currentEle.text(v);
    });

    //塞第三人的"與申請人之關係"的字串
    var relation = content.relationshipTitle;
    var rTitle = determineRelationship(relation);
    $('[name="thirdParty_relation"]').text(rTitle);

    /*isGuarantorString_father.text(isGuarantor_father);
     isGuarantorString_mother.text(isGuarantor_mother);
     isGuarantorString_thirdParty.text(isGuarantor_thirdParty);
     isGuarantorString_spouse.text(isGuarantor_spouse);
     */

    //顯示預約分行資訊
    var branchName = $('[name="branchName"]');
    var branchAddr = $('[name="branchAddr"]');
    var branchTel = $('[name="branchTel"]');
    var reservation = $('[name="reservation"]');

    var bName = content.branchName;
    var addr = content.addr;
    var tel = content.tel;
    var dateSelected = content.dateSelected;

    var yy = dateSelected.substr(0, 4);
    var mm = dateSelected.substr(5, 2);
    var dd = dateSelected.substr(8, 2);

    var timeSelected = content.timeSelected;
    var amORpm = 'AM';
    if (parseInt(timeSelected) < 900) { //決定要顯示'AM'或'PM'
        amORpm = 'PM';
    }

    var endTime = parseInt(timeSelected) + 100;
    if (endTime == 200) {
        endTime = '0200';
    } else if (endTime < 999) {
        endTime = '0' + endTime;
    } else {
        endTime += '';
    }

    timeSelected = (timeSelected.substr(0, 2)) + ':' + (timeSelected.substr(2, 2));
    endTime = (endTime.substr(0, 2)) + ':' + (endTime.substr(2, 2));

    branchNameAddr.text(bName + '(' + addr + ')');
    branchPh.text(tel);
    branchDateTime.text(yy + '/' + mm + '/' + dd + ' ' + amORpm + timeSelected + '-' + endTime);

    branchName.val(bName);
    branchAddr.val(addr);
    branchTel.val(tel);

    reservation.val(yy + '/' + mm + '/' + dd + ' ' + amORpm + timeSelected + '-' + endTime);

    /*申貸金額 (start)*/
    if (loans == '1') {
        var loansPrice = content.accordingToBill_sum;
        var abroad = content.accordingToBill.abroad;
        var book = content.accordingToBill.book;
        var loansSum = content.accordingToBill.loansSum;
        var life = content.accordingToBill.life;
        var live = content.accordingToBill.live;
        var publicExpense = content.accordingToBill.publicExpense;
        //存放金額
        var priceObj = [loansPrice, loansSum, abroad, book, life, live, publicExpense];
        //存放要顯示的元素
        var elementObj = [student_loansPrice, student_credit, student_abroad, student_book, student_life, student_live, student_publicExpense];
        var changeText = $('.changeText');
        changeText.text('依註冊繳費單登載之可貸金額');
        changeText.removeClass('changeTextShort');

        if (loansPrice.length > 3 && loansPrice.length <= 6) {

            var loansPrice0 = loansPrice.substr(0, loansPrice.length - 3);
            var loansPrice1 = loansPrice.substr(loansPrice.length - 3, 3);
            loansPrice = loansPrice0 + ',' + loansPrice1;
        } else if (loansPrice.length > 6) {
            var loansPrice0 = loansPrice.substr(0, 3);
            var loansPrice1 = loansPrice.substr(1, 3);
            var loansPrice2 = loansPrice.substr(4, 3);
            loansPrice = loansPrice0 + ',' + loansPrice1 + ',' + loansPrice2;
        }

        setLoanInformation(priceObj, elementObj);
    } else if (loans == '2') {
        var loansPrice = content.freedom_sum;
        var FPA = content.freedom.FPA;
        var abroad = content.freedom.abroad;
        var credit = content.freedom.credit;
        var music = content.freedom.music;
        var book = content.freedom.book;
        var life = content.freedom.life;
        var live = content.freedom.live;
        var practice = content.freedom.practice;
        var publicExpense = content.freedom.publicExpense;
        //存放金額
        var priceObj = [abroad, book, life, live, publicExpense, FPA, credit, music, loansPrice, practice];
        //存放要顯示的元素
        var elementObj = [student_abroad, student_book, student_life, student_live, student_publicExpense, student_FPA, student_credit, student_music, student_loansPrice, student_practice];
        var changeText = $('.changeText');
        changeText.text('學雜費');
        changeText.addClass('changeTextShort');

        if (loansPrice.length > 3 && loansPrice.length <= 6) {

            var loansPrice0 = loansPrice.substr(0, loansPrice.length - 3);
            var loansPrice1 = loansPrice.substr(loansPrice.length - 3, 3);
            loansPrice = loansPrice0 + ',' + loansPrice1;
        } else if (loansPrice.length > 6) {
            var loansPrice0 = loansPrice.substr(0, 3);
            var loansPrice1 = loansPrice.substr(1, 3);
            var loansPrice2 = loansPrice.substr(4, 3);
            loansPrice = loansPrice0 + ',' + loansPrice1 + ',' + loansPrice2;
        }

        setLoanInformation(priceObj, elementObj);
    }
    /*申貸金額 (end)*/

    /*要攜帶的文件(start)*/
    var signIOU = content.signBill; //是否需要簽立借據(須同時符合同一學程/同一學校/同一連帶保證人/同一申貸額度)
    var appoName = content.appoName; //本人姓名
    var loansPrice = content.loanPrice;
    var freedomLife = content.freedom.life;
    var accordingLife = content.accordingToBill.life;

    var objList = []; //要攜帶的物品
    var objString = '';

    console.debug(signIOU);

    if (signIOU == 'N') { //不需要簽立借據者
        console.debug('NNNNNN');
        objList.push('<li><p class="nasi">註冊繳費單/住宿費用單據</p></li><li><p class="nasi">本人(' + appoName + ')之身分證及印章</p></li>');
        objString = objString + '<li><p class="nasi">註冊繳費單/住宿費用單據</p></li><li><p class="nasi">本人(' + appoName + ')之身分證及印章</p></li>';

        //判斷是否需要攜帶"政府機關出具之低收入戶或中低收入戶證明"
        if (loansPrice == '1') {
            if (accordingLife > 0) {
                objList.push('<li><p class="nasi">政府機關出具之低收入戶或中低收入戶證明</p></li>');
                objString = objString + '<li><p class="nasi">政府機關出具之低收入戶或中低收入戶證明</p></li>';
            }
        } else if (loansPrice == '2') {
            if (freedomLife > 0) {
                objList.push('<li><p class="nasi">政府機關出具之低收入戶或中低收入戶證明</p></li>');
                objString = objString + '<li><p class="nasi">政府機關出具之低收入戶或中低收入戶證明</p></li>';
            }
        }

    } else { //需要簽立借據者
        console.debug('YYYYYY');
        var allObj = getCarryObj(content);

        console.debug(allObj);

        //必帶註冊繳費單/住宿繳費單,所以先塞進array中
        objList.push('<li><p class="nasi">註冊繳費單/住宿費用單據</p></li>');
        $.each(allObj, function(i, obj) {
            objList.push('<li><p class="nasi">' + obj + '</p></li>');
            objString = objString + '<li><p class="nasi">' + obj + '</p></li>';
        });
    }

    //將要攜帶的物品塞入hidden中
    $('[name="objListHidden"]').val(objString);

    console.debug(objList);
    console.debug(objString);
    /*要攜帶的文件(end)*/
}

function determineRelationship(code) {
    switch (code) {
        case '4A':
            return '兄弟';
        case '4B':
            return '姊妹';
        case '4C':
            return '姊弟';
        case '4D':
            return '兄妹';
        case '5A':
            return '祖孫';
        case '5B':
            return '外祖';
        case '5C':
            return '外婆';
        case '7A':
            return '他親';
        case '8A':
            return '朋友';
    }
}

//顯示申貸金額
function setLoanInformation(priceObj, elementObj) {
    $.each(elementObj, function(index, element) {
        console.debug(element);
        //本次申貸金額的字體要另外放大
        if (element.selector == ".student_sum") {
            element.text((addDot(priceObj[index]) == '') ? '0' : addDot(priceObj[index]) + "");
            $('.bill').text('元');
        } else {
            element.text((addDot(priceObj[index]) == '') ? '0元' : addDot(priceObj[index]) + "元");
            console.debug(element.text());
        }

    });
}

//顯示就讀學校的資訊
function setSchoolInformation(element, string) {
    $.each(element, function(index, ele) {
        ele.text(string[index]);
    });
}

function apply6_1(content) {
    var applyDate = new Date();
    var applyYear = applyDate.getFullYear();
    var applyMonth = applyDate.getMonth() + 1;
    var applyDay = applyDate.getDate();
    var applyHours = applyDate.getHours();
    var applyMinutes = applyDate.getMinutes();
    var applySeconds = applyDate.getSeconds();
    var appYear = $('[name="appYear"]');
    var appMonth = $('[name="appMonth"]');
    var appDay = $('[name="appDay"]');
    var appHours = $('[name="appHours"]');
    var appMinutes = $('[name="appMinutes"]');
    var appSeconds = $('[name="appSeconds"]');

    var checkArr = [];

    appYear.val(applyYear);
    appMonth.val(applyMonth);
    appDay.val(applyDay);
    appHours.val(applyHours);
    appMinutes.val(applyMinutes);
    appSeconds.val(applySeconds);

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
}

function apply6_2(content) {
    console.debug(content);
    var signIOU = content.signBill;
    var applyDate = new Date();
    var applyYear = applyDate.getFullYear();
    var applyMonth = applyDate.getMonth() + 1;
    var applyDay = applyDate.getDate();
    var applyHours = applyDate.getHours();
    var applyMinutes = applyDate.getMinutes();
    var applySeconds = applyDate.getSeconds();

    var appYear = $('[name="appYear"]');
    var appMonth = $('[name="appMonth"]');
    var appDay = $('[name="appDay"]');
    var appHours = $('[name="appHours"]');
    var appMinutes = $('[name="appMinutes"]');
    var appSeconds = $('[name="appSeconds"]');

    var checkArr = [];

    appYear.val(applyYear);
    appMonth.val(applyMonth);
    appDay.val(applyDay);
    appHours.val(applyHours);
    appMinutes.val(applyMinutes);
    appSeconds.val(applySeconds);

    //如果須簽立借據的情形,須增加[並連同保證人]
    if (signIOU == 'Y') {
        $('#hasIOU').show();
    }
    //如果不須簽立借據的情形,不須增加[並連同保證人]
    else if (signIOU == 'N') {
        $('#hasNoIOU').show();
    }

    //將一位數的日期補上0
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
    var branchName = content.branchName;
    var branchTel = content.tel;
    var branchAddr = content.addr;
    var reservationTime = content.reservation;
    var objList = content.objListHidden;
    var nameAndAddr = $('#nameAndAddr');
    var tel = $('#tel');
    var branchReservation = $('#branchReservation');

    $('#applyDate').text(date);

    nameAndAddr.text(branchName + '(' + branchAddr + ')');
    tel.text(branchTel);
    branchReservation.text(reservationTime);

    //將需要攜帶的文件顯示在網頁上
    var list = $('#carryObjList');

    console.debug(objList);
    var objArr = [];
    objArr.push(objList);

    list.append(objArr.join(''));

    //若點選"特殊情形證明文件"
    $('#SpecialStatus').on('click', function() {
        GardenUtils.display.popup({
            title: '',
            content: '<p>‧若為失蹤:</p><p>需檢附警察機關報案「受(處)理查尋人口案件登記表」或戶籍謄本登載失蹤。</p><br><p>‧若為重病或精神錯亂:</p><p>需檢附合格醫院最近六個月內所核發重病或精神錯亂之證明文件。</p><br><p>‧若為在監服刑:</p><p>需檢附在監服刑執行證明文件。</p><br><p>‧若為家庭暴力:</p><p>需檢附法院所核發有效之通常保護令(未指定暫時監護權項目)或各地方政府出具之受暴證明。</p>',
            closeCallBackFn: function() {},
            isShowSubmit: false
        });
    });

}

//依照是否成年/家庭狀況/保證人/合計收入對象顯示不同欄位
function showFamilyInformation(adult, show, gua, itax, change, record) {
    //判斷要長哪些人的div
    var stringStatus_f = []; //父親:[0]:連帶保證人; [1]:合計對象 (true/false)
    var stringStatus_m = []; //母親:[0]:連帶保證人; [1]:合計對象 (true/false)
    var stringStatus_t = []; //第三人:[0]:連帶保證人; [1]:合計對象 (true/false)
    var stringStatus_s = []; //配偶:[0]:連帶保證人; [1]:合計對象 (true/false)

    //hidden
    var father_id_hidden = $('[name="father_id_hidden"]');
    var father_name_hidden = $('[name="father_name_hidden"]');
    var father_mobile_hidden = $('[name="father_mobile_hidden"]');
    var father_phone_hidden = $('[name="father_phone_hidden"]');
    var father_address_hidden = $('[name="father_address_hidden"]');
    var mother_id_hidden = $('[name="mother_id_hidden"]');
    var mother_name_hidden = $('[name="mother_name_hidden"]');
    var mother_mobile_hidden = $('[name="mother_mobile_hidden"]');
    var mother_phone_hidden = $('[name="mother_phone_hidden"]');
    var mother_address_hidden = $('[name="mother_address_hidden"]');
    var thirdParty_id_hidden = $('[name="thirdParty_id_hidden"]');
    var thirdParty_name_hidden = $('[name="thirdParty_name_hidden"]');
    var thirdParty_mobile_hidden = $('[name="thirdParty_mobile_hidden"]');
    var thirdParty_phone_hidden = $('[name="thirdParty_phone_hidden"]');
    var thirdParty_address_hidden = $('[name="thirdParty_address_hidden"]');
    var spouse_id_hidden = $('[name="spouse_id_hidden"]');
    var spouse_name_hidden = $('[name="spouse_name_hidden"]');
    var spouse_mobile_hidden = $('[name="spouse_mobile_hidden"]');
    var spouse_phone_hidden = $('[name="spouse_phone_hidden"]');
    var spouse_address_hidden = $('[name="spouse_address_hidden"]');

    //alert(typeof(itax));
    itax = itax + '';

    for (var identity = 0; identity <= 3; identity++) {
        //identity(0:father; 1:mother; 2:third party; 3:spouse)
        var identityStatus = show.substr(identity, 1);

        if (identityStatus == 0) { //hide div
            switch (identity) {
                case 0:
                    fatherDiv.hide();
                    break;
                case 1:
                    motherDiv.hide();
                    break;
                case 2:
                    thirdPartyDiv.hide();
                    break;
                case 3:
                    spouseDiv.hide();
                    break;
            }
        } else if (identityStatus == 1) { //set information

            switch (identity) {
                case 0:
                    //父親資料   
                    modal.getFamilyInfo('father', 'N', function(fatherInfo) {
                        setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(fatherInfo, fatherDiv);
                        determineAddReadonly('father_', change, record, fatherInfo);
                    });

                    break;
                case 1:
                    //母親資料
                    modal.getFamilyInfo('mother', 'N', function(motherInfo) {
                        setInfoValue(motherInfo, motherDiv);
                        setInfoText(motherInfo, motherDiv);
                        determineAddReadonly('mother_', change, record, motherInfo);
                    });

                    break;
                case 2:
                    //第三人資料
                    modal.getFamilyInfo('thirdParty', 'N', function(thirdPartyInfo) {
                        setInfoValue(thirdPartyInfo, thirdPartyDiv);
                        setInfoText(thirdPartyInfo, thirdPartyDiv);
                        determineAddReadonly('thirdParty_', change, record, thirdPartyInfo);
                    });
                    break;
                case 3:
                    //配偶資料
                    modal.getFamilyInfo('spouse', 'N', function(spouseInfo) {
                        setInfoValue(spouseInfo, spouseDiv);
                        setInfoText(spouseInfo, spouseDiv);
                        determineAddReadonly('spouse_', change, record, spouseInfo);
                    });
                    break;
            }

            /**
             var family,appendDiv;

             if(identity == 0) {
				family = 'father';
				appendDiv = fatherDiv;
			}
             else if(identity == 1) {
				family = 'mother';
				appendDiv = motherDiv;
			}
             else if(identity == 2) {
				family = 'thirdParty';
				appendDiv = thirdPartyDiv;
			}
             else if(identity == 3) {
				family = 'spouse';
				appendDiv = spouseDiv;
			}


             alert(family);
             alert(appendDiv.attr('id'));
             modal.getFamilyInfo(family, 'N', function(familyInfo) {
				setInfoValue(familyInfo, appendDiv);
				setInfoText(familyInfo, appendDiv);
				determineAddReadonly(family + '_', change, record,familyInfo);
			});
             **/

        } else if (identityStatus == 2) { //先顯示radio
            console.debug('adult:' + adult);
            if (adult == 'N') {
                switch (identity) { //若選擇'是',再顯示整塊div
                    case 0:
                        //父親資料   
                        //$('#father p[class="stringOrRadio"]').text('');
                        //$('#father p[class="stringOrRadio"]').append('(擔任連帶保證人)');
                        $('#father div[class="joy finp"]').hide();
                        $('#father div[class="right radioGuarantor"]').show();
                        break;
                    case 1:
                        //母親資料
                        //$('#mother p[class="stringOrRadio"]').text('');
                        //$('#mother p[class="stringOrRadio"]').append('(擔任連帶保證人)');
                        $('#mother div[class="joy finp"]').hide();
                        $('#mother div[class="right radioGuarantor"]').show();
                        break;
                    case 2:
                        //第三人資料
                        //$('#thirdParty p[class="stringOrRadio"]').text('');
                        //$('#thirdParty p[class="stringOrRadio"]').append('(擔任連帶保證人)');
                        $('#thirdParty div[class="joy finp"]').hide();
                        $('#thirdParty div[class="right radioGuarantor"]').show();
                        break;
                    case 3:
                        //配偶資料
                        //$('#spouse p[class="stringOrRadio"]').text('');
                        //$('#spouse p[class="stringOrRadio"]').append('(擔任連帶保證人)');
                        $('#spouse div[class="joy finp"]').hide();
                        $('#spouse div[class="right radioGuarantor"]').show();
                        break;
                }
            } else if (adult == 'Y') { //若選擇'父親',再顯示父親的整塊div; 若選擇'母親',再顯示母親的整塊div   
                $('#incomeTaxRadio').show();

                switch (identity) { //先隱藏該人物之div,若"合作對象"選擇'是',再顯示整塊div,反之亦然
                    case 0:
                        //父親資料   
                        $('#father').hide();
                        break;
                    case 1:
                        //母親資料
                        $('#mother').hide();
                        break;
                    case 2:
                        //第三人資料
                        $('#thirdParty').hide();
                        break;
                    case 3:
                        //配偶資料
                        $('#spouse').hide();
                        break;
                }
            }

        } else if (identityStatus == 3) { //同時顯示checkbox和關係人表格        
            $('#incomeTaxRadio').show();

            switch (identity) { //先隱藏該人物之div,若"合作對象"選擇'是',再顯示整塊div,反之亦然
                case 0:
                    //父親資料   
                    modal.getFamilyInfo('father', 'N', function(fatherInfo) {
                        setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(fatherInfo, fatherDiv);
                        determineAddReadonly('father_', change, record, fatherInfo);
                    });
                    break;
                case 1:
                    //母親資料
                    modal.getFamilyInfo('mother', 'N', function(motherInfo) {
                        setInfoValue(motherInfo, motherDiv);
                        setInfoText(motherInfo, motherDiv);
                        determineAddReadonly('mother_', change, record, motherInfo);
                    });
                    break;
                case 2:
                    thirdPartyDiv.hide();
                    break;
                case 3:
                    spouseDiv.hide();
                    break;
            }

            //$('[name="showInfo"]').val('1100');
        }
    }

    //判斷要給字串或radio
    for (var identity = 0; identity <= 3; identity++) {
        //identity(0:father; 1:mother; 2:third party; 3:spouse)
        var identityStatus = gua.substr(identity, 1);

        if (adult == 'N') { //未成年
            if (identityStatus !== '0') {
                switch (identity) {
                    case 0: //father
                        switch (identityStatus) {
                            case '1': //塞tag至array,以利之後判斷要顯示什麼樣的字串
                                stringStatus_f[0] = true;
                                guarantorText = guarantorText + '父親';
                                break;
                            case '3': //顯示"是否擔任連帶保證人"的radio
                                $('#father p[class="stringOrRadio"]').text('');
                                $('#father p[class="stringOrRadio"]').append('(擔任連帶保證人)');
                                $('#father div[class="right radioGuarantor"]').show();
                                break;
                        }
                        break;
                    case 1: //mother
                        switch (identityStatus) {
                            case '1': //塞tag至array,以利之後判斷要顯示什麼樣的字串
                                stringStatus_m[0] = true;
                                guarantorText = guarantorText + '母親';
                                break;
                            case '3': //顯示"是否擔任連帶保證人"的radio
                                $('#mother p[class="stringOrRadio"]').text('');
                                $('#mother p[class="stringOrRadio"]').append('(擔任連帶保證人)');
                                $('#mother div[class="right radioGuarantor"]').show();
                                break;
                        }
                        break;
                    case 2: //third party
                        switch (identityStatus) {
                            case '1': //塞tag至array,以利之後判斷要顯示什麼樣的字串
                                stringStatus_t[0] = true;
                                guarantorText = guarantorText + '第三人';
                                break;
                            case '3': //顯示"是否擔任連帶保證人"的radio
                                $('#thirdParty p[class="stringOrRadio"]').text('');
                                $('#thirdParty p[class="stringOrRadio"]').append('(擔任連帶保證人)');
                                $('#thirdParty div[class="right radioGuarantor"]').show();
                                break;
                        }
                        break;
                    case 3: //spouse
                        switch (identityStatus) {
                            case '1': //塞tag至array,以利之後判斷要顯示什麼樣的字串
                                stringStatus_s[0] = true;
                                guarantorText = guarantorText + '配偶';
                                break;
                            case '3': //顯示"是否擔任連帶保證人"的radio
                                $('#spouse p[class="stringOrRadio"]').text('');
                                $('#spouse p[class="stringOrRadio"]').append('(擔任連帶保證人)');
                                $('#spouse div[class="right radioGuarantor"]').show();
                                break;
                        }
                        break;
                }
            }

        } else if (adult == 'Y') { //已成年
            if (identityStatus !== '0') {
                switch (identity) {
                    case 0: //father
                        switch (identityStatus) {
                            case '1': //塞tag至array,以利之後判斷要顯示什麼樣的字串
                                stringStatus_f[0] = true;
                                guarantorText = guarantorText + '父親';
                                break;
                            case '3': //顯示"是否為合計所得對象"的radio
                                $('#incomeTaxRadio').show();
                                break;
                        }
                        break;
                    case 1: //mother
                        switch (identityStatus) {
                            case '1': //塞tag至array,以利之後判斷要顯示什麼樣的字串
                                stringStatus_m[0] = true;
                                guarantorText = guarantorText + '母親';
                                break;
                            case '3': //顯示"是否為合計所得對象"的radio
                                $('#incomeTaxRadio').show();
                                break;
                        }
                        break;
                    case 2: //third party
                        switch (identityStatus) {
                            case '1': //塞tag至array,以利之後判斷要顯示什麼樣的字串
                                stringStatus_t[0] = true;
                                guarantorText = guarantorText + '第三人';
                                break;
                            case '3': //顯示"是否為合計所得對象"的radio
                                $('#incomeTaxRadio').show();
                                break;
                        }
                        break;
                    case 3: //spouse
                        switch (identityStatus) {
                            case '1': //塞tag至array,以利之後判斷要顯示什麼樣的字串
                                stringStatus_s[0] = true;
                                guarantorText = guarantorText + '配偶';
                                break;
                            case '3': //顯示"是否為合計所得對象"的radio
                                $('#incomeTaxRadio').show();
                                break;
                        }
                        break;
                }
            }
        }
    }

    //判斷是不是合計所得對象
    for (var identity = 0; identity <= 3; identity++) {
        //identity(0:father; 1:mother; 2:third party; 3:spouse)
        var identityStatus = itax.substr(identity, 1);

        switch (identity) { //塞tag至array,以利之後判斷要顯示什麼樣的字串
            case 0: //father
                if (identityStatus == '1') {
                    stringStatus_f[1] = true;
                }
                break;
            case 1: //mother
                if (identityStatus == '1') {
                    stringStatus_m[1] = true;
                }
                break;
            case 2: //third party
                if (identityStatus == '1') {
                    stringStatus_t[1] = true;
                }
                break;
            case 3: //spouse
                if (identityStatus == '1') {
                    stringStatus_s[1] = true;
                }
                break;
        }
    }
    console.debug(stringStatus_f);
    console.debug(stringStatus_m);
    console.debug(stringStatus_t);
    console.debug(stringStatus_s);

    //父親的字串
    if (stringStatus_f[0] == true) {
        if (stringStatus_f[1] == true) { //連帶保證人&&合計對象
            $('#father p[class="stringOrRadio"]').append('(為連帶保證人/合計所得對象)');
        } else if (stringStatus_f[1] != true) { //連帶保證人  
            $('#father p[class="stringOrRadio"]').append('(為連帶保證人)');
        }
    } else if (stringStatus_f[0] != true) {
        if (stringStatus_f[1] == true) { //合計對象
            $('#father p[class="stringOrRadio"]').append('(為合計所得對象)');
        }
    }
    //母親的字串
    if (stringStatus_m[0] == true) {
        if (stringStatus_m[1] == true) { //連帶保證人&&合計對象
            $('#mother p[class="stringOrRadio"]').append('(為連帶保證人/合計所得對象)');
        } else if (stringStatus_m[1] != true) { //連帶保證人  
            $('#mother p[class="stringOrRadio"]').append('(為連帶保證人)');
        }
    } else if (stringStatus_m[0] != true) {
        if (stringStatus_m[1] == true) { //合計對象
            $('#mother p[class="stringOrRadio"]').append('(為合計所得對象)');
        }
    }
    //第三人的字串
    if (stringStatus_t[0] == true) {
        if (stringStatus_t[1] == true) { //連帶保證人&&合計對象
            $('#thirdParty p[class="stringOrRadio"]').append('(為連帶保證人/合計所得對象)');
        } else if (stringStatus_t[1] != true) { //連帶保證人  
            $('#thirdParty p[class="stringOrRadio"]').append('(為連帶保證人)');
        }
    } else if (stringStatus_t[0] != true) {
        if (stringStatus_t[1] == true) { //合計對象
            $('#thirdParty p[class="stringOrRadio"]').append('(為合計所得對象)');
        }
    }
    //配偶的字串
    if (stringStatus_s[0] == true) {
        if (stringStatus_s[1] == true) { //連帶保證人&&合計對象
            $('#spouse p[class="stringOrRadio"]').append('(為連帶保證人/合計所得對象)');
        } else if (stringStatus_s[1] != true) { //連帶保證人  
            $('#spouse p[class="stringOrRadio"]').append('(為連帶保證人)');
        }
    } else if (stringStatus_s[0] != true) {
        if (stringStatus_s[1] == true) { //合計對象
            $('#spouse p[class="stringOrRadio"]').append('(為合計所得對象)');
        }
    }



}

function getFamilyAddrToSelector(family) {
    //地址(下拉式選單)
    var jsonCity = modal.getCity();
    var arrCity = jsonCity.cities;
    var arrayCity = [];
    arrayCity.push('<option value="">請選擇</option>');
    var cSelector = family + '_cityId';
    var cDomiSelector = family + '_cityId_domi';
    console.debug('city selectpicker:' + cSelector);


    $.each(arrCity, function(i, cityData) {
        arrayCity.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });


    $('[name="' + cSelector + '"]').append(arrayCity.join(''));
    $('[name="' + cDomiSelector + '"]').append(arrayCity.join(''));

    $('[name="' + cSelector + '"]').selectpicker('refresh');
    $('[name="' + cDomiSelector + '"]').selectpicker('refresh');

}

function toEduStageName(educationStage) {
    switch (educationStage) {
        case '1':
            educationStage = '博士';
            break;
        case '2':
            educationStage = '碩士';
            break;
        case '3':
            educationStage = '大學醫學(牙醫)系';
            break;
        case '4':
            educationStage = '大學、四技';
            break;
        case '5':
            educationStage = '二技';
            break;
        case '6':
            educationStage = '二專';
            break;
        case '7':
            educationStage = '高中職';
            break;
        case '8':
            educationStage = '五專';
            break;
        case '9':
            educationStage = '學士後第二專長學士學位學程';
            break;
        case 'A':
            educationStage = '七年一貫';
            break;
    }

    return educationStage;
}

//鎖死通訊地址or解開地址的輸入
function lockAddress(addressObj, isLock) {
    console.debug(addressObj.citySelectTele.attr('class'));
    console.debug(addressObj.citySelectTele.parent().attr('class'));

    addressObj.citySelectTele.attr("disabled", isLock);
    addressObj.zipSelectTele.attr("disabled", isLock);
    addressObj.addressTele.attr("disabled", isLock);

    if (isLock) { //鎖
        addressObj.citySelectTele.parent().addClass("disabled");
        addressObj.zipSelectTele.parent().addClass("disabled");
        addressObj.citySelectTele.parent().find('button').addClass("disabled");
        addressObj.zipSelectTele.parent().find('button').addClass("disabled");
    } else { //解鎖
        addressObj.citySelectTele.parent().removeClass("disabled");
        addressObj.zipSelectTele.parent().removeClass("disabled");
        addressObj.citySelectTele.parent().find('button').removeClass("disabled");
        addressObj.zipSelectTele.parent().find('button').removeClass("disabled");
    }


    if (addressObj.linerSelectTele.length != 0) { //戶籍地址
        addressObj.linerSelectTele.attr("disabled", isLock);
        addressObj.neighborhoodTele.attr("disabled", isLock);

        if (isLock) { //鎖
            addressObj.linerSelectTele.parent().addClass("disabled");
            addressObj.linerSelectTele.parent().find('button').addClass("disabled");
        } else { //解鎖
            addressObj.linerSelectTele.parent().removeClass("disabled");
            addressObj.linerSelectTele.parent().find('button').removeClass("disabled");
        }
    }

    /*if (isLock == true) { //鎖
     console.debug(addressObj);
     addressObj.citySelectTele.attr("disabled", true);
     addressObj.zipSelectTele.attr("disabled", true);
     addressObj.addressTele.attr("readonly", true);

     if (addressObj.linerSelectTele.length != 0) { //戶籍地址
     addressObj.linerSelectTele.attr("disabled", true);
     addressObj.neighborhoodTele.attr("readonly", true);
     }
     } else { //解開
     addressObj.citySelectTele.attr("disabled", false);
     addressObj.zipSelectTele.attr("disabled", false);
     addressObj.addressTele.attr("readonly", false);

     if (addressObj.linerSelectTele.length != 0) { //戶籍地址
     addressObj.linerSelectTele.attr("disabled", false);
     addressObj.neighborhoodTele.attr("readonly", false);
     }
     }*/
}

//加上千分位
function addDot(n) {
    n += "";
    var arr = n.split(".");
    var re = /(\d{1,3})(?=(\d{3})+$)/g;
    return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
}