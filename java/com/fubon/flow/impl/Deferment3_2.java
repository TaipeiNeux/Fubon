package com.fubon.flow.impl;

import com.fubon.utils.MessageUtils;
import com.fubon.utils.bean.SMSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.ProjUtils;
import com.fubon.utils.bean.OTPBean;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/17
 * Time: 下午 11:09
 * To change this template use File | Settings | File Templates.
 */
public class Deferment3_2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N";
        String mobile = loginUserBean.getCustomizeValue("AplyCellPhoneNo");

        //取得OTP驗證碼
        OTPBean otpBean = ProjUtils.createOTP(queryStringInfo.getRequest());

        SMSBean smsBean = new SMSBean();
        smsBean.setMobile(mobile);
        smsBean.setTitle(MessageUtils.OTPTitle);
        smsBean.setContent(MessageUtils.toOTPContent(otpBean.getOtpNumber(), otpBean.getOtpCode()));

        MessageUtils.sendSMS(smsBean);
        MessageUtils.saveOTPLog(dao,mobile,null,queryStringInfo.getRequest(),otpBean.getOtpNumber(),otpBean.getOtpCode(),smsBean.getContent());

        content.put("isRecord",isRecord);
        content.put("mobile",mobile);
        content.put("code_img",otpBean.getCodeImg());

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
