/*
 //移到目標位置
 var search = location.search;
 if (search != undefined && search != '' && search.indexOf('?') != -1) {
 search = search.substr(1);
 }

 var target;
 $.each(search.split('&'), function(i, param) {

 if (param.indexOf('=') != -1) {
 var paramName = param.split('=')[0];
 var paramValue = param.split('=')[1];

 if (paramName == 'target') {
 target = parseInt(paramValue);
 }
 }

 });

 var isInt = !isNaN(target);
 var index = 0;
 if (isInt == true) {



 switch (target) {
 case 1:
 $(function() {
 GardenUtils.plugin.screenMoveToDiv({
 moveToDivObj: 'compute'
 //minHeight: getHeaderHeight()// + $('.header').height() + 40
 });
 });
 break;
 case 2:
 $(function() {
 GardenUtils.plugin.screenMoveToDiv({
 moveToDivObj: 'loanBranchs'//,
 //minHeight: getHeaderHeight()
 });
 });
 break;
 case 3:
 $(function() {
 GardenUtils.plugin.screenMoveToDiv({
 moveToDivObj: 'download'//,
 //minHeight: getHeaderHeight()
 });
 });
 break;
 case 4: // Edit by JiaRu 160604
 $(function() {
 GardenUtils.plugin.screenMoveToDiv({
 moveToDivObj: 'QA',
 minHeight: getHeaderHeight()
 });
 });
 break;
 }
 }
 */

//
//Q&A
//var QnA = modal.getQnA();
//console.debug(QnA);

$(document).ready(function() {

    if ($('.QAListTab').length != 0) {

        var json = modal.getQA();
        var QAListTabArray = [];
        var QAAreaArray = [];

        $.each(json.qa, function(i, qa) {
            var contentArray = [];

            $.each(qa.detail, function(j, d) {
                contentArray.push('<li class="application"><a href="#"><span class="maicon">Q' + (j + 1) + '</span><p>' + d.Question + '</p></a><div class="AnserContent"><span class="qaa"></span><span class="ber">A:</span><div class="Anser">' + d.Answer + '</div></div></li>');
            });

            QAListTabArray.push('<li id="qa_1"><a href="#" target="topic_' + i + '">' + qa.TopicDesc + '</a><div class="QAArea_s topic_' + i + '"><div class="QAList qaList-1" style="display: block;"><ul>' + contentArray.join('') + '</ul></div></div></li>');
            QAAreaArray.push('<div class="QAList topic_' + i + '"><ul>' + contentArray.join('') + '</ul></div>');
        });

        $('.QAListTab').empty().append('<ul>' + QAListTabArray.join('') + '</ul>');
        $('.QAArea').empty().append(QAAreaArray.join(''));

        $('.QAListTab > ul > li > a').on("click", function(ev) {
            console.log("click1");

            var $this = $(this);
            var $thisLi = $this.parent().attr('id');
            var target = $this.attr('target');
            console.log(target);
            var isActive = $this.hasClass('active');

            $('.QAListTab > ul > li > a').removeClass('active');
            $('.QAArea .QAList').removeClass('active');

            $this.addClass('active');
            $('.QAArea .' + target).addClass('active');

            if ($(window).width() < 769) {
                $('.QAArea_s').hide();

                if (isActive) {
                    $this.removeClass('active');
                    $('.QAArea_s.' + target).hide();
                } else {
                    $('.QAArea_s.' + target).show();
                }

                GardenUtils.plugin.screenMoveToDiv({
                    moveToDivObj: $thisLi
                });
            }

            ev.preventDefault();
        });

        $('.QAList ul > li a').click(function(ev) {

            ev.preventDefault();
            $(this).addClass('active');
            $(this).parent().find('.AnserContent').slideToggle(250);
            $(this).find('.maicon').toggleClass('active');

        });

        //如果是大版才要預設展開第一個
        if (!isMobileWidth()) {
            $('.QAListTab > ul > li > a:first').trigger('click');
        } else {
            $('.QAListTab > ul > li .QAArea_s').hide();
        }

        //2016-07-18 added by titan讓sub1.jsp的其他區塊顯示
        $('#QA').show();
        $('#compute').show();
        $('#loanBranchs').show();
        $('#download').show();

        $('.QandAtab a').click(function(ev) {
            ev.preventDefault();

            if ($('.QandAContent').hasClass('open')) {
                $('.QandAContent').animate({
                        left: '100%'
                    },
                    400
                );

                $('.QandAContent').removeClass('open');
            } else {
                $('.QandAContent').animate({
                        left: '0px'
                    },
                    400
                );

                $('.QandAContent').addClass('open');
            }

            if ($(window).width() < 768) {
                $('.QAListTab > ul > li > a').removeClass('active');
                //$('.QAListTab > ul > li:first > a:first').addClass('active');
                $('.QAListTab > ul > li:first > a:first').next().hide();
            }

        });

        //移到目標位置
        var search = location.search;
        if (search != undefined && search != '' && search.indexOf('?') != -1) {
            search = search.substr(1);
        }

        var target;
        $.each(search.split('&'), function(i, param) {

            if (param.indexOf('=') != -1) {
                var paramName = param.split('=')[0];
                var paramValue = param.split('=')[1];

                if (paramName == 'target') {
                    target = parseInt(paramValue);
                }
            }

        });

        var isInt = !isNaN(target);
        var index = 0;
        if (isInt == true) {

            switch (target) {
                case 1:
                    $(function() {
                        GardenUtils.plugin.screenMoveToDiv({
                            moveToDivObj: 'compute' ,
                            minHeight: getHeaderHeight()
                        });
                    });
                    break;
                case 2:
                    $(function() {
                        GardenUtils.plugin.screenMoveToDiv({
                            moveToDivObj: 'loanBranchs',
                            minHeight: getHeaderHeight()
                        });
                    });
                    break;
                case 3:
                    $(function() {
                        GardenUtils.plugin.screenMoveToDiv({
                            moveToDivObj: 'download' ,
                            minHeight: getHeaderHeight()
                        });
                    });
                    break;
                case 4: // Edit by JiaRu 160604
                    $(function() {
                        GardenUtils.plugin.screenMoveToDiv({
                            moveToDivObj: 'QA',
                            minHeight: getHeaderHeight()
                        });
                    });
                    break;
            }
        }

    }

    //
    //貸款試算
    //滑軌
    var amount = parseInt($("#Ran-1-SliderVal").val()); // 貸款總金額
    var rateYear = parseFloat($("#Ran-2-SliderVal").val()); // 年利率
    var regionYear = parseInt($("#Ran-3-SliderVal").val()); // 借款學期數
    var amountInput;
    var rateInput;
    var regionInput;


    $("#Ran-1").slider();
    $("#Ran-1").on("slide", function(slideEvt) {
        if (slideEvt.value === undefined) {
            $('#Ran-1-SliderVal').val(amountInput);

        } else if (slideEvt.value !== undefined) {
            $("#Ran-1-SliderVal").val(slideEvt.value);
        }
        amount = parseInt($("#Ran-1-SliderVal").val());
        computeLoan();
    });

    $("#Ran-2").slider();
    $("#Ran-2").on("slide", function(slideEvt) {
        if (slideEvt.value === undefined) {
            $('#Ran-2-SliderVal').val(rateInput);
        } else if (slideEvt.value !== undefined) {
            $("#Ran-2-SliderVal").val(slideEvt.value);
        }
        rateYear = parseFloat($("#Ran-2-SliderVal").val());
        computeLoan();
    });

    $("#Ran-3").slider();
    $("#Ran-3").on("slide", function(slideEvt) {
        $("#Ran-3-SliderVal").val(slideEvt.value);
        if (slideEvt.value === undefined) {
            $('#Ran-3-SliderVal').val(regionInput);
        } else if (slideEvt.value !== undefined) {
            $("#Ran-3-SliderVal").val(slideEvt.value);
        }
        regionYear = parseInt($("#Ran-3-SliderVal").val());
        computeLoan();
        regionMonth();
    });

    //輸入值(貸款試算)
    $('#Ran-1-SliderVal').on('blur', function() {
        amountInput = $(this).val();
        var isNumber = !(isNaN(amountInput));
        var err = $(this).parent('li').find('.err-message');
        if (isNumber == true) {
            if ($(this).val() == '') {
                err.text('請輸入貸款金額');
                $('#Ran-1-SliderVal').val(0);
                $('#demo input').val(0);
            }
            else {
                if ($(this).val() <= 0 || amountInput.substr(0, 1) == '0') {
                    err.text('貸款金額請輸入大於0之整數');
                    $('#Ran-1-SliderVal').val(0);
                    $('#demo input').val(0);
                } else if ($(this).val() > 9999999) {
                    err.text('貸款金額長度限7位數');
                    $('#Ran-1-SliderVal').val(0);
                    $('#demo input').val(0);
                } else if ($(this).val() == '') {
                    err.text('請輸入貸款金額');
                    $('#Ran-1-SliderVal').val(0);
                    $('#demo input').val(0);
                } else {
                    err.text('');
                    computeLoan();
                    $(function() {
                        $("#Ran-1").slider('setValue', parseInt(amountInput));
                    });

                }
            }
        } else if (isNumber == false) {
            err.text('貸款金額請輸入大於0之整數');
            $('#Ran-1-SliderVal').val(0);
            $('#demo input').val(0);
        }
    });

    $('#Ran-2-SliderVal').on('blur', function() {
        rateInput = $(this).val();
        var isNumber = !(isNaN(rateInput));
        var err = $(this).parent('li').find('.err-message');
        //alert(isNumber);
        if (isNumber == true) {
            if ($(this).val() == '') {
                err.text('請輸入年利率');
                $('#Ran-2-SliderVal').val(1.15);
            }
            else {
                if ($(this).val() <= 0) {
                    err.text('年利率限輸入數字');
                    $('#Ran-2-SliderVal').val(1.15);
                } else if ($(this).val() >= 20) {
                    err.text('年利率限輸入20%以下');
                    $('#Ran-2-SliderVal').val(1.15);
                } else if (rateInput % 1) { //檢查小數點是否超過兩位數
                    if (rateInput.split(".")[1].length > 2) {
                        err.text('年利率限輸入小數點二位數');
                        $('#Ran-2-SliderVal').val(1.15);
                    } else {
                        err.text('');
                        computeLoan();
                        $(function() {
                            $("#Ran-2").slider('setValue', parseInt(rateInput));
                        });
                    }
                } else {
                    err.text('');
                    computeLoan();
                    $(function() {
                        $("#Ran-2").slider('setValue', parseInt(rateInput));
                    });
                }
            }
        } else if (isNumber == false) {
            err.text('年利率限輸入數字');
            $('#Ran-2-SliderVal').val(1.15);
        }
    });

    $('#Ran-3-SliderVal').on('blur', function() {
        regionInput = $(this).val();
        var isNumber = !(isNaN(regionInput));
        var err = $(this).parent('li').find('.err-message');
        if (isNumber == true) {
            if ($(this).val() == '') {
                err.text('請輸入借款學期數');
                $('#Ran-3-SliderVal').val(1);
            }
            else {
                if ($(this).val() > 30) {
                    err.text('借款學期數限輸入30以內');
                    $('#Ran-3-SliderVal').val(1);
                } else if ($(this).val() <= 0 || regionInput.substr(0, 1) == '0') {
                    err.text('借款學期數限請輸入大於0之整數');
                    $('#Ran-3-SliderVal').val(1);
                } else if ($(this).val() == '') {
                    err.text('請輸入借款學期數');
                    $('#Ran-3-SliderVal').val(1);
                }else if($(this).val().indexOf('.') != -1){
                    err.text('借款學期數限請輸入大於0之整數');
                    $('#Ran-3-SliderVal').val(1);
                }
                else {
                    err.text('');
                    computeLoan();
                    regionMonth();
                    $(function() {
                        $("#Ran-3").slider('setValue', parseInt(regionInput));
                    });

                }
            }
        } else if (isNumber == false) {
            err.text('借款學期數限請輸入大於0之整數');
            $('#Ran-3-SliderVal').val(1);
        }
    });

// 貸款試算公式
// (PMT)每月平均攤還本息
//                            (1＋月利率)^貸款期數
// ＝ 貸款總金額 × 月利率 × [-------------------------]
//                            (1＋月利率)^貸款期數－1
    function computeLoan() {
        //alert('lala');
        amount = parseInt($("#Ran-1-SliderVal").val());
        regionYear = parseInt($("#Ran-3-SliderVal").val());
        rateYear = parseFloat($("#Ran-2-SliderVal").val());
        var rate = rateYear / 12 / 100;
        var factor = 1.0 + rate;
        var region = regionYear * 12;
        var regionFactor = Math.pow(factor, region); // (1＋月利率)^貸款期數
        var payment = Math.round(amount * rate * (regionFactor / (regionFactor - 1)));

        console.debug('amount:' + amount + 'rate:' + rate + '/factor:' + factor + '/region:' + region + '/regionFactor:' + regionFactor + '/payment:' + payment);

        $('#demo input').val(payment);
    }

    function regionMonth() {
        regionYear = parseInt($("#Ran-3-SliderVal").val());
        var month = $('#month');
        var reg = regionYear * 12;
        month.text('（預計還款' + reg + '個月）');
    }


//
//對保分行
    var city = modal.getCity('Y');
    console.debug(city);
//var zip = modal.getZip();
//console.debug(zip);
    var citySelect = $('#citySelector');
    var zipSelect = $('#zipSelector');
    var branchFirst = '';
    var branchPosition = $('#position');
    var jsonBranch;
    var placeBranch = $('.regionPlace');
    var regionArea = $('.regionArea');
    var selectBranch = $('.selectBranch');
    var cityArr = city.cities;
    var cityArray = [];
    var citySelectpicked;
    var mapId = 'branchMap';

    var getDefaultAddress = modal.getDefaultAddress();
    addressMap(mapId, [getDefaultAddress.branchName], [getDefaultAddress.addr], [getDefaultAddress.tel]);

//addressMap('台北市中山區中山北路二段50號');

    regionArea.hide();
    cityArray.push('<option value="">請選擇</option>');
    $.each(cityArr, function(i, cityData) {
        cityArray.push('<option value=' + cityData.cityId + '>' + cityData.cityName + '</option>');
    });
    citySelect.append(cityArray.join(''));

    linkage.changeBranchZipByCity(citySelect, cityArr, zipSelect, 'Y');

    $('#zipSelectpicker').on('click', function() {
        citySelectpicked = $('#citySelectpicker button').attr('title');
        if (citySelectpicked == '請選擇') {
            var zipMsg = $('#zipSelectpicker').find('.error-message');
            zipMsg.text('請先選擇縣市');
        }
    });
    /*if (zipCode !== '') { //若有正確選擇所在地區後的動作
     selectors.hide();
     regionArea.show();
     $.each(branchArr, function(i, branchData) { //長分行資訊
     branchArray.push('<li class="branchLi"><a class="regionText"><h4 class="branchName">' + branchData.branchName + '</h4><p class="branchAddr">' + branchData.addr + '</p><p class="branchTel">Tel ' + branchData.tel + '</p></div></a></li>');
     });
     placeBranch.empty();
     placeBranch.append(branchArray.join(''));
     branchArray = [];

     var reservation = $('.reservation');
     var region = $('.regionText');
     var firstAddress = $('.branchAddr:first').text(); //google map

     var regionText = citySelectpicked + ',' + zipSelectpicked; //放所在地區的字串
     regionTextArea.text(regionText);
     cityRegionIcon.text(citySelectpicked);
     zipRegionIcon.text(zipSelectpicked);

     if (firstAddress == '') {
     addressMap(regionText);
     }
     else {
     addressMap(firstAddress);


     //google map
     region.on('click', function() {
     var currentLi = $(this).parent();
     var currentName = currentLi.find('h4').text();
     var currentAddr = currentLi.find('.branchAddr:first').text();

     $('.branchMap').show();
     $('.calendar').hide();
     addressMap(currentAddr);
     });
     }

     }
     else {
     alert('請選擇所在地區');
     }*/

    $('#getBranch').on('click', function() { //按下'確認'鍵後的動作
        //$('#branchMap').show();
        var cityId = $('#citySelector').val();
        var zipCode = $('#zipSelector').val();
        citySelectpicked = $('#citySelectpicker button').attr('title');
        var zipSelectpicked = $('#zipSelectpicker button').attr('title');
        var regionTextArea = $('#mapInputS');
        var cityRegionIcon = $('#cityRegionIcon');
        var zipRegionIcon = $('#zipRegionIcon');
        var selectors = $('.baelArea');
        var regionText = citySelectpicked + ',' + zipSelectpicked; //放所在地區的字串

        if (zipSelectpicked != '請選擇' && citySelectpicked != '請選擇') {
            selectBranch.hide();
            regionArea.show();

            var zipMsg = $('#zipSelectpicker').find('.error-message');
            zipMsg.text('');
            var cityMsg = $('#citySelectpicker').find('.error-message');
            cityMsg.text('');

            branch = modal.getBranch(zipSelect.val());
            console.debug(branch);

            var branchArr = branch.branches;
            var branchArray = [];
            var branchNameArray = [];
            var branchAddrArray = [];
            var branchTelArray = [];

            $.each(branchArr, function(i, branchData) { //長分行資訊
                //branchArray.push('<li class="branchLi"><a class="regionText"><h4>' + branchData.branchName + '</h4><p class="branchAddr">' + branchData.addr + '</p><p>Tel ' + branchData.tel + '</p><p class="branchBlue">對保期間 ' + branchData.period + '</p><p class="branchBlue">對保時間 營業日 ' + branchData.businessDay+ '</p></a></li>');
                branchArray.push('<li class="branchLi"><a class="regionText"><h4 class="inlineBr">' + branchData.branchName + '<p class="inlineBr">Tel ' + branchData.tel + '</p></h4><p class="branchAddr">' + branchData.addr + '</p><p class="branchBlue">對保期間 ' + branchData.period + '</p><p class="branchBlue">對保時間 營業日' + branchData.businessDay + '</p></a></li>');
                branchNameArray.push(branchData.branchName);
                branchAddrArray.push(branchData.addr);
                branchTelArray.push(branchData.tel);
            });

            if (branchArray.length == 0) {
                console.debug(regionText);
                addressMap(regionText);
            } else if(branchArray.length >= 2){   //如果有多個分行,則將zoom的參數調小
                var addrArr = [];
                $.each(branchArr, function(i, branchData) { //長分行資訊
                    addrArr.push(branchData.addr);
                });
                console.debug(addrArr);
                //addressMap(addrArr);
                addressMap(mapId, branchNameArray, branchAddrArray, branchTelArray, 14);
            }
            else{
                var addrArr = [];
                $.each(branchArr, function(i, branchData) { //長分行資訊
                    addrArr.push(branchData.addr);
                });
                console.debug(addrArr);
                //addressMap(addrArr);
                addressMap(mapId, branchNameArray, branchAddrArray, branchTelArray);
            }

            regionTextArea.val(regionText);
            cityRegionIcon.text(citySelectpicked);
            zipRegionIcon.text(zipSelectpicked);

            branchPosition.append(branchArray[0]); //google map 預設抓第一個分行位置
            branchFirst = branchPosition.find('.branchAddr').text();

            console.debug(branchFirst);

            if (branchFirst === '') {
                addressMap(regionText);
            } else {
                //addressMap(branchFirst);

                placeBranch.empty();
                placeBranch.append(branchArray.join(''));
                branchArray = [];

                var region = $('.regionText');

                region.on('click', function() {
                    var currentLi = $(this).parent();
                    var currentNameAndTel = currentLi.find('h4').text();
                    var currentName = currentNameAndTel.split('T')[0];
                    var currentAddr = currentLi.find('.branchAddr:first').text();
                    var currentTel = 'T' + currentNameAndTel.split('T')[1];

                    //隨著找到的分行的數目增加高度
                    switch ($('.branchLi').length) {
                        case 2:
                            $('#loanBranchs').addClass('changeHeight1');
                            break;
                        case 3:
                            $('#loanBranchs').addClass('changeHeight2');
                            break;
                        case 4:
                            $('#loanBranchs').addClass('changeHeight3');
                            break;
                    }

                    $('#branchMap').show();
                    $('.branchMap').show();
                    $('.calendar').hide();
                    //addressMap(currentAddr);
                    addressMap(mapId, [currentName], [currentAddr], [currentTel]);
                });
            }

            regionTextArea.on('click', function() {
                //若是小版,當要重新選擇"縣市"及"區域"時,就把地圖收起來
                if ($(window).width() < 768) {
                    $('#branchMap').hide();
                    $('#loanBranchs').removeClass('changeHeight1');
                    $('#loanBranchs').removeClass('changeHeight2');
                    $('#loanBranchs').removeClass('changeHeight3');
                }

                regionArea.hide();
                selectBranch.show();
                placeBranch.empty();
                branchPosition.empty();
                branchArray = [];
            });
        }
        if (citySelectpicked == '請選擇') {
            var zipMsg = $('#zipSelectpicker').find('.error-message');
            var cityMsg = $('#citySelectpicker').find('.error-message');
            cityMsg.text('請選擇縣市');
            if (zipSelectpicked == '請選擇') {
                zipMsg.text('請選擇區域');
            } else {
                zipMsg.text('');
            }
        } else if (zipSelectpicked == '請選擇') {
            var cityMsg = $('#citySelectpicker').find('.error-message');
            var zipMsg = $('#zipSelectpicker').find('.error-message');
            zipMsg.text('請選擇區域');
            if (citySelectpicked == '請選擇') {
                cityMsg.text('請選擇縣市');
            } else {
                cityMsg.text('');
            }
        }
    });


    //
    //表單、文件下載
    var documentJSON = modal.getDocument();
    console.debug(documentJSON);

    //build HTML
    var topicArray = [];
    var topicDataArray = [];
    $.each(documentJSON.document, function(i, document) {

        var TopicDesc = document.TopicDesc;
        var TopicNo = document.TopicNo;
        var detail = document.detail;
        var isActive = (i == 0) ? 'active' : '';

        //手機版
        var detailArray = [];
        $.each(detail, function(i, d) {
            var detailTitle = d.Title;
            var detailDataNo = d.DataNo;
            var previewURL = 'data?action=downloadDocument&isPreview=Y&dataNo=' + detailDataNo;
            var downloadURL = 'data?action=downloadDocument&isPreview=N&dataNo=' + detailDataNo;

            //detailArray.push('<li><div class="dowitem"><h2 downloadURL="'+downloadURL+'">'+detailTitle+'</h2><div class="dowlink"><a href="#" class="searching" dataNo="'+detailDataNo+'"></a><a href="'+downloadURL+'" class="pdf" target="_blank"></a><a href="'+previewURL+'" class="print" target="_blank"></a></div></div><div class="dowitemContent"><div class="imgBox"><iframe src="data?action=downloadDocument&isPreview=Y&dataNo='+detailDataNo+'" width="100%" height="100%"/></div></div></li>');
            detailArray.push('<li><div class="dowitem"><h2 downloadURL="' + downloadURL + '">' + detailTitle + '</h2><div class="dowlink"><a href="#" class="searching" dataNo="' + detailDataNo + '"></a><a href="' + downloadURL + '" class="pdf" target="_blank"></a><a href="' + previewURL + '" class="print" target="_blank"></a></div></div><div class="dowitemContent"><div class="imgBox"></div></div></li>');
        });

        topicArray.push('<div class="dow"><a href="#" class="downloadtab ' + isActive + '">' + TopicDesc + '</a><div class="dowContentArea_s"><div class="dowContent dowContent-' + i + '" data-target="dowContent-' + i + '"><ul>' + detailArray.join('') + '</ul></div></div><div class="dowContent dowContent-' + i + '" data-target="dowContent-' + i + '"><ul>' + detailArray.join('') + '</ul></div></div>');

        //電腦版
        topicDataArray.push('<div class="dowContent dowContent-' + i + ' ' + isActive + '"><ul>' + detailArray.join('') + '</ul></div>');
    });

    $('.dowArea').empty().append(topicArray.join(''));
    $('.dowContentArea').empty().append(topicDataArray.join(''));

    $('.dowArea h2[downloadurl]').click(function() {
        var h2 = $(this);
        var downloadURL = h2.attr('downloadURL');
        window.open(downloadURL);
    });

    $('.downloadtab').on('click', function(ev) {
        ev.preventDefault();
        var dop = $(this).parent().index();
        $('.downloadtab').removeClass('active');
        $(this).addClass('active');
        $('.dowContentArea .dowContent').removeClass('active');
        $('.dowContentArea .dowContent-' + dop + '').addClass('active');
        $('.dowContentArea_s .dowContent-' + dop + '').slideToggle('active');
    });

    // 銵典鱓�����辣銝贝��   (pad)
    $('.dow h3').on('click', function() {
        $(this).toggleClass('active');
        $(this).parent().find('.dowContentArea_s .dowContent').slideToggle(1250);
    });


    //預覽
    $('.searching').off('click').on('click', function(ev) {

        ev.preventDefault();

        var $this = $(this);
        var dataNo = $this.attr('dataNo');

        var contentTextLi = $(this).parent().parent().parent();
        var contentText = contentTextLi.find('.dowitemContent');

        if (contentText.find('.imgBox').find('iframe').length == 0) {
            contentText.find('.imgBox').append('<iframe src="data?action=downloadDocument&isPreview=Y&dataNo=' + dataNo + '" width="100%" height="100%"/>');
        }
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
            contentText.show();
        } else {
            contentText.hide();
        }
    });

    /** --start  表單文件下載 => 下拉選單收放   0519 忠毅   **/

    var width = $(window).width(),
        height = $(window).height();
    if ((width <= 769)) {
        $('.active').removeClass('active');
        $('.dowContentArea_s').hide();

        var tmp_active;
        $('.downloadtab').each(function() {
            $(this).off('.click').on('click', function() {


                $('.dowContentArea_s').hide();

                setTimeout(function() {


                    if ($('.active').hasClass('open_form')) {
                        $('.dowContentArea_s').hide();
                        $('.active').removeClass('open_form');
                        $('.active').removeClass('active');
                    } else {

                        $('.active').parent().find('.dowContentArea_s').show();
                        $('.active').addClass('open_form');
                    }

                }, 100);

            });
        });
    }





    /*
     function addressMap(address) {
     console.debug(address);
     GardenUtils.plugin.showGoogleMap({
     divId: 'branchMap',
     zoom: 14,
     address: address,
     icon : 'img/marker_bank.png',
     dialog : address
     });
     }
     */


});

