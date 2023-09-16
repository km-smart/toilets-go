<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBCommect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%-- map marker date --%>
<%
	JDBCommect jdbCommect = new JDBCommect();
	jdbCommect.stmt = jdbCommect.con.createStatement();
	ResultSet resultSet = jdbCommect.stmt.executeQuery(
			"SELECT TI.IDX,"+
			"LONGITUDE,"+
			"LATITUDE,"+
			"SCORE_AVG," +
			"TD.LOCK_YN "+
			"FROM TOILET_INFO TI "+
			"JOIN ("+
			   "SELECT MAX(IDX) AS TOILET_IDX "+
			   "FROM TOILET_DETAIL "+
			  " GROUP BY TOILET_IDX "+
			" ) LI ON TI.IDX = LI.TOILET_IDX "+
			"INNER JOIN TOILET_DETAIL TD ON TD.IDX=TI.IDX");
	out.print(JsonUtil.convertList(resultSet));
%>
