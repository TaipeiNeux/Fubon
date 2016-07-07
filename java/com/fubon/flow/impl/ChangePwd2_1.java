package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/19
 * Time: 下午 8:17
 * To change this template use File | Settings | File Templates.
 */
public class ChangePwd2_1 implements ILogic {

    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        //取得是否已撥款
        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N";
        String mobile = "" , email = "", account = "", pd = "";

        //取得登入者手機跟Email
        mobile = loginUserBean.getCustomizeValue("AplyCellPhoneNo");
        email = loginUserBean.getCustomizeValue("AplyEmail");

        //取得第一步輸入的帳號密碼
        String draftXML = FlowUtils.getDraftData(userId, "changePwd", "changePwd1", dao);
        Document step1Doc = DocumentHelper.parseText(draftXML);
        Element step1Root = step1Doc.getRootElement();

        account = step1Root.element("userAccount").getText();
        pd = step1Root.element("userPwd").getText();

        content.put("hasAppropriation",isRecord);
        content.put("mobile",mobile);
        content.put("email",email);
        content.put("account",account);
        content.put("password",pd);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}