package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 上午 10:15
 * To change this template use File | Settings | File Templates.
 */
public class Apply4 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        String loanPrice = "",loans = "" , freedomLife = "", accordingToBillLife = "",uploadFileIdCardPosition = "img/dh.jpg", uploadFileIdCardNegative = "img/dh.jpg",uploadFileRegistration = "img/dh.jpg",uploadFileLowIncome = "";
//        String uploadFileIdCardPosition_docId = "", uploadFileIdCardNegative_docId = "", uploadFileRegistration_docId = "", uploadFileLowIncome_docId = "";

        String isPositive_hidden = "",isNegative_hidden = "",register_hidden = "",idPositiveViewName_hidden = "" , idNegativeViewName_hidden = "" , registerViewName_hidden = "",lowIncome_hidden = "",lowIncomeViewName_hidden = "";

        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("isPositive_hidden") != null) isPositive_hidden = root.element("isPositive_hidden").getText();
            if(root.element("isNegative_hidden") != null) isNegative_hidden = root.element("isNegative_hidden").getText();
            if(root.element("register_hidden") != null) register_hidden = root.element("register_hidden").getText();
            if(root.element("idPositiveViewName_hidden") != null) idPositiveViewName_hidden = root.element("idPositiveViewName_hidden").getText();
            if(root.element("idNegativeViewName_hidden") != null) idNegativeViewName_hidden = root.element("idNegativeViewName_hidden").getText();
            if(root.element("registerViewName_hidden") != null) registerViewName_hidden = root.element("registerViewName_hidden").getText();
            if(root.element("lowIncome_hidden") != null) lowIncome_hidden = root.element("lowIncome_hidden").getText();
            if(root.element("lowIncomeViewName_hidden") != null) lowIncomeViewName_hidden = root.element("lowIncomeViewName_hidden").getText();

        }

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String draftXML3_2 = FlowUtils.getDraftData(userId,"apply","apply3_2",dao);
        if (draftXML3_2 != null) {
            Document draftDoc3_2 = DocumentHelper.parseText(draftXML3_2);
            Element draftRoot3_2 = draftDoc3_2.getRootElement();

            if(draftRoot3_2.element("loanPrice") != null) loanPrice = draftRoot3_2.element("loanPrice").getText();
            if(draftRoot3_2.element("loansSum") != null) loans = draftRoot3_2.element("loansSum").getText();
            if(draftRoot3_2.element("freedom_life") != null) freedomLife = draftRoot3_2.element("freedom_life").getText();
            if(draftRoot3_2.element("accordingToBill_life") != null) accordingToBillLife = draftRoot3_2.element("accordingToBill_life").getText();
        }else{
            DataObject aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
            if(aplyMemberData != null) {
                loanPrice = aplyMemberData.getValue("loanType");

                loans = (Integer.parseInt(aplyMemberData.getValue("renderAmtSchool")) + Integer.parseInt(aplyMemberData.getValue("renderAmtEducation")) +
                        Integer.parseInt(aplyMemberData.getValue("renderAmtInsurance")) + Integer.parseInt(aplyMemberData.getValue("renderAmtPractice")) +
                        Integer.parseInt(aplyMemberData.getValue("renderAmtMusic")) +
                        Integer.parseInt(aplyMemberData.getValue("renderAmtOther")) + Integer.parseInt(aplyMemberData.getValue("renderAmtBook")) +
                        Integer.parseInt(aplyMemberData.getValue("renderAmtLodging")) + Integer.parseInt(aplyMemberData.getValue("renderAmtStudy")) +
                        Integer.parseInt(aplyMemberData.getValue("renderAmtLiving"))) + "";
                freedomLife = aplyMemberData.getValue("renderAmt_living");
                accordingToBillLife = aplyMemberData.getValue("renderAmt_living");
            }
        }

        //抓上傳文件
        SQLCommand query = new SQLCommand("select DocId,DocType,original_file_name,Size from AplyMemberTuitionLoanDtl_Doc where AplyIdNo = ?");
        query.addParamValue(userId);
        Vector<DataObject> docResult = new Vector<DataObject>();
        dao.queryByCommand(docResult,query,null,null);

        JSONArray idCardPosition = new JSONArray();
        JSONArray idCardNegative = new JSONArray();
        JSONArray registration = new JSONArray();
        JSONArray lowIncome = new JSONArray();

        if(docResult.size() != 0) {
            for(DataObject d : docResult) {
                String docId = d.getValue("DocId");
                String docType = d.getValue("DocType");
                String originalFileName = d.getValue("original_file_name");
                int size = Integer.valueOf(d.getValue("Size"));

                JSONObject tmp = new JSONObject();
                tmp.put("fileName",originalFileName);
                tmp.put("docId",ProjUtils.encodingNumber(docId));
                tmp.put("size",size);
                tmp.put("fileNameExtension",originalFileName.substring(originalFileName.lastIndexOf(".") + 1));

                if("1".equalsIgnoreCase(docType)) {
                    idCardPosition.put(tmp);
                }
                else if("2".equalsIgnoreCase(docType)) {
                    idCardNegative.put(tmp);
                }
                else if("3".equalsIgnoreCase(docType)) {
                    registration.put(tmp);
                }
                else if("4".equalsIgnoreCase(docType)) {
                    lowIncome.put(tmp);
                }
            }
        }

        JSONObject freedom = new JSONObject();
        freedom.put("life",freedomLife);

        JSONObject accordingToBill = new JSONObject();
        accordingToBill.put("life",accordingToBillLife);

        JSONObject uploadFile = new JSONObject();
        uploadFile.put("idCardPosition",idCardPosition);
        uploadFile.put("idCardNegative",idCardNegative);
        uploadFile.put("registration",registration);
        uploadFile.put("lowIncome",lowIncome);

//        uploadFile.put("idCardPosition_docId",uploadFileIdCardPosition_docId);
//        uploadFile.put("idCardNegative_docId",uploadFileIdCardNegative_docId);
//        uploadFile.put("registration_docId",uploadFileRegistration_docId);
//        uploadFile.put("lowIncome_docId",uploadFileLowIncome_docId);

        content.put("loanPrice",loanPrice);
        content.put("loans",loans);
        content.put("freedom",freedom);
        content.put("accordingToBill",accordingToBill);
        content.put("uploadFile",uploadFile);

        content.put("isPositive_hidden",isPositive_hidden);
        content.put("isNegative_hidden",isNegative_hidden);
        content.put("register_hidden",register_hidden);
        content.put("idPositiveViewName_hidden",idPositiveViewName_hidden);
        content.put("idNegativeViewName_hidden",idNegativeViewName_hidden);
        content.put("registerViewName_hidden",registerViewName_hidden);
        content.put("lowIncome_hidden",lowIncome_hidden);
        content.put("lowIncomeViewName_hidden",lowIncomeViewName_hidden);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
