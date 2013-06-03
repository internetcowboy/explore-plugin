/*
*	Programmed By: Codin Pangell, InternetCowboy.org
*/


$(document).ready(function() {
	
	$('#loadingContainer').fadeOut(500, function(){
		$('#mainWrapper').fadeIn(1000);
	});
	
	
	$('#mainWrapper').explore({
		'_velocity' : '30',
		'_pageW' : '2000', //largest item in this div
		'_pageH' : '900', //largest item in this div
		'_viewPortW' : '1200', 
		'_viewPortH' : '680'
	});
	
});

(function( $ ) {
/**
 * jquery.explore - jQuery Plugin to simulate an exploratory environment around a large image
 * @version: 1.0
 * @requires jQuery v1.2.2 or later 
 * @author Codin Pangell - InternetCowboy.org
 * All Rights Reserved
**/
  $.fn.explore = function( options ) {
		var settings = $.extend( {
		  '_velocity' : '30',
		  '_pageW' : '2000',
		  '_pageH' : '900',
		  '_viewPortW' : '1200',
		  '_viewPortH' : '680'
		}, options);
	
		var opt=settings;
		
		//set the viewport to actual if not specified
		if (opt._viewPortW<=0 || opt._viewPortH<=0) {
			opt._viewPortW=$(window).width();
			opt._viewPortH=$(window).height();
		}
		//set the document bounds
		if (opt._pageW<=0 || opt._pageH<=0) {
			opt._pageW=$(document).width();
			opt._pageH=$(document).height();
		}
		
		//how much can we move the window?
		var _roomToMoveUpDown=(opt._pageH-opt._viewPortH);
		var _roomToMoveLeftRight=(opt._pageW-opt._viewPortW);
		
		
		//do movement calculations
		var newX=0;
		var newY=0;
		var holderX=obtainContainerMargin("mainWrapper","X");
		var holderY=obtainContainerMargin("mainWrapper","Y");
		$(document).mousemove(function(e){
			newX=e.pageX*-1;
			newY=e.pageY*-1;
			holderX=obtainContainerMargin("mainWrapper","X");
			holderY=obtainContainerMargin("mainWrapper","Y");
		});
		var intv=self.setInterval(function(){
		
			
			//determine X and Velocity
			posx = holderX;
			velx = (newX-posx)/parseInt(opt._velocity);
			holderX +=  velx;
			//determine Y and Velocity
			posy = holderY;
			vely = (newY-posy)/parseInt(opt._velocity);
			holderY +=  vely;
			
			//compare this number to our bounds
			var AllowY=false;
			if (Math.round(holderY)>=(-_roomToMoveUpDown)){//
				AllowY=true;
			}
			if (Math.round(holderY)>(_roomToMoveUpDown)){//top limit
				holderY=_roomToMoveUpDown;
			}
			
			//compare this number to our bounds
			var AllowX=false;
			if (Math.round(holderX)>=(-_roomToMoveLeftRight)){//
				AllowX=true;
			}
			if (Math.round(holderX)>(_roomToMoveLeftRight)){//top limit
				holderX=_roomToMoveLeftRight;
			}
			
			//set new position
			if (AllowY==true){
				$('#mainWrapper').css({
					'marginTop': (Math.round(holderY * 100) / 100)
				});
			}
			if (AllowX==true){
				$('#mainWrapper').css({
					'marginLeft': (Math.round(holderX * 100) / 100)
				});
			}
		},10);
		
		function obtainContainerMargin(container,pos){
			var holder=$('#'+container).css('marginLeft');
			if (pos=="Y"){
			holder=$('#'+container).css('marginTop');
			}
			holder=holder.split("px").join("");
			holder=parseInt(holder);
			return holder;
		}
  };
})( jQuery );

