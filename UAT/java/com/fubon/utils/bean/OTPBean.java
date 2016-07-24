package com.fubon.utils.bean;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/31
 * Time: 下午 3:27
 * To change this template use File | Settings | File Templates.
 */
public class OTPBean {
    private String codeImg = null;
    private String otpNumber = null;
    private String otpCode = null;

    private String otpTime = null;

    public String getCodeImg() {
        return codeImg;
    }

    public void setCodeImg(String codeImg) {
        this.codeImg = codeImg;
    }

    public String getOtpNumber() {
        return otpNumber;
    }

    public void setOtpNumber(String otpNumber) {
        this.otpNumber = otpNumber;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public String getOtpTime() {
        return otpTime;
    }

    public void setOtpTime(String otpTime) {
        this.otpTime = otpTime;
    }
}
