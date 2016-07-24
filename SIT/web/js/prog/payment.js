//繳款方式說明
$('.loanitemArea_1').load('loanitemArea_1.html');
$('.loanitemArea_2').load('loanitemArea_2.html');
$('.loanitemArea_3').load('loanitemArea_3.html');
$('.loanitemArea_4').load('loanitemArea_4.html');
$('.loanitemArea_5').load('loanitemArea_5.html');
$('.loanitemArea_6').load('loanitemArea_6.html');

var quspitem = $('.quspitem');

if ($(window).width() < 768) {
	quspitem.on('click', function(){
		var $this = $(this);
		$this.toggleClass('active');
	});
}