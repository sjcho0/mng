!function(r){"use strict";"function"==typeof define&&define.amd?define(["jquery"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e||window)),r(t),t}:r(jQuery)}(function(e){"use strict";var t={isRTL:!1,defaults:{recordtext:"보기 {0} - {1} / {2}",emptyrecords:"표시할 행이 없습니다",loadtext:"조회중...",pgtext:"페이지 {0} / {1}",pgfirst:"First Page",pglast:"Last Page",pgnext:"Next Page",pgprev:"Previous Page",pgrecs:"Records per Page",showhide:"Toggle Expand Collapse Grid",savetext:"저장 중..."},search:{caption:"검색...",Find:"찾기",Reset:"초기화",odata:[{oper:"eq",text:"같다"},{oper:"ne",text:"같지 않다"},{oper:"lt",text:"작다"},{oper:"le",text:"작거나 같다"},{oper:"gt",text:"크다"},{oper:"ge",text:"크거나 같다"},{oper:"bw",text:"로 시작한다"},{oper:"bn",text:"로 시작하지 않는다"},{oper:"in",text:"내에 있다"},{oper:"ni",text:"내에 있지 않다"},{oper:"ew",text:"로 끝난다"},{oper:"en",text:"로 끝나지 않는다"},{oper:"cn",text:"내에 존재한다"},{oper:"nc",text:"내에 존재하지 않는다"},{oper:"nu",text:"is null"},{oper:"nn",text:"is not null"}],groupOps:[{op:"AND",text:"전부"},{op:"OR",text:"임의"}],addGroupTitle:"Add subgroup",deleteGroupTitle:"Delete group",addRuleTitle:"Add rule",deleteRuleTitle:"Delete rule",operandTitle:"Click to select search operation.",resetTitle:"Reset Search Value"},edit:{addCaption:"행 추가",editCaption:"행 수정",bSubmit:"전송",bCancel:"취소",bClose:"닫기",saveData:"자료가 변경되었습니다! 저장하시겠습니까?",bYes:"예",bNo:"아니오",bExit:"취소",msg:{required:"필수항목입니다",number:"유효한 번호를 입력해 주세요",minValue:"입력값은 크거나 같아야 합니다",maxValue:"입력값은 작거나 같아야 합니다",email:"유효하지 않은 이메일주소입니다",integer:"유효한 숫자를 입력하세요",date:"유효한 날짜를 입력하세요",url:"은 유효하지 않은 URL입니다. 문장앞에 다음단어가 필요합니다('http://' or 'https://')",nodefined:" 은 정의도지 않았습니다!",novalue:" 반환값이 필요합니다!",customarray:"사용자정의 함수는 배열을 반환해야 합니다!",customfcheck:"Custom function should be present in case of custom checking!"}},view:{caption:"행 조회",bClose:"닫기"},del:{caption:"삭제",msg:"선택된 행을 삭제하시겠습니까?",bSubmit:"삭제",bCancel:"취소"},nav:{edittext:"",edittitle:"선택된 행 편집",addtext:"",addtitle:"행 삽입",deltext:"",deltitle:"선택된 행 삭제",searchtext:"",searchtitle:"행 찾기",refreshtext:"",refreshtitle:"그리드 초기화",alertcap:"경고",alerttext:"행을 선택하세요",viewtext:"",viewtitle:"선택된 행 조회",savetext:"",savetitle:"Save row",canceltext:"",canceltitle:"Cancel row editing"},col:{caption:"열을 선택하세요",bSubmit:"확인",bCancel:"취소"},errors:{errcap:"오류",nourl:"설정된 url이 없습니다",norecords:"처리할 행이 없습니다",model:"colNames의 길이가 colModel과 일치하지 않습니다!"},formatter:{integer:{thousandsSeparator:",",defaultValue:"0"},number:{decimalSeparator:".",thousandsSeparator:",",decimalPlaces:2,defaultValue:"0.00"},currency:{decimalSeparator:".",thousandsSeparator:",",decimalPlaces:2,prefix:"",suffix:"",defaultValue:"0.00"},date:{dayNames:["일","월","화","수","목","금","토","일","월","화","수","목","금","토"],monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월","1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],AmPm:["am","pm","AM","PM"],S:function(e){return e<11||13<e?["st","nd","rd","th"][Math.min((e-1)%10,3)]:"th"},srcformat:"Y-m-d",newformat:"m-d-Y",masks:{ShortDate:"Y/j/n",LongDate:"l, F d, Y",FullDateTime:"l, F d, Y g:i:s A",MonthDay:"F d",ShortTime:"g:i A",LongTime:"g:i:s A",YearMonth:"F, Y"}}}};e.jgrid=e.jgrid||{},e.extend(!0,e.jgrid,{defaults:{locale:"kr"},locales:{kr:e.extend({},t,{name:"한국어",nameEnglish:"Korean"}),ko:e.extend({},t,{name:"한국어",nameEnglish:"Korean"}),"ko-KR":e.extend({},t,{name:"한국어 (대한민국)",nameEnglish:"Korean (Korea)"})}})});
//# sourceMappingURL=grid.locale-kr.js.map