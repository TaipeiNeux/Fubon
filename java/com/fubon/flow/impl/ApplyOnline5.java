package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 上午 10:15
 * To change this template use File | Settings | File Templates.
 */
public class ApplyOnline5 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        //我要申請最後第5步確認資料的基本欄位
        ProjUtils.setApplyCommitStep5BasicData(queryStringInfo,content,userId,dao);

        //抓apply_online_4的草稿
        String apply4DraftXML = FlowUtils.getDraftData(userId,"apply","apply_online_4",dao);

        Document apply4Doc = DocumentHelper.parseText(apply4DraftXML);

        //抓4的草稿，取得分行代碼，預約時間
        Element apply4Root = apply4Doc.getRootElement();
        String branchId = apply4Root.element("idSelected").getText();
        String dateSelected = apply4Root.element("dateSelected").getText();
        String timeSelected = apply4Root.element("timeSelected").getText();

        //再放預約分行與時間電話等資料
        Map<String,String> searchMap = new LinkedHashMap<String, String>();
        searchMap.put("b.BranchId",branchId);
        Vector<DataObject> ret = ProjUtils.getBranch(searchMap,dao);
        DataObject branch = ret.get(0);
        content.put("branchName",branch.getValue("BranchName")); // 分行名稱
        content.put("addr",branch.getValue("Addr"));          // 分行地址
        content.put("tel",branch.getValue("Tel"));              // 分行電話
        content.put("dateSelected",dateSelected);
        content.put("timeSelected",timeSelected);


    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
