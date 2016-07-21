<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>

        <!--<input type="hidden" name="idCardPositionHidden" value="" />
        <input type="hidden" name="idCardNegativeHidden" value="" />
        <input type="hidden" name="registrationHidden" value="" />
        <input type="hidden" name="lowIncomeHidden" value="" />-->
		
		<input type="hidden" class="fileSize" name="isPositive_hidden" value="">
       <input type="hidden" class="fileSize" name="isNegative_hidden" value="">
       <input type="hidden" class="fileSize" name="register_hidden" value="">
       <input type="hidden" class="fileSize" name="lowIncome_hidden" value="">
	   
	   <input type="hidden" name="idPositiveViewName_hidden" value="">
       <input type="hidden" name="idNegativeViewName_hidden" value="">
       <input type="hidden" name="registerViewName_hidden" value="">
       <input type="hidden" name="lowIncomeViewName_hidden" value="">

        <h4 class="bsc">請上傳以下文件
            <a href="" data-toggle="modal" data-target="#pleaseUpload">
                                    <img src="img/na-11.png" alt="">
                                  </a>
        </h4>
        <div class="error-msg" id="hasDocument" style="display:none">請上傳文件</div>
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
                <tr>
                    <td class="file-photo">
                        <a>
                            <img id="idPositivePhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">身份證正面影本</td>
                    <td class="file-en" id="idPositiveImg">無</td>
                    <td class="file-modify"><a id="idPositiveChange" style="display:none">修改檔案<input type="file" name="isPositiveFile" accept="image/*" capture="camera" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
					</td>
                    <td class="file-upload"><a id="idPositiveUpload">上傳檔案<input type="file" name="isPositiveFile" accept="image/*" capture="camera" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
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
                    <td class="file-modify"><a id="idNegativeChange" style="display:none">修改檔案<input type="file" name="isNegativeFile" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
					</td>
                    <td class="file-upload"><a id="idNegativeUpload">上傳檔案<input type="file" name="isNegativeFile" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
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

                <tr>
                    <td class="file-photo">
                        <a>
                            <img id="registerPhoto" src="">
                        </a>
                    </td>
                    <td class="file-zh">註冊繳費單
                        <span>（含註冊繳費單、住宿費用）</span>
                    </td>
                    <td class="file-en" id="registerImg">無</td>
                    <td class="file-modify"><a id="registerChange" style="display:none">修改檔案<input type="file" name="registerFile" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
					</td>
                    <td class="file-upload"><a id="registerUpload">上傳檔案<input type="file" name="registerFile" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="registerView"></a>
                    </td>
                </tr>

                <tr>
                    <td class="clickView" colspan="4" style="display:none" id="reg">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="registerViewImg" src="">-->
                                <iframe id="registerViewImg" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        
       <!-- Modal -->
        <div class="modal fade pomodal" id="pleaseUpload" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document" style="width:60%">
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