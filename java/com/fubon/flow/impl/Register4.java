package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.MessageUtils;
import com.fubon.utils.ProjUtils;
import com.fubon.utils.bean.MailBean;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Vector;


/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/19
 * Time: 上午 2:33
 * To change this template use File | Settings | File Templates.
 */
public class Register4 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        HttpServletRequest request = queryStringInfo.getRequest();
        HttpSession session = request.getSession();

        String today = DateUtil.getTodayString();
        today = DateUtil.convert14ToDate("yyyy/MM/dd HH:mm:ss",today);

        String errorCode = "" , errorMsg = "";
        String registerResult = "fail", registerDate = today.substring(0,10), registerTime = today.substring(11);


        IDao dao = DaoFactory.getDefaultDao();

        //取得第一步的草稿資料
        String draftXML1 = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("register_register1"));
        String memberTermsNo = "";
        String obligationsNo = "";

        if(StringUtils.isNotEmpty(draftXML1)) {
            Document step1Doc = DocumentHelper.parseText(draftXML1);
            Element step1Root = step1Doc.getRootElement();

            memberTermsNo = step1Root.element("memberTermsNo").getText();
            obligationsNo = step1Root.element("obligationsNo").getText();
        }

        //取得第二步的草稿資料
        String draftXML = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("register_register2"));
        Document step2Doc = DocumentHelper.parseText(draftXML);
        Element step2Root = step2Doc.getRootElement();

        String email = step2Root.element("email").getText();

        String id = "";
        String userId = "";
        try{

            id = step2Root.element("id").getText();
            userId = step2Root.element("userAccount").getText();
            String userPwd = step2Root.element("userPwd").getText();

            String s = id + "-" + userPwd;
            String md5Password = DigestUtils.md5Hex(s.toUpperCase());

            //寫入StudentProfile
            DataObject studentUserProfile = DaoFactory.getDefaultDataObject("Student_UserProfile");

            if(step2Root.element("id") != null) studentUserProfile.setValue("IdNo",id);
            if(step2Root.element("userAccount") != null) studentUserProfile.setValue("UserId",userId);
            if(step2Root.element("userPwd") != null) studentUserProfile.setValue("Password",md5Password);

            studentUserProfile.setValue("UserIdAlert","UserIdAlert");
            studentUserProfile.setValue("PwdAlert","PwdAlert");
            studentUserProfile.setValue("IP", JSPUtils.getClientIP(request));
            studentUserProfile.setValue("SessionId",session.getId());
            studentUserProfile.setValue("FailTimes","0");
            studentUserProfile.setValue("FirstSignOn","");
            studentUserProfile.setValue("LastSignOn","");
            studentUserProfile.setValue("LastFail","");
            studentUserProfile.setValue("TotalSignOn","0");
            studentUserProfile.setValue("SignOnFlag","");
            studentUserProfile.setValue("GID","");
            studentUserProfile.setValue("Contract","");
            studentUserProfile.setValue("LoginFailCount","0");

            //再寫入StudentProfileDetail
            DataObject studentUserProfileDetail = DaoFactory.getDefaultDataObject("Student_UserProfileDetail");

            studentUserProfileDetail.setValue("Applicant",step2Root.element("name").getText());

            String birthdayCY = step2Root.element("birthday_y").getText();
            String birthdayMonth = step2Root.element("birthday_m").getText();
            String birthdayDay = step2Root.element("birthday_d").getText();

            String birthdayYYYY = ProjUtils.toDraftBirthday(birthdayCY,birthdayMonth,birthdayDay);
            if(StringUtils.isNotEmpty(birthdayYYYY)) {
                birthdayYYYY = (Integer.parseInt(birthdayYYYY.substring(0,3)) + 1911) + birthdayYYYY.substring(3,5) + birthdayYYYY.substring(5,7);
            }

            if(step2Root.element("birthday_y") != null) studentUserProfileDetail.setValue("AplyBirthday",birthdayYYYY);
            if(step2Root.element("cellPhone") != null) studentUserProfileDetail.setValue("AplyCellPhoneNo",step2Root.element("cellPhone").getText());
            if(step2Root.element("email") != null) studentUserProfileDetail.setValue("AplyEmail",email);

            studentUserProfileDetail.setValue("ModifyTime", today);
            studentUserProfileDetail.setValue("IP",studentUserProfile.getValue("IP"));
            studentUserProfileDetail.setValue("AplyIdNo",studentUserProfile.getValue("IdNo"));

            //2016-07-13 added by titan 加入同意條款版號
            studentUserProfileDetail.setValue("MemberTermsNo",memberTermsNo);
            studentUserProfileDetail.setValue("ObligationsNo",obligationsNo);

            //檢核該用戶是否存在
            if(!checkExist(dao,id)) {
                dao.insert(studentUserProfile);
                dao.insert(studentUserProfileDetail);

                registerResult = "success";
            }
            else {
                //要編ErrorCode
                errorCode = "10";
                errorMsg = "該身分證字號已為本服務專區會員，請您於首頁直接登入。若您已忘記使用者代碼或密碼，可點選[首頁>忘記代碼/密碼]功能進行重設。";
            }



        }catch(Exception e) {
            e.printStackTrace();

            errorCode = "99";
            errorMsg = "系統發生錯誤["+e.getMessage()+"]";
        }

        //寄發Email
        String msg = registerResult.equals("success") ? "成功" : "失敗";
        String mailTitle = MessageUtils.registerTitle;
        mailTitle = StringUtils.replace(mailTitle,"{result}",msg);

        MailBean mailBean = new MailBean("register");
        mailBean.setReceiver(email);
        mailBean.setTitle(mailTitle);
        mailBean.addResultParam("result",(registerResult.equals("success") ? "<img src=\"{host}/img/na-14.png\">申請成功" : "<img src=\"{host}/img/na-16.png\">申請失敗("+errorCode+")"+errorMsg));

        MessageUtils.sendEmail(mailBean);

        content.put("registerResult",registerResult);
        content.put("errorCode",errorCode);
        content.put("errorMsg",errorMsg);
        content.put("registerDate",registerDate);
        content.put("registerTime",registerTime);

        String logResult = StringUtils.isEmpty(errorMsg) ? "註冊會員成功" : errorMsg;

        String ip = JSPUtils.getClientIP(queryStringInfo.getRequest());
        String sessionId = queryStringInfo.getRequest().getSession().getId();


        ProjUtils.saveLog(dao,ip,id,userId,getClass().getName(),"getDraftData",logResult,sessionId);
    }

    private boolean checkExist(IDao dao,String id) throws Exception {
        SQLCommand check1 = new SQLCommand("select IdNo from Student_UserProfile where IdNo = ?");
        SQLCommand check2 = new SQLCommand("select AplyIdNo from Student_UserProfileDetail where AplyIdNo = ?");

        check1.addParamValue(id);
        check2.addParamValue(id);

        Vector<DataObject> rs1 = new Vector<DataObject>();
        Vector<DataObject> rs2 = new Vector<DataObject>();

        dao.queryByCommand(rs1,check1,null,null);
        dao.queryByCommand(rs2,check2,null,null);

        return (rs1.size() != 0 || rs2.size() != 0);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}