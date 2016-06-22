package com.fubon.utils.bean;

import com.neux.utility.utils.PropertiesUtil;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/31
 * Time: 下午 3:31
 * To change this template use File | Settings | File Templates.
 */
public class MailBean {
    //接收者
    private String receiver = null;

    //主旨
    private String title = null;

    //特殊提醒文字
    private String memo = null;

    //執行交易結果頁的參數
    private Map<String,String> resultParamMap = new HashMap<String,String>();

    //要載入的交易頁代碼
    private String txnPageId = null;

    private String content = null;

    //要載入的mail文案html
    public MailBean(String htmlName) {
        Properties p = PropertiesUtil.loadPropertiesByClassPath("/config.properties");
        String emailFolder = p.getProperty("emailFolder");

        try{
            content = FileUtils.readFileToString(new File(emailFolder + "/" + htmlName + ".html"),"utf-8");
        }catch(Exception e) {
            e.printStackTrace();
        }
    }

    public String getContent() {
        return content;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public Map<String, String> getResultParamMap() {
        return resultParamMap;
    }

    public void addResultParam(String key , String value) {
        this.resultParamMap.put(key,value);
    }

    public String getTxnPageId() {
        return txnPageId;
    }

    public void setTxnPageId(String txnPageId) {
        this.txnPageId = txnPageId;
    }
}
