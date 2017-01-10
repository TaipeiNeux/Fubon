package com.fubon.flow.impl;

import com.fubon.utils.DBUtils;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 上午 10:15
 * To change this template use File | Settings | File Templates.
 */
public class ApplyOnline5 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        //我要申請最後第5步確認資料的基本欄位
        ProjUtils.setApplyCommitStep5BasicData(queryStringInfo,content,userId,dao);

        //抓關係人的姓名
        String apply2DraftXML = FlowUtils.getDraftData(userId,"apply","apply2",dao);

        //抓apply_online_4的草稿
        String apply4DraftXML = FlowUtils.getDraftData(userId,"apply","apply_online_4",dao);

        Document apply2Doc = DocumentHelper.parseText(apply2DraftXML);
        Document apply4Doc = DocumentHelper.parseText(apply4DraftXML);

        Element apply2Root = apply2Doc.getRootElement();
        String fatherName = apply2Root.element("father_name") != null ? apply2Root.element("father_name").getText() : "";
        String motherName = apply2Root.element("mother_name") != null ? apply2Root.element("mother_name").getText() : "";
        String thirdPartyName = apply2Root.element("thirdParty_name") != null ? apply2Root.element("thirdParty_name").getText() : "";
        String spouseName = apply2Root.element("spouse_name") != null ? apply2Root.element("spouse_name").getText() : "";
        String isGuarantor = apply2Root.element("isGuarantor").getText(); //共四碼，只有0或1，0代表不是，1代表是。例如：0001代表只有配偶是連帶保證人

        String isAdult = content.getString("isAdult");



        String faID = "" , maID = "" , thirdPartID = "",spouseId = "";
        if(apply2Root.element("father_id") != null) faID = apply2Root.element("father_id").getText();
        if(apply2Root.element("mother_id") != null) maID = apply2Root.element("mother_id").getText();
        if(apply2Root.element("thirdParty_id") != null) thirdPartID = apply2Root.element("thirdParty_id").getText();
        if(apply2Root.element("spouse_id") != null) spouseId = apply2Root.element("spouse_id").getText();

        Set<String> nowIdSet = new HashSet<String>();
        for(int i=0;i<isGuarantor.length();i++) {
            String str = isGuarantor.substring(i,i+1);

            //如果是連帶保證人，就看是父/母/監/第三
            if("1".equalsIgnoreCase(str)) {

                if(i <= 2) {

                    if(i == 0) {
                        nowIdSet.add(faID);
                    }
                    else if(i == 1) {
                        nowIdSet.add(maID);
                    }
                    else if(i == 2) {
                        nowIdSet.add(thirdPartID);
                    }

                }
                else {

                    nowIdSet.add(spouseId);
                }


            }

        }

        //取得當下學期
        HashMap<String,String> eduYearInfo = ProjUtils.getEduYearInfo(dao,null);

        //取當下學年跟學期
        String eduYear = eduYearInfo.get("eduYear");
        String semester = eduYearInfo.get("semester");

        String id = content.getString("id").toUpperCase();

        String schoolCode = content.getJSONObject("school").getString("code");
        DataObject schoolInfo = ProjUtils.getSchoolInfo(schoolCode,dao);
        String loanAmt = content.getString("loanAmt");
        String eduStageCode = "";

        //過濾半形逗點
        loanAmt = StringUtils.replace(loanAmt, ",", "");

        SQLCommand query = new SQLCommand("select EduStageCode from SchoolEduStageCode where SchoolType1 = ? and SchoolType2 = ? and SchoolType3 = ?");
        query.addParamValue(content.getJSONObject("school").getString("isNational"));
        query.addParamValue(content.getJSONObject("school").getString("isDay"));
        query.addParamValue(content.getString("EducationStageCode"));
        Vector<DataObject> tmp = new Vector<DataObject>();
        dao.queryByCommand(tmp,query,null,null);

        if(tmp.size() != 0) {
            eduStageCode = tmp.get(0).getValue("EduStageCode");
        }

        DataObject aplyMemberDataObject = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl");
        aplyMemberDataObject.setValue("AplyIdNo",id);
        aplyMemberDataObject.setValue("SchoolCode",schoolInfo.getValue("SchoolCode"));
        aplyMemberDataObject.setValue("LoanAmt",loanAmt);
        aplyMemberDataObject.setValue("eduStageCode",eduStageCode);
        aplyMemberDataObject.setValue("EduYear",eduYear);
        aplyMemberDataObject.setValue("semester",semester);


        ProjUtils.checkSignBill(dao, aplyMemberDataObject, nowIdSet);

        String signBill = "Y".equals(aplyMemberDataObject.getValue("signBill")) ? "Y" : "N";

        //抓4的草稿，取得分行代碼，預約時間
        Element apply4Root = apply4Doc.getRootElement();
        String branchId = apply4Root.element("idSelected").getText();
        String dateSelected = apply4Root.element("dateSelected").getText();
        String timeSelected = apply4Root.element("timeSelected").getText();

        //再放預約分行與時間電話等資料
        Map<String,String> searchMap = new LinkedHashMap<String, String>();
        searchMap.put("b.BranchId",branchId);
        Vector<DataObject> ret = ProjUtils.getBranch(searchMap,dao);
        DataObject branch = ret.get(0);
        content.put("branchName",branch.getValue("BranchName")); // 分行名稱
        content.put("addr",branch.getValue("Addr"));          // 分行地址
        content.put("tel",branch.getValue("Tel"));              // 分行電話
        content.put("dateSelected",dateSelected);
        content.put("timeSelected",timeSelected);

        //配合最後寄發email，要先加下列參數讓前台判斷帶哪些文件
        content.put("aplyName",content.getString("name"));
        content.put("signBill",signBill);
        content.put("fatherName",ProjUtils.toNameMark(fatherName));
        content.put("motherName",ProjUtils.toNameMark(motherName));
        content.put("thirdPartyName",ProjUtils.toNameMark(thirdPartyName));
        content.put("spouseName",ProjUtils.toNameMark(spouseName));
        content.put("appoName",ProjUtils.toNameMark(content.getString("name")));
        content.put("loanPrice",content.getString("loans"));
        content.put("thirdPartyTitleHidden",content.getString("thirdPartyTitle"));
        content.put("applicantAdult",isAdult);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        HttpServletRequest req = queryStringInfo.getRequest();
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(req.getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();
        String apply4DraftXML = FlowUtils.getDraftData(userId, "apply", "apply_online_4", dao);

        Document apply4Doc = DocumentHelper.parseText(apply4DraftXML);
        Element applyOnline4Root = apply4Doc.getRootElement();
        if(applyOnline4Root != null) {

            String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");

            String dateSelected = applyOnline4Root.element("dateSelected").getText();

            String date8 = DateUtil.convertDateTo14(dateSelected).substring(0,8);

            GardenLog.log(GardenLog.DEBUG, "對保分行[時間=" + date8 + "]");

            //如果不是SIT，儲存時要額外檢查是否預約時間是否為例假日
            if (!"sit".equalsIgnoreCase(env)) {
                List<String> noBusinessDays = new ArrayList<String>();
                DBUtils.getNoBusinessDay(date8.substring(0, 4), date8.substring(4, 6), noBusinessDays);

                for(String day : noBusinessDays) {

                    GardenLog.log(GardenLog.DEBUG,"對保分行[假日="+day+"]");

                    day = DateUtil.convertDateTo14(day).substring(0,8);

                    if(day.equalsIgnoreCase(date8)) {

                        GardenLog.log(GardenLog.DEBUG,"對保時間為假日,客戶的：" + date8 + ",Oracle的：" + day);

                        throw new Exception("您所申請的對保時間為假日，請重新挑選對保時間。");
                    }
                }

            }
        }
    }
}
