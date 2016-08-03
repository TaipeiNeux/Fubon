var modal = {

    getCity: function(bindBranch) {
        
        var jsonCity;
        $.ajax({
            async: false,
            url: 'options?action=getCity&bindBranch=' + bindBranch + '&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonCity = json;
            }
        });

        return jsonCity;
    },

    getZip: function(zipPara,bindBranch) {
        var jsonZip;
        $.ajax({
            async: false,
            url: 'options?action=getZipCode&cityId=' + zipPara + '&bindBranch=' + bindBranch + '&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonZip = json;
            }
        });
        
        console.debug(jsonZip);

        return jsonZip;
    },

    getLiner: function(zipCode) {
        var jsonLiner;
        $.ajax({
            async: false,
            url: 'options?action=getLiner&zipCode=' + zipCode + '&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonLiner = json;
            }
        });
        console.debug(jsonLiner);

        return jsonLiner;
    },


    getFamilyInfo: function(type, convert, callback, noMark) {
		//type:father/mother/thirdparty/spouse		
		
        g_ajax({
            //url: 'json/getFamilyInfo.json',
			url: 'data?action=getFamilyInfo&v=' + new Date().getTime(),
            data: {
                type: type,
				convert : convert,
				noMark : noMark
            },
            callback: callback
        });
		console.debug('jsonFamily');
    },
	
    getEducationInfo: function(type, callback) {
        g_ajax({
            url: 'json/getEducationInfo.json',
            data: {
                type: type
            },
            callback: callback
        });
    },
    getBranch: function(zipcode) {
        var jsonBranch;
        $.ajax({
            async: false,
            //url: 'json/branch.json',
            url: 'options?action=getBranch&zipcode=' + zipcode + '&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonBranch = json;
            }
        });
        return jsonBranch;
    },
	getDefaultAddress: function() {
        var jsonBranch;		
		
		$.ajax({
			async: false,
            url: 'data?action=getDefaultAddress&v=' + new Date().getTime(),
            success: function(json) {
                jsonBranch = json;
            }
        });
		
        return jsonBranch;
    },
   
     getForm: function() {
        var jsonForm;
        $.ajax({
            async: false,
            url: 'json/form.json',
            datatype: 'json',
            success: function(json) {
                jsonForm = json;
            }
        });

        return jsonForm;
    },
	
	getEducationStage: function() {
        var jsonStage;
        $.ajax({
            async: false,
            url: 'options?action=getSchoolType3&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonStage = json;
            }
        });
        console.debug(jsonStage);
        return jsonStage;
    },
	getIsNational: function() {
        var jsonNational;
        $.ajax({
            async: false,
            url: 'options?action=getSchoolType1&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonNational = json;
            }
        });

        return jsonNational;
    },
    getSchoolName: function(national, day, stage) {
        console.debug(national+'/'+day+'/'+stage);
        var jsonSchoolName;
        $.ajax({
            async: false,
            url: 'options?action=getSchool&type1=' + national +'&type2=' + day +'&type3=' + stage + '&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonSchoolName = json;
            }
            //url: 'options?action=getSchool&type1=1&type2=1&type3=1',
        });

        return jsonSchoolName;
    },

    getIsDay: function() {
        var jsonIsDay;
        $.ajax({
            async: false,
            url: 'options?action=getSchoolType2&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonIsDay = json;
            }
        });
        console.debug(jsonIsDay);
        return jsonIsDay;
    },

    getDepartment: function(type) {
        var jsonDepartment;
        $.ajax({
            async: false,
            url: 'options?action=getSchoolType3&type2=' + type + '&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonDepartment = json;
            }
        });
        console.debug(jsonDepartment);
        return jsonDepartment;
    },

    getGrade: function() {
        var jsonGrade;
        $.ajax({
            async: false,
            url: 'json/grade.json',
            datatype: 'json',
            success: function(json) {
                jsonGrade = json;
            }
        });
        console.debug(jsonGrade);

        return jsonGrade;
    },
    
	login: function(studentId,studentCode,studentPassword,isForce) {
        var jsonGrade;
		
		//var token = getToken();
		var token = '';
		
		try{
			token = getToken();
		}catch(e) {
			console.debug(e);
		}
		
		//var token = window.top.getToken();
		//alert(token);
		$.ajax({
            async : false,
            url: 'auth?action=login&v=' + new Date().getTime(),
            data: {
				id : studentId,
				userId : studentCode,
				userPwd : studentPassword,
				force:isForce,
				token : token
			},
			type : 'post',
            success: function(json) {
                jsonGrade = json;
            }
        });
		
		/*
		g_ajax({
            
            url: 'auth?action=login',
            data: {
				id : studentId,
				userId : studentCode,
				userPwd : studentPassword,
				force:isForce
			},
			type : 'post',
            callback: function(json) {
                jsonGrade = json;
            }
        });
		*/
        
        console.debug(jsonGrade);

        return jsonGrade;
    },
	logout: function() {
        $.ajax({
            async: false,
            url: 'auth?action=logout&v=' + new Date().getTime(),
            datatype: 'json',
			type : 'post',
            success: function() {
                //jsonGrade = json;
            }
        });
    },
	setGuest: function(callback) {
        $.ajax({
            async: false,
            url: 'auth?action=setGuest&v=' + new Date().getTime(),
            datatype: 'json',
			type : 'post',
            success: function() {
                //jsonGrade = json;
				callback.apply(window,[]);
            }
        });
    },
	getLoginInfo: function(callback) {
        
		//var token = getToken();
		var token = '';
		
		try{
			token = getToken();
		}catch(e) {
			console.debug(e);
		}
		
        $.ajax({
            async: false,
            url: 'auth?action=getLoginInfo&_token='+token+'&v=' + new Date().getTime(),
            datatype: 'json',
			type : 'post',
            success: function(json) {
                callback(json);
            }
        });
        

    },
    getCodeImg: function() {
        var jsonCode;
        $.ajax({
            async: false,
            url: 'json/getCode.json',
            datatype: 'json',
            success: function(json) {
                jsonCode = json;
            }
        });

        return jsonCode;
	},
	getNews: function(callback) {
        
        $.ajax({
            url: 'data?action=getNews&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
				
                callback.apply(window,[json]);
				
            }
        });
        
    },
	getQA: function() {
        var resp;
        $.ajax({
			async : false,
            url: 'data?action=getQA&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
				resp = json;
                //callback.apply(window,[json]);
				
            }
        });
		
		return resp;
    },
	getDocument: function() {
        
		var resp;
        $.ajax({
			async : false,
            url: 'data?action=getDocument&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
				resp = json;
            }
        });
		
		return resp;
    },
    //getAppointment: function(date, branchId) {
	getAppointment: function() {
        var jsonAppointment;
        $.ajax({
            async: false,
            url: 'json/appointment.json',
            datatype: 'json',
            success: function(json) {
                jsonAppointment = json;
            }
        });
		//console.debug(jsonAppointment);

        return jsonAppointment;
    },
	//getFullString: function(date, branchId) {
	getFullString: function(date,branchId) {
        var jsonFullString;
        $.ajax({
            async: false,
			url : 'data?action=getExpectBranchPeoples&date='+date+'&branchId=' + branchId + '&v=' + + new Date().getTime(),
            //url: 'json/isFull.json?date=' + date + '&branchId=' + branchId,
            datatype: 'json',
            success: function(json) {
                jsonFullString = json;
            }
        });
        return jsonFullString;
    },
	getCarryObj: function() {
        var jsonCarry;
        $.ajax({
            async: false,
            url: 'json/getCarryObj.json',
            datatype: 'json',
            success: function(json) {
                jsonCarry = json;
            }
        });
        console.debug(jsonCarry);

        return jsonCarry;
    },
	getLoginStatus: function() {
	
		//var token = getToken();
		var token = '';
		
		try{
			token = getToken();
		}catch(e) {
			console.debug(e);
		}
	
        var jsonLoginStatus;
        $.ajax({
            async: false,
			//Json��ե�
            //url: 'json/loginSuccess.json',
			url: 'auth?action=getLoginInfo&_token='+token+'&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonLoginStatus = json;
            }
        });
        console.debug(jsonLoginStatus);

        return jsonLoginStatus;
    },
	getLoginMsg: function() {
        var jsonLoginMsg;
        $.ajax({
            async: false,
            url: 'json/loginMsg.json',
            datatype: 'json',
            success: function(json) {
                jsonLoginMsg = json;
            }
        });
        console.debug(jsonLoginMsg);

        return jsonLoginMsg;
    },
    getEligibilityStatus: function() {
        var jsonEligibility;
        $.ajax({
            async: false,
            url: 'json/getEligibility.json',
            datatype: 'json',
            success: function(json) {
                jsonEligibility = json;
            }
        });
        console.debug(jsonEligibility);

        return jsonEligibility;
    },
	//���s�ӽ�-��I�sflow��reset�A�i�Japply.jsp
    resetApply: function() {
        $.ajax({
            async: false,
            url: 'flow?action=reset&flowId=apply&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
			
            }
        });
    },
	
	deferment: function(form) {
		var jsondeferment;
        $.ajax({
            async: false,
            url: 'data?action=saveDeferment0&v=' + new Date().getTime(),  
			data : form.serialize(),
            //url: 'json/deferment.json',  
            datatype: 'json',
            success: function(json) {
                jsondeferment = json;
            }
        });

		console.debug(jsondeferment);
        return jsondeferment;
	},
	
    myElectronicPay: function() {
		var jsonPay;
        $.ajax({
            async: false,
            //url: 'json/myElectronicPay_1.json',
			url: 'data?action=myElectronicPay&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonPay = json;
            }
        });

        return jsonPay;
	},
	
    myIbon: function() {
		var jsonIbon;
        $.ajax({
            async: false,
            //url: 'json/myElectronicPay_1.json',     //����n����ú�ڳ檺url!!!!!!!!!!!!!!!!!!!
			url: 'data?action=myElectronicPay&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonIbon = json;
            }
        });

        return jsonIbon;
	},
	getUpdatePopupStatus: function() {
        var jsonStatus;
        $.ajax({
            async: false,
            url: 'data?action=updatePopupEtag&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
                jsonStatus = json;
            }
        });
        console.debug(jsonStatus);

        return jsonStatus;
    },
    resetDefermentSize: function() {
        $.ajax({
            async: false,
            url: 'flow?action=reset&flowId=deferment&v=' + new Date().getTime(),
            datatype: 'json',
            success: function(json) {
			
            }
        });
    },
};