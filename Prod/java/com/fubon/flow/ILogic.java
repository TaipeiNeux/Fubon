package com.fubon.flow;

import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/4/24
 * Time: 下午 1:04
 * To change this template use File | Settings | File Templates.
 */
public interface ILogic {

    /**
     * 取得草稿資料(使用者跳出再進入時會呼叫，無論是上一步或下一步)
     * @param content 最後要放回的JSON物件
     * @param draftData 上一次使用者所存的草稿資料(XML)
     * @param queryStringInfo
     * @throws Exception
     */
    public void getDraftData(JSONObject content,Document draftData,JSPQueryStringInfo queryStringInfo) throws Exception;

    /**
     * 按下一步時，會先呼叫儲存的method，來做相關工作(db或電發文或發OTP)
     * @param queryStringInfo
     * @throws Exception
     */
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception;

}
