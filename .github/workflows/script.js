window.onload = loading;

var canvas = document.querySelector("canvas");
var ctxcanvas = canvas.getContext('2d');

var imgsprite = new Image();
imgsprite.src = "img/sprite.png";

//размер холста
canvas.width = screen.width;
canvas.height= 200;

var speedearth = 0;//переменая скорости земли
var speedPlayer = 0; //начальная скорость игрока
var grav = 0.1; // ускорение персонажа
var PlayerDrawY = 30; // расположение игрока на оси y
var playerJump = false; //прыгнул ли игрок или нет
var playerDown = false; // Пригнулся ли игрок

var countFrame = 0; // переменая текущей кординаты на холсте
var countFrame2 = 0; 
var countFrameBird = 0;//
//переменые для кактуса


var randomStr = [110, 80, 30];
var randomDrawBird = Math.floor(Math.random() * (3 - 0) + 0); 	

var cactusX = screen.width;
var birdX = screen.width + 500;
var birdY = randomStr[randomDrawBird];

var isPause = false;// Переменая для палузы игры

var score = 0;//счёт в игре






//функция для первоначальной загрузки ресурсов
function loading ()
{
	drawPlayer();//работа с игроком
	earth();//функция работы с землёй

	//слушать события клавиш
	document.addEventListener("keydown", function(event){
		if (event.keyCode == 87)
		{
			playerJump = true;
		}

		if (event.keyCode == 83)
		{
			playerDown = true;
		}

	});
		document.addEventListener("keyup", function(event){
		if (event.keyCode == 87)
		{
			playerJump = false;
		}

		if (event.keyCode == 83)
		{
			playerDown = false;	
		}

	});



}

//функция для отрисовки и работы игрока
function drawPlayer ()
{

	countFrame += 0.03; // увлечение переменой на 0.1
	if (countFrame > 4) 
	{
		countFrame = 2;
	}


	countFrame2 += 0.03; // увлечение переменой на 0.1
	if (countFrame2 > 2) 
	{
		countFrame2 = 0;
	}



	ctxcanvas.clearRect( 0 , 0 , screen.width, 200);

	if (playerDown)
	{
		ctxcanvas.drawImage(imgsprite, 118 * Math.floor(countFrame2) + 1870 , 36 , 118 , 60 , 200 , PlayerDrawY + 22 , 60 , 35 );
		ctxcanvas.strokeRect( 200 , PlayerDrawY + 22 , 60 , 35  );		
	}
	else
	{
		ctxcanvas.drawImage(imgsprite, 88 * Math.floor(countFrame) + 1340 , 0 , 85 , 95 , 200 , PlayerDrawY , 50 , 55 );
		ctxcanvas.strokeRect( 200 , PlayerDrawY , 50 , 55 );
	}
	
	

	//условие паденик игрока
	speedPlayer += grav;
	PlayerDrawY += Math.floor(speedPlayer);

	// условие пола
	if (PlayerDrawY > 135)
	{
		PlayerDrawY = 135;
	}

	//прыжок игрока
	if (PlayerDrawY ==135) 
	{
		if (playerJump) 
		{
			speedPlayer = -5;
		}
	}

	//счёт в игре
	score += 0.005;//
	document.querySelector(".score").innerHTML = "Кол-во очков: " + Math.floor(score);

	//Логики столкнавения с препятствиями
	
	
	if (cactusX < 250 && PlayerDrawY + 55 > 135 && cactusX - 30 > PlayerDrawY + 55) 
	{
		isPause = false;		
	}
	if (birdX < 250 && PlayerDrawY + 55 > birdY && birdX - 45 > PlayerDrawY + 55  && PlayerDrawY < birdY + 32 ) 
	{
		if (playerDown)
		{
			if (birdX < 250 && PlayerDrawY + 55 > birdY && birdX - 45 > PlayerDrawY + 55  && PlayerDrawY + 30 < birdY )
			{
				isPause = false;	
			}
		}
		isPause = false;		
	}
	

}

//отрисовка земли
function earth()
{

	speedearth-=2;

	ctxcanvas.drawImage(imgsprite, 3 , 104 , 2400 , 25 ,0 + speedearth , 180 , screen.width , 25 );
	ctxcanvas.drawImage(imgsprite, 3 , 104 , 2400 , 25 ,0 + speedearth + screen.width , 180 , screen.width , 25 );

	if (speedearth < -screen.width) 
	{
 		speedearth = 0;
	}
}

setInterval(games, 1);
function games()
{
	if (isPause) 
	{
		drawPlayer();//работа с игроком
		earth();//функция работы с землёй
		drawCactus();//вызов функции кактус
		drawBird();// птица
	}
		
}

//отрисовка кактуса
function drawCactus()
{
	ctxcanvas.drawImage(imgsprite, 652, 2, 50, 100, cactusX -= 2, 135, 30, 60);
	//ctxcanvas.strokeRect(cactusX, 135, 30, 60);
	if (cactusX < -30) 
	{
		cactusX = screen.width;
	}
}

//отрисовка птица
function drawBird()
{

	countFrameBird += 0.03; // увлечение переменой на 0.1
	if (countFrameBird > 2) 
	{
		countFrameBird = 0;
	}

	ctxcanvas.drawImage(imgsprite, 92 * Math.floor(countFrameBird) + 260, 15, 90, 65, birdX -= 2, birdY, 45, 32);
	ctxcanvas.strokeRect(birdX, birdY, 45, 32);
	if (birdX < -45) 
	{
		randomDrawBird = Math.floor(Math.random() * (3 - 0) + 0); 
		birdY = randomStr[randomDrawBird];
		birdX = screen.width;
	}
}

//Начало игры
function start()
{
	isPause = true;
	document.querySelector(".img").style.display = "none";
}


























