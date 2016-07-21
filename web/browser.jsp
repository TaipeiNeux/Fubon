
<%@ page language="java" contentType="text/html; charset=utf-8" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML>
<HEAD>
<META CONTENT="text/html; charset=utf-8" HTTP-EQUIV="Content-Type">
<script src="js/jquery-1.12.1.js?v=<%=System.currentTimeMillis()%>"></script>
<style type="text/css">
<!--
.browsers {
	border: 10px solid #5eb0d9;
	background-color: #09c;
	margin: 0 auto;
	padding: 0;
	width: 660px;}
.hd {
	width: 100%;
	margin: 0 auto;
	font-family: "微軟正黑體";
	font-size: 40px;
	text-align:center;
	line-height: 220%;
	color: #97ddf4;}
.close {width:43px; height:43px; position:relative; top:-17px; left:153px;}
.tt {
	width: 100%;
	padding:25px 25px 15px 25px;
	margin: 5px auto 10px auto;
	font-family: "微軟正黑體";
	font-size: 18px;
	line-height: 220%;
	color: #1471a0; background-color:#97d9f4; border-radius:3px;}
.browser_update {width:21%;}
-->

.browsers {
    position: absolute;
    left: 30%;
    top: 25%;
    width: 600px;
    height: 400px;
}

</style>
<title>台北富邦網路銀行</title>
</HEAD>
<BODY TOPMARGIN="0" LEFTMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0" style="background: black;opacity: 0.8;">
<table border="0" cellspacing="0" cellpadding="0" class="browsers">
  <tbody>
    <tr>
      <td><div class="hd">瀏覽器版本建議 <span class="close"><a href="#" id="close"><img src="images/close.png" width="43" height="43" alt=""/></a></span></div>
        <div class="tt">為提供您最佳的瀏覽體驗，以及保障用戶權益與網路交易安全，本網站不再支援IE 8、Chrome 39、Safari 4、FireFox 29以下版本，請依照您的使用習慣，立即前往以下網站進行瀏覽器更新。
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td class="browser_update"><a href="http://windows.microsoft.com/zh-tw/internet-explorer/download-ie" target="_blank"><img src="images/ie.png" width="100" height="100" alt=""/></a></td>
              <td class="browser_update"><a href="https://www.google.com.tw/chrome/browser/desktop/" target="_blank"><img src="images/Chrome.png" width="100" height="100" alt=""/></a></td>
              <td class="browser_update"><a href="https://support.apple.com/zh_TW/downloads/safari" target="_blank"><img src="images/Safari.png" width="100" height="100" alt=""/></a></td>
              <td class="browser_update"><a href="http://mozilla.com.tw/" target="_blank"><img src="images/Firefox.png" width="100" height="100" alt=""/></a></td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        </div>
        </td>
    </tr>
  </tbody>
</table>

<script>
	$('#close').click(function(ev){
		ev.preventDefault();
		
		try{
			window.close();
		}catch(e) {
			alert(e);
		}
	});
</script>

</BODY>
</HTML>
