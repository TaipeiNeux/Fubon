package com.fubon.flow.impl;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/24
 * Time: 下午 1:23
 * To change this template use File | Settings | File Templates.
 */

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.mark.MarkBean;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.dom4j.Element;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

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
        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N",id = "",name = "",birthday = "",marryStatus = "",cellPhone = "", email = "";
        String domicilePhoneRegionCode = "", domicilePhonePhone = "";
        String telePhoneRegionCode = "", telePhonePhone = "";
        String domicileAddressCityId = "", domicileAddressCityName = "", domicileAddressZipCode = "",domicileAddressZipCodeName = "",domicileAddressLiner = "",domicileAddressNeighborhood = "", domicileAddressAddress = "";
        String teleAddressCityId = "", teleAddressZipCode = "",teleAddressAddress = "";
        String sameAddrHidden = "";

        //若有草稿就裝到content，沒有才走邏輯判斷
        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("id") != null) id = root.element("id").getText();
            if(root.element("name") != null) name = root.element("name").getText();
            if(root.element("birthday") != null) birthday = root.element("birthday").getText();
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
        else {

            //取得使用者相關資料
            id = loginUserBean.getCustomizeValue("IdNo");
            name = loginUserBean.getUserName();
            birthday = loginUserBean.getCustomizeValue("AplyBirthday");
            cellPhone = loginUserBean.getCustomizeValue("AplyCellPhoneNo");
            email = loginUserBean.getCustomizeValue("AplyEmail");

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

            //如果有撥款紀錄就撈已撥款，如果沒有撥款紀錄就撈目前當學年度當學期的資料
            DataObject aplyMemberData = null;

            //有撥款紀錄要額外帶入：身分證字號、姓名、生日、行動電話、Email、婚姻狀況、戶籍電話、通訊電話、戶籍地址、通訊地址
            if("Y".equalsIgnoreCase(isRecord)) {
                //帶入撥款紀錄
                aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);
            }
            else {
                //先取得「本學期」申請資料
//                aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
            }

            if(aplyMemberData != null) {
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


                zipCode1 = aplyMemberData.getValue("AplyZip1");

                //用zipcode反查city
                domicileAddressCityId = ProjUtils.toCityId(zipCode1,dao); //縣市別

                domicileAddressZipCode = zipCode1; //戶藉行政區
                domicileAddressLiner = aplyMemberData.getValue("Aply1Village");//戶藉村/里名稱(中文)
//                domicileLinerName = aplyMemberHistoryData.getValue("AplyAddr1_4");
                domicileAddressNeighborhood = aplyMemberData.getValue("AplyAddr1_3");
                domicileAddressAddress = aplyMemberData.getValue("AplyAddr1");
                //domicileAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","1");


                zipCode2 = aplyMemberData.getValue("AplyZip2");

                //用zipcode反查city
                teleAddressCityId = ProjUtils.toCityId(zipCode2,dao);

                teleAddressZipCode = zipCode2;
//                teleAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","2");
                teleAddressAddress = aplyMemberData.getValue("AplyAddr2");


            }

            //DB是西元轉民國
            birthday = ProjUtils.toBirthday(birthday);
        }


        //轉成中文
        domicileAddressCityName = ProjUtils.toCityName(domicileAddressCityId,dao);
        domicileAddressZipCodeName = ProjUtils.toZipCodeName(domicileAddressZipCode,dao);

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

            markBean.addCode("birthday",birthday,ProjUtils.toBirthdayMark(birthday));
            birthday = ProjUtils.toBirthdayMark(birthday);

            queryStringInfo.getRequest().getSession().setAttribute("MarkBean",markBean);
        }



        //裝值到content
        content.put("isPopUp",isPopUp);
        content.put("isEtabs",isEtabs);
        content.put("isRecord",isRecord);
        content.put("id",id);
        content.put("name",name);
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
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
