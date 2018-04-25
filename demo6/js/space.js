var managerSpace = {
	init: function () {
		this.chooseLevel(oLevel[0], oLevel, 9, 9, 10);  // 初始为容易难度
		this.bindEvent();  
	},
	bindEvent: function () {
		var self = this;
		document.oncontextmenu = this.insertFlag;
		oEase.onclick = function () {
			self.chooseLevel(this, oLevel, 9, 9, 10);
		};
		oCommon.onclick = function () {
			self.chooseLevel(this, oLevel, 16, 16, 40);
		};
		oHard.onclick = function () {
			self.chooseLevel(this, oLevel, 30, 16, 99);
		};
		oCov.onclick = this.removeShadow;
	},
	insertFlag: function (e) {
		var event = e || window.evemt,
		target = event.target || event.srcElement;
		if(!target.clicked && target.nodeName == 'LI') {
			target.classList.toggle('add-flag');
			// target.bool = target.classList.contains('add-flag') ? true : false;
			if(target.classList.contains('add-flag')) {
				target.bool = true;
				value --;
			} else {
				target.bool = false;
				value ++;
			}
			oSpan.innerHTML = value;
		}
		return false;
	},
	removeShadow: function (e) {
		var event = e || window.evemt,
		target = event.target || event.srcElement,
		arr = [];
		index = target.index;
		if(!target.bool) {
			target.classList.add('click');
			target.clicked = true;
			if(oLi[index] && oLi[index].classList.contains('mine')) {
				alert('game over');     //踩到雷，弹出game over 并重开游戏
				arrMine = [];
				value = initial;
				oSpan.innerHTML = initial;    
				mineControl.init();        
				time = 0;
			}else {
				// if(!Boolean(oLi[index].innerHTML)) {
				// 	arr = diffuseCheck(index);
				// 	chicked(arr, oCov_li);
				// }
				mineControl.chicked(index, oCov_li, oLi); // 否则进行扩散算法
			}
		}	
	},
	chooseLevel: function (obj, dom,x, y, num) {   //切换难度函数
		// console.log(this);
		time = 0;                    // 时间清零
		arrMine = [];				// 清除保存了雷的索引的数组
		dom[lastIndex].classList.remove('active');  //清除上次难度对应的dom的类名
		obj.classList.add('active');			
		lastIndex = obj.index;   
		col = x;           	  		// 对应列
		row = y;					// 对应行
		len = x * y;				//  len为总数,
		value = num;				//  保存雷的个数，后续用于提示剩余多少雷
		initial = num;				//   存储初始的雷个数，当游戏重开时，需要
		oSpan.innerHTML = num;		//  初始化雷个数
		oItem.style.width = 30 * x + 'px';      
		oCov.style.width = 30 * x  + 'px';
		mineControl.init();
	}
};