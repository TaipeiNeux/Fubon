package com.fubon.servlet;

import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.listener.SessionBean;
import com.neux.garden.log.GardenLog;
import com.fubon.listener.SessionLoginBean;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.MessageUtils;
import com.fubon.utils.ProjUtils;
import com.fubon.utils.bean.MailBean;
import com.neux.utility.orm.bean.DataColumn;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/20
 * Time: 上午 11:54
 * To change this template use File | Settings | File Templates.
 */
public class AuthServlet extends HttpServlet {

    //每個帳號一個session只能登入一次
    private static final Map<String,SessionLoginBean> sessionMap = new HashMap<String,SessionLoginBean>(); //身份證字號/sessionID

    public static void addLoginInfoToApplication(String id , SessionLoginBean sessionLoginBean) {
        GardenLog.log(GardenLog.DEBUG,"addLoginInfoToApplication = " + id + ",sessionID=" + sessionLoginBean.getSessionId());
        sessionMap.put(id,sessionLoginBean);
    }

    public static void removeLoginInfoToApplication(String id) {

        GardenLog.log(GardenLog.DEBUG,"removeLoginInfoToApplication = " + id);
        sessionMap.remove(id);
    }

    public static SessionLoginBean getSessionLoginBean(String id) {
        return sessionMap.get(id);
    }

    public static Set<String> getLoginUserId() {
        return sessionMap.keySet();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(req, false);

        String action = queryStringInfo.getParam("action");

        if("login".equalsIgnoreCase(action)) {
            login(queryStringInfo,resp);
        }
        else if("logout".equalsIgnoreCase(action)) {
            logout(queryStringInfo,resp);
        }
        else if("getLoginInfo".equalsIgnoreCase(action)) {
            getLoginInfo(queryStringInfo,resp);
        }
        else if("setGuest".equalsIgnoreCase(action)) {
            setGuest(queryStringInfo, resp);
        }
        else if("isLogin".equalsIgnoreCase(action)) {
            isLogin(queryStringInfo,resp);
        }

    }

    private void logout(JSPQueryStringInfo queryStringInfo,HttpServletResponse resp) {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        removeLoginInfoToApplication(loginUserBean.getUserId());
        queryStringInfo.getRequest().getSession().removeAttribute("loginUserBean");
    }

    private void setGuest(JSPQueryStringInfo queryStringInfo,HttpServletResponse resp) {
//        LoginUserBean loginUserBean = new LoginUserBean();
//
//        String uuid = UUID.randomUUID().toString();
//        uuid = StringUtils.replace(uuid,"-","");
//        uuid = uuid.substring(0,10);
//        loginUserBean.setUserId(uuid);
//        loginUserBean.setUserName("Guest");
//        loginUserBean.setSuccess(true);
//
//        try{
//            FlowUtils.resetDraftData(loginUserBean.getUserId(),"register",DaoFactory.getDefaultDao());
//        }catch(Exception e) {
//            e.printStackTrace();
//        }
//        queryStringInfo.getRequest().getSession().setAttribute("loginUserBean",loginUserBean);
    }



    private void isLogin(JSPQueryStringInfo queryStringInfo,HttpServletResponse resp) {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());

        JSONObject jsonObject = new JSONObject();

        try{
            jsonObject.put("isLogin",loginUserBean == null ? "N" : "Y");
        }catch(Exception e) {
            e.printStackTrace();
        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    private void login(JSPQueryStringInfo queryStringInfo,HttpServletResponse resp) {

        String force = queryStringInfo.getParam("force");
        String id = queryStringInfo.getParam("id");
        String userId = queryStringInfo.getParam("userId");
        String userPwd = queryStringInfo.getParam("userPwd");

        JSONObject jsonObject = new JSONObject();
        boolean sendEmail = true;
        String email = null;
        try{

            jsonObject.put("errorCode","98");
            jsonObject.put("errorMsg", "您輸入的資料錯誤");

            //要查db確認身份，查：Student_UserProfile/Student_UserProfileDetail
            IDao dao = DaoFactory.getDefaultDao();
            DataObject studentUserProfile = DaoFactory.getDefaultDataObject("Student_UserProfile");
            studentUserProfile.setValue("IdNo",id);

            DataObject studentUserProfileDetail = DaoFactory.getDefaultDataObject("Student_UserProfileDetail");
            studentUserProfileDetail.setValue("AplyIdNo",id);

            if(dao.querySingle(studentUserProfile,null) && dao.querySingle(studentUserProfileDetail,null)) {

                String dbUserId = studentUserProfile.getValue("UserId");
                String dbPassword = studentUserProfile.getValue("Password");
                String dbLoginFailCount = studentUserProfile.getValue("LoginFailCount");
                email = studentUserProfileDetail.getValue("AplyEmail");

                if(StringUtils.isEmpty(dbLoginFailCount)) dbLoginFailCount = "0";
                int failCount = Integer.parseInt(dbLoginFailCount);

                //如果登入失敗超過3次就直接擋掉
                if(failCount >= 3) {
                    jsonObject.put("failCount", failCount + "");
                    jsonObject.put("errorMsg", "使用者密碼連續輸入錯誤三次，已被鎖定 ");
                }
                else {
                    //TODO 待HSM開欄位
                    if("Y".equalsIgnoreCase(studentUserProfile.getValue("IS_HSM"))) {

                    }
                    else {
                        String s = id + "-" + userPwd;
                        String md5Password = DigestUtils.md5Hex(s.toUpperCase());

                        if(userId.equalsIgnoreCase(dbUserId)) {

                            if(md5Password.equalsIgnoreCase(dbPassword)) {

                                //當驗證都過了，就判斷這身份證是否已經在別的瀏覽器登入
                                if(sessionMap.containsKey(id) && !"Y".equals(force)) {
                                    jsonObject.put("errorCode","97");
                                    jsonObject.put("LastSignOn",sessionMap.get(id).getLoginTime());
                                }
                                else {
                                    LoginUserBean loginUserBean = new LoginUserBean();

                                    //把DB的值全部裝進去到Session
                                    List<DataColumn> colList = studentUserProfile.getColumnList();
                                    for(DataColumn col : colList) {
                                        GardenLog.log(GardenLog.DEBUG,"put loginUserBean customizeValue:" + col.getName() + "=" + col.getValue());
                                        loginUserBean.addCustomizeValue(col.getName(),col.getValue());
                                    }

                                    //把DB的值全部裝進去到Session
                                    List<DataColumn> detailColList = studentUserProfileDetail.getColumnList();
                                    for(DataColumn col : detailColList) {
                                        GardenLog.log(GardenLog.DEBUG,"put loginUserBean customizeValue:" + col.getName() + "=" + col.getValue());
                                        loginUserBean.addCustomizeValue(col.getName(),col.getValue());
                                    }

                                    //是否有簽訂線上服務註記
                                    //如果是公司環境，固定是回傳true
                                    boolean isETab = false;
                                    int isArrearChk = 0;
                                    String acnoSlList = "";
                                    String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
                                    if(!"sit".equalsIgnoreCase(env)) {
                                        RQBean rqBean = new RQBean();
                                        rqBean.setTxId("EB032282");
                                        rqBean.addRqParam("FUNC","0");
                                        rqBean.addRqParam("CUST_NO",id);
                                        rqBean.addRqParam("BUS_TYP","");
                                        rqBean.addRqParam("EMP_NO","");
                                        rqBean.addRqParam("BDAY","");

                                        RSBean rsBean = WebServiceAgent.callWebService(rqBean);
                                        if(rsBean.isSuccess()) {
                                            String response = rsBean.getTxnString();

                                            Document doc = DocumentHelper.parseText(response);
                                            Element root = doc.getRootElement();
                                            String custSts = root.element("CUST_STS").getText().trim();
                                            GardenLog.log(GardenLog.DEBUG,"custSts = " + custSts);
                                            if("Y".equalsIgnoreCase(custSts)) isETab = true;
                                        }

                                        rqBean = new RQBean();
                                        rqBean.setTxId("EB382671");
                                        rqBean.addRqParam("FUNC","1");
                                        rqBean.addRqParam("CUST_NO",id);

                                        rsBean = WebServiceAgent.callWebService(rqBean);
                                        if(rsBean.isSuccess()) {
                                            String response = rsBean.getTxnString();

                                            Document doc = DocumentHelper.parseText(response);
                                            Element root = doc.getRootElement();
                                            for (Iterator i = root.elementIterator("TxRepeat"); i.hasNext();) {
                                                Element foo = (Element) i.next();
                                                String acnoSl = foo.elementText("ACNO_SL").trim();
                                                if(acnoSl.equals(""))continue;
                                                acnoSlList += acnoSl + ",";
                                                GardenLog.log(GardenLog.DEBUG,"acnoSl = " + acnoSl);
                                                String actSts = foo.elementText("ACT_STS").trim();
                                                GardenLog.log(GardenLog.DEBUG,"actSts = " + actSts);
                                                String specSts = foo.elementText("SPEC_STS").trim();
                                                GardenLog.log(GardenLog.DEBUG,"specSts = " + specSts);
                                                if(Integer.valueOf(actSts)>1 && !specSts.equals("")) isArrearChk++;
                                            }
                                        }
                                    }
                                    else {
                                        isETab =  true;
                                        acnoSlList = "20003210005097"; //testing
                                    }

                                    String isEtabs = isETab ? "Y" : "N";//紀錄是否有簽訂線上服務註記
                                    String isArrear = isArrearChk == 0 ? "Y" : "N";//紀錄是否不欠款

                                    loginUserBean.addCustomizeValue("isEtabs",isEtabs);
                                    loginUserBean.addCustomizeValue("isArrear",isArrear);
                                    loginUserBean.addCustomizeValue("acnoSlList",acnoSlList);
                                    loginUserBean.setUserId(id);
                                    loginUserBean.setUserName(studentUserProfileDetail.getValue("Applicant"));
                                    loginUserBean.setSuccess(true);

                                    queryStringInfo.getRequest().getSession().setAttribute("loginUserBean",loginUserBean);

                                    String lastSignOn = DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString());

                                    //放入application，以控制不同session只能登入一次
                                    SessionLoginBean sessionLoginBean = new SessionLoginBean();
                                    sessionLoginBean.setId(id);
                                    sessionLoginBean.setLoginTime(lastSignOn);
                                    sessionLoginBean.setSessionId(queryStringInfo.getRequest().getSession().getId());
                                    addLoginInfoToApplication(id,sessionLoginBean);

                                    //重設密碼錯誤次數
                                    studentUserProfile.setValue("LoginFailCount","0");
                                    studentUserProfile.setValue("LastSignOn",lastSignOn);
                                    dao.update(studentUserProfile);

                                    jsonObject.put("errorCode","0");

                                    sendEmail = false;
                                }


                            }
                            else {

                                //密碼錯誤時，要回寫DB記錄次數
                                failCount++;

                                studentUserProfile.setValue("LoginFailCount",failCount + "");
                                dao.update(studentUserProfile);

                                if(failCount == 1) {
                                    jsonObject.put("errorMsg", "使用者密碼輸入錯誤一次(連續錯誤三次將被鎖定)");
                                }
                                else if(failCount == 2) {
                                    jsonObject.put("errorMsg", "使用者密碼輸入錯誤二次(連續錯誤三次將被鎖定)");
                                }
                                else if(failCount >= 3) {
                                    jsonObject.put("errorMsg", "使用者密碼連續輸入錯誤三次，已被鎖定");
                                }

                                jsonObject.put("failCount", failCount + "");

                            }

                        }
                        else {
                            jsonObject.put("errorMsg", "身分證字號或使用者代碼錯誤");
                        }

                    }
                }


            }
            else {
                jsonObject.put("errorMsg", "身分證字號驗證錯誤");
            }

        }catch(Exception e) {
            e.printStackTrace();

            try{
                jsonObject.put("errorCode","99");
                jsonObject.put("errorMsg","系統發生錯誤["+e.getMessage()+"]");

            }catch(Exception ex) {
                ex.printStackTrace();
            }
        }


        if(sendEmail && StringUtils.isNotEmpty(email)) {

            try{

                MailBean mailBean = new MailBean("login");
                mailBean.setReceiver(email);
                mailBean.setTitle(MessageUtils.loginFailTitle);
                mailBean.addResultParam("errorCode","98");
                mailBean.addResultParam("result",jsonObject.getString("errorMsg"));
                mailBean.addResultParam("date",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));

                MessageUtils.sendEmail(mailBean);
            }catch(Exception e) {
                e.printStackTrace();
            }
        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    private void getLoginInfo(JSPQueryStringInfo queryStringInfo,HttpServletResponse resp) {

        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());

        JSONObject jsonObject = new JSONObject();
        JSONObject content = new JSONObject();
        try{
            jsonObject.put("isLogin","N");
            jsonObject.put("content",content);

            if(loginUserBean != null) {

                //判斷是否有重覆登入
                String userId = loginUserBean.getUserId();
                GardenLog.log(GardenLog.DEBUG,"userId = " + userId);

                SessionLoginBean sessionLoginBean = sessionMap.get(userId);
                String sessionId = sessionLoginBean.getSessionId();

                GardenLog.log(GardenLog.DEBUG,"current = " + queryStringInfo.getRequest().getSession().getId());
                GardenLog.log(GardenLog.DEBUG,"sessionId = " + sessionId);

                //如果驗證的sessionid跟目前的不同，則踢除
                if(sessionLoginBean != null && !queryStringInfo.getRequest().getSession().getId().equals(sessionId)) {
                    queryStringInfo.getRequest().getSession().removeAttribute("loginUserBean");
                }
                else {
                    jsonObject.put("isLogin","Y");

                    IDao dao = DaoFactory.getDefaultDao();

                    //加入個資隱碼
                    jsonObject.put("name",ProjUtils.toNameMark(loginUserBean.getUserName()));

                    //取得當下學期
                    HashMap<String,String> eduYearInfo = ProjUtils.getEduYearInfo(dao,null);

                    String semester = eduYearInfo.get("semester"); //取得第幾學期
                    String applySDate = eduYearInfo.get("apply_sDate"); //網路投保開始時間
                    String applyEDate = eduYearInfo.get("apply_eDate"); //網路投保開始時間
                    String preApplyDate = eduYearInfo.get("preApplyDate"); //提前時間
                    String today = DateUtil.getTodayString().substring(0,8);

                    GardenLog.log(GardenLog.DEBUG,"applySDate = " + applySDate);
                    GardenLog.log(GardenLog.DEBUG,"applyEDate = " + applyEDate);
                    GardenLog.log(GardenLog.DEBUG,"preApplyDate = " + preApplyDate);
                    GardenLog.log(GardenLog.DEBUG,"today = " + today);

                    if(StringUtils.isNotEmpty(preApplyDate)) {
                        applySDate = preApplyDate;
                    }

                    GardenLog.log(GardenLog.DEBUG,"applySDate2 = " + applySDate);

                    boolean hasPreiod = (Long.parseLong(today) >= Long.parseLong(applySDate) && Long.parseLong(today) <= Long.parseLong(applyEDate));

                    //先取得「本學期」申請資料
                    Map<String,String> queryMap = null;
                    if(hasPreiod) {
                        queryMap = new HashMap<String,String>();
                        queryMap.put("EduYear",eduYearInfo.get("eduYear"));
                        queryMap.put("Semester",eduYearInfo.get("semester"));
                    }

                    //如果不在本學期的對保期間，也就不用查這學期的申請案件
                    DataObject aplyMemberData = queryMap != null ? ProjUtils.getAplyMemberTuitionLoanData(userId,queryMap,dao) : null;


                    //撈申辦人相關資料

                    String isPeriod = hasPreiod ? "Y" : "N";//紀錄是否為對保期間
                    String isRecord = ProjUtils.isPayHistory(userId,dao) ? "Y" : "N"; //紀錄是否有撥款紀錄
                    String isEtabs = ProjUtils.isEtabs(loginUserBean) ? "Y" : "N";//紀錄是否有簽訂線上服務註記
                    String isPopUp = ProjUtils.isPopupPromoDialog(userId,dao) ? "Y" : "N";//此學期是否已經彈跳過
                    String appCases = aplyMemberData != null ? "Y" : "N";//本學期是否有申請案件
                    String tempCases = FlowUtils.isDraftData(userId, "apply", dao) ? "Y" : "N";//紀錄是否有暫存案件
                    String kindOfCases = aplyMemberData != null ? aplyMemberData.getValue("AplyCaseType") : "";//紀錄案件種類(1:線上續貸/2:分行對保);
                    String censor = "";//紀錄審核狀態 1:尚未審核;2:審核中;3:審核合完成通過;4:審核完成未通過

                    String firstSemesterStart = "";//上學期的對保開始時間
                    String firstSemesterEnd = "";//上學期的對保結束時間
                    String secondSemesterStart = "";//下學期的對保開始時間
                    String secondSemesterEnd = "";//下學期的對保結束時間

                    String appName = "";//申請人名字

                    //線上申貸的申請時間
                    String onlineAppYear = "";
                    String onlineAppMonth = "";
                    String onlineAppDay = "";
                    String onlineAppHour = "";
                    String onlineAppMin = "";
                    String onlineAppSec = "";

                    //對保分行的申請時間
                    String documentAppYear = "";
                    String documentAppMonth = "";
                    String documentAppDay = "";
                    String documentAppHour = "";
                    String documentAppMin = "";
                    String documentAppSec = "";

                    //草稿的修改時間
                    String draftAppYear = "";
                    String draftAppMonth = "";
                    String draftAppDay = "";
                    String draftAppHour = "";
                    String draftAppMin = "";
                    String draftAppSec = "";

                    String branchName = ""; //對保分行名稱
                    String branchAddr = ""; //對保分行地址
                    String branchTel = ""; //對保分行電話
                    String carryObjArr = ""; //攜帶的物品
                    String reservation = ""; //預約對保分行的時間

                    //取最後草稿修改時間
                    String lastDraftModifyTime = FlowUtils.getDraftLastModifyTime(userId,"apply",dao);
                    if(StringUtils.isNotEmpty(lastDraftModifyTime)) {
                        String modifyTime14 = DateUtil.convertDateTo14(lastDraftModifyTime);

                        draftAppYear = modifyTime14.substring(0,4);
                        draftAppMonth = modifyTime14.substring(4,6);
                        draftAppDay = modifyTime14.substring(6,8);
                        draftAppHour = modifyTime14.substring(8,10);
                        draftAppMin = modifyTime14.substring(10,12);
                        draftAppSec = modifyTime14.substring(12,14);
                    }


                    //抓對保期間
                    HashMap<String,String> regionMap = ProjUtils.getApplyDateRegion(dao);

                    firstSemesterStart = regionMap.get("s1_sDate");//上學期的對保開始時間
                    firstSemesterEnd = regionMap.get("s1_eDate");//上學期的對保結束時間
                    secondSemesterStart = regionMap.get("s2_sDate");//下學期的對保開始時間
                    secondSemesterEnd = regionMap.get("s2_eDate");//下學期的對保結束時間

                    //若本學期有申請資料，才往下抓其他資料
                    if(aplyMemberData != null) {

                        String aplyStatus = aplyMemberData.getValue("APLYSTATUS");
                        //(未對保) = 尚未審核
                        if("UNVERIFIED".equalsIgnoreCase(aplyStatus)) {
                            censor = "1";
                        }
                        //審核中
                        if("VERIFYING".equalsIgnoreCase(aplyStatus)) {
                            censor = "2";
                        }
                        //(已對保) = 審核完成-通過
                        else if("VERIFIED".equalsIgnoreCase(aplyStatus)) {
                            censor = "3";
                        }
                        //審核完成未通過
                        else if("REJECT".equalsIgnoreCase(aplyStatus)) {
                            censor = "4";
                        }

                        appName = aplyMemberData.getValue("Applicant");

                        //加入個資隱碼
                        appName = ProjUtils.toNameMark(appName);

                        //依案件類型來判斷放入哪些變數(1:線上續貸/2:分行對保)
                        String aplyCaseType = aplyMemberData.getValue("AplyCaseType");
                        String aplyDate = aplyMemberData.getValue("AplyDate");
                        String aplyTime = aplyMemberData.getValue("AplyTime");

                        if("1".equalsIgnoreCase(aplyCaseType)) {
                            onlineAppYear = aplyDate.substring(0,4);
                            onlineAppMonth = aplyDate.substring(4,6);
                            onlineAppDay = aplyDate.substring(6,8);
                            onlineAppHour = aplyTime.substring(0,2);
                            onlineAppMin = aplyTime.substring(2,4);
                            onlineAppSec = aplyTime.substring(4,6);
                        }
                        else if("2".equalsIgnoreCase(aplyCaseType)) {
                            documentAppYear = aplyDate.substring(0,4);
                            documentAppMonth = aplyDate.substring(4,6);
                            documentAppDay = aplyDate.substring(6,8);
                            documentAppHour = aplyTime.substring(0,2);
                            documentAppMin = aplyTime.substring(2,4);
                            documentAppSec = aplyTime.substring(4,6);
                        }

                        //對保分行
                        String expectBranchId = aplyMemberData.getValue("expectBranchId");
                        if(StringUtils.isNotEmpty(expectBranchId)) {

                            String expectDate = aplyMemberData.getValue("expectDate");
                            String expectTime = aplyMemberData.getValue("expectTime");



                            Map<String,String> searchMap = new LinkedHashMap<String, String>();
                            searchMap.put("b.BranchId",expectBranchId);
                            Vector<DataObject> ret = ProjUtils.getBranch(searchMap, dao);
                            DataObject branch = ret.get(0);

                            branchName = branch.getValue("BranchName");
                            branchAddr = branch.getValue("Addr"); //對保分行地址
                            branchTel = branch.getValue("Tel"); //對保分行電話
                            carryObjArr = ""; //攜帶的物品
                            reservation = DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",expectDate + expectTime + "00"); //預約對保分行的時間
                        }

                    }

                    content.put("id",userId);
                    content.put("isPeriod",isPeriod);
                    content.put("isRecord",isRecord);
                    content.put("isEtabs",isEtabs);
                    content.put("isPopUp",isPopUp);
                    content.put("appCases",appCases);
                    content.put("tempCases",tempCases);
                    content.put("kindOfCases",kindOfCases);
                    content.put("censor",censor);
                    content.put("firstSemesterStart",firstSemesterStart);
                    content.put("firstSemesterEnd",firstSemesterEnd);
                    content.put("secondSemesterStart",secondSemesterStart);
                    content.put("secondSemesterEnd",secondSemesterEnd);
                    content.put("semester",semester);
                    content.put("appName",appName);

                    JSONObject online = new JSONObject();

                    online.put("appYear",onlineAppYear);
                    online.put("appMonth",onlineAppMonth);
                    online.put("appDay",onlineAppDay);
                    online.put("appHour",onlineAppHour);
                    online.put("appMin",onlineAppMin);
                    online.put("appSec",onlineAppSec);

                    JSONObject document = new JSONObject();

                    document.put("appYear",documentAppYear);
                    document.put("appMonth",documentAppMonth);
                    document.put("appDay",documentAppDay);
                    document.put("appHour",documentAppHour);
                    document.put("appMin",documentAppMin);
                    document.put("appSec",documentAppSec);

                    JSONObject draft = new JSONObject();

                    draft.put("appYear",draftAppYear);
                    draft.put("appMonth",draftAppMonth);
                    draft.put("appDay",draftAppDay);
                    draft.put("appHour",draftAppHour);
                    draft.put("appMin",draftAppMin);
                    draft.put("appSec",draftAppSec);

                    content.put("online",online);
                    content.put("document",document);
                    content.put("draft",draft);

                    content.put("branchName",branchName);
                    content.put("branchAddr",branchAddr);
                    content.put("branchTel",branchTel);
                    content.put("carryObjArr",carryObjArr);
                    content.put("reservation",reservation);
                }


            }

        }catch(Exception e) {
            e.printStackTrace();

        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }
}