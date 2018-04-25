// var index = 0;
// var disX,
// 	disY,
// 	lefts = $('.magnify').offset().left,
// 	tops = $('.magnify').offset().top;
// $('.list ul li').on('click', function () {
// 	$('.list ul li').eq(index).css({
// 		'border-color': '#eee'
// 	});
// 	index = $(this).index();
// 	$(this).css({
// 		'border-color': '#999'
// 	});
// 	changeUrl($('.show'), 'url(./images/' + (index + 1) + '.png)');
// 	changeUrl($('.bigview'), 'url(./images/' + (index + 1) + '.png)');
// });
// $('.magnify').on('mouseenter', function (e) {
// 	changeDisplay($(this), 'block');
// 	disX = e.pageX - lefts;
// 	disY = e.pageY - tops;
// 	changePosition();
// 	$(this).on('mousemove', function (e) {
// 		disX = e.pageX - lefts - 62;
// 		disY = e.pageY - tops - 62;
// 		disX = Math.max(0, disX);         // 防止disX 小于0
// 		disX = Math.min(disX, 375);		  // 防止disX 大于375 即 500 - 125
// 		disY = Math.max(25, disY);			
// 		disY = Math.min(disY, 349);
// 		changePosition();
// 		$(this).find('.bigview').css({
// 			'background-position': -4 * disX + 'px '+ (-4 * disY + 100) + 'px'
// 		})
// 	})
// });
// $('.magnify').on('mouseleave', function () {
// 	changeDisplay($(this), 'none');
// });

// function changeDisplay(obj, state) {
// 	obj.find('.chooseview').css({
// 		'display': state
// 	});
// 	obj.find('.bigview').css({
// 		'display': state
// 	})
// }

// function changePosition() {
// 	$('.chooseview').css({
// 		'left': disX + 'px',
// 		'top': disY + 'px' 
// 	});
// }

// function changeUrl(obj, url) {
// 	obj.css({
// 		'background-image': url
// 	})
// }
var newSpace = {};
(function () {
	var index = 0,
		disX,
		disY,
		lefts = $('.magnify').offset().left,
		tops = $('.magnify').offset().top;
	function changeDisplay(obj, state) {
		obj.find('.chooseview').css({
			'display': state
		});
		obj.find('.bigview').css({
			'display': state
		})	
	}
	function changePosition() {
		$('.chooseview').css({
			'left': disX + 'px',
			'top': disY + 'px' 
		});
	}
	function changeUrl(obj, url) {
		obj.css({
			'background-image': url
		})
	}
	newSpace.init = function () {
		this.addEvent();
	};
	newSpace.addEvent = function () {
		$('.magnify').on('mouseenter', function (e) {
			changeDisplay($(this), 'block');
			disX = e.pageX - lefts;
			disY = e.pageY - tops;
			changePosition();
			$(this).on('mousemove', function (e) {
				disX = e.pageX - lefts - 62;
				disY = e.pageY - tops - 62;
				disX = Math.max(0, disX);         // 防止disX 小于0
				disX = Math.min(disX, 375);		  // 防止disX 大于375 即 500 - 125
				disY = Math.max(25, disY);			
				disY = Math.min(disY, 349);
				changePosition();
				$(this).find('.bigview').css({
					'background-position': -4 * disX + 'px '+ (-4 * disY + 100) + 'px'
				})
			})
		});
		$('.magnify').on('mouseleave', function () {
			changeDisplay($(this), 'none');
		});
		$('.list ul li').on('click', function () {
			$('.list ul li').eq(index).css({
				'border-color': '#eee'
			});
			index = $(this).index();
			$(this).css({
				'border-color': '#999'
			});
			changeUrl($('.show'), 'url(./images/' + (index + 1) + '.png)');
			changeUrl($('.bigview'), 'url(./images/' + (index + 1) + '.png)');
		});
	};
}());
newSpace.init();