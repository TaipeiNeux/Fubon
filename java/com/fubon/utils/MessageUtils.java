package com.fubon.utils;

import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.utils.bean.MailBean;
import com.fubon.utils.bean.SMSBean;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPMailInfo;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import javax.servlet.http.HttpServletRequest;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 下午 3:19
 * To change this template use File | Settings | File Templates.
 */
public class MessageUtils {

    //標題
    public final static String OTPTitle = "台北富邦銀行就學貸款服務專區交易驗證碼發送通知";
    public final static String registerTitle = "台北富邦銀行就學貸款服務專區註冊會員「{result}｣通知";
    public final static String forgetTitle = "台北富邦銀行就學貸款服務專區重設代碼/密碼交易「{result}｣通知";
    public final static String resetPwdTitle = "台北富邦銀行就學貸款服務專區重設代碼/密碼交易「{result}｣通知";
    public final static String defermentTitle = "台北富邦銀行就學貸款服務專區延後/提前還款交易「{result}｣通知";
    public final static String loginFailTitle = "台北富邦銀行就學貸款服務專區立即登入交易「失敗｣通知";

    //內文
    public final static String SMSOTPContent = "台北富邦銀行就學貸款服務專區交易代碼{otpNumber}，交易驗證碼「{otpCode}」，如有疑問請洽本行客服專線，謝謝。";

    public static String toOTPContent(String otpNumber,String otpCode) {
        String content = SMSOTPContent;
        content = StringUtils.replace(content,"{otpNumber}",otpNumber);
        content = StringUtils.replace(content,"{otpCode}",otpCode);

        return content;
    }

    public static void sendEmail(MailBean mailBean) throws Exception {

        Properties p = PropertiesUtil.loadPropertiesByClassPath("/config.properties");

        String content = mailBean.getContent();

        if(StringUtils.isEmpty(mailBean.getMemo())) {
            mailBean.setMemo("");
        }


        for(String key : mailBean.getResultParamMap().keySet()) {
            content = StringUtils.replace(content,"{"+key+"}",mailBean.getResultParamMap().get(key));
        }

        content = StringUtils.replace(content,"{date}",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));
        content = StringUtils.replace(content,"{memo}",mailBean.getMemo());
        content = StringUtils.replace(content,"{host}",p.getProperty("host"));


        String emailFrom = p.getProperty("emailFrom");//ebr@fbt.com
        String emailHost = p.getProperty("emailHost");//10.204.241.226
        String emailProtocol = p.getProperty("emailProtocol"); //smtp
        String emailPort = p.getProperty("emailPort");//25
        String emailSendName = p.getProperty("emailSendName");//富邦_學貸
        String emailUserName = p.getProperty("emailUserName");//ebr@fbt.com
        String emailUserPwd = p.getProperty("emailUserPwd");//

        JSPMailInfo mailInfo = new JSPMailInfo();
        mailInfo.setEncoding("utf-8");
        mailInfo.setTitle(mailBean.getTitle());
        mailInfo.setContent(content);
        mailInfo.setFrom(emailFrom);
        mailInfo.setToMailString(mailBean.getReceiver());
        mailInfo.setHost(emailHost);
        mailInfo.setProtocol(emailProtocol);
        mailInfo.setPort(Integer.parseInt(emailPort));
        mailInfo.setSendName(emailSendName);
        mailInfo.setUserName(emailUserName);
        mailInfo.setUserPwd(emailUserPwd);

        GardenLog.log(GardenLog.DEBUG,"==sendEmail==");
        GardenLog.log(GardenLog.DEBUG,"title = " + mailInfo.getTitle());
        GardenLog.log(GardenLog.DEBUG,"content = " + mailInfo.getContent());
        GardenLog.log(GardenLog.DEBUG,"from = " + mailInfo.getFrom());
        GardenLog.log(GardenLog.DEBUG,"toMail = " + mailInfo.getToMailString());
        GardenLog.log(GardenLog.DEBUG,"host = " + mailInfo.getHost());
        GardenLog.log(GardenLog.DEBUG,"portocol = " + mailInfo.getProtocol());
        GardenLog.log(GardenLog.DEBUG,"port = " + mailInfo.getPort());
        GardenLog.log(GardenLog.DEBUG,"sendName = " + mailInfo.getSendName());
        GardenLog.log(GardenLog.DEBUG,"username = " + mailInfo.getUserName());
        GardenLog.log(GardenLog.DEBUG,"userpwd = " + mailInfo.getUserPwd());

        int error = JSPUtils.setAndSendMail(mailInfo);

        DataObject mailLog = DaoFactory.getDefaultDataObject("Mail_Log");
        mailLog.setValue("Email",mailInfo.getToMailString());
        mailLog.setValue("Title",mailInfo.getTitle());
        mailLog.setValue("Content",mailInfo.getContent());
        mailLog.setValue("CreateTime",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));
        DaoFactory.getDefaultDao().insert(mailLog);

        GardenLog.log(GardenLog.DEBUG,"error = " + error);
    }

    public static void saveOTPLog(IDao dao,String mobile,String email,HttpServletRequest request,String validNum,String otpCode,String smsContent) throws Exception {
        //把驗證碼跟手機存到DB的log
        try{
            DataObject otpLog = DaoFactory.getDefaultDataObject("OTP_Log");
            otpLog.setValue("Mobile",mobile);
            otpLog.setValue("Email",email);
            otpLog.setValue("IP",JSPUtils.getClientIP(request));
            otpLog.setValue("OTPNumber",validNum);
            otpLog.setValue("OTPCode",otpCode);
            otpLog.setValue("SmsContent",smsContent);
            otpLog.setValue("CreateTime", DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss", DateUtil.getTodayString()));
            dao.insert(otpLog);


        }catch(Exception e) {
            e.printStackTrace();
        }
    }

    public static void sendSMS(SMSBean smsBean) throws Exception {
        //因為只有Prod才會真的發簡訊，所以判斷參數如果是Prod才走電文發SMS，否則是自己產生六碼驗證碼
        String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");

        if("Prod".equalsIgnoreCase(env)) {
            RQBean rqBean = new RQBean();
            rqBean.setTxId("MWMG");
            rqBean.addRqParam("BusClass","SL");
            rqBean.addRqParam("BusType","F1");
            rqBean.addRqParam("DstAddr",smsBean.getMobile());
            rqBean.addRqParam("DestName",smsBean.getTitle());
            rqBean.addRqParam("SmBody",smsBean.getContent());

            RSBean rsBean = WebServiceAgent.callWebService(rqBean);
            if(rsBean.isSuccess()) {
                //OTP回應正常的電文

                String txnString = rsBean.getTxnString();
                Document doc = DocumentHelper.parseText(txnString);
                Element root = doc.getRootElement();

                GardenLog.log(GardenLog.DEBUG,"RtnCode = " + root.element("RtnCode").getText());
                GardenLog.log(GardenLog.DEBUG,"RtnMsg = " + root.element("RtnMsg").getText());
            }
        }
    }

}
