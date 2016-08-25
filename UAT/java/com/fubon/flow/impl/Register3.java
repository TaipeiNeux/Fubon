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
 * Time: 上午 2:33
 * To change this template use File | Settings | File Templates.
 */
public class Register3 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {
        String id = "" , name = "" , birthday = "", mobile = "",email = "",account = "", pd = "";


        //取得第二步的草稿資料
        Object register2 = queryStringInfo.getRequest().getSession().getAttribute("register_register2");
        if(register2 == null) {
            throw new Exception("操作逾時，請回到第一步重新填寫");
        }

        String draftXML = String.valueOf(register2);
        Document step2Doc = DocumentHelper.parseText(draftXML);
        Element step2Root = step2Doc.getRootElement();

        if(step2Root.element("id") != null) id = step2Root.element("id").getText();
        if(step2Root.element("name") != null) name = step2Root.element("name").getText();
        if(step2Root.element("birthday_y") != null) birthday = ProjUtils.toDraftBirthday(step2Root.element("birthday_y").getText(),step2Root.element("birthday_m").getText(),step2Root.element("birthday_d").getText());
        if(step2Root.element("cellPhone") != null) mobile = step2Root.element("cellPhone").getText();
        if(step2Root.element("email") != null) email = step2Root.element("email").getText();
        if(step2Root.element("userAccount") != null) account = step2Root.element("userAccount").getText();
        if(step2Root.element("userPwd") != null) pd = step2Root.element("userPwd").getText();

        content.put("id",id);
        content.put("name",name);
        content.put("birthday",birthday);
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
