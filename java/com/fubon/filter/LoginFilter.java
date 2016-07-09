package com.fubon.filter;

import com.fubon.listener.SessionLoginBean;
import com.fubon.servlet.AuthServlet;
import com.fubon.utils.ProjUtils;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.log.GardenLog;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/6/25
 * Time: 下午 5:22
 * To change this template use File | Settings | File Templates.
 */
public class LoginFilter implements Filter {

    private Set<String> needLoginSet = new HashSet<String>();

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        String needLoginPage = filterConfig.getInitParameter("needLoginPage");
        if(StringUtils.isNotEmpty(needLoginPage)) {
            String[] datas = needLoginPage.split(",");

            for(String data : datas) {
                needLoginSet.add(data);
            }
        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String uri = request.getRequestURI();

        System.out.println("uri = " + uri);
        String page = uri.substring(uri.lastIndexOf("/")+1);

        System.out.println("page = " + page);

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(request.getSession());
        if(loginUserBean == null) {

            if(needLoginSet.contains(page)) {

                System.out.println("into needLoginSet");

                //紀錄要去哪一頁
                GardenLog.log(GardenLog.DEBUG,"set loginSuccessPage = " + page);
                request.getSession().setAttribute("loginSuccessPage",page);

//                GardenLog.log(GardenLog.DEBUG,"page = " + request.getSession().getAttribute("loginSuccessPage"));

                response.sendRedirect("memberLogin.jsp");
            }
            else {
                filterChain.doFilter(servletRequest,servletResponse);
            }
        }
        else {

            //判斷是否有重覆登入
            String userId = loginUserBean.getUserId();
            GardenLog.log(GardenLog.DEBUG,"userId = " + userId);

            SessionLoginBean sessionLoginBean = AuthServlet.sessionMap.get(userId);
            String sessionId = sessionLoginBean.getSessionId();

            GardenLog.log(GardenLog.DEBUG,"current = " + request.getSession().getId());
            GardenLog.log(GardenLog.DEBUG,"sessionId = " + sessionId);

            //如果驗證的sessionid跟目前的不同，則踢除
            if(!request.getSession().getId().equals(sessionId)) {
                GardenLog.log(GardenLog.DEBUG,"not match....kick!!");
                request.getSession().removeAttribute("loginUserBean");

                if(needLoginSet.contains(page)) {

                    System.out.println("page = " + page);

                    //紀錄要去哪一頁
                    GardenLog.log(GardenLog.DEBUG,"set loginSuccessPage = " + page);
                    request.getSession().setAttribute("loginSuccessPage",page);

//                GardenLog.log(GardenLog.DEBUG,"page = " + request.getSession().getAttribute("loginSuccessPage"));

                    response.sendRedirect("memberLogin.jsp");
                }
                else {
                    filterChain.doFilter(servletRequest,servletResponse);
                }
            }
            else {
                filterChain.doFilter(servletRequest,servletResponse);
            }



        }


    }

    @Override
    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
