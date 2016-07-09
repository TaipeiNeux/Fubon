String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}


$(document).ready(function() {



    //定義每個步驟要對應的javascript function
    var stepEventHandler = {
        "personalInfo1": personalInfo_1,
        "personalInfo_2_1": personalInfo_2_1,
        "personalInfo_2_2": personalInfo_2_2,
        "personalInfo_3": personalInfo_3
    };

    var nextEventHanlder = {
        "personalInfo1": personalInfo_1_valid,
        "personalInfo_2_2": personalInfo_2_valid
    };

    if (jumpStep == 'null') {
        jumpStep = '';
    }
	
	//2016-07-08 added by titan ，填入每個步驟需要控制input的事件
	var getInputEventHandler = {
		"personalInfo1": function(){
			return {
				DomicileNeighborhood : {
					convertFullWidth : true
				},
				DomicileAddress : {
					convertFullWidth : true,
					focusClearVal : true
				},
				address : {
					convertFullWidth : true,
					focusClearVal : true
				}
			};
		}
	};

    g_ajax({
        url: 'flow?action=continue&flowId=personalInfo',
        //url: 'json/personalInfo_start.json',
        //url: 'json/personalInfo_1.json',
        //url: 'json/personalInfo_2_1.json',
        //url: 'json/personalInfo_2_2.json',
        //url: 'json/personalInfo_3.json',
        data: {
            step: jumpStep
        },
        callback: function(content) {
            console.debug(content);
            console.debug(stepEventHandler);
            console.debug(nextEventHanlder);

            //開始長流程畫面
            buildFlow(content, stepEventHandler, nextEventHanlder,undefined,getInputEventHandler);
        }
    });

});


function personalInfo_1(content) {

    // $("input").blur(function(){

    // var input_tmp = $(this).val();

    // function trans_fullwidth (ine){
    // var oute = '';
    // for(i=0; i<ine.length; i++) {
    // if(ine.charCodeAt(i)  >= 33 && ine.charCodeAt(i) <= 270) {
    // oute += String.fromCharCode(ine.charCodeAt(i) + 65248);
    // } else if(ine.charCodeAt(i) == 32) {
    // oute += String.fromCharCode(12288);
    // }
    // }
    // return oute;
    // }

    // console.log(trans_fullwidth(input_tmp));

    // });

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
    var userDomiPhone = $('[name="Domicile_Phone"]');
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
    var email_hidden = $('[name="email_hidden"]');
    var domicileAddress_hidden = $('[name="domicileAddress_hidden"]');
    var teleAddress_hidden = $('[name="teleAddress_hidden"]');
	
	
	var addressObj = {
        'citySelectTele': citySelect,
        'zipSelectTele': zipSelect,
        'addressTele': address
    };


    d_phone.val(domicilePhone);
    t_phone.val(phone);
    email_hidden.val(email);
    domicileAddress_hidden.val(domiAddr);
    teleAddress_hidden.val(addr);

    //限制輸入的長度
    userDomiCode.attr('maxlength', '3');
    userDomiPhone.attr('maxlength', '8');
    userCode.attr('maxlength', '3');
    userPhone.attr('maxlength', '8');
    userMobile.attr('maxlength', '10');
    dAddress.attr('maxlength', '93');
    address.attr('maxlength', '93');

    //hidden
    $('[name="id"]').val(id);
    $('[name="name"]').val(name);
    $('[name="birthday"]').val(birthday);

    userId.text(id);
    userName.text(name);
    
    $('.selectpicker').selectpicker();
    
    var jsonCity = modal.getCity();
    console.debug(jsonCity);
    cityArr = jsonCity.cities;
    var cityArray = [];

    //先把city的選項全塞進cityArray
    cityArray.push('<option value="">請選擇</option>');
    $.each(cityArr, function(i, cityData) {
        cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });
    
    
    var domicileCitySelectpicker = $('[name="domicileCityId"]');
    var domicileZipSelectpicker = $('[name="domicileZipCode"]');
    var domicileLinerSelectpicker = $('[name="domicileLiner"]');
    var citySelectpicker = $('[name="cityId"]');
    var zipSelectpicker = $('[name="zipCode"]');
    domicileCitySelectpicker.append(cityArray.join(''));
    domicileCitySelectpicker.selectpicker('refresh');
    domicileCitySelectpicker.trigger('change');
    citySelectpicker.append(cityArray.join(''));
    citySelectpicker.selectpicker('refresh');
    citySelectpicker.trigger('change');
    
    linkage.changeDomicileZipByCity(domicileCitySelectpicker, cityArr, domicileZipSelectpicker);
    domicileZipSelectpicker.trigger('change');
    linkage.changeZipByCity(citySelectpicker, cityArr, zipSelectpicker);
    zipSelectpicker.trigger('change');
    linkage.changeDomicileLinerByZip(domicileZipSelectpicker, cityArr, domicileLinerSelectpicker);
    zipSelectpicker.trigger('change');
    
    

    var b_year = birthday.substring(0, 3);
    var b_month = birthday.substring(3, 5);
    var b_day = birthday.substring(5, 7);
    if (content.isRecord == 'Y') {
        $('#birth_tmp_1').show();
        console.log(b_year + ' ' + b_month + ' ' + b_day);
        userBirthday.html('民國&nbsp' + b_year + '年&nbsp' + b_month + '月&nbsp' + b_day + '日&nbsp');

    } else {
        $('#birth_tmp_2').show();
        $('[name=birth_year]').val(b_year);
        $('[name=birth_month]').val(b_month);
        $('[name=birth_day]').val(b_day);

    }

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

    //抓結婚狀況的預設
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

    //2016-06-18 added by titan 綁半形轉全形
	/*
    GardenUtils.format.inputConvertFullWidth({
        name: ['DomicileNeighborhood', 'DomicileAddress', 'address']
    });
	*/

    //有撥款紀錄者,不開放修改,將input轉為label
    if (isRecord == 'Y') { //續貸
        //alert('123');
        inputToLabel(dNeighborhood);
        inputToLabel(dAddress);
        inputToLabel(userMobile);
        inputToLabel(dLinerName);
        /**
        domicileCitySelect.attr("disabled", true);
        domicileZipSelect.attr("disabled", true);
        domicileLinerSelect.attr("disabled", true);
		**/
        userSingle.attr("disabled", true);
        userMarry.attr("disabled", true);

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
            $.each(changeObj, function(i, obj) {
                var src = $('[name="' + obj.srcInput + '"]').val();
                var to = $('[name="' + obj.toInput + '"]');
                var tagName = to.prop('tagName').toLowerCase();

                //將戶籍地的村/里,鄰,地址一同塞入通訊地址的輸入框
                if (obj.toInput == "address") {
                    srcTemp = srcTemp + src;
                    console.debug(srcTemp);
                    if (obj.srcInput == "DomicileNeighborhood") {
                        srcTemp = srcTemp + '鄰';
                    } else if (obj.srcInput == "DomicileAddress") {
                        src = srcTemp;
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
        }
		else {
            //不要鎖死通訊地址
            lockAddress(addressObj, false);
        }
    });

    /*var PersonalInfo_controller = (function() {

        var show_data = [];

        var main = function() {

            var Show_data_1 = new Show_data();

            if (content.isRecord == 'Y') {
                Show_data_1.setStraegy(new have_record_client());
                Show_data_1.getCheck(content);

            } else {
                Show_data_1.setStraegy(new no_record_client());
                Show_data_1.getCheck(content);

            }

            // Output_data(content.isRecord,content);

            PersonalInfo_view.main_down(content);

        }

        var have_record_client = function() {}
        have_record_client.prototype.check = function(content) {

            console.log('has record');
            var birthday_tmp = '民國' + content.birthday.substr(0, 2) + '年' + content.birthday.substr(2, 2) + '月' + content.birthday.substr(4, 6) + '日';
            var marrage;

            if (content.marryStatus == 'Y')
                marrage = '已婚';
            else
                marrage = '未婚';


            var obj = {
                'id': content.id,
                "name": content.name,
                "birthday": birthday_tmp,
                "marryStatus": marrage,
                "domicilePhone": '(' + content.domicilePhone.regionCode + ')' + content.domicilePhone.phone,
                "telePhone": '(' + content.telePhone.regionCode + ')' + content.telePhone.phone,
                "mobile": content.mobile,
                "email": content.email,
                "domicileAddress": content.domicileAddress.address,
                "teleAddress": content.teleAddress.address
            };
            PersonalInfo_view.show_input(content.isRecord, obj);
            //PersonalInfo_view.insert_data(data.Content.isRecord,obj);
            // show_data.push(obj);
        };

        var no_record_client = function() {}
        no_record_client.prototype.check = function(content) {

            console.log('no record');

            // --start input 長出與否的狀態  
            var obj = {
                'id': content.id,
                "name": content.name,
                "birthday": content.birthday,
                "marryStatus": "",
                "domicilePhone": "",
                "telePhone": "",
                "email": content.email,
                "mobile": content.mobile,
                "domicileAddress": "",
                "teleAddress": ""
            };
            PersonalInfo_view.show_input(content.isRecord, obj);
            //  --end input 長出與否的狀態  

        };

        // var Output_data = function (Record,content){

        //     $('.blu').off('click').on('click',function(){

        //         var return_data;
        //         if(Record=='Y'){

        //             var domicilePhone = { "regionCode": $('.tmp_domicilePhone_s').val()  , "phone": $('.tmp_domicilePhone_m').val() };
        //             var telePhone = { "regionCode": $('.tmp_telePhone_s').val()  , "phone": $('.tmp_telePhone_m').val() };
        //             var tmp_birth = $('.tmp_birth').html().substr(2,3)+$('.tmp_birth').html().substr(5,6)+$('.tmp_birth').html().substr(8,9);
        //             var tmp_teleAddress =  { "cityId" : $('.tmp_teleAddress').find('.pull-left').eq(0).html() , "zipCode" : $('.tmp_teleAddress').find('.pull-left').eq(1).html(),  "address" : $('.tmp_teleAddress').find('input').eq(0).val() };

        //             return_data ={'id':$('.tmp_id').html(),'name': $('.tmp_name').html(), 'birthday': content.birthday , 'marryStatus':content.marryStatus , "domicilePhone": domicilePhone , "telePhone":telePhone , "mobile": $('.tmp_mobile').html(), 'email': $('.tmp_email').children().val() , "domicileAddress" : content.domicileAddress , "teleAddress": tmp_teleAddress} ;

        //         }
        //         else {  
        //             var tmp_birth = $('.birth_y')+$('.birth_m')+$('.birth_d');
        //             var domicilePhone = { "regionCode": $('.tmp_domicilePhone_s').val()  , "phone": $('.tmp_domicilePhone_m').val() };
        //             var telePhone = { "regionCode": $('.tmp_telePhone_s').val()  , "phone": $('.tmp_telePhone_m').val() };
        //             var tmp_domicileAddress = { "cityId" : $('.tmp_domicileAddress').find('.pull-left').eq(0).html() , "zipCode" : $('.tmp_domicileAddress').find('.pull-left').eq(1).html(),  "address" : $('.tmp_domicileAddress').find('input').eq(0).val() };
        //             var tmp_teleAddress =  { "cityId" : $('.tmp_teleAddress').find('.pull-left').eq(0).html() , "zipCode" : $('.tmp_teleAddress').find('.pull-left').eq(1).html(),  "address" : $('.tmp_teleAddress').find('input').eq(0).val() };

        //             return_data ={'id':$('.tmp_id').children().val(),'name': $('.tmp_name').children().val(), 'birthday': tmp_birth , 'marryStatus':'' , "domicilePhone": domicilePhone , "telePhone":telePhone , "mobile": $('.tmp_mobile').children().val(), 'email': $('.tmp_email').children().val() , "domicileAddress" : tmp_domicileAddress , "teleAddress": tmp_teleAddress} ;

        //         }
        //         alert('123');
        //         console.log(return_data);
        //         // return return_data;
        //     });

        // }

        var Show_data = function() {
            this.strategy = null;
        }
        Show_data.prototype.setStraegy = function(strategy) {
            // body...
            this.strategy = strategy;
        };
        Show_data.prototype.getCheck = function(content) {
            // body...
            return this.strategy.check(content);
        };


        return {
            main: main

        };

    })();

    var PersonalInfo_view = (function() {

        var main_down = function(content) {


            $('<div class="earth">' + content.notice_text + '</div>').appendTo($('.processOutBox'));


        }

        //--start  show_input   
        var show_input = function(Record, data) {

                obj = {
                    id: "",
                    name: "",
                    birthday_y: "",
                    birthday_m: "",
                    birthday_d: "",
                    marryStatus: "",
                    domicilePhone: "",
                    telePhone: "",
                    mobile: "",
                    email: "",
                    domicileAddress: "",
                    teleAddress: ""
                };

                if (Record == 'N') {


                     //no record  
                    $.each(data, function(index, value) {

                        console.log(value);
                        switch (index) {
                            case "id":
                                $('.tmp_id').html('<input class="input_m" type="text"  name="id">');
                                $('.tmp_id').after('<div class="error-msg"/>');
                                $('input[name="id"]').val(value);
                                obj.id = value;
                                break;
                            case "name":
                                $('.tmp_name').html('<input class="input_m" type="text" name="name">');
                                $('.tmp_name').after('<div class="error-msg"/>');
                                $('input[name="name"]').val(value);
                                obj.name = value;
                                break;
                            case "birthday":
                                $('.tmp_birth').html('<input class="input_s birth_y" type="text" value="' + value.substr(0, 2) + '" name="birthday_y">年&nbsp<input class="input_s "birth_m" type="text" value="' + value.substr(2, 2) + '" name="birthday_m">月&nbsp<input class="input_s birth_d" type="text" value="' + value.substr(4, 6) + '" name="birthday_d">日');
                                $('.tmp_birth').after('<div class="error-msg"/>');
                                obj.birthday_y = value.substr(0, 2);
                                obj.birthday_m = value.substr(2, 2);
                                obj.birthday_d = value.substr(4, 6);
                                break;
                            case "marryStatus":
                                $('.tmp_marrage').html('<div class="radioArea"> <input type="radio" name="marry" id="single" class="css-checkbox_c" > <label for="single" class="css-label_c radGroup2">未婚</label> </div> <div class="radioArea"> <input type="radio" name="marry" id="married" class="css-checkbox_c" > <label for="married" class="css-label_c radGroup2">已婚(含離婚或配偶過世)</label> </div><div class="error-msg"/>');

                                // if(value == 'N')
                                //     $( "#single" ).prop( "checked", true );
                                // else
                                //     $( "#married" ).prop( "checked", true );

                                obj.marryStatus = value;

                                break;
                            case "domicilePhone":

                                $('.tmp_domicilePhone_m').after('<div class="error-msg"/>');
                                //obj.domicilePhone = 
                                break;
                            case "telePhone":

                                $('.tmp_telePhone_m').after('<div class="error-msg"/>');
                                break;
                            case "mobile":
                                $('.tmp_mobile').html('<input class="input_m" type="text" value="' + value + '" name="mobile"><div class="error-msg"/>');
                                obj.mobile = value;

                                break;
                            case "email":
                                $('.tmp_email').html('<input class="input_m" type="text" placeholder="****254@gmail.com" value="' + value + '" name="email"><div class="error-msg"/>');
                                obj.email = value;
                                break;
                            case "domicileAddress":
                                //$('.tmp_domicileAddress').html('<div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" ><span class="filter-option pull-left">基隆市</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="-1"><a tabindex="0" class="" style="" data-tokens="null">  <span class="text">請選擇</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li> <li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null">  <span class="text">基隆市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新竹市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">雲林縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">高雄市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">苗栗市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">宜蘭市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">屏東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台中市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南投市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">桃園市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="13"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">嘉義市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="14"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台南市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="15"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">花蓮市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" tabindex="-98"> <option>基隆市</option> <option>新竹市</option> <option>雲林縣</option> <option>高雄市</option> <option>台北市</option> <option>苗栗市</option> <option>宜蘭市</option> <option>屏東縣</option> <option>新北市</option> <option>台中市</option> <option>南投市</option> <option>台東縣</option> <option>桃園市</option> <option>嘉義市</option> <option>台南市</option> <option>花蓮市</option> </select></div> <div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="北投區"><span class="filter-option pull-left">北投區</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="-1" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">請選擇</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">北投區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">大同區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">文山區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">中正區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">士林區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">內湖區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">信義區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">松山區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">中山區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">萬華區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南港區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">大安區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" tabindex="-98"> <option>北投區</option> <option>大同區</option> <option>文山區</option> <option>中正區</option> <option>士林區</option> <option>內湖區</option> <option>信義區</option> <option>松山區</option> <option>中山區</option> <option>萬華區</option> <option>南港區</option> <option>大安區</option> </select></div> <input type="text" class="input_m" name="domicileAddress"><div class="error-msg"/>');

                                $('.tmp_domicileAddress').html('<div class="btn-group bootstrap-select input_y "><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="宜蘭縣" aria-expanded="false"><span class="filter-option pull-left">宜蘭縣</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open" style="max-height: 457px; overflow: hidden; min-height: 92px;"><ul class="dropdown-menu inner" role="menu" style="max-height: 445px; overflow-y: auto; min-height: 80px;"><li data-original-index="0"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇縣市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">基隆市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">宜蘭縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新竹市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新竹縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">桃園市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">苗栗縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台中市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">彰化縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南投縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">嘉義市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="13"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">嘉義縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="14"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">雲林縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="15"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台南市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="16"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">高雄市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="17"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">澎湖縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="18"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">屏東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="19"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="20"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">花蓮縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="21"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">金門縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="22"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">連江縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="domicileCityId" tabindex="-98"> <option value="">選擇縣市</option><option value="01">台北市</option><option value="02">基隆市</option><option value="03">新北市</option><option value="04">宜蘭縣</option><option value="05">新竹市</option><option value="06">新竹縣</option><option value="07">桃園市</option><option value="08">苗栗縣</option><option value="09">台中市</option><option value="11">彰化縣</option><option value="12">南投縣</option><option value="13">嘉義市</option><option value="14">嘉義縣</option><option value="15">雲林縣</option><option value="16">台南市</option><option value="18">高雄市</option><option value="20">澎湖縣</option><option value="21">屏東縣</option><option value="22">台東縣</option><option value="23">花蓮縣</option><option value="24">金門縣</option><option value="25">連江縣</option></select></div> <div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="礁溪鄉" aria-expanded="false"><span class="filter-option pull-left">礁溪鄉</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open" style="max-height: 251px; overflow: hidden; min-height: 92px;"><ul class="dropdown-menu inner" role="menu" style="max-height: 239px; overflow-y: auto; min-height: 80px;"><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇鄉鎮市區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">宜蘭市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">頭城鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">礁溪鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">壯圍鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">員山鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">羅東鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">三星鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">大同鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">五結鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">冬山鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">蘇澳鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南澳鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="domicileZipCode" tabindex="-98"><option value="">選擇鄉鎮市區</option><option value="260">宜蘭市</option><option value="261">頭城鎮</option><option value="262">礁溪鄉</option><option value="263">壯圍鄉</option><option value="264">員山鄉</option><option value="265">羅東鎮</option><option value="266">三星鄉</option><option value="267">大同鄉</option><option value="268">五結鄉</option><option value="269">冬山鄉</option><option value="270">蘇澳鎮</option><option value="272">南澳鄉</option></select></div> <div class="btn-group bootstrap-select input_y "><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="村" aria-expanded="false"><span class="filter-option pull-left">村</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open" style="max-height: 216px; overflow: hidden; min-height: 0px;"><ul class="dropdown-menu inner" role="menu" style="max-height: 204px; overflow-y: auto; min-height: 0px;"><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇村/里</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">村</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">里</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="domicileLiner" tabindex="-98"><option value="">選擇村/里</option><option value="村">村</option><option value="里">里</option></select></div> <input type="text" name="DomicileNeighborhood" id="dNeighborhood" class="input_s"> 鄰 <input type="text" name="DomicileAddress" id="dAddress" class="input_m" maxlength="93"> <div class="error-msg"></div>');
                                obj.domicileAddress = value;

                                break;
                            case "teleAddress":
                                //$('.tmp_teleAddress').html('<div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" ><span class="filter-option pull-left">基隆市</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="-1"><a tabindex="0" class="" style="" data-tokens="null">  <span class="text">請選擇</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">基隆市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新竹市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">雲林縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">高雄市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">苗栗市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">宜蘭市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">屏東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台中市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南投市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">桃園市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="13"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">嘉義市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="14"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台南市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="15"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">花蓮市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" tabindex="-98"> <option>基隆市</option> <option>新竹市</option> <option>雲林縣</option> <option>高雄市</option> <option>台北市</option> <option>苗栗市</option> <option>宜蘭市</option> <option>屏東縣</option> <option>新北市</option> <option>台中市</option> <option>南投市</option> <option>台東縣</option> <option>桃園市</option> <option>嘉義市</option> <option>台南市</option> <option>花蓮市</option> </select></div> <div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="北投區"><span class="filter-option pull-left">北投區</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="-1" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">請選擇</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">北投區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">大同區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">文山區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">中正區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">士林區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">內湖區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">信義區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">松山區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">中山區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">萬華區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南港區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">大安區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" tabindex="-98"> <option>北投區</option> <option>大同區</option> <option>文山區</option> <option>中正區</option> <option>士林區</option> <option>內湖區</option> <option>信義區</option> <option>松山區</option> <option>中山區</option> <option>萬華區</option> <option>南港區</option> <option>大安區</option> </select></div> <input type="text" class="input_m"  name="teleAddress"><div class="error-msg"/>');

                                $('.tmp_teleAddress').html('<div class="sp"> <input type="checkbox" name="purchaser" id="add" class="css-checkbox"> <label for="add" class="css-label">同戶籍地址</label> </div> <div class="btn-group bootstrap-select input_y "><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="宜蘭縣" aria-expanded="false"><span class="filter-option pull-left">宜蘭縣</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open" style="max-height: 519px; overflow: hidden; min-height: 92px;"><ul class="dropdown-menu inner" role="menu" style="max-height: 507px; overflow-y: auto; min-height: 80px;"><li data-original-index="0"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇縣市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">基隆市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">宜蘭縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新竹市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新竹縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">桃園市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">苗栗縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台中市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">彰化縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南投縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">嘉義市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="13"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">嘉義縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="14"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">雲林縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="15"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台南市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="16"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">高雄市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="17"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">澎湖縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="18"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">屏東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="19"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="20"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">花蓮縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="21"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">金門縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="22"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">連江縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="cityId" tabindex="-98"> <option value="">選擇縣市</option><option value="01">台北市</option><option value="02">基隆市</option><option value="03">新北市</option><option value="04">宜蘭縣</option><option value="05">新竹市</option><option value="06">新竹縣</option><option value="07">桃園市</option><option value="08">苗栗縣</option><option value="09">台中市</option><option value="11">彰化縣</option><option value="12">南投縣</option><option value="13">嘉義市</option><option value="14">嘉義縣</option><option value="15">雲林縣</option><option value="16">台南市</option><option value="18">高雄市</option><option value="20">澎湖縣</option><option value="21">屏東縣</option><option value="22">台東縣</option><option value="23">花蓮縣</option><option value="24">金門縣</option><option value="25">連江縣</option></select></div> <div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="礁溪鄉"><span class="filter-option pull-left">礁溪鄉</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="0"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇鄉鎮市區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">宜蘭市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">頭城鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">礁溪鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">壯圍鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">員山鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">羅東鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">三星鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">大同鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">五結鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">冬山鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">蘇澳鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南澳鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="zipCode" tabindex="-98"><option value="">選擇鄉鎮市區</option><option value="260">宜蘭市</option><option value="261">頭城鎮</option><option value="262">礁溪鄉</option><option value="263">壯圍鄉</option><option value="264">員山鄉</option><option value="265">羅東鎮</option><option value="266">三星鄉</option><option value="267">大同鄉</option><option value="268">五結鄉</option><option value="269">冬山鄉</option><option value="270">蘇澳鎮</option><option value="272">南澳鄉</option></select></div> <div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="村"><span class="filter-option pull-left">村</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="0"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇村/里</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">村</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">里</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="liner" tabindex="-98"><option value="">選擇村/里</option><option value="村">村</option><option value="里">里</option></select></div> <input type="text" class="input_s" id="neighborhood" name="neighborhood"> 鄰 <input type="text" class="input_m" id="address" name="address" maxlength="93"> <div class="error-msg"></div> ');

                                obj.teleAddress = value;
                                break;
                        }

                    });
                } else if (Record == 'Y') {
                    // no record  
                    $.each(data, function(index, value) {
                        console.log(value);
                        switch (index) {
                            case "id":
                                obj.id = value;
                                $('.tmp_id').html(value);
                                break;
                            case "name":
                                // value = value.replaceAt(1, "*");
                                $('.tmp_name').html(value);
                                obj.name = value;
                                break;
                            case "birthday":
                                $('.tmp_birth').html(value);
                                obj.birthday_y = value.substr(0, 2);
                                obj.birthday_m = value.substr(2, 2);
                                obj.birthday_d = value.substr(4, 6);
                                break;
                            case "marryStatus":
                                $('.tmp_marrage').html(value);
                                break;
                            case "domicilePhone":
                                $('.tmp_domicilePhone_s').val(value.substr(1, 2));
                                $('.tmp_domicilePhone_m').val(value.substr(4, 11));
                                $('.tmp_domicilePhone_m').after('<div class="error-msg"/>');

                                obj.domicilePhone = value.substr(4, 11);

                                break;
                            case "telePhone":

                                $('.tmp_telePhone_s').val(value.substr(1, 2));
                                $('.tmp_telePhone_m').val(value.substr(4, 11));
                                $('.tmp_telePhone_m').after('<div class="error-msg"/>');

                                obj.telePhone = value.substr(4, 11);
                                break;
                            case "mobile":

                                $('.tmp_mobile').html(value);
                                obj.mobile = value;
                                break;
                            case "email":
                                $('.tmp_email').html('<input class="input_m" type="text" placeholder="****254@gmail.com" value="' + value + '" name="email"><div class="error-msg"/>');
                                obj.email = value;
                                break;
                            case "domicileAddress":
                                $('.tmp_domicileAddress').html(value);
                                obj.domicileAddress = value;
                                break;
                            case "teleAddress":
                                // $('.tmp_teleAddress').html(value);
                                $('.tmp_teleAddress').html('<div class="sp"> <input type="checkbox" name="purchaser" id="add" class="css-checkbox"> <label for="add" class="css-label">同戶籍地址</label> </div> <div class="btn-group bootstrap-select input_y "><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="宜蘭縣" aria-expanded="false"><span class="filter-option pull-left">宜蘭縣</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open" style="max-height: 519px; overflow: hidden; min-height: 92px;"><ul class="dropdown-menu inner" role="menu" style="max-height: 507px; overflow-y: auto; min-height: 80px;"><li data-original-index="0"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇縣市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">基隆市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新北市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">宜蘭縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新竹市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">新竹縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">桃園市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">苗栗縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台中市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">彰化縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南投縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">嘉義市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="13"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">嘉義縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="14"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">雲林縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="15"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台南市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="16"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">高雄市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="17"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">澎湖縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="18"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">屏東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="19"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">台東縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="20"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">花蓮縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="21"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">金門縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="22"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">連江縣</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="cityId" tabindex="-98"> <option value="">選擇縣市</option><option value="01">台北市</option><option value="02">基隆市</option><option value="03">新北市</option><option value="04">宜蘭縣</option><option value="05">新竹市</option><option value="06">新竹縣</option><option value="07">桃園市</option><option value="08">苗栗縣</option><option value="09">台中市</option><option value="11">彰化縣</option><option value="12">南投縣</option><option value="13">嘉義市</option><option value="14">嘉義縣</option><option value="15">雲林縣</option><option value="16">台南市</option><option value="18">高雄市</option><option value="20">澎湖縣</option><option value="21">屏東縣</option><option value="22">台東縣</option><option value="23">花蓮縣</option><option value="24">金門縣</option><option value="25">連江縣</option></select></div> <div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="礁溪鄉"><span class="filter-option pull-left">礁溪鄉</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="0"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇鄉鎮市區</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">宜蘭市</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">頭城鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="3" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">礁溪鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="4"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">壯圍鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="5"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">員山鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="6"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">羅東鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="7"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">三星鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="8"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">大同鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="9"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">五結鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="10"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">冬山鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="11"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">蘇澳鎮</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="12"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">南澳鄉</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="zipCode" tabindex="-98"><option value="">選擇鄉鎮市區</option><option value="260">宜蘭市</option><option value="261">頭城鎮</option><option value="262">礁溪鄉</option><option value="263">壯圍鄉</option><option value="264">員山鄉</option><option value="265">羅東鎮</option><option value="266">三星鄉</option><option value="267">大同鄉</option><option value="268">五結鄉</option><option value="269">冬山鄉</option><option value="270">蘇澳鎮</option><option value="272">南澳鄉</option></select></div> <div class="btn-group bootstrap-select input_y"><button type="button" class="btn dropdown-toggle btn-default" data-toggle="dropdown" title="村"><span class="filter-option pull-left">村</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner" role="menu"><li data-original-index="0"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">選擇村/里</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="1" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">村</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li><li data-original-index="2"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">里</span><span class="glyphicon glyphicon-ok check-mark"></span></a></li></ul></div><select class="selectpicker input_y" name="liner" tabindex="-98"><option value="">選擇村/里</option><option value="村">村</option><option value="里">里</option></select></div> <input type="text" class="input_s" id="neighborhood" name="neighborhood"> 鄰 <input type="text" class="input_m" id="address" name="address" maxlength="93"> <div class="error-msg"></div>');

                                $('.tmp_teleAddress_top').show();
                                obj.teleAddress = value;
                                break;
                        }

                        //tmp_index++;
                    });
                }

                $('<input type="text" value="' + obj.domicilePhone + '" name="domicilePhone_hidden" style="display:none;">').appendTo($('.processInner'));
                $('<input type="text" value="' + obj.telePhone + '" name="telePhone_hidden" style="display:none;">').appendTo($('.processInner'));
                $('<input type="text" value="' + obj.id + '" name="id_hidden" style="display:none;">').appendTo($('.processInner'));
                $('<input type="text" value="' + obj.mobile + '" name="mobile_hidden" style="display:none;">').appendTo($('.processInner'));
                $('<input type="text" value="' + obj.name + '" name="name_hidden" style="display:none;">').appendTo($('.processInner'));
                $('<input type="text" value="' + obj.email + '" name="email_hidden" style="display:none;">').appendTo($('.processInner'));
            }
            // --end  show_input   

        return {
            show_input: show_input,
            main_down: main_down
        };

    })();

    PersonalInfo_controller.main();
*/

} // end personalInfo_1 function

function personalInfo_2_1(content) {
    var PersonalInfo_controller = (function() {

        console.debug(content);
        var show_data = [];

        var main = function() {

            //  要資料  
            // var data = PersonalInfo_modal.client_data('haha_js_personalInfo/client_data_0.json');
            var birthday_tmp = '民國' + content.birthday.substr(0, 3) + '年' + content.birthday.substr(3, 2) + '月' + content.birthday.substr(5, 6) + '日';
            if (content.marryStatus == 'Y')
                marrage = '已婚';
            else
                marrage = '未婚';

            var obj = {
                'id': content.id,
                "name": content.name,
                "birthday": birthday_tmp,
                "marryStatus": marrage,
                "domicilePhone": '(' + content.domicilePhone.regionCode + ')' + content.domicilePhone.phone,
                "telePhone": '(' + content.telePhone.regionCode + ')' + content.telePhone.phone,
                "email": content.email,
                "mobile": content.mobile,
                "domicileAddress": content.domicileAddress.address,
                "teleAddress": content.teleAddress.address
            };

            PersonalInfo_view.show_input(content.isRecord, obj);
            // PersonalInfo_view.show_warning(data.Content.isRecord,obj);

        }


        var Show_data = function() {
            this.strategy = null;
        }
        Show_data.prototype.setStraegy = function(strategy) {
            // body...
            this.strategy = strategy;
        };
        Show_data.prototype.getCheck = function(data) {
            // body...
            return this.strategy.check(data);
        };


        return {
            main: main

        };

    })();

    var PersonalInfo_view = (function() {


        var show_input = function(Record, data) {
            console.log(data);
            var tmp_index = 0;
            $.each(data, function(index, value) {

                $('.processInner').find('.dynamic_data').eq(tmp_index).html(value);


                tmp_index++;
            });


            if (Record == 'N')
                $('.ubt').html('按「確認｣後,本行將寄發六位數交易驗證碼至您Email <span class="blue">' + data.email + '</span>；<br> 若該Email錯誤或5分鐘內未收到交易驗證碼,請洽客戶服務專線02-8751-6665按5。');

            else if (Record == 'Y')
                $('.ubt').html('按「確認｣後,本行將寄發六位數交易驗證碼至您手機號碼 <span class="blue">' + data.mobile + '</span>；<br> 若該手機號碼錯誤或5分鐘內未收到交易驗證碼,請洽客戶服務專線02-8751-6665按5。');
        }



        return {
            show_input: show_input
        };

    })();



    PersonalInfo_controller.main();

} // end personalInfo_2 function

function personalInfo_2_2(content) {

    var imgSrc = content.code_img;
    var emailValue = content.email;
    var mobileValue = content.mobile;
    var mobileNumber = content.mobile;
    var hasAppropriation = content.hasAppropriation;
    var img = $('#img');
    var mobile = $('#mobile')
    var codeInput = $('[name="codeInput"]');
    var tipMsg = [];
    
    if (hasAppropriation == 'N'){
        tipMsg.push('<h4 class="mipa">請輸入本行寄發到您&nbsp;Email<div class="mipa" id="email">&nbsp;' + emailValue + '</div></h4><h4 class="mipa">的六位數交易驗證碼;<div>如有疑問,請洽客戶服務專線 02-8751-6665 按 5。</div></h4>');
    }
    else if (hasAppropriation == 'Y'){
        tipMsg.push('<h4 class="mipa">請輸入本行寄發到您&nbsp;手機號碼<div class="mipa" id="mobile">&nbsp;' + mobileValue + '</div></h4><h4 class="mipa">的六位數交易驗證碼;<br/>如有疑問,請洽客戶服務專線 02-8751-6665 按 5。</h4>');
    }
    $('.tip').append(tipMsg.join(''));    


    codeInput.attr('maxlength', '6');
    img.attr('src', imgSrc);
    mobile.text(mobileNumber);

    g_countdown({
        minute: 4,
        second: 59,
        modal_id: 'myModal_person_2',
        deadline_class: 'applyDate'
    });

    /*var imgSrc = content.code_img;
    var mobile = content.mobile;
    var email = content.email;
    var Record = content.hasAppropriation;
    var applyDate = new Date();
    var applyYear = applyDate.getFullYear();
    var applyMonth = applyDate.getMonth() + 1;
    var applyDay = applyDate.getDate();
    var applyHours = applyDate.getHours();
    var applyMinutes = applyDate.getMinutes();
    var applySeconds = applyDate.getSeconds();
    var checkArr = [];
	
	
	if (Record == 'N')
                $('.tip').html('<h4 class="mipa">請輸入本行寄發到您Email<div class="mipa" id="email">'+email+'</div></h4><h4 class="mipa">的六位數交易驗證碼;<div>如有疑問,請洽客戶服務專線 02-8751-6665 按 5。</div></h4>');

            else if (Record == 'Y')
                $('.tip').html('<h4 class="mipa">請輸入本行寄發到您手機號碼<div class="mipa" id="mobile">'+mobile+'</div></h4><h4 class="mipa">的六位數交易驗證碼;<div>如有疑問,請洽客戶服務專線 02-8751-6665 按 5。</div></h4>');
     
	

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
    
    var date = applyYear + '/' + applyMonth + '/' + applyDay + ' ' + applyHours + ':' + (parseInt(applyMinutes)  + 5) + ':' + applySeconds;

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
		if( $('#sec').text() < 10 && $('#sec').text() > 0 ){
			
			$('#sec').text('0' + $('#sec').text());
		}
        if ($('#sec').text() == 0) {
            $('#sec').text(59);
            $('#mins').text($('#mins').text() - 1);
            min = min - 1;
            if (min < 0) {
                $('#mins').text(0);
                $('#sec').text('00');
                
                $("#modal_personalInfo_2_1").modal('show');

				//按下確定後,關掉彈跳訊息及轉導到前一步驟
	            $("#modal_personalInfo_2_1 a.submitBtn").on('click', function(){
	                $("#modal_personalInfo_2_1").modal('hide');
					
					window.location = 'personalInfo_flow.jsp?step=personalInfo_2_1';
	            }); 
                clearInterval(start);
            }
        }
    }

    var start = setInterval(countdown, 1000);*/



} // end personalInfo_3 function

function personalInfo_3(content) {

    //把得到的資料塞進畫面中
    //
    //取得的user資料
    var result = content.registerResult;
    var date = content.registerDate;
    var time = content.registerTime;
    var errorCode = content.errorCode;
    var errorMsg = content.errorMsg;


    //畫面上要顯示的user資料之tag id
    var registerResult = $('#registerResult');
    var registerDate = $('#registerDate');
    var registerTime = $('#registerTime');

    var resultMsg = '';

    if (result == 'success') {
        resultMsg = '變更成功!';
    } else {
        resultMsg = '變更失敗!(' + errorCode + ')' + errorMsg;
    }

    registerResult.text(resultMsg);
    registerResult.addClass((result == 'success') ? 'nike' : 'deny');
    registerDate.text(date);
    registerTime.text(time);

    //若失敗則不顯示變更資料
    if (result != 'success') {
        $('.myData').hide();
    }

    var PersonalInfo_controller = (function() {

        var show_data = [];

        var main = function(counting_num) {
            //alert('123');
            /**  要資料  **/
            // var data = PersonalInfo_modal.client_data('haha_js_personalInfo/client_data_0.json');

        }

        return {
            main: main

        };

    })();

    var PersonalInfo_view = (function() {


        var show_data = function(Record, data) {
            //$('.sufe').find('.right > ').find('')

            $('.id').html(content.id);
            $('.name').html(content.name);

            var birthday_tmp = '民國' + content.birthday.substr(0, 3) + '年' + content.birthday.substr(3, 2) + '月' + content.birthday.substr(5, 6) + '日';
            $('.birthday').html(birthday_tmp);

            var marrage;
            if (content.marryStatus == 'N')
                marrage = '未婚';
            else
                marrage = '已婚';
            $('.marryStatus').html(marrage);

            $('.domicilePhone').html('(' + content.domicilePhone.regionCode + ')' + content.domicilePhone.phone);
            $('.telePhone').html('(' + content.telePhone.regionCode + ')' + content.telePhone.phone);
            $('.mobile').html(content.mobile);
            $('.email').html(content.email);
            $('.domicileAddress').html(content.domicileAddress.address);

            $('.teleAddress').html(content.teleAddress.address);
        }

        var set_time = function() {
            var time = new Date();

            console.log(time);
            var day = time.getDate();
            var year = time.getFullYear();
            var hour = time.getHours();
            var month = time.getUTCMonth() + 1;
            var minute = time.getMinutes();
            var second = time.getSeconds();
            console.log(content);
            // var tmp = parseInt(content.counting_time);
            $('.set_time').html(year + '/' + month + '/' + day + '/  ' + hour + ':' + (minute) + ':' + second);


        }
        return {
            show_data: show_data,
            set_time: set_time
        };

    })();

    PersonalInfo_view.set_time();
    PersonalInfo_view.show_data();

    // var tmp_time = parseInt(content.counting_time) -1 ;
    // PersonalInfo_controller.main(tmp_time);


} // end personalInfo_3 function

/** Register Valid **/

function personalInfo_1_valid() {
    var res = GardenUtils.valid.validForm({
        type: "show",
        showAllErr: false,
        formId: ["mainForm"],
        validEmpty: [{
                name: 'birth_year',
                msg: '生日',
                group: 'birth',
            }, {
                name: 'birth_month',
                msg: '生日',
                group: 'birth',
            }, {
                name: 'birth_day',
                msg: '生日',
                group: 'birth',
            },

            {
                name: 'email',
                msg: 'Email'
            }, {
                name: 'DomicileArea',
                msg: '戶籍電話',
                group: 'domicilePhone'
            }, {
                name: 'Domicile_Phone',
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
                msg: '行動電話'
            }, {
                name: 'DomicileNeighborhood',
                msg: '戶籍地址',
                group: 'domicileAddr'
            }, {
                name: 'DomicileAddress',
                msg: '戶籍地址',
                group: 'domicileAddr'
            }, {
                name: 'neighborhood',
                msg: '通訊地址',
                group: 'addr'
            }, {
                name: 'address',
                msg: '通訊地址',
                group: 'addr'
            }, {
                name: 'domicileCityId',
                msg: '戶籍地址',
                group: 'domicileAddr'
            }, {
                name: 'domicileZipCode',
                msg: '戶籍地址',
                group: 'domicileAddr'
            }, {
                name: 'domicileLiner',
                msg: '戶籍地址',
                group: 'domicileAddr'
            }, {
                name: 'cityId',
                msg: '通訊地址',
                group: 'addr'
            }, {
                name: 'zipCode',
                msg: '通訊地址',
                group: 'addr'
            }, {
                name: 'liner',
                msg: '通訊地址',
                group: 'addr'
            }
        ],
        validNumber: [{
                name: 'birth_year',
                msg: '生日',
                group: 'birth',
            }, {
                name: 'birth_month',
                msg: '生日',
                group: 'birth',
            }, {
                name: 'birth_day',
                msg: '生日',
                group: 'birth',
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
            }
            /*因為現在測試機行動電話都是隱碼，所以傳出去都會被擋, 
		{
            name: 'cellPhone',
            msg: '行動電話',
			allowEmpty : false
        }*/
        ],
        validDecimal: [],
        validEmail: [{
            name: 'email',
            msg: 'Email',
            hasHiddenCode: true,
            hiddenTarget: $('input[name="email_hidden"]').val()
        }],
        validDate: [{
            name: ['birth_year', 'birth_month', 'birth_day'],
            msg: '生日',
            //val: $('[name="' + family + 'birthday0' + '"]').val() + '/' + $('[name="' + family + 'birthday2' + '"]').val() + '/' + $('[name="' + family + 'birthday4' + '"]').val(),
            splitEle: '/',
            format: 'ch',
            allowEmpty: false,
            group: 'birth'
        }],
        validMobile: [{
            name: 'cellPhone',
            msg: '行動電話',
            hasHiddenCode: true,
            hiddenTarget: $('input[name="mobile_hidden"]').val()
        }],
        errorDel: [],
        customizeFun: function(customizeValidResult) {
			//檢查全部的地址字數是否為40個字以內
			//戶籍地址
			var domicileCityIdText = $('[name="domicileCityId"]').parent().find('button').attr('title');
			var domicileZipCodeText = $('[name="domicileZipCode"]').parent().find('button').attr('title');
			var domicileLinerText = $('[name="domicileLiner"]').parent().find('button').attr('title');
			var dNeighborhoodText = $('[name="DomicileNeighborhood"]').val();
			var dAddressText = $('[name="DomicileAddress"]').val();
			var domiAllAddr = domicileCityIdText + domicileZipCodeText + domicileLinerText + dNeighborhoodText + dAddressText;
			if( domiAllAddr.length > 40 ){
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
			if( allAddr.length > 40 ){
				customizeValidResult.push({
                    obj: $('[name="cityId"]'),
                    msg: '通訊地址長度不可大於40位'
                });
			}
			
            var domicilePhoneVal = $('[name="Domicile_Phone"]').val();
            var domicileAreaVal = $('[name="DomicileArea"]').val();
            if (domicileAreaVal.length < 2 || domicilePhoneVal.length < 7) {
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
            if (areaTelephone.length < 2 || telephone.length < 7) {
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

} // end register1_valid function

function personalInfo_2_valid() {
    // var res_tmp = GardenUtils.valid.validForm({
    //     type: "show",
    //     formId: ["mainForm"],



    /*var res = GardenUtils.valid.validForm({
        type: "show",
        formId: ["mainForm"],
        validEmpty: [{
            name: 'id',
            msg: '身分證字號'
        }, {
            name: 'name',
            msg: '姓名'
        }, {
            name: 'birthday_y',
            msg: '生日（年）'
        }, {
            name: 'birthday_m',
            msg: '生日（月）'
        }, {
            name: 'birthday_d',
            msg: '生日（日）'
        }, {
            name: 'cellPhone',
            msg: '行動電話'
        }, {
            name: 'email',
            msg: 'Email'
        }, {
            name: 'userAccount',
            msg: '使用者代碼'
        }, {
            name: 'userPwd',
            msg: '使用者密碼'
        }, {
            name: 'userPwdCheck',
            msg: '使用者密碼確認'
        }],
        validIdentity: [{
            name: 'id',
            msg: '身分證字號',
            allowEmpty : false
        }],
        validNumber: [{
            name: 'birthday_y',
            msg: '生日（年）',
            allowEmpty : false
        }, {
            name: 'birthday_m',
            msg: '生日（月）',
            allowEmpty : false
        }, {
            name: 'birthday_d',
            msg: '生日（日）',
            allowEmpty : false
        }, {
            name: 'cellPhone',
            msg: '行動電話',
            allowEmpty : false
        }
        ],
        validDecimal: [],
        validEmail: [{
            name: 'email',
            msg: 'Email'
        }],
        validDate: [],
        errorDel: [],
        customizeFun: function(customizeValidResult) {

            var user_id = $('[name="id"]').val();
            if (user_id.length < 10 || user_id.length > 10) {
                customizeValidResult.push({
                    obj: $('[name="id"]'),
                    msg: '身分證字號輸入長度不符'
                });
            }

            var user_name = $('[name="name"]').val();
            if(user_name.match(/^[\u4E00-\u9FA5]+$/) == null){
                customizeValidResult.push({
                    obj: $('[name="name"]'),
                    msg: '限輸入中文字'
                });
            } else if (user_name.length < 2 || user_name.length > 10) {
                customizeValidResult.push({
                    obj: $('[name="name"]'),
                    msg: '姓名格式錯誤'
                });
            }

            var birth = new Date(parseInt($('[name="birthday_y"]').val())+1911, $('[name="birthday_m"]').val(), $('[name="birthday_d"]').val());
            var today = new Date();
            var b_birthNow = birth - today;

            if( !isValidDate({
                year: $('[name="birthday_y"]').val(),
                month: $('[name="birthday_m"]').val(),
                day: $('[name="birthday_d"]').val(),
                format: 'ch' // ch: 民國; ad: 西元
            }) || b_birthNow > 0){
                customizeValidResult.push({
                    obj: $('[name="birthday_y"]'),
                    msg: '生日格式錯誤'
                });
            }

            if(!isMobileNumber( $('[name="cellPhone"]').val() )){
                customizeValidResult.push({
                    obj: $('[name="cellPhone"]'),
                    msg: '行動電話格式錯誤'
                });
            }

            var user_email = $('[name="email"]').val();
            if (user_email.length > 40) {
                customizeValidResult.push({
                    obj: $('[name="email"]'),
                    msg: 'Email格式錯誤'
                });
            }

            var user_account = $('[name="userAccount"]').val(), account_minLen = 6, account_maxLen = 10;
            if (user_account.length<account_minLen || user_account.length>account_maxLen) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼輸入長度不符'
                });
            } else if(!isValidChar(user_account)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼限輸入英數字'
                });

            } else if(!isNumericAlphabetMix(user_account)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼須包括英文及數字'
                });

            } else if(isSameChar(user_account)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼不得為相同數字或字元'
                });

            } else if(isContinuousChar(user_account, account_maxLen)) {
                customizeValidResult.push({
                    obj: $('[name="userAccount"]'),
                    msg: '使用者代碼不得為連續數字或字元'
                });
            } else {
                var errMsg = isSubstr(user_account,
                    [{
                        val: user_id,
                        text: '身分證字號'
                    },{
                        val: $('[name="birthday_y"]').val()+$('[name="birthday_m"]').val()+$('[name="birthday_d"]').val(),
                        text: '生日'
                    }]
                );

                if(errMsg != '') {
                    customizeValidResult.push({
                        obj: $('[name="userAccount"]'),
                        msg: '使用者代碼'+errMsg
                    });
                }
            }

            var user_pwd = $('[name="userPwd"]').val(), pwd_minLen = 6, pwd_maxLen = 16;
            if (user_pwd.length<pwd_minLen || user_pwd.length>pwd_maxLen) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼輸入長度不符'
                });
            } else if(!isValidChar(user_pwd)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼限輸入英數字'
                });

            } else if(!isNumericAlphabetMix(user_pwd)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼須包括英文及數字'
                });

            } else if(isSameChar(user_pwd)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼不得為相同數字或字元'
                });

            } else if(isContinuousChar(user_pwd, pwd_maxLen)) {
                customizeValidResult.push({
                    obj: $('[name="userPwd"]'),
                    msg: '使用者密碼不得為連續數字或字元'
                });
            } else {
                var errMsg = isSubstr(user_pwd,
                    [{
                        val: user_id,
                        text: '身分證字號'
                    },{
                        val: $('[name="birthday_y"]').val()+$('[name="birthday_m"]').val()+$('[name="birthday_d"]').val(),
                        text: '生日'
                    },{
                        val: user_account,
                        text: '使用者代碼'
                    }]
                );

                if(errMsg != '') {
                    customizeValidResult.push({
                        obj: $('[name="userPwd"]'),
                        msg: '使用者密碼'+errMsg
                    });
                }
            }

            var user_pwd_Check = $('[name="userPwdCheck"]').val();
            if( user_pwd_Check !== user_pwd ){
                customizeValidResult.push({
                    obj: $('[name="userPwdCheck"]'),
                    msg: '確認密碼錯誤'
                });
            }
            
        } // end customizeFun
    }); // end validForm
    */

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
        validMobile: [],
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
} // end register2_valid function

function isValidDate(conf) {

    var m = parseInt(conf.month);
    var d = parseInt(conf.day);
    var y = parseInt(conf.year);

    if (conf.format == 'ch') {
        y += 1911;
    }

    var date = new Date(y, m - 1, d);
    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
        return true;
    } else {
        return false;
    }
}

function isMobileNumber(txtMob) {
    var mob = /^[0]{1}[9]{1}[0-9]{8}$/;
    if (mob.test(txtMob) == false) {
        return false;
    }

    return true;
}

// 檢查某個字串的每個字元是否都是英數文字
// 如： isValidChar('rrr') 會回傳 true
// 如果提供第二個參數，則會被視為檢核的範圍
// 如： isValidChar('rrr', 'abc') 會回傳 false
function isValidChar() {

    var test = isValidChar.arguments[0];

    var range = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    if (isValidChar.arguments.length == 2) {

        range = isValidChar.arguments[1];

    }



    for (var i = 0; i < test.length; i++) {

        if (range.indexOf(test.charAt(i)) < 0) {

            return false;

        }

    }

    return true;
}

//檢查字串是否為英數字混雜
function isNumericAlphabetMix(src) {

    var s = src.toUpperCase();

    var numericCount = 0;

    var alphabetCount = 0;


    for (var i = 0; i < s.length; i++) {

        var c = s.charAt(i);

        if (c >= '0' && c <= '9') numericCount++;

        if (c >= 'A' && c <= 'Z') alphabetCount++;

    }


    if (numericCount == 0 || alphabetCount == 0) {

        return false;
    }


    return true;

}

//檢查字串是否為相同數字或字元
function isSameChar(src) {

    if (src.length > 0) {

        var c = src.charAt(0);

        for (var i = 1; i < src.length; i++) {

            if (c != src.charAt(i)) return false;

        }

        return true;

    }

    return false;

}

//檢查字串是否為連續數字或字元
function isContinuousChar(src, maxLen) {

    var numericTestString1 = getTestString("1234567890", maxLen); // 數字升鼏測試字串

    var numericTestString2 = getTestString("0987654321", maxLen); // 數字降鼏測試字串

    var lowerAlphabetTestString1 = getTestString("abcdefghijklmnopqrstuvwxyz", maxLen); // 小寫字元升鼏測試字串

    var lowerAlphabetTestString2 = getTestString("zyxwvutsrqponmlkjihgfedcba", maxLen); // 小寫字元降鼏測試字串

    var upperAlphabetTestString1 = getTestString("ABCDEFGHIJKLMNOPQRSTUVWXYZ", maxLen); // 大寫字元升鼏測試字串

    var upperAlphabetTestString2 = getTestString("ZYXWVUTSRQPONMLKJIHGFEDCBA", maxLen); // 大寫字元降鼏測試字串

    function getTestString(s, maxLen) {

        var retS = "";

        var sLen = s.length;

        while (retS.length < (maxLen + s.length)) {

            retS += s;

        }

        return retS;

    }


    var indexOfNumericSubString1 = numericTestString1.indexOf(src); // 檢核是否為數字升鼏子字串

    if (indexOfNumericSubString1 >= 0) return true;



    var indexOfNumericSubString2 = numericTestString2.indexOf(src); // 檢核是否為數字降鼏子字串

    if (indexOfNumericSubString2 >= 0) return true;



    var indexOfLowerAlphabetSubString1 = lowerAlphabetTestString1.indexOf(src); // 檢核是否為小寫字元升鼏子字串

    if (indexOfLowerAlphabetSubString1 >= 0) return true;



    var indexOfLowerAlphabetSubString2 = lowerAlphabetTestString2.indexOf(src); // 檢核是否為小寫字元降鼏子字串

    if (indexOfLowerAlphabetSubString2 >= 0) return true;



    var indexOfUpperAlphabetSubString1 = upperAlphabetTestString1.indexOf(src); // 檢核是否為大寫字元升鼏子字串

    if (indexOfUpperAlphabetSubString1 >= 0) return true;



    var indexOfUpperAlphabetSubString2 = upperAlphabetTestString2.indexOf(src); // 檢核是否為大寫字元降鼏子字串

    if (indexOfUpperAlphabetSubString2 >= 0) return true;


    return false;

}

function isSubstr(src, targetArr) {
    var errMsg = '';

    $.each(targetArr, function(i, targetObj) {

        if ((targetObj.val != null) && (targetObj.val.indexOf(src) >= 0)) {

            if (errMsg != '') errMsg += '、';

            errMsg = targetObj.text;

        }
    });

    if (errMsg != '') {
        return '不可為「' + errMsg + '」的子字串';
    }
    return errMsg;
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
}