package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 上午 10:16
 * To change this template use File | Settings | File Templates.
 */
public class Apply6_1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String apply1_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
        String apply1_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_2", dao);
        String apply2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply2", dao);
        String apply3_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply3_1", dao);
        String apply3_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply3_2", dao);


        Document apply1_1Doc = DocumentHelper.parseText(apply1_1DraftXML);
        Document apply1_2Doc = DocumentHelper.parseText(apply1_2DraftXML);
        Document apply2Doc = DocumentHelper.parseText(apply2DraftXML);
        Document apply3_1Doc = DocumentHelper.parseText(apply3_1DraftXML);
        Document apply3_2Doc = DocumentHelper.parseText(apply3_2DraftXML);

        Element apply1_1Root = apply1_1Doc.getRootElement();
        Element apply1_2Root = apply1_2Doc.getRootElement();
        Element apply2Root = apply2Doc.getRootElement();
        Element apply3_1Root = apply3_1Doc.getRootElement();
        Element apply3_2Root = apply3_2Doc.getRootElement();


        //申請完了，要直接寫入AplyMemberTuitionLoanDtl
        String result = "申請失敗-線上續貸";
        try{
            DataObject aplyMemberDataObject = ProjUtils.saveAplyMemberTuitionLoanDtl(queryStringInfo , dao,apply1_1Root,apply1_2Root,apply2Root,apply3_1Root,apply3_2Root,null,"1");

            //依照申請人取得線上續貸資料
            ProjUtils.setOnlineDocumentApplyData(content,userId,dao);


            //放是否借據
            content.put("signBill","Y".equals(aplyMemberDataObject.getValue("signBill")) ? "Y" : "N");


            //清除我要申請的草稿資料
//            FlowUtils.resetDraftData(userId,"apply",dao);
        }catch(Exception e) {
            e.printStackTrace();

            result = "申請失敗-線上續貸:" + e.getMessage();

            throw new Exception("申請失敗："+e.getMessage());
        }
        finally {
            try{
                ProjUtils.saveLog(dao,queryStringInfo.getRequest(),getClass().getName(),"getDraftData",result);
            }catch(Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}