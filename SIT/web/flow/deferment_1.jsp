<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

       <input type="hidden" name="eliIndex" value="">
	   <input type="hidden" name="eligibilityText" value="">
	   <input type="hidden" name="ReasonDate" value="">
       
        <div class="joy swata">
            <div class="left">
                <p>延後/提前還款原因</p>
            </div>
            <div class="right" id="reason">
                <select class="selectpicker input_m" id="reasonSelector" name="reasonSelect">
                </select>
                <div class="error-msg"></div>
            </div>
        </div>
        <div class="joy swata" id="deferralTip" style="display:none">
            <p>(延畢者應每學期申請延期一次)</p>
        </div>
        <div class="joy swata" id="selectDate" style="display:none">
            <div class="left">
                <p id="showReason">預定畢業日期</p>
            </div>
            <div class="right">
                民國
                <input class="input_s" type="text" name="selectYear"> 年
                <input class="input_s" type="text" name="selectMonth"> 月
                <input class="input_s" type="text" name="selectDay"> 日 
                <div class="error-msg"></div>
            </div>
        </div>