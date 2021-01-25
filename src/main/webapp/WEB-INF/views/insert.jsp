<%@ pinsertage pinsertageEncoding="utf-8"%>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>CoronaMap</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<link rel="stylesheet"
	href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<!-- jQuery -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>

<script
	src="http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?ServiceKey=xd9KN2UOSssqVS84%2B%2BMF8MCygZ%2FcV88H%2Bk289Bojw9RqXTTV0QUX6%2BnBQqbdnC7qklkrFCq0tKB%2FAL4BGIy4%2FQ%3D%3D"></script>
<script
	src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=l7xx07edbdb4c7c845d08dbf34f748bdc31c"></script>

<script src="<c:url value='/resources/js/tmap2.js'/>" charset="utf-8"></script>
</head>

<body>
	<!-- 맵 생성 실행 -->

	<div>
		<h1>Corona Map</h1>
	</div>

	<div
		style="width: 60%; height: 400px; float: right; border: 8px solid black; float: left">

		<br> <select name="insertgender" id="insertgender"
			style="width: 90px; height: 50px; margin-left: 50px; border: 3px solid black">
			<option value="">성별 선택</option>
			<option value="남성">남성</option>
			<option value="여성">여성</option>
		</select> <br> <br> &nbsp; &nbsp; &nbsp;<span>나이 입력 : &nbsp;<input
			type="number" id="insertage">
		</span> <br> <br> &nbsp; &nbsp; &nbsp; <span>지역 입력 : (예시 :
			서울시 마포구 서교동) &nbsp;<input type="text" id="insertaddress1">
		</span> <br> <br> &nbsp; &nbsp;&nbsp; <span>상세 지역 입력 : (예시 :
			신미주아파트 109동 103호) &nbsp;<input type="text" id="insertaddress2">
		</span> <br> <br> &nbsp; &nbsp; <span> &nbsp;확진 날짜 : (예시
			:20200819)<input type="text" name="insertconfirm_date" id="insertconfirm_date">
		</span> &nbsp; <br> <br>
		<select name="insertcure" id="insertcure"
			style="width: 90px; height: 50px; margin-left: 50px; border: 3px solid black">
			<option value="">완치 여부 선택</option>
			<option value="o">O</option>
			<option value="x">X</option>
		</select> <br>
		<div>
			<button onClick="drawPolyline()">라인 그리기</button>
			<button onClick="clearDrawing()">라인 삭제하기</button>
			<button id="click" style="width: 100px; height: 50px"
				onclick="insertData();">등록</button>
				
	<button onClick="location.href='/home.do'">home</button>
		</div>
	</div>
	<div id="map_div"></div>
	<br>

	<button style="float: left" onClick="location.href='/home.do'">home</button>
</body>
</html>
