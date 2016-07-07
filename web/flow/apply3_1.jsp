<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

	<input type="hidden" name="year_graduation_hidden" value="" />
    <input type="hidden" name="month_graduation_hidden" value="" />
	
	<input type="hidden" name="lastDate" value="" />
    <input type="hidden" name="stageSelectValue" value="" />
    <input type="hidden" name="loanAmt" value="" />   
    <input type="hidden" name="onTheJobHidden" value="0" />
	<div id="student" class="candysan">
      <h3 class="snopy hat">就讀學校</h3>
             <div class="joy swata">
                <div class="left">
                    <p>教育階段</p>
                </div>
                <div class="right">
                    <select class="selectpicker input_f stageLength okay" name="student_educationStage">
                        <option value="">請選擇</option>
						<option value="7">高中職</option>
						<option value="8">五專</option>
						<option value="6">二專</option>
						<option value="5">二技</option>
						<option value="4">大學、四技</option>
						<option value="3">大學醫學（牙醫）系</option>
						<option value="A">七年一貫</option>
						<option value="9">學士後第二專長學士學位學程</option>
						<option value="2">碩士班</option>
						<option value="1">博士班</option>						
                    </select>
					<div class="error-msg"></div>
                </div>
            </div>
            <div class="joy swata">
                <div class="left">
                    <p>學校名稱</p>
                </div>
                <div class="right buttonDown">
                    <select class="selectpicker input_f moneymoneymoney" name="student_isNational">
                        <option value="">請選擇</option>
						<option value="1">公</option>
						<option value="2">私</option>
                    </select><div class="schoolSelector">立</div>
                    
                    <select class="selectpicker input_f daynight" name="student_isDay">
                        <option value="">請選擇</option>
						<option value="1">日</option>
						<option value="2">夜</option>
                    </select><div class="schoolSelector">間部</div>
                    
                    <select class="selectpicker input_m nameLength" name="student_name">
                        <option>請選擇</option>
                    </select>
					<div class="error-msg"></div>
                </div>
            </div>
            <div class="joy swata">
                <div class="left">
                    <p>科系所</p>
                </div>
                <div class="right">
					<input type="text" class="input_m" name="student_department">
					<div class="error-msg"></div>
                </div>
            </div>
           <div class="joy swata op">
                <div class="left student">
                    <p>在職專班</p>
                </div>
                <div class="right" name="student_onTheJob">
                    <div class="radioArea">
                        <input type="radio" name="work" id="Serving" class="css-checkbox_c" checked="checked">
                        <label for="Serving" class="css-label_c radGroup2">是</label>
                    </div>
                    <div class="radioArea">
                        <input type="radio" name="work" id="nojob" class="css-checkbox_c" checked="checked">
                        <label for="nojob" class="css-label_c radGroup2">否</label>
                    </div>
                </div>
            </div>
            <div class="joy swata">
                <div class="left">
                    <p>升學年級</p>
                </div>
                <div class="right op">
                    <select class="selectpicker input_f" name="student_grade">
                        <option>請選擇</option>
                    </select>
                    年
                    <input type="text" class="input_s" name="student_class"> 班
					<div class="error-msg"></div>
                </div>
            </div>
            <div class="joy swata">
                <div class="left">
                    <p>學號</p>
                </div>
                <div class="right sixty">
                    <input type="text" class="input_m" name="student_id">
					<div class="error-msg"></div>
                </div>
            </div>
            <div class="joy swata">
                <div class="left">
                    <p>入學日期</p>
                </div>
                <div class="right paddingDown">
                    民國
                    <input type="text" class="input_s" name="student_year_enter"> 年
                    <input type="text" class="input_s" name="student_month_enter"> 月
					<div class="error-msg"></div>
                </div>
            </div>
            <div class="joy swata">
                <div class="left">
                    <p>預計畢業時間</p>
                </div>
                <div class="right paddingDown" id="gDate">
                    民國
                <p name="student_year_graduation" class="gra">  </p> 
                <p class="gra" id="yy">年</p>
                <p name="student_month_graduation" class="gra"> </p>
                <p class="gra" id="mm">月</p>
                </div>
            </div>
		</div>