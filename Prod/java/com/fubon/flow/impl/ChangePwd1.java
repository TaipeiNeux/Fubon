package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
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
 * Date: 2016/5/19
 * Time: 下午 8:13
 * To change this template use File | Settings | File Templates.
 */
public class ChangePwd1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        //取得登入者的身份證字號及密碼
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();
        String password = loginUserBean.getCustomizeValue("Password");

        content.put("id",userId);
        content.put("password",password);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //拿輸入的新密碼
        String userPwd = queryStringInfo.getParam("userPwd");

        //再登入者的身份證
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());

        String id = loginUserBean.getUserId();

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
