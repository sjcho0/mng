$(function(){
	//사이즈 변수 선언(공통 사용)
	var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언

    // 다크, 라이트 모드
    /*const isBrowserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    let initTheme = isBrowserDarkMode ? 'dark' : 'light'
    $(window).on("load",function(){
    	//console.log("들옴" + initTheme);
        if(initTheme == "dark"){
            $("html").attr("data-dark","true");
        }else{
            $("html").attr("data-dark","false");
        }
    });*/

    //2022.10.25 다크, 라이트 모드 쿠키 설정 (이현민)
    let isBrowserDarkMode = getCookie('browserDarkMode');
    if(!isBrowserDarkMode){
    	const browserModeInit = 'light';
    	setCookie('browserDarkMode', browserModeInit);
    	isBrowserDarkMode = browserModeInit;
    }


	 if(isBrowserDarkMode == "dark"){
		$(".ui-jqgrid-btable table th, .ui-jqgrid-btable td").hover(
			function(){
				$(this).addClass('ui-state-hover')
			},
			function(){
				$(this).removeClass('ui-state-hover')
			}
		);
	}

    $(window).on("load",function(){
        if(isBrowserDarkMode == "dark"){
         	console.log("dark ==> ");
            $("html").attr("data-dark","true");
        }else{
        	//console.log("light ==> ");
            $("html").attr("data-dark","false");
        }
    });

    $(".themeBtn").on("click",function(){
        if($(this).is(".darkBtn")){
        	setCookie('browserDarkMode', 'dark');
            $("html").attr("data-dark","true");
            openWin.$("html").attr("data-dark","true");
            openWin.openWin.$("html").attr("data-dark","true");
            $(".ui-datepicker-trigger").attr("src","/mng/images/calendarIcon_white.png");
        }else if($(this).is(".lightBtn")){
        	setCookie('browserDarkMode', 'light');
            $("html").attr("data-dark","false");
            openWin.$("html").attr("data-dark","false");
            openWin.openWin.$("html").attr("data-dark","false");
            $(".ui-datepicker-trigger").attr("src","/mng/images/calendarIcon.png")
        }
        return false;
    });

	// --vh
	function setScreenSize(){
		let vh = window.innerHeight * 0.01;
	  
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}  
	setScreenSize();
	window.addEventListener('resize', () => setScreenSize());
	
    // a태그 막기
    $(".noalink").on("click",function(e){
        e.preventDefault();
    });

    //로그아웃
	$(document).on('click',".logoutBtn, .sLogoutBtn",function(e){
		e.preventDefault();
		if(confirm('로그아웃 하시겠습니까?')){
			location.href= '/logout.do';
		}
    });

    //로그인 연장
    $(document).on('click',".extendBtn",function(e){
		e.preventDefault();
		counter_reset();
		//$(".logoutPopup.blackBg").fadeOut();
		//$(this).parents('.popup').stop().fadeOut();

		LayerPopup.close($(this).parents('.popup'));
    });

	// searchBox 열고 닫기
	$(".searchContentW .searchContentBox .openBtn").on("click", function(){
		if($(this).parents(".searchContentBox").hasClass("open")){
			$(this).parents(".searchContentBox").removeClass("open");
			$(this).parents(".searchContentBox").children(".hiddenBox").slideUp(400);
		}else{
			$(this).parents(".searchContentBox").addClass("open");
			$(this).parents(".searchContentBox").children(".hiddenBox").slideDown(400);
		}
		return false;
	});
    // dotdot
    $(".dotdot").dotdotdot({
        ellipsis: '...',//말줄임 뭘로 할지
        watch : true, //윈도우 창에따라서 업데이트 할건지, 윈도우가 리사이즈될 때 업데이트할 건지
        wrap : 'letter',//word(단어단위), letter(글 단위), children(자식단위) 자르기
        height: null,
        tolerance : 0,
    });
    // alarm
    $(".alarmPopupW .popupCont").mCustomScrollbar({
        theme:"dark-3"
    });
    $(".alarmW .alarmBtn").on("click",function(){
        $(".alarmPopupW").fadeIn();
    });
    $(document).on("click", ".alarmPopupW .alarmList > li > a", function(){
        if($(this).parent().hasClass("on")){
            $(this).parent().removeClass("on");
        }else{
            $(this).parent().addClass("on").siblings().removeClass("on");
        }

        return false;
	});
    // popup닫기
    $(".popupType1 .closeBtn").on("click",function(){
        $("#divPopup .blackBg").fadeOut();
        $(this).parent(".popupType1").hide();
    });


    // select
    let selectType = function(typeName){
        $(typeName + " label").on("click",function(){
            if(!$(this).parent().children("select").attr("disabled")){
                if($(this).parent().children(".optBox").css("display") == 'block'){
                    $(this).parent().children(".optBox").slideUp();
                }else{
                    $(this).parent().children(".optBox").slideDown();
                }
            }
        });

        $(typeName + " .optBox li a").on("click",function(){
            let opt = $(this).text();

            $(this).parents(typeName).children("label").text(opt);
            $(this).parents(typeName).find("select option").removeAttr('selected')
            $(this).parents(typeName).find("select option").eq($(this).parent().index()).attr("selected", true)
            $(this).parents(".optBox").slideUp();

            return false;
        });
    }
    selectType(".selectType1");
    selectType(".selectType2");

    // 캘린더
    $(".datepicker").attr( 'placeholder', 'YYYY.MM.DD' );
    $(".datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        showOn: "both",
        buttonImage: "/mng/images/calendarIcon.png",
        buttonImageOnly: true,
        dateFormat: 'yy.mm.dd'
    })/*.datepicker("setDate", "0");*/

		//메뉴 열고 닫기 쿠키저장
        let snbClickVal = getCookie('snbClick');
        //console.log("snbClickVal "+snbClickVal);
		if(!snbClickVal){
			$("#divWrapper").addClass("onsnb");
		}

		if (snbClickVal=='toNarrow'){
			$("#divWrapper").removeClass("onsnb");
	        // $("#divSnb .navigationW").mCustomScrollbar("destroy");
	    }else if (snbClickVal=="toWide"){
	    	 $("#divWrapper").addClass("onsnb");
	            // $("#divSnb .navigationW").mCustomScrollbar({
	            //     theme:"dark-3"
	            // });
	    }

    // snb
	// 테블릿 사이즈로 넘어갈때 onsnb 적용 되어 있으면 삭제
	// $(window).on("resize",function(){
	// 	winWidth = window.innerWidth || document.documentElement.clientWidth;
	// 	if(winWidth <= 1024){
	// 		$("#divWrapper").removeClass("onsnb")
	// 	}
	// });
    // navigation scroll
    $(window).on("load",function(){
        if($("#divWrapper").hasClass("onsnb")){
            // $("#divSnb .navigationW").mCustomScrollbar({
            //     theme:"dark-3"
            // });
        }
    });
    $("#divSnb .navigation > li > a").on("click",function(){
        if($("#divWrapper").hasClass("onsnb")){
            if($(this).parent().find(".depth2").css("display") == 'block'){
                $("#divSnb .navigation > li .depth2").hide();
                $("#divSnb .navigation > li").removeClass("on");
            }else{
                $("#divSnb .navigation > li .depth2").hide();
                $(this).parent().addClass("on").siblings().removeClass("on");
                $(this).parent().find(".depth2").slideDown();
            }
        }else{
            if($(this).parent().find(".depth2").css("display") == 'block'){
                $("#divSnb .navigation > li .depth2").hide();
                $("#divSnb .navigation > li").removeClass("on");
            }else{
                $("#divSnb .navigation > li .depth2").hide();
                $(this).parent().addClass("on").siblings().removeClass("on");
                $(this).parent().find(".depth2").show();
            }
        }
    });
    $("#divSnb .navigation > li > a").on("mouseenter",function(){
        if(!$("#divWrapper").hasClass("onsnb")){
            $(this).parent().find(".depth2W").show();
        }
    });
    $("#divSnb .navigation > li > a").on("mouseleave",function(){
        if(!$("#divWrapper").hasClass("onsnb")){
            $(this).parent().find(".depth2W").hide();
        }
    });
    $("#divSnb .navigation .depth2 > li > a").on("click",function(){
        if($(this).parent().children(".depth3").css("display") == 'block'){
            $("#divSnb .navigation .depth2 > li").removeClass("on");
            $("#divSnb .navigation .depth3").hide();
        }else{
            $("#divSnb .navigation .depth2 > li").removeClass("on");
            $(this).parent().addClass("on");
            $("#divSnb .navigation .depth3").hide();
            $(this).parent().children(".depth3").slideDown();
        }
    });
    // snb 열고 닫기
    $("#divContent .contentTop .snbBtn").on("click",function(){
     	var twNarrow = "";
     	var twWide = "";
     	
        if($("#divWrapper").hasClass("onsnb")){
        	setCookie('snbClick','toNarrow');
            $("#divWrapper").removeClass("onsnb");
            // $("#divSnb .navigationW").mCustomScrollbar("destroy");
            twNarrow = $(".tableW").outerWidth();
            //console.log("twWide:"+twWide);
            $("#grid").setGridWidth(twWide);
        }else{
        	setCookie('snbClick','toWide');
            $("#divWrapper").addClass("onsnb");
            // $("#divSnb .navigationW").mCustomScrollbar({
            //     theme:"dark-3"
            // });
            twWide = $(".tableW").outerWidth();
            //console.log("twNarrow:"+twNarrow);
            $("#grid").setGridWidth(twNarrow);
        }

        if($(this).hasClass("on")){
            $(this).attr("title","메뉴 열기");
            $(this).removeClass("on");
        }else{
            $(this).attr("title","메뉴 닫기");
            $(this).addClass("on");
        }
       // console.log("그리드 너비" + gw);
        //console.log("tableW 너비" + $(".tableW").outerWidth());
        //console.log("ui-jqgrid-htable 너비" + $(".ui-jqgrid-htable").width());
        //console.log("contentW 너비" + $(".contentW").width());
        // $(".ui-jqgrid-hbox").setGridWidth($(".tableW").width());
//         $("#grid").setGridWidth($(".ui-jqgrid-htable").width());
         //$("#grid").setGridWidth($(".tableW").width());
          var gw2 = $("#grid").jqGrid('getGridParam','width'); // 그리드 현재 너비
          //console.log("그리드 너비 결과" + gw2);
/*        $(window).resize(function() {
			 $("#grid").setGridWidth($(".tableW").width())
		}).trigger('resize');*/
    });
 
	// #header menu
    $("#header .menu li").on("click",function(){

        //우측 알림 열고 닫기
        if($(this).hasClass("alarm")){
            if($("#wrapper").hasClass("onalarm")){
                $("#wrapper").removeClass("onalarm");
            }else{
                $("#wrapper").addClass("onalarm");
            }
        }

        // header menu 클릭
        if($(this).hasClass("on")){
            $(this).removeClass("on");
        }else{
            $(this).addClass("on").siblings().removeClass("on");
        }
    });

	// 알림 스크롤
    $(window).on("load",function(){
        $(".useralarmW").mCustomScrollbar({
            theme:"dark-3"
        });
    });
    // 알림 닫기 버튼
	$(document).on("click", "#useralarm .alarmClosebtn",  function(){
		$("#wrapper").removeClass("onalarm");
    });

    //알림 리스트 클릭, 팝업창 띄우기
	$(document).on("click", "#useralarm .alarmList li a",  function(){
		//console.log("alarm clicked");
        $(".alarmpopup").stop().fadeIn();
    });

	// 알림팝업창 확인, 삭제 버튼 클릭시 팝업 닫기
	$(document).on("click", ".deletealram, .okalarm, .alarmpopup .popupClose",  function(){
		$(".alarmpopup").stop().fadeOut();
    });

	// 메인화면 알림 닫기 버튼
	$(document).on("click", "#mainuseralarm .alarmClosebtn",  function(){
		$("#wrapper").removeClass("onalarm");
    });

    //메인화면 알림 리스트 클릭, 팝업창 띄우기
	$(document).on("click", "#mainuseralarm .mainAlarmList li a",  function(){
		//console.log("mainalarm clicked");
        $(".mainAlarmpopup").stop().fadeIn();
    });

	// 메인화면 알림팝업창 확인, 삭제 버튼 클릭시 팝업 닫기
	$(document).on("click", ".deletealram, .okalarm, .mainAlarmpopup .popupClose",  function(){
		$(".mainAlarmpopup").stop().fadeOut();
    });

});

function selectRecode(result){
	$('.lib').empty();
	var option = $('<option value="">전체</option>');
	$('.lib').append(option);
	for(var i=0; i<result.length; i++){
		var options = $('<option value="'+result[i].libNo+'">' + result[i].libName +"</option>")
		$('.lib').append(options);
	}
}

function reload(){
		window.location.reload();
	}

	//팝업띄우기
	function windowOpen(url, target, width, height) {

	 // 팝업을 가운데 위치시키기 위해 아래와 같이 값 구하기
    //var _left = Math.ceil(( window.screen.width - width )/2);
    var _left =  (window.screen.width / 2) - (width / 2);
    //var _top = Math.ceil(( window.screen.height - height )/2);
    var _top = (window.screen.height / 2) - (height / 2);

	var	winProps = "height="+height+"px,width="+width+"px,"
		//+ "top=50px,left=50px,"
		//+ "top="+_top+",left="+_left
		+ "toolbar=no,resizable=yes,location=no,status=yes,scrollbars=yes,fullscreen=no";

	openWin = window.open(url, target, winProps);
}

//풀스크린 팝업
function windowFullOpen(url, target, width, height) {

	 // 팝업을 가운데 위치시키기 위해 아래와 같이 값 구하기
    //var _left = Math.ceil(( window.screen.width - width )/2);
    var _left =  (window.screen.width / 2) - (width / 2);
    //var _top = Math.ceil(( window.screen.height - height )/2);
    var _top = (window.screen.height / 2) - (height / 2);

	var	winProps = "height="+height+"px,width="+width+"px,"
		//+ "top=50px,left=50px,"
		//+ "top="+_top+",left="+_left
		+ "toolbar=no,resizable=yes,location=no,status=yes,scrollbars=yes,fullscreen=yes";

	openWin = window.open(url, target, winProps);
}

 //그리드 최초 실행시 데이터 없으면 메세지 띄움
function dispInitMsg(grid){
	var ids = $('#'+grid).jqGrid('getDataIDs');
	if(!ids || ids.length == 0){
		$("#"+grid).parents("#gbox_"+grid).append("<div id='"+grid+"_msg'><span>자료를 검색해 주세요.</span></div>");
		$("#"+grid+"_msg").css({"position" : "absolute", "top" : "50%", "text-align":"center","width":"100%"});
	}
}
//그리드 검색시 데이터 없으면 메세지 띄움
function dispNoData(grid){
	$("#"+grid+"_msg").remove();
	var ids = $('#'+grid).jqGrid('getDataIDs');

	if(!ids || ids.length == 0){
		$("#"+grid).parents("#gbox_"+grid).append("<div id='"+grid+"_msg'><span>조회된 자료가 없습니다.</span></div>");
		$("#"+grid+"_msg").css({"position" : "absolute", "top" : "50%", "text-align":"center","width":"100%"});
	}
	
	//스크롤 초기화
	$('#'+grid).closest(".ui-jqgrid-bdiv").scrollTop(0);
}

//이력정보 - 그리드 최초 실행시 데이터 없으면 메세지 띄움
function dispHistMsg(grid){
	$("#"+grid+"_msg").remove();
	var ids = $('#'+grid).jqGrid('getDataIDs');
	if(!ids || ids.length == 0){
		$("#"+grid).parents("#gbox_"+grid).append("<div id='"+grid+"_msg'><span>이력정보가 없습니다.</span></div>");
		$("#"+grid+"_msg").css({"position" : "absolute", "top" : "50%", "text-align":"center","width":"100%"});
	}
}

    //익스플로러 replaceAll 이슈로 인한 replaceAll 함수로 대체
function replaceAll(str, searchStr, replaceStr){
 return str.split(searchStr).join(replaceStr);
 }
 //날짜 확인
function checkDateType(value){
	var checkVal = value;

	//null체크
	if(!value){
		return false;
	}

	//특수문자 제거
	var RegExp = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    if (RegExp.test(checkVal)) {
      	// 특수문자 모두 제거
      	checkVal = checkVal.replace(RegExp , '');
    }

	//숫자변환
	var isNum = Number.parseInt(checkVal);
	if(!isNum){
		return false;
	}

	//길이 확인
	if (checkVal.length != 8) {
		return false;
	}

	return true;
}

function checkDate(fromDate, toDate){
	var RegExp = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
	var regFrom = Number.parseInt(fromDate.replace(RegExp , ''));
	var regTo  = Number.parseInt(toDate.replace(RegExp , ''));

	if(regFrom > regTo){
		alert('검색 날짜를 확인해주세요.');
		return false;
	}

	return true;
}

function dateValidate(fromDate, toDate) {
	if(fromDate != '' && toDate != ''){
		if(!checkDateType(fromDate) || !checkDateType(toDate)){
			alert('날짜 값을 확인해주세요.');
			return false;
		}

		if(!checkDate(fromDate, toDate)){
			return false;
		}
	}

	return true;
}

function checkboxAll(chkboxAll, chk){
	$("#"+chkboxAll).click(function() {
		if($("#"+chkboxAll).is(":checked")) $("input[name="+chk+"]").prop("checked", true);
		else $("input[name="+chk+"]").prop("checked", false);
	});

	$("input[name="+chk+"]").click(function() {
		var total = $("input[name="+chk+"]").length;
		var checked = $("input[name="+chk+"]:checked").length;

		if(total != checked) $("#"+chkboxAll).prop("checked", false);
		else $("#"+chkboxAll).prop("checked", true);
	});
}

function gridData(gridId){
	var result = {
		'grid' : $(gridId, opener.document).getRowData(),
		'rowId' : $(gridId, opener.document).jqGrid('getDataIDs'),
		'rowMax' : $(gridId, opener.document).getGridParam('reccount')
	}
	return result;
}

function prevData(grid, rowNum){
	var gridId = '#' + grid;
	var data = gridData(gridId);
	if(rowNum-1 <= 0 ) {
		alert('현재 목록의 처음입니다.');
		return false;
	}

	var result = {'gridData' : data.grid[rowNum-2], 'rowNum' : (rowNum-1)};
	$(gridId, opener.document).jqGrid('resetSelection');
	$(gridId, opener.document).jqGrid('setSelection', data.rowId[rowNum-2]);
	return result;

}

function nextData(grid, rowNum){
	var gridId = '#' + grid;
	var data = gridData(gridId)

	if(rowNum +1 > data.rowMax){
			alert('현재 목록의 마지막입니다.');
			return false;
	}
	var result = {'gridData' : data.grid[rowNum], 'rowNum' : rowNum +1};
	$(gridId, opener.document).jqGrid('resetSelection');
	$(gridId, opener.document).jqGrid('setSelection', data.rowId[rowNum]);
	return result;
}

function prevData2(grid, rowNum, url){
	var gridId = '#' + grid;
	var data = gridData(gridId);

	if(rowNum-1 <= 0 ) {
		alert('현재 목록의 처음입니다.');
		return false;
	}

	var curruntId = data.rowId[rowNum-2];
	$(gridId, opener.document).jqGrid('resetSelection');
	$(gridId, opener.document).jqGrid('setSelection', curruntId);

	rowNum = parseInt(rowNum)-1;
	var totalUrl = url + curruntId + '&rowNum='+rowNum;
	window.location.href = totalUrl;
}

function nextData2(grid, rowNum, url){
	var gridId = '#' + grid;
	var data = gridData(gridId);

	if(rowNum +1 > data.rowMax){
			alert('현재 목록의 마지막입니다.');
			return false;
	}

	var curruntId = data.rowId[rowNum];
	$(gridId, opener.document).jqGrid('resetSelection');
	$(gridId, opener.document).jqGrid('setSelection', curruntId);

	rowNum = parseInt(rowNum)+1;
	var totalUrl = url + curruntId + '&rowNum='+rowNum;
	window.location.href = totalUrl;
}

function prevData3(grid, rowNum, url, rowName = "&rowNum=", storageName = "dataDetail"){
	var dataDetail = new Map(JSON.parse(localStorage.getItem(storageName)));
	var rows = Array.from(dataDetail.keys()).sort((a,b) => a-b);
	if(rows.indexOf(rowNum) == 0){
		alert("현재 선택의 처음입니다");
		return false;
	}	
	$('#' + dataDetail.get(rows[rows.indexOf(rowNum)]), opener.document)
		.removeClass("ui-state-highlight");
	
	rowNum = rows[rows.indexOf(rowNum)-1];
	var curruntId = dataDetail.get(rowNum)
	$('#' + curruntId, opener.document).addClass("ui-state-highlight");
	var totalUrl = url + curruntId + rowName + rowNum;
	window.location.href = totalUrl;
}

function nextData3(grid, rowNum, url, rowName = "&rowNum=", storageName = "dataDetail"){
	var dataDetail = new Map(JSON.parse(localStorage.getItem(storageName)));
	var rows = Array.from(dataDetail.keys()).sort((a,b) => a-b);
	if(rows.indexOf(rowNum) == rows.length - 1){
		alert("현재 선택의 마지막입니다");
		return false;
	}
	$('#' + dataDetail.get(rows[rows.indexOf(rowNum)]), opener.document)
		.removeClass("ui-state-highlight");
	
	rowNum = rows[rows.indexOf(rowNum)+1];
	var curruntId = dataDetail.get(rowNum);
	$('#' + curruntId, opener.document).addClass("ui-state-highlight");
	var totalUrl = url + curruntId + rowName + rowNum;
	window.location.href = totalUrl;
}

	// popup 생성되는 버튼을 클릭했을때 (모달)
/*    let popupNum = 0;
    let openPopup = Array();
    let onlyclose = false;
    let openPopupbtn = Array();*/

    $(document).on("keyup",function(key){

        if(key.keyCode == 9) {

                if($(key.target).hasClass("popupClose")){
                    $(key.target).parents(".popupbox").focus();
                }

                if(key.shiftKey){
                    if($(key.target).hasClass("popupbox")){
                        $(key.target).children(".popupClose").focus();
                    }
                }
        }
    });

    // popup 닫기
    $(".popupClose").on("click",function(){
		//console.log("popupNum:"+popupNum);
        popupNum--;
        onlyclose = false;
        $(this).parents(".popup").stop().fadeOut();
        $(openPopupbtn[popupNum]).focus();
        if(popupNum == 0){
            $("body, html").css("overflow","visible");
        }
    });

    // popup확인
    $(".popup .okbtn").on("click",function(){
        popupNum--;

        if($(this).hasClass("nopopup")){ // 확인을 눌러도 처리되었다는 팝업이 안뜨게

            $(this).parents(".popup").stop().fadeOut();

            // 팝업이 더 있을경우 finishpop 바로 이전에 열린 팝업 닫기
            $(openPopup[popupNum]).stop().fadeOut();
            popupNum--;
            $(openPopup[popupNum]).find(".popupbox").attr('tabindex','0').focus();
            if(popupNum == 0){// 이전 팝없이 닫혔는데 더이상 팝없이 없을 경우
                $("body, html").css("overflow","visible");
            }

        }else{// 확인을 누르면 처리되었다는 팝업이 뜨게


            if($(this).parents(".popup").hasClass("finishpopup")){//처리되었다는 팝업이면

                $(this).parents(".popup").stop().fadeOut();

                if(!onlyclose){
                    if(popupNum == 0){// finishpop이 닫혔는데 더이상 팝업이 없을 경우
                        $("body, html").css("overflow","visible");
                    }else{

                        // 팝업이 더 있을경우 finishpop 바로 이전에 열린 팝업 닫기
                        $(openPopup[popupNum]).stop().fadeOut();
                        popupNum--;

                        // 이전 팝없이 닫혔는데 더이상 팝없이 없을 경우
                        if(popupNum == 0){
                            $("body, html").css("overflow","visible");
                        }
                    }
                }
                $(openPopupbtn[popupNum]).focus();
                onlyclose = false;

            }else{
            //처리되었다는 팝업이 아니면

                popupNum++;
                $(this).parents(".popup").stop().fadeOut();
                //최상단에 위치할 수 있게 999뒤에 팝업갯수 추가
                $(".finishpopup").css("z-index","999"+popupNum);
                $(".finishpopup").stop().fadeIn();
                $(".finishpopup").find(".popupbox").attr('tabindex','0').focus();
            }
        }

    });

	//엑셀 x클릭시 모달 닫기
		$(".closeBtn").click(function(){
			if (confirm("창을 닫으시겠습니까?")) {
				window.close();
			}
			//LayerPopup.close($(".excelpopup"));
		})

    // popup취소
    $(".popup .cancelbtn").on("click",function(){

        popupNum--;
        onlyclose = false;
        $(this).parents(".popup").stop().fadeOut();
        $(openPopupbtn[popupNum]).focus();
        if(popupNum == 0){
            $("body, html").css("overflow","visible");
        }
    });

/*    //리스트 삭제
    	function delList(url, delKey) {

		$.ajax({
			url : url,
			type : 'POST',
			data : {
				delKeyArr : delKey
			},
		 		beforeSend : function(xhr){
					xhr.setRequestHeader( "${_csrf.headerName}", "${_csrf.token}" );
		        }

		}).done(function(result) { //
			//console.log("::result::", result);
			if (result.RESULT == 0) {
				alert("삭제되었습니다.");

			} else if (result.RESULT == -1) {
				alert('삭제 중 오류가 발생하였습니다..');
				return false;
			}

			//그리드 리로드
			jqgridTable.search();
			return true;
		}).fail(function(result) {
			//console.log(result);
			alert("처리중 오류가 발생하였습니다.");
		});
	}
*/

	//숫자 랜덤  생성
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

	//console.log("commmon.js");
	function darkMode(){
		//console.log("darkMode in")
		$("html").attr("data-dark","true");
        //console.log($(".ui-datepicker-trigger").attr("src"))
        $(".ui-datepicker-trigger").attr("src","/mng/images/calendarIcon_white.png");
	}

	function lightMode(){
		  $("html").attr("data-dark","false");
          $(".ui-datepicker-trigger").attr("src","/mng/images/calendarIcon.png")
	}

//쿠키 설정
function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function setDayCookie(name, value) {
	var todayDate = new Date();
	var nextDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()+1, 0, 0, 0);
	document.cookie = name + "=" + escape( value ) + "; " + "naver=1; path=/; expires=" + nextDay.toGMTString() + ";"
}

//쿠키삭제
function deleteCookie(name){
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//쿠키조회
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

//아이디 validation
function IdValidation(){
	var RegExp = /^[a-zA-Z0-9]{4,12}$/; //id와 pwassword 유효성 검사 정규식 -영어, 숫자

	var id = $("#userId").val();
	//console.log("::checkAll::id:" + id);
	// ================ ID 유효성검사 ================ //
	if (!id || id.length == 0) {
		alert("ID를 입력해주세요")
		return false;
	}
	if (!RegExp.test(id)) { //아이디 유효성검사
		alert("ID는 4~12자의 영문 대소문자와 숫자로만 입력해 주세요.");
		return false;
	}
	return true;
}

//유효성 체크
 function validation(pwdFlag) {
 //console.log("pwdFlag:"+pwdFlag);
		var RegExp = /^[a-zA-Z0-9]{4,12}$/; //id와 pwassword 유효성 검사 정규식
		//이메일 유효성검사
		var e_RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		var n_RegExp = /^[가-힣a-zA-Z]+$/; //이름 유효성검사 정규식

		var username = $("#userNm").val();
		//var pwd = $("#password").val();
		//var pwdChk = $("#passwordChk").val();
		var email = $("#email").val();
		var mobile = $("#mobile").val();
		// ================ 이름 유효성검사 ================ //
		if (!username || username.length == 0) {
			alert("이름을 입력해주세요.");
			//alert("이름을 입력해주세요.");
			return false;
		}
		// ================ PASSWORD 유효성검사 ===============//
		if(pwdFlag == "create"){
			var pwdRegExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
		//id와 pwassword 유효성 검사 정규식
		var pwd = $("#password").val();
		var pwdChk = $("#passwordChk").val();
			if (!pwd) { // 비밀번호 입력여부 검사
				alert("비밀번호를 입력해주세요.");
				return false;
			}
			if (!pwdRegExp.test(pwd)) { //패스워드 유효성검사
				if(eventOcc=='Y'){ //입력 이벤트가 발생했을 때만 비밀번호 유효성 체크
					 alert("비밀번호는 영문, 숫자, 특수기호 각 1개 이상 총 8자리 이상 입력해주세요");
					 return false;
				}
			 }
			if (pwd == userId) { //패스워드와 ID가 동일한지 검사
				alert("비밀번호는 ID와 동일할 수 없습니다.");
				return false;
			}

			if (pwd != pwdChk) { //비밀번호와 비밀번호확인이 동일한지 검사
				alert("비밀번호가 틀립니다. 다시 확인해 입력해주세요.");
				return false;
			}
		}

		// ================ email 유효성검사 ================ //
		if (!email) { // 이메일 입력여부 검사
			alert("이메일을 입력해주세요.");
			return false;
		}

		if (!e_RegExp.test(email)) {
			alert("올바른 이메일 형식이 아닙니다.");
			return false;
		}
		// ================ 휴대전화 유효성검사 ================ //
		if (!mobile) {
			alert("휴대폰 번호를 입력해주세요");
			return false;
		}
		return true;
	}

//비밀번호 입력 체크
var eventOcc;

//비밀번호 체크
function checkPwd() {
	eventOcc = 'Y'
	var pwd = $("#password").val();
	var pwdchk = $("#passwordChk").val();

	var pwdRegExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

	if (pwd.length != 0 && pwd == pwdchk) {// 비밀번호 입력여부 검사
		$("#pwdCkTxtOk").css("display", "inline-block");
		$("#pwdCkTxtNo").css("display", "none");
	} else {
		$("#pwdCkTxtOk").css("display", "none");
		$("#pwdCkTxtNo").css("display", "inline-block");
	}
	if (pwdRegExp.test(pwd)) { //패스워드 유효성검사
		$("#pwdAvailTxtOk").css("display", "inline-block");
		$("#pwdAvailTxtNo").css("display", "none");
	} else{
		$("#pwdAvailTxtOk").css("display", "none");
		$("#pwdAvailTxtNo").css("display", "inline-block");
	}
}

//그리드 항목 선택 여부 확인
function checkGridRowYn(gridId) {
	var result = false;
	var ids = $("#"+gridId).jqGrid('getGridParam', 'selarrrow');
	if (ids) {
		result = true;
	}
	return result;
}

//창 닫기
function closePopup(id){
	$("#"+id).click(function(){
		if(confirm("창을 닫으시겠습니까?")){
			window.close();
		}
	});
}

function comma(str){
	var result = str;
	if(result){
		if (typeof result != "string") {
			result = String(result);
		}
		result = result.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}else{
		result = '';
	}

	return result;
}
