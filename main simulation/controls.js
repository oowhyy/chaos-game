var mainBoxes = [];
var secondBoxes = [];
var doubleBoxes = [];

function resetChecks(newN){
  mainBoxes = [];
  secondBoxes = [];
  doubleBoxes = [];
  for (let i = 0; i < newN; i++) {
    // let v = createVector(random(width), random(height));
    let angle = i * TWO_PI / newN - PI/2;
    if (newN%2 == 0 ){
      angle+=PI/newN;
    }
    let v = p5.Vector.fromAngle(angle);
    // console.log(v)
    let bv = v.copy().mult(boxSize *0.4).add(boxSize / 2, boxSize*0.5).add(width-dh/2-boxSize/2,0);
    let sbv = v.copy().mult(boxSize*0.75 *0.4).add(boxSize / 2, boxSize*0.5).add(width-dh/2-boxSize/2,0)
    let dbv = v.copy().mult(boxSize*0.53 *0.4).add(boxSize / 2, boxSize*0.5).add(width-dh/2-boxSize/2,0)
    // console.log(bv);
    let c = color(255,255,0);
    if (i == 0){c = color(255,210,0);}
    mainBoxes.push(new oCheckBox(bv,boxSize*0.12,c));
    // c = color(255,0,255)
    // if (i == 0){c = color(215,0,255);}
    secondBoxes.push(new oCheckBox(sbv,boxSize*0.06,c));
    c = color(0,255,255);
    if (i == 0){c = color(0,210,255);}

    doubleBoxes.push(new oCheckBox(dbv,boxSize*0.09,c));
  }
}

function oCheckBox(vec,w,c) {
  this.active = false;
  this.x = vec.x;
  this.y = vec.y;
  this.w = w;
  this.c = c;
  this.potential = false;
  this.show = function(myCanv){
    stroke(this.c);
    strokeWeight(this.w/12);
    noFill();
    if (this.hoveredOver()) {
      cursor(HAND);
      fill(128)
    }
    ellipse(this.x,this.y,this.w,this.w);
    strokeWeight(this.w/12);
    if (this.active){
      line(this.x-cos(PI/4)*this.w/2,this.y-cos(PI/4)*this.w/2,this.x+cos(PI/4)*this.w/2,this.y+cos(PI/4)*this.w/2);
      line(this.x-cos(PI/4)*this.w/2,this.y+cos(PI/4)*this.w/2,this.x+cos(PI/4)*this.w/2,this.y-cos(PI/4)*this.w/2);
    }
  }
  // this.hoveredOver = function(){
  //   return (mouseX > this.x) && (mouseX < this.x+this.w) &&
  //   (mouseY > this.y) &&(mouseY < this.y+this.w);
  // }
  this.hoveredOver = function(){
    return dist(this.x,this.y,mouseX,mouseY) < this.w/2;
  }
}

function mousePressed(){
  for (let c of mainBoxes){
    if (c.hoveredOver()){
      c.potential = true;
    }
  }
  for (let c of secondBoxes){
    if (c.hoveredOver()){
      c.potential = true;
    }
  }
  for (let c of doubleBoxes){
    if (c.hoveredOver()){
      c.potential = true;
    }
  }
}

function mouseReleased(){
  for (let c of mainBoxes){
    if (c.hoveredOver() && c.potential){
      c.active = !c.active;
      c.potential = false;
    }
  }
  for (let c of doubleBoxes){
    if (c.hoveredOver() && c.potential){
      c.active = !c.active;
      c.potential = false;
    }
  }
  for (let c of secondBoxes){
    if (c.hoveredOver() && c.potential){
      c.active = !c.active;
      c.potential = false;
    }
  }
}
