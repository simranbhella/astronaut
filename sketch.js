
var astronaut, astronautImage;
var spaceBack;
var meteor, asteroid;
var asteroidImage, meteorImage;
var star,starImage;
score=0;
var gameState="play"
function preload(){
  astronautImage=loadImage("fe2c646744bf4b17d310aed8240aedb3.png");
  spaceImage=loadImage("4bd09cd0936aa15c161b5a85a5396238.png");
  
  asteroidImage=loadImage("4232c475e59746bbd30a63808d8a9077.jpg");
  
  meteorImage=loadImage("56d2796721fdef4c41e065f160eacb3b.jpg");
  starImage=loadImage("download-1.jpg");
}


function setup() {
  createCanvas(600, 600);
 spaceBack=createSprite(300,300,600,600);
  spaceBack.addImage(spaceImage);
  spaceBack.velocityY=2
  
  astronaut=createSprite(300,200,10,10);
  astronaut.addImage(astronautImage);
  astronaut.scale=0.07
  obstacleGroup=createGroup();
  starGroup=createGroup();
}

function draw() {
  background("black")
  textSize(20)
  fill("white");
  text("avoid the meteors and rocks",100,200);
  
  if (spaceBack.y < 600){
      spaceBack.y = spaceBack.height/2;
    }
  if (gameState==="play"){
   textSize(20);
  fill("white");
  text("Score:" + score,300,200);
    astronaut.velocityY=astronaut.velocityY+0.2;
  
  if(keyDown("left")){
     astronaut.x=astronaut.x-2;
     }
  if(keyDown("right")){
     astronaut.x=astronaut.x+2;
     }
  if(keyDown("space")){
     astronaut.velocityY=-5;
     }
    
    if(astronaut.isTouching(obstacleGroup)){
     astronaut.velocityY=0;
     }
    if(astronaut.isTouching(starGroup)){
      score=score+1;
    }
   
      if(astronaut.isTouching(obstacleGroup) || astronaut.y>600){
     astronaut.destroy();
        obstacleGroup.destroyEach();
    gameState="end";
      }
  }
  if(gameState==="end"){
    starGroup.destroyEach();
    obstacleGroup.destroyEach();
    astronaut.velocityY=0;
  }
  
  stars();
  spawnObstacles();
  drawSprites();
}

function spawnObstacles(){
  if (frameCount%200===0){
  asteroid=createSprite(300,300,10,10);
    asteroid.addImage(asteroidImage);
    asteroid.scale=0.1;
    asteroid.velocityY=2;
    asteroid.x=Math.round(random(100,500));
    obstacleGroup.add(asteroid);
    asteroid.lifetime=300;

      }
  if (frameCount%250===0){
    meteor=createSprite(300,300,10,10);
    meteor.addImage(meteorImage);
    meteor.scale=0.05
    meteor.x=Math.round(random(200,400));
    meteor.velocityY=2
    obstacleGroup.add(meteor);
    meteor.lifetime=300;

  }
}

function stars(){
    if (frameCount%100===0){
    star=createSprite(350,300,10,10);
    star.addImage(starImage);
    star.scale=0.2;
    star.x=Math.round(random(100,400));
    star.velocityY=2
    starGroup.add(star);
    star.lifetime=300;
      star.depth=astronaut.depth-1;
  }
}


