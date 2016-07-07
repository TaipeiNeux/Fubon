package com.fubon.flow.impl;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
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
 * Date: 2016/4/24
 * Time: 下午 4:27
 * To change this template use File | Settings | File Templates.
 */
public class Apply3_1 implements ILogic {

    private boolean convertChinese = false;


    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String educationStage = "",department = "",onTheJob = "",studentId = "";

        String schoolIsNational = "",schoolName = "",schoolIsDay = "";
        String gradeClassGrade = "",gradeClassClass = "";
        String enterDateYear = "",enterDateMonth = "";
        String graduationDateYear = "",graduationDateMonth = "";
        String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N";
        String lastEnterDate = ""; //上次入學日期

        String month_graduation_hidden = "" , year_graduation_hidden = "";

        //若有草稿過，就拿草稿的來用
        if(draftData != null) {
            Element root = draftData.getRootElement();
            if(root.element("student_educationStage") != null) educationStage = root.element("student_educationStage").getText();
            if(root.element("student_isNational") != null) schoolIsNational = root.element("student_isNational").getText();
            if(root.element("student_name") != null) schoolName = root.element("student_name").getText();
            if(root.element("student_isDay") != null) schoolIsDay = root.element("student_isDay").getText();
            if(root.element("student_department") != null) department = root.element("student_department").getText();
            if(root.element("onTheJobHidden") != null) onTheJob = root.element("onTheJobHidden").getText();

            if(root.element("student_grade") != null) gradeClassGrade = root.element("student_grade").getText();
            if(root.element("student_class") != null) gradeClassClass = root.element("student_class").getText();
            if(root.element("student_id") != null) studentId = root.element("student_id").getText();
            if(root.element("student_year_enter") != null) enterDateYear = root.element("student_year_enter").getText();
            if(root.element("student_month_enter") != null) enterDateMonth = root.element("student_month_enter").getText();
            if(root.element("year_graduation_hidden") != null) graduationDateYear = root.element("year_graduation_hidden").getText();
            if(root.element("month_graduation_hidden") != null) graduationDateMonth = root.element("month_graduation_hidden").getText();

            if(root.element("month_graduation_hidden") != null) month_graduation_hidden = root.element("month_graduation_hidden").getText();
            if(root.element("year_graduation_hidden") != null) year_graduation_hidden = root.element("year_graduation_hidden").getText();
        }
        else {

            //如果是已撥款帳戶，要比對上次選的跟這次選的家庭狀況是否一致
            DataObject aplyMemberData = null;
            if("Y".equalsIgnoreCase(isRecord)) {
                //帶入撥款紀錄
                aplyMemberData = ProjUtils.getNewsAplyMemberTuitionLoanHistoryData(userId,dao);
            }
            else {
                //先取得「本學期」申請資料
//                aplyMemberData = ProjUtils.getAplyMemberTuitionLoanDataThisYearSemeter(userId,dao);
            }

            if(aplyMemberData != null) {

                educationStage = aplyMemberData.getValue("schoolType3");
                schoolIsNational = aplyMemberData.getValue("schoolType1");
                schoolName = aplyMemberData.getValue("schoolCode");
                schoolIsDay = aplyMemberData.getValue("schoolType2");

                department = aplyMemberData.getValue("subject");
                onTheJob = "0".equals(aplyMemberData.getValue("schoolWorkFlag")) ? "N" : "Y";

                gradeClassGrade = aplyMemberData.getValue("class1");
                gradeClassClass = aplyMemberData.getValue("class2");

                studentId = aplyMemberData.getValue("learnId");

                enterDateYear = aplyMemberData.getValue("EnterDT").substring(0,4);
                enterDateMonth = aplyMemberData.getValue("EnterDT").substring(4);
                graduationDateYear = aplyMemberData.getValue("FinishDT").substring(0,4);
                graduationDateMonth = aplyMemberData.getValue("FinishDT").substring(4);

                //轉為民國年
                enterDateYear = ProjUtils.toBirthday(enterDateYear);

                lastEnterDate = aplyMemberData.getValue("enterDT");
                lastEnterDate = ProjUtils.toBirthday(lastEnterDate);

//                //轉為民國年
//                if(StringUtils.isNotEmpty(lastEnterDate) && lastEnterDate.length() == 6) {
//                    String lastEnterYear = lastEnterDate.substring(0,4);
//                    String lastEnterMonth = lastEnterDate.substring(4);
//
//                    lastEnterDate = (Integer.parseInt(lastEnterYear) - 1911) + "/" + lastEnterMonth;
//                }
            }
        }

        //要將代碼將成中文(資料確認頁會使用到)
        if(convertChinese) {

            //教育階段
            if("7".equals(educationStage)) {
                educationStage = "高中職";
            }
            else if("8".equals(educationStage)) {
                educationStage = "五專";
            }
            else if("6".equals(educationStage)) {
                educationStage = "二專";
            }
            else if("5".equals(educationStage)) {
                educationStage = "二技";
            }
            else if("4".equals(educationStage)) {
                educationStage = "大學、四技";
            }
            else if("3".equals(educationStage)) {
                educationStage = "大學醫學（牙醫）系";
            }
            else if("A".equals(educationStage)) {
                educationStage = "七年一貫";
            }
            else if("9".equals(educationStage)) {
                educationStage = "學士後第二專長學士學位學程";
            }
            else if("2".equals(educationStage)) {
                educationStage = "碩士班";
            }
            else if("1".equals(educationStage)) {
                educationStage = "博士班";
            }

            //學校名稱
            DataObject schoolInfo = ProjUtils.getSchoolInfo(schoolName,dao);
            schoolName = schoolInfo.getValue("SchoolName");
        }

        content.put("isRecord",isRecord);
        content.put("EducationStage",educationStage);

        JSONObject school = new JSONObject();
        school.put("isNational",schoolIsNational);
        school.put("name",schoolName);
        school.put("isDay",schoolIsDay);
        content.put("school",school);

        content.put("department",department);
        content.put("OnTheJob",onTheJob);

        JSONObject gradeClass = new JSONObject();
        gradeClass.put("grade",gradeClassGrade);
        gradeClass.put("class",gradeClassClass);
        content.put("gradeClass",gradeClass);

        content.put("student_id",studentId);

        JSONObject enterDate = new JSONObject();
        enterDate.put("year",enterDateYear);
        enterDate.put("month",enterDateMonth);
        content.put("enterDate",enterDate);

        JSONObject graduationDate = new JSONObject();
        graduationDate.put("year",graduationDateYear);
        graduationDate.put("month",graduationDateMonth);
        content.put("graduationDate",graduationDate);

        content.put("lastEnterDate",lastEnterDate); //上次入學日期

        content.put("month_graduation_hidden",month_graduation_hidden);
        content.put("year_graduation_hidden",year_graduation_hidden);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public boolean isConvertChinese() {
        return convertChinese;
    }

    public void setConvertChinese(boolean convertChinese) {
        this.convertChinese = convertChinese;
    }
}
