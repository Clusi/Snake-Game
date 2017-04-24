
var gameField;
var moveDirection ='right'
var gameExecutor;
var gameSpeed = 10;
var eatenItemsCount = 0;
var gameActive = "true";

var snake;
var snakeElementWidth = 10;
var snakeElementHeight = 10;
var startLenghtSnake = 10;

var gameFieldWidth;
var gameFieldHeight;

var food;

snake = new Array(startLenghtSnake);


function startGame(){
	eatenItemsCount = 0;
	moveDirection ='right'
	gameActive = "true";
	gameSpeed = 10;
	endGame();
	
	snake = new Array(startLenghtSnake);
	createSnake();
	createFood();
	
	gameExecutor = setInterval(move, gameSpeed);
	
}

function clearScene(){
	while(gameField.firstChild){
		gameField.removeChild(gameField.firstChild);
	}
}

function clearBoard(){
	document.getElementById("loseMsg").style.visibility ='hidden';
}
function endGame(){
	clearInterval(gameExecutor);
	clearScene();
	updateScore();
	clearBoard();
	
}

window.onload = function(){
	gameField = document.getElementById("gameField");
	gameFieldHeight= gameField.clientHeight;
	gameFieldWidth = gameField.clientWidth;
	
	document.onkeydown = function(e) {
		
		if(e.keyCode == 37 && moveDirection!='right'){
            moveDirection = 'left';
        }  
        if(e.keyCode == 38 && moveDirection !='down'){
            moveDirection = 'up';
		}
        if(e.keyCode == 39 && moveDirection !='left'){
            moveDirection = 'right';
        }
        if(e.keyCode == 40 && moveDirection != 'up'){
            moveDirection = 'down';
        }
		if(e.keyCode == 32){
			startGame();
		}
	};
	
	
	//gameExecutor = setInterval(move, gameSpeed);
	//drawSnake();
	//setInterval(move, gameSpeed);
}

//Create snake for the first time
function createSnake(){
    var startingPositionX = 50;
    var startingPositionY = 50;
    for (var i=0; i<startLenghtSnake; i++){
        snake[i] = {'x':startingPositionX, 'y':startingPositionY+i};
	}
}	
	
function drawElement(posX,posY,className){
	var idiv =document.createElement('div');
        idiv.className =className;
		idiv.style.left = posX+'px';
		idiv.style.top = posY+'px';
		gameField.appendChild(idiv);
}

function drawSnake(){
	for (var i=0; i<startLenghtSnake; i++){
			drawElement(snake[i].x,snake[i].y,'bodyPart');
		}
}

function moveSnake(){
	
	var newSnake = [];

    for(var i = snake.length - 1 ; i > 0; i--) {
        newSnake[i] = snake[i-1];
	}
		
	newSnake[0] = {'x': 0, 'y': 0};

	if(moveDirection == 'up') {
        newSnake[0]['y'] = snake[0]['y'] - 1;
        newSnake[0]['x'] = snake[0]['x'];
    } 
	else
    if(moveDirection == 'right') {
        newSnake[0]['y'] = snake[0]['y'];
        newSnake[0]['x'] = snake[0]['x'] + 1;
		}
	else
    if(moveDirection == 'down') {
		newSnake[0]['y'] = snake[0]['y'] + 1;
        newSnake[0]['x'] = snake[0]['x'];
	} 
	else
	if(moveDirection == 'left') {
		newSnake[0]['y'] = snake[0]['y'];
		newSnake[0]['x'] = snake[0]['x'] - 1;
	}
	
	snake = newSnake;
}

function holdsPosition(posX,posY){
	for (var i=0;i<snake.length;i++){
		if(snake[i].x == posX-5 &&snake[i].y == posY-5){
			console.log(snake[i].x,snake[i].y)
			return true;
		}
	}
	return false;
}

function crash(){
	//console.log(gameFieldHeight)
	if(
		snake[0].x >=gameFieldWidth ||
		snake[0].x <0 ||
		snake[0].y >= gameFieldHeight ||
		snake[0].y <0){
			return true;
		}	
	return false;	
}

function notExistFood(){
	var x =document.getElementsByClassName("food");
	if (x.length == 0) {
		return true;
	}
	return false;
}

function createFood(){
	var posX ;
	var posY;
	if(notExistFood()){
		do{
			posX = Math.floor(Math.random()*40)*snakeElementWidth ;
			posY = Math.floor(Math.random()*40)*snakeElementHeight;
		}
		while(holdsPosition(posX,posY));
		food = {'x':posX,'y':posY};
		drawElement(posX,posY,'food');
	}
}

function updateScore(){
	document.getElementById("points").innerHTML = eatenItemsCount;
}

function removeFood(){
	gameField.removeChild(document.getElementsByClassName("food")[0]); 
}

function eatFood(){
	
	if(holdsPosition(food.x,food.y)){
		console.log('eat');
		snake.push({'x': snake[snake.length-1]['x'], 'y': snake[snake.length-1]['y']});
		console.log(snake.length);
		eatenItemsCount++;
		updateScore();
		removeFood();
	}
}

function removeSnake(){
	var child = document.getElementsByClassName("bodyPart")
	for(var i=0;i<child.length;i++){
		gameField.removeChild(child[i]);
	}
}
function move(){
	if(gameActive == 'false'){
		return;
	}
	moveSnake();
	if(crash()){
		document.getElementById("loseMsg").style.visibility ='visible';
		gameActive = "false";
		
	}
	
	createFood();
	eatFood();
		
	removeSnake();
	drawSnake();
}