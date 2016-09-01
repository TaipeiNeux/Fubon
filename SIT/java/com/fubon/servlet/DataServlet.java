package com.fubon.servlet;

import com.fubon.utils.*;
import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.listener.SessionBean;
import com.neux.garden.log.GardenLog;
import com.fubon.mark.MarkBean;
import com.neux.utility.orm.ORMAPI;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.QueryConfig;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.orm.hdl.connection.SQLConnection;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import com.neux.utility.utils.jsp.info.JSPUploadConf;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONArray;
import org.json.JSONObject;
import org.krysalis.barcode4j.impl.code39.Code39Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.tools.UnitConv;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.NumberFormat;
import java.util.*;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/25
 * Time: 上午 3:55
 * To change this template use File | Settings | File Templates.
 */
public class DataServlet extends HttpServlet {

    private static final String[] FamilyInfoColumns = new String[]{"Name","IdNo","Birthday","TelNo1","TelNo2","CellPhoneNo","Zip","Addr_2","Addr_3","Addr_5","Addr_6","Addr_7","Addr_8","Addr_9","Addr_10","Addr_11","Addr_12","Addr_13","Addr_14","Addr_15","Addr_16","Addr_17","Addr_18","Addr_19","Addr_20","Addr_21","Addr_22","Addr_23","Addr_24","Addr_25"};
    private static final Map<String,String> familyTypeMap = new HashMap<String,String>();
    static{
        familyTypeMap.put("father","Fa");
        familyTypeMap.put("mother","Ma");
        familyTypeMap.put("thirdParty","Gd1");
        familyTypeMap.put("spouse","Pa");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        JSPQueryStringInfo queryStringInfo = null;

        if(req.getContentType() != null && req.getContentType().indexOf("multipart/form-data") != -1) {
            JSPUploadConf uploadConf = new JSPUploadConf();

            //設定上傳暫存目錄
            String uploadTempFolder = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("uploadTempFolder");
            uploadConf.setAutoCreatePath(true);
            uploadConf.setUploadPath(uploadTempFolder);
            uploadConf.setEncoding("utf-8");

            queryStringInfo = JSPUtils.setParams(req,false,uploadConf);
        }
        else {
            queryStringInfo = JSPUtils.setParams(req,false);
        }

        String action = queryStringInfo.getParam("action");

        //取得最新消息
        if("getNews".equalsIgnoreCase(action)) {
            getNews(queryStringInfo, resp);
        }
        //取得常見問題
        else if("getQA".equalsIgnoreCase(action)) {
            getQA(queryStringInfo, resp);
        }
        //表單下載
        else if("getDocument".equalsIgnoreCase(action)) {
            getDocument(queryStringInfo, resp);
        }
        //取得表單下載內的檔案
        else if("downloadDocument".equalsIgnoreCase(action)) {
            downloadDocument(queryStringInfo, resp);
        }
        //取得關係人資料
        else if("getFamilyInfo".equalsIgnoreCase(action)) {
            getFamilyInfo(queryStringInfo, resp);
        }
        //取得分行可預約人數
        else if("getExpectBranchPeoples".equalsIgnoreCase(action)) {
            getExpectBranchPeoples(queryStringInfo, resp);
        }
        //上傳線上續貸文件
        else if("uploadApplyDocument".equalsIgnoreCase(action)) {
            uploadApplyDocument(queryStringInfo, resp);
        }
        //取得就貸組的地址
        else if("getDefaultAddress".equalsIgnoreCase(action)) {
            getDefaultAddress(queryStringInfo, resp);
        }
        //取得延期繳款的檔案
        else if("downloadDefermentDocument".equalsIgnoreCase(action)) {
            downloadDefermentDocument(queryStringInfo, resp);
        }
        //取得線上續貸的檔案
        else if("downloadApplyDocument".equalsIgnoreCase(action)) {
            downloadApplyDocument(queryStringInfo, resp);
        }
        //儲存延期還款步驟-0
        else if("saveDeferment0".equalsIgnoreCase(action)) {
            saveDeferment0(queryStringInfo, resp);
        }
        //上傳延期還款文件
        else if("uploadDefermentDocument".equalsIgnoreCase(action)) {
            uploadDefermentDocument(queryStringInfo, resp);
        }
        //顯示OTP驗證圖
        else if("showOTP".equalsIgnoreCase(action)) {
            showOTP(queryStringInfo, resp);
        }
        //修改個人資料起始頁
        else if("getPersonalInfo".equalsIgnoreCase(action)) {
            getPersonalInfo(queryStringInfo, resp);
        }
        //我的貸款
        else if("myloanDetail".equalsIgnoreCase(action)){
            myloanDetail(queryStringInfo, resp);
        }
        //還款明細查詢
        else if("repaymentInquiry".equalsIgnoreCase(action)){
            repaymentInquiry(queryStringInfo, resp);
        }
        //電子對帳單
        else if("myElectronicPay".equalsIgnoreCase(action)){
            myElectronicPay(queryStringInfo, resp);
        }
        //更新跳出網路註記
        else if("updatePopupEtag".equalsIgnoreCase(action)){
            updatePopupEtag(queryStringInfo, resp);
        }

//        else if("getApplyMessage".equalsIgnoreCase(action)) {
//            getApplyMessage(queryStringInfo, resp);
//        }
//        else if("downloadDocument".equalsIgnoreCase(action)) {
//            downloadDocument(queryStringInfo, resp);
//        }

    }


    public void getPersonalInfo(JSPQueryStringInfo queryStringInfo, HttpServletResponse response) throws ServletException, IOException {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());


        IDao dao = DaoFactory.getDefaultDao();

        JSONObject jsonObject = new JSONObject();
        JSONObject header = new JSONObject();
        JSONObject content = new JSONObject();

        try{

            jsonObject.put("Header",header);
            jsonObject.put("Content",content);

            //判斷是否有登入
            if(loginUserBean == null) {
                header.put("errorCode","9999");
                header.put("errorMsg", "系統逾時，請重新登入");
            }
            else {
                String userId = loginUserBean.getUserId();

                String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N",id = "",name = "",birthday = "",marryStatus = "",cellPhone = "", email = "";
                String domicilePhoneRegionCode = "", domicilePhonePhone = "";
                String telePhoneRegionCode = "", telePhonePhone = "";
                String domicileAddressAddress = "";
                String teleAddressAddress = "";

                //取得使用者相關資料
                id = loginUserBean.getCustomizeValue("IdNo");
                name = loginUserBean.getUserName();
                birthday = loginUserBean.getCustomizeValue("AplyBirthday");
                if(StringUtils.isNotEmpty(loginUserBean.getCustomizeValue("Marriage"))) {
                    marryStatus = "1".equalsIgnoreCase(loginUserBean.getCustomizeValue("Marriage")) ? "Y" : "N";
                }

                cellPhone = loginUserBean.getCustomizeValue("AplyCellPhoneNo");
                email = loginUserBean.getCustomizeValue("AplyEmail");

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
                            String teleAddressZipCode = ProjUtils.get032153Col3802ZipCode(doc);
                            teleAddressAddress = ProjUtils.get032153Col3802Address(doc);

                            //2016-08-23 added by titan 因為電文地址是包含縣市，所以先用zipcode去查中文後，再用中文來切
                            String zipName = ProjUtils.toZipCodeName(teleAddressZipCode,dao);

                            GardenLog.log(GardenLog.DEBUG,"teleAddressZipCode1 = " + teleAddressZipCode);
                            GardenLog.log(GardenLog.DEBUG,"teleAddressAddress1 = " + teleAddressAddress);

                            if(StringUtils.isNotEmpty(zipName) && teleAddressAddress.contains(zipName)) {
                                teleAddressAddress = teleAddressAddress.substring(teleAddressAddress.indexOf(zipName) + zipName.length());
                            }

                            //2016-08-25 added by titan 確認頁要往回推縣市跟行政區
                            String cityId = ProjUtils.toCityId(teleAddressZipCode,dao);

                            GardenLog.log(GardenLog.DEBUG,"cityId = " + cityId);

                            if(StringUtils.isNotEmpty(cityId)) {
                                String cityName = ProjUtils.toCityName(cityId,dao);
                                GardenLog.log(GardenLog.DEBUG,"cityName = " + cityName);

                                teleAddressAddress = cityName + zipName + teleAddressAddress;
                            }

                            GardenLog.log(GardenLog.DEBUG,"teleAddressAddress2 = " + teleAddressAddress);

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
                                domicilePhonePhone = domicilePhonePhone.trim();
                            }

                            //通訊電話抓3802
                            if(StringUtils.isNotEmpty(tele) && tele.length() > 2) {
                                telePhoneRegionCode = tele.substring(0,2);
                                telePhonePhone = tele.substring(2);
                                telePhonePhone = telePhonePhone.trim();
                            }

                        }

                    }
                    else {
                        email = aplyMemberHistoryData.getValue("AplyEmail");
//                        teleAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","2");
                        teleAddressAddress = aplyMemberHistoryData.getValue("AplyAddr2");

                        domicilePhoneRegionCode = aplyMemberHistoryData.getValue("AplyTelNo1_1");
                        domicilePhonePhone = aplyMemberHistoryData.getValue("AplyTelNo1_2");

                        telePhoneRegionCode = aplyMemberHistoryData.getValue("AplyTelNo2_1");
                        telePhonePhone = aplyMemberHistoryData.getValue("AplyTelNo2_2");

                    }



                    String domicileAddressZipCode = aplyMemberHistoryData.getValue("AplyZip1");
                    String domicileAddressLiner = aplyMemberHistoryData.getValue("Aply1Village");
                    String domicileAddressNeighborhood = aplyMemberHistoryData.getValue("AplyAddr1_3");
                    domicileAddressAddress = aplyMemberHistoryData.getValue("AplyAddr1");

                    if(StringUtils.isNotEmpty(domicileAddressZipCode)) {
                        String domicileAddressCityId = ProjUtils.toCityId(domicileAddressZipCode,dao);
                        domicileAddressAddress = ProjUtils.toCityName(domicileAddressCityId,dao) + ProjUtils.toZipCodeName(domicileAddressZipCode,dao) + domicileAddressLiner + domicileAddressNeighborhood + "鄰" + domicileAddressAddress;
                    }



//                    domicileAddressAddress = ProjUtils.toAddress(aplyMemberHistoryData,"Aply","1");
                }
                //要帶出完整戶藉/通訊地址
                else {
                    String domicileAddressZipCode = loginUserBean.getCustomizeValue("AplyZip1");
                    String domicileAddressLiner = loginUserBean.getCustomizeValue("Aply1Village");
                    String domicileAddressNeighborhood = loginUserBean.getCustomizeValue("AplyAddr1_3");

                    if(StringUtils.isNotEmpty(domicileAddressZipCode)) {
                        String domicileAddressCityId = ProjUtils.toCityId(domicileAddressZipCode,dao);
                        domicileAddressAddress = ProjUtils.toCityName(domicileAddressCityId,dao) + ProjUtils.toZipCodeName(domicileAddressZipCode,dao) + domicileAddressLiner + domicileAddressNeighborhood + "鄰" + domicileAddressAddress;
                    }

                    String teleAddressZipCode = loginUserBean.getCustomizeValue("AplyZip2");
                    if(StringUtils.isNotEmpty(teleAddressZipCode)) {
                        String teleAddressCityId = ProjUtils.toCityId(teleAddressZipCode,dao);
                        teleAddressAddress = ProjUtils.toCityName(teleAddressCityId,dao) + ProjUtils.toZipCodeName(teleAddressZipCode,dao) + teleAddressAddress;
                    }

                }

                name = StringEscapeUtils.unescapeHtml4(name);

                //裝值到content
                content.put("notice_text","<h3> 注意事項</h3><ol> <li>不開放線上修改之個人資料，您可透過以下兩種方式辦理：<br> (1)透過客服:可撥打客戶服務專線02-8751-6665按5由專人為您服務<br> (2)透過臨櫃:請您本人攜帶身分證正本及原留印鑑，至本行各<a href='123.html'><u>服務據點</u></a>辦理個人基本資料變更。<br></li> <li> 為符合「金融監督管理委員會指定非公務機關個人資料檔案安全維護辦法」之規定，本行就學貸款服務專區內，涉及<br>個人資料之交易，部分資料將以遮蔽之方式進行保護，若導致您無法確認資料之正確性，請您至本行櫃檯辦理或洽<br>24HR客服中心02-8751-6665按5將有專人竭誠為您服務。 </li></ol>");
                content.put("isRecord",isRecord);
                content.put("id",ProjUtils.toIDMark(id));
                content.put("name",ProjUtils.toNameMark(name));
                content.put("birthday",ProjUtils.toBirthdayMark(ProjUtils.toBirthday(birthday)));
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

                header.put("errorCode","0");
                header.put("errorMsg","成功");

            }

        }catch(Exception e) {
            e.printStackTrace();
        }


        JSPUtils.downLoadByString(response,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void showOTP(JSPQueryStringInfo queryStringInfo, HttpServletResponse response) throws ServletException, IOException {


        java.util.List<String> filterFontName = new ArrayList<String>();
        filterFontName.add("Webdings");
        filterFontName.add("Wingdings");
        filterFontName.add("Symbol");


        response.setContentType("image/jpeg");
        queryStringInfo.getRequest().setCharacterEncoding("utf-8");

        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);

        int width = 140, height = 35;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        Graphics g = image.getGraphics();

        Random random = new Random();

        g.setColor(getRandColor(200, 250));
        g.fillRect(0, 0, width, height);


        Font[] fonts = GraphicsEnvironment.getLocalGraphicsEnvironment().getAllFonts();
        Font font = null;

        while(true) {
            font = fonts[random.nextInt(fonts.length-1)];
            if(!filterFontName.contains(font.getName())) break;
        }

        g.setFont(new Font(font.getName(), Font.PLAIN, 38));

        g.setColor(getRandColor(160, 200));
        for (int i = 0; i < 155; i++) {
            int x = random.nextInt(width);
            int y = random.nextInt(height);
            int xl = random.nextInt(12);
            int yl = random.nextInt(12);
            g.drawLine(x, y, x + xl, y + yl);
        }


        String sRand = String.valueOf(queryStringInfo.getRequest().getSession().getAttribute("OTPNumber"));
        for (int i = 0; i < sRand.length(); i++) {
            String rand = sRand.substring(i,i+1);

            g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
            g.drawString(rand, 20 * i + 2, 28);
        }

        g.dispose();
        ImageIO.write(image, "jpeg", response.getOutputStream());
        response.getOutputStream().flush();
        response.getOutputStream().close();
    }

    private Color getRandColor(int fc, int bc) {
        Random random = new Random();
        if (fc > 255) fc = 255;
        if (bc > 255) bc = 255;
        int r = fc + random.nextInt(bc - fc);
        int g = fc + random.nextInt(bc - fc);
        int b = fc + random.nextInt(bc - fc);
        return new Color(r, g, b);
    }

    public void saveDeferment0(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {
        String eligibilityIndex = queryStringInfo.getParam("eligibilityIndex");
        String eligibilityText = queryStringInfo.getParam("eligibilityText");
        String eligibilityText0 = queryStringInfo.getParam("eligibilityText0");

        queryStringInfo.getRequest().getSession().setAttribute("eligibilityIndex",eligibilityIndex);
        queryStringInfo.getRequest().getSession().setAttribute("eligibilityText",eligibilityText);
        queryStringInfo.getRequest().getSession().setAttribute("eligibilityText0",eligibilityText0);

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());


        try{

            String isLogin = loginUserBean == null ? "N" : "Y"; //有無登入
            String isEtabs = "Y".equals(isLogin) ? (loginUserBean.getCustomizeValue("isEtabs")) : "N"; //有無線上註記
            String hasData = "Y".equals(isLogin) ? (ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(loginUserBean.getUserId(),DaoFactory.getDefaultDao()) == null ? "N" : "Y" ) : "N";//有無撥款紀錄
            String isArrears = "Y".equals(isLogin) ? (loginUserBean.getCustomizeValue("isArrear")) : "N"; //是否不欠款
            String acnoSlListStr = loginUserBean.getCustomizeValue("acnoSlList");
            String[] acnoSlList = "Y".equals(isLogin) ? acnoSlListStr.split(",") : new String[]{};
            String hasAccount = (StringUtils.isNotEmpty(acnoSlListStr) && acnoSlList.length != 0) ? "Y" : "N";//是否有貸款帳號
            String isAccountClear = "N";

            if("Y".equalsIgnoreCase(isLogin)) {

                String userId = loginUserBean.getUserId();

                //清除文件
                SQLCommand update = new SQLCommand("delete from Deferment_Doc where AplyIdNo = ? and (FlowLogId is null or FlowLogId = 0)");
                update.addParamValue(userId);
                DaoFactory.getDefaultDao().queryByCommand(null,update,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);

                for(String acnoSl: acnoSlList) {

                    if(StringUtils.isEmpty(acnoSl)) continue;

                    String responses = null;

                    String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
                    if(!"sit".equalsIgnoreCase(env)) {
                        RQBean rqBean = new RQBean();
                        rqBean.setTxId("EB382609");
                        rqBean.addRqParam("ACNO_SL",acnoSl);

                        RSBean rsBean = WebServiceAgent.callWebService(rqBean);
                        if(rsBean.isSuccess()) {
                            responses = rsBean.getTxnString();
                        }
                        else {
                            throw new Exception("查詢電文失敗:" + rsBean.getErrorMsg());
                        }
                    }
                    else {

                        responses = "<root>\n" +
                                "    <CRLN_AMT>800,000</CRLN_AMT>\n" +
                                "    <AVAIL_BAL>677,144</AVAIL_BAL>\n" +
                                "    <CUST_NO>E124876190</CUST_NO>\n" +
                                "    <CUST_NAME>陳ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ</CUST_NAME>\n" +
                                "    <PROD_STAG/>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM>1031</YR_TERM>\n" +
                                "        <DOC_NO>035003</DOC_NO>\n" +
                                "        <CRE_BRH>-705</CRE_BRH>\n" +
                                "        <INT_RATE>1.6200</INT_RATE>\n" +
                                "        <LOAN_AMT>30,720</LOAN_AMT>\n" +
                                "        <LOAN_BAL>30,720</LOAN_BAL>\n" +
                                "        <INT_DATE>108/06/30</INT_DATE>\n" +
                                "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                                "        <INT_FLG>N</INT_FLG>\n" +
                                "        <WORK_FLG>N</WORK_FLG>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT>661</INS_AMT>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM>1032</YR_TERM>\n" +
                                "        <DOC_NO>028153</DOC_NO>\n" +
                                "        <CRE_BRH>-705</CRE_BRH>\n" +
                                "        <INT_RATE>1.6200</INT_RATE>\n" +
                                "        <LOAN_AMT>30,720</LOAN_AMT>\n" +
                                "        <LOAN_BAL>30,720</LOAN_BAL>\n" +
                                "        <INT_DATE>108/06/30</INT_DATE>\n" +
                                "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                                "        <INT_FLG>N</INT_FLG>\n" +
                                "        <WORK_FLG>N</WORK_FLG>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT>661</INS_AMT>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM>1041</YR_TERM>\n" +
                                "        <DOC_NO>019001</DOC_NO>\n" +
                                "        <CRE_BRH>-320</CRE_BRH>\n" +
                                "        <INT_RATE>1.6200</INT_RATE>\n" +
                                "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                                "        <LOAN_BAL></LOAN_BAL>\n" +
                                "        <INT_DATE>108/06/30</INT_DATE>\n" +
                                "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                                "        <INT_FLG>N</INT_FLG>\n" +
                                "        <WORK_FLG>N</WORK_FLG>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT></INS_AMT>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM>1042</YR_TERM>\n" +
                                "        <DOC_NO>013429</DOC_NO>\n" +
                                "        <CRE_BRH>-705</CRE_BRH>\n" +
                                "        <INT_RATE>1.6200</INT_RATE>\n" +
                                "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                                "        <LOAN_BAL>30,708</LOAN_BAL>\n" +
                                "        <INT_DATE>108/06/30</INT_DATE>\n" +
                                "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                                "        <INT_FLG>N</INT_FLG>\n" +
                                "        <WORK_FLG>N</WORK_FLG>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT>661</INS_AMT>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM>0880</YR_TERM>\n" +
                                "        <DOC_NO>013429</DOC_NO>\n" +
                                "        <CRE_BRH>-705</CRE_BRH>\n" +
                                "        <INT_RATE>1.6200</INT_RATE>\n" +
                                "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                                "        <LOAN_BAL>30,708</LOAN_BAL>\n" +
                                "        <INT_DATE>108/06/30</INT_DATE>\n" +
                                "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                                "        <INT_FLG>N</INT_FLG>\n" +
                                "        <WORK_FLG>N</WORK_FLG>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT>661</INS_AMT>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM/>\n" +
                                "        <DOC_NO/>\n" +
                                "        <CRE_BRH/>\n" +
                                "        <INT_RATE/>\n" +
                                "        <LOAN_AMT/>\n" +
                                "        <LOAN_BAL/>\n" +
                                "        <INT_DATE/>\n" +
                                "        <NEXT_INT_DATE/>\n" +
                                "        <INT_FLG/>\n" +
                                "        <WORK_FLG/>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT/>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM/>\n" +
                                "        <DOC_NO/>\n" +
                                "        <CRE_BRH/>\n" +
                                "        <INT_RATE/>\n" +
                                "        <LOAN_AMT/>\n" +
                                "        <LOAN_BAL/>\n" +
                                "        <INT_DATE/>\n" +
                                "        <NEXT_INT_DATE/>\n" +
                                "        <INT_FLG/>\n" +
                                "        <WORK_FLG/>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT/>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM/>\n" +
                                "        <DOC_NO/>\n" +
                                "        <CRE_BRH/>\n" +
                                "        <INT_RATE/>\n" +
                                "        <LOAN_AMT/>\n" +
                                "        <LOAN_BAL/>\n" +
                                "        <INT_DATE/>\n" +
                                "        <NEXT_INT_DATE/>\n" +
                                "        <INT_FLG/>\n" +
                                "        <WORK_FLG/>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT/>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM/>\n" +
                                "        <DOC_NO/>\n" +
                                "        <CRE_BRH/>\n" +
                                "        <INT_RATE/>\n" +
                                "        <LOAN_AMT/>\n" +
                                "        <LOAN_BAL/>\n" +
                                "        <INT_DATE/>\n" +
                                "        <NEXT_INT_DATE/>\n" +
                                "        <INT_FLG/>\n" +
                                "        <WORK_FLG/>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT/>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM/>\n" +
                                "        <DOC_NO/>\n" +
                                "        <CRE_BRH/>\n" +
                                "        <INT_RATE/>\n" +
                                "        <LOAN_AMT/>\n" +
                                "        <LOAN_BAL/>\n" +
                                "        <INT_DATE/>\n" +
                                "        <NEXT_INT_DATE/>\n" +
                                "        <INT_FLG/>\n" +
                                "        <WORK_FLG/>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT/>\n" +
                                "    </TxRepeat>\n" +
                                "    <TxRepeat>\n" +
                                "        <YR_TERM/>\n" +
                                "        <DOC_NO/>\n" +
                                "        <CRE_BRH/>\n" +
                                "        <INT_RATE/>\n" +
                                "        <LOAN_AMT/>\n" +
                                "        <LOAN_BAL/>\n" +
                                "        <INT_DATE/>\n" +
                                "        <NEXT_INT_DATE/>\n" +
                                "        <INT_FLG/>\n" +
                                "        <WORK_FLG/>\n" +
                                "        <PARTIAL_FLG/>\n" +
                                "        <INS_AMT/>\n" +
                                "    </TxRepeat>\n" +
                                "    <C_NAME>合計：</C_NAME>\n" +
                                "    <LOAN_AMT_TOT>122,856</LOAN_AMT_TOT>\n" +
                                "    <LOAN_BAL_TOT>122,856</LOAN_BAL_TOT>\n" +
                                "</root>\n";
                    }

                    Document doc = DocumentHelper.parseText(responses);

                    boolean isClear = checkAccountDetail(doc);
                    if(isClear) {
                        isAccountClear = "Y";
                    }

                }
            }

            JSONObject jsonObject = new JSONObject();

            jsonObject.put("isLogin",isLogin);
            jsonObject.put("isEtabs",isEtabs);
            jsonObject.put("hasData",hasData);
            jsonObject.put("isArrears",isArrears);
            jsonObject.put("hasAccount",hasAccount);
            jsonObject.put("isAccountClear",isAccountClear);

            JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
        }catch(Exception e) {
            e.printStackTrace();
        }
    }

    public void getDefaultAddress(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        JSONObject jsonObject = new JSONObject();


        try{

            jsonObject.put("addr","台北市中山區中山北路二段50號");

            Map<String,String> searchMap = new LinkedHashMap<String, String>();
            searchMap.put("b.BranchId","870"); //就貸組預設的分行代號
            Vector<DataObject> ret = ProjUtils.getBranch(searchMap, DaoFactory.getDefaultDao());
            if(ret.size() != 0) {
                DataObject branch = ret.get(0);
                jsonObject.put("branchName",branch.getValue("branchName"));
                jsonObject.put("addr",branch.getValue("addr"));
                jsonObject.put("tel",branch.getValue("Tel"));
            }


        }catch(Exception e) {
            e.printStackTrace();
        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }


    public void uploadDefermentDocument(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {
        JSONObject jsonObject = new JSONObject();

        try{
            jsonObject.put("isSuccess","N");

            LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
            String userId = loginUserBean.getUserId();

            String docId = queryStringInfo.getParam("docId");
            Map<String,File> uploadFileMap = queryStringInfo.getUploadFilesMap();
            GardenLog.log(GardenLog.DEBUG,"uploadFileMap size = " + uploadFileMap.size());

            for(String inputName : uploadFileMap.keySet()) {
                File file = uploadFileMap.get(inputName);
                GardenLog.log(GardenLog.DEBUG,"uploadFileMap inputName = " + inputName + ",path = " + file.getPath());

                //isPositiveFile：身份證正面
                //isNegativeFile：身份證反面
                //studentIdPositiveFile：學生證正面
                //studentIdNegativeFile：學生證反面
                //additionalFile：在學證明
                String docType = "";
                if(inputName.startsWith("isPositiveFile")) docType = "1";
                else if(inputName.startsWith("isNegativeFile")) docType = "2";
                else if(inputName.startsWith("studentIdPositiveFile")) docType = "3";
                else if(inputName.startsWith("studentIdNegativeFile")) docType = "4";
                else if(inputName.startsWith("additionalFile")) docType = "5";

//                if("isPositiveFile".equalsIgnoreCase(inputName)) docType = "1";
//                else if("isNegativeFile".equalsIgnoreCase(inputName)) docType = "2";
//                else if("studentIdPositiveFile".equalsIgnoreCase(inputName)) docType = "3";
//                else if("studentIdNegativeFile".equalsIgnoreCase(inputName)) docType = "4";
//                else if("additionalFile".equalsIgnoreCase(inputName)) docType = "5";

                if(StringUtils.isNotEmpty(docType)) {

                    IDao dao = DaoFactory.getDefaultDao();

                    //修改的話要刪除原本的
                    if(StringUtils.isNotEmpty(docId)) {

                        //先解開
                        docId = ProjUtils.decodingNumber(docId);

                        SQLCommand delete = new SQLCommand("delete from Deferment_Doc where DocId = ?");
                        delete.addParamValue(docId);
                        dao.queryByCommand(null,delete,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);
//                        SQLCommand delete = new SQLCommand("delete from Deferment_Doc where AplyIdNo = ? and DocType = ? and (FlowLogId is null or FlowLogId = 0)");
//                        delete.addParamValue(userId);
//                        delete.addParamValue(docType);
//                        dao.queryByCommand(null,delete,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);
                    }


                    //再新增
                    DataObject Deferment_Doc = DaoFactory.getDefaultDataObject("Deferment_Doc");
                    Deferment_Doc.setValue("AplyIdNo",userId);
                    Deferment_Doc.setValue("DocType",docType);
                    Deferment_Doc.setValue("original_file_name",file.getName());
                    Deferment_Doc.setValue("CreateTime",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));
                    Deferment_Doc.setValue("Size",file.length() + "");

                    dao.insert(Deferment_Doc);

                    docId = Deferment_Doc.getValue("DocId");

                    //再更新文件內容，轉成binary後透過原生JDBC物件來更新資料
                    Connection conn = null;
                    PreparedStatement ps = null;
                    FileInputStream is = null;

                    try{
                        conn = ((SQLConnection)ORMAPI.getConnection("db")).getConnection();

                        ps = conn.prepareStatement("update Deferment_Doc set DocFile = ? where DocId = ?");

                        is = new FileInputStream(file);

                        GardenLog.log(GardenLog.DEBUG,"file size = " + (int) file.length());
                        ps.setBinaryStream(1, is, (int) file.length());
                        ps.setString(2,docId);
                        ps.execute();

                    }catch(Exception e) {
                        e.printStackTrace();
                    }finally{
                        if(is != null) {
                            is.close();
                        }

                        if(ps != null) {
                            ps.close();
                        }

                        if(conn != null) {
                            conn.close();
                        }
                    }

                    jsonObject.put("isSuccess","Y");
                    jsonObject.put("src",file.getName());
                    jsonObject.put("size",file.length() + "");
                    jsonObject.put("fileNameExtension",file.getName().substring(file.getName().lastIndexOf(".") + 1));
                    jsonObject.put("showPath",file.getName());
                    jsonObject.put("docId",ProjUtils.encodingNumber(docId));
                }


            }
        }catch(Exception e) {
            e.printStackTrace();
        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void uploadApplyDocument(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        JSONObject jsonObject = new JSONObject();

        try{
            jsonObject.put("isSuccess","N");

            LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
            String userId = loginUserBean.getUserId();

            Map<String,File> uploadFileMap = queryStringInfo.getUploadFilesMap();
            GardenLog.log(GardenLog.DEBUG,"uploadFileMap size = " + uploadFileMap.size());

            String docId = queryStringInfo.getParam("docId");

            for(String inputName : uploadFileMap.keySet()) {
                File file = uploadFileMap.get(inputName);
                GardenLog.log(GardenLog.DEBUG,"uploadFileMap inputName = " + inputName + ",path = " + file.getPath());

                //isPositiveFile：身份證正面
                //isNegativeFile：身份證反面
                //registerFile：註冊
                String docType = "";
                if(inputName.startsWith("idPositiveFile")) docType = "1";
                else if(inputName.startsWith("idNegativeFile")) docType = "2";
                else if(inputName.startsWith("registerFile")) docType = "3";
                else if(inputName.startsWith("lowIncomeFile")) docType = "4";

                if(StringUtils.isNotEmpty(docType)) {

                    IDao dao = DaoFactory.getDefaultDao();

                    if(StringUtils.isNotEmpty(docId)) {

                        //先解開
                        docId = ProjUtils.decodingNumber(docId);

                        //先刪除原本的文件
                        SQLCommand delete = new SQLCommand("delete from AplyMemberTuitionLoanDtl_Doc where DocId = ?");
                        delete.addParamValue(docId);
                        dao.queryByCommand(null,delete,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);
//                        SQLCommand delete = new SQLCommand("delete from AplyMemberTuitionLoanDtl_Doc where DocId = ? and DocType = ?");
//                        delete.addParamValue(userId);
//                        delete.addParamValue(docType);
//                        dao.qAplyMemberTuitionLoanDtl_DocueryByCommand(null,delete,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);
                    }

                    //再新增
                    DataObject aplyMemberTuitionLoanDtlDoc = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl_Doc");
                    aplyMemberTuitionLoanDtlDoc.setValue("AplyIdNo",userId);
                    aplyMemberTuitionLoanDtlDoc.setValue("DocType",docType);
                    aplyMemberTuitionLoanDtlDoc.setValue("original_file_name",file.getName());
                    aplyMemberTuitionLoanDtlDoc.setValue("CreateTime",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));
                    aplyMemberTuitionLoanDtlDoc.setValue("Size",file.length() + "");

                    dao.insert(aplyMemberTuitionLoanDtlDoc);

                    docId = aplyMemberTuitionLoanDtlDoc.getValue("DocId");

                    //再更新文件內容，轉成binary後透過原生JDBC物件來更新資料
                    Connection conn = null;
                    PreparedStatement ps = null;
                    FileInputStream is = null;

                    try{
                        conn = ((SQLConnection)ORMAPI.getConnection("db")).getConnection();

                        ps = conn.prepareStatement("update AplyMemberTuitionLoanDtl_Doc set DocFile = ? where DocId = ?");

                        is = new FileInputStream(file);

                        GardenLog.log(GardenLog.DEBUG,"file size = " + (int) file.length());
                        ps.setBinaryStream(1, is, (int) file.length());
                        ps.setString(2,docId);
                        ps.execute();

                    }catch(Exception e) {
                        e.printStackTrace();
                    }finally{
                        if(is != null) {
                            is.close();
                        }

                        if(ps != null) {
                            ps.close();
                        }

                        if(conn != null) {
                            conn.close();
                        }
                    }

                    jsonObject.put("isSuccess","Y");
                    jsonObject.put("size",file.length() + "");
                    jsonObject.put("fileNameExtension",file.getName().substring(file.getName().lastIndexOf(".") + 1));
                    jsonObject.put("src",file.getName());
                    jsonObject.put("showPath",file.getName());
                    jsonObject.put("docId",ProjUtils.encodingNumber(docId));
                }


            }
        }catch(Exception e) {
            e.printStackTrace();
        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getExpectBranchPeoples(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String date = queryStringInfo.getParam("date");
        String branchId = queryStringInfo.getParam("branchId");

        JSONObject jsonObject = new JSONObject();
        JSONArray booking = new JSONArray();
        JSONArray noBusiness = new JSONArray();

        try{

            jsonObject.put("booking",booking);
            jsonObject.put("noBusiness",noBusiness);

            IDao dao = DaoFactory.getDefaultDao();

            //先去查這間分行的資料
            Map<String,String> searchMap = new HashMap<String,String>();
            searchMap.put("b.BranchId",branchId);
            Vector<DataObject> branchRS = ProjUtils.getBranch(searchMap,dao);

            if(branchRS.size() != 0) {
                DataObject branch = branchRS.get(0);

                //取得分行每個時段可預約的人數
                int total = Integer.parseInt(branch.getValue("PeriodPeoples"));

                jsonObject.put("maxPeople",total + "");

                //再查目前該分行已被預約哪些時間
                //date是前端傳入的月份,自己加上目前的年
                String today = DateUtil.getTodayString();
                String todayYear = today.substring(0,4);

                String month = StringUtils.leftPad(date,2,"0");

                //讀一張可以選擇的營業日的BUSINESS_DAY Table
                List<String> noBusinessDays = new ArrayList<String>();

                //放入當月/及後兩個月
                String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
                if(!"sit".equalsIgnoreCase(env)) {
                    DBUtils.getNoBusinessDay(todayYear,month,noBusinessDays);
                }
                else {
                    String y = DateUtil.getTodayString().substring(0,4);
                    String m = DateUtil.getTodayString().substring(4,6);

                    //配合公司測試，從1-28每7天一個假日
                    for(int i=1;i<=28;i++) {
                        if(i % 7 == 0) {
                            String day = String.valueOf(i);
                            day = StringUtils.leftPad(day,2,"0");

                            noBusinessDays.add(y + "-" + m + "-" + day);
                        }

                    }
                }

                for(String day : noBusinessDays) {
                    noBusiness.put(day);
                }

                SQLCommand query = new SQLCommand("select ExpectDate,ExpectTime\n" +
                        "from AplyMemberTuitionLoanDtl \n" +
                        "where 1=1\n" +
                        "and ExpectBranchId = ? \n" +
//                        "and AplyStatus = 'UNVERIFIED'\n" +
                        "and ExpectDate like ?\n" +
                        "order by ExpectDate,ExpectTime");
                query.addParamValue(branchId);
                query.addParamValue(todayYear + "%");
                Vector<DataObject> ret = new Vector<DataObject>();
                dao.queryByCommand(ret,query,null,null);

                //先把結果放在一個map，由日期為key，值是該日已預約的時段
                Map<String,List<String>> expectMap = new LinkedHashMap<String, List<String>>();
                for(DataObject d : ret) {

                    String expectDate = d.getValue("ExpectDate");
                    String expectTime = d.getValue("ExpectTime");

                    List<String> timeList = expectMap.get(expectDate);
                    if(timeList == null) timeList = new ArrayList<String>();

                    timeList.add(expectTime);

                    expectMap.put(expectDate,timeList);
                }

                //開始依照每一天跑
                for(String expectDate : expectMap.keySet()) {

                    List<String> timeList = expectMap.get(expectDate);
//                    String isFull = timeList.size() == periodPeoples ? "Y" : "N";

                    JSONObject tmp = new JSONObject();

                    JSONArray timeArray = new JSONArray();

                    Map<String,Integer> timeMap = new LinkedHashMap<String, Integer>();
                    for(String time : timeList) {
                        Integer count = timeMap.get(time);

                        if(count == null) count = new Integer(0);
                        count = new Integer(count.intValue() + 1);

                        timeMap.put(time,count);
                    }


                    //依照這間分行的每個時間可預約人數計算
                    String isFull = "Y";
                    for(String time : timeMap.keySet()) {
                        Integer count = timeMap.get(time);
                        String timeFull = (total <= count.intValue() ? "Y" : "N");

                        if("N".equalsIgnoreCase(timeFull)) isFull = "N";

                        JSONObject timeObj = new JSONObject();

                        timeObj.put("total",total + "");
                        timeObj.put("count",count.intValue());
                        timeObj.put("time",time);
                        timeObj.put("isFull",timeFull);

                        timeArray.put(timeObj);
                    }

                    tmp.put("date",DateUtil.convert14ToDate("yyyy-MM-dd",expectDate + "000000"));
                    tmp.put("isFull",isFull);
                    tmp.put("times",timeArray);

                    booking.put(tmp);
                }
            }


        }catch(Exception e) {
            e.printStackTrace();
        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getFamilyInfo(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {
        HttpServletRequest req = queryStringInfo.getRequest();
        String type = queryStringInfo.getParam("type");
        String convert = queryStringInfo.getParam("convert");
        String noMark = queryStringInfo.getParam("noMark");

        JSONObject jsonObject = new JSONObject();
        JSONObject header = new JSONObject();
        JSONObject content = new JSONObject();

        IDao dao = DaoFactory.getDefaultDao();

        try{
            jsonObject.put("Header",header);
            jsonObject.put("Content",content);

            //判斷是否有登入
            LoginUserBean loginUserBean = ProjUtils.getLoginBean(req.getSession());
            if(loginUserBean == null) {
                header.put("errorCode","99");
                header.put("errorMsg", "系統逾時，請重新登入");
            }
            else {
                String userId = loginUserBean.getUserId();
                String isGuarantor = "",id = "",name = "",birthday = "",telePhoneRegionCode = "",telePhonePhone = "",mobile = "";
                String domicileAddressCityId = "" , domicileAddressCityName = "", domicileAddressZipCode = "",domicileAddressZipCodeName="",domicileLinerName = "",domicileAddressNeighborhood = "", domicileAddressAddress = "";
                String applyBirthday = "";

                //如果有撥款紀錄就撈已撥款，如果沒有撥款紀錄就撈目前當學年度當學期的資料
                DataObject aplyMemberData = null;
                aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
                if(aplyMemberData == null && ProjUtils.isPayHistory(userId,dao)) {
                    aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);
                }

                //取得第1-1跟第二步的草稿
                String draftXML1 = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
                if(draftXML1 != null){
                    Document doc = DocumentHelper.parseText(draftXML1);
                    Element root = doc.getRootElement();

                    if(StringUtils.isNotEmpty(draftXML1)) {
                        //抓申請人生日
                        String yearBirthday = root.element("birthday0").getText();
                        String monthBirthday = root.element("birthday2").getText();
                        String dayBirthday = root.element("birthday4").getText();

                        //if(root1.element("birthday") != null) applyBirthday = root1.element("birthday").getText();
                        applyBirthday = yearBirthday + monthBirthday + dayBirthday;
                        applyBirthday = ProjUtils.toYYYYBirthday(applyBirthday);
                    }
                }
                else{
                    applyBirthday = aplyMemberData.getValue("AplyBirthday");
                }


                //如果有第二步草稿，就拿草稿的
                String draftXML = FlowUtils.getDraftData(userId, "apply", "apply2", dao);
                if(StringUtils.isNotEmpty(draftXML)) {
                    Document doc = DocumentHelper.parseText(draftXML);
                    Element root = doc.getRootElement();

                    if(root.element(type + "_id") != null) {
                        id = root.element(type + "_id").getText();
                        name = root.element(type + "_name").getText();
                        birthday = ProjUtils.toDraftBirthday(root.element(type + "_birthday0").getText(),root.element(type + "_birthday2").getText(),root.element(type + "_birthday4").getText());

                        telePhoneRegionCode = root.element(type + "_regionCode").getText();
                        telePhonePhone = root.element(type + "_phone").getText();
                        mobile = root.element(type + "_mobile").getText();

                        domicileAddressCityId = root.element(type + "_cityId_domi") != null ? root.element(type + "_cityId_domi").getText() : "";
                        domicileAddressZipCode = root.element(type + "_zipCode_domi") != null ? root.element(type + "_zipCode_domi").getText() : "";
                        domicileLinerName = root.element(type + "_liner_domi") != null ? root.element(type + "_liner_domi").getText() : "";
                        domicileAddressNeighborhood = root.element(type + "_neighborhood_domi") != null ? root.element(type + "_neighborhood_domi").getText() : "";
                        domicileAddressAddress = root.element(type + "_address_domi") != null ? root.element(type + "_address_domi").getText() : "";
                    }
                }
                else if (aplyMemberData != null){
                    //本學期有申請過案件就撈申請案件；無則撈撥款紀錄

                    //type：父親資料father / 母親資料mother / 第三人資料thirdParty / 配偶資料spouse
                    String dbColumnPrefix = familyTypeMap.get(type);

                    //判斷是否申請人已成年(用來判斷寫入欄位是到監護人還是連帶保證人
                    boolean isAdult = ProjUtils.isAdult(applyBirthday);

                    //如果成年的話，改成保證人War欄位
                    if(isAdult && "Gd1".equalsIgnoreCase(dbColumnPrefix)) {
                        dbColumnPrefix = "War";
                    }

                    String zipCode = aplyMemberData.getValue(dbColumnPrefix + "_Zip");

                    String cityId = ProjUtils.toCityId(zipCode,dao);

                    id = aplyMemberData.getValue(dbColumnPrefix + "_IdNo");
                    name = aplyMemberData.getValue(dbColumnPrefix + "_Name");
                    birthday = aplyMemberData.getValue(dbColumnPrefix + "_Birthday");
                    birthday = ProjUtils.toBirthday(birthday);

                    telePhoneRegionCode = aplyMemberData.getValue(dbColumnPrefix + "_TelNo1");
                    telePhonePhone = aplyMemberData.getValue(dbColumnPrefix + "_TelNo2");
                    mobile = aplyMemberData.getValue(dbColumnPrefix + "_CellPhoneNo");

                    domicileAddressCityId = cityId;
                    domicileAddressZipCode = aplyMemberData.getValue(dbColumnPrefix + "_Zip");
                    domicileLinerName = aplyMemberData.getValue(dbColumnPrefix + "Village");
                    domicileAddressNeighborhood = aplyMemberData.getValue(dbColumnPrefix + "_Addr_3");
                    domicileAddressAddress = aplyMemberData.getValue(dbColumnPrefix+"Addr");
//                  domicileAddressAddress = dataObject.getValue(ProjUtils.toAddress(dataObject,dbColumnPrefix + "_"));
                }

                //代碼轉成中文顯示(資料確認頁會使用到
                if("Y".equals(convert)) {
                    domicileAddressCityId = ProjUtils.toCityName(domicileAddressCityId,dao);
                    domicileAddressZipCode = ProjUtils.toZipCodeName(domicileAddressZipCode,dao);

                    domicileAddressCityName = domicileAddressCityId;
                    domicileAddressZipCodeName = domicileAddressZipCode;
                }
                else{
                    //轉成中文
                    domicileAddressCityName = ProjUtils.toCityName(domicileAddressCityId,dao);
                    domicileAddressZipCodeName = ProjUtils.toZipCodeName(domicileAddressZipCode,dao);
                }

                //2016-08-23 added by titan 轉隱碼
                name = StringEscapeUtils.unescapeHtml4(name);

                //隱碼
                if(!"Y".equalsIgnoreCase(noMark)) {
                    MarkBean markBean = (MarkBean) queryStringInfo.getRequest().getSession().getAttribute("MarkBean"); //因為這一段會同呼叫我很多次，所以要抓session的
                    if(markBean == null) markBean = new MarkBean();

                    markBean.addCode(type + "_id",id,ProjUtils.toIDMark(id));
                    id = ProjUtils.toIDMark(id);

                    markBean.addCode(type + "_name",name,ProjUtils.toNameMark(name));
                    name = ProjUtils.toNameMark(name);

                    markBean.addCode(type + "_phone",telePhonePhone,ProjUtils.toTelMark(telePhonePhone));
                    telePhonePhone = ProjUtils.toTelMark(telePhonePhone);

                    markBean.addCode(type + "_mobile",mobile,ProjUtils.toTelMark(mobile));
                    mobile = ProjUtils.toTelMark(mobile);

                    markBean.addCode(type + "_liner_domi",domicileLinerName,ProjUtils.toAddressAllMark(domicileLinerName));
//                    domicileLinerName = ProjUtils.toAddressAllMark(domicileLinerName);

                    markBean.addCode(type + "_neighborhood_domi",domicileAddressNeighborhood,ProjUtils.toAddressAllMark(domicileAddressNeighborhood));
                    domicileAddressNeighborhood = ProjUtils.toAddressAllMark(domicileAddressNeighborhood);

                    markBean.addCode(type + "_address_domi",domicileAddressAddress,ProjUtils.toAddressMark(domicileAddressAddress));
                    domicileAddressAddress = ProjUtils.toAddressMark(domicileAddressAddress);

                    queryStringInfo.getRequest().getSession().setAttribute("MarkBean",markBean);
                }


                content.put("isGuarantor",isGuarantor);
                content.put("id",id);
                content.put("name",name);
                content.put("birthday",birthday);

                JSONObject telePhone = new JSONObject();
                telePhone.put("regionCode",telePhoneRegionCode);
                telePhone.put("phone",telePhonePhone);
                content.put("telePhone",telePhone);

                content.put("mobile",mobile);

                JSONObject domicileAddress = new JSONObject();
                domicileAddress.put("cityId",domicileAddressCityId);
                domicileAddress.put("zipCode",domicileAddressZipCode);
                domicileAddress.put("liner",domicileLinerName);
                domicileAddress.put("neighborhood",domicileAddressNeighborhood);
                domicileAddress.put("address",domicileAddressAddress);

                domicileAddress.put("cityName",domicileAddressCityName);
                domicileAddress.put("zipCodeName",domicileAddressZipCodeName);

                content.put("domicileAddress",domicileAddress);

                header.put("errorCode","0");
                header.put("errorMsg","成功");
            }
        }catch(Exception e) {
            e.printStackTrace();

            try{
                header.put("errorCode","99");
                header.put("errorMsg",e.getMessage());
            }catch(Exception ex) {
            }
        }
        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getNews(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        JSONObject jsonObject = new JSONObject();
        JSONArray news = new JSONArray();

        try{
            jsonObject.put("news",news);

            String today = DateUtil.convert14ToDate("yyyy-MM-dd",DateUtil.getTodayString());
            IDao dao = DaoFactory.getDefaultDao();
            SQLCommand query = new SQLCommand("select top(5)Title,News \n" +
                    "from News\n" +
                    "where 1=1\n" +
                    "and StartTime <= ?\n" +
                    "and StopTime >= ?\n" +
                    "order by StartTime desc");
            query.addParamValue(today + " 00:00:00");
            query.addParamValue(today + " 23:59:59");
            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);


            int titleLen = 15;//長度限制15
//            int contentLen = 60;//長度限制60
            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();

                String title = d.getValue("Title");
                String content = d.getValue("News");

                if(title.length() > titleLen) {
                    title = title.substring(0,titleLen);
                }

//                if(content.length() > contentLen) {
//                    content = content.substring(0,contentLen);
//                }

                tmp.put("Title",title);
                tmp.put("Content",content);

                news.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getQA(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        JSONObject jsonObject = new JSONObject();
        JSONArray qa = new JSONArray();

        try{
            jsonObject.put("qa",qa);

            IDao dao = DaoFactory.getDefaultDao();
            SQLCommand query = new SQLCommand("select TopicNo,TopicDesc from QA_Topic\n" +
                    "order by TopicNo");
            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();
                JSONArray detail = new JSONArray();

                String topicNo = d.getValue("TopicNo");
                tmp.put("TopicNo",topicNo);
                tmp.put("TopicDesc",d.getValue("TopicDesc"));
                tmp.put("detail",detail);

                SQLCommand queryDetail = new SQLCommand("select DataNo,Question,Answer from QA_Data\n" +
                        "where TopicNo = ?\n" +
                        "order by DataNo");
                queryDetail.addParamValue(topicNo);
                Vector<DataObject> detailRS = new Vector<DataObject>();
                dao.queryByCommand(detailRS,queryDetail,null,null);

                for(DataObject detailObj : detailRS) {
                    JSONObject detailJSON = new JSONObject();

                    detailJSON.put("DataNo",detailObj.getValue("DataNo"));
                    detailJSON.put("Question",detailObj.getValue("Question"));
                    detailJSON.put("Answer",detailObj.getValue("Answer"));

                    detail.put(detailJSON);
                }

                qa.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getDocument(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        JSONObject jsonObject = new JSONObject();
        JSONArray document = new JSONArray();

        try{
            jsonObject.put("document",document);

            IDao dao = DaoFactory.getDefaultDao();
            SQLCommand query = new SQLCommand("select TopicNo,TopicDesc from Document_Topic\n" +
                    "order by TopicNo");
            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();
                JSONArray detail = new JSONArray();

                String topicNo = d.getValue("TopicNo");
                tmp.put("TopicNo",topicNo);
                tmp.put("TopicDesc",d.getValue("TopicDesc"));
                tmp.put("detail",detail);

                SQLCommand queryDetail = new SQLCommand("select DataNo,Title from Document_Data\n" +
                        "where TopicNo = ?\n" +
                        "order by DataNo");
                queryDetail.addParamValue(topicNo);
                Vector<DataObject> detailRS = new Vector<DataObject>();
                dao.queryByCommand(detailRS,queryDetail,null,null);

                for(DataObject detailObj : detailRS) {
                    JSONObject detailJSON = new JSONObject();

                    String dataNo = detailObj.getValue("DataNo");
                    dataNo = new String(Base64.encodeBase64(dataNo.getBytes("utf-8")),"utf-8");

                    detailJSON.put("DataNo",dataNo);
                    detailJSON.put("Title",detailObj.getValue("Title"));

                    detail.put(detailJSON);
                }

                document.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void downloadDefermentDocument(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String isPreview = queryStringInfo.getParam("isPreview");
        String docId = queryStringInfo.getParam("docId");
        String userAgent = queryStringInfo.getRequest().getHeader("user-agent");

        Connection conn = null;
        try{

            //先解開
            docId = ProjUtils.decodingNumber(docId);

            boolean isIE = userAgent.contains("MSIE") || userAgent.contains("Trident/7.0");

            conn = ((SQLConnection) ORMAPI.getConnection("db")).getConnection();

            PreparedStatement ps = conn.prepareStatement("select original_file_name,DocFile from Deferment_Doc where DocId = ?");
            ps.setString(1,docId);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                String uploadTempFolder = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("uploadTempFolder");

                String fileName = rs.getString("original_file_name");
                Blob blob = rs.getBlob("DocFile");

                InputStream blobis = blob.getBinaryStream();
                File f = new File(uploadTempFolder + "/" + fileName);
                if(f.exists()) {
                    f.delete();
                }

                FileOutputStream fos = new FileOutputStream(f);

                int b = 0;
                while ((b = blobis.read()) != -1)
                {
                    fos.write(b);
                }

                fos.flush();
                fos.close();

                JSPUtils.downLoadFile(resp,getServletContext().getMimeType(fileName),f.getPath(),!"Y".equalsIgnoreCase(isPreview),f.getName(),isIE);

            }

        }catch(Exception e) {
            e.printStackTrace();
        }finally{
            if(conn != null) {
                try{
                    conn.close();
                }catch(Exception ex) {

                }
            }
        }
    }

    public void downloadApplyDocument(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String isPreview = queryStringInfo.getParam("isPreview");
        String docId = queryStringInfo.getParam("docId");
        String userAgent = queryStringInfo.getRequest().getHeader("user-agent");

        Connection conn = null;
        try{

            //先解開
            docId = ProjUtils.decodingNumber(docId);


            boolean isIE = userAgent.contains("MSIE") || userAgent.contains("Trident/7.0");

            conn = ((SQLConnection) ORMAPI.getConnection("db")).getConnection();

            PreparedStatement ps = conn.prepareStatement("select original_file_name,DocFile from AplyMemberTuitionLoanDtl_Doc where DocId = ?");
            ps.setString(1,docId);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                String uploadTempFolder = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("uploadTempFolder");

                String fileName = rs.getString("original_file_name");
                Blob blob = rs.getBlob("DocFile");

                InputStream blobis = blob.getBinaryStream();
                File f = new File(uploadTempFolder + "/" + fileName);
                if(f.exists()) {
                    f.delete();
                }

                FileOutputStream fos = new FileOutputStream(f);

                int b = 0;
                while ((b = blobis.read()) != -1)
                {
                    fos.write(b);
                }

                fos.flush();
                fos.close();

                JSPUtils.downLoadFile(resp,getServletContext().getMimeType(fileName),f.getPath(),!"Y".equalsIgnoreCase(isPreview),f.getName(),isIE);

            }

        }catch(Exception e) {
            e.printStackTrace();
        }finally{
            if(conn != null) {
                try{
                    conn.close();
                }catch(Exception ex) {

                }
            }
        }
    }

    public void downloadDocument(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String isPreview = queryStringInfo.getParam("isPreview");
        String dataNo = queryStringInfo.getParam("dataNo");
        String userAgent = queryStringInfo.getRequest().getHeader("user-agent");

        Connection conn = null;
        try{
            dataNo = new String(Base64.decodeBase64(dataNo.getBytes("utf-8")),"utf-8");

            boolean isIE = userAgent.contains("MSIE") || userAgent.contains("Trident/7.0");

            conn = ((SQLConnection) ORMAPI.getConnection("db")).getConnection();

            PreparedStatement ps = conn.prepareStatement("select Title,Data from Document_Data where DataNo = ?");
            ps.setString(1,dataNo);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                String uploadTempFolder = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("uploadTempFolder");

                String fileName = rs.getString("Title");
                Blob blob = rs.getBlob("Data");

                InputStream blobis = blob.getBinaryStream();
                File f = new File(uploadTempFolder + "/" + fileName + ".pdf");
                if(f.exists()) {
                    f.delete();
                }

                FileOutputStream fos = new FileOutputStream(f);

                int b = 0;
                while ((b = blobis.read()) != -1)
                {
                    fos.write(b);
                }

                fos.flush();
                fos.close();

                JSPUtils.downLoadFile(resp,getServletContext().getMimeType(".pdf"),f.getPath(),!"Y".equalsIgnoreCase(isPreview),f.getName(),isIE);

            }

        }catch(Exception e) {
            e.printStackTrace();
        }finally{
            if(conn != null) {
                try{
                    conn.close();
                }catch(Exception ex) {

                }
            }
        }
    }

    public void repaymentInquiry(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String account = queryStringInfo.getParam("account");
        String startDate = queryStringInfo.getParam("start_date");
        String endDate = queryStringInfo.getParam("end_date");

        //日期格式轉成八碼
        startDate = DateUtil.convertDateTo14(startDate).substring(0,8);
        endDate = DateUtil.convertDateTo14(endDate).substring(0,8);

        JSONObject jsonObject = new JSONObject();
        JSONObject data = new JSONObject();
        JSONArray client_type = new JSONArray();
        JSONArray repayment_detail = new JSONArray();

        String result = "";
        try{

            data.put("client_type",client_type);
            data.put("repayment_detail",repayment_detail);

            jsonObject.put("data",data);

            String responses = null;

            String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
            if(!"sit".equalsIgnoreCase(env)) {
                RQBean rqBean = new RQBean();
                rqBean.setTxId("EB382607");
                rqBean.addRqParam("FUNC","1");
                rqBean.addRqParam("ACNO_SL",account);
                rqBean.addRqParam("STR_DATE",startDate);
                rqBean.addRqParam("END_DATE",endDate);


                RSBean rsBean = WebServiceAgent.callWebService(rqBean);

                if(rsBean.isSuccess()) {

                    responses = rsBean.getTxnString();

                    //如果還有電文就繼續
                    if("C".equalsIgnoreCase(rsBean.getServiceHeader().getHRETRN())) {
                        responses = moreTxData(responses,rqBean,rsBean.getServiceHeader().getHSTANO(),"C");
                    }
                }
                else {
                    throw new Exception("查詢電文失敗:"+rsBean.getErrorMsg());
                }
            }
            else {
                responses = "<root>\n" +
                        "    <ACNO_SL>20001410029087</ACNO_SL>\n" +
                        "    <CUST_NO>A126006736</CUST_NO>\n" +
                        "    <CUST_NAME>楊ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ</CUST_NAME>\n" +
                        "    <TxRepeat>\n" +
                        "        <FILED_01/>\n" +
                        "        <TX_DATE>104/01/07</TX_DATE>\n" +
                        "        <FILED_02/>\n" +
                        "        <PRN_AMT>561</PRN_AMT>\n" +
                        "        <FILED_03/>\n" +
                        "        <INT_AMT>59</INT_AMT>\n" +
                        "        <FILED_04/>\n" +
                        "        <PNT_AMT>0</PNT_AMT>\n" +
                        "        <FILED_05/>\n" +
                        "        <DLY_AMT>0</DLY_AMT>\n" +
                        "        <FILED_06/>\n" +
                        "        <TOT_AMT>620</TOT_AMT>\n" +
                        "        <YR_TERM>0951</YR_TERM>\n" +
                        "        <MEMO/>\n" +
                        "        <FILED_07/>\n" +
                        "        <LOAN_BAL>38,338</LOAN_BAL>\n" +
                        "        <FIELD_08/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <FILED_01/>\n" +
                        "        <TX_DATE>104/02/09</TX_DATE>\n" +
                        "        <FILED_02/>\n" +
                        "        <PRN_AMT>1</PRN_AMT>\n" +
                        "        <FILED_03/>\n" +
                        "        <INT_AMT>0</INT_AMT>\n" +
                        "        <FILED_04/>\n" +
                        "        <PNT_AMT>0</PNT_AMT>\n" +
                        "        <FILED_05/>\n" +
                        "        <DLY_AMT>0</DLY_AMT>\n" +
                        "        <FILED_06/>\n" +
                        "        <TOT_AMT>1</TOT_AMT>\n" +
                        "        <YR_TERM>0952</YR_TERM>\n" +
                        "        <MEMO/>\n" +
                        "        <FILED_07/>\n" +
                        "        <LOAN_BAL>38,337</LOAN_BAL>\n" +
                        "        <FIELD_08/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <FILED_01/>\n" +
                        "        <TX_DATE>104/02/16</TX_DATE>\n" +
                        "        <FILED_02/>\n" +
                        "        <PRN_AMT>562</PRN_AMT>\n" +
                        "        <FILED_03/>\n" +
                        "        <INT_AMT>58</INT_AMT>\n" +
                        "        <FILED_04/>\n" +
                        "        <PNT_AMT>0</PNT_AMT>\n" +
                        "        <FILED_05/>\n" +
                        "        <DLY_AMT>0</DLY_AMT>\n" +
                        "        <FILED_06/>\n" +
                        "        <TOT_AMT>620</TOT_AMT>\n" +
                        "        <YR_TERM>0950</YR_TERM>\n" +
                        "        <MEMO/>\n" +
                        "        <FILED_07/>\n" +
                        "        <LOAN_BAL>37,775</LOAN_BAL>\n" +
                        "        <FIELD_08/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <FILED_01/>\n" +
                        "        <TX_DATE>104/03/02</TX_DATE>\n" +
                        "        <FILED_02/>\n" +
                        "        <PRN_AMT>562</PRN_AMT>\n" +
                        "        <FILED_03/>\n" +
                        "        <INT_AMT>58</INT_AMT>\n" +
                        "        <FILED_04/>\n" +
                        "        <PNT_AMT>0</PNT_AMT>\n" +
                        "        <FILED_05/>\n" +
                        "        <DLY_AMT>0</DLY_AMT>\n" +
                        "        <FILED_06/>\n" +
                        "        <TOT_AMT>620</TOT_AMT>\n" +
                        "        <YR_TERM>0951</YR_TERM>\n" +
                        "        <MEMO/>\n" +
                        "        <FILED_07/>\n" +
                        "        <LOAN_BAL>37,213</LOAN_BAL>\n" +
                        "        <FIELD_08/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <FILED_01/>\n" +
                        "        <TX_DATE>104/04/08</TX_DATE>\n" +
                        "        <FILED_02/>\n" +
                        "        <PRN_AMT>563</PRN_AMT>\n" +
                        "        <FILED_03/>\n" +
                        "        <INT_AMT>57</INT_AMT>\n" +
                        "        <FILED_04/>\n" +
                        "        <PNT_AMT>0</PNT_AMT>\n" +
                        "        <FILED_05/>\n" +
                        "        <DLY_AMT>0</DLY_AMT>\n" +
                        "        <FILED_06/>\n" +
                        "        <TOT_AMT>620</TOT_AMT>\n" +
                        "        <YR_TERM>0951</YR_TERM>\n" +
                        "        <MEMO/>\n" +
                        "        <FILED_07/>\n" +
                        "        <LOAN_BAL>36,650</LOAN_BAL>\n" +
                        "        <FIELD_08/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <FILED_01/>\n" +
                        "        <TX_DATE>104/05/08</TX_DATE>\n" +
                        "        <FILED_02/>\n" +
                        "        <PRN_AMT>564</PRN_AMT>\n" +
                        "        <FILED_03/>\n" +
                        "        <INT_AMT>56</INT_AMT>\n" +
                        "        <FILED_04/>\n" +
                        "        <PNT_AMT>0</PNT_AMT>\n" +
                        "        <FILED_05/>\n" +
                        "        <DLY_AMT>0</DLY_AMT>\n" +
                        "        <FILED_06/>\n" +
                        "        <TOT_AMT>620</TOT_AMT>\n" +
                        "        <YR_TERM>0951</YR_TERM>\n" +
                        "        <MEMO/>\n" +
                        "        <FILED_07/>\n" +
                        "        <LOAN_BAL>36,086</LOAN_BAL>\n" +
                        "        <FIELD_08/>\n" +
                        "    </TxRepeat>\n" +
                        "</root>\n";
            }

            Map<String,String[]> columnMap = new LinkedHashMap<String,String[]>();
            columnMap.put("TX_DATE",new String[]{"還款日期","Y","N"});
            columnMap.put("YR_TERM",new String[]{"學期別","Y","N"});
            columnMap.put("CURRATE",new String[]{"幣別","N","N"});
            columnMap.put("PRN_AMT", new String[]{"本金", "N", "Y"});
            columnMap.put("INT_AMT",new String[]{"利息","N","Y"});
            columnMap.put("DLY_AMT",new String[]{"遲延息","N","Y"});
            columnMap.put("PNT_AMT",new String[]{"逾期違約金","N","Y"});
            columnMap.put("TOT_AMT",new String[]{"還款金額合計","Y","Y"});
            columnMap.put("LOAN_BAL",new String[]{"貸款餘額","Y","Y"});


            Document doc = DocumentHelper.parseText(responses);
            Element root = doc.getRootElement();

            NumberFormat nf = NumberFormat.getInstance();
            nf.setGroupingUsed(true);
            for (Iterator i = root.elementIterator("TxRepeat"); i.hasNext();) {
                Element foo = (Element) i.next();

                //檢查該筆是否有值
                if(!check382607RowHasData(foo)) continue;

                JSONObject jsonDetail = new JSONObject();
                JSONArray datas = new JSONArray();

                for(String column : columnMap.keySet()) {

                    String value = "";
                    if("CURRATE".equalsIgnoreCase(column)) {
                        value = "臺幣";
                    }
                    else if("TX_DATE".equalsIgnoreCase(column)) {
                        value = foo.elementText(column).trim();
                        value = StringUtils.replace(value,"/","");
                        value = ProjUtils.toYYYYBirthday(value);
                        value = DateUtil.convert14ToDate("yyyy/MM/dd",value + "000000");
                    } else {
                        value = foo.elementText(column).trim();
                    }

                    value = StringUtils.replace(value,",","");

                    String[] array = columnMap.get(column);
                    String split = array[2];

                    if("Y".equalsIgnoreCase(split)) {
                        value = nf.format(Double.parseDouble(value));
                    }

                    JSONObject obj = new JSONObject();
                    obj.put("displayText",array[0]);
                    obj.put("value",value);
                    obj.put("isCommon",array[1]);

                    datas.put(obj);
                }


                jsonDetail.put("datas",datas);
                repayment_detail.put(jsonDetail);
            }


        }catch(Exception e) {
            e.printStackTrace();

            result = "查詢失敗:" + e.getMessage();

        }finally{
            if(StringUtils.isEmpty(result)) {
                result = "查詢成功";
            }

            ProjUtils.saveLog(DaoFactory.getDefaultDao(),queryStringInfo.getRequest(),getClass().getName(),"repaymentInquiry",result);
        }


        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    private static String moreTxData(String response,RQBean rqBean,String hstano,String hretrn) throws Exception {

        //先解開上一包的
        Document doc = DocumentHelper.parseText(response);
        Element root = doc.getRootElement();

        //再抓這一包的
        RSBean rsBean = WebServiceAgent.callWebService(rqBean,hstano,hretrn);
        String moreResp = rsBean.getTxnString();

        //解開這一包的XML
        Document moreDoc = DocumentHelper.parseText(moreResp);
        Element moreRoot = moreDoc.getRootElement();

        //把第一包的TxRepeat加進去
        StringBuffer txRepeatBuffer = new StringBuffer();
        List<Element> TxRepeats = root.elements("TxRepeat");
        for(Element txRepeat : TxRepeats) {
            txRepeatBuffer.append(txRepeat.asXML());
        }

        //把第二包的也加進去
        List<Element> MoreTxRepeats = moreRoot.elements("TxRepeat");
        for(Element txRepeat : MoreTxRepeats) {
            txRepeatBuffer.append(txRepeat.asXML());
        }

        //打包成XML
        moreResp = "<root>" + txRepeatBuffer.toString() + "</root>";

        //如果還有電文就繼續
        if("C".equalsIgnoreCase(rsBean.getServiceHeader().getHRETRN())) {

            return moreTxData(moreResp,rqBean,rsBean.getServiceHeader().getHSTANO(),"C");
        }

        else return moreResp;
    }

    public void updatePopupEtag(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {


        JSONObject jsonObject = new JSONObject();

        try{
            jsonObject.put("isSuccess","N");

            LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());

            String userId = loginUserBean.getUserId();

            DataObject applyIsPromo = DaoFactory.getDefaultDataObject("apply_is_promo");
            if(applyIsPromo != null) {
                applyIsPromo.setValue("AplyIdNo",userId);


                IDao dao = DaoFactory.getDefaultDao();
                if(!dao.querySingle(applyIsPromo,null)) {
                    applyIsPromo.setValue("CreateTime",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));
                    dao.insert(applyIsPromo);
                }

                jsonObject.put("isSuccess","Y");
            }
        }catch(Exception e) {
            e.printStackTrace();
        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void myElectronicPay(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());

        JSONObject jsonObject = ElectronicPayUtils.getElectronicPay(loginUserBean);

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);

    }

    private boolean check382607RowHasData(Element ele) {

        List<Element> lists = ele.elements();
        if(lists != null) {
            for(Element e : lists) {
                if(StringUtils.isNotEmpty(e.getText())) return true;
            }
        }

        return false;
    }

    public void myloanDetail(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String[] acnoSlList = loginUserBean.getCustomizeValue("acnoSlList").split(",");


        JSONObject jsonObject = new JSONObject();
        JSONObject data = new JSONObject();
        JSONArray client_detail = new JSONArray();
        JSONArray accounts = new JSONArray();
        IDao dao = DaoFactory.getDefaultDao();

        String result = "";
        try{

            String hasAccount = StringUtils.isNotEmpty(loginUserBean.getCustomizeValue("acnoSlList")) ? "Y" : "N";//是否有貸款帳號
            String isArrears = loginUserBean.getCustomizeValue("isArrear"); //是否不欠款
            String isEtabs = ProjUtils.isEtabs(loginUserBean) ? "Y" : "N"; //有無線上註記

            jsonObject.put("isArrears",isArrears);
            jsonObject.put("isEtabs",isEtabs);
            jsonObject.put("hasAccount",hasAccount);

            data.put("client_detail",client_detail);

            jsonObject.put("data",data);

            long total = 0;
            for(String acnoSl: acnoSlList) {

                if(StringUtils.isEmpty(acnoSl)) continue;

                //是否為逾期帳號
                boolean isDelay = false;

                //分行名稱
                String bankName = "";

                String responses = null;

                String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
                if(!"sit".equalsIgnoreCase(env)) {
                    RQBean rqBean = new RQBean();
                    rqBean.setTxId("EB382609");
                    rqBean.addRqParam("ACNO_SL",acnoSl);

                    RSBean rsBean = WebServiceAgent.callWebService(rqBean);
                    if(rsBean.isSuccess()) {
                        responses = rsBean.getTxnString();
                    }
                    else {
                        throw new Exception("查詢電文失敗:" + rsBean.getErrorMsg());
                    }

                    isDelay = DBUtils.isDelayCustomer(acnoSl);

                    //分行名稱用帳號前三碼去撈Oracle的branch name
                    bankName = DBUtils.getPibBranchName(acnoSl.substring(0,3));
                }
                else {

                    isDelay = true;

                    bankName = "營業部";

                    responses = "<root>\n" +
                            "    <CRLN_AMT>800,000</CRLN_AMT>\n" +
                            "    <AVAIL_BAL>677,144</AVAIL_BAL>\n" +
                            "    <CUST_NO>E124876190</CUST_NO>\n" +
                            "    <CUST_NAME>陳ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ</CUST_NAME>\n" +
                            "    <PROD_STAG/>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM>1031</YR_TERM>\n" +
                            "        <DOC_NO>035003</DOC_NO>\n" +
                            "        <CRE_BRH>-705</CRE_BRH>\n" +
                            "        <INT_RATE>1.6200</INT_RATE>\n" +
                            "        <LOAN_AMT>30,720</LOAN_AMT>\n" +
                            "        <LOAN_BAL>30,720</LOAN_BAL>\n" +
                            "        <INT_DATE>108/06/30</INT_DATE>\n" +
                            "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                            "        <INT_FLG>N</INT_FLG>\n" +
                            "        <WORK_FLG>N</WORK_FLG>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT>661</INS_AMT>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM>1032</YR_TERM>\n" +
                            "        <DOC_NO>028153</DOC_NO>\n" +
                            "        <CRE_BRH>-705</CRE_BRH>\n" +
                            "        <INT_RATE>1.6200</INT_RATE>\n" +
                            "        <LOAN_AMT>30,720</LOAN_AMT>\n" +
                            "        <LOAN_BAL>30,720</LOAN_BAL>\n" +
                            "        <INT_DATE>108/06/30</INT_DATE>\n" +
                            "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                            "        <INT_FLG>N</INT_FLG>\n" +
                            "        <WORK_FLG>N</WORK_FLG>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT>661</INS_AMT>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM>1041</YR_TERM>\n" +
                            "        <DOC_NO>019001</DOC_NO>\n" +
                            "        <CRE_BRH>-320</CRE_BRH>\n" +
                            "        <INT_RATE>1.6200</INT_RATE>\n" +
                            "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                            "        <LOAN_BAL></LOAN_BAL>\n" +
                            "        <INT_DATE>108/06/30</INT_DATE>\n" +
                            "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                            "        <INT_FLG>N</INT_FLG>\n" +
                            "        <WORK_FLG>N</WORK_FLG>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT></INS_AMT>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM>1042</YR_TERM>\n" +
                            "        <DOC_NO>013429</DOC_NO>\n" +
                            "        <CRE_BRH>-705</CRE_BRH>\n" +
                            "        <INT_RATE>1.6200</INT_RATE>\n" +
                            "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                            "        <LOAN_BAL>30,708</LOAN_BAL>\n" +
                            "        <INT_DATE>108/06/30</INT_DATE>\n" +
                            "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                            "        <INT_FLG>N</INT_FLG>\n" +
                            "        <WORK_FLG>N</WORK_FLG>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT>661</INS_AMT>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM>0880</YR_TERM>\n" +
                            "        <DOC_NO>013429</DOC_NO>\n" +
                            "        <CRE_BRH>-705</CRE_BRH>\n" +
                            "        <INT_RATE>1.6200</INT_RATE>\n" +
                            "        <LOAN_AMT>30,708</LOAN_AMT>\n" +
                            "        <LOAN_BAL>30,708</LOAN_BAL>\n" +
                            "        <INT_DATE>108/06/30</INT_DATE>\n" +
                            "        <NEXT_INT_DATE>108/08/01</NEXT_INT_DATE>\n" +
                            "        <INT_FLG>N</INT_FLG>\n" +
                            "        <WORK_FLG>N</WORK_FLG>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT>661</INS_AMT>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM/>\n" +
                            "        <DOC_NO/>\n" +
                            "        <CRE_BRH/>\n" +
                            "        <INT_RATE/>\n" +
                            "        <LOAN_AMT/>\n" +
                            "        <LOAN_BAL/>\n" +
                            "        <INT_DATE/>\n" +
                            "        <NEXT_INT_DATE/>\n" +
                            "        <INT_FLG/>\n" +
                            "        <WORK_FLG/>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT/>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM/>\n" +
                            "        <DOC_NO/>\n" +
                            "        <CRE_BRH/>\n" +
                            "        <INT_RATE/>\n" +
                            "        <LOAN_AMT/>\n" +
                            "        <LOAN_BAL/>\n" +
                            "        <INT_DATE/>\n" +
                            "        <NEXT_INT_DATE/>\n" +
                            "        <INT_FLG/>\n" +
                            "        <WORK_FLG/>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT/>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM/>\n" +
                            "        <DOC_NO/>\n" +
                            "        <CRE_BRH/>\n" +
                            "        <INT_RATE/>\n" +
                            "        <LOAN_AMT/>\n" +
                            "        <LOAN_BAL/>\n" +
                            "        <INT_DATE/>\n" +
                            "        <NEXT_INT_DATE/>\n" +
                            "        <INT_FLG/>\n" +
                            "        <WORK_FLG/>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT/>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM/>\n" +
                            "        <DOC_NO/>\n" +
                            "        <CRE_BRH/>\n" +
                            "        <INT_RATE/>\n" +
                            "        <LOAN_AMT/>\n" +
                            "        <LOAN_BAL/>\n" +
                            "        <INT_DATE/>\n" +
                            "        <NEXT_INT_DATE/>\n" +
                            "        <INT_FLG/>\n" +
                            "        <WORK_FLG/>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT/>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM/>\n" +
                            "        <DOC_NO/>\n" +
                            "        <CRE_BRH/>\n" +
                            "        <INT_RATE/>\n" +
                            "        <LOAN_AMT/>\n" +
                            "        <LOAN_BAL/>\n" +
                            "        <INT_DATE/>\n" +
                            "        <NEXT_INT_DATE/>\n" +
                            "        <INT_FLG/>\n" +
                            "        <WORK_FLG/>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT/>\n" +
                            "    </TxRepeat>\n" +
                            "    <TxRepeat>\n" +
                            "        <YR_TERM/>\n" +
                            "        <DOC_NO/>\n" +
                            "        <CRE_BRH/>\n" +
                            "        <INT_RATE/>\n" +
                            "        <LOAN_AMT/>\n" +
                            "        <LOAN_BAL/>\n" +
                            "        <INT_DATE/>\n" +
                            "        <NEXT_INT_DATE/>\n" +
                            "        <INT_FLG/>\n" +
                            "        <WORK_FLG/>\n" +
                            "        <PARTIAL_FLG/>\n" +
                            "        <INS_AMT/>\n" +
                            "    </TxRepeat>\n" +
                            "    <C_NAME>合計：</C_NAME>\n" +
                            "    <LOAN_AMT_TOT>122,856</LOAN_AMT_TOT>\n" +
                            "    <LOAN_BAL_TOT>122,856</LOAN_BAL_TOT>\n" +
                            "</root>\n";
                }

                Document doc = DocumentHelper.parseText(responses);

//                //先找這個帳號學期別是1跟2的
//                Set<String> termSet = new HashSet<String>();
//                termSet.add("1");
//                termSet.add("2");

                total += setMyLoanAccountDetail(doc,client_detail,isDelay,acnoSl,bankName);

//                //再找0的
//                termSet = new HashSet<String>();
//                termSet.add("0");

//                total += setMyLoanAccountDetail(doc,client_detail,isDelay,acnoSl,bankName);

                accounts.put(acnoSl);

            }

            jsonObject.put("accounts",accounts);
            jsonObject.put("total",total + "");

            JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
        }catch(Exception e) {
            e.printStackTrace();
        } finally{
            if(StringUtils.isEmpty(result)) {
                result = "查詢成功";
            }
            ProjUtils.saveLog(dao,queryStringInfo.getRequest(),getClass().getName(),"myloanDetail",result);
        }
    }

    public static int setMyLoanAccountDetail(Document doc,JSONArray client_detail,boolean isDelay,String acnoSl,String bankName) throws Exception {

        int total = 0;

        JSONObject clientDetail = new JSONObject();

        Element root = doc.getRootElement();
        String crlnAmt = root.element("CRLN_AMT").getText().trim();
        int loanBalTot = 0;
//        String loanBalTot = root.element("LOAN_BAL_TOT").getText().trim();

        String intRate = "";
        String nextIntDate = "";
        String intDate = "";

//        loanBalTot = loanBalTot.replaceAll(",", "");

        JSONArray detailArray = new JSONArray();

        for (Iterator i = root.elementIterator("TxRepeat"); i.hasNext();) {
            Element foo = (Element) i.next();
            String yrTerm = foo.elementText("YR_TERM").trim();
            if(yrTerm.equals("")) continue;

            String loanAmt = foo.element("LOAN_AMT").getText().trim();
            String loanBal = foo.element("LOAN_BAL").getText().trim();
            String insAmt = foo.element("INS_AMT").getText().trim();

            loanAmt = StringUtils.replace(loanAmt," ","");
            loanBal = StringUtils.replace(loanBal," ","");
            insAmt = StringUtils.replace(insAmt," ","");

            GardenLog.log(GardenLog.DEBUG,"loanAmt = ["+loanAmt+"]");
            GardenLog.log(GardenLog.DEBUG,"loanBal = ["+loanBal+"]");
            GardenLog.log(GardenLog.DEBUG,"insAmt = ["+insAmt+"]");

            if(StringUtils.isEmpty(loanBal) || "0".equalsIgnoreCase(loanBal)
                    || StringUtils.isEmpty(insAmt) || "0".equalsIgnoreCase(insAmt)) continue;

            GardenLog.log(GardenLog.DEBUG,"going");

            //只取第一筆
            if(StringUtils.isEmpty(intRate)) {
                intRate = foo.element("INT_RATE").getText().trim();
            }

            if(StringUtils.isEmpty(nextIntDate)) {
                nextIntDate = foo.element("NEXT_INT_DATE").getText().trim();
            }

            if(StringUtils.isEmpty(intDate)) {
                intDate = foo.element("INT_DATE").getText().trim();
            }

            String semister = yrTerm.substring(0, 3);
            String semisterState = yrTerm.substring(3, 4);
            loanBal = loanBal.replace(",", "");


            loanBalTot += Integer.parseInt(loanBal);

            JSONObject jsonDetail = new JSONObject();
            jsonDetail.put("semister",semister);
            jsonDetail.put("semister_state",semisterState);
            jsonDetail.put("original_money",loanAmt.replace(",", ""));
            jsonDetail.put("balance_money", loanBal);
            jsonDetail.put("need_pay_month",insAmt.replace(",", ""));

            detailArray.put(jsonDetail);
        }

        //西元轉民國
        if(StringUtils.isNotEmpty(intDate)) {
            String intYear = intDate.split("/")[0];
            String intMonth = intDate.split("/")[1];
            String intDay = intDate.split("/")[2];

            intYear = StringUtils.leftPad(intYear,3,"0");
            intMonth = StringUtils.leftPad(intMonth,2,"0");
            intDay = StringUtils.leftPad(intDay,2,"0");
            intDate = ProjUtils.toYYYYBirthday(intYear + intMonth + intDay);
            intDate = DateUtil.convert14ToDate("yyyy/MM/dd",intDate + "000000");
        }

        if(detailArray.length() != 0) {
            clientDetail.put("state",isDelay ? "delay" : "normal");
            clientDetail.put("num","");
            clientDetail.put("account",acnoSl);
            clientDetail.put("bank_name",bankName);
            clientDetail.put("remain_money",loanBalTot);
            clientDetail.put("rate",intRate);
            clientDetail.put("pay_day",(StringUtils.isNotEmpty(nextIntDate) && nextIntDate.length() < 2) ? "" : nextIntDate.substring(nextIntDate.length()-2, nextIntDate.length()));
            clientDetail.put("intDate",intDate);
            clientDetail.put("return_detail","repaymentInquiry.jsp");
            clientDetail.put("my_detail","myElectronicPay_1.jsp");
            clientDetail.put("detail", detailArray);

            client_detail.put(clientDetail);
        }



        //加總
        total += loanBalTot;

        return total;
    }

    private boolean checkAccountDetail(Document doc) throws Exception {

        boolean isClear = true;

        JSONObject clientDetail = new JSONObject();

        Element root = doc.getRootElement();

        for (Iterator i = root.elementIterator("TxRepeat"); i.hasNext();) {
            Element foo = (Element) i.next();
            String yrTerm = foo.elementText("YR_TERM").trim();
            if(yrTerm.equals("")) continue;

            String loanAmt = foo.element("LOAN_AMT").getText().trim();
            String loanBal = foo.element("LOAN_BAL").getText().trim();
            String insAmt = foo.element("INS_AMT").getText().trim();

            loanAmt = StringUtils.replace(loanAmt," ","");
            loanBal = StringUtils.replace(loanBal," ","");
            insAmt = StringUtils.replace(insAmt," ","");

            GardenLog.log(GardenLog.DEBUG,"loanAmt = ["+loanAmt+"]");
            GardenLog.log(GardenLog.DEBUG,"loanBal = ["+loanBal+"]");
            GardenLog.log(GardenLog.DEBUG,"insAmt = ["+insAmt+"]");

            if(StringUtils.isEmpty(loanBal) || "0".equalsIgnoreCase(loanBal)
                    || StringUtils.isEmpty(insAmt) || "0".equalsIgnoreCase(insAmt)) continue;

            isClear = false;
        }

        return isClear;
    }
}
