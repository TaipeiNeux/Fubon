package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.flow.BranchsLogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/25
 * Time: 下午 6:54
 * To change this template use File | Settings | File Templates.
 */
public class ApplyBranchLogic implements BranchsLogic {
    @Override
    public String getBranchId(JSPQueryStringInfo queryStringInfo) throws Exception {   	

        if(queryStringInfo != null) {
        	
            LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
            String userId = loginUserBean.getUserId();

            IDao dao = DaoFactory.getDefaultDao();

            //查白名單,1:對保分行，2:線上續貸
            DataObject applyWhiteRecord = DaoFactory.getDefaultDataObject("apply_white_record");
            if(applyWhiteRecord != null) {
                applyWhiteRecord.setValue("AplyIdNo",userId);
               
                if(dao.querySingle(applyWhiteRecord,null)) {

                    //判斷今日是否落在起迄日
                    String today = DateUtil.getTodayString();
                    String startDate = applyWhiteRecord.getValue("StartDate");
                    String endDate = applyWhiteRecord.getValue("EndDate");

                    startDate = DateUtil.convertDateTo14(startDate);
                    endDate = DateUtil.convertDateTo14(endDate);

                    if(Long.parseLong(startDate) <= Long.parseLong(today) && Long.parseLong(endDate) >= Long.parseLong(today)) {
                        String type = applyWhiteRecord.getValue("Type");
                        if("1".equalsIgnoreCase(type)) return "online_branch";
                        else if("2".equalsIgnoreCase(type)) return "document_branch";
                    }


                }
            }           

            //如果沒有在白名單內，就依照撥款紀錄規則判斷
            String draftXML2 = FlowUtils.getDraftData(userId,"apply","apply2",dao);
            String draftXML3_1 = FlowUtils.getDraftData(userId,"apply","apply3_1",dao);
            
           
            String studentEducationStage = "";//教育階段
            String studentIsNational = "";//公立私立
            String studentName = "";//學校名稱
            String loanAmt = "";//總申貸額度
            String faID = "" , maID = "" , thirdPartID = "",spouseId = "";
            String isGuarantor="";
            
           // aplyMemberDataObject_Guarantor.setValue("AplyNo",aplyMemberDataObject.getValue("AplyNo"));
            		
            DataObject aplyMemberDataObject = ProjUtils.getAplyMemberTuitionLoanData(userId,null,dao);  
            
            if(draftXML2!=null)
            {
            Document draftDoc2 = DocumentHelper.parseText(draftXML2);
            Element draftRoot2 = draftDoc2.getRootElement();
            if(draftRoot2.element("isGuarantor") != null) isGuarantor = draftRoot2.element("isGuarantor").getText(); //共四碼，只有0或1，0代表不是，1代表是。例如：0001代表只有配偶是連帶保證人
            if(draftRoot2.element("father_id") != null) faID = draftRoot2.element("father_id").getText();
            if(draftRoot2.element("mother_id") != null) maID = draftRoot2.element("mother_id").getText();
            if(draftRoot2.element("thirdParty_id") != null) thirdPartID = draftRoot2.element("thirdParty_id").getText();
            if(draftRoot2.element("spouse_id") != null) spouseId = draftRoot2.element("spouse_id").getText();
           
            }
            else 
            {
            	if(aplyMemberDataObject!=null)
            	{
            	 DataObject aplyMemberDataObject_Guarantor = ProjUtils.getAplyMemberTuitionLoanData_Guarantor(aplyMemberDataObject.getValue("AplyNo"),null,dao);  
            	String Fa_Guarantor=aplyMemberDataObject_Guarantor.getValue("Fa_Guarantor");
            	 Fa_Guarantor =Fa_Guarantor.equalsIgnoreCase("Y") ? "1":"0";
            	String Ma_Guarantor=aplyMemberDataObject_Guarantor.getValue("Ma_Guarantor");
            	Ma_Guarantor =Ma_Guarantor.equalsIgnoreCase("Y") ? "1":"0";
            	String Gd1_Guarantor=aplyMemberDataObject_Guarantor.getValue("Gd1_Guarantor");
            	Gd1_Guarantor =Gd1_Guarantor.equalsIgnoreCase("Y") ? "1":"0";
            	String Pa_Guarantor=aplyMemberDataObject_Guarantor.getValue("Pa_Guarantor");
            	Pa_Guarantor =Pa_Guarantor.equalsIgnoreCase("Y") ? "1":"0";
            	isGuarantor=Fa_Guarantor+Ma_Guarantor+Gd1_Guarantor+Pa_Guarantor;
            	
            	
            	faID=aplyMemberDataObject.getValue("Fa_IdNo");
            	maID=aplyMemberDataObject.getValue("Ma_IdNo");
            	thirdPartID=aplyMemberDataObject.getValue("Gd1_IdNo");
            	spouseId=aplyMemberDataObject.getValue("Pa_IdNo");
            	}
            	
            }
      
            
            
            if(draftXML3_1!=null)
            {
            Document draftDoc3_1 = DocumentHelper.parseText(draftXML3_1);
           
            Element draftRoot3_1 = draftDoc3_1.getRootElement();
            if(draftRoot3_1.element("student_educationStage") != null) studentEducationStage = draftRoot3_1.element("student_educationStage").getText();

            //(2)同一學校:「學校名稱｣之公/私立跟學校值須與前次申請案件相同。
          
            if(draftRoot3_1.element("student_isNational") != null) studentIsNational = draftRoot3_1.element("student_isNational").getText();
            if(draftRoot3_1.element("student_name") != null) studentName = draftRoot3_1.element("student_name").getText();
            if(draftRoot3_1.element("loanAmt") != null) loanAmt = draftRoot3_1.element("loanAmt").getText();
           
            }
            else if(aplyMemberDataObject!=null)
            {     	        
                
            	studentEducationStage=aplyMemberDataObject.getValue("SchoolType3");
            	studentIsNational=aplyMemberDataObject.getValue("SchoolType1");
            	studentName=aplyMemberDataObject.getValue("SchoolCode");
            	loanAmt=aplyMemberDataObject.getValue("LoanAmt");
            }
           
            //先查撥款紀錄
            DataObject aplyMemberHistory = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);

            //開始判斷是否與上一次案件填寫的都一樣
            if(aplyMemberHistory != null) {
                //(1)同一學程:「教育階段｣欄位值須與前次申請案件相同。
            
                //過濾半形逗點
                loanAmt = StringUtils.replace(loanAmt,",","");

                //(3)同一連帶保證人：連帶保證人之人數與身分證字號需與前次相同。             

                //(4)有簽訂網路服務契約註記：判斷於e化管理網或etabs有註記者。發電文：032282
                String isEtabs = ProjUtils.isEtabs(loginUserBean) ? "Y" : "N";

                GardenLog.log(GardenLog.DEBUG, "isGuarantor = " + isGuarantor);
                GardenLog.log(GardenLog.DEBUG, "faID = " + faID);
                GardenLog.log(GardenLog.DEBUG, "maID = " + maID);
                GardenLog.log(GardenLog.DEBUG, "thirdPartID = " + thirdPartID);
                GardenLog.log(GardenLog.DEBUG, "spouseId = " + spouseId);
                GardenLog.log(GardenLog.DEBUG, "isEtabs = " + isEtabs);
                GardenLog.log(GardenLog.DEBUG, "studentEducationStage = " + studentEducationStage);
                GardenLog.log(GardenLog.DEBUG, "studentIsNational = " + studentIsNational);
                GardenLog.log(GardenLog.DEBUG, "studentName = " + studentName);

                //先判斷1、2、4
                if("Y".equalsIgnoreCase(isEtabs) && StringUtils.isNotEmpty(studentEducationStage) && StringUtils.isNotEmpty(studentIsNational) && StringUtils.isNotEmpty(studentName)) {
                    String historyEduStageCode = aplyMemberHistory.getValue("schoolType3"); //之前的教育階段
                    String historySchoolType1 = aplyMemberHistory.getValue("schoolType1"); //之前的公立/私立
                    String historySchoolCode = aplyMemberHistory.getValue("schoolCode"); //之前的學校代碼
//                    String historyFaIdNo = aplyMemberHistory.getValue("Fa_IdNo"); //之前的父親id
//                    String historyMaIdNo = aplyMemberHistory.getValue("Ma_IdNo"); //之前的母親id
//                    String historyGd1IdNo = aplyMemberHistory.getValue("Gd1_IdNo"); //之前的監護人id
//                    String historyPaId = aplyMemberHistory.getValue("Pa_IdNo"); //之前的配偶id


                    GardenLog.log(GardenLog.DEBUG, "historyEduStageCode = " + historyEduStageCode);
                    GardenLog.log(GardenLog.DEBUG, "historySchoolType1 = " + historySchoolType1);
                    GardenLog.log(GardenLog.DEBUG, "historySchoolCode = " + historySchoolCode);
//                    GardenLog.log(GardenLog.DEBUG, "historyFaIdNo = " + historyFaIdNo);
//                    GardenLog.log(GardenLog.DEBUG, "historyMaIdNo = " + historyMaIdNo);
//                    GardenLog.log(GardenLog.DEBUG, "historyGd1IdNo = " + historyGd1IdNo);
//                    GardenLog.log(GardenLog.DEBUG, "historyPaId = " + historyPaId);

                    if(studentEducationStage.equalsIgnoreCase(historyEduStageCode)
                            && studentIsNational.equalsIgnoreCase(historySchoolType1)
                            && studentName.equalsIgnoreCase(historySchoolCode)) {
                        //再判斷3

                        //先抓這次跟之前的保證人數量
                        Set<String> nowIdSet = new HashSet<String>();
                        for(int i=0;i<isGuarantor.length();i++) {
                            String str = isGuarantor.substring(i,i+1);

                            GardenLog.log(GardenLog.DEBUG,"check isGuarantor = ("+i+")" + str);

                            //如果是連帶保證人，就看是父/母/監/第三
                            if("1".equalsIgnoreCase(str)) {
                                if(i == 0) nowIdSet.add(faID);
                                else if(i == 1) nowIdSet.add(maID);
                                else if(i == 2) nowIdSet.add(thirdPartID);
                                else if(i == 3) nowIdSet.add(spouseId);
                            }

                        }
//                        String[] now = new String[]{faID,maID,thirdPartID,spouseId};
//                        String[] history = new String[]{historyFaIdNo,historyMaIdNo,historyGd1IdNo,historyPaId};

                        HashMap<String,String> signHM = ProjUtils.getSignData(dao,userId, studentName, loanAmt, studentEducationStage);
                        String loanAcct = signHM.get("signLoanAcct");
                        String yearTerm = signHM.get("signYearTerm");

                        if(ProjUtils.isRelMatch(nowIdSet, loanAcct, yearTerm)) {
                            return "document_branch";
                        }

//                        //計算數量
//                        int nowCount = 0;
//                        int historyCount = 0;
//                        for(String t : now) {
//                            if(StringUtils.isNotEmpty(t)) nowCount ++;
//                        }
//
//                        for(String t : history) {
//                            if(StringUtils.isNotEmpty(t)) historyCount ++;
//                        }
//
//
//                        GardenLog.log(GardenLog.DEBUG, "nowCount = " + nowCount);
//                        GardenLog.log(GardenLog.DEBUG, "historyCount = " + historyCount);
//
//                        //如果數量都一樣，再來比ID
//                        if(nowCount == historyCount) {
//                            boolean isMatch = true;
//                            for(int i=0;i<now.length;i++) {
//                                String id = now[i];
//                                if(StringUtils.isNotEmpty(id)) {
//
//                                    GardenLog.log(GardenLog.DEBUG, "history[i] = " + history[i]);
//
//                                    if(!id.equalsIgnoreCase(history[i])) isMatch = false;
//                                }
//                            }
//
//                            if(isMatch) {
//                                 return "document_branch";
//                            }
//                        }
                    }
                }
            }

        }



        //預設對保分行
        return "online_branch";
    }
}
