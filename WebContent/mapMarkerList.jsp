<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBConnect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%-- map marker date --%>
<%
	JDBConnect JDBConnect = new JDBConnect();
	JDBConnect.stmt = JDBConnect.con.createStatement();
	ResultSet resultSet = JDBConnect.stmt.executeQuery(
			"SELECT TD.TOILET_IDX"+
			"TD.GENDER_YN"+
			"TD.LOCK_YN"+
			"TD.PRESSURE_YN"+
			"TD.TISSUE_YN"+
			"TD.SOAP_YN"+
			"TD.TOILET_CNT"+
			"TD.BIDET_YN"+
			"TD.CLEANLINESS"+
			"TD.FACILITY"+
			"TD.INSERT_DT"+
			"JOIN ("+
			   "SELECT MAX(IDX) AS TOILET_IDX "+
			   "FROM TOILET_DETAIL "+
			  " GROUP BY TOILET_IDX "+
			" ) LI ON TI.IDX = LI.TOILET_IDX "+
			"INNER JOIN TOILET_DETAIL TD ON TD.IDX=TI.IDX");
	out.print(JsonUtil.convertList(resultSet));
%>
