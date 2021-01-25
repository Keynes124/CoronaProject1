package com.common.logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class LoggerInterceptor extends HandlerInterceptorAdapter{
	// (1) 화면에 무엇인가를 출력할 때는 모두 Log4j를 사용하는데 이는 아래와 같이 사용한다.
	//     Log 객체를 생성할 때는 몇 가지 방법이 있는데 여기서는 생성자에 현재 클래스를 입력하였다.
	protected Logger log = LoggerFactory.getLogger(LoggerInterceptor.class);

	
	
	// (2) 전처리기와 후처리기의 메서드를 등록한다.
	//     preHandle()과 postHandle()메서드가 전처리기와 후처리기에 해당한다. 
	//     preHandle()은 컨트롤러가 호출되기 전에 실행된다. 
	//     postHandle()은 컨트롤러가 실행되고 난 후에 호출된다.
	//     여기서는 단순히 START와 END의 로그를 출력함으로써, 하나의 요청을 쉽게 볼 수 있도록 경계선을 그어주는 역할을 한다.	

	
	
	// (3) preHandle()에서 현재 호출된 URI가 무엇인지 보여주도록한다.
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if(log.isDebugEnabled()) {
			log.debug("====================================== START ======================================");
			log.debug(" Request URI \t: " + request.getRequestURI());
		}
		return super.preHandle(request, response, handler);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		if(log.isDebugEnabled()) {
			log.debug("====================================== END ======================================\n");
		}
		super.postHandle(request, response, handler, modelAndView);
	}
	
}
