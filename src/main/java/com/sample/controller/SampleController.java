package com.sample.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.sample.service.SampleService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class SampleController {
	protected Logger log = LoggerFactory.getLogger(this.getClass());

	@Resource(name = "sampleService")
	private SampleService sampleService;

	@RequestMapping(value = "/{service}")
	private String view(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("service") String service, Model model) {
		String page = "";

		if (service.equals("home")) {
			System.out.println("home");
			page = "home";
		}
		if (service.equals("insert")) {
			System.out.println("insert");
			page = "insert";
		}

		return page;
	}

	@RequestMapping(value = "/service/{action}")
	public void controller2(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("action") String action) throws Exception {
		HashMap<String, Object> param = new HashMap<String, Object>();
		HashMap<String, Object> map = new HashMap<String, Object>();
		JSONObject jo = null;
		Enumeration<String> enumeration = request.getParameterNames();
		while (enumeration.hasMoreElements()) {
			String key = enumeration.nextElement();
			String value = request.getParameter(key);
			param.put(key, value);
		}

		if (action.equals("xmlDownload")) {
			JSONObject json = sampleService.callapihttp();
			jo = json;
		} else if (action.equals("getData")) {
			List<HashMap<String, Object>> list = sampleService.selectBoardList(param);
			map.put("list", list);
			map.put("result", true);

			jo = new JSONObject(map);
		} else if (action.equals("findRoute")) {
			jo = new JSONObject(sampleService.findRoute(param));
		} else if (action.equals("insertData")) {
			int cnt = sampleService.insertData(param);

			boolean result = false;
			if (cnt == 0) {
				result = false;
			} else {
				result = true;
			}
			map.put("result", result);
		}
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("application/json");
		response.getWriter().print(jo);
		response.getWriter().flush();
	}

	public ModelAndView home(HashMap<String, Object> map) throws Exception {
		ModelAndView mv = new ModelAndView("home");
		log.debug("인터셉터 테스트");

		return mv;
	}

	@RequestMapping(value = "/xmlDownload.do")
	public ModelAndView xmlDownload(HashMap<String, Object> map) throws Exception {
		ModelAndView mv = new ModelAndView("/sample/boardList");
		List<HashMap<String, Object>> list = sampleService.selectBoardList(map);
		mv.addObject("list", list);
		log.debug("인터셉터 테스트");

		return mv;
	}

}
