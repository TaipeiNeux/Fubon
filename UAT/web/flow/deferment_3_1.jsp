<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>
        
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
              <div class="error-msg" id="documentType" style="display:none">上傳檔案格式限PNG、JPG、PDF、TIF、GIF</div>
            <div class="error-msg" id="documentLength" style="display:none">上傳檔案名稱限20個字</div>
			<div class="error-msg" id="documentSize" style="display:none">上傳檔案大小合計限10MB</div>
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
                <tr id="isPositive_0" class = "isPositive">
                    <td class="file-photo">
                        <a>
                            <img id="isPositivePhoto_img_0" src="">
                        </a>
                    </td>
                    <td class="file-zh">身分證正面影本</td>
                    <td class="file-en" id="isPositiveImg_0">無</td>
                    <td class="file-upload"><a id="isPositiveUpload_0">修改檔案<input type="file" name="isPositiveFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="isPositiveView_0" class=""></a>
                    </td>

                </tr>

                <tr id="isPositive_view_0">
                    <td class="clickView" colspan="4" style="display:none" id="isPositiveViewTag_0">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">

                                <iframe id="isPositiveViewImg_0" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr id="isNegative_0" class="isNegative">
                    <td class="file-photo">
                        <a>
                            <img id="isNegativePhoto_img_0" src="">
                        </a>
                    </td>
                    <td class="file-zh">身分證反面影本</td>
                    <td class="file-en" id="isNegativeImg_0">無</td>
                    <td class="file-upload"><a id="isNegativeUpload_0">修改檔案<input type="file" name="isNegativeFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="isNegativeView_0"></a>
                    </td>
                </tr>

                <tr id="isNegative_view_0">
                    <td class="clickView" colspan="4" style="display:none" id="isNegativeViewTag_0">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">

                                <iframe id="isNegativeViewImg_0" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr id="studentIdPositive_0" style="display:none" class="studentIdPositive">
                    <td class="file-photo">
                        <a>
                            <img id="studentIdPositivePhoto_img_0" src="">
                        </a>
                    </td>
                    <td class="file-zh">學生證正面影本(須蓋有繼續升學學校之註冊章戳)</td>
                    <td class="file-en" id="studentIdPositiveImg_0">無</td>
                    <td class="file-upload"><a id="studentIdPositiveUpload_0">修改檔案<input type="file" name="studentIdPositiveFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="studentIdPositiveView_0"></a>
                    </td>
                </tr>

                <tr id="studentIdPositive_view_0" style="display:none">
                    <td class="clickView" colspan="4" style="display:none" id="studentIdPositiveViewTag_0">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">

                                <iframe id="studentIdPositiveViewImg_0" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr id="studentIdNegative_0" style="display:none" class="studentIdNegative">
                    <td class="file-photo">
                        <a>
                            <img id="studentIdNegativePhoto_img_0" src="">
                        </a>
                    </td>
                    <td class="file-zh">學生證反面影本(須蓋有繼續升學學校之註冊章戳)</td>
                    <td class="file-en" id="studentIdNegativeImg_0">無</td>
                    <td class="file-upload"><a id="studentIdNegativeUpload_0">修改檔案<input type="file" name="studentIdNegativeFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="studentIdNegativeView_0"></a>
                    </td>
                </tr>

                <tr id="studentIdNegative_view_0" style="display:none">
                    <td class="clickView" colspan="4" style="display:none" id="studentIdNegativeViewTag_0">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">

                                <iframe id="studentIdNegativeViewImg_0" src="" style="width:100%; height: 100%;"></iframe>
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
       