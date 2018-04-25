// var $wrapper = $('.wrapper');
// var timer = setTimeout(function () {
// 	$wrapper.removeClass('init');
// }, 200);
// $('.item').on('click', function () {
// 	$(this).addClass('active');
// 	$wrapper.addClass('wrapper-active');
// 	$('.close').on('click', function (e) {
// 		e.stopPropagation();
// 		$('.item').removeClass('active');
// 		$wrapper.removeClass('wrapper-active');
// 	});
// });
(function () {
	var $wrapper = $('.wrapper'),
		$item = $('.item'),
		$close  = $('.close'),
		timer = null;
	timer = setTimeout(function () {
		$wrapper.removeClass('init');
	}, 200);
	$item.on('click', function () {
		var $self = $(this);
		$wrapper.addClass('wrapper-active');
		$self.addClass('active');
		$close.on('click', function (e) {
			e.stopPropagation();
			$self.removeClass('active');
			$wrapper.removeClass('wrapper-active');
		});
	});
}());
