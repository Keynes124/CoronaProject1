package com.common.dao;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class AbstractDAO {
	protected Logger log = LoggerFactory.getLogger(AbstractDAO.class);

	@Autowired
	private SqlSessionTemplate sqlSession;

	protected void printQueryId(String queryId) {
		if (log.isDebugEnabled()) {
			log.debug("\t QueryId \t: " + queryId);
		}
	}

	public int insert(String queryId, Object params) {
		printQueryId(queryId);
		return sqlSession.insert(queryId, params);
	}

	public Object update(String queryId, Object params) {
		printQueryId(queryId);
		return sqlSession.update(queryId, params);
	}

	public Object delete(String queryId, Object params) {
		printQueryId(queryId);
		return sqlSession.delete(queryId, params);
	}

	public Object selectOne(String queryId) {
		printQueryId(queryId);
		return sqlSession.selectOne(queryId);
	}

	public HashMap<String, Object> selectOne(String queryId, Object params) {
		printQueryId(queryId);
		return sqlSession.selectOne(queryId, params);
	}

	public List<HashMap<String, Object>> selectList(String queryId) {
		printQueryId(queryId);
		return sqlSession.selectList(queryId);
	}

	public List<HashMap<String, Object>> selectList(String queryId, Object params) {
		printQueryId(queryId);
		return sqlSession.selectList(queryId, params);
	}

}
