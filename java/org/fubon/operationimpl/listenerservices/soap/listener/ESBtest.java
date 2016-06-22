package org.fubon.operationimpl.listenerservices.soap.listener;
import java.util.UUID;
import org.fubon.operationimpl.listenerservices.soap.listener.SOAPEMFListenerStub.SoapService;
import org.fubon.operationimpl.listenerservices.soap.listener.SOAPEMFListenerStub.*;
public class ESBtest {
	/**
	 * 利用axis2插件生成客戶端方式調用
	 */
	public static void callWebService() {
		try {
            System.out.println("Start.......");
			String url = "http://172.19.240.1:9212/ListenerServices/SOAP/Listener/SOAPEMFListener?wsdl";
			SOAPEMFListenerStub stub = new SOAPEMFListenerStub(url);
			SoapService soap = new SoapService();
			ServiceHeader_type0 header = new ServiceHeader_type0();
			ServiceBody_type0 body = new ServiceBody_type0();

			header.setHSYDAY("2016051");
			header.setHSYTIME("090155");
			header.setSPName("TFBANK-TLN");
			header.setTxID("EB032282");
			header.setHWSID("TFBANK-TLN");
			header.setHSTANO("00000008");    //sequence
			header.setHTLID("8704011"); //870分行別、4011系統代號
			header.setHRETRN("");
			header.setEncoding("BIG5");
			header.setUUID(UUID.randomUUID().toString().replaceAll("-", ""));

			body.setTxnString("<FUNC>0</FUNC>\n"
					+ "<CUST_NO>N122568021</CUST_NO>\n" + "<BUS_TYP/>\n"
					+ "<EMP_NO/>\n" + "<BDAY/>");
			body.setDataType("XML");
			body.setShouldRender(true);
			soap.setServiceHeader(header);
			soap.setServiceBody(body);

            System.out.println("callWebservice.......");
			SoapService res = stub.operation(soap);

            System.out.println("callWebservice success.......");
			if ( null == res.getServiceHeader().getResponseCode() || "".equals(res.getServiceHeader().getResponseCode()) ){
				System.out.println( " ESB 失敗  ");
				System.out.println( res.getServiceError().getErrorCode());
				System.out.println( res.getServiceError().getErrorMessage());
			} else if (res.getServiceHeader().getResponseCode().equals("0000")) {
				System.out.println( " ESB 成功  ");
				System.out.println( res.getServiceHeader().getResponseCode());
				System.out.println( res.getServiceBody().getTxnString());
			} else {
				System.out.println( " 異常   ");
			}

		} catch (org.apache.axis2.AxisFault e) {
			System.out.println( " axis2 異常  ");
			e.printStackTrace();
		} catch (java.rmi.RemoteException e) {
			System.out.println( " 連 線異常  ");
			e.printStackTrace();
		}
	}
}
