package com.fubon.htmltopdf;

import java.awt.Desktop;
import java.awt.EventQueue;

import javax.swing.JFrame;

import com.neux.garden.log.GardenLog;
import com.neux.utility.utils.PropertiesUtil;
import com.winnovative_software.*;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

import java.awt.Font;
import javax.swing.JTextArea;
import javax.swing.JSeparator;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;


/**
 * Created with IntelliJ IDEA.
 * User: Titan
 * Date: 2016/6/23
 * Time: 下午 7:56
 * To change this template use File | Settings | File Templates.
 */
public class Htmltopdf 
{
	
    private static String textServerIP = "127.0.0.1";
    private static String textServerPort = "45001";
    private static String textServicePassword = "1q@W3e$R5t";
   
    //private static String textFirstUrl = "http://garden.decoder.com.tw/fubon_SL/myElectronicPay_1.jsp";
    //private static String textFirstUrl = "http://localhost:8080/Fubon_SL/print/print.jsp";
    private static String textFirstUrl=PropertiesUtil.loadPropertiesByClassPath("/config.properties")
			.getProperty("printurl");
    private static String userId="";
    //private static String textFirstUrl = "  http://localhost:8080/Fubon_SL/";
      public Htmltopdf(String userid) throws Exception
     {
    	  //textFirstUrl+="?userId="+userid;
    	  userId=userid;
    	  System.out.println("start getPdf buffer");
          // create the PDF document in a buffer
          byte[] outPdfBuffer = createPdfDocument();
          System.out.println("start getPdf buffer success");

          //String outFilePath = "C:\\Work\\projects\\fubon\\WnvMergeMultipleHtml.pdf";
          String outFilePath ="C:\\"+userid+".pdf";
          // write the buffer to a file
          System.out.println("write file");
          writeBytesToFile(outPdfBuffer, outFilePath);
          System.out.println("write file OK");
    }

    private static byte[] createPdfDocument() throws Exception 
    {
        String serverIP = textServerIP;
        int port = Integer.parseInt(textServerPort);

        // create a document
        System.out.println("Create pdfDocument");
        Document pdfDocument = new Document(serverIP, port);

        // set license key
        GardenLog.log(GardenLog.DEBUG, "setLicenseKey");
        pdfDocument.setLicenseKey("cP7v/+7/7//u7fHv/+zu8e7t8ebm5ub/7Q==");

        // set service password if necessary
        //GardenLog.log(GardenLog.DEBUG, "setLicenseKey");
        if (textServicePassword.length() > 0)
            pdfDocument.setServicePassword(textServicePassword);

        System.out.println("addPage");

        // add a page to PDF document
        GardenLog.log(GardenLog.DEBUG, "addPage");
        PdfPage firstPdfPage = pdfDocument.addPage();

        // create the first HTML to PDF element
        System.out.println("addPage firstHtml");
        
        GardenLog.log(GardenLog.DEBUG, "HtmlToPdfElement");
        HtmlToPdfElement firstHtml = new HtmlToPdfElement(0, 0, textFirstUrl+"?userId="+userId	);
        
        // optionally set a delay before conversion to allow asynchronous
        // scripts to finish
        GardenLog.log(GardenLog.DEBUG, "setConversionDelay");
        firstHtml.setConversionDelay(2);

        GardenLog.log(GardenLog.DEBUG, "addElement");
        // add the first HTML to PDF document
        firstPdfPage.addElement(firstHtml);

        System.out.println("pdfDocument.save");
        // save the PDF document in a memory buffer
        GardenLog.log(GardenLog.DEBUG, "pdfDocument.save()");
        byte[] outPdfBuffer = pdfDocument.save();
        GardenLog.log(GardenLog.DEBUG, "finish");

        return outPdfBuffer;
    }

    /**
     * Launch the application.
     */
   /* public static void main(String[] args) throws Exception {
        System.out.println("start getPdf buffer");
        // create the PDF document in a buffer
        byte[] outPdfBuffer = createPdfDocument();
        System.out.println("start getPdf buffer success");

        //String outFilePath = "C:\\Work\\projects\\fubon\\WnvMergeMultipleHtml.pdf";
        String outFilePath ="C:\\WnvMergeMultipleHtml.pdf";
        // write the buffer to a file
        System.out.println("write file");
        writeBytesToFile(outPdfBuffer, outFilePath);
        System.out.println("write file OK");
    }*/
    

    private static void  writeBytesToFile(byte[] bytes, String outFilePath) throws Exception {
        // write the bytes into a file
    	GardenLog.log(GardenLog.DEBUG, "writeBytesToFile");
        OutputStream fs = null;
        try {
            fs = new FileOutputStream(outFilePath);
            fs.write(bytes, 0, bytes.length);
        } catch (Exception ex) {
            throw new Exception(
                    String.format("Could not write the output file '%1$s' : %2$s", outFilePath, ex.getMessage()));
        } finally {
            if (fs != null)
                fs.close();
        }
        GardenLog.log(GardenLog.DEBUG, "writeBytesToFile finish");
    }


}
