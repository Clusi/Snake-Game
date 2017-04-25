
var gameField;
var moveDirection ='right'
var gameExecutor;
var foodTimingExecutor;
var starGameExecutor;
var gameSpeed = 50;
var eatenItemsCount = 0;
var gameActive = "true";

var snake;
var snakeElementWidth = 8;
var snakeElementHeight = 8;
var startLenghtSnake = 5;

var foodElementHeight = 10;
var foodElementWidth = 10;

var gameFieldWidth;
var foodFieldHeight;

var food;
var secondsForFood = 6;
var timeStarted;
var foodStarted;

snake = new Array(startLenghtSnake);


function startGame(){
	eatenItemsCount = 0;
	moveDirection ='right'
	gameActive = "true";
	endGame();
	
	snake = new Array(startLenghtSnake);
	createSnake();
	createFood();
	
	gameExecutor = setInterval(move, gameSpeed);
	starGameExecutor = setInterval(timeStartGame, 100);
	foodTimingExecutor = setInterval(timeForFood,100);
		
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
	clearInterval(foodTimingExecutor);
	clearInterval(starGameExecutor);
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
	//starGameExecutor = setInterval(timeStartGame, 100);
	timeStarted = new Date().getTime();
    foodStarted = new Date().getTime();	
	
}

function timeStartGame(){
	var nowTime = new Date().getTime();
        // Find the distance between now an the count down date
        var distance = nowTime - timeStarted;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
		
       document.getElementById("startedTime").innerHTML = "Time: " + days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
}
function timeForFood(){
	var nowTime = new Date().getTime();
        // Find the distance between now an the count down date
        var distance = nowTime - foodStarted;

        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var remainingTime = secondsForFood - seconds;
        document.getElementById("foodTime").innerHTML = "Food respawn in: " + remainingTime + " s";
        if (remainingTime <= 0){
			removeFood();
			foodStarted = new Date().getTime();
            createFood();
        }
}

//Create snake for the first time
function createSnake(){
	
    var startingPositionX = 50;
    var startingPositionY = 50;
    for (var i=0; i<startLenghtSnake; i++){
        snake[i] = {'x':startingPositionX, 'y':startingPositionY+snakeElementHeight*i};
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
	for (var i=0; i<snake.length; i++){
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
        newSnake[0]['y'] = snake[0]['y'] - snakeElementHeight;
        newSnake[0]['x'] = snake[0]['x'];
    } 
	else
    if(moveDirection == 'right') {
        newSnake[0]['y'] = snake[0]['y'];
        newSnake[0]['x'] = snake[0]['x'] + snakeElementHeight;
		}
	else
    if(moveDirection == 'down') {
		newSnake[0]['y'] = snake[0]['y'] + snakeElementHeight;
        newSnake[0]['x'] = snake[0]['x'];
	} 
	else
	if(moveDirection == 'left') {
		newSnake[0]['y'] = snake[0]['y'];
		newSnake[0]['x'] = snake[0]['x'] - snakeElementHeight;
	}
	
	snake = newSnake;
}

function holdsPosition(posX,posY){
	for (var i=0;i<snake.length;i++){
		if(snake[i].x == posX &&snake[i].y == posY){
			console.log(snake[i].x,snake[i].y)
			return true;
		}
	}
	return false;
}

function holdFood(){
	
	if((snake[0].x>= food.x && snake[0].x<=food.x+foodElementWidth && snake[0].y>= food.y && snake[0].y<=food.y+foodElementHeight) ||
	(snake[0].x+snakeElementWidth>= food.x && snake[0].x+snakeElementWidth<=food.x+foodElementWidth && snake[0].y+snakeElementHeight>= food.y && snake[0].y+snakeElementHeight<=food.y+foodElementHeight)){
		return true
	};
	return false;
}

function crashHimselfSnake(){
	for(var i = 0; i < snake.length; i++) {
            for(var j = 0; j < snake.length; j++)
            {
                if(i != j) {
                    if(snake[i].x == snake[j].x && snake[i].y == snake[j].y)
                    {
                        return true;
                    }
                }
            }
        }
        return false;
}
function crash(){
	//console.log(gameFieldHeight)
	if( crashHimselfSnake() ||
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
	document.getElementById("score").innerHTML = eatenItemsCount;
}

function removeFood(){
	gameField.removeChild(document.getElementsByClassName("food")[0]); 
}

function eatFood(){
	
	if(holdFood()){
		snake.push({'x': snake[snake.length-1]['x'], 'y': snake[snake.length-1]['y']});
		eatenItemsCount++;
		updateScore();
		removeFood();
		foodStarted = new Date().getTime();
		
	}
}

function removeSnake(){
	var child = document.getElementsByClassName("bodyPart")
	for(var i=0;i<child.length;i++){
		gameField.removeChild(child[i]);
	}
}
function move(){
	console.log(snake.length);
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