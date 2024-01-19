//layerpop 모듈
var LayerPopup =
{
	target :
	{
			alert : $(".popup.alertPopup"),
			confirm : $(".popup.confirmPopup"),
			progress : $(".progressPopup"),
	},
	
	overflow : $('body').css('overflow'),

	show : function( target, mode, msg )
	{
			// target을 초기화 후 다시 셋팅
			var cloneObj;
			if( mode == "alert" ) cloneObj = LayerPopup.target.alert.clone();
			if( mode == "confirm" ) cloneObj = LayerPopup.target.confirm.clone();
			if( mode == "progress" ) cloneObj = LayerPopup.target.progress.clone();
	
			target.empty().append( cloneObj.html() );

	 		if( msg ) target.find(".message").html( msg );
			
			var oHeight = target.height();
			var wHeight = $(window).height();
			var oWidth = target.width();

			if( $('.modal_bg').length > 0 )
			{
				var zIndex = $('.modal_bg:last').css('z-Index');
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					//visibility:'visible',
					zIndex:(parseInt(zIndex)+3)
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg" style="z-index:'+(parseInt(zIndex)+2)+'"></div>');
			}
			else
			{
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					top:'',
					//marginLeft:(-(oWidth/2)),
					zIndex:10001,
					//visibility:'visible'
					visibility:''
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg"></div>');
			}
			
			//target.draggable();
		
			$('.cancelbtn, .popupClose', target).off().click(function(e){
				e.preventDefault();
				$('html,body').css('overflow', LayerPopup.overflow); 
				$('.modal_bg').remove();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
				$(this).parents('.popup').stop().fadeOut();
				$(this).unbind("click");
			});
			
			//포커스 설정
			if( mode == "alert" ) $('.okClosebtn').focus();
			if( mode == "confirm" ) $('.okbtn').focus();
			if( mode == "progress" ) $('.modal_progress_close').focus();
	},
	
	show2 : function( target, mode, msg )
	{
			// target을 초기화 후 다시 셋팅
			var cloneObj;
			if( mode == "alert" ) cloneObj = LayerPopup.target.alert.clone();
			if( mode == "confirm" ) cloneObj = LayerPopup.target.confirm.clone();
			if( mode == "progress" ) cloneObj = LayerPopup.target.progress.clone();
			target.empty().append( cloneObj.html() );
			
	 		if( msg ) target.find(".message").html( msg );
			
			var oHeight = target.height();
			var wHeight = $(window).height();
			var oWidth = target.width();

			if( $('.modal_bg').length > 0 )
			{
				var zIndex = $('.modal_bg:last').css('z-Index');
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					visibility:'visible',
					display:'block',
					zIndex:(parseInt(zIndex)+3)
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg" style="z-index:'+(parseInt(zIndex)+2)+'"></div>');
			}
			else
			{
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					top:'',
					//marginLeft:(-(oWidth/2)),
					zIndex:10001,
					visibility:'visible',
					display:'block',
					visibility:''
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg"></div>');
			}
			
			//target.draggable();
		
			$('.cancelbtn, .popupClose', target).off().click(function(e){
				e.preventDefault();
				$('html,body').css('overflow', LayerPopup.overflow); 
				$('.modal_bg').remove();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
				$(this).parents('.popup').stop().fadeOut();
				$(this).unbind("click");
			});
			
			//포커스 설정
			if( mode == "alert" ) $('.okClosebtn').focus();
			if( mode == "confirm" ) $('.okbtn').focus();
			if( mode == "progress" ) $('.modal_progress_close').focus();
	},
	
	//alert_popup
	alert : function( msg, callback )
	{
			LayerPopup.show( LayerPopup.target.alert, "alert", msg );
			
			if( typeof callback != 'undefined' && callback)
			{
				$('.okClosebtn', LayerPopup.target.alert).click(function(e){
					e.preventDefault();
					$('html,body').css('overflow', LayerPopup.overflow);
					$('.modal_bg').remove();
					//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
					$(this).parents('.popup').stop().fadeOut();
					if (typeof callback == 'function') {
						callback();
					} else {
						if( callback ) {
							if( callback.indexOf("(") == -1 ) eval( callback +"()");
							else eval( callback );
						} else {
							if( typeof( confirmAfter ) == "function" ) {
								confirmAfter();
							}
						}
					}
					
					$(this).unbind("click");
				});
			}
			else
			{
				$('.okClosebtn', LayerPopup.target.alert).click(function(e){
					e.preventDefault();
					$('html,body').css('overflow', LayerPopup.overflow);
					$('.modal_bg').remove();
					//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
					$(this).parents('.popup').stop().fadeOut();
					$(this).unbind("click");
				});
			}
	},
	
	//confirm_popup
	confirm : function( msg, callback )
	{
			LayerPopup.show( LayerPopup.target.confirm, "confirm", msg );
		
			$('.okbtn', LayerPopup.target.confirm).click(function(e){
				e.preventDefault();
				$('html,body').css('overflow', LayerPopup.overflow);
				$('.modal_bg').remove();
				$(this).parents('.popup').stop().fadeOut();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
		
				if (typeof callback == 'function') {
					callback();
				} else {
					if( callback ) {
						if( callback.indexOf("(") == -1 ) eval( callback +"()");
						else eval( callback );
					} else {
						if( typeof( confirmAfter ) == "function" ) {
							confirmAfter();
						}
					}
				}
				
				$(this).unbind("click");
			});
	},
	confirm3 : function( target, msg, callback, callback2)
	{//확인창: 예, 아니오 버튼에 사용자 펑션을 바인드
			var oHeight = target.height();
			var wHeight = $(window).height();
			var oWidth = target.width();
			
			if( msg ) target.find(".message").html( msg );
			
			if( $('.modal_bg').length > 0 )
			{
				var zIndex = $('.modal_bg:last').css('z-Index');
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					//visibility:'visible',
					zIndex:(parseInt(zIndex)+3)
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg" style="z-index:'+(parseInt(zIndex)+2)+'"></div>');
			}
			else
			{
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					zIndex:10001,
					//visibility:'visible'
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg"></div>');
			}
			
			$('.okbtn, .yesbtn', target).click(function(e){
				e.preventDefault();
				$('html,body').css('overflow', LayerPopup.overflow);
				$('.modal_bg').remove();
				$(this).parents('.popup').stop().fadeOut();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
		
				if (typeof callback == 'function') {
					callback();
				} else {
					if( callback ) {
						if( callback.indexOf("(") == -1 ) eval( callback +"()");
						else eval( callback );
					} else {
						if( typeof( confirmAfter ) == "function" ) {
							confirmAfter();
						}
					}
				}
				
				$(this).unbind("click");
			});
			
		
			$('.cancelbtn, .nobtn, .popupClose', target).off().click(function(e){
				e.preventDefault();
				$('html,body').css('overflow', LayerPopup.overflow); 
				$('.modal_bg').remove();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
				$(this).parents('.popup').stop().fadeOut();
				
				if (typeof callback2 == 'function') {
					callback2();
				} else {
					if( callback2 ) {
						if( callback2.indexOf("(") == -1 ) eval( callback2 +"()");
						else eval( callback2 );
					} else {
						if( typeof( confirmAfter ) == "function" ) {
							confirmAfter();
						}
					}
				}
				
				$(this).unbind("click");
			});
	},
	// progress 팝업은 close 에 callback
	progress : function(msg, callback)
	{
			LayerPopup.show( LayerPopup.target.progress, "progress", msg );
			
			
			if( typeof callback != 'undefined' && callback)
			{
				$('.modal_progress_close', LayerPopup.target.progress).click(function(e){
					e.preventDefault();
					$('html,body').css('overflow', LayerPopup.overflow);
					$('.modal_bg').remove();
					//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
					$(this).parents('.popup').stop().fadeOut();
			
					if (typeof callback == 'function') {
						callback();
					} else {
						if( callback ) {
							if( callback.indexOf("(") == -1 ) eval( callback +"()");
							else eval( callback );
						} else {
							if( typeof( confirmAfter ) == "function" ) {
								confirmAfter();
							}
						}
					}
					
					$(this).unbind("click");
				});
			}
			else
			{
				$('.modal_progress_close', LayerPopup.target.progress).click(function(e){
					e.preventDefault();
					$('html,body').css('overflow', LayerPopup.overflow);
					$('.modal_bg').remove();
					//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
					$(this).parents('.popup').stop().fadeOut();
					
					$(this).unbind("click");
				});
			}
	},
	
	// popup close
	closeProgress : function() 
	{
		//$('.modal_progress_close', LayerPopup.target.progress).click();
		$('html,body').css('overflow', LayerPopup.overflow); 
		$('.modal_bg').remove();
		//$('.progressPopup').stop().fadeOut();
		
		$(this).unbind("click");
	}
	,
	popup : function( target)
	{
			var oHeight = target.height();
			var wHeight = $(window).height();
			var oWidth = target.width();

			console.log('::target::' , target);
			if( $('.modal_bg').length > 0 )
			{
				var zIndex = $('.modal_bg:last').css('z-Index');
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					//visibility:'visible',
					display: 'block',
					zIndex:(parseInt(zIndex)+3)
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg" style="z-index:'+(parseInt(zIndex)+2)+'"></div>');
			}
			else
			{
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					zIndex:10001,
					display: 'block',
					//visibility:'visible'
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg"></div>');
			}
			
			$('.cancelbtn, .popupClose, .closeBtn', target).off().click(function(e){
				e.preventDefault();
				$('html,body').css('overflow', LayerPopup.overflow); 
				//$('.modal_bg').remove();
				$('.modal_bg').remove();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
				$(this).parents('.popup').stop().fadeOut();
				
				$(this).unbind("click");
			});
	},
	popup2 : function( target, callback)
	{
			var oHeight = target.height();
			var wHeight = $(window).height();
			var oWidth = target.width();

			if( $('.modal_bg').length > 0 )
			{
				var zIndex = $('.modal_bg:last').css('z-Index');
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					//visibility:'visible',
					zIndex:(parseInt(zIndex)+3)
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg" style="z-index:'+(parseInt(zIndex)+2)+'"></div>');
			}
			else
			{
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					zIndex:10001,
					//visibility:'visible'
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg"></div>');
			}
			
			$('.okbtn', target).click(function(e){
				e.preventDefault();
				$('html,body').css('overflow', LayerPopup.overflow);
				$('.modal_bg').remove();
				$(this).parents('.popup').stop().fadeOut();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
		
				if (typeof callback == 'function') {
					callback();
				} else {
					if( callback ) {
						if( callback.indexOf("(") == -1 ) eval( callback +"()");
						else eval( callback );
					} else {
						if( typeof( confirmAfter ) == "function" ) {
							confirmAfter();
						}
					}
				}
				
				$(this).unbind("click");
			});
			
		
			$('.cancelbtn, .popupClose', target).off().click(function(e){
				e.preventDefault();
				$('html,body').css('overflow', LayerPopup.overflow); 
				$('.modal_bg').remove();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
				$(this).parents('.popup').stop().fadeOut();
				
				$(this).unbind("click");
			});
	},
	excel : function( target, callback)
	{
			var oHeight = target.height();
			var wHeight = $(window).height();
			var oWidth = target.width();

			if( $('.modal_bg').length > 0 )
			{
				var zIndex = $('.modal_bg:last').css('z-Index');
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					//visibility:'visible',
					zIndex:(parseInt(zIndex)+3)
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg" style="z-index:'+(parseInt(zIndex)+2)+'"></div>');
			}
			else
			{
				$('html,body').css('overflow','hidden');
				target.css({
					//top:(wHeight-oHeight)/2,
					//marginLeft:(-(oWidth/2)),
					zIndex:10001,
					//visibility:'visible'
				});
				$(target).stop().fadeIn();
				$('body').append('<div class="modal_bg"></div>');
			}
			
			$('.okbtn', target).click(function(e){
				e.preventDefault();
				//$('html,body').css('overflow', LayerPopup.overflow);
				$('html,body').css('overflow', 'auto');
				$('.modal_bg').remove();
				$(this).parents('.popup').stop().fadeOut();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
		
				if (typeof callback == 'function') {
					callback();
				} else {
					if( callback ) {
						if( callback.indexOf("(") == -1 ) eval( callback +"()");
						else eval( callback );
					} else {
						if( typeof( confirmAfter ) == "function" ) {
							confirmAfter();
						}
					}
				}
				
				$(this).unbind("click");
			});
			
		
			$('.closeBtn, .cancelbtn, .popupClose', target).off().click(function(e){
				e.preventDefault();
				//$('html,body').css('overflow', LayerPopup.overflow); 
				$('html,body').css('overflow', 'auto');
				$('.modal_bg').remove();
				//$(this).parents('.popup').css({top:'-9999px',visibility:'hidden'});
				$(this).parents('.popup').stop().fadeOut();
				
				$(this).unbind("click");
			});
			
			//포커스 설정
			$('.okbtn').focus();
	},
	close : function( target)
	{
						
			$('html,body').css('overflow', LayerPopup.overflow); 
			//$('.modal_bg').remove();
			$('.modal_bg').remove();
			$(target).stop().fadeOut();
	},
	
	
}

function alertPopup(msg) {
	LayerPopup.alert(msg);
}

function alertPopup(msg, fn) {
	LayerPopup.alert(msg, fn);
}
		
function confirmPopup(msg, fn) {
	console.log("confirmPopup::msg::" + msg);
	LayerPopup.confirm(msg, fn);
}

function confirmPopup2(target, fn) {
	console.log("confirmPopup2::");
	LayerPopup.popup2(target, fn);
}

function confirmPopup3(target, msg, fn, fn2) {
	LayerPopup.confirm3(target, msg, fn, fn2);
}

function excelPopup(target, fn) {
	console.log("excelPopup::target::" + target);
	LayerPopup.excel(target, fn);
}
	
function progressPopup(msg, fn) {
	LayerPopup.progress(msg, fn);
}

function closePopup(obj) {
	LayerPopup.close(obj);
}



//end layerpop 모듈