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
import org.apache.commons.lang3.StringUtils;
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
 * Time: 上午 10:16
 * To change this template use File | Settings | File Templates.
 */
public class Apply5_1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        String uploadFileIdCardPosition = "img/dh.jpg", uploadFileIdCardNegative = "img/dh.jpg",uploadFileRegistration = "img/dh.jpg",uploadFileLowIncome = "";
        String uploadFileIdCardPosition_docId = "", uploadFileIdCardNegative_docId = "", uploadFileRegistration_docId = "", uploadFileLowIncome_docId = "";
        String isPositive_hidden = "",isNegative_hidden = "",register_hidden = "",idPositiveViewName_hidden = "" , idNegativeViewName_hidden = "" , registerViewName_hidden = "",lowIncome_hidden = "",lowIncomeViewName_hidden = "";

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        //我要申請最後第5步確認資料的基本欄位
        ProjUtils.setApplyCommitStep5BasicData(queryStringInfo,content,userId,dao);

        //撈第四步要顯示的欄位

        String apply4DraftXML = FlowUtils.getDraftData(userId,"apply","apply_document_4",dao);
        if(StringUtils.isNotEmpty(apply4DraftXML)) {
            Document apply4Doc = DocumentHelper.parseText(apply4DraftXML);
            Element root = apply4Doc.getRootElement();
            if(root.element("isPositive_hidden") != null) isPositive_hidden = root.element("isPositive_hidden").getText();
            if(root.element("isNegative_hidden") != null) isNegative_hidden = root.element("isNegative_hidden").getText();
            if(root.element("register_hidden") != null) register_hidden = root.element("register_hidden").getText();
            if(root.element("idPositiveViewName_hidden") != null) idPositiveViewName_hidden = root.element("idPositiveViewName_hidden").getText();
            if(root.element("idNegativeViewName_hidden") != null) idNegativeViewName_hidden = root.element("idNegativeViewName_hidden").getText();
            if(root.element("registerViewName_hidden") != null) registerViewName_hidden = root.element("registerViewName_hidden").getText();
            if(root.element("lowIncome_hidden") != null) lowIncome_hidden = root.element("lowIncome_hidden").getText();
            if(root.element("lowIncomeViewName_hidden") != null) lowIncomeViewName_hidden = root.element("lowIncomeViewName_hidden").getText();

        }

        //上傳文件撈Table
        SQLCommand query = new SQLCommand("select DocId,DocType,original_file_name from AplyMemberTuitionLoanDtl_Doc where AplyIdNo = ?");
        query.addParamValue(userId);
        Vector<DataObject> docResult = new Vector<DataObject>();
        dao.queryByCommand(docResult,query,null,null);

        if(docResult.size() != 0) {
            for(DataObject d : docResult) {
                String docId = d.getValue("DocId");
                String docType = d.getValue("DocType");
                String originalFileName = d.getValue("original_file_name");

                if("1".equalsIgnoreCase(docType)) {
                    uploadFileIdCardPosition = originalFileName;
                    uploadFileIdCardPosition_docId = docId;
                }
                else if("2".equalsIgnoreCase(docType)) {
                    uploadFileIdCardNegative = originalFileName;
                    uploadFileIdCardNegative_docId = docId;
                }
                else if("3".equalsIgnoreCase(docType)) {
                    uploadFileRegistration = originalFileName;
                    uploadFileRegistration_docId = docId;
                }
                else if("4".equalsIgnoreCase(docType)) {
                    uploadFileLowIncome = originalFileName;
                    uploadFileLowIncome_docId = docId;
                }
            }
        }

        JSONObject uploadFile = new JSONObject();
        uploadFile.put("idCardPosition",uploadFileIdCardPosition);
        uploadFile.put("idCardNegative",uploadFileIdCardNegative);
        uploadFile.put("registration",uploadFileRegistration);
        uploadFile.put("lowIncome",uploadFileLowIncome);

        uploadFile.put("idCardPosition_docId",uploadFileIdCardPosition_docId);
        uploadFile.put("idCardNegative_docId",uploadFileIdCardNegative_docId);
        uploadFile.put("registration_docId",uploadFileRegistration_docId);
        uploadFile.put("lowIncome_docId",uploadFileLowIncome_docId);

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
