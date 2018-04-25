var mineControl = {
	init: function () {
		this.createTag(oItem, len);       // 生成底层li标签，数目为len，并添加至oItem中
		this.createTag(oCov, len);		  // 生成遮罩层li标签，用于覆盖底层li,数目也为len,添加到oCov中;
		this.addUserDefined(oCov_li);	  // 给遮罩层li标签添加自定义属性，值为对应的索引
		this.randomMine(initial, len);	  // 在0至len之间 随机选取 initial个互不相等数(即为雷的位置)，放至arr0Mine;
		this.renderMine(arrMine, oLi);    //根据arrMine[i]的值，将雷添加到对应的oLi[arrMine[i]]中。oLi存储的是底层li的集合
		this.mineNum(oLi);				  // 计算底层li周围雷的数目，并添加为li的innerHTML;
	},
	createTag: function (obj, num) {      // 生成标签函数
		var str = '';
		for(var i = 0; i < num; i ++) {
			str += '<li></li>';
		}
		obj.innerHTML = str;
	},
	addUserDefined: function (obj) {       // 添加自定义属性函数
		for(var i = 0, leng = obj.length; i < leng; i ++) {
			obj[i].index = i;
		}
	},
	randomMine: function (num, area) {    // 在0-area范围中去 num个随机数函数
		temp = Math.floor(Math.random() * area);
		arrMine.push(temp);                  //先生成一个随机数，添加至arrMine中
		for(var i = 1; i < num; i ++) {
			this.check(arrMine, num, area);  // 循环调用check函数，筛选
		}
		arrMine.sort(function (a, b) {     //将取出的arrMine数组按从小到大顺序排列
			return a - b;
		});
	},
	check: function (arr, leng, area) {
		var count = 0,								//用于计数
		temp = Math.floor(Math.random () * area);   //再次生成随机数
		for(var i = 0; i < leng; i ++) {   
			if(arr[i] !== temp) {     
				count ++;                    		// 将temp 与 arr中每项进行比对，如果不相等,count ++;
			}
		} 
		if(count === leng) {        				// 判断count 的值与 arr的长度leng是否相等，
			arr.push(temp);							// 相等即将temp 添加至arr中
		} else {		
			this.check(arr, leng, area);			// 否则，再次调用check 函数，直到count === leng为止
		}
	},
	renderMine: function (arr, obj) {				// 根据arrMine，将雷添加上
		var leng = arr.length;
		for(var i = 0; i < leng; i ++) {
			obj[arr[i]].classList.add('mine');	   
		}
	},
	mineNum: function (obj) {                       // 计算周围雷的个数
		var leng = obj.length;
		for(var i = 0; i < leng; i ++) {
			obj[i].index = i;						// 添加自定义属性
			if(!obj[i].classList.contains('mine')) {	//当目标点不是雷才计数；
				this.checkMine(obj[i], oLi);
			}
		}
	},
	checkMine: function (obj, arr) {
		var count = 0,
			index = obj.index,					 	// index 接收目标的自定义属性index的值
			arrCheck = this.diffuseCheck(index);	// 根据index的值，限定计算范围，并添加至arrCheck中 
		count = this.judgeMine(index, arr, arrCheck);
		if(count) {
			arr[index].innerHTML = count;   		//当count > 0 时，即周围有雷，添加count至oLi[index]中;
		}	
	},
	judgeMine: function (x, arr, arrCheck) {  
		var leng = arrCheck.length,
			count = 0,
			index;  
		for(var i = 0; i < leng; i ++) {   			//遍历arrCheck,查看是否有雷，有count++;
			index = arrCheck[i];
			if(arr[index] && arr[index].classList.contains('mine')) {
				count ++;
			}
		}
		return count;	
	},
	diffuseCheck: function (index) {
		var arr,
			num1 = col - 1,
			num2 = col + 1;
		// if(index % 20 == 0) {
		// 	arr = [index + 1, index - 20, index + 20, index - 19, index + 21];	
		// }else if(index % 20 == 19) {
		// 	arr = [index - 1, index - 20, index + 20, index + 19, index - 21];
		// }else if(index < 19 && index > 0) {
		// 	arr = [index - 1, index + 1, index + 20, index + 19, index + 21];	
		// }else if(index > 380 && index < 399) {
		// 	arr = [index - 1, index + 1, index - 20, index - 19, index - 21];	
		// }else {
		// 	arr = [index - 1, index + 1, index - 20, index + 20, index + 19, index - 19, index - 21, index + 21];	
		// }
		// return arr;
		if(index % col == 0) {      			//  index属于第一列时，不用计算index左侧方位；
			arr = [index + 1, index - col, index + col, index - num1, index + num2];	
		}else if(index % col == num1) {	 		// index 属于最后一列时，不计算右侧方位
			arr = [index - 1, index - col, index + col, index + num1, index - num2];
		}else if(index < num1 && index > 0) {	// index 属于第一行时，不计算上方位
			arr = [index - 1, index + 1, index + col, index + num1, index + num2];	
		}else if(index > len - col && index < len - 1) {	// index 属于最后行时，不计算下方位
			arr = [index - 1, index + 1, index - col, index - num1, index - num2];	
		}else {							//正常情况 全部计算，即为index为中心的九宫格
			arr = [index - 1, index + 1, index - col, index + col, index + num1, index - num1, index - num2, index + num2];	
		}
		return arr;
	},
	chicked: function (index, obj, obj1) {    // 扩散函数
		var arr,
			value;
		if(obj1[index] && !Boolean(obj1[index].innerHTML)) {	
			arr = this.diffuseCheck(index);			//当目标点innerHTML 为空时，进行扩散,直到内容不为空为止;
			// 筛选arr 返回索引对应的节点 不含 'click' 类名的,注意添加限制条件会死循环;
			arr = arr.filter(function (ele, i) {
				return obj[ele] && !obj[ele].classList.contains('click'); 
			});
			for(var i = 0; i < arr.length; i ++) {
				value = arr[i];
				obj[value].className = 'click'; 
				obj[value].clicked = true;    
				this.chicked(value, obj, obj1);   //当arr的leng大于零时，循环chicked函数，就是通过回调的形式实现的扩散的功能;
			}
		}
	}
};