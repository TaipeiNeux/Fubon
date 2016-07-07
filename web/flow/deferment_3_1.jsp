<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>
        
        <input type="hidden" name="date" value="">

        <h3 class="snopy pen">申請原因
                <div class="editBtnBoxbottom">
                  <a href="deferment.jsp?step=deferment1" class="editBtn">修改</a>
                </div>
              </h3>
        <div class="warne">
            <div class="joy swata">
                <div class="left">
                    <p>延後/提前還款原因</p>
                </div>
                <div class="right">
                    <p id="causeText">繼續於國內升學</p>
                </div>
            </div>
            <div class="joy swata" id="gDate">
                <div class="left">
                    <p>預定畢業日期</p>
                </div>
                <div class="right">
                    <p id="graDate">107年06月15日</p>
                </div>
            </div>
        </div>
        <h3 class="snopy pen sectop">證明文件
                <div class="editBtnBoxbottom">
                </div>
              </h3>
              <div class="error-msg" id="documentType" style="display:none">只允許上傳jpg、png、pdf、tif或gif影像檔</div>
            <div class="error-msg" id="documentLength" style="display:none">上傳檔案名稱限20個字</div>
        <table class="mqua">
            <thead>
                <tr>
					<th></th>
                    <th>檔案名稱</th>
                    <th>上傳/修改</th>
                    <th>預覽</th>
                </tr>
            </thead>
            <tbody id="uploadObj">
                <tr>
                    <td class="file-photo">
                        <a>
                            <img id="idPositivePhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">身份證正面影本</td>
                    <td class="file-en" id="idPositiveImg">無</td>
                    <td class="file-modify"><a id="idPositiveChange" style="display:none">修改檔案</a>
						<input type="file" name="isPositiveFile" style="position: absolute;top: 18px;opacity: 0;">
					</td>
                    <td class="file-upload"><a id="idPositiveUpload">上傳檔案</a>
                        <input type="file" name="isPositiveFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-view">
                        <a id="idPositiveView" class=""></a>
                    </td>

                </tr>

                <tr>
                    <td class="clickView" colspan="4" style="display:none" id="pos">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="idPositiveViewImg" src="img/dh.jpg">-->
								<iframe id="idPositiveViewImg" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td class="file-photo">
                        <a>
                            <img id="idNegativePhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">身份證反面影本</td>
                    <td class="file-en" id="idNegativeImg">無</td>
                    <td class="file-modify"><a id="idNegativeChange" style="display:none">修改檔案</a>
						<input type="file" name="isNegativeFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-upload"><a id="idNegativeUpload">上傳檔案</a>
                        <input type="file" name="isNegativeFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-view">
                        <a id="idNegativeView"></a>
                    </td>
                </tr>

                <tr>
                    <td class="clickView" colspan="4" style="display:none" id="neg">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="idNegativeViewImg" src="img/dh.jpg">-->
								<iframe id="idNegativeViewImg" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr id="studentIdPositive" style="display:none">
                    <td class="file-photo">
                        <a>
                            <img id="studentIdPositivePhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">學生證正面</td>
                    <td class="file-en" id="studentIdPositiveImg">無</td>
                    <td class="file-modify"><a id="studentIdPositiveChange" style="display:none">修改檔案</a>
						<input type="file" name="studentIdPositiveFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-upload"><a id="studentIdPositiveUpload">上傳檔案</a>
                        <input type="file" name="studentIdPositiveFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-view">
                        <a id="studentIdPositiveView"></a>
                    </td>
                </tr>

                <tr id="studentIdPositive_view" style="display:none">
                    <td class="clickView" colspan="4" style="display:none" id="sPos">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="studentIdPositiveViewImg" src="">-->
								<iframe id="studentIdPositiveViewImg" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr id="studentIdNegative" style="display:none">
                    <td class="file-photo">
                        <a>
                            <img id="studentIdNegativePhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">學生證反面</td>
                    <td class="file-en" id="studentIdNegativeImg">無</td>
                    <td class="file-modify"><a id="studentIdNegativeChange" style="display:none">修改檔案</a>
						<input type="file" name="studentIdNegativeFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-upload"><a id="studentIdNegativeUpload">上傳檔案</a>
                        <input type="file" name="studentIdNegativeFile" style="position: absolute;top: 18px;opacity: 0;">
                    </td>
                    <td class="file-view">
                        <a id="studentIdNegativeView"></a>
                    </td>
                </tr>

                <tr id="studentIdNegative_view" style="display:none">
                    <td class="clickView" colspan="4" style="display:none" id="sNeg">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="studentIdNegativeViewImg" src="">-->
								<iframe id="studentIdNegativeViewImg" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <p class="ubt">
            按「確認」後,本行將寄發六位數交易驗證碼簡訊至您手機號碼
            <span class="blue" id="cell"> 0911111111</span> ;
            <br>若該手機號碼錯誤或 5 分鐘內未收到交易驗證碼,請洽本行客服專線 02-8751-6665 按 5。</p>
       