package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/24
 * Time: 下午 4:04
 * To change this template use File | Settings | File Templates.
 */
/**
 * 我要申請的1-2：申請人基本資料/家庭狀況
 */
public class Apply1_2 implements ILogic {

    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception 
    {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();       

        String birthday = "",marryStatus = "",familyStatusLevel1 = "",familyStatusLevel2 = "" , familyStatusLevel1Text = "", familyStatusLevel2Text = "";

        IDao dao = DaoFactory.getDefaultDao();

        //如果有撥款紀錄就撈已撥款，如果沒有撥款紀錄就撈目前當學年度當學期的資料
        DataObject aplyMemberData = null;
        aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
        if(aplyMemberData == null && ProjUtils.isPayHistory(userId,dao)) 
        {
        	aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);
        }
        
        JSONObject LevelText = new JSONObject();

        //若有草稿過，就拿草稿的來用
        if(draftData != null) {
            Element root = draftData.getRootElement();
            familyStatusLevel1 = root.element("familyStatusLevel1") != null && !root.element("familyStatusLevel1").getText().equals("") ? root.element("familyStatusLevel1").getText() : "0";
            familyStatusLevel2 = root.element("familyStatusLevel2") != null && !root.element("familyStatusLevel2").getText().equals("") ? root.element("familyStatusLevel2").getText() : "1";
            if(root.element("familyStatusLevel1Text") != null) familyStatusLevel1Text = root.element("familyStatusLevel1Text").getText();
            if(root.element("familyStatusLevel2Text") != null) familyStatusLevel2Text = root.element("familyStatusLevel2Text").getText();
        }
        //本學期有申請過案件就撈申請案件；無則撈撥款紀錄，要抓之前的家庭狀況(有可能是空值，因為舊平台轉置時是空的，新平台上線後才有值)
        else if (aplyMemberData != null){
            String familyStatus = aplyMemberData.getValue("FamilyStatus");
            if(StringUtils.isNotEmpty(familyStatus) && familyStatus.length() >= 2) {
                String[] statusArray = familyStatus.split("_");
                familyStatusLevel1 = statusArray.length > 0 ? statusArray[0] : "0";
                familyStatusLevel2 = statusArray.length >= 2 ? statusArray[1] : "1";
            }
        }

        //取得第一步的草稿資料
        String draftXML = FlowUtils.getDraftData(userId,"apply","apply1_1",dao);
        if (draftXML != null) {
            Document step1Doc = DocumentHelper.parseText(draftXML);
            Element step1Root = step1Doc.getRootElement();

            String yearBirthday = step1Root.element("birthday0").getText();
            String monthBirthday = step1Root.element("birthday2").getText();
            String dayBirthday = step1Root.element("birthday4").getText();
            monthBirthday = StringUtils.leftPad(monthBirthday,2,"0");
            dayBirthday = StringUtils.leftPad(dayBirthday,2,"0");
            birthday = yearBirthday + monthBirthday + dayBirthday;
        
            marryStatus = step1Root.element("marryStatus").getText();
        }
        else if (aplyMemberData != null){
        	birthday = aplyMemberData.getValue("AplyBirthday");
        	birthday = ProjUtils.toBirthday(birthday);
            String yearBirthday = birthday.substring(0,3);
            String monthBirthday = birthday.substring(3,5);
            String dayBirthday = birthday.substring(5,7);
            birthday = yearBirthday + monthBirthday + dayBirthday;
            
            marryStatus = ProjUtils.toMarryName(aplyMemberData.getValue("Marriage"));
        }


        birthday = ProjUtils.toYYYYBirthday(birthday);
        boolean isAdult = ProjUtils.isAdult(birthday);
     
        setLevelText(LevelText, marryStatus, familyStatusLevel1, familyStatusLevel2,isAdult);
        familyStatusLevel1Text = LevelText.getString("familyStatusLevel1Text");
        familyStatusLevel2Text = LevelText.getString("familyStatusLevel2Text");
      

        content.put("birthday",ProjUtils.toBirthday(birthday));
        content.put("marryStatus",marryStatus);
        content.put("familyStatusLevel1",familyStatusLevel1);
        content.put("familyStatusLevel2",familyStatusLevel2);
        content.put("familyStatusLevel1Text",familyStatusLevel1Text);
        content.put("familyStatusLevel2Text",familyStatusLevel2Text);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {

    }

    public void setLevelText(JSONObject LevelText, String marryStatus, String familyStatusLevel1, String familyStatusLevel2,boolean isAdult) throws JSONException {
        String familyStatusLevel1Text = "", familyStatusLevel2Text = "";

        GardenLog.log(GardenLog.DEBUG,"marryStatus = " + marryStatus);
        GardenLog.log(GardenLog.DEBUG,"familyStatusLevel1 = " + familyStatusLevel1);
        GardenLog.log(GardenLog.DEBUG,"familyStatusLevel2 = " + familyStatusLevel2);
        GardenLog.log(GardenLog.DEBUG,"isAdult = " + isAdult);


        if(StringUtils.isNotEmpty(familyStatusLevel1) && StringUtils.isNotEmpty(familyStatusLevel2)) {
            if(marryStatus.equalsIgnoreCase("Y")){
                switch (Integer.valueOf(familyStatusLevel1)) {
                    case 1:
                        familyStatusLevel1Text = "配偶為本國人";
                        switch (Integer.valueOf(familyStatusLevel2)) {
                            case 1:
                                familyStatusLevel2Text = "配偶擔任連帶保證人";
                                break;
                            case 2:
                                familyStatusLevel2Text = "父親擔任連帶保證人";
                                break;
                            case 3:
                                familyStatusLevel2Text = "母親擔任連帶保證人";
                                break;
                            case 4:
                                familyStatusLevel2Text = "第三人擔任連帶保證人";
                                break;
                        }
                        break;
                    case 2:
                        familyStatusLevel1Text = "配偶非為本國人";
                        switch (Integer.valueOf(familyStatusLevel2)) {
                            case 1:
                                familyStatusLevel2Text = "父親擔任連帶保證人";
                                break;
                            case 2:
                                familyStatusLevel2Text = "母親擔任連帶保證人";
                                break;
                            case 3:
                                familyStatusLevel2Text = "第三人擔任連帶保證人";
                                break;
                        }
                        break;
                    case 3:
                        familyStatusLevel1Text = "離婚";
                        switch (Integer.valueOf(familyStatusLevel2)) {
                            case 1:
                                familyStatusLevel2Text = "父親擔任連帶保證人";
                                break;
                            case 2:
                                familyStatusLevel2Text = "母親擔任連帶保證人";
                                break;
                            case 3:
                                familyStatusLevel2Text = "第三人擔任連帶保證人";
                                break;
                        }
                        break;
                    case 4:
                        familyStatusLevel1Text = "配偶過世";
                        switch (Integer.valueOf(familyStatusLevel2)) {
                            case 1:
                                familyStatusLevel2Text = "父親擔任連帶保證人";
                                break;
                            case 2:
                                familyStatusLevel2Text = "母親擔任連帶保證人";
                                break;
                            case 3:
                                familyStatusLevel2Text = "第三人擔任連帶保證人";
                                break;
                        }
                        break;
                }
            } else {
                switch (Integer.valueOf(familyStatusLevel1)) {
                    case 1:
                        familyStatusLevel1Text = "父母雙方健在且婚姻關係持續中";

                        switch (Integer.valueOf(familyStatusLevel2)) {
                            case 1:
                                familyStatusLevel2Text = "父母雙方皆擔任連帶保證人";
                                break;
                            case 2:
                            	if(!isAdult)
                                familyStatusLevel2Text = "父親因特殊情形，無法擔任連帶保證人";
                            	else
                            	familyStatusLevel2Text = "父親擔任連帶保證人";
                                break;
                            case 3:
                            	if(!isAdult)
                                familyStatusLevel2Text = "母親因特殊情形，無法擔任連帶保證人";
                            	else                            		
                            	familyStatusLevel2Text = "母親擔任連帶保證人";
                                break;
                            case 4:
                            	if(!isAdult)
                                familyStatusLevel2Text = "非父母之第三人監護";
                            	else
                            	familyStatusLevel2Text = "第三人擔任連帶保證人";
                                break;
                        }
                        
                        break;
                    case 2:
                        familyStatusLevel1Text = "父母離婚";
                        switch (Integer.valueOf(familyStatusLevel2)) {
                            case 1:
                                if(!isAdult)
                                    familyStatusLevel2Text = "父母共同監護";
                                else
                                    familyStatusLevel2Text = "父母雙方皆擔任連帶保證人";
                                break;
                            case 2:
                                if(!isAdult)
                                    familyStatusLevel2Text = "父親監護";
                                else
                                    familyStatusLevel2Text = "父親擔任連帶保證人";
                                break;
                            case 3:
                                if(!isAdult)
                                    familyStatusLevel2Text = "母親監護";
                                else
                                    familyStatusLevel2Text = "母親擔任連帶保證人";
                                break;
                            case 4:
                                if(!isAdult)
                                    familyStatusLevel2Text = "非父母之第三人監護";
                                else
                                    familyStatusLevel2Text = "第三人擔任連帶保證人";
                                break;

                        }
                        break;
                    case 3:
                        familyStatusLevel1Text = "父母一方過世";
                        switch (Integer.valueOf(familyStatusLevel2)) {
                            case 1:
                                familyStatusLevel2Text = "父親擔任連帶保證人";
                                break;
                            case 2:
                                familyStatusLevel2Text = "母親擔任連帶保證人";
                                break;
                            case 3:
                                if(!isAdult)
                                    familyStatusLevel2Text = "非父母之第三人監護";
                                else
                                    familyStatusLevel2Text = "父親健在，第三人擔任連帶保證人";
                                break;
                            case 4:
                                if(isAdult){
                                    familyStatusLevel2Text = "母親健在，第三人擔任連帶保證人";
                                    break;
                                }
                        }
                        break;
                    case 4:
                        familyStatusLevel1Text = "父母雙方過世";
                        break;
                }
            }
        }
       
        LevelText.put("familyStatusLevel1Text", familyStatusLevel1Text);
        LevelText.put("familyStatusLevel2Text", familyStatusLevel2Text);
        
       
    }
}
