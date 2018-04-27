var oUl = document.getElementsByTagName('ul')[0];
var dataArr = [
	{name: "云天河", age: 18, sex: "male"},
	{name: "柳梦璃", age: 20, sex: "female"},
	{name: "韩菱纱", age: 17, sex: "female"},
	{name: "慕容紫英", age: 21, sex: "male"},
	{name: "玄霄", age: 42, sex: "male"},
	{name: "云天青", age: 41, sex: "male"},
	{name: "夙玉",age: 40, sex: "female"},
	{name: "夙瑶", age: 45, sex: "female"},
	{name: "玄琳", age: 38, sex: "female"}
];
var temperArr = dataArr;
var lastSex = "all";

function bindEventByActions(actions) {
	actions.forEach(function (ele, type) {
		switch(ele.type) {
			case 'filterArr' :
				ele.doc.oninput = function () {
					renderArr(filterArr(dataArr, this.value));
					lastSex = "all";
				};
				break;
			case 'addAge':
				ele.doc.onclick = function () {
					renderArr(addAge(filterSex(temperArr, lastSex)));
				}
				break;
			case 'filterSex':
				ele.doc.onclick = function () {
				renderArr(filterSex(temperArr, lastSex = ele.prame));
			}
		}
	});
}
bindEventByActions(actions);
