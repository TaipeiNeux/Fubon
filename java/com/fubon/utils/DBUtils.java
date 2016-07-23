package com.fubon.utils;

import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.ORMAPI;
import com.neux.utility.orm.hdl.connection.SQLConnection;
import com.neux.utility.orm.hdl.connection.module.IConnection;
import com.neux.utility.utils.date.DateUtil;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Hashtable;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/27
 * Time: 下午 5:58
 * To change this template use File | Settings | File Templates.
 */
public class DBUtils {

    public static final String PIBDataSource = "jdbc/pib";

    public static Connection getConnection(String jndiName) {
        DataSource ds = null;

        try{

            GardenLog.log(GardenLog.DEBUG,"===========DBUtils init==============");
            Hashtable parms = new Hashtable();
            parms.put(Context.INITIAL_CONTEXT_FACTORY,
                    "com.ibm.websphere.naming.WsnInitialContextFactory");
            InitialContext ctx = new InitialContext(parms);
            ds = (DataSource)ctx.lookup(jndiName);
            GardenLog.log(GardenLog.DEBUG,"ds = " + ds);
            GardenLog.log(GardenLog.DEBUG,ds.getClass().getName());

            return ds.getConnection();

        }catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static String getSequenceNextVal(String sql) {
        int seq = 1;

        Connection connection = null;
        PreparedStatement pStatement = null;
        try {
            IConnection iConnection = ORMAPI.getConnection("db");
            connection = ((SQLConnection) iConnection).getConnection();

            pStatement = connection.prepareStatement(sql);
            ResultSet resultSet = pStatement.executeQuery();

            if (resultSet.next()) seq = resultSet.getInt(1);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (pStatement != null) pStatement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }


            try {
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        String result = String.format("%06d", seq);

        if(result.length() != 7) {
            result = StringUtils.leftPad(result, 7, "0");
        }

        return result;
    }

    public static String getPibBranchName(String branchId) {

        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try{

            conn = getConnection(PIBDataSource);

            ps = conn.prepareStatement("select * from BRANCH where BRANCH_ID = ?");
            ps.setString(1,branchId);
            rs = ps.executeQuery();
            if(rs.next()) {
                return rs.getString("BRANCH_NAME");
            }
        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            try {
                if (rs != null) rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

            try {
                if (ps != null) ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

            try {
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    //是否為逾期的客戶
    public static boolean isDelayCustomer(String account) {

        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try{

            conn = getConnection(PIBDataSource);

            ps = conn.prepareStatement("select * from CUSTOMER_LOAN_ACCOUNT where loan_account = ?");
            ps.setString(1,account);
            rs = ps.executeQuery();
            if(rs.next()) {
                return true;
            }
        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            try {
                if (rs != null) rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

            try {
                if (ps != null) ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }

            try {
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return false;
    }

    //取得當月非營業日
    public static void getNoBusinessDay(String yyyy,String MM,List<String> noBusinessDays) {

        Connection conn = null;

        try{

            conn = getConnection(PIBDataSource);

            //抓近三個月的
            for(int i=0;i<3;i++) {
                PreparedStatement ps = null;
                ResultSet rs = null;
                try{
                    String yyyyMM = yyyy + MM;
                    String startDate = yyyyMM + "01000000";

                    startDate = DateUtil.addDate(startDate,Calendar.MONTH,i);
                    String endDate = DateUtil.addDate(startDate, Calendar.MONTH,1);

                    startDate = DateUtil.convert14ToDate("yyyy-MM-dd",startDate);
                    endDate = DateUtil.convert14ToDate("yyyy-MM-dd",endDate);

                    //取回來的是像：2016-07-03 00:00:00
                    ps = conn.prepareStatement("select CALENDAR_DATE from BUSINESS_DAY where CALENDAR_DATE >= ? and CALENDAR_DATE <= ? and FLAG = ?");
                    ps.setDate(1, new Date(DateUtil.formatString2Date(startDate, DateUtil.getDateFormat(startDate)).getTime()));
                    ps.setDate(2, new Date(DateUtil.formatString2Date(endDate, DateUtil.getDateFormat(endDate)).getTime()));
                    ps.setInt(3, 0);
                    rs = ps.executeQuery();
                    while(rs.next()) {
                        String date = rs.getString("CALENDAR_DATE");

                        //轉成14碼後再轉成日期格式
                        date = DateUtil.convertDateTo14(date);
                        date = DateUtil.convert14ToDate("yyyy-MM-dd",date);

                        //放入的是只有yyyy-MM-dd格式
                        noBusinessDays.add(date);
                    }
                }catch(Exception ex) {
                    ex.printStackTrace();
                }finally{
                    try {
                        if (rs != null) rs.close();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }

                    try {
                        if (ps != null) ps.close();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }

                }

            }


        }catch(Exception e) {
            e.printStackTrace();
        }finally {

            try {
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }
}
