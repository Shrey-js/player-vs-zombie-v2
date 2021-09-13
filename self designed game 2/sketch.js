var player, playerImg;
var bgImg;
var zombie1, zombie2, zombie3, zombie1Img, zombie2Img, zombie3Img;
var bullet, bulletImg;
var music;
var bulletGroup
var invisibleGround;
var PLAY = 1
var END =0
var gameState = PLAY;
var endImage;
//var music2;

function preload() {
playerImg = loadImage("player.png");
bgImg = loadImage("bgImg.jpg");
zombie1Img = loadImage("zombie1.png");
zombie2Img = loadImage("zombie2.png");
zombie3Img = loadImage("zombie3.png");
bulletImg = loadImage("bullet.png");
music = loadSound("music.mp3");
endImage = loadImage("youLose.jpg");
//music2 = loadSound("youLoseMusic.mp3");
}


function setup() {
createCanvas(windowWidth, windowHeight);
 
player = createSprite(350, 500, 50, 50);
player.addImage(playerImg);
player.scale = 0.4;
music.loop();

zombieGroup = new Group();
bulletGroup = new Group()


invisibleGround = createSprite(windowWidth/2-700, windowHeight/2,10, windowWidth );
invisibleGround.visible = false;
}


function draw() {
background(bgImg);



if(gameState === PLAY)
{
  player.y = mouseY;

  if (keyDown("space")) {
    makeBullet();
  }
  
  if(frameCount % 50 === 0) {
    spawnZombies();
  }
  bulletGroup.bounceOff(zombieGroup, deleteZombie);

  if(zombieGroup.isTouching(invisibleGround)){
    gameState = END;
  }
  
  
}
if (gameState === END)
{
background(endImage)
player.destroy();
zombieGroup.destroyEach()
bulletGroup.destroyEach()
music.stop()
//music2.play();
}

drawSprites();
}

function spawnZombies() {
  zombie = createSprite(windowWidth, 50, 20, 20);
  zombie.velocityX = -10;
  zombie.y = Math.round(random(30,windowHeight - 100));
  var rand = Math.round(random(1,3));
  zombie.scale = 0.3;
  zombie.lifetime = windowWidth/3;
  if (rand === 1){
    zombie.addImage(zombie1Img);
  }
  if (rand === 2){
    zombie.addImage(zombie2Img);
  }
  if (rand === 3){
    zombie.addImage(zombie3Img);
  }
  zombieGroup.add(zombie);
}

function makeBullet() {
  var bullet = createSprite(player.x + 80, player.y + 21, 20, 20);
  bullet.velocityX = 6;
  bullet.addImage(bulletImg);
  bullet.scale = 0.15;
  bulletGroup.add(bullet)
}
function deleteZombie(bullet, zombie)
{
  console.log("here")
  
bullet.visible = false
zombie.destroy()
}







































