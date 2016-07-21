/*$(document).ready(function() {
	$('a.register"]').click(function(ev){
		ev.preventDefault();
		
		modal.setGuest(function(){
			location = 'register.jsp';
		});
	});
});*/

var QR1 = $('#QR1');    //註冊的右上角三角形
var QR1Img = QR1.find('img');      //註冊的右上角三角形的圖形
var hi1 = $('#hi1');     //註冊的文字區塊
var circleBtn = $('#circleBtn');     //註冊的三顆圈圈按鈕
var registerBtn = $('#registerBtn');     //註冊按鈕
var registerQR = $('#registerQR');     //註冊的QR code

var QR2 = $('#QR2');    //登入的右上角三角形
var QR2Img = QR2.find('img');      //登入的右上角三角形的圖形
var hi2 = $('#hi2');     //登入的文字區塊
var loginInput = $('#loginInput');     //登入的三顆圈圈按鈕
var loginBtn = $('#loginBtn');     //登入按鈕
var loginQR = $('#loginQR');     //登入的QR code

//(註冊)按下右上角三角形圖形,就會出現/消失QR code
//QR1.on('click', function(){
//    if(QR1.attr('class') == 'qrCodeRegister'){
//        hi1.hide();
//        circleBtn.hide();
//        registerBtn.hide();
//        registerQR.show();
//        QR1Img.attr('src','img/ytt.png');
//        QR1.removeClass('qrCodeRegister').addClass('labelRegister');
//        
//    }
//    else if(QR1.attr('class') == 'labelRegister'){
//        hi1.show();
//        circleBtn.show();
//        registerBtn.show();
//        registerQR.hide();
//        QR1Img.attr('src','img/yw.png');
//        QR1.removeClass('labelRegister').addClass('qrCodeRegister');
//    }
//    
//});
//
////(登入)按下右上角三角形圖形,就會出現/消失QR code
//QR2.on('click', function(){
//    if(QR2.attr('class') == 'qrCodeLogin'){
//        hi2.hide();
//        loginInput.hide();
//        loginBtn.hide();
//        loginQR.show();
//        QR2Img.attr('src','img/yt.png');
//        QR2.removeClass('qrCodeLogin').addClass('labelLogin');
//        
//    }
//    else if(QR2.attr('class') == 'labelLogin'){
//        hi2.show();
//        loginInput.show();
//        loginBtn.show();
//        loginQR.hide();
//        QR2Img.attr('src','img/yw.png');
//        QR2.removeClass('labelLogin').addClass('qrCodeLogin');
//    }
//    
//});

//首頁：登入綁身份證轉大寫
$('[name="studentId"],[name="studentCode"],[name="studentPassword"]').on('blur', function(ev) {
    ev.preventDefault();

    $(this).val($(this).val().toUpperCase());
});

//限制輸入的長度
$('[name="studentId"],[name="studentCode"]').attr('maxLength','10');
$('[name="studentPassword"]').attr('maxLength','16');

