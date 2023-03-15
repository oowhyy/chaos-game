var canv;
var dots = [];
var points = [];
var stage = -1;
const MAX_STAGES = 7;
var ANIMATION_STEPS = 12;
var counter;
var animating = false;
function setup() {
  createCanvas(windowWidth,windowHeight).position(0,0).background(0);
  canv = createGraphics(height,height);
  for (let i = 0; i < 3; i++) {
    let angle = i * TWO_PI / 3 - PI/2;
    let v = p5.Vector.fromAngle(angle);
    points.push(v.copy().mult(canv.height / 2).add(canv.width / 2, canv.height / 2*1.2));
  }
  for (let i = 0;i<10000;i++){
    dots.push(new Dot());
  }
}

function mousePressed(){
  if (!animating){

    stage++;
    if (stage<dots[0].path.length){
      for (let d of dots){
        d.step(stage);
      }
      animating = true;
    }
  }
}

function keyPressed(){
  if (key === 'a' || key === 'ф'){
    if (ANIMATION_STEPS == 24){
      ANIMATION_STEPS = 12;
    } else {
      ANIMATION_STEPS = 24;
    }
  }
}


function animate(){
  if (animating && counter<ANIMATION_STEPS){
    counter++;
    for (let d of dots){
      d.pos.add(d.dl);
    }
  } else {
    animating = false;
    counter = 0;
  }
}

function draw() {
  background(0);
  image(canv,width/2-canv.width/2,0);
  canv.clear();
  canv.strokeWeight(10);
  canv.stroke(255);
  animate();
  for(let p of points){
    canv.point(p.x,p.y)
  }
  canv.strokeWeight(5);
  for (let d of dots){
    d.show();
  }
  // console.log(frameRate())
}

function Dot(){
  this.path = function(){
    let arr = [];
    for (var i = 0;i<MAX_STAGES;i++){
      arr.push(floor(random(3)))
    }
    return arr;
  }();
  this.dl = createVector();
  let r1 = random(1);
  let r2 = random(1);
  let A = points[0].copy();
  let B = points[1].copy();
  let C = points[2].copy();
  this.pos = A.mult(1 - (sqrt(r1))).add(B.mult((sqrt(r1) * (1 - r2))).add(C.mult(sqrt(r1) * r2)));
  let l = this.path.length;
    let c = color(255/pow(2,l),255/pow(2,l),255/pow(2,l));
    for (let i = 0;i<l;i++){
      switch (this.path[i]) {
        case 0:
          c.setRed(red(c)+255/(pow(2,i+1)))
          break;
        case 1:
          c.setGreen(green(c)+255/(pow(2,i+1)))
          break;
        case 2:
          c.setBlue(blue(c)+255/(pow(2,i+1)))
          break;
        default:console.log('lul')
      }
    }
    this.color = c;



  this.show = function(){
    canv.stroke(this.color);
    canv.point(this.pos.x,this.pos.y);
  }
  this.step = function(n){
    // this.pos.x = lerp(this.pos.x, points[this.path[n]].x, 0.5);
    // this.pos.y = lerp(this.pos.y, points[this.path[n]].y, 0.5);
    let newPos = p5.Vector.lerp(this.pos, points[this.path[n]], 0.5)
    this.dl = p5.Vector.sub(newPos,this.pos).mult(1/ANIMATION_STEPS);
  }
}

Array.prototype.count = function(val){
  let counter = 0;
  for (let i of this){
    if (val === i){counter++;}
  }
  return counter;
}
