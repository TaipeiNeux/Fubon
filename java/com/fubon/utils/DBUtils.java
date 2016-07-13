package com.fubon.utils;

import com.neux.garden.log.GardenLog;
import com.neux.utility.orm.ORMAPI;
import com.neux.utility.orm.hdl.connection.SQLConnection;
import com.neux.utility.orm.hdl.connection.module.IConnection;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Hashtable;

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
}
