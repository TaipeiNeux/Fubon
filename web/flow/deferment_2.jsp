<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

       <input type="hidden" name="RadioClicked" value="">
       
        <div class="joy swataX" id="studentIdCardRadio" style="display:none">
            <div class="left">
                <p>請確認學生證是否有本期註冊章</p>
            </div>
            <div class="right">
                <div class="radioArea">
                    <input name="registerStamp" id="registerStamp_y" class="css-checkbox_c" type="radio" value="">
                    <label for="registerStamp_y" class="css-label_c radGroup2">是</label>
                </div>
                <div class="radioArea">
                    <input name="registerStamp" id="registerStamp_n" class="css-checkbox_c" type="radio" value="">
                    <label for="registerStamp_n" class="css-label_c radGroup2">否</label>
                </div>
				<div class="error-msg" id="hasStamp" style="display:none">請先確認學生證是否有本期註冊章</div>
            </div>
        </div>
        <div class="xica">
            <h4>請上傳以下文件
                                  <a href="" data-toggle="modal" data-target="#pleaseUpload">
                                    <img  src="img/na-11.png" alt="">
                                  </a>
                                </h4>
								<div class="error-msg" id="hasDocument" style="display:none">請先上傳文件</div>
								<div class="error-msg" id="documentType" style="display:none">只允許上傳jpg、png、pdf、tif或gif影像檔</div>
        </div>
        <table class="mqua">
            <thead>
                <tr>
                    <th colspan="2">檔案名稱</th>
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
                                <!--<img id="studentIdPositiveImg" src="">-->
								<iframe id="studentIdPositiveImg" src="" style="width:100%; height: 100%;"></iframe>
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

        <!-- Modal -->
        <div class="modal fade pomodal" id="pleaseUpload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width:80%">
                <div class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="modal-body">
                        <h3>上傳文件小幫手</h3>
                        <ul>
                            <li class="uploadFileTip">1.文件掃描:</li>
                            <li class="uploadFileTip">您可至便利商店或利用手邊的掃描機將申請文件，掃描成PNG、JPG、TIF、GIF、PDF的檔案格式</li>
                            <li class="uploadFileTip">或者直接透過行動載具(如：智慧型手機、平板電腦等)將申請文件拍照儲存</li>
                            <li class="uploadFileTip">並請將您已掃描或拍照的文件檔案儲存到您要線上申請的電腦或行動載具中，以利上傳</li>
                        </ul>
                        
                        <ul>
                            <li class="uploadFileTip">2.文件上傳:</li>
                            <li class="uploadFileTip">點選<span class="blueButton">上傳檔案</span>按鈕後，即可從電腦或行動載具的資料庫中挑選您欲上傳的文件</li>
                            <li class="uploadFileTip">挑選完畢後請點選<span class="blueButton">上傳</span>按鈕，並再次確認您欲上傳的文件</li>
                            <li class="uploadFileTip">如您所上傳之文件無法順利預覽，可能為瀏覽器無法支援預覽功能，將不影響您的文件上傳</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>