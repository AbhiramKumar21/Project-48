var Jeff, Bob, ground;
var boy1, boy2;
var grass;
var JeffImg;
var platform1, platform2, platform3, platform4;
var BombGroup, bombs, player1HP, player2HP;

function preload(){
  boy1 = loadImage("boy1.png");
  boy2 = loadImage("boy2.png");
  grass = loadImage("ground.png");
  bomb = loadImage("bomb.png");
  JeffAnimation = loadAnimation("boy1.png");
  BobAnimation = loadAnimation("boy2.png");
}
function setup(){
  createCanvas(400, 400);

  Jeff = createSprite(70, 377, 30, 30);
  Jeff.addImage(boy1);
  Jeff.scale = 0.1;

  Bob = createSprite(325, 377, 30, 30);
  Bob.addImage(boy2);
  Bob.scale = 0.1;

  ground = createSprite(200,400,400,15);
  platform1 = createSprite(70, 300, 100,15);
  platform1.addImage(grass);
  platform1.scale = 0.15;
  platform2 = createSprite(325, 300, 100,15);
  platform2.addImage(grass);
  platform2.scale = 0.15;
  platform3 = createSprite(0,200,10,400);
  platform4 = createSprite(400,200,10,400);
  BombGroup = createGroup();
    //var invisibleGround = createSprite(200,385,400,5);
    //invisibleGround.visible = false;
    
  player1HP = 100;
  player2HP = 100;
}

function draw() {
  background("blue");
  
  text("player1HP: "+ player1HP, 250, 50);
  text("player2HP: "+ player2HP, 250, 80);
  
  spawnBombs();
  
  if (keyDown(RIGHT_ARROW)) {
    Jeff.x = Jeff.x + 3;
  }

    if (keyDown(LEFT_ARROW)) {
    Jeff.x = Jeff.x - 3;
  }

  if(keyDown(UP_ARROW) && Jeff.y >= 361 ){
      Jeff.velocityY = -12;
  }

  if(keyDown(UP_ARROW) && Jeff.y >= 249 ){
    Jeff.velocityY = -12;
    
}

  console.log(Jeff.y)
    
  /*if (keyDown(UP_ARROW) && Jeff.y==277.5) {
      Jeff.velocityY = -15 ;
  }*/
  
  if (keyDown("d")) {
    Bob.x = Bob.x + 3;
  }

  if (keyDown("a")) {
    Bob.x = Bob.x - 3;
  }

  if(keyDown("space") && Bob.y>=361){
    Bob.velocityY = -12 ;
  }
  
  if (keyDown("space") && Bob.y>=249) {
    Bob.velocityY = -12 ;
  }

  if(player1HP <= 0){
    Bob.remove();
    Jeff.remove();
    BombGroup.destroyEach(bombs);
    text("Congratulations Player 2", 100,200);
  }
  
  if(player2HP <= 0){
    Bob.remove();
    Jeff.remove();
    BombGroup.destroyEach(bombs);
    text("Congratulations Player 1", 100,200);
  }

  if (Jeff.isTouching(BombGroup)){
    player1HP = player1HP - 20; 
    BombGroup.destroyEach(bombs);
  }
  
  if (Bob.isTouching(BombGroup)){
    player2HP = player2HP - 20; 
    BombGroup.destroyEach(bombs);
  }
  
  
    //add gravity
    Jeff.velocityY = Jeff.velocityY + 0.8;
    Bob.velocityY = Bob.velocityY + 0.8;
    BombGroup.velocityY= BombGroup.velocityY + 0.8;
    
    Jeff.collide(ground);
    Jeff.collide(platform1);
    Jeff.collide(platform2);
    Jeff.collide(platform3);
    Jeff.collide(platform4);
    Bob.collide(platform3);
    Bob.collide(platform4);
    Bob.collide(ground);
    Bob.collide(platform1);
    Bob.collide(platform2);
    
    textSize(18);
    textFont("Georgia");
    
  drawSprites();
}

function spawnBombs (){
  if (World.frameCount%60==0){
    bombs = createSprite(Math.round(random(0, 400)), 10, 10, 20);
    bombs.velocityY=bombs.velocityY + 3;
    //bombs.scale=0.15;
    BombGroup.add(bombs);
    bombs.addImage(bomb);
    bombs.scale=0.1;
  }
}




