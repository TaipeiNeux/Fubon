package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
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
public class Apply6_2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        HttpServletRequest req = queryStringInfo.getRequest();
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(req.getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String apply1_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
        String apply1_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_2", dao);
        String apply2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply2", dao);
        String apply3_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply3_1", dao);
        String apply3_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply3_2", dao);
        String apply4DraftXML = FlowUtils.getDraftData(userId, "apply", "apply_online_4", dao);
        String apply5DraftXML = FlowUtils.getDraftData(userId, "apply", "apply_online_5", dao);

        Document apply1_1Doc = DocumentHelper.parseText(apply1_1DraftXML);
        Document apply1_2Doc = DocumentHelper.parseText(apply1_2DraftXML);
        Document apply2Doc = DocumentHelper.parseText(apply2DraftXML);
        Document apply3_1Doc = DocumentHelper.parseText(apply3_1DraftXML);
        Document apply3_2Doc = DocumentHelper.parseText(apply3_2DraftXML);
        Document apply4Doc = DocumentHelper.parseText(apply4DraftXML);
        Document apply5Doc = DocumentHelper.parseText(apply5DraftXML);

        Element apply1_1Root = apply1_1Doc.getRootElement();
        Element apply1_2Root = apply1_2Doc.getRootElement();
        Element apply2Root = apply2Doc.getRootElement();
        Element apply3_1Root = apply3_1Doc.getRootElement();
        Element apply3_2Root = apply3_2Doc.getRootElement();
        Element apply4Root = apply4Doc.getRootElement();
        Element apply5Root = apply5Doc.getRootElement();

        //申請完了，要直接寫入AplyMemberTuitionLoanDtl
        try{
            DataObject aplyMemberDataObject = ProjUtils.saveAplyMemberTuitionLoanDtl(queryStringInfo , dao,apply1_1Root,apply1_2Root,apply2Root,apply3_1Root,apply3_2Root,apply4Root,"2");

            //取得分行代碼，預約時間

            String applicantAdult = apply1_2Root.element("applicantAdult").getText();
            String userMarriedHidden = apply1_2Root.element("userMarriedHidden").getText();
            String familyStatusLevel1 = apply1_2Root.element("familyStatusLevel1").getText();
            String familyStatusLevel2 = apply1_2Root.element("familyStatusLevel2").getText();

            String branchId = apply4Root.element("idSelected").getText();
            String dateSelected = apply4Root.element("dateSelected").getText();
            String timeSelected = apply4Root.element("timeSelected").getText();

            String reservation = apply5Root.element("reservation") != null ? apply5Root.element("reservation").getText() : "";

            Map<String,String> searchMap = new LinkedHashMap<String, String>();
            searchMap.put("b.BranchId",branchId);
            Vector<DataObject> ret = ProjUtils.getBranch(searchMap, dao);
            DataObject branch = ret.get(0);
            content.put("branchName",branch.getValue("BranchName")); // 分行名稱
            content.put("addr",branch.getValue("Addr"));          // 分行地址
            content.put("tel",branch.getValue("Tel"));              // 分行電話
            content.put("dateSelected",dateSelected);
            content.put("timeSelected",timeSelected);

            content.put("applicantAdult",applicantAdult);
            content.put("marryStatus",userMarriedHidden);

            content.put("reservation",reservation);


            //依照申請人取得線上續貸資料
            ProjUtils.setOnlineDocumentApplyData(content,userId,dao);

            //放是否借據
            content.put("signBill","Y".equals(aplyMemberDataObject.getValue("signBill")) ? "Y" : "N");

            //清除我要申請的草稿資料
//            FlowUtils.resetDraftData(userId,"apply",dao);
        }catch(Exception e) {
            e.printStackTrace();

            throw new Exception("申請失敗："+e.getMessage());
        }

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
