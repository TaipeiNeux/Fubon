$('.save').click(function(ev){
	ev.preventDefault();
	
});


$('.print').click(function(ev){
	ev.preventDefault();
	
	var mywindow = window.open('myElectronicPay_print.jsp', 'Print', 'height=842,width=770');
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