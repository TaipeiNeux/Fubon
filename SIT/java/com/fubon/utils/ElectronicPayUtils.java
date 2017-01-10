package com.fubon.utils;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.krysalis.barcode4j.impl.code128.Code128Bean;
import org.krysalis.barcode4j.impl.code39.Code39Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.tools.UnitConv;

import javax.xml.bind.DatatypeConverter;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.NumberFormat;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/7/3
 * Time: 上午 11:25
 * To change this template use File | Settings | File Templates.
 */
public class ElectronicPayUtils {
    public static JSONObject getElectronicPay(LoginUserBean loginUserBean) {

        IDao dao = DaoFactory.getDefaultDao();
        JSONObject jsonObject = new JSONObject();
        JSONArray details = new JSONArray();

        try{

            jsonObject.put("isSuccess","N");
            jsonObject.put("details", details);

            if(loginUserBean != null) 
            {
                String userId = loginUserBean.getUserId();
                String isEtabs = ProjUtils.isEtabs(loginUserBean) ? "Y" : "N";

                Vector<DataObject> ret = new Vector<DataObject>();
                DataObject condition = DaoFactory.getDefaultDataObject("e_pay_note");
                condition.setValue("CUST_NO", userId);
                dao.query(ret, condition, null);

                GardenLog.log(GardenLog.DEBUG, " e_pay_note size = " + ret.size());

                if(ret.size() != 0) {
                    DataObject d = ret.get(0);

                    for(int i=1;i<=12;i++) {
                        JSONObject tmpjson = new JSONObject();
                        if(StringUtils.isNotEmpty(d.getValue("ACNO_SL" + i).trim())) 
                        {
                            tmpjson.put("account", d.getValue("ACNO_SL" + i).trim());// 94 + 就學帳號
                            tmpjson.put("principal", d.getValue("PRN_AMT" + i).trim());// 應繳本金
                            tmpjson.put("interest", d.getValue("INT_AMT" + i).trim());// 應繳利息
                            tmpjson.put("penalty", d.getValue("PNT_DLY_AMT" + i).trim());// 違約金/遲延息
                            tmpjson.put("payment", d.getValue("TOT_AMT" + i).trim());// 應繳金額
                            tmpjson.put("accountBarcode",getBarCodeImg128(d.getValue("ACNO_SL" + i).trim()));
                            details.put(tmpjson);
                        }

                    }
                   

                    String date = d.getValue("DATE").trim();// 資料產生日期(YYYMMDD)
                    String deadline = d.getValue("PAY_END_DATE").trim();// 繳款期限(YYYMMDD)
                    String sum = d.getValue("TOT_TOT_AMT").trim();// 本期應繳總金額
                    String acNoMrk = d.getValue("ACNO_MRK").trim();// 超商條碼帳號
                    String checkCode = "00";// 超商條碼檢碼 //TODO

                    jsonObject.put("isEtabs", isEtabs);
                    jsonObject.put("name", ProjUtils.toNameMark(d.getValue("NAME").trim()));// 戶名
                    jsonObject.put("sex", d.getValue("SEX").trim());//性別
                    jsonObject.put("payment_date", formateDate(d.getValue("DATE_YM").trim(),5,"yyyy/MM"));// 繳款單年月(YYYMMDD)
                    jsonObject.put("balance", d.getValue("LOAN_BAL").trim());// 貸款餘額
                    jsonObject.put("overdue_date", formateDate(d.getValue("INT_EDATE").trim(),7,"yyyy/MM/dd"));// 利息/違約金/逾
                    jsonObject.put("deadline", formateDate(deadline,7,"yyyy/MM/dd"));// 繳款期限(YYYMMDD)
                    jsonObject.put("sum", sum);// 本期應繳總金額

                     /**產生條碼*****************************************************************/

                    //超商條碼一: 繳款期限第二碼開始取六碼+"6CH"
                    //超商條碼二: 超商條碼帳號
                    //超商條碼三: 資料日期第三碼開始取四碼+超商條碼檢碼+本期應繳總金額(補滿9位)
                    String code1 = deadline.substring(1) + "6CH";
                    String code2 = acNoMrk;
                    String code3 = date.substring(2, 6) + checkCode + StringUtils.leftPad(sum, 9, "0");
                    
                    ////2016/08/12 for pdf
                    jsonObject.put("code1", code1);
                    jsonObject.put("code2", code2);
                    jsonObject.put("code3", code3);

                    Map<String, String> barcodeMap = new LinkedHashMap<String, String>();
                    barcodeMap.put("barcode1", getBarCodeImg(code1));
                    barcodeMap.put("barcode2", getBarCodeImg(code2));
                    barcodeMap.put("barcode3", getBarCodeImg(code3));

                    jsonObject.put("barcodeSrc", barcodeMap);


                    jsonObject.put("isSuccess","Y");
                }

            }
        }
        catch(Exception e) 
        {
            e.printStackTrace();
        }

        return jsonObject;
    }

    //產生39Code
    public static String getBarCodeImg(String msg) {
        String barcode = "";
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
            e.printStackTrace();
        }
        return barcode;
    }

    //產生128Code
    public static String getBarCodeImg128(String msg) {
        String barcode;
        String datahead = "data:image/png;base64,";
        int dpi = 150;//resolution

        Code128Bean bean = new Code128Bean();
        bean.setModuleWidth(UnitConv.in2mm(1.0f / dpi));
//        bean.setWideFactor(3);
        bean.doQuietZone(false);

        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BitmapCanvasProvider canvas = new BitmapCanvasProvider(
                    baos, "image/jpeg", dpi, BufferedImage.TYPE_BYTE_BINARY, false, 0);
            bean.generateBarcode(canvas, msg);

            canvas.finish();
            baos.close();
            barcode = datahead + DatatypeConverter.printBase64Binary(baos.toByteArray());
        } catch (IOException e) 
        {
            barcode = "error=>" + e.getMessage();
        }
        return barcode;
    }

    /**
     *
     * @param date (YYYMMDD)
     * @return yyyy/MM/dd
     */
    private static String formateDate(String date,int len,String format) 
    {
        String formateDate;
        try {
            int year = Integer.parseInt(date.substring(0,3)) + 1911;

            String tmp = year + date.substring(3, len);
            tmp = StringUtils.rightPad(tmp,14,"0");

            formateDate = DateUtil.convert14ToDate(format, tmp);
        } catch (Exception e) {
            formateDate = date;
        }
        return formateDate;
    }


}
