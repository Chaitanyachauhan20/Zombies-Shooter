var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGrp;
var fireLaserGroup;
var killSound; 
var gameState;
var PLAY = 0;
var END = 1;
var INTRO = 2;
var kills, killsImg, killSprite;
var heart1IMG, heart2IMG, heart3IMG;
var heart1, heart2, heart3;
var loseSound;
var i;
var gv, gvImg;
var again, againImg;
var playerDeadImage;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg")
  killSound = loadSound("salamisound-2143675-sfx-explosion-hit-2.mp3");
  killsImg = loadImage("Screenshot (342).png");
  heart1IMG = loadImage("assets/heart_1.png");
  heart2IMG = loadImage("assets/heart_1.png");
  heart3IMG = loadImage("assets/heart_1.png");
  loseSound = loadSound("salamisound-7409355-cartoon-boing.mp3");
  gvImg = loadImage("Screenshot (346).png");
  againImg = loadImage("play.png");
  gvImg2 = loadImage("Screenshot (398).png");
  again2Img = loadImage("Screenshot (399).png");
  playerDeadImage = loadImage("Screenshot (400).png")
}


function setup() {

  gameState = INTRO;

  

  i = 3;

  stroke("red");
    textSize(45);
    text("hiiiii"+kills,1190,50);


  kills = 0;
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-120,displayHeight/2-40,20,20)
 bg.addImage(bgImg)
bg.scale = 1.1



  gv = createSprite(650,275,30,30);
  gv.addImage(gvImg);
  gv.scale = 2;
  gv.visible = false;
  
  again = createSprite(910,430,40,40);
  again.addImage(againImg);
  again.scale = 0.45;
  again.visible = false;

killSprite = createSprite(1170,50,10,10);
killSprite.addImage(killsImg);
killSprite.scale = 0.4;

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.3;
   //player.debug = true
  // player.setCollider("rectangle",0,0,200,300);

  zombie1Grp = createGroup();
  zombie2Grp = createGroup();
  zombie3Grp = createGroup();
  fireLaserGroup = createGroup();

 heart1 = createSprite(1060,50);
 heart1.scale = 0.4;
 heart1.addImage(heart1IMG);

 heart2 = createSprite(970,50);
 heart2.scale = 0.4;
 heart2.addImage(heart1IMG);

 heart3 = createSprite(880,50);
 heart3.scale = 0.4;
 heart3.addImage(heart1IMG);

heart1.visible = false;
heart2.visible = false;
heart3.visible = false;

}

function draw() {
  background(0); 



  console.log(gameState);

  if(gameState===PLAY){



    stroke("white");
    textSize(45);
    text(+kills,1230,64);


    createZombie1();
createZombie2();
createZombie3();     


if(keyDown("Space")){
  fire();
}

if(zombie1Grp.isTouching(player)||zombie2Grp.isTouching(player)||zombie3Grp.isTouching(player)){
  heart1.visible = false;
  loseSound.play();
  //gameState = END;
  i = i-1;
}



if(fireLaserGroup.isTouching(zombie1Grp)){
  killSound.play();
  zombie1Grp.destroyEach();
  fireLaserGroup.destroyEach();
  kills = kills + 1;
}

if(fireLaserGroup.isTouching(zombie2Grp)){
  killSound.play();
  zombie2Grp.destroyEach();
  fireLaserGroup.destroyEach();
  kills = kills + 1;
}

if(fireLaserGroup.isTouching(zombie3Grp)){
  killSound.play();
  zombie3Grp.destroyEach();
  fireLaserGroup.destroyEach();
  kills = kills + 1;
}


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
 
  
  }

    if(i===0){
      gameState = END;
    }
  
    if(gameState === END){
      background("white");
     
      player.addImage(playerDeadImage);
      player.scale = 0.4;
      //gv.lifetime = -1000;
      zombie1Grp.destroyEach();
      zombie2Grp.destroyEach();
     zombie3Grp.destroyEach();
    //  player.visible = false;
      fireLaserGroup.destroyEach();
      again.visible = true;
      again.addImage(againImg);
      
      again.scale = 0.4;
      gv.addImage(gvImg);
      gv.scale = 2;
      gv.visible = true;

      again.x = 580;
      again.y = 70;

      if(mousePressedOver(again)){
        gameState = PLAY;
       player.visible = true;
      again.visible = false;
      gv.visible = false;
      player.scale = 0.31;
      player.addImage(shooterImg);
      i=3;
      kills = 0;
      }
    
  }
    
  if(gameState === INTRO){
    background("white");
   
    gv.addImage(gvImg2);
    gv.scale = 0.70;

    again.addImage(again2Img);
   

    zombie1Grp.destroyEach();
    zombie2Grp.destroyEach();
   zombie3Grp.destroyEach();
  //  player.visible = false;
    fireLaserGroup.destroyEach();
    again.visible = true;
    gv.visible = true;

    if(mousePressedOver(again)){
      gameState = PLAY;
     player.visible = true;
    again.visible = false;
    gv.visible = false;
    i=3;
    kills = 0;
    }
  

  }

drawSprites();


  

}

function createZombie1(){

  if(frameCount % 50===0){

    zombie1 = createSprite(1070,100);
    zombie1.addImage(zombieImg);
    zombie1.scale = 0.15;
    zombie1.velocityX = -(4+ kills/4);
    zombie1Grp.add(zombie1);

  }
}

function createZombie2(){

  if(frameCount % 50===0){

    zombie2 = createSprite(1070,300);
    zombie2.addImage(zombieImg);
    zombie2.scale = 0.15;
    zombie2.velocityX = -(4+ kills/4);
    zombie2Grp.add(zombie2);
  }
}

function createZombie3(){

  if(frameCount % 50===0){

    zombie3 = createSprite(1070,500);
    zombie3.addImage(zombieImg);
    zombie3.scale = 0.15;
    zombie3.velocityX = -(4+ kills/4);
    zombie3Grp.add(zombie3);
  }
}

function fire(){
  fireLaser =createSprite(player.x +110,player.y-24,100,4);
  fireLaser.shapeColor = "red";
  fireLaser.velocityX = 4;
  fireLaser.lifetime = 100;
  fireLaserGroup.add(fireLaser);
}


