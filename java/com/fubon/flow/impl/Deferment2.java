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



    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
