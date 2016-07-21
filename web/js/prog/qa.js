if($('.QAListTab').length != 0) {
	
	modal.getQA(function(json) {
	
		var QAListTabArray = [];
		var QAAreaArray = [];

		$.each(json.qa,function(i,qa){
			var contentArray = [];
			
			$.each(qa.detail,function(j,d){
				contentArray.push('<li class="application"><a href="#"><span class="maicon">Q'+(j+1)+'</span><p>'+d.Question+'</p></a><div class="AnserContent"><span class="qaa"></span><span class="ber">A:</span><div class="Anser">'+d.Answer+'</div></div></li>');
			});
			
			QAListTabArray.push('<li><a href="#" target="topic_'+i+'">'+qa.TopicDesc+'</a><div class="QAArea_s topic_'+i+'"><div class="QAList qaList-1" style="display: block;"><ul>'+contentArray.join('')+'</ul></div></div></li>');
			QAAreaArray.push('<div class="QAList topic_'+i+'"><ul>'+contentArray.join('')+'</ul></div>');
		});
		
		$('.QAListTab').empty().append('<ul>'+QAListTabArray.join('')+'</ul>');
		$('.QAArea').empty().append(QAAreaArray.join(''));
		
		$('.QAListTab > ul > li > a').click(function(ev){
			ev.preventDefault();
			
			var $this = $(this);
			var target = $this.attr('target');

			var isActive = $this.hasClass('active');
			
			$('.QAListTab > ul > li > a').removeClass('active');
			$('.QAArea .QAList').removeClass('active');
			
			$this.addClass('active');
			$('.QAArea .' + target).addClass('active');
			
			if ($(window).width() < 768) {
				$('.QAArea_s').hide();
								
				if(isActive) {
					$this.removeClass('active');
					$('.QAArea_s.' + target).hide();
				}
				else {
					$('.QAArea_s.' + target).show();
				}
		    }
			
			
		});
		
		$('.QAList ul > li a').click(function(ev) {
			ev.preventDefault();
		    $(this).addClass('active');
		    $(this).parent().find('.AnserContent').slideToggle(250);
		    $(this).find('.maicon').toggleClass('active');
			
		});
		
		//如果是大版才要預設展開第一個
		if(!isMobileWidth()) {
			$('.QAListTab > ul > li > a:first').trigger('click');
		}
		else {
			$('.QAListTab > ul > li .QAArea_s').hide();
		}
		
		//2016-07-18 added by titan讓sub1.jsp的其他區塊顯示 
		$('#QA').show();
		$('#compute').show();
		$('#loanBranchs').show();
		$('#download').show();
		
		$('.QandAtab a').click(function(ev) {
			ev.preventDefault();

			if($('.QandAContent').hasClass('open')) {
				$('.QandAContent').animate(
				{
					left:'100%'
				},
					400
				);
			
				$('.QandAContent').removeClass('open');
			}
			else {
				$('.QandAContent').animate(
				{
					left:'0px'
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
		
	});


}