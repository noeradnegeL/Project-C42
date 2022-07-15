var backImage,backgr;
var player, player_running;
var ground,ground_img;

var score = 0;


var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    this.spawnFood();
    this.spawnObstacles();

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score += 2;
      player.scale += 0.02;
    }

    if(ObstacleGroup.isTouching(player)){
      gameState = END;
    }

  } else if(gameState===END){
    backgr.velocityX = 0;
    backgr.visible = false;

    FoodGroup.destroyEach();
    ObstacleGroup.destroyEach();
    player.destroy();

    textSize(20);
    fill(255);
    text("Game Over", 300, 225)
  }

  drawSprites();
  text("Score: " + score, 700, 30);
}

function spawnFood() {
  if (frameCount % 72 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = 240;
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana)
  }
}

function spawnObstacles() {
  if (frameCount % 59 === 0){
    var obstacle = createSprite(600,250,40,10);
    obstacle.y = 340;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;

    obstacle.lifetime = 300;
    player.depth = obstacle.depth + 1;
    ObstacleGroup.add(obstacle)
  }
}
