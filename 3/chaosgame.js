function ChaosGame(){
  this.n;
  this.rule = '';
  this.prevrule = '';
  this.doublerule = '';
  this.demo = false;
  this.reseting = true;
  this.percent = 0.5;
  this.speed = 10000;
  this.current;
  this.previous;
  this.preprevious;
  this.points = [];
  this.canv = createGraphics(1500,1500);
  this.overCanv = createGraphics(this.canv.width,this.canv.height).strokeWeight(15).stroke(0,0,255);
  this.reset = function(newN,newP){
    this.n = newN;
    this.reseting = true;
    this.points = [];
    this.rule = '';
    this.prevrule = '';
    this.doublerule = '';
    this.percent = newP;
    this.canv.clear();
    this.overCanv.clear();
    for (let b of mainBoxes){
      if (b.active){
        this.rule+='0'
      } else {
        this.rule+='1'
      }
    }
    for (let b of secondBoxes){
      if (b.active){
        this.prevrule+='0'
      } else {
        this.prevrule+='1'
      }
    }
    for (let b of doubleBoxes){
      if (b.active){
        this.doublerule+='0'
      } else {
        this.doublerule+='1'
      }
    }
    for (let i = 0; i < newN; i++) {
      let angle = i * TWO_PI / newN - PI/2;
      if (newN%2 == 0 ){
        angle+=PI/newN;
      }
      let v = p5.Vector.fromAngle(angle);
      this.points.push(v.copy().mult(this.canv.height / 2*0.9).add(this.canv.width / 2, this.canv.height / 2));
    }
    this.current = createVector(this.canv.height/2,this.canv.height/2)
    this.previous = floor(random(this.n+1));
    this.preprevious = floor(random(this.n+1));
    this.canv.background(0);
    this.canv.stroke(255);
    this.canv.strokeWeight(10);
    for (let p of this.points) {
      this.canv.point(p.x, p.y);
    }
    this.canv.strokeWeight(3);
    this.canv.stroke(255,50);
    this.canv.noFill()
    this.canv.ellipse(this.canv.width / 2, this.canv.height / 2,this.canv.height*0.9)
    this.canv.stroke(255,100);
    this.canv.strokeWeight(1);
    // console.log('rule:'+this.rule)
    // console.log('prule:'+this.prevrule)

    this.reseting = false;
  }

  this.step = function(){
    if (this.demo){this.canv.strokeWeight(15);}
    if (this.speed == 1) {this.overCanv.point(this.current.x,this.current.y);}
    for (let i = 0; i < this.speed; i++) {
      this.canv.point(this.current.x, this.current.y);
      let possibleNext = [];
      let pInd = this.previous;
      let ppInd = this.preprevious;
      // console.log(ppInd);

      let dp = (this.n-pInd)%this.n;
      let dpp = (this.n-ppInd)%this.n;
      // console.log(dpp);
      for (let i = 0;i<this.n;i++) {
        if (this.rule[(dp+i)%this.n] == 1 && this.prevrule[(dpp+i)%this.n] == 1
            && (dp!=dpp || this.doublerule[(dp+i)%this.n] == 1)){
          possibleNext.push(i%this.n)
        }
      }
      // console.log(possibleNext);

      let next = random(possibleNext);
      if (next!= undefined){}else{break;}
      this.current.x = lerp(this.current.x, this.points[next].x, this.percent);
      this.current.y = lerp(this.current.y, this.points[next].y, this.percent);
      this.preprevious = this.previous;
      this.previous = next;
    }
  }
}
