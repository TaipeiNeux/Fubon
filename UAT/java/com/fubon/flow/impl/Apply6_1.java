package com.fubon.flow.impl;

import com.fubon.utils.MessageUtils;
import com.fubon.utils.bean.MailBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.flow.ILogic;
import com.fubon.utils.FlowUtils;
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
 * Date: 2016/5/3
 * Time: 上午 10:16
 * To change this template use File | Settings | File Templates.
 */
public class Apply6_1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {
        LoginUserBean loginUserBean = ProjUtils.getLoginBean(queryStringInfo.getRequest().getSession());
        String userId = loginUserBean.getUserId();

        IDao dao = DaoFactory.getDefaultDao();

        String apply1_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_1", dao);
        String apply1_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply1_2", dao);
        String apply2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply2", dao);
        String apply3_1DraftXML = FlowUtils.getDraftData(userId, "apply", "apply3_1", dao);
        String apply3_2DraftXML = FlowUtils.getDraftData(userId, "apply", "apply3_2", dao);

        Document apply1_1Doc = apply1_1DraftXML!=null && StringUtils.isNotEmpty(apply1_1DraftXML) ? DocumentHelper.parseText(apply1_1DraftXML) : null;
        Document apply1_2Doc = apply1_2DraftXML!=null && StringUtils.isNotEmpty(apply1_2DraftXML) ? DocumentHelper.parseText(apply1_2DraftXML) : null;
        Document apply2Doc = apply2DraftXML!=null && StringUtils.isNotEmpty(apply2DraftXML) ? DocumentHelper.parseText(apply2DraftXML) : null;
        Document apply3_1Doc = apply3_1DraftXML!=null && StringUtils.isNotEmpty(apply3_1DraftXML) ? DocumentHelper.parseText(apply3_1DraftXML) : null;
        Document apply3_2Doc = apply3_2DraftXML!=null && StringUtils.isNotEmpty(apply3_2DraftXML) ? DocumentHelper.parseText(apply3_2DraftXML) : null;

        Element apply1_1Root = apply1_1Doc!=null ? apply1_1Doc.getRootElement() : null;
        Element apply1_2Root = apply1_2Doc!=null ? apply1_2Doc.getRootElement() : null;
        Element apply2Root = apply2Doc!=null ? apply2Doc.getRootElement() : null;
        Element apply3_1Root = apply3_1Doc!=null ? apply3_1Doc.getRootElement() : null;
        Element apply3_2Root = apply3_2Doc!=null ? apply3_2Doc.getRootElement() : null;

        //我要申請最後第5步確認資料的基本欄位
        ProjUtils.setApplyCommitStep5BasicData(queryStringInfo,content,userId,dao);


        //申請完了，要直接寫入AplyMemberTuitionLoanDtl
        String result = "申請失敗-線上續貸";

        //寄發email需要使用到的
        String email = "";
        String errorCode = "" , errorMsg = "";

        try{
            DataObject aplyMemberDataObject = ProjUtils.saveAplyMemberTuitionLoanDtl(queryStringInfo,content,dao,apply1_1Root,apply1_2Root,apply2Root,apply3_1Root,apply3_2Root,null,"1");

            email = aplyMemberDataObject.getValue("AplyEmail");

            //依照申請人取得線上續貸資料
            ProjUtils.setOnlineDocumentApplyData(content,userId,dao);


            //放是否借據
            content.put("signBill","Y".equals(aplyMemberDataObject.getValue("signBill")) ? "Y" : "N");


            //清除我要申請的草稿資料
            FlowUtils.resetDraftData(userId,"apply",dao);
        }catch(Exception e) {
            e.printStackTrace();

            result = "申請失敗-線上續貸:" + e.getMessage();

            throw new Exception("申請失敗："+e.getMessage());
        }
        finally {
            try{
                ProjUtils.saveLog(dao,queryStringInfo.getRequest(),getClass().getName(),"getDraftData",result);
            }catch(Exception e) {
                e.printStackTrace();
            }
        }


        //寄發Email
        String msg = StringUtils.isEmpty(errorCode) ? "成功" : "失敗";
        String mailTitle = MessageUtils.applyOnlineTitle;
        mailTitle = StringUtils.replace(mailTitle,"{result}",msg);

        MailBean mailBean = new MailBean("onlineloan");
        mailBean.setReceiver(email);
        mailBean.setTitle(mailTitle);
        mailBean.addResultParam("result",(StringUtils.isEmpty(errorCode) ? "<img src=\"{host}/img/na-14.png\">您已成功送出申請資料!本行將儘速審核您的案件" : "<img src=\"{host}/img/na-16.png\">送出申請資料失敗("+errorCode+")"+errorMsg));
        MessageUtils.sendEmail(mailBean);
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
