/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/3/7
 * Time: 下午 2:28
 * To change this template use File | Settings | File Templates.
 */

var GardenUtils = {
    plugin: {
        showGoogleMap: function(obj) {

            //            var obj = {
            //                divId : 'googlemap',,
            //                zoom : 15,
            //                address : '',
            //                dialog : '',
            //                icon : 'img/marker_bank.png',
            //                scrollwheel : true,
            //                showDialog : true,
            //                streetPosition: RIGHT_BOTTOM,
            //                zoomPosition: RIGHT_BOTTOM
            //            };

            console.debug('before', obj);

            obj = $.extend({
                scrollwheel: true,
                zoomPosition: 'RIGHT_BOTTOM',
                streetPosition: 'RIGHT_BOTTOM'
            }, obj);

            console.debug('after', obj);
            var zoom = obj.zoom;
            if(zoom == undefined) zoom = 15;

            var icon = obj.icon;
            if(icon == undefined) icon = '';

            var googleAddr = [];
            var googleAddrDialog = [];

            if ($.isArray(obj.address)) {
                googleAddr = obj.address;
            } else {
                googleAddr.push(obj.address);
            }

            if(obj.dialog != undefined) {
                if ($.isArray(obj.address)) {
                    googleAddrDialog = obj.dialog;
                } else {
                    googleAddrDialog.push(obj.dialog);
                }
            }
            else {
                googleAddrDialog.push('');
            }


            var isLoadGoogle = false;
            try {
                var geocoder = new google.maps.Geocoder();
                isLoadGoogle = true;
            } catch (e) {;
            }

            if (isLoadGoogle) {
                drawAddress(googleAddr);
            } else {
                $.getScript("//maps.google.com/maps/api/js?sensor=true").done(function() {
                    drawAddress(googleAddr);
                });
            }

            function drawAddress(googleAddr) {
                var geocoder = new google.maps.Geocoder();

                obj['zoomPosition'] = google_postion(obj.zoomPosition);
                obj['streetPosition'] = google_postion(obj.streetPosition);

                function google_postion(posStr){
                    switch( posStr ){
                        case 'BOTTOM_CENTER': 
                            return google.maps.ControlPosition.BOTTOM_CENTER; break;
                        case 'BOTTOM_LEFT': 
                            return google.maps.ControlPosition.BOTTOM_LEFT; break;
                        case 'BOTTOM_RIGHT': 
                            return google.maps.ControlPosition.BOTTOM_RIGHT; break;
                        case 'LEFT_BOTTOM': 
                            return google.maps.ControlPosition.LEFT_BOTTOM; break;
                        case 'LEFT_CENTER': 
                            return google.maps.ControlPosition.LEFT_CENTER; break;
                        case 'LEFT_TOP': 
                            return google.maps.ControlPosition.LEFT_TOP; break;
                        case 'RIGHT_BOTTOM': 
                            return google.maps.ControlPosition.RIGHT_BOTTOM; break;
                        case 'RIGHT_CENTER': 
                            return google.maps.ControlPosition.RIGHT_CENTER; break;
                        case 'RIGHT_TOP': 
                            return google.maps.ControlPosition.RIGHT_TOP; break;
                        case 'TOP_CENTER': 
                            return google.maps.ControlPosition.TOP_CENTER; break;
                        case 'TOP_LEFT': 
                            return google.maps.ControlPosition.TOP_LEFT; break;
                        case 'TOP_RIGHT': 
                            return google.maps.ControlPosition.TOP_RIGHT; break;
                    }
                }

                var mapOptions = {
                    zoom: zoom,
                    scrollwheel: obj.scrollwheel,
                    // mapTypeId: google.maps.MapTypeId.ROADMAP
                    zoomControlOptions: {
                        position: obj.zoomPosition
                    },
                    streetViewControlOptions: {
                        position: obj.streetPosition//google.maps.ControlPosition.LEFT_BOTTOM
                    }
                };
                //$('#mapDiv').css("height","500px");
                var map = new google.maps.Map(document.getElementById(obj.divId), mapOptions);

                $.each(googleAddr, function(i, address) {
                    console.debug('address = ' + address);
                    geocoder.geocode({
                        'address': address
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);

                            var tmpImg = $('<img src="'+icon+'"></img>');
                            tmpImg.appendTo($('body'));

                            tmpImg.load(function(){
                                var imgWidth = $(this).width();
                                var imgHeight = $(this).height();

                                tmpImg.remove();

                                var marker = new google.maps.Marker({
                                    map: map,
                                    position: results[0].geometry.location,
                                    icon: {
                                        //size: new google.maps.Size(50, 58),
                                        size: new google.maps.Size(imgWidth, imgHeight),
                                        url : icon
                                    }
                                });

                                //當有Dialog時才綁事件
                                if(googleAddrDialog.length != 0 && googleAddrDialog[0] != '') {
                                    var infowindow = new google.maps.InfoWindow({
                                        content: googleAddrDialog[i]/*,
                                         pixelOffset: new google.maps.Size(0, 170)*/
                                    });

                                    google.maps.event.addListener(marker, 'click', function() {
                                        infowindow.open(map, marker);
                                    });

                                    if( obj.showDialog ){
                                        google.maps.event.trigger(marker, 'click');
                                    }
                                }
                            });



                        } //if
                        else {
                            console.debug(status);
                            alert('GoogleMap忙碌中，請重新整理後再試');
                        } //else
                    });
                });
            }
        },

        screenMoveToDiv: function(obj) {

            //            var obj = {
            //                moveToDivObj : 'divId',
            //                minHeight : 30
            //            };

            obj = $.extend({
                minHeight: 0
            }, obj);

            console.debug(obj);
            console.debug('top = ' + $('#' + obj.moveToDivObj).offset().top);
            $('html, body').animate({
                'scrollTop': ($('#' + obj.moveToDivObj).offset().top - obj.minHeight)
            }, 1000);
        },

        //開始倒數固定時間，若時間內無任何動作，在倒數幾秒內可以呼叫callback function，當畫面點擊任何動作則會倒數計時
        useCountDown : function(obj) {

//            var obj = {
//                totalTime : 600, //總時間(秒)
//                countDownTime : 60, //倒數多少時間後呼叫countDownFn(秒)
//                countDownFn : function(){}, //倒數多少時間後呼叫的function
//                countDownIntervalFn : function(){}, //開始倒數每一秒會呼叫callback function
//                overTimeFn : function(){} //時間到了的function
//            };

            var totalTime = obj.totalTime;
            var countDownTime = obj.countDownTime;
            var isFinish = false;

            //每秒減1
            setInterval(function() {
                totalTime--;

                //console.debug('totalTime = ' + totalTime);

                //如果時間到了最後倒數，則呼叫callback function
                if(totalTime == countDownTime) {
                    if(obj.countDownFn != undefined) {
                        obj.countDownFn.apply(window,[totalTime]);
                    }
                }
                
                //如果已經在最後時限，每一秒可以呼叫callback function
                if(totalTime !=0 && countDownTime > totalTime) {
                    if(obj.countDownIntervalFn != undefined) {
                        obj.countDownIntervalFn.apply(window,[totalTime]);
                    }
                }

                //如果時間已經倒數完了，則呼叫callback function
                if(totalTime == 0) {
                    if(obj.overTimeFn != undefined) {
                        obj.overTimeFn.apply(window,[]);
                    }

                    isFinish = true;
                }
            },1000);

            //綁在body上，點擊畫面任何動作都會重新計算
            $('body').on('click',function(){
                console.debug('on body click');

                if(!isFinish) {
                    totalTime = obj.totalTime;
                }
            });

        }
    },
    browser: {

        getLanguage: function() {
            var lang = window.navigator.userLanguage || window.navigator.language;
            var lang = lang.toLowerCase();

            return lang;
        },
        setCookie: function(obj) {
            /**
             var obj = {
                name : 'cookieName',
                value : 'cookieValue',
                expiresDay : 1,
                isRemeberMe : true
            };
             **/

            var exdays = obj.expiresDay;
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = 'expires=' + d.toUTCString();

            if (obj.isRemeberMe) {
                document.cookie = obj.name + '=' + obj.value + '; ' + expires;
            } else {
                document.cookie = obj.name + '=' + obj.value + ';';
            }
        },
        getCookie: function(obj) {
            /**
             var obj = {
                name : 'cookieName'
            };
             **/

            var name = obj.name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        },
        delCookie: function(obj) {
            /**
             var obj = {
                name : 'cookieName'
            };
             **/

            var exdays = -1;
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = 'expires=' + d.toUTCString();
            var cvalue = getCookie(obj);

            document.cookie = obj.name + '=' + cvalue + '; ' + expires;
        }

    },
    valid: {
        //格式： 
        //var res = GardenUtils.valid.validForm({
        //     type:"alert | show",
        //     formId:["purchaserForm"],
        //     validEmpty : ["addresseeName","addresseeTel","addresseeCity","addresseeDistrict","addresseeAddress"],
        //     validNumber : ["addresseeTel"],
        //     validDecimal : [],
        //     validEmail:[],
        //     validDate:["receiveDate"],
        //     customizeFun:function(){}
        // });
        validForm: function(config) {

            var noPass = [];
            var customizeValidResult = [];
            //var message = [];
            var hasErrName = [];

            if(!config.hasOwnProperty('showAllErr')){
                config['showAllErr'] = true;
            }

            if (config.formId != undefined && config.formId != "") {


                $(config.formId).each(function(i, n) {

                    // verify empty
                    var empty_groupArr = [];
                    $(config.validEmpty).each(function(j, number) {
                        var errName = number.hasOwnProperty('group')? number.group : number.name;
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var $this = $('#' + n).find('[name="' + number.name + '"]');

                            if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                                var val = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this.val() : GardenUtils.valid.removeSpace( $this.val() ));
                                $this.val( val );
                                var test = number.name;
                                console.debug('n:' + n + '/name:' + number.name + '/val:' + val +'_'+ number.msg, val === "");

                                if (val === "" || val === undefined || val === "請選擇"){// || val === "00") {
                                    //message.push('請輸入'+number.msg);
                                    if(!number.hasOwnProperty('group')){
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'empty',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                    } else if(empty_groupArr.indexOf(number.group) == -1) {
                                        hasErrName.push(errName);
                                        empty_groupArr.push(number.group);

                                        noPass.push({
                                            name : number.name,
                                            type : 'empty',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                    }

                                }
                            }
                        }
                    }); // end each: valid empty

                    //verify number
                    var number_groupArr = [];
                    $(config.validNumber).each(function(j, number) {
                        var errName = number.hasOwnProperty('group')? number.group : number.name;
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var $this = $('#' + n).find('[name="' + number.name + '"]');

                            console.debug($this);
                            console.debug($this.length);

                            if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                                var val = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this.val() : GardenUtils.valid.removeSpace( RemoveComma($this.val()) ));
                                $this.val( val );

                                console.debug('validNumber', val);
                                console.debug('validNumber', number.allowEmpty);

                                if (!number.allowEmpty && val == '' && (!number.hasOwnProperty('group') || number_groupArr.indexOf(number.group) == -1)) {
                                    number_groupArr.push(number.group);
                                    hasErrName.push(errName);

                                    noPass.push({
                                        name : number.name,
                                        type : 'number',
                                        msg : number.msg,
                                        obj : $this,
										val : val
                                    });
                                }
                                else {
                                    if(!number.hasOwnProperty('hasHiddenCode')){
                                        number['hasHiddenCode'] = false;
                                    }
                                    var hiddenConf = {
                                        hasHiddenCode: number.hasHiddenCode,
                                        src: val,
                                        target: number.hiddenTarget,
                                        checkFun: function(conf){
                                            return isNumeric(conf.num);
                                        },
                                        checkFunParam: {
                                            num: val
                                        }
                                    };

                                    if (!checkHiddenCode(hiddenConf) && val != "" && (!number.hasOwnProperty('group') || number_groupArr.indexOf(number.group) == -1)) {
                                        //message.push(number.msg + ":請輸入正確的數字形式");
                                        number_groupArr.push(number.group);
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'number',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                    }
                                }
                            }
                        }
                    }); // end if: valid number


                    //verify decimal
                    $(config.validDecimal).each(function(j, number) {
                        var errName = number.hasOwnProperty('group')? number.group : number.name;
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var $this = $('#' + n).find('[name="' + number.name + '"]');

                            if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                                var val = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this.val() : GardenUtils.valid.removeSpace( $this.val() ));
                                $this.val( val );

                                if (!number.allowEmpty && val == '') {
                                    hasErrName.push(errName);

                                    noPass.push({
                                        name : number.name,
                                        type : 'decimal',
                                        msg : number.msg,
                                        obj : $this,
										val : val
                                    });
                                }
                                else {
                                    if (!isNumeric(val) && val != "") {
                                        //message.push(number.msg + ":請輸入正確的數字形式");
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'decimal',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                    }
                                }

                            }
                        }
                    }); // end if: valid decimal

                    //verify date
                    $(config.validDate).each(function(j, number) {
                        var errName = number.hasOwnProperty('group')? number.group : number.name;
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var $this;
                            if( number.name.length == 1 ){
                                $this = $('#' + n).find('[name="' + number.name + '"]');
                            } else if( number.name.length == 3 ){

                                $this = [];

                                $.each(number.name, function(k, nameEle){
                                    if( $.isNumeric(nameEle) ){
                                        $this.push( nameEle );
                                    } else {
                                        $this.push( $('#' + n).find('[name="' + nameEle + '"]') );
                                    }
                                });

                                //$this = [$('#' + n).find('[name="' + number.name[0] + '"]'), $('#' + n).find('[name="' + number.name[1] + '"]'), $('#' + n).find('[name="' + number.name[2] + '"]')];
                            }


                            //console.error('validDate', number);

                            if ($this.length != 0 && (($this.length == 1 && $this.parents(":hidden").length == 0) || ($this.length == 3 && $this[0].parents(":hidden").length == 0))) {
                                var val = '';
                                if( number.name.length == 1 ){
                                    val = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this.val() : GardenUtils.valid.removeSpace( $this.val() ));
                                    $this.val( val );
                                } else if( number.name.length == 3 ){
                                    var val_tmp = '';
                                    $.each($this, function(i, dateName){

                                        if( i!=0 ){
                                            val += number.splitEle;
                                        }

                                        if( $.isNumeric(dateName) ){
                                            val_tmp = dateName;
                                        } else {
                                            val_tmp = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? dateName.val() : GardenUtils.valid.removeSpace( dateName.val() ));
                                            dateName.val( val_tmp );
                                        }

                                        val += val_tmp;
                                    });
                                    /*var val_y = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this[0].val() : GardenUtils.valid.removeSpace( $this[0].val() ));
                                     $this[0].val( val_y );
                                     var val_m = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this[1].val() : GardenUtils.valid.removeSpace( $this[1].val() ));
                                     $this[1].val( val_m );
                                     var val_d = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this[2].val() : GardenUtils.valid.removeSpace( $this[2].val() ));
                                     $this[2].val( val_d );

                                     val = val_y+number.splitEle+val_m+number.splitEle+val_d;*/

                                }
                                number['val'] = val;
                                //var val = number.val;
                                if(!number.hasOwnProperty('hasHiddenCode')){
                                    number['hasHiddenCode'] = false;
                                }
                                var hiddenConf = {
                                    hasHiddenCode: number.hasHiddenCode,
                                    src: val,
                                    target: number.hiddenTarget,
                                    checkFun: function(conf){
                                        return IsDate(conf);
                                    },
                                    checkFunParam: number
                                };

                                if (number.allowEmpty) {
                                    //日期可為空
                                    if (!checkHiddenCode(hiddenConf) && val != "") {
                                        /**
                                         message.push("請輸入正確的時間格式");
                                         var currentDate = new Date();
                                         var day = currentDate.getDate();
                                         var month = currentDate.getMonth() + 1;
                                         var year = currentDate.getFullYear();
                                         if (month.toString().length == 1) month = "0" + month;
                                         if (day.toString().length == 1) day = "0" + day;
                                         $this.val(year + '/' + month + '/' + day);
                                         **/
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'date',
                                            msg : number.msg,
                                            obj : $this.length == 1 ? $this : $this[0],
											val : val
                                        });
                                    }
                                } else {
                                    //日期不可為空
                                    if (!checkHiddenCode(hiddenConf) && val != "") {
                                        /**
                                         message.push("請輸入正確的時間格式");
                                         var currentDate = new Date();
                                         var day = currentDate.getDate();
                                         var month = currentDate.getMonth() + 1;
                                         var year = currentDate.getFullYear();
                                         if (month.toString().length == 1) month = "0" + month;
                                         if (day.toString().length == 1) day = "0" + day;
                                         $this.val(year + '/' + month + '/' + day);
                                         **/
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'date',
                                            msg : number.msg,
                                            obj : $this.length == 1 ? $this : $this[0],
											val : val
                                        });
                                    }
                                }
                            }
                        }
                    }); // end if: valid date

                    //verify email
                    $(config.validEmail).each(function(i, number) {
                        var errName = number.hasOwnProperty('group')? number.group : number.name;
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var $this = $('#' + n).find('[name="' + number.name + '"]');

                            if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                                var val = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this.val() : GardenUtils.valid.removeSpace( $this.val() ));
                                $this.val( val );

                                if(!number.hasOwnProperty('hasHiddenCode')){
                                    number['hasHiddenCode'] = false;
                                }
                                var hiddenConf = {
                                    hasHiddenCode: number.hasHiddenCode,
                                    src: val,
                                    target: number.hiddenTarget,
                                    checkFun: function(conf){
                                        return checkEmail(conf.email);
                                    },
                                    checkFunParam: {
                                        email: val
                                    }
                                };

                                if (!number.allowEmpty && val == "") {
                                    hasErrName.push(errName);

                                    noPass.push({
                                        name : number.name,
                                        type : 'email',
                                        msg : number.msg,
                                        obj : $this,
										val : val
                                    });
                                } else {
                                    if (val != "" && !checkHiddenCode(hiddenConf) ) {
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'email',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                    }
                                }
                            }
                        }
                    }); // end if: valid email

                    //verify identity
                    $(config.validIdentity).each(function(i, number) {

                        var errName = number.hasOwnProperty('group')? number.group : number.name;
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var $this = $('#' + n).find('[name="' + number.name + '"]');

                            if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                                var val = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this.val() : GardenUtils.valid.removeSpace( $this.val() ));
                                $this.val( val );

                                if(!number.hasOwnProperty('hasHiddenCode')){
                                    number['hasHiddenCode'] = false;
                                }
                                var hiddenConf = {
                                    hasHiddenCode: number.hasHiddenCode,
                                    src: val,
                                    target: number.hiddenTarget,
                                    checkFun: function(conf){
                                        console.log('isForeigner', checkID(conf.id), isValidFrgnID(conf.id));
                                        return (!conf.isForeigner ? checkID(conf.id):((checkID(conf.id) || isValidFrgnID(conf.id))? true : false));
                                    },
                                    checkFunParam: {
                                        id: val,
                                        isForeigner: number.isForeigner
                                    }
                                };

                                if (number.allowEmpty) {

                                    //可為空
                                    if (!checkHiddenCode(hiddenConf) && val != "") {
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'identity',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                        //message.push("請輸入正確的身分證字號");
                                    }
                                } else {
                                    //不可為空
                                    if (val == "") {
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'identity',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                        //message.push("身分證字號不得為空");
                                    } else if (!checkHiddenCode(hiddenConf)) {
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'identity',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                        //message.push("請輸入正確的身分證字號");
                                    }
                                }
                            }
                        }
                    }); // end if: valid identity

                    //verify mobile
                    $(config.validMobile).each(function(i, number) {
                        var errName = number.hasOwnProperty('group')? number.group : number.name;
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var $this = $('#' + n).find('[name="' + number.name + '"]');

                            if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                                var val = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this.val() : GardenUtils.valid.removeSpace( $this.val() ));
                                $this.val( val );

                                if(!number.hasOwnProperty('hasHiddenCode')){
                                    number['hasHiddenCode'] = false;
                                }
                                var hiddenConf = {
                                    hasHiddenCode: number.hasHiddenCode,
                                    src: val,
                                    target: number.hiddenTarget,
                                    checkFun: function(conf){
                                        return isMobileNumber(conf.mobile);
                                    },
                                    checkFunParam: {
                                        mobile: val
                                    }
                                };

                                if (!number.allowEmpty && val == "") {
                                    hasErrName.push(errName);

                                    noPass.push({
                                        name : number.name,
                                        type : 'mobile',
                                        msg : number.msg,
                                        obj : $this,
										val : val
                                    });
                                } else {
                                    if (!checkHiddenCode(hiddenConf) && val != "") {
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'mobile',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                    }
                                }
                            }
                        }
                    }); // end if: valid mobile

                    //verify Chinese
                    $(config.validChinese).each(function(i, number) {
                        var errName = number.hasOwnProperty('group')? number.group : number.name;
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var $this = $('#' + n).find('[name="' + number.name + '"]');

                            if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                                var val = (number.hasOwnProperty('notRemoveSpace')&&number.notRemoveSpace? $this.val() : GardenUtils.valid.removeSpace( $this.val() ));
                                $this.val( val );

                                if(!number.hasOwnProperty('hasHiddenCode')){
                                    number['hasHiddenCode'] = false;
                                }
                                var hiddenConf = {
                                    hasHiddenCode: number.hasHiddenCode,
                                    src: val,
                                    target: number.hiddenTarget,
                                    checkFun: function(conf){
                                        return (conf.chinese.match(/^[\u4E00-\u9FA5]+$/) != null);
                                    },
                                    checkFunParam: {
                                        chinese: val
                                    }
                                };

                                if (!number.allowEmpty && val == "") {
                                    hasErrName.push(errName);

                                    noPass.push({
                                        name : number.name,
                                        type : 'chinese',
                                        msg : number.msg,
                                        obj : $this,
										val : val
                                    });
                                } else {
                                    if (!checkHiddenCode(hiddenConf) && val != "") {
                                        hasErrName.push(errName);

                                        noPass.push({
                                            name : number.name,
                                            type : 'chinese',
                                            msg : number.msg,
                                            obj : $this,
											val : val
                                        });
                                    }
                                }
                            }
                        }
                    }); // end if: valid chinese

                });

                config.customizeFun(customizeValidResult);

                console.debug(noPass);
            } else {
                alert('請輸入驗證範圍');
            }

            // console.debug(message);

            if (noPass.length != 0 || customizeValidResult.length != 0) {

                var displayType = config.type;
                if(displayType == 'alert') {
                    var message = [];

                    $.each(noPass,function(i,obj){
                        var name = obj.name;
                        var type = obj.type;
                        var msg = obj.msg;
                        var validObj = obj.obj;
						var val = obj.val;

						if(val.indexOf('*') != -1) {
							msg = msg + '勿輸入遮掩字元，請重新輸入';
						}
						else {
							if(type == 'empty') {
                            /*if(validObj[0].tagName.toLowerCase() == 'input') {
	                                msg = '請輸入' + msg;
	                            }
	                            else {
	                                msg = '請選擇' + msg;
	                            }*/
	                            //富邦一律要顯示請輸入,不論是下拉式選單還是輸入框 by Foi 2016/07/12
	                            msg = '請輸入' + msg;    
	                        }
	                        else if(type == 'number') {
	                            msg = msg + '限輸入數字';
	                        }
	                        else if(type == 'decimal') {
	                            msg = msg + '限輸入數字';
	                        }
	                        else if(type == 'chinese') {
	                            msg = msg + '限輸入中文字';
	                        }
	                        else if(type == 'date' || type == 'email' || type == 'identity' || type == 'mobile') {
								if(val.indexOf('*') != -1) {
									msg = msg + '勿輸入遮掩字元，請重新輸入';
								}
								else {
									msg = msg + '格式錯誤';
								}
	                        }
						}
						
                       

                        message.push(msg);
                    });

                    var alertMsg = message.join('\n');
                    alert(alertMsg);
                }
                else if(displayType == 'show') {
                    //先清空error-msg
                    $('.error-msg').text('');

                    //先跑基本的
                    $.each(noPass,function(i,obj){
                        console.debug(obj);

                        var name = obj.name;
                        var type = obj.type;
                        var msg = obj.msg;
                        var validObj = obj.obj;
						var val = obj.val;

						if(val.indexOf('*') != -1) {
							msg = msg + '勿輸入遮掩字元，請重新輸入';
						}
						else {
							if(type == 'empty') {
	                            //富邦一律要顯示請輸入,不論是下拉式選單還是輸入框 by Foi 2016/07/12
	                            msg = '請輸入' + msg;
	                        }
	                        else if(type == 'number') {
	                            msg = msg + '限輸入數字';
	                        }
	                        else if(type == 'decimal') {
	                            msg = msg + '限輸入數字';
	                        }
	                        else if(type == 'chinese') {
	                            msg = msg + '限輸入中文字';
	                        }
	                        else if(type == 'date' || type == 'email' || type == 'identity' || type == 'mobile') {
	                           
	                            /** --start 0629  忠毅 register的錯誤訊息是: 身分證字號驗證錯誤  **/
	                            if(type == 'identity')
	                                 msg = msg + '驗證錯誤';
	                            
	                            else {
	                            /** --end 0629  忠毅 register的錯誤訊息是: 身分證字號驗證錯誤  **/
								
									if(val.indexOf('*') != -1) {
										msg = msg + '勿輸入遮掩字元，請重新輸入';
									}
									else {
										msg = msg + '格式錯誤';
									}
								}
	                            
	                        }
						}
						
                        

                        var validObjParent = validObj.parents('div.right:first');

                        var oriMsg = validObjParent.find('.error-msg').text();
                        if(oriMsg != '') msg = ',' + msg;
                        validObjParent.find('.error-msg').text(oriMsg + msg);
                    });

                    //再跑客製的
                    $.each(customizeValidResult,function(i,obj){
                        var errName = obj.hasOwnProperty('group')? obj.group : obj.obj.attr('name');
                        if( config.showAllErr || hasErrName.indexOf(errName) == -1 ){
                            var validObj = obj.obj;
                            console.debug(validObj);
                            var msg = obj.msg;

                            var validObjParent = validObj.parents('div.right:first');
                            console.debug(validObjParent.length);

                            if(validObjParent.length != 0){  //輸入框之parent之class名為right時
                                var oriMsg = validObjParent.find('.error-msg').text();
                                if(oriMsg != '') msg = ',' + msg;
                                validObjParent.find('.error-msg').text(oriMsg + msg);
                            }
                            else{ //輸入框之parent之class名不一定時
                                var validObjectParent = validObj.parents('div:first');
                                var oriMsg = validObjectParent.find('.error-msg').text();
                                if(oriMsg != '') msg = ',' + msg;
                                validObjectParent.find('.error-msg').text(oriMsg + msg);
                            }
                        }
                    }); // end if: customize valid
                }



                return false;
            } else {
                return true;
            }

            ////////////////////////////
            // 確認隱碼
            function checkHiddenCode(conf){

                //console.log('checkHiddenCode conf:', conf);

                if( conf.hasHiddenCode && conf.src === conf.target ){
                    return true;
                } else {
                    return conf.checkFun(conf.checkFunParam);
                }
            }
            //身分證字號
            function isValidChar(){

                var test = isValidChar.arguments[0];
                var range = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

                if (isValidChar.arguments.length == 2) {
                    range = isValidChar.arguments[1];
                }

                for(var i = 0; i < test.length; i++){
                    if(range.indexOf(test.charAt(i)) < 0) {
                            return false;
                    }
                }
                return true;
            }
            function checkID(s) {

                var sum = 0;
                s = s.toUpperCase();

                /*if ((isValidChar(s.substring(0, 2), "ABCDEFGHIJKLMNOPQRSTUVWXYZ")) || (isValidChar(s.substring(s.length-2), "ABCDEFGHIJKLMNOPQRSTUVWXYZ")) ) {

                    return true;

                }

                // 檢核ID正確性

                var chk = "";

                if ((s.length == 10) && (isValidChar(s.substring(8, 10), "0123456789"))) {

                        chk = s.substring(6, 10);

                } else {

                    if (s.length == 7) {

                            chk = s.substring(3, 7);

                    } else {

                            chk = s.substring(4, 8);

                    }

                }

                if (!isValidChar(chk, "0123456789")) {

                        // 檢核ID不正確

                        return false;

                }*/

                if ((s.length != 10)) { //&& (s.length != 8)) {

                        // 身份證字號錯誤

                        return false;

                } else if (s.length == 10) {

                        // 本國國民身份證字號

                        var s1 = "";

                        switch (s.charAt(0)) {

                                case 'A' : s1 = "10"; break;

                                case 'B' : s1 = "11"; break;

                                case 'C' : s1 = "12"; break;

                                case 'D' : s1 = "13"; break;

                                case 'E' : s1 = "14"; break;

                                case 'F' : s1 = "15"; break;

                                case 'G' : s1 = "16"; break;

                                case 'H' : s1 = "17"; break;

                                case 'I' : s1 = "34"; break;

                                case 'J' : s1 = "18"; break;

                                case 'K' : s1 = "19"; break;

                                case 'L' : s1 = "20"; break;

                                case 'M' : s1 = "21"; break;

                                case 'N' : s1 = "22"; break;

                                case 'O' : s1 = "35"; break;

                                case 'P' : s1 = "23"; break;

                                case 'Q' : s1 = "24"; break;

                                case 'R' : s1 = "25"; break;

                                case 'S' : s1 = "26"; break;

                                case 'T' : s1 = "27"; break;

                                case 'U' : s1 = "28"; break;

                                case 'V' : s1 = "29"; break;

                                case 'W' : s1 = "32"; break;

                                case 'X' : s1 = "30"; break;

                                case 'Y' : s1 = "31"; break;

                                case 'Z' : s1 = "33"; break;

                                default  : return false;

                        }

                        if (!isValidChar(s.substring(1), "0123456789")) {

                                // 身份證後九碼不為數字

                                return false;

                        }

                        s1 += s.substring(1);

         

                        var xArray = new Array(1,9,8,7,6,5,4,3,2,1,1);

                        for (var i = 0; i < s1.length; i++) {

                                sum += parseInt(s1.charAt(i)) * xArray[i];

                        }

                        return (sum % 10 == 0) ? true : false;

         

                } /*else if (s.length == 8) {

                        // 法人戶統一編號

                        //Yumi Update-為配合外國人虛擬統編,故如長度為8,不檢核。

                        return true;

                       

                        if (!isValidChar(s, "0123456789")) {

                                // 法人戶統一編號不為數字

                                return false;

                        }

         

                        var d = new Array();

                        for (var i = 0; i < s.length; i++) {

                                d[i] = parseInt(s.charAt(i));

                        }

         

                        var tmpS = 0;

                        tmpS = d[1] * 2;

                        var s11 = Math.floor(tmpS / 10);

                        var s12 = tmpS % 10;

         

                        tmpS = d[3] * 2;

                        var s21 = Math.floor(tmpS / 10);

                        var s22 = tmpS % 10;

         

                        tmpS = d[5] * 2;

                        var s31 = Math.floor(tmpS / 10);

                        var s32 = tmpS % 10;

         

                        tmpS = d[6] * 4;

                        var s41 = Math.floor(tmpS / 10);

                        var s42 = tmpS % 10;

         

                        var sum = d[0] + d[2] + d[4] + d[7] + s11 + s12 + s21 + s22 + s31 + s32 + s41 + s42;

                        if (sum % 10 == 0) {

                                return true;

                        } else if (d[6] != 7) {

                                return false;

                        } else {

                                tmpS = s41 + s42;

                                var s51 = Math.floor(tmpS / 10);

                                var s52 = tmpS % 10;

                                sum = d[0] + d[2] + d[4] + d[7] + s11 + s12 + s21 + s22 + s31 + s32 + s51 + s52;

                                if (sum % 10 == 0) {

                                        return true;

                                } else {

                                        return false;

                                }

                        }

                }*/

            }
            // 檢核外國人統一證號(AA12345675)
            // 第一碼：縣市別代碼；第二碼：性別；第三～九碼：流水號；第十碼：檢核碼
            function isValidFrgnID(s) {
			
                s = s.toUpperCase();
                if (!s.match(/^[A-Z]{1}[A-D]{1}[0-9]{8}$/)) return false;

                var s1 = getIdCharMap(s.charAt(0)) + getIdCharMap(s.charAt(1)).charAt(1) + s.substring(2);
                var sum = 0;
                var xArray = new Array(1,9,8,7,6,5,4,3,2,1,1);

                console.log('s1', s1);

                for (var i = 0; i < s1.length; i++) {

                    sum += parseInt(s1.charAt(i)) * xArray[i];

                    //console.log('sum', sum);

                }

                return (sum % 10 == 0) ? true : false;
            }
            function getIdCharMap(c) {

                var r = "";

                switch (c) {

                        case 'A' : r = "10"; break;

                        case 'B' : r = "11"; break;

                        case 'C' : r = "12"; break;

                        case 'D' : r = "13"; break;

                        case 'E' : r = "14"; break;

                        case 'F' : r = "15"; break;

                        case 'G' : r = "16"; break;

                        case 'H' : r = "17"; break;

                        case 'I' : r = "34"; break;

                        case 'J' : r = "18"; break;

                        case 'K' : r = "19"; break;

                        case 'L' : r = "20"; break;

                        case 'M' : r = "21"; break;

                        case 'N' : r = "22"; break;

                        case 'O' : r = "35"; break;

                        case 'P' : r = "23"; break;

                        case 'Q' : r = "24"; break;

                        case 'R' : r = "25"; break;

                        case 'S' : r = "26"; break;

                        case 'T' : r = "27"; break;

                        case 'U' : r = "28"; break;

                        case 'V' : r = "29"; break;

                        case 'W' : r = "32"; break;

                        case 'X' : r = "30"; break;

                        case 'Y' : r = "31"; break;

                        case 'Z' : r = "33"; break;

                        default  : r = "";
                }
                return r;
            }
            //信箱
            function checkEmail(id) {
                /*var pattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
                return id.match(pattern);*/

                return (id.indexOf("@") != -1);

                //return (checkLength(id, 5) && id.indexOf("@") != -1);
            }

            function checkLength(dat, len) {
                return (dat.length >= len);
            }
            //整數
            function isInt(value) {
                if (isNaN(value)) {
                    return false;
                }
                var x = parseFloat(value);
                return (x | 0) === x;
            }
            //數字
            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            //移除逗號
            function RemoveComma(n) {
                return n.replace(/[,]+/g, '');
            }
            //檢查日期格式
            function IsDate(config) {
                var conf = {format: 'ac'};
                $.extend(conf, config);

                //console.error('d:', conf);

                var d = parseInt(conf.val.split( conf.splitEle )[2]);
                var m = parseInt(conf.val.split( conf.splitEle )[1]);
                var y = parseInt(conf.val.split( conf.splitEle )[0]);

                /*var validatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
                var validatePattern_ch = /^(\d{2,3})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
                var dateValues = conf.val.match(( conf.format == 'ch'? validatePattern_ch : validatePattern ));
                */

                var validatePattern = (y.toString().length == 4? ((m.toString().length==1||m.toString().length==2)? ((d.toString().length==1||d.toString().length==2)? true : null) : null) :null);
                var validatePattern_ch = ((y.toString().length==2||y.toString().length==3)? ((m.toString().length==1||m.toString().length==2)? ((d.toString().length==1||d.toString().length==2)? true : null) : null) :null);
                console.debug('validatePattern:', validatePattern, validatePattern_ch);
                var dateValues = ( conf.format == 'ch'? validatePattern_ch : validatePattern );

                if (dateValues == null) return false;
                else {

                    if( conf.format == 'ch' ){
                        y += 1911;
                    }

                    console.debug('d:', y, m, d);

                    var date = new Date(y,m-1,d);
                    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
            //檢查手機格式
            function isMobileNumber(txtMob) {
                var mob = /^[0]{1}[9]{1}[0-9]{8}$/;
                if (mob.test(txtMob) == false) {
                    return false;
                }
                return true;
            }
        },
        removeSpace: function (str){
            while( str.indexOf(" ") != -1 ){
                str = str.replace(" ", "");
            }
            return str;
        }
    },
    format : {
        inputTrimSpace : function(obj) {
            //var obj = {
            //    name : ['name','id']
            //};

            $.each(obj.name,function(i,name){
                var input = $('input[name="'+name+'"][type="text"]');

				console.debug(name + ':' + input.length);
                input.on('blur',function(){
                    var val = input.val();
					console.debug('val = ' + val);
                    input.val(GardenUtils.valid.removeSpace(val));
                });
            });
        },
		inputConvertFullWidth : function(obj) {
			//var obj = {
            //    name : ['name','id']
            //};
			
			
			$.each(obj.name,function(i,name){
                var input = $('input[name="'+name+'"][type="text"]');

				console.debug(name + ':' + input.length);
                input.on('blur',function(){
                    var val = input.val();
					console.debug('val = ' + val);
					
					var after = '';
				    for(i=0; i<val.length; i++) {
				     if(val.charCodeAt(i)  >= 33 && val.charCodeAt(i) <= 270) {
				      after += String.fromCharCode(val.charCodeAt(i) + 65248);
				     } else if(val.charCodeAt(i) == 32) {
				      after += String.fromCharCode(12288);
				     }else {
					  after += val.substring(i,i+1);
					 }
				    }
					
                    input.val(after);
                });
            });
			
		},		
		inputFocusBlurEventHandler : function(obj){
		
			console.debug(obj);
		
			/*
			var obj = {
				inputs : [
								{
									inputName : 'inputName1', //輸入框name
									trimSpace : true, //是否離開輸入框過濾空白
									convertFullWidth : true, //是否離開輸入框後半形轉全形
									focusClearVal : true //是否點擊時清空值，離開後若沒改過則還原
								},
								{
									inputName : 'inputName1',
									trimSpace : true,
									convertFullWidth : true,
									focusClearVal : true
								}
						]
			};
			*/
			
			$.each(obj.inputs,function(i,obj){
			
				obj = $.extend({
	                trimSpace: false,
	                convertFullWidth: false,
	                focusClearVal: false
	            }, obj);
			
				console.debug(obj);
			
				var name = obj.inputName;
				var trimSpace = obj.trimSpace;
				var convertFullWidth = obj.convertFullWidth;
				var focusClearVal = obj.focusClearVal;
				
				var input = $('input[name="'+name+'"][type="text"]');

				//去掉disabled
				if(!input.is(':disabled')) {
				
					console.debug(name + ':' + input.length);

					
					//如果有需要點擊空白，離開後判斷是否有修改過，就要綁onFocus事件
					if(focusClearVal) {
						input.on('focus',function(){
							var val = input.val();
							console.debug('val = ' + val);
							
							//先把值存下來
							input.attr('original',val);
							
							//清空值
							input.val('');
						});
					}

	                input.on('blur',function(){
	                    var val = input.val();
						console.debug('val = ' + val);
						
						//如果有需要點擊空白，離開後判斷是否有修改過，就要綁onFocus事件
						if(focusClearVal) {
							var original = input.attr('original');
							//如果空白，就帶回原本的值
							if(val == '') {
								val = original;
							}
						}
						
						//去掉空白
						if(trimSpace) {
							val = GardenUtils.valid.removeSpace(val);
						}
						
						//半形轉全形
						if(convertFullWidth) {
							var after = '';
						    for(i=0; i<val.length; i++) {
						     if(val.charCodeAt(i)  >= 33 && val.charCodeAt(i) <= 270) {
						      after += String.fromCharCode(val.charCodeAt(i) + 65248);
						     } else if(val.charCodeAt(i) == 32) {
						      after += String.fromCharCode(12288);
						     }else {
							  after += val.substring(i,i+1);
							 }
						    }
							
							val = after;
						}
						
						
						
	                    input.val(val);
	                });
				}
			});
		},
		convertThousandComma : function(number) {
		
		
			console.debug('convertThousandComma number = ' + number);
		
			var num = number.toString();
			 var pattern = /(-?\d+)(\d{3})/;
			  
			 while(pattern.test(num))
			 {
			  num = num.replace(pattern, "$1,$2");
			  
			 }
			 return num;
		}
    },
    display: {

        popup : function(obj){
            /**
             var obj = {
                title : '我是標題',
                content : '我是內容',
                closeCallBackFn : function(){popupView},
                showCallBackFn : function(){popupView},
                isShowSubmit : true,
                isShowClose : true,
                styleCSS:''
            };
             **/

            //default
            if(obj.isShowClose == undefined) {
                obj.isShowClose = true;
            }
            
            if(obj.styleCSS == undefined) {
                obj.styleCSS = '';
            }

            var submitButton = obj.isShowSubmit ? '<button type="button" class="btn btn-primary">確認</button>' : '';
            var closeButton = obj.isShowClose ? '<button type="button" class="btn btn-default" data-dismiss="modal">確定</button>' : '';

            var popupView = $('<div class="modal fade" id="_popup"><div class="modal-dialog" style="'+obj.styleCSS+'"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">'+obj.title+'</h4></div><div class="modal-body">'+obj.content+'</div><div class="modal-footer">'+closeButton+submitButton+'</div></div></div></div>').appendTo($('body'));
            
			popupView.on('hidden.bs.modal', function (e) {
                console.debug('====close modal=====');
                popupView.remove();

                if(obj.closeCallBackFn != undefined) {
                    obj.closeCallBackFn.apply(window,[popupView]);
                }
            });

            popupView.on('shown.bs.modal', function (e) {
                console.debug('====init modal=====');
                if(obj.showCallBackFn != undefined) {
                    obj.showCallBackFn.apply(window,[popupView]);
                }
            });
			
			popupView.modal('toggle');
            popupView.find('.modal-dialog').css('z-index',9999);
            
        },
        setContent: function(json, formplace) {

            var tableHtml = this.toHtml(json);
            $(formplace).html(tableHtml);

        },

        getRowHtml: function(rows, tag) {

            var cutomize = {
                inputbox: function(text, rowIndex) {
                    return '<input type="text" value="' + text + '"></input>';
                },
                textarea: function(text, rowIndex) {
                    return '<textarea type="text" rows="4" cols="50">' + text + '</textarea>';
                },
                select: function(text, rowIndex) {
                    return '<select type="text" value="' + text + '"></select>';
                },
                img: function(text, rowIndex) {
                    return '<img src="' + text + '">';
                },
                label: function(text, rowIndex) {
                    return '<label>' + text + '</label>';
                },
                hyperlink: function(text, rowIndex) {
                    return '<a href="#">' + text + '</a>';
                }

            };

            var rowArr = [];
            $.each(rows, function(idx, objArr) {
                var datas = [];
                // console.debug(objArr);
                $.each(objArr, function(i, obj) {
                    // console.debug(obj);
                    var text = obj.text;
                    var colspan = obj.colspan;
                    var rowspan = obj.rowspan;
                    var id = obj.id;
                    var type = obj.type;
                    var pushData = '';
                    if (tag != 'th') {
                        if (cutomize[type] != undefined) {
                            pushData += cutomize[type].apply(window, [text]);
                        } else {
                            pushData += text;
                        }
                    } else {
                        pushData += text;
                    }

                    datas.push('<' + tag + ' colspan="' + colspan + '" rowspan="' + rowspan + '" tagId="' + id + '">' + pushData + '</' + tag + '>');
                });
                // console.debug(datas.join(''));
                rowArr.push('<tr>' + datas.join('') + '</tr>');
            });
            return rowArr.join('');
        },
        toHtml: function(beanJson) {
            var fux = this;
            var ret;
            var navLiArr = [];
            var tableArr = [];

            var tableBean = beanJson.table;
            if (!(tableBean instanceof Array)) {
                tableBean = [tableBean];
            }

            $.each(tableBean, function(idx, tableObj) {
                var beanId = tableObj.beanId;
                var title = tableObj.title;
                var rows = tableObj.row;
                var titleRows = rows.title;
                var dataRows = rows.data;

                var navLi = '<li><a data-toggle="pill" href="#' + beanId + '">' + title + '</a></li>';
                var titleHtml = GardenUtils.display.getRowHtml(titleRows, 'th');
                var dataHtml = GardenUtils.display.getRowHtml(dataRows, 'td');
                var tableHtml = '<div id="' + beanId + '" class="tab-pane fade">' +
                    '<table class="table">' +
                    '<thead>' + titleHtml + '</thead>' +
                    '<tbody>' + dataHtml + '</tbody></table></div>';

                navLiArr.push(navLi);
                tableArr.push(tableHtml);
            });

            ret = '<div class="tab-content multiTable">' + tableArr.join('') + '</div>';
            if (tableArr.length > 1) {
                ret = '<div><ul class="nav nav-pills multiTableNav" role="tablist">' +
                    navLiArr.join('') + '</ul></div>' + ret;
            }
            ret = $('<div></div>').html(ret);
            ret.find('.multiTable > .tab-pane').eq(0).addClass('in active');
            ret.find('.multiTableNav > li').eq(0).addClass('active');
            return ret;
        }

    },
    ajax : {
        uploadFile : function(form,ajaxUrl,callbackFn) {
            var resp, data;

            //is Support AjaxUpload Function
            function isAjaxUploadSupported() {
                var input = document.createElement('input');
                input.type = 'file';

                return (
                    'multiple' in input &&
                        typeof File != 'undefined' &&
                        typeof FormData != 'undefined' &&
                        typeof (new XMLHttpRequest()).upload != 'undefined' );
            }

            function getIframeContentJSON(iframe){
                //IE may throw an "access is denied" error when attempting to access contentDocument on the iframe in some cases
                try {
                    var doc = iframe.contentWindow.document, response;

                    var innerHTML = doc.body.innerHTML;
                    //plain text response may be wrapped in <pre> tag
                    if (innerHTML.slice(0, 5).toLowerCase() == "<pre>" && innerHTML.slice(-6).toLowerCase() == "</pre>") {
                        innerHTML = doc.body.firstChild.firstChild.nodeValue;
                    }

                    response = innerHTML;
                } catch(err){
                    alert('IE getIframeContentJSON Error:'+err);
                    response = {isSuccess: 'N'};
                }

                return response;
            }

            if( !isAjaxUploadSupported() ) {

                if( !isAjaxUploadSupported() ){
                    // Add event...
                    var response;
                    function eventHandlermyFile() {
                        response = getIframeContentJSON(iframeIdmyFile);

                        if(response != undefined && response != 'undefined') {
                            callbackFn.apply(this,[response]);
                        }
                    }

                    if( $('body iframe#upload_iframe_myFile').length != 0 ){
                        $('body iframe#upload_iframe_myFile').remove();
                    }
                    var iframe = $('<iframe name="upload_iframe_myFile" id="upload_iframe_myFile">').prependTo($('body'));
                    iframe.attr('width', '0');
                    iframe.attr('height', '0');
                    iframe.attr('border', '0');
                    iframe.attr('src', 'javascript:false;');
                    iframe.hide();

                    iframe.on('load', function(){
                        eventHandlermyFile();
                    });

                    var iframeIdmyFile = document.getElementById("upload_iframe_myFile");

                    // create form
                    if( $('body form#upload_form').length != 0 ){
                        $('body form#upload_form').remove();
                    }

                    form.append('<button type="submit" class="hidden"></button>');
                    form.attr('action', ajaxUrl);
                    form.attr('target','upload_iframe_myFile');
                    form.attr('enctype','multipart/form-data');
                    form.attr('encoding','multipart/form-data');
                    form.attr('method','post');
                    form.addClass('hidden');

                    form.submit();
                }

            } // end if: ie
            else {
                data = new FormData(form[0]);

                $.ajax({
                    async: false,
                    url: ajaxUrl,
                    data: data,
                    processData: false,
                    cache : false,
                    contentType : false,
                    type: 'POST',
                    success: function ( data ) {
                        //alert('success');
                        console.log('after post data = ', JSON.stringify(data));

                        callbackFn.apply(this,[data]);
                    },
                    error: function(){alert('error'); callbackFn.apply(this,[$.parseJSON('{ "isSuccess": "N" }')]);}
                });
            } // end else: not ie
        }

    }
};