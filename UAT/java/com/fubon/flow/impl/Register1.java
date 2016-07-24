package com.fubon.flow.impl;

import com.fubon.flow.ILogic;
import com.fubon.utils.ProjUtils;
import com.neux.garden.dbmgr.DaoFactory;
import com.neux.utility.orm.bean.DataObject;
import com.neux.utility.orm.dal.dao.module.IDao;
import com.neux.utility.utils.jsp.info.JSPQueryStringInfo;
import org.dom4j.Document;
import org.json.JSONObject;

/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/5/19
 * Time: 上午 2:33
 * To change this template use File | Settings | File Templates.
 */
public class Register1 implements ILogic {
    @Override
    public void getDraftData(JSONObject content, Document draftData, JSPQueryStringInfo queryStringInfo) throws Exception {


//        String memberTerms = "<ol> <li> 為保障您的權益，請於註冊成為台北富邦商業銀行股份有限公司（以下簡稱「本行」）就學貸款專區網路服務會員前，詳細閱讀本同意書所有內容，當您點選「同意」鍵後，即表示您已於合理時間內閱讀並了解及同意遵守本同意書所載之內容。 </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第一條</b><b>會員規範</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 您了解當您同意本同意書之內容並註冊成為台北富邦銀行就學貸款專區網路服務(以下簡稱「本服務」)會員後，可使用本務提供之會員服務，並同意於使用本服務時，遵守本服務同意書內容。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第二條</b><b>同意書適用範圍</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 本同意書係本行與註冊成為本服務之會員間針對本服務之一般性共通約定，除個別契約另有約定或本行另有規定外，悉依本同意書辦理。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第三條</b><b>就學貸款專區網路服務內容</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 本服務為針對會員所提供之就學貸款網路服務，會員可憑藉有效之身分使用本服務，本服務所提供之內容包括就學貸款帳務查詢及相關之服務申請，詳細服務項目概以系統提供為依據。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第四條</b><b>會員註冊手續</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 1、申請本行就學貸款之學生皆可註冊本服務成為會員，使用本服務所提供之就學貸款查詢或就學貸款服務功能申請，本服務認定憑正確身分驗證資料申請本服務之會員皆為就學貸款申請人本人。 </li> <li> 2、申請成為本服務會員，需完成會員基本資料之填寫，並自行設定使用者代碼及密碼；但已在本行撥貸就學貸款之學生，申請成為本服務會員時，將由本行系統發送初始使用者代碼及密碼至申請人留存於本行之電子郵件信箱，申請人需以該組初始使用者代碼及密碼登入本行就學貸款專區並變更使用者代碼、密碼及完成會員基本資料之填寫。 </li> <li> 3、基於本服務所提供之相關功能使用，您同意註冊時提供完整詳實之個人資料，您所填具之個人資料若有填寫不實，或有任何誤導之嫌者，本行保留隨時終止您會員資格及使用服務之權利。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第五條</b><b>會員服務使用方式及使用規範</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 1、會員於註冊本服務並經系統驗證成功，日後即可以身分證統一編號、會員自行設定之使用者代碼及密碼登入使用本服務。 </li> <li> 2、身分證統一編號與會員註冊時自行設定之使用者代號及密碼即為日後登入本服務之憑證，對於登入密碼之保密責任由會員自行全權負保管之責任。 </li> <li> 3、本行對憑身分證統一編號、使用者代號與密碼使用本服務，均認定為會員本人所為之有效指示，故同一時間內，本服務僅允許一人用本服務，若同一時間內有第二人以上以同一使用者代號及密碼欲登入使用本服務，系統將自動拒絕第一位以外使用者使用本服務。 </li> <li> 4、會員密碼連續輸入錯誤三次時，為保障會員權益，本服務將暫停該使用者代碼之使用，會員需自行親自來電本行客服中心，並配合客服專員進行後續處理，方可恢復會員帳號之使用。 </li> <li> 5、為保障會員權益，當會員忘記簽退離開本服務系統或超過五分鐘未執行任何指令時，本服務系統將自動簽退，以免瀏覽器遭他人使用，損害會員權益；會員需再行執行登入方可重新使用本服務。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第六條</b><b>會員資格之終止</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 1、為維持本服務資料庫之有效應用以達效率服務之提供，會員於本行之就學貸款結清時，該會員帳號將逕行失效，如有需要，可再行重新註冊成為本服務會員，惟再次申請之使用者代號不可與前所申請會員代號重複。 </li> <li> 2、會員本人得隨時以電話通知本行客服中心，經由專員核對身分及資料無誤後，終止會員帳號之使用與本同意書之約定。該會員號終止後，可再重新申請註冊成為本服務會員，惟再次申請之使用者代號不可與前所使用代號重複。 </li> <li> 3、會員於使用本服務時未遵守本同意書之規範或擅自將使用本服務之權利或義務轉讓第三者使用時，本行得不經通逕行終止該會員帳號之使用資格。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第七條</b><b>個人資料之蒐集、處理、利用及國際傳輸</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 會員經本行依個人資料保護法規定履行告知義務，會員瞭解並同意本行及『台北富邦商業銀行履行個人資料保護法第八條告知義務內容(就學貸款業務專用)』（以下簡稱告知事項）所列對象於告知事項所列特定目的或法令許可範圍內，對會員之資料為蒐集、處理、利用及國際傳輸。惟有關本行基於『行銷(包含金控共同行銷業務)』之目的對會員基本資料外之個人資料所為之行銷建檔、揭露、轉介或交互運用，本行應依照『金融控股公司子公司間共同行銷管理辦法』，另行與會員約定，並由會員自行選擇是否同意。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第八條</b><b>注意事項</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 1、本服務提供之各項就學貸款交易資料，僅供會員作為參考之用，正確之資料仍應以本行提供之書面帳單為準。 </li> <li> 2、若本服務因電腦系統暫停服務而無法辦理或查詢資料時，會員可隨時來電本行客服中心，由客服專員為您辦理所需之服務。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第九條</b><b>授權及防範</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 會員同意於發現有第三人冒用或盜用身分證統一編號、使用者代碼、密碼，或其他任何未經合法授權之情形，應立即以電話或書面通知本行管制使用該服務並採取防範之措施。本行接受前述通知前，第三人使用該服務均已發生效力所致之損失，概由會員自行負責，但本行故意或重大過失而不知係未經合法授權之電子訊息，不在此限。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第十條</b><b>資料安全</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 會員與本行均應確保電子訊息安全，防止非法進入系統、竊取、竄改或毀損業務紀錄及資料。因可歸責會員之事由而致第三人破解授權使用者代號或密碼並入侵網路服務系統（駭客行為）所發生之損害，由會員負擔其危險。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第十一條</b><b>損害賠償</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 會員與本行均同意依本同意書傳送或接收電子訊息，如因可歸責於任一方之事由，而有遲延、遺漏或錯誤之情事，致他方權益受有損害時，可歸責之一方僅就他方之積極損害（不包含所失利益）及其利息負賠償責任。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第十二條</b><b>不可抗力</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 一方於發生不可抗力情事時，對於本同意書所生之履行不能或遲延履行，均不視為違約，亦無須負任何賠償責任。前項所稱之不可抗力，指因天災、戰禍、罷工、停工、政府法令限制、電腦系統故障或本行無法控制之情事。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第十三條</b><b>會員規範之修改</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 本行保留修改本服務會員規範之權利，本服務於修改會員規範時，將於本服務首頁公告修改之內容，將不對會員另作個別通知，會員若不同意修改後之會員規範，可隨時以電話通知本行客服中心，經由專員核對身分及資料無誤後，終止會員帳號之使用與本同意書之約定。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第十四條</b><b>服務終止</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 本行欲終止提供本服務時，將於終止日六十日前以顯著方式於本服務首頁上公開揭示，將不對會員另作個別通知。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第十五條</b><b>法院管轄</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 因本同意書而涉訟者，會員同意以臺灣臺北地方法院為第一審管轄法院。 </li> </ol></div> </li> <li> <div class=\"\\&quot;left\\&quot;\"><b>第十六條</b><b>未盡事宜</b></div> <div class=\"\\&quot;right\\&quot;\"> <ol> <li> 本同意書如有其他未盡事宜，悉依本行之相關規定、銀行慣例或相關法令辦理。 </li> </ol></div> </li> </ol>";
//        String obligations = "<ol> <li> 台北富邦商業銀行（以下稱本行）依據個人資料保護法（下稱個資法）規定，應向台端告知下列事項，請台端詳閱： </li> <li> <div class=\\\"left\\\"><b>一、蒐集之目的：</b></div> <div class=\\\"right\\\"><ol> <li> 核貸與授信業務（088）、授信業務（106）、徵信（154）、存款與匯款（036）、行銷（包含金控共同行銷業務）（040）、金融服務業依法令規定及金融監理需要，所為之蒐集處理及利用（059）、金融爭議處理（060）、非公務機關依法定義務所進行個人資料之蒐集處理及利用（063）、契約、類似契約或其他法律關係事務（069）、借款戶與存款戶存借作業綜合管理（082）、消費者、客戶管理與服務（090）、消費者保護（091）、帳務管理及債權交易業務（104）、會計與相關服務（129）、資（通）訊與資料庫管理（136）、調查、統計與研究分析（157）、其他金融管理業務（177）、其他經營合於營業登記項目或組織章程所定之業務（181）、其他諮詢與顧問服務（182）等。 </li> </ol> </li> <li> <div class=\\\"left\\\"><div class=\\\"left\\\"><b>二、蒐集之個人資料類別：</b></div> <div class=\\\"right\\\"><ol> <li> 識別類（C001辨識個人者、C002辨識財務者、C003政府資料中之辨識者）；特徵類（C011個人描述）；家庭情形（C021家庭情形、C023家庭其他成員之細節）；社會情況（C032財產、C038職業）；教育、考選、技術或其他專業（C052資格或技術）；受僱情形（C061現行之受僱情形、C068薪資與預扣款）；財務細節（C081收入、所得、資產與投資、C082負債與支出、C083信用評等、C084貸款、C086票據信用）等，具體事項如姓名、身分證統一編號、聯絡方式等基本資料，及詳如各業務申請書及契約書等內容，並包括台端往來之帳務資料、交易資料、信用資料、保險資料、投資資料及親屬資料。 </li> </ol> </li> <li> <div class=\\\"left\\\"><b>三、個人資料利用之期間、地區、對象、方式及本行蒐集個人資料之來源：</b></div> <div class=\\\"right\\\"><ol> <li> （一）期間：個人資料蒐集之特定目的存續期間/依相關法令規定或契約約定之保存年限（如：商業會計法等）/本行因執行業務所必須之保存期間。 </li> <li> （二）地區：本國、本行海外分支機構所在地、通匯行所在地、未受中央目的事業主管機關限制之國際傳輸個人資料之接收者所在地、本行業務委外機構所在地、與本行有業務往來之機構營業處所所在地。 </li> <li> （三）對象：本行、本行海外分支機構、通匯行、金融聯合徵信中心、財金資訊公司、信用保證機構、業務委外機構、未受中央目的事業主管機關限制之際傳輸個人資料之接收者、本行所屬金控公司、本行之共同行銷或交互運用客戶資料之公司、本行合作推廣之單位、其他與本行有業務往來之機構、依法有調查權機關或金融監理機關。 </li> <li> （四）方式：以自動化機器或其他非自動化之利用方式。 </li> <li> （五）前開（三）所列個人資料利用之對象，亦為本行蒐集個人資料之來源。 </li> </ol> </li> <li> <div class=\\\"left\\\"><b>四、依據個資法第三條規定，台端就本行保有台端之個人資料得行使下列權利：</b></div> <div class=\\\"right\\\"><ol> <li> （一）得向本行查詢、請求閱覽或請求製給複製本，而本行依法得酌收必要成本費用。 </li> <li> （二）得向本行請求補充或更正，惟依法台端應為適當之釋明。 </li> <li> （三）得向本行請求停止蒐集、處理或利用及請求刪除，惟依法本行因執行業務所必須者，得不依台端請求為之。 </li> </ol> </li> <li> <div class=\\\"left\\\"><b>五、台端不提供個人資料所致權益之影響：</b></div> <div class=\\\"right\\\"><ol> <li> 台端得自由選擇是否提供相關個人資料，惟台端若拒絕提供相關個人資料，本行將無法進行必要之審核及處理作業，致無法提供台端相關服務。 </li> </ol> </li> <li> <div class=\\\"left\\\"><b>六、台端可以隨時撥打服務專線0800-099-799或（02）8751-1313，要求拒絕接受行銷。 </b></div> </li> <li> <div class=\\\"left\\\"><b>七、有關本行基於「行銷(包含金控共同行銷業務)」之目的對台端姓名或地址以外之其他資料外之個人資料所為之行銷建檔、揭露、轉介或交互運用，本行將依照「金融控股公司子公司間共同行銷管理辦法」，另行與台端約定，並由台端自行選擇是否同意。 </b></div> </li> <li> 經 貴行向本人告知上開事項，本人已清楚瞭解 貴行蒐集、處理、利用本人個人資料之來源、目的及用途。 </li> </ol>";

        IDao dao = DaoFactory.getDefaultDao();
        DataObject memberTermsObject = ProjUtils.getHtmlContent(dao,"memberTerms");
        DataObject obligationsObject = ProjUtils.getHtmlContent(dao,"obligations");

        String memberTerms = memberTermsObject.getValue("Content");
        String obligations = obligationsObject.getValue("Content");
        String memberTermsNo = memberTermsObject.getValue("No");
        String obligationsNo = obligationsObject.getValue("No");

        content.put("memberTermsNo",memberTermsNo);
        content.put("obligationsNo",obligationsNo);
        content.put("memberTerms",memberTerms);
        content.put("obligations",obligations);

    }

    @Override
    public void doAction(JSPQueryStringInfo queryStringInfo,JSONObject content) throws Exception {
        //To change body of implemented methods use File | Settings | File Templates.
    }
}
