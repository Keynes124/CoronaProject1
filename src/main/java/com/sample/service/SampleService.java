package com.sample.service;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;

public interface SampleService {
	List<HashMap<String, Object>> selectBoardList(HashMap<String, Object> map) throws Exception;

	HashMap<String, Object> findRoute(HashMap<String, Object> map) throws Exception;

	JSONObject callapihttp();

	int insertData(HashMap<String, Object> map) throws Exception;
}
