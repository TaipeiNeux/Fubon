package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.dom4j.Element;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/17
 * Time: 下午 11:08
 * To change this template use File | Settings | File Templates.
 */
public class Deferment1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N";
        String eligibilityText = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("eligibilityText"));
        String eligibilityIndex = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("eligibilityIndex"));
        String eligibilityText0 = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("eligibilityText0"));
        String selectYear = "",selectMonth = "",selectDay = "";

        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("selectYear") != null) selectYear = root.element("selectYear").getText();
            if(root.element("selectMonth") != null) selectMonth = root.element("selectMonth").getText();
            if(root.element("selectDay") != null) selectDay = root.element("selectDay").getText();

            if(root.element("eliIndex") != null) eligibilityIndex = root.element("eliIndex").getText();
            if(root.element("eligibilityText") != null) eligibilityText = root.element("eligibilityText").getText();

        }

        content.put("isRecord",isRecord);
        content.put("eligibilityText",eligibilityText);
        content.put("eligibilityIndex",eligibilityIndex);
        content.put("eligibilityText0",eligibilityText0);
        content.put("selectYear",selectYear);
        content.put("selectMonth",selectMonth);
        content.put("selectDay",selectDay);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
