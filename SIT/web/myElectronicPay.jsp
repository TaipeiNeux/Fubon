<%@ page import="com.neux.garden.dbmgr.DaoFactory" %>
<%@ page import="com.neux.utility.orm.dal.dao.module.IDao" %>
<%@ page import="com.neux.utility.orm.bean.DataObject" %>
<%@ page import="org.json.JSONObject" %>
<%@ page import="org.json.JSONArray" %>
<%@ page import="com.neux.utility.utils.jsp.JSPUtils" %>
<%@ page import="java.util.Vector" %>
<%@ page import="org.krysalis.barcode4j.impl.code39.Code39Bean" %>
<%@ page import="org.krysalis.barcode4j.tools.UnitConv" %>
<%@ page import="org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider" %>
<%@ page import="java.awt.image.BufferedImage" %>
<%@ page import="java.io.ByteArrayOutputStream" %>
<%@ page import="javax.xml.bind.DatatypeConverter" %>
<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page import="java.util.LinkedHashMap" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.io.IOException" %>
<%@ page import="com.neux.garden.authorization.LoginUserBean" %>
<%@ page import="com.fubon.utils.ProjUtils" %>
<%@ page import="com.neux.utility.utils.date.DateUtil" %>
<%@ page import="java.text.NumberFormat" %>
<%@ page import="com.neux.utility.utils.jsp.info.JSPQueryStringInfo" %>
<%@ page language="java" contentType="text/html; charset=utf-8" %>

<%
    /**
     * @author Tinny Wang
     * @date 2016/6/22
     * @description 我的電子繳款單
     */

    request.setCharacterEncoding("utf-8");

    JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(request,false);
    String action = queryStringInfo.getParam("action");

    LoginUserBean loginUserBean = ProjUtils.getLoginBean(request.getSession());

    IDao dao = DaoFactory.getDefaultDao();
    JSONObject jsonObject = new JSONObject();

    // myElectronicPay.jsp?action=getData
    if("getData".equalsIgnoreCase(action)) {

        if(loginUserBean != null){
            String userId = loginUserBean.getUserId();
            String isEtabs = ProjUtils.isEtabs(loginUserBean) ? "Y" : "N";

            Vector<DataObject> ret = new Vector<DataObject>();
            DataObject condition = DaoFactory.getDefaultDataObject("e_pay_note");
            condition.setValue("CUST_NO", userId);
            dao.query(ret, condition, null);

            JSONArray details = new JSONArray();
            for(DataObject d : ret){
                JSONObject tmpjson = new JSONObject();
                tmpjson.put("account", d.getValue("ACNO_SL").trim());// 94 + 就學帳號
                tmpjson.put("principal", d.getValue("PRN_AMT").trim());// 應繳本金
                tmpjson.put("interest", d.getValue("INT_AMT").trim());// 應繳利息
                tmpjson.put("penalty", d.getValue("PNT_DLY_AMT").trim());// 違約金/遲延息
                tmpjson.put("payment", d.getValue("TOT_AMT").trim());// 應繳金額
                details.put(tmpjson);
            }

            DataObject d = ret.get(0);
            String date = d.getValue("DATE").trim();// 資料產生日期(YYYMMDD)
            String deadline = d.getValue("PAY_END_DATE").trim();// 繳款期限(YYYMMDD)
            String sum = d.getValue("TOT_TOT_AMT").trim();// 本期應繳總金額
            String acNoMrk = d.getValue("ACNO_MRK").trim();// 超商條碼帳號
            String checkCode = "00";// 超商條碼檢碼 //TODO

            jsonObject.put("isEtabs", isEtabs);
            jsonObject.put("name", d.getValue("NAME").trim());// 戶名
            jsonObject.put("payment_date", formateDate(d.getValue("DATE_YM").trim()));// 繳款單年月(YYYMMDD)
            jsonObject.put("balance", d.getValue("LOAN_BAL").trim());// 貸款餘額
            jsonObject.put("overdue_date", d.getValue("INT_EDATE").trim());// 利息/違約金/逾
            jsonObject.put("deadline", formateDate(deadline));// 繳款期限(YYYMMDD)
            jsonObject.put("sum", sum);// 本期應繳總金額
            jsonObject.put("details", details);


            /**產生條碼*****************************************************************/

            //超商條碼一: 繳款期限第二碼開始取六碼+"6CH"
            //超商條碼二: 超商條碼帳號
            //超商條碼三: 資料日期第三碼開始取四碼+超商條碼檢碼+本期應繳總金額(補滿9位)
            String code1 = deadline.substring(1) + "6CH";
            String code2 = acNoMrk;
            String code3 = date.substring(2, 6) + checkCode + StringUtils.leftPad(sum, 9, "0");

            Map<String, String> barcodeMap = new LinkedHashMap<String, String>();
            barcodeMap.put("barcode1", code1);
            barcodeMap.put("barcode2", code2);
            barcodeMap.put("barcode3", code3);

            for(String code : barcodeMap.keySet()){
                String msg = barcodeMap.get(code);
                barcodeMap.put(code, getBarCodeImg(msg));
            }
            jsonObject.put("barcodeSrc", barcodeMap);
        }else{
            jsonObject.put("msg", "請先登入!");
        }

    }

    JSPUtils.downLoadByString(response, "application/json", jsonObject.toString(), false);
%>

<%!
    private static String getBarCodeImg(String msg){
        String barcode;
        String datahead = "data:image/png;base64,";
        int dpi = 150;//resolution

        Code39Bean bean = new Code39Bean();
        bean.setModuleWidth(UnitConv.in2mm(1.0f / dpi));
        bean.setWideFactor(3);
        bean.doQuietZone(false);

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BitmapCanvasProvider canvas = new BitmapCanvasProvider(
                    baos, "image/jpeg", dpi, BufferedImage.TYPE_BYTE_BINARY, false, 0);
            bean.generateBarcode(canvas, msg);
            canvas.finish();
            baos.close();
            barcode = datahead + DatatypeConverter.printBase64Binary(baos.toByteArray());
        } catch (IOException e) {
            barcode = "error=>" + e.getMessage();
        }
        return barcode;
    }

    /**
     *
     * @param date (YYYMMDD)
     * @return yyyy/MM/dd
     */
    private static String formateDate(String date){
        String formateDate;
        try {
            int year = Integer.parseInt(date.substring(0,3)) + 1911;
            formateDate = DateUtil.convert14ToDate("yyyy/MM/dd", year + date.substring(3, 7) + "000000");
        } catch (Exception e) {
            formateDate = date;
        }
        return formateDate;
    }
%>