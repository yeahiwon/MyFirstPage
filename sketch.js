let cnv, d, g;
let raindrop = [];
var impressingNow = true;

function setup() {
  cnv = createCanvas(600, 600);
  cnv.mouseWheel(changeSize);
  d = 0;

  for(let i = 0; i < 1000; i++) {
    raindrop[i] = new Raindrop(random(0, 400), random(0, -1000), random(0, 10));
  }
}

function draw() {
  background(100);

 if (impressingNow == true) {
    for (i = 0; i < raindrop.length; i++) {
      raindrop[i].dropRain();
      raindrop[i].splash();
    }
 }
  for(let i=0; i < raindrop.length; i++) {
    let gravity = createVector(0, 0.01 * raindrop[i].mass);
    let wind = createVector(d, 0);
    raindrop[i].applyForce(gravity);
    raindrop[i].applyForce(wind);
    raindrop[i].update();
    raindrop[i].show();

    raindrop[i].surface();
  }
}

class Raindrop {

  constructor(x, y, m) {

  this.x = x;
  this.y = y;
  //this.gravity = 9.8;
  this.length = 15;
  this.r = 0;
  this.opacity = 200;
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.c = color(18,105,random(100,255));
  this.mass = m;

    this.dropRain = function() {
    noStroke();
    fill(255);
    //rect(this.x, this.y,3,15);
    ellipse(this.x, this.y, 3, this.length);
    this.y = this.y + 6 //+ frameCount/60;
    if (this.y > 540) {
      this.length = this.length - 5;
      //this.y= random(0,-100);
    }
    if (this.length < 0) {
      this.length = 0;
    }
  }

  this.splash = function() {
    strokeWeight(2);
    //stroke(245, 200/frameCount);
    stroke(245, this.opacity);
    noFill();
    if (this.y > 540) {
      ellipse(this.x, 550, this.r * 2, this.r / 2);
      this.r++;
      this.opacity = this.opacity - 10;

      //keep the rain dropping
      if (this.opacity < 0) {
        this.y = random(0, -100);
        this.length = 15;
        this.r = 0;
        this.opacity = 200;
      }
    }
  }
}


  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0,0);
  }

  show() {
    noStroke();
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, 5, this.length);

  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(force);
  }

  surface() {
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
      this.length = random(1,50);
      this.c = color(random(50,255),0,0);
    }
  }
}


function changeSize(event) {
  if (event.deltaY > 0) {
    d = d + 0.001;
  } else {
    d = d - 0.001;
  }
}
