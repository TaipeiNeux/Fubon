package com.fubon.filter;

import com.fubon.servlet.AuthServlet;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.log.GardenLog;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/7/15
 * Time: 下午 1:55
 * To change this template use File | Settings | File Templates.
 */
public class TokenFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        //取得是否有token
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String queryString = request.getQueryString();

//        GardenLog.log(GardenLog.DEBUG,"=======into TokenFilter=======");

        //當有傳入token時，代表頁面在第一次載入，若使用者已登入就要判斷這個token跟session內是否一致
        //如果是已登入狀態，拿token出來比對
        LoginUserBean loginUserBean = (LoginUserBean) request.getSession().getAttribute("loginUserBean");
        if(loginUserBean != null && StringUtils.isNotEmpty(queryString) && queryString.contains("_token")) {
            String nowToken = request.getParameter("_token");
            String sessionToken = loginUserBean.getCustomizeValue("_token");

//            GardenLog.log(GardenLog.DEBUG,"token nowToken = " + nowToken);
//            GardenLog.log(GardenLog.DEBUG,"token sessionToken = " + sessionToken);

            //當兩者都有值且token不同時，把目前的session踢掉
            if(StringUtils.isNotEmpty(sessionToken) && StringUtils.isNotEmpty(nowToken) && !sessionToken.equalsIgnoreCase(nowToken)) {
                AuthServlet.removeLoginInfoToApplication(loginUserBean.getUserId());
                request.getSession().removeAttribute("loginUserBean");
            }
        }

        filterChain.doFilter(servletRequest,servletResponse);

    }

    @Override
    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
