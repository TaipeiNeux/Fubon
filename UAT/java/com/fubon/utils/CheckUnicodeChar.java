package com.fubon.utils;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/7/21
 * Time: 下午 6:57
 * To change this template use File | Settings | File Templates.
 */
public class CheckUnicodeChar {

    @SuppressWarnings("rawtypes")
    private final ArrayList errList = new ArrayList();     // 存放錯誤欄位變數名稱清單
    @SuppressWarnings("rawtypes")
    private final HashMap errData = new HashMap();         // 存放錯誤欄位內容清單

    private String replaceChar = "　";              // 替換字元
    private String lineBreak = "\n";                 // 換行字元

    /**
     * CheckUnicodeChar 建構子註解。
     */
    public CheckUnicodeChar() {
        super();
    }
    @SuppressWarnings({ "unchecked", "rawtypes" })
    public String check(String s, String name, String desc) throws Exception {

        if ((s == null) || (s.equals(""))) {
            return s;
        }

        if ((name == null) || (name.trim().equals(""))) {
            System.err.println("CheckUnicodeChar.check():fail. s = [" + s + "], name = [" + name + "], desc = [" + desc + "]");
            throw new Exception("檢核非標準 Big5 字元錯誤，欄位名稱不可為空值！");
        }

        StringBuffer sb = new StringBuffer();
        StringBuffer err = new StringBuffer();

        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i);

            // 因為 Unicode Char 至少要為 &#n; ，也就是 & 之後至少還要有三位字元才行
            // 其中 n 需為 0 - 65535 之間的數字
            if ((c1 == '&') && ((i + 3) < s.length())) {

                char c2 = s.charAt(i + 1);
                int endIdx = s.indexOf(';', i + 3);

                if ((c2 == '#') && (endIdx >= 0)) {
                    try {
                        int unicodeInt = Integer.parseInt(s.substring(i + 2, endIdx));
                        if ((unicodeInt >= 0) && (unicodeInt <= 65535)) {
                            sb.append(replaceChar);
                            err.append(" [&#").append(s.substring(i + 2, endIdx)).append(";] ");
                            i = endIdx;
                            continue;
                        }
                    } catch (Exception e) {
                        System.out.println("[&#" + s.substring(i + 2, endIdx) + ";] is not a valid unicode char!");
                    }
                }
            }

            sb.append(c1);
            err.append(c1);
        }

        if (!s.equals(err.toString())) {
            errList.add(name);

            HashMap hm = new HashMap();
            //hm.put("oriStr", s);
            hm.put("desStr", sb.toString());
            hm.put("errStr", err.toString());
            hm.put("desc", desc);

            errData.put(name, hm);
        }

        // 回傳處理過後的字串
        return sb.toString();
    }
    /**
     * 檢查並將非標準 Big5 字元替換成 replaceChar
     */
    public String convert(String s) {

        if ((s == null) || (s.equals(""))) {
            return s;
        }

        StringBuffer sb = new StringBuffer();

        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i);

            // 因為 Unicode Char 至少要為 &#n; ，也就是 & 之後至少還要有三位字元才行
            // 其中 n 需為 0 - 65535 之間的數字
            if ((c1 == '&') && ((i + 3) < s.length())) {

                char c2 = s.charAt(i + 1);
                int endIdx = s.indexOf(';', i + 3);

                if ((c2 == '#') && (endIdx >= 0)) {
                    try {
                        int unicodeInt = Integer.parseInt(s.substring(i + 2, endIdx));
                        if ((unicodeInt >= 0) && (unicodeInt <= 65535)) {
                            sb.append(replaceChar);
                            i = endIdx;
                            continue;
                        }
                    } catch (Exception e) {
                        System.out.println("[&#" + s.substring(i + 2, endIdx) + ";] is not a valid unicode char!");
                    }
                }
            }

            sb.append(c1);
        }

        // 回傳處理過後的字串
        return sb.toString();
    }

    @SuppressWarnings("rawtypes")
    public String getErrorMsg() {

        StringBuffer errMsg = new StringBuffer();

        if (errList.size() > 0) {
            errMsg.append("以下欄位輸入內容發現系統無法處理字元：")
                    .append(lineBreak)
                    .append(lineBreak);

            for (int i = 0; i < errList.size(); i++) {
                HashMap hm = (HashMap) errData.get(errList.get(i));
                String desc = (String) hm.get("desc");

                if ((desc != null) && (!desc.trim().equals(""))) {
                    errMsg.append(desc).append("：");
                }

                errMsg.append(hm.get("errStr"))
                        .append(" 將替換成 ")
                        .append(hm.get("desStr"))
                        .append(lineBreak);
            }

            errMsg.append(lineBreak)
                    .append("如為輸入錯誤，請回上頁重新輸入！");
        }

        return errMsg.toString();
    }
    public static void main(String[] args) {
        try {
            CheckUnicodeChar obj = new CheckUnicodeChar();

//            System.out.println(obj.convert("&#29319"));
            System.out.println(obj.check("王&#29319;明", "studentName", "學生姓名"));
//            System.out.println(obj.getErrorMsg());

        } catch (Exception e) {

        }
    }
    public void setLineBreak(String s) {
        lineBreak = s;
    }
    public void setReplaceChar(String s) {
        replaceChar = s;
    }
}
