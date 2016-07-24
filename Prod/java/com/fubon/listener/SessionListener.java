package com.fubon.listener;

import com.neux.garden.authorization.LoginUserBean;
import com.fubon.servlet.AuthServlet;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/6/10
 * Time: 下午 3:19
 * To change this template use File | Settings | File Templates.
 */
public class SessionListener implements HttpSessionListener {
    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {

    }

    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {

        //當session destroy時，若有登入的話，要把身份證字號從application清空
        HttpSession session = httpSessionEvent.getSession();
        LoginUserBean loginUserBean = (LoginUserBean) session.getAttribute("loginUserBean");

        if(loginUserBean != null) {
            String id = loginUserBean.getUserId();

            AuthServlet.removeLoginInfoToApplication(id);
        }
    }
}