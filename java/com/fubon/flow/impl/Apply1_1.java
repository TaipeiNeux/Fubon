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

/**
 * 我要申請的1-1：申請人基本資料/基本資料
 */
public class Apply1_1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

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


            //有撥款紀錄要額外帶入：身分證字號、姓名、生日、行動電話、Email、婚姻狀況、戶籍電話、通訊電話、戶籍地址、通訊地址
            if("Y".equalsIgnoreCase(isRecord)) {

                //帶入撥款紀錄
                DataObject aplyMemberHistoryData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);

                id = aplyMemberHistoryData.getValue("AplyIdNo");
                name = aplyMemberHistoryData.getValue("Applicant");
                birthday = aplyMemberHistoryData.getValue("AplyBirthday");
                marryStatus = "1".equalsIgnoreCase(aplyMemberHistoryData.getValue("Marriage")) ? "Y" : "N";

                domicilePhoneRegionCode = aplyMemberHistoryData.getValue("AplyTelNo1_1");
                domicilePhonePhone = aplyMemberHistoryData.getValue("AplyTelNo1_2");

                telePhoneRegionCode = aplyMemberHistoryData.getValue("AplyTelNo2_1");
                telePhonePhone = aplyMemberHistoryData.getValue("AplyTelNo2_2");

                cellPhone = aplyMemberHistoryData.getValue("AplyCellPhoneNo");
                email = aplyMemberHistoryData.getValue("AplyEmail");


                String zipCode1 = aplyMemberHistoryData.getValue("AplyZip1");

                //用zipcode反查city
                domicileAddressCityId = ProjUtils.toCityId(zipCode1,dao); //縣市別

                domicileAddressZipCode = zipCode1; //戶藉行政區
                domicileAddressLiner = aplyMemberHistoryData.getValue("Aply1Village");//戶藉村/里名稱(中文)
//                domicileLinerName = aplyMemberHistoryData.getValue("AplyAddr1_4");
                domicileAddressNeighborhood = aplyMemberHistoryData.getValue("AplyAddr1_3");
                domicileAddressAddress = aplyMemberHistoryData.getValue("AplyAddr1");
                //domicileAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","1");


                String zipCode2 = aplyMemberHistoryData.getValue("AplyZip2");

                //用zipcode反查city
                teleAddressCityId = ProjUtils.toCityId(zipCode2,dao);

                teleAddressZipCode = zipCode2;
//                teleAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","2");
                teleAddressAddress = aplyMemberHistoryData.getValue("AplyAddr2");

            }


            //DB是西元轉民國
            birthday = ProjUtils.toBirthday(birthday);
        }


        //轉成中文
        domicileAddressCityName = ProjUtils.toCityName(domicileAddressCityId,dao);
        domicileAddressZipCodeName = ProjUtils.toZipCodeName(domicileAddressZipCode,dao);

        //隱碼
        MarkBean markBean = new MarkBean();
        markBean.addCode("id",id,ProjUtils.toIDMark(id));
        markBean.addCode("name",name,ProjUtils.toNameMark(name));
        markBean.addCode("DomicilePhone",domicilePhonePhone,ProjUtils.toTelMark(domicilePhonePhone));
        markBean.addCode("telephone",telePhonePhone,ProjUtils.toTelMark(telePhonePhone));
        markBean.addCode("cellPhone",cellPhone,ProjUtils.toTelMark(cellPhone));
        markBean.addCode("email",email,ProjUtils.toEMailMark(email));
        markBean.addCode("domicileLiner",domicileAddressLiner,ProjUtils.toAddressAllMark(domicileAddressLiner));
        markBean.addCode("DomicileNeighborhood",domicileAddressNeighborhood,ProjUtils.toAddressAllMark(domicileAddressNeighborhood));
        markBean.addCode("DomicileAddress",domicileAddressAddress,ProjUtils.toAddressAllMark(domicileAddressAddress));
        markBean.addCode("address",teleAddressAddress,ProjUtils.toAddressAllMark(teleAddressAddress));
        markBean.addCode("birthday",birthday,ProjUtils.toBirthdayMark(birthday));

        queryStringInfo.getRequest().getSession().setAttribute("MarkBean",markBean);

        //裝值到content
        content.put("isRecord",isRecord);
        content.put("id",ProjUtils.toIDMark(id));
        content.put("name",ProjUtils.toNameMark(name));
        content.put("birthday",ProjUtils.toBirthdayMark(birthday));
        content.put("marryStatus",marryStatus);

        content.put("sameAddr",sameAddrHidden);

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
        domicileAddress.put("cityId",domicileAddressCityId);
        domicileAddress.put("zipCode",domicileAddressZipCode);
        domicileAddress.put("liner",domicileAddressLiner);
        domicileAddress.put("neighborhood",ProjUtils.toAddressAllMark(domicileAddressNeighborhood));
        domicileAddress.put("address",ProjUtils.toAddressAllMark(domicileAddressAddress));

        domicileAddress.put("cityName",domicileAddressCityName);
        domicileAddress.put("zipCodeName",domicileAddressZipCodeName);

        content.put("domicileAddress",domicileAddress);

        JSONObject teleAddress = new JSONObject();
        teleAddress.put("cityId",teleAddressCityId);
        teleAddress.put("zipCode",teleAddressZipCode);
        teleAddress.put("address",ProjUtils.toAddressAllMark(teleAddressAddress));
        content.put("teleAddress",teleAddress);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
