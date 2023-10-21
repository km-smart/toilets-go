--서비스 에서 사용할 SQL
--화장실 상세 설명(정은찬)
SELECT TI.RESTROOM_NAME
   , TI.ADDRESS
   , TI.SCORE_AVG
   , TI.REVIEW_CNT 
   , TD.IDX 
   , TD.TOILET_IDX 
   , TD.GENDER_YN 
   , TD.LOCK_YN 
   , TD.PRESSURE_YN
   , TD.TISSUE_YN  
   , TD.SOAP_YN 
   , TD.TOILET_CNT 
   , TD.BIDET_YN 
   , TD.CLEANLINESS 
   , TD.FACILITY 
   , TD.INSERT_DT 
FROM TOILET_INFO TI
JOIN(
   SELECT TOILET_IDX 
      , MAX(IDX) AS IDX
   FROM TOILET_DETAIL TD
   GROUP BY TOILET_IDX 
) LI ON TI.IDX=LI.TOILET_IDX
JOIN TOILET_DETAIL TD ON LI.IDX=TD.IDX
WHERE TI.IDX  = 2
--마커 클릭시 뜨는 화장실 정보(이태인)
SELECT TI.*, TD.LOCK_YN
FROM TOILET_INFO TI
JOIN ( 
   SELECT MAX(Idx) IDX, TOILET_IDX
   FROM TOILET_DETAIL
   GROUP BY TOILET_IDX
) LI ON TI.IDX = LI.TOILET_IDX
JOIN TOILET_DETAIL TD ON LI.IDX = TD.IDX

--지도 마커용 데이터(박정훈)
SELECT TI.IDX, LONGITUDE, LATITUDE, SCORE_AVG, TD.LOCK_YN
FROM TOILET_INFO TI
JOIN (
   SELECT MAX(IDX) AS IDX, TOILET_IDX
   FROM TOILET_DETAIL
   GROUP BY TOILET_IDX
) LI ON TI.IDX = LI.TOILET_IDX
INNER JOIN TOILET_DETAIL TD ON LI.IDX = TD.IDX;





SELECT AVG(score)
FROM REVIEW
WHERE TOILET_IDX = 1
GROUP BY TOILET_IDX;

UPDATE TOILET_INFO
SET SCORE_AVG = (
	SELECT AVG(score)
	FROM REVIEW
	WHERE TOILET_IDX = 1
	GROUP BY TOILET_IDX
)
WHERE IDX = 1;