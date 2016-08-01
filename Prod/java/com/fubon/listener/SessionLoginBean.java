package com.fubon.listener;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/6/10
 * Time: 下午 3:25
 * To change this template use File | Settings | File Templates.
 */
public class SessionLoginBean {
    private String id = null;
    private String sessionId = null;
    private String loginTime = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(String loginTime) {
        this.loginTime = loginTime;
    }
}
