package com.fubon.servlet;


import com.neux.garden.dbmgr.DaoFactory;
import com.fubon.utils.DBUtils;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.SQLCommand;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;
import com.neux.utility.utils.jsp.JSPUtils;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Vector;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/11
 * Time: 下午 12:01
 * To change this template use File | Settings | File Templates.
 */
public class OptionsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JSPQueryStringInfo queryStringInfo = JSPUtils.setParams(req,false);
        String action = queryStringInfo.getParam("action");

        if("getCity".equalsIgnoreCase(action)) {
            getCity(queryStringInfo,resp);
        }
        else if("getZipCode".equalsIgnoreCase(action)) {
            getZipCode(queryStringInfo,resp);
        }
        else if("getBranch".equalsIgnoreCase(action)) {
            getBranch(queryStringInfo,resp);
        }
        else if("getSchoolType1".equalsIgnoreCase(action)) {
            getSchoolType1(queryStringInfo,resp);
        }
        else if("getSchoolType2".equalsIgnoreCase(action)) {
            getSchoolType2(queryStringInfo,resp);
        }
        else if("getSchoolType3".equalsIgnoreCase(action)) {
            getSchoolType3(queryStringInfo,resp);
        }
        else if("getSchool".equalsIgnoreCase(action)) {
            getSchool(queryStringInfo,resp);
        }
        else if("getLiner".equalsIgnoreCase(action)) {
            getLiner(queryStringInfo,resp);
        }
    }

    public void getSchoolType1(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        JSONObject jsonObject = new JSONObject();
        JSONArray schooltype1 = new JSONArray();

        try{
            jsonObject.put("schooltype1",schooltype1);

            IDao dao = DaoFactory.getDefaultDao();
            SQLCommand query = new SQLCommand("select type,memo from SchoolType1");

            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();

                tmp.put("type",d.getValue("type"));
                tmp.put("typeName",d.getValue("memo"));

                schooltype1.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getSchoolType2(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        JSONObject jsonObject = new JSONObject();
        JSONArray schooltype2 = new JSONArray();

        try{
            jsonObject.put("schooltype2",schooltype2);

            IDao dao = DaoFactory.getDefaultDao();
            SQLCommand query = new SQLCommand("select type,memo from SchoolType2");

            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();

                tmp.put("type",d.getValue("type"));
                tmp.put("typeName",d.getValue("memo"));

                schooltype2.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }


    public void getSchoolType3(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        JSONObject jsonObject = new JSONObject();
        JSONArray schooltype3 = new JSONArray();

        try{
            jsonObject.put("schooltype3",schooltype3);

            IDao dao = DaoFactory.getDefaultDao();
            SQLCommand query = new SQLCommand("select type1,type2,memo from SchoolType3");

            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();

                tmp.put("type",d.getValue("type1") + d.getValue("type2"));
//                tmp.put("type",d.getValue("type1"));
                tmp.put("typeName",d.getValue("memo"));

                schooltype3.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getSchool(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String type1 = queryStringInfo.getParam("type1");
        String type2 = queryStringInfo.getParam("type2");
        String type3 = queryStringInfo.getParam("type3");

        JSONObject jsonObject = new JSONObject();
        JSONArray school = new JSONArray();

        try{
            jsonObject.put("school",school);
            //System.out.println("@@@@@@@@@@"+type3);
            if(type3.length() != 1&&type3.length() >0) {
                type3 = type3.substring(0,1);
            }
          

            IDao dao = DaoFactory.getDefaultDao();
            SQLCommand query = new SQLCommand("select SchoolCode,SchoolName,StudyYears from SchoolInfo where SchoolType1 = ? and SchoolType2 = ? and SchoolType3 = ? group by SchoolCode,SchoolName,StudyYears");
            query.addParamValue(type1);
            query.addParamValue(type2);
            query.addParamValue(type3);

            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();

                tmp.put("schoolId",d.getValue("SchoolCode"));
                tmp.put("schoolName",d.getValue("SchoolName"));
                tmp.put("studyYears",d.getValue("StudyYears"));

                school.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getBranch(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String zipcode = queryStringInfo.getParam("zipcode");

        JSONObject jsonObject = new JSONObject();
        JSONArray branches = new JSONArray();

        try{
            jsonObject.put("branches",branches);

            IDao dao = DaoFactory.getDefaultDao();

            //先查類別對應的時間
            Vector<DataObject> typeResult = new Vector<DataObject>();
            dao.query(typeResult,DaoFactory.getDefaultDataObject("AplyTuitionLoan_ExpectTimeType"), null);

            Map<String,String> typeMap = new HashMap<String,String>();
            for(DataObject d : typeResult) {
                typeMap.put(d.getValue("Type"),d.getValue("Memo"));
            }


            Map<String,String> searchMap = new LinkedHashMap<String, String>();
            searchMap.put("b.ZipCode",zipcode);

            Vector<DataObject> ret = ProjUtils.getBranch(searchMap,dao);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();

                String expectTimeType = d.getValue("EXPECTTIMETYPE");

                tmp.put("areaCode",d.getValue("AREACODE"));    // 分行所在地區代碼
                tmp.put("areaName",d.getValue("AREANAME"));     // 分行所在地區名稱
                tmp.put("branchId",d.getValue("BranchId"));    // 分行代碼
                tmp.put("branchName",d.getValue("BranchName")); // 分行名稱
                tmp.put("addr",d.getValue("Addr"));          // 分行地址
                tmp.put("tel",d.getValue("Tel"));              // 分行電話
                tmp.put("fax",d.getValue("Fax"));              // 分行傳真
                tmp.put("periodPeoples",d.getValue("PERIODPEOPLES"));    // 分行提醒人數
                tmp.put("expectTimeType",expectTimeType);   // 分行對保時段類別

                //營業時間
                String businessDay = typeMap.get(expectTimeType);
                tmp.put("businessDay",businessDay);

                //抓對保期間
                tmp.put("period",d.getValue("StartDate") + "-" + d.getValue("EndDate"));

//                HashMap<String,String> eduYearMap = ProjUtils.getEduYearInfo(dao,null);
//                String semester_sDate = eduYearMap.get("semester_sDate");
//                String semester_eDate = eduYearMap.get("semester_eDate");
//
//                String startYY = semester_sDate.substring(0,4);
//                startYY = ProjUtils.toBirthday(startYY);
//                String startMM = semester_sDate.substring(4,6);
//                String startDD = semester_sDate.substring(6,8);
//                String endYY = semester_eDate.substring(0,4);
//                endYY = ProjUtils.toBirthday(endYY);
//                String endMM = semester_eDate.substring(4,6);
//                String endDD = semester_eDate.substring(6,8);
//
//                tmp.put("period",startYY + "/" + startMM + "/" + startDD + "-" + endYY + "/" + endMM + "/" + endDD);


                branches.put(tmp);
            }



        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getCity(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String bindBranch = queryStringInfo.getParam("bindBranch");
        JSONObject jsonObject = new JSONObject();
        JSONArray cities = new JSONArray();

        try{
            jsonObject.put("cities",cities);

            IDao dao = DaoFactory.getDefaultDao();

            //抓縣市有可能會只需要找有分行的資料，故用一個bindBranch區分(從要長地圖的都會帶bindBranch=Y)
            SQLCommand query = null;
            if("Y".equalsIgnoreCase(bindBranch)) {
                query = new SQLCommand("select a.CityId,a.CityName from City a , ZipCode b , Branch c\n" +
                        "where 1=1\n" +
                        "and a.CityId = b.CityId\n" +
                        "and b.ZipCode = c.ZipCode\n" +
                        "group by a.CityId,a.CityName");
            }
            else {
                query = new SQLCommand("select cityid,cityname from city");
            }

            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();

                tmp.put("cityId",d.getValue("cityId"));
                tmp.put("cityName",d.getValue("cityName"));

                cities.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getZipCode(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String bindBranch = queryStringInfo.getParam("bindBranch");
        String cityId = queryStringInfo.getParam("cityId");

        JSONObject jsonObject = new JSONObject();
        JSONArray zipcodes = new JSONArray();

        try{
            jsonObject.put("zipcodes",zipcodes);

            IDao dao = DaoFactory.getDefaultDao();
            //抓縣市有可能會只需要找有分行的資料，故用一個bindBranch區分(從要長地圖的都會帶bindBranch=Y)
            SQLCommand query = null;
            if("Y".equalsIgnoreCase(bindBranch)) {
                query = new SQLCommand("select a.ZipCode,a.AreaName from ZipCode a , Branch b\n" +
                        "where 1=1\n" +
                        "and a.ZipCode = b.ZipCode\n" +
                        "and a.CityId = ?\n" +
                        "group by a.ZipCode,a.AreaName");
            }
            else {
                query = new SQLCommand("select zipcode,areaname from zipcode where cityid = ?");
            }


            query.addParamValue(cityId);
            Vector<DataObject> ret = new Vector<DataObject>();
            dao.queryByCommand(ret,query,null,null);

            for(DataObject d : ret) {
                JSONObject tmp = new JSONObject();

                tmp.put("zipcode",d.getValue("zipcode"));
                tmp.put("areaName",d.getValue("areaName"));

                zipcodes.put(tmp);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }

    public void getLiner(JSPQueryStringInfo queryStringInfo, HttpServletResponse resp) {

        String zipCode = queryStringInfo.getParam("zipCode");

        JSONObject jsonObject = new JSONObject();
        JSONArray liners = new JSONArray();

        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try{
            jsonObject.put("liners",liners);

            String env = PropertiesUtil.loadPropertiesByClassPath("/config.properties").getProperty("env");

            //如果不是SIT就接Oracle的db
            if(!"sit".equalsIgnoreCase(env)) {
                conn = DBUtils.getConnection(DBUtils.PIBDataSource);

                ps = conn.prepareStatement("select * from VILLAGE where ZIPCODE = ?");
                ps.setString(1,zipCode);
                rs = ps.executeQuery();
                while(rs.next()) {
                    JSONObject tmp = new JSONObject();

                    tmp.put("linerId",rs.getString("VILLAGE_NAME") + "");
//                    tmp.put("linerId",rs.getInt("VILLAGE_KEY") + "");
                    tmp.put("linerName",rs.getString("VILLAGE_NAME"));

                    liners.put(tmp);
                }

            }
            else {

                IDao dao = DaoFactory.getDefaultDao();
                SQLCommand query = new SQLCommand("select aplyaddr1_2,aplyaddr1_2 \n" +
                        "from AplyMemberTuitionLoanDtl \n" +
                        "where aplyaddr1_2 <> ''\n" +
                        "group by aplyaddr1_2");
                Vector<DataObject> ret = new Vector<DataObject>();
                dao.queryByCommand(ret,query,null,null);

                for(DataObject d : ret) {
                    JSONObject tmp = new JSONObject();

                    tmp.put("linerId",d.getValue("aplyaddr1_2"));
                    tmp.put("linerName",d.getValue("aplyaddr1_2"));

                    liners.put(tmp);
                }
            }


        }catch(Exception e) {
            e.printStackTrace();
        }finally{
            try{
                if(rs != null) rs.close();

            }catch(Exception ex) {
                ;
            }

            try{
                if(ps != null) ps.close();
            }catch(Exception ex) {
                ;
            }

            try{
                if(conn != null) conn.close();
            }catch(Exception ex) {
                ;
            }
        }



        JSPUtils.downLoadByString(resp,getServletContext().getMimeType(".json"),jsonObject.toString(),false);
    }
}
