package com.fubon.schedule;

import com.neux.garden.dbmgr.DaoFactory;
import com.neux.utility.orm.ORMAPI;
import com.neux.utility.orm.bean.DataColumn;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.PropertiesUtil;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/6/27
 * Time: 上午 11:26
 * To change this template use File | Settings | File Templates.
 */
public class ParseTxtData 
{
    private static String charset = "CP950";
    public ParseTxtData() throws Exception 
    {
    	 
              ORMAPI.openORM();
         

          //String filePath = "E:\\SVN\\2_project\\2016\\富邦-學貸\\客戶提供文件\\電子繳款單的規格及測試檔案\\SLBM013\\SLBM013.txt";
           String filePath=PropertiesUtil.loadPropertiesByClassPath("/config.properties")
      			.getProperty("SLBM013");
          //String filePath="";
           File file=new File(filePath);
           if(file.exists())
          insertDB(filePath);
           else           
        	   System.out.println("SLBM013 File is not exists");
           
          
    }

    public static void insertDB(String filePath) throws Exception {
        Map<String, String> fieldMap1 = new LinkedHashMap<String, String>();
        fieldMap1.put("CUST_NO", "CHAR(11)");
        fieldMap1.put("DATE", "CHAR(07)");
        fieldMap1.put("NAME", "CHAR(10)");
        fieldMap1.put("SEX", "CHAR(06)");
        fieldMap1.put("ZIP_COD", "CHAR(05)");
        fieldMap1.put("ADDR", "CHAR(100)");
        fieldMap1.put("DATE_YM", "CHAR(05)");
        fieldMap1.put("LOAN_BAL_YM", "CHAR(05)");
        fieldMap1.put("LOAN_BAL", "CHAR(07)");
        fieldMap1.put("INT_EDATE", "CHAR(07)");
        fieldMap1.put("TOT_TOT_AMT", "CHAR(06)");
        fieldMap1.put("PAY_END_DATE", "CHAR(07)");
        fieldMap1.put("ACNO_MRK", "CHAR(16)");
        fieldMap1.put("ARR_CNT", "CHAR(02)");

        //ARR
        Map<String, String> fieldMap2 = new LinkedHashMap<String, String>();
        fieldMap2.put("ACNO_SL", "CHAR(16)");
        fieldMap2.put("PRN_AMT", "CHAR(06)");
        fieldMap2.put("INT_AMT", "CHAR(05)");
        fieldMap2.put("PNT_DLY_AMT", "CHAR(05)");
        fieldMap2.put("TOT_AMT", "CHAR(06)");

        Map<String, String> fieldMap3 = new LinkedHashMap<String, String>();
        fieldMap3.put("BILLS_CHECK", "CHAR(01)");
        fieldMap3.put("MAIL_CHECK", "CHAR(01)");
        fieldMap3.put("MAIL", "CHAR(40)");
        fieldMap3.put("CEL_NO", "CHAR(20)");
        fieldMap3.put("FILE_NAME", "CHAR(01)");
        fieldMap3.put("BDAY", "CHAR(08)");
        fieldMap3.put("ENCY_CHECK", "CHAR(01)");
        fieldMap3.put("BDAY_ROC", "CHAR(07)");

        //ARR_S
        Map<String, String> fieldMap4 = new LinkedHashMap<String, String>();
        fieldMap4.put("ACNO_SL_S", "CHAR(16)");
        fieldMap4.put("TOT_AMT_S", "CHAR(06)");

//        StringBuilder createSql = new StringBuilder();
//        createSql.append("CREATE TABLE `e_pay_note` (");
//        for(String field : fieldMap1.keySet()){
//            createSql.append("`" + field + "` " + fieldMap1.get(field) + ",");
//        }
//        for(int i = 1; i <= 12; i++){
//            for(String field : fieldMap2.keySet()){
//                createSql.append("`" + field + i + "` " + fieldMap2.get(field) + ",");
//            }
//        }
//        for(String field : fieldMap3.keySet()){
//            createSql.append("`" + field + "` " + fieldMap3.get(field) + ",");
//        }
//        for(int i = 1; i <= 12; i++){
//            for(String field : fieldMap4.keySet()){
//                createSql.append("`" + field + i + "` " + fieldMap4.get(field) + ",");
//            }
//        }
//        createSql.deleteCharAt(createSql.length() - 1);
//        createSql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8;");

//		System.out.println(createSql.toString());

        File file = new File(filePath);

        String datas = FileUtils.readFileToString(file, charset);
        String[] lines = getTokens(datas,"\n");

        int[] lens1 = {11, 7, 10, 6, 5, 100, 5, 5, 7, 7, 6, 7, 16, 2};
        int[] lens2 = {16, 6, 5, 5, 6};//*12
//        int[] lens3 = {1, 1, 40, 20, 1, 8, 1, 7};
        int[] lens3 = {1};
        int[] lens4 = {16, 6};//*12

        IDao dao = DaoFactory.getDefaultDao();
        for(String data : lines) {
            if(!StringUtils.isNotBlank(data)) {
                continue;
            }

            byte[] bytes = data.getBytes(charset);
            int startIndex = 0;

            List<String> dataList = new ArrayList<String>();
            startIndex = parseLen(dataList, lens1, startIndex, bytes);
            System.out.println("-----------------------------");
            for(int i = 0; i < 12; i++){
                System.out.println("i="+i+">>>>>");
                startIndex = parseLen(dataList, lens2, startIndex, bytes);
            }
            System.out.println("-----------------------------");
            startIndex = parseLen(dataList, lens3, startIndex, bytes);
            for(int i = 0; i < 7; i++){
                dataList.add("");
            }
            System.out.println("-----------------------------");
            for(int i = 0; i < 12; i++){
                System.out.println("i="+i+">>>>>");
                startIndex = parseLen(dataList, lens4, startIndex, bytes);
            }

            DataObject d = DaoFactory.getDefaultDataObject("e_pay_note");
            int count = 0;
            for(DataColumn column : d.getColumnList()){
                d.setValue(column.getName(), dataList.get(count));
                count++;
            }
            try {
                dao.insert(d);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

   /* public static void main(String[] args) throws Exception {

        try {
            ORMAPI.openORM();
        } catch (Exception e) {
            e.printStackTrace();
        }

        //String filePath = "E:\\SVN\\2_project\\2016\\富邦-學貸\\客戶提供文件\\電子繳款單的規格及測試檔案\\SLBM013\\SLBM013.txt";
         String filePath=PropertiesUtil.loadPropertiesByClassPath("/config.properties")
    			.getProperty("printurl");
        //String filePath="";
        insertDB(filePath);
    }*/

    public static int parseLen(List<String> list, int[] lens, int startIndex, byte[] bytes)
            throws UnsupportedEncodingException{

        for(int len : lens){
            int index = startIndex + len;
            int iLen = index - startIndex;
            byte[] attr = new byte[iLen];
            System.arraycopy(bytes,startIndex,attr,0,iLen);
            String value = new String(attr, charset);
            System.out.println(len + ": (" + value + ")");
            list.add(value.trim());
            startIndex += len;
        }

        return startIndex;
    }

    public static String[] getTokens(String sData, String sDelim) 
    {
        @SuppressWarnings("unused")
        String sLastToken;
        String sToken;
        if (sData == null) {
            return ArrayUtils.EMPTY_STRING_ARRAY;
        }
        ArrayList<String> tokens = new ArrayList<String>();
        int iDataLen = sData.length();
        int iDelimLen = sDelim.length();
        int iLeft = 0;
        int iRight = sData.indexOf(sDelim);
        while (iRight >= 0) {
            sToken = sData.substring(iLeft, iRight).trim();
            tokens.add(sToken);
            iLeft = iRight + iDelimLen;
            iRight = sData.indexOf(sDelim, iLeft);
        }
        if (iLeft < iDataLen) {
            sToken = sData.substring(iLeft, iDataLen);
            tokens.add(sToken);
        }
        if (iDataLen >= iDelimLen && (sLastToken = sData.substring(iDataLen - iDelimLen, iDataLen)).equals(sDelim)) {
            tokens.add("");
        }
        return tokens.toArray(new String[tokens.size()]);
    }
}
