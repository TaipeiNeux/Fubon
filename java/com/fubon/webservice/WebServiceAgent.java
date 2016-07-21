package com.fubon.webservice;

import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.utils.DBUtils;
import com.neux.utility.orm.ORMAPI;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.orm.hdl.connection.SQLConnection;
import com.neux.utility.orm.hdl.connection.module.IConnection;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.fubon.operationimpl.listenerservices.soap.listener.SOAPEMFListenerStub;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/19
 * Time: 下午 12:10
 * To change this template use File | Settings | File Templates.
 */
public class WebServiceAgent {

    protected static final String SQL_GET_SEQ_VALUE = "SELECT NEXT VALUE FOR TTL2ESB";


    public static RSBean callWebService(RQBean rqBean) {
        return callWebService(rqBean,getID(),"");
    }

    public static RSBean callWebService(RQBean rqBean,String hstano,String hretrn) {

        RSBean rsBean = new RSBean();

        IDao dao = DaoFactory.getDefaultDao();
        try {
            GardenLog.log(GardenLog.DEBUG,"init WebService config");

            Properties p = PropertiesUtil.loadPropertiesByClassPath("/config.properties");
            String url = p.getProperty("wsdlPath");//"http://172.19.240.1:9212/ListenerServices/SOAP/Listener/SOAPEMFListener?wsdl"
            String spName = p.getProperty("uat.spname");//"TFBANK-TLN"
            String htlid = p.getProperty("uat.htlid");//8704011，870分行別、4011系統代號

            GardenLog.log(GardenLog.DEBUG,"url = " + url);
            GardenLog.log(GardenLog.DEBUG,"spName = " + spName);
            GardenLog.log(GardenLog.DEBUG,"htlid = " + htlid);

            SOAPEMFListenerStub stub = new SOAPEMFListenerStub(url);
            SOAPEMFListenerStub.SoapService soap = new SOAPEMFListenerStub.SoapService();
            SOAPEMFListenerStub.ServiceHeader_type0 header = new SOAPEMFListenerStub.ServiceHeader_type0();
            SOAPEMFListenerStub.ServiceBody_type0 body = new SOAPEMFListenerStub.ServiceBody_type0();

            //當下日期14碼
            String today = DateUtil.getTodayString();

            header.setHSYDAY(today.substring(0,8));
            header.setHSYTIME(today.substring(8,14));
            header.setSPName(spName);
            header.setTxID(rqBean.getTxId());
            header.setHWSID(spName);
            header.setHSTANO(hstano);    //sequence：七碼
            header.setHTLID(htlid);
            header.setHRETRN(hretrn);
            header.setEncoding("BIG5");
            header.setUUID(UUID.randomUUID().toString().replaceAll("-", ""));

            if(StringUtils.isNotEmpty(rqBean.getHeaderPageFlg())) header.setPAGEFLG(rqBean.getHeaderPageFlg());
            if(StringUtils.isNotEmpty(rqBean.getHeaderDBAppn())) header.setDBAPPN(rqBean.getHeaderDBAppn());

            body.setTxnString(rqBean.toRQXML());
            body.setDataType("XML");
            body.setShouldRender(true);
            soap.setServiceHeader(header);
            soap.setServiceBody(body);

            GardenLog.log(GardenLog.DEBUG,"hsyDate = " + header.getHSYDAY() + "hsyTime = " + header.getHSYTIME());
            GardenLog.log(GardenLog.DEBUG,"spName = " + header.getSPName());
            GardenLog.log(GardenLog.DEBUG,"txId = " + header.getTxID());
            GardenLog.log(GardenLog.DEBUG,"hwsid = " + header.getHWSID());
            GardenLog.log(GardenLog.DEBUG,"hstano = " + header.getHSTANO());
            GardenLog.log(GardenLog.DEBUG,"htlid = " + header.getHTLID());
            GardenLog.log(GardenLog.DEBUG,"uuid = " + header.getUUID());
            GardenLog.log(GardenLog.DEBUG,"txnString = " + body.getTxnString());

            GardenLog.log(GardenLog.DEBUG,"Save Log start");

            DataObject esbLog = DaoFactory.getDefaultDataObject("ESB_Log");
            try{
                esbLog.setValue("HsyDay",header.getHSYDAY());
                esbLog.setValue("HsyTime",header.getHSYTIME());
                esbLog.setValue("SPName",header.getSPName());
                esbLog.setValue("HWSID",header.getHWSID());
                esbLog.setValue("UUID",header.getUUID());
                esbLog.setValue("HSTANO",header.getHSTANO());
                esbLog.setValue("HTLID",header.getHTLID());
                esbLog.setValue("HRETRN",header.getHRETRN());
                esbLog.setValue("TxId",header.getTxID());
                esbLog.setValue("RQTxnString",body.getTxnString());
                esbLog.setValue("CreateTime",DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss",DateUtil.getTodayString()));

                dao.insert(esbLog);

                GardenLog.log(GardenLog.DEBUG,"Save ESBLog success");
            }catch(Exception e) {
                e.printStackTrace();

                GardenLog.log(GardenLog.DEBUG,"Save ESBLog fail");
            }


            GardenLog.log(GardenLog.DEBUG, "Start callWebservice");
            SOAPEMFListenerStub.SoapService res = stub.operation(soap);
            GardenLog.log(GardenLog.DEBUG, "calWebservice success");

            GardenLog.log(GardenLog.DEBUG,"RS TxnString:"+res.getServiceBody().getTxnString());

            if(esbLog != null) {
                esbLog.setValue("RSTxnString",res.getServiceBody().getTxnString());
                try{
                    GardenLog.log(GardenLog.DEBUG,"Update ESBLog start");
                    dao.update(esbLog);
                    GardenLog.log(GardenLog.DEBUG,"Update  ESBLog success");
                }catch(Exception e) {
                    e.printStackTrace();

                    GardenLog.log(GardenLog.DEBUG,"Update  ESBLog fail");
                }
            }

            if ( null == res.getServiceHeader().getResponseCode() || "".equals(res.getServiceHeader().getResponseCode()) ) {
                GardenLog.log(GardenLog.DEBUG,"呼叫ESB失敗");
                GardenLog.log(GardenLog.DEBUG,"ErrorCode = " + res.getServiceError().getErrorCode());
                GardenLog.log(GardenLog.DEBUG,"ErrorMsg = " + res.getServiceError().getErrorMessage());

                rsBean.setErrorCode(res.getServiceError().getErrorCode());
                rsBean.setErrorMsg(res.getServiceError().getErrorMessage());

            } else if (res.getServiceHeader().getResponseCode().equals("0000")) {
                GardenLog.log(GardenLog.DEBUG, " ESB 成功  ");
                GardenLog.log(GardenLog.DEBUG, res.getServiceHeader().getResponseCode());
                GardenLog.log(GardenLog.DEBUG, res.getServiceBody().getTxnString());

                rsBean.setSuccess(true);
                rsBean.setServiceHeader(res.getServiceHeader());
                rsBean.setErrorCode(res.getServiceHeader().getResponseCode());
                rsBean.setTxnString("<root>"+res.getServiceBody().getTxnString()+"</root>");

            } else {
                GardenLog.log(GardenLog.DEBUG, "異常");

                String txnString = "<root>"+res.getServiceBody().getTxnString()+"</root>";

                try{
                    Document doc = DocumentHelper.parseText(txnString);
                    Element root = doc.getRootElement();

                    if(root.element("EMSGID") != null && root.element("EMSGTXT") != null) {
                        rsBean.setErrorCode(root.element("EMSGID").getText());
                        rsBean.setErrorMsg(root.element("EMSGTXT").getText());
                    }
                }catch(Exception e) {
                    e.printStackTrace();
                    rsBean.setErrorMsg("發生未知狀況："+res.getServiceError().getErrorFrom());
                }


            }

        } catch (org.apache.axis2.AxisFault e) {
            GardenLog.log(GardenLog.DEBUG, "axis2異常");
            e.printStackTrace();
        } catch (java.rmi.RemoteException e) {
            GardenLog.log(GardenLog.DEBUG, "連線異常");
            e.printStackTrace();
        }

        return rsBean;
    }

    private static String getID() {

        return DBUtils.getSequenceNextVal(SQL_GET_SEQ_VALUE);

    }

}
