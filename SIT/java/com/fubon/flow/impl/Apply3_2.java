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
 * Date: 2016/4/24
 * Time: 下午 7:23
 * To change this template use File | Settings | File Templates.
 */
public class Apply3_2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        String loans = "1"; //default

        String accordingToBillLoansSum = "",accordingToBillBook = "",accordingToBillLive = "",accordingToBillAbroad = "",accordingToBillLife = "",accordingToBillPublicExpense = "";
        String freedomCredit = "",freedomFPA = "",freedomPractice = "",freedomMusic = "",freedomBook = "",freedomLive = "",freedomAbroad = "",freedomLife = "", freedomPublicExpense = "";
        String education = "" , OnTheJob = "";

        String accordingToBill_sum = "", freedom_sum = "";

        String stageSelectValue = "";
        String whiteList = "";//此身份是否在白名單中

        IDao dao = DaoFactory.getDefaultDao();
        DataObject aplyMemberYearData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
        String applyDraftXML3 = FlowUtils.getDraftData(userId,"apply","apply3_1",dao);
        if (applyDraftXML3 != null) {
            Document draftDoc = DocumentHelper.parseText(applyDraftXML3);
            Element draftRoot = draftDoc.getRootElement();

            stageSelectValue = draftRoot.element("stageSelectValue") != null ? draftRoot.element("stageSelectValue").getText() : "";
            OnTheJob = draftRoot.element("onTheJobHidden").getText();
        }
        else if (aplyMemberYearData != null){
            stageSelectValue = aplyMemberYearData.getValue("schoolType3");
            OnTheJob = "0".equals(aplyMemberYearData.getValue("schoolWorkFlag")) ? "N" : "Y";
        }


        //若有草稿過，就拿草稿的來用
        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("purchaser") != null) loans = root.element("purchaser").getText();
            if(root.element("loansSum") != null) accordingToBillLoansSum = root.element("loansSum").getText();
            if(root.element("accordingToBill_book") != null) accordingToBillBook = root.element("accordingToBill_book").getText();
            if(root.element("accordingToBill_live") != null) accordingToBillLive = root.element("accordingToBill_live").getText();
            if(root.element("accordingToBill_abroad") != null) accordingToBillAbroad = root.element("accordingToBill_abroad").getText();
            if(root.element("accordingToBill_life") != null) accordingToBillLife = root.element("accordingToBill_life").getText();
            if(root.element("accordingToBill_publicExpense") != null) accordingToBillPublicExpense = root.element("accordingToBill_publicExpense").getText();

            if(root.element("freedom_credit") != null) freedomCredit = root.element("freedom_credit").getText();
            if(root.element("freedom_FPA") != null) freedomFPA = root.element("freedom_FPA").getText();
            if(root.element("freedom_practice") != null) freedomPractice = root.element("freedom_practice").getText();
            if(root.element("freedom_music") != null) freedomMusic = root.element("freedom_music").getText();
            if(root.element("freedom_book") != null) freedomBook = root.element("freedom_book").getText();
            if(root.element("freedom_live") != null) freedomLive = root.element("freedom_live").getText();
            if(root.element("freedom_abroad") != null) freedomAbroad = root.element("freedom_abroad").getText();
            if(root.element("freedom_life") != null) freedomLife = root.element("freedom_life").getText();
            if(root.element("freedom_publicExpense") != null) freedomPublicExpense = root.element("freedom_publicExpense").getText();

            if(root.element("accordingToBill_sum_hidden") != null) accordingToBill_sum = root.element("accordingToBill_sum_hidden").getText();
            if(root.element("freedom_sum") != null) freedom_sum = root.element("freedom_sum").getText();
        }
        //先取得「本學期」申請資料
        else if (aplyMemberYearData != null){
            loans = aplyMemberYearData.getValue("loanType");
            accordingToBillLoansSum = aplyMemberYearData.getValue("renderAmt_school");

            if("1".equalsIgnoreCase(loans)) {
                accordingToBillBook = aplyMemberYearData.getValue("renderAmt_book");
                accordingToBillLive = aplyMemberYearData.getValue("renderAmt_lodging");
                accordingToBillAbroad = aplyMemberYearData.getValue("renderAmt_study");
                accordingToBillLife = aplyMemberYearData.getValue("renderAmt_living");

            }
            else {
                freedomMusic = aplyMemberYearData.getValue("renderAmt_music");
                freedomBook = aplyMemberYearData.getValue("renderAmt_book");
                freedomLive = aplyMemberYearData.getValue("renderAmt_lodging");
                freedomAbroad = aplyMemberYearData.getValue("renderAmt_study");
                freedomLife = aplyMemberYearData.getValue("renderAmt_living");
            }

            String scholarshipFlag = aplyMemberYearData.getValue("scholarshipFlag");

            accordingToBillPublicExpense = "N".equals(scholarshipFlag) ? "0" : "1";
            freedomPublicExpense = "N".equals(scholarshipFlag) ? "0" : "1";

            freedomCredit = aplyMemberYearData.getValue("renderAmt_education");
            freedomFPA = aplyMemberYearData.getValue("renderAmt_insurance");
            freedomPractice = aplyMemberYearData.getValue("renderAmt_practice");

            accordingToBill_sum = aplyMemberYearData.getValue("renderAmt");
            freedom_sum = aplyMemberYearData.getValue("renderAmt");
        }

        //0804 added by titan 加上白名單
        whiteList = ProjUtils.queryApplyWhiteRecord(userId,dao);
        whiteList = StringUtils.isEmpty(whiteList) ? "N" : "Y";

        content.put("loans",loans);

        JSONObject accordingToBill = new JSONObject();
        accordingToBill.put("loansSum",accordingToBillLoansSum);
        accordingToBill.put("book",accordingToBillBook);
        accordingToBill.put("live",accordingToBillLive);
        accordingToBill.put("abroad",accordingToBillAbroad);
        accordingToBill.put("life",accordingToBillLife);
        accordingToBill.put("publicExpense",accordingToBillPublicExpense);
        content.put("accordingToBill",accordingToBill);

        JSONObject freedom = new JSONObject();
        freedom.put("credit",freedomCredit);
        freedom.put("FPA",freedomFPA);
        freedom.put("practice",freedomPractice);
        freedom.put("music",freedomMusic);
        freedom.put("book",freedomBook);
        freedom.put("live",freedomLive);
        freedom.put("abroad",freedomAbroad);
        freedom.put("life",freedomLife);
        freedom.put("publicExpense",freedomPublicExpense);
        content.put("freedom",freedom);

        content.put("education",education);
        content.put("OnTheJob",OnTheJob);

        content.put("accordingToBill_sum",accordingToBill_sum);
        content.put("freedom_sum",freedom_sum);

        content.put("stageSelectValue",stageSelectValue);

        content.put("whiteList",whiteList);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
