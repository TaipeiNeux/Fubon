
// 檢查某個字串的每個字元是否都是英數文字
// 如： isValidChar('rrr') 會回傳 true
// 如果提供第二個參數，則會被視為檢核的範圍
// 如： isValidChar('rrr', 'abc') 會回傳 false
function isValidChar(){

        var test = isValidChar.arguments[0];

        var range = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

        if (isValidChar.arguments.length == 2) {

                range = isValidChar.arguments[1];

        }

 

        for(var i = 0; i < test.length; i++){

                if(range.indexOf(test.charAt(i)) < 0) {

                        return false;

                }

        }

        return true;
}

//檢查字串是否為英數字混雜
function isNumericAlphabetMix(src) {

    var s = src.toUpperCase();

    var numericCount  = 0;

    var alphabetCount = 0;


    for (var i = 0; i < s.length; i++) {

            var c = s.charAt(i);

            if (c >= '0' && c <= '9') numericCount++;

            if (c >= 'A' && c <= 'Z') alphabetCount++;

    }


    if (numericCount == 0 || alphabetCount == 0) {

            return false;
    }


    return true;

}

//檢查字串是否為相同數字或字元
function isSameChar(src){

    if (src.length > 0) {

        var c = src.charAt(0);

        for (var i = 1; i < src.length; i++) {

            if (c != src.charAt(i))  return false;

        }

        return true;

    }

    return false;

}

//檢查字串是否為連續數字或字元
function isContinuousChar(src, maxLen){

    var numericTestString1       = getTestString("1234567890"                , maxLen);  // 數字升鼏測試字串

    var numericTestString2       = getTestString("0987654321"                , maxLen);  // 數字降鼏測試字串

    var lowerAlphabetTestString1 = getTestString("abcdefghijklmnopqrstuvwxyz", maxLen);  // 小寫字元升鼏測試字串

    var lowerAlphabetTestString2 = getTestString("zyxwvutsrqponmlkjihgfedcba", maxLen);  // 小寫字元降鼏測試字串

    var upperAlphabetTestString1 = getTestString("ABCDEFGHIJKLMNOPQRSTUVWXYZ", maxLen);  // 大寫字元升鼏測試字串

    var upperAlphabetTestString2 = getTestString("ZYXWVUTSRQPONMLKJIHGFEDCBA", maxLen);  // 大寫字元降鼏測試字串

    function getTestString(s, maxLen) {

        var retS = "";

        var sLen = s.length;

        while (retS.length < (maxLen + s.length)) {

                retS += s;

        }

        return retS;

    }


    var indexOfNumericSubString1 = numericTestString1.indexOf(src);               // 檢核是否為數字升鼏子字串

    if (indexOfNumericSubString1 >= 0) return true;



    var indexOfNumericSubString2 = numericTestString2.indexOf(src);               // 檢核是否為數字降鼏子字串

    if (indexOfNumericSubString2 >= 0) return true;



    var indexOfLowerAlphabetSubString1 = lowerAlphabetTestString1.indexOf(src);   // 檢核是否為小寫字元升鼏子字串

    if (indexOfLowerAlphabetSubString1 >= 0) return true;



    var indexOfLowerAlphabetSubString2 = lowerAlphabetTestString2.indexOf(src);   // 檢核是否為小寫字元降鼏子字串

    if (indexOfLowerAlphabetSubString2 >= 0) return true;



    var indexOfUpperAlphabetSubString1 = upperAlphabetTestString1.indexOf(src);   // 檢核是否為大寫字元升鼏子字串

    if (indexOfUpperAlphabetSubString1 >= 0) return true;



    var indexOfUpperAlphabetSubString2 = upperAlphabetTestString2.indexOf(src);   // 檢核是否為大寫字元降鼏子字串

    if (indexOfUpperAlphabetSubString2 >= 0) return true;


    return false;

}

function isSubstr(src, targetArr){
    var errMsg = '';

    $.each(targetArr, function(i, targetObj){

        if((targetObj.val != null) && (targetObj.val.indexOf(src) >= 0)) {

                if(errMsg != '') errMsg += '、';

                errMsg = targetObj.text;

        }
    });

    if( errMsg != '' ){
        return '不可為「'+errMsg+'」的子字串';
    }
    return errMsg;
}
