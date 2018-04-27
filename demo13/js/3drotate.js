// $('.wrapper').on('click', function (e) {
// 	var target = e.target;
// 	var src;
// 	console.log(target);
// 	if(target.nodeName === 'IMG') {
// 		src = $(target).attr('src');
// 	} else {
// 		src = $(target).find('img').attr('src');
// 	}
// 	$('.wrapper').fadeOut().css({
// 		'animation-play-state': 'paused'
// 	}).delay(1000).nextAll().eq(0).find('img').attr('src', src).end().fadeIn().addClass('show-big-img');
// });
// $('.show').on('click', function () {
// 	$(this).css('display', 'none');
// 	$('.wrapper').css('animation-play-state', 'running').fadeIn(800);
// })



function showEffect() {
	this.dom = {
		wrapper: $('.wrapper'),
		show: $('.show'),	
	};
	this.init();
}
showEffect.prototype.init = function () {
	this.bindEvent();
}
showEffect.prototype.bindEvent = function () {
	var dom = this.dom,
	 	$wrapper = dom.wrapper,
		$show = dom.show;
	$wrapper.on('click', function (e) {
		var target = e.target,
			src;
		if(target.nodeName === 'IMG') {
			src = $(target).attr('src');
		} else {
			src = $(target).find('img').attr('src');
		}
		$(this).css({
			'display': 'none',
			'animation-play-state': 'paused'
			})
			.delay(600).nextAll().eq(0).find('img').attr('src', src)
			.end().fadeIn().addClass('show-big-img');
	});
	$show.on('click', function () {
		console.log(this);
		$(this).fadeOut(600, function () {
			$(this).removeClass('show-big-img')
			.siblings().eq(0).css('animation-play-state', 'running').css('display', 'block');
		});
	});
}
new showEffect();