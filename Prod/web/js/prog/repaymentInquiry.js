var RepaymentInquiry_controller = (function(){

    var main = function() {
	
	
        /** Loan Account **/
		g_ajax({
	        url: 'data?action=myloanDetail',
	        data: {},
			datatype:'json',
	        callback: function(json) {
				//content = $.parseJSON(content);
				console.debug(json);
				
				var loanAccount_data = json;
				
				console.log(loanAccount_data);

				var isEtabs = loanAccount_data.isEtabs; //是否有貸款帳號
                var hasAccount = loanAccount_data.hasAccount; //是否有貸款帳號
                var isArrears = loanAccount_data.isArrears; //是否無欠款
				var accounts = loanAccount_data.accounts;//accounts
				
                if(hasAccount == 'N' || isArrears == 'N') {
                    redirectNoPermit('1','查詢「還款明細查詢」');
                }
                else if(isEtabs == 'N') {
                    redirectNoPermit('2','查詢「還款明細查詢」');
                }
				else {
					RepaymentInquiry_view.account_selection(accounts,loanAccount_data.data.client_detail);

			        /** Query Date **/
			        var today = new Date();
			        var today_d = today.getDate(), today_m = today.getMonth()+1, today_y = today.getFullYear();
					
					today.setMonth(today.getMonth() -3);
					
			        var start_d = today_d, start_m = today.getMonth()+1, start_y = today_y,
			            end_d = today_d, end_m = today_m, end_y = today_y;
			        var start_str = start_y+"/"+start_m+"/"+start_d,
			            end_str = end_y+"/"+end_m+"/"+end_d;
						
					//小網時,不可自行查詢日期
					if ($(window).width() <= 768) {
						$('#datetimepicker1 .form-control').attr('readonly', true);
						$('#datetimepicker2 .form-control').attr('readonly', true);
					}
						
						
			        //綁定點選小日曆的事件讓它變藍色
			        $('#datetimepicker1 .input-group-addon').off('click').on('click',function(ev){
			            ev.preventDefault();
			            var $this = $(this);

			            if( $this.hasClass('active') ){
			                $this.removeClass('active');
			            }
			            else{
			                $this.addClass('active');
			            }
						
						$('#customizeQuery label').trigger('click');					
						
			        });

			        $('#datetimepicker2 .input-group-addon').off('click').on('click',function(ev){
			            ev.preventDefault();
			            var $this = $(this);

			            if( $this.hasClass('active') ){
			                $this.removeClass('active');
			            }
			            else{
			                $this.addClass('active');
			            }
						
						$('#customizeQuery label').trigger('click');
			        });

			        $('#datetimepicker1').datetimepicker({
			            locale: "zh-TW",
			            format: 'YYYY/MM/DD',
			            defaultDate: start_str,
						ignoreReadonly: true,
			            disabledDates: [
			                moment(start_str),
			                new Date(start_y, start_m - 1, start_d),
			                start_str
			            ]
			        }).on('dp.show',function(e){
						$('#datetimepicker1 [data-action="pickerSwitch"]').removeAttr('data-action');
						
					});

			        $('#datetimepicker2').datetimepicker({
			            locale: "zh-TW",
			            format: 'YYYY/MM/DD',
						ignoreReadonly: true,
			            defaultDate: end_str,
			            disabledDates: [
			                moment(end_str),
			                new Date(end_y, end_m - 1, end_d),
			                end_str
			            ]
			        }).on('dp.show',function(e){
						$('#datetimepicker2 [data-action="pickerSwitch"]').removeAttr('data-action');
						
					});


			        $('.mydatetimepicker').on('click',function(){
			            $('#near0').attr('checked', true);
			        });

			        /** Search click **/
			        $('.loadSearchBtn').off('click').on('click', function(ev) {

			            ev.preventDefault();

			            //先清除error-msg
			            var errorMsg = $('.error-msg');
			            errorMsg.empty();

			            var isAcceptedSearch = true;

			            var today = new Date();
			            var today_d = today.getDate(), today_m = today.getMonth()+1, today_y = today.getFullYear();

			            var near_id = $(".searchArea input[name='near']:checked").attr('id'),
			                start_str = '', end_str = today_y+"/"+today_m+"/"+today_d;
			            //alert(near_id);

			            switch( near_id ) {
			                case 'near3':
			                    start_str = (today_m-3)<=0 ? (today_y-1)+"/"+(today_m-3+12)+"/"+today_d : today_y+"/"+(today_m-3)+"/"+today_d;
			                    break;

			                case 'near6':
			                    start_str = (today_m-6)<=0 ? (today_y-1)+"/"+(today_m-6+12)+"/"+today_d : today_y+"/"+(today_m-6)+"/"+today_d;
			                    break;
			                case 'near12':
			                    start_str = (today_y-1)+"/"+today_m+"/"+today_d;
			                    break;
			            } // end switch: determine date

						if(near_id == 'near3' || near_id == 'near6' || near_id == 'near12') {
							$('#datetimepicker1 input').val(start_str);
				            $('#datetimepicker2 input').val(end_str);
						}

			            /** check Date **/
			            start_str = $('#datetimepicker1 input').val();
			            end_str = $('#datetimepicker2 input').val();
			            var near12_str = (today_y-1)+"/"+today_m+"/"+today_d;

			            var sDate = new Date(start_str);
			            var eDate = new Date(end_str);
			            var nDate = new Date(near12_str);

			            var b_se = sDate - eDate,
			                b_st = sDate - today,
			                b_et = eDate - today,
			                b_sn = nDate - sDate,
			                b_en = nDate - eDate;

							
			            if(start_str == '' || end_str == '') {
			                isAcceptedSearch = false;
			                errorMsg.text('請輸入查詢期間');
			            }
			            else if(b_se > 0){
			                isAcceptedSearch = false;
			                errorMsg.text('起日不可晚於迄日');
			            } else if(b_st > 0 || b_et > 0){
			                isAcceptedSearch = false;
			                errorMsg.text('起迄日不可晚於今日');
			            } else if(b_sn > 0 || b_en > 0){
			                isAcceptedSearch = false;
			                errorMsg.text('僅提供查詢近一年');
			            }

						var account = $('#accounts').val();

						if(account == '') {
							isAcceptedSearch = false;
			                errorMsg.text('請輸入貸款帳號');
						}
						
			            if( isAcceptedSearch ) {
		
							
							//顯示Ajax轉轉圖，另外讓主頁面hide	
							$('.ajax-loader').show();
							setTimeout(function(){
								$('.searchResult').hide();
							
								//alert(account+'\n'+start_str+'\n'+end_str);
				                var result = RepaymentInquiry_modal.listRepaymentDetail({
				                    account: account,
				                    start_date: start_str,
				                    end_date: end_str
				                });

								$('.ajax-loader').hide();
								
				                if( result.data != '' ) {

				                    $('.nextBtn.outerBtn').css('display', 'none');
				                    $('.nextBtn.innerBtn').css('display', 'block');

				                    if(result.data.repayment_detail.length == 0) {
				                        GardenUtils.display.popup({
				                            title: '',
				                            content: '<p>很抱歉，您所選擇的查詢條件無相關資料。</p>',
				                            closeCallBackFn: function() {},
				                            isShowSubmit: false
				                        });
				                    }
				                    else {
				                        RepaymentInquiry_controller.listResult( result.data.repayment_detail );
				                    }
				                } else {
				                    errorMsg.text('查詢失敗，請稍候再試！');
				                }
							},100);
			                
			            } // end if: accepted search
			        }); // end click: search

			        /** Search Result **/
			        $('.searchResult').addClass('hidden');
				}
				
		        
	        }
	    });
        
    }; // end main function

    var listResult = function(listRepaymentDetail_data){

		$('.searchResult').show();
        $('.searchResult .repayTable .smVersion').empty();

        $('.searchResult').removeClass('hidden');

        var theadArr = [], tbodyArr = [], trTmp = [], sm_tbodyArr = [], sm_trTmp = [];
        $.each(listRepaymentDetail_data, function(i, detail){

            /** create thead **/
            if(i==0){
                $.each(detail.datas, function(j, col){
                    trTmp.push({
                        type: 'th',
                        val: col.displayText
                    });
                }); // end each : view column value

                theadArr.push(trTmp);
                trTmp = [];
            } // end if: append th

            var commonArea = $('<div class="lightWon">'+
                '<ul class="busus"></ul>'
                +'<div class="detailBtn"><a href="javascript:;" class="picabtn">詳細資訊 <i class="fa fa-caret-down"></i></a></div>'
                +'<div class="sm_table hidden"></div></div>').appendTo( $('.searchResult .repayTable .smVersion') );
            //var sm_table = $('<div class="sm_table hidden">123</div>').appendTo( $('.searchResult .repayTable .smVersion') );

            commonArea.find('a.picabtn').off('click').on('click', function(){

                if( !$(this).parent().parent().hasClass('detailOpen') ){
                    $('.smVersion .lightWon').removeClass('detailOpen');
                    $('.smVersion .picabtn').removeClass('active');
                    $('.smVersion .picabtn').html('詳細資訊 <i class="fa fa-caret-down"></i>');
                    $('.smVersion .sm_table').addClass('hidden');

                    $(this).parent().parent().addClass('detailOpen');
                    $(this).html('收起 <i class="fa fa-caret-up"></i>');
                    $(this).parent().parent().find('.sm_table').removeClass('hidden');
                    //$(this).parent().parent().next().removeClass('hidden');
                } else {
                    $(this).parent().parent().removeClass('detailOpen');
                    $(this).html('詳細資訊 <i class="fa fa-caret-down"></i>');
                    $(this).parent().parent().find('.sm_table').addClass('hidden');
                    //$(this).parent().parent().next().addClass('hidden');
                }
            }); // end click: small version detail btn

            /** create tbody **/
            $.each(detail.datas, function(j, col){
                var val_str = col.value;
                if(col.displayText == '學期別'){
					console.debug('val_str ===> ' + val_str);
					
					var semister = val_str.substring(3,4);
					console.debug('semister = ' + semister);
					
					var text = '';
					if(semister == '1') {
						text = '上';
					}
					else if(semister == '2') {
						text = '下';
					}
					
                    val_str = parseInt(val_str/10)+'年'+text+'學期';
                }

                trTmp.push({
                    type: 'td',
                    val: val_str
                });

                sm_trTmp.push({
                    type: 'th',
                    val: col.displayText
                });

                sm_trTmp.push({
                    type: 'td',
                    val: val_str
                });

                sm_tbodyArr.push(sm_trTmp);
                sm_trTmp = [];

                /** append to small version **/
                if( col.isCommon == 'Y' ){
                    $('<li><p>'+col.displayText+'</p><h3>'+val_str+'</h3></li>').appendTo( commonArea.find('ul.busus') );
                }
            }); // end each : view column value

            tbodyArr.push(trTmp);
            trTmp = [];

            console.log('sm_tbodyArr: ', sm_tbodyArr);

            $sm_table = RepaymentInquiry_view.createTable({
                setEmpty: true,
                target: commonArea.find('.sm_table'), //sm_table,
                thead: [],
                tbody: sm_tbodyArr
            });
            sm_tbodyArr = [];
        }); // end each: listRepaymentDetail_data

        console.log('tbodyArr: ', tbodyArr);


        $lg_table = RepaymentInquiry_view.createTable({
            setEmpty: true,
            target: $('.searchResult .repayTable .lgVersion'),
            thead: theadArr,
            tbody: tbodyArr
        });
    }; // end listResult function


    return {
        main : main,
        listResult: listResult
    };

})(); // end RepaymentInquiry_controller

var RepaymentInquiry_view = (function(){

    var account_selection = function(accounts,data){

			var options = '';

			if(accounts.length > 1) {
				options = '<option value="">請選擇</option>';
			}
			
            for(var i =0;i<accounts.length;i++) {
                options += '<option value="'+accounts[i]+'">'+accounts[i]+'</option>';			
			}
			
            //var final_select = '<select class="selectpicker input_m" placeholder="請選擇">'+options+'</select>';

			$('#accounts').append(options);
			
            //$(final_select).appendTo($('.right').eq(0));
	
        //console.log(data.length);
		/*
        if(data.length == 1)
            $('<button style="border: none; background: none;"><span>'+data[0].account+'</span></button>').appendTo($('.right.account').eq(0));
        else if(data.length > 1){

            var tmp_html = '';

            for(var i =0;i<data.length;i++)
                tmp_html += '<option>'+data[i].account+'</option>';

            var final_select = '<select class="selectpicker input_m" placeholder="請選擇">'+tmp_html+'</select>';

            $(final_select).appendTo($('.right').eq(0));
        }
		*/
    }; // end account_selection function

    var createTable = function(config) {

        console.log('createTable config: ', config);

        if(config.setEmpty) config.target.empty();

        $table = $('<table class="rema 123"><thead></thead><tbody></tbody></table>').appendTo( config.target );

        if(config.thead != undefined && config.thead.length != 0) {
            $.each( config.thead, function(i, trObj){
				
				console.log('123: ');
				// console.log(config);
				
				// console.log(config.thead[0][6].val);
				
				// config.thead[0][6].val = '逾期<br class="repaymentInquiry_br">違約金';
				// config.thead[0][7].val = '還款<br class="repaymentInquiry_br">金額合計';
				
               createRow('thead', trObj, config.trAttr);
            });
        }

        if(config.tbody != undefined && config.tbody.length != 0) {
            $.each( config.tbody, function(i, trObj){
                createRow('tbody', trObj, config.trAttr);
            });
        }

        function createRow(tEle, trObj, trAttr){
            var arr = [], trAttrStr = '';
            $.each( trObj, function(i, obj){
			
				if( obj.val.indexOf("違約金") > -1){
					// console.log("違約金");
					obj.val = '逾期<br class="repaymentInquiry_br">違約金';
					console.log(obj.val);
				}
					
				else if (obj.val.indexOf("金額合計") > -1){
					// console.log("金額合計");
					obj.val = '還款<br class="repaymentInquiry_br">金額合計';
					console.log(obj.val);
				}
					
				
                if(obj.val == undefined) {
                    obj.val = '';
                }

                var classStr = '', titleStr = 'title="'+obj.val+'"';
                if( obj.class != undefined ) classStr = 'class="'+obj.class+'"';
                if( obj.type == 'trAttr' ){
                    $.each( obj.val, function(i, trAttrObj){
                        trAttrStr += trAttrObj.attrName+'="'+trAttrObj.attrVal+'"';
                    });
                }

                var tagTitle = '';
                if(obj.hasOwnProperty('maxSize') && obj.val.length>obj.maxSize) {
                    tagTitle = 'title="'+obj.val+'"';
                }
				
                else {
					arr.push('<'+obj.type+' '+classStr+' '+(obj.valType == 'text'? titleStr :'')+' '+tagTitle+'>'+(obj.hasOwnProperty('maxSize')? ((obj.val.length>obj.maxSize)?obj.val.substring(0,obj.maxSize)+'...':obj.val):obj.val)+'</'+obj.type+'>');
      				// console.log('<'+obj.type+' '+classStr+' '+(obj.valType == 'text'? titleStr :'')+' '+tagTitle+'>'+(obj.hasOwnProperty('maxSize')? ((obj.val.length>obj.maxSize)?obj.val.substring(0,obj.maxSize)+'...':obj.val):obj.val)+'</'+obj.type+'>')
				}
				
				});
	
			
			
			
            $table.find(tEle).append('<tr '+trAttrStr+'>'+arr.join('')+'</tr>');
        } // end createRow function

        return $table;
    }; // end createTable function

    return {

        account_selection : account_selection,
        createTable: createTable

    };

})(); // end RepaymentInquiry_view

var RepaymentInquiry_modal = (function(){

    var getLoanAccount = function(){
        var resp;
        //$.ajax({async: false, url: 'json/loanAccount_data.json', dataType: 'json',success:function(json) {resp = json;}});
        $.ajax({async: false, url: 'data?action=myloanDetail', dataType: 'json',success:function(json) {resp = json;}});

        return resp;
    }; // end getLoanAccount function

    var listRepaymentDetail = function(obj){
        var resp;
        var data = new FormData();
        data.append('account', obj.account);
        data.append('start_date', obj.start_date);
        data.append('end_date', obj.end_date);
        data.append('v', new Date().getMilliseconds());
        $.ajax({
            async: false,
            //url: 'json/listRepaymentDetail_data.json',
            url: 'data?action=repaymentInquiry',
            data: data,
            processData: false,
            cache : false,
            contentType : false,
            type: 'POST',
            success: function ( data ) {
                resp = data;
            },
            error: function(){alert('error'); resp = {data: ''};}
        });

        return resp;
    }; // end loanAccount_data function

    return {
        getLoanAccount : getLoanAccount,
        listRepaymentDetail: listRepaymentDetail
    };

})(); // end RepaymentInquiry_modal

RepaymentInquiry_controller.main();