/*
	用数组存储
	1.初始化蛇固定位置为左上角
	2. 食物位置随机。
	3. 上下左右控制蛇头方向， 其他部分跟随蛇头，

*/


var oContent = document.getElementsByClassName('content')[0];
init();
function init() { 
	this.maxLeft = oContent.offsetWidth  / 20;
	this.maxTop = oContent.offsetHeight / 20;
	this.foodW = 20;
	this.foodH = 20;
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeArr = [[2, 0, 'head'], [1, 0, 'body'], [0, 0, 'body']];
	this.left = false;
	this.right = false;
	this.top = true;
	this.bottom = true;
	createFood();
	createSnake();
	this.timer = setInterval(function () {
		this.snakeArr[0][0] += 1;
		eatFood();
		changeSnakeArr();
		removeSnake();
		createSnake();
	}, 200);
	document.onkeyup = function (e) {
		snakeMove(e.keyCode);
	}
}
function changeSnakeArr() {
	for(var i = this.snakeArr.length - 1; i > 0; i --) {
		this.snakeArr[i][0] = this.snakeArr[i - 1][0]
		this.snakeArr[i][1] = this.snakeArr[i - 1][1];
	}
}
function createFood() {
	var food = document.createElement('div');
	var foodL = Math.floor(Math.random() * this.maxLeft);
	var foodT = Math.floor(Math.random() * this.maxTop);
	this.foodArr = [foodL, foodT];
	food.style.cssText = `width: ${this.foodW}px; height: ${this.foodH}px; left: ${foodL * 20}px; top: ${foodT * 20}px; `
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.classList.add('food');
	oContent.appendChild(food);
}
function createSnake() {
	var snake;
	for(var i = 0; i < this.snakeArr.length; i ++) {
		snake = document.createElement('div');
		snake.style.cssText = `width: ${this.snakeW}px; height: ${this.snakeH}px; left: ${this.snakeArr[i][0] * 20}px; top: ${this.snakeArr[i][1] * 20}px`;
		snake.classList.add(this.snakeArr[i][2], 'snake');
		oContent.appendChild(snake);
	}
}
function removeSnake() {
	var snake = document.getElementsByClassName('snake');
	for(var i = 0; i < snake.length; i ++) {
		snake[i].remove();
	}
}
function removeFood() {
	var food = document.getElementsByClassName('food')[0];
	food.remove();
}
function snakeMove(keyCode) {
		switch(keyCode) {
			case 37: 	
				if(this.left) {
					clearInterval(this.timer);
					this.left  = false;
					this.right = false;
					this.top = true;
					this.bottom = true;
					this.timer = setInterval(function () {
						this.snakeArr[0][0] -= 1;
						eatFood();
						changeSnakeArr();
						removeSnake();
						createSnake()
					}, 200);
				}
				break;
			case 38: 	
				if(this.top) {
					clearInterval(this.timer);
					this.top  = false;
					this.bottom = false;
					this.right = true;
					this.left = true;
					this.timer = setInterval(function () {
						this.snakeArr[0][1] -= 1;
						eatFood();
						changeSnakeArr();
						removeSnake();
						createSnake()
					}, 200);
				}
				break;
			case 39: 	
				if(this.right) {
					clearInterval(this.timer);
					this.left  = false;
					this.right = false;
					this.top = true;
					this.bottom = true;
					this.timer = setInterval(function () {
						this.snakeArr[0][0] += 1;
						eatFood();
						changeSnakeArr();
						removeSnake();
						createSnake()
					}, 200);
				}
				break;
			case 40: 	
				if(this.bottom) {
					clearInterval(this.timer);
					this.bottom  = false;
					this.top = false;
					this.right = true;
					this.left = true;
					this.timer = setInterval(function () {
						this.snakeArr[0][1] += 1;
						eatFood();
						changeSnakeArr();
						removeSnake();
						createSnake()
					}, 200);
				}
				break;
			default: 
				break;

		}
}
function eatFood() {
	var len = this.snakeArr.length;
	if(this.snakeArr[0][0] == this.foodArr[0] && this.snakeArr[0][1] == this.foodArr[1]) {
		removeFood();
		createFood();
		this.snakeArr.push([this.snakeArr[len  - 1][0], this.snakeArr[len - 1][1], 'body']);
	}
}