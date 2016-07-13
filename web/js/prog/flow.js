
function defaultErrorHandler(json,closeCallback) {
	GardenUtils.display.popup({
		title: '',
		content: '<p>'+json.Header.errorMsg+'</p>',
		closeCallBackFn: function() {
			if(closeCallback != undefined) {
				closeCallback.apply(window,[]);
			}		
		},
		isShowSubmit: false
	});
}

function g_ajax(config) {

//    var config = {
//        url : 'xxx.json',
//        data : {
//            username : 'abc'
//        },
//        callback : function () {}
//    };

	
	/*2016-06-15 added by titan*/
	
	if($('.ajax-loader').length == 0) {
		$('<div class="ajax-loader" style="display: none;"><div class="b-loading"><span class="m-icon-stack"><i class="m-icon m-icon-fubon-blue is-absolute"></i><i class="m-icon m-icon-fubon-green"></i></span></div></div>').prependTo($('body'));
	}
	
	
	//顯示Ajax轉轉圖，另外讓主頁面hide	
	$('.ajax-loader').show();
	

	config = $.extend({
		async : false,
	},config);

	console.debug(config.errorHandler);
	
	if(config.errorHandler == undefined) {
		config.errorHandler = defaultErrorHandler
	}
	
	console.debug(config);
	
	//因為要讓ajax-loader出現，故停100ms
	setTimeout(function(){
		$.ajax({
	        url : config.url,
	        data : config.data,
	        datatype : 'json',
			async : config.async,
	        type : 'post',
	        success : function(json) {

	            console.debug(json);

				if(json.Header == undefined) {
					config.callback.apply(window,[json]);
				}
				else {
					if(json.Header.errorCode == '0') {
		                config.callback.apply(window,[json.Content]);
		            }
		            else if(json.Header.errorCode == '9999') {
		                window.location = 'index.jsp';
		            }
		            else {
					
						config.errorHandler.apply(window,[json]);
						
						/*
						GardenUtils.display.popup({
				            title: '',
				            content: '<p>'+json.Header.errorMsg+'</p>',
				            closeCallBackFn: function() {},
				            isShowSubmit: false
				        });
					*/
		                //alert(json.Header.errorCode + '\n' + json.Header.errorMsg);
		            }
				}
				
	            
				
				$('.ajax-loader').hide();
				$('div.processArea').show();
	        },
	        error : function() {
	            //alert('系統出現異常!!');
				GardenUtils.display.popup({
			        title: '',
			        content: '<p>系統出現異常!!</p>',
			        closeCallBackFn: function() {},
			        isShowSubmit: false
			    });
				
				$('.ajax-loader').hide();
	        }
	    });
	
	},300);
	
    
}

function buildFlow(Content,stepEventHandler,nextEventHanlder,nextEventErrorHanlder,getInputEventHandler) {

    //長body的class
    $('body').attr('class','').addClass(Content.flow.bodyClass).addClass(Content.flow.flowId);

    //長流程步驟/底下按鈕/綁按鈕事件
    buildMainFlow(Content.flow);

    //畫出步驟UI
    $.ajax({
        url : Content.flow.viewURL,
        datatype : 'html',
        success : function(html) {

            $('div.processInner').empty().html(html);

            //2016-05-25 added by titan for move memo
            var earth = $('div.processInner').find('div.earth');
            var appendParentDiv = $('div.nextBtn').parent();
            if(appendParentDiv.find('.earth').length != 0) appendParentDiv.find('.earth').remove();
            earth.appendTo($('div.nextBtn').parent());

            //呼叫這個步驟的事件
            var stepId = Content.flow.currentSubStep;
            if(stepId == '') stepId = Content.flow.currentMainStep;

            //$('.selectpicker').selectpicker();

            console.debug('stepId = ' + stepId);
            var fn = stepEventHandler[stepId];

            if(fn != undefined) {
                try{
                    fn.apply(window,[Content]);
                }catch(e) {
                    console.debug(e);
                }
            }

            //綁流程的事件(儲存/上一步/下一步事件)
            var nextBtn = $('div.nextBtn');

            //取得該頁Form物件
            var form = $('div.processOutBox form');

            nextBtn.find('.info').off('click').on('click',function(ev){
                ev.preventDefault();
                console.debug('into info');

                GardenUtils.display.popup({
                    title : '提醒您',
                    content : '<p>您可點選「儲存」按鈕暫存申請資料，儲存後的申請資料，將為您保留最長60個日曆日，當您下次登入時，可接續填寫申請。</p>',
                    closeCallBackFn : function(){},
                    isShowSubmit : false
                });
            });

            nextBtn.find('.saveTemp').off('click').on('click',function(ev){
                ev.preventDefault();
                console.debug('into saveTemp');

                //因為草稿過程中可能會有disabled，當disabled的時候form.serialize不會串接，所以要先偷放到hidden
                form.find(':disabled').each(function(){
                    var column = $(this);
                    var colName = column.attr('name');
                    var value = column.val();

                    //當有name跟value時就放hidden
                    if(colName != '' && value != '') {
                        form.find('input[type="hidden"][name="'+colName+'"]').remove();
                        form.prepend('<input type="hidden" name="'+colName+'" value="'+value+'"/>');
                    }
                });

                g_ajax({
                    url : 'flow?action=saveTemp&flowId=' + Content.flow.flowId + '&step=' + stepId,
                    data : form.serialize(),
                    type : 'post',
                    callback : function(content) {
                        alert('儲存成功');
                    }
                });
            });

            var prev = nextBtn.find('.prev');
            if(!prev.hasClass('noBindingPreEvent')) {
                prev.off('click').on('click',function(ev){
                    ev.preventDefault();

                    var $this = $(this);
                    var isBack = false;
                    
                    //如果是簡訊驗證步驟, 要clearTimeout倒數的function(countdownid()) by Foi 2016/07/12
                    var currentObj = [{
                        jsp: 'personalInfo',
                        step: '_2_2.jsp'
                    },{
                        jsp: 'changePwd',
                        step: '2_2.jsp'
                    },{
                        jsp: 'forgetPassword',
                        step: '3_2.jsp'
                    }];
                    var currentViewURL = '';
                    var jumpViewURL = '';
                    
                    $.each(currentObj, function(index, value){
                        currentViewURL = 'flow/' + value.jsp + value.step;
                        if(Content.flow.viewURL == currentViewURL ){
                            //window.location = jumpViewURL;
                            clearTimeout(countdownid);
                        }
                    });
                    
					
					//只有我要申請才要跳confirm
                    if($this.hasClass('confirm') && Content.flow.flowId == 'apply') {
                        //如果是"我要申請"第5_2步驟(簡訊驗證), 要clearTimeout倒數的function(countdownid()) by Foi 2016/07/12
                        if(Content.flow.viewURL == "flow/apply5_1_2.jsp"){   
                            //window.location = 'apply.jsp?step=apply_document_5_1';
                            clearTimeout(countdownid);
                        }
                        isBack = confirm('是否確認「取消」本交易? 提醒您，當您確認「取消」本交易後，本行將不保留您本次所填寫的資料；若您僅是要修改部分資料，請點選頁面上的「修改」按鈕，即可更新資料。');
                    }
                    else {
                        isBack = true;
                    }

                    if(isBack) {
                        if(Content.flow.viewURL == "flow/apply5_1_1.jsp" || Content.flow.viewURL == "flow/apply5_2.jsp"){   
                            modal.resetApply();
                            window.location = 'apply.jsp?step=apply1_1';
                        }
                        
						//move top
						$('body').scrollTop(0);
					
                        g_ajax({
                            url : 'flow?action=prev&flowId=' + Content.flow.flowId + '&step=' + stepId,
                            data : {},
                            callback : function(content) {

                                //開始長流程畫面
                                buildFlow(content, stepEventHandler, nextEventHanlder,nextEventErrorHanlder,getInputEventHandler);
                            }
                        });
                    }

                });
            }


            nextBtn.find('.next').off('click').on('click',function(ev){
                ev.preventDefault();
                console.debug('into next');

                var isValid = true;
                
                console.debug(stepId);

				console.debug(nextEventErrorHanlder);
                var fn = nextEventHanlder[stepId];
				var ajaxErrorFn = nextEventErrorHanlder != undefined ? nextEventErrorHanlder[stepId] : undefined;
				console.debug(ajaxErrorFn);
				
                if(fn != undefined) {
                    isValid = fn.apply(window,[]);
                }

                if(isValid) {

                    //因為草稿過程中可能會有disabled，當disabled的時候form.serialize不會串接，所以要先偷放到hidden
                    form.find(':disabled').each(function(){
                        var column = $(this);
                        var colName = column.attr('name');
                        var value = column.val();

                        //當有name跟value時就放hidden
                        if(colName != '' && value != '') {
                            form.find('input[type="hidden"][name="'+colName+'"]').remove();
                            //form.prepend('<input type="hidden" name="'+colName+'" value="'+value+'"/>');
							$('.processInner').prepend('<input type="hidden" name="'+colName+'" value="'+value+'"/>');
                        }
                    });

					//move top
					$('body').scrollTop(0);
					
                    g_ajax({
                        url : 'flow?action=next&flowId=' + Content.flow.flowId + '&step=' + stepId,
                        data : form.serialize(),
						errorHandler : ajaxErrorFn,
                        callback : function(content) {
                            //開始長流程畫面
                            buildFlow(content, stepEventHandler, nextEventHanlder,nextEventErrorHanlder,getInputEventHandler);
                        }
                    });
                }
            });
						
			//2016-07-08 added by titan 綁全站input的事件(預設帶入input都去掉空白)
			var getInputEvent = getInputEventHandler != undefined ? getInputEventHandler[stepId] : undefined;
			
			var stepInputObj = {};
			if(getInputEvent != undefined) {
				stepInputObj = getInputEvent.apply(window,[]);
			}
			
			var inputs = [];
			$('input[name]').each(function(){
				var $this = $(this);
				var name = $this.attr('name');
				var trimSpace = true;
				var convertFullWidth = false;
				var focusClearVal = false;
				
				console.debug(stepInputObj);
				
				if (stepInputObj.hasOwnProperty(name)) {
			       var stepObj = stepInputObj[name];
				   
				   if(stepObj['convertFullWidth']) {
						convertFullWidth = true;
				   }
				   
				   if(stepObj['focusClearVal']) {
						focusClearVal = true;
				   }
				}

				inputs.push({
					inputName : name,
					trimSpace : trimSpace,
					convertFullWidth : convertFullWidth,
					focusClearVal : focusClearVal
				});
			});
			
			console.debug(inputs);
			
			GardenUtils.format.inputFocusBlurEventHandler({
				inputs : inputs
			});
        }

    });

}

function buildMainFlow(flow) {

    console.debug(flow);

    //長上方跟左邊的步驟bar
    var mainStepSpace = $('div.processTab > .processBox');
    var subStepSpace = $('div.processArea .stepArea');


    mainStepSpace.empty();
    subStepSpace.empty();

    var mainArray = [];
    var subArray = [];

    var currentMainStep = flow.currentMainStep;
    var currentSubStep = flow.currentSubStep;



    $.each(flow.mainStep,function(i,step){
        var isActive = currentMainStep == step.id ? 'active' : '';
        mainArray.push('<li class="'+isActive+'"><a href="#"><p>'+step.name+'</p></a></li>');
    });

	//2016-06-08 added by titan for mobile remove word
	
	var isMobile = isMobileWidth();
    $.each(flow.subStep,function(i,step){
        var isActive = currentSubStep == step.id ? 'active' : '';
		
		var stepName = !isMobile ? ('STEP' + (i+1)) : '';
		
        subArray.push('<li class="'+isActive+' subStep'+(i+1)+'">'+stepName+'<p>'+step.name+'</p></li>');
    });

    mainStepSpace.append('<ul>'+mainArray.join('')+'</ul>');
    subStepSpace.append('<ul>'+subArray.join('')+'</ul>');

    //再判斷當下狀態，長底下的上一步/下一步按鈕
    var nextBtn = $('div.nextBtn');
    nextBtn.empty();

    //取得最後一步，如果當下id是最後一步，就不用長按鈕了
    var lastStep = flow.mainStep[flow.mainStep.length-1].id;

    //getFirst Step
    var isFirstStep = flow.isFirstStep == 'Y';
    console.debug('isFirstStep = ' + isFirstStep);

    if(currentMainStep != lastStep) {

        //放上一步下一步的字
        var prev = '上一步';
        var next = '下一步';

        if(flow.preBtnText != '') {
            prev = flow.preBtnText;
        }

        if(flow.nextBtnText != '') {
            next = flow.nextBtnText;
        }

        //取得是否為確認頁
        var isConfirm = flow.isConfirm;
		var preClass = 'gray';
		var nextClass = 'blu';

        if(isConfirm == 'Y') {
            prev = '取消';
            next = '確認';
			
			preClass = 'cancel';
			nextClass = 'submit';
        }

        //取得是否需要草稿
        var canDraft = flow.canDraft;

        //取得是否需要綁上一步事件
        var noBindingPreEvent = flow.noBindingPreEvent;

		
        //取得主流程的第一步，判斷當下id是不是第一步，若是的話才長上一步按鈕
        nextBtn.append(((canDraft == 'Y' && isConfirm != 'Y') ? '<a href="#" class="green saveTemp">儲存</a><a href="#" class="info"></a>' : '') + '<a href="#" class="'+nextClass+' next">'+next+'</a>' + (!isFirstStep ? '<a href="#" class="'+preClass+' prev '+(isConfirm == 'Y' ? 'confirm' : '')+' '+(noBindingPreEvent == 'Y' ? 'noBindingPreEvent' : '')+'">'+prev+'</a>' : ''));
    }

    /** --start  忠毅 tab_arrow   **/
    $('.processTab').css('margin','0px');
    if( ($('.tab_arrow').length == 0) &&  $('.processTab').find('.active').length>0 ){
        
        /**  外面包一層跟tab一樣寬度的div  **/
        //2016-05-20 modify by titan use background-image
        $('.processTab').after('<div  style="margin:auto; width:73%;"> <div class="tab_arrow" style="position:relative; top:3; z-index:50;width: 100px; height: 40px; background-image: url(img/house-1.png); background-repeat:no-repeat "></div></div>');
    }
    

    $('.processTab').find('li').each(function(index){


        if($(this).hasClass('active')) {

            var width_tab = $(this).width();

            /**  置中一點  **/
            var first_tab = width_tab/2-10;

            /**  看是第幾個active, 就加上多少個tab長度  **/
            first_tab += index*width_tab;

            $('.tab_arrow').css('left',first_tab);
 
        }

    });

    /** --end  忠毅 tab_arrow   **/

}