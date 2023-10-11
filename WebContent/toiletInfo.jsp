<%@ page import="java.sql.ResultSet"%>
<%@ page import="common.JDBConnect"%>
<%@ page import="common.JsonUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%-- map marker date --%>

<%

	String restroomName = request.getParameter("restroomName");
	String address = request.getParameter("address");
	String detailedAddress = request.getParameter("detailedAddress");
	String longitude = request.getParameter("longitude");
	String latitude = request.getParameter("latitude");
	String reviewCnt = request.getParameter("reviewCnt");
	String scoreAvg = request.getParameter("scoreAvg");
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
			+ ", ? "
			+ ", ? "
			+ ", SYSDATE "
		+ ")"; 
		
		//동적 파라미터 매핑
		jdbConnect.psmt = jdbConnect.con.prepareStatement(sql);
		jdbConnect.psmt.setString(1, restroomName);
		jdbConnect.psmt.setString(2, address);
		jdbConnect.psmt.setString(3, detailedAddress);
		jdbConnect.psmt.setString(4, longitude);
		jdbConnect.psmt.setString(5, latitude);
		jdbConnect.psmt.setString(6, reviewCnt);
		jdbConnect.psmt.setString(7, scoreAvg);
		
		jdbConnect.psmt.execute();
		
		//ResultSet을 JSON으로 변환
		out.print("ok");
	} catch(Exception e){
		e.printStackTrace();
		out.print("no");
	} finally {
		jdbConnect.close();
	}
%>