package com.fubon.schedule;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.fubon.htmltopdf.EletronictoPdf;
import com.fubon.utils.ElectronicPayUtils;
import com.fubon.utils.MessageUtils;
import com.fubon.utils.ProjUtils;
import com.fubon.utils.bean.MailBean;
import com.fubon.webservice.WebServiceAgent;
import com.fubon.webservice.bean.RQBean;
import com.fubon.webservice.bean.RSBean;
import com.neux.garden.authorization.LoginUserBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataColumn;
import com.neux.utility.orm.bean.DataObject;

import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;

public class EpaytoPdf extends HttpServlet implements Job {
	public LoginUserBean loginUserBean = null;
	private String MailAddress = PropertiesUtil.loadPropertiesByClassPath("/config.properties")
			.getProperty("MailAddress");

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException 
	{
		

		int error=0;			
		IDao dao = DaoFactory.getDefaultDao();		
		
		try 
		{
		ParseTxtData pt = new ParseTxtData();		
		
		 
		SQLCommand sql = new SQLCommand("select * from e_pay_note as a join Student_UserProfile as b on a.CUST_NO=b.IdNo join Student_UserProfileDetail as c on a.CUST_NO=c.AplyIdNo where C.PDF IS NULL or c.PDF !='P' " );
		Vector<DataObject> ret = new Vector<DataObject>();
		
		
		dao.queryByCommand(ret, sql, null, null);
		
		for (DataObject d : ret) 
		{
				DataObject Student_UserProfileDetail = DaoFactory.getDefaultDataObject("Student_UserProfileDetail");
			   LoginUserBean loginUserBean=new LoginUserBean();
			   List<DataColumn> colList = d.getColumnList();
			   
			   for(DataColumn col : colList) 
			   {				
				  loginUserBean.addCustomizeValue(col.getName(),col.getValue());
				  Student_UserProfileDetail.setValue(col.getName(), col.getValue());
			   }
			  
			   String[] isEtabs=isETab(d.getValue("CUST_NO"));
			    loginUserBean.setUserName(d.getValue("Applicant"));			   
			    loginUserBean.setUserId(d.getValue("CUST_NO"));
			    loginUserBean.setSuccess(true);
			    loginUserBean.addCustomizeValue("isEtabs",isEtabs[0]);
			    loginUserBean.addCustomizeValue("acnoSlList",isEtabs[1]);		    
			    
			    JSONObject jsonObject = ElectronicPayUtils.getElectronicPay(loginUserBean); 			    
									
			    EletronictoPdf pdf =new EletronictoPdf(jsonObject,d.getValue("CUST_NO").trim());			    
			   
			    Student_UserProfileDetail.setValue("PDF", "P");				 
			    dao.update(Student_UserProfileDetail);    
			
	        }
	        }
		catch (JSONException e) 
		{					
			error++;
			e.printStackTrace();
		}
		catch (Exception e)
		{			
			error++;
			e.printStackTrace();
		}
		
			try
			{
			
			String[] MaillArray = MailAddress.split(",");
				for (String d : MaillArray) {
					 MailBean mailBean = new MailBean("planreport");
					mailBean.setReceiver(d);
					mailBean.setTitle(MessageUtils.LogTable);
					if (error == 0)
						mailBean.addResultParam("result", "成功");
					else
						mailBean.addResultParam("result", "失敗");
					mailBean.addResultParam("date",
							DateUtil.convert14ToDate("yyyy/MM/dd HH:mm:ss", DateUtil.getTodayString()));

					MessageUtils.sendEmail(mailBean,"");
             }
			}
			catch (Exception e )
			{
				e.printStackTrace();
			}
		
		
	}
	private String[] isETab(String id) {
		boolean isETab = false;
		String acnoSlList = "";
		String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");
		if (!"sit".equalsIgnoreCase(env)) {
			RQBean rqBean = new RQBean();
			rqBean.setTxId("EB032282");
			rqBean.addRqParam("FUNC", "0");
			rqBean.addRqParam("CUST_NO", id);
			rqBean.addRqParam("BUS_TYP", "");
			rqBean.addRqParam("EMP_NO", "");
			rqBean.addRqParam("BDAY", "");

			RSBean rsBean = WebServiceAgent.callWebService(rqBean);
			if (rsBean.isSuccess()) {
				String response = rsBean.getTxnString();

				Document doc = null;
				try {
					doc = DocumentHelper.parseText(response);
				} catch (DocumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				Element root = doc.getRootElement();
				String custSts = root.element("CUST_STS").getText().trim();
				GardenLog.log(GardenLog.DEBUG, "custSts = " + custSts);
				if ("Y".equalsIgnoreCase(custSts))
					isETab = true;
			}
		} else {
			isETab = true;
			acnoSlList = "20003210005097"; // testing
			// isArrearChk++;//testing
		}
		String isEtabs = isETab ? "Y" : "N";
		// String result[]=null ;
		return new String[] { isEtabs, acnoSlList };

		// return result;

	}

}
