<%@ page language="java" contentType="text/html; charset=utf-8" %>
<% request.setCharacterEncoding("utf-8"); %>

<div class="parents antcoco">
	 <div class="joy abon">
      	<div class="left">
        	<p>身分證字號</p>
      	</div>
      	<div class="right">
          <input class="input_L" type="text" name="id" maxlength="10">
			    <div class="error-msg"/>
      	</div>
    </div>

    <div class="joy abon">
      	<div class="left">
        	<p>生日</p>
      	</div>
      	<div class="right">
        	民國
        	<input class="input_s" type="text" name="birthday_y" maxlength="3"> 年
        	<input class="input_s" type="text" name="birthday_m" maxlength="2"> 月
        	<input class="input_s" type="text" name="birthday_d" maxlength="2"> 日
			<div class="error-msg"/>
      	</div>
    </div>
</div>