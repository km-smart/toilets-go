<%@page import="org.json.JSONArray"%>
<%@ page import="java.sql.Connection, java.sql.PreparedStatement, java.sql.ResultSet" %>
<%@ page import="common.JDBConnect"%>
<%@ page import="common.JsonUtil" %>
<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%
/* url exam = /mapMarkerList1.jsp?toiletIdx=1&name=화장실&score=3.4&mainText=테스트입니다&userIp=127.127.127.127 */
    
	// 2. URL로부터 파라미터 가져오기 (예: parameterName)
    String toiletIdx = request.getParameter("toiletIdx");
	String name = request.getParameter("name");
	String score = request.getParameter("score");
	String mainText = request.getParameter("mainText");
    
    // 3. 데이터베이스 연결
	JDBConnect jdbCommect = new JDBConnect();
    
    try {
        // 2. 동적 SQL 생성
        String sql = "INSERT INTO REVIEW ("
        		+ "IDX,       "
        		+ "TOILET_IDX,"
        		+ "NAME,      "
        		+ "SCORE ,    "
        		+ "MAIN_TEXT, "
        		+ "INSERT_DT, "
        		+ "USER_IP    "
        		+ ") VALUES ("
        		+ "SQ_REVIEW.NEXTVAL,"
        		+ "?, "
        		+ "?, "
        		+ "?, "
        		+ "?, "
        		+ "sysdate, "
        		+ "?"
        		+ ")"; // ? 부분이 동적 파라미터입니다.

        jdbCommect.psmt = jdbCommect.con.prepareStatement(sql);
        jdbCommect.psmt.setString(1, toiletIdx);
        jdbCommect.psmt.setString(2, name);
        jdbCommect.psmt.setString(3, score);
        jdbCommect.psmt.setString(4, mainText);
        jdbCommect.psmt.setString(5, request.getRemoteAddr());

        jdbCommect.psmt.execute();
        
        
        
        // 2. 동적 SQL 생성
        String updtSql = "UPDATE TOILET_INFO "
       		+ "SET SCORE_AVG = ("
       		+ "		SELECT AVG(score)"
       		+ "		FROM REVIEW"
       		+ "		WHERE TOILET_IDX = ?"
       		+ "		GROUP BY TOILET_IDX"
       		+ "	)"
       		+ "	WHERE IDX = ?"; // ? 부분이 동적 파라미터입니다.

        jdbCommect.psmt = jdbCommect.con.prepareStatement(updtSql);
        jdbCommect.psmt.setString(1, toiletIdx);
        jdbCommect.psmt.setString(2, toiletIdx);

        jdbCommect.psmt.execute();

        // 3. ResultSet을 JSON으로 변환
        out.print("{\"mgs\": \"ok\"}");
    } catch (Exception e) {
        e.printStackTrace();

        out.print("no");
    } finally {
        jdbCommect.close();
    }
%>
