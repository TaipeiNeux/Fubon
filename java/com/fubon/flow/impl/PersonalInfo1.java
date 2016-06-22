package com.fubon.flow.impl;

import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.mark.MarkBean;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
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
 * Time: 下午 10:53
 * To change this template use File | Settings | File Templates.
 */
public class PersonalInfo1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N",id = "",name = "",birthday = "",marryStatus = "",cellPhone = "", email = "";
        String domicilePhoneRegionCode = "", domicilePhonePhone = "";
        String telePhoneRegionCode = "", telePhonePhone = "";
        String domicileAddressCityId = "", domicileAddressZipCode = "",domicileLinerName = "",domicileAddressLiner = "",domicileAddressNeighborhood = "", domicileAddressAddress = "";
        String teleAddressCityId = "", teleAddressZipCode = "", teleAddressAddress = "";


        //取得使用者相關資料
        id = loginUserBean.getCustomizeValue("IdNo");
        name = loginUserBean.getUserName();
        birthday = loginUserBean.getCustomizeValue("AplyBirthday");
        marryStatus = "1".equalsIgnoreCase(loginUserBean.getCustomizeValue("Marriage")) ? "Y" : "N";
        cellPhone = loginUserBean.getCustomizeValue("AplyCellPhoneNo");
        email = loginUserBean.getCustomizeValue("AplyEmail");

        domicileAddressZipCode = loginUserBean.getCustomizeValue("AplyZip1");
        domicileAddressLiner = loginUserBean.getCustomizeValue("Aply1Village");
        domicileAddressNeighborhood = loginUserBean.getCustomizeValue("AplyAddr1_3");

        domicileAddressAddress = loginUserBean.getCustomizeValue("AplyAddr1");
        teleAddressAddress = loginUserBean.getCustomizeValue("AplyAddr2");

        domicilePhoneRegionCode = loginUserBean.getCustomizeValue("AplyTelNo1_1");
        domicilePhonePhone = loginUserBean.getCustomizeValue("AplyTelNo1_2");

        telePhoneRegionCode = loginUserBean.getCustomizeValue("AplyTelNo2_1");
        telePhonePhone = loginUserBean.getCustomizeValue("AplyTelNo2_2");

        //有撥款紀錄要額外帶入：身分證字號、姓名、生日、行動電話、Email、婚姻狀況、戶籍電話、通訊電話、戶籍地址、通訊地址
        if("Y".equalsIgnoreCase(isRecord)) {

            //帶入撥款紀錄
            DataObject aplyMemberHistoryData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);

            id = aplyMemberHistoryData.getValue("AplyIdNo");
            name = aplyMemberHistoryData.getValue("Applicant");
            birthday = aplyMemberHistoryData.getValue("AplyBirthday");
            marryStatus = "1".equalsIgnoreCase(aplyMemberHistoryData.getValue("Marriage")) ? "Y" : "N";
            cellPhone = aplyMemberHistoryData.getValue("AplyCellPhoneNo");

            domicilePhoneRegionCode = aplyMemberHistoryData.getValue("AplyTelNo1_1");
            domicilePhonePhone = aplyMemberHistoryData.getValue("AplyTelNo1_2");

            telePhoneRegionCode = aplyMemberHistoryData.getValue("AplyTelNo2_1");
            telePhonePhone = aplyMemberHistoryData.getValue("AplyTelNo2_2");

            String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
            if(!"sit".equalsIgnoreCase(env)) {

                //戶藉電話/通訊電話/Email/通訊地址直接查電文
                RQBean rqBean53 = new RQBean();
                rqBean53.setTxId("EB032153");
                rqBean53.addRqParam("CUST_NO",id);

                RSBean rsBean53 = WebServiceAgent.callWebService(rqBean53);
                if(rsBean53.isSuccess()) {
                    Document doc = DocumentHelper.parseText(rsBean53.getTxnString());

                    //Email抓8001、通訊地址抓3802
                    email = ProjUtils.get032153Col8001(doc);
                    teleAddressZipCode = ProjUtils.get032153Col3802ZipCode(doc);
                    teleAddressAddress = ProjUtils.get032153Col3802Address(doc);
                }

                RQBean rqBean54 = new RQBean();
                rqBean54.setTxId("EB032154");
                rqBean54.addRqParam("CUST_NO",id);

                RSBean rsBean54 = WebServiceAgent.callWebService(rqBean54);

                if(rsBean54.isSuccess()) {
                    Document doc = DocumentHelper.parseText(rsBean54.getTxnString());

                    String domicile = ProjUtils.get032154Col3801Tel(doc);
                    String tele = ProjUtils.get032154Col3802Tel(doc);

                    //戶藉電話抓3801
                    if(StringUtils.isNotEmpty(domicile) && domicile.length() > 2) {
                        domicilePhoneRegionCode = domicile.substring(0,2);
                        domicilePhonePhone = domicile.substring(2);
                    }

                    //通訊電話抓3802
                    if(StringUtils.isNotEmpty(tele) && tele.length() > 2) {
                        telePhoneRegionCode = tele.substring(0,2);
                        telePhonePhone = tele.substring(2);
                    }

                }

            }
            else {
                email = aplyMemberHistoryData.getValue("AplyEmail");
//                teleAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","2");
                teleAddressAddress = aplyMemberHistoryData.getValue("AplyAddr2");

                domicilePhoneRegionCode = aplyMemberHistoryData.getValue("AplyTelNo1_1");
                domicilePhonePhone = aplyMemberHistoryData.getValue("AplyTelNo1_2");

                telePhoneRegionCode = aplyMemberHistoryData.getValue("AplyTelNo2_1");
                telePhonePhone = aplyMemberHistoryData.getValue("AplyTelNo2_2");

                teleAddressZipCode = aplyMemberHistoryData.getValue("AplyZip2");
            }

            domicileAddressZipCode = aplyMemberHistoryData.getValue("AplyZip1");

            domicileAddressLiner = aplyMemberHistoryData.getValue("Aply1Village");
            domicileAddressNeighborhood = aplyMemberHistoryData.getValue("AplyAddr1_3");
            domicileAddressAddress = aplyMemberHistoryData.getValue("AplyAddr1");
//            domicileAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","1");
        }
        else {
            teleAddressZipCode = loginUserBean.getCustomizeValue("AplyZip2");
        }

        //用zipcode反查city
        domicileAddressCityId = ProjUtils.toCityId(domicileAddressZipCode,dao);

        //用zipcode反查city
        teleAddressCityId = ProjUtils.toCityId(teleAddressZipCode,dao);

        //生日西元轉民國
        birthday = ProjUtils.toBirthday(birthday);

        //隱碼
        MarkBean markBean = new MarkBean();
        markBean.addCode("id",id,ProjUtils.toIDMark(id));
        markBean.addCode("name",name,ProjUtils.toNameMark(name));
        markBean.addCode("Domicile_Phone",domicilePhonePhone,ProjUtils.toTelMark(domicilePhonePhone));
        markBean.addCode("telephone",telePhonePhone,ProjUtils.toTelMark(telePhonePhone));
        markBean.addCode("cellPhone",cellPhone,ProjUtils.toTelMark(cellPhone));
        markBean.addCode("email",email,ProjUtils.toEMailMark(email));
        markBean.addCode("DomicileAddress",domicileAddressAddress,ProjUtils.toAddressMark(domicileAddressAddress));
        markBean.addCode("address",teleAddressAddress,ProjUtils.toAddressMark(teleAddressAddress));
        markBean.addCode("birthday",birthday,ProjUtils.toBirthdayMark(birthday));

        queryStringInfo.getRequest().getSession().setAttribute("MarkBean",markBean);

        //裝值到content
        content.put("notice_text","<h3> 注意事項</h3><ol> <li>不開放線上修改之個人資料，您可透過以下兩種方式辦理：<br> (1)透過客服:可撥打客戶服務專線02-8751-6665按5由專人為您服務<br> (2)透過臨櫃:請您本人攜帶身分證正本及原留印鑑，至本行各<a href='123.html'><u>服務據點</u></a>辦理個人基本資料變更。<br></li> <li> 為符合「金融監督管理委員會指定非公務機關個人資料檔案安全維護辦法」之規定，本行就學貸款服務專區內，涉及<br>個人資料之交易，部分資料將以遮蔽之方式進行保護，若導致您無法確認資料之正確性，請您至本行櫃檯辦理或洽<br>24HR客服中心02-8751-6665按5將有專人竭誠為您服務。 </li></ol>");
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
        domicileAddress.put("cityId",domicileAddressCityId);
        domicileAddress.put("zipCode",domicileAddressZipCode);
        domicileAddress.put("linerName",domicileLinerName);
        domicileAddress.put("liner",domicileAddressLiner);
        domicileAddress.put("neighborhood",domicileAddressNeighborhood);
        domicileAddress.put("address",ProjUtils.toAddressMark(domicileAddressAddress));
        content.put("domicileAddress",domicileAddress);

        JSONObject teleAddress = new JSONObject();
        teleAddress.put("cityId",teleAddressCityId);
        teleAddress.put("zipCode",teleAddressZipCode);
        teleAddress.put("address",ProjUtils.toAddressMark(teleAddressAddress));
        content.put("teleAddress",teleAddress);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
