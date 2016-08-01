package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.codec.digest.DigestUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/30
 * Time: 下午 9:30
 * To change this template use File | Settings | File Templates.
 */
public class ForgetPassword2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {


        //取第一步輸入的草稿
        String draftXML = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("forgetPassword_forgetPassword1"));
        Document step1Doc = DocumentHelper.parseText(draftXML);
        Element step1Root = step1Doc.getRootElement();

        String id = step1Root.element("id").getText();
        content.put("id",id);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {

        //拿輸入的新密碼
        String userPwd = queryStringInfo.getParam("userPwd");

        //拿第一步輸入的身份證
        String draftXML = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("forgetPassword_forgetPassword1"));
        Document step1Doc = DocumentHelper.parseText(draftXML);
        Element step1Root = step1Doc.getRootElement();

        String id = step1Root.element("id").getText();

        DataObject studentUserProfile = DaoFactory.getDefaultDataObject("Student_UserProfile");
        studentUserProfile.setValue("IdNo",id);
        if(DaoFactory.getDefaultDao().querySingle(studentUserProfile,null)) {
            String password = studentUserProfile.getValue("password");

            String s = id + "-" + userPwd;
            String md5Password = DigestUtils.md5Hex(s.toUpperCase());

            if(md5Password.equalsIgnoreCase(password)) {
                throw new Exception("新的使用者密碼不可與原使用者密碼相同");
            }
        }
    }
}
