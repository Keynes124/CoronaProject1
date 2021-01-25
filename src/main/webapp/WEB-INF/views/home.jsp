<%@ page pageEncoding="utf-8"%>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<head>
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
<script src="<c:url value='/resources/js/tmap.js'/>" charset="utf-8"></script>
<link href="resources/css/common.css" rel="stylesheet" type="text/css">
<link href="resources/css/layout.css" rel="stylesheet" type="text/css">
<link href="resources/css/table.css" rel="stylesheet" type="text/css">
<link href="resources/css/popup.css" rel="stylesheet" type="text/css">

</head>

<body>
	<div id="wrap">
		<!--헤더-->
		<header>
			<a href="#" class="h_btn_r btn_menu" onclick="buttonopen()" id="menu_">메뉴</a>
			<h2>
				<img src="resources/img/icon.jpg"
					style="vertical-align: middle; margin-bottom: 5px; margin-right: 4px;">CORONA MAP
			</h2>
		</header>
		<!--//헤더-->
		<!--메뉴-->
		<div id="nav" style="">
            <a href="#" class="n_btn_close" id="n_btn_close" onclick="buttonclose()">닫기</a>
            <div class="nav_visual">
                <h1>모니터링</h1>
            </div>

            <div class="pddg_4" id="pddg_4_menu" style=""></div>
            <div class="tab tab_02">
				<a href="#" class="click" style="cursor: unset;">상세보기</a>
			</div>
			<!--//탭-->
			<div class="search_list" style="height: 100%;">
				<!--탭박스 02-->
				<div class="tab_box_02" style="display: block;" id="listDiv2">
				</div>
				<!--//탭박스 02-->
			</div>
        </div>
		<!--//메뉴-->
		<content>
		<div class="left_box" id="left_box">
			<!--/*2020.08.25 추가*/-->
			<!--지도-->
			<div class="ct_inner_01" >
				<ul class="tit">
					<li class="box01" id ="box01">
						<p class="tit_txt_02">확진 자수</p>
						<p class="tit_txt_01" id="decide"></p>
					</li>
					<li class="box02" id ="box02">
						<p class="tit_txt_02">사망 자수</p>
						<p class="tit_txt_01" id="death"></p>
					</li>
					<li class="box03" id ="box03">
						<p class="tit_txt_02">검사 인원</p>
						<p class="tit_txt_01" id="exam"></p>
					</li>
					<li class="box04" id ="box04">
						<p class="tit_txt_02">해제 인원</p>
						<p class="tit_txt_01" id="clear"></p>
					</li>
					<li class="box05" id ="box05">
						<p class="tit_txt_02">치료 인원</p>
						<p class="tit_txt_01" id="care"></p>
					</li>
				</ul>
				<div id="map_div"></div>
			</div>
			<!--지도 영역 끝-->
			<!--/*2020.08.25 추가 끝*/-->
		</div>
		<div class="right_box" id="right_box">
			<!--검색-->
			<div class="ct_inner" style="">
				<div class="pddg_4" id="pddg_4">
					<!--inquiry_box-->
					<div class="inquiry_box">
						<fieldset>
							<div class="inquiry_01">
								<p class="half_sectn">
									<select name="gender" id="gender">
										<option value="">성별 선택</option>
										<option value="남성">남성</option>
										<option value="여성">여성</option>
									</select> <select name="age" id="age">
										<option value="">나이 선택</option>
										<option value="10">10대 이하</option>
										<option value="20">20대</option>
										<option value="30">30대</option>
										<option value="40">40대</option>
										<option value="50">50대</option>
										<option value="60">60대</option>
										<option value="70">70대 이상</option>
									</select>
								</p>
								<p class="full_sectn">
									<span> <input type="text" id="address1"
										placeholder="지역 입력 : (예시 :서울시 마포구 서교동)">
									</span>
								</p>
								<p class="half_sectn">
									<input type="text" name="s_date" id="confirm_date1"
										placeholder="시작 날짜 : (예시 :20200819)"> <input
										type="text" name="e_date" id="confirm_date2"
										placeholder="종료 날짜 : (예시 :20200819)">
								</p>
							</div>
							<div class="inquiry_02">
								<a href="#" class="inquiry_sch_btn" onclick="getData();">조회</a>
							</div>
						</fieldset>
					</div>
					<!--//inquiry_box-->
				</div>
				<!--탭-->
				<div class="tab tab_02">
					<a href="#" class="click" style="cursor: unset;">상세보기</a>
				</div>
				<!--//탭-->
				<div class="search_list" style="height: 100%;">
					<!--탭박스 02-->
					<div class="tab_box_02" style="display: block;" id="listDiv">
					</div>
					<!--//탭박스 02-->
				</div>
				<!-- ? search_list DIV의 height값은 자동으로 높이가 조정되게 해주세요. '참고' 폴더 안 '그림_01.jpg' 참고-->
			</div>
			<!--검색끝-->
		</div>

		</content>
		<!--메인버튼-->
		<div class="a_btn_box a_bt_01">
			<a href="#" class="bt_red" onclick="popupDisplay();">데이터 등록</a>
		</div>
	</div>


<!--팝업  -->
	<div class="popup" style = "margin-top :-500px; display: none;">
            <div class="pop_60 hc vc" style = "border :8px solid black">
                <div class="pop_cont_box_01">

                    <!--검색-->
                    <div class="ct_inner" style=" ">
                        <div class="pddg_4">
                            <!--inquiry_box-->
                            <div class="inquiry_box">
                                <fieldset>
                                    <div class="inquiry_01">
                                        <p class="half_sectn">
                                            <select name="insertgender" id="insertgender" style="width: 30%;">
												<option value="">성별 선택</option>
												<option value="남성">남성</option>
												<option value="여성">여성</option>
											</select> 
											<select name="insertage" id="insertage" style="width: 30%;">
												<option value="">나이 선택</option>
												<option value="10">10대 이하</option>
												<option value="20">20대</option>
												<option value="30">30대</option>
												<option value="40">40대</option>
												<option value="50">50대</option>
												<option value="60">60대</option>
												<option value="70">70대 이상</option>
											</select> 
											<select name="insertcure" id="insertcure" style="width: 30%;">
												<option value="">완치 여부 선택</option>
												<option value="o">O</option>
												<option value="x">X</option>
											</select>
										</p>
										<p class="full_sectn">
											<input type="text" id="insertaddress1"
												placeholder="지역 입력 : (예시 :서울시 마포구 서교동)" style="width: 30%;">
											<input type="text" id="insertaddress2"
												placeholder="지역 입력 : (예시 :신미주아파트 109동 103호)" style="width: 30%;">
											<input type="text" name="s_date" id="insertconfirm_date"
												placeholder="시작 날짜 : (예시 :20200819)" style="width: 30%;">
										</p>
										<button onClick="routeClick()" class="btn_01">경로 클릭</button>
										<button onClick="clearRoute()" class="btn_01">경로 초기화</button>
										<button id="click" onclick="insertData();" class="btn_01">등록</button>
				                                    </div>
				           		</fieldset>
				        	 </div>
                            <!--//inquiry_box-->
                    	</div>
                        <!--탭-->
                        <!--<div class="tab tab_02">
                            <a href="#" class="click">상세보기</a>
                        </div>-->
                        <!--//탭-->
               </div>


            </div>
                <div id="p_map">
                </div>
                <div class="pop_btn_box a_bt_01">
                    <a href="#" class="bt_blk" onclick="popupDisplay()">닫기</a>
                </div>
            </div>
        </div>


</body>
</html>
