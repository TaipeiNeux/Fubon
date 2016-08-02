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
            <div class="error-msg" id="hasDocument" style="display:none">請上傳文件</div>
            <div class="error-msg" id="documentType" style="display:none">上傳檔案格式限PNG、JPG、PDF、TIF、GIF</div>
            <div class="error-msg" id="documentLength" style="display:none">上傳檔案名稱限20個字</div>
            <div class="error-msg" id="documentSize" style="display:none">上傳檔案大小合計限10MB</div>
            <div class="error-msg" id="documentNumber" style="display:none">上傳檔案個數限10個</div>
        </div>
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
                    <td class="file-upload"><a id="isPositiveUpload_0">上傳檔案<input type="file" name="isPositiveFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
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
                    <td class="file-upload"><a id="isNegativeUpload_0">上傳檔案<input type="file" name="isNegativeFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
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
                    <td class="file-upload"><a id="studentIdPositiveUpload_0">上傳檔案<input type="file" name="studentIdPositiveFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
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
                    <td class="file-upload"><a id="studentIdNegativeUpload_0">上傳檔案<input type="file" name="studentIdNegativeFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
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

        <!-- Modal -->
        <div class="modal fade pomodal" id="pleaseUpload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
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