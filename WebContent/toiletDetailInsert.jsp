<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBConnect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%-- map marker date --%>
<%

/* url exam = /toiletDetailInsert.jsp?toiletIdx=2&genderYn=1&lockYn=y&pressureYn=y&tissueYn=y&soapYn=y&toiletCnt=1&bidetYn=y&cleanliness=y&facility=y&userIp=123.123.123.123 */

	JDBConnect jdbCommect = new JDBConnect();
	
	String toiletIdx = request.getParameter("toiletIdx");
	String genderYn = request.getParameter("genderYn");
	String lockYn = request.getParameter("lockYn");
	String pressureYn = request.getParameter("pressureYn");
	String tissueYn = request.getParameter("tissueYn");
	String soapYn = request.getParameter("soapYn");
	String toiletCnt = request.getParameter("toiletCnt");
	String bidetYn = request.getParameter("bidetYn");
	String cleanliness = request.getParameter("cleanliness");
	String facility = request.getParameter("facility");
	

	 // 2. 동적 SQL 생성
    String sql =" INSERT INTO TOILET_DETAIL( "
    		+"IDX "			
    		+",TOILET_IDX"
    		+",GENDER_YN"
    		+",LOCK_YN "		
    		+ ",PRESSURE_YN "
    		+ ",TISSUE_YN "
    		+ ",SOAP_YN "
    		+ ",TOILET_CNT "
    		+ ",BIDET_YN "
    		+ ",CLEANLINESS "
    		+ ",FACILITY "
    		+ ",INSERT_DT "
    		+ ",USER_IP "
    	+") VALUES ( "
    		+"SQ_TOILET_DETAIL.NEXTVAL "
    		+", ? "
    		+", ? "
    		+", ? "
    		+", ? "
    		+", ? "
    		+", ? "
    		+", ?"
    		+", ?"
    		+", ?"
    		+", ?"
    		+", SYSDATE"
    		+",?"
    	+")"; // ? 부분이 동적 파라미터입니다.

    		   
    		   
    jdbCommect.psmt = jdbCommect.con.prepareStatement(sql);
    jdbCommect.psmt.setString(1, toiletIdx);
    jdbCommect.psmt.setString(2, genderYn);
    jdbCommect.psmt.setString(3, lockYn);
    jdbCommect.psmt.setString(4, pressureYn);
    jdbCommect.psmt.setString(5, tissueYn);
    jdbCommect.psmt.setString(6, soapYn);
    jdbCommect.psmt.setString(7, toiletCnt);
    jdbCommect.psmt.setString(8, bidetYn);
    jdbCommect.psmt.setString(9, cleanliness);
    jdbCommect.psmt.setString(10, facility);
    jdbCommect.psmt.setString(11, request.getRemoteAddr());


    jdbCommect.psmt.executeQuery();

    out.print("ok");
%>
