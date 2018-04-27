// 命名空间写法
var space = {
	init: function (clsname) {
		this.domArr = this.getDomArr(clsname);
		this.w = this.domArr[0].offsetWidth / 2;    
		this.h = this.domArr[0].offsetHeight / 2;
		this.centerPointer = {};
		this.addEvent(this.domArr);
	},
	// 获取指定dom节点并存储于数组中
	getDomArr: function (clsname) {
		var item = document.getElementsByClassName(clsname);
		return Array.prototype.slice.call(item);
	},
	// 获取domArr每一项的中心坐标。并给每一项添加鼠标进入、移除事件
	addEvent: function (domArr) {
		var self = this;
		domArr.forEach(function (ele, index) {
			self.getCenterPointer(index, ele);
			(function (i) {    //立即执行函数，闭包，保存index的值于i中;
				ele.addEventListener('mouseenter', function (e) {
					var _this = this;
					clearTimeout(this.timer);
					this.timer = setTimeout(function () {
						self.changeClassName(e, _this, 'in-', i);
						console.log('mouseenter');
					}, 33);
									
				}, false);
				ele.addEventListener('mouseleave', function (e) {
					var _this = this;
					clearTimeout(this.timer);
					this.timer = setTimeout(function () {
						self.changeClassName(e, _this, 'out-', i);	
						console.log('mouseleave');	
					}, 33);
					
				}, false);
			}(index));
		});
	},
	// 改变classname;
	changeClassName: function (event, obj, str, index) {
		var firstChild = obj.firstElementChild;
		firstChild.className = 'picbox ' + str + this.judgeDirection(event, index);
	},
	// 判断方向（上、右、下、左）
	judgeDirection: function (event, index) {
		// 以中心点为原点，右方向为x轴正向， 下方向为y轴正向，建立坐标系;
		// 利用一次函数斜率k = (y2 -y1) / x2 -x1 和y2 - y1 && x2 - x1 的值来判断方向
		// 将目标元素置于坐标系中，中心为原点，对角线斜率k为1 && -1; 将元素分为上右下左四块
		var temp = this.centerPointer[index],  
			lefts = event.pageX - temp.x,       //   即x2 - x1
			tops = event.pageY - temp.y,		//  即 y2 -y1;
			name;
		// 一:若 k值（ 即 tops / lefts ）的 绝对值大于 1，即代表上下方向;
		// 然后判断tops > 0,若为真，即代表y2处于原点（元素中心）下方，即为bottom,否则为top
		// 二：否则为左右方向;
		// 然后判断lefts >0, 若为真，即代表x2处于原点（元素中心）右方,即为right,否则为left
		if(Math.abs(tops / lefts) > 1) { 
			if(tops > 0) {
				name = 'bottom';
			}else {
				name = 'top';
			}
		}else {
			if(lefts > 0) {
				name = 'right';
			}else {
				name = 'left';
			}
		}
		return name;
	},
	// 获取中心点
	getCenterPointer: function (index, obj) {
		this.centerPointer[index] = {
			x: obj.offsetLeft + this.w,
			y: obj.offsetTop + this.h
		}
	}
};
space.init('item');
//  原始写法...
// var item = document.getElementsByClassName('item'),
// 	oLi = Array.prototype.slice.call(item),
// 	centerPointer = {},      // 存储每个项目的中心点坐标
// 	w = oLi[0].offsetWidth / 2,
// 	h = oLi[0].offsetHeight / 2;
// oLi.forEach(function (ele, index) {
// 	getCenterCood(ele, index);
// 	// 立即执行函数，拿到索引
// 	(function (i) {    
// 		ele.addEventListener('mouseenter', function (e) {
// 			var child = this.firstElementChild;
// 			addClassName(e, child, 'in-', i);
// 		}, false);
// 		ele.addEventListener('mouseleave', function (e) {
// 			var child = this.firstElementChild;
// 			addClassName(e, child, 'out-', i);
// 		}, false);
// 	}(index));
// });
// function addClassName(event, ele, str, index) {
// 	ele.className = 'picbox ' + str + judgeDirection(event, index);
// }
// function judgeDirection(event, index) {
// 	var temp = centerPointer[index],
// 		left = event.pageX - temp.x,         // x1, y1 为picbox中心坐标 , x2,y2 为触发事件时的e.pageX, e.pageY;
// 		top  = event.pageY - temp.y,
// 		name;
// 	if (Math.abs(top / left) > 1) {
// 		if(top > 0) {
// 			name = 'bottom';
// 		} else {
// 			name = 'top';
// 		}
// 	} else {
// 		if(left > 0) {
// 			name = 'right';
// 		} else {
// 			name = 'left';
// 		}
// 	} 
// 	return name;
// }
// function getCenterCood(obj, index) {
// 	centerPointer[index] = {
// 		x: obj.offsetLeft + w,
// 		y: obj.offsetTop + h
// 	}
// }