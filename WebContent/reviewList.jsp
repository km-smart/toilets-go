<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBConnect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%-- map marker date --%>
<%
	JDBConnect jdbCommect = new JDBConnect();
	jdbCommect.stmt = jdbCommect.con.createStatement();
	ResultSet resultSet = jdbCommect.stmt.executeQuery(
		"SELECT NAME, SCORE, MAIN_TEXT, INSERT_DT"
		+ " FROM REVIEW"
		+ " WHERE TOILET_IDX = " + request.getParameter("toiletIdx")
		+ " ORDER BY INSERT_DT DESC"
	);
	out.print(JsonUtil.convertList(resultSet));
%>
