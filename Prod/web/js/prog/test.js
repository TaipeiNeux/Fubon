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
        data: {},
        callback: function(content) {

            //開始長流程畫面
            buildFlow(content, stepEventHandler, nextEventHanlder);
        }
    });

});

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
var loanChoiced; //step 3-2 選擇的貸款方式(1:依註冊繳費單登載之可貸金額; 2:自行選擇申貸項目)
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
var dayId;
var educationStageId;
var sSelectValue;

function apply1_1_valid() {
    //Foolproof

    //string
    var res = GardenUtils.valid.validForm({
        type: "show",
        formId: ["mainForm"],
        validEmpty: [{
            name: 'email',
            msg: 'Email'
        }, {
            name: 'DomicileArea',
            msg: '戶籍電話 (區域)'
        }, {
            name: 'DomicilePhone',
            msg: '戶籍電話'
        }, {
            name: 'areaTelephone',
            msg: '通訊電話 (區域)'
        }, {
            name: 'telephone',
            msg: '通訊電話'
        }, {
            name: 'cellPhone',
            msg: '行動電話'
        }, {
            name: 'DomicileNeighborhood',
            msg: '戶籍地址（鄰）'
        }, {
            name: 'DomicileAddress',
            msg: '戶籍地址'
        }, {
            name: 'neighborhood',
            msg: '通訊地址（鄰）'
        }, {
            name: 'address',
            msg: '通訊地址'
        }, {
            name: 'domicileCityId',
            msg: '戶籍地址（市）'
        }, {
            name: 'domicileZipCode',
            msg: '戶籍地址 (區)'
        }, {
            name: 'domicileLiner',
            msg: '戶籍地址（里）'
        }, {
            name: 'cityId',
            msg: '通訊地址（市）'
        }, {
            name: 'zipCode',
            msg: '通訊地址 (區)'
        }, {
            name: 'liner',
            msg: '通訊地址（里）'
        }],
        validNumber: [
			{
	            name: 'DomicileArea',
	            msg: '戶籍電話 (區域)',
				allowEmpty : false
	        }, {
	            name: 'DomicilePhone',
	            msg: '戶籍電話',
				allowEmpty : false
	        }, {
	            name: 'areaTelephone',
	            msg: '通訊電話 (區域)',
				allowEmpty : false
	        }, {
	            name: 'telephone',
	            msg: '通訊電話',
				allowEmpty : false
	        }
			/*因為現在測試機行動電話都是隱碼，所以傳出去都會被擋, 
			{
	            name: 'cellPhone',
	            msg: '行動電話',
				allowEmpty : false
	        }*/
		],
        validDecimal: [],
        validEmail: [
			{
	            name: 'email',
	            msg: 'Email'
	        }
		],
        validDate: [],
        errorDel: [],
        customizeFun: function(customizeValidResult) {
		
			var domicileAreaVal = $('[name="DomicileArea"]').val();
			if(domicileAreaVal.length != 2) {
				customizeValidResult.push({
					obj : $('[name="DomicileArea"]'),
					msg : '戶籍電話區碼長度為2碼'
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
        console.debug(resultArr);
    } else { //已婚
        $('.married').find('input:checked').each(function() {
            var isParent = $(this).parent();
            result = isParent.find('label');
            resultArr.push(result.text());
        });
        console.debug(resultArr);
    }
    $('[name="familyStatusLevel1Text"]').val(resultArr[0]);
    $('[name="familyStatusLevel2Text"]').val(resultArr[1]);
    if (userMarried == 'N') { //未婚
        if ($('[name="familyStatusLevel2"]').val() == '' && $('[name="familyStatusLevel1"]').val() != '4') {
            alert('請選擇家庭狀況');
            return false;
        } else {
            return true;
        }
    } else { //已婚
        if ($('[name="familyStatusLevel2"]').val() == '') {
            alert('請選擇家庭狀況');
            return false;
        } else {
            return true;
        }
    }
}

function apply2_valid() {
    //Foolproof
    var family = '';
    var familyName = '';
    var resFinal = true;
    for (var i = 0; i <= 3; i++) {
        switch (i) {
            case 0:
                family = 'father_';
                familyName = '父親';
                break;
            case 1:
                family = 'mother_';
                familyName = '母親';
                break;
            case 2:
                family = 'thirdParty_';
                familyName = '第三人';
                break;
            case 3:
                family = 'spouse_';
                familyName = '配偶';
                break;
        }
        familyFoolproof(family, familyName);
        //alert('results:'+results);

        if (resFinal !== false) {
            resFinal = results;
        }
    }
    if (resFinal === false) {
        return false;
    } else {
        return true;
    }
}

//全家人的防呆(step 2)
function familyFoolproof(family, familyName) {
    results = GardenUtils.valid.validForm({
        type: "alert",
        formId: ["mainForm"],
        validEmpty: [{
            name: '' + family + 'id',
            msg: '' + familyName + '身分證字號'
        }, {
            name: '' + family + 'name',
            msg: '' + familyName + '姓名'
        }, {
            name: '' + family + 'birthday0',
            msg: '' + familyName + '生日 (年)'
        }, {
            name: '' + family + 'birthday2',
            msg: '' + familyName + '生日 (月)'
        }, {
            name: '' + family + 'birthday3',
            msg: '' + familyName + '生日 (日)'
        }, {
            name: '' + family + 'regionCode_domi',
            msg: '' + familyName + '戶籍電話 (區域)'
        }, {
            name: '' + family + 'phone_domi',
            msg: '' + familyName + '戶籍電話'
        }, {
            name: '' + family + 'regionCode',
            msg: '' + familyName + '通訊電話 (區域)'
        }, {
            name: '' + family + 'phone',
            msg: '' + familyName + '通訊電話'
        }, {
            name: '' + family + 'mobile',
            msg: '' + familyName + '行動電話'
        }, {
            name: '' + family + 'neighborhood_domi',
            msg: '' + familyName + '戶籍地址（鄰）'
        }, {
            name: '' + family + 'address_domi',
            msg: '' + familyName + '戶籍地址'
        }, {
            name: '' + family + 'neighborhood',
            msg: '' + familyName + '通訊地址（鄰）'
        }, {
            name: '' + family + 'address',
            msg: '' + familyName + '通訊地址'
        }, {
            name: '' + family + 'cityId_domi',
            msg: '' + familyName + '戶籍地址（市）'
        }, {
            name: '' + family + 'zipCode_domi',
            msg: '' + familyName + '戶籍地址 (區)'
        }, {
            name: '' + family + 'liner_domi',
            msg: '' + familyName + '戶籍地址（里）'
        }, {
            name: '' + family + 'cityId',
            msg: '' + familyName + '通訊地址（市）'
        }, {
            name: '' + family + 'zipCode',
            msg: '' + familyName + '通訊地址 (區)'
        }, {
            name: '' + family + 'liner',
            msg: '' + familyName + '通訊地址（里）'
        }],
        validNumber: [],
        validDecimal: [],
        validEmail: [],
        validDate: [],
        errorDel: [],
        customizeFun: function() {}
    });
}

function apply3_1_valid() {
    //Foolproof
    var selectValue = $('[name="student_educationStage"]').parent().find('button').attr('title');
    var selectValueHidden = $('[name="stageSelectValue"]');
    var loanAmtHidden = $('[name="loanAmt"]')

	
	//0<「本次申貸金額｣<=選擇之教育階段可申貸總額度(高中職30萬.大學醫學(牙醫)系150萬.其他階段80萬)。
    if (selectValue == '大學醫學(牙醫)系') {
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

    res = GardenUtils.valid.validForm({
        type: "alert",
        formId: ["mainForm"],
        validEmpty: [{
            name: '' + family + 'educationStage',
            msg: '教育階段'
        }, {
            name: '' + family + 'isNational',
            msg: '學校名稱 (公/私)'
        }, {
            name: '' + family + 'name',
            msg: '學校名稱'
        }, {
            name: '' + family + 'isDay',
            msg: '學校名稱 (日間/夜間)'
        }, {
            name: '' + family + 'department',
            msg: '科系所'
        }, {
            name: '' + family + 'grade',
            msg: '升學年級'
        }, {
            name: '' + family + 'class',
            msg: '升學年級 (班別)'
        }, {
            name: '' + family + 'id',
            msg: '學號'
        }, {
            name: '' + family + 'year_enter',
            msg: '入學日期 (年)'
        }, {
            name: '' + family + 'month_enter',
            msg: '入學日期 (月)'
        }, {
            name: '' + family + 'year_graduation',
            msg: '預計畢業時間（年）'
        }, {
            name: '' + family + 'month_graduation',
            msg: '預計畢業時間（月）'
        }],
        validNumber: [],
        validDecimal: [],
        validEmail: [],
        validDate: [],
        errorDel: [],
        customizeFun: function() {}
    });

    if (res == true) {
        return true;
    } else {
        return false;
    }
}

function apply3_2_valid() {
    //Foolproof    

    var res = true;
    var alertString = '';
    //alert(loanChoiced);
    if (loanChoiced == 1) {
        var register = $('#loansSum').val();
        var sum = $('#accordingToBill_sum').val();
        var books = $('#accordingToBill_book').val();
        var life = $('#accordingToBill_life').val();

        if (register <= 0 || register == null) {
            //alert('請輸入申貸金額');
            alertString = alertString + "\n請輸入申貸金額";
            res = false;
        }
    } else if (loanChoiced == 2) {
        var sum = $('#freedom_sum').val();
        var books = $('#freedom_book').val();
        var life = $('#freedom_life');
    }

    if (sum <= 0) {
        alert("請輸入大於0之整數\n如果疑問，請洽本行客服專線\n提醒您!可先點下方「儲存」按鈕，儲存本次填寫資料，下次使用本功能將預設帶入已填寫資料");
        res = false;
    } else {
        loanHidden.val(sum);
    }

    if (sSelectValue == '2') { //高中
        if (books > 1000) {
            //alert("書籍費不可大於1000");
            alertString = alertString + "\n書籍費不可大於1000";
            res = false;
        }
        if (sum > 300000) {
            //alert("申貸金額不可大於300,000");
            alertString = alertString + "\n申貸金額不可大於300,000";
            res = false;
        }
    } else { //非高中
        if (books > 3000) {
            //alert("書籍費不可大於3000");
            alertString = alertString + "\n書籍費不可大於3000";
            res = false;
        }
        if (sSelectValue == '1') {
            if (sum > 1500000) {
                //alert("申貸金額不可大於1,500,000");
                alertString = alertString + "\n申貸金額不可大於1,500,000";
                res = false;
            }
        } else {
            if (sum > 800000) {
                //alert("申貸金額不可大於800,000");
                alertString = alertString + "\n申貸金額不可大於800,000";
                res = false;
            }
        }
    }

    if (life > 30000) {
        //alert("生活費不可大於30,000");
        alertString = alertString + "\n生活費不可大於30,000";
        res = false;
    }



    if (res == true) {
        return true;
    } else {
        alert(alertString);
        return false;
    }
}

function apply4_1_valid() {
    //Foolproof
    return true;
}

function apply4_2_valid() {
    //Foolproof
    var tSelected = $('[name="timeSelected"]').val();
    if (tSelected == '') {
        alert("請選擇預約分行、日期及時間");
        return false;
    } else if (tSelected != '') {
        return true;
    }
}

function apply5_1_1_valid() {
    //Foolproof
    return true;
}

function apply5_1_2_valid() {
    //Foolproof
    return true;
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
    var domicileCityId = content.domicileAddress.cityId;
    var domicileZipCode = content.domicileAddress.zipCode;
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
    var domiLinerName = content.domicileAddress.linerName;
    var lName = content.teleAddress.linerName;

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

    //hidden
    $('[name="id"]').val(id);
    $('[name="name"]').val(name);
    $('[name="birthday"]').val(birthday);

    userId.text(id);
    userName.text(name);
    userBirthday.text(birthday);
    userMobile.val(mobile);
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

    //抓結婚狀況的預設(radio)
    if (content.marryStatus == 'Y') {
        userMarry.attr('checked', true);
        userSingle.attr('checked', false);
        marryHidden.val('Y');
    } else if (content.marryStatus == 'N' || content.marryStatus == '') {
        marryHidden.val('N');
    }

    //加上readonly
    if (isRecord == 'Y') { //續貸
        dNeighborhood.attr("readonly", true);
        dAddress.attr("readonly", true);
        domicileCitySelect.attr("disabled", true);
        domicileZipSelect.attr("disabled", true);
        domicileLinerSelect.attr("disabled", true);
        userMobile.attr("readonly", true);
        dLinerName.attr("readonly", true);
    }

    //點選結婚狀況的radio
    userSingle.on('click', function() {
        marryHidden.val('N');
    });
    userMarry.on('click', function() {
        marryHidden.val('Y');
    });

    //地址(下拉式選單)
    var jsonCity = modal.getCity();
    console.debug(jsonCity);
    cityArr = jsonCity.cities;
    var cityArray = [];
    cityArray.push('<option value="">請選擇</option>');

    $.each(cityArr, function(i, cityData) {
        cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });

    citySelect.append(cityArray.join(''));
    domicileCitySelect.append(cityArray.join(''));

    //若有撈到使用者的地址（city, zip）,則顯示
    //
    //戶籍地址
    if (domicileCityId !== '') { //顯示city
        domicileCitySelect.find('option[value="' + domicileCityId + '"]').prop('selected', 'true');
        domiCityIdHidden.val(domicileCityId);
        if (domicileZipCode !== '') { //顯示zip
            var jsonZip = modal.getZip(domicileCityId);
            var zipArr = jsonZip.zipcodes;
            var zipArray = [];
            zipArray.push('<option value="">請選擇</option>');
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
                linerArray.push('<option value="">請選擇</option>');
                $.each(linerArr, function(i, linerData) {
                    linerArray.push('<option value=' + linerData.linerId + '>' + linerData.linerName + '</option>');
                });

                domicileLinerSelect.empty();
                domicileLinerSelect.append(linerArray.join(''));
                domicileLinerSelect.selectpicker('refresh');
                domicileLinerSelect.find('option[value="' + domicileLiner + '"]').prop('selected', 'true');
                domicileLinerSelect.find('option[value="' + domicileLiner + '"]').trigger('change');
                domiLinerHidden.val(domicileLiner);
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
            $.each(zipArr, function(i, zipData) {
                zipArray.push('<option value=' + zipData.zipcode + '>' + zipData.areaName + '</option>');
            });

            zipSelect.empty();
            zipSelect.append(zipArray.join(''));
            zipSelect.selectpicker('refresh');
            zipSelect.find('option[value="' + zipCode + '"]').prop('selected', 'true');
            zipSelect.find('option[value="' + zipCode + '"]').trigger('change');
            teleZipCodeHidden.val(zipCode);

            if (liner !== '') { //顯示liner

                var jsonLiner = modal.getLiner(zipCode);
                console.debug(jsonLiner);
                var linerArr = jsonLiner.liners;
                console.debug(linerArr);
                var linerArray = [];
                linerArray.push('<option value="">請選擇</option>');
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

    citySelect.selectpicker('refresh');
    domicileCitySelect.selectpicker('refresh');

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
        'toInput': 'liner',
        'callback': function(select) {
            console.debug('3:' + select.val());
            select.selectpicker('refresh');
            select.trigger('change');
        }
    }, {
        'srcInput': 'DomicileNeighborhood',
        'toInput': 'neighborhood',
        'callback': function(select) {
            //select.selectpicker('refresh');
        }
    }, {
        'srcInput': 'DomicileAddress',
        'toInput': 'address',
        'callback': function(select) {
            //select.selectpicker('refresh');
        }
    }, {
        'srcInput': 'domicileLinerName',
        'toInput': 'linerName',
        'callback': function(select) {
            //select.selectpicker('refresh');
        }
    }];

    //勾選'同戶籍地'
    $('#add').change(function() {
        if (this.checked) {
            console.debug('check');
            $.each(changeObj, function(i, obj) {
                var src = $('[name="' + obj.srcInput + '"]').val();
                var to = $('[name="' + obj.toInput + '"]');
                var tagName = to.prop('tagName').toLowerCase();

                console.debug(obj.srcInput + ':' + src + '=' + obj.toInput + ':' + to.val());

                to.val(src);

                console.debug(obj.srcInput + ':' + src + '=' + obj.toInput + ':' + to.val());

                if (obj.callback !== undefined) {
                    obj.callback.apply(window, [to]);
                }
            });
        }
    });
}

function apply1_2(content) {
    console.debug(content);

    userMarried = content.marryStatus;
    var today = new Date();
    var userBirthday = content.birthday;
    if (userBirthday.length == 6) {
        var userYear = userBirthday.substr(0, 2);
        userYear = parseInt(userYear) + 1911;
    } else if (userBirthday.length == 7) {
        var userYear = userBirthday.substr(0, 3);
        userYear = parseInt(userYear) + 1911;
    }

    var adultHidden = $('[name = "applicantAdult"]');
    var userMarriedHidden = $('[name = "userMarriedHidden"]');
    userMarriedHidden.val(userMarried);
    var userMonth = parseInt(userBirthday.substr(2, 2));
    var userDay = parseInt(userBirthday.substr(4, 2));
    var level1 = content.familyStatusLevel1;
    var level2 = content.familyStatusLevel2;
    preLevel1 = content.familyStatusLevel1;
    preLevel2 = content.familyStatusLevel2;

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
        if (today.getMonth() - userMonth > 0) {
            //成年
            isAdult = true;
        } else if (today.getMonth() - userMonth < 0) {
            //未成年
            isAdult = false;
        } else if (today.getMonth() - userMonth == 0) {
            if (today.getDay() - userDay >= 0) {
                //成年
                isAdult = true;
            } else if (today.getDay() - userDay < 0) {
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
        $('#marriage').on('click', function() {
            $('.sub').hide();
            $('#marriageSub').show();
            $('[name="familyStatusLevel1"]').val('');
            $('[name="familyStatusLevel2"]').val('');
        });

        $('#divorce').on('click', function() {
            $('.sub').hide();
            $('#divorceSub').show();
            $('[name="familyStatusLevel1"]').val('');
            $('[name="familyStatusLevel2"]').val('');
        });

        $('#passAway_one').on('click', function() {
            status9.text(guarantor2);
            status10.text(guarantor3);

            $('.sub').hide();
            $('#passAway_oneSub').show();
            $('[name="familyStatusLevel1"]').val('');
            $('[name="familyStatusLevel2"]').val('');
        });

        $('#passAway_both').on('click', function() {
            $('.sub').hide();

        });

    } else if (userMarried == 'Y') {
        //已婚
        $('.unMarried').hide();

        //Level 1 選項被點選時
        $('#spouse_national').on('click', function() {
            status13.text(guarantor7);
            status14.text(guarantor2);
            status15.text(guarantor3);
            status16.text(guarantor4);

            $('.sub').hide();
            $('#spouse_nationalSub').show();
            $('[name="familyStatusLevel1"]').val('');
            $('[name="familyStatusLevel2"]').val('');
        });

        $('#spouse_foreigner').on('click', function() {
            status17.text(guarantor2);
            status18.text(guarantor3);
            status19.text(guarantor4);

            $('.sub').hide();
            $('#spouse_foreignerSub').show();
            $('[name="familyStatusLevel1"]').val('');
            $('[name="familyStatusLevel2"]').val('');
        });

        $('#spouse_divorce').on('click', function() {
            status20.text(guarantor2);
            status21.text(guarantor3);
            status22.text(guarantor4);
            $('.sub').hide();
            $('#spouse_divorceSub').show();
            $('[name="familyStatusLevel1"]').val('');
            $('[name="familyStatusLevel2"]').val('');
        });

        $('#spouse_passAway').on('click', function() {
            status23.text(guarantor2);
            status24.text(guarantor3);
            status25.text(guarantor4);

            $('.sub').hide();
            $('#spouse_passAwaySub').show();
            $('[name="familyStatusLevel1"]').val('');
            $('[name="familyStatusLevel2"]').val('');
        });
    }

    //帶預設值點選radio
    if (level2 != '') {

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
    }
    if (level2 == '') {
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
            console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        });
        $('#divorceSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 2, pickedOption);
            console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        });
        $('#passAway_oneSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 3, pickedOption);
            console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        });
        $('#passAway_both').on('click', function() {
            var pickedOption;
            clickLevel2Option(userMarried, isAdult, 4, pickedOption);
            console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        });
    } else if (isAdult === true) {
        //成年
        $('#marriageSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 1, pickedOption);
            console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        });
        $('#divorceSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 2, pickedOption);
            console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        });
        $('#passAway_oneSub').find('input').on('click', function() {
            var pickedOption = $(this).attr('id').substr(-1);
            clickLevel2Option(userMarried, isAdult, 3, pickedOption);
            console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        });
        $('#passAway_both').on('click', function() {
            var pickedOption;
            clickLevel2Option(userMarried, isAdult, 4, pickedOption);
            console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        });
    }
    //
    //已婚時的選項
    $('#spouse_nationalSub').find('input').on('click', function() {
        var pickedOption = $(this).attr('id').substr(-1);
        clickLevel2Option(userMarried, isAdult, 1, pickedOption);
        console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        console.debug(content.familyStatusLevel1 + '/' + content.familyStatusLevel2);
    });
    $('#spouse_foreignerSub').find('input').on('click', function() {
        var pickedOption = $(this).attr('id').substr(-1);
        clickLevel2Option(userMarried, isAdult, 2, pickedOption);
        console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        console.debug(content.familyStatusLevel1 + '/' + content.familyStatusLevel2);
    });
    $('#spouse_divorceSub').find('input').on('click', function() {
        var pickedOption = $(this).attr('id').substr(-1);
        clickLevel2Option(userMarried, isAdult, 3, pickedOption);
        console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        console.debug(content.familyStatusLevel1 + '/' + content.familyStatusLevel2);
    });
    $('#spouse_passAwaySub').find('input').on('click', function() {
        var pickedOption = $(this).attr('id').substr(-1);
        clickLevel2Option(userMarried, isAdult, 4, pickedOption);
        console.debug("familyStatus:" + familyStatus + "/guarantorStatus:" + guarantorStatus);
        console.debug(content.familyStatusLevel1 + '/' + content.familyStatusLevel2);
    });
}

function apply2(content) {
    //取得step1-2的選取狀況,以長出需要的畫面
    showInfo = $('[name="showInfo"]');
    isGuarantor = $('[name="isGuarantor"]');
    isIncomeTax = $('[name="isIncomeTax"]');

    //hidden
    var father_domiLinerHidden = $('[name="father_domiLinerHidden"]');
    var father_domiCityIdHidden = $('[name="father_domiCityIdHidden"]');
    var father_domiZipCoodeHidden = $('[name="father_domiZipCoodeHidden"]');
    var father_teleLinerHidden = $('[name="father_teleLinerHidden"]');
    var father_teleZipCodeHidden = $('[name="father_teleZipCodeHidden"]');
    var father_teleCityIdHidden = $('[name="father_teleCityIdHidden"]');
    var mother_domiLinerHidden = $('[name="mother_domiLinerHidden"]');
    var mother_domiCityIdHidden = $('[name="mother_domiCityIdHidden"]');
    var mother_domiZipCoodeHidden = $('[name="mother_domiZipCoodeHidden"]');
    var mother_teleLinerHidden = $('[name="mother_teleLinerHidden"]');
    var mother_teleZipCodeHidden = $('[name="mother_teleZipcodeHidden"]');
    var mother_teleCityIdHidden = $('[name="mother_teleCityIdHidden"]');
    var thirdParty_domiLinerHidden = $('[name="thirdParty_domiLinerHidden"]');
    var thirdParty_domiCityIdHidden = $('[name="thirdParty_domiCityIdHidden"]');
    var thirdParty_domiZipCoodeHidden = $('[name="thirdParty_domiZipCoodeHidden"]');
    var thirdParty_teleLinerHidden = $('[name="thirdParty_teleLinerHidden"]');
    var thirdParty_teleZipCodeHidden = $('[name="thirdParty_teleZipcodeHidden"]');
    var thirdParty_teleCityIdHidden = $('[name="thirdParty_teleCityIdHidden"]');
    var spouse_omiLinerHidden = $('[name="spouse_domiLinerHidden"]');
    var spouse_domiCityIdHidden = $('[name="spouse_domiCityIdHidden"]');
    var spouse_domiZipCoodeHidden = $('[name="spouse_domiZipCoodeHidden"]');
    var spouse_teleLinerHidden = $('[name="spouse_teleLinerHidden"]');
    var spouse_teleZipCodeHidden = $('[name="spouse_teleZipcodeHidden"]');
    var spouse_teleCityIdHidden = $('[name="spouse_teleCityIdHidden"]');

    var showInfoTemp;
    var fDomiSelect = $('[name="father_cityId_domi"]');
    var fSelect = $('[name="father_cityId"]');
    var mDomiSelect = $('[name="mother_cityId_domi"]');
    var mSelect = $('[name="mother_cityId"]');
    var tDomiSelect = $('[name="thirdParty_cityId_domi"]');
    var tSelect = $('[name="thirdParty_cityId"]');
    var sDomiSelect = $('[name="spouse_cityId_domi"]');
    var sSelect = $('[name="spouse_cityId"]');
    var fDomiZipSelect = $('[name="father_zipCode_domi"]');
    var fZipSelect = $('[name="father_zipCode"]');
    var mDomiZipSelect = $('[name="mother_zipCode_domi"]');
    var mZipSelect = $('[name="mother_zipCode"]');
    var tDomiZipSelect = $('[name="thirdParty_zipCode_domi"]');
    var tZipSelect = $('[name="thirdParty_zipCode"]');
    var sDomiZipSelect = $('[name="spouse_zipCode_domi"]');
    var sZipSelect = $('[name="spouse_zipCode"]');
    var fDomiLinerSelect = $('[name="father_liner_domi"]');
    var fLinerSelect = $('[name="father_liner"]');
    var mDomiLinerSelect = $('[name="mother_liner_domi"]');
    var mLinerSelect = $('[name="mother_liner"]');
    var tDomiLinerSelect = $('[name="thirdParty_liner_domi"]');
    var tLinerSelect = $('[name="thirdParty_liner"]');
    var sDomiLinerSelect = $('[name="spouse_liner_domi"]');
    var sLinerSelect = $('[name="spouse_liner"]');
    var applicantAdult = content.applicantAdult;
    var isChange = content.isChange;
    var isRecord = content.isRecord;
    fatherDiv = $('#father');
    motherDiv = $('#mother');
    thirdPartyDiv = $('#thirdParty');
    spouseDiv = $('#spouse');
    guarantorText = '';
    guarantorTextTemp = '';
    familyStatus = content.familyStatus;
    console.debug('familyStatus:' + familyStatus);
    guarantorStatus = content.guarantorStatus;
    console.debug('guarantorStatus:' + guarantorStatus);
    incomeTax = content.incomeTax;
    //incomeTax = '1000';
    console.debug('incomeTax:' + incomeTax);

    showInfo.val(familyStatus);
    isGuarantor.val(guarantorStatus);
    isIncomeTax.val(incomeTax);

    getFamilyAddrToSelector('father');
    getFamilyAddrToSelector('mother');
    getFamilyAddrToSelector('thirdParty');
    getFamilyAddrToSelector('spouse');

    console.debug(applicantAdult);

	//依照是否成本/家庭狀況/保證人/合計收入對象顯示不同欄位
    showFamilyInformation(applicantAdult, familyStatus, guarantorStatus, incomeTax);

    linkage.changeDomicileZipByCity(fDomiSelect, cityArr, fDomiZipSelect);
    linkage.changeDomicileLinerByZip(fDomiZipSelect, zipArr, fDomiLinerSelect);

    linkage.changeZipByCity(fSelect, cityArr, fZipSelect);
    linkage.changeLinerByZip(fZipSelect, zipArr, fLinerSelect);

    linkage.changeDomicileZipByCity(mDomiSelect, cityArr, mDomiZipSelect);
    linkage.changeDomicileLinerByZip(mDomiZipSelect, zipArr, mDomiLinerSelect);

    linkage.changeZipByCity(mSelect, cityArr, mZipSelect);
    linkage.changeLinerByZip(mZipSelect, zipArr, mLinerSelect);

    linkage.changeDomicileZipByCity(tDomiSelect, cityArr, tDomiZipSelect);
    linkage.changeDomicileLinerByZip(tDomiZipSelect, zipArr, tDomiLinerSelect);

    linkage.changeZipByCity(tSelect, cityArr, tZipSelect);
    linkage.changeLinerByZip(tZipSelect, zipArr, tLinerSelect);

    linkage.changeDomicileZipByCity(sDomiSelect, cityArr, sDomiZipSelect);
    linkage.changeDomicileLinerByZip(sDomiZipSelect, zipArr, sDomiLinerSelect);

    linkage.changeZipByCity(sSelect, cityArr, sZipSelect);
    linkage.changeLinerByZip(sZipSelect, zipArr, sLinerSelect);

    if (isChange != 'Y') {
        if (isRecord == 'Y') {
            for (var i = 0; i <= 3; i++) {
                switch (i) {
                    case 0:
                        family = 'father_';
                        addReadonly(family);
                        fDomiSelect.attr("disabled", true);
                        fDomiZipSelect.attr("disabled", true);
                        fDomiLinerSelect.attr("disabled", true);
                        break;
                    case 1:
                        family = 'mother_';
                        addReadonly(family);
                        mDomiSelect.attr("disabled", true);
                        mDomiZipSelect.attr("disabled", true);
                        mDomiLinerSelect.attr("disabled", true);
                        break;
                    case 2:
                        family = 'thirdParty_';
                        addReadonly(family);
                        tDomiSelect.attr("disabled", true);
                        tDomiZipSelect.attr("disabled", true);
                        tDomiLinerSelect.attr("disabled", true);
                        break;
                    case 3:
                        family = 'spouse_';
                        addReadonly(family);
                        sDomiSelect.attr("disabled", true);
                        sDomiZipSelect.attr("disabled", true);
                        sDomiLinerSelect.attr("disabled", true);
                        break;
                }
            }
        }
    }

    //更新hidden的值(未成年的radio: 若選"是"則顯示div,且為連帶保證人, 反之亦然)
    $('#father input[name="father_purchaser"]').on('click', function() {
        var picked = $(this).attr('id').substr(-1);
        showInfoTemp = '1000';
        if (picked == 'T') {
            $('#father div[class="joy finp"]').show();
            guarantorTextTemp = guarantorText;
            guarantorText = guarantorText + '父親 ';
            $('form input[name="guarantorText"]').val(guarantorText);
            updateFamilyStatus(showInfoTemp, -4);
            modal.getFamilyInfo('father', function(fatherInfo) {
                setInfoValue(fatherInfo, fatherDiv);
                //setInfoText(fatherInfo, fatherDiv);
            });
        } else if (picked == 'F') {
            $('#father div[class="joy finp"]').hide();
            guarantorText = guarantorTextTemp;
            $('form input[name="guarantorText"]').val(guarantorText);
            restoreFamilyStatus(showInfoTemp, -4);
        }
    });
    $('#mother input[name="mother_purchaser"]').on('click', function() {
        var picked = $(this).attr('id').substr(-1);
        showInfoTemp = '0100';
        if (picked == 'T') {
            $('#mother div[class="joy finp"]').show();
            guarantorTextTemp = guarantorText;
            guarantorText = guarantorText + '母親 ';
            $('form input[name="guarantorText"]').val(guarantorText);
            updateFamilyStatus(showInfoTemp, -3);
            modal.getFamilyInfo('mother', function(motherInfo) {
                setInfoValue(motherInfo, motherDiv);
                //setInfoText(motherInfo, motherDiv);
            });
        } else if (picked == 'F') {
            $('#mother div[class="joy finp"]').hide();
            guarantorText = guarantorTextTemp;
            $('form input[name="guarantorText"]').val(guarantorText);
            restoreFamilyStatus(showInfoTemp, -3);
        }
    });
    $('#thirdParty input[name="thirdParty_purchaser"]').on('click', function() {
        var picked = $(this).attr('id').substr(-1);
        showInfoTemp = '0010';
        if (picked == 'T') {
            $('#thirdParty div[class="joy finp"]').show();
            guarantorTextTemp = guarantorText;
            guarantorText = guarantorTextTemp + '第三人 ';
            $('form input[name="guarantorText"]').val(guarantorText);
            updateFamilyStatus(showInfoTemp, -2);
            modal.getFamilyInfo('thirdParty', function(thirdPartyInfo) {
                setInfoValue(thirdPartyInfo, thirdPartyDiv);
                //setInfoText(thirdPartyInfo, thirdPartyDiv);
            });
        } else if (picked == 'F') {
            $('#thirdParty div[class="joy finp"]').hide();
            guarantorText = guarantorTextTemp;
            $('form input[name="guarantorText"]').val(guarantorText);
            restoreFamilyStatus(showInfoTemp, -2);
        }
    });
    $('#spouse input[name="spouse_purchaser"]').on('click', function() {
        var picked = $(this).attr('id').substr(-1);
        showInfoTemp = '0001';
        if (picked == 'T') {
            $('#spouse div[class="joy finp"]').show();
            guarantorTextTemp = guarantorText;
            guarantorText = guarantorText + '配偶 ';
            $('form input[name="guarantorText"]').val(guarantorText);
            updateFamilyStatus(showInfoTemp, -1);
            modal.getFamilyInfo('spouse', function(spouseInfo) {
                setInfoValue(spouseInfo, spouseDiv);
                //setInfoText(spouseInfo, spouseDiv);
            });
        } else if (picked == 'F') {
            $('#spouse div[class="joy finp"]').hide();
            guarantorText = guarantorTextTemp;
            $('form input[name="guarantorText"]').val(guarantorText);
            restoreFamilyStatus(showInfoTemp, -1);
        }
    });

    //更新hidden的值(成年的radio:若選"母親"則顯示母親div,且為合計所得對象; 若選父親,則顯示父親div,且為合計所得對象)
    var isFatherTax = incomeTax.substr(0, 1);
    var isMotherTax = incomeTax.substr(1, 1);
    var isFatherShow = familyStatus.substr(0, 1);
    var isMotherShow = familyStatus.substr(1, 1);

    //點選父親是合計所得對象後的動作
    $('#incomeTaxFather').on('click', function() {
        if ($("#incomeTaxFather").prop("checked") === true) {
            $('#father div[class="joy finp"]').show();
            if (isFatherTax != '1') {
                incomeTax = parseInt(incomeTax) + 1000;
                isFatherTax = '1';
            }
        } else if ($("#incomeTaxFather").prop("checked") === false) {
            if (isFatherTax != '0') {
                incomeTax = parseInt(incomeTax) - 1000;
                incomeTax = incomeTax.toString();

                while (incomeTax.length <= 3) {
                    incomeTax = '0' + incomeTax;
                }
                isFatherTax = '0';
            }
            if (isFatherShow != '1') {
                $('#father div[class="joy finp"]').hide();
            }
        }
        isIncomeTax.val(incomeTax);
    });
    //點選母親是合計所得對象後的動作
    $('#incomeTaxMother').on('click', function() {
        if ($('#incomeTaxMother').prop("checked") === true) {
            $('#mother div[class="joy finp"]').show();
            if (isMotherTax != '1') {
                incomeTax = parseInt(incomeTax) + 100;
                isMotherTax = '1';
            }
        } else if ($("#incomeTaxMother").prop("checked") === false) {
            if (isMotherTax != '0') {
                incomeTax = parseInt(incomeTax) - 100;
                isMotherTax = '0';
            }
            if (isMotherShow != '1') {
                $('#mother div[class="joy finp"]').hide();
            }
        }
        isIncomeTax.val(incomeTax);
    });

    var changeObj = [{
        'srcInput': 'cityId_domi',
        'toInput': 'cityId',
        'callback': function(select) {
            console.debug('1:' + select.val());
            select.selectpicker('refresh');
            select.trigger('change');
        }
    }, {
        'srcInput': 'zipCode_domi',
        'toInput': 'zipCode',
        'callback': function(select) {
            console.debug('2:' + select.val());
            select.selectpicker('refresh');
            select.trigger('change');

        }
    }, {
        'srcInput': 'liner_domi',
        'toInput': 'liner',
        'callback': function(select) {
            console.debug('3:' + select.val());
            select.selectpicker('refresh');
            select.trigger('change');
        }
    }, {
        'srcInput': 'neighborhood_domi',
        'toInput': 'neighborhood',
        'callback': function(select) {
            //select.selectpicker('refresh');
        }
    }, {
        'srcInput': 'address_domi',
        'toInput': 'address',
        'callback': function(select) {
            //select.selectpicker('refresh');
        }
    }, {
        'srcInput': 'linerName_domi',
        'toInput': 'linerName',
        'callback': function(select) {
            //select.selectpicker('refresh');
        }
    }];

    //勾選'同戶籍地'(father)
    $('#M_address_1_dad').change(function() {
        if (this.checked) {
            console.debug('check');
            sameDomiAddr(changeObj, 'father');
        }
    });

    //勾選'同戶籍地'(mother)
    $('#M_address_1_mon').change(function() {
        if (this.checked) {
            console.debug('check');
            sameDomiAddr(changeObj, 'mother');
        }
    });

    //勾選'同戶籍地'(thirdParty)
    $('#M_address_1_third').change(function() {
        if (this.checked) {
            console.debug('check');
            sameDomiAddr(changeObj, 'thirdParty');
        }
    });

    //勾選'同戶籍地'(spouse)
    $('#M_address_1_sp').change(function() {
        if (this.checked) {
            console.debug('check');
            sameDomiAddr(changeObj, 'spouse');
        }
    });

    var dAddr = content.domicileAddress.address;
    var dNei = content.domicileAddress.neighborhood;
    var dLinerName = content.domicileAddress.linerName;
    var tAddr = content.teleAddress.address;
    var tNei = content.teleAddress.neighborhood;
    var tLinerName = content.teleAddress.linerName;

    //勾選'同申請人戶籍地'(father)
    $('#R_address_1_dad').change(function() {
        if (this.checked) {
            var dCitySelect = $('[name="father_cityId_domi"]');
            var dZipSelect = $('[name="father_zipCode_domi"]');
            var dlinerSelect = $('[name="father_liner_domi"]');
            sameDomiAddrWithApp(content, dCitySelect, dZipSelect, dlinerSelect);
            var toNei = $('[name="father_neighborhood_domi"]');
            toNei.val(dNei);
            var toAddr = $('[name="father_address_domi"]');
            toAddr.val(dAddr);
            var tolinerName = $('[name="father_linerName_domi"]');
            tolinerName.val(dLinerName);
        }
    });

    //勾選'同申請人戶籍地'(mother)
    $('#R_address_1_mon').change(function() {
        if (this.checked) {
            var dCitySelect = $('[name="mother_cityId_domi"]');
            var dZipSelect = $('[name="mother_zipCode_domi"]');
            var dlinerSelect = $('[name="mother_liner_domi"]');
            sameDomiAddrWithApp(content, dCitySelect, dZipSelect, dlinerSelect);
            var toNei = $('[name="mother_neighborhood_domi"]');
            toNei.val(dNei);
            var toAddr = $('[name="mother_address_domi"]');
            toAddr.val(dAddr);
            var tolinerName = $('[name="mother_linerName_domi"]');
            tolinerName.val(dLinerName);
        }
    });

    //勾選'同申請人戶籍地'(thirdParty)
    $('#R_address_1_third').change(function() {
        if (this.checked) {
            var dCitySelect = $('[name="thirdParty_cityId_domi"]');
            var dZipSelect = $('[name="thirdParty_zipCode_domi"]');
            var dlinerSelect = $('[name="thirdParty_liner_domi"]');
            sameDomiAddrWithApp(content, dCitySelect, dZipSelect, dlinerSelect);
            var toNei = $('[name="thirdParty_neighborhood_domi"]');
            toNei.val(dNei);
            var toAddr = $('[name="thirdParty_address_domi"]');
            toAddr.val(dAddr);
            var tolinerName = $('[name="thirdParty_linerName_domi"]');
            tolinerName.val(dLinerName);
        }
    });

    //勾選'同申請人戶籍地'(spouse)
    $('#R_address_1_sp').change(function() {
        if (this.checked) {
            var dCitySelect = $('[name="spouse_cityId_domi"]');
            var dZipSelect = $('[name="spouse_zipCode_domi"]');
            var dlinerSelect = $('[name="spouse_liner_domi"]');
            sameDomiAddrWithApp(content, dCitySelect, dZipSelect, dlinerSelect);
            var toNei = $('[name="spouse_neighborhood_domi"]');
            toNei.val(dNei);
            var toAddr = $('[name="spouse_address_domi"]');
            toAddr.val(dAddr);
            var tolinerName = $('[name="spouse_linerName_domi"]');
            tolinerName.val(dLinerName);
        }
    });

    //勾選'同申請人通訊地'(father)
    $('#R_address_2_dad').change(function() {
        if (this.checked) {
            var citySelect = $('[name="father_cityId_domi"]');
            var zipSelect = $('[name="father_zipCode_domi"]');
            var linerSelect = $('[name="father_liner_domi"]');
            sameAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="father_neighborhood_domi"]');
            toNei.val(tNei);
            var toAddr = $('[name="father_address_domi"]');
            toAddr.val(tAddr);
            var tolinerName = $('[name="father_linerName_domi"]');
            tolinerName.val(tLinerName);
        }
    });

    //勾選'同申請人通訊地'(mother)
    $('#R_address_2_mon').change(function() {
        if (this.checked) {
            var citySelect = $('[name="mother_cityId_domi"]');
            var zipSelect = $('[name="mother_zipCode_domi"]');
            var linerSelect = $('[name="mother_liner_domi"]');
            sameAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="mother_neighborhood_domi"]');
            toNei.val(tNei);
            var toAddr = $('[name="mother_address_domi"]');
            toAddr.val(tAddr);
            var tolinerName = $('[name="mother_linerName_domi"]');
            tolinerName.val(tLinerName);
        }
    });

    //勾選'同申請人通訊地'(thirdParty)
    $('#R_address_2_third').change(function() {
        if (this.checked) {
            var citySelect = $('[name="thirdParty_cityId_domi"]');
            var zipSelect = $('[name="thirdParty_zipCode_domi"]');
            var linerSelect = $('[name="thirdParty_liner_domi"]');
            sameAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="thirdParty_neighborhood_domi"]');
            toNei.val(tNei);
            var toAddr = $('[name="thirdParty_address_domi"]');
            toAddr.val(tAddr);
            var tolinerName = $('[name="thirdParty_linerName_domi"]');
            tolinerName.val(tLinerName);
        }
    });

    //勾選'同申請人通訊地'(spouse)
    $('#R_address_2_sp').change(function() {
        if (this.checked) {
            var citySelect = $('[name="spouse_cityId_domi"]');
            var zipSelect = $('[name="spouse_zipCode_domi"]');
            var linerSelect = $('[name="spouse_liner_domi"]');
            sameAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="spouse_neighborhood_domi"]');
            toNei.val(tNei);
            var toAddr = $('[name="spouse_address_domi"]');
            toAddr.val(tAddr);
            var tolinerName = $('[name="spouse_linerName_domi"]');
            tolinerName.val(tLinerName);
        }
    });

    //勾選'同申請人戶籍地'(father)
    $('#M_address_2_dad').change(function() {
        if (this.checked) {
            var citySelect = $('[name="father_cityId"]');
            var zipSelect = $('[name="father_zipCode"]');
            var linerSelect = $('[name="father_liner"]');
            sameDomiAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="father_neighborhood"]');
            toNei.val(dNei);
            var toAddr = $('[name="father_address"]');
            toAddr.val(dAddr);
        }
    });

    //勾選'同申請人戶籍地'(mother)
    $('#M_address_2_mon').change(function() {
        if (this.checked) {
            var citySelect = $('[name="mother_cityId"]');
            var zipSelect = $('[name="mother_zipCode"]');
            var linerSelect = $('[name="mother_liner"]');
            sameDomiAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="mother_neighborhood"]');
            toNei.val(dNei);
            var toAddr = $('[name="mother_address"]');
            toAddr.val(dAddr);
        }
    });

    //勾選'同申請人戶籍地'(thirdParty)
    $('#M_address_2_third').change(function() {
        if (this.checked) {
            var citySelect = $('[name="thirdParty_cityId"]');
            var zipSelect = $('[name="thirdParty_zipCode"]');
            var linerSelect = $('[name="thirdParty_liner"]');
            sameDomiAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="thirdParty_neighborhood"]');
            toNei.val(dNei);
            var toAddr = $('[name="thirdParty_address"]');
            toAddr.val(dAddr);
        }
    });

    //勾選'同申請人戶籍地'(spouse)
    $('#M_address_2_sp').change(function() {
        if (this.checked) {
            var citySelect = $('[name="spouse_cityId"]');
            var zipSelect = $('[name="spouse_zipCode"]');
            var linerSelect = $('[name="spouse_liner"]');
            sameDomiAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="spouse_neighborhood"]');
            toNei.val(dNei);
            var toAddr = $('[name="spouse_address"]');
            toAddr.val(dAddr);
        }
    });

    //勾選'同申請人通訊地'(father)
    $('#M_address_3_dad').change(function() {
        if (this.checked) {
            var citySelect = $('[name="father_cityId"]');
            var zipSelect = $('[name="father_zipCode"]');
            var linerSelect = $('[name="father_liner"]');
            sameAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="father_neighborhood"]');
            toNei.val(tNei);
            var toAddr = $('[name="father_address"]');
            toAddr.val(tAddr);
        }
    });

    //勾選'同申請人通訊地'(mother)
    $('#M_address_3_mon').change(function() {
        if (this.checked) {
            var citySelect = $('[name="mother_cityId"]');
            var zipSelect = $('[name="mother_zipCode"]');
            var linerSelect = $('[name="mother_liner"]');
            sameAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="mother_neighborhood"]');
            toNei.val(tNei);
            var toAddr = $('[name="mother_address"]');
            toAddr.val(tAddr);
        }
    });

    //勾選'同申請人通訊地'(thirdParty)
    $('#M_address_3_third').change(function() {
        if (this.checked) {
            var citySelect = $('[name="thirdParty_cityId"]');
            var zipSelect = $('[name="thirdParty_zipCode"]');
            var linerSelect = $('[name="thirdParty_liner"]');
            sameAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="thirdParty_neighborhood"]');
            toNei.val(tNei);
            var toAddr = $('[name="thirdParty_address"]');
            toAddr.val(tAddr);
        }
    });

    //勾選'同申請人通訊地'(spouse)
    $('#M_address_3_sp').change(function() {
        if (this.checked) {
            var citySelect = $('[name="spouse_cityId"]');
            var zipSelect = $('[name="spouse_zipCode"]');
            var linerSelect = $('[name="spouse_liner"]');
            sameAddrWithApp(content, citySelect, zipSelect, linerSelect);
            var toNei = $('[name="spouse_neighborhood"]');
            toNei.val(tNei);
            var toAddr = $('[name="spouse_address"]');
            toAddr.val(tAddr);

        }
    });

    $('form input[name="guarantorText"]').val(guarantorText);


}

function addReadonly(family) {
    var readonlyId = $('[name="' + family + 'id"]');
    var readonlyName = $('[name="' + family + 'name"]');
    var readonlyYear = $('[name="' + family + 'birthday0"]');
    var readonlyMonth = $('[name="' + family + 'birthday4"]');
    var readonlyDay = $('[name="' + family + 'neighborhood_domi"]');
    var readonlyNei = $('[name="' + family + 'neighborhood_domi"]');
    var readonlyAddr = $('[name="' + family + 'address_domi"]');

    readonlyId.attr("readonly", true);
    readonlyName.attr("readonly", true);
    readonlyYear.attr("readonly", true);
    readonlyMonth.attr("readonly", true);
    readonlyDay.attr("readonly", true);
    readonlyNei.attr("readonly", true);
    readonlyAddr.attr("readonly", true);
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

    dCitySelect.find('option[value="' + dCityId + '"]').prop('selected', 'true');
    dCitySelect.find('option[value="' + dCityId + '"]').trigger('change');
    console.debug(dCitySelect.length);
    console.debug(dZipSelect.length);
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
    dZipSelect.find('option[value="' + dZipCode + '"]').prop('selected', 'true');
    dZipSelect.find('option[value="' + dZipCode + '"]').trigger('change');

    //顯示liner
    var jLiner = modal.getLiner(dZipCode);
    var lArr = jLiner.liners;
    var lArray = [];
    $.each(lArr, function(i, linerData) {
        lArray.push('<option value=' + linerData.linerId + '>' + linerData.linerName + '</option>');
    });

    dlinerSelect.empty();
    dlinerSelect.append(lArray.join(''));
    dlinerSelect.selectpicker('refresh');
    dlinerSelect.find('option[value="' + dLiner + '"]').prop('selected', 'true');
    dlinerSelect.find('option[value="' + dLiner + '"]').trigger('change');
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

function updateFamilyStatus(showInfoTemp, sub) {
    var familySub = showInfo.val().substr(sub, 1);
    var guarantorSub = isGuarantor.val().substr(sub, 1);
    var update = parseInt(showInfoTemp);
    var family = parseInt(showInfo.val());
    var guarantor = parseInt(isGuarantor.val());
    var mul = 1;

    if (familySub == 2) {
        family = family - (mul * update);
    } else if (familySub == 0) {
        family = family + (mul * update);
    }

    if (guarantorSub == 3) {
        guarantor = guarantor - (2 * mul * update);
    } else if (guarantorSub == 2) {
        guarantor = guarantor - (mul * update);
    }

    family = family.toString();
    guarantor = guarantor.toString();

    while (family.length <= 3) {
        family = '0' + family;
    }

    while (guarantor.length <= 3) {
        guarantor = '0' + guarantor;
    }

    showInfo.val(family);
    isGuarantor.val(guarantor);
}

function restoreFamilyStatus(showInfoTemp, sub) {
    var familySub = showInfo.val().substr(sub, 1);
    var guarantorSub = isGuarantor.val().substr(sub, 1);
    var update = parseInt(showInfoTemp);
    var family = parseInt(showInfo.val());
    var guarantor = parseInt(isGuarantor.val());
    var mul = 1;

    if (familySub == 2) {
        family = family - (2 * mul * update);
    } else if (familySub == 1) {
        family = family - (mul * update);
    }

    if (guarantorSub == 3) {
        guarantor = guarantor - (mul * update);
    } else if (guarantorSub == 1) {
        guarantor = guarantor + (mul * update);
    }

    family = family.toString();
    guarantor = guarantor.toString();

    while (family.length <= 3) {
        family = '0' + family;
    }

    while (guarantor.length <= 3) {
        guarantor = '0' + guarantor;
    }

    showInfo.val(family);
    isGuarantor.val(guarantor);
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
                        familyStatus = '1100';
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
                        familyStatus = '1100';
                        guarantorStatus = '1100';
                        incomeTax = '1100';
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
                        incomeTax = '1010';
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
                    familyStatus = '1001';
                    guarantorStatus = '1000';
                    incomeTax = '0000';
                    break;
                case '2':
                    familyStatus = '0101';
                    guarantorStatus = '0100';
                    incomeTax = '0000';
                    break;
                case '3':
                    familyStatus = '0011';
                    guarantorStatus = '0010';
                    incomeTax = '0000';
                    break;
            }
        } else if (level1 == 4) {
            switch (level2) {
                case '1':
                    familyStatus = '1001';
                    guarantorStatus = '1000';
                    incomeTax = '0000';
                    break;
                case '2':
                    familyStatus = '0101';
                    guarantorStatus = '0100';
                    incomeTax = '0000';
                    break;
                case '3':
                    familyStatus = '0011';
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

                    }
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
                    div.find('[name="' + inputName + '"]').val(objValue); //通訊電話和通訊地址
                }

            });
        } else { //如果撈到的資料不是物件,就直接塞字串進去
            var inputName = divId + '_' + propName;
            div.find('[name="' + inputName + '"]').val(propValue);

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
        }
    });
}

//塞資料到text裡
function setInfoText(info, div) {
    var divId = div.attr('id'); //每一塊div的id
    var domiPhoneText = '';
    var telePhoneText = '';
    var domiAddrText = '';
    var teleAddrText = '';

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
                /*if (propName == 'domicileAddress') { //戶籍地址
                    if (objName == 'cityId') {
                        domiAddrText = objValue;
                    } else if (objName == 'zipCode') {
                        domiAddrText = domiAddrText + objValue;
                    } else if (objName == 'liner') {
                        domiAddrText = domiAddrText + objValue;
                    } else if (objName == 'neighborhood') {
                        domiAddrText = domiAddrText + objValue + '鄰';
                    } else if (objName == 'address') {
                        domiAddrText = domiAddrText + objValue;
                    }
                    
                    var target = div.find('[name="' + inputName + '_domi"]');
                    var tagName = target.prop('tagName').toLowerCase();
                    if (tagName != 'select') {
                        //div.find('[name="' + inputName + '_domi"]').text(domiAddrText);
                    }
                }*/

                //通訊電話和通訊地址
                if (propName == 'telePhone') { //通訊電話
                    if (objName == 'cityId') {
                        telePhoneText = '(' + objValue + ')';
                    } else if (objName == 'phone') {
                        telePhoneText = telePhoneText + objValue;
                    }
                    div.find('[name="' + inputName + '"]').text(telePhoneText);
                }
                /*if (propName == 'teleAddress') { //通訊地址
                    if (objName == 'regionCode') {
                        teleAddrText = objValue;
                    } else if (objName == 'zipCode') {
                        teleAddrText = teleAddrText + objValue;
                    } else if (objName == 'liner') {
                        teleAddrText = teleAddrText + objValue;
                    } else if (objName == 'neighborhood') {
                        teleAddrText = teleAddrText + objValue + '鄰';
                    } else if (objName == 'address') {
                        teleAddrText = teleAddrText + objValue;
                    }

                    var target = div.find('[name="' + inputName + '"]');
                    var tagName = target.prop('tagName').toLowerCase();
                    if (tagName != 'select') {
                        div.find('[name="' + inputName + '"]').text(teleAddrText);
                    }


                }*/

            });
        } else { //如果撈到的資料不是物件,就直接塞字串進去
            var inputName = divId + '_' + propName;
            div.find('[name="' + inputName + '"]').text(propValue);

            if (propName == 'marryStatus') { //婚姻狀況
                if (propValue == 'Y') {
                    div.find('[name="' + inputName + '"]').text('已婚');
                } else if (propValue == 'N') {
                    div.find('[name="' + inputName + '"]').text('未婚');
                }
            }
        }
    });
}


function apply3_1(content) {
    var studentDiv = $('#student');
    setInfoValue(content, studentDiv);

    var eStage = content.EducationStage;
    var sday = content.school.isDay;
    var sNational = content.school.isNational;
    var sName = content.school.name;
    var gGrade = content.gradeClass.grade;

    /**
    modal.getEducationInfo('student', function(educationInfo) {
        console.debug(educationInfo);
        setInfoValue(educationInfo, studentDiv);
    });
	**/

    //下拉式選單
    //教育階段
    var stageSelect = $('[name="student_educationStage"]');
    var jsonStage = modal.getEducationStage();
    console.debug(jsonStage);
    var stageArr = jsonStage.schooltype3;
    var stageArray = [];

    stageSelect.on('change', function() {
        educationStageId = $(this).val();
    });

    var isNationalSelect = $('[name="student_isNational"]');

    isNationalSelect.on('change', function() {
        nationalId = $(this).val();
    });
    //var jsonIsNational = modal.getIsNational();
    //var isNationalArr = jsonIsNational.schooltype1;
    //var isNationalArray = [];
    stageArray.push('<option value="">請選擇</option>');
    console.debug(stageArr);
    $.each(stageArr, function(i, stageData) {
        console.debug(stageData.typeName);
        stageArray.push('<option value=' + stageData.type + '>' + stageData.typeName + '</option>');
    });

    stageSelect.empty();
    stageSelect.append(stageArray.join(''));
    stageSelect.selectpicker('refresh');

    //.trigger('change');

    var jsonNational = modal.getIsNational();
    console.debug(jsonNational);

    var jsonNationalArr = jsonNational.schooltype1;
    var nationalArray = [];
    console.debug(jsonNationalArr);
    nationalArray.push('<option value="">請選擇</option>');
    $.each(jsonNationalArr, function(i, nationalData) {
        nationalArray.push('<option value=' + nationalData.type + '>' + nationalData.typeName + '</option>');
    });

    isNationalSelect.empty();
    isNationalSelect.append(nationalArray.join(''));
    isNationalSelect.selectpicker('refresh');

    //日/夜間
    var isDaySelect = $('[name="student_isDay"]');
    //var jsonIsDay = modal.getIsDay();
    //console.debug(jsonIsDay);
    //var isDayArr = jsonIsDay.schooltype2;
    //var isDayArray = [];
    var jsonDay = modal.getIsDay();
    var jsonDayArr = jsonDay.schooltype2;
    console.debug(jsonDayArr);
    var dayArray = [];
    console.debug(jsonDayArr);
    dayArray.push('<option value="">請選擇</option>');
    $.each(jsonDayArr, function(i, dayData) {
        dayArray.push('<option value=' + dayData.type + '>' + dayData.typeName + '</option>');
    });

    isDaySelect.empty();
    isDaySelect.append(dayArray.join(''));
    isDaySelect.selectpicker('refresh');

    //學校名稱
    var nameSelect = $('[name="student_name"]');
    var departmentSelect = $('[name="student_department"]');
    var jsonName = modal.getSchoolName();
    var nameArr = jsonName.school;
    var nameArray = [];

    nameArray.push('<option value="">請選擇</option>');
    nameSelect.empty();
    nameSelect.append(nameArray.join(''));
    nameSelect.selectpicker('refresh');

    linkage.changeSchoolName(isDaySelect, isDayArr, nameSelect);

    nameSelect.empty();
    nameSelect.append(nameArray.join(''));
    nameSelect.selectpicker('refresh');


    //科系所
    //departmentSelect.append(nameArray.join(''));
    //linkage.changedepartment(isDaySelect, isDayArr, departmentSelect);

    //年級
    var gradeSelect = $('[name="student_grade"]');
    var jsonGrade = modal.getGrade();
    console.debug(jsonGrade);
    var gradeArr = jsonGrade.grade;
    var gradeArray = [];

    $.each(gradeArr, function(i, gradeData) {
        gradeArray.push('<option value=' + gradeData.gradeId + '>' + gradeData.gradeName + '</option>');
    });

    gradeSelect.append(gradeArray.join(''));
    gradeSelect.selectpicker('refresh');

    //班級
    var student_class = $('[name="student_class"]');
    student_class.on('blur', function() {
        var student_classString = student_class.val();
        if (student_classString.length > 10) {
            alert('班級輸入有誤');
        }
    });

    //學號
    var student_id = $('[name="student_id"]');
    student_id.on('blur', function() {
        var student_idString = student_id.val();
        if (student_idString.length > 10) {
            alert('學號輸入有誤');
        }
    });

    //入學日期
    var student_year_enter = $('[name="student_year_enter"]');
    student_year_enter.on('blur', function() {
        var student_year_enterString = student_year_enter.val();
        if (student_year_enterString.length > 4 || (!isNaN(student_year_enterString)) == false) {
            alert('入學日期錯誤');
        }
    });
    var student_month_enter = $('[name="student_month_enter"]');
    student_month_enter.on('blur', function() {
        var student_month_enterString = student_month_enter.val();
        if (student_month_enterString.length > 3 || (!isNaN(student_month_enterString)) == false) {
            alert('入學日期錯誤');
        }
    });

    var eStage = content.EducationStage;
    var sday = content.school.isDay;
    var sNational = content.school.isNational;
    var sName = content.school.name;
    var gGrade = content.gradeClass.grade;

    //isDaySelect.val(sday);
    gradeSelect.val(gGrade);
    nameSelect.val(sName);
    stageSelect.val(eStage);
    isNationalSelect.val(sNational);
    stageSelect.trigger('change');
    gradeSelect.trigger('change');
    //isDaySelect.trigger('change');
    isNationalSelect.trigger('change');
}

function apply3_2(content) {
    var freedomDiv = $('#freedom');
    var billDiv = $('#accordingToBill');
    var loans = $('#loansSum');
    var freedom = content.freedom;
    var accordingToBill = content.accordingToBill;
    console.debug(content);
    var loan = content.loans;
    var accHidden = $('[name="accordingToBill_sum"]');
    var freeHidden = $('[name="freedom_sum"]');
    loanHidden = $('[name="loansPrice"]');
    sSelectValue = content.stageSelectValue;

    //選擇貸款的方式
    $('#apm_1').on('click', function() {
        $('#loans').show();
        $('#accordingToBill').show();
        $('#freedom').hide();
        $('#price').show();
        loanChoiced = '1'; //申貸方式為'依註冊繳費單登載之可貸金額'
    });
    $('#apm_2').on('click', function() {
        $('#loans').hide();
        $('#freedom').show();
        $('#accordingToBill').hide();
        $('#price').hide();
        loanChoiced = '2'; //申貸方式為'自行選擇申貸項目'
    });

    //帶預設
    /*if (loan == '1') {
        $('#apm_1').trigger('click');
        setEducationText(accordingToBill, billDiv);
        loans.val(content.accordingToBill.loansSum);
        $('#accordingToBill_sum').val(content.accordingToBill_sum);
    } else if (loan == '2') {
        $('#apm_2').trigger('click');
        setEducationText(freedom, freedomDiv);
        $('#freedom_sum').val(content.freedom_sum);
    }*/

    //"依註冊繳費單登載之可貸金額"的金額計算
    var sumPrice = parseInt(loans.val());
    var registerPrice = 0;
    var othersPrice = 0;
    var publicExpensePrice = 0;
    var otherResults = 0;
    var accordingSum = $('#accordingToBill_sum');
    educationLevel = content.education;
    department = content.department;

    $('#loansSum').on('blur', function() {
        registerPrice = parseInt($('#loansSum').val());
        var isNumber = !(isNaN($(this).val()));
        if ($(this).val() === '') {
            $(this).val(0);
            isNumber = false;
        }
        if (isNumber == true) {
            if ($(this).val() < 0) {
                $('#accordingToBill_register').val(0);
                alert('請輸入大於0之整數');
            } else {
                $('#accordingToBillPlusOthers').find('input').each(function() {
                    var currentPrice = parseInt($(this).val());
                    otherResults = parseInt(otherResults) + parseInt(currentPrice);
                    console.debug(otherResults);
                });
                registerPrice = parseInt($('#loansSum').val());
                publicExpensePrice = parseInt($('#accordingToBill_publicExpense').val());
                sumPrice = registerPrice + otherResults;
                sumPrice = sumPrice - publicExpensePrice;
                accordingSum.val(sumPrice);
                accHidden.val(sumPrice);

                otherResults = 0;
            }
        } else if (isNumber == false) {
            $('#accordingToBill_register').val(0);
            alert('請輸入整數');
        } else if (typeof($(this).val()) == string) {
            $(this).val(0);
            alert('請輸入整數');
        }
    });
    $('#accordingToBillPlusOthers .input_f').on('blur', function() {
        //alert(typeof($(this).val()));
        var isNumber = !(isNaN($(this).val()));
        if ($(this).val() === '') {
            $(this).val(0);
            isNumber = false;
        }
        if (isNumber == true) {
            if ($(this).val() < 0) {
                alert('請輸入大於0之整數');
            } else {

                registerPrice = parseInt($('#loansSum').val());
                publicExpensePrice = parseInt($('#accordingToBill_publicExpense').val());
                sumPrice = registerPrice + otherResults;
                sumPrice = sumPrice - publicExpensePrice;
                accordingSum.val(sumPrice);
                accHidden.val(sumPrice);
                otherResults = 0;


                othersPrice = 0;
                $('#accordingToBillPlusOthers .input_f').each(function() {
                    var currentPrice = parseInt($(this).val());
                    otherResults = parseInt(otherResults) + parseInt(currentPrice);
                    console.debug(otherResults);
                });
                registerPrice = parseInt($('#loansSum').val());
                publicExpensePrice = parseInt($('#accordingToBill_publicExpense').val());
                sumPrice = registerPrice + otherResults;
                sumPrice = sumPrice - publicExpensePrice;
                accordingSum.val(sumPrice);
                accHidden.val(sumPrice);
                otherResults = 0;
            }
        } else if (isNumber == false) {
            $(this).val(0);
            alert('請輸入整數');
        } else if (typeof($(this).val()) == string) {
            $(this).val(0);
            alert('請輸入整數');
        }
    });
    $('#accordingToBill_publicExpense').on('blur', function() {
        var isNumber = !(isNaN($(this).val()));
        if ($(this).val() === '') {
            isNumber = false;
        }
        if (isNumber == true) {
            if ($(this).val() < 0) {
                $(this).val(0);
                alert('請輸入大於0之整數');
            } else {
                $('#accordingToBillPlusOthers').find('input').each(function() {
                    var currentPrice = parseInt($(this).val());
                    otherResults = parseInt(otherResults) + parseInt(currentPrice);
                    console.debug(otherResults);
                });
                registerPrice = parseInt($('#loansSum').val());
                publicExpensePrice = parseInt($('#accordingToBill_publicExpense').val());
                sumPrice = registerPrice + otherResults;
                sumPrice = sumPrice - publicExpensePrice;
                accordingSum.val(sumPrice);
                accHidden.val(sumPrice);
                otherResults = 0;
            }
        } else if (isNumber == false) {
            $(this).val(0);
            alert('請輸入整數');
        } else if (typeof($(this).val()) == string) {
            $(this).val(0);
            alert('請輸入整數');
        }
    });

    //"自行選擇申貸項目"的金額計算
    var freedomSum = $('#freedom_sum');
    var freedomSumPrice = parseInt(freedomSum.val());
    var freedomOthersPrice = 0;
    var freedomPublicExpensePrice = 0;
    var otherResult = 0;

    $('#freedomPlusOthers .input_f').on('blur', function() {
        var isNumber = !(isNaN($(this).val()));
        if ($(this).val() === '') {
            isNumber = false;
        }
        if (isNumber == true) {
            if ($(this).val() < 0) {
                $(this).val(0);
                alert('請輸入大於0之整數');
            } else {
                $('#freedomPlusOthers .input_f').each(function() {
                    var currentPrice = parseInt($(this).val());
                    freedomOthersPrice = parseInt(freedomOthersPrice) + parseInt(currentPrice);
                    console.debug(freedomOthersPrice);
                });

                freedomPublicExpensePrice = parseInt($('#freedom_publicExpense').val());
                freedomSumPrice = freedomOthersPrice - freedomPublicExpensePrice;
                freedomSum.val(freedomSumPrice);
                freeHidden.val(freedomSumPrice);
                freedomOthersPrice = 0;
            }
        } else if (isNumber == false) {
            $(this).val(0);
            alert('請輸入整數');
        } else if (typeof($(this).val()) == string) {
            $(this).val(0);
            alert('請輸入整數');
        }
    });
    $('#freedom_publicExpense').on('blur', function() {
        var isNumber = !(isNaN($(this).val()));
        if ($(this).val() == '') {
            isNumber = false;
            $(this).val(0);
        }
        if (isNumber == true) {
            if ($(this).val() < 0) {
                $(this).val(0);
                alert('請輸入大於0之整數');
            } else {
                $('#freedomPlusOthers').find('input').each(function() {
                    var otherInput = parseInt($(this).val());
                    otherResult = otherResult + otherInput;
                    console.debug(otherResult);
                });

                freedomPublicExpensePrice = parseInt($('#freedom_publicExpense').val());
                freedomSumPrice = otherResult - freedomPublicExpensePrice;
                freedomSum.val(freedomSumPrice);
                freeHidden.val(freedomSumPrice);
                otherResult = 0;

            }
        } else if (isNumber == false) {
            $(this).val(0);
            alert('請輸入整數');
        } else if (typeof($(this).val()) == string) {
            $(this).val(0);
            alert('請輸入整數');
        }
    });
}

function apply4_1(content) {
    console.debug(content);
    var loansIndex = content.loans;
    var lifePriceOfBill = content.accordingToBill.life;
    var lifePriceOfFree = content.freedom.life;
    var idCardPosition = content.uploadFile.idCardPosition;
    var idCardNegative = content.uploadFile.idCardNegative;
    var registration = content.uploadFile.registration;
    var lowIncome = content.uploadFile.lowIncome;
    var lowIncomesArr = [];
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
    var registerPhoto = $('#registerPhoto');
    var registerImg = $('#registerImg');
    var registerUpload = $('#registerUpload');
    var registerChange = $('#registerChange');
    var registerView = $('#registerView');
    var registerViewImg = $('#registerViewImg');

    if (loansIndex == '1') {
        if (lifePriceOfBill > 0) {
            lowIncomesArr.push('<tr><td class="file-photo"><a><img id="lowIncomePhoto" src=""></a></td><td class="file-zh">政府機關出具之低收入戶或中低收入戶證明</td><td class="file-en" id="lowIncomeImg">無</td><td class="file-modify"><a id="lowIncomeChange" style="display:none">修改檔案</a></td><td class="file-upload"><a id="lowIncomeUpload">上傳檔案</a></td><td class="file-view"><a id="lowIncomeView"></a></td></tr><tr><td class="clickView" colspan="4" id="low" style="display:none"><div class="dowitemContent" style="display:block"><div class="imgBox"><img id="lowIncomeViewImg" src="'+lowIncome+'" style="display:block"></div></div></td></tr>');

            uploadObj.append(lowIncomesArr.join(''));
        }
    } else if (loansIndex == '2') {
        if (lifePriceOfFree > 0) {
            lowIncomesArr.push('<tr><td class="file-photo"><a><img id="lowIncomePhoto" src=""></a></td><td class="file-zh">政府機關出具之低收入戶或中低收入戶證明</td><td class="file-en" id="lowIncomeImg">無</td><td class="file-modify"><a id="lowIncomeChange" style="display:none">修改檔案</a></td><td class="file-upload"><a id="lowIncomeUpload">上傳檔案</a></td><td class="file-view"><a id="lowIncomeView"></a></td></tr><tr><td class="clickView" colspan="4" id="low" style="display:none"><div class="dowitemContent" style="display:block"><div class="imgBox"><img id="lowIncomeViewImg" src="'+lowIncome+'" style="display:block"></div></div></td></tr>');

            uploadObj.append(lowIncomesArr.join(''));
        }
    }
    
    var lowIncomePhoto = $('#lowIncomePhoto');
    var lowIncomeImg = $('#lowIncomeImg');
    var lowIncomeUpload = $('#lowIncomeUpload');
    var lowIncomeChange = $('#lowIncomeChange');
    var lowIncomeView = $('#lowIncomeView');
    var lowIncomeViewImg = $('#lowIncomeViewImg');
	var clickView = $('.clickView');

    if(idCardPosition != ''){
        idPositivePhoto.attr("src",idCardPosition);
        idPositiveImg.text(idCardPosition);
        idPositiveUpload.parent().remove(); 
        idPositiveChange.show();
        idPositiveView.addClass('active');
		idPositiveViewImg.attr("src",idCardPosition);
    }
    else{
       idPositiveChange.parent().remove(); 
    }
    
    if(idCardNegative !== ''){
        idNegativePhoto.attr("src",idCardNegative);
        idNegativeImg.text(idCardNegative);
        idNegativeUpload.parent().remove(); 
        idNegativeChange.show();
        idNegativeView.addClass('active');
		idNegativeViewImg.attr("src",idCardNegative);
    }
    else{
       idNegativeChange.parent().remove(); 
    }
    
    if(registration != ''){
        registerPhoto.attr("src",registration);
        registerImg.text(registration);
        registerUpload.parent().remove(); 
        registerChange.show();
        registerView.addClass('active');
		registerViewImg.attr("src",registration);
    }
    else{
       registerChange.parent().remove(); 
    }
    
    if(lowIncome != ''){
        lowIncomePhoto.attr("src",lowIncome);
        lowIncomeImg.text(lowIncome);
        lowIncomeUpload.parent().remove(); 
        lowIncomeChange.show();
        lowIncomeView.addClass('active');
		lowIncomeViewImg.attr("src",lowIncome);
    }
    else{
       lowIncomeChange.parent().remove(); 
    }
	
	//按預覽按鈕
	idPositiveView.on('click', function(){
		if (idPositiveView.hasClass('active')) {
			if($("#pos").is(":hidden")) {
				clickView.hide();
				$('#pos').show();
			}
			else{
				$('#pos').hide();
			}
		}
	});
	
	idNegativeView.on('click', function(){
		if (idNegativeView.hasClass('active')) {
			if($("#neg").is(":hidden")) {
				clickView.hide();
				$('#neg').show();
			}
			else{
				$('#neg').hide();
			}
			
		}
	});
	
	registerView.on('click', function(){
		if (registerView.hasClass('active')) {
			if($("#reg").is(":hidden")) {
				clickView.hide();
				$('#reg').show();
			}
			else{
				$('#reg').hide();
			}
		}
	});
	
	lowIncomeView.on('click', function(){
		if (lowIncomeView.hasClass('active')) {
			if($("#low").is(":hidden")) {
				clickView.hide();
				$('#low').show();
			}
			else{
				$('#low').hide();
			}
		}
	});
}

function apply4_2(content) {
    var citySelect = $('[name="cityId"]');
    var zipSelect = $('[name="zipCode"]');
    var submitBranch = $('#submitBranch');
    var jsonBranch;
    var regionArea = $('.regionArea');
    var jsonCity = modal.getCity();
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

    addressMap('台北市中山北路二段50號3樓');
    appointment.hide();
    branchsInfo.hide();
    branchDate.hide();
    calendarArea.hide();


    $.each(cityArr, function(i, cityData) {
        cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });

    citySelect.empty();
    citySelect.append(cityArray.join(''));
    citySelect.selectpicker('refresh');

    //地址連動(zip)
    linkage.changeZipByCity(citySelect, cityArr, zipSelect);

    regionTextArea.off().on('click', function() {
        regionArea.hide();
        selectors.show();
        $('.branchMap').show();
        addressMap('台北市中山北路二段50號3樓');
        calendarArea.hide();
    });

    submitBranch.off().on('click', function() { //按下'確認'鍵後的動作
        var cityId = $('[name="cityId"]').val();
        zipCode = $('[name="zipCode"]').val();
        var dateSelected = $('[name="dateSelected"]');
        var idSelected = $('[name="idSelected"]');
        var timeSelected = $('[name="timeSelected"]');

        var citySelectpicked = $('#citySelectpicker button').attr('title');
        var zipSelectpicked = $('#zipSelectpicker button').attr('title');
        var cityRegionIcon = $('#cityRegionIcon');
        var zipRegionIcon = $('#zipRegionIcon');

        jsonBranch = modal.getBranch(zipSelect.val());
        console.debug(jsonBranch);
        var branchArr = jsonBranch.branches;
        var branchArray = [];
        var regionText = citySelectpicked + ',' + zipSelectpicked; //放所在地區的字串

        if (zipCode !== '') { //若有正確選擇所在地區後的動作
            selectors.hide();
            regionArea.show();
            $.each(branchArr, function(i, branchData) { //長分行資訊
                branchArray.push('<li class="branchLi"> <div class="regionText"><a class="information"><h4 class="branchName">' + branchData.branchName + '</h4><p class="branchAddr">' + branchData.addr + '</p><p class="branchTel">Tel ' + branchData.tel + '</p><p class="branchId" name="' + branchData.branchId + '" style="display:none"></p></div><div class="regionPlaceBtn"><a class="reservation">我要預約</a><a class="position">分行位置</a></a></div></li>');
            });

            if (branchArray.length == 0) {
                console.debug(regionText);
                addressMap(regionText);
            } else {
                var addrArr = [];
                $.each(branchArr, function(i, branchData) { //長分行資訊
                    addrArr.push(branchData.addr);
                });
                console.debug(addrArr);
                addressMap(addrArr);
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

            regionTextArea.text(regionText);
            cityRegionIcon.text(citySelectpicked);
            zipRegionIcon.text(zipSelectpicked);

            if (firstAddress == '') {
                //addressMap(regionText);
            } else {
                //addressMap(firstAddress);

                reservation.on('click', function() {
                    var thisBtn = $(this).parent();
                    var thisText = thisBtn.parent().find('.regionText');
                    var thisName = thisText.find('.branchName').text();
                    var thisAddr = thisText.find('.branchAddr').text();
                    var thisTel = thisText.find('.branchTel').text();
                    branchId = thisText.find('.branchId').attr('name');

                    $('.branchMap').hide();
                    calendarArea.show();
                    appointment.hide();

                    var month = new Date().getMonth() + 1;
                    var name = $('#bName');
                    var addr = $('#bAddr');
                    var tel = $('#bTel');
                    var dDate = $('#bDate');
                    var dTime = $('#bTime');

                    dDate.text('');
                    dTime.text('');
                    timeSelected.val('');
                    dateSelected.val('');
                    idSelected.val('');
                    name.text(thisName);
                    addr.text(thisAddr);
                    tel.text(thisTel.substr(4));
                    branchsInfo.show();
                    branchDate.show();

                    var calendarArr = [];
                    var calDate;
                    var calFull;

                    jsonBranch = modal.getFullString(month, branchId);
                    //jsonBranch = modal.getFullString(dateAppo, branchId); //傳日期及分行資訊去撈上可預約人物
                    console.debug(jsonBranch);
                    $.each(jsonBranch, function(index, value) {
                        console.debug(index + '/' + value);
                        if (index == 'booking') {
                            $.each(value, function(objIndex, objValue) {
                                console.debug(objIndex + '/' + objValue);
                                $.each(objValue, function(objI, objV) {
                                    console.debug(objI + '/' + objV);
                                    if (objI == 'isFull') {
                                        if (objV == 'Y') {
                                            calFull = '已滿';
                                            $.each(objValue, function(objI, objV) {
                                                if (objI == 'date') {
                                                    calDate = objV;
                                                    calendarArr.push({
                                                        "title": calFull,
                                                        "start": calDate
                                                    });
                                                    console.debug(calendarArr);
                                                }
                                            });
                                        } else {
                                            calFull = '';
                                        }
                                    }
                                });
                            });
                        }
                    });

                    $(document).ready(function() { //長日曆
                        $('#calendar').fullCalendar({
                            header: {
                            },
                            //height: 400,
                            defaultDate: new Date(),
                            select: function(startDate, endDate) {
                                if (liveDate > startDate) {
                                    alert('Selected date has been passed');
                                    return false;
                                } else {
                                    //do your wish
                                }
                                calendar.fullCalendar('unselect');
                            },
                            editable: false,
                            eventLimit: true, // allow "more" link when too many events
                            events: calendarArr,

                            dayClick: function(date, jsEvent, view) {
                                var myDate = new Date();
                                if (date > myDate) {
                                    //TRUE Clicked date smaller than today
                                    dateAppo = date.format();
                                    var number1 = $('#number1');
                                    var number2 = $('#number2');
                                    var number3 = $('#number3');
                                    var number4 = $('#number4');
                                    var surplusArr = [];
									
									var clickMonth = parseInt(dateAppo.substr(5,2));
									console.debug(clickMonth);

                                    idSelected.val(branchId);

                                    //按下日期後的動作
                                    //jsonBranch = modal.getFullString(1, 200);
                                    jsonBranch = modal.getFullString(clickMonth, branchId); //傳日期及分行資訊去撈上可預約人物
                                    console.debug(jsonBranch);
                                    $.each(jsonBranch, function(index, value) {
                                        console.debug(index + '/' + value);
                                        if (index == 'booking') {
                                            $.each(value, function(objIndex, objValue) {
                                                console.debug(objIndex + '/' + objValue);
                                                $.each(objValue, function(objI, objV) {
                                                    console.debug(objI + '/' + objV);
                                                    if (objV == dateAppo) {
                                                        $.each(objValue, function(objI, objV) {
                                                            if (objI == 'times') {
                                                                $.each(objV, function(oI, oV) {
                                                                    console.debug(oI + '/' + oV);
                                                                    $.each(oV, function(i, v) {
                                                                        if (i == 'count') {
                                                                            for (var j = 1; j <= 4; j++) {
                                                                                $('#number' + j).text(v);

                                                                                if (v == '0') {
                                                                                    var appoRadio = $('#time' + j);
                                                                                    appoRadio.attr("disabled", true);

                                                                                    var appoLabel = $('#timeLabel' + j);
                                                                                    var appoP = $('#number' + j);
                                                                                    appoLabel.css("color", "#9D9D9D");
                                                                                    appoP.css("color", "#9D9D9D");
                                                                                }

                                                                                //appointment.show();
                                                                            }

                                                                        }
                                                                    });

                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                    appointment.show();
                                } else {
                                    //FLASE Clicked date larger than today + daysToadd
                                    alert('此日期不能選取');
                                }

                            }
                        });
                    });

                    $('#appointment').find('input').on('click', function() { //點選預約日期,右下方會產生日期和時間的資訊
                        var radioIndex = $(this).attr('id').substr(-1, 1);
                        var timeHour = $('#timeLabel' + radioIndex).text().substr(2, 2);
                        var timeMin = $('#timeLabel' + radioIndex).text().substr(5, 2);
                        var timeAppo = $('#timeLabel' + radioIndex).text().substr(0, 13);
                        var timeInfo = timeHour + timeMin;

                        dDate.text(dateAppo);
                        dTime.text(timeAppo);
                        timeSelected.val(timeInfo);
                        dateSelected.val(dateAppo);
                    })
                });


                //google map
                position.on('click', function() {
                    var current = $(this).parent();
                    var currentLi = current.parent();
                    var currentName = currentLi.find('h4').text();
                    var currentAddr = currentLi.find('p:first').text();

                    $('.branchMap').show();
                    calendarArea.hide();
                    addressMap(currentAddr);
                });
            }

        } else {
            alert('請選擇所在地區');
        }
    });


}

function addressMap(address) {
    console.debug(address);
    var zoomPare = 14;
    if (address == '台灣') {
        zoomPare = 7;
    }

    GardenUtils.plugin.showGoogleMap({
        divId: 'branchMap',
        zoom: zoomPare,
        address: address
    });
}

function apply5_1_1(content) {
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

    //var branchNameAddr = $('#branchNameAddr');
    //var branchPh = $('#branchPh');
    //var branchDateTime = $('#branchDateTime');

    fatherDiv = $('#father');
    motherDiv = $('#mother');
    thirdPartyDiv = $('#thirdParty');
    spouseDiv = $('#spouse');

    var familyStatusLevel1Text = content.familyStatusLevel1Text;
    var familyStatusLevel2Text = content.familyStatusLevel2Text;
    //var guarantorText = content.guarantorText;
    var loans = content.loans;
    var showInfo = content.showInfo;
    var isGuarantor = content.isGuarantor;
    var domiCity = content.domicileAddress.cityId;
    var domiZipCode = content.domicileAddress.zipCode;
    //var domiLinerName = content.domicileAddress.linerName;
    var domiLiner = content.domicileAddress.liner;
    var domiNeighborhood = content.domicileAddress.neighborhood;
    var domiAddress = content.domicileAddress.address;
    var telCity = content.teleAddress.cityId;
    var telZipCode = content.teleAddress.zipCode;
	//var telLinerName = content.teleAddress.linerName;
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
    var studentId = content.id;
    var enterMonth = content.enterDate.month;
    var enterYear = content.enterDate.year;
    var graduationMonth = content.graduationDate.month;
    var graduationYear = content.graduationDate.year;
	
	
    //家庭狀況
    status1.text(familyStatusLevel1Text);
    status2.text(familyStatusLevel2Text);

    //申請人資料
    setInfoText(content, applicantDiv);
    //addrTempDomi = domiCity+domiZipCode+domiLinerName+domiLiner+domiNeighborhood+'鄰'+domiAddress;
    addrTempDomi = domiCity + domiZipCode + domiLiner + domiNeighborhood + '鄰' + domiAddress;
    applicant_address_domi.text(addrTempDomi);
    //addrTempTel = telCity+telZipCode+telLinerName+telLiner+telNeighborhood+'鄰'+telAddress;
    addrTempTel = telCity + telZipCode + telLiner + telNeighborhood + '鄰' + telAddress;
    applicant_address.text(addrTempTel);

    switch (educationStage) {
        case '1':
            educationStage = '博士';
            break;
        case '2':
            educationStage = '碩士';
            break;
        case '3':
            educationStage = '專科/大學';
            break;
        case '4':
            educationStage = '高中';
            break;
        case '5':
            educationStage = '國中';
            break;
        case '6':
            educationStage = '國小';
            break;
    }
	
    if (OnTheJob == 'on') {
        OnTheJob = '是';
    } else if (OnTheJob == 'off') {
        OnTheJob = '否';
    }

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

    student_EducationStage.text(educationStage);
    student_name.text(schoolName_isNational + schoolName_isDay + schoolName_name);
    student_department.text(department);
    student_onTheJob.text(OnTheJob);
    student_class.text(gradeId + '年' + classId + '班');
    student_id.text(studentId);
    student_month_enter.text(enterYear + '年' + enterMonth + '月');
    student_month_graduation.text(graduationYear + '年' + graduationMonth + '月');
	
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
                    modal.getFamilyInfo('father', function(fatherInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(fatherInfo, fatherDiv);
                    });
                } else if (showInfoD == '0') {
                    $('#father').hide();
                }
                break;
            case 1:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('mother', function(motherInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(motherInfo, motherDiv);
                    });
                } else if (showInfoD == '0') {
                    $('#mother').hide();
                }
                break;
            case 2:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('thirdParty', function(thirdPartyInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(thirdPartyInfo, thirdPartyDiv);
                    });
                } else if (showInfoD == '0') {
                    $('#thirdParty').hide();
                }
                break;
            case 3:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('spouse', function(spouseInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(spouseInfo, spouseDiv);
                    });
                } else if (showInfoD == '0') {
                    $('#spouse').hide();
                }
                break;
        }
    }
    //showFamilyInformation(null, showInfo, isGuarantor, isIncomeTax);
	
    //就讀學校及申貸金額
    if (loans == '1') {
        var loansPrice = content.accordingToBill_sum;
        var abroad = content.accordingToBill.abroad;
        var book = content.accordingToBill.book;
        var loansSum = content.accordingToBill.loansSum;
        var life = content.accordingToBill.life;
        var live = content.accordingToBill.live;
        var publicExpense = content.accordingToBill.publicExpense;

        console.debug(student_abroad.length + '/' + abroad);
        student_loansPrice.text(loansPrice);
        student_credit.text(loansSum);
        student_abroad.text(abroad);
        student_book.text(book);
        student_life.text(life);
        student_live.text(live);
        student_publicExpense.text(publicExpense);
        console.debug(student_publicExpense.length);
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

        student_abroad.text(abroad);
        student_book.text(book);
        student_life.text(life);
        student_live.text(live);
        student_publicExpense.text(publicExpense);
        student_FPA.text(FPA);
        student_credit.text(credit);
        student_music.text(music);
        student_loansPrice.text(loansPrice);
        student_practice.text(practice);
    }
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
    var jsonCodeImg = modal.getCodeImg();
    console.debug(jsonCodeImg);
    var imgSrc = jsonCodeImg.Codes.codeImg;
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

    img.attr('src', imgSrc);

    //倒數
    var countdown = function() {
        $('#sec').text($('#sec').text() - 1);
        if ($('#sec').text() == 0) {
            $('#sec').text(59);
            $('#mins').text($('#mins').text() - 1);
            min = min - 1;
            if (min < 0) {
                $('#mins').text(0);
                $('#sec').text(0);
                resetApply();
                clearInterval(start);
            }
        }
    }

    var start = setInterval(countdown, 1000);

}

function resetApply() {
    alert('您已超過一次性密碼有效時間，請重新操作。');

    //到前一步!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

function apply5_2(content) {
    //console.debug(content);
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

    fatherDiv = $('#father');
    motherDiv = $('#mother');
    thirdPartyDiv = $('#thirdParty');
    spouseDiv = $('#spouse');

    var familyStatusLevel1Text = content.familyStatusLevel1Text;
    var familyStatusLevel2Text = content.familyStatusLevel2Text;
    //var guarantorText = content.guarantorText;
    var loans = content.loans;
    var showInfo = content.showInfo;
    var isGuarantor = content.isGuarantor;
    var domiCity = content.domicileAddress.cityId;
    var domiZipCode = content.domicileAddress.zipCode;
    //var domiLinerName = content.domicileAddress.linerName;
    var domiLiner = content.domicileAddress.liner;
    var domiNeighborhood = content.domicileAddress.neighborhood;
    var domiAddress = content.domicileAddress.address;
    var telCity = content.teleAddress.cityId;
    var telZipCode = content.teleAddress.zipCode;
    //var telLinerName = content.teleAddress.linerName;
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
    var studentId = content.id;
    var enterMonth = content.enterDate.month;
    var enterYear = content.enterDate.year;
    var graduationMonth = content.graduationDate.month;
    var graduationYear = content.graduationDate.year;

    //家庭狀況
    status1.text(familyStatusLevel1Text);
    status2.text(familyStatusLevel2Text);

    //申請人資料
    setInfoText(content, applicantDiv);
    //addrTempDomi = domiCity+domiZipCode+domiLinerName+domiLiner+domiNeighborhood+'鄰'+domiAddress;
    addrTempDomi = domiCity + domiZipCode + domiLiner + domiNeighborhood + '鄰' + domiAddress;
    applicant_address_domi.text(addrTempDomi);
    //addrTempTel = telCity+telZipCode+telLinerName+telLiner+telNeighborhood+'鄰'+telAddress;
    addrTempTel = telCity + telZipCode + telLiner + telNeighborhood + '鄰' + telAddress;
    applicant_address.text(addrTempTel);

    switch (educationStage) {
        case '1':
            educationStage = '博士';
            break;
        case '2':
            educationStage = '碩士';
            break;
        case '3':
            educationStage = '專科/大學';
            break;
        case '4':
            educationStage = '高中';
            break;
        case '5':
            educationStage = '國中';
            break;
        case '6':
            educationStage = '國小';
            break;
    }

    if (OnTheJob == 'on') {
        OnTheJob = '是';
    } else if (OnTheJob == 'off') {
        OnTheJob = '否';
    }

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

    student_EducationStage.text(educationStage);
    student_name.text(schoolName_isNational + schoolName_isDay + schoolName_name);
    student_department.text(department);
    student_onTheJob.text(OnTheJob);
    student_class.text(gradeId + '年' + classId + '班');
    student_id.text(studentId);
    student_month_enter.text(enterYear + '年' + enterMonth + '月');
    student_month_graduation.text(graduationYear + '年' + graduationMonth + '月');

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
                    modal.getFamilyInfo('father', function(fatherInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(fatherInfo, fatherDiv);
                    });
                } else if (showInfoD == '0') {
                    $('#father').hide();
                }
                break;
            case 1:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('mother', function(motherInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(motherInfo, motherDiv);
                    });
                } else if (showInfoD == '0') {
                    $('#mother').hide();
                }
                break;
            case 2:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('thirdParty', function(thirdPartyInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(thirdPartyInfo, thirdPartyDiv);
                    });
                } else if (showInfoD == '0') {
                    $('#thirdParty').hide();
                }
                break;
            case 3:
                if (showInfoD == '1') {
                    modal.getFamilyInfo('spouse', function(spouseInfo) {
                        // setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(spouseInfo, spouseDiv);
                    });
                } else if (showInfoD == '0') {
                    $('#spouse').hide();
                }
                break;
        }
    }
    //showFamilyInformation(null, showInfo, isGuarantor, isIncomeTax);

	var branchName = $('[name="branchName"]');
	var branchAddr = $('[name="branchAddr"]');
	var branchTel = $('[name="branchTel"]');
	var reservation = $('[name="reservation"]');
	
    var bName = content.branchName;
    var addr = content.addr;
    var tel = content.tel;
    var dateSelected = content.dateSelected;
    var timeSelected = content.timeSelected;
    var endTime = parseInt(timeSelected) + 100;
    if (endTime == 200) {
        endTime = '0200';
    }

    branchNameAddr.text(bName + '(' + addr + ')');
    branchPh.text(tel);
    branchDateTime.text(dateSelected + ' ' + timeSelected + '~' + endTime);
	
	branchName.val(bName);
	branchAddr.val(addr);
	branchTel.val(tel);
	reservation.val(dateSelected + ' ' + timeSelected + '~' + endTime);

    //就讀學校及申貸金額
    if (loans == '1') {
        var loansPrice = content.accordingToBill_sum;
        var abroad = content.accordingToBill.abroad;
        var book = content.accordingToBill.book;
        var loansSum = content.accordingToBill.loansSum;
        var life = content.accordingToBill.life;
        var live = content.accordingToBill.live;
        var publicExpense = content.accordingToBill.publicExpense;

        console.debug(student_abroad.length + '/' + abroad);
        student_loansPrice.text(loansPrice);
        student_credit.text(loansSum);
        student_abroad.text(abroad);
        student_book.text(book);
        student_life.text(life);
        student_live.text(live);
        student_publicExpense.text(publicExpense);
        console.debug(student_publicExpense.length);
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

        student_abroad.text(abroad);
        student_book.text(book);
        student_life.text(life);
        student_live.text(live);
        student_publicExpense.text(publicExpense);
        student_FPA.text(FPA);
        student_credit.text(credit);
        student_music.text(music);
        student_loansPrice.text(loansPrice);
        student_practice.text(practice);

    }
}

function apply6_1(content) {
    var applyDate = new Date();
    var applyYear = applyDate.getFullYear();
    var applyMonth = applyDate.getMonth() + 1;
    var applyDay = applyDate.getDate();
    var applyHours = applyDate.getHours();
    var applyMinutes = applyDate.getMinutes();
    var applySeconds = applyDate.getSeconds();
    var appYear =$('[name="appYear"]');
	var appMonth =$('[name="appMonth"]');
	var appDay =$('[name="appDay"]');
	var appHours =$('[name="appHours"]');
	var appMinutes =$('[name="appMinutes"]');
	var appSeconds =$('[name="appSeconds"]');
	
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
    var applyDate = new Date();
    var applyYear = applyDate.getFullYear();
    var applyMonth = applyDate.getMonth() + 1;
    var applyDay = applyDate.getDate();
    var applyHours = applyDate.getHours();
    var applyMinutes = applyDate.getMinutes();
    var applySeconds = applyDate.getSeconds();
	
	var appYear =$('[name="appYear"]');
	var appMonth =$('[name="appMonth"]');
	var appDay =$('[name="appDay"]');
	var appHours =$('[name="appHours"]');
	var appMinutes =$('[name="appMinutes"]');
	var appSeconds =$('[name="appSeconds"]');
	
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
    var branchName = content.branchName;
    var branchTel = content.branchTel;
    var branchAddr = content.addr;
    var reservationTime = content.reservation;
    var nameAndAddr = $('#nameAndAddr');
    var tel = $('#tel');
    var branchReservation = $('#branchReservation');

    $('#applyDate').text(date);

    nameAndAddr.text(branchName + '(' + branchAddr + ')');
    tel.text(branchTel);
    branchReservation.text(reservationTime);

    var allObj = getCarryObj(content);

    var objList = [];
    $.each(allObj, function(i, obj) {
        objList.push('<li><p class="nasi">' + obj + '</p></li>');
    });

    var list = $('#carryObjList');
    list.append(objList.join(''));
}

//依照是否成本/家庭狀況/保證人/合計收入對象顯示不同欄位
function showFamilyInformation(adult, show, gua, itax) {

    //判斷要長哪些人的div
    var stringStatus_f = []; //父親:[0]:連帶保證人; [1]:合計對象 (true/false)
    var stringStatus_m = []; //母親:[0]:連帶保證人; [1]:合計對象 (true/false)
    var stringStatus_t = []; //第三人:[0]:連帶保證人; [1]:合計對象 (true/false)
    var stringStatus_s = []; //配偶:[0]:連帶保證人; [1]:合計對象 (true/false)
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
                    modal.getFamilyInfo('father', function(fatherInfo) {
                        setInfoValue(fatherInfo, fatherDiv);
                        setInfoText(fatherInfo, fatherDiv);
                    });
                    break;
                case 1:
                    //母親資料
                    modal.getFamilyInfo('mother', function(motherInfo) {
                        setInfoValue(motherInfo, motherDiv);
                        setInfoText(motherInfo, motherDiv);
                    });

                    break;
                case 2:
                    //第三人資料
                    modal.getFamilyInfo('thirdParty', function(thirdPartyInfo) {
                        setInfoValue(thirdPartyInfo, thirdPartyDiv);
                        setInfoText(thirdPartyInfo, thirdPartyDiv);
                    });
                    break;
                case 3:
                    //配偶資料
                    modal.getFamilyInfo('spouse', function(spouseInfo) {
                        setInfoValue(spouseInfo, spouseDiv);
                        setInfoText(spouseInfo, spouseDiv);
                    });
                    break;
            }
        } else if (identityStatus == 2) { //先顯示radio
            console.debug('adult:' + adult);
            if (adult == 'N') {
                switch (identity) { //若選擇'是',再顯示整塊div
                    case 0:
                        //父親資料   
                        $('#father p[class="stringOrRadio"]').append('擔任連帶保證人');
                        $('#father div[class="joy finp"]').hide();
                        $('#father div[class="right radioGuarantor"]').show();
                        break;
                    case 1:
                        //母親資料
                        $('#mother p[class="stringOrRadio"]').append('擔任連帶保證人');
                        $('#mother div[class="joy finp"]').hide();
                        $('#mother div[class="right radioGuarantor"]').show();
                        break;
                    case 2:
                        //第三人資料
                        $('#thirdParty p[class="stringOrRadio"]').append('擔任連帶保證人');
                        $('#thirdParty div[class="joy finp"]').hide();
                        $('#thirdParty div[class="right radioGuarantor"]').show();
                        break;
                    case 3:
                        //配偶資料
                        $('#spouse p[class="stringOrRadio"]').append('擔任連帶保證人');
                        $('#spouse div[class="joy finp"]').hide();
                        $('#spouse div[class="right radioGuarantor"]').show();
                        break;
                }
            } else if (adult == 'Y') { //若選擇'父親',再顯示父親的整塊div; 若選擇'母親',再顯示母親的整塊div   
                $('#incomeTaxRadio').show();

                switch (identity) { //先隱藏該人物之div,若"合作對象"選擇'是',再顯示整塊div,反之亦然
                    case 0:
                        //父親資料   
                        $('#father div[class="joy finp"]').hide();
                        break;
                    case 1:
                        //母親資料
                        $('#mother div[class="joy finp"]').hide();
                        break;
                    case 2:
                        //第三人資料
                        $('#thirdParty div[class="joy finp"]').hide();
                        break;
                    case 3:
                        //配偶資料
                        $('#spouse div[class="joy finp"]').hide();
                        break;
                }
            }
        }
    }

    //判斷要給字串或radio
    for (var identity = 0; identity <= 3; identity++) {
        //identity(0:father; 1:mother; 2:third party; 3:spouse)
        var identityStatus = gua.substr(identity, 1);

        if (adult == 'N') {
            if (identityStatus !== '0') {
                switch (identity) {
                    case 0: //father
                        switch (identityStatus) {
                            case '1': //顯示"(為連帶保證人/合計所得對象)"字串
                                stringStatus_f[0] = true;
                                guarantorText = guarantorText + '父親 ';
                                break;
                            case '3': //顯示radio
                                $('#father p[class="stringOrRadio"]').append('擔任連帶保證人');
                                $('#father div[class="right radioGuarantor"]').show();
                                break;
                        }
                        break;
                    case 1: //mother
                        switch (identityStatus) {
                            case '1': //顯示"(為連帶保證人/合計所得對象)"字串
                                stringStatus_m[0] = true;
                                guarantorText = guarantorText + '母親 ';
                                break;
                            case '3': //顯示radio
                                $('#mother p[class="stringOrRadio"]').append('擔任連帶保證人');
                                $('#mother div[class="right radioGuarantor"]').show();
                                break;
                        }
                        break;
                    case 2: //third party
                        switch (identityStatus) {
                            case '1': //顯示"(為連帶保證人/合計所得對象)"字串
                                stringStatus_t[0] = true;
                                guarantorText = guarantorText + '第三人 ';
                                break;
                            case '3': //顯示radio
                                $('#thirdParty p[class="stringOrRadio"]').append('擔任連帶保證人');
                                $('#thirdParty div[class="right radioGuarantor"]').show();
                                break;
                        }
                        break;
                    case 3: //spouse
                        switch (identityStatus) {
                            case '1': //顯示"(為連帶保證人/合計所得對象)"字串
                                stringStatus_s[0] = true;
                                guarantorText = guarantorText + '配偶 ';
                                break;
                                /*case '2': //顯示"(非連帶保證人/合計所得對象)"字串
                                    $('#spouse p[class="stringOrRadio"]').append('(非連帶保證人/合計所得對象)');
                                    $('#isGuarantor_spouse').text('(非連帶保證人/合計所得對象)');
                                    break;*/
                            case '3': //顯示radio
                                $('#spouse p[class="stringOrRadio"]').append('擔任連帶保證人');
                                $('#spouse div[class="right radioGuarantor"]').show();
                                break;
                        }
                        break;
                }
            }

        } else if (adult == 'Y') {
            if (identityStatus !== '0') {
                switch (identity) {
                    case 0: //father
                        switch (identityStatus) {
                            case '1': //顯示"(為連帶保證人/合計所得對象)"字串
                                stringStatus_f[0] = true;
                                guarantorText = guarantorText + '父親 ';
                                break;
                            case '3': //顯示radio
                                $('#incomeTaxRadio').show();
                                break;
                        }
                        break;
                    case 1: //mother
                        switch (identityStatus) {
                            case '1': //顯示"(為連帶保證人/合計所得對象)"字串
                                stringStatus_m[0] = true;
                                guarantorText = guarantorText + '母親 ';
                                break;
                            case '3': //顯示radio
                                $('#incomeTaxRadio').show();
                                break;
                        }
                        break;
                    case 2: //third party
                        switch (identityStatus) {
                            case '1': //顯示"(為連帶保證人/合計所得對象)"字串
                                stringStatus_t[0] = true;
                                guarantorText = guarantorText + '第三人 ';
                                break;
                            case '3': //顯示radio
                                $('#incomeTaxRadio').show();
                                break;
                        }
                        break;
                    case 3: //spouse
                        switch (identityStatus) {
                            case '1': //顯示"(為連帶保證人/合計所得對象)"字串
                                stringStatus_s[0] = true;
                                guarantorText = guarantorText + '配偶 ';
                                break;
                            case '3': //顯示radio
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
        //alert(identity+':'+identityStatus);

        switch (identity) {
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
    //父親的字串
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
    //父親的字串
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
    console.debug(cSelector);


    $.each(arrCity, function(i, cityData) {
        arrayCity.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });

    $('[name="' + cSelector + '"]').append(arrayCity.join(''));
    $('[name="' + cDomiSelector + '"]').append(arrayCity.join(''));

    $('[name="' + cSelector + '"]').selectpicker('refresh');
    $('[name="' + cDomiSelector + '"]').selectpicker('refresh');

}

function getCarryObj(content) {
    var appoName = content.appoName;
    var fatherName = content.fatherName;
    var motherName = content.motherName;
    var thirdPartyName = content.thirdPartyName;
    var spouseName = content.spouseName;
    var loansPrice = content.loans;
    var freedomLife = content.freedom.life;
    var accordingLife = content.accordingToBill.life;
    var adult = content.applicantAdult;
    //var isGuarantor = content.isGuarantor;
    var marryStatus = content.marryStatus;
    var level1Picked = content.familyStatusLevel1;
    var level2Picked = content.familyStatusLevel2;
    var gaurantorTitle = ["父親", "母親", "第三人", "配偶"]; //放父親, 母親, 第三人, 配偶 的字串 
    var gaurantorName = ['(' + fatherName + ')', '(' + motherName + ')', '(' + thirdPartyName + ')', '(' + spouseName + ')']; //放父親, 母親, 第三人, 配偶的名字的字串
    var carryObjArr = []; //放1~6
    /*
    1.	(依判斷塞其他關係人名即可)之身分證及印章      
    2.	戶籍謄本或新式戶口名簿【需為最近三個月且記事欄需詳載，包含本人(吳*名)、(依判斷塞其他關係人名即可)，如戶籍不同者，需分別檢附】
    3.	(依判斷塞其他關係人名即可)之特殊情形證明文件
    4.	(依判斷塞其他關係人名即可)之除戶謄本或死亡證明
    5.	連帶保證人(塞c的關係人名)之扣繳憑單、財力證明或在職證明
    6.生活費>0的人 要再增加攜帶政府機關出具之低收入戶或中低收入戶證明
    */
    var gaurantorObjArr = []; //a,b,c,d  (有幾個就產生幾個關係人的字串)
    /*
    a.父親(吳*爸) 
    b.母親(吳*媽)
    c.監護權人(林*明)
    d.配偶(林*女)
    */

    //判斷需要攜帶的物件為何by婚姻狀況,成年與否,step1-2選擇的項目為何
    if (marryStatus == 'N') {
        if (adult == 'N') { //未成年未婚
            switch (level1Picked) {
                case '1':
                    if (level2Picked == '1' || level2Picked == '4') {
                        carryObjArr.push(1, 2);
                    } else if (level2Picked == '2' || level2Picked == '3') {
                        carryObjArr.push(1, 2, 3);
                    }
                    break;
                case '2':
                    carryObjArr.push(1, 2);
                    break;
                case '3':
                    if (level2Picked == '1') {
                        carryObjArr.push(1, 2, 4);
                    } else if (level2Picked == '2' || level2Picked == '3') {
                        carryObjArr.push(1, 2);
                    }
                    break;
                case '4':
                    carryObjArr.push(1, 2);
                    break;
            }
        } else if (adult == 'Y') { //已成年未婚
            switch (level1Picked) {
                case '1':
                    if (level2Picked == '1' || level2Picked == '2' || level2Picked == '3') {
                        carryObjArr.push(1, 2);
                    } else if (level2Picked == '4') {
                        carryObjArr.push(1, 2, 5);
                    }
                    break;
                case '2':
                    if (level2Picked == '1' || level2Picked == '2' || level2Picked == '3') {
                        carryObjArr.push(1, 2);
                    } else if (level2Picked == '4') {
                        carryObjArr.push(1, 2, 5);
                    }
                    break;
                case '3':
                    if (level2Picked == '1' || level2Picked == '2') {
                        carryObjArr.push(1, 2, 4);
                    } else if (level2Picked == '3' || level2Picked == '4') {
                        carryObjArr.push(1, 2, 4, 5);
                    }
                    break;
                case '4':
                    carryObjArr.push(1, 2, 4, 5);
                    break;
            }
        }
    } else if (marryStatus == 'Y') { //已婚
        switch (level1Picked) {
            case '1':
                if (level2Picked == '1' || level2Picked == '2' || level2Picked == '3') {
                    carryObjArr.push(1, 2);
                } else if (level2Picked == '4') {
                    carryObjArr.push(1, 2, 5);
                }
                break;
            case '2':
                if (level2Picked == '1' || level2Picked == '2') {
                    carryObjArr.push(1, 2);
                } else if (level2Picked == '3') {
                    carryObjArr.push(1, 2, 5);
                }
                break;
            case '3':
                if (level2Picked == '1' || level2Picked == '2') {
                    carryObjArr.push(1, 2);
                } else if (level2Picked == '3') {
                    carryObjArr.push(1, 2, 5);
                }
                break;
            case '4':
                carryObjArr.push(1, 2, 4);
                break;
        }
    }

    //判斷是否需要攜帶"政府機關出具之低收入戶或中低收入戶證明"
    if (loansPrice == '1') {
        if (accordingLife > 0) {
            carryObjArr.push(6);
        }
    } else if (loansPrice == '2') {
        if (freedomLife > 0) {
            carryObjArr.push(6);
        }
    }
    console.debug('carryObjArr:' + carryObjArr);

    //判斷哪些關係人是連帶保證人,需要要帶文件
    if (marryStatus == 'N') {
        if (adult == 'N') { //未成年未婚
            switch (level1Picked) {
                case '1':
                    if (level2Picked == '1') {
                        gaurantorObjArr.push('ab', 'ab');
                    } else if (level2Picked == '2') {
                        gaurantorObjArr.push('b', 'ab', 'a');
                    } else if (level2Picked == '3') {
                        gaurantorObjArr.push('a', 'ab', 'b');
                    } else if (level2Picked == '4') {
                        gaurantorObjArr.push('c', 'c');
                    }
                    break;
                case '2':
                    if (level2Picked == '1') {
                        gaurantorObjArr.push('ab', 'ab');
                    } else if (level2Picked == '2') {
                        gaurantorObjArr.push('a', 'a');
                    } else if (level2Picked == '3') {
                        gaurantorObjArr.push('b', 'b');
                    } else if (level2Picked == '4') {
                        gaurantorObjArr.push('c', 'c');
                    }
                    break;
                case '3':
                    if (level2Picked == '1') {
                        gaurantorObjArr.push('a', 'a', 'b');
                    } else if (level2Picked == '2') {
                        gaurantorObjArr.push('b', 'b');
                    } else if (level2Picked == '3') {
                        gaurantorObjArr.push('c', 'c');
                    }
                    break;
                case '4':
                    gaurantorObjArr.push('c', 'c');
                    break;
            }
        } else if (adult == 'Y') { //已成年未婚
            switch (level1Picked) {
                case '1':
                    if (level2Picked == '1') {
                        gaurantorObjArr.push('ab', 'ab');
                    } else if (level2Picked == '2') {
                        gaurantorObjArr.push('a', 'a');
                    } else if (level2Picked == '3') {
                        gaurantorObjArr.push('b', 'b');
                    } else if (level2Picked == '4') {
                        gaurantorObjArr.push('c', 'abc', 'c');
                    }
                    break;
                case '2':
                    if (level2Picked == '1') {
                        gaurantorObjArr.push('ab', 'ab');
                    } else if (level2Picked == '2') {
                        gaurantorObjArr.push('a', 'a');
                    } else if (level2Picked == '3') {
                        gaurantorObjArr.push('b', 'b');
                    } else if (level2Picked == '4') {
                        gaurantorObjArr.push('c', 'abc', 'c');
                    }
                    break;
                case '3':
                    if (level2Picked == '1') {
                        gaurantorObjArr.push('a', 'a', 'b');
                    } else if (level2Picked == '2') {
                        gaurantorObjArr.push('b', 'b', 'a');
                    } else if (level2Picked == '3') {
                        gaurantorObjArr.push('c', 'ac', 'b', 'c');
                    } else if (level2Picked == '4') {
                        gaurantorObjArr.push('c', 'bc', 'a', 'c');
                    }
                    break;
                case '4':
                    gaurantorObjArr.push('c', 'ab', 'c', 'c');
                    break;
            }
        }
    } else if (marryStatus == 'Y') { //已婚
        switch (level1Picked) {
            case '1':
                if (level2Picked == '1') {
                    gaurantorObjArr.push('d', 'd');
                } else if (level2Picked == '2') {
                    gaurantorObjArr.push('a', 'ad');
                } else if (level2Picked == '3') {
                    gaurantorObjArr.push('b', 'bd');
                } else if (level2Picked == '4') {
                    gaurantorObjArr.push('c', 'cd', 'c');
                }
                break;
            case '2':
                if (level2Picked == '1') {
                    gaurantorObjArr.push('a', 'ad');
                } else if (level2Picked == '2') {
                    gaurantorObjArr.push('b', 'bd');
                } else if (level2Picked == '3') {
                    gaurantorObjArr.push('c', 'cd', 'c');
                }
                break;
            case '3':
                if (level2Picked == '1') {
                    gaurantorObjArr.push('a', 'a');
                } else if (level2Picked == '2') {
                    gaurantorObjArr.push('b', 'b');
                } else if (level2Picked == '3') {
                    gaurantorObjArr.push('c', 'c', 'c');
                }
                break;
            case '4':
                if (level2Picked == '1') {
                    gaurantorObjArr.push('a', 'a', 'd');
                } else if (level2Picked == '2') {
                    gaurantorObjArr.push('b', 'b', 'd');
                } else if (level2Picked == '3') {
                    gaurantorObjArr.push('c', 'c', 'd');
                }
                break;
        }
    }
    console.debug('gaurantorObjArr:' + gaurantorObjArr);

    pushCarryObjString(appoName, carryObjArr, gaurantorObjArr, gaurantorTitle, gaurantorName);
    return (pushCarryObjString(appoName, carryObjArr, gaurantorObjArr, gaurantorTitle, gaurantorName));
}

//塞需要攜帶的文件,連帶保證人的字串
function pushCarryObjString(appoName, carryObjArray, gaurantorObjArray, gaurantorTitleArray, gaurantorNameArray) {
    var titleName;
    var allObjArr = [];
    var numberOfGaurantors = []; //要帶相同物件的連帶保證人有幾位
    //var allCarryObjArr = [];  //放所有需要攜帶的物件之全部結果
    var allGaurantorsArr = []; //放所有需要攜帶物件的連帶保證人之全部結果

    //塞連帶保證人的"title"和"name"的字串到allGaurantorsArr.
    var GaurantorsTitleName = 0;
    for (var j = 0; j <= gaurantorObjArray.length - 1; j++) {
        for (var i = 0; i <= gaurantorObjArray[j].length - 1; i++) {
            var currentCharacter = gaurantorObjArray[j].substr(i, 1);
            numberOfGaurantors[j] = gaurantorObjArray[j].length;
            switch (currentCharacter) {
                case 'a': //father
                    allGaurantorsArr[GaurantorsTitleName] = gaurantorTitleArray[0] + gaurantorNameArray[0];
                    GaurantorsTitleName += 1;
                    break;
                case 'b': //mother
                    allGaurantorsArr[GaurantorsTitleName] = gaurantorTitleArray[1] + gaurantorNameArray[1];
                    GaurantorsTitleName += 1;
                    break;
                case 'c': //thirdparty
                    allGaurantorsArr[GaurantorsTitleName] = gaurantorTitleArray[2] + gaurantorNameArray[2];
                    GaurantorsTitleName += 1;
                    break;
                case 'd': //spouse
                    allGaurantorsArr[GaurantorsTitleName] = gaurantorTitleArray[3] + gaurantorNameArray[3];
                    GaurantorsTitleName += 1;
                    break;
            }
        }
    }
    console.debug('allGaurantorsArr:' + allGaurantorsArr);

    //將要攜帶的文件之字串塞進allObjArr.
    var gaurantorIndex = 0;
    for (var k = 0; k <= carryObjArray.length - 1; k++) {
        var carryObj = carryObjArray[k];
        //console.debug(carryObjArray);
        switch (carryObj) {
            case 1: //(依判斷塞連帶保證人)之身分證及印章
                var sameObj = '';
                for (var g = 0; g <= gaurantorObjArray[k].length - 1; g++) {
                    if (g != gaurantorObjArray[k].length - 1) {
                        sameObj = sameObj + allGaurantorsArr[gaurantorIndex] + '、';
                        gaurantorIndex += 1;
                    } else {
                        sameObj = sameObj + allGaurantorsArr[gaurantorIndex];
                        gaurantorIndex += 1;
                    }
                    allObjArr[k] = sameObj + '之身分證及印章';
                }
                break;
            case 2: //戶籍謄本或新式戶口名簿【需為最近三個月且記事欄需詳載，包含本人(吳*名)、(依判斷塞連帶保證人)，如戶籍不同者，需分別檢附】
                var sameObj = '';
                for (var g = 0; g <= gaurantorObjArray[k].length - 1; g++) {
                    //alert(gaurantorIndex);
                    if (g != gaurantorObjArray[k].length - 1) {
                        sameObj = sameObj + allGaurantorsArr[gaurantorIndex] + '、';
                        gaurantorIndex += 1;
                    } else {
                        sameObj = sameObj + allGaurantorsArr[gaurantorIndex];
                        gaurantorIndex += 1;
                    }
                    allObjArr[k] = '戶籍謄本或新式戶口名簿<p>【需為最近三個月且記事欄需詳載，包含本人(' + appoName + ')、' + sameObj + '如戶籍不同者，需分別檢附】</p>';
                }
                break;
            case 3: //(依判斷塞連帶保證人)之特殊情形證明文件
                var sameObj = '';
                for (var g = 0; g <= gaurantorObjArray[k].length - 1; g++) {
                    if (g != gaurantorObjArray[k].length - 1) {
                        sameObj = sameObj + allGaurantorsArr[gaurantorIndex] + '、';
                        gaurantorIndex += 1;
                    } else {
                        sameObj = sameObj + allGaurantorsArr[gaurantorIndex];
                        gaurantorIndex += 1;
                    }
                    allObjArr[k] = sameObj + '之特殊情形證明文件';
                }
                break;
            case 4: //(依判斷塞連帶保證人)之除戶謄本或死亡證明
                var sameObj = '';
                for (var g = 0; g <= gaurantorObjArray[k].length - 1; g++) {
                    if (g != gaurantorObjArray[k].length - 1) {
                        sameObj = sameObj + allGaurantorsArr[gaurantorIndex] + '、';
                        gaurantorIndex += 1;
                    } else {
                        sameObj = sameObj + allGaurantorsArr[gaurantorIndex];
                        gaurantorIndex += 1;
                    }

                    allObjArr[k] = sameObj + '之除戶謄本或死亡證明';
                }
                break;
            case 5: //連帶保證人(塞c的關係人名)之扣繳憑單、財力證明或在職證明
                allObjArr[k] = gaurantorTitleArray[2] + gaurantorNameArray[2] + '之扣繳憑單、財力證明或在職證明';
                gaurantorIndex += 1;
                break;
            case 6: //政府機關出具之低收入戶或中低收入戶證明
                allObjArr[k] = '政府機關出具之低收入戶或中低收入戶證明';
                break;
        }
    }
    console.debug(allObjArr);
    //console.debug(allCarryObjArr);

    return allObjArr;
}