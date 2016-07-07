var Myloan_controller = (function(){

	var main = function(){
        /**  要資料  **/

        g_ajax({
            url: 'data?action=myloanDetail',
            data: {},
            datatype:'json',
            callback: function(json) {
                //content = $.parseJSON(content);
                console.debug(json);
                var client_data = json;

                console.log(client_data);

                /*2016-06-23 added by titan 加上是否有貸款帳號跟是否有轉催/轉呆、戶況有協商註記*/
                var isEtabs = client_data.isEtabs; //是否有貸款帳號
                var hasAccount = client_data.hasAccount; //是否有貸款帳號
                var isArrears = client_data.isArrears; //是否無欠款

                if(hasAccount == 'N' || isArrears == 'N') {
                    redirectNoPermit('1','我的貸款');
                }
                else if(isEtabs == 'N') {
                    redirectNoPermit('2','我的貸款');
                }
                else {
                    var remind = $('li.remind');
                    remind.show();

                    //長總額
                    $('.morebig').text('$' + GardenUtils.format.convertThousandComma(client_data.total));

                    for(var i = 0;i<client_data.data.client_detail.length;i++){

                        dynamic_client_data(i,client_data.data.client_detail[i]);

                    }

                    //$('<div class="xizia"> <h3>相關功能</h3> <a href="'+client_data.data.client_detail[0].return_detail+'" class="pobtn-srb">還款明細查詢</a> <a href="'+client_data.data.client_detail[0].my_detail+'" class="pobtn-srb">我的電子繳款單</a> </div>').insertbefore($('.casomTitle'));
                    $('.casomTitle').before('<div class="xizia"> <h3>相關功能</h3> <a href="'+client_data.data.client_detail[0].return_detail+'" class="pobtn-srb">還款明細查詢</a> <a href="'+client_data.data.client_detail[0].my_detail+'" class="pobtn-srb">我的電子繳款單</a> </div>');

                    $('.picabtn').off('mousedown').on('mousedown',function(){

                        if($(this).hasClass('active')){
                            $(this).html('詳細資訊&nbsp;<i class="fa fa-caret-down"></i>');
                        }
                        else{

                            $(this).html('收起&nbsp;<i class="fa fa-caret-up"></i>');
                        }

                    });
                }


            }
        });

    };	

	var dynamic_client_data = function(i,data){
		Myloan_view.account_outline(data);
		Myloan_view.account_detail(i,data);
	}


	var client_check = function(client_state){
		var tmp_check =1; // 代表一般客戶
		
		if(client_state == 'delay'){
			tmp_check = 0;
		}

		return tmp_check;
	}

	return {
		main : main

	};

})();

var Myloan_view = (function(){

	var account_outline = function(data){
		
		var rate_num = parseFloat(data.rate).toFixed(4);
		var star='';

		if(Myloan_view.show_star_and_number6(data.state)){
			star = '**';
		}

		$('.casomTitle').before('<div class="lightWon"> <ul class="busus"> <li> <p>貸款帳號</p> <h3>'+data.account+star+'</h3> </li> <li> <p>分行名稱</p> <h3>'+data.bank_name+'</h3> </li> <li> <p>貸款餘額</p> <h3>'+GardenUtils.format.convertThousandComma(data.remain_money)+'</h3> </li> <li> <p>利率</p> <h3>'+rate_num +'%</h3> </li> <li> <p>每月應繳款日</p> <h3>'+data.pay_day+'日</h3> </li> </ul> <a href="javascript:;" class="picabtn ">詳細資訊&nbsp<i class="fa fa-caret-down"></i></a> <div class="repayTableOuter"> <div class="repayTableArea"> <div class="repayTable resaTable"> </div> </div>  </div> </div>');

	}

	var account_detail = function(i,data) {

		var this_table = $('.repayTable').eq(i);
		this_table.append('<ul class="resa"> <li> <h4>學期別</h4> </li> <li> <h4>原貸金額</h4> </li> <li> <h4>貸款餘額</h4> </li> <li> <h4>每月應繳月付金</h4> </li> </ul>');

		var type_1='';
		var type_2='';
		var type_3='';
		var type_4='';
		var type_5='';

		var tmp_record = [];


		/** --start  為了要排序 semister   **/
		for(var j= 0;j<data.detail.length;j++){
			
			var semister = parseFloat(data.detail[j].semister);
			var semister_state = parseFloat(data.detail[j].semister_state);

			var find_semister = (semister + semister_state) ;

			var original_money = parseInt(data.detail[j].original_money);
			var balance_money = parseInt(data.detail[j].balance_money);
			var need_pay_month = parseInt(data.detail[j].need_pay_month);

			tmp_record.push({
				tmp_semister : semister,
				semister : find_semister,
			    original_money: original_money,
				balance_money: balance_money,
				need_pay_month: need_pay_month
			});			


		}
		/** --end  為了要排序 semister   **/

		/**   利用semister來排序 --start  **/
		tmp_record.sort(function(a, b){
			return  parseFloat(a.semister) - parseFloat(b.semister);
		});
		/**   利用semister來排序 --end  **/


		for(var k=0;k<tmp_record.length;k++){
			var state='上';

			if(tmp_record[k].semister.toString().indexOf('.') != -1)
				state = '下';

			type_1 += '<h5>'+tmp_record[k].tmp_semister+state+'學期</h5>';
			type_3 += '<h5>'+GardenUtils.format.convertThousandComma(tmp_record[k].original_money)+'</h5>';
			type_4 += '<h5>'+GardenUtils.format.convertThousandComma(tmp_record[k].balance_money)+'</h5>';
			type_5 += '<h5>'+GardenUtils.format.convertThousandComma(tmp_record[k].need_pay_month)+'</h5>';

		}
		
		/**  --start 分別append 到 li去, 因為野口是分開切,而不是用table  **/
		this_table.find('li').eq(0).append(type_1);
		this_table.find('li').eq(1).append(type_3);
		this_table.find('li').eq(2).append(type_4);
		this_table.find('li').eq(3).append(type_5);
		/**  --end 分別append 到 li去, 因為野口是分開切,而不是用table  **/

	}

	var show_account = function(account){
		
		$('.lightWon').each(function(){

			$(this).find('h3').eq(0).html(account);
		});

	}

	var show_star_and_number6 = function(state){
		var tmp= 0;
		if(state == 'delay' && $('.delay_star').length ==0){
			$('<li class="delay_star">※ 提醒您：請特別關心上列有「* *」標註記之貸款，是否已按時繳款成功！您可前往「【網路銀行>貸款應繳款項查詢】」功能查詢目前實際欠巧金額，或洽客戶服務專線 02-8751-6665。<br> ※ 如已完成繳款，請毋須理會此項提醒註記</li>').appendTo($('.casom'));
			tmp =1; 
		}
		else if(state == 'delay')
			tmp =1; 

		return tmp;
	}

	return {
		account_outline : account_outline,
		account_detail : account_detail,
		show_star_and_number6 : show_star_and_number6

	};

})();

var Myloan_modal = (function(){

	var client_data = function(this_url){

		var resp;
	   	$.ajax({async: false, url: this_url, dataType: 'json',success:function(json) {resp = json;}});

	    return resp;
		
	}

	return {
		client_data : client_data

	};

})();

Myloan_controller.main();
