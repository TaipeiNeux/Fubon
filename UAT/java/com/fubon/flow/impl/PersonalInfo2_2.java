package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.MessageUtils;
import com.fubon.utils.ProjUtils;
import com.fubon.utils.bean.MailBean;
import com.fubon.utils.bean.OTPBean;
import com.fubon.utils.bean.SMSBean;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/30
 * Time: 下午 11:17
 * To change this template use File | Settings | File Templates.
 */
public class PersonalInfo2_2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String mobile = "" , email = "";

        //拿第一步輸入的值
        String personalInfo1XML = FlowUtils.getDraftData(userId, "personalInfo", "personalInfo1", dao);
        Document personalInfo1Doc = DocumentHelper.parseText(personalInfo1XML);

        Element root = personalInfo1Doc.getRootElement();
        if(root.element("cellPhone") != null) mobile = root.element("cellPhone").getText();
        if(root.element("email") != null) email = root.element("email").getText();

        //取得是否已撥款
        String isRecord = ProjUtils.isPayHistory(userId, dao) ? "Y" : "N";

        //取得OTP驗證碼
        OTPBean otpBean = ProjUtils.createOTP(queryStringInfo.getRequest());

        //須判斷會員狀態
        //如果有撥款，發簡訊
        if("Y".equalsIgnoreCase(isRecord)) {

            SMSBean smsBean = new SMSBean();
            smsBean.setMobile(mobile);
            smsBean.setTitle(MessageUtils.OTPTitle);
            smsBean.setContent(MessageUtils.toOTPContent(otpBean.getOtpNumber(), otpBean.getOtpCode()));

            MessageUtils.sendSMS(smsBean);

            MessageUtils.saveOTPLog(dao,mobile,null,queryStringInfo.getRequest(),otpBean.getOtpNumber(),otpBean.getOtpCode(),smsBean.getContent());

        }
        //如果沒撥款，發Email
        else {

            MailBean mailBean = new MailBean("otp");
            mailBean.setTitle(MessageUtils.OTPTitle);
            mailBean.setReceiver(email);
            mailBean.addResultParam("otpNumber",otpBean.getOtpNumber());
            mailBean.addResultParam("otpCode",otpBean.getOtpCode());
            mailBean.addResultParam("otpTime", DateUtil.convert14ToDate("yyyy/MM/dd HH:mm:ss", otpBean.getOtpTime()));
            mailBean.addResultParam("funcName","變更基本資料");

            MessageUtils.sendEmail(mailBean);

            MessageUtils.saveOTPLog(dao,null,email,queryStringInfo.getRequest(),otpBean.getOtpNumber(),otpBean.getOtpCode(),null);
        }

        String code_img = otpBean.getCodeImg();

        content.put("hasAppropriation",isRecord);
        content.put("mobile",mobile);
        content.put("email",email);
        content.put("code_img",code_img);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        ProjUtils.validOTP(queryStringInfo,content);
    }
}
