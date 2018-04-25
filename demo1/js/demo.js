(function () {
	var items = $('.item'),
		length = items.length,
		item = null,
		children = null,
		width = items.eq(0).width(),     // 缓存宽度
		num = 0,
		flag = false;
	for(var i = 0; i < length; i ++) {
		children = $(items[i]).children();
		for(var j = 0, len = children.length; j < len; j ++) {
			$(children[j]).css({
				'background-image': 'url(./images/' + (j + 1) + '.png)',
				'background-position-x': - i * width + 'px',
				'transform': 'rotateX(' +  j * 90 + 'deg)  translateZ(220px)'
			})
		}
	}
	$('.next').on('click', function () {
		if(!flag) {      // 添加一个锁，防止过渡未执行完之前多次执行
			rotate(-1);
		}	
	});
	$('.prev').on('click', function () {
		if(!flag) {
			rotate(1);
		}
	})
	function rotate(count) {
		flag = true;
		num += count;
		var i = 0,
			timer = setInterval(function () {
				$(items[i]).css({
					'transform': 'rotateX(' + num * 90 + 'deg)'
				});
				i ++;
				if(i >= length) {
					clearInterval(timer);
					flag = false;
				}
			}, 150);
	}
}());
