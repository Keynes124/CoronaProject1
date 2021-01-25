$(document).ready(function() {
	//initTmapPopup();
});
var popup = {};
popup.drawingObject = null;
popup.map = null;
popup.marker=null;
popup.markerlat=[];
popup.markerlng=[];
popup.markers = [];
function initTmapPopup() {
	// map 생성
	// Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
	
	var latlng = new Tmapv2.LatLng(36.999999622437999, 127.99992302169841);
	
	popup.map = new Tmapv2.Map("p_map", { // 지도가 생성될 div
		width : "100%", // 지도의 넓이
		height : "500px", // 지도의 높이
		zoom : 8
	});
	popup.map.setCenter(latlng);
}
function ajaxPopup(type, url, param, func) {
	$.ajax({
		type : type,
		url : url,
		data : param,
		dataType : "json",
		async : false,
		success : function(data) {
			func(data);
		},
		error : function() {
			alert('통신실패!!');
		}

	});
}

function routeClick() {
	popup.map.addListener("click", onClick);
}

function onClick(e){
	var latLng = e.latLng;
	var marker = new Tmapv2.Marker({
		position : new Tmapv2.LatLng(latLng.lat(), latLng.lng()),
		icon : "/resources/img/blue.png",
		iconSize: new Tmapv2.Size(24,38),
		map : popup.map
	});
	
	popup.markers.push(marker);
	popup.markerlat.push(latLng.lat());
	popup.markerlng.push(latLng.lng());
	
}

function clearRoute(){
	if(popup.marker!=null){
		popup.marker.setMap(null);
	}
}

/*function getDrawingObject() {
	if (popup.drawingObject == null) {
		// 도형을 그리는 객체 생성
		popup.drawingObject = new Tmapv2.extension.Drawing({
			map : popup.map, // 지도 객체
			strokeWeight : 4, // 테두리 두께
			strokeColor : "blue", // 테두리 색상
			strokeOpacity : 1, // 테두리 투명도
			fillColor : "red", // 도형 내부 색상
			fillOpacity : 0.2
		// 도형 내부 투명도
		});
	}
	// 객체 반환
	return popup.drawingObject;
}

function drawPolyline() {
	// 도형 객체의 선을 그리는 함수
	getDrawingObject().drawPolyline();

}

function clearDrawing() {
	// 도형 객체의 도형을 삭제하는 함수
	getDrawingObject().clear();
}*/

function insertData() {
	var gender = $("#insertgender").val();
	var age = $("#insertage").val();
	var address1 = $("#insertaddress1").val();
	var address2 = $("#insertaddress2").val();
	var confirm_date = $("#insertconfirm_date").val();
	var cure = $("#insertcure").val();
	var space = "";
	var spaceExist = false;
	if (cure == "") {
		space = "완치 여부";
		spaceExist = true;
	}
	if (confirm_date == "") {
		space = "확진 날짜";
		spaceExist = true;
	}
	if (address2 == "") {
		space = "상세 주소";
		spaceExist = true;
	}
	if (address1 == "") {
		space = "지역";
		spaceExist = true;
	}
	if (age == "") {
		space = "나이";
		spaceExist = true;
	}
	if (gender == "") {
		space = "성별";
		spaceExist = true;
	}

	if (spaceExist) {
		alert(space + "값을 입력하세요");
		return 0;
	}
/*	if (popup.drawingObject == null) {
		alert("라인을 그려주세요.");
		return;
	} else {
		if (popup.drawingObject._data.shapeArray.length == 0) {
			alert("라인을 그려주세요.");
			return;
		}
	}*/
	var type = "POST";
	var url = "/service/insertData.do";

	var routeStr = "";
	for ( var i = 0; i < popup.markers.length; i++) {
		routeStr += popup.markerlat[i];
		routeStr += ",";
		routeStr += popup.markerlng[i];
		routeStr += "/";
	}

	var param = {
		"gender" : gender,
		"age" : age,
		"address1" : address1,
		"address2" : address2,
		"confirm_date" : confirm_date,
		"lat" : popup.markerlat[0],
		"lng" : popup.markerlng[0],
		"route" : routeStr,
		"cure" : cure
	};

	ajaxPopup(type, url, param, function(data) {
		alert("등록되었습니다.");
		location.href = "/home.do";
	});
}


