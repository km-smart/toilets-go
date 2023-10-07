<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBConnect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	JDBConnect JDBConnect = new JDBConnect();
	JDBConnect.stmt = JDBConnect.con.createStatement();
	ResultSet resultSet = JDBConnect.stmt.executeQuery("SELECT * "
	+ "FROM TOILET_INFO TI "
	+ "JOIN TOILET_DETAIL TD ON TI.IDX = TD.TOILET_IDX ");
//			+ "WHERE TD.IDX IN ('2')");
	out.print(JsonUtil.convertList(resultSet));
%>
