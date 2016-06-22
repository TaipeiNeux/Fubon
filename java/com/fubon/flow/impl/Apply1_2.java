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
 * Date: 2016/4/24
 * Time: 下午 4:04
 * To change this template use File | Settings | File Templates.
 */
/**
 * 我要申請的1-2：申請人基本資料/家庭狀況
 */
public class Apply1_2 implements ILogic {

    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        String birthday = "",marryStatus = "",familyStatusLevel1 = "",familyStatusLevel2 = "" , familyStatusLevel1Text = "", familyStatusLevel2Text = "";

        //若有草稿過，就拿草稿的來用
        if(draftData != null) {
            Element root = draftData.getRootElement();
//            if(root.element("birthday") != null) birthday = root.element("birthday").getText();
//            if(root.element("marryStatus") != null) marryStatus = root.element("marryStatus").getText();
            if(root.element("familyStatusLevel1") != null) familyStatusLevel1 = root.element("familyStatusLevel1").getText();
            if(root.element("familyStatusLevel2") != null) familyStatusLevel2 = root.element("familyStatusLevel2").getText();

            if(root.element("familyStatusLevel1Text") != null) familyStatusLevel1Text = root.element("familyStatusLevel1Text").getText();
            if(root.element("familyStatusLevel2Text") != null) familyStatusLevel2Text = root.element("familyStatusLevel2Text").getText();
        }


        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        //取得第一步的草稿資料
        IDao dao = DaoFactory.getDefaultDao();
        String draftXML = FlowUtils.getDraftData(userId,"apply","apply1_1",dao);
        Document step1Doc = DocumentHelper.parseText(draftXML);
        Element step1Root = step1Doc.getRootElement();

        birthday = step1Root.element("birthday").getText();
        marryStatus = step1Root.element("marryStatus").getText();

        content.put("birthday",birthday);
        content.put("marryStatus",marryStatus);
        content.put("familyStatusLevel1",familyStatusLevel1);
        content.put("familyStatusLevel2",familyStatusLevel2);
        content.put("familyStatusLevel1Text",familyStatusLevel1Text);
        content.put("familyStatusLevel2Text",familyStatusLevel2Text);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {

    }
}
