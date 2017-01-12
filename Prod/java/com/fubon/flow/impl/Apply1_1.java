package com.fubon.flow.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import com.fubon.mark.MarkBean;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/24
 * Time: 下午 1:23
 * To change this template use File | Settings | File Templates.
 */

import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;

/**
 * 我要申請的1-1：申請人基本資料/基本資料
 */
public class Apply1_1 extends MarkFlow {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String isPopUp = ProjUtils.isPopupPromoDialog(userId,dao) ? "Y" : "N";//此學期是否已經彈跳過
        String isEtabs = ProjUtils.isEtabs(loginUserBean) ? "Y" : "N";//紀錄是否有簽訂線上服務註記
        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N",id = "",name = "",marryStatus = "",cellPhone = "", email = "";
        String domicilePhoneRegionCode = "", domicilePhonePhone = "";
        String telePhoneRegionCode = "", telePhonePhone = "";
        String domicileAddressCityId = "", domicileAddressCityName = "", domicileAddressZipCode = "",domicileAddressZipCodeName = "",domicileAddressLiner = "",domicileAddressNeighborhood = "", domicileAddressAddress = "";
        String teleAddressCityId = "", teleAddressZipCode = "",teleAddressAddress = "";
        String sameAddrHidden = "";

        //2016-07-27 修改生日一個欄位拆成三個欄位
        String yearBirthday = "",monthBirthday = "",dayBirthday = "";
        String birthday = "";//確認頁會用到

        //如果有撥款紀錄就撈已撥款，如果沒有撥款紀錄就撈目前當學年度當學期的資料
        DataObject aplyMemberData = null;
        aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
        if(aplyMemberData == null && ProjUtils.isPayHistory(userId,dao)) {
        	aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);
        }

        //若有草稿就裝到content，沒有才走邏輯判斷
        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("id") != null) id = root.element("id").getText();
            if(root.element("name") != null) name = root.element("name").getText();

            if(root.element("birthday0") != null) yearBirthday = root.element("birthday0").getText();
            if(root.element("birthday2") != null) monthBirthday = root.element("birthday2").getText();
            if(root.element("birthday4") != null) dayBirthday = root.element("birthday4").getText();

            if(root.element("cellPhone") != null) cellPhone = root.element("cellPhone").getText();

            if(root.element("marryStatus") != null) marryStatus = root.element("marryStatus").getText();

            if(root.element("DomicileArea") != null) domicilePhoneRegionCode = root.element("DomicileArea").getText();
            if(root.element("DomicilePhone") != null) domicilePhonePhone = root.element("DomicilePhone").getText();

            if(root.element("areaTelephone") != null) telePhoneRegionCode = root.element("areaTelephone").getText();
            if(root.element("telephone") != null) telePhonePhone = root.element("telephone").getText();

            if(root.element("email") != null) email = root.element("email").getText();

            if(root.element("domicileCityId") != null) domicileAddressCityId = root.element("domicileCityId").getText();
            if(root.element("domicileZipCode") != null) domicileAddressZipCode = root.element("domicileZipCode").getText();
            if(root.element("domicileLiner") != null) domicileAddressLiner = root.element("domicileLiner").getText();
            if(root.element("DomicileNeighborhood") != null) domicileAddressNeighborhood = root.element("DomicileNeighborhood").getText();
            if(root.element("DomicileAddress") != null) domicileAddressAddress = root.element("DomicileAddress").getText();

            if(root.element("cityId") != null) teleAddressCityId = root.element("cityId").getText();
            if(root.element("zipCode") != null) teleAddressZipCode = root.element("zipCode").getText();
            if(root.element("address") != null) teleAddressAddress = root.element("address").getText();

            if(root.element("sameAddrHidden") != null) sameAddrHidden = root.element("sameAddrHidden").getText();
        }
        else if (aplyMemberData != null)
        {
        	//本學期有申請過案件就撈申請案件；無則撈撥款紀錄
        	id = aplyMemberData.getValue("AplyIdNo");
            name = aplyMemberData.getValue("Applicant");
            birthday = aplyMemberData.getValue("AplyBirthday");
            marryStatus = ProjUtils.toMarryName(aplyMemberData.getValue("Marriage"));

            domicilePhoneRegionCode = aplyMemberData.getValue("AplyTelNo1_1");
            domicilePhonePhone = aplyMemberData.getValue("AplyTelNo1_2");
            telePhoneRegionCode = aplyMemberData.getValue("AplyTelNo2_1");
            telePhonePhone = aplyMemberData.getValue("AplyTelNo2_2");
            cellPhone = aplyMemberData.getValue("AplyCellPhoneNo");
            email = aplyMemberData.getValue("AplyEmail");

            String zipCode1 = aplyMemberData.getValue("AplyZip1");
            //用zipcode反查city
            domicileAddressCityId = ProjUtils.toCityId(zipCode1,dao); //縣市別
            domicileAddressZipCode = zipCode1; //戶藉行政區
            domicileAddressLiner = aplyMemberData.getValue("Aply1Village");//戶藉村/里名稱(中文)
//            domicileLinerName = aplyMemberHistoryData.getValue("AplyAddr1_4");
            domicileAddressNeighborhood = aplyMemberData.getValue("AplyAddr1_3");
            domicileAddressAddress = aplyMemberData.getValue("AplyAddr1");
            //domicileAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","1");

            String zipCode2 = aplyMemberData.getValue("AplyZip2");
            //用zipcode反查city
            teleAddressCityId = ProjUtils.toCityId(zipCode2,dao);
            teleAddressZipCode = zipCode2;
//            teleAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","2");
            teleAddressAddress = aplyMemberData.getValue("AplyAddr2");
            
            String applyAddr1 = "", applyAddr2 = "";
        	applyAddr1 += aplyMemberData.getValue("AplyZip1");
        	applyAddr1 += aplyMemberData.getValue("Aply1Village");
        	applyAddr1 += aplyMemberData.getValue("AplyAddr1_3") + "鄰";
        	applyAddr1 += aplyMemberData.getValue("AplyAddr1");
        	
        	applyAddr2 += aplyMemberData.getValue("AplyZip2");
        	applyAddr2 += aplyMemberData.getValue("Aply2Village");
        	applyAddr2 += aplyMemberData.getValue("AplyAddr2_3");
        	applyAddr2 += aplyMemberData.getValue("AplyAddr2");
        	
            sameAddrHidden = !applyAddr1.equals("") && applyAddr1.equals(applyAddr2) ? "Y" : "N";
            
            //DB是西元轉民國
            birthday = ProjUtils.toBirthday(birthday);

            //再拆成三個欄位
            yearBirthday = birthday.substring(0,3);
            monthBirthday = birthday.substring(3,5);
            dayBirthday = birthday.substring(5,7);
        }
        else {
            //取得使用者相關資料
            id = loginUserBean.getCustomizeValue("IdNo");
            name = loginUserBean.getUserName();
            birthday = loginUserBean.getCustomizeValue("AplyBirthday");
            cellPhone = loginUserBean.getCustomizeValue("AplyCellPhoneNo");
            email = loginUserBean.getCustomizeValue("AplyEmail");
            marryStatus = ProjUtils.toMarryName(loginUserBean.getCustomizeValue("Marriage"));

            domicilePhoneRegionCode = loginUserBean.getCustomizeValue("AplyTelNo1_1");
            domicilePhonePhone = loginUserBean.getCustomizeValue("AplyTelNo1_2");
            telePhoneRegionCode = loginUserBean.getCustomizeValue("AplyTelNo2_1");
            telePhonePhone = loginUserBean.getCustomizeValue("AplyTelNo2_2");

            String zipCode1 = loginUserBean.getCustomizeValue("AplyZip1");
            //用zipcode反查city
            domicileAddressCityId = ProjUtils.toCityId(zipCode1,dao); //縣市別
            domicileAddressZipCode = zipCode1; //戶藉行政區
            domicileAddressLiner = loginUserBean.getCustomizeValue("Aply1Village");//戶藉村/里名稱(中文)
            domicileAddressNeighborhood = loginUserBean.getCustomizeValue("AplyAddr1_3");
            domicileAddressAddress = loginUserBean.getCustomizeValue("AplyAddr1");

            String zipCode2 = loginUserBean.getCustomizeValue("AplyZip2");
            //用zipcode反查city
            teleAddressCityId = ProjUtils.toCityId(zipCode2,dao);
            teleAddressZipCode = zipCode2;
            teleAddressAddress = loginUserBean.getCustomizeValue("AplyAddr2");

            String applyAddr1 = "", applyAddr2 = "";
        	applyAddr1 += loginUserBean.getCustomizeValue("AplyZip1");
        	applyAddr1 += loginUserBean.getCustomizeValue("Aply1Village");
        	applyAddr1 += loginUserBean.getCustomizeValue("AplyAddr1_3") + "鄰";
        	applyAddr1 += loginUserBean.getCustomizeValue("AplyAddr1");
        	
        	applyAddr2 += loginUserBean.getCustomizeValue("AplyZip2");
        	applyAddr2 += loginUserBean.getCustomizeValue("Aply2Village");
        	applyAddr2 += loginUserBean.getCustomizeValue("AplyAddr2_3");
        	applyAddr2 += loginUserBean.getCustomizeValue("AplyAddr2");
        	
            sameAddrHidden = !applyAddr1.equals("") && applyAddr1.equals(applyAddr2) ? "Y" : "N";
            
            //DB是西元轉民國
            birthday = ProjUtils.toBirthday(birthday);

            //再拆成三個欄位
            yearBirthday = birthday.substring(0,3);
            monthBirthday = birthday.substring(3,5);
            dayBirthday = birthday.substring(5,7);
        }
        //System.out.println(yearBirthday+monthBirthday+dayBirthday);

        //2016-08-04 added by titan 因為行動電話要改成一律問390，不然舊戶的電話改了後就收不到後續的OTP
        if(aplyMemberData != null) {
            String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
            if(!"sit".equalsIgnoreCase(env)) {
                RQBean rqBean54 = new RQBean();
                rqBean54.setTxId("EB032154");
                rqBean54.addRqParam("CUST_NO",id);

                RSBean rsBean54 = WebServiceAgent.callWebService(rqBean54);

                if(rsBean54.isSuccess()) {
                    Document doc = DocumentHelper.parseText(rsBean54.getTxnString());

                    String mobile = ProjUtils.get032154Col(doc,"8001");

                    //行動電話抓8001
                    if(StringUtils.isNotEmpty(mobile)) {
                        cellPhone = mobile;
                    }

                }
            }
        }

        name = StringEscapeUtils.unescapeHtml4(name);

        //轉成中文
        domicileAddressCityName = ProjUtils.toCityName(domicileAddressCityId,dao);
        domicileAddressZipCodeName = ProjUtils.toZipCodeName(domicileAddressZipCode,dao);

        //2016-07-15 added by titan，當勾選同戶藉時，要把通訊地址改成吃戶藉地址
        GardenLog.log(GardenLog.DEBUG,"sameAddrHidden = " + sameAddrHidden);
        if("Y".equalsIgnoreCase(sameAddrHidden)) {

            GardenLog.log(GardenLog.DEBUG,"domicileAddressCityId = " + domicileAddressCityId);
            GardenLog.log(GardenLog.DEBUG,"domicileAddressZipCode = " + domicileAddressZipCode);
            GardenLog.log(GardenLog.DEBUG,"domicileAddressLiner = " + domicileAddressLiner);
            GardenLog.log(GardenLog.DEBUG,"domicileAddressNeighborhood = " + domicileAddressNeighborhood);
            GardenLog.log(GardenLog.DEBUG,"domicileAddressAddress = " + domicileAddressAddress);


            teleAddressCityId = domicileAddressCityId;
            teleAddressZipCode = domicileAddressZipCode;
//            teleAddressAddress = domicileAddressLiner + domicileAddressNeighborhood + "鄰" + domicileAddressAddress;

            GardenLog.log(GardenLog.DEBUG,"teleAddressCityId = " + teleAddressCityId);
            GardenLog.log(GardenLog.DEBUG,"teleAddressZipCode = " + teleAddressZipCode);
            GardenLog.log(GardenLog.DEBUG,"teleAddressAddress = " + teleAddressAddress);
        }

//        birthday = yearBirthday + monthBirthday + dayBirthday;
       
       
        //隱碼
        if(isMark()) {
            MarkBean markBean = new MarkBean();
            markBean.addCode("id",id,ProjUtils.toIDMark(id));
            id = ProjUtils.toIDMark(id);

            markBean.addCode("name",name,ProjUtils.toNameMark(name));
            name = ProjUtils.toNameMark(name);

            markBean.addCode("DomicilePhone",domicilePhonePhone,ProjUtils.toTelMark(domicilePhonePhone));
            domicilePhonePhone = ProjUtils.toTelMark(domicilePhonePhone);

            markBean.addCode("telephone",telePhonePhone,ProjUtils.toTelMark(telePhonePhone));
            telePhonePhone = ProjUtils.toTelMark(telePhonePhone);

            markBean.addCode("cellPhone",cellPhone,ProjUtils.toTelMark(cellPhone));
            cellPhone = ProjUtils.toTelMark(cellPhone);

            markBean.addCode("email",email,ProjUtils.toEMailMark(email));
            email = ProjUtils.toEMailMark(email);

            markBean.addCode("domicileLiner",domicileAddressLiner,ProjUtils.toAddressAllMark(domicileAddressLiner));
//            domicileAddressLiner = ProjUtils.toAddressAllMark(domicileAddressLiner);

            markBean.addCode("DomicileNeighborhood",domicileAddressNeighborhood,ProjUtils.toAddressAllMark(domicileAddressNeighborhood));
            domicileAddressNeighborhood = ProjUtils.toAddressAllMark(domicileAddressNeighborhood);

            markBean.addCode("DomicileAddress",domicileAddressAddress,ProjUtils.toAddressAllMark(domicileAddressAddress));
            domicileAddressAddress = ProjUtils.toAddressAllMark(domicileAddressAddress);

            markBean.addCode("address",teleAddressAddress,ProjUtils.toAddressAllMark(teleAddressAddress));
            teleAddressAddress = ProjUtils.toAddressAllMark(teleAddressAddress);

            markBean.addCode("birthday4",dayBirthday,dayBirthday.substring(0,1) + "*");            
            dayBirthday = dayBirthday.substring(0,1) + "*";

//            markBean.addCode("birthday",birthday,ProjUtils.toBirthdayMark(birthday));
//            birthday = ProjUtils.toBirthdayMark(birthday);

            queryStringInfo.getRequest().getSession().setAttribute("MarkBean",markBean);
        } 
       // boolean aaa=isMark();
       // System.out.println("$$$$$$$$$$$$$$$$$$"+aaa+","+dayBirthday);
        birthday = yearBirthday + monthBirthday + dayBirthday;
       
        //裝值到content
        content.put("isPopUp",isPopUp);
        content.put("isEtabs",isEtabs);
        content.put("isRecord",isRecord);
        content.put("id",id);
        content.put("name",name);
        content.put("yearBirthday",yearBirthday);
        content.put("monthBirthday",monthBirthday);
        content.put("dayBirthday",dayBirthday);
        content.put("birthday",birthday);
        content.put("marryStatus",marryStatus);
        content.put("sameAddr",sameAddrHidden);
        

        JSONObject domicilePhone = new JSONObject();
        domicilePhone.put("regionCode",domicilePhoneRegionCode);
        domicilePhone.put("phone",domicilePhonePhone);
        content.put("domicilePhone",domicilePhone);

        JSONObject telePhone = new JSONObject();
        telePhone.put("regionCode",telePhoneRegionCode);
        telePhone.put("phone",telePhonePhone);
        content.put("telePhone",telePhone);

        content.put("mobile",cellPhone);
        content.put("email",email);

        JSONObject domicileAddress = new JSONObject();
        domicileAddress.put("cityId",domicileAddressCityId);
        domicileAddress.put("zipCode",domicileAddressZipCode);
        domicileAddress.put("liner",domicileAddressLiner);
        domicileAddress.put("neighborhood",domicileAddressNeighborhood);
        domicileAddress.put("address",domicileAddressAddress);

        domicileAddress.put("cityName",domicileAddressCityName);
        domicileAddress.put("zipCodeName",domicileAddressZipCodeName);

        content.put("domicileAddress",domicileAddress);

        JSONObject teleAddress = new JSONObject();
        teleAddress.put("cityId",teleAddressCityId);
        teleAddress.put("zipCode",teleAddressZipCode);
        teleAddress.put("address",teleAddressAddress);
        content.put("teleAddress",teleAddress);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
    	
    	
    	String draftXML = FlowUtils.toDraftDataXML(queryStringInfo,false);

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();
        
        
    	IDao dao = DaoFactory.getDefaultDao();
    	 DataObject aplyMemberData = null;
         aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
         if(aplyMemberData == null && ProjUtils.isPayHistory(userId,dao)) 
         {
         	aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);
         }
         
         String birthday="";         
         String cbirthday="";
    	//String draftXML = FlowUtils.getDraftData(userId,"apply","apply1_1",dao);
    	 if (draftXML != null) {
             Document step1Doc = DocumentHelper.parseText(draftXML);
             Element step1Root = step1Doc.getRootElement();

             String yearBirthday = step1Root.element("birthday0").getText();
             String monthBirthday = step1Root.element("birthday2").getText();
             String dayBirthday = step1Root.element("birthday4").getText();
             
             //System.out.println("@@@@"+yearBirthday+","+monthBirthday+","+dayBirthday);
             yearBirthday= StringUtils.leftPad(yearBirthday,3,"0");
             monthBirthday = StringUtils.leftPad(monthBirthday,2,"0");
             dayBirthday = StringUtils.leftPad(dayBirthday,2,"0");
             birthday = yearBirthday + monthBirthday + dayBirthday;
             //cbirthday=yearBirthday+"-"+monthBirthday+"-"+dayBirthday;
          
         }
         else if (aplyMemberData != null){
         	birthday = aplyMemberData.getValue("AplyBirthday");
         	birthday = ProjUtils.toBirthday(birthday);
             String yearBirthday = birthday.substring(0,3);
             String monthBirthday = birthday.substring(3,5);
             String dayBirthday = birthday.substring(5,7);
             birthday = yearBirthday + monthBirthday + dayBirthday;
             //cbirthday=yearBirthday+"-"+monthBirthday+"-"+dayBirthday;
           
         }
    	 

    	 cbirthday=ProjUtils.toYYYYBirthday(birthday);
    	
    	  String now = DateUtil.getTodayString();
         
           String b = DateUtil.addDate(now,Calendar.YEAR,-1911);
           b=b.substring(0,8);
           
           
    
       
       	boolean checkdate =Double.parseDouble(b.substring(0,8)) > Double.parseDouble(birthday);
       	
      
    	try {
          	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
  			dateFormat.setLenient(false);
  			if (cbirthday.length() == 8) 
  			{
  				cbirthday = cbirthday.substring(0, 4) + "-" + cbirthday.substring(4, 6) + "-"
  						+ cbirthday.substring(6, 8);
  				 dateFormat.parse(cbirthday.trim());
  			}  			
  			
  		} catch (Exception e) {
  			throw new Exception("生日格式錯誤");
  		}
          
          if(!checkdate)
          {
          	throw new Exception("生日需早於今日");
          }
    }
}
