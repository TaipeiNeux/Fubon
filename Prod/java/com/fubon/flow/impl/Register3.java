package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;

import java.text.SimpleDateFormat;

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
String cbirthday="";

        //取得第二步的草稿資料
        String draftXML = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("register_register2"));
        Document step2Doc = DocumentHelper.parseText(draftXML);
        Element step2Root = step2Doc.getRootElement();

        if(step2Root.element("id") != null) id = step2Root.element("id").getText();
        if(step2Root.element("name") != null) name = step2Root.element("name").getText();
        if(step2Root.element("birthday_y") != null) birthday = ProjUtils.toDraftBirthday(step2Root.element("birthday_y").getText(),step2Root.element("birthday_m").getText(),step2Root.element("birthday_d").getText());
        if(step2Root.element("cellPhone") != null) mobile = step2Root.element("cellPhone").getText();
        if(step2Root.element("email") != null) email = step2Root.element("email").getText();
        if(step2Root.element("userAccount") != null) account = step2Root.element("userAccount").getText();
        if(step2Root.element("userPwd") != null) pd = step2Root.element("userPwd").getText();
        
        cbirthday  = ProjUtils.toYYYYBirthday(birthday);
        
        
        try {
        	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			dateFormat.setLenient(false);
			if (cbirthday.length() == 8) {
				cbirthday = cbirthday.substring(0, 4) + "-" + cbirthday.substring(4, 6) + "-"
						+ cbirthday.substring(6, 8);
				 dateFormat.parse(cbirthday.trim());
			}
			
			
		} catch (Exception e) {
			throw new Exception("生日格式錯誤");
		}
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
        //取得第一步的草稿資料
        Object register1 = queryStringInfo.getRequest().getSession().getAttribute("register_register1");
        if(register1 == null) {

            throw new Exception("操作逾時，請回到第一步重新填寫");
        }
    }
}
