package com.fubon.schedule;

import com.fubon.listener.SessionLoginBean;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;

import com.neux.garden.log.GardenLog;

import com.neux.utility.utils.PropertiesUtil;

import java.sql.DriverManager;
import java.sql.ResultSet;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;







/* Created with IntelliJ IDEA.
  User: Titan
  Date: 2016/7/16
  Time: 下午 8:09
  To change this template use File | Settings | File Templates.*/

public class HouseKeeping implements Job 
{

	public static void main(String[] args) throws Exception
    {
//        String name = context.getJobDetail().getJobDataMap().getString("name");

//        System.out.println("run " + name + " at " + new java.util.Date());
//        loger.warn("Executing job: executing at " + new Date());
		
		//SessionLoginBean sessionLoginBean = new SessionLoginBean();
		
    	

        GardenLog.log(GardenLog.DEBUG,"into HouseKeeping");

    }

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// TODO Auto-generated method stub
		
	}

	

}

