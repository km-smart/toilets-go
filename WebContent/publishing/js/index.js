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

    createMap()

    refreshMarker();


     //리뷰에 컨텐츠에 컨텐츠박스를 생성하는 객체생성
     var $div = $('<div class="cont-box"><div class= "conttx" id="result"></div><div class= "rvscor"><p id="jum"></p></div></div>');

     //추가버튼 클릭 시 컨텐츠박스 생성
   

    });

    $(function () {
        // ...
    
        // "추가버튼" 클릭 이벤트로 콘텐츠 박스 추가
        $(".cnrk").click(function () {
            // 이름을 가져옵니다
            const nameValue = $(".modal input[type='text']").val();
    
            // 콘텐츠 박스를 생성하고 이름과 텍스트 값을 설정
            const contentBox = $(
                `<div class="cont-box">
                    <div class="conttx">${nameValue}: ${$("textarea").val()}</div>
                </div>`
            );
    
            // 콘텐츠 박스를 '.contents' 요소에 추가합니다
            $('.contents').append(contentBox);
    
            // 리뷰창으로 돌아가기
            $(".info-popup2").show();
            $(".modal").hide();
    
            // 리뷰작성창의 입력 필드를 비웁니다
            $(".modal input[type='text']").val('');
            $("textarea").val('');
        });
    
        // ...
    
        // "리뷰쓰기" 버튼 클릭 이벤트
        $(".btn-box1").on("click", function () {
            // 리뷰작성창의 입력 필드를 초기화
            $(".modal input[type='text']").val('');
            $("textarea").val('');
        });
    
        // ...
    });
    
    
    
    
    
    

    $(function () {
        // ...
    
        // "input2" 클릭 시 "info-popup popup-wrap"에서 텍스트 입력 가능하게
        $("footer .input2").on("click", function () {
            $(".info-popup").show();
            $("header").hide();
            $("footer").hide();
            // 텍스트 입력 가능하도록 해제
            $(".info-popup input[type='text']").prop('readonly', false);
            $(".info-popup input[type='number']").prop('readonly', false);
        });
    
        // "button2" 클릭 시 "info-popup popup-wrap"에서 텍스트 읽기 전용으로
        $(".chang .button2").on("click", function(){
            $(".info-popup").show();
            $(".chang").hide();
            // 텍스트 읽기 전용으로 설정
            $(".info-popup input[type='text']").prop('readonly', true);
            $(".info-popup input[type='number']").prop('readonly', true);
        });
    
        // ...
    });
    
    $(function () {
        // ...
    
        // "변기개수" input 요소를 선택합니다.
        const toiletCountInput = $("#test3");
    
        // input 요소에 이벤트 리스너를 추가하여 숫자만 입력되도록 합니다.
        toiletCountInput.on("input", function () {
            // 현재 입력 값을 가져옵니다.
            const inputValue = toiletCountInput.val();
    
            // 정규 표현식을 사용하여 숫자만 입력되도록 제한합니다.
            const sanitizedValue = inputValue.replace(/\D/g, "");
    
            // 변경된 값을 다시 input 요소에 설정합니다.
            toiletCountInput.val(sanitizedValue);
        });
    
        // ...
    });
    
    $(function () {
        // ...
    
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
    
        // ...
    });
    
    // "button2" 클릭 시 "chang popup-wrap"에서 텍스트 읽기 전용으로
    $(".chang .button2").on("click", function(){
        $(".info-popup").show();
        $(".chang").hide();
        // 라디오 버튼을 읽기 전용으로 설정
        $(".info-popup input[type='radio']").prop('disabled', true);
    });


function ajax(url, data, sucsFunc, errFunc){
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
    const container = document.querySelector('.map');

    navigator.geolocation.watchPosition(function (result) {
        const options = {
            center: new kakao.maps.LatLng(result.coords.latitude, result.coords.longitude),
            level: 4
        };

        map = new kakao.maps.Map(container, options);
    });

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
        alert('키워드를 입력해주세요!');
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

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

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
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

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
    menuEl.scrollTop = 0;

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

    return el;
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}


// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

const testDate=[
    {
        "name":"test1",
        "mainText":"본문입니다",
        "score":1
    },
    {
    "name":"test1",
        "mainText":"본문입니다",
        "score":1

    }
]
