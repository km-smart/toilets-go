<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBCommect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	JDBCommect jdbCommect = new JDBCommect();
	jdbCommect.stmt = jdbCommect.con.createStatement();
	ResultSet resultSet = jdbCommect.stmt.executeQuery("SELECT * "
			+ "FROM TOILET_INFO TI "
			+ "JOIN TOILET_DETAIL TD ON TI.IDX = TD.TOILET_IDX ");
//			+ "WHERE TD.IDX IN ('2')");
	out.print(JsonUtil.convertList(resultSet));
%>

