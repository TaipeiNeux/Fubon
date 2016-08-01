<%@ page language="java" contentType="text/html; charset=utf-8" %>
    <% request.setCharacterEncoding( "utf-8"); %>


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
                <tr id="idPositive_0" class = "idPositive">
                    <td class="file-photo">
                        <a>
                            <img id="idPositivePhoto_img_0" src="">
                        </a>
                    </td>
                    <td class="file-zh">身分證正面影本</td>
                    <td class="file-en" id="idPositiveImg_0">無</td>
                    <td class="file-upload"><a id="idPositiveUpload_0">上傳檔案<input type="file" name="idPositiveFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="idPositiveView_0" class=""></a>
                    </td>

                </tr>

                <tr id="idPositive_view_0">
                    <td class="clickView" colspan="4" style="display:none" id="idPositiveViewTag_0">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">

                                <iframe id="idPositiveViewImg_0" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr id="idNegative_0" class="idNegative">
                    <td class="file-photo">
                        <a>
                            <img id="idNegativePhoto_img_0" src="">
                        </a>
                    </td>
                    <td class="file-zh">身分證反面影本</td>
                    <td class="file-en" id="idNegativeImg_0">無</td>
                    <td class="file-upload"><a id="idNegativeUpload_0">上傳檔案<input type="file" name="idNegativeFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="idNegativeView_0"></a>
                    </td>
                </tr>

                <tr id="idNegative_view_0">
                    <td class="clickView" colspan="4" style="display:none" id="idNegativeViewTag_0">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">

                                <iframe id="idNegativeViewImg_0" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr id="register_0" class="register">
                    <td class="file-photo">
                        <a>
                            <img id="registerPhoto_img_0" src="">
                        </a>
                    </td>
                    <td class="file-zh">註冊繳費單
                        <span>（含註冊繳費單、住宿費用）</span>
                    </td>
                    <td class="file-en" id="registerImg_0">無</td>
                    <td class="file-upload"><a id="registerUpload_0">上傳檔案<input type="file" name="registerFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="registerView_0"></a>
                    </td>
                </tr>

                <tr id="register_view_0">
                    <td class="clickView" colspan="4" style="display:none" id="registerViewTag_0">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">
                                <!--<img id="registerViewImg_0" src="">-->
                                <iframe id="registerViewImg_0" src="" style="width:100%; height: 100%;"></iframe>
                            </div>
                        </div>
                    </td>
                </tr>
                
                <tr id="lowIncome_0" class="lowIncome" style="display:none">
                    <td class="file-photo">
                        <a>
                            <img id="lowIncomePhoto_img_0" src="">
                        </a>
                    </td>
                    <td class="file-zh">政府機關出具之低收入戶或中低收入戶證明</td>
                    <td class="file-en" id="lowIncomeImg_0">無</td>
                    <td class="file-upload"><a id="lowIncomeUpload_0">上傳檔案<input type="file" name="lowIncomeFile_0" style="position: absolute;top: 0;left:0;opacity: 0;width:100%;height:100%;"></a>
                    </td>
                    <td class="file-view">
                        <a id="lowIncomeView_0"></a>
                    </td>
                </tr>

                <tr id="lowIncome_view_0">
                    <td class="clickView" colspan="4" style="display:none" id="lowIncomeViewTag_0">
                        <div class="dowitemContent" style="display:block">
                            <div class="imgBox">

                                <iframe id="lowIncomeViewImg_0" src="" style="width:100%; height: 100%;"></iframe>
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