var tower, tower_image;
var ghost, ghost_image;
var door, door_image, doorGroup;
var climber, climber_image, climberGroup;
var invisible_climber, invisible_climberGroup;
var gameState = "PLAY";

function preload() {
  tower_image = loadImage("tower.png");
  ghost_image = loadImage("ghost-standing.png");
  door_image = loadImage("door.png");
  climber_image = loadImage("climber.png");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", tower_image);
  tower.velocityY = 2;

  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghost_image);
  ghost.scale = 0.3;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisible_climberGroup = createGroup();
}

function draw() {
  background(0);

  if(gameState === "PLAY"){
     
  if (tower.y > 600) {
    tower.y = 300;
  }

  if (keyDown("space")) {
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.8;

  if (keyDown("RIGHT_ARROW")) {
    ghost.x = ghost.x + 10;
  }


  if (keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x - 10;
  }

  if(climberGroup.isTouching(ghost)){
 ghost.velocityY = 0;
  }

    if(invisible_climberGroup.isTouching(ghost) || ghost.y>600){
  ghost.destroy();
  gameState = "END";
  }
  spawnDoors();
  
  drawSprites();
}
  
  if(gameState === "END"){
  stroke("yellow");
    fill("yellow");
  textSize(30);
  text("GAME OVER", 230, 250)
  }
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50)
    door.addImage("door", door_image);
    door.x = Math.round(random(150, 450))
    door.velocityY = 2;
    door.lifetime = 400;
    doorGroup.add(door);
    
    climber = createSprite(200, 15)
    climber.addImage("climber", climber_image);
    climber.x = door.x;
    climber.velocityY = 2;
   climber.lifetime = 400;
    climberGroup.add(climber);
    
    invisible_climber = createSprite(200, 20);
    invisible_climber.debug = true;
    invisible_climber.width = climber.width
    invisible_climber.height = 2;
    invisible_climber.x = door.x;
    invisible_climber.velocityY = 2;
    invisible_climber.lifetime = 400;
    invisible_climberGroup.add(invisible_climber);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
  }
}