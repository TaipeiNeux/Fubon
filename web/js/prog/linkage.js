var linkage = {
    changeZipByCity: function(citySelect, cityArr, zipSelect,bindBranch) {
        if(citySelect == undefined){
            return false;
        }
        else{
            citySelect.on('change', function() {
            //console.debug(citySelect+'/'+cityArr+'/'+zipSelect);
            var cityId = $(this).val();
            var jsonZip = modal.getZip(cityId,bindBranch);
            //console.debug(jsonZip);

			if(jsonZip.zipcodes.length != 0){
			
	            zipArr = jsonZip.zipcodes;
	            var zipArray = [];
				zipArray.push('<option value="">選擇鄉鎮市區</option>');
	            $.each(zipArr, function(i, zipData) {
	                zipArray.push('<option value=' + zipData.zipcode + '>' + zipData.areaName + '</option>');
	            });

	            zipSelect.empty();
	            zipSelect.append(zipArray.join(''));
	            zipSelect.selectpicker('refresh');
			
			}
            else{
                var zipArray = [];
				zipArray.push('<option value="">選擇鄉鎮市區</option>');
                zipSelect.empty();
                zipSelect.append(zipArray.join(''));
	            zipSelect.selectpicker('refresh');
            }
        });
        }
        
    },
    changeDomicileZipByCity: function(domicileCitySelect, cityArr, domicileZipSelect) {
        if(domicileCitySelect == undefined){
            return false;
        }
        else{
            domicileCitySelect.on('change', function() {
	            var cityId = $(this).val();
	            var jsonZip = modal.getZip(cityId);
	            //console.debug(jsonZip);

				var zipArray = [];
				zipArray.push('<option value="">選擇鄉鎮市區</option>');
				
				$.each(jsonZip.zipcodes, function(i, zipData) {
					zipArray.push('<option value=' + zipData.zipcode + '>' + zipData.areaName + '</option>');
				});
				
				domicileZipSelect.empty();
		        domicileZipSelect.append(zipArray.join(''));
		        domicileZipSelect.selectpicker('refresh');
			});
        }
        
    },
    changeLinerByZip: function(zipSelect, zipArr, linerSelect) {
        if(zipSelect == undefined){
            return false;
        }
        else{
            zipSelect.on('change', function() {
			var zipId = $(this).val();
            var jsonLiner = modal.getLiner(zipId);
            //console.debug(jsonLiner);
			//console.debug(jsonLiner.liners.length);
			
			if(jsonLiner.liners.length != 0){
				var linerArr = jsonLiner.liners;
				var linerArray = [];
				linerArray.push('<option value="">選擇村/里</option>');
				$.each(linerArr, function(i, linerData) {
					linerArray.push('<option value=' + linerData.linerId + '>' + linerData.linerName + '</option>');
				});

				linerSelect.empty();
				linerSelect.append(linerArray.join(''));
				linerSelect.selectpicker('refresh');
			}
			else{
                var linerArray = [];
				linerArray.push('<option value="">選擇村/里</option>');
                linerSelect.empty();
                linerSelect.append(linerArray.join(''));
				linerSelect.selectpicker('refresh');
            }
        });
        }
        
    },
	changeBranchZipByCity: function(citySelect, cityArr, zipSelect, bindBranch) {
        if(citySelect == undefined){
            return false;
        }
        else{
            citySelect.on('change', function() {
	            var cityId = $(this).val();
	            var jsonZip = modal.getZip(cityId,bindBranch);
	            //console.debug(jsonZip);

				var zipArray = [];
				zipArray.push('<option value="">請選擇</option>');
				
				$.each(jsonZip.zipcodes, function(i, zipData) {
					zipArray.push('<option value=' + zipData.zipcode + '>' + zipData.areaName + '</option>');
				});
				
				zipSelect.empty();
		        zipSelect.append(zipArray.join(''));
		        zipSelect.selectpicker('refresh');
			});
        }
        
    },
    changeDomicileLinerByZip: function(domicileZipSelect, zipArr, domicileLinerSelect) {
        if(domicileZipSelect == undefined){
            return false;
        }
        else{
           domicileZipSelect.on('change', function() {
	            var zipId = $(this).val();
	            var jsonLiner = modal.getLiner(zipId);
	            console.debug(jsonLiner);

				var linerArray = [];
				linerArray.push('<option value="">選擇村/里</option>');
		        $.each(jsonLiner.liners, function(i, linerData) {   
	                    
					linerArray.push('<option value=' + linerData.linerId + '>' + linerData.linerName + '</option>');
		        });
				domicileLinerSelect.empty();
		        domicileLinerSelect.append(linerArray.join(''));
		        domicileLinerSelect.selectpicker('refresh');
			}); 
        }
        
    },
    
    //連動公/私立by教育階段
    /*changeNational: function(educationStageSelect, educationStageArr, isNationalSelect) {
        educationStageSelect.on('change', function() {
            educationStageId = $(this).val();
            var jsonNational = modal.getIsNational(educationStageId);
            console.debug(jsonNational);

            var jsonNationalArr = jsonNational.schooltype1;
            var nationalArray = [];
            console.debug(jsonNationalArr);
            $.each(jsonNationalArr, function(i, nationalData) {
                nationalArray.push('<option value=' + nationalData.type + '>' + nationalData.typeName + '</option>');
            });
        
            isNationalSelect.empty();
            isNationalSelect.append(nationalArray.join(''));
            isNationalSelect.selectpicker('refresh');

        });
    },*/
    
    //連動日/夜間by公/私立
    /*changeIsDay: function(isNationalSelect, isDaySelect) {
        isNationalSelect.on('change', function() {
            var isNationalId = $('[name="student_isNational"]').val();
            var jsonDay = modal.getIsDay(isNationalId);

            var jsonDayArr = jsonDay.schooltype2;
            
            console.debug(jsonDayArr);
            var dayArray = [];
            console.debug(jsonDayArr);
            $.each(jsonDayArr, function(i, dayData) {
                dayArray.push('<option value=' + dayData.type + '>' + dayData.typeName + '</option>');
            });
        
            isDaySelect.empty();
            isDaySelect.append(dayArray.join(''));
            isDaySelect.selectpicker('refresh');

        });
    },*/
    
    //連動學校名稱 by 教育階段 & 公/私立 & 日/夜間
    changeSchoolName: function(nameSelect) {
        console.debug(nameSelect.length);
        //isDaySelect.on('change', function() {
            var educationId = $('[name="student_educationStage"]').val();
            var isNationalId = $('[name="student_isNational"]').val();
            var dayNightId = $('[name="student_isDay"]').val();
            //alert(isNationalId +'/'+ dayNightId +'/'+ educationId);
            var jsonName = modal.getSchoolName(isNationalId, dayNightId, educationId);
            console.debug(jsonName);
            var jsonNameArr = jsonName.school;
            
            console.debug(jsonNameArr);
            var nameArray = [];
            nameArray.push('<option value="">請選擇學校</option>');
            $.each(jsonNameArr, function(i, nameData) {
                nameArray.push('<option value=' + nameData.schoolId + '>' + nameData.schoolName + '</option>');
            });
        
            nameSelect.empty();
            nameSelect.append(nameArray.join(''));
            nameSelect.selectpicker('refresh');
        //});
    }
};