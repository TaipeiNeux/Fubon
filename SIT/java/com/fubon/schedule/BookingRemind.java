package com.fubon.schedule;

import java.util.Vector;

import org.quartz.Job;
import org.quartz.JobExecutionContext;

import com.fubon.utils.MessageUtils;
import com.fubon.utils.bean.MailBean;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.QueryConfig;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.date.DateUtil;

public class BookingRemind implements Job {
	public void execute(JobExecutionContext context) {
		try{
			//取得預約通知資料
			IDao dao = DaoFactory.getDefaultDao();
	        DataObject AplyMemberTuitionLoanDtl_Booking = DaoFactory.getDefaultDataObject("AplyMemberTuitionLoanDtl_Booking");
	        AplyMemberTuitionLoanDtl_Booking.setValue("MailBank_BKGDate", DateUtil.convert14ToDate("yyyy/MM/dd", DateUtil.addDate(DateUtil.getTodayString(), 1)));
	        AplyMemberTuitionLoanDtl_Booking.setValue("MailSendFlag", "N");
	        Vector<DataObject> ret = new Vector<DataObject>();
	        dao.query(ret, AplyMemberTuitionLoanDtl_Booking, null);
	        
	        GardenLog.log(GardenLog.DEBUG, "BookingRemind Info=>" + DateUtil.convert14ToDate("yyyy/MM/dd", DateUtil.addDate(DateUtil.getTodayString(), 1)));
	        
            for(DataObject d : ret) {
            	//寄送預約通知資料
		        MailBean mailBean = new MailBean("bank");
		        mailBean.setReceiver(d.getValue("MailReceiver"));
		        mailBean.setTitle(MessageUtils.bookingRemindTitle);
		        mailBean.addResultParam("date", d.getValue("MailBank_Date"));
		        mailBean.addResultParam("bank", d.getValue("MailBank_Bank"));
		        mailBean.addResultParam("time", d.getValue("MailBank_BKGDate") + " " + d.getValue("MailBank_BKGTime"));
		        mailBean.addResultParam("result", "<img src=\"{host}/img/na-14.png\">您已成功送出申請資料");
		        mailBean.addResultParam("document", d.getValue("MailBank_Document"));
		        mailBean.addResultParam("signBill", d.getValue("MailBank_SignBill"));
		        MessageUtils.sendEmail(mailBean);
		        
	            //更新寄送狀態
	            SQLCommand update = new SQLCommand("update AplyMemberTuitionLoanDtl_Booking set MailSendFlag = ?, MailSendTime = ? where AplyNo = ?");
	            update.addParamValue("Y");
	            update.addParamValue(DateUtil.convert14ToDate("yyyy-MM-dd HH:mm:ss", DateUtil.getTodayString()));
	            update.addParamValue(d.getValue("AplyNo"));
	            dao.queryByCommand(null,update,new QueryConfig().setExecuteType(QueryConfig.EXECUTE),null);
            }
		}catch(Exception e){
            e.printStackTrace();
			GardenLog.log(GardenLog.DEBUG, "BookingRemind Exception=>" + e.getMessage());
		}
	}
}
