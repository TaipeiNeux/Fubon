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
import org.json.JSONException;
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
        String lastIncomeTax = "";//上次撥款紀錄的合計所得對象

        //2016-08-14 Steven 檢查本學期有無申請案件
        DataObject aplyMemberYearData = null;
        aplyMemberYearData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);

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
        //本學期有申請過案件
        else if (aplyMemberYearData != null){
            String isFaGuarantor = aplyMemberYearData.getValue("Fa_Guarantor");//父親是否為連帶保證人
            String isMaGuarantor = aplyMemberYearData.getValue("Ma_Guarantor");//母親是否為連帶保證人
            String isGd1Guarantor = aplyMemberYearData.getValue("Gd1_Guarantor");//監護人是否為連帶保證人
            String isPaGuarantor = aplyMemberYearData.getValue("Pa_Guarantor");//是否為連帶保證人
            String isWarGuarantor = aplyMemberYearData.getValue("War_Guarantor");//是否為連帶保證人
            boolean isAdult = ProjUtils.isAdult(aplyMemberYearData.getValue("AplyBirthday"));

            //是否為連帶保證人
            isGuarantor = "";
            if("Y".equalsIgnoreCase(isFaGuarantor)) isGuarantor += "1";
            else isGuarantor += "0";

            if("Y".equalsIgnoreCase(isMaGuarantor)) isGuarantor += "1";
            else isGuarantor += "0";

            if(isAdult && "Y".equalsIgnoreCase(isWarGuarantor)) isGuarantor += "1";
            else if(!isAdult && "Y".equalsIgnoreCase(isGd1Guarantor)) isGuarantor += "1";
            else isGuarantor += "0";

            if("Y".equalsIgnoreCase(isPaGuarantor)) isGuarantor += "1";
            else isGuarantor += "0";

            marryStatus = ProjUtils.toMarryName(aplyMemberYearData.getValue("Marriage"));
            familyStatus = aplyMemberYearData.getValue("FamilyStatus");
            if(StringUtils.isNotEmpty(familyStatus) && familyStatus.length() >= 3) {
                String[] statusArray = familyStatus.split("_");
                familyStatusLevel1 = statusArray[0];
                familyStatusLevel2 = statusArray[1];
            }

            JSONObject clickLevel = new JSONObject();
            clickLevel2Option(clickLevel, familyStatusLevel1, familyStatusLevel2, marryStatus, isAdult);

            familyStatus = clickLevel.getString("familyStatus");
            guarantorStatus = clickLevel.getString("guarantorStatus");
            incomeTax = clickLevel.getString("incomeTax");
            showInfo = familyStatus;

            thirdParty_relationship = aplyMemberYearData.getValue("War_Rel");
            thirdPartyTitle = aplyMemberYearData.getValue("War_Name");

            father_sameAddrHidden = "";
            mother_sameAddrHidden = "";
            thirdParty_sameAddrHidden = "";
            pouse_sameAddrHidden = "";

            father_String = setFamilyString(guarantorStatus, incomeTax, "father");
            mother_String = setFamilyString(guarantorStatus, incomeTax, "mother");
            thirdParty_String = setFamilyString(guarantorStatus, incomeTax, "thirdParty");
            spouse_String = setFamilyString(guarantorStatus, incomeTax, "spouse");

            father_RadioBtn = "";
            mother_RadioBtn = "";
            thirdParty_RadioBtn = "";
            spouse_RadioBtn = "";
            father_checkbox = "";
            mother_checkbox = "";

            relationshipTitle = "";
        }

        //取得第1-1、1-2步的草稿資料

        String draftXML1 = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
        String draftXML2 = FlowUtils.getDraftData(userId, "apply", "apply1_2", dao);

        if(StringUtils.isNotEmpty(draftXML1)) {
            Document step1Doc = DocumentHelper.parseText(draftXML1);
            Element step1Root = step1Doc.getRootElement();

            String yearBirthday = step1Root.element("birthday0").getText();
            String monthBirthday = step1Root.element("birthday2").getText();
            String dayBirthday = step1Root.element("birthday4").getText();
            birthday = yearBirthday + monthBirthday + dayBirthday;


//        if(step1Root.element("birthday") != null) birthday = step1Root.element("birthday").getText();
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

        }
        else if (aplyMemberYearData != null){
            birthday = aplyMemberYearData.getValue("AplyBirthday");
            String yearBirthday = birthday.substring(0,3);
            String monthBirthday = birthday.substring(3,5);
            String dayBirthday = birthday.substring(5,7);
            birthday = yearBirthday + monthBirthday + dayBirthday;

            String zipCode1 = aplyMemberYearData.getValue("AplyZip1");
            domicileAddressCityId = ProjUtils.toCityId(zipCode1,dao); //縣市別
//            domicileLinerName = "";
            domicileAddressZipCode = zipCode1; //戶藉行政區
            domicileAddressLiner = aplyMemberYearData.getValue("Aply1Village");//戶藉村/里名稱(中文)
            domicileAddressNeighborhood = aplyMemberYearData.getValue("AplyAddr1_3");
            domicileAddressAddress = aplyMemberYearData.getValue("AplyAddr1");

            String zipCode2 = aplyMemberYearData.getValue("AplyZip2");
            teleAddressCityId = ProjUtils.toCityId(zipCode2,dao);
            teleAddressZipCode = zipCode2;
            teleAddressAddress = aplyMemberYearData.getValue("AplyAddr2");

            marryStatus = ProjUtils.toMarryName(aplyMemberYearData.getValue("Marriage"));
//            sameAddrHidden = "";
        }

        if(StringUtils.isNotEmpty(draftXML2)) {
            Document step2Doc = DocumentHelper.parseText(draftXML2);

            Element step2Root = step2Doc.getRootElement();


            if(step2Root.element("familyStatus") != null) familyStatus = step2Root.element("familyStatus").getText();
            if(step2Root.element("guarantorStatus") != null) guarantorStatus = step2Root.element("guarantorStatus").getText();

            if(step2Root.element("incomeTaxArr") != null) incomeTax = step2Root.element("incomeTaxArr").getText();
            if(step2Root.element("applicantAdult") != null) applicantAdult = step2Root.element("applicantAdult").getText();

            if(step2Root.element("guarantorText") != null) guarantorText = step2Root.element("guarantorText").getText();
            if(step2Root.element("isSpouseForeignerHidden") != null) isSpouseForeignerHidden = step2Root.element("isSpouseForeignerHidden").getText();

            if(step2Root.element("familyStatusLevel1") != null) familyStatusLevel1 = step2Root.element("familyStatusLevel1").getText();
            if(step2Root.element("familyStatusLevel2") != null) familyStatusLevel2 = step2Root.element("familyStatusLevel2").getText();

        }
        else if (aplyMemberYearData != null){
            boolean isAdult = ProjUtils.isAdult(aplyMemberYearData.getValue("AplyBirthday"));
            marryStatus = ProjUtils.toMarryName(aplyMemberYearData.getValue("Marriage"));
            familyStatus = aplyMemberYearData.getValue("FamilyStatus");
            if(StringUtils.isNotEmpty(familyStatus) && familyStatus.length() >= 3) {
                String[] statusArray = familyStatus.split("_");
                familyStatusLevel1 = statusArray[0];
                familyStatusLevel2 = statusArray[1];
            }
            JSONObject clickLevel = new JSONObject();
            clickLevel2Option(clickLevel, familyStatusLevel1, familyStatusLevel2, marryStatus, isAdult);

            familyStatus = clickLevel.getString("familyStatus");
            guarantorStatus = clickLevel.getString("guarantorStatus");

            incomeTax = clickLevel.getString("incomeTax");
            applicantAdult = isAdult ? "Y" : "N";

            guarantorText = "";
            isSpouseForeignerHidden = "";
        };

        //如果是已撥款帳戶，要比對上次選的跟這次選的家庭狀況是否一致
        DataObject aplyMemberData = null;
        if (aplyMemberYearData != null) {
            aplyMemberData = aplyMemberYearData;
        }
        else if("Y".equalsIgnoreCase(isRecord)) {
            //帶入撥款紀錄
            aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);
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

                if(familyStatusLevel1 != null && familyStatusLevel2 != null) {
                    String currentFamilyStatusVal1 = familyStatusLevel1;
                    String currentFamilyStatusVal2 = familyStatusLevel2;

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
        content.put("lastIncomeTax",lastIncomeTax);

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

    public void clickLevel2Option (JSONObject clickLevel, String familyStatusLevel1, String familyStatusLevel2, String marryStatus, boolean isAdult) throws JSONException {
        String familyStatus = "", guarantorStatus = "", incomeTax = "";
        int level1 = Integer.valueOf(familyStatusLevel1);
        int level2 = Integer.valueOf(familyStatusLevel2);

        if (marryStatus == "N") { //未婚
            if (isAdult == false) { //未成年
                if (level1 == 1) {
                    switch (level2) {
                        case 1:
                            familyStatus = "1100";
                            guarantorStatus = "1100";
                            incomeTax = "1100";
                            break;
                        case 2:
                            familyStatus = "1100";
                            guarantorStatus = "2100";
                            incomeTax = "1100";
                            break;
                        case 3:
                            familyStatus = "1100";
                            guarantorStatus = "1200";
                            incomeTax = "1100";
                            break;
                        case 4:
                            familyStatus = "0010";
                            guarantorStatus = "0010";
                            incomeTax = "0010";
                            break;
                    }
                } else if (level1 == 2) {
                    switch (level2) {
                        case 1:
                            familyStatus = "1100";
                            guarantorStatus = "1100";
                            incomeTax = "1100";
                            break;
                        case 2:
                            familyStatus = "1200";
                            guarantorStatus = "1300";
                            incomeTax = "1000";
                            break;
                        case 3:
                            familyStatus = "2100";
                            guarantorStatus = "3100";
                            incomeTax = "0100";
                            break;
                        case 4:
                            familyStatus = "2210";
                            guarantorStatus = "3310";
                            incomeTax = "0010";
                            break;
                    }
                } else if (level1 == 3) {
                    switch (level2) {
                        case 1:
                            familyStatus = "1000";
                            guarantorStatus = "1000";
                            incomeTax = "1000";
                            break;
                        case 2:
                            familyStatus = "0100";
                            guarantorStatus = "0100";
                            incomeTax = "0100";
                            break;
                        case 3:
                            familyStatus = "0010";
                            guarantorStatus = "0010";
                            incomeTax = "0010";
                            break;
                    }
                } else if (level1 == 4) {
                    familyStatus = "0010";
                    guarantorStatus = "0010";
                    incomeTax = "0010";
                }
            } else if (isAdult == true) { //成年
                if (level1 == 1) {
                    switch (level2) {
                        case 1:
                            familyStatus = "1100"; //checkbox & form 同時出現
                            guarantorStatus = "1100";
                            incomeTax = "1100";
                            break;
                        case 2:
                            familyStatus = "1100";
                            guarantorStatus = "1200";
                            incomeTax = "1100";
                            break;
                        case 3:
                            familyStatus = "1100";
                            guarantorStatus = "2100";
                            incomeTax = "1100";
                            break;
                        case 4:
                            familyStatus = "1110";
                            guarantorStatus = "2210";
                            incomeTax = "1100";
                            break;
                    }
                } else if (level1 == 2) {
                    switch (level2) {
                        case 1:
                            familyStatus = "3300";
                            guarantorStatus = "1100";
                            incomeTax = "0000";
                            break;
                        case 2:
                            familyStatus = "1200";
                            guarantorStatus = "1000";
                            incomeTax = "0000";
                            break;
                        case 3:
                            familyStatus = "2100";
                            guarantorStatus = "0100";
                            incomeTax = "0000";
                            break;
                        case 4:
                            familyStatus = "2210";
                            guarantorStatus = "0010";
                            incomeTax = "0000";
                            break;
                    }
                } else if (level1 == 3) {
                    switch (level2) {
                        case 1:
                            familyStatus = "1000";
                            guarantorStatus = "1000";
                            incomeTax = "1000";
                            break;
                        case 2:
                            familyStatus = "0100";
                            guarantorStatus = "0100";
                            incomeTax = "0100";
                            break;
                        case 3:
                            familyStatus = "1010";
                            guarantorStatus = "2010";
                            incomeTax = "1000";
                            break;
                        case 4:
                            familyStatus = "0110";
                            guarantorStatus = "0210";
                            incomeTax = "0100";
                            break;
                    }
                } else if (level1 == 4) {
                    familyStatus = "0010";
                    guarantorStatus = "0010";
                    incomeTax = "0000";
                }
            }
        } else if (marryStatus == "Y") { //已婚
            if (level1 == 1) {
                switch (level2) {
                    case 1:
                        familyStatus = "0001";
                        guarantorStatus = "0001";
                        incomeTax = "0001";
                        break;
                    case 2:
                        familyStatus = "1001";
                        guarantorStatus = "1000";
                        incomeTax = "0001";
                        break;
                    case 3:
                        familyStatus = "0101";
                        guarantorStatus = "0100";
                        incomeTax = "0001";
                        break;
                    case 4:
                        familyStatus = "0011";
                        guarantorStatus = "0010";
                        incomeTax = "0001";
                        break;
                }
            } else if (level1 == 2) {
                switch (level2) {
                    case 1:
                        familyStatus = "1001";
                        guarantorStatus = "1000";
                        incomeTax = "0001";
                        break;
                    case 2:
                        familyStatus = "0101";
                        guarantorStatus = "0100";
                        incomeTax = "0001";
                        break;
                    case 3:
                        familyStatus = "0011";
                        guarantorStatus = "0010";
                        incomeTax = "0001";
                        break;
                }
            } else if (level1 == 3) {
                switch (level2) {
                    case 1:
                        familyStatus = "1000";
                        guarantorStatus = "1000";
                        incomeTax = "0000";
                        break;
                    case 2:
                        familyStatus = "0100";
                        guarantorStatus = "0100";
                        incomeTax = "0000";
                        break;
                    case 3:
                        familyStatus = "0010";
                        guarantorStatus = "0010";
                        incomeTax = "0000";
                        break;
                }
            } else if (level1 == 4) {
                switch (level2) {
                    case 1:
                        familyStatus = "1000";
                        guarantorStatus = "1000";
                        incomeTax = "0000";
                        break;
                    case 2:
                        familyStatus = "0100";
                        guarantorStatus = "0100";
                        incomeTax = "0000";
                        break;
                    case 3:
                        familyStatus = "0010";
                        guarantorStatus = "0010";
                        incomeTax = "0000";
                        break;
                }
            }
        }

        clickLevel.put("familyStatus", familyStatus);
        clickLevel.put("guarantorStatus", guarantorStatus);
        clickLevel.put("incomeTax", incomeTax);
    }

    public String setFamilyString(String guarantorTag, String incomeTaxTag, String value){
        String[] familyArr = new String[]{"father", "mother", "thirdParty", "spouse"};
        String familyString = "";
        int DivIndex = -1;

        for (int i = 0; i < familyArr.length; i++) {
            if (value.equals(familyArr[i])) {
                DivIndex = i;
                break;
            }
        }

        if(DivIndex>=0){
            int guaCurrentIndex = Integer.valueOf(guarantorTag.substring(DivIndex, DivIndex+1));
            int incomeTaxCurrentIndex = Integer.valueOf(incomeTaxTag.substring(DivIndex, DivIndex+1));

            if (guaCurrentIndex == 0 || guaCurrentIndex == 2) {
                if (incomeTaxCurrentIndex == 1) {
                    familyString = "(為合計所得對象)";
                }
            } else if (guaCurrentIndex == 1) {
                if (incomeTaxCurrentIndex == 0) {
                    familyString = "(為連帶保證人)";
                } else if (incomeTaxCurrentIndex == 1) {
                    familyString = "(為連帶保證人/合計所得對象)";
                }
            } else if (guaCurrentIndex == 3) {
                familyString = "擔任連帶保證人";
            }
        }

        return familyString;
    }
}
