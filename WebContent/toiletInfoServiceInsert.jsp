<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBConnect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%-- map marker date --%>

<%

	// 화장실 정보 테이블 insert
	String restroomName = request.getParameter("restroomName");
	String address = request.getParameter("address");
	String detailedAddress = request.getParameter("detailedAddress");
	String longitude = request.getParameter("longitude");
	String latitude = request.getParameter("latitude");
	// http://localhost:8080/toiletInfo.jsp?restroomName=태인이&address=근명&detailedAddress=고등학교&longitude=123.1234&latitude=37.3758&reviewCnt=5&scoreAvg=3.5
	JDBConnect jdbConnect = new JDBConnect();
	
	try{
		//동적 sql생성
		String sql = "INSERT INTO TOILET_INFO( "
			+ "IDX"		
			+ ", RESTROOM_NAME "
			+ ", ADDRESS "
			+ ", DETAILED_ADDRESS "	
			+ ", LONGITUDE "	
			+ ", LATITUDE "
			+ ", REVIEW_CNT "	
			+ ", SCORE_AVG "	
			+ ", INSERT_DT "	
		+ ") VALUES ( "
			+ "SQ_TOILET_DETAIL.NEXTVAL "
			+ ", ? "
			+ ", ? "
			+ ", ? "
			+ ", ? "
			+ ", ? "
			+ ", 0 "
			+ ", 0 "
			+ ", SYSDATE "
		+ ")"; 
		
		//동적 파라미터 매핑
		jdbConnect.psmt = jdbConnect.con.prepareStatement(sql);
		jdbConnect.psmt.setString(1, restroomName);
		jdbConnect.psmt.setString(2, address);
		jdbConnect.psmt.setString(3, detailedAddress);
		jdbConnect.psmt.setString(4, longitude);
		jdbConnect.psmt.setString(5, latitude);
		
		jdbConnect.psmt.execute();
		





		// 화장실 상세정보 insert
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
				+", SQ_TOILET_DETAIL.CURRVAL "
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
		jdbCommect.psmt.setString(1, genderYn);
		jdbCommect.psmt.setString(2, lockYn);
		jdbCommect.psmt.setString(3, pressureYn);
		jdbCommect.psmt.setString(4, tissueYn);
		jdbCommect.psmt.setString(5, soapYn);
		jdbCommect.psmt.setString(6, toiletCnt);
		jdbCommect.psmt.setString(7, bidetYn);
		jdbCommect.psmt.setString(8, cleanliness);
		jdbCommect.psmt.setString(9, facility);
		jdbCommect.psmt.setString(10, request.getRemoteAddr());
	
	
		jdbCommect.psmt.executeQuery();






		//ResultSet을 JSON으로 변환
        out.print("{\"mgs\": \"ok\"}");
	} catch(Exception e){
		e.printStackTrace();
        out.print("{\"mgs\": \"no\"}");
	} finally {
		jdbConnect.close();
	}
%>