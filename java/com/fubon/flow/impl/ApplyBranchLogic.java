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

            Document draftDoc2 = DocumentHelper.parseText(draftXML2);
            Document draftDoc3_1 = DocumentHelper.parseText(draftXML3_1);

            Element draftRoot2 = draftDoc2.getRootElement();
            Element draftRoot3_1 = draftDoc3_1.getRootElement();

            //先查撥款紀錄
            DataObject aplyMemberHistory = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);

            //開始判斷是否與上一次案件填寫的都一樣
            if(aplyMemberHistory != null) {
                //(1)同一學程:「教育階段｣欄位值須與前次申請案件相同。
                String studentEducationStage = "";//教育階段

                if(draftRoot3_1.element("student_educationStage") != null) studentEducationStage = draftRoot3_1.element("student_educationStage").getText();

                //(2)同一學校:「學校名稱｣之公/私立跟學校值須與前次申請案件相同。
                String studentIsNational = "";//公立私立
                String studentName = "";//學校名稱

                if(draftRoot3_1.element("student_isNational") != null) studentIsNational = draftRoot3_1.element("student_isNational").getText();
                if(draftRoot3_1.element("student_name") != null) studentName = draftRoot3_1.element("student_name").getText();


                //(3)同一連帶保證人：連帶保證人之人數與身分證字號需與前次相同。
                String faID = "" , maID = "" , thirdPartID = "",spouseId = "";
                if(draftRoot2.element("father_id") != null) faID = draftRoot2.element("father_id").getText();
                if(draftRoot2.element("mother_id") != null) maID = draftRoot2.element("mother_id").getText();
                if(draftRoot2.element("thirdParty_id") != null) thirdPartID = draftRoot2.element("thirdParty_id").getText();
                if(draftRoot2.element("spouse_id") != null) spouseId = draftRoot2.element("spouse_id").getText();

                //(4)有簽訂網路服務契約註記：判斷於e化管理網或etabs有註記者。發電文：032282
                String isEtabs = ProjUtils.isEtabs(loginUserBean) ? "Y" : "N";

                GardenLog.log(GardenLog.DEBUG, "isEtabs = " + isEtabs);
                GardenLog.log(GardenLog.DEBUG, "studentEducationStage = " + studentEducationStage);
                GardenLog.log(GardenLog.DEBUG, "studentIsNational = " + studentIsNational);
                GardenLog.log(GardenLog.DEBUG, "studentName = " + studentName);

                //先判斷1、2、4
                if("Y".equalsIgnoreCase(isEtabs) && StringUtils.isNotEmpty(studentEducationStage) && StringUtils.isNotEmpty(studentIsNational) && StringUtils.isNotEmpty(studentName)) {
                    String historyEduStageCode = aplyMemberHistory.getValue("schoolType3"); //之前的教育階段
                    String historySchoolType1 = aplyMemberHistory.getValue("schoolType1"); //之前的公立/私立
                    String historySchoolCode = aplyMemberHistory.getValue("schoolCode"); //之前的學校代碼
                    String historyFaIdNo = aplyMemberHistory.getValue("Fa_IdNo"); //之前的父親id
                    String historyMaIdNo = aplyMemberHistory.getValue("Ma_IdNo"); //之前的母親id
                    String historyGd1IdNo = aplyMemberHistory.getValue("Gd1_IdNo"); //之前的監護人id
                    String historyPaId = aplyMemberHistory.getValue("Pa_IdNo"); //之前的配偶id


                    GardenLog.log(GardenLog.DEBUG, "historyEduStageCode = " + historyEduStageCode);
                    GardenLog.log(GardenLog.DEBUG, "historySchoolType1 = " + historySchoolType1);
                    GardenLog.log(GardenLog.DEBUG, "historySchoolCode = " + historySchoolCode);
                    GardenLog.log(GardenLog.DEBUG, "historyFaIdNo = " + historyFaIdNo);
                    GardenLog.log(GardenLog.DEBUG, "historyMaIdNo = " + historyMaIdNo);
                    GardenLog.log(GardenLog.DEBUG, "historyGd1IdNo = " + historyGd1IdNo);
                    GardenLog.log(GardenLog.DEBUG, "historyPaId = " + historyPaId);

                    if(studentEducationStage.equalsIgnoreCase(historyEduStageCode)
                            && studentIsNational.equalsIgnoreCase(historySchoolType1)
                            && studentName.equalsIgnoreCase(historySchoolCode)) {
                        //再判斷3

                        //先抓這次跟之前的申請人數量
                        String[] now = new String[]{faID,maID,thirdPartID,spouseId};
                        String[] history = new String[]{historyFaIdNo,historyMaIdNo,historyGd1IdNo,historyPaId};

                        //計算數量
                        int nowCount = 0;
                        int historyCount = 0;
                        for(String t : now) {
                            if(StringUtils.isNotEmpty(t)) nowCount ++;
                        }

                        for(String t : history) {
                            if(StringUtils.isNotEmpty(t)) historyCount ++;
                        }


                        GardenLog.log(GardenLog.DEBUG, "nowCount = " + nowCount);
                        GardenLog.log(GardenLog.DEBUG, "historyCount = " + historyCount);

                        //如果數量都一樣，再來比ID
                        if(nowCount == historyCount) {
                            boolean isMatch = true;
                            for(int i=0;i<now.length;i++) {
                                String id = now[i];
                                if(StringUtils.isNotEmpty(id)) {

                                    GardenLog.log(GardenLog.DEBUG, "history[i] = " + history[i]);

                                    if(!id.equalsIgnoreCase(history[i])) isMatch = false;
                                }
                            }

                            if(isMatch) {
                                 return "document_branch";
                            }
                        }
                    }
                }
            }

        }



        //預設對保分行
        return "online_branch";
    }
}
