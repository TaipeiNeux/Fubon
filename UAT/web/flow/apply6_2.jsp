<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

	<input type="hidden" name="familyStatusLevel1Text" value="" />
        <input type="hidden" name="appYear" value="" />
        <input type="hidden" name="appMonth" value="" />
        <input type="hidden" name="appDay" value="" />
        <input type="hidden" name="appHours" value="" />
        <input type="hidden" name="appMinutes" value="" />
        <input type="hidden" name="appSeconds" value="" />
        <input type="hidden" name="objListHidden" value="" />	
		
	 <div class="joy baky">
                <div class="left">
                    <p>申請結果</p>
                </div>
                <div class="right">
                    <p class="nike">您已成功送出申請資料!</p>
                </div>
            </div>
            <div class="joy baky">
                <div class="left">
                    <p>申請時間</p>
                </div>
                <div class="right">
                    <p id="applyDate">2016/03/12 14:28:56</p>
                </div>
            </div>
            <div class="joy baky">
                <div class="left">
                    <p>預約對保分行</p>
                </div>
                <div class="right">
                    <p class="branchInfo" id="nameAndAddr">大同分行(台北市重慶南路三段189號)</p>
                <p class="branchInfo" id="tel">(02)8985-9635</p>
                </div>
            </div>
            <div class="joy baky">
                <div class="left">
                    <p>預約對保時間</p>
                </div>
                <div class="right">
                    <p id="branchReservation">2016/03/15 PM 02:00 - 03:00</p>
                </div>
            </div>
            <div class="banaman">
				<h4 id="hasNoIOU" style="display:none">您已順利完成就學貸款線上申請書填寫，提醒您攜帶以下證件至預約對保分行辦理</h4>          
                <h4 id="hasIOU" style="display:none">您已順利完成就學貸款線上申請書填寫，提醒您攜帶以下證件並連同保證人至預約對保分行辦理</h4>
                <ul class="nasiBtn" id="carryObjList">
                </ul>
            </div>
            
            