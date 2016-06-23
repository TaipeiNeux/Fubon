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
            //            };


            console.debug(obj);
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
                var mapOptions = {
                    zoom: zoom
                    // mapTypeId: google.maps.MapTypeId.ROADMAP
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

                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location,
                                icon: {
                                    size: new google.maps.Size(50, 58),
                                    url : icon
                                }
                            });

                            //當有Dialog時才綁事件
                            if(googleAddrDialog.length != 0 && googleAddrDialog[0] != '') {
                                var infowindow = new google.maps.InfoWindow({
                                    content: googleAddrDialog[i]
                                });

                                google.maps.event.addListener(marker, 'click', function() {
                                    infowindow.open(map, marker);
                                });

                            }

                        } //if
                        else {
                            alert("Geocode was not successful for the following reason: " + status);
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

            console.debug(obj.moveToDivObj);
            $('html, body').animate({
                'scrollTop': ($('#' + obj.moveToDivObj).offset().top - obj.minHeight)
            }, 1000);
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

            if (config.formId != undefined && config.formId != "") {


                $(config.formId).each(function(i, n) {
                    //verify number
                    $(config.validNumber).each(function(j, number) {
                        var $this = $('#' + n).find('[name="' + number.name + '"]');

                        console.debug($this);
                        console.debug($this.length);

                        if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                            var val = RemoveComma($this.val());
                            console.debug(val);
                            console.debug(number.allowEmpty);
                            if (!number.allowEmpty && val == '') {
                                console.debug('into 1');
                                noPass.push({
                                    name : number.name,
                                    type : 'number',
                                    msg : number.msg,
                                    obj : $this
                                });
                            }
                            else {
                                if (!isNumeric(val) && val != "") {
                                    //message.push(number.msg + ":請輸入正確的數字形式");
                                    noPass.push({
                                        name : number.name,
                                        type : 'number',
                                        msg : number.msg,
                                        obj : $this
                                    });
                                }
                            }
                        }

                    });

                    //verify decimal
                    $(config.validDecimal).each(function(j, number) {
                        var $this = $('#' + n).find('[name="' + number.name + '"]');

                        if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                            var val = $this.val();

                            if (!number.allowEmpty && val == '') {
                                noPass.push({
                                    name : number.name,
                                    type : 'decimal',
                                    msg : number.msg,
                                    obj : $this
                                });
                            }
                            else {
                                if (!isNumeric(val) && val != "") {
                                    //message.push(number.msg + ":請輸入正確的數字形式");
                                    noPass.push({
                                        name : number.name,
                                        type : 'decimal',
                                        msg : number.msg,
                                        obj : $this
                                    });
                                }
                            }

                        }

                    });

                    // //verify empty
                    $(config.validEmpty).each(function(j, number) {
                        var $this = $('#' + n).find('[name="' + number.name + '"]');

                        if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                            var val = $this.val();
                            var test = number.name;
                            console.debug('n:' + n + '/name:' + number.name + '/val:' + val);

                            if (val == "" || val == undefined || val == "請選擇" || val == "00") {
                                //message.push('請輸入'+number.msg);
                                noPass.push({
                                    name : number.name,
                                    type : 'empty',
                                    msg : number.msg,
                                    obj : $this
                                });
                            }
                        }
                    });
                    //verify date

                    $(config.validDate).each(function(j, number) {
                        var $this = $('#' + n).find('[name="' + number.name + '"]');

                        if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                            var val = $this.val();
                            if (number.allowEmpty) {
                                //日期可為空
                                if (!IsDate(val) && val != "") {
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
                                    noPass.push({
                                        name : number.name,
                                        type : 'date',
                                        msg : number.msg,
                                        obj : $this
                                    });
                                }
                            } else {
                                //日期不可為空
                                if (!IsDate(val)) {
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
                                    noPass.push({
                                        name : number.name,
                                        type : 'date',
                                        msg : number.msg,
                                        obj : $this
                                    });
                                }
                            }
                        }
                    });

                    //verify email
                    $(config.validEmail).each(function(i, number) {
                        var $this = $('#' + n).find('[name="' + number.name + '"]');

                        if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                            var val = $this.val();

                            if (!number.allowEmpty && val == "") {
                                noPass.push({
                                    name : number.name,
                                    type : 'email',
                                    msg : number.msg,
                                    obj : $this
                                });
                            } else {
                                if (!checkEmail(val)) {
                                    noPass.push({
                                        name : number.name,
                                        type : 'email',
                                        msg : number.msg,
                                        obj : $this
                                    });
                                }
                            }
                        }

                    });

                    //verify identity
                    $(config.validIdentity).each(function(i, number) {
                        var $this = $('#' + n).find('[name="' + number.name + '"]');

                        if ($this.length != 0 && $this.parents(":hidden").length == 0) {
                            var val = $this.val();
                            if (number.allowEmpty) {
                                //可為空
                                if (!checkID(val) && val != "") {
                                    noPass.push({
                                        name : number.name,
                                        type : 'identity',
                                        msg : number.msg,
                                        obj : $this
                                    });
                                    //message.push("請輸入正確的身分證字號");
                                }
                            } else {
                                //不可為空
                                if (val != "") {
                                    noPass.push({
                                        name : number.name,
                                        type : 'identity',
                                        msg : number.msg,
                                        obj : $this
                                    });
                                    //message.push("身分證字號不得為空");
                                } else if (!checkID(val)) {
                                    noPass.push({
                                        name : number.name,
                                        type : 'identity',
                                        msg : number.msg,
                                        obj : $this
                                    });
                                    //message.push("請輸入正確的身分證字號");
                                }
                            }
                            console.debug("identity:" + message);
                        }

                    });

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

                        if(type == 'empty') {
                            if(validObj[0].tagName.toLowerCase() == 'input') {
                                msg = '請輸入' + msg;
                            }
                            else {
                                msg = '請勾選' + msg;
                            }
                        }
                        else if(type == 'number') {
                            msg = msg + '限輸入數字';
                        }
                        else if(type == 'decimal') {
                            msg = msg + '限輸入數字';
                        }
                        else if(type == 'date' || type == 'email' || type == 'identity') {
                            msg = msg + '格式錯誤';
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

                        if(type == 'empty') {
                            if(validObj[0].tagName.toLowerCase() == 'input') {
                                msg = '請輸入' + msg;
                            }
                            else {
                                msg = '請勾選' + msg;
                            }
                        }
                        else if(type == 'number') {
                            msg = msg + '限輸入數字';
                        }
                        else if(type == 'decimal') {
                            msg = msg + '限輸入數字';
                        }
                        else if(type == 'date' || type == 'email' || type == 'identity') {
                            msg = msg + '格式錯誤';
                        }

                        var validObjParent = validObj.parents('div.right:first');

                        var oriMsg = validObjParent.find('.error-msg').text();
                        if(oriMsg != '') msg = ',' + msg;
                        validObjParent.find('.error-msg').text(oriMsg + msg);
                    });

                    //再跑客製的
                    $.each(customizeValidResult,function(i,obj){
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
                    });
                }



                return false;
            } else {
                return true;
            }

            ////////////////////////////
            //身分證字號
            function checkID(id) {
                tab = "ABCDEFGHJKLMNPQRSTUVWXYZIO"
                A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
                A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
                Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

                if (id.length != 10) return false;
                i = tab.indexOf(id.charAt(0));
                if (i == -1) return false;
                sum = A1[i] + A2[i] * 9;

                for (i = 1; i < 10; i++) {
                    v = parseInt(id.charAt(i));
                    if (isNaN(v)) return false;
                    sum = sum + v * Mx[i];
                }
                if (sum % 10 != 0) return false;
                return true;
            }
            //信箱
            function checkEmail(id) {
                return (checkLength(id, 5) && id.indexOf("@") != -1);
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
            function IsDate(dateValue) {
                var validatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
                var dateValues = dateValue.match(validatePattern);
                if (dateValues == null) return false;
                else return true;

            }
        }
    },
    display: {

        popup : function(obj){
            /**
             var obj = {
				title : '我是標題',
				content : '我是內容',
				closeCallBackFn : function(){},
				isShowSubmit : true,
			};
             **/

            var submitButton = obj.isShowSubmit ? '<button type="button" class="btn btn-primary">確認</button>' : '';
            var popupView = $('<div class="modal fade" id="_popup"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">'+obj.title+'</h4></div><div class="modal-body">'+obj.content+'</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>'+submitButton+'</div></div></div></div>').appendTo($('body'));
            popupView.modal('toggle');
            popupView.find('.modal-dialog').css('z-index',9999);
            popupView.on('hidden.bs.modal', function (e) {
                console.debug('====close modal=====');
                popupView.remove();

                if(obj.closeCallBackFn != undefined) {
                    obj.closeCallBackFn.apply(window,[]);
                }
            })
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