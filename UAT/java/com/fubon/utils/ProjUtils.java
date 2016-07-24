package com.fubon.utils;

import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.flow.impl.*;
import com.fubon.utils.bean.OTPBean;
import com.neux.utility.orm.bean.DataColumn;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.Inet4Address;
import java.text.NumberFormat;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/20
 * Time: 下午 12:18
 * To change this template use File | Settings | File Templates.
 */
public class ProjUtils {

    public static final String OTPNumber = "OTPNumber";
    public static final String OTPCode = "OTPCode";
    public static final String OTPTime = "OTPTime";
    public static final String OTPErrorCount = "OTPErrorCount";
    public static final String MARKSPACE = "*";

    public static final char[] engCode = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
    public static final char[] intCode = {'1','2','3','4','5','6','7','8','9','0'};

    public static String get032153Col8001(Document doc) throws Exception {
        Element root = doc.getRootElement();
        List<Element> TxRepeatList = root.elements("TxRepeat");
        if(TxRepeatList != null) {
            for(Element repeat : TxRepeatList) {
                if("8001".equalsIgnoreCase(repeat.element("COD").getText())) {
                    return repeat.element("CUST_ADDR_1").getText().trim();
                }
            }
        }

        return null;
    }

    public static String get032153Col3802ZipCode(Document doc) throws Exception {
        Element root = doc.getRootElement();
        List<Element> TxRepeatList = root.elements("TxRepeat");
        if(TxRepeatList != null) {
            for(Element repeat : TxRepeatList) {
                if("3802".equalsIgnoreCase(repeat.element("COD").getText())) {
                    return repeat.element("ZIP_COD").getText().trim();
                }
            }
        }

        return null;
    }

    public static String get032153Col3802Address(Document doc) throws Exception {
        Element root = doc.getRootElement();
        List<Element> TxRepeatList = root.elements("TxRepeat");
        if(TxRepeatList != null) {
            for(Element repeat : TxRepeatList) {
                if("3802".equalsIgnoreCase(repeat.element("COD").getText())) {
                    return repeat.element("CUST_ADDR_1").getText().trim();
                }
            }
        }

        return null;
    }

    public static String get032154Col3801Tel(Document doc) throws Exception {
        Element root = doc.getRootElement();
        List<Element> TxRepeatList = root.elements("TxRepeat");
        if(TxRepeatList != null) {
            for(Element repeat : TxRepeatList) {
                if("3801".equalsIgnoreCase(repeat.element("COD").getText())) {
                    return repeat.element("TEL_NO").getText().trim();
                }
            }
        }

        return null;
    }

    public static String get032154Col3802Tel(Document doc) throws Exception {
        Element root = doc.getRootElement();
        List<Element> TxRepeatList = root.elements("TxRepeat");
        if(TxRepeatList != null) {
            for(Element repeat : TxRepeatList) {
                if("3802".equalsIgnoreCase(repeat.element("COD").getText())) {
                    return repeat.element("TEL_NO").getText().trim();
                }
            }
        }

        return null;
    }

    public static String randomOTP(int validNumberCount,char[] code) {

        Random random = new Random();

        String sRand = "";
        for (int i = 0; i < validNumberCount; i++) {
            String rand = String.valueOf(code[random.nextInt(code.length)]);
            sRand += rand;
        }

        return sRand;
    }

    //只取OTP
    public static OTPBean createOTP(HttpServletRequest request) {

        OTPBean otpBean = new OTPBean();
        String validNum = randomOTP(6,engCode);
        String otpCode = randomOTP(6,intCode);
        String otpTime = DateUtil.addDate(DateUtil.getTodayString(),Calendar.MINUTE,5);

        //先把驗證碼存入session
        request.getSession().setAttribute(OTPNumber,validNum);
        request.getSession().setAttribute(OTPCode,otpCode);
        request.getSession().setAttribute(OTPTime,otpTime);
        request.getSession().removeAttribute(OTPErrorCount);

        //再直接回傳長圖的網址

        otpBean.setCodeImg("data?action=showOTP&v=" + System.currentTimeMillis());
        otpBean.setOtpCode(otpCode);
        otpBean.setOtpNumber(validNum);
        otpBean.setOtpTime(otpTime); //倒數5分鐘

        return otpBean;
    }


    //地址遮蔽：只保留前6位字元,其餘遮蔽
    public static String toAddressMark(String address) {
        if(StringUtils.isEmpty(address) || address.length() < 6) return address;

        String after = address.substring(0,6);

        String tmp = after;
        for(int i=0;i<address.length() - 6;i++) {
            tmp += MARKSPACE;
        }

        return tmp;
    }

    //地址全遮蔽
    public static String toAddressAllMark(String address) {
        if(StringUtils.isEmpty(address)) return address;

        String tmp = "";
        for(int i=0;i<address.length();i++) {
            tmp += MARKSPACE;
        }

        return tmp;
    }

    //Email遮蔽：第1~4碼
    public static String toEMailMark(String email) {
        if(StringUtils.isEmpty(email) || email.length() < 4) return email;

        String after = email.substring(4);

        return MARKSPACE + MARKSPACE + MARKSPACE + MARKSPACE + after;
    }

    public static void main(String[] args) {
        System.out.println(toTelMark("25565080"));
    }


    //戶籍電話遮蔽：第4~8碼
    public static String toTelMark(String tel) {
        if(StringUtils.isEmpty(tel) || tel.length() < 4) return tel;

        String before = tel.substring(0,3);

        String tmp = before;

        for(int i=0;i<tel.length() - 3;i++) {
            tmp += MARKSPACE;
        }

//        int lastIndex = 0;
//        for(int i=0;i<5;i++) {
//            System.out.println(i);
//            if((i+3) > tel.length()) {
//                break;
//            }
//
//            tmp += MARKSPACE;
//
//            lastIndex = i+4;
//        }
//
//        if(lastIndex < tel.length()) {
//            tmp = tmp + tel.substring(lastIndex);
//        }

        return tmp;
    }

    //生日遮蔽：日期第2個字元需隱碼
    public static String toBirthdayMark(String birthday) {
        if(StringUtils.isEmpty(birthday) || birthday.length() != 7) return birthday;

        String before = birthday.substring(0,birthday.length()-1);

        return before + MARKSPACE;
    }

    //身份證遮蔽：第5~8碼
    public static String toIDMark(String id) {
        if(StringUtils.isEmpty(id) || id.length() != 10) return id;

        String before = id.substring(0,4);
        String after = id.substring(8);

        return before + MARKSPACE + MARKSPACE + MARKSPACE + MARKSPACE + after;
    }

    //姓名遮蔽：倒數第2碼
    public static String toNameMark(String name) {
        if(StringUtils.isEmpty(name)) return name;

        String before = name.substring(0,name.length()-2);
        String after = name.substring(name.length()-1);

        return before + MARKSPACE + after;
    }

    public static LoginUserBean getLoginBean(HttpSession session) {
        LoginUserBean loginUserBean = (LoginUserBean) session.getAttribute("loginUserBean");

//        GardenLog.log(GardenLog.DEBUG, "ProjUtils:getLoginBean=" + loginUserBean);


        return loginUserBean;
    }

    public static String toTagXML(String tagName,String tagValue,Map<String,String[]> inputMap) {

        if(inputMap != null && inputMap.containsKey(tagName)) {
            String[] data = inputMap.get(tagName);
            String original = data[0];
            String after = data[1];

            //如果值跟隱碼都相同，就轉成原碼
            if(StringUtils.isNotEmpty(tagValue) && StringUtils.isNotEmpty(after) && tagValue.equalsIgnoreCase(after)) {
                tagValue = original;
            }

//            GardenLog.log(GardenLog.DEBUG,"tagValue = ["+tagValue+"]");
//            tagValue = StringEscapeUtils.escapeHtml4(tagValue);
        }

        try{
//                tagValue = new String(tagValue.getBytes("big5"),"CP950");

//            tagValue = new String(tagValue.getBytes("utf-8"),"CP950");

            tagValue = StringUtils.replace(tagValue,"<","&lt;");
            tagValue = StringUtils.replace(tagValue,">","&gt;");
            tagValue = StringUtils.replace(tagValue,"&","&amp;");
        }catch(Exception e) {
            e.printStackTrace();
        }

        return "<" + tagName + "><![CDATA["+tagValue+"]]></"+tagName+">";
    }

    public static String toTagArrayXML(String tagName,String[] tagValues,Map<String,String[]> inputMap) {
        StringBuffer tmp = new StringBuffer();
        tmp.append("<" + tagName + "s>");

        for(String tagValue : tagValues) {
            tmp.append(toTagXML(tagName,tagValue,inputMap));
        }

        tmp.append("</" + tagName + "s>");
        return tmp.toString();
    }

    //判斷已撥款
    public static boolean isPayHistory(String userId,IDao dao) throws Exception {

        SQLCommand query = new SQLCommand("select AplyNo from AplyMemberTuitionLoanDtl_History where AplyIdNo = ?");
        query.addParamValue(userId);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        return ret.size() != 0;
    }


    //本學期是否已彈跳過推廣訊息
    public static boolean isPopupPromoDialog(String userId,IDao dao) throws Exception {
        SQLCommand query = new SQLCommand("select AplyIdNo from apply_is_promo where AplyIdNo = ?");
        query.addParamValue(userId);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        return ret.size() != 0;
    }


    //取得學期日期區間
    public static HashMap getSemesterRegion(IDao dao) throws Exception {
        HashMap<String,String> result = new HashMap<String,String>();

        SQLCommand query = new SQLCommand("select * from SemesterRegion where TYPE = 'IBank'");
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        if(ret.size() != 0) {
            DataObject region = ret.get(0);
            result.put("s1_sDate",region.getValue("SEMESTER1_STARTDATE")); // 網路銀行第一學期起日
            result.put("s1_eDate",region.getValue("SEMESTER1_ENDDATE"));    // 網路銀行第一學期迄日
            result.put("s2_sDate",region.getValue("SEMESTER2_STARTDATE")); // 網路銀行第二學期起日
            result.put("s2_eDate",region.getValue("SEMESTER2_ENDDATE"));     // 網路銀行第二學期迄日
        }

        return result;
    }

    // 取得就學貸款申請日期區間
    public static HashMap getApplyDateRegion(IDao dao) throws Exception {
        HashMap<String,String> result = new HashMap<String,String>();

        SQLCommand query = new SQLCommand("select * from School_ApplyDate");
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        if(ret.size() != 0) {
            DataObject region = ret.get(0);
            result.put("s1_sDate",region.getValue("SEMESTER1_STARTDATE")); // 網路銀行第一學期起日
            result.put("s1_eDate",region.getValue("SEMESTER1_ENDDATE"));    // 網路銀行第一學期迄日
            result.put("s2_sDate",region.getValue("SEMESTER2_STARTDATE")); // 網路銀行第二學期起日
            result.put("s2_eDate",region.getValue("SEMESTER2_ENDDATE"));     // 網路銀行第二學期迄日

            //2016-06-25 added by titan 加上我要申請無對保期間內顯示文字
            result.put("Bulletin",region.getValue("Bulletin"));
        }

        return result;
    }

    //取得學年度資訊(取原程式碼)
    public static HashMap getEduYearInfo(IDao dao,String date) throws Exception {

        HashMap hm = new HashMap();

        if (date == null) {
            date = DateUtil.getTodayString().substring(0,8);
        }

        HashMap semesterRegion = ProjUtils.getSemesterRegion(dao);   // 取得學期日期區間
        HashMap applyDateRegion = ProjUtils.getApplyDateRegion(dao);  // 取得學年度申請日期區間

        String s1_sDate = (String) semesterRegion.get("s1_sDate");        // 上學期起日
        String s1_eDate = (String) semesterRegion.get("s1_eDate");        // 上學期迄日
        String s2_sDate = (String) semesterRegion.get("s2_sDate");        // 下學期起日
        String s2_eDate = (String) semesterRegion.get("s2_eDate");        // 下學期迄日
        String s1_applySDate = (String) applyDateRegion.get("s1_sDate");  // 上學期申請起日
        String s1_applyEDate = (String) applyDateRegion.get("s1_eDate");  // 上學期申請迄日
        String s2_applySDate = (String) applyDateRegion.get("s2_sDate");  // 下學期申請起日
        String s2_applyEDate = (String) applyDateRegion.get("s2_eDate");  // 下學期申請迄日
        String Bulletin = (String) applyDateRegion.get("Bulletin");  // 無對保期間的文字
        String semester_sDate = "";                                       // 學期定義起日
        String semester_eDate = "";                                       // 學期定義迄日
        String apply_sDate = "";                                          // 學期申請起日
        String apply_eDate = "";                                          // 學期申請迄日

        int eduYear = Integer.parseInt(date.substring(0, date.length() - 4));
        int semester = 0;

        if (s1_sDate.compareTo(date.substring(date.length() - 4)) > 0) {
            // 當日日期小於上學期起日 --> 已跨年 --> 學年度應為上一年度
            eduYear--;
        }

        int s1_sYear = eduYear;
        int s1_eYear = (s1_eDate.compareTo(s1_sDate) < 0) ? (s1_sYear + 1) : s1_sYear;
        int s2_sYear = (s2_sDate.compareTo(s1_eDate) < 0) ? (s1_eYear + 1) : s1_eYear;
        int s2_eYear = (s2_eDate.compareTo(s2_sDate) < 0) ? (s2_sYear + 1) : s2_sYear;
        int s1_applySYear = eduYear;
        int s1_applyEYear = (s1_applyEDate.compareTo(s1_applySDate) < 0) ? (s1_applySYear + 1) : s1_applySYear;
        int s2_applySYear = (s2_applySDate.compareTo(s1_applyEDate) < 0) ? (s1_applyEYear + 1) : s1_applyEYear;
        int s2_applyEYear = (s2_applyEDate.compareTo(s2_applySDate) < 0) ? (s2_applySYear + 1) : s2_applySYear;

        s1_sDate = s1_sYear + s1_sDate;
        s1_eDate = s1_eYear + s1_eDate;
        s2_sDate = s2_sYear + s2_sDate;
        s2_eDate = s2_eYear + s2_eDate;

        if ((date.compareTo(s1_sDate) >= 0) && (date.compareTo(s1_eDate) <= 0)) {
            // 上學期
            semester = 1;
            semester_sDate = s1_sDate;
            semester_eDate = s1_eDate;
            //apply_sDate = s1_sDate;
            //apply_eDate = s1_eDate;
            apply_sDate = s1_applySYear + s1_applySDate;
            apply_eDate = s1_applyEYear + s1_applyEDate;

        } else if ((date.compareTo(s2_sDate) >= 0) && (date.compareTo(s2_eDate) <= 0)) {
            // 下學期
            semester = 2;
            semester_sDate = s2_sDate;
            semester_eDate = s2_eDate;
            //apply_sDate = s2_sDate;
            //apply_eDate = s2_eDate;
            apply_sDate = s2_applySYear + s2_applySDate;
            apply_eDate = s2_applyEYear + s2_applyEDate;

        }

        String sEduYear = String.valueOf(eduYear - 1911);
        String sSemester = String.valueOf(semester);

        String preApplyDate = ProjUtils.getPreApplyDate(dao, sEduYear, sSemester);

        // 將目前計算所得之學年度及學期以 HashMap 來存放
        hm.put("eduYear", sEduYear);
        hm.put("semester", sSemester);
        hm.put("semester_sDate", semester_sDate);
        hm.put("semester_eDate", semester_eDate);
        hm.put("apply_sDate", apply_sDate);
        hm.put("apply_eDate", apply_eDate);
        hm.put("now_Date", date);
        hm.put("preApplyDate", preApplyDate);
        hm.put("Bulletin",Bulletin);
//        hm.putAll(getSchoolApplyDateRegion(apply_sDate, apply_eDate, preApplyDate));

        return hm;

//        HashMap hm = new HashMap();
//
//        if (date == null) {
//            date = DateUtil.getTodayString();
//        }
//
//        Map<String,String> semesterRegion = getSemesterRegion(dao);   // 取得學期日期區間
//        Map<String,String> applyDateRegion = getApplyDateRegion(dao);  // 取得學年度申請日期區間
//
//        String s1_sDate = semesterRegion.get("s1_sDate");        // 上學期起日
//        String s1_eDate = semesterRegion.get("s1_eDate");        // 上學期迄日
//        String s2_sDate = semesterRegion.get("s2_sDate");        // 下學期起日
//        String s2_eDate = semesterRegion.get("s2_eDate");        // 下學期迄日
//        String s1_applySDate = applyDateRegion.get("s1_sDate");  // 上學期申請起日
//        String s1_applyEDate = applyDateRegion.get("s1_eDate");  // 上學期申請迄日
//        String s2_applySDate = applyDateRegion.get("s2_sDate");  // 下學期申請起日
//        String s2_applyEDate = applyDateRegion.get("s2_eDate");  // 下學期申請迄日
//        String semester_sDate = "";                                       // 學期定義起日
//        String semester_eDate = "";                                       // 學期定義迄日
//        String apply_sDate = "";                                          // 學期申請起日
//        String apply_eDate = "";                                          // 學期申請迄日
//
//        int eduYear = Integer.parseInt(date.substring(0,4));
//        int semester = 0;
//
//        if (s1_sDate.compareTo(date.substring(date.length() - 4)) > 0) {
//            // 當日日期小於上學期起日 --> 已跨年 --> 學年度應為上一年度
//            eduYear--;
//        }
//
//        int s1_sYear = eduYear;
//        int s1_eYear = (s1_eDate.compareTo(s1_sDate) < 0) ? (s1_sYear + 1) : s1_sYear;
//        int s2_sYear = (s2_sDate.compareTo(s1_eDate) < 0) ? (s1_eYear + 1) : s1_eYear;
//        int s2_eYear = (s2_eDate.compareTo(s2_sDate) < 0) ? (s2_sYear + 1) : s2_sYear;
//        int s1_applySYear = eduYear;
//        int s1_applyEYear = (s1_applyEDate.compareTo(s1_applySDate) < 0) ? (s1_applySYear + 1) : s1_applySYear;
//        int s2_applySYear = (s2_applySDate.compareTo(s1_applyEDate) < 0) ? (s1_applyEYear + 1) : s1_applyEYear;
//        int s2_applyEYear = (s2_applyEDate.compareTo(s2_applySDate) < 0) ? (s2_applySYear + 1) : s2_applySYear;
//
//        s1_sDate = s1_sYear + s1_sDate;
//        s1_eDate = s1_eYear + s1_eDate;
//        s2_sDate = s2_sYear + s2_sDate;
//        s2_eDate = s2_eYear + s2_eDate;
//
//        boolean isRegion = false;
//        if ((date.compareTo(s1_sDate) >= 0) && (date.compareTo(s1_eDate) <= 0)) {
//            // 上學期
//            semester = 1;
//            semester_sDate = s1_sDate;
//            semester_eDate = s1_eDate;
//            //apply_sDate = s1_sDate;
//            //apply_eDate = s1_eDate;
//            apply_sDate = s1_applySYear + s1_applySDate;
//            apply_eDate = s1_applyEYear + s1_applyEDate;
//
//            isRegion = true;
//
//        } else if ((date.compareTo(s2_sDate) >= 0) && (date.compareTo(s2_eDate) <= 0)) {
//            // 下學期
//            semester = 2;
//            semester_sDate = s2_sDate;
//            semester_eDate = s2_eDate;
//            //apply_sDate = s2_sDate;
//            //apply_eDate = s2_eDate;
//            apply_sDate = s2_applySYear + s2_applySDate;
//            apply_eDate = s2_applyEYear + s2_applyEDate;
//
//            isRegion = true;
//
//        }
//
//        String sEduYear = String.valueOf(eduYear - 1911);
//        String sSemester = String.valueOf(semester);
//
//        String preApplyDate = getPreApplyDate(dao,sEduYear, sSemester);
//
//        // 將目前計算所得之學年度及學期以 HashMap 來存放
//        hm.put("eduYear", sEduYear);
//        hm.put("semester", sSemester);
//        hm.put("semester_sDate", semester_sDate);
//        hm.put("semester_eDate", semester_eDate);
//        hm.put("apply_sDate", apply_sDate);
//        hm.put("apply_eDate", apply_eDate);
//        hm.put("now_Date", date);
//        hm.put("preApplyDate", preApplyDate);
////            hm.putAll(getSchoolApplyDateRegion(dao,apply_sDate, apply_eDate, preApplyDate));
//
//
//        return hm;
    }

//    /**
//     * 取得就學貸款個別學校特殊申請日期區間
//     */
//    public static HashMap getSchoolApplyDateRegion(IDao dao,String apply_sDate, String apply_eDate, String preApplyDate) throws Exception {
//
//        HashMap dateRegion = new HashMap();
//
//        String systemDate = DateUtil.getTodayString();
//
//        // 目前日前是否落在提前填寫申請書日期區間
//        boolean isPreApplyDate = (preApplyDate != null) && (!preApplyDate.equals("")) && (systemDate.compareTo(preApplyDate) >= 0) && (systemDate.compareTo(apply_sDate) < 0);
//
//        int cmp1 = systemDate.compareTo(apply_sDate);
//        int cmp2 = systemDate.compareTo(apply_eDate);
//
//        if (isPreApplyDate || cmp1 < 0 || cmp2 >= 0) {
//            // 取得申請日期之範圍
//            String sql = "select * from School_ApplyDate_Ext "
//                    + "where StartDate <= ':sDate' and EndDate >= ':eDate' "
//                    + "order by SchoolEduCode";
//
//            String sch_sDate = null;
//            String sch_eDate = null;
//
//            if (isPreApplyDate) {
//                sch_sDate = apply_sDate;
//                sch_eDate = preApplyDate;
//            } else if (cmp1 < 0) {
//                sch_sDate = systemDate;
//                sch_eDate = systemDate;
//            } else {
//                String date = (cmp2 == 0) ? DateUtility.getSpecificDate(systemDate, "1D") : systemDate;
//                sch_sDate = date;
//                sch_eDate = date;
//            }
//
//            DBObject dbo = NewDBO.create(NewDBO.getTuitionLoanDBName());
//            dbo.setField("sDate", sch_sDate);
//            dbo.setField("eDate", sch_eDate);
//            dbo.searchAndRetrieve(sql);
//
//            if (dbo.next()) {
//                ArrayList schoolApplyDateRegionList = new ArrayList();
//
//                for (int i = 0; i < dbo.count(); i++) {
//                    dbo.next(i);
//
//                    String schoolEduCode = dbo.getField("SchoolEduCode");
//                    String sDate = dbo.getField("StartDate");
//                    String eDate = dbo.getField("EndDate");
//
//                    if (sDate.compareTo(sch_sDate) < 0)  sch_sDate = sDate;
//                    if (eDate.compareTo(sch_eDate) > 0)  sch_eDate = eDate;
//
//                    HashMap hm = new HashMap();
//
//                    hm.put("schoolEduCode", schoolEduCode);
//                    hm.put("sDate", sDate);
//                    hm.put("eDate", eDate);
//
//                    schoolApplyDateRegionList.add(hm);
//                }
//
//                dateRegion.put("sch_sDate", sch_sDate);
//                dateRegion.put("sch_eDate", sch_eDate);
//                dateRegion.put("schoolApplyDateRegionList", schoolApplyDateRegionList);
//            }
//        }
//
//        return dateRegion;
//    }


    //取得本學期提前填寫申請書開始日期
    public static String getPreApplyDate(IDao dao,String eduYear, String semester) throws Exception {

        String preApplyDate = null;

        if (eduYear == null || semester == null) {
            HashMap eduYearInfo = getEduYearInfo(dao,null);
            eduYear = (String) eduYearInfo.get("eduYear");
            semester = (String) eduYearInfo.get("semester");
        }

        SQLCommand query = new SQLCommand("select PreApplyDate from School_PreApplyDate where EduYearSemester = ?");
        query.addParamValue(StringUtils.leftPad(eduYear,3,"0") + semester);
        Vector<DataObject> ret = new Vector<DataObject>();

        dao.queryByCommand(ret,query,null,null);

        if(ret.size() != 0) {
            preApplyDate = ret.get(0).getValue("PreApplyDate");
        }

        return preApplyDate;
    }

    //判斷於e化管理網或etabs有註記者。發電文：EB032282
    public static boolean isEtabs(LoginUserBean loginUserBean) throws Exception {

        return "Y".equalsIgnoreCase(loginUserBean.getCustomizeValue("isEtabs"));

    }

    public static String forTuitionLoanAplyNo(String applyDate) {

        try{
            return NextNumber.getSerialNo("TTN-", 10);
        }catch(Exception e) {
            e.printStackTrace();
            return null;
        }

//        return "TTN-" + new Random().nextInt(1000000000);
    }

//    private static String getSerialNo(String keyWord, String preWord, int maxLen) throws Exception {
//        String sn = null;
//
//        NextNumber nextNum = getNextNumObj();
//
//        long milliTimes = (System.currentTimeMillis() / 1000) * 1000;
//        milliTimes += nextNum.getNext(keyWord, 3);
//        sn = base10To36(String.valueOf(milliTimes));
//
//        if (sn.length() > maxLen) {
//            sn = sn.substring(sn.length() - maxLen);
//        } else {
//            while (sn.length() < maxLen) {
//                sn = "0" + sn;
//            }
//        }
//
//        sn = preWord + sn;
//
//        return sn;
//    }


//    private static NextNumber getNextNumObj() throws Exception {
//
//        NextNumber nextNum = new NextNumber();
//
//        return nextNum;
//    }
//
//    private static String base10To36(String base10Num) throws Exception {
//        String base36Num = "";
//        String mapNum = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//
//        long num = Long.parseLong(base10Num);
//
//        while (num >= 36) {
//            int remainder = 0;
//            remainder = Integer.parseInt(Long.toString(num % 36));
//            base36Num = mapNum.charAt(remainder) + base36Num;
//            num = num / 36;
//        }
//        base36Num = mapNum.charAt((int)num) + base36Num;
//
//        return base36Num;
//    }

    public static String toDraftBirthday(String birthday0,String birthday2,String birthday4) {
        if(StringUtils.isNotEmpty(birthday0) && StringUtils.isNotEmpty(birthday2) && StringUtils.isNotEmpty(birthday4)) {
            return StringUtils.leftPad(birthday0,3,"0") + StringUtils.leftPad(birthday2,2,"0") + StringUtils.leftPad(birthday4,2,"0");
        }
        else return "";
    }

    //我要申請最後寫入資料
    public static DataObject saveAplyMemberTuitionLoanDtl(JSPQueryStringInfo queryStringInfo ,IDao dao,Element apply1_1Root,Element apply1_2Root,Element apply2Root,Element apply3_1Root,Element apply3_2Root,Element applyOnline4Root,String aplyCaseType) throws Exception {

        DataObject aplyMemberDataObject = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl");

        try{
            HttpServletRequest req = queryStringInfo.getRequest();

            String today = DateUtil.getTodayString();
            String applyDate = today.substring(0,8);// 申請日期
            String applyTime = today.substring(8,14);// 申請時間
            String applyNo = ProjUtils.forTuitionLoanAplyNo(applyDate);
            String ip = JSPUtils.getClientIP(req);

            //取得當下學期
            HashMap<String,String> eduYearInfo = ProjUtils.getEduYearInfo(dao,null);

            //取當下學年跟學期
            String eduYear = eduYearInfo.get("eduYear");
            String semester = eduYearInfo.get("semester");

            //先判斷是否已有申請過案件
            String id = apply1_1Root.element("id").getText().toUpperCase();

//            //2016-07-21 added by titan 先判斷用戶的申請案件是否已審核完畢
//            SQLCommand checkAplyStatus = new SQLCommand("select * from AplyMemberTuitionLoanDtl where AplyIdNo = ? and AplyStatus = ?");
//            checkAplyStatus.addParamValue(id);
//            checkAplyStatus.addParamValue("VERIFIED");

            SQLCommand check = new SQLCommand("select * from AplyMemberTuitionLoanDtl where AplyIdNo = ?");
            check.addParamValue(id);

            Vector<DataObject> checkResult = new Vector<DataObject>();
            dao.queryByCommand(checkResult,check,null,DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl"));

            boolean isAplyDone = false;
            boolean isExistData = false;
            if(checkResult.size() != 0) {
                aplyMemberDataObject = checkResult.get(0);
                isExistData = true;

                //再額外確認一次案件狀態
                if("VERIFIED".equalsIgnoreCase(aplyMemberDataObject.getValue("AplyStatus"))) {
                    isAplyDone = true;
                }
            }

            if(isAplyDone) {
                throw new Exception("您的案件已審核通過，不可修改資料。");
            }

            boolean isExistGuarantorData = false;
            DataObject aplyMemberTuitionLoanDtlGuarantor = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl_Guarantor");

            if(isExistData) {
                aplyMemberTuitionLoanDtlGuarantor.setValue("AplyNo",aplyMemberDataObject.getValue("AplyNo"));
                isExistGuarantorData = dao.querySingle(aplyMemberTuitionLoanDtlGuarantor,null);
            }
            else {
                aplyMemberTuitionLoanDtlGuarantor.setValue("AplyNo",applyNo);
            }


            //取得第二步的所得合計對象/及連帶保證人
            String incomeTax =  apply2Root.element("isIncomeTax").getText(); //共四碼，只有0或1，0代表不是，1代表是。例如：0001代表只有配偶是所得對象
            String isGuarantor = apply2Root.element("isGuarantor").getText(); //共四碼，只有0或1，0代表不是，1代表是。例如：0001代表只有配偶是連帶保證人

            boolean isFaIncome = incomeTax.substring(0,1).equals("1");
            boolean isMaIncome = incomeTax.substring(1,2).equals("1");
            boolean isGdIncome = incomeTax.substring(2,3).equals("1");
            boolean isPaIncome = incomeTax.substring(3,4).equals("1");


            boolean isFaGuarantor = isGuarantor.substring(0,1).equals("1");
            boolean isMaGuarantor = isGuarantor.substring(1,2).equals("1");
            boolean isGdGuarantor = isGuarantor.substring(2,3).equals("1");
            boolean isPaGuarantor = isGuarantor.substring(3,4).equals("1");

            //用來判斷是否簽立借據
            String faID = "" , maID = "" , thirdPartID = "",spouseId = "";
            if(apply2Root.element("father_id") != null) faID = apply2Root.element("father_id").getText();
            if(apply2Root.element("mother_id") != null) maID = apply2Root.element("mother_id").getText();
            if(apply2Root.element("thirdParty_id") != null) thirdPartID = apply2Root.element("thirdParty_id").getText();
            if(apply2Root.element("spouse_id") != null) spouseId = apply2Root.element("spouse_id").getText();
            Set<String> nowIdSet = new HashSet<String>();


            //如果是新增的話才給申請編號
            if(!isExistData) aplyMemberDataObject.setValue("AplyNo",  applyNo);// 申請編號

            //判斷申請人的通訊地址是否同戶藉地址(因為有可能一開始通訊地址是空的，但點了同戶藉地址後會帶的是隱碼，所以當有選就是直接在最後寫db時修改)
            String sameAddress = apply1_1Root.element("sameAddrHidden").getText();

            //申請人戶藉地址
            String aplyZip1 = apply1_1Root.element("domicileZipCode").getText();
            String aply1Village = apply1_1Root.element("domicileLiner").getText();
            String aplyAddr1_3 = apply1_1Root.element("DomicileNeighborhood").getText();
            String aplyAddr1 = apply1_1Root.element("DomicileAddress").getText();

            //申請人通訊地址
            String aplyZip2 = apply1_1Root.element("zipCode").getText();
            String aplyAddr2 = apply1_1Root.element("address").getText();

            if("Y".equalsIgnoreCase(sameAddress)) {
                aplyZip2 = aplyZip1;
                aplyAddr2 = aply1Village + aplyAddr1_3 + "鄰" + aplyAddr1;
            }

            String marryiage = "Y".equalsIgnoreCase(apply1_1Root.element("marryStatus").getText()) ? "1" : "0";

            //新增1-2的家庭狀況
            String familyStatusLevel1 = apply1_2Root.element("familyStatusLevel1").getText();
            String familyStatusLevel2 = apply1_2Root.element("familyStatusLevel2").getText();
            String parentStatus = "1";

            //如果已婚且是離婚帶離
            if("1".equalsIgnoreCase(marryiage)) {
                if("3".equalsIgnoreCase(familyStatusLevel1)) {
                    marryiage = "3";
                }
                else if("4".equalsIgnoreCase(familyStatusLevel1)) {
                    marryiage = "2";
                }
            }
            //如果未婚，要抓父母親的現況
            else {
                if("2".equalsIgnoreCase(familyStatusLevel1)) {
                    parentStatus = "3";
                }
            }

            aplyMemberDataObject.setValue("AplyWay", "IB"); // 申請途徑
            aplyMemberDataObject.setValue("AplyDate",  applyDate); // 申請日期
            aplyMemberDataObject.setValue("AplyTime",  applyTime); // 申請時間
            aplyMemberDataObject.setValue("IP",  ip);   // 資料更新IP
            aplyMemberDataObject.setValue("AplyIdNo", id);  // 申請人身分證字號
            aplyMemberDataObject.setValue("AplyBirthday", toYYYYBirthday(apply1_1Root.element("birthday").getText()));  // 申請人出生年月日
            aplyMemberDataObject.setValue("Applicant", apply1_1Root.element("name").getText());// 申請人姓名
            aplyMemberDataObject.setValue("Marriage", marryiage);// 婚姻狀況
            aplyMemberDataObject.setValue("AplyTelNo1_1", apply1_1Root.element("DomicileArea").getText()); // 申請人戶籍電話區碼
            aplyMemberDataObject.setValue("AplyTelNo1_2", apply1_1Root.element("DomicilePhone").getText());                           // 申請人戶籍電話
            aplyMemberDataObject.setValue("AplyTelNo1_3", "");                           // 申請人戶籍電話分機號碼
            aplyMemberDataObject.setValue("AplyTelNo2_1", apply1_1Root.element("areaTelephone").getText());                           // 申請人通訊電話區碼
            aplyMemberDataObject.setValue("AplyTelNo2_2", apply1_1Root.element("telephone").getText());                           // 申請人通訊電話
            aplyMemberDataObject.setValue("AplyTelNo2_3", "");                           // 申請人通訊電話分機號碼
            aplyMemberDataObject.setValue("AplyCellPhoneNo", apply1_1Root.element("cellPhone").getText());                     // 申請人手機號碼
            aplyMemberDataObject.setValue("AplyEmail", apply1_1Root.element("email").getText());                                 // 申請人 E-Mail
            aplyMemberDataObject.setValue("AplyZip1", aplyZip1);  // 申請人戶籍地址郵遞區號
            aplyMemberDataObject.setValue("Aply1Village", aply1Village);  // 申請人戶籍地址-村里
            aplyMemberDataObject.setValue("AplyAddr1_3", toChanisesFullChar(aplyAddr1_3)); // 申請人戶籍地址-鄰
            aplyMemberDataObject.setValue("AplyAddr1",toChanisesFullChar(aplyAddr1)); // 申請人戶籍地址-完整

            aplyMemberDataObject.setValue("AplyZip2", aplyZip2);                         // 申請人寄送地址郵遞區號
            aplyMemberDataObject.setValue("AplyAddr2", toChanisesFullChar(aplyAddr2));                             // 申請人寄送地址-完整


            //判斷是否申請人已成年(用來判斷寫入欄位是到監護人還是連帶保證人
            boolean isAdult = isAdult(aplyMemberDataObject.getValue("AplyBirthday"));

            aplyMemberDataObject.setValue("FamilyStatus",familyStatusLevel1 + "_" + familyStatusLevel2);

            if(StringUtils.isNotEmpty(faID)) {

                String faBirthday = ProjUtils.toDraftBirthday(apply2Root.element("father_birthday0").getText(),apply2Root.element("father_birthday2").getText(),apply2Root.element("father_birthday4").getText());

                aplyMemberTuitionLoanDtlGuarantor.setValue("Fa_Guarantor",isFaGuarantor ? "Y" : "N");
//                aplyMemberDataObject.setValue("Fa_Income",isFaIncome ? "Y" : "N");
                aplyMemberDataObject.setValue("Fa_Status", parentStatus);                           // 父親-現況
                aplyMemberDataObject.setValue("Fa_Name", apply2Root.element("father_name") != null ? apply2Root.element("father_name").getText() : "");     // 父親-姓名
                aplyMemberDataObject.setValue("Fa_IdNo", apply2Root.element("father_id") != null ? apply2Root.element("father_id").getText().toUpperCase() : "");
                aplyMemberDataObject.setValue("Fa_FrgnFlag", isForeignId(aplyMemberDataObject.getValue("Fa_IdNo")) ? "Y" : "N");                           // 父親-外籍人士註記// 父親-身分證字號
                aplyMemberDataObject.setValue("Fa_Birthday", toYYYYBirthday(faBirthday));                       // 父親-出生年月日
                aplyMemberDataObject.setValue("Fa_TelNo1", apply2Root.element("father_regionCode") != null ? apply2Root.element("father_regionCode").getText() : "");                         // 父親-聯絡電話區碼
                aplyMemberDataObject.setValue("Fa_TelNo2", apply2Root.element("father_phone") != null ? apply2Root.element("father_phone").getText() : "");                         // 父親-聯絡電話
                aplyMemberDataObject.setValue("Fa_TelNo3", "");                         // 父親-聯絡電話分機號碼
                aplyMemberDataObject.setValue("Fa_CellPhoneNo", apply2Root.element("father_mobile") != null ? apply2Root.element("father_mobile").getText() : "");                 // 父親-手機號碼
                aplyMemberDataObject.setValue("Fa_Zip", "請選擇".equals(apply2Root.element("father_zipCode_domi").getText()) ? "" : apply2Root.element("father_zipCode_domi").getText()); // 父親-戶籍地址郵遞區號
                aplyMemberDataObject.setValue("Fa_Addr_1", apply2Root.element("father_linerName_domi") != null ? apply2Root.element("father_linerName_domi").getText() : "");                           // 父親戶籍地址-村里名
                aplyMemberDataObject.setValue("FaVillage", apply2Root.element("father_liner_domi") != null ? apply2Root.element("father_liner_domi").getText() : "");                           // 父親戶籍地址-村里
                aplyMemberDataObject.setValue("Fa_Addr_3", toChanisesFullChar(apply2Root.element("father_neighborhood_domi") != null ? apply2Root.element("father_neighborhood_domi").getText() : ""));                           // 父親戶籍地址-鄰名
                aplyMemberDataObject.setValue("FaAddr", toChanisesFullChar(apply2Root.element("father_address_domi") != null ? apply2Root.element("father_address_domi").getText() : ""));                           // 父親戶籍地址-完整
            }


            if(StringUtils.isNotEmpty(maID)) {
                String maBirthday = ProjUtils.toDraftBirthday(apply2Root.element("mother_birthday0").getText(),apply2Root.element("mother_birthday2").getText(),apply2Root.element("mother_birthday4").getText());

                aplyMemberTuitionLoanDtlGuarantor.setValue("Ma_Guarantor",isMaGuarantor ? "Y" : "N");
//                aplyMemberDataObject.setValue("Ma_Income",isMaIncome ? "Y" : "N");
                aplyMemberDataObject.setValue("Ma_Status", parentStatus);                           // 母親-現況
                aplyMemberDataObject.setValue("Ma_Name", apply2Root.element("mother_name") != null ? apply2Root.element("mother_name").getText() : "");                               // 母親-姓名
                aplyMemberDataObject.setValue("Ma_IdNo", apply2Root.element("mother_id") != null ? apply2Root.element("mother_id").getText().toUpperCase() : "");                               // 母親-身分證字號
                aplyMemberDataObject.setValue("Ma_FrgnFlag", isForeignId(aplyMemberDataObject.getValue("Ma_IdNo")) ? "Y" : "N");                           // 母親-外籍人士註記
                aplyMemberDataObject.setValue("Ma_Birthday", toYYYYBirthday(maBirthday));                       // 母親-出生年月日
                aplyMemberDataObject.setValue("Ma_TelNo1", apply2Root.element("mother_regionCode") != null ? apply2Root.element("mother_regionCode").getText() : "");                         // 母親-聯絡電話區碼
                aplyMemberDataObject.setValue("Ma_TelNo2", apply2Root.element("mother_phone") != null ? apply2Root.element("mother_phone").getText() : "");                         // 母親-聯絡電話
                aplyMemberDataObject.setValue("Ma_TelNo3", "");                         // 母親-聯絡電話分機號碼
                aplyMemberDataObject.setValue("Ma_CellPhoneNo", apply2Root.element("mother_mobile") != null ? apply2Root.element("mother_mobile").getText() : "");                 // 母親-手機號碼
                aplyMemberDataObject.setValue("Ma_Zip", "請選擇".equals(apply2Root.element("mother_zipCode_domi").getText()) ? "" : apply2Root.element("mother_zipCode_domi").getText());                       // 母親-戶籍地址郵遞區號
                aplyMemberDataObject.setValue("Ma_Addr_1", apply2Root.element("mother_linerName_domi") != null ? apply2Root.element("mother_linerName_domi").getText() : "");                           // 母親戶籍地址-村里名
                aplyMemberDataObject.setValue("MaVillage", apply2Root.element("mother_liner_domi") != null ? apply2Root.element("mother_liner_domi").getText() : "");                           // 母親戶籍地址-村里
                aplyMemberDataObject.setValue("Ma_Addr_3", toChanisesFullChar(apply2Root.element("mother_neighborhood_domi") != null ? apply2Root.element("mother_neighborhood_domi").getText() : ""));                           // 母親戶籍地址-鄰名
                aplyMemberDataObject.setValue("MaAddr", toChanisesFullChar(apply2Root.element("mother_address_domi") != null ? apply2Root.element("mother_address_domi").getText() : ""));                           // 母親戶籍地址-完整
            }


            if(StringUtils.isNotEmpty(thirdPartID)) {
                String gdBirthday = ProjUtils.toDraftBirthday(apply2Root.element("thirdParty_birthday0").getText(),apply2Root.element("thirdParty_birthday2").getText(),apply2Root.element("thirdParty_birthday4").getText());
                String thirdPartyRelationship = apply2Root.element("thirdParty_relationship") != null ? apply2Root.element("thirdParty_relationship").getText() : "";

                //未成年寫入監護人
                if(!isAdult) {
                    aplyMemberTuitionLoanDtlGuarantor.setValue("Gd1_Guarantor",isGdGuarantor ? "Y" : "N");
//                    aplyMemberDataObject.setValue("Gd1_Guarantor",isGdGuarantor ? "Y" : "N");
                    aplyMemberDataObject.setValue("Gd1_Rel",thirdPartyRelationship);
                    aplyMemberDataObject.setValue("Gd1_Name", apply2Root.element("thirdParty_name") != null ? apply2Root.element("thirdParty_name").getText() : "");                               // 監護人-姓名
                    aplyMemberDataObject.setValue("Gd1_IdNo", apply2Root.element("thirdParty_id") != null ? apply2Root.element("thirdParty_id").getText().toUpperCase() : "");                               // 監護人-身分證字號
                    aplyMemberDataObject.setValue("Gd1_FrgnFlag", isForeignId(aplyMemberDataObject.getValue("Gd1_IdNo")) ? "Y" : "N");                           // 監護人-外籍人士註記
                    aplyMemberDataObject.setValue("Gd1_Birthday", toYYYYBirthday(gdBirthday));                       // 監護人-出生年月日
                    aplyMemberDataObject.setValue("Gd1_TelNo1", apply2Root.element("thirdParty_regionCode") != null ? apply2Root.element("thirdParty_regionCode").getText() : "");                         // 監護人-聯絡電話區碼
                    aplyMemberDataObject.setValue("Gd1_TelNo2", apply2Root.element("thirdParty_phone") != null ? apply2Root.element("thirdParty_phone").getText() : "");                         // 監護人-聯絡電話
                    aplyMemberDataObject.setValue("Gd1_TelNo3", "");                         // 監護人-聯絡電話分機號碼
                    aplyMemberDataObject.setValue("Gd1_CellPhoneNo", apply2Root.element("thirdParty_mobile") != null ? apply2Root.element("thirdParty_mobile").getText() : "");                 // 監護人-手機號碼
                    aplyMemberDataObject.setValue("Gd1_Zip", "請選擇".equals(apply2Root.element("thirdParty_zipCode_domi").getText()) ? "" : apply2Root.element("thirdParty_zipCode_domi").getText()); // 監護人-戶籍地址郵遞區號
                    aplyMemberDataObject.setValue("Gd1_Addr_1", apply2Root.element("thirdParty_linerName_domi") != null ? apply2Root.element("thirdParty_linerName_domi").getText() : "");                           // 監護人戶籍地址-村里名
                    aplyMemberDataObject.setValue("Gd1Village", apply2Root.element("thirdParty_liner_domi") != null ? apply2Root.element("thirdParty_liner_domi").getText() : "");                           // 監護人戶籍地址-村里
                    aplyMemberDataObject.setValue("Gd1_Addr_3", toChanisesFullChar(apply2Root.element("thirdParty_neighborhood_domi") != null ? apply2Root.element("thirdParty_neighborhood_domi").getText() : ""));                           // 監護人戶籍地址-鄰名
                    aplyMemberDataObject.setValue("Gd1Addr", toChanisesFullChar(apply2Root.element("thirdParty_address_domi") != null ? apply2Root.element("thirdParty_address_domi").getText() : ""));                           // 監護人戶籍地址-完整

                }

                //如果成年且第三人是連帶保證人
                if(isAdult && isGdGuarantor) {
                    aplyMemberTuitionLoanDtlGuarantor.setValue("War_Guarantor",isGdGuarantor ? "Y" : "N");

//                    aplyMemberDataObject.setValue("War_Guarantor",isGdGuarantor ? "Y" : "N");
                    aplyMemberDataObject.setValue("War_Rel",thirdPartyRelationship);
                    aplyMemberDataObject.setValue("War_Name", apply2Root.element("thirdParty_name") != null ? apply2Root.element("thirdParty_name").getText() : "");                               // 監護人-姓名
                    aplyMemberDataObject.setValue("War_IdNo", apply2Root.element("thirdParty_id") != null ? apply2Root.element("thirdParty_id").getText().toUpperCase() : "");                               // 監護人-身分證字號
                    aplyMemberDataObject.setValue("War_FrgnFlag", isForeignId(aplyMemberDataObject.getValue("War_IdNo")) ? "Y" : "N");                           // 監護人-外籍人士註記
                    aplyMemberDataObject.setValue("War_Birthday", toYYYYBirthday(gdBirthday));                       // 監護人-出生年月日
                    aplyMemberDataObject.setValue("War_TelNo1", apply2Root.element("thirdParty_regionCode") != null ? apply2Root.element("thirdParty_regionCode").getText() : "");                         // 監護人-聯絡電話區碼
                    aplyMemberDataObject.setValue("War_TelNo2", apply2Root.element("thirdParty_phone") != null ? apply2Root.element("thirdParty_phone").getText() : "");                         // 監護人-聯絡電話
                    aplyMemberDataObject.setValue("War_TelNo3", "");                         // 監護人-聯絡電話分機號碼
                    aplyMemberDataObject.setValue("War_CellPhoneNo", apply2Root.element("thirdParty_mobile") != null ? apply2Root.element("thirdParty_mobile").getText() : "");                 // 監護人-手機號碼
                    aplyMemberDataObject.setValue("War_Zip", "請選擇".equals(apply2Root.element("thirdParty_zipCode_domi").getText()) ? "" : apply2Root.element("thirdParty_zipCode_domi").getText()); // 監護人-戶籍地址郵遞區號
                    aplyMemberDataObject.setValue("War_Addr_1", apply2Root.element("thirdParty_linerName_domi") != null ? apply2Root.element("thirdParty_linerName_domi").getText() : "");                           // 監護人戶籍地址-村里名
                    aplyMemberDataObject.setValue("WarVillage", apply2Root.element("thirdParty_liner_domi") != null ? apply2Root.element("thirdParty_liner_domi").getText() : "");                           // 監護人戶籍地址-村里
                    aplyMemberDataObject.setValue("War_Addr_3", toChanisesFullChar(apply2Root.element("thirdParty_neighborhood_domi") != null ? apply2Root.element("thirdParty_neighborhood_domi").getText() : ""));                           // 監護人戶籍地址-鄰名
                    aplyMemberDataObject.setValue("WarAddr", toChanisesFullChar(apply2Root.element("thirdParty_address_domi") != null ? apply2Root.element("thirdParty_address_domi").getText() : ""));                           // 監護人戶籍地址-完整

                }

            }

            if(StringUtils.isNotEmpty(spouseId)) {
                String paBirthday = ProjUtils.toDraftBirthday(apply2Root.element("spouse_birthday0").getText(),apply2Root.element("spouse_birthday2").getText(),apply2Root.element("spouse_birthday4").getText());

                aplyMemberTuitionLoanDtlGuarantor.setValue("Pa_Guarantor",isPaGuarantor ? "Y" : "N");
//                aplyMemberDataObject.setValue("Pa_Guarantor",isPaGuarantor ? "Y" : "N");
                aplyMemberDataObject.setValue("Pa_Name", apply2Root.element("spouse_name") != null ? apply2Root.element("spouse_name").getText() : "");                               // 配偶-姓名
                aplyMemberDataObject.setValue("Pa_IdNo", apply2Root.element("spouse_id") != null ? apply2Root.element("spouse_id").getText().toUpperCase() : "");                               // 配偶-身分證字號
                aplyMemberDataObject.setValue("Pa_FrgnFlag", isForeignId(aplyMemberDataObject.getValue("Pa_IdNo")) ? "Y" : "N");                           // 配偶-外籍人士註記
                aplyMemberDataObject.setValue("Pa_Birthday", toYYYYBirthday(paBirthday));                       // 配偶-出生年月日
                aplyMemberDataObject.setValue("Pa_TelNo1", apply2Root.element("spouse_regionCode") != null ? apply2Root.element("spouse_regionCode").getText() : "");                         // 配偶-聯絡電話區碼
                aplyMemberDataObject.setValue("Pa_TelNo2", apply2Root.element("spouse_phone") != null ? apply2Root.element("spouse_phone").getText() : "");                         // 配偶-聯絡電話
                aplyMemberDataObject.setValue("Pa_TelNo3", "");                         // 配偶-聯絡電話分機號碼
                aplyMemberDataObject.setValue("Pa_CellPhoneNo", apply2Root.element("spouse_mobile") != null ? apply2Root.element("spouse_mobile").getText() : "");                 // 配偶-手機號碼
                aplyMemberDataObject.setValue("Pa_Zip", apply2Root.element("spouse_zipCode_domi") != null ? apply2Root.element("spouse_zipCode_domi").getText() : "");                       // 配偶-戶籍地址郵遞區號
                aplyMemberDataObject.setValue("Pa_Addr_1", apply2Root.element("spouse_linerName_domi") != null ? apply2Root.element("spouse_linerName_domi").getText() : "");                           // 配偶戶籍地址-村里名
                aplyMemberDataObject.setValue("PaVillage", apply2Root.element("spouse_liner_domi") != null ? apply2Root.element("spouse_liner_domi").getText() : "");                           // 配偶戶籍地址-村里
                aplyMemberDataObject.setValue("Pa_Addr_3", toChanisesFullChar(apply2Root.element("spouse_neighborhood_domi").getText()));                           // 配偶戶籍地址-鄰名
                aplyMemberDataObject.setValue("PaAddr", toChanisesFullChar(apply2Root.element("spouse_address_domi") != null ? apply2Root.element("spouse_address_domi").getText() : ""));                             // 配偶戶籍地址-完整


                //如果配偶是保證人，需額外寫到War欄位
                if(isPaGuarantor) {
                    aplyMemberDataObject.setValue("War_Rel","1A");
                    aplyMemberTuitionLoanDtlGuarantor.setValue("War_Guarantor",isPaGuarantor ? "Y" : "N");
//                    aplyMemberDataObject.setValue("War_Guarantor",isPaGuarantor ? "Y" : "N");
                    aplyMemberDataObject.setValue("War_Name", apply2Root.element("spouse_name") != null ? apply2Root.element("spouse_name").getText() : "");                               // 配偶-姓名
                    aplyMemberDataObject.setValue("War_IdNo", apply2Root.element("spouse_id") != null ? apply2Root.element("spouse_id").getText().toUpperCase() : "");                               // 配偶-身分證字號
                    aplyMemberDataObject.setValue("War_FrgnFlag", isForeignId(aplyMemberDataObject.getValue("Pa_IdNo")) ? "Y" : "N");                           // 配偶-外籍人士註記
                    aplyMemberDataObject.setValue("War_Birthday", toYYYYBirthday(paBirthday));                       // 配偶-出生年月日
                    aplyMemberDataObject.setValue("War_TelNo1", apply2Root.element("spouse_regionCode") != null ? apply2Root.element("spouse_regionCode").getText() : "");                         // 配偶-聯絡電話區碼
                    aplyMemberDataObject.setValue("War_TelNo2", apply2Root.element("spouse_phone") != null ? apply2Root.element("spouse_phone").getText() : "");                         // 配偶-聯絡電話
                    aplyMemberDataObject.setValue("War_TelNo3", "");                         // 配偶-聯絡電話分機號碼
                    aplyMemberDataObject.setValue("War_CellPhoneNo", apply2Root.element("spouse_mobile") != null ? apply2Root.element("spouse_mobile").getText() : "");                 // 配偶-手機號碼
                    aplyMemberDataObject.setValue("War_Zip", apply2Root.element("spouse_zipCode_domi") != null ? apply2Root.element("spouse_zipCode_domi").getText() : "");                       // 配偶-戶籍地址郵遞區號
                    aplyMemberDataObject.setValue("War_Addr_1", apply2Root.element("spouse_linerName_domi") != null ? apply2Root.element("spouse_linerName_domi").getText() : "");                           // 配偶戶籍地址-村里名
                    aplyMemberDataObject.setValue("WarVillage", apply2Root.element("spouse_liner_domi") != null ? apply2Root.element("spouse_liner_domi").getText() : "");                           // 配偶戶籍地址-村里
                    aplyMemberDataObject.setValue("War_Addr_3", toChanisesFullChar(apply2Root.element("spouse_neighborhood_domi").getText()));                           // 配偶戶籍地址-鄰名
                    aplyMemberDataObject.setValue("WarAddr", toChanisesFullChar(apply2Root.element("spouse_address_domi") != null ? apply2Root.element("spouse_address_domi").getText() : ""));                             // 配偶戶籍地址-完整

                }
            }

            //連帶保證人
            int ResCount = 1;
            //1:
            for(int i=0;i<isGuarantor.length();i++) {
                String str = isGuarantor.substring(i,i+1);

                //如果是連帶保證人，就看是父/母/監/第三
                if("1".equalsIgnoreCase(str)) {
                    String resValue = "";

                    if(i <= 2) {

                        boolean flag = false;

                        if(i == 0) {
                            resValue = "fa";
                            nowIdSet.add(faID);
                            flag = true;
                        }
                        else if(i == 1) {
                            resValue = "ma";
                            nowIdSet.add(maID);
                            flag = true;
                        }
                        else if(i == 2) {
                            nowIdSet.add(thirdPartID);

                            if(!isAdult) {
                                resValue = "gd1";
                                flag = true;
                            }

                        }

                        if(flag) {
                            aplyMemberDataObject.setValue("Res" + ResCount + "_Rel",resValue);
                            ResCount++;
                        }
                    }
                    else {
                        aplyMemberDataObject.setValue("War_Rel","1A");

                        nowIdSet.add(spouseId);
                    }


                }

            }


            String schoolCode = apply3_1Root.element("student_name").getText();
            DataObject schoolInfo = getSchoolInfo(schoolCode,dao);


            String enterYear = apply3_1Root.element("student_year_enter").getText();
            String enterMonth = apply3_1Root.element("student_month_enter").getText();
            String finishYear = apply3_1Root.element("year_graduation_hidden").getText();
            String finishMonty = apply3_1Root.element("month_graduation_hidden").getText();

            enterYear = (Integer.parseInt(enterYear) + 1911) + ""; //入學年-轉西元年
            enterMonth = StringUtils.leftPad(enterMonth,2,"0");//入學月-補滿2碼0

            finishYear = (Integer.parseInt(finishYear) + 1911) + ""; //畢業學年-轉西元年
            finishMonty = StringUtils.leftPad(finishMonty,2,"0");//畢業學月-補滿2碼0

            String eduStageCode = "";

            SQLCommand query = new SQLCommand("select EduStageCode from SchoolEduStageCode where SchoolType1 = ? and SchoolType2 = ? and SchoolType3 = ?");
            query.addParamValue(apply3_1Root.element("student_isNational").getText());
            query.addParamValue(apply3_1Root.element("student_isDay").getText());
            query.addParamValue(apply3_1Root.element("student_educationStage").getText());
            Vector<DataObject> tmp = new Vector<DataObject>();
            dao.queryByCommand(tmp,query,null,null);

            if(tmp.size() != 0) {
                eduStageCode = tmp.get(0).getValue("EduStageCode");
            }

            aplyMemberDataObject.setValue("Fa_IncomeAddOn",isFaIncome ? "Y" : "N");                // 父親是否為所得合計對象
            aplyMemberDataObject.setValue("Ma_IncomeAddOn",isMaIncome ? "Y" : "N");                // 母親是否為所得合計對象
            aplyMemberDataObject.setValue("Gd1_IncomeAddOn",isGdIncome ? "Y" : "N");              // 監護人一是否為所得合計對象
//            aplyMemberDataObject.setValue("Gd2_IncomeAddOn",isGdIncome ? "Y" : "N");              // 監護人二是否為所得合計對象
            aplyMemberDataObject.setValue("Pa_IncomeAddOn",isPaIncome ? "Y" : "N");                // 配偶是否為所得合計對象
            aplyMemberDataObject.setValue("schoolType1",apply3_1Root.element("student_isNational").getText());                    // 就讀學校公私立別
            aplyMemberDataObject.setValue("schoolType2",apply3_1Root.element("student_isDay").getText());                    // 就讀學校日夜間別
            aplyMemberDataObject.setValue("schoolType3",apply3_1Root.element("student_educationStage").getText());                    // 就讀學制別
            aplyMemberDataObject.setValue("eduStageCode",eduStageCode);// 教育階段
            aplyMemberDataObject.setValue("schoolCityCode",schoolInfo.getValue("SchoolCityCode"));              // 就讀學校所在縣市代碼
            aplyMemberDataObject.setValue("schoolCode",  schoolInfo.getValue("SchoolCode"));                      // 銀行學校代碼(三碼)
            aplyMemberDataObject.setValue("schoolEduCode",schoolInfo.getValue("SchoolEduCode"));                // 教育部學校代碼(六碼)
            aplyMemberDataObject.setValue("subject",apply3_1Root.element("student_department").getText());                            // 科系
            aplyMemberDataObject.setValue("class1",apply3_1Root.element("student_grade").getText());                              // 年級
            aplyMemberDataObject.setValue("class2",apply3_1Root.element("student_class").getText());                              // 班級
            aplyMemberDataObject.setValue("learnId",apply3_1Root.element("student_id").getText());                        // 學號
            aplyMemberDataObject.setValue("schoolWorkFlag", "Y".equals(apply3_1Root.element("student_isDay").getText()) ? "1" : "0");              // 是否為在職班
            aplyMemberDataObject.setValue("enterDT",  enterYear + enterMonth);                          // 入學日期
            aplyMemberDataObject.setValue("finishDT",  finishYear + finishMonty);                      // 應畢業年月
            aplyMemberDataObject.setValue("eduYear",  eduYear);                            // 學年度
            aplyMemberDataObject.setValue("semester",  semester);                          // 學期

            String loanType = apply3_2Root.element("purchaser") != null ? apply3_2Root.element("purchaser").getText() : "";
            String loanAmt = apply3_1Root.element("loanAmt") != null ? apply3_1Root.element("loanAmt").getText() : "";
            String renderAmtSchool = "0";
            String renderAmtEducation = apply3_2Root.element("freedom_credit") != null ? apply3_2Root.element("freedom_credit").getText() : "";
            String renderAmtInsurance = apply3_2Root.element("freedom_FPA") != null ? apply3_2Root.element("freedom_FPA").getText() : "";
            String renderAmtPractice = apply3_2Root.element("freedom_practice") != null ? apply3_2Root.element("freedom_practice").getText() : "";
            String renderAmtMusic = apply3_2Root.element("freedom_music") != null ? apply3_2Root.element("freedom_music").getText() : "";

            String renderAmtOther = "0";
            String renderAmtBook = "1".equalsIgnoreCase(loanType) ? apply3_2Root.element("accordingToBill_book").getText() : apply3_2Root.element("freedom_book").getText();
            String renderAmtLodging =  "1".equalsIgnoreCase(loanType) ? apply3_2Root.element("accordingToBill_live").getText() : apply3_2Root.element("freedom_live").getText();
            String renderAmtStudy =  "1".equalsIgnoreCase(loanType) ? apply3_2Root.element("accordingToBill_abroad").getText() : apply3_2Root.element("freedom_abroad").getText();
            String renderAmtLiving =  "1".equalsIgnoreCase(loanType) ? apply3_2Root.element("accordingToBill_life").getText() : apply3_2Root.element("freedom_life").getText();

            //過濾半形逗點
            loanAmt = StringUtils.replace(loanAmt,",","");

            if(StringUtils.isEmpty(renderAmtEducation)) renderAmtEducation = "0";
            if(StringUtils.isEmpty(renderAmtInsurance)) renderAmtInsurance = "0";
            if(StringUtils.isEmpty(renderAmtPractice)) renderAmtPractice = "0";
            if(StringUtils.isEmpty(renderAmtMusic)) renderAmtMusic = "0";
            if(StringUtils.isEmpty(renderAmtOther)) renderAmtOther = "0";
            if(StringUtils.isEmpty(renderAmtBook)) renderAmtBook = "0";
            if(StringUtils.isEmpty(renderAmtLodging)) renderAmtLodging = "0";
            if(StringUtils.isEmpty(renderAmtStudy)) renderAmtStudy = "0";
            if(StringUtils.isEmpty(renderAmtLiving)) renderAmtLiving = "0";

            String renderAmtSum = (Integer.parseInt(renderAmtSchool) + Integer.parseInt(renderAmtEducation) +
                    Integer.parseInt(renderAmtInsurance) + Integer.parseInt(renderAmtPractice) +
                    Integer.parseInt(renderAmtMusic) +
                    Integer.parseInt(renderAmtOther) + Integer.parseInt(renderAmtBook) +
                    Integer.parseInt(renderAmtLodging) + Integer.parseInt(renderAmtStudy) +
                    Integer.parseInt(renderAmtLiving)) + "";

            String scholarship = "1".equalsIgnoreCase(loanType) ? apply3_2Root.element("accordingToBill_publicExpense").getText() : apply3_2Root.element("freedom_publicExpense").getText();
            String scholarshipFlag = ("0".equals(scholarship) || StringUtils.isEmpty(scholarship)) ? "N" : "Y";
            String renderAmt = "1".equalsIgnoreCase(loanType) ? apply3_2Root.element("accordingToBill_sum_hidden").getText() : apply3_2Root.element("freedom_sum").getText();

            aplyMemberDataObject.setValue("loanAmt", loanAmt);  // 申貸額度
            aplyMemberDataObject.setValue("loanType",  loanType);                          // 本次申貸標準
            aplyMemberDataObject.setValue("renderAmt_school", apply3_2Root.element("loansSum").getText());          // 學校可貸金額
            aplyMemberDataObject.setValue("renderAmt_education", renderAmtEducation);    // 學雜費
            aplyMemberDataObject.setValue("renderAmt_insurance", renderAmtInsurance);    // 學生團體保險費
            aplyMemberDataObject.setValue("renderAmt_practice", renderAmtPractice);      // 實習費
            aplyMemberDataObject.setValue("renderAmt_music", renderAmtMusic);            // 音樂指導費
            aplyMemberDataObject.setValue("renderAmt_other_desc", "");  // 其他-說明
            aplyMemberDataObject.setValue("renderAmt_other", renderAmtOther);            // 其他
            aplyMemberDataObject.setValue("renderAmt_book", renderAmtBook);              // 書籍費
            aplyMemberDataObject.setValue("renderAmt_lodging", renderAmtLodging);        // 住宿費
            aplyMemberDataObject.setValue("renderAmt_study", renderAmtStudy);            // 海外研修費
            aplyMemberDataObject.setValue("renderAmt_living", renderAmtLiving);          // 生活費
            aplyMemberDataObject.setValue("renderAmt_sum", renderAmtSum);                // 貸款明細合計
            aplyMemberDataObject.setValue("scholarshipFlag",scholarshipFlag);            // 是否申請教育補助費或享有公費
            aplyMemberDataObject.setValue("scholarship", scholarship);                    // 補助金額
            aplyMemberDataObject.setValue("renderAmt", renderAmt);                        // 本次請撥金額


            //因為不見得會有對保分行的資料
            if(applyOnline4Root != null) {
                String branchId = applyOnline4Root.element("idSelected").getText();
                String dateSelected = applyOnline4Root.element("dateSelected").getText();
                String timeSelected = applyOnline4Root.element("timeSelected").getText();

                aplyMemberDataObject.setValue("expectDate",  DateUtil.convertDateTo14(dateSelected).substring(0,8));                      // 預約對保日期
                aplyMemberDataObject.setValue("expectTime",  timeSelected);                      // 預約對保時間
                aplyMemberDataObject.setValue("expectBranchId", branchId);              // 預計前往分行代碼
            }



            aplyMemberDataObject.setValue("aplyStatus", "UNVERIFIED");                                              // 申請狀況

            aplyMemberDataObject.setValue("AplyCaseType",aplyCaseType); //(1:線上續貸/2:分行對保)

            //把null預設值拿掉
            List<DataColumn> colList = aplyMemberDataObject.getColumnList();
            for(DataColumn col : colList) {
                if(col.getValue() == null || "null".equalsIgnoreCase(col.getValue())) col.setValue("");
            }

            GardenLog.log(GardenLog.DEBUG,aplyMemberDataObject.toXml());

            //自動帶入是否簽立借據欄位
            checkSignBill(dao,aplyMemberDataObject,nowIdSet);
//            aplyMemberDataObject.setValue("signBill",  "Y");                          // 是否需簽立借據
//            aplyMemberDataObject.setValue("sign_schoolCode",  applyData.get("signSchoolCode"));             // 總額度檔 - 學校代碼
//            aplyMemberDataObject.setValue("sign_loanAmt",  applyData.get("signLoanAmt"));                   // 總額度檔 - 總額度
//            aplyMemberDataObject.setValue("sign_eduStageCode",  applyData.get("signEduStageCode"));         // 總額度檔 - 教育階段
//            aplyMemberDataObject.setValue("sign_loanAcct",  applyData.get("signLoanAcct"));                 // 總額度檔 - 放款帳號
//            aplyMemberDataObject.setValue("sign_yearTerm",  applyData.get("signYearTerm"));                 // 總額度檔 - 學年度學期

            if(!isExistData) dao.insert(aplyMemberDataObject);
            else dao.update(aplyMemberDataObject);

            aplyMemberTuitionLoanDtlGuarantor.setValue("CreateTime",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));

            if(!isExistGuarantorData) dao.insert(aplyMemberTuitionLoanDtlGuarantor);
            else dao.update(aplyMemberTuitionLoanDtlGuarantor);

        }catch(Exception e) {
            e.printStackTrace();

            throw e;
        }

        return aplyMemberDataObject;
    }

    // 檢核需不需簽立借據
    private static void checkSignBill(IDao dao,DataObject aplyMemberDataObject,Set<String> nowIdSet) throws Exception {
        String signBill = null;

        String aplyIdNo = aplyMemberDataObject.getValue("AplyIdNo");//申請人身分證字號
        String schoolCode = aplyMemberDataObject.getValue("SchoolCode");// 學校代碼
        String loanAmt = aplyMemberDataObject.getValue("LoanAmt");//總額度
        String eduStageCode = aplyMemberDataObject.getValue("eduStageCode");//教育階段

        try {
            // 取得總額度資料
            HashMap<String,String> signHM = getSignData(dao,aplyIdNo, schoolCode, loanAmt, eduStageCode);

            String yearTerm = aplyMemberDataObject.getValue("EduYear") + aplyMemberDataObject.getValue("semester");
            while (yearTerm.length() < 4)  yearTerm = "0" + yearTerm;

            // 確保目前申請學年度學期大於總額度檔對保學年度學期
            if (yearTerm.compareTo(signHM.get("signYearTerm")) > 0) {

                aplyMemberDataObject.setValue("signBill",signHM.get("signBill"));
                aplyMemberDataObject.setValue("sign_SchoolCode",signHM.get("signSchoolCode"));
                aplyMemberDataObject.setValue("sign_LoanAmt",signHM.get("signLoanAmt"));
                aplyMemberDataObject.setValue("sign_EduStageCode",signHM.get("signEduStageCode"));
                aplyMemberDataObject.setValue("sign_LoanAcct",signHM.get("signLoanAcct"));
                aplyMemberDataObject.setValue("sign_YearTerm",signHM.get("signYearTerm"));

                signBill = aplyMemberDataObject.getValue("signBill");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        GardenLog.log(GardenLog.DEBUG,"checkSignBill signBill = " + signBill);

        if (signBill == null) {
            aplyMemberDataObject.setValue("signBill", "Y");
            aplyMemberDataObject.setValue("sign_SchoolCode", "");
            aplyMemberDataObject.setValue("sign_LoanAmt", "");
            aplyMemberDataObject.setValue("sign_EduStageCode", "");
            aplyMemberDataObject.setValue("sign_LoanAcct", "");
            aplyMemberDataObject.setValue("sign_YearTerm", "");

        } else if (signBill.equals("N")) {

            //判斷第四個條件保證人
            if(!isRelMatch(nowIdSet,aplyMemberDataObject.getValue("sign_LoanAcct"),aplyMemberDataObject.getValue("sign_YearTerm"))) {
                aplyMemberDataObject.setValue("signBill","Y");
            }
        }
    }

    //判斷這次的關係人數量與ID是否一致(發EB392225電文)
    public static boolean isRelMatch(Set<String> nowIdSet,String acnoSL,String yrTerm) {

        boolean isMatch = false;

        try{
            Set<String> txIdSet = new HashSet<String>();

            String response = null;
            String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
            if(!"sit".equalsIgnoreCase(env)) {

                RQBean rqBean = new RQBean();
                rqBean.setTxId("EB392225");
                rqBean.addRqParam("ACNO_SL",acnoSL);
                rqBean.addRqParam("YR_TERM",yrTerm);

                RSBean rsBean = WebServiceAgent.callWebService(rqBean);
                if(rsBean.isSuccess()) {
                    response = rsBean.getTxnString();
                }

            }
            else {
                response = "<root>\n" +
                        "    <CUST_NO>A126006736</CUST_NO>\n" +
                        "    <CUST_NAME>楊ＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸＸ</CUST_NAME>\n" +
                        "    <ACT_DESC>助學貸款</ACT_DESC>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM>0982</YR_TERM>\n" +
                        "        <GUAR_ID>A103394411</GUAR_ID>\n" +
                        "        <GUAR_NAME>楊ＸＸＸＸＸＸＸＸＸ</GUAR_NAME>\n" +
                        "        <GUAR_TYP>G1</GUAR_TYP>\n" +
                        "        <GUAR_REL>XB</GUAR_REL>\n" +
                        "        <GUAR_AREA>111</GUAR_AREA>\n" +
                        "        <GUAR_TELNO>1234567890</GUAR_TELNO>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM>0982</YR_TERM>\n" +
                        "        <GUAR_ID>H220766929</GUAR_ID>\n" +
                        "        <GUAR_NAME>古ＸＸＸＸＸＸＸＸＸ</GUAR_NAME>\n" +
                        "        <GUAR_TYP>G1</GUAR_TYP>\n" +
                        "        <GUAR_REL>XB</GUAR_REL>\n" +
                        "        <GUAR_AREA>111</GUAR_AREA>\n" +
                        "        <GUAR_TELNO>1234567890</GUAR_TELNO>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "    <TxRepeat>\n" +
                        "        <YR_TERM/>\n" +
                        "        <GUAR_ID/>\n" +
                        "        <GUAR_NAME/>\n" +
                        "        <GUAR_TYP/>\n" +
                        "        <GUAR_REL/>\n" +
                        "        <GUAR_AREA/>\n" +
                        "        <GUAR_TELNO/>\n" +
                        "    </TxRepeat>\n" +
                        "</root>";
            }


            if(StringUtils.isNotEmpty(response)) {
                Document doc = DocumentHelper.parseText(response);
                Element root = doc.getRootElement();
                List<Element> txRepeats = root.elements("TxRepeat");
                if(txRepeats != null) {
                    for(Element element : txRepeats) {
                        String guarId = element.element("GUAR_ID").getText();

                        guarId = guarId.trim();
                        GardenLog.log(GardenLog.DEBUG,"guarId = [" + guarId + "]");

                        if(StringUtils.isNotEmpty(guarId)) {
                            txIdSet.add(guarId);
                        }
                    }
                }

                for(String id : nowIdSet) {
                    if(StringUtils.isNotEmpty(id)) {
                        GardenLog.log(GardenLog.DEBUG,"id = [" + id + "]");
                    }
                }

                GardenLog.log(GardenLog.DEBUG,"nowIdSet length = " + nowIdSet.size());
                GardenLog.log(GardenLog.DEBUG,"txIdSet length = " + txIdSet.size());

                //如果數量相同
                if(nowIdSet.size() != 0 && nowIdSet.size() == txIdSet.size()) {
                    boolean idMatch = true;

                    for(String id : nowIdSet) {
                        if(!txIdSet.contains(id)) idMatch = false;
                    }

                    GardenLog.log(GardenLog.DEBUG,"idMatch = " + idMatch);

                    if(idMatch) isMatch = true;
                }
            }


        }catch(Exception e) {
            e.printStackTrace();
        }

        return isMatch;

    }

    // 取得總額度資料，並判斷是否需簽立借據
    public static HashMap<String,String> getSignData(IDao dao,String userIdNo, String schoolCode, String loanAmt, String eduStageCode) throws Exception {

        String signBill = "Y";
        String signAplyIdNo = "";
        String signSchoolCode = "";
        String signLoanAmt = "";
        String signEduStageCode = "";
        String signLoanAcct = "";
        String signYearTerm = "";

        SQLCommand query = new SQLCommand("select top 1 * from AplyTuitionLoanMemo where APLYIDNO like ? order by YEARTERM desc");
        query.addParamValue(userIdNo + "%");

        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        if (ret.size() != 0) {

            DataObject dataObject = ret.get(0);

            signSchoolCode = dataObject.getValue("SCHOOLCODE");      // 借據學校代碼
            signLoanAmt = dataObject.getValue("LOANAMT");            // 借據總額度
            signEduStageCode = dataObject.getValue("EDUSTAGECODE");  // 借據教育階段
            signLoanAcct = dataObject.getValue("LOANACCT");          // 借據放款帳號
            signYearTerm = dataObject.getValue("YEARTERM");          // 借據學年度學期

            if (signSchoolCode.equals(schoolCode) &&
                    signLoanAmt.equals(loanAmt) &&
                    isStdLoanAmt(dao,loanAmt) &&
                    signEduStageCode.equals(eduStageCode)
                    ) {
                signBill = "N";
            }
        }

        HashMap<String,String> hm = new HashMap<String,String>();

        hm.put("signBill", signBill);                  // 是否需簽立借據(Y/N)
        hm.put("signSchoolCode", signSchoolCode);      // 借據學校代碼
        hm.put("signLoanAmt", signLoanAmt);            // 借據總額度
        hm.put("signEduStageCode", signEduStageCode);  // 借據教育階段
        hm.put("signLoanAcct", signLoanAcct);          // 借據放款帳號
        hm.put("signYearTerm", signYearTerm);          // 借據學年度學期

        GardenLog.log(GardenLog.DEBUG,"signBill = " + signBill);
        GardenLog.log(GardenLog.DEBUG,"signSchoolCode = " + signSchoolCode);
        GardenLog.log(GardenLog.DEBUG,"signLoanAmt = " + signLoanAmt);
        GardenLog.log(GardenLog.DEBUG,"signEduStageCode = " + signEduStageCode);
        GardenLog.log(GardenLog.DEBUG,"signLoanAcct = " + signLoanAcct);
        GardenLog.log(GardenLog.DEBUG,"signYearTerm = " + signYearTerm);

        return hm;
    }

    // 檢核是否為標準總額度
    public static boolean isStdLoanAmt(IDao dao ,String loanAmt) throws Exception {

        Map<String,String> stdLoanAmt = new HashMap<String,String>();

        if (stdLoanAmt.size() == 0) {
            SQLCommand query = new SQLCommand("select distinct LOANAMT from SchoolLoanAmt");
            Vector<DataObject> tmp = new Vector<DataObject>();
            dao.queryByCommand(tmp,query,null,null);

            if (tmp.size() > 0) {
                for (DataObject d : tmp) {
                    stdLoanAmt.put(d.getValue("LOANAMT"), "");
                }
            } else {
                stdLoanAmt.put("300000", "");
                stdLoanAmt.put("800000", "");
                stdLoanAmt.put("1500000", "");
            }
        }

        return (stdLoanAmt.get(loanAmt) != null);
    }

    public static String toBirthday(String birthday) {

        GardenLog.log(GardenLog.DEBUG,"birthday = " + birthday);

        if(StringUtils.isEmpty(birthday) || birthday.length() < 4) return birthday;
        String year = birthday.substring(0,4);
        year = Integer.parseInt(year) - 1911 + "";

        return StringUtils.leftPad(String.valueOf(year),3,"0") + birthday.substring(4);
    }

    public static String toYYYYBirthday(String birthday) {

        GardenLog.log(GardenLog.DEBUG,"birthday = " + birthday);

        if(StringUtils.isEmpty(birthday) || birthday.length() < 3) return birthday;
        String year = birthday.substring(0,3);
        year = Integer.parseInt(year) + 1911 + "";

        return year + birthday.substring(3);
    }

    public static DataObject getSchoolInfo(String schoolCode,IDao dao) throws Exception {
        SQLCommand query = new SQLCommand("select a.*,b.CityId,b.CityName from schoolInfo  a , city b\n" +
                "where 1=1\n" +
                "and a.SchoolCityCode = b.CityId2\n" +
                "and a.schoolcode = ?");
        query.addParamValue(schoolCode);
        Vector<DataObject> ret = new Vector<DataObject>();

        dao.queryByCommand(ret,query,null,null);

        if(ret.size() != 0) return ret.get(0);
        else return null;
    }

    //查詢本學年/學期的資料
    public static DataObject getAplyMemberTuitionLoanDataThisYearSemeter(String userId,IDao dao) throws Exception {

        //取得當下學期
        HashMap<String,String> eduYearInfo = ProjUtils.getEduYearInfo(dao,null);

        //取當下學年跟學期
        String eduYear = eduYearInfo.get("eduYear");
        String semester = eduYearInfo.get("semester");

        Map<String,String> queryMap = new HashMap<String,String>();
        queryMap.put("EduYear",eduYear);
        queryMap.put("Semester",semester);

        return getAplyMemberTuitionLoanData(userId,queryMap, dao);

    }

    //查詢申請學期的資料
    public static DataObject getAplyMemberTuitionLoanData(String userId,IDao dao) throws Exception {
        return getAplyMemberTuitionLoanData(userId,null, dao);

    }

    //查詢申請學期的資料
    public static DataObject getAplyMemberTuitionLoanData(String userId,Map<String,String> queryMap,IDao dao) throws Exception {

        SQLCommand query = new SQLCommand("select * from AplyMemberTuitionLoanDtl where AplyIdNo = ?");
        query.addParamValue(userId);

        String where = "";
        if(queryMap != null) {
            for(String key : queryMap.keySet()) {
                where += " and " + key + " = ?";
                query.addParamValue(queryMap.get(key));
            }
        }

        query.setSQL(query.getSql() + where);

        Vector<DataObject> ret = new Vector<DataObject>();

        dao.queryByCommand(ret,query,null,DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl"));

        if(ret.size() != 0) return ret.get(0);
        else return null;

    }

    //查詢申請撥款的資料
    public static DataObject getNewsAplyMemberTuitionLoanHistoryData(String userId,IDao dao) throws Exception {
        SQLCommand query = new SQLCommand("select * from AplyMemberTuitionLoanDtl_History where AplyIdNo = ? and APLYSTATUS not in ('DELETE')");
        query.addParamValue(userId);
        Vector<DataObject> ret = new Vector<DataObject>();

        dao.queryByCommand(ret,query,null,null);

        if(ret.size() != 0) return ret.get(0);
        else return null;

    }

    public static String toAddress(DataObject AplyMemberTuitionLoanDtlHistoryObj , String dbColumnPrefix) {
        return toAddress(AplyMemberTuitionLoanDtlHistoryObj, dbColumnPrefix,"");
    }

    public static String toAddress(DataObject AplyMemberTuitionLoanDtlHistoryObj , String dbColumnPrefix,String addrPrefix) {
        String address = "";

        for(int i=5 ; i<= 25; i ++) {

            String column = dbColumnPrefix + "Addr"+addrPrefix+"_" + i;
            GardenLog.log(GardenLog.DEBUG,"toAddress = " + (column));
            address += AplyMemberTuitionLoanDtlHistoryObj.getValue(column);
        }

        return address;
    }

    public static String toCityName(String cityId,IDao dao) throws Exception {
        SQLCommand query = new SQLCommand("select CityName from City where CityId = ?");
        query.addParamValue(cityId);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        if(ret.size() != 0) return ret.get(0).getValue("CityName");
        else return null;
    }

    public static String toZipCodeName(String zipcode,IDao dao) throws Exception {
        SQLCommand query = new SQLCommand("select AreaName from ZipCode where ZipCode = ?");
        query.addParamValue(zipcode);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        if(ret.size() != 0) return ret.get(0).getValue("AreaName");
        else return null;
    }

    public static String toCityId(String zipcode,IDao dao) throws Exception {
        SQLCommand query = new SQLCommand("select CityId from ZipCode where ZipCode = ?");
        query.addParamValue(zipcode);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        if(ret.size() != 0) return ret.get(0).getValue("CityId");
        else return null;
    }

    public static String toFullAddress(IDao dao,DataObject aplyMemberCase,String zipCodeCol,String villageCol,String linerCol,String addressCol) throws Exception{
        if(aplyMemberCase != null) {
            String zipcode = aplyMemberCase.getValue(zipCodeCol);
            String cityId = toCityId(zipcode,dao);

            String liner = aplyMemberCase.getValue(linerCol);
            if(StringUtils.isNotEmpty(liner)) {
                liner = liner + "鄰";
            }
            return toCityName(cityId,dao) + toZipCodeName(zipcode,dao) + aplyMemberCase.getValue(villageCol) + liner  + aplyMemberCase.getValue(addressCol);
        }
        else {
            return "";
        }
    }

    public static Vector<DataObject> getBranch(Map<String,String> searchMap,IDao dao) throws Exception {
        SQLCommand query = new SQLCommand();

        String where = " where 1=1\n";
        if(searchMap != null) {
            for(String column : searchMap.keySet()) {
                String value = searchMap.get(column);

                where += " and "+column+" = ?\n";
                query.addParamValue(value);
            }

        }

        query.setSQL("select B.* from\n" +
                "Branch B\n" +
                where +
                "order by B.ZipCode, B.BRANCHID");

//        query.setSQL("select A.AreaName, B.* from\n" +
//                "School_AreaCode A inner join Branch B on A.AREACODE = B.AREACODE\n" +
//                where +
//                "order by A.ORDERIDX, B.AREACODE, B.BRANCHID");

        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        return ret;
    }

    //我要申請最後第5步確認資料的基本欄位
    public static void setApplyCommitStep5BasicData(JSPQueryStringInfo queryStringInfo,JSONObject content,String userId,IDao dao) throws Exception {

        //抓1-1、1-2、2、3-1、3-2、apply_online_4的草稿
        String apply1_1DraftXML = FlowUtils.getDraftData(userId,"apply","apply1_1",dao);
        String apply1_2DraftXML = FlowUtils.getDraftData(userId,"apply","apply1_2",dao);
        String apply2DraftXML = FlowUtils.getDraftData(userId,"apply","apply2",dao);
        String apply3_1DraftXML = FlowUtils.getDraftData(userId,"apply","apply3_1",dao);
        String apply3_2DraftXML = FlowUtils.getDraftData(userId,"apply","apply3_2",dao);

        Document apply1_1Doc = StringUtils.isNotEmpty(apply1_1DraftXML) ? DocumentHelper.parseText(apply1_1DraftXML) : null;
        Document apply1_2Doc = StringUtils.isNotEmpty(apply1_2DraftXML) ?DocumentHelper.parseText(apply1_2DraftXML) : null;
        Document apply2Doc = StringUtils.isNotEmpty(apply2DraftXML) ?DocumentHelper.parseText(apply2DraftXML) : null;
        Document apply3_1Doc = StringUtils.isNotEmpty(apply3_1DraftXML) ?DocumentHelper.parseText(apply3_1DraftXML) : null;
        Document apply3_2Doc = StringUtils.isNotEmpty(apply3_2DraftXML) ?DocumentHelper.parseText(apply3_2DraftXML) : null;

        //抓1-1
        Apply1_1 apply1_1 = new Apply1_1();
        apply1_1.setMark(false);
        apply1_1.getDraftData(content,apply1_1Doc,queryStringInfo);

        //抓1-2
        Apply1_2 apply1_2 = new Apply1_2();
        apply1_2.getDraftData(content,apply1_2Doc,queryStringInfo);

        //抓2
        Apply2 apply2 = new Apply2();
        apply2.getDraftData(content, apply2Doc, queryStringInfo);

        //抓3-1
        Apply3_1 apply3_1 = new Apply3_1();
        apply3_1.setConvertChinese(true);
        apply3_1.getDraftData(content,apply3_1Doc,queryStringInfo);

        //抓3-2
        Apply3_2 apply3_2 = new Apply3_2();
        apply3_2.getDraftData(content, apply3_2Doc, queryStringInfo);

        //因為1-1放的縣市跟行政區都是代碼，要轉成中文
        JSONObject domicileAddress = content.getJSONObject("domicileAddress");
        JSONObject teleAddress = content.getJSONObject("teleAddress");

        String domicileAddressCityId = domicileAddress.getString("cityId");
        String domicileAddressZipCode = domicileAddress.getString("zipCode");

        domicileAddress.put("cityId",ProjUtils.toCityName(domicileAddressCityId,dao));
        domicileAddress.put("zipCode",ProjUtils.toZipCodeName(domicileAddressZipCode,dao));

        String teleAddressCityId = teleAddress.getString("cityId");
        String teleAddressZipCode = teleAddress.getString("zipCode");

        teleAddress.put("cityId",ProjUtils.toCityName(teleAddressCityId,dao));
        teleAddress.put("zipCode",ProjUtils.toZipCodeName(teleAddressZipCode,dao));
    }

    //依照申請人取得線上續貸資料
    public static void setOnlineDocumentApplyData(JSONObject content,String userId,IDao dao) throws Exception {

        String appoName = "",fatherName = "",motherName = "",thirdPartyName = "",spouseName = "",thirdPartyTitle = "",
                loans = "" , loanPrice = "",freedomLife = "",accordingToBillLife = "",applicantAdult = "", marryStatus = "",
                familyStatusLevel1 = "",familyStatusLevel2 = "";


        //從1-1、1-2、2、3-2取得草稿資料
        String draftXML1_1 = FlowUtils.getDraftData(userId,"apply","apply1_1",dao);
        String draftXML1_2 = FlowUtils.getDraftData(userId,"apply","apply1_2",dao);
        String draftXML2 = FlowUtils.getDraftData(userId,"apply","apply2",dao);
        String draftXML3_2 = FlowUtils.getDraftData(userId,"apply","apply3_2",dao);

        Document draftDoc1_1 = DocumentHelper.parseText(draftXML1_1);
        Document draftDoc1_2 = DocumentHelper.parseText(draftXML1_2);
        Document draftDoc2 = DocumentHelper.parseText(draftXML2);
        Document draftDoc3_2 = DocumentHelper.parseText(draftXML3_2);

        Element draftRoot1_1 = draftDoc1_1.getRootElement();
        Element draftRoot1_2 = draftDoc1_2.getRootElement();
        Element draftRoot2 = draftDoc2.getRootElement();
        Element draftRoot3_2 = draftDoc3_2.getRootElement();

        if(draftRoot1_1.element("name") != null) appoName = draftRoot1_1.element("name").getText();

        if(draftRoot1_2.element("familyStatusLevel1") != null) familyStatusLevel1 = draftRoot1_2.element("familyStatusLevel1").getText();
        if(draftRoot1_2.element("familyStatusLevel2") != null) familyStatusLevel2 = draftRoot1_2.element("familyStatusLevel2").getText();
        if(draftRoot1_2.element("applicantAdult") != null) applicantAdult = draftRoot1_2.element("applicantAdult").getText();
        if(draftRoot1_2.element("userMarriedHidden") != null) marryStatus = draftRoot1_2.element("userMarriedHidden").getText();

        if(draftRoot2.element("father_name") != null) fatherName = draftRoot2.element("father_name").getText();
        if(draftRoot2.element("mother_name") != null) motherName = draftRoot2.element("mother_name").getText();
        if(draftRoot2.element("thirdParty_name") != null) thirdPartyName = draftRoot2.element("thirdParty_name").getText();
        if(draftRoot2.element("spouse_name") != null) spouseName = draftRoot2.element("spouse_name").getText();
        if(draftRoot2.element("thirdPartyTitle") != null) thirdPartyTitle = draftRoot2.element("thirdPartyTitle").getText();


        if(draftRoot3_2.element("loansSum") != null) loans = draftRoot3_2.element("loansSum").getText();
        if(draftRoot3_2.element("loanPrice") != null) loanPrice = draftRoot3_2.element("loanPrice").getText();
        if(draftRoot3_2.element("freedom_life") != null) freedomLife = draftRoot3_2.element("freedom_life").getText();
        if(draftRoot3_2.element("accordingToBill_life") != null) accordingToBillLife = draftRoot3_2.element("accordingToBill_life").getText();


        content.put("appoName",ProjUtils.toNameMark(appoName)); //申請人的名字
        content.put("familyStatusLevel1",familyStatusLevel1); //家庭狀況1
        content.put("familyStatusLevel2",familyStatusLevel2); //家庭狀況2
        content.put("fatherName",ProjUtils.toNameMark(fatherName)); //父親名字
        content.put("motherName",ProjUtils.toNameMark(motherName)); //母親名字
        content.put("thirdPartyName", ProjUtils.toNameMark(thirdPartyName)); //第三人名字
        content.put("spouseName", ProjUtils.toNameMark(spouseName)); //配偶名字
        content.put("loans",loans); //
        content.put("loanPrice",loanPrice);
        content.put("applicantAdult",applicantAdult); //成年與否
        content.put("marryStatus",marryStatus); //結婚與否

        content.put("thirdPartyTitleHidden",thirdPartyTitle);

        JSONObject freedom = new JSONObject();
        JSONObject accordingToBill = new JSONObject();

        freedom.put("life",freedomLife);
        accordingToBill.put("life",accordingToBillLife);

        content.put("freedom",freedom);
        content.put("accordingToBill",accordingToBill);


    }

    public static void validOTP(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {

        HttpSession session = queryStringInfo.getRequest().getSession();

        String codeInput = queryStringInfo.getParam("codeInput");

        //從session取得OTP驗證碼及驗證時間
        String otpCode = String.valueOf(session.getAttribute(ProjUtils.OTPCode));
        String otpTime = String.valueOf(session.getAttribute(ProjUtils.OTPTime));

        //取得檢核錯誤次數
        String otpErrorCount = String.valueOf(session.getAttribute(ProjUtils.OTPErrorCount));
        if(StringUtils.isEmpty(otpErrorCount) || "null".equalsIgnoreCase(otpErrorCount)) {
            otpErrorCount = "0";
        }

        String now = DateUtil.getTodayString();

        String errorMsg = "";
        int count = Integer.parseInt(otpErrorCount);
        if(Long.parseLong(now) > Long.parseLong(otpTime)) {
            count = 99;
            errorMsg = "本次交易可輸入交易驗證碼的時間已逾時，請重新操作！";
        }

        if(!codeInput.equalsIgnoreCase(otpCode)) {
            count++;
            if(count >=3) errorMsg = "檢核交易驗證碼錯誤超過上限，請重新操作";
            else errorMsg = "檢核交易驗證碼錯誤";

        }

        if(StringUtils.isNotEmpty(errorMsg)) {

            content.put("errorCount",count+"");

            session.setAttribute(ProjUtils.OTPErrorCount,(count + ""));
            throw new Exception(errorMsg);
        }

    }

    //半形轉全形
    public static String toChanisesFullChar(String s) {
        if(s==null || s.equals("")){
            return "";
        }

        s = s.toUpperCase();

        char[] ca = s.toCharArray();
        for(int i=0; i<ca.length; i++){
            if(ca[i] > '\200'){    continue;   }      //超過這個應該都是中文字了…
            if(ca[i] == 32){    ca[i] = (char)12288;        continue;                  }  //半型空白轉成全型空白
            if(Character.isLetterOrDigit(ca[i])){   ca[i] = (char)(ca[i] + 65248);  continue;  }  //是有定義的字、數字及符號

            ca[i] = (char)12288;  //其它不合要求的，全部轉成全型空白。
        }

        return String.valueOf(ca);
    }

    //加上千分位
    public static String toComma(String val) {
        NumberFormat nf = NumberFormat.getInstance();
        nf.setGroupingUsed(true);

        try{
            return nf.format(Double.parseDouble(val));
        }catch(Exception e) {
            e.printStackTrace();

            return val;
        }
    }


    //已撥款紀錄的婚姻狀態轉碼
    public static String toMarryName(String marriage) {
        if(StringUtils.isEmpty(marriage)) return "";
        else if("1".equalsIgnoreCase(marriage) || "2".equalsIgnoreCase(marriage) || "3".equalsIgnoreCase(marriage)) return "Y";
        else return "N";
    }

    //新平台的婚姻狀態
    //1:已婚、2:未婚
    public static String toMarryNewName(String marriage) {
        if("0".equalsIgnoreCase(marriage)) return "未婚";
        else if("1".equalsIgnoreCase(marriage)) return "已婚";
        else if("2".equalsIgnoreCase(marriage)) return "喪偶";
        else if("3".equalsIgnoreCase(marriage)) return "離婚";
        return marriage;
    }


    /**
     * 是否非本國人ID
     * @param uid
     */

    private static boolean isForeignId(String uid) {
        return uid.matches("^([a-zA-Z]{2}[0-9]{8})|([0-9]{8}[a-zA-Z]{2})$");
    }

    /**
     * 將八碼日期切成西元年、月、日
     * 程式命名原則取自舊程式
     */
    public static String[] getDateList(String date8) {
        String[] result = new String[]{"","",""};

        if(StringUtils.isNotEmpty(date8) && date8.length() == 8) {
            result[0] = date8.substring(0,4);
            result[1] = date8.substring(4,6);
            result[2] = date8.substring(6,8);
        }

        return result;
    }

    //取自舊平台程式，將金額轉成國字
    public static String getChineseAmtString(String amt, int len, String sep, String className) {
        StringBuffer sb = new StringBuffer();

        char[] chineseAmtArray = {'仟','佰','拾','兆','仟','佰','拾','億','仟','佰','拾','萬','仟','佰','拾','元'};
        char[] chineseNumArray = {'零','壹','貳','參','肆','伍','陸','柒','捌','玖'};
        char emptyChar = '　';

        amt = (amt == null) ? "" : amt.trim();
        len = Math.max(len, amt.length());
        if (len > chineseAmtArray.length)  return "轉換金額長度過長，無法轉換！";
        if (sep == null)  sep = "";
        String preClass = (className != null && !className.equals("")) ? "<span class=\"" + className + "\">" : "";
        String postClass = (className != null && !className.equals("")) ? "</span>" : "";

        try {
            char[] c = new char[len];
            Arrays.fill(c, emptyChar);

            if (!amt.equals("")) {
                int x = len - amt.length();
                for (int i = 0; i < amt.length(); i++) {
                    c[x++] = chineseNumArray[Integer.parseInt(amt.substring(i, i+1))];
                }
            }

            int idx = chineseAmtArray.length - len;

            if (!amt.equals("") && len > amt.length())  sb.append("<S>");
            for (int i = 0; i < len; i++) {
                if (c[i] != emptyChar && !amt.equals(""))  sb.append("</S>");
                sb.append(sep).append(preClass).append(c[i]).append(postClass).append(sep).append(chineseAmtArray[idx++]);
            }

        } catch (Exception e) {
            e.printStackTrace();
            sb.setLength(0);
            sb.append("不明金額");
        }

        return sb.toString();
    }

    // 父母親現況說明
    public static String getParentStatusDesc(String parentStatus) {
        String desc = null;
        if (parentStatus != null && !parentStatus.equals("")) {
            if (parentStatus.equals("1")) {
                desc = "存";
            } else if (parentStatus.equals("2")) {
                desc = "歿";
            } else if (parentStatus.equals("3")) {
                desc = "離異";
            } else {
                desc = parentStatus;
            }
        } else {
            desc = "";
        }
        return desc;
    }

    //取得申請結果提醒訊息(程式碼取自舊平台)
    public static ArrayList getApplyResultAlertMsg(DataObject aplyMemberCase) {
        ArrayList list = new ArrayList();

        try {
            String signBill = aplyMemberCase.getValue("SIGNBILL");

            list.add("<b style=\"font-size: 16px\">自行列印註冊繳費單據正本及影本（或其他經學校簽章填註可貸金額之證明文件）。</b>");
            list.add("申請人<span class=\"cfm-text\">" + aplyMemberCase.getValue("APPLICANT") + "</span>之國民身分證及印章。");

            if (signBill.equals("Y")) {
                StringBuffer sb = new StringBuffer();

                String marriage = aplyMemberCase.getValue("MARRIAGE");
                boolean isGetMarriaged = marriage.equals("1");
                int age = Integer.parseInt(DateUtil.getTodayString().substring(0,8)) - Integer.parseInt(aplyMemberCase.getValue("APLYBIRTHDAY"));
                boolean isAdult = (age >= 200000) ? true : false;

                HashMap relMap = new HashMap();
                relMap.put("fa", new String[]{"父親", "<span class=\"cfm-text\">" + aplyMemberCase.getValue("FA_NAME") + "</span>"});
                relMap.put("ma", new String[]{"母親", "<span class=\"cfm-text\">" + aplyMemberCase.getValue("MA_NAME") + "</span>"});
                relMap.put("gd1", new String[]{"監護人一", "<span class=\"cfm-text\">" + aplyMemberCase.getValue("GD1_NAME") + "</span>"});
                relMap.put("gd2", new String[]{"監護人二", "<span class=\"cfm-text\">" + aplyMemberCase.getValue("GD2_NAME") + "</span>"});
                relMap.put("pa", new String[]{"配偶", "<span class=\"cfm-text\">" + aplyMemberCase.getValue("PA_NAME") + "</span>"});
                relMap.put("war", new String[]{"保證人", "<span class=\"cfm-text\">" + aplyMemberCase.getValue("WAR_NAME") + "</span>"});

                String faStatus = aplyMemberCase.getValue("FA_STATUS");
                String maStatus = aplyMemberCase.getValue("MA_STATUS");

                boolean faAsGuar = false;
                boolean maAsGuar = false;
                boolean gd1AsGuar = false;
                boolean gd2AsGuar = false;
                boolean paAsGuar = false;
                boolean warAsGuar = false;

                // 法定代理人兼連帶保證人一~三
                for (int i = 1; i <= 3; i++) {
                    String resRel = aplyMemberCase.getValue("RES" + i + "_REL");
                    String[] rel = (String[]) relMap.get(resRel);
                    if (rel != null) {
                        sb.append(rel[0]).append(rel[1]).append("、");
                        if (resRel.equals("fa")) faAsGuar = true;
                        else if (resRel.equals("ma")) maAsGuar = true;
                        else if (resRel.equals("gd1")) gd1AsGuar = true;
                        else if (resRel.equals("gd2")) gd2AsGuar = true;
                    }
                }

                // 其他連帶保證人
                String warRel = aplyMemberCase.getValue("WAR_REL");
                if (!warRel.equals("") && !warRel.equals("1A")) {
                    String[] rel = (String[]) relMap.get("war");
                    sb.append(rel[0]).append(rel[1]).append("、");
                    warAsGuar = true;
                } else if (warRel.equals("1A")) {
                    String[] rel = (String[]) relMap.get("pa");
                    sb.append(rel[0]).append(rel[1]).append("、");
                    paAsGuar = true;
                }
                if (sb.length() > 0) sb.setLength(sb.length() - 1);
                sb.append("之國民身分證及印章。");
                list.add(sb.toString());

                // 若未婚者，不論父母現況及是否擔任保證人，只要有填資料的就提示攜帶戶籍謄本
                if (marriage.equals("0")) {
                    if (!"".equals(aplyMemberCase.getValue("FA_IDNO")))  faAsGuar = true;
                    if (!"".equals(aplyMemberCase.getValue("MA_IDNO")))  maAsGuar = true;
                }

                // 戶籍謄本
                sb.setLength(0);
                sb.append("戶籍謄本【距對保日前三個月內之戶籍謄本(記事欄需詳載)，包含申請人");
                if (faAsGuar && maAsGuar) sb.append("、父母");
                else if (faAsGuar) sb.append("、父親");
                else if (maAsGuar) sb.append("、母親");
                if (marriage.equals("1")) sb.append("、配偶");
                if (gd1AsGuar) sb.append("、監護人一");
                if (gd2AsGuar) sb.append("、監護人二");
                if (warAsGuar) sb.append("、連帶保證人");
                sb.append("，如戶籍不同者，需分別檢附】。");
                list.add(sb.toString());

                // 保證人之扣繳憑單、財力證明或在職證明
                if (!warRel.equals("") && !warRel.equals("1A")) {
                    sb.setLength(0);
                    sb.append("保證人").append("<span class=\"cfm-text\">").append(aplyMemberCase.getValue("WAR_NAME")).append("</span>").append("之扣繳憑單、財力證明或在職證明。");
                    list.add(sb.toString());
                }

                // 無法行使親權證明
                String unResRel = aplyMemberCase.getValue("UNRESREL");
                String unResReason = aplyMemberCase.getValue("UNRESREASON");
                if (!unResRel.equals("") && !unResReason.equals("")) {
                    sb.setLength(0);
                    String[] rel = (String[]) relMap.get(unResRel);
                    if (unResReason.equals("1")) {  // 失蹤
                        sb.append(rel[0]).append(rel[1]).append("之警察機關報案「受(處)理查尋人口案件登記表」或戶籍謄本登載失蹤。");
                    } else if (unResReason.equals("2")) {  // 重病或精神錯亂
                        sb.append(rel[0]).append(rel[1]).append("之合格醫院最近六個月內所核發重病或精神錯亂之證明文件。");
                    } else if (unResReason.equals("3")) {  // 在監服刑
                        sb.append(rel[0]).append(rel[1]).append("之在監服刑執行證明文件。");
                    } else if (unResReason.equals("4")) {  // 家庭暴力
                        sb.append("法院所核發有效之通常保護令(未指定暫時監護權項目)或各地方政府出具之受暴證明。");
                    }
                    if (sb.length() > 0)  list.add(sb.toString());
                }

                // 未婚且父母親狀態為歿，帶出除戶謄本或死亡證明
                if (marriage.equals("0") && (faStatus.equals("2") || maStatus.equals("2"))) {
                    sb.setLength(0);
                    if (faStatus.equals("2")) {
                        String[] rel = (String[]) relMap.get("fa");
                        sb.append(rel[0]).append(rel[1]).append("、");
                    }
                    if (maStatus.equals("2")) {
                        String[] rel = (String[]) relMap.get("ma");
                        sb.append(rel[0]).append(rel[1]).append("、");
                    }
                    sb.setLength(sb.length() - 1);
                    sb.append("之除戶謄本或死亡證明。");
                    list.add(sb.toString());
                }

                // 喪偶，，帶出除戶謄本或死亡證明
                if (marriage.equals("2")) {
                    sb.setLength(0);
                    String[] rel = (String[]) relMap.get("pa");
                    sb.append(rel[0]).append(rel[1]).append("之除戶謄本或死亡證明。");
                    list.add(sb.toString());
                }
            }

            // 低收入戶證明
            try {
                String renderAmt_living = aplyMemberCase.getValue("RENDERAMT_LIVING");
                if (!renderAmt_living.equals("") && Integer.parseInt(renderAmt_living) > 0) {
                    list.add("政府機關出具之低收入戶證明。");
                }
            } catch (Exception e) {}

            // 學校住宿費用之證明文件
            try {
                String renderAmt_lodging = aplyMemberCase.getValue("RENDERAMT_LODGING");
                if (!renderAmt_lodging.equals("") && Integer.parseInt(renderAmt_lodging) > 0) {
                    list.add("學校住宿費用之證明文件。");
                }
            } catch (Exception e) {}

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }

    // 取得預計對保時間說明(程式取自舊程式修改撈抓db的地方)
    public static String getExpectTimeMemo(IDao dao,String branchId, String time) {
        StringBuffer sb = new StringBuffer();

        try {

            Map<String,String> searchMap = new LinkedHashMap<String, String>();
            searchMap.put("b.BranchId",branchId); //就貸組預設的分行代號
            Vector<DataObject> ret = ProjUtils.getBranch(searchMap, DaoFactory.getDefaultDao());

            if(ret.size() != 0) {
                String branchName = ret.get(0).getValue("branchName");
                return branchName + " " + ((time.compareTo("1200") < 0) ? "上午" : "下午") + time;
            }


        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            if (sb.length() == 0) {
                sb.append(time);
            }
        }

        return sb.toString();
    }

    public static String toSchoolName(IDao dao ,String schoolCode) throws Exception {
        SQLCommand query = new SQLCommand("select top(1)* from SchoolInfo where SchoolCode = ?");
        query.addParamValue(schoolCode);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);
        if(ret.size() != 0) {
            return ret.get(0).getValue("SchoolName");
        }
        else return schoolCode;
    }

    //讀取HtmlContent
    public static DataObject getHtmlContent(IDao dao,String htmlId) throws Exception {

        DataObject htmlContent = DaoFactory.getDefaultDataObject("HtmlContent");
        if(htmlContent != null && StringUtils.isNotEmpty(htmlId)) {
            htmlContent.setValue("HtmlId",htmlId);
            if(dao.querySingle(htmlContent,null)) {
                return htmlContent;
            }
        }

        return null;
    }

    //判斷是否已成年(yyyyMMdd)
    public static boolean isAdult(String birthday) {

        //取得今天14碼
        String now = DateUtil.getTodayString();

        //今天減掉20年後再比較數字，看生日是否比較小
        String b = DateUtil.addDate(now,Calendar.YEAR,-20);

        GardenLog.log(GardenLog.DEBUG,"now = " + b.substring(0,8) + ",birthday = " + birthday);

        return Double.parseDouble(b.substring(0,8)) > Double.parseDouble(birthday);
    }


    public static void saveLog(IDao dao,HttpServletRequest request,String className,String actionName,String result)  {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(request.getSession());

        String ip = JSPUtils.getClientIP(request);
        String custID = loginUserBean != null ? loginUserBean.getUserId() : "";
        String userId = loginUserBean != null ? loginUserBean.getCustomizeValue("UserId") : "";
        String sessionId = request.getSession().getId();

        saveLog(dao,ip,custID,userId,className,actionName,result,sessionId);
    }

    public static void saveLog(IDao dao,String ip,String custID,String userId,String className,String actionName,String result,String sessionId)  {

        try{


            String txDate = DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString());
            String serverName = java.net.InetAddress.getLocalHost().getHostName();


            DataObject log = DaoFactory.getDefaultDataObject("BasicSrv_EJLog");

            log.setValue("IP",ip);
            log.setValue("CustID",custID);
            log.setValue("UserId",userId);
            log.setValue("TxClass",className);
            log.setValue("ActionName",actionName);
            log.setValue("TxDate",txDate);
            log.setValue("Result",result);
            log.setValue("Parameters","");
            log.setValue("ServerName",serverName);
            log.setValue("SessionId",sessionId);

            dao.insert(log);

        }catch(Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 取得輸入字串中的難字(取自舊平台程式)
     *
     * @param strValue
     * @param msgKey
     * @return
     */
    public static String checkInvalidChars(String strValue, String charset) throws Exception {
        StringBuffer invalidChar = new StringBuffer();
        if (StringUtils.isBlank(strValue)) {
            return "";
        }
        try {
            String output = new String(strValue.getBytes(charset), charset);
            byte[] utf32Bytes = strValue.getBytes("UTF-32");
            if (!StringUtils.equals(strValue, output)) {
                // 找出不相等的字元
                for (int i = 0; i < utf32Bytes.length / 4; i++) {
                    try {
                        String tmpStr = new String(utf32Bytes, i * 4, 4, "UTF-32");
                        if (!StringUtils.equals(tmpStr, StringUtils.mid(output, i, 1))) {
                            invalidChar.append(tmpStr);
                        }
                    }
                    catch (Exception e) {
                        // 因為有可能發生轉換成 Big5 後字串長度較短, 所以在此 catch exception 並終止迴圈
                        break;
                    }
                }
            }
        }
        catch (Exception e) {
            // will not happend
        }
        return invalidChar.toString();
    }

    public static String getAddr() {
        String addr = "UNKNOW";
        try{
            addr = Inet4Address.getLocalHost().getHostName();
            addr = StringUtils.right(addr,3);
        }catch(Exception e) {
            e.printStackTrace();
        }
        return addr;
    }
}


