package com.fubon.flow.impl;

import com.fubon.utils.MessageUtils;
import com.fubon.utils.bean.MailBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.select.Elements;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 上午 10:15
 * To change this template use File | Settings | File Templates.
 */
public class Apply6_2 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {

        HttpServletRequest req = queryStringInfo.getRequest();
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(req.getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String errorCode = "" , errorMsg = "";

        String apply1_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
        String apply1_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_2", dao);
        String apply2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply2", dao);
        String apply3_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply3_1", dao);
        String apply3_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply3_2", dao);
        String apply4DraftXML = FlowUtils.getDraftData(userId, "apply", "apply_online_4", dao);
        String apply5DraftXML = FlowUtils.getDraftData(userId, "apply", "apply_online_5", dao);
//        String apply52DraftXML = FlowUtils.getDraftData(userId, "apply", "apply_document_5_2", dao);

        Document apply1_1Doc = DocumentHelper.parseText(apply1_1DraftXML);
        Document apply1_2Doc = DocumentHelper.parseText(apply1_2DraftXML);
        Document apply2Doc = DocumentHelper.parseText(apply2DraftXML);
        Document apply3_1Doc = DocumentHelper.parseText(apply3_1DraftXML);
        Document apply3_2Doc = DocumentHelper.parseText(apply3_2DraftXML);
        Document apply4Doc = DocumentHelper.parseText(apply4DraftXML);
        Document apply5Doc = DocumentHelper.parseText(apply5DraftXML);
//        Document apply52Doc = DocumentHelper.parseText(apply52DraftXML);

        Element apply1_1Root = apply1_1Doc.getRootElement();
        Element apply1_2Root = apply1_2Doc.getRootElement();
        Element apply2Root = apply2Doc.getRootElement();
        Element apply3_1Root = apply3_1Doc.getRootElement();
        Element apply3_2Root = apply3_2Doc.getRootElement();
        Element apply4Root = apply4Doc.getRootElement();
        Element apply5Root = apply5Doc.getRootElement();
//        Element apply52Root = apply52Doc.getRootElement();

        //寄發email需要使用到的
        String email = "";
        String branchName = "",branchAddr = "",branchTel="";
        String bookingTime = "";
        String objListHidden = "";

        //申請完了，要直接寫入AplyMemberTuitionLoanDtl
        String result = "申請成功-對保分行";
        try{

            email = apply1_1Root.element("email").getText();

            DataObject aplyMemberDataObject = ProjUtils.saveAplyMemberTuitionLoanDtl(queryStringInfo , dao,apply1_1Root,apply1_2Root,apply2Root,apply3_1Root,apply3_2Root,apply4Root,"2");

            boolean isAdult = ProjUtils.isAdult(aplyMemberDataObject.getValue("AplyBirthday"));
            String aplyNo = aplyMemberDataObject.getValue("AplyNo");

            //去查連帶保證人的新開Table
            DataObject aplyMemberTuitionLoanDtlGuarantor = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl_Guarantor");
            aplyMemberTuitionLoanDtlGuarantor.setValue("AplyNo",aplyNo);
            dao.querySingle(aplyMemberTuitionLoanDtlGuarantor,null);

            String isFaGuarantor = aplyMemberTuitionLoanDtlGuarantor.getValue("Fa_Guarantor");//父親是否為連帶保證人
            String isMaGuarantor = aplyMemberTuitionLoanDtlGuarantor.getValue("Ma_Guarantor");//母親是否為連帶保證人
            String isGd1Guarantor = aplyMemberTuitionLoanDtlGuarantor.getValue("Gd1_Guarantor");//監護人是否為連帶保證人
            String isPaGuarantor = aplyMemberTuitionLoanDtlGuarantor.getValue("Pa_Guarantor");//是否為連帶保證人
            String isWarGuarantor = aplyMemberTuitionLoanDtlGuarantor.getValue("War_Guarantor");//是否為連帶保證人

            String isFaIncome = aplyMemberDataObject.getValue("Fa_IncomeAddOn");//父親是否為所得合計對象
            String isMaIncome = aplyMemberDataObject.getValue("Ma_IncomeAddOn");//母親是否為所得合計對象
            String isGd1Income = aplyMemberDataObject.getValue("Gd1_IncomeAddOn");//父親是否為所得合計對象
            String isPaIncome = aplyMemberDataObject.getValue("Pa_IncomeAddOn");//母親是否為所得合計對象

            //合計所得對象
            String incomeTax = "";
            if("Y".equalsIgnoreCase(isFaIncome)) incomeTax += "1";
            else incomeTax += "0";

            if("Y".equalsIgnoreCase(isMaIncome)) incomeTax += "1";
            else incomeTax += "0";

            if("Y".equalsIgnoreCase(isGd1Income)) incomeTax += "1";
            else incomeTax += "0";

            if("Y".equalsIgnoreCase(isPaIncome)) incomeTax += "1";
            else incomeTax += "0";

            //是否為連帶保證人
            String isGuarantor = "";
            if("Y".equalsIgnoreCase(isFaGuarantor)) isGuarantor += "1";
            else isGuarantor += "0";

            if("Y".equalsIgnoreCase(isMaGuarantor)) isGuarantor += "1";
            else isGuarantor += "0";

            if(isAdult && "Y".equalsIgnoreCase(isWarGuarantor)) isGuarantor += "1";
            else if(!isAdult && "Y".equalsIgnoreCase(isGd1Guarantor)) isGuarantor += "1";
            else isGuarantor += "0";

            if("Y".equalsIgnoreCase(isPaGuarantor)) isGuarantor += "1";
            else isGuarantor += "0";


            //取得分行代碼，預約時間

            String applicantAdult = apply1_2Root.element("applicantAdult").getText();
            String userMarriedHidden = apply1_2Root.element("userMarriedHidden").getText();
            String familyStatusLevel1 = apply1_2Root.element("familyStatusLevel1").getText();
            String familyStatusLevel2 = apply1_2Root.element("familyStatusLevel2").getText();

            String branchId = apply4Root.element("idSelected").getText();
            String dateSelected = apply4Root.element("dateSelected").getText();
            String timeSelected = apply4Root.element("timeSelected").getText();

            String reservation = apply5Root.element("reservation") != null ? apply5Root.element("reservation").getText() : "";

            Map<String,String> searchMap = new LinkedHashMap<String, String>();
            searchMap.put("b.BranchId",branchId);
            Vector<DataObject> ret = ProjUtils.getBranch(searchMap, dao);
            DataObject branch = ret.get(0);

            //取得要帶的文件html
            objListHidden = apply5Root.element("objListHidden") != null ? apply5Root.element("objListHidden").getText() : "";

            objListHidden = StringUtils.replace(objListHidden,"&amp;lt;","<");
            objListHidden = StringUtils.replace(objListHidden,"&amp;gt;",">");

            branchName = branch.getValue("BranchName");
            branchAddr = branch.getValue("Addr");
            branchTel = branch.getValue("Tel");
            bookingTime = dateSelected + " " + timeSelected.substring(0,2) + ":" + timeSelected.substring(2);

            content.put("branchName",branch.getValue("BranchName")); // 分行名稱
            content.put("addr",branchAddr);          // 分行地址
            content.put("tel",branchTel);              // 分行電話
            content.put("dateSelected",dateSelected);
            content.put("timeSelected",timeSelected);

            content.put("applicantAdult",applicantAdult);
            content.put("marryStatus",userMarriedHidden);

            content.put("reservation",reservation);

            //依照申請人取得線上續貸資料
            ProjUtils.setOnlineDocumentApplyData(content,userId,dao);

            //放是否借據
            content.put("signBill","Y".equals(aplyMemberDataObject.getValue("signBill")) ? "Y" : "N");

            content.put("father_RadioBtn",isFaGuarantor);
            content.put("mother_RadioBtn",isMaGuarantor);
            content.put("thirdParty_RadioBtn",isAdult ? isWarGuarantor : isGd1Guarantor);
            content.put("spouse_RadioBtn",isPaGuarantor);
            content.put("father_checkbox",isFaIncome);
            content.put("mother_checkbox",isMaIncome);

            content.put("incomeTax",incomeTax);
            content.put("isGuarantor",isGuarantor);

            content.put("objListHidden",objListHidden);

            content.put("errorCode",errorCode);
            content.put("errorMsg",errorMsg);

            //清除我要申請的草稿資料
//            FlowUtils.resetDraftData(userId,"apply",dao);
        }catch(Exception e) {
            GardenLog.log(GardenLog.DEBUG, "Apply6_2 Exception=>" + e.getMessage());
            StackTraceElement[] stackTraceElements = e.getStackTrace();

            for(StackTraceElement element : stackTraceElements) {
                GardenLog.log(GardenLog.DEBUG,element.getClassName() + ":"+ element.getMethodName() + "("+element.getLineNumber()+")");
            }

            result = "申請失敗-對保分行:" + e.getMessage();

            if(StringUtils.isEmpty(errorCode)) errorCode = "99";
            errorMsg = "系統更新失敗["+e.getMessage()+"]";

//            throw new Exception("申請失敗："+e.getMessage());
        }finally {
            try{
                ProjUtils.saveLog(dao,queryStringInfo.getRequest(),getClass().getName(),"getDraftData",result);
            }catch(Exception e) {
                e.printStackTrace();
            }
        }

        //寄發Email
        String msg = StringUtils.isEmpty(errorCode) ? "成功" : "失敗";
        String mailTitle = MessageUtils.applyBankTitle;
        mailTitle = StringUtils.replace(mailTitle,"{result}",msg);


        //寄發Email要加上style
        objListHidden = "<ul>" + objListHidden + "</ul>";
        org.jsoup.nodes.Document doc = Jsoup.parse(objListHidden);
        Elements lis = doc.select("li");
        for(int i=0;i<lis.size();i++) {
            org.jsoup.nodes.Element li = lis.get(i);
            li.attr("style","text-align:left;");

            li.select("p").attr("style","background:#fff;display:inline-block;padding:10px;border-radius:10px;margin:0;margin-bottom:10px;");
        }

        Elements imgs = doc.select("img");
        for(int i=0;i<imgs.size();i++) {
            org.jsoup.nodes.Element img = imgs.get(i);
            String src = img.attr("src");
            img.attr("src","{host}/" + src);
        }

        objListHidden = doc.select("ul").html();

        MailBean mailBean = new MailBean("bank");
        mailBean.setReceiver(email);
        mailBean.setTitle(mailTitle);
        mailBean.addResultParam("bank", branchName + "("+branchAddr+")" + branchTel);
        mailBean.addResultParam("time",bookingTime);
        mailBean.addResultParam("result",(StringUtils.isEmpty(errorCode) ? "<img src=\"{host}/img/na-14.png\">您已成功送出申請資料" : "<img src=\"{host}/img/na-16.png\">送出申請資料失敗("+errorCode+")"+errorMsg));
        mailBean.addResultParam("document",objListHidden);
        MessageUtils.sendEmail(mailBean);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
