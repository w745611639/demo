var newSpace = {};
(function (part) {
	var index = 0,
		disX,
		disY,
		$magnify = $('.magnify'),
		$show = $('.show'),
		$choose = $('.chooseview'),
		$bigview = $('.bigview'),
		$img,
		lefts = $magnify.offset().left,
		tops = $magnify.offset().top,
		half_width = $choose.innerWidth() / 2,
		min_value,
		max_value;
	function addImg() {
			$img = $('<img>');
			$img.attr('src', './images/' + (index + 1) + '.png');
			$img.on('load', function () {
				var img = $img[0],
					width = img.width,
					height = img.height,
					scale = width / height;		
				if(width > height) {    //  判断图片原始大小，如果宽大于高，等比例缩放至宽等于500，并实现图片上下居中
					img.width = 500;
					img.height = 500 / scale;
					min_value = (500 - img.height) / 2;
					$img.css('margin-top', min_value + 'px'); // 图片高度不满500，使用margin上下居中；
				} else {
					img.height = 500;
					img.width = 500 * scale;
					min_value = (500 - img.width) / 2;
					$img.css('margin-left', (500 - img.width) / 2 + 'px'); //图片宽度不满500，使用margin左右居中；
				}
				max_value = 500 - min_value - 125;
				// console.log(max_value);
				$show.append($img);
			});
	}
	function getPosition(e) {
		disX = e.pageX - lefts - half_width; 
		disY = e.pageY - tops - half_width;
		var margin_top = parseFloat($('.show img').css('margin-top'));
		var margin_left = parseFloat($('.show img').css('margin-left'));
		if($('.show img').width() == 500) {
			disX = Math.max(0, disX);      //限定范围 0 < disX < 375  (500 - 小板块的宽度125)
			disX = Math.min(375, disX);
			disY = Math.max(min_value, disY);    // min_value(图片的上边距) < disY < max_value(500 - 小白块的高度125 - 图片上边距)
			disY = Math.min(max_value, disY)
		} else {
			disX = Math.max(min_value, disX);
			disX = Math.min(max_value, disX);
			disY = Math.max(0, disY);
			disY = Math.min(375, disY);
		}
		$choose.css({
			'left': disX + 'px',
			'top': disY + 'px'
		});
		$bigview.css({
			'background-position': (-disX + margin_left) * 4 + 'px ' + (-disY + margin_top) * 4 + 'px'
		});
	}
	part.init = function () {
		this.bindEvent();
	};
	part.bindEvent = function () {
		$('.list li').on('click', function () {
			if(index != $(this).index()) {
				$('.list li').eq(index).removeClass('active');
				$show.html('');
				$(this).addClass('active');	
		 		index = $(this).index();
		 		addImg();
			}
		});
		addImg();
		$magnify.on('mouseenter', function (e) {
			getPosition(e);
			var img_src = $show.find('img').attr('src');
			$bigview.css({
				'background-image': 'url(' + img_src + ')',
				'background-size': $img.width() * 4 + 'px ' + $img.height() * 4 + 'px',
				'display': 'block'
			});
			$(this).on('mousemove', getPosition);
			$choose.css('display', 'block');
			$(this).on('mouseleave', function (e) {
				$choose.css('display', 'none');
				$bigview.css('display', 'none');
			});
		});
	}
}(newSpace));
newSpace.init();