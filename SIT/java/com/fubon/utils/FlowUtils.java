package com.fubon.utils;

import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.flow.BranchsLogic;
import com.fubon.flow.ILogic;
import com.fubon.mark.MarkBean;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.QueryConfig;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/24
 * Time: 下午 3:11
 * To change this template use File | Settings | File Templates.
 */
public class FlowUtils {
    private static Document doc = null;

    public static Document getFlowDocument() {
        if(doc == null) {
            InputStream is = null;
            try{
                is = FlowUtils.class.getResourceAsStream("/flow.xml");
                String html = IOUtils.toString(is, "utf-8");
                doc = Jsoup.parse(html, "utf-8");
            }catch(Exception e) {
                e.printStackTrace();
            }finally{
                if(is != null) {
                    try{
                        is.close();
                    }catch(Exception ex) {
                        ;
                    }
                }
            }
        }

        return doc;
    }

    public static String toDraftDataXML(JSPQueryStringInfo queryStringInfo) {
        return toDraftDataXML(queryStringInfo,true);
    }

    //是點下一步才會是true，如果是暫存的話，原本的session還要在，所以會是false
    public static String toDraftDataXML(JSPQueryStringInfo queryStringInfo,boolean isClearMark) {

        //判斷是否有隱碼需求
        MarkBean markBean = (MarkBean) queryStringInfo.getRequest().getSession().getAttribute("MarkBean");
        Map<String,String[]> inputMap = markBean != null ? markBean.getInputMap() : new HashMap<String,String[]>();

        GardenLog.log(GardenLog.DEBUG,"toDraftDataXML:inputMap = " + inputMap);

        if(inputMap != null) {
            for(String key : inputMap.keySet()) {
                String[] data = inputMap.get(key);
                String original = data[0];
                String after = data[1];
                GardenLog.log(GardenLog.DEBUG,key + ":[" + original + "]:[" + after + "]");
            }
        }

        HashMap<String,Object> paramMap = queryStringInfo.getAllParams();
        StringBuffer draftXML = new StringBuffer();
        draftXML.append("<record>");

        for(String paramName : paramMap.keySet()) {
            String[] paramValues = queryStringInfo.getArrayParam(paramName);

            if(paramValues.length == 1) {

                draftXML.append(ProjUtils.toTagXML(paramName,paramValues[0],inputMap));
            }
            else {
                draftXML.append(ProjUtils.toTagArrayXML(paramName,paramValues,inputMap));
            }
        }

        draftXML.append("</record>");

        GardenLog.log(GardenLog.DEBUG,"draftXML["+draftXML+"]");

        if(isClearMark) {
            //拿掉隱碼
            queryStringInfo.getRequest().getSession().removeAttribute("MarkBean");
        }

        return draftXML.toString();
    }

    public static ILogic getLogic(Element step) throws Exception {
        Class c = Class.forName(step.attr("logic"));
        Object obj = c.newInstance();

        if(obj instanceof ILogic) {
            return (ILogic) obj;
        }
        return null;
    }

    //清除草稿
    public static void resetDraftData(String userId,String flowId,IDao dao) throws Exception {
        SQLCommand reset = new SQLCommand("delete from draft where UserID = ? and FlowId = ?");
        reset.addParamValue(userId);
        reset.addParamValue(flowId);
        dao.queryByCommand(null,reset,new QueryConfig().setExecuteType(QueryConfig.EXECUTE), null);
    }

    //取得草稿資料
    public static String getDraftData(String userId,String flowId,String stepId,IDao dao) throws Exception {

        if(StringUtils.isEmpty(userId)) return null;

        SQLCommand query = new SQLCommand("select DraftData from draft where UserID = ? and FlowId = ? and Step = ?");
        query.addParamValue(userId);
        query.addParamValue(flowId);
        query.addParamValue(stepId);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        if(ret.size() == 0) return null;
        else return ret.get(0).getValue("DraftData");


    }

    //是否有草稿資料
    public static boolean isDraftData(String userId,String flowId, IDao dao) throws Exception {
        SQLCommand query = new SQLCommand("select UserID from draft where UserID = ? and FlowId = ?");
        query.addParamValue(userId);
        query.addParamValue(flowId);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        return ret.size() != 0;
    }

    //設定這個步驟為當下草稿
    public static void setStepIsCurrent(String userId,String flowId,String stepId,IDao dao) throws Exception {

        if(StringUtils.isEmpty(userId)) return;

        //將這個使用者的這個流程，都將IsCurrent改成N
        SQLCommand update = new SQLCommand("update draft set IsCurrent = 'N' where UserID = ? and FlowId = ? and Step <> ?");
        update.addParamValue(userId);
        update.addParamValue(flowId);
        update.addParamValue(stepId);
        dao.queryByCommand(null,update,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);

        SQLCommand update2 = new SQLCommand("update draft set IsCurrent = 'Y' where UserID = ? and FlowId = ? and Step = ?");
        update2.addParamValue(userId);
        update2.addParamValue(flowId);
        update2.addParamValue(stepId);
        dao.queryByCommand(null,update2,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);

    }

    //取得目前草稿的最後修改時間
    //取得草稿資料
    public static String getDraftLastModifyTime(String userId,String flowId,IDao dao) throws Exception {

        SQLCommand query = new SQLCommand("select ModifyTime from draft where UserID = ? and FlowId = ? and IsCurrent = 'Y'");
        query.addParamValue(userId);
        query.addParamValue(flowId);

        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        if(ret.size() == 0) return null;
        else return ret.get(0).getValue("ModifyTime");


    }

    //更新草稿資料
    public static void updateDraftData(String userId,String flowId,String stepId,String draftXML,IDao dao,boolean autoUpdate) throws Exception {

        if(StringUtils.isEmpty(userId)) return;

        //取出目前此步驟的資料
        SQLCommand query = new SQLCommand("select DraftId from draft where UserID = ? and FlowId = ? and Step = ?");
        query.addParamValue(userId);
        query.addParamValue(flowId);
        query.addParamValue(stepId);
        Vector<DataObject> ret = new Vector<DataObject>();
        dao.queryByCommand(ret,query,null,null);

        try{

            //如果已存過草稿，就更新
            if(ret.size() == 0) {
                DataObject draft = DaoFactory.getDefaultDataObject("draft");
                draft.setValue("UserID",userId);
                draft.setValue("FlowId",flowId);
                draft.setValue("Step",stepId);
                draft.setValue("DraftData",draftXML);
                draft.setValue("IsCurrent","N");
                draft.setValue("ModifyTime", DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));

                dao.insert(draft);
            }
            //如果還沒存過草稿，就新增
            else {
                String draftId = ret.get(0).getValue("DraftId");

                DataObject draft = DaoFactory.getDefaultDataObject("draft");
                draft.setValue("DraftId",draftId);
                if(dao.querySingle(draft,null)) {
                    draft.setValue("DraftData",draftXML);
                    draft.setValue("IsCurrent","Y");
                    draft.setValue("ModifyTime", DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));

                    dao.update(draft);
                }
            }

            if(autoUpdate) {
                setStepIsCurrent(userId,flowId,stepId,dao);
            }

        }catch(Exception e) {
            e.printStackTrace();

        }

    }

    public static Element getFlowElementById(Element root ,String id) {
        return root.select("[id="+id+"]").get(0);
    }

    public static Element getFlowRoot(String flowId) {
        Element root = getFlowDocument().select("flow[id=" + flowId + "]").get(0);
        return root;
    }

    public static String getFirstStep(Element root) {
        Element step = root.select("step[logic]").get(0);
        return step.id();
    }

    public static String getPrevStep(Element root ,String stepId) {
        Element currentStep = getFlowElementById(root,stepId);
        Element prev = currentStep.previousElementSibling();

        //代表已經是第一個，找爸爸同層的上一個
        if(prev == null) {
            Element parent = currentStep.parent();
            String parentTagName = parent.tagName();

            if("Step".equalsIgnoreCase(parentTagName)) {
                prev = parent.previousElementSibling();

                //有可能本身是第一層，所以回同層要找同層的最後一個孩子
                Elements children = prev.children();
                if(children != null && children.size() != 0) {
                    prev = children.get(children.size()-1);
                }
            }
            else if("branch".equalsIgnoreCase(parentTagName)) {
                //找分支設定的parentStep

                Element branches = parent.parent();
                String parentStep = branches.attr("parentStep");
                prev = getFlowElementById(root,parentStep);
            }


        }
        else {
            //有可能本身是第一層，所以回同層要找同層的最後一個孩子
            Elements children = prev.children();
            if(children != null && children.size() != 0) {
                prev = children.get(children.size()-1);
            }
        }

        return prev.id();
    }

    public static String getNextStep(Element root , String stepId,JSPQueryStringInfo queryStringInfo) {
        Element currentStep = getFlowElementById(root,stepId);

        Element next = currentStep.nextElementSibling();

        //代表最後一層，找爸爸的下一個同層
        if(next == null) {
            Element parent = currentStep.parent();
            next = parent.nextElementSibling();
            String nextTagName = next.tagName();

            if("step".equalsIgnoreCase(nextTagName)) {

                //有可能本身是第一層，所以要找同層的最後一個孩子
                Elements children = next.children();
                if(children != null && children.size() != 0) {
                    next = children.get(children.size()-1);
                }
            }
            else if("branchs".equalsIgnoreCase(nextTagName)) {
                //找分支設定的logic


                String logic = next.attr("logic");
                BranchsLogic branchsLogic = null;
                try{
                    if(StringUtils.isNotEmpty(logic)) {

                        GardenLog.log(GardenLog.DEBUG,"BranchsLogic = " + logic);

                        Class c = Class.forName(logic);
                        Object obj = c.newInstance();

                        if(obj instanceof BranchsLogic) {
                            branchsLogic = (BranchsLogic) obj;

                            String branchId = branchsLogic.getBranchId(queryStringInfo);
                            Element branchStep = getFlowElementById(root,branchId);

                            next = branchStep.children().get(0);
                        }
                    }


                }catch(Exception e) {
                    e.printStackTrace();
                }

            }


        }
        else {
            //有可能本身是第一層，所以回同層要找同層的第一個孩子
            Elements children = next.children();
            if(children != null && children.size() != 0) {
                next = children.get(0);
            }
        }

        return next.id();
    }

    private static Element getBranchStep(Element step) {

        Elements parents = step.parents();
        for(int i=0;i<parents.size();i++) {
            Element parent = parents.get(i);
            if("branch".equalsIgnoreCase(parent.tagName())) return parent;
        }

        return null;
    }

    public static void setFlowJSON(Element root,Element currentStep,JSONObject content) throws Exception{

        String currentStepId = currentStep.id();
        String bodyClass = currentStep.attr("class");
        Element parent = currentStep.parent();
        String parentStepId = parent.id();
        String isConfirm = "N";
        String isFirstStep = "N";
        String canDraft = "N";
        String preBtnText = "";
        String nextBtnText = "";
        String noBindingPreEvent = "N";

        if("Y".equalsIgnoreCase(root.attr("canDraft"))) canDraft = "Y";

        if("Y".equalsIgnoreCase(currentStep.attr("isConfirm"))) isConfirm = "Y";
        if("Y".equalsIgnoreCase(currentStep.attr("isFirstStep"))) isFirstStep = "Y";

        if(StringUtils.isNotEmpty(currentStep.attr("preBtnText"))) preBtnText = currentStep.attr("preBtnText");
        if(StringUtils.isNotEmpty(currentStep.attr("nextBtnText"))) nextBtnText = currentStep.attr("nextBtnText");
        if(StringUtils.isNotEmpty(currentStep.attr("noBindingPreEvent"))) noBindingPreEvent = currentStep.attr("noBindingPreEvent");

        String currentMainStep = "";
        String currentSubStep = "";

        if("step".equalsIgnoreCase(parent.tagName())) {
            //如果沒有上一層，mainstep就是當下步驟，有的話就是放上層名稱
            currentMainStep = StringUtils.isEmpty(parentStepId) ? currentStepId : parentStepId;

            //如果沒有上一層，就不用放substep
            currentSubStep = StringUtils.isEmpty(parentStepId) ? "" : currentStepId;
        }
        else {
            currentMainStep = currentStepId;
        }

        JSONObject flow = new JSONObject();
        flow.put("flowId",root.id());
        flow.put("viewURL",currentStep.attr("view"));
        flow.put("currentMainStep",currentMainStep);
        flow.put("currentSubStep",currentSubStep);
        flow.put("bodyClass",bodyClass);
        flow.put("isConfirm",isConfirm);
        flow.put("isFirstStep",isFirstStep);
        flow.put("canDraft",canDraft);
        flow.put("preBtnText",preBtnText);
        flow.put("nextBtnText",nextBtnText);
        flow.put("noBindingPreEvent",noBindingPreEvent);

        //長主流程
        JSONArray mainStep = new JSONArray();
        Elements steps = root.select("steps").get(0).children();
        for(int i=0;i<steps.size();i++) {
            Element step = steps.get(i);

            if("Step".equalsIgnoreCase(step.tagName())) {

                JSONObject tmp = new JSONObject();
                tmp.put("id",step.id());
                tmp.put("name",step.attr("name"));

                mainStep.put(tmp);
            }
            else {
                //如果遇到分支，預設找第一個分支來放流程步驟

                //看是否為分支的步驟
                Element parentBranchStep = getBranchStep(currentStep);
                if(parentBranchStep != null) {
                    Elements branchSteps = parentBranchStep.children();

                    for(int j=0;j<branchSteps.size();j++) {

                        Element branchStep = branchSteps.get(j);

                        JSONObject tmp = new JSONObject();

                        tmp.put("id",branchStep.id());
                        tmp.put("name",branchStep.attr("name"));

                        mainStep.put(tmp);
                    }
                }
                else {
                    Element firstBranch = step.select("branch").get(0);
                    Elements branchSteps = firstBranch.children();

                    for(int j=0;j<branchSteps.size();j++) {

                        Element branchStep = branchSteps.get(j);

                        JSONObject tmp = new JSONObject();

                        tmp.put("id",branchStep.id());
                        tmp.put("name",branchStep.attr("name"));

                        mainStep.put(tmp);
                    }
                }


            }


        }

        flow.put("mainStep",mainStep);

        //長次流程
        JSONArray subStep = new JSONArray();

        Element subStepObj = getFlowElementById(root, currentMainStep);

        Elements subSteps = subStepObj.children();
        for(int i=0;i<subSteps.size();i++) {
            Element sub = subSteps.get(i);

            JSONObject tmp = new JSONObject();

            tmp.put("id",sub.id());
            tmp.put("name",sub.attr("name"));

            subStep.put(tmp);
        }

        flow.put("subStep",subStep);

        content.put("flow",flow);
    }
}
