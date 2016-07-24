<!--
/**************************************************************************************
getVerticalStr(s, maxLineLen) : �N�r�� s �ন���Ƥ�r�C

�ѼơG
1. s          : ��l�r��
2. maxLineLen : �@��̤j�r�ơA�Y�� null �ȫh��������C
3. alignType  : 'R'�G�ѥk�ܥ��ƦC�F'L'�G�ѥ��ܥk�ƦC�C�w�]�Ȭ� 'R'�C
4. fontStyle  : �׹���r�� CSS Style Class�C

�����G
1. ��l�r�� s ���i�a�J�@�� HTML ���� paired tags (�Ҧp <font> .. </font>)
2. ��h�W�H�C�@�Ӧr���Ӱ����ơA�Y�������r�� (�p���ԧB�Ʀr) ���Q�ܬ����ơA
   �i�H�� <PRE> .. </PRE> �N�Ʀr�]��A�p���K���|�ର���ơC
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
		
		// �w�F�@��̤j�r��
		if (lineCnt >= maxLineLen) {
			// �Y�� endToken �A�H FILO �覡�[�ܥ��椧��
			for (var j = endTokenArray.length - 1; j >= 0; j--) {
				strArray[idx] += endTokenArray[j];
			}
			
			idx++;
			lineCnt = 0;
			strArray[idx] = "";
			
			// �Y tokenArray ���|����ơA��ܬO�e�@�楼������ token �A�N���ܥ���}�l�B�A�ΥH�׹����᪺��r
			for (var j = 0; j < tokenArray.length; j++) {
				strArray[idx] += tokenArray[j];
			}
		}
		
		if (c != '<') {
			// �@��r��
			lineCnt++;
			strArray[idx] += c + ((lineCnt == maxLineLen) ? "" : "<BR>");
			
		} else if ((lastEndToken != null) && (i <= s.length - lastEndToken.length) && (s.substring(i, i + lastEndToken.length) == lastEndToken)) {
			// ������ endToken
			strArray[idx] += lastEndToken;
			i += (lastEndToken.length - 1);
			
			// ���� tokenArray �� endTokenArray �������� token
			tokenArray.splice(tokenArray.length - 1, tokenArray.length);
			endTokenArray.splice(endTokenArray.length - 1, endTokenArray.length);
			
			// ���w�s�� lastEndToken
			lastEndToken = (endTokenArray.length > 0) ? endTokenArray[endTokenArray.length - 1] : null;
			
		} else {
			// ������s�� token
			var sIdx = i++;
			var token = "";
			var endToken = "";
			
			// ���� token ����
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
				// �]�b <PRE>..</PRE> ������r�A�����ন���檺�ʧ@
				lineCnt++;
				
				// �M�� endToken
				while ((i < s.length - endToken.length) && (s.substring(i, i + endToken.length) != endToken)) {
					i++;
				}
				strArray[idx] += s.substring(sIdx + 5, i) + ((lineCnt == maxLineLen) ? "" : "<BR>");
					
				i += (endToken.length - 1);
				
				if (i >= s.length)  break;
				
			} else {
				// �M�� token ����
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
	
	// ���� fontStyle tags
	var fontStyleSTag = ((fontStyle == null) || (fontStyle == "")) ? '' : '<span class="' + fontStyle + '">';
	var fontStyleETag = ((fontStyle == null) || (fontStyle == "")) ? '' : '</span>';
	
	var sepLine = '<td align="center" valign="top">' + fontStyleSTag + '&nbsp;' + fontStyleETag + '</td>';
	
	var retStr = '<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"><tr>';
	if (alignType.toUpperCase() == 'R') {
		// �ѥk�ܥ��ƦC
		for (var i = strArray.length - 1; i >= 0; i--) {
			if (i < strArray.length - 1)  retStr += sepLine;
			retStr += '<td align="center" valign="top">' + fontStyleSTag + strArray[i] + fontStyleETag + '</td>';
		}
	} else {
		// �ѥ��ܥk�ƦC
		for (var i = 0; i < strArray.length; i++) {
			if (i > 0)  retStr += sepLine;
			retStr += '<td align="center" valign="top">' + fontStyleSTag + strArray[i] + fontStyleETag + '</td>';
		}
	}
	retStr += '</tr></table>';
	
	document.writeln(retStr);
}
//-->