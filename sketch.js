let cnv, d, g;
let raindrop = [];



function setup() {
  cnv = createCanvas(400, 400);
  cnv.mouseWheel(changeSize);
  d = 0;

  for(let i = 0; i < 1000; i++) {
    raindrop[i] = new Raindrop(random(0, 400), random(0, -1000), random(0, 10));
  }
}

function draw() {
  background(220);



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
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.length = 15;
  this.r = 0;
  this.c = color(random(0,255),0,0);
  this.mass = m;
  this.opacity = 100;
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
      this.c = color(random(0,255),0,0);
    }
  }
}
function changeSize(event) {
  if (event.deltaY > 0) {
    d = d + 0.0001;
  } else {
    d = d - 0.0001;
  }
}
