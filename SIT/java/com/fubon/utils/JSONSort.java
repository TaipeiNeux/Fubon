package com.fubon.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.neux.garden.log.GardenLog;

public class JSONSort {
	public static int[][] keyNums;
	
	public JSONArray JSONSort(JSONArray jsonArr, String[][] keys) throws JSONException{
	    if(jsonArr.length() > 0) {
			JSONArray jsonArrSorted = new JSONArray();
		    List<JSONObject> jsonValues = new ArrayList<JSONObject>();
		    keyNums = new int[keys.length][2];
		    
		    for (int i = 0; i < jsonArr.length(); i++) {
		    	jsonValues.add(jsonArr.getJSONObject(i));
		    }
		    
		    for (int i = 0; i < jsonValues.get(0).getJSONArray("datas").length(); i++) {
		    	for(String[] keytmp: keys){
		        	String[] key = keytmp[0].split(":");
		        	int sort = keytmp[1].equalsIgnoreCase("asc") ? 0 : 1;
		        	if(jsonValues.get(0).getJSONArray("datas").getJSONObject(i).getString(key[0]).toString().equals(key[1])) keyNums[i] = new int[]{i,sort};
		        }
		    }
		    
		    Collections.sort( jsonValues, new Comparator<JSONObject>() {
		        @Override
		        public int compare(JSONObject a, JSONObject b) {
		            String valA = new String();
		            String valB = new String();
		            int value = -2;
		            
		            try {
		            	for(int[] keyNum: keyNums){
			            	valA = (String) a.getJSONArray("datas").getJSONObject(keyNum[0]).getString("value");
			                valB = (String) b.getJSONArray("datas").getJSONObject(keyNum[0]).getString("value");
			                if(!valA.equals(valB)){
			                	value = keyNum[1]==0 ? valA.compareTo(valB) : -valA.compareTo(valB);
			                	break;
			                }
		            	}
		            } catch (JSONException e) {
		            	GardenLog.log(GardenLog.DEBUG, "JSONSort Exception=>" + e.getMessage());
		            }
	
		            return value;
		        }
		    });
	
		    for (int i = 0; i < jsonValues.size(); i++) {
		    	jsonArrSorted.put(jsonValues.get(i));
		    }
		    
		    jsonArr = jsonArrSorted;
	    }

	    return jsonArr;
	}
}
