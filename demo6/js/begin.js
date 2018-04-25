var oItem = document.getElementsByClassName('items')[0],
	oCov = document.getElementsByClassName('cover')[0],
	oCov_li = oCov.getElementsByTagName('li'),
	oLi = oItem.getElementsByTagName('li');
function createTag(obj, num) {
	var str = '';
	for(var i = 0; i < num; i ++) {
		str += '<li></li>';
	}
	obj.innerHTML = str;
}
createTag(oItem, 400);   //生成底层li标签
createTag(oCov, 400);   // 生成遮罩层li标签
leng = oLi.length;
// 将互不相同的随机数放入数组中，并按从小到大顺序排列
function randomMine(num, area) {
	var arr = [],
		temp = Math.floor(Math.random() * area);
	arr.push(temp);
	for(var i = 1; i < num; i ++) {
		check(arr, num, area);
	}
	arr.sort(function (a, b) {
		return a - b;
	})
	return arr;
}
//  封装 添加指定数目的互不相等的随机数函数
function check(arr, leng, area) {
	var count = 0,
		temp = Math.floor(Math.random () * area);
	for(var i = 0; i < leng; i ++) {
		if(arr[i] !== temp) {
			count ++;
		}
	} 
	if(count === leng) {
		arr.push(temp);
	} else {	
		check(arr, leng, area);
	}
}
var arr1 = randomMine(55, leng);
//  封装 添加雷函数;
function renderMine(arr, obj) {
	var leng = arr.length
	for(var i = 0; i < leng; i ++) {
		obj[arr[i]].classList.add('mine');
	}
}
renderMine(arr1, oLi);
//  计算周围雷个数
function mineNum(obj) {
	var leng = obj.length;
	for(var i = 0; i < leng; i ++) {
		obj[i].index = i;
		if(!obj[i].classList.contains('mine')) {
			checkMine(obj[i], oLi);
		}
	}
}
mineNum(oLi);
// 判断以自身为中心的九宫格是否有雷，有就显示所有的个数，没有就为空
function checkMine(obj, arr) {
	var count = 0,
		index = obj.index,
		arrCheck = diffuseCheck(index);	
	count = judgeMine(index, arr, arrCheck);
	if(count) {
		arr[index].innerHTML = count;
	}	
}
// 判断附近是否有雷
function judgeMine(x, arr, arrCheck) {
	var leng = arrCheck.length,
		count = 0,
		index;
	for(var i = 0; i < leng; i ++) {
		index = arrCheck[i];
		if(arr[index] && arr[index].classList.contains('mine')) {
			count ++;
		}
	}
	return count;	
}
for(var i = 0; i < leng; i ++) {
	oCov_li[i].index = i;
}
oCov.onclick = function (e) {
	var event = e || window.evemt,
		target = event.target || event.srcElement,
		arr = [];
		index = target.index;
	target.classList.add('click');
	if(oLi[index] && oLi[index].classList.contains('mine')) {
		alert('game over');
	}else {
		// if(!Boolean(oLi[index].innerHTML)) {
		// 	arr = diffuseCheck(index);
		// 	chicked(arr, oCov_li);
		// }
		chicked(index, oCov_li, oLi);
	}	
}
// 将index周围索引添加到一个数组中
function diffuseCheck(index) {
	var arr;
	if(index % 20 == 0) {
		arr = [index + 1, index - 20, index + 20, index - 19, index + 21];	
	}else if(index % 20 == 19) {
		arr = [index - 1, index - 20, index + 20, index + 19, index - 21];
	}else if(index < 19 && index > 0) {
		arr = [index - 1, index + 1, index + 20, index + 19, index + 21];	
	}else if(index > 380 && index < 399) {
		arr = [index - 1, index + 1, index - 20, index - 19, index - 21];	
	}else {
		arr = [index - 1, index + 1, index - 20, index + 20, index + 19, index - 19, index - 21, index + 21];	
	}
	return arr;
}
function chicked(index, obj, obj1) {
	var arr,
		value;
	if(obj1[index] && !Boolean(obj1[index].innerHTML)) {
		arr = diffuseCheck(index);
		// 筛选arr 返回索引对应的节点 不含 'click' 类名的
		arr = arr.filter(function (ele, i) {return obj[ele] && !obj[ele].classList.contains('click') });
		for(var i = 0; i < arr.length; i ++) {
			value = arr[i];
			obj[value].className = 'click';
			chicked(value, obj, obj1);   
		}
	}
}
// function leftCheck(num, obj, arr) {
// 	if(arr[obj.index + 1] && arr[obj.index + 1].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index - 20] &&  arr[obj.index - 20].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 20] &&  arr[obj.index + 20].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index - 19] &&  arr[obj.index - 19].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 21] &&  arr[obj.index + 21].classList.contains('mine')) {
// 			num ++;
// 	}
// 	return num;
// } 
// function rightCheck(num, obj, arr) {
// 	if(arr[obj.index - 1] && arr[obj.index - 1].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index - 20] &&  arr[obj.index - 20].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 20] &&  arr[obj.index + 20].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 19] &&  arr[obj.index + 19].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index - 21] &&  arr[obj.index - 21].classList.contains('mine')) {
// 			num ++;
// 	}
// 	return num;
// }
// function topCheck(num, obj, arr) {
// 	if(arr[obj.index - 1] && arr[obj.index - 1].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 1] &&  arr[obj.index + 1].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 20] &&  arr[obj.index + 20].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 19] &&  arr[obj.index + 19].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 21] &&  arr[obj.index + 21].classList.contains('mine')) {
// 			num ++;
// 	}
// 	return num;
// }
// function bottomCheck(num, obj, arr) {
// 	if(arr[obj.index - 1] && arr[obj.index - 1].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index + 1] &&  arr[obj.index + 1].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index - 20] &&  arr[obj.index - 20].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index - 19] &&  arr[obj.index - 19].classList.contains('mine')) {
// 			num ++;
// 	}
// 	if(arr[obj.index - 21] &&  arr[obj.index - 21].classList.contains('mine')) {
// 			num ++;
// 	}
// 	return num;
// } 

