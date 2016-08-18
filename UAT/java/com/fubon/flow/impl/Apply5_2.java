package com.fubon.flow.impl;

import com.fubon.utils.MessageUtils;
import com.fubon.utils.bean.SMSBean;
import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.fubon.utils.bean.OTPBean;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 上午 10:16
 * To change this template use File | Settings | File Templates.
 */
public class Apply5_2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        //取得第1-1的手機號碼
        String mobile = "";
        String draftXML = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
        if (draftXML != null){
            Document step1Doc = DocumentHelper.parseText(draftXML);
            Element step1Root = step1Doc.getRootElement();
            mobile = step1Root.element("cellPhone").getText();
        } else {
            mobile = loginUserBean.getCustomizeValue("AplyCellPhoneNo");
        }


        //2016-08-04 added by titan 因為行動電話要改成一律問390，不然舊戶的電話改了後就收不到後續的OTP
        String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
        if(!"sit".equalsIgnoreCase(env)) {
            RQBean rqBean54 = new RQBean();
            rqBean54.setTxId("EB032154");
            rqBean54.addRqParam("CUST_NO",userId);

            RSBean rsBean54 = WebServiceAgent.callWebService(rqBean54);

            if(rsBean54.isSuccess()) {
                Document doc = DocumentHelper.parseText(rsBean54.getTxnString());

                mobile = ProjUtils.get032154Col(doc,"8001");

            }
        }


        //取得OTP驗證碼
        OTPBean otpBean = ProjUtils.createOTP(queryStringInfo.getRequest());

        SMSBean smsBean = new SMSBean();
        smsBean.setMobile(mobile);
        smsBean.setTitle(MessageUtils.OTPTitle);
        smsBean.setContent(MessageUtils.toOTPContent(otpBean.getOtpNumber(), otpBean.getOtpCode()));

        MessageUtils.sendSMS(smsBean);

        MessageUtils.saveOTPLog(dao,mobile,null,queryStringInfo.getRequest(),otpBean.getOtpNumber(),otpBean.getOtpCode(),smsBean.getContent());

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
