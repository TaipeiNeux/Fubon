package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.mark.MarkBean;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/30
 * Time: 下午 11:16
 * To change this template use File | Settings | File Templates.
 */
public class PersonalInfo2_1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N",id = "",name = "", birthday = "",marryStatus = "",cellPhone = "", email = "";
        String domicilePhoneRegionCode = "", domicilePhonePhone = "";
        String telePhoneRegionCode = "", telePhonePhone = "";
        String domicileAddressCityId = "", domicileAddressZipCode = "",domicileLinerName = "",domicileAddressLiner = "",domicileAddressNeighborhood = "", domicileAddressAddress = "";
        String teleAddressCityId = "", teleAddressZipCode = "", teleAddressAddress = "";

        //拿第一步輸入的值
        String personalInfo1XML = FlowUtils.getDraftData(userId, "personalInfo", "personalInfo1", dao);
        Document personalInfo1Doc = DocumentHelper.parseText(personalInfo1XML);

        Element root = personalInfo1Doc.getRootElement();

        if(root.element("id") != null) id = root.element("id").getText();
        if(root.element("name") != null) name = root.element("name").getText();

        if(root.element("cellPhone") != null) cellPhone = root.element("cellPhone").getText();
        if(root.element("birthday") != null) birthday = root.element("birthday").getText();

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

        domicileAddressAddress = domicileAddressCityId + domicileAddressZipCode + domicileLinerName + domicileAddressLiner + domicileAddressNeighborhood + "鄰" + domicileAddressAddress;
        teleAddressAddress = teleAddressCityId + teleAddressZipCode + teleAddressAddress;

        //裝值到content
        content.put("isRecord",isRecord);
        content.put("id",id);
        content.put("name",name);
        content.put("birthday",birthday);
        content.put("marryStatus",marryStatus);

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

        //原碼的Email
        content.put("mobile_otp",cellPhone);
        content.put("email_otp",email);

        JSONObject domicileAddress = new JSONObject();
        domicileAddress.put("address",domicileAddressAddress);
        content.put("domicileAddress",domicileAddress);

        JSONObject teleAddress = new JSONObject();
        teleAddress.put("address",teleAddressAddress);
        content.put("teleAddress",teleAddress);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
