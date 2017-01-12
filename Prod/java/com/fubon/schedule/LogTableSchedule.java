package com.fubon.schedule;

import java.util.List;
import java.util.Vector;

import org.quartz.Job;
import org.quartz.JobExecutionContext;

import com.fubon.utils.MessageUtils;
import com.fubon.utils.bean.MailBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataColumn;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.date.DateUtil;

public class LogTableSchedule implements Job {

	private static String ESBlogday = PropertiesUtil.loadPropertiesByClassPath("/config.properties")
			.getProperty("ESBlogday");
	private static String Maillogday = PropertiesUtil.loadPropertiesByClassPath("/config.properties")
			.getProperty("Maillogday");
	private static String OTPlogday = PropertiesUtil.loadPropertiesByClassPath("/config.properties")
			.getProperty("OTPlogday");
	private static String Draftlogday = PropertiesUtil.loadPropertiesByClassPath("/config.properties")
			.getProperty("Draftlogday");
	private static String MailAddress = PropertiesUtil.loadPropertiesByClassPath("/config.properties")
			.getProperty("MailAddress");

	public void execute(JobExecutionContext context) 
	{

		int error = 0;
		IDao dao = DaoFactory.getDefaultDao();

		SQLCommand ESBsql = new SQLCommand(
				"select * from ESB_LOG where DATEDIFF(day ,CreateTime,getdate())>=" + ESBlogday);
		SQLCommand Mailsql = new SQLCommand(
				"select * from Mail_LOG where DATEDIFF(day ,CreateTime,getdate())>=" + Maillogday);
		SQLCommand OTPsql = new SQLCommand(
				"select * from OTP_Log where DATEDIFF(day ,CreateTime,getdate())>=" + OTPlogday);
		SQLCommand Draftsql = new SQLCommand(
				"select * from draft where DATEDIFF(day ,ModifyTime,getdate())>=" + Draftlogday);

		Vector<DataObject> ESBret = new Vector<DataObject>();
		Vector<DataObject> Mailret = new Vector<DataObject>();
		Vector<DataObject> OTPret = new Vector<DataObject>();
		Vector<DataObject> Draftret = new Vector<DataObject>();

		try {
			dao.queryByCommand(ESBret, ESBsql, null, null);
			dao.queryByCommand(Mailret, Mailsql, null, null);
			dao.queryByCommand(OTPret, OTPsql, null, null);
			dao.queryByCommand(Draftret, Draftsql, null, null);

			GardenLog.log(GardenLog.DEBUG, "---Draf_Log Move and Delete---");
			for (DataObject d : Draftret) {

				List<DataColumn> colList = d.getColumnList();
				DataObject Draft = DaoFactory.getDefaultDataObject("Draft");
				DataObject Draft_History = DaoFactory.getDefaultDataObject("Draft_History");

				for (DataColumn col : colList) {
					Draft.setValue(col.getName(), col.getValue());
					Draft_History.setValue(col.getName(), col.getValue());
				}
				dao.insert(Draft_History);
				dao.delete(Draft);
			}
			GardenLog.log(GardenLog.DEBUG, "---Draf_Log Move and Delete Complete---");
			GardenLog.log(GardenLog.INFO, "---ESB_Log Delete---");
			for (DataObject d : ESBret) {
				DataObject ESB_Log = DaoFactory.getDefaultDataObject("ESB_Log");
				ESB_Log.setValue("LogId", d.getValue("LogId"));
				dao.delete(ESB_Log);
			}
			GardenLog.log(GardenLog.INFO, "---ESB_Log Delete Complete---");

			GardenLog.log(GardenLog.INFO, "---Mail_Log Delete---");
			for (DataObject d : Mailret) {
				DataObject Mail_Log = DaoFactory.getDefaultDataObject("Mail_Log");
				Mail_Log.setValue("LogId", d.getValue("LogId"));
				dao.delete(Mail_Log);
			}
			GardenLog.log(GardenLog.INFO, "---Mail_Log Delete Complete---");
			GardenLog.log(GardenLog.INFO, "---OTP_Log Move and Delete---");
			for (DataObject d : OTPret) {
				List<DataColumn> colList = d.getColumnList();
				DataObject OTP_Log = DaoFactory.getDefaultDataObject("OTP_Log");
				DataObject OTP_Log_History = DaoFactory.getDefaultDataObject("OTP_Log_History");
				for (DataColumn col : colList) {
					OTP_Log.setValue(col.getName(), col.getValue());
					OTP_Log_History.setValue(col.getName(), col.getValue());
				}
				dao.insert(OTP_Log_History);
				dao.delete(OTP_Log);

			}
			GardenLog.log(GardenLog.INFO, "---OTP_Log Move and Delete Complete---");
		} catch (Exception e) {
			error++;
			e.printStackTrace();
		}

		try {
			String[] MaillArray = MailAddress.split(",");
			for (String d : MaillArray) {
				MailBean mailBean = new MailBean("LogTable");
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
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
