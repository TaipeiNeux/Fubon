package com.fubon.webservice.bean;

import org.fubon.operationimpl.listenerservices.soap.listener.SOAPEMFListenerStub;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/19
 * Time: 下午 7:33
 * To change this template use File | Settings | File Templates.
 */
public class RSBean {
    private boolean isSuccess = false;
    private String errorCode = null;
    private String errorMsg = null;
    private String txnString = null;

    private SOAPEMFListenerStub.ServiceHeader_type0 serviceHeader = null;

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public String getTxnString() {
        return txnString;
    }

    public void setTxnString(String txnString) {
        this.txnString = txnString;
    }

    public SOAPEMFListenerStub.ServiceHeader_type0 getServiceHeader() {
        return serviceHeader;
    }

    public void setServiceHeader(SOAPEMFListenerStub.ServiceHeader_type0 serviceHeader) {
        this.serviceHeader = serviceHeader;
    }
}
