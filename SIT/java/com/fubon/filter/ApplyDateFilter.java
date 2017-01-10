package com.fubon.filter;

import com.fubon.utils.ProjUtils;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.neux.utility.utils.date.DateUtil;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/7/6
 * Time: 下午 2:33
 * To change this template use File | Settings | File Templates.
 */
public class ApplyDateFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

//        System.out.println("=============ApplyDateFilter===============");

        //判斷是否對保期間
        //取得當下學期
        try{
            HashMap<String,String> eduYearInfo = ProjUtils.getEduYearInfo(DaoFactory.getDefaultDao(), null);

            String eduYear = eduYearInfo.get("eduYear");//學年
            String semester = eduYearInfo.get("semester"); //取得第幾學期
            String applySDate = eduYearInfo.get("apply_sDate"); //網路投保開始時間
            String applyEDate = eduYearInfo.get("apply_eDate"); //網路投保開始時間
            String preApplyDate = eduYearInfo.get("preApplyDate"); //提前時間

            String today = DateUtil.getTodayString().substring(0,8);

//            GardenLog.log(GardenLog.DEBUG, "eduYear = " + eduYear);
//            GardenLog.log(GardenLog.DEBUG,"semester = " + semester);
//            GardenLog.log(GardenLog.DEBUG,"applySDate = " + applySDate);
//            GardenLog.log(GardenLog.DEBUG,"applyEDate = " + applyEDate);
//            GardenLog.log(GardenLog.DEBUG,"preApplyDate = " + preApplyDate);
//            GardenLog.log(GardenLog.DEBUG,"today = " + today);

            //若提請開放時間早於起日才蓋過
            if(StringUtils.isNotEmpty(preApplyDate) && StringUtils.isNotEmpty(applySDate) && Long.parseLong(applySDate) >= Long.parseLong(preApplyDate)) {
                applySDate = preApplyDate;
            }

//            GardenLog.log(GardenLog.DEBUG,"applySDate2 = " + applySDate);

            boolean hasPreiod = (Long.parseLong(today) >= Long.parseLong(applySDate) && Long.parseLong(today) <= Long.parseLong(applyEDate));


            if(hasPreiod) {
                filterChain.doFilter(servletRequest,servletResponse);
            }
            else {

                //結束時間的2個月後
                String futureTime = DateUtil.addDate(applyEDate + "000000", Calendar.MONTH,2);

                GardenLog.log(GardenLog.DEBUG,"futureTime = " + futureTime);

                //2016-01-07 added by titan，判斷如果有登入且本學期有申請過案件且是線上續貸，如果時間在兩個月內還可以繼續改
                LoginUserBean loginUserBean = ProjUtils.getLoginBean(request.getSession());
                GardenLog.log(GardenLog.DEBUG,"loginUserBean != null = " + (loginUserBean != null));
                GardenLog.log(GardenLog.DEBUG,"isOver futureTime = " + (Long.parseLong(today) <= Long.parseLong(futureTime)));

                if(loginUserBean != null) {
                    GardenLog.log(GardenLog.DEBUG,"appCases = " + loginUserBean.getCustomizeValue("appCases"));
                    GardenLog.log(GardenLog.DEBUG,"kindOfCases = " + loginUserBean.getCustomizeValue("kindOfCases"));
                }

                if(loginUserBean != null && "Y".equalsIgnoreCase(loginUserBean.getCustomizeValue("appCases")) && "1".equalsIgnoreCase(loginUserBean.getCustomizeValue("kindOfCases")) && Long.parseLong(today) <= Long.parseLong(futureTime)) {
                    filterChain.doFilter(servletRequest,servletResponse);
                }
                else {
                    response.sendRedirect("apply_00.jsp");
                }


            }
        }catch(Exception e) {
            e.printStackTrace();
            response.sendRedirect("apply_00.jsp");
        }
    }

    @Override
    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
