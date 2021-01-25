$(document).ready(function() {
	//접속 브라우저 체크
	checkNavig();
	initTmap();
	xmlDownload();
	
});

var tmap = {};
tmap.map = null;
tmap.Markers = [];
tmap.polyline = null;
tmap.infoWindow = null;
tmap.navig = false;
function checkNavig(){
	var filter = "win16|win32|win64|mac";

	if(navigator.platform){

		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			//모바일
			navig = true;
			$("#nav").hide();
			$("#left_box").css("width", "100%");
			$("#right_box").css("width","0%");
			$("#pddg_4_menu").html($("#pddg_4").html());
			$("#box01").css("width","19%");
			$("#box02").css("width","19%");
			$("#box03").css("width","19%");
			$("#box04").css("width","19%");
			$("#box05").css("width","19%");
			
		}else{
			$("#menu_").hide();
			//pc
			navig = false;
			$("#nav").hide();
//			$("#pddg_4_menu").html($("#pddg_4").html());
			//alert("PC");
			
		}
	}
}

function buttonopen(){
	
	$("#nav").show();
}
function buttonclose(){
	
	$("#nav").hide();
}
function ajax(type, url, param, func) {
	$.ajax({
		type : type,
		url : url,
		data : param,
		dataType : "json",
		async : false,
		success : function(data) {
			if(null != data){
				func(data);
			}
			
		},
		error : function() {
			alert('통신실패!!');
		}
		
	});
}

function initTmap() {
	// map 생성
	// Tmapv2.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.

	var latlng = new Tmapv2.LatLng(36.566481622437999, 127.99992302169841);

	tmap.map = new Tmapv2.Map("map_div", { // 지도가 생성될 div
		width : "100%", // 지도의 넓이
		height : "100%", // 지도의 높이
		zoom : 8
	});
	tmap.map.setCenter(latlng);
}

function xmlDownload() {
	var type = "POST";
	var url = "/service/xmlDownload.do";
	var param = null;
	ajax(type, url, param, function(data) {
		console.log('data', data);
		$("#decide").text(data.decideCnt);
		$("#death").text(data.deathCnt);
		$("#exam").text(data.examCnt);
		$("#clear").text(data.clearCnt);
		$("#care").text(data.careCnt);
		
	});
}
function getData() {
	var gender = $("#gender").val();
	var age = $("#age").val();
	var address1 = $("#address1").val();
	var confirm_date1 = $("#confirm_date1").val();
	var confirm_date2 = $("#confirm_date2").val();

	var space = "";
	var spaceExist = false;
	if (confirm_date2 == "") {
		space = "종료일";
		spaceExist = true;
	}
	if (confirm_date1 == "") {
		space = "시작일";
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

	var type = "POST";
	var url = "/service/getData.do";
	var param = {
		"gender" : gender,
		"age" : age,
		"address1" : address1,
		"confirm_date1" : confirm_date1,
		"confirm_date2" : confirm_date2
	};

	ajax(
			type,
			url,
			param,
			function(data) {
				
				var target = $("#listDiv");
				if(navig){
					target = $("#listDiv2");
				}
				target.empty();
				if (tmap.infoWindow != null) {
					if (tmap.infoWindow.getMap() != null) {
						tmap.infoWindow.setMap(null);
						tmap.infoWindow = null;
					}
				}
				if (tmap.polyline != null) {
					if (tmap.polyline.getMap() != null) {
						tmap.polyline.setMap(null);
						tmap.polyline = null;
					}
				}
				for ( var i = 0; i < tmap.Markers.length; i++) {
					tmap.Markers[i].setMap(null);
				}
				tmap.Markers = [];
				if (data.list.length != 0) {
					var html = "";
					

					


					for ( var i = 0; i < data.list.length; i++) {
						addMarker(data.list[i], i);
						var idx = data.list[i].IDX; 
						var dbIndex = "id" + idx;
						
						
						
						html += '<div class="tab_item_box">';
	                    html += '	<div class="wrap">';
	                	html += '		<div class="top" id = "listItem' + i + '"onclick="findRoute2('+idx+', '+i+')">';
						html += '			<div class="s_icon">';
						html += '				<span></span>';
						html += '			</div>';
						html += '			<div class="s_name" id ="'+dbIndex+'">';
						
						html += '				<p>'+ data.list[i].GENDER +'</p>';
						html += '				<p>'+ data.list[i].AGE +'</p>';
						html += '				<p>'+ data.list[i].ADDRESS1 + " " + data.list[i].ADDRESS2 +'</p>';
						html += '				<p>'+ data.list[i].CONFIRM_DATE +'</p>';
						html += '			</div>';
						html += '		</div>';
						html += '	</div>';
						html += '</div>';
						
						

					}

					target.append(html);
				} else {

				}
			});

}
function addMarker(data, i) {
	var marker = new Tmapv2.Marker({
		position : new Tmapv2.LatLng(data.LAT, data.LNG),
		icon : "/resources/img/blue.png",
		map : tmap.map
	});
	var idx = data.IDX;
	var markerId = "id" + idx;
	marker.id = markerId;
	marker.addListener("click", function(evt) {
		findRoute2(idx, i);
	});
	tmap.Markers.push(marker);
}

function findRoute2(id, index) {
	var type = "POST";
	var url = "/service/findRoute.do";
	var param = {
		"idx" : id
	};

	ajax(type, url, param, function(data) {
		if (tmap.infoWindow != null) {
			if (tmap.infoWindow.getMap() != null) {
				tmap.infoWindow.setMap(null);
				tmap.infoWindow = null;
			}
		}
		if (tmap.polyline != null) {
			if (tmap.polyline.getMap() != null) {
				tmap.polyline.setMap(null);
				tmap.polyline = null;
			}
		}
		for ( var i = 0; i < tmap.Markers.length; i++) {
			tmap.Markers[i].setIcon("/resources/img/blue.png");
		}
		tmap.Markers[index].setIcon("/resources/img/red.png");

		var route = data.map.route;
		var arr = route.split('/');
		var path = [];
		for ( var j = 0; j < arr.length - 1; j++) {
			var point = arr[j].split(',');
			var latlng = new Tmapv2.LatLng(point[0], point[1]);
			path.push(latlng);
		}
		var polyline = new Tmapv2.Polyline({
			path : path,
			strokeColor : "#dd00dd", // 라인 색상
			strokeWeight : 6, // 라인 두께
			map : tmap.map
		// 지도 객체
		});
		tmap.polyline = polyline;
		var lat = tmap.Markers[index].getPosition()._lat;
		var lng = tmap.Markers[index].getPosition()._lng;
		var lonlat = new Tmapv2.LatLng(lat, lng);

		tmap.map.setCenter(lonlat);
		tmap.map.setZoom(17);
		var obj = $("#id" + id);
		var children = obj.children();
		
		var content = "<div style='width:250px;'>";
		content += "<p>성별 : " + children[0].textContent + "</p>";
		content += "<p>나이 : " + children[1].textContent + "</p>";
		content += "<p>주소 : " + children[2].textContent + "</p>";
		content += "<p>확진 날짜 : " + children[3].textContent + "</p>";
		content += "</div>";

		var infoWindow = new Tmapv2.InfoWindow({
			position : lonlat, // Popup 이 표출될 맵 좌표
			content : content, // Popup 표시될 text
			type : 2, // Popup의 type 설정.
			map : tmap.map,
		// Popup이 표시될 맵 객체
		});

		tmap.infoWindow = infoWindow;

	});
	
	$(".top").css("background-color" , "white");
	$(".top").css("color" , "black");
	$("#listItem" + index).css("background-color" , "#d8203d");
	$("#listItem" + index).css("color" , "white");

}
function popupDisplay(){
	$(".popup").css("display");
	if($(".popup").css("display") =="none"){
		$(".popup").show();
		initTmapPopup();
	}else {
		$(".popup").hide();
	}
}








