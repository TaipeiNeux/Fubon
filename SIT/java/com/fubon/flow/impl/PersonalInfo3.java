package com.fubon.flow.impl;

import com.fubon.utils.MessageUtils;
import com.fubon.utils.bean.MailBean;
import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/30
 * Time: 下午 11:17
 * To change this template use File | Settings | File Templates.
 */
public class PersonalInfo3 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String today = DateUtil.getTodayString();
        today = DateUtil.convert14ToDate("yyyy/MM/dd HH:mm:ss",today);

        String errorCode = "" , errorMsg = "";
        String registerResult = "fail", registerDate = today.substring(0,10), registerTime = today.substring(11);

        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N",id = "",name = "",marryStatus = "",cellPhone = "", email = "";
        String domicilePhoneRegionCode = "", domicilePhonePhone = "";
        String telePhoneRegionCode = "", telePhonePhone = "";
        String domicileAddressCityId = "", domicileAddressZipCode = "",domicileLinerName = "",domicileAddressLiner = "",domicileAddressNeighborhood = "", domicileAddressAddress = "";
        String teleAddressCityId = "", teleAddressZipCode = "", teleAddressAddress = "";

        //生日改為三個輸入框
        String birthday = "";
        String birthYear = "",birthMonth = "",birthDay = "";

        try{

            //拿第一步輸入的值
            String personalInfo1XML = FlowUtils.getDraftData(userId, "personalInfo", "personalInfo1", dao);
            Document personalInfo1Doc = DocumentHelper.parseText(personalInfo1XML);

            Element root = personalInfo1Doc.getRootElement();
            if(root.element("id") != null) id = root.element("id").getText();
            if(root.element("name") != null) name = root.element("name").getText();

            if(root.element("birthday_year") != null) birthYear = root.element("birthday_year").getText();
            if(root.element("birthday_month") != null) birthMonth = root.element("birthday_month").getText();
            if(root.element("birthday_day") != null) birthDay = root.element("birthday_day").getText();

//            if(root.element("birthday") != null) birthday = root.element("birthday").getText();
            if(root.element("cellPhone") != null) cellPhone = root.element("cellPhone").getText();

            if(root.element("marryStatus") != null) marryStatus = root.element("marryStatus").getText();

            if(root.element("DomicileArea") != null) domicilePhoneRegionCode = root.element("DomicileArea").getText();
            if(root.element("Domicile_Phone") != null) domicilePhonePhone = root.element("Domicile_Phone").getText();

            if(root.element("areaTelephone") != null) telePhoneRegionCode = root.element("areaTelephone").getText();
            if(root.element("telephone") != null) telePhonePhone = root.element("telephone").getText();

            if(root.element("email") != null) email = root.element("email").getText();

            if(root.element("domicileCityId") != null) domicileAddressCityId = root.element("domicileCityId").getText();
            if(root.element("domicileZipCode") != null) domicileAddressZipCode = root.element("domicileZipCode").getText();
            if(root.element("domicileLinerName") != null) domicileLinerName = root.element("domicileLinerName").getText();
            if(root.element("domicileLiner") != null) domicileAddressLiner = root.element("domicileLiner").getText();
            if(root.element("DomicileNeighborhood") != null) domicileAddressNeighborhood = root.element("DomicileNeighborhood").getText();
            if(root.element("DomicileAddress") != null) domicileAddressAddress = root.element("DomicileAddress").getText();

            if(root.element("cityId") != null) teleAddressCityId = root.element("cityId").getText();
            if(root.element("zipCode") != null) teleAddressZipCode = root.element("zipCode").getText();
            if(root.element("address") != null) teleAddressAddress = root.element("address").getText();

//            if(StringUtils.isNotEmpty(birthday)) {
//                birthday = StringUtils.replace(birthday,"/","");
//            }

            //半形轉全形
            name = ProjUtils.toChanisesFullChar(name);
            domicileAddressNeighborhood = ProjUtils.toChanisesFullChar(domicileAddressNeighborhood);
            domicileAddressAddress = ProjUtils.toChanisesFullChar(domicileAddressAddress);
            teleAddressAddress = ProjUtils.toChanisesFullChar(teleAddressAddress);

            //更新DB
            DataObject studentUserProfileDetail = DaoFactory.getDefaultDataObject("Student_UserProfileDetail");
            studentUserProfileDetail.setValue("AplyIdNo", id);

            if(dao.querySingle(studentUserProfileDetail,null)) {

                studentUserProfileDetail.setValue("Applicant",name);
                studentUserProfileDetail.setValue("Marriage", "Y".equalsIgnoreCase(marryStatus) ? "1" : "0");// 婚姻狀況
                studentUserProfileDetail.setValue("AplyCellPhoneNo",cellPhone);

                birthYear = StringUtils.leftPad(birthYear,3,"0");
                birthMonth = StringUtils.leftPad(birthMonth,2,"0");
                birthDay = StringUtils.leftPad(birthDay,2,"0");

                birthday = birthYear + birthMonth + birthDay;

                if(StringUtils.isNotEmpty(birthday)) {
                    studentUserProfileDetail.setValue("AplyBirthday",ProjUtils.toYYYYBirthday(birthday));//申請人生日
                }

                studentUserProfileDetail.setValue("AplyTelNo1_1", domicilePhoneRegionCode);// 申請人戶籍電話區碼
                studentUserProfileDetail.setValue("AplyTelNo1_2", domicilePhonePhone);// 申請人戶籍電話
                studentUserProfileDetail.setValue("AplyTelNo2_1", telePhoneRegionCode);// 申請人通訊電話區碼
                studentUserProfileDetail.setValue("AplyTelNo2_2", telePhonePhone); // 申請人通訊電話
                studentUserProfileDetail.setValue("AplyEmail", email); // 申請人 E-Mail

                studentUserProfileDetail.setValue("AplyZip1",domicileAddressZipCode);
                studentUserProfileDetail.setValue("Aply1Village",domicileAddressLiner);
                studentUserProfileDetail.setValue("AplyAddr1_3",domicileAddressNeighborhood);
                studentUserProfileDetail.setValue("AplyAddr1",domicileAddressAddress);

                studentUserProfileDetail.setValue("AplyZip2", teleAddressZipCode); // 申請人寄送地址郵遞區號
                studentUserProfileDetail.setValue("AplyAddr2", teleAddressAddress);

                studentUserProfileDetail.setValue("ModifyTime", today);

                try{
                    GardenLog.log(GardenLog.DEBUG,studentUserProfileDetail.toXml());
                    dao.update(studentUserProfileDetail);

                    //更新到Session內
                    loginUserBean.setUserName(name);
                    loginUserBean.addCustomizeValue("Applicant",studentUserProfileDetail.getValue("Applicant"));
                    loginUserBean.addCustomizeValue("Marriage",studentUserProfileDetail.getValue("Marriage"));
                    loginUserBean.addCustomizeValue("AplyCellPhoneNo",studentUserProfileDetail.getValue("AplyCellPhoneNo"));
                    loginUserBean.addCustomizeValue("AplyBirthday",studentUserProfileDetail.getValue("AplyBirthday"));
                    loginUserBean.addCustomizeValue("AplyTelNo1_1",studentUserProfileDetail.getValue("AplyTelNo1_1"));
                    loginUserBean.addCustomizeValue("AplyTelNo1_2",studentUserProfileDetail.getValue("AplyTelNo1_2"));
                    loginUserBean.addCustomizeValue("AplyTelNo2_1",studentUserProfileDetail.getValue("AplyTelNo2_1"));
                    loginUserBean.addCustomizeValue("AplyTelNo2_2",studentUserProfileDetail.getValue("AplyTelNo2_2"));
                    loginUserBean.addCustomizeValue("AplyEmail",studentUserProfileDetail.getValue("AplyEmail"));
                    loginUserBean.addCustomizeValue("AplyZip1",studentUserProfileDetail.getValue("AplyZip1"));
                    loginUserBean.addCustomizeValue("Aply1Village",studentUserProfileDetail.getValue("Aply1Village"));
                    loginUserBean.addCustomizeValue("AplyAddr1_3",studentUserProfileDetail.getValue("AplyAddr1_3"));
                    loginUserBean.addCustomizeValue("AplyAddr1",studentUserProfileDetail.getValue("AplyAddr1"));
                    loginUserBean.addCustomizeValue("AplyZip2",studentUserProfileDetail.getValue("AplyZip2"));
                    loginUserBean.addCustomizeValue("AplyAddr2",studentUserProfileDetail.getValue("AplyAddr2"));

                    DataObject aplyMemberDataObject = ProjUtils.getAplyMemberTuitionLoanData(id,dao);

                    //本學期有申請就學貸款且案件已送出，要額外更新我要申請的Table
                    if(aplyMemberDataObject != null) {

                        if(StringUtils.isNotEmpty(birthday)) {
                            aplyMemberDataObject.setValue("AplyBirthday", ProjUtils.toYYYYBirthday(birthday));//申請人出生年月日
                        }

                        aplyMemberDataObject.setValue("Applicant", name); // 申請人姓名
                        aplyMemberDataObject.setValue("AplyCellPhoneNo", cellPhone); //手機
                        aplyMemberDataObject.setValue("Marriage", "Y".equalsIgnoreCase(marryStatus) ? "1" : "0");// 婚姻狀況
                        aplyMemberDataObject.setValue("AplyTelNo1_1", domicilePhoneRegionCode);// 申請人戶籍電話區碼
                        aplyMemberDataObject.setValue("AplyTelNo1_2", domicilePhonePhone);
                        aplyMemberDataObject.setValue("AplyTelNo2_1", telePhoneRegionCode);// 申請人通訊電話區碼
                        aplyMemberDataObject.setValue("AplyTelNo2_2", telePhonePhone);
                        aplyMemberDataObject.setValue("AplyEmail", email);
                        aplyMemberDataObject.setValue("AplyZip2", teleAddressZipCode);
                        aplyMemberDataObject.setValue("AplyAddr2", teleAddressAddress);

                        dao.update(aplyMemberDataObject);
                    }

                    //判斷會員狀態看是否更新電文
                    //有撥款紀錄
                    String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
                    if(!"sit".equalsIgnoreCase(env) && "Y".equalsIgnoreCase(isRecord)) {


                        //其餘一律更新電文主機

                        //先更新email跟通訊地址
                        RQBean rqBean53 = new RQBean();
                        rqBean53.setTxId("EB032153");
                        rqBean53.addRqParam("CUST_NO",id);

                        RSBean rsBean = WebServiceAgent.callWebService(rqBean53);

                        //先取得目前序號
                        String hspSck = rsBean.getServiceHeader().getHSPSCK();
                        GardenLog.log(GardenLog.DEBUG,"hspSck = " + hspSck);

                        //再開始更新Email
                        rqBean53 = new RQBean();
                        rqBean53.setTxId("EB032153");
                        rqBean53.addRqParam("CUST_NO",id);
                        rqBean53.addRqParam("FUNC_01","2");
                        rqBean53.addRqParam("COD_01","8001");
                        rqBean53.addRqParam("TYP_01","2");
                        rqBean53.addRqParam("ADDR_011",email);
                        rqBean53.addRqParam("ADDR_012",email);

                        rqBean53.setHeaderPageFlg("3");
                        rqBean53.setHeaderDBAppn(hspSck);

                        rsBean = WebServiceAgent.callWebService(rqBean53);

                        if(!rsBean.isSuccess()) {
                            errorCode = rsBean.getErrorCode();
                            throw new Exception(rsBean.getErrorMsg());
                        }

                        //序號增加1
                        int hspSckInt = Integer.parseInt(hspSck) + 1;
                        hspSck = StringUtils.leftPad(String.valueOf(hspSckInt),2,"0");

                        //再更新通訊地址
                        rqBean53 = new RQBean();
                        rqBean53.setTxId("EB032153");
                        rqBean53.addRqParam("CUST_NO",id);
                        rqBean53.addRqParam("FUNC_01","2");
                        rqBean53.addRqParam("COD_01","3802");
                        rqBean53.addRqParam("TYP_01","2");
                        rqBean53.addRqParam("ZIP_COD_01",teleAddressZipCode);
                        rqBean53.addRqParam("ADDR_011",teleAddressAddress);
                        rqBean53.addRqParam("ADDR_012",teleAddressAddress);

                        rqBean53.setHeaderPageFlg("3");
                        rqBean53.setHeaderDBAppn(hspSck);

                        rsBean = WebServiceAgent.callWebService(rqBean53);

                        if(!rsBean.isSuccess()) {
                            errorCode = rsBean.getErrorCode();
                            throw new Exception(rsBean.getErrorMsg());
                        }


                        //再更新戶藉電話跟通訊電話
                        RQBean rqBean54 = new RQBean();
                        rqBean54.setTxId("EB032154");
                        rqBean54.addRqParam("CUST_NO",id);

                        rsBean = WebServiceAgent.callWebService(rqBean54);

                        //先取得目前序號
                        String hspSck54 = rsBean.getServiceHeader().getHSPSCK();
                        GardenLog.log(GardenLog.DEBUG,"hspSck = " + hspSck54);

                        //再開始更新Email
                        rqBean54 = new RQBean();
                        rqBean54.setTxId("EB032154");
                        rqBean54.addRqParam("CUST_NO",id);
                        rqBean54.addRqParam("FUNC_01","2");
                        rqBean54.addRqParam("COD_01","3801");
                        rqBean54.addRqParam("TYP_01","2");
                        rqBean54.addRqParam("TEL_NO_01",domicilePhoneRegionCode + " " + domicilePhonePhone);

                        rqBean54.setHeaderPageFlg("3");
                        rqBean54.setHeaderDBAppn(hspSck54);

                        rsBean = WebServiceAgent.callWebService(rqBean54);

                        if(!rsBean.isSuccess()) {
                            errorCode = rsBean.getErrorCode();
                            throw new Exception(rsBean.getErrorMsg());
                        }

                        //序號增加1
                        int hspSckInt54 = Integer.parseInt(hspSck54) + 1;
                        hspSck54 = StringUtils.leftPad(String.valueOf(hspSckInt54),2,"0");

                        //再更新通訊地址
                        rqBean54 = new RQBean();
                        rqBean54.setTxId("EB032154");
                        rqBean54.addRqParam("CUST_NO",id);
                        rqBean54.addRqParam("FUNC_01","2");
                        rqBean54.addRqParam("COD_01","3802");
                        rqBean54.addRqParam("TYP_01","2");
                        rqBean54.addRqParam("TEL_NO_01",telePhoneRegionCode + " " + telePhonePhone);

                        rqBean54.setHeaderPageFlg("3");
                        rqBean54.setHeaderDBAppn(hspSck54);

                        rsBean = WebServiceAgent.callWebService(rqBean54);

                        if(!rsBean.isSuccess()) {
                            errorCode = rsBean.getErrorCode();
                            throw new Exception(rsBean.getErrorMsg());
                        }
                    }

                    registerResult = "success";

                    //清除草稿
                    FlowUtils.resetDraftData(userId,"personalInfo",dao);

                }catch(Exception ex) {
                    ex.printStackTrace();

                    if(StringUtils.isEmpty(errorCode)) errorCode = "99";
                    errorMsg = "系統更新失敗["+ex.getMessage()+"]";
                }
            }
            else {
                errorCode = "11";
                errorMsg = "查無此資料";
            }


        }catch(Exception e) {
            e.printStackTrace();
        }

        if(StringUtils.isNotEmpty(domicileAddressCityId)) {
            domicileAddressCityId = ProjUtils.toCityName(domicileAddressCityId,dao);
        }

        if(StringUtils.isNotEmpty(teleAddressCityId)) {
            teleAddressCityId = ProjUtils.toCityName(teleAddressCityId,dao);
        }

        if(StringUtils.isNotEmpty(domicileAddressZipCode)) {
            domicileAddressZipCode = ProjUtils.toZipCodeName(domicileAddressZipCode,dao);
        }

        if(StringUtils.isNotEmpty(teleAddressZipCode)) {
            teleAddressZipCode = ProjUtils.toZipCodeName(teleAddressZipCode,dao);
        }

        domicileAddressAddress = domicileAddressCityId + domicileAddressZipCode + domicileLinerName + domicileAddressLiner + domicileAddressNeighborhood + domicileAddressAddress;
        teleAddressAddress = teleAddressCityId + teleAddressZipCode + teleAddressAddress;

        //裝值到content
        content.put("isRecord",isRecord);
        content.put("id",ProjUtils.toIDMark(id));
        content.put("name",ProjUtils.toNameMark(name));
        content.put("birthday",birthday);
        content.put("marryStatus",marryStatus);

        JSONObject domicilePhone = new JSONObject();
        domicilePhone.put("regionCode",domicilePhoneRegionCode);
        domicilePhone.put("phone",ProjUtils.toTelMark(domicilePhonePhone));
        content.put("domicilePhone",domicilePhone);

        JSONObject telePhone = new JSONObject();
        telePhone.put("regionCode",telePhoneRegionCode);
        telePhone.put("phone",ProjUtils.toTelMark(telePhonePhone));
        content.put("telePhone",telePhone);

        content.put("mobile",ProjUtils.toTelMark(cellPhone));
        content.put("email",ProjUtils.toEMailMark(email));

        JSONObject domicileAddress = new JSONObject();
        domicileAddress.put("address",ProjUtils.toAddressMark(domicileAddressAddress));
        content.put("domicileAddress",domicileAddress);

        JSONObject teleAddress = new JSONObject();
        teleAddress.put("address",ProjUtils.toAddressMark(teleAddressAddress));
        content.put("teleAddress",teleAddress);

        content.put("registerResult",registerResult);
        content.put("errorCode",errorCode);
        content.put("errorMsg",errorMsg);
        content.put("registerDate",registerDate);
        content.put("registerTime",registerTime);

        //寄發Email
        String msg = StringUtils.isEmpty(errorCode) ? "成功" : "失敗";
        String mailTitle = MessageUtils.personalTitle;
        mailTitle = StringUtils.replace(mailTitle, "{result}", msg);

        MailBean mailBean = new MailBean("personalInfo");
        mailBean.setReceiver(email);
        mailBean.setTitle(mailTitle);
        mailBean.addResultParam("result",(StringUtils.isEmpty(errorCode) ? "<img src=\"{host}/img/na-14.png\">變更成功" : "<img src=\"{host}/img/na-16.png\">變更失敗("+errorCode+")"+errorMsg));

        //加入變更身份
        mailBean.addResultParam("id",ProjUtils.toIDMark(id));
        mailBean.addResultParam("name",ProjUtils.toNameMark(name));
        mailBean.addResultParam("birthday","民國" + birthday.substring(0,3) + "年" + birthday.substring(3,5) + "月" + birthday.substring(5) + "日");
        mailBean.addResultParam("marryStatus","Y".equals(marryStatus) ? "已婚" : "未婚");
        mailBean.addResultParam("domicilePhone","("+domicilePhoneRegionCode+")" + ProjUtils.toTelMark(domicilePhonePhone));
        mailBean.addResultParam("telePhone","("+telePhoneRegionCode+")" + ProjUtils.toTelMark(telePhonePhone));
        mailBean.addResultParam("email",ProjUtils.toEMailMark(email));
        mailBean.addResultParam("cellPhone",ProjUtils.toTelMark(cellPhone));
        mailBean.addResultParam("domicileAddressAddress",ProjUtils.toAddressMark(domicileAddressAddress));
        mailBean.addResultParam("teleAddress",ProjUtils.toAddressMark(teleAddressAddress));

        MessageUtils.sendEmail(mailBean);

        String logResult = StringUtils.isEmpty(errorMsg) ? "變更個人基本資料成功" : errorMsg;
        ProjUtils.saveLog(dao,queryStringInfo.getRequest(),getClass().getName(),"getDraftData",logResult);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
