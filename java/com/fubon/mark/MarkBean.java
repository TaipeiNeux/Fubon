package com.fubon.mark;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/29
 * Time: 下午 1:37
 * To change this template use File | Settings | File Templates.
 */
public class MarkBean {

    //存每個input name跟明碼、密碼
    private Map<String,String[]> inputMap = new HashMap<String,String[]>();

    public void addCode(String inputName,String original,String after) {
        inputMap.put(inputName,new String[]{original,after});
    }

    public Map<String, String[]> getInputMap() {
        return inputMap;
    }
}
