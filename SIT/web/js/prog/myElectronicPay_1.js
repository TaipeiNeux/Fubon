$('.save').click(function(ev){
	ev.preventDefault();
	
});


$('.print').click(function(ev){
	ev.preventDefault();

	var mywindow = window.open('myElectronicPay_print.jsp', 'Print', 'height=842,width=820');
	//mywindow.document.write('<html><head><title></title>');
	
        /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
	//mywindow.document.write('</head><body >');
    //mywindow.document.write(printDiv.html());
   // mywindow.document.write('</body></html>');

	//mywindow.document.close(); // necessary for IE >= 10
	
    mywindow.focus(); // necessary for IE >= 10

    mywindow.print();
    //mywindow.close();
	
});

$('#printMobileBarCode').click(function(ev){
	ev.preventDefault();
	
	var target = $('.pomodal.cheetah');
	target.empty();
	$('div.barCode').empty();
	$('p.casomTitle').empty();
	$('ol.casom').empty();
	
	var barcodeBlock = $('#mobile_barcode_block');
	barcodeBlock.appendTo(target);
	barcodeBlock.show();
	$('body').scrollTop(0);
});