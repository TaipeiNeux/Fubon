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
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/17
 * Time: 下午 11:09
 * To change this template use File | Settings | File Templates.
 */
public class Deferment3_1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();
        

        //拿登入者的手機
        String mobile = loginUserBean.getCustomizeValue("AplyCellPhoneNo");
       // String mobile="";
        
      
            String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
            if(!"sit".equalsIgnoreCase(env)) {
                RQBean rqBean54 = new RQBean();
                rqBean54.setTxId("EB032154");
                rqBean54.addRqParam("CUST_NO",userId);

                RSBean rsBean54 = WebServiceAgent.callWebService(rqBean54);

                if(rsBean54.isSuccess()) {
                    Document doc = DocumentHelper.parseText(rsBean54.getTxnString());

                    String cellPhone = ProjUtils.get032154Col(doc,"8001");

                    //行動電話抓8001
                    if(StringUtils.isNotEmpty(cellPhone)) {
                        mobile = cellPhone;
                    }

                   

                }
            }
        
       
        
        

        //抓1、2的草稿
        String deferment1DraftXML = FlowUtils.getDraftData(userId, "deferment", "deferment1", dao);
        String deferment2DraftXML = FlowUtils.getDraftData(userId,"deferment","deferment2",dao);

        Document draft1Doc = DocumentHelper.parseText(deferment1DraftXML);
        Document draft2Doc = DocumentHelper.parseText(deferment2DraftXML);

        //抓1
        Deferment1 deferment1 = new Deferment1();
        deferment1.getDraftData(content,draft1Doc,queryStringInfo);

        //抓2
        Deferment2 deferment2 = new Deferment2();
        deferment2.getDraftData(content, draft2Doc, queryStringInfo);

        //從2抓是否有學生證
        String radioClicked = "";
        if(draft2Doc.getRootElement().element("RadioClicked") != null) radioClicked = draft2Doc.getRootElement().element("RadioClicked").getText();

//        //取得OTP驗證碼
//        OTPBean otpBean = ProjUtils.createOTP(queryStringInfo.getRequest());
//
//        SMSBean smsBean = new SMSBean();
//        smsBean.setMobile(mobile);
//        smsBean.setTitle(MessageUtils.OTPTitle);
//        smsBean.setContent(MessageUtils.toOTPContent(otpBean.getOtpNumber(), otpBean.getOtpCode()));
//
//        MessageUtils.sendSMS(smsBean);
//        MessageUtils.saveOTPLog(dao,mobile,null,queryStringInfo.getRequest(),otpBean.getOtpNumber(),otpBean.getOtpCode(),smsBean.getContent());


        content.put("mobile",mobile);
//        content.put("code_img",otpBean.getCodeImg());
        content.put("RadioClicked",radioClicked);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
