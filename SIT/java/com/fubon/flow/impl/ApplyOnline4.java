package com.fubon.flow.impl;

import com.fubon.flow.ILogic;
import com.fubon.utils.ProjUtils;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.dom4j.Element;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/25
 * Time: 上午 11:15
 * To change this template use File | Settings | File Templates.
 */
public class ApplyOnline4 implements ILogic{
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        String cityId = "",zipCode = "",btnId = "",date = "",time = "";

        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("cityId") != null) cityId = root.element("cityId").getText();
            if(root.element("zipCode") != null) zipCode = root.element("zipCode").getText();
            if(root.element("btnId") != null) btnId = root.element("btnId").getText();
            if(root.element("dateSelected") != null) date = root.element("dateSelected").getText();
            if(root.element("timeSelected") != null) time = root.element("timeSelected").getText();
        }

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();
        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N";

        String historyIsOnlineDocument = "N";
        if("Y".equalsIgnoreCase(isRecord)) {

            //帶入上次撥款紀錄
            DataObject aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId, dao);

            //判斷上次如果是線上續貸案件，但現在進到對保分行，要popup出壓黑
            historyIsOnlineDocument = "1".equalsIgnoreCase(aplyMemberData.getValue("AplyCaseType")) ? "Y" : "N";

        }

        JSONObject area = new JSONObject();
        area.put("cityId",cityId);
        area.put("zipCode",zipCode);
        content.put("area",area);

        content.put("btnId",btnId);
        content.put("date",date);
        content.put("time",time);

        //加入上次的案件是否為線上續貸
        content.put("historyIsOnlineDocument",historyIsOnlineDocument);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
