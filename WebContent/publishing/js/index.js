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
        $("header").show();
        $("footer").show();
        $(".info-popup2").hide();
    })

    $(".cancel").on("click",function(e){
        $(this).parents(".popup-wrap").hide();
    });

    $(".drhg").on("click",function(e){
        $(this).parents(".uppopup").show();
    });

    $(".upno").click(function(){
        $(".uppopup").hide();
    });

    $(".drhg").click(function(){
        $(".uppopup").show();
    });

    $(".flqb").click(function(){
        $(".info-popup2").show();
    });

    $(".cnrk").click(function(){
        $(".modal").hide();
    });

    // 별점
    // JavaScript 변수를 초기화합니다.
    let userRating = 0;

    // 별점을 클릭할 때 호출될 함수
    function handleStarClick(event) {
    const clickedStar = event.target;
    const rating = parseInt(clickedStar.getAttribute("data-rating"));

    // 사용자가 클릭한 별점을 변수에 저장합니다.
    userRating = rating;

    // 모든 별점을 리셋합니다.
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
        star.textContent = "☆";
    });

    // 클릭한 별점까지만 채웁니다.
    for (let i = 0; i < rating; i++) {
        stars[i].textContent = "★";
    }
    }

    // 별점을 클릭할 때 함수를 연결합니다.
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
    star.addEventListener("click", handleStarClick);
    });
        
    $(".cnrk").click(function(){
        console.log(userRating);
    });


});

function exam() {
    // 예시 함수
    console.log("브라우저 시작");
}


