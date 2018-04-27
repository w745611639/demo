// 封装渲染函数
	function renderArr (arr) {
		var htmlArr = "";
		arr.forEach(function (ele, index) {
			htmlArr += "<li>" + "name: " + ele.name + " ,age: " +  ele.age + ", sex: " + ele.sex + "</li>";
		});
		oUl.innerHTML = htmlArr;
	}
	// 筛选数组
	function filterArr (arr,val) {
		return temperArr = arr.filter(function (ele, index) {
			// if(ele.name.indexOf(val) != -1) {
			// 	return true;
			// }
			return ele.name.indexOf(val) != -1;		
		});
	}
	//增加年龄
	function addAge(arr) {
		arr.forEach(function (ele, index) {
			ele.age ++;
		});
		return arr;
	}
	// 筛选性别
	function filterSex(arr, sex) {
		return arr.filter(function (ele, index) {
			return sex == "all" ? true : ele.sex == sex;		
		});
	}