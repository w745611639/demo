// 模块化开发，将所用功能添加到一个对象中;
var tool = {
	init: function () {
		this.drawScale(60, '.control-second');
		this.drawScale(12, '.control-hour');
		this.drawFigure(12, '.control-num');	
	},
	drawScale: function (leng, obj) {
		var str = '',
			angle = 360 / leng;
		for(var i = 1; i <= leng; i++ ) {
			str += '<li style="transform: rotate(' + i * angle + 'deg);"></li>';
		}
		$(obj).html(str);
	},
	drawFigure: function (leng, obj) {
		var str =  '',
			angle = 360 / leng;
		for(var i = 1; i <= leng; i++ ) {
			str += '<li style="transform: rotate(' + i * angle + 'deg) translate(-50%);">' + '<span style="display:block;transform: rotate(-' + i * angle + 'deg)">' + i + '</span>' + '</li>';
		}
		$(obj).html(str);	
	}
};
var timer = null;
tool.init();
//  添加秒刻度
// var str = '';
// for(var i = 1; i <= 60; i++ ) {
// 	str += '<li style="transform: rotate(' + i * 6 + 'deg);"></li>';
// }
// $('.control-second').html(str);
// // 添加时刻度
// var str1 = '';
// for(var i = 1; i <= 12; i++ ) {
// 	str1 += '<li style="transform: rotate(' + i * 30 +'deg);"></li>';
// }
// $('.control-hour').html(str1);
// // 添加数字
// var str2 = '';
// for(var i = 1; i <= 12; i++ ) {
// 	str2 += '<li style="transform: rotate(' + i * 30 + 'deg) translate(-50%);">' + '<span style="display:block;transform: rotate(-' + i * 30 + 'deg)">' + i + '</span>' + '</li>';
// }
// $('.control-num').html(str2);
getTime();
timer = setInterval(getTime, 1000);
function getTime() {
	var timers = new Date(),
		second_ned = timers.getSeconds() * 6,
		min_ned = timers.getMinutes() *6 + second_ned / 60,
		hour_ned = timers.getHours() * 30 + min_ned / 12 - 180;
		// min_ned = timers.getMinutes() * 6  + second_ned / 60;
	$('.control-pointer .second-ned').css({'transform': 'rotate(' + (second_ned - 180) + 'deg) translate(-50%)'});
	$('.control-pointer .min-ned').css({'transform': 'rotate(' + (min_ned - 180) + 'deg) translate(-50%)'});
	$('.control-pointer .hour-ned').css({'transform': 'rotate(' + hour_ned + 'deg) translate(-50%)'});
}