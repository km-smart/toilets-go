const ps = new kakao.maps.services.Places();
let map, selectedMarker = null;
const imageSrc = 'img/marker.png';
const markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(45, 40)); // 기본 마커 사이즈
const markerClickImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(50, 45)); // 마커 클릭시 사이즈


$(function () {
    // 동작(이벤트)을 실행하지 못하게 막는 메서드입니다.
    $("form").on("submit", (event) => {
        event.preventDefault();

        console.log(event.target);
    });

    // 기본 이벤트 리스너
    
    // 화장실 정보 등록
    $("footer .input2").on("click", function () {
        $("#detailPopup").css("display", "flex");
    })
    // 리뷰 확인
    $("#reviewBtn").on("click", function () {
        $("#reviewPopup").css("display", "flex");
    });
    // 리뷰 작성
    $("#reviewWriteBtn").on("click", function () {
        $("#reviewWritePopup").css("display", "flex");
    })
    // 리뷰 등록하기
    $("#reviewAddBtn").on("click", function () {
        const data = $("#detailPopup form").serializeArray();
        ajax("toiletInfoServiceInsert", data, function () {
            alert("등록되었습니다.");
            refreshMarker();
            $("#detailPopup").hide();
        })
    })

    // 
    $(".popup>.btn1>button").on("click", function () {
        $(".modal").hide();
        $("#reviewPopup").css("display", "flex");
    });


    // 화장실 정보 등록하기
    $("#detailInfoAddBtn").on("click", function () {
        const data = $("#detailPopup form").serializeArray();
        ajax("toiletInfoServiceInsert", data, function () {
            alert("등록되었습니다.");
            refreshMarker();
            $("#detailPopup").hide();
        })
    });

    // "화장실 등록하기" 버튼 클릭 이벤트
    $("#infoAddBtn").on("click", function () {
        // 리뷰작성창의 입력 필드를 초기화
        $("#detailPopup input, #detailPopup textarea").val('');
        $("#detailPopup input[type=radio]").prop('checked', false);
        // "등록하기" 버튼 나타나게
        $("#detailPopup .btn-wrap").css("display", "flex");
    });

    // "#detailBtn" 클릭 시 "info-popup popup-wrap"에서 텍스트 읽기 전용으로
    $(".chang #detailBtn").on("click", function () {
        // 텍스트 읽기 전용으로 설정
        $("#detailPopup input, #detailPopup textarea").prop('readonly', true);
        $("#detailPopup input[type=radio]").attr('onclick', "return false");
        // "등록하기" 버튼 숨기게
        $("#detailPopup .btn-wrap").hide();

        $("#detailPopup").css("display", "flex");
    });


    $(".cancel").on("click", function (e) {
        $(this).parents(".popup-wrap").hide();

        // 상세보기 창에서 닫기를 누르면 선택한 마커 해제
        if($(this).parents(".chang").length > 0){
            selectedMarker.setImage(markerImage);
            selectedMarker = null;
        }
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
    $(".sub2").on("click", function () {
        navigator.geolocation.getCurrentPosition(function (result) {
            map.setCenter(new kakao.maps.LatLng(result.coords.latitude, result.coords.longitude));
        });
    });


    createMap();
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
    const container = document.querySelector('.map'); //지도를 표시할 div

    navigator.geolocation.getCurrentPosition(function (result) {
        const options = {
            center: new kakao.maps.LatLng(result.coords.latitude, result.coords.longitude),
            level: 4
        };

        map = new kakao.maps.Map(container, options);

        refreshMarker();
    });
};

// 서버 안키고 개발시 임시 테이터!
var result = [
    {
        idx: 1,
        lot: 33.450705,
        lat: 126.570677
    },
    {
        idx: 2,
        lot: 33.450936,
        lat: 126.569477
    },
    {
        idx: 3,
        lot: 33.450879,
        lat: 126.569940
    },
    {
        idx: 4,
        lot: 33.451393,
        lat: 126.570738
    }
];

// 마커 새로고침
function refreshMarker() {
    ajax("mapMarkerList", {}, function (result1) {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        const imageSize = new kakao.maps.Size(24, 35);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        for (item of result) {
            // 마커를 생성합니다
            new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(item.lot, item.lat), // 마커를 표시할 위치
                title: item.idx, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });
        }
    }, function () {
        for (item of result) {
            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(item.lot, item.lat), // 마커를 표시할 위치
                image: markerImage // 마커 이미지 
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 클릭 이미지로 변경합니다
                if (!selectedMarker || selectedMarker !== marker) {

                    // 클릭된 마커 객체가 null이 아니면
                    // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                    !!selectedMarker && selectedMarker.setImage(markerImage);

                    // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                    marker.setImage(markerClickImage);

                    createToiletInfo(item.idx);
                }

                // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
                selectedMarker = marker;
            });

            map.setCenter(new kakao.maps.LatLng(item.lot, item.lat));
        }
    })
}

function createToiletInfo(idx) {
    ajax("toiletDetail", { idx: idx }, function (result) {
        $(".chang").css("display", "flex");
        $(".chang .title").text(result.restroomName);
        $(".chang .cont").text(result.cleanliness);
    }, function (result) {
        $(".chang").css("display", "flex");
        $(".chang .title").text("화장실 이름");
        $(".chang .cont").text("내용");
    });
}



/////////////////////////// 카카오 장소 검색 기능

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

const testDate = [
    {
        "name": "test1",
        "mainText": "본문입니다",
        "score": 1
    },
    {
        "name": "test1",
        "mainText": "본문입니다",
        "score": 1

    }
]
