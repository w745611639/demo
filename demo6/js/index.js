var oItem = document.getElementsByClassName('items')[0],
	oCov = document.getElementsByClassName('cover')[0],
	oCov_li = oCov.getElementsByTagName('li'),
	oLi = oItem.getElementsByTagName('li'),
	oSpan = document.getElementsByTagName('span')[0],
	oTime = document.getElementsByClassName('use-time')[0],
	oLevel = document.getElementsByClassName('difficulty')[0].getElementsByTagName('div'),
	oEase = document.getElementsByClassName('ease')[0],
	oCommon = document.getElementsByClassName('common')[0],
	oHard = document.getElementsByClassName('hard')[0],
	arrMine = [],
	row,
	col,
	len,
	value,
	initial,
	timer = null,
	time = 0,
	lastIndex = 0;
for(var i = 0, length = oLevel.length; i < length; i ++) {
	oLevel[i].index = i;
}
managerSpace.init();
timer = setInterval(function () {
	time ++;
	oTime.innerHTML = time;
}, 1000);
// chooseLevel(oLevel[0], oLevel, 9, 9, 10);
// oSpan.innerHTML = value;
// oCov.onclick = function (e) {
// 	var event = e || window.evemt,
// 		target = event.target || event.srcElement,
// 		arr = [];
// 		index = target.index;
// 	if(!target.bool) {
// 		target.classList.add('click');
// 		target.clicked = true;
// 		if(oLi[index] && oLi[index].classList.contains('mine')) {
// 			alert('game over');
// 			arrMine = [];
// 			oSpan.innerHTML = initial;
// 			mineControl.init();
			// value = 10;
			// oSpan.innerHTML = value;
		// 	time = 0;
		// }else {
			// if(!Boolean(oLi[index].innerHTML)) {
			// 	arr = diffuseCheck(index);
			// 	chicked(arr, oCov_li);
			// }
// 			mineControl.chicked(index, oCov_li, oLi);
// 		}
// 	}	
// };
// document.oncontextmenu = function (e) {
// 	var event = e || window.evemt,
// 		target = event.target || event.srcElement;
// 	if(!target.clicked && target.nodeName == 'LI') {
// 		target.classList.toggle('add-flag');
// 		// target.bool = target.classList.contains('add-flag') ? true : false;
// 		if(target.classList.contains('add-flag')) {
// 			target.bool = true;
// 			value --;
// 		} else {
// 			target.bool = false;
// 			value ++;
// 		}
// 		oSpan.innerHTML = value;
// 	}
// 	return false;
// };
// oEase.onclick = function () {
// 	chooseLevel(this, oLevel, 9, 9, 10);
// };
// oCommon.onclick = function () {
// 	chooseLevel(this, oLevel, 16, 16, 40);
// };
// oHard.onclick = function () {
// 	// var self = this;
// 	chooseLevel(this, oLevel, 30, 16, 99);
// };
// function chooseLevel(obj, dom,x, y, num) {
// 	time = 0;
// 	arrMine = [];
// 	dom[lastIndex].classList.remove('active'); 
// 	obj.classList.add('active');
// 	lastIndex = obj.index;
// 	row = x;
// 	col = y;
// 	len = row * col;
// 	value = num;
// 	initial = num;
// 	oItem.style.width = 30 * row + 'px';
// 	oCov.style.width = 30 * row  + 'px';
// 	oSpan.innerHTML = value;
// 	mineControl.init();
// }

