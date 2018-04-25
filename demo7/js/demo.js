var flag = true;
function flyImg(btn, target) {
	$(btn).on('click', function  () {
		if(flag) {	
			flag = false;	 //加锁，防止短时间多次点击
			var img = $(this).parent().find('img').clone();
			img.css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'z-index': 1
			});
			$(this).parent().append(img);
			img.animate({       // 首先 缩小为50px的圆
				'width': '50px',
				'height': '50px',
				'border-radius': '50%'
			}, function () {
				img.animate({     //随后运动到目标位置
					'left': $(target).offset().left - $(this).offset().left - 40 +  'px',
					'top': $(target).offset().top - $(this).offset().top  +  'px'
				}, 1500, function () {
					img.remove();   //移除复制的图片
					var value = $(target).find('.count').html() - 0;
					value ++;
					$(target).find('.count').html(value);
					flag = true;	//所有动画执行完毕后开锁	
				});
			});
		}
	});
}
$('.right-aside a').on('mouseenter', function () {
	$(this).find('div').css('display', 'block');
	$(this).find('.hidden').animate({
		'right': '40px'
	}, 1000)
});
$('.right-aside a').on('mouseleave', function () {
	$(this).find('div').css('display', 'none');
	$(this).find('.hidden').animate({
		'right': '76px'
	}, 1000)
});
flyImg('.add-cart', '.shopping-cart');
flyImg('.add-collect', '.collect');