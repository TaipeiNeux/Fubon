package com.fubon.flow.impl;

import java.text.SimpleDateFormat;
import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;


/**
 * Created with IntelliJ IDEA. User: Titan Date: 2016/4/24 Time: 下午 4:27 To
 * change this template use File | Settings | File Templates.
 */
public class Apply3_1 implements ILogic {

    private boolean convertChinese = false;

    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo)
            throws Exception
    {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String educationStageCode = "", educationStage = "", department = "", onTheJob = "", studentId = "";

        String schoolIsNational = "", schoolCode = "", schoolName = "", schoolIsDay = "";
        String gradeClassGrade = "", gradeClassClass = "";
        String enterDateYear = "", enterDateMonth = "";
        String graduationDateYear = "", graduationDateMonth = "";
        String isRecord = ProjUtils.isPayHistory(userId, dao) ? "Y" : "N";
        String lastEnterDate = ""; // 上次入學日期
        //String familyStatus = "";
        String month_graduation_hidden = "", year_graduation_hidden = "";
        String department_hidden = "";
        String loanAmt = "";
        //String familyStatusLevel1="",familyStatusLevel2="";
        //String familycheck="";
//		String mother_RadioBtn="",father_RadioBtn="";
//		String marryStatus="";

//		String fathercheck = "";
//		String mothercheck = "";

        //String cFa_birthday = "", cMa_birthday = "", cThird_birthday = "";

//		String yearBirthday = "", monthBirthday = "", dayBirthday = "";
//		String Ma_yearBirthday = "", Ma_monthBirthday = "", Ma_dayBirthday = "";
//		String Third_yearBirthday = "", Third_monthBirthday = "", Third_dayBirthday = "";
//		String Fa_yearBirthday = "", Fa_monthBirthday = "", Fa_dayBirthday = "";
//		String spouse_yearBirthday = "", spouse_monthBirthday = "", spouse_dayBirthday = "";
//		String birthday = "";
//		String Fa_birthday = "";
//		String Ma_birthday = "";
//		String Third_birthday = "";
//		String spouse_birthday = "";

        // 如果有撥款紀錄就撈已撥款，如果沒有撥款紀錄就撈目前當學年度當學期的資料
        DataObject aplyMemberData = null;
        aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId, dao);
        if (aplyMemberData == null && ProjUtils.isPayHistory(userId, dao)) {
            aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId, dao);
        }

        //// 10/17 確認合計所得對象欄位沒填未阻擋
        //String apply1_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
//		String apply2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply2", dao);
        //String apply1_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_2", dao);
        //Document apply1_1Doc = apply1_1DraftXML != null && StringUtils.isNotEmpty(apply1_1DraftXML)
        //		? DocumentHelper.parseText(apply1_1DraftXML) : null;
        //Document apply1_2Doc = apply1_2DraftXML != null && StringUtils.isNotEmpty(apply1_2DraftXML)
        //	? DocumentHelper.parseText(apply1_2DraftXML) : null;
//		Document apply2Doc = apply2DraftXML != null && StringUtils.isNotEmpty(apply2DraftXML)
//				? DocumentHelper.parseText(apply2DraftXML) : null;
//		Element apply2Root = apply2Doc != null ? apply2Doc.getRootElement() : null;
        //Element apply1_2Root = apply1_2Doc != null ? apply1_2Doc.getRootElement() : null;
        //Element apply1_1Root = apply1_1Doc != null ? apply1_1Doc.getRootElement() : null;
//		if (apply1_1Root != null) {
//			if(apply1_1Root.element("marryStatus")!=null)
//			marryStatus=apply1_1Root.element("marryStatus").getText();
//			if(apply1_1Root.element("birthday0")!=null)
//			yearBirthday = apply1_1Root.element("birthday0").getText();
//			if(apply1_1Root.element("birthday2")!=null)
//			monthBirthday = apply1_1Root.element("birthday2").getText();
//			if(apply1_1Root.element("birthday4")!=null)
//			dayBirthday = apply1_1Root.element("birthday4").getText();
//			birthday = yearBirthday + monthBirthday + dayBirthday;
//			birthday = ProjUtils.toYYYYBirthday(birthday);
//
//		} else if (aplyMemberData != null) {
//			marryStatus = aplyMemberData.getValue("Marriage");
//			if(marryStatus.equals("0"))
//				marryStatus="N";
//			if(marryStatus.equals("1"))
//				marryStatus="Y";
//			birthday = aplyMemberData.getValue("AplyBirthday");
//		}

        //boolean isAdult = ProjUtils.isAdult(birthday);
//		if (apply2Root != null) {
////			if (apply2Root.element("father_checkbox") != null)
////			fathercheck = apply2Root.element("father_checkbox").getText().toString().equals("1") ? "1":"0";
////			if (apply2Root.element("mother_checkbox") != null)
////			mothercheck = apply2Root.element("mother_checkbox").getText().toString().equals("1") ? "1":"0";
//			
////			if (apply2Root.element("mother_RadioBtn") != null)
////				mother_RadioBtn = apply2Root.element("mother_RadioBtn").getText().toString();
////			if (apply2Root.element("father_RadioBtn") != null)
////				father_RadioBtn = apply2Root.element("father_RadioBtn").getText().toString();
//			if (apply2Root.element("father_birthday0") != null)
//				Fa_yearBirthday = apply2Root.element("father_birthday0").getText();
//			if (apply2Root.element("father_birthday2") != null)
//				Fa_monthBirthday = apply2Root.element("father_birthday2").getText();
//			if (apply2Root.element("father_birthday4") != null)
//				Fa_dayBirthday = apply2Root.element("father_birthday4").getText();
//			if (apply2Root.element("mother_birthday0") != null)
//				Ma_yearBirthday = apply2Root.element("mother_birthday0").getText();
//			if (apply2Root.element("mother_birthday2") != null)
//				Ma_monthBirthday = apply2Root.element("mother_birthday2").getText();
//			if (apply2Root.element("mother_birthday4") != null)
//				Ma_dayBirthday = apply2Root.element("mother_birthday4").getText();
//			if (apply2Root.element("thirdParty_birthday0") != null)
//				Third_yearBirthday = apply2Root.element("thirdParty_birthday0").getText();
//			if (apply2Root.element("thirdParty_birthday2") != null)
//				Third_monthBirthday = apply2Root.element("thirdParty_birthday2").getText();
//			if (apply2Root.element("thirdParty_birthday4") != null)
//				Third_dayBirthday = apply2Root.element("thirdParty_birthday4").getText();
//			
//			if (apply2Root.element("spouse_birthday0") != null)
//				spouse_yearBirthday = apply2Root.element("spouse_birthday0").getText();
//			if (apply2Root.element("spouse_birthday2") != null)
//				spouse_monthBirthday = apply2Root.element("spouse_birthday2").getText();
//			if (apply2Root.element("spouse_birthday4") != null)
//				spouse_dayBirthday = apply2Root.element("spouse_birthday4").getText();
//			
////			if(Fa_yearBirthday.length()==2)
////				Fa_yearBirthday="0"+Fa_yearBirthday;
////			if(Ma_yearBirthday.length()==2)
////				Ma_yearBirthday="0"+Ma_yearBirthday;
////			if(Third_yearBirthday.length()==2)
////				Third_yearBirthday="0"+Third_yearBirthday;
////			if(spouse_yearBirthday.length()==2)
////				spouse_yearBirthday="0"+spouse_yearBirthday;
////			
////			Fa_birthday = Fa_yearBirthday + Fa_monthBirthday + Fa_dayBirthday;
////			Ma_birthday = Ma_yearBirthday + Ma_monthBirthday + Ma_dayBirthday;
////			Third_birthday = Third_yearBirthday + Third_monthBirthday + Third_dayBirthday;
////			spouse_birthday = spouse_yearBirthday + spouse_monthBirthday + spouse_dayBirthday;
////			Fa_birthday = ProjUtils.toYYYYBirthday(Fa_birthday);
////			// cFa_birthday=Fa_birthday.substring(0,4)+"-"+Fa_birthday.substring(4,6)+"-"+Fa_birthday.substring(6,8);
////			Ma_birthday = ProjUtils.toYYYYBirthday(Ma_birthday);
////			Third_birthday = ProjUtils.toYYYYBirthday(Third_birthday);
////			spouse_birthday = ProjUtils.toYYYYBirthday(spouse_birthday);
//			// cMa_birthday=Ma_birthday.substring(0,4)+"-"+Ma_birthday.substring(4,6)+"-"+Ma_birthday.substring(6,8);
//
//		} else if (aplyMemberData != null) {
//			fathercheck = aplyMemberData.getValue("Fa_IncomeAddOn").equalsIgnoreCase("Y") ? "1" : "0";// 父親是否為所得合計對象
//			mothercheck = aplyMemberData.getValue("Ma_IncomeAddOn").equalsIgnoreCase("Y") ? "1" : "0";// 母親是否為所得合計對象
//			Fa_birthday = aplyMemberData.getValue("Fa_birthday");
//			// cFa_birthday=Fa_birthday.substring(0,4)+"-"+Fa_birthday.substring(4,6)+"-"+Fa_birthday.substring(6,8);
//			Ma_birthday = aplyMemberData.getValue("Ma_birthday");
//			// cMa_birthday=Ma_birthday.substring(0,4)+"-"+Ma_birthday.substring(4,6)+"-"+Ma_birthday.substring(6,8);
//			Third_birthday = aplyMemberData.getValue("Gd1_birthday");
//			spouse_birthday = aplyMemberData.getValue("Pa_birthday");
//		}

//		if (apply1_2Root != null) 
//		{			
////			 if (apply1_2Root.element("familyStatus") != null)
//////				 familyStatus=apply1_2Root.element("familyStatus").getText().toString();			
////			 if (apply1_2Root.element("familyStatusLevel1") != null)
////				 familyStatusLevel1 =apply1_2Root.element("familyStatusLevel1").getText().toString();
////			 if (apply1_2Root.element("familyStatusLevel2") != null)
////				 familyStatusLevel2 =apply1_2Root.element("familyStatusLevel2").getText().toString();
////			 familycheck=familyStatusLevel1+"_"+familyStatusLevel2;
//		} else if (aplyMemberData != null) {
////			familycheck = aplyMemberData.getValue("familyStatus");
//		}

        //System.out.println("@@@@@"+familycheck);
//		boolean checkStatus = false;
//		boolean checkFaMoStauts = false;
//		//boolean Fa_birthday_check = false;
//		//boolean Ma_birthday_check = false;
//		if ((familycheck.equals("2_1")&&marryStatus.equals("N")) || (familycheck.equals("2_2")&&marryStatus.equals("N")) || (familycheck.equals("2_3")&&marryStatus.equals("N"))
//				|| (familycheck.equals("2_4")&&marryStatus.equals("N"))) {
//			checkStatus = true;
//		}
//		if (fathercheck.equals("0") && mothercheck.equals("0")) {
//			checkFaMoStauts = true;
//		}
//		
//		//System.out.println("@@@@@@"+Fa_birthday+","+Ma_birthday+","+Third_birthday);
//		//System.out.println("%%%%%%"+familycheck+","+father_RadioBtn+","+mother_RadioBtn);
////		
//		
////		System.out.println("!!!!!!"+isAdult+","+checkFaMoStauts+","+checkStatus);
////		System.out.println("!!!!!!"+familycheck+","+fathercheck+","+mothercheck);
//
//
//		if (checkStatus && checkFaMoStauts && isAdult)
//			throw new Exception("請確實勾選所得合計對象");
//
//		//檢查父母生日
//		if((!isAdult&&familycheck.equals("1_1")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("1_2")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("1_3")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("2_1")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("2_2")&&marryStatus.equals("N")&&mother_RadioBtn.equals("1"))||(!isAdult&&familycheck.equals("2_3")&&marryStatus.equals("N")&&father_RadioBtn.equals("1"))||(!isAdult&&familycheck.equals("2_4")&&marryStatus.equals("N")&&father_RadioBtn.equals("1")&&mother_RadioBtn.equals("1"))||(isAdult&&familycheck.equals("1_1")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("1_2")&&marryStatus.equals("N")||(isAdult&&familycheck.equals("1_3")&&marryStatus.equals("N")))||(isAdult&&familycheck.equals("1_4")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("2_1")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("2_2")&&marryStatus.equals("N")&&mothercheck.equals("1"))||(isAdult&&familycheck.equals("2_3")&&marryStatus.equals("N")&&fathercheck.equals("1"))||(isAdult&&familycheck.equals("2_4")&&marryStatus.equals("N")&&fathercheck.equals("1")&&mothercheck.equals("1")))
//		{
//			CheckBir(Fa_birthday);
//			CheckBir(Ma_birthday);
//			CheckFamilyBir(Fa_birthday,birthday);
//			CheckFamilyBir(Ma_birthday,birthday);
//		}
//		//檢查父親生日格式		
//		if((!isAdult&&familycheck.equals("2_2")&&marryStatus.equals("N")&&mother_RadioBtn.equals("2"))||(!isAdult&&familycheck.equals("2_4")&&marryStatus.equals("N")&&father_RadioBtn.equals("1"))||(!isAdult&&familycheck.equals("3_1")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("1_2")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("2_1")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("3_1")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("4_1")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_2")&&marryStatus.equals("N")&&mothercheck.equals("0"))||(isAdult&&familycheck.equals("3_1")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("3_3")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("1_2")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_1")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("3_1")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("4_1")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_4")&&marryStatus.equals("N")&&fathercheck.equals("1")))
//		{
//			CheckBir(Fa_birthday);
//			CheckFamilyBir(Fa_birthday,birthday);
//		}		
//		//檢查母親生日格式	
//		if((!isAdult&&familycheck.equals("2_3")&&marryStatus.equals("N")&&father_RadioBtn.equals("2"))||(!isAdult&&familycheck.equals("2_4")&&marryStatus.equals("N")&&mother_RadioBtn.equals("1"))||(!isAdult&&familycheck.equals("3_2")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("1_3")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("2_2")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("3_2")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("4_2")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_3")&&marryStatus.equals("N")&&fathercheck.equals("0"))|(isAdult&&familycheck.equals("3_2")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("3_4")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("1_3")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_2")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("3_2")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("4_2")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_4")&&marryStatus.equals("N")&&mothercheck.equals("1")))
//		{
//			CheckBir(Ma_birthday);
//			CheckFamilyBir(Ma_birthday,birthday);
//		}
//		//檢查第三保證人生日格式	
//		if((!isAdult&&familycheck.equals("1_4")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("2_4")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("3_3")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("4_")&&marryStatus.equals("N"))||(!isAdult&&familycheck.equals("1_4")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("2_3")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("3_3")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("4_3")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("1_4")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("2_4")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("3_3")&&marryStatus.equals("N")||(isAdult&&familycheck.equals("3_4")&&marryStatus.equals("N")))||(isAdult&&familycheck.equals("4_")&&marryStatus.equals("N"))||(isAdult&&familycheck.equals("1_4")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_3")&&marryStatus.equals("Y")||(isAdult&&familycheck.equals("3_3")&&marryStatus.equals("Y")||(isAdult&&familycheck.equals("4_3")&&marryStatus.equals("Y")))))
//		{
//			CheckBir(Third_birthday);
//		}
//		//檢查配偶生日格式	
//		if((!isAdult&&familycheck.equals("1_1")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("1_2")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("1_3")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("1_4")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("2_1")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("2_2")&&marryStatus.equals("Y"))||(!isAdult&&familycheck.equals("2_3")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("1_1")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("1_2")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("1_3")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("1_4")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_1")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_2")&&marryStatus.equals("Y"))||(isAdult&&familycheck.equals("2_3")&&marryStatus.equals("Y")))
//		{
//			CheckBir(spouse_birthday);
//		}
        // 若有草稿過，就拿草稿的來用
        if (draftData != null) {
            Element root = draftData.getRootElement();

            if (root.element("student_educationStage") != null)
                educationStage = root.element("student_educationStage").getText();
            if (root.element("student_isNational") != null)
                schoolIsNational = root.element("student_isNational").getText();
            if (root.element("student_name") != null)
                schoolName = root.element("student_name").getText();
            if (root.element("student_isDay") != null)
                schoolIsDay = root.element("student_isDay").getText();
            if (root.element("student_department") != null)
                department = root.element("student_department").getText();
            if (root.element("onTheJobHidden") != null)
                onTheJob = root.element("onTheJobHidden").getText();

            if (root.element("student_grade") != null)
                gradeClassGrade = root.element("student_grade").getText();
            if (root.element("student_class") != null)
                gradeClassClass = root.element("student_class").getText();
            if (root.element("student_id") != null)
                studentId = root.element("student_id").getText();
            if (root.element("student_year_enter") != null)
                enterDateYear = root.element("student_year_enter").getText();
            if (root.element("student_month_enter") != null)
                enterDateMonth = root.element("student_month_enter").getText();
            if (root.element("year_graduation_hidden") != null)
                graduationDateYear = root.element("year_graduation_hidden").getText();
            if (root.element("month_graduation_hidden") != null)
                graduationDateMonth = root.element("month_graduation_hidden").getText();

            if (root.element("month_graduation_hidden") != null)
                month_graduation_hidden = root.element("month_graduation_hidden").getText();
            if (root.element("year_graduation_hidden") != null)
                year_graduation_hidden = root.element("year_graduation_hidden").getText();
            if (root.element("department_hidden") != null)
                department_hidden = root.element("department_hidden").getText();

            if (root.element("loanAmt") != null)
                loanAmt = root.element("loanAmt").getText();
        }
        // 本學期有申請過案件就撈申請案件；無則撈撥款紀錄
        else if (aplyMemberData != null) {
            // familyStatus = aplyMemberData.getValue("FamilyStatus");
            educationStage = aplyMemberData.getValue("schoolType3");
            schoolIsNational = aplyMemberData.getValue("schoolType1");
            schoolName = aplyMemberData.getValue("schoolCode");
            schoolIsDay = aplyMemberData.getValue("schoolType2");

            department = aplyMemberData.getValue("subject");
            onTheJob = "0".equals(aplyMemberData.getValue("schoolWorkFlag")) ? "N" : "Y";

            gradeClassGrade = aplyMemberData.getValue("class1");
            gradeClassClass = aplyMemberData.getValue("class2");

            studentId = aplyMemberData.getValue("learnId");

            enterDateYear = aplyMemberData.getValue("EnterDT").substring(0, 4);
            enterDateMonth = aplyMemberData.getValue("EnterDT").substring(4);
            graduationDateYear = aplyMemberData.getValue("FinishDT").substring(0, 4);
            graduationDateMonth = aplyMemberData.getValue("FinishDT").substring(4);

            // 轉為民國年
            enterDateYear = ProjUtils.toBirthday(enterDateYear);
            graduationDateYear = ProjUtils.toBirthday(graduationDateYear);
        }

        aplyMemberData = null;
        aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId, dao);
        if (aplyMemberData != null) {
            lastEnterDate = aplyMemberData.getValue("EnterDT");
            lastEnterDate = ProjUtils.toBirthday(lastEnterDate);
        }

        educationStageCode = educationStage;
        schoolCode = schoolName;

        // 要將代碼將成中文(資料確認頁會使用到)
        if (convertChinese) {

            // 教育階段
            if ("7".equals(educationStage)) {
                educationStage = "高中職";
            } else if ("8".equals(educationStage)) {
                educationStage = "五專";
            } else if ("6".equals(educationStage)) {
                educationStage = "二專";
            } else if ("5".equals(educationStage)) {
                educationStage = "二技";
            } else if ("4".equals(educationStage)) {
                educationStage = "大學、四技";
            } else if ("3".equals(educationStage)) {
                educationStage = "大學醫學（牙醫）系";
            } else if ("A".equals(educationStage)) {
                educationStage = "七年一貫";
            } else if ("9".equals(educationStage)) {
                educationStage = "學士後第二專長學士學位學程";
            } else if ("2".equals(educationStage)) {
                educationStage = "碩士班";
            } else if ("1".equals(educationStage)) {
                educationStage = "博士班";
            }

            // 學校名稱
            DataObject schoolInfo = ProjUtils.getSchoolInfo(schoolName, dao);
            schoolName = schoolInfo.getValue("SchoolName");
        }
        // System.out.println("@@@"+familyStatus );
        // System.out.println(content.get("father_checkbox")+",,,"+content.get("mother_checkbox"));

        HashMap<String,String> eduYearInfo = ProjUtils.getEduYearInfo(dao,null);
        String eduYear = eduYearInfo.get("eduYear");//學年
        String semester = eduYearInfo.get("semester"); //取得第幾學期

        content.put("isRecord", isRecord);
        content.put("EducationStageCode", educationStageCode);
        content.put("EducationStage", educationStage);
        content.put("loanAmt", loanAmt);

        JSONObject school = new JSONObject();
        school.put("isNational", schoolIsNational);
        school.put("name", schoolName);
        school.put("isDay", schoolIsDay);
        school.put("code", schoolCode);
        content.put("school", school);

        content.put("department", department);
        content.put("OnTheJob", onTheJob);

        JSONObject gradeClass = new JSONObject();
        gradeClass.put("grade", gradeClassGrade);
        gradeClass.put("class", gradeClassClass);
        content.put("gradeClass", gradeClass);

        content.put("student_id", studentId);

        JSONObject enterDate = new JSONObject();
        enterDate.put("year", enterDateYear);
        enterDate.put("month", enterDateMonth);
        content.put("enterDate", enterDate);

        JSONObject graduationDate = new JSONObject();
        graduationDate.put("year", graduationDateYear);
        graduationDate.put("month", graduationDateMonth);
        content.put("graduationDate", graduationDate);

        content.put("lastEnterDate", lastEnterDate); // 上次入學日期

        content.put("month_graduation_hidden", month_graduation_hidden);
        content.put("year_graduation_hidden", year_graduation_hidden);

        content.put("department_hidden", department_hidden);

        content.put("eduYear",eduYear);
        content.put("semester",semester);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo, JSONObject content) throws Exception {
        // To change body of implemented methods use File | Settings | File
        // Templates.
    }

    public boolean isConvertChinese() {
        return convertChinese;
    }

    public void setConvertChinese(boolean convertChinese) {
        this.convertChinese = convertChinese;
    }




}
