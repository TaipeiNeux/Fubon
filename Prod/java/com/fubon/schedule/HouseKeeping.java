package com.fubon.schedule;

import com.neux.garden.log.GardenLog;
import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/7/16
 * Time: 下午 8:09
 * To change this template use File | Settings | File Templates.
 */
public class HouseKeeping implements Job {

    public void execute(JobExecutionContext context)
            throws JobExecutionException {
//        String name = context.getJobDetail().getJobDataMap().getString("name");

//        System.out.println("run " + name + " at " + new java.util.Date());
//        loger.warn("Executing job: executing at " + new Date());

        GardenLog.log(GardenLog.DEBUG,"into HouseKeeping");

        try {

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}

