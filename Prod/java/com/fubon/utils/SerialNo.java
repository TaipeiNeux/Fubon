package com.fubon.utils;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/3
 * Time: 下午 7:25
 * To change this template use File | Settings | File Templates.
 */
public class SerialNo {
//    public static final String NextNum$Table_SSL = "NextNum_SSL";                                  // SSL轉帳
//    public static final String NextNum$Table_SET = "NextNum_SET";                                  // SET轉帳
//    public static final String NextNum$Table_NonSET = "NextNum_NonSET";                            // NonSET轉帳
//    public static final String NextNum$Table_Mfund = "NextNum_Mfund";                              // 基金交易
//    public static final String NextNum$Table_TuitionLoanAplyNo = "NextNum_TuitionLoanAplyNo";      // 就學貸款申請
//    public static final String NextNum$Table_TuitionLoanVerifyNo = "NextNum_TuitionLoanVerifyNo";  // 就學貸款對保
//    public static final String NextNum$Table_AplyLnIntrst = "NextNum_AplyLnIntrst";                // 放款利息或本息代扣繳帳戶變更申請
//    public static final String NextNum$Table_ATM = "NextNum_ATM";                                  // 網路 ATM
//    public static final String NextNum$Table_VCrdtCrdAplyNo = "NextNum_VCrdtCrdAply";              // 虛擬信用卡
//    public static final String NextNum$Table_MFD = "NextNum_MFD";                                  // 基金交易(to 富銀 eChannel)
//    public static final String NextNum$Table_eChannelSerialNo = "NextNum_EChannel";                // eChannel交易流水號
//    public static final String NextNum$Table_ICCardLog = "NextNum_ICCardLogKey";                   // 晶片金融卡、OTP 交易記錄
//    public static final String NextNum$Table_ATMParkCar = "NextNum_ATMParkCar";                    // 網路ATM代繳停車費
//    public static final String NextNum$Table_BatchRevTrsfSSL = "NextNum_BatchRevTrsfSSL";          // 台幣整批預約轉帳批號
//    public static final String NextNum$Table_CST = "NextNum_CST";                                  // 公教
//    public static final String NextNum$Table_CST_InterestUpload = "NextNum_CST_InterestUpload";    // 公教檔案上傳
//    public static final String NextNum$Table_MOMO_SN = "NextNum_MOMO_SN";                          // MOMO 抽獎序號
//    public static final String NextNum$Table_AplyFrgnRmt = "NextNum_AplyFrgnRmt";                  // 國外匯出匯款&IBA快捷匯款
//    public static final String NextNum$Table_MiddlewareSerialNo = "NextNum_Middleware";            // Middleware交易流水號
//    public static final String NextNum$Table_RSA_TxCode = "NextNum_RSA_TxCode";                    // RSAObject交易流水號
//    public static final String NextNum$Table_ACHTxSN = "NextNum_ACH_TxCode";                       // 市水作業
//    public static final String NextNum$Table_FileUploadTxSN = "NextNum_FileUpload_TxCode";         // 檔案上傳
//    public static final String NExtNum$Talbe_NationCodeTxCode = "NextNum_NationCode_TxCode";       // 國家代碼維護
//    public static final String NextNum$Table_PR18 = "NextNum_PR18";                                // 薪資整批上傳批號
//    public static final String NextNum$Table_SL_QA_Topic = "NextNum_SL_QA_Topic";                  // 就學貸款Q&A類型
//    public static final String NextNum$Table_SL_QA_Data = "NextNum_SL_QA_Data";                    // 就學貸款Q&A資料
//    public static final String NExtNum$Talbe_EFCEPaper = "NextNum_EFCEPaper";                      // [e理專]電子報
//    public static final String NextNum$Table_RevOpenAccount_SerialNo = "NextNum_RevOpenAccount_SerialNo";  // 網銀預約開戶-預約序號
//    public static final String NextNum$Table_SystemSessionId = "NextNum_SystemSessionId";          // 系統SessionId流水號
//    public static final String NExtNum$Talbe_PromoPopup = "NextNum_PromoPopup";                    // 網銀市場重大訊息公告
//    public static final String NExtNum$Talbe_SIEPaper = "NextNum_SIEPaper";                        // SI組合式商品
//    public static final String NExtNum$Talbe_FundNews = "NextNum_FundNews";                        // 集管/基金公告訊息
//    public static final String NExtNum$Talbe_FundProject = "NextNum_FundProject";                  // 集管/基金公告訊息
//
//    /**
//     * SerialNo 建構子註解。
//     */
//    public SerialNo() {
//        super();
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 03:01:21)
//     * @return java.lang.String
//     * @param base10Num java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    private static String base10To36(String base10Num) throws Exception {
//        String base36Num = "";
//        String mapNum = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//
//        long num = Long.parseLong(base10Num);
//
//        while (num >= 36) {
//            int remainder = 0;
//            remainder = Integer.parseInt(Long.toString(num % 36));
//            base36Num = mapNum.charAt(remainder) + base36Num;
//            num = num / 36;
//        }
//
//        return base36Num;
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forAplyFrgnRmt() throws Exception {
//        return getNumericSerialNo(NextNum$Table_AplyFrgnRmt, "", 8);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2004/4/1 下午 03:38:32)
//     * @return java.lang.String
//     */
//    public static String forAplyLnIntrst() throws Exception {
//        return getSerialNo(NextNum$Table_AplyLnIntrst, "", 10);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forATMHost() throws Exception {
//        return getNumericSerialNo(NextNum$Table_ATM, "", 6);
//    }
//    public static String forATMParkCar() throws Exception {
//        return getNumericSerialNo(NextNum$Table_ATMParkCar, "", 8);
//    }
//    /**
//     * [台幣整批預約轉帳] 產生批號方法(流水號)
//     * 建立日期： (2006/2/13 下午 05:38:36)
//     */
//    public static String forBatchRevTrsfSSL() throws Exception {
//        return getNumericSerialNo(NextNum$Table_BatchRevTrsfSSL, "", 6);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forCST() throws Exception {
//        return getNumericSerialNo(NextNum$Table_CST, "", 8);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forCST_InterestUpload() throws Exception {
//        return getNumericSerialNo(NextNum$Table_CST_InterestUpload, "", 800000, 999999, 1);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forHSTANO() throws Exception {
//        return getNumericSerialNo(NextNum$Table_eChannelSerialNo, "", 7);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forHSTANO_MW() throws Exception {
//        //return getNumericSerialNo(NextNum$Table_MiddlewareSerialNo, "", 7);
//        // 舊網銀：0000000~4999999；新網銀：5000000~9999999
//        return getNumericSerialNo(NextNum$Table_MiddlewareSerialNo, "", 0, 4999999, 1);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2004/4/1 下午 03:38:32)
//     * @return java.lang.String
//     */
//    public static String forICCardLog() throws Exception {
//        return getSerialNo(NextNum$Table_ICCardLog, "", 10);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forMFD() throws Exception {
//        return getSerialNo(NextNum$Table_MFD, "", 10);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forMfundHost() throws Exception {
//        return getSerialNo(NextNum$Table_Mfund, "", 6);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forMOMO_SN() throws Exception {
//        return getNumericSerialNo(NextNum$Table_MOMO_SN, "", 1, 999999, 1);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forNonSET() throws Exception {
//        return getSerialNo(NextNum$Table_NonSET, "NB3", 8);
//    }
//
//    public static String forPR18()throws Exception{
//        return getNumericSerialNo(NextNum$Table_PR18, "", 6);
//    }
//
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forRSA_TxCode() throws Exception {
//        return getNumericSerialNo(NextNum$Table_RSA_TxCode, "", 8);
//    }
//
//    // 網銀預約開戶-預約序號(VARCHAR(8))
//    public static String forRevOpenAccount_SerialNo() throws Exception {
//        // 序號自000000~999999共一百萬組，再補成長度八位(單日不得重複)
//        return "00" + getNumericSerialNo(NextNum$Table_RevOpenAccount_SerialNo, "", 6);
//    }
//
//    // 系統SessionId流水號
//    public static String forSystemSessionId() throws Exception {
//        return getNumericSerialNo(NextNum$Table_SystemSessionId, "", 5);
//    }
//
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forSET() throws Exception {
//        return getSerialNo(NextNum$Table_SET, "NB2", 8);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    public static String forSSL() throws Exception {
//        return getSerialNo(NextNum$Table_SSL, "NB1", 8);
//    }
//
//    public static String forSL_QA_Data() throws Exception {
//        return getNumericSerialNo(NextNum$Table_SL_QA_Data, "", 5);
//    }
//
//    public static String forSL_QA_Topic() throws Exception {
//        return getNumericSerialNo(NextNum$Table_SL_QA_Topic, "", 10);
//    }
//
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2003/7/10 下午 05:40:06)
//     * @return java.lang.String
//     * @param curDate java.lang.String
//     */
//    public static String forTuitionLoanAplyNo(String curDate) throws Exception {
//        return getSerialNo(NextNum$Table_TuitionLoanAplyNo, "TTN-", 10);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2003/7/10 下午 05:40:06)
//     * @return java.lang.String
//     * @param curDate java.lang.String
//     */
//    public static String forTuitionLoanVerifyNo() throws Exception {
//        //return getNumericSerialNo(NextNum$Table_TuitionLoanVerifyNo, "", 6);
//        return getNumericSerialNo(NextNum$Table_TuitionLoanVerifyNo, "", 1, 999999, 1);
//    }
//
//    /**
//     * 市水作業
//     * @return
//     * @throws Exception
//     * @throws ServiceException
//     */
//    public static String forACHTxSN()throws Exception{
//        return getNumericSerialNo(NextNum$Table_ACHTxSN, "A", 6);
//    }
//
//    /**
//     * 檔案上傳
//     * @return
//     * @throws Exception
//     * @throws ServiceException
//     */
//    public static String forFileUpLoadTxSN()throws Exception{
//        return getNumericSerialNo(NextNum$Table_FileUploadTxSN, "F", 6);
//    }
//
//    /**
//     * 國家代碼維護
//     * @return
//     * @throws Exception
//     * @throws ServiceException
//     */
//    public static String forNationCodeTxSN() throws Exception {
//        return getNumericSerialNo(NExtNum$Talbe_NationCodeTxCode, "N", 6);
//    }
//
//    /**
//     * [e理專]電子報
//     * @return
//     * @throws Exception
//     * @throws ServiceException
//     */
//    public static String forEFCEPaperTxSN() throws Exception {
//        return getNumericSerialNo(NExtNum$Talbe_EFCEPaper, "E", 6);
//    }
//
//    /**
//     * 網銀市場重大訊息公告維護
//     * @return
//     * @throws Exception
//     * @throws ServiceException
//     */
//    public static String forPromoPopupTxSN() throws Exception {
//        return getNumericSerialNo(NExtNum$Talbe_PromoPopup, "P", 6);
//    }
//
//    /**
//     * SI組合式產品
//     * @return
//     * @throws Exception
//     * @throws ServiceException
//     */
//    public static String forSIEPaperTxSN() throws Exception {
//        return getNumericSerialNo(NExtNum$Talbe_SIEPaper, "S", 6);
//    }
//    /**
//     * 集管/基金公告訊息
//     * @return
//     * @throws Exception
//     * @throws ServiceException
//     */
//    public static String forFundNewsTxSN() throws Exception {
//        return getNumericSerialNo(NExtNum$Talbe_FundNews, "FN", 6);
//    }
//    /**
//     * 本行基金優惠整理
//     * @return
//     * @throws Exception
//     * @throws ServiceException
//     */
//    public static String forFundProjectTxSN() throws Exception {
//        return getNumericSerialNo(NExtNum$Talbe_FundProject, "FP", 6);
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2003/7/10 下午 05:40:06)
//     * @return java.lang.String
//     * @param curDate java.lang.String
//     */
//    public static String forVCrdtCrdAplyNo() throws Exception {
//        String sn = "";
//
//        String preWord = base10To36(DateUtility.getSystemDate());
//        preWord = Utility.packString(preWord, 5, 'R', '0');
//
//        NextNumber nextNum = getNextNumObj();
//
//        long nn = nextNum.getNext(NextNum$Table_VCrdtCrdAplyNo, 8);
//
//        sn = preWord + "-" + Utility.FreeFormatNumber(String.valueOf(nn), "00000000");
//
//        return sn;
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/13 下午 04:55:09)
//     * @return com.igsapp.ext.dbobj.NextNumber
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    private static NextNumber getNextNumObj() throws Exception {
//
//        NextNumber nextNum = new NextNumber();
//
//        return nextNum;
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    private static String getNumericSerialNo(String keyWord, String preWord, int maxLen) throws Exception {
//        String sn = null;
//
//        NextNumber nextNum = getNextNumObj();
//
//        sn = String.valueOf(nextNum.getNext(keyWord, maxLen));
//
//        while (sn.length() < maxLen) {
//            sn = "0" + sn;
//        }
//
//        sn = preWord + sn;
//
//        return sn;
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    private static String getNumericSerialNo(String keyWord, String preWord,  long lb, long ub, int inc) throws Exception {
//        String sn = null;
//
//        NextNumber nextNum = getNextNumObj();
//
//        sn = String.valueOf(nextNum.getNext(keyWord, lb, ub, inc));
//
//        while (sn.length() < String.valueOf(ub).length()) {
//            sn = "0" + sn;
//        }
//
//        sn = preWord + sn;
//
//        return sn;
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2002/5/8 下午 02:38:36)
//     * @return java.lang.String
//     * @exception java.lang.Exception 異常狀況說明。
//     */
//    private static String getSerialNo(String keyWord, String preWord, int maxLen) throws Exception {
//        String sn = null;
//
//        NextNumber nextNum = getNextNumObj();
//
//        long milliTimes = (System.currentTimeMillis() / 1000) * 1000;
//        milliTimes += nextNum.getNext(keyWord, 3);
//        sn = base10To36(String.valueOf(milliTimes));
//
//        if (sn.length() > maxLen) {
//            sn = sn.substring(sn.length() - maxLen);
//        } else {
//            while (sn.length() < maxLen) {
//                sn = "0" + sn;
//            }
//        }
//
//        sn = preWord + sn;
//
//        return sn;
//    }
//    /**
//     * 請於此處加入方法的說明。
//     * 建立日期： (2003/7/10 下午 05:40:06)
//     * @return java.lang.String
//     * @param curDate java.lang.String
//     */
//    public static synchronized void resetSN(String tableName) throws Exception {
//
//        System.out.println("*** SerialNo.resetSN() : reset NextNum, Table = [" + tableName + "].");
//
//        NextNumber nextNum = getNextNumObj();
//
//        nextNum.truncateTable(tableName);
//
//    }
}