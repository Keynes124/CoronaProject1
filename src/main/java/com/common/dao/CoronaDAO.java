package com.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("coronaDAO")
public class CoronaDAO extends AbstractDAO{
	protected Logger log = LoggerFactory.getLogger(this.getClass());

	public List<HashMap<String, Object>> selectBoardList(HashMap<String, Object> map) {
		return selectList("corona.selectList", map);
	}

	public int insertData(HashMap<String, Object> map) throws Exception {
		return insert("corona.insertData", map);
	}

	/*
	 * public void updateHitCnt(Map<String, Object> map) {
	 * update("corona.updateHitCnt", map); }
	 */
	
	public HashMap<String, Object> findRoute(HashMap<String, Object> map) {
		return selectOne("corona.findRoute", map);
	}

	
	
}
