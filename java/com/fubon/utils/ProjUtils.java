package com.fubon.utils;

import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.flow.impl.*;
import com.fubon.utils.bean.OTPBean;
import com.fubon.utils.bean.SMSBean;
import com.neux.utility.orm.bean.DataColumn;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.QueryConfig;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
        System.out.println(toTelMark("6632111"));
    }


    //戶籍電話遮蔽：第4~8碼
    public static String toTelMark(String tel) {
        if(StringUtils.isEmpty(tel) || tel.length() < 4) return tel;

        String before = tel.substring(0,3);

        String tmp = before;
        int lastIndex = 0;
        for(int i=0;i<5;i++) {
            System.out.println(i);
            if((i+3) > tel.length()) {
                break;
            }

            tmp += MARKSPACE;

            System.out.println(tmp);

            lastIndex = i+4;
        }

        if(lastIndex < tel.length()) {
            tmp = tmp + tel.substring(lastIndex);
        }

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

        GardenLog.log(GardenLog.DEBUG, "ProjUtils:getLoginBean=" + loginUserBean);


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
    public static String saveAplyMemberTuitionLoanDtl(JSPQueryStringInfo queryStringInfo ,IDao dao,Element apply1_1Root,Element apply1_2Root,Element apply2Root,Element apply3_1Root,Element apply3_2Root,Element applyOnline4Root,String aplyCaseType) throws Exception {

        String errorMsg = null;

        try{
            HttpServletRequest req = queryStringInfo.getRequest();

            String today = DateUtil.getTodayString();
            String applyDate = today.substring(0,8);// 申請日期
            String applyTime = today.substring(8,14);// 申請時間
            String applyNo = ProjUtils.forTuitionLoanAplyNo(applyDate);
            String ip = JSPUtils.getClientIP(req);

            DataObject aplyMemberDataObject = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl");

            //取得當下學期
            HashMap<String,String> eduYearInfo = ProjUtils.getEduYearInfo(dao,null);

            //取當下學年跟學期
            String eduYear = eduYearInfo.get("eduYear");
            String semester = eduYearInfo.get("semester");

            //先判斷是否已有申請過案件
            String id = apply1_1Root.element("id").getText().toUpperCase();

            SQLCommand check = new SQLCommand("select AplyNo from AplyMemberTuitionLoanDtl where AplyIdNo = ? and eduYear = ? and semester = ?");
            check.addParamValue(id);
            check.addParamValue(eduYear);
            check.addParamValue(semester);

            Vector<DataObject> checkResult = new Vector<DataObject>();
            dao.queryByCommand(checkResult,check,null,null);

            if(checkResult.size() != 0) {
                errorMsg = "您本學期已申請過案件";
                return errorMsg;
            }

            //如果無申請過才往下申請
            else {


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

                aplyMemberDataObject.setValue("AplyNo",  applyNo);// 申請編號
                aplyMemberDataObject.setValue("AplyWay", "IB"); // 申請途徑
                aplyMemberDataObject.setValue("AplyDate",  applyDate); // 申請日期
                aplyMemberDataObject.setValue("AplyTime",  applyTime); // 申請時間
                aplyMemberDataObject.setValue("IP",  ip);   // 資料更新IP
                aplyMemberDataObject.setValue("AplyIdNo", id);  // 申請人身分證字號
                aplyMemberDataObject.setValue("AplyBirthday", toYYYYBirthday(apply1_1Root.element("birthday").getText()));  // 申請人出生年月日
                aplyMemberDataObject.setValue("Applicant", apply1_1Root.element("name").getText());// 申請人姓名
                aplyMemberDataObject.setValue("Marriage", "Y".equalsIgnoreCase(apply1_1Root.element("marryStatus").getText()) ? "1" : "0");// 婚姻狀況
                aplyMemberDataObject.setValue("AplyTelNo1_1", apply1_1Root.element("DomicileArea").getText()); // 申請人戶籍電話區碼
                aplyMemberDataObject.setValue("AplyTelNo1_2", apply1_1Root.element("DomicilePhone").getText());                           // 申請人戶籍電話
                aplyMemberDataObject.setValue("AplyTelNo1_3", "");                           // 申請人戶籍電話分機號碼
                aplyMemberDataObject.setValue("AplyTelNo2_1", apply1_1Root.element("areaTelephone").getText());                           // 申請人通訊電話區碼
                aplyMemberDataObject.setValue("AplyTelNo2_2", apply1_1Root.element("telephone").getText());                           // 申請人通訊電話
                aplyMemberDataObject.setValue("AplyTelNo2_3", "");                           // 申請人通訊電話分機號碼
                aplyMemberDataObject.setValue("AplyCellPhoneNo", apply1_1Root.element("cellPhone").getText());                     // 申請人手機號碼
                aplyMemberDataObject.setValue("AplyEmail", apply1_1Root.element("email").getText());                                 // 申請人 E-Mail
                aplyMemberDataObject.setValue("AplyZip1", apply1_1Root.element("domicileZipCode").getText());  // 申請人戶籍地址郵遞區號
                aplyMemberDataObject.setValue("Aply1Village", apply1_1Root.element("domicileLiner").getText());  // 申請人戶籍地址-村里
                aplyMemberDataObject.setValue("AplyAddr1_3", apply1_1Root.element("DomicileNeighborhood").getText()); // 申請人戶籍地址-鄰
                aplyMemberDataObject.setValue("AplyAddr1",apply1_1Root.element("DomicileAddress").getText()); // 申請人戶籍地址-完整

                aplyMemberDataObject.setValue("AplyZip2", apply1_1Root.element("zipCode").getText());                         // 申請人寄送地址郵遞區號
//            aplyMemberDataObject.setValue("Aply2Village", apply1_1Root.element("liner").getText());                             // 申請人寄送地址-村里
//            aplyMemberDataObject.setValue("AplyAddr2_3", apply1_1Root.element("neighborhood").getText());                             // 申請人寄送地址-鄰名
                aplyMemberDataObject.setValue("AplyAddr2", apply1_1Root.element("address").getText());                             // 申請人寄送地址-完整

                if(isFaGuarantor) {

                    String faBirthday = ProjUtils.toDraftBirthday(apply2Root.element("father_birthday0").getText(),apply2Root.element("father_birthday2").getText(),apply2Root.element("father_birthday4").getText());

                    aplyMemberDataObject.setValue("Fa_Status", "");                           // 父親-現況
                    aplyMemberDataObject.setValue("Fa_Name", apply2Root.element("father_name") != null ? apply2Root.element("father_name").getText() : "");     // 父親-姓名
                    aplyMemberDataObject.setValue("Fa_FrgnFlag", "N");                           // 父親-外籍人士註記
                    aplyMemberDataObject.setValue("Fa_IdNo", apply2Root.element("father_id") != null ? apply2Root.element("father_id").getText().toUpperCase() : "");                               // 父親-身分證字號
                    aplyMemberDataObject.setValue("Fa_Birthday", toYYYYBirthday(faBirthday));                       // 父親-出生年月日
                    aplyMemberDataObject.setValue("Fa_TelNo1", apply2Root.element("father_regionCode") != null ? apply2Root.element("father_regionCode").getText() : "");                         // 父親-聯絡電話區碼
                    aplyMemberDataObject.setValue("Fa_TelNo2", apply2Root.element("father_phone") != null ? apply2Root.element("father_phone").getText() : "");                         // 父親-聯絡電話
                    aplyMemberDataObject.setValue("Fa_TelNo3", "");                         // 父親-聯絡電話分機號碼
                    aplyMemberDataObject.setValue("Fa_CellPhoneNo", apply2Root.element("father_mobile") != null ? apply2Root.element("father_mobile").getText() : "");                 // 父親-手機號碼
                    aplyMemberDataObject.setValue("Fa_Zip", "請選擇".equals(apply2Root.element("father_zipCode_domi").getText()) ? "" : apply2Root.element("father_zipCode_domi").getText()); // 父親-戶籍地址郵遞區號
                    aplyMemberDataObject.setValue("Fa_Addr_1", apply2Root.element("father_linerName_domi") != null ? apply2Root.element("father_linerName_domi").getText() : "");                           // 父親戶籍地址-村里名
                    aplyMemberDataObject.setValue("FaVillage", apply2Root.element("father_liner_domi") != null ? apply2Root.element("father_liner_domi").getText() : "");                           // 父親戶籍地址-村里
                    aplyMemberDataObject.setValue("Fa_Addr_3", apply2Root.element("father_neighborhood_domi") != null ? apply2Root.element("father_neighborhood_domi").getText() : "");                           // 父親戶籍地址-鄰名
                    aplyMemberDataObject.setValue("FaAddr", apply2Root.element("father_address_domi") != null ? apply2Root.element("father_address_domi").getText() : "");                           // 父親戶籍地址-完整
                }


                if(isMaGuarantor) {
                    String maBirthday = ProjUtils.toDraftBirthday(apply2Root.element("mother_birthday0").getText(),apply2Root.element("mother_birthday2").getText(),apply2Root.element("mother_birthday4").getText());

                    aplyMemberDataObject.setValue("Ma_Status", "");                           // 母親-現況
                    aplyMemberDataObject.setValue("Ma_Name", apply2Root.element("mother_name") != null ? apply2Root.element("mother_name").getText() : "");                               // 母親-姓名
                    aplyMemberDataObject.setValue("Ma_FrgnFlag", "N");                           // 母親-外籍人士註記
                    aplyMemberDataObject.setValue("Ma_IdNo", apply2Root.element("mother_id") != null ? apply2Root.element("mother_id").getText().toUpperCase() : "");                               // 母親-身分證字號
                    aplyMemberDataObject.setValue("Ma_Birthday", toYYYYBirthday(maBirthday));                       // 母親-出生年月日
                    aplyMemberDataObject.setValue("Ma_TelNo1", apply2Root.element("mother_regionCode") != null ? apply2Root.element("mother_regionCode").getText() : "");                         // 母親-聯絡電話區碼
                    aplyMemberDataObject.setValue("Ma_TelNo2", apply2Root.element("mother_phone") != null ? apply2Root.element("mother_phone").getText() : "");                         // 母親-聯絡電話
                    aplyMemberDataObject.setValue("Ma_TelNo3", "");                         // 母親-聯絡電話分機號碼
                    aplyMemberDataObject.setValue("Ma_CellPhoneNo", apply2Root.element("mother_mobile") != null ? apply2Root.element("mother_mobile").getText() : "");                 // 母親-手機號碼
                    aplyMemberDataObject.setValue("Ma_Zip", "請選擇".equals(apply2Root.element("mother_zipCode_domi").getText()) ? "" : apply2Root.element("mother_zipCode_domi").getText());                       // 母親-戶籍地址郵遞區號
                    aplyMemberDataObject.setValue("Ma_Addr_1", apply2Root.element("mother_linerName_domi") != null ? apply2Root.element("mother_linerName_domi").getText() : "");                           // 母親戶籍地址-村里名
                    aplyMemberDataObject.setValue("MaVillage", apply2Root.element("mother_liner_domi") != null ? apply2Root.element("mother_liner_domi").getText() : "");                           // 母親戶籍地址-村里
                    aplyMemberDataObject.setValue("Ma_Addr_3", apply2Root.element("mother_neighborhood_domi") != null ? apply2Root.element("mother_neighborhood_domi").getText() : "");                           // 母親戶籍地址-鄰名
                    aplyMemberDataObject.setValue("MaAddr", apply2Root.element("mother_address_domi") != null ? apply2Root.element("mother_address_domi").getText() : "");                           // 母親戶籍地址-完整
                }


                if(isGdGuarantor) {
                    String gdBirthday = ProjUtils.toDraftBirthday(apply2Root.element("thirdParty_birthday0").getText(),apply2Root.element("thirdParty_birthday2").getText(),apply2Root.element("thirdParty_birthday4").getText());

                    aplyMemberDataObject.setValue("Gd1_Rel", "");                           // 監護人-現況
                    aplyMemberDataObject.setValue("Gd1_Name", apply2Root.element("thirdParty_name") != null ? apply2Root.element("thirdParty_name").getText() : "");                               // 監護人-姓名
                    aplyMemberDataObject.setValue("Gd1_FrgnFlag", "N");                           // 監護人-外籍人士註記
                    aplyMemberDataObject.setValue("Gd1_IdNo", apply2Root.element("thirdParty_id") != null ? apply2Root.element("thirdParty_id").getText().toUpperCase() : "");                               // 監護人-身分證字號
                    aplyMemberDataObject.setValue("Gd1_Birthday", toYYYYBirthday(gdBirthday));                       // 監護人-出生年月日
                    aplyMemberDataObject.setValue("Gd1_TelNo1", apply2Root.element("thirdParty_regionCode") != null ? apply2Root.element("thirdParty_regionCode").getText() : "");                         // 監護人-聯絡電話區碼
                    aplyMemberDataObject.setValue("Gd1_TelNo2", apply2Root.element("thirdParty_phone") != null ? apply2Root.element("thirdParty_phone").getText() : "");                         // 監護人-聯絡電話
                    aplyMemberDataObject.setValue("Gd1_TelNo3", "");                         // 監護人-聯絡電話分機號碼
                    aplyMemberDataObject.setValue("Gd1_CellPhoneNo", apply2Root.element("thirdParty_mobile") != null ? apply2Root.element("thirdParty_mobile").getText() : "");                 // 監護人-手機號碼
                    aplyMemberDataObject.setValue("Gd1_Zip", "請選擇".equals(apply2Root.element("thirdParty_zipCode_domi").getText()) ? "" : apply2Root.element("thirdParty_zipCode_domi").getText()); // 監護人-戶籍地址郵遞區號
                    aplyMemberDataObject.setValue("Gd1_Addr_1", apply2Root.element("thirdParty_linerName_domi") != null ? apply2Root.element("thirdParty_linerName_domi").getText() : "");                           // 監護人戶籍地址-村里名
                    aplyMemberDataObject.setValue("Gd1Village", apply2Root.element("thirdParty_liner_domi") != null ? apply2Root.element("thirdParty_liner_domi").getText() : "");                           // 監護人戶籍地址-村里
                    aplyMemberDataObject.setValue("Gd1_Addr_3", apply2Root.element("thirdParty_neighborhood_domi") != null ? apply2Root.element("thirdParty_neighborhood_domi").getText() : "");                           // 監護人戶籍地址-鄰名
                    aplyMemberDataObject.setValue("Gd1Addr", apply2Root.element("thirdParty_address_domi") != null ? apply2Root.element("thirdParty_address_domi").getText() : "");                           // 監護人戶籍地址-完整

                }

                if(isPaGuarantor) {
                    String paBirthday = ProjUtils.toDraftBirthday(apply2Root.element("spouse_birthday0").getText(),apply2Root.element("spouse_birthday2").getText(),apply2Root.element("spouse_birthday4").getText());

                    aplyMemberDataObject.setValue("Pa_Name", apply2Root.element("spouse_name") != null ? apply2Root.element("spouse_name").getText() : "");                               // 配偶-姓名
                    aplyMemberDataObject.setValue("Pa_FrgnFlag", isPaIncome ? "N" : "");                           // 配偶-外籍人士註記
                    aplyMemberDataObject.setValue("Pa_IdNo", apply2Root.element("spouse_id") != null ? apply2Root.element("spouse_id").getText().toUpperCase() : "");                               // 配偶-身分證字號
                    aplyMemberDataObject.setValue("Pa_Birthday", toYYYYBirthday(paBirthday));                       // 配偶-出生年月日
                    aplyMemberDataObject.setValue("Pa_TelNo1", apply2Root.element("spouse_regionCode") != null ? apply2Root.element("spouse_regionCode").getText() : "");                         // 配偶-聯絡電話區碼
                    aplyMemberDataObject.setValue("Pa_TelNo2", apply2Root.element("spouse_phone") != null ? apply2Root.element("spouse_phone").getText() : "");                         // 配偶-聯絡電話
                    aplyMemberDataObject.setValue("Pa_TelNo3", "");                         // 配偶-聯絡電話分機號碼
                    aplyMemberDataObject.setValue("Pa_CellPhoneNo", apply2Root.element("spouse_mobile") != null ? apply2Root.element("spouse_mobile").getText() : "");                 // 配偶-手機號碼
                    aplyMemberDataObject.setValue("Pa_Zip", apply2Root.element("spouse_zipCode_domi") != null ? apply2Root.element("spouse_zipCode_domi").getText() : "");                       // 配偶-戶籍地址郵遞區號
                    aplyMemberDataObject.setValue("Pa_Addr_1", apply2Root.element("spouse_linerName_domi") != null ? apply2Root.element("spouse_linerName_domi").getText() : "");                           // 配偶戶籍地址-村里名
                    aplyMemberDataObject.setValue("PaVillage", apply2Root.element("spouse_liner_domi") != null ? apply2Root.element("spouse_liner_domi").getText() : "");                           // 配偶戶籍地址-村里
                    aplyMemberDataObject.setValue("Pa_Addr_3", apply2Root.element("spouse_neighborhood_domi").getText());                           // 配偶戶籍地址-鄰名
                    aplyMemberDataObject.setValue("PaAddr", apply2Root.element("spouse_address_domi") != null ? apply2Root.element("spouse_address_domi").getText() : "");                             // 配偶戶籍地址-完整

                }

                //連帶保證人
                int ResCount = 1;
                for(int i=0;i<isGuarantor.length();i++) {
                    String str = isGuarantor.substring(i,i+1);

                    //如果是連帶保證人，就看是父/母/監/第三
                    if("1".equalsIgnoreCase(str)) {
                        String resValue = "";

                        if(i == 0) resValue = "fa";
                        else if(i == 1) resValue = "ma";
                        else if(i == 2) resValue = "gd1";
                        else if(i == 3) resValue = "pa";


                        aplyMemberDataObject.setValue("Res" + ResCount + "_Rel",resValue);
                        ResCount++;
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
                aplyMemberDataObject.setValue("Gd2_IncomeAddOn",isGdIncome ? "Y" : "N");              // 監護人二是否為所得合計對象
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
                String scholarshipFlag = "0".equals(scholarship) ? "N" : "Y";
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

//            aplyMemberDataObject.setValue("signBill",  applyData.get("signBill"));                          // 是否需簽立借據
//            aplyMemberDataObject.setValue("sign_schoolCode",  applyData.get("signSchoolCode"));             // 總額度檔 - 學校代碼
//            aplyMemberDataObject.setValue("sign_loanAmt",  applyData.get("signLoanAmt"));                   // 總額度檔 - 總額度
//            aplyMemberDataObject.setValue("sign_eduStageCode",  applyData.get("signEduStageCode"));         // 總額度檔 - 教育階段
//            aplyMemberDataObject.setValue("sign_loanAcct",  applyData.get("signLoanAcct"));                 // 總額度檔 - 放款帳號
//            aplyMemberDataObject.setValue("sign_yearTerm",  applyData.get("signYearTerm"));                 // 總額度檔 - 學年度學期

                dao.insert(aplyMemberDataObject);
            }



        }catch(Exception e) {
            e.printStackTrace();

            errorMsg = e.getMessage();
        }

        return errorMsg;
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

        Document apply1_1Doc = DocumentHelper.parseText(apply1_1DraftXML);
        Document apply1_2Doc = DocumentHelper.parseText(apply1_2DraftXML);
        Document apply2Doc = DocumentHelper.parseText(apply2DraftXML);
        Document apply3_1Doc = DocumentHelper.parseText(apply3_1DraftXML);
        Document apply3_2Doc = DocumentHelper.parseText(apply3_2DraftXML);

        //抓1-1
        Apply1_1 apply1_1 = new Apply1_1();
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
            else errorMsg = "檢核交易驗證碼錯誤！";

        }

        if(StringUtils.isNotEmpty(errorMsg)) {

            content.put("errorCount",count+"");

            session.setAttribute(ProjUtils.OTPErrorCount,(count + ""));
            throw new Exception(errorMsg);
        }

    }
}