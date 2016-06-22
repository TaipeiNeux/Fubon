package com.fubon.flow.impl;

import com.neux.garden.dbmgr.DaoFactory;
import com.neux.garden.log.GardenLog;
import com.fubon.flow.ILogic;
import com.fubon.utils.ProjUtils;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/30
 * Time: 下午 9:30
 * To change this template use File | Settings | File Templates.
 */
public class ForgetPassword1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //拿輸入的身份證字號來找有沒有帳號
        String id = queryStringInfo.getParam("id");

        //拿輸入的生日驗證
        String bdYear = queryStringInfo.getParam("birthday_y");
        String bdMonth = queryStringInfo.getParam("birthday_m");
        String bdDay = queryStringInfo.getParam("birthday_d");

        //查此人的身份證
        IDao dao = DaoFactory.getDefaultDao();

        DataObject studentUserProfile = DaoFactory.getDefaultDataObject("Student_UserProfile");
        studentUserProfile.setValue("IdNo",id);
        if(!dao.querySingle(studentUserProfile,null)) throw new Exception("此身份證不存在");
        else {
            DataObject studentUserProfileDetail = DaoFactory.getDefaultDataObject("Student_UserProfileDetail");
            studentUserProfileDetail.setValue("AplyIdNo",id);

            if(!dao.querySingle(studentUserProfileDetail,null)) {
                throw new Exception("此身份證的生日不存在");
            }
            else {
                String aplyBirthday = studentUserProfileDetail.getValue("AplyBirthday");

                //先補零
                bdYear = StringUtils.leftPad(bdYear, 3, "0");
                bdMonth = StringUtils.leftPad(bdMonth, 2, "0");
                bdDay = StringUtils.leftPad(bdDay, 2, "0");

                String bd = ProjUtils.toYYYYBirthday(bdYear + bdMonth + bdDay);

                if(!aplyBirthday.equalsIgnoreCase(bd)) {
                    throw new Exception("您輸入的生日資料不正確");
                }
            }
        }
    }
}
