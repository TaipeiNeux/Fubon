package com.fubon.flow.impl;

import java.util.Vector;

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
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/17
 * Time: 下午 11:09
 * To change this template use File | Settings | File Templates.
 */
public class Deferment2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N";
        String id = loginUserBean.getCustomizeValue("IdNo") , eliIndex="";
        String isPositiveFile = "", isNegativeFile = "", studentIdPositiveFile = "", studentIdNegativeFile = "", additionalFile = "",
        		isPositiveFile_docId = "", isNegativeFile_docId = "", studentIdPositiveFile_docId = "", studentIdNegativeFile_docId = "", additionalFile_docId = "";

        String idPositiveViewName_hidden = "",idNegativeViewName_hidden = "",studentIdPositiveViewName_hidden = "",studentIdNegativeViewName_hidden = "",additionalViewName_hidden = "";

        String isPositive_hidden = "",isNegative_hidden = "",studentIdPositive_hidden = "",studentIdNegative_hidden = "",additional_hidden = "";

        //若有草稿就裝到content
        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("idPositiveViewName_hidden") != null) idPositiveViewName_hidden = root.element("idPositiveViewName_hidden").getText();
            if(root.element("idNegativeViewName_hidden") != null) idNegativeViewName_hidden = root.element("idNegativeViewName_hidden").getText();
            if(root.element("studentIdPositiveViewName_hidden") != null) studentIdPositiveViewName_hidden = root.element("studentIdPositiveViewName_hidden").getText();
            if(root.element("studentIdNegativeViewName_hidden") != null) studentIdNegativeViewName_hidden = root.element("studentIdNegativeViewName_hidden").getText();
            if(root.element("additionalViewName_hidden") != null) additionalViewName_hidden = root.element("additionalViewName_hidden").getText();

            if(root.element("isPositive_hidden") != null) isPositive_hidden = root.element("isPositive_hidden").getText();
            if(root.element("isNegative_hidden") != null) isNegative_hidden = root.element("isNegative_hidden").getText();
            if(root.element("studentIdPositive_hidden") != null) studentIdPositive_hidden = root.element("studentIdPositive_hidden").getText();
            if(root.element("studentIdNegative_hidden") != null) studentIdNegative_hidden = root.element("studentIdNegative_hidden").getText();
            if(root.element("additional_hidden") != null) additional_hidden = root.element("additional_hidden").getText();
        }

        //從第1步取eliIndex
        String draftXML = FlowUtils.getDraftData(userId, "deferment", "deferment1", dao);
        Document step1Doc = DocumentHelper.parseText(draftXML);
        Element step1Root = step1Doc.getRootElement();

        String eligibilityText = step1Root.element("eligibilityText") != null ? step1Root.element("eligibilityText").getText() : "";
        eliIndex = step1Root.element("eliIndex").getText();
        
        //抓上傳文件(只抓還沒被更新過的
        SQLCommand query = new SQLCommand("select DocId, DocType, original_file_name from Deferment_Doc where AplyIdNo = ? and (FlowLogId is null or FlowLogId = 0)");
        query.addParamValue(userId);
        Vector<DataObject> docResult = new Vector<DataObject>();
        dao.queryByCommand(docResult,query,null,null);

        if(docResult.size() != 0) {
            for(DataObject d : docResult) {
                String docId = d.getValue("DocId");
                String docType = d.getValue("DocType");
                String originalFileName = d.getValue("original_file_name");

                if("1".equalsIgnoreCase(docType)) {
                	isPositiveFile = originalFileName;
                	isPositiveFile_docId = docId;
                }
                else if("2".equalsIgnoreCase(docType)) {
                	isNegativeFile = originalFileName;
                	isNegativeFile_docId = docId;
                }
                else if("3".equalsIgnoreCase(docType)) {
                	studentIdPositiveFile = originalFileName;
                	studentIdPositiveFile_docId = docId;
                }
                else if("4".equalsIgnoreCase(docType)) {
                	studentIdNegativeFile = originalFileName;
                	studentIdNegativeFile_docId = docId;
                }
                else if("5".equalsIgnoreCase(docType)) {
                	additionalFile = originalFileName;
                	additionalFile_docId = docId;
                }
            }
        }
        
        JSONObject uploadFile = new JSONObject();
        uploadFile.put("isPositiveFile",isPositiveFile);
        uploadFile.put("isNegativeFile",isNegativeFile);
        uploadFile.put("studentIdPositiveFile",studentIdPositiveFile);
        uploadFile.put("studentIdNegativeFile",studentIdNegativeFile);
        uploadFile.put("additionalFile",additionalFile);
        
        uploadFile.put("isPositiveFile_docId",isPositiveFile_docId);
        uploadFile.put("isNegativeFile_docId",isNegativeFile_docId);
        uploadFile.put("studentIdPositiveFile_docId",studentIdPositiveFile_docId);
        uploadFile.put("studentIdNegativeFile_docId",studentIdNegativeFile_docId);
        uploadFile.put("additionalFile_docId",additionalFile_docId);


        content.put("isRecord",isRecord);
        content.put("id",id);
        content.put("eliIndex",eliIndex);
        content.put("uploadFile",uploadFile);
        content.put("eligibilityText",eligibilityText);

        content.put("idPositiveViewName_hidden",idPositiveViewName_hidden);
        content.put("idNegativeViewName_hidden",idNegativeViewName_hidden);
        content.put("studentIdPositiveViewName_hidden",studentIdPositiveViewName_hidden);
        content.put("studentIdNegativeViewName_hidden",studentIdNegativeViewName_hidden);
        content.put("additionalViewName_hidden",additionalViewName_hidden);

        content.put("isPositive_hidden",isPositive_hidden);
        content.put("isNegative_hidden",isNegative_hidden);
        content.put("studentIdPositive_hidden",studentIdPositive_hidden);
        content.put("studentIdNegative_hidden",studentIdNegative_hidden);
        content.put("additional_hidden",additional_hidden);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
