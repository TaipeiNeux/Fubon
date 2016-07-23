package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import java.util.HashSet;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/24
 * Time: 下午 4:25
 * To change this template use File | Settings | File Templates.
 */
public class Apply2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String familyStatus = "",guarantorStatus = "",marryStatus = "",incomeTax = "",applicantAdult = "",isGuarantor = "",showInfo = "",familyStatusLevel1 = "",familyStatusLevel2 = "";
        String birthday = "",domicileAddressCityId = "", domicileAddressZipCode = "",domicileLinerName = "",domicileAddressLiner = "",domicileAddressNeighborhood = "", domicileAddressAddress = "";
        String teleAddressCityId = "", teleAddressZipCode = "",teleAddressAddress = "";
        String sameAddrHidden = "";

        String relationshipTitle = "";

        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N";
        String isChanged = "Y";
        String guarantorText = "";
        String thirdParty_relationship = "" , thirdPartyTitle = "";

        String father_sameAddrHidden = "" , mother_sameAddrHidden = "",thirdParty_sameAddrHidden = "",pouse_sameAddrHidden = "";

        String father_RadioBtn = "" , mother_RadioBtn = "" ,thirdParty_RadioBtn = "" , spouse_RadioBtn = "", father_checkbox = "", mother_checkbox = "";

        String isSpouseForeignerHidden = "";

        String father_String = "", mother_String = "",thirdParty_String = "",spouse_String = "";

        String lastIsGuarantor = "";//上次撥款紀錄中的保人(4碼)

        //若有草稿過，就拿草稿的來用
        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("familyStatus") != null) familyStatus = root.element("familyStatus").getText();
            if(root.element("guarantorStatus") != null) guarantorStatus = root.element("guarantorStatus").getText();
            if(root.element("isGuarantor") != null) isGuarantor = root.element("isGuarantor").getText();
            if(root.element("showInfo") != null) showInfo = root.element("showInfo").getText();
            if(root.element("thirdParty_relationship") != null) thirdParty_relationship = root.element("thirdParty_relationship").getText();
            if(root.element("thirdPartyTitle") != null) thirdPartyTitle = root.element("thirdPartyTitle").getText();

            if(root.element("father_sameAddrHidden") != null) father_sameAddrHidden = root.element("father_sameAddrHidden").getText();
            if(root.element("mother_sameAddrHidden") != null) mother_sameAddrHidden = root.element("mother_sameAddrHidden").getText();
            if(root.element("thirdParty_sameAddrHidden") != null) thirdParty_sameAddrHidden = root.element("thirdParty_sameAddrHidden").getText();
            if(root.element("pouse_sameAddrHidden") != null) pouse_sameAddrHidden = root.element("pouse_sameAddrHidden").getText();

            if(root.element("father_String") != null) father_String = root.element("father_String").getText();
            if(root.element("mother_String") != null) mother_String = root.element("mother_String").getText();
            if(root.element("thirdParty_String") != null) thirdParty_String = root.element("thirdParty_String").getText();
            if(root.element("spouse_String") != null) spouse_String = root.element("spouse_String").getText();

            if(root.element("father_RadioBtn") != null) father_RadioBtn = root.element("father_RadioBtn").getText();
            if(root.element("mother_RadioBtn") != null) mother_RadioBtn = root.element("mother_RadioBtn").getText();
            if(root.element("thirdParty_RadioBtn") != null) thirdParty_RadioBtn = root.element("thirdParty_RadioBtn").getText();
            if(root.element("spouse_RadioBtn") != null) spouse_RadioBtn = root.element("spouse_RadioBtn").getText();
            if(root.element("father_checkbox") != null) father_checkbox = root.element("father_checkbox").getText();
            if(root.element("mother_checkbox") != null) mother_checkbox = root.element("mother_checkbox").getText();

            if(root.element("relationshipTitle") != null) relationshipTitle = root.element("relationshipTitle").getText();
        }

        //取得第1-1、1-2步的草稿資料

        String draftXML1 = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
        String draftXML2 = FlowUtils.getDraftData(userId, "apply", "apply1_2", dao);

        Document step1Doc = DocumentHelper.parseText(draftXML1);
        Document step2Doc = DocumentHelper.parseText(draftXML2);
        Element step1Root = step1Doc.getRootElement();
        Element step2Root = step2Doc.getRootElement();


        if(step1Root.element("birthday") != null) birthday = step1Root.element("birthday").getText();
        if(step1Root.element("domicileCityId") != null) domicileAddressCityId = step1Root.element("domicileCityId").getText();
        if(step1Root.element("domicileZipCode") != null) domicileAddressZipCode = step1Root.element("domicileZipCode").getText();
        if(step1Root.element("domicileLinerName") != null) domicileLinerName = step1Root.element("domicileLinerName").getText();
        if(step1Root.element("domicileLiner") != null) domicileAddressLiner = step1Root.element("domicileLiner").getText();
        if(step1Root.element("DomicileNeighborhood") != null) domicileAddressNeighborhood = step1Root.element("DomicileNeighborhood").getText();
        if(step1Root.element("DomicileAddress") != null) domicileAddressAddress = step1Root.element("DomicileAddress").getText();

        if(step1Root.element("cityId") != null) teleAddressCityId = step1Root.element("cityId").getText();
        if(step1Root.element("zipCode") != null) teleAddressZipCode = step1Root.element("zipCode").getText();

        if(step1Root.element("address") != null) teleAddressAddress = step1Root.element("address").getText();

        if(step1Root.element("marryStatus") != null) marryStatus = step1Root.element("marryStatus").getText();
        if(step1Root.element("sameAddrHidden") != null) sameAddrHidden = step1Root.element("sameAddrHidden").getText();

        if(step2Root.element("familyStatus") != null) familyStatus = step2Root.element("familyStatus").getText();
        if(step2Root.element("guarantorStatus") != null) guarantorStatus = step2Root.element("guarantorStatus").getText();

        if(step2Root.element("incomeTaxArr") != null) incomeTax = step2Root.element("incomeTaxArr").getText();
        if(step2Root.element("applicantAdult") != null) applicantAdult = step2Root.element("applicantAdult").getText();

        if(step2Root.element("guarantorText") != null) guarantorText = step2Root.element("guarantorText").getText();
        if(step2Root.element("isSpouseForeignerHidden") != null) isSpouseForeignerHidden = step2Root.element("isSpouseForeignerHidden").getText();

        if(step2Root.element("familyStatusLevel1") != null) familyStatusLevel1 = step2Root.element("familyStatusLevel1").getText();
        if(step2Root.element("familyStatusLevel2") != null) familyStatusLevel2 = step2Root.element("familyStatusLevel2").getText();

        //如果是已撥款帳戶，要比對上次選的跟這次選的家庭狀況是否一致
        DataObject aplyMemberData = null;
        if("Y".equalsIgnoreCase(isRecord)) {
            //帶入撥款紀錄
            aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);
        }
        else {
            //先取得「本學期」申請資料
//            aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
        }


        if(aplyMemberData != null) {

            //抓上次撥款的保人紀錄轉成4碼
            Set<String> set = new HashSet<String>();

            String res1Rel = aplyMemberData.getValue("Res1_Rel");
            String res2Rel = aplyMemberData.getValue("Res2_Rel");
            String res3Rel = aplyMemberData.getValue("Res3_Rel");
            String warRel = aplyMemberData.getValue("War_Rel");

            set.add(res1Rel);
            set.add(res2Rel);
            set.add(res3Rel);
            set.add(warRel);

            boolean isAdult = ProjUtils.isAdult(aplyMemberData.getValue("AplyBirthday"));
            lastIsGuarantor += set.contains("fa") ? "1" : "0";
            lastIsGuarantor += set.contains("ma") ? "1" : "0";
            if(!isAdult && set.contains("gd1")) {
                lastIsGuarantor += "1";
            }
            else if(isAdult && StringUtils.isNotEmpty(warRel) && !"1A".equalsIgnoreCase(warRel)) {
                lastIsGuarantor += "1";
            }
            else {
                lastIsGuarantor += "0";
            }

            lastIsGuarantor += set.contains("1A") ? "1" : "0";

            String familyStatusVal = aplyMemberData.getValue("FamilyStatus");
            if(StringUtils.isNotEmpty(familyStatusVal) && familyStatusVal.length() >= 3) {
                String[] statusArray = familyStatusVal.split("_");

                String historyFamilyStatus1 = statusArray[0];
                String historyFamilyStatus2 = statusArray[1];

                if(step2Root.element("familyStatusLevel1") != null && step2Root.element("familyStatusLevel2") != null) {
                    String currentFamilyStatusVal1 = step2Root.element("familyStatusLevel1").getText();
                    String currentFamilyStatusVal2 = step2Root.element("familyStatusLevel2").getText();

                    //判斷這次選的家庭狀況跟歷史是否一樣
                    if(historyFamilyStatus1.equalsIgnoreCase(currentFamilyStatusVal1) &&
                            historyFamilyStatus2.equalsIgnoreCase(currentFamilyStatusVal2) ) {
                        isChanged = "N";
                    }
                }
            }
        }

        //2016-07-15 added by titan，當勾選同戶藉時，要把通訊地址改成吃戶藉地址
        GardenLog.log(GardenLog.DEBUG, "sameAddrHidden = " + sameAddrHidden);
        if("Y".equalsIgnoreCase(sameAddrHidden)) {

            GardenLog.log(GardenLog.DEBUG,"domicileAddressCityId = " + domicileAddressCityId);
            GardenLog.log(GardenLog.DEBUG,"domicileAddressZipCode = " + domicileAddressZipCode);
            GardenLog.log(GardenLog.DEBUG,"domicileAddressLiner = " + domicileAddressLiner);
            GardenLog.log(GardenLog.DEBUG,"domicileAddressNeighborhood = " + domicileAddressNeighborhood);
            GardenLog.log(GardenLog.DEBUG,"domicileAddressAddress = " + domicileAddressAddress);


            teleAddressCityId = domicileAddressCityId;
            teleAddressZipCode = domicileAddressZipCode;
            teleAddressAddress = domicileAddressLiner + domicileAddressNeighborhood + "鄰" + domicileAddressAddress;

            GardenLog.log(GardenLog.DEBUG,"teleAddressCityId = " + teleAddressCityId);
            GardenLog.log(GardenLog.DEBUG,"teleAddressZipCode = " + teleAddressZipCode);
            GardenLog.log(GardenLog.DEBUG,"teleAddressAddress = " + teleAddressAddress);
        }


        content.put("isRecord",isRecord);
        content.put("user_birthday",birthday);
        content.put("familyStatus",familyStatus);
        content.put("guarantorStatus",guarantorStatus);
        content.put("incomeTax",incomeTax);
        content.put("isAdult",applicantAdult);
        content.put("isChanged",isChanged);
        content.put("isGuarantor",isGuarantor);
        content.put("showInfo",showInfo);
        content.put("guarantorText",guarantorText);
        content.put("marryStatus",marryStatus);
        content.put("relationship",thirdParty_relationship);
        content.put("thirdPartyTitle",thirdPartyTitle);
        content.put("lastIsGuarantor",lastIsGuarantor);

        content.put("familyStatusLevel1",familyStatusLevel1);
        content.put("familyStatusLevel2",familyStatusLevel2);

        content.put("isSpouseForeignerHidden",isSpouseForeignerHidden);

        content.put("father_sameAddr",father_sameAddrHidden);
        content.put("mother_sameAddr",mother_sameAddrHidden);
        content.put("thirdParty_sameAddr",thirdParty_sameAddrHidden);
        content.put("spouse_sameAddr",pouse_sameAddrHidden);

        content.put("father_String",father_String);
        content.put("mother_String",mother_String);
        content.put("thirdParty_String",thirdParty_String);
        content.put("spouse_String",spouse_String);

        content.put("father_RadioBtn",father_RadioBtn);
        content.put("mother_RadioBtn",mother_RadioBtn);
        content.put("thirdParty_RadioBtn",thirdParty_RadioBtn);
        content.put("spouse_RadioBtn",spouse_RadioBtn);
        content.put("father_checkbox",father_checkbox);
        content.put("mother_checkbox",mother_checkbox);
        content.put("relationshipTitle",relationshipTitle);

        JSONObject domicileAddress = new JSONObject();
        domicileAddress.put("cityId",domicileAddressCityId);
        domicileAddress.put("zipCode",domicileAddressZipCode);
//        domicileAddress.put("linerName",domicileLinerName);
        domicileAddress.put("liner",domicileAddressLiner);
        domicileAddress.put("neighborhood",domicileAddressNeighborhood);
        domicileAddress.put("address",domicileAddressAddress);
        content.put("domicileAddress",domicileAddress);

        JSONObject teleAddress = new JSONObject();
        teleAddress.put("cityId",teleAddressCityId);
        teleAddress.put("zipCode",teleAddressZipCode);
//        teleAddress.put("linerName",linerName);
//        teleAddress.put("liner",teleAddressLiner);
//        teleAddress.put("neighborhood",teleAddressNeighborhood);
        teleAddress.put("address",teleAddressAddress);
        content.put("teleAddress",teleAddress);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
