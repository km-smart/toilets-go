const ps = new kakao.maps.services.Places();
let map, selectedMarker = null;
const imageSrc = 'img/marker.png';
const markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(45, 40)); // 기본 마커 사이즈
const markerClickImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(50, 45)); // 마커 클릭시 사이즈


$(function () {
    $('form').submit(function (e) {
        e.preventDefault();
        // 또는 return false;
    });

    ////////////// 기본 이벤트 리스너

    // 리뷰 확인
    $("#reviewBtn").on("click", function () {
        const tData = $(".chang").data("toiletInfo");
        refreshReview(tData.toiletIdx);
        $("#reviewPopup").css("display", "flex");
    });

    // 리뷰 새로고침
    $("#reviewRefresh").on("click", function () {
        const tData = $(".chang").data("toiletInfo");
        refreshReview(tData.toiletIdx);
    });

    // 리뷰 작성
    $("#reviewWriteBtn").on("click", function () {
        $("#reviewWritePopup").css("display", "flex");
    });

    // 리뷰 작성시 별점 클릭 이벤트
    $("#reviewWritePopup .star-rating span").on("click", function (e) {
        const eIdx = $(this).index() + 1;

        $(`#reviewWritePopup .star-rating span`).removeClass("on");
        $(`#reviewWritePopup .star-rating span:nth-child(-n+${eIdx})`).addClass("on");
    })

    // 리뷰 등록하기
    $("#reviewAddBtn").on("click", function () {
        const data = $("#reviewWritePopup form").serializeObject();
        data.score = $("#reviewWritePopup .star-rating span.on").length; // 별점

        const tData = $(".chang").data("toiletInfo");
        data.toiletIdx = tData.toiletIdx; // 화장실 idx

        ajax("reviewInsert", data, function (result) {
            if (result.msg === "no") {
                alert("등록 실패했습니다.");
                return;
            }

            alert("등록되었습니다.");
            refreshReview(data.toiletIdx);
            $("#reviewWritePopup").hide();
        })
    })


    // 화장실 정보 확인
    $(".chang #detailBtn").on("click", function () {
        // 텍스트 읽기 전용으로 설정
        $("#detailPopup input, #detailPopup textarea").prop('readonly', true);
        $("#detailPopup .title h1").text('화장실 정보');
        $("#detailPopup input[type=radio]").attr('onclick', "return false").prop("checked", false);

        // "등록하기" 버튼 숨기게
        $("#detailPopup .btn-wrap").hide();

        // 데이터 세팅
        const tData = $(".chang").data("toiletInfo");
        const $detailPopup = $("#detailPopup");
        Object.keys(tData).forEach(function (key) {
            const value = tData[key];
            const $input = $detailPopup.find(`[name=${key}]`);
            if ($input.length === 0) return;
            const type = $input.attr("type") ? $input.attr("type") : $input[0].tagName;
            if (type === "text" || type === "number" || type === "TEXTAREA") {
                $input.val(value);
            } else if (type === "radio") { // radio일 때
                $detailPopup.find(`[name=${key}][value=${value}]`).prop("checked", true);
            }
        });

        $("#detailPopup").css("display", "flex");
        $("#detailPopup input[name=address]").off("keydown");
    });

    // 화장실 정보 작성
    $("#infoAddPopupBtn").on("click", function () {
        $("#detailPopup input[name=address]").off("keydown");
        // 리뷰작성창의 입력 필드를 초기화
        $("#detailPopup input:not([name=address]), #detailPopup textarea").prop('readonly', false);
        $("#detailPopup input:not([type=radio]), #detailPopup textarea").val('');
        $("#detailPopup .title h1").text('화장실 등록');

        $("#detailPopup input[type=radio]").prop('checked', false);
        // "등록하기" 버튼 나타나게
        $("#detailPopup, #detailPopup .btn-wrap").css("display", "flex");

        $("#detailPopup input[name=address]").on("keydown", e => {
            if (e.keyCode === 13) searchPlaces(e.currentTarget);
        });
    });

    // 화장실 정보 등록하기
    $("#detailInfoAddBtn").on("click", function () {
        const data = $("#detailPopup form").serializeObject();
        ajax("toiletInfoServiceInsert", data, function (result) {
            if (result.msg === "no") {
                alert("등록 실패했습니다.");
                return;
            }

            alert("등록되었습니다.");
            refreshMarker();
            $("#detailPopup").hide();
        })
    });


    $(".cancel").on("click", function (e) {
        $(this).parents(".popup-wrap").hide();

        // 상세보기 창에서 닫기를 누르면 선택한 마커 해제
        if ($(this).parents(".chang").length > 0) {
            selectedMarker.setImage(markerImage);
            selectedMarker = null;
        }
    });

    // 장소 검색
    $("#keyword").on("keydown", e => e.keyCode === 13 ? searchPlaces(e.currentTarget) : true);
    $(".search-btn").on("click", e => searchPlaces($(e.currentTarget).siblings("input")[0]));

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

// 마커 새로고침
function refreshMarker() {
    ajax("mapMarkerList", {}, function (result) {
        for (item of result) {
            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(item.latitude, item.longitude), // 마커를 표시할 위치
                image: markerImage // 마커 이미지 
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
                // 마커의 이미지를 클릭 이미지로 변경합니다
                if (!selectedMarker && selectedMarker !== marker) {

                    // 클릭된 마커 객체가 null이 아니면
                    // 클릭된 마커의 이미지를 기본 이미지로 변경하고
                    !!selectedMarker && selectedMarker.setImage(markerImage);

                    // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
                    marker.setImage(markerClickImage);

                    createToiletInfo(item.idx);
                    // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
                    selectedMarker = marker;
                } else if (selectedMarker === marker) { // 선택된 마커면 해지
                    selectedMarker.setImage(markerImage);
                    selectedMarker = null;
                }

            });
        }
    })
}

// 리뷰 새로고침
function refreshReview(idx) {
    const $contentsWrap = $("#reviewPopup .contents");

    // 생성 전 초기화
    $contentsWrap.empty();

    ajax("reviewList", {toiletIdx: idx}, function (result) {
        for (item of result) {
            const $newNode = $(
                `<div class="cont-box blue-outline-box blue-outline-box">
              <div class="box-top">
                <div class="name">${item.name}</div>
                <!-- 별점 -->
                <div class="star-rating">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <div class="insert-dt">${item.insertDt}</div>
              </div>
              <div class="main-text">${item.mainText}</div>
            </div>`);

            $newNode.find(`.star-rating span:nth-child(-n+${item.score})`).addClass("on");
            $contentsWrap.append($newNode);
        }
    });
}

function createToiletInfo(idx) {
    ajax("toiletDetail", {idx: idx}, function (result) {
        $(".chang").css("display", "flex");
        $(".chang .title").html(`${result.restroomName}<span>${result.scoreAvg}/5</span>`);
        $(".chang .cont").text(result.cleanliness);
        $(".chang").data("toiletInfo", result);
    });
}


/////////////////////////// 카카오 장소 검색 기능

// 키워드 검색을 요청하는 함수입니다
function searchPlaces($keywordEl) {

    var keyword = $keywordEl.value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        $($keywordEl).siblings(".search-result").hide();
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, function (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 정상일시 검색 목록 표출
            displayPlaces($keywordEl, data);
            $($keywordEl).siblings(".search-result").show();
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    });
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces($keywordEl, places) {

    var listEl = $($keywordEl).siblings(".search-result")[0],
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

    // 리스트 클릭시 이동
    $(listEl).find(".item").off().on("click", e => {
        const lat = $(e.currentTarget).data("lat");
        const lot = $(e.currentTarget).data("lot");
        const address = $(e.currentTarget).data("address");

        if ($keywordEl.id === "keyword") {
            map.setCenter(new kakao.maps.LatLng(lat, lot));
            map.setLevel(4);
        } else {
            $($keywordEl).val(address);
            $($keywordEl).siblings("[name=latitude]").val(lat);
            $($keywordEl).siblings("[name=longitude]").val(lot);
        }
        $($keywordEl).siblings(".search-result").hide();
    });

    if ($keywordEl.id === "keyword") {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);

    }
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
    el.dataset.address = places.address_name ? places.address_name : places.road_address_name;

    return el;
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}


jQuery.fn.serializeObject = function () {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function () {
                    obj[this.name] = this.value;
                });
            }
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }
    return obj;
};