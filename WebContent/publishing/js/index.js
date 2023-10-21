const ps = new kakao.maps.services.Places();
let map;

$(function () {
    // 동작(이벤트)을 실행하지 못하게 막는 메서드입니다.
    $("form").on("submit", (event) => {
        event.preventDefault();

        console.log(event.target);
    });
    //시작 함수 
    $(".map").show();
    $("footer .input2").on("click", function () {
        $(".info-popup").show();
        $("header").hide();
        $("footer").hide();

    })
    $(".close-btn").on("click", function () {
        $(".info-popup").hide();
        $("header").show();
        $("footer").show();
    })
    $(".sect01 .line-box").on("click", function () {
        $(".chang").hide();
    })
    $(".chang .button2").on("click", function () {
        $(".info-popup2").show();
        $(".chang").hide();
    })
    $(".btn-box1").on("click", function () {
        $(".modal").show();
        $(".info-popup2").show();
    })
    $(".btn-box2").on("click", function () {
        $("header").show();
        $(".chang").show();
        $(".info-popup2").hide();
    })
    $(".popup>.btn1>button").on("click", function () {
        $(".modal").hide();
        $(".info-popup2").show();
    })
    $(".btn-wrap ").on("click", function () {

    });
    $(".close-btn").on("click", function () {
        $(".info-popup").hide();
        $("header").show();
        $("footer").show();
    });
    $(".sect01 .line-box").on("click", function () {
        $(".chang").hide();
    });
    $(".chang .button1").on("click", function () {
        $(".info-popup2").show();
        $(".chang").hide();
    });
    $(".chang .button2").on("click", function () {
        $(".info-popup").show();
        $(".chang").hide();
    });
    $(".btn-box1").on("click", function () {
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
    $("#searchBtn").on("click", function () {
        searchPlaces();
    });

    $(".cancel").on("click", function (e) {
        $(this).parents(".popup-wrap").hide();
    });

     // "input2" 클릭 시 "info-popup popup-wrap"에서 텍스트 입력 가능하게
     $("footer .input2").on("click", function () {
        $(".info-popup").show();
        $("header").hide();
        $("footer").hide();
        // 텍스트 입력 가능하도록 해제
        $(".info-popup input[type='text']").prop('readonly', false);
    });

    // "button2" 클릭 시 "info-popup popup-wrap"에서 텍스트 읽기 전용으로
    $(".chang .button2").on("click", function(){
        $(".info-popup").show();
        $(".chang").hide();
        // 텍스트 읽기 전용으로 설정
        $(".info-popup input[type='text']").prop('readonly', true);
    });

    // "input2" 클릭 시 "info-popup popup-wrap"에서 텍스트 입력 가능하게
    $("footer .input2").on("click", function () {
        $(".info-popup").show();
        $("header").hide();
        $("footer").hide();
        // "등록하기"와 "등록취소" 버튼 나타나게
        $(".info-popup .btn-wrap button").show();
    });

    // "button2" 클릭 시 "chang popup-wrap"에서 텍스트 읽기 전용으로
    $(".chang .button2").on("click", function(){
        $(".info-popup").show();
        $(".chang").hide();
        // "등록하기"와 "등록취소" 버튼 숨기게
        $(".info-popup .btn-wrap button").hide();
    });




    createMap();

    refreshMarker();

});

function ajax(url, data, sucsFunc, errFunc) {
    $.ajax({
        method: "GET",
        url: `/${url}.jsp`,
        dataType: "json",
        data: data,
        success: (result) => {
            if (sucsFunc) sucsFunc(result);
            console.log(result);
        }, error: (err, obj, msg) => {
            if (sucsFunc) errFunc(err, obj, msg);
            console.log(err, obj, msg);
        }
    })
}

// 맵 생성
function createMap() {
    
}