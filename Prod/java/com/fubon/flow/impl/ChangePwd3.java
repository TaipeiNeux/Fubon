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
 * Date: 2016/5/19
 * Time: 下午 8:21
 * To change this template use File | Settings | File Templates.
 */
public class ChangePwd3 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String errorCode = "" , errorMsg = "";

        //拿第一步輸入代碼跟密碼
        String draftXML = FlowUtils.getDraftData(userId, "changePwd", "changePwd1", dao);
        Document step1Doc = DocumentHelper.parseText(draftXML);

        Element step1Root = step1Doc.getRootElement();

        //查詢手機跟Email

        String id = userId;
        String email = loginUserBean.getCustomizeValue("AplyEmail");

        DataObject studentUserProfileDetail = DaoFactory.getDefaultDataObject("Student_UserProfileDetail");
        studentUserProfileDetail.setValue("AplyIdNo",id);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.query(ret,studentUserProfileDetail,null);

        String forgetResult = "success" , forgetDate = "" , forgetTime = "";

        if(ret.size() != 0) {
            try{
                //更新DB
                DataObject studentUserProfile = DaoFactory.getDefaultDataObject("Student_UserProfile");
                studentUserProfile.setValue("IdNo",id);
                if(dao.querySingle(studentUserProfile,null)) {

                    String userPwd = step1Root.element("userPwd").getText();

                    String s = id + "-" + userPwd;
                    String md5Password = DigestUtils.md5Hex(s.toUpperCase());

                    studentUserProfile.setValue("UserId",step1Root.element("userAccount").getText());
                    studentUserProfile.setValue("Password",md5Password);
                    studentUserProfile.setValue("UserIdNotMatchCount","0");
                    studentUserProfile.setValue("LoginFailCount","0");

                    dao.update(studentUserProfile);

                    String today = DateUtil.getTodayString();
                    today = DateUtil.convert14ToDate("yyyy/MM/dd HH:mm:ss",today);

                    forgetDate = today.substring(0,10);
                    forgetTime = today.substring(11,19);

                    //清除草稿
                    FlowUtils.resetDraftData(userId,"changePwd",dao);

                }

            }catch(Exception e) {
                e.printStackTrace();
                forgetResult = "fail";

                errorCode = "99";
                errorMsg = "系統發生錯誤["+e.getMessage()+"]";
            }
        }

        //寄發Email
        String msg = forgetResult.equals("success") ? "成功" : "失敗";
        String mailTitle = MessageUtils.resetPwdTitle;
        mailTitle = StringUtils.replace(mailTitle, "{result}", msg);

        MailBean mailBean = new MailBean("changePwd");
        mailBean.setReceiver(email);
        mailBean.setTitle(mailTitle);
        mailBean.addResultParam("result",(forgetResult.equals("success") ? "變更成功" : "變更失敗("+errorCode+")"+errorMsg));
        mailBean.addResultParam("imgSrc",forgetResult.equals("success") ? "{host}/img/na-14.png" : "{host}/img/deny.png");

        MessageUtils.sendEmail(mailBean,userId);

        content.put("changePwdResult",forgetResult);
        content.put("changePwdDate",forgetDate);
        content.put("changePwdTime",forgetTime);


        //清除草稿資料
        FlowUtils.resetDraftData(userId,"changePwd",dao);

        String result = StringUtils.isEmpty(errorMsg) ? "變更代碼/密碼成功" : errorMsg;
        ProjUtils.saveLog(dao,queryStringInfo.getRequest(),getClass().getName(),"getDraftData",result);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {

    }
}