package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.MessageUtils;
import com.fubon.utils.ProjUtils;
import com.fubon.utils.bean.MailBean;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.codec.digest.DigestUtils;
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
 * Time: 下午 9:46
 * To change this template use File | Settings | File Templates.
 */
public class ForgetPassword4 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        IDao dao = DaoFactory.getDefaultDao();

        //拿第一步輸入的身份證，第二步的代碼跟密碼
        String draftXML = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("forgetPassword_forgetPassword1"));
        String draftXML2 = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("forgetPassword_forgetPassword2"));
        Document step1Doc = DocumentHelper.parseText(draftXML);
        Document step2Doc = DocumentHelper.parseText(draftXML2);

        Element step1Root = step1Doc.getRootElement();
        Element step2Root = step2Doc.getRootElement();

        String id = step1Root.element("id").getText();

        String today = DateUtil.getTodayString();
        today = DateUtil.convert14ToDate("yyyy/MM/dd HH:mm:ss",today);

        String errorCode = "" , errorMsg = "";

        String forgetPasswordResult = "success" , forgetPasswordDate = "" , forgetPasswordTime = "";

        //查詢手機跟Email
        DataObject studentUserProfileDetail = DaoFactory.getDefaultDataObject("Student_UserProfileDetail");
        studentUserProfileDetail.setValue("AplyIdNo",id);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.query(ret,studentUserProfileDetail,null);

        String email = "";

        if(ret.size() != 0) {
            try{
                email = ret.get(0).getValue("AplyEmail");

                //更新DB
                DataObject studentUserProfile = DaoFactory.getDefaultDataObject("Student_UserProfile");
                studentUserProfile.setValue("IdNo",id);
                if(dao.querySingle(studentUserProfile,null)) {

                    String userPwd = step2Root.element("userPwd").getText();

                    String s = id + "-" + userPwd;
                    String md5Password = DigestUtils.md5Hex(s.toUpperCase());

                    studentUserProfile.setValue("UserId",step2Root.element("userAccount").getText());
                    studentUserProfile.setValue("Password",md5Password);

                    //重設密碼錯誤次數
                    studentUserProfile.setValue("LoginFailCount","0");


                    dao.update(studentUserProfile);

                }
                else {
                    //要編ErrorCode
                    errorCode = "11";
                    errorMsg = "查無此資料";
                }

                forgetPasswordDate = today.substring(0,10);
                forgetPasswordTime = today.substring(11,19);
            }catch(Exception e) {
                e.printStackTrace();
                forgetPasswordResult = "fail";

                errorCode = "99";
                errorMsg = "系統發生錯誤["+e.getMessage()+"]";
            }
        }

        //寄發Email
        String msg = forgetPasswordResult.equals("success") ? "成功" : "失敗";
        String mailTitle = MessageUtils.forgetTitle;
        mailTitle = StringUtils.replace(mailTitle, "{result}", msg);

        MailBean mailBean = new MailBean("forgetPassword");
        mailBean.setReceiver(email);
        mailBean.setTitle(mailTitle);
        mailBean.addResultParam("result",(forgetPasswordResult.equals("success") ? "<img src=\"{host}/img/na-14.png\">申請成功" : "<img src=\"{host}/img/na-16.png\">申請失敗("+errorCode+")"+errorMsg));

        MessageUtils.sendEmail(mailBean);


        content.put("forgetPasswordResult",forgetPasswordResult);
        content.put("forgetPasswordDate",forgetPasswordDate);
        content.put("forgetPasswordTime",forgetPasswordTime);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {

    }
}
