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

import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/30
 * Time: 下午 9:37
 * To change this template use File | Settings | File Templates.
 */
public class ForgetPassword3_1 implements ILogic {

    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        IDao dao = DaoFactory.getDefaultDao();

        //拿第一步輸入的身份證
        String draftXML = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("forgetPassword_forgetPassword1"));
        Document step1Doc = DocumentHelper.parseText(draftXML);
        Element step1Root = step1Doc.getRootElement();

        String id = step1Root.element("id").getText();

        //取得是否已撥款
        String isRecord = ProjUtils.isPayHistory(id,dao) ? "Y" : "N";
        String mobile = "" , email = "", account = "", password = "";


        //查詢手機跟Email
        DataObject studentUserProfileDetail = DaoFactory.getDefaultDataObject("Student_UserProfileDetail");
        studentUserProfileDetail.setValue("AplyIdNo",id);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.query(ret,studentUserProfileDetail,null);

        if(ret.size() != 0) {
            mobile = ret.get(0).getValue("AplyCellPhoneNo");
            email = ret.get(0).getValue("AplyEmail");

        }

        //取得第一步輸入的帳號密碼跟第二步輸入的使用者代碼
        String draftXML2 = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("forgetPassword_forgetPassword2"));
        Document step2Doc = DocumentHelper.parseText(draftXML2);
        Element step2Root = step2Doc.getRootElement();

        account = step2Root.element("userAccount").getText();
        password = step2Root.element("userPwd").getText();

        content.put("hasAppropriation",isRecord);
        content.put("mobile",mobile);
        content.put("email",email);
        content.put("account",account);
        content.put("password",password);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {



    }
}
