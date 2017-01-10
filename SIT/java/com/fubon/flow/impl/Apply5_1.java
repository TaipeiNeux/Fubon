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
import org.json.JSONArray;
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
//        String uploadFileIdCardPosition_docId = "", uploadFileIdCardNegative_docId = "", uploadFileRegistration_docId = "", uploadFileLowIncome_docId = "";
        String isPositive_hidden = "",isNegative_hidden = "",register_hidden = "",idPositiveViewName_hidden = "" , idNegativeViewName_hidden = "" , registerViewName_hidden = "",lowIncome_hidden = "",lowIncomeViewName_hidden = "";

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        //我要申請最後第5步確認資料的基本欄位
        ProjUtils.setApplyCommitStep5BasicData(queryStringInfo,content,userId,dao);

        //撈第四步要顯示的欄位

        //撈第四步要顯示的欄位
        String apply4DraftXML = FlowUtils.getDraftData(userId,"apply","apply_document_4",dao);
        if(apply4DraftXML != null && StringUtils.isNotEmpty(apply4DraftXML)) {
            Document apply4Doc = DocumentHelper.parseText(apply4DraftXML);
            Element root = apply4Doc.getRootElement();
            if(root.element("isPositive_hidden") != null) isPositive_hidden = root.element("isPositive_hidden").getText();
            if(root.element("isNegative_hidden") != null) isNegative_hidden = root.element("isNegative_hidden").getText();
            if(root.element("register_hidden") != null) register_hidden = root.element("register_hidden").getText();
            if(root.element("lowIncome_hidden") != null) lowIncome_hidden = root.element("lowIncome_hidden").getText();
            if(root.element("idPositiveViewName_hidden") != null) idPositiveViewName_hidden = root.element("idPositiveViewName_hidden").getText();
            if(root.element("idNegativeViewName_hidden") != null) idNegativeViewName_hidden = root.element("idNegativeViewName_hidden").getText();
            if(root.element("registerViewName_hidden") != null) registerViewName_hidden = root.element("registerViewName_hidden").getText();
            if(root.element("lowIncomeViewName_hidden") != null) lowIncomeViewName_hidden = root.element("lowIncomeViewName_hidden").getText();
        }

        //判斷是否有低收入證明
        //        String draftXML3_2 = FlowUtils.getDraftData(userId,"apply","apply3_2",dao);
//        if (draftXML3_2 != null) {
//            Document draftDoc3_2 = DocumentHelper.parseText(draftXML3_2);
//            Element draftRoot3_2 = draftDoc3_2.getRootElement();
//            if(draftRoot3_2.element("freedom_life") != null) freedom_life = draftRoot3_2.element("freedom_life").getText();
//         
//        }
        
        
        
        //上傳文件撈Table
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
                String size = d.getValue("Size");
                
//                String File_Name="";
//                String temp[] = originalFileName.split("[.]");
//                if(temp.length>1){ 
//                	File_Name = temp[temp.length-1];
//                }else{
//                	File_Name=""; 
//                }
//               
//                if(!File_Name.toLowerCase().equals("peg")&&!File_Name.toLowerCase().equals("png")&&!File_Name.toLowerCase().equals("jpg")&&!File_Name.toLowerCase().equals("tif")&&!File_Name.toLowerCase().equals("gif")&&!File_Name.toLowerCase().equals("pdf"))
//                	throw new Exception("請確認檔案副檔名");
             
                	

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

        JSONObject uploadFile = new JSONObject();
        uploadFile.put("idCardPosition",idCardPosition);
        uploadFile.put("idCardNegative",idCardNegative);
        uploadFile.put("registration",registration);
        uploadFile.put("lowIncome",lowIncome);
        
//     if(idCardPosition.length()==0||idCardNegative.length()==0||registration.length()==0)
//     {
//    	 throw new Exception("請確實上傳檔案");
//     }


//        uploadFile.put("idCardPosition_docId",uploadFileIdCardPosition_docId);
//        uploadFile.put("idCardNegative_docId",uploadFileIdCardNegative_docId);
//        uploadFile.put("registration_docId",uploadFileRegistration_docId);
//        uploadFile.put("lowIncome_docId",uploadFileLowIncome_docId);

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
