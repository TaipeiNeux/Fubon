<!--
/**************************************************************************************
getVerticalStr(s, maxLineLen) : 將字串 s 轉成直排文字。

參數：
1. s          : 原始字串
2. maxLineLen : 一行最大字數，若為 null 值則不做換行。
3. alignType  : 'R'：由右至左排列；'L'：由左至右排列。預設值為 'R'。
4. fontStyle  : 修飾文字的 CSS Style Class。

說明：
1. 原始字串 s 中可帶入一般 HTML 中的 paired tags (例如 <font> .. </font>)
2. 原則上以每一個字元來做直排，若有部分字元 (如阿拉伯數字) 不想變為直排，
   可以用 <PRE> .. </PRE> 將數字包住，如此便不會轉為直排。
**************************************************************************************/
function getVerticalStr(s, maxLineLen, alignType, fontStyle) {
	
	if (s == null	) s = "";
	if ((maxLineLen == null) || (maxLineLen == ""))  maxLineLen = s.length;
	if (alignType == null) alignType = 'R';
	
	var strArray = new Array();
	strArray[0] = "";
	
	var idx = -1;
	var lineCnt = maxLineLen;
	var tokenArray = new Array();
	var endTokenArray = new Array();
	var lastEndToken = null;
	
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		
		// 已達一行最大字數
		if (lineCnt >= maxLineLen) {
			// 若有 endToken ，以 FILO 方式加至本行之後
			for (var j = endTokenArray.length - 1; j >= 0; j--) {
				strArray[idx] += endTokenArray[j];
			}
			
			idx++;
			lineCnt = 0;
			strArray[idx] = "";
			
			// 若 tokenArray 中尚有資料，表示是前一行未結束的 token ，將其放至本行開始處，用以修飾之後的文字
			for (var j = 0; j < tokenArray.length; j++) {
				strArray[idx] += tokenArray[j];
			}
		}
		
		if (c != '<') {
			// 一般字元
			lineCnt++;
			strArray[idx] += c + ((lineCnt == maxLineLen) ? "" : "<BR>");
			
		} else if ((lastEndToken != null) && (i <= s.length - lastEndToken.length) && (s.substring(i, i + lastEndToken.length) == lastEndToken)) {
			// 偵測到 endToken
			strArray[idx] += lastEndToken;
			i += (lastEndToken.length - 1);
			
			// 移除 tokenArray 及 endTokenArray 中相關的 token
			tokenArray.splice(tokenArray.length - 1, tokenArray.length);
			endTokenArray.splice(endTokenArray.length - 1, endTokenArray.length);
			
			// 指定新的 lastEndToken
			lastEndToken = (endTokenArray.length > 0) ? endTokenArray[endTokenArray.length - 1] : null;
			
		} else {
			// 偵測到新的 token
			var sIdx = i++;
			var token = "";
			var endToken = "";
			
			// 偵測 token 結尾
			while ((i < s.length) && ((c != ' ') && (c != '>'))) {
				c = s.charAt(i++);
			}
			
			if (i == s.length) {
				strArray[idx] += s.substring(sIdx);
				break;
			}
			
			token = s.substring(sIdx + 1, i - 1);
			endToken = "</" + token + ">";
			
			if (token.toUpperCase() == "PRE") {
				// 包在 <PRE>..</PRE> 中的文字，不做轉成直行的動作
				lineCnt++;
				
				// 尋找 endToken
				while ((i < s.length - endToken.length) && (s.substring(i, i + endToken.length) != endToken)) {
					i++;
				}
				strArray[idx] += s.substring(sIdx + 5, i) + ((lineCnt == maxLineLen) ? "" : "<BR>");
					
				i += (endToken.length - 1);
				
				if (i >= s.length)  break;
				
			} else {
				// 尋找 token 結尾
				while ((i < s.length) && (c != '>')) {
					c = s.charAt(i++);
				}
					
				strArray[idx] += s.substring(sIdx, i);
					
				if (i == s.length) {
					break;
				} else {
					i--;
					tokenArray[tokenArray.length] = s.substring(sIdx, i);
					endTokenArray[endTokenArray.length] = endToken;
					lastEndToken = endToken;
				}
			}
		}
	}
	
	// 產生 fontStyle tags
	var fontStyleSTag = ((fontStyle == null) || (fontStyle == "")) ? '' : '<span class="' + fontStyle + '">';
	var fontStyleETag = ((fontStyle == null) || (fontStyle == "")) ? '' : '</span>';
	
	var sepLine = '<td align="center" valign="top">' + fontStyleSTag + '&nbsp;' + fontStyleETag + '</td>';
	
	var retStr = '<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"><tr>';
	if (alignType.toUpperCase() == 'R') {
		// 由右至左排列
		for (var i = strArray.length - 1; i >= 0; i--) {
			if (i < strArray.length - 1)  retStr += sepLine;
			retStr += '<td align="center" valign="top">' + fontStyleSTag + strArray[i] + fontStyleETag + '</td>';
		}
	} else {
		// 由左至右排列
		for (var i = 0; i < strArray.length; i++) {
			if (i > 0)  retStr += sepLine;
			retStr += '<td align="center" valign="top">' + fontStyleSTag + strArray[i] + fontStyleETag + '</td>';
		}
	}
	retStr += '</tr></table>';
	
	document.writeln(retStr);
}
//-->