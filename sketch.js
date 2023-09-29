const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit;
var rope;
var fruit_con;
var bg_img;
var belo_img;
var eu_img, eu;
var blinking, sad, eating;
var belo;

function preload() {
  bg_img = loadImage("fundinho.png");
  eu_img = loadImage("normal1.png");
  belo_img = loadImage("balinha.png");
  blinking = loadImage("normal1.png","normal2.png");
  eating = loadImage("normal1.png","sobremesaaa.png","normal1.png","feli.png");
  sad = loadImage("normal1.png","normal2.png","titi.png");
  blinking.playing = true;
  eating.playing = true;
  eating.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  blinking.frameDelay = 20;
  eating.frameDelay = 20;
  sad.frameDelay = 20;
  ground = new Ground(200,680,600,20);
  rope = new Rope(10,{x:245,y:30});
  var fruit_opt = {
    density:0.001
  }
  fruit = Bodies.circle(300,300,20,fruit_opt);
  Matter.Composite.add(rope.body,fruit);
  fruit_con = new Link(rope,fruit); 

  eu = createSprite(250,630,100,100);
  eu.scale = 0.3;
  // eu.addImage(eu_img);
  eu.addAnimation("blinking", blinking);
  eu.addAnimation("eating", eating);
  eu.addAnimation("sad", sad);
  eu.changeAnimation("blinking");

  butuau = createImg('butuau.png');
  butuau.position(220,30);
  butuau.size(50,50);
  butuau.mouseClicked(drop);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img, width / 2, height / 2, 500, 700);
  // ground.show();
  Engine.update(engine);

  rope.show();
  if(fruit != null) {
    image(belo_img, fruit.position.x, fruit.position.y, 100, 100);
  }
  if(collide(fruit, eu) == true) {
    eu.changeAnimation("eating");
  }
  if(collide(fruit, ground.body) == true) {
    eu.changeAnimation("sad");
  }
  // ellipse(fruit.position.x,fruit.position.y,30,30)
  
  // image(belo_img,fruit.position.x,fruit.position.y,100,100);



  drawSprites();
}

function drop() {
  rope.break();
  fruit_con.dettach();
  fruit_con = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d <=80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}