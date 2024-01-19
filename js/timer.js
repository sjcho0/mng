//Timer 설정 시작
$(function() {
		
		counter_init();
});

var tid;
		var cnt = parseInt(10);//초기값(초단위)
		var firstLocalTime;
		var prevServerTime;
		function counter_init() { //메인화면 세션 카운트 실행
			prevServerTime = getCookie("egovLatestServerTime");
			firstLocalTime = (new Date()).getTime();
			tid = setInterval("counter_run()", 1000);
		}

		function counter_run() { //메인화면 세션 카운트
			var latestTime = getCookie("egovLatestServerTime");
			var expireTime = getCookie("egovExpireSessionTime");
			
			if(prevServerTime != latestTime){
				clearInterval(tid);
				cnt = parseInt(30);//초기값(초단위)
				counter_init();

				//(3) 팝업화면 추가 세션 카운트도 초기화
				document.all.ncounter.innerText = "";
			}
			
			var elapsedLocalTime = (new Date()).getTime() - firstLocalTime;
			var timeRemaining = expireTime - latestTime - elapsedLocalTime;
			
			var timeHour = Math.floor(timeRemaining/1000/60 / 60); 
			var timeMin = Math.floor((timeRemaining/1000/60) % 60);
			var timeSec = Math.floor((timeRemaining/1000) % 60);

			/*헤더 카운터 : 아래 주석 해제시 화면표시*/
			//document.all.counter.innerHTML = pad(timeHour,2) +":"+ pad(timeMin,2) +":"+ pad(timeSec,2);
			
			if (timeRemaining < 40*1000) {
				clearInterval(tid);
				/*세션연장 여부를 질의하는 팝업을 띄운다.*/
				open_window();

				/*팝업에서 다시 카운트 시작*/
				cnt = parseInt(30);//카운트 초기화(초단위)
				nCounter_init();
			}
		}

		function nCounter_init() { //팝업화면 추가 세션 카운트 실행
			//console.log("nCounter_init");
			tid = setInterval("nCounter_run()", 1000);
		}

		function nCounter_run() { //팝업화면 추가 세션 카운트
			document.all.ncounter.innerText = time_format('P', cnt);
			cnt--;
			if (cnt < 0) {
				/*추가 세션 카운트가 0이면 로그아웃 후 자동로그아웃 안내화면으로 이동*/
				logoutInfo();
			}
		}

		function counter_reset() { //메인화면 카운트 재시작 및 서버 세션 연장
			//(1) WAS session 연장을 위해 WAS의 dummy 페이지 호출
			// => WAS 호출로직 추가! 각 시스템에 맞게 수정
			callDummy();
			
			//(2) 세견 카운트 초기화
			clearInterval(tid);
			cnt = parseInt(30);//초기값(초단위)
			counter_init();

			//(3) 팝업화면 추가 세션 카운트도 초기화
			document.all.ncounter.innerText = "";

		}
		
		function callDummy(){
			$.ajax({
				url: "${context}/callDummy.do",
				//contentType : 'application/json; charset=UTF-8',
				type: 'GET',

			})
			.done(function(result) { //
			}).fail(function(result) {
			});
		}

		function logoutInfo() { //로그아웃 후 자동로그아웃 안내화면으로 이동
			self.location = "/autoLogout.do"; //각 시스템에 맞게 수정
		}

		function pad(n, width) {
			n = n + '';
		  	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
		}
		
		function time_format(type, s) {
			var nHour = 0;
			var nMin = 0;
			var nSec = 0;
			if (s > 0) {
				nMin = parseInt(s / 60);
				nSec = s % 60;

				if (nMin > 60) {
					nHour = parseInt(nMin / 60);
					nMin = nMin % 60;
				}
			}
			if (nSec < 10)
				nSec = "0" + nSec;
			if (nMin < 10)
				nMin = "0" + nMin;
			
			var time_str;
			if(type == 'P'){
				time_str = "" + nSec;
			}else{
				time_str = "" + nHour + ":" + nMin + ":" + nSec;
			}
			
			return time_str;
		}