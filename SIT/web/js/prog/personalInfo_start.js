$(document).ready(function() {

	g_ajax({
        url: 'data?action=getPersonalInfo',
        //url: 'json/personalInfo_start.json',
        //url: 'json/personalInfo_1.json',
        //url: 'json/personalInfo_2.json',
        //url: 'json/personalInfo_3.json',
        //url: 'json/personalInfo_4.json',
        data: {},
		datatype:'json',
        callback: function(json) {
			//content = $.parseJSON(content);
			console.debug(json);
			personalInfo_start(json);
        }
    });

	
	function personalInfo_start(content){

	console.debug(content);
	
    var PersonalInfo_controller = (function() {
        
        var show_data = [];
        
        // var main_down = function(content){


        //     $('<div class="earth">'+content.notice_text+'</div>').appendTo($('.processOutBox'));
        // }

        var main = function(content) {

            /**  要資料  **/
            // var client_data = PersonalInfo_modal.client_data('haha_js_personalInfo/client_data_0.json');
            // console.log(client_data);
			
			console.debug(content);
			
            var Show_data_1 = new Show_data();
			Show_data_1.setStraegy(new have_record_client() );
                Show_data_1.getBonus(content);
			/**
            if(content.isRecord == 'Y'){
                Show_data_1.setStraegy(new have_record_client() );
                Show_data_1.getBonus(content);
            }
            else {
                Show_data_1.setStraegy(new no_record_client() );
                Show_data_1.getBonus(content);

            }
			**/

            PersonalInfo_view.account_outline(show_data[0]);

             //$('.processTab').hide();
            // $('.nextBtn').hide();
            
            PersonalInfo_view.main_down(content);
        }

        var have_record_client = function (){}
        have_record_client.prototype.check = function(content) {
            
            // alert(';123');
            var birthday_tmp = '民國'+content.birthday.substr(0, 3)+'年'+content.birthday.substr(3,2)+'月'+content.birthday.substr(5, 6)+'日';
            var marrage;

            if(content.marryStatus == 'Y')
                marrage = '已婚';
            else if(content.marryStatus == 'N') {
                marrage = '未婚';
			}
			
			var domicRegionCode = content.domicilePhone.regionCode;
			var teleRegionCode = content.telePhone.regionCode;
			
			if(domicRegionCode != '') {
				domicRegionCode = '(' + domicRegionCode + ')';
			}
			
			if(teleRegionCode != '') {
				teleRegionCode = '(' + teleRegionCode + ')';
			}
			
            var obj= { 'id': content.id, "name":content.name, "birthday":birthday_tmp, "marryStatus": marrage,"domicilePhone":domicRegionCode+content.domicilePhone.phone ,"telePhone":teleRegionCode+content.telePhone.phone , "email":content.email, "mobile":content.mobile, "domicileAddress":content.domicileAddress.address, "teleAddress":content.teleAddress.address};
            			
			
            show_data.push(obj);
        };

        var no_record_client = function (){}
        no_record_client.prototype.check = function(content) {
            
			console.debug(content);
			console.debug(content.birthday);
			
            var birthday_tmp = '民國'+content.birthday.substr(0, 3)+'年'+content.birthday.substr(3,2)+'月'+content.birthday.substr(5, 6)+'日';

            var obj= { 'id': content.id, "name":content.name, "birthday":birthday_tmp, "marryStatus": "","domicilePhone":"" ,"telePhone":"" , "email":content.email,  "mobile":content.mobile,"domicileAddress":"", "teleAddress":""};
            show_data.push(obj);

        };


        var Show_data = function(){
          
          this.strategy = null;
        }
        Show_data.prototype.setStraegy = function(strategy) {
          // body...
          this.strategy = strategy;
        };
        Show_data.prototype.getBonus = function(content) {
          // body...
           return this.strategy.check(content);
        };
        

        return {
            main : main
        };

    })();

    var PersonalInfo_view = (function(){

        var main_down = function(content){


            //$('<div class="earth">'+content.notice_text+'</div>').appendTo($('.processOutBox'));
        }

        var account_outline = function(data){

            var tmp_index=0;
            $.each(data, function(index, value) {
              
			  console.debug(index + '=' + value);
			  
                $('.right').eq(tmp_index).children().html(value);

                tmp_index++;
            }); 

        }

        return {
            account_outline : account_outline,
            main_down : main_down
        };

    })();


    PersonalInfo_controller.main(content);
    //PersonalInfo_controller.main_down();


} // end personalInfo_0 function


});



