
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
	
	gameExecutor = setInterval(move, gameSpeed);
	
}

function endGame(){
	clearInterval(gameExecutor);
}


window.onload = function(){
	gameField = document.getElementById("gameField");
	gameFieldHeight= gameField.clientHeight;
	gameFieldWidth = gameField.clientWidth;
	
	document.onkeydown = function(e) {
		
    switch (e.keyCode) {
        case 37:
            moveDirection = 'left';
            break;
        case 38:
            moveDirection = 'up';
            break;
        case 39:
            moveDirection = 'right';
            break;
        case 40:
            moveDirection = 'down';
            break;
		case 32:
			startGame();
			break;
    }
	};
	
	createSnake();
	move();
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
	console.log(className);
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

function clearScene(){
	
	while(gameField.firstChild){
		gameField.removeChild(gameField.firstChild);
	}
}

function holdsPosition(posX,posY){
	for (var i=0;i<snake.length;i++){
		if(snake[i].x == posX &&snake[i].y == posY){
			return true;
		}
	}
	return false;
}

function crash(){
	//console.log(gameFieldHeight)
	
	if(
		snake[0].x >=gameFieldWidth-10 ||
		snake[0].x <0 ||
		snake[0].y >= gameFieldHeight-20 ||
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
			posX = Math.floor(Math.random()*50)*snakeElementWidth ;
			posY = Math.floor(Math.random()*50)*snakeElementHeight;
		}
		while(holdsPosition(posX,posY));
		console.log(posX);
		console.log(posY);
		food = {'x':posX,'y':posY};
		drawElement(posX,posY,'food');
	}
}
function eatFood(){
	if(holdsPosition(food.x,food.y)){
		var newSnake = [];

    for(var i = snake.length - 1 ; i > 0; i--) {
        newSnake[i] = snake[i-1];
            
	}
		
	newSnake[0] = {'x': food.x, 'y': food.y};
	snake = new Snake;
            
	
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
		
	clearScene();
	drawSnake();
}