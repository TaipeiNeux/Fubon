package com.fubon.webservice.bean;

import com.neux.utility.utils.date.DateUtil;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/19
 * Time: 下午 12:17
 * To change this template use File | Settings | File Templates.
 */
public class RQBean {
    private String txId = null;//交易代號

    private String headerPageFlg = null;//變更資料時會需要放到header
    private String headerDBAppn = null;//變更資料時會需要放到header

    private Map<String,String> rqParam = new LinkedHashMap<String, String>(); //送RQ的參數

    public void addRqParam(String key,String value) { this.rqParam.put(key,value); }

    public Map<String, String> getRqParam() {
        return rqParam;
    }

    public String getTxId() {
        return txId;
    }

    public void setTxId(String txId) {
        this.txId = txId;
    }

    public String getHeaderDBAppn() {
        return headerDBAppn;
    }

    public void setHeaderDBAppn(String headerDBAppn) {
        this.headerDBAppn = headerDBAppn;
    }

    public String getHeaderPageFlg() {
        return headerPageFlg;
    }

    public void setHeaderPageFlg(String headerPageFlg) {
        this.headerPageFlg = headerPageFlg;
    }

    public String toRQXML() {

        StringBuffer paramXML = new StringBuffer();
        for(String key : rqParam.keySet()) {
            paramXML.append("<"+key+">"+rqParam.get(key)+"</"+key+">");
        }

        return paramXML.toString();
    }


}
