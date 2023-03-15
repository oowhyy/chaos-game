
var n = 2;
var vel = 1;
var chaos;
var die;
var diePos;
var auto = false;
const ANIMATION_STEPS = 60;
function setup() {
  createCanvas(windowWidth,windowHeight).position(0,0);
  stroke(255);
  noStroke();
  diePos = createVector(100,100);
  chaos = new ChaosGame(1)
  die = new Dice(height/8);
  chaos.reset('111','111','111',0.5);
  // frameRate(1);
  background(0);
}

function draw() {
  background(0);
  // die.canv.clear();
  chaos.canv.clear();
  chaos.canv.image(chaos.rawCanv,0,0);
  chaos.canv.image(chaos.overCanv,0,0);
  chaos.animate();
  image(chaos.canv,width/2-height/2,0,height,height);
  if (auto){
    die.roll();
    chaos.step();
  }
  die.show();
  image(die.canv,diePos.x,diePos.y)

}

function mousePressed() {
  if (die.hoveredOver()){
    die.roll();
    chaos.step();
  }
}

function keyPressed(){
  if (key === 'a' || key === 'ф'){
    auto = !auto;
  }
}

function Dice(w){
  this.SW = w/20;
  this.val = floor(random(6))+1;
  this.w = w;
  this.canv = createGraphics(this.w+2*this.SW,this.w+2*this.SW)
  this.show = function(){
    let d = this.SW;
    this.canv.clear();
    this.canv.stroke(255);
    this.canv.strokeWeight(d*2);
    this.canv.noFill();
    this.canv.rect(d,d,this.w,this.w,10);
    this.canv.strokeWeight(d*4);
    switch (this.val) {
      case 1:
      this.canv.point(this.w/2+d,this.w/2+d);
      break;
      case 2:
      this.canv.point(3*this.w/4+d,this.w/4+d);
      this.canv.point(this.w/4+d,3*this.w/4+d);
      break;
      case 3:
      this.canv.point(this.w/2+d,this.w/2+d);
      this.canv.point(3*this.w/4+d,this.w/4+d);
      this.canv.point(this.w/4+d,3*this.w/4+d);
      break;
      case 4:
      this.canv.point(3*this.w/4+d,this.w/4+d);
      this.canv.point(this.w/4+d,3*this.w/4+d);
      this.canv.point(this.w/4+d,this.w/4+d);
      this.canv.point(3*this.w/4+d,3*this.w/4+d);
      break;
      case 5:
      this.canv.point(3*this.w/4+d,this.w/4+d);
      this.canv.point(this.w/4+d,3*this.w/4+d);
      this.canv.point(this.w/4+d,this.w/4+d);
      this.canv.point(3*this.w/4+d,3*this.w/4+d);
      this.canv.point(this.w/2+d,this.w/2+d);

      break;
      case 6:
      this.canv.point(3*this.w/4+d,this.w/4+d);
      this.canv.point(this.w/4+d,3*this.w/4+d);
      this.canv.point(this.w/4+d,this.w/4+d);
      this.canv.point(3*this.w/4+d,3*this.w/4+d);
      this.canv.point(this.w/4+d,2*this.w/4+d);
      this.canv.point(3*this.w/4+d,2*this.w/4+d);
      break;
      default:
    }
  }
  this.roll = function(){
    this.val = floor(random(6))+1;
    // this.canv.clear();
  }
  this.hoveredOver = function(){
    return (mouseX>diePos.x && mouseX<diePos.x+this.canv.width && mouseY>diePos.y && mouseY < diePos.y+this.canv.width)
  }
  this.getValue = function(){
    return this.val;
  }
}

function ChaosGame(ind = 0){
  this.n;
  this.index = ind;
  this.rule;
  this.prevrule;
  this.first = true;
  this.doublerule;
  this.reseting = true;
  this.percent = 0.5;
  this.speed = 1;
  this.current;
  this.animCur;
  this.previous;
  this.counter = 0;
  this.preprevious;
  this.dl = createVector();
  this.animating = false;
  this.points = [];
  this.canv = createGraphics(1500,1500);
  this.overCanv = createGraphics(this.canv.width,this.canv.height);
  this.rawCanv = createGraphics(this.canv.width,this.canv.height);
  this.reset = function(r,pr,dr,newP){
    this.reseting = true;
    this.n = r.length;
    this.rule = r;
    this.prevrule = pr;
    this.doublerule = dr;
    this.points = [];
    this.percent = newP;
    this.canv.clear();
    this.overCanv.clear();
    this.rawCanv.clear();
    this.overCanv.stroke(0,0,255);
    this.overCanv.strokeWeight(16);
    this.rawCanv.strokeWeight(16);
    for (let i = 0; i < this.n; i++) {
      let angle = i * TWO_PI / this.n - PI/2;
      if (this.n%2 == 0 ){
        angle+=PI/this.n;
      }
      let v = p5.Vector.fromAngle(angle);
      this.points.push(v.copy().mult(this.canv.height / 2).add(this.canv.width / 2, this.canv.height / 2*1.2));

    }
    this.current = createVector(this.canv.height/2,this.canv.height/2*1.2)
    this.previous = floor(random(this.n+1));
    this.preprevious = floor(random(this.n+1));
    this.rawCanv.background(0);
    this.rawCanv.stroke(255);
    this.rawCanv.strokeWeight(22);
    for (let p of this.points) {
      this.rawCanv.point(p.x, p.y);
    }
    // this.canv.strokeWeight(3);
    // this.canv.stroke(255,50);
    // this.canv.noFill()
    // this.canv.ellipse(this.canv.width / 2, this.canv.height / 2*1.2,this.canv.height)
    this.rawCanv.strokeWeight(16);
    this.rawCanv.stroke(255,100);
    this.rawCanv.point(this.current.x, this.current.y);

    this.canv.image(this.rawCanv,0,0);

    this.reseting = false;
  }


  this.animate = function(){
    for (let i = 0;i<1;i++){
      if (this.animating && this.counter<ANIMATION_STEPS){
        this.counter++;
        this.animCur.add(this.dl);
        this.overCanv.clear();
        this.overCanv.point(this.animCur.x,this.animCur.y);
        // this.canv.image(this.overCanv,0,0);


      } else {
        this.animating = false;
        this.counter = 0;
        break;
      }
    }
  }

  this.step = function(){
    if(!this.first){
      this.rawCanv.point(this.current.x, this.current.y);
    }
    // this.canv.stroke(255);
    // for (let p of this.points){
    //   this.canv.point(p.x,p.y);
    // }
    for (let i = 0; i < this.speed; i++) {
      // this.overCanv.clear();
      // this.canv.clear();
      // this.overCanv.point(this.current.x, this.current.y);
      // this.canv.image(this.rawCanv,0,0);
      // this.canv.image(this.overCanv,0,0);
      this.animCur = this.current.copy();
      // let possibleNext = [];
      // let pInd = this.previous;
      // let ppInd = this.preprevious;
      // console.log(ppInd);

      // let dp = (this.n-pInd)%this.n;
      // let dpp = (this.n-ppInd)%this.n;
      // for (let i = 0;i<this.points.length;i++) {
      //   if (this.rule[(dp+i)%this.n] == 1 && this.prevrule[(dpp+i)%this.n] == 1
      //   && (dp!=dpp || this.doublerule[(dp+i)%this.n] == 1)    ){
      //     possibleNext.push(i%this.n)
      //   }
      // }
      // console.log(possibleNext);

      // let next = random(possibleNext);

      let next = ceil(die.getValue()/2)-1;



      if (next!= undefined){}else{break;}
      let save = this.current.copy();
      this.current.x = lerp(this.current.x, this.points[next].x, this.percent);
      this.current.y = lerp(this.current.y, this.points[next].y, this.percent);
      this.dl = p5.Vector.sub(this.current,save).mult(1/ANIMATION_STEPS);
      // console.log(this.dl)
      this.preprevious = this.previous;
      this.previous = next;
      this.first = false;

      this.animating = true;
    }
  }
}
