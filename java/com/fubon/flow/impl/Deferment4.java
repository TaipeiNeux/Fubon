package com.fubon.flow.impl;

import com.fubon.utils.MessageUtils;
import com.fubon.utils.bean.MailBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.QueryConfig;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/17
 * Time: 下午 11:09
 * To change this template use File | Settings | File Templates.
 */
public class Deferment4 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N";
        String id = loginUserBean.getCustomizeValue("IdNo");
        String email = loginUserBean.getCustomizeValue("AplyEmail");

        String result = "success";
        String forecastDate = null;


        //從第1步取Eligibility跟3-1的date
        String draftXML = FlowUtils.getDraftData(userId, "deferment", "deferment1", dao);
        String draftXML3_1 = FlowUtils.getDraftData(userId, "deferment", "deferment3_1", dao);

        Document step1Doc = DocumentHelper.parseText(draftXML);
        Document step1Doc3_1 = DocumentHelper.parseText(draftXML3_1);

        Element step1Root = step1Doc.getRootElement();
        Element step1Root3_1 = step1Doc3_1.getRootElement();

        String eligibilityText = step1Root.element("eligibilityText") != null ? step1Root.element("eligibilityText").getText() : "";
        String ReasonDate = step1Root.element("ReasonDate") != null ? step1Root.element("ReasonDate").getText() : "";
        String date = step1Root3_1.element("date") != null ? step1Root3_1.element("date").getText() : "";

        String errorCode = "" , errorMsg = "";

        String year = "", month = "", day = "";
        try{

            if(step1Root.element("selectYear") != null && step1Root.element("selectMonth") != null && step1Root.element("selectDay") != null) {
                year = step1Root.element("selectYear").getText();
                month = step1Root.element("selectMonth").getText();
                day = step1Root.element("selectDay").getText();

                String yearYYYY = Integer.parseInt(year) + 1911 + "";
                month = StringUtils.leftPad(month,2,"0");
                day = StringUtils.leftPad(day,2,"0");


                forecastDate = yearYYYY + month + day + "000000";

                forecastDate = DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",forecastDate);
            }

            //新增
            DataObject Deferment_Flow = DaoFactory.getDefaultDataObject("Deferment_Flow");
            Deferment_Flow.setValue("AplyIdNo",userId);
            Deferment_Flow.setValue("IP", JSPUtils.getClientIP(queryStringInfo.getRequest()));
            Deferment_Flow.setValue("Eligibility",eligibilityText);
            Deferment_Flow.setValue("ForecastDate", forecastDate);
            Deferment_Flow.setValue("CreateTime",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));

            dao.insert(Deferment_Flow);

            //更新文件
            SQLCommand update = new SQLCommand("update Deferment_Doc set FlowLogId = ? where AplyIdNo = ? and (FlowLogId is null or FlowLogId = 0)");
            update.addParamValue(Deferment_Flow.getValue("LogId"));
            update.addParamValue(userId);
            dao.queryByCommand(null,update,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);

            result = "success";
        }catch(Exception e) {
            e.printStackTrace();

            result = "fail";
            errorCode = "99";
            errorMsg = "系統發生錯誤["+e.getMessage()+"]";
        }

        //寄發Email
        String msg = result.equals("success") ? "成功" : "失敗";
        String mailTitle = MessageUtils.defermentTitle;
        mailTitle = StringUtils.replace(mailTitle, "{result}", msg);

        MailBean mailBean = new MailBean("deferment");
        mailBean.setReceiver(email);
        mailBean.setTitle(mailTitle);
        mailBean.addResultParam("result",(result.equals("success") ? "您已成功送出申請資料!" : "申請失敗("+errorCode+")"+errorMsg));
        mailBean.addResultParam("imgSrc",result.equals("success") ? "{host}/img/na-14.png" : "{host}/img/deny.png");
        mailBean.addResultParam("eligibilityText",eligibilityText);
        mailBean.addResultParam("ReasonDate","民國" + year + "年" + month + "月" + day + "日");

        MessageUtils.sendEmail(mailBean);

        content.put("isRecord",isRecord);
        content.put("id",id);
        content.put("ReasonDate",ReasonDate);
        content.put("date",date);
        content.put("eligibilityText",eligibilityText);

        //清除草稿資料
        FlowUtils.resetDraftData(userId,"deferment",dao);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        String codeInput = queryStringInfo.getParam("codeInput");

        //從session取得OTP驗證碼
        String otpCode = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute(ProjUtils.OTPCode));

        if(!codeInput.equalsIgnoreCase(otpCode)) {
            throw new Exception("驗證碼輸入錯誤！");
        }
    }
}
