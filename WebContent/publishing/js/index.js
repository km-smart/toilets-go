$(function(){
    // 동작(이벤트)을 실행하지 못하게 막는 메서드입니다.
    $("form").on("submit", (event) => {
        event.preventDefault();
        
        console.log(event.target);
    });
    //시작 함수 
    $(".map").show();
    $("footer .input2").on("click",function(){
        $(".info-popup").show();
        $("header").hide();
        $("footer").hide();

    })
    $(".close-btn").on("click",function(){
        $(".info-popup").hide();
        $("header").show();
        $("footer").show();
    })
    $(".sect01 .line-box").on("click",function(){
        $(".chang").hide();
    })
    $(".chang .button2").on("click",function(){
        $(".info-popup2").show();
        $(".chang").hide();
    })
    $(".btn-box1").on("click",function(){
        $(".modal").show();
        $(".info-popup2").show();
    })
    $(".btn-box2").on("click",function(){
        $("header").show();
        $(".chang").show();
        $(".info-popup2").hide();
    })
    $(".popup>.btn1>button").on("click",function(){
        $(".modal").hide();
        $(".info-popup2").show();
    })
    $(".btn-wrap ").on("click",function(){

    });
    $(".close-btn").on("click", function () {
        $(".info-popup").hide();
        $("header").show();
        $("footer").show();
    });
    $(".sect01 .line-box").on("click", function () {
        $(".chang").hide();
    });
    $(".chang .button1").on("click",function(){
        $(".info-popup2").show();
        $(".chang").hide();
    });
    $(".chang .button2").on("click",function(){
        $(".info-popup").show();
        $(".chang").hide();
    });
    $(".btn-box1").on("click",function(){
        $(".modal").show();
        $(".info-popup2").show();
    });
    $(".btn-box2").on("click", function () {
        $("header").show();
        $(".chang").show();
        $(".info-popup2").hide();
    });
    $(".popup>.btn1>button").on("click", function () {
        $(".modal").hide();
        $(".info-popup2").show();
    });
    $(".btn-wrap ").on("click", function () {

        $("header").show();
        $("footer").show();
        $(".info-popup2").hide();
    });

    $(".cancel").on("click",function(e){
        $(this).parents(".popup-wrap").hide();
    });
    createMap()
});

function ajax(url, data, sucsFunc, errFunc){
    $.ajax({
        method: "GET",
        url: `/${url}.jsp`,
        dataType: "json",
        data: data,
        success: (result) => {
            if(sucsFunc) sucsFunc(result);
            console.log(result);
        }, error: (err, obj, msg)=> {
            if(sucsFunc) errFunc(err, obj, msg);
            console.log(err, obj, msg);
        }
    })
}

function createMap() {
    const container = document.querySelector('.map'); //지도를 표시할 div

    // todo: 사용자의 좌표를 받아와서 설정
    const options = {
        center: new kakao.maps.LatLng(37.39277391544831, 126.92039682109709), // 근명고등학교 좌표
        level: 4
    };

    map = new kakao.maps.Map(container, options);
    
//여기부터 수정

    // 마커가 표시될 위치입니다
    markerPosition  = new kakao.maps.LatLng(37.39277391544831, 126.92039682109709); 

    
    imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(37.39277391544831, 126.92039682109709); // 마커가 표시될 위치입니다


    // 마커를 생성합니다
    marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage 
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    


};
