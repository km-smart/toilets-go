<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBConnect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%-- map marker date --%>
<%
	JDBConnect jdbConnect = new JDBConnect();
	jdbConnect.stmt = jdbConnect.con.createStatement();
	ResultSet resultSet = jdbConnect.stmt.executeQuery(
		"SELECT TI.IDX"
	+	" 	, LONGITUDE"
	+	" 	, LATITUDE"
	+	" 	, SCORE_AVG"
	+	" 	, TD.LOCK_YN"
	+	" FROM TOILET_INFO TI"
	+	" JOIN ("
	+	"    SELECT MAX(IDX) AS IDX, TOILET_IDX"
	+	"    FROM TOILET_DETAIL"
	+	"    GROUP BY TOILET_IDX	"
	+	" ) LI ON TI.IDX = LI.TOILET_IDX"
	+	" INNER JOIN TOILET_DETAIL TD ON LI.IDX = TD.IDX");
	out.print(JsonUtil.convertList(resultSet));
%>
