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
			"SELECT TI.RESTROOM_NAME"
			+ ", TI.ADDRESS"
			+ ", TI.DETAILED_ADDRESS"
			+ ", TI.SCORE_AVG"
			+ ", TI.REVIEW_CNT" 
			+ ", TD.IDX"
			+ ", TD.TOILET_IDX" 
			+ ", TD.GENDER_YN"
			+ ", TD.LOCK_YN" 
			+ ", TD.PRESSURE_YN"
			+ ", TD.TISSUE_YN"  
			+ ", TD.SOAP_YN" 
			+ ", TD.TOILET_CNT" 
			+ ", TD.BIDET_YN" 
			+ ", TD.CLEANLINESS" 
			+ ", TD.FACILITY" 
			+ ", TD.INSERT_DT " 
		+"FROM TOILET_INFO TI "
		+"JOIN("
			+"SELECT TOILET_IDX" 
				+", MAX(IDX) AS IDX "
			+"FROM TOILET_DETAIL TD "
			+"GROUP BY TOILET_IDX" 
		+") LI ON TI.IDX=LI.TOILET_IDX "
		+"JOIN TOILET_DETAIL TD ON LI.IDX=TD.IDX "
		+"WHERE TI.IDX  = "+request.getParameter("idx")
);
	out.print(JsonUtil.convertOne(resultSet));
%>
