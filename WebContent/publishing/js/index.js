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
    $(".chang .button1").on("click",function(){
        $(".info-popup2").show();
        $(".chang").hide();
    })
    $(".chang .button2").on("click",function(){
        $(".info-popup").show();
        $(".chang").hide();
    })
    $(".btn-box1").on("click",function(){
        $(".modal").show();
        $(".info-popup2").show();
    })
    $(".btn-box2").on("click",function(){
        $(".chang").show();
        $(".info-popup2").hide();
    })
    $(".popup>.btn1>button").on("click",function(){
        $(".modal").hide();
        $(".info-popup2").show();
    })
    $(".btn-wrap ").on("click",function(){
        $("header").show();
        $("footer").show();
        $(".info-popup2").hide();
    })

    $(".cancel").on("click",function(e){
        $(this).parents(".popup-wrap").hide();
    });
});

function exam() {
    // 예시 함수
    console.log("브라우저 시작");
}