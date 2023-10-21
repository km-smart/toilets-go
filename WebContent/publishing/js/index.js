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


    // 화장실 정보 등록하기 버튼 클릭시
    $("#infoAddBtn").on("click", function(){
        const data = $(".info-popup form").serializeArray();
        ajax("toiletInfoServiceInsert", data, function(){
            alert("등록되었습니다.");
            refreshMarker();
            $(".info-popup").hide();
        })
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




    // 장소 검색
    $("#keyword").on("keydown", e => e.keyCode === 13 ? searchPlaces() : true);
    $("#searchBtn").on("click", e => searchPlaces());
    
    // 리스트 클릭시 이동
    $("#placesList").on("click", ".item", e => {
        const lat = $(e.currentTarget).data("lat");
        const lot = $(e.currentTarget).data("lot");
        map.setCenter(new kakao.maps.LatLng(lat, lot));
        map.setLevel(4);
        $("#placesList").hide();
    });

    // 내위치 갱신
    $(".sub2").on("click", function(){
        navigator.geolocation.getCurrentPosition(function (result) {
            map.setCenter(new kakao.maps.LatLng(result.coords.latitude, result.coords.longitude));
        });
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
            if (errFunc) errFunc(err, obj, msg);
            console.log(err, obj, msg);
        }
    })
}

// 맵 생성
function createMap() {

    const container = document.querySelector('.map');

    navigator.geolocation.getCurrentPosition(function (result) {
        const options = {
            center: new kakao.maps.LatLng(result.coords.latitude, result.coords.longitude),
            level: 4
        };

        map = new kakao.maps.Map(container, options);
    });
};


// 마커 새로고침
function refreshMarker() {
    ajax("mapMarkerList", {}, function (result){
        console.log(result);
    })
}



// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;
    
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        $("#placesList").hide();
        return false;
    }
    
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);
        $("#placesList").show();

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}



// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    for (var i = 0; i < places.length; i++) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
            '   <span class="jibun gray">' + places.address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';
    el.dataset.lat = places.y;
    el.dataset.lot = places.x;

    return el;
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}
