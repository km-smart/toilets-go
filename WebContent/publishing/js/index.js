let map;

$(function () {
    // form 전송 막기
    $("form").on("submit", (event) => {
        event.preventDefault();
    });
    //시작 함수 
    $(".map").show();
    $("footer .input2").on("click", function () {
        $(".info-popup").show();
        $("header").hide();
        $("footer").hide();
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

    $(".cancel").on("click", function (e) {
        $(this).parents(".popup-wrap").hide();
    });
    // 맵 생성
    createMap();

    // todo: 정훈용 임시 테이터
    ajax("toiletDetail", {idx: 2}, function(result){
        console.log("성공 함수!", result)
    });

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
    const container = document.querySelector('.map');

    navigator.geolocation.watchPosition(function(result){
        const options = {
            center: new kakao.maps.LatLng(result.coords.latitude, result.coords.longitude),
            level: 4
        };

        map = new kakao.maps.Map(container, options);
    });
};