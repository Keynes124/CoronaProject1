package com.sample.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.common.dao.CoronaDAO;

@Service("sampleService")
public class SampleServiceImpl implements SampleService {
	protected Logger log = LoggerFactory.getLogger(this.getClass());

	@Resource(name = "coronaDAO")
	private CoronaDAO coronaDAO;

	@Override
	public List<HashMap<String, Object>> selectBoardList(HashMap<String, Object> map) throws Exception {
		return coronaDAO.selectBoardList(map);
	}

	@Override
	public int insertData(HashMap<String, Object> map) throws Exception {
		return coronaDAO.insertData(map);
	}

	@Override
	public HashMap<String, Object> findRoute(HashMap<String, Object> map) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		
		HashMap<String, Object> tempMap = coronaDAO.findRoute(map);
		resultMap.put("map", tempMap);
		
		return resultMap;
	}

	
	public JSONObject callapihttp(){
		JSONObject jo = null;

		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			String nowDate = sdf.format(new Date());

			StringBuilder urlBuilder = new StringBuilder(
					"http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson"); /* URL */
			urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8")
			+ "=xd9KN2UOSssqVS84%2B%2BMF8MCygZ%2FcV88H%2Bk289Bojw9RqXTTV0QUX6%2BnBQqbdnC7qklkrFCq0tKB%2FAL4BGIy4%2FQ%3D%3D"
			+ "&pageNo=1&numOfRows=10&startCreateDt=20200310&endCreateDt=" + nowDate
			);
			
			URL url = new URL(urlBuilder.toString());
			System.out.println(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");
			
			System.out.println("Response code: " + conn.getResponseCode());
			
			BufferedReader rd;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			rd.close();
			conn.disconnect();
			
			String resultStr = sb.toString();
			JSONObject xmlJSONObj = XML.toJSONObject(resultStr);
			
			String xmlJSONObjString = xmlJSONObj.toString();
			JSONObject jo1 = (JSONObject) xmlJSONObj.get("response");
			JSONObject jo2 = (JSONObject) jo1.get("body");
			JSONObject jo3 = (JSONObject) jo2.get("items");
			JSONArray ja = (JSONArray) jo3.get("item");
			jo = (JSONObject) ja.getJSONObject(0);
		} catch (Exception e) {
			// TODO: handle exception
		}
        return jo;
	}

}
