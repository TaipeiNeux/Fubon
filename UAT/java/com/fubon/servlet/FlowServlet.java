package com.fubon.servlet;

import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.QueryConfig;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.json.JSONObject;
import org.jsoup.nodes.Element;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/14
 * Time: 上午 10:51
 * To change this template use File | Settings | File Templates.
 */
public class FlowServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        this.doPost(req, resp);    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(req, false);

        String action = queryStringInfo.getParam("action");
        String flowId = queryStringInfo.getParam("flowId");
        String step = queryStringInfo.getParam("step");

        GardenLog.log(GardenLog.DEBUG,"FlowServlet:action=" + action);
        GardenLog.log(GardenLog.DEBUG,"FlowServlet:flowId=" + flowId);

        JSONObject jsonObject = new JSONObject();

        JSONObject header = new JSONObject();
        JSONObject content = new JSONObject();


        IDao dao = DaoFactory.getDefaultDao();
//        Transcation transcation = dao.beginTranscation();

        try{
            jsonObject.put("Header",header);
            jsonObject.put("Content",content);

            boolean allow = true;

            //判斷這個Flow有無需要登入
            Element root = FlowUtils.getFlowRoot(flowId);
            if("Y".equalsIgnoreCase(root.attr("needLogin"))) {

                //判斷是否有登入
                LoginUserBean loginUserBean = ProjUtils.getLoginBean(req.getSession());
                if(loginUserBean == null) {
                    header.put("errorCode","9999");
                    header.put("errorMsg", "系統逾時，請重新登入");

                    allow = false;
                }
            }

            if(allow) {

                if("saveTemp".equalsIgnoreCase(action)) {
                    saveTemp(flowId,step,content, queryStringInfo,dao);
                }
                else if("prev".equalsIgnoreCase(action)) {
                    prev(flowId,step,content,queryStringInfo,dao);
                }
                else if("next".equalsIgnoreCase(action)) {
                    next(flowId,step,content, queryStringInfo,dao);
                }
                else if("continue".equalsIgnoreCase(action)) {
                    continues(flowId,step,content, queryStringInfo,dao);
                }
                else if("reset".equalsIgnoreCase(action)) {
                    reset(flowId,content, queryStringInfo,dao);
                }


                header.put("errorCode","0");
                header.put("errorMsg","成功");
            }

//            transcation.doCommit();
        }catch(Exception e) {
            e.printStackTrace();

            GardenLog.log(GardenLog.DEBUG,"FlowServlet Exception=>"+e.getMessage());
            StackTraceElement[] stackTraceElements = e.getStackTrace();

            for(StackTraceElement element : stackTraceElements) {
                GardenLog.log(GardenLog.DEBUG,element.getClassName() + ":"+ element.getMethodName() + "("+element.getLineNumber()+")");
            }

            try{
                header.put("errorCode","99");
                header.put("errorMsg",e.getMessage());

//                transcation.doRollBack();
            }catch(Exception ex) {
                ;
            }
        }finally{
            try{
//                transcation.closeConnection();
            }catch(Exception ex) {
                ;
            }
        }

        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    private void reset(String flowId,JSONObject content,JSPQueryStringInfo queryStringInfo,IDao dao) throws Exception {

        //登入使用者帳號
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        FlowUtils.resetDraftData(userId,flowId,dao);

        if("deferment".equalsIgnoreCase(flowId)) {
            //清除文件
            SQLCommand update = new SQLCommand("delete from Deferment_Doc where AplyIdNo = ? and (FlowLogId is null or FlowLogId = 0)");
            update.addParamValue(userId);
            DaoFactory.getDefaultDao().queryByCommand(null,update,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);

            queryStringInfo.getRequest().getSession().setAttribute("eligibilityText","");
            queryStringInfo.getRequest().getSession().setAttribute("eligibilityIndex","");
            queryStringInfo.getRequest().getSession().setAttribute("eligibilityText0","");
        }
        else if("apply".equalsIgnoreCase(flowId)) {
            //清除文件
            SQLCommand update = new SQLCommand("delete from AplyMemberTuitionLoanDtl_Doc where AplyIdNo = ?");
            update.addParamValue(userId);
            DaoFactory.getDefaultDao().queryByCommand(null,update,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);

        }


    }

    private void saveTemp(String flowId,String stepId,JSONObject content,JSPQueryStringInfo queryStringInfo,IDao dao) throws Exception {

        //登入使用者帳號
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        //產生草稿XML
        GardenLog.log(GardenLog.DEBUG,"userId = " + userId);
        String draftXML = FlowUtils.toDraftDataXML(queryStringInfo,false);

        //更新草稿到DB
        FlowUtils.updateDraftData(userId,flowId,stepId,draftXML,dao,true);


    }

    private void prev(String flowId,String stepId,JSONObject content,JSPQueryStringInfo queryStringInfo,IDao dao) throws Exception {

        //登入使用者帳號
        String userId = null;
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        if(loginUserBean != null) {
            userId = loginUserBean.getUserId();
        }

        //取得要當下哪個階段
        Element root = FlowUtils.getFlowRoot(flowId);

        String preStepId = FlowUtils.getPrevStep(root, stepId);

        //查上一步的草稿內容
        String draftXML = FlowUtils.getDraftData(userId,flowId,preStepId,dao);
        Document doc = StringUtils.isNotEmpty(draftXML) ? DocumentHelper.parseText(draftXML) : null;

        //依照flowId取出當下步驟的物件
        Element preStep = FlowUtils.getFlowElementById(root,preStepId);

        FlowUtils.setFlowJSON(root,preStep,content);

        //開始長內容
        ILogic nextLogic = FlowUtils.getLogic(preStep);

        GardenLog.log(GardenLog.DEBUG,"FlowServlet:continue= iLogic = " + nextLogic.getClass().getName() + ", doc = " + doc);

        nextLogic.getDraftData(content,doc,queryStringInfo);

//        //更新目前階段
//        FlowUtils.setStepIsCurrent(userId,flowId,step.getID(),dao);
    }

    private void next(String flowId,String stepId,JSONObject content,JSPQueryStringInfo queryStringInfo,IDao dao) throws Exception {

        //登入使用者帳號
        String userId = null;
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        if(loginUserBean != null) {
            userId = loginUserBean.getUserId();
        }

        //先取出目前的step，然後呼叫儲存db的邏輯
        Element root = FlowUtils.getFlowRoot(flowId);

        Element currentStep = FlowUtils.getFlowElementById(root, stepId);

        GardenLog.log(GardenLog.DEBUG,"userId = " + userId);
        GardenLog.log(GardenLog.DEBUG,"FlowServlet next currentStep = " + currentStep);

        //先儲存相關資料
        ILogic iLogic = FlowUtils.getLogic(currentStep);
        iLogic.doAction(queryStringInfo,content);

        GardenLog.log(GardenLog.DEBUG,"DoAction=" + iLogic.getClass().getName());

        //產生草稿XML
        String draftXML = FlowUtils.toDraftDataXML(queryStringInfo);

        //如果未登入，將輸入的草稿放入session
        if(StringUtils.isEmpty(userId)) {
            //命名原則為flow+stepId
            queryStringInfo.getRequest().getSession().setAttribute(flowId + "_" + stepId,draftXML);
        }
        //有登入則存db
        else {
            //更新草稿
            FlowUtils.updateDraftData(userId,flowId,stepId,draftXML,dao,false);
        }



        //找下一步是哪個step，先看目前Step是否最後一步，若是就找父節點的下一個，若不是就找下一個
        String nextStepId = FlowUtils.getNextStep(root,stepId,queryStringInfo);

        GardenLog.log(GardenLog.DEBUG,"nextStepId = " + nextStepId);


        //查下一步的草稿內容
        String nextDraftXML = FlowUtils.getDraftData(userId,flowId,nextStepId,dao);
        Document doc = StringUtils.isNotEmpty(nextDraftXML) ? DocumentHelper.parseText(nextDraftXML) : null;

        //依照flowId取出當下步驟的物件
        Element nextStep = FlowUtils.getFlowElementById(root, nextStepId);

        FlowUtils.setFlowJSON(root,nextStep,content);

        //開始長內容
        ILogic nextLogic = FlowUtils.getLogic(nextStep);

        GardenLog.log(GardenLog.DEBUG,"FlowServlet:continue= iLogic = " + nextLogic.getClass().getName() + ", doc = " + doc);

        nextLogic.getDraftData(content,doc,queryStringInfo);

        //更新將上一步更新為當下步驟
        FlowUtils.setStepIsCurrent(userId,flowId,stepId,dao);
    }

    private void continues(String flowId,String stepId,JSONObject content,JSPQueryStringInfo queryStringInfo,IDao dao) throws Exception {

        //登入使用者帳號
        String userId = null;
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        if(loginUserBean != null) {
            userId = loginUserBean.getUserId();
        }

        Element root = FlowUtils.getFlowRoot(flowId);

        String currentStepId = null;
        String draftData = null;

        //如果未登入狀態或是不用存草稿的(無指定步驟)，直接回到第一步
        if((StringUtils.isEmpty(userId) || "N".equalsIgnoreCase(root.attr("canDraft"))) && StringUtils.isEmpty(stepId)) {
            currentStepId = FlowUtils.getFirstStep(root);
        }
        //有登入則撈草稿
        else {
            //若無指定到哪個步驟
            if(StringUtils.isEmpty(stepId)) {

                //先查這個使用者目前的草稿階段，並取出草稿資料
                SQLCommand queryCurrent = new SQLCommand("select Step,DraftData from draft where UserId = ? and FlowId = ? and isCurrent = 'Y'");
                queryCurrent.addParamValue(userId);
                queryCurrent.addParamValue(flowId);
                Vector<DataObject> ret = new Vector<DataObject>();
                dao.queryByCommand(ret,queryCurrent,null,null);

                if(ret.size() != 0) {
                    currentStepId = ret.get(0).getValue("Step");
                    draftData = ret.get(0).getValue("DraftData");
                }
                else {
                    //當沒有草稿狀態，就要取第一個可執行的步驟
                    currentStepId = FlowUtils.getFirstStep(root);
                }
            }
            //若有指定步驟，就撈草稿資料
            else {
                SQLCommand queryCurrent = new SQLCommand("select Step,DraftData from draft where UserId = ? and FlowId = ? and Step = ?");
                queryCurrent.addParamValue(userId);
                queryCurrent.addParamValue(flowId);
                queryCurrent.addParamValue(stepId);
                Vector<DataObject> ret = new Vector<DataObject>();
                dao.queryByCommand(ret,queryCurrent,null,null);
                currentStepId = stepId;
                if(ret.size() != 0) {
                    draftData = ret.get(0).getValue("DraftData");
                }
            }
        }

        //draftData草稿資料是XML格式
        Document doc = null;
        if(StringUtils.isNotEmpty(draftData)) doc = DocumentHelper.parseText(draftData);

        //依照flowId取出當下步驟的物件
        Element step = FlowUtils.getFlowElementById(root, currentStepId);

        FlowUtils.setFlowJSON(root,step,content);

        //開始長內容
        ILogic iLogic = FlowUtils.getLogic(step);

        GardenLog.log(GardenLog.DEBUG,"FlowServlet:continue= iLogic = " + iLogic.getClass().getName() + ", doc = " + doc);

        iLogic.getDraftData(content,doc,queryStringInfo);


    }


}
