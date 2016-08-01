package com.fubon.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 下午 7:25
 * To change this template use File | Settings | File Templates.
 */
public class NextNumber {
    protected static final String SQL_GET_SEQ_VALUE = "SELECT NEXT VALUE FOR ApplyNo";

    public static String getSerialNo(String preWord, int maxLen) throws Exception  {
        String sn = null;
        NextNumber nextNum = getNextNumObj();
        long milliTimes = (System.currentTimeMillis() / 1000) * 1000;
        milliTimes += nextNum.getNext(3);
        sn = base10To36(String.valueOf(milliTimes));
        if (sn.length() > maxLen) {
            sn = sn.substring(sn.length() - maxLen);
        } else {
            while (sn.length() < maxLen) {
                sn = "0" + sn;
            }
        }
        sn = preWord + sn;
//        System.out.println( " AplyIdno : " + sn.toString() );
        return sn;
    }
    private static NextNumber getNextNumObj() throws Exception {
        NextNumber nextNum = new NextNumber();
        return nextNum;
    }

    public long getNext(long maxLength) throws Exception {
        return getNext( 0, Math.round(Math.pow(10, maxLength)) - 1, 1);
    }
    /**
     * 取得流水號
     * 參數：
     * tableName : 流水號相關表格
     * lb        : 流水號開始號碼
     * ub        : 流水號結束號碼
     * inc       : 流水號遞增數值
     *
     * EX : NextNumber.getNext("A", 1000, 5000, 2)
     * ==> 產生之流水號依序為 1000, 1002, 1004, ..... 5000，然後再重新從 1000 開始計數
     */
    public long getNext(long lb, long ub, int inc) throws Exception {

        return Long.parseLong(DBUtils.getSequenceNextVal(SQL_GET_SEQ_VALUE));
    }
    private static String base10To36(String base10Num) throws Exception {
        String base36Num = "";
        String mapNum = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        long num = Long.parseLong(base10Num);

        while (num >= 36) {
            int remainder = 0;
            remainder = Integer.parseInt(Long.toString(num % 36));
            base36Num = mapNum.charAt(remainder) + base36Num;
            num = num / 36;
        }
        base36Num = mapNum.charAt((int)num) + base36Num;

        return base36Num;
    }

}