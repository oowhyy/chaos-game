var prevrule = [1, 1, 1, 1];
var dh;
var mainChaos;
var gui;
var settings;
var boxSize = 500;
var speed = 1;
var resetButton;
var startN = 3;
var speedslider, percentslider;
var percentdiv;
var moreB, lessB;
var checkDemo;
var stopB;
var saveB;
var STOP = false;

function setup() {
  // frameRate(2);
  createCanvas(windowWidth, windowHeight).position(0, 0);
  boxSize = height / 700 * 500
  // overCanvas = createGraphics(height,height);
  dh = windowWidth - height;
  resetChecks(startN);
  mainChaos = new ChaosGame();
  mainChaos.reset(startN, 0.5);
  mainChaos.reseting = true;
  // mainChaos.speed = 1;

  // speedslider = createSlider(1,60,1,1).position(width-dh,0).size(200);
  percentslider = createSlider(0.2, 0.8, 0.5, 0.01).position(width - 210, 35).size(200);
  percentdiv = createDiv(percentslider.value()).position(width - 250, 0)
    .style('font-size', '30px').style('color', 'white');
  resetButton = createButton('reset/start').position(width - dh, 5).style('width', '100px')
    .style('height', '30px').style('font-size', '18px');
  moreB = createButton('more').position(width - 100, 5);
  lessB = createButton('less').position(width - 150, 5);
  stopB = createButton('pause/play').position(width - dh, 35 + 10).style('width', '100px').style('height', '22px');
  saveB = createButton('save').position(width - dh + 100 + 10, 5).style('width', '50px').style('height', '30px');
  resetButton.mousePressed(function () { mainChaos.reset(mainBoxes.length, percentslider.value()); });
  moreB.mousePressed(function () { if (startN < 15) { startN++; resetChecks(startN); } });
  lessB.mousePressed(function () { if (startN > 3) { startN--; resetChecks(startN); } });
  stopB.mousePressed(function () { STOP ^= 1 });
  saveB.mousePressed(function () {
    save(mainChaos.canv.get(), 'ChaosFractal ' + mainChaos.n +
      ' ' + mainChaos.percent +
      ' ' + parseInt(mainChaos.rule, 2) + ' ' + parseInt(mainChaos.prevrule, 2) +
      ' ' + parseInt(mainChaos.doublerule, 2) + '.png')
  });
  // checkDemo = createCheckbox('', false).position(width-190,5)
  // .style('transform','scale(1.5)');


  // checkDemo.changed(function(){
  //   mainChaos.reset(mainBoxes.length,percentslider.value());
  //     if (this.checked()) {
  //     mainChaos.speed = 10000;
  //     mainChaos.demo = false;
  //     } else {
  //       mainChaos.speed = 1;
  //       mainChaos.demo = true;
  //     }
  // })
}


var count = 60;

function draw() {
  count += speed;
  // speed = speedslider.value();
  speed = 60;
  cursor(ARROW);
  background(0);
  // ellipse(height+(windowWidth-height)/2,(windowWidth-height)/2,windowWidth-height)
  image(mainChaos.canv, 0, 0, height, height);
  image(mainChaos.overCanv, 0, 0, height, height);
  for (let c of mainBoxes) {
    c.show();
  }
  for (let c of secondBoxes) {
    c.show();
  }
  for (let c of doubleBoxes) {
    c.show();
  }

  if (count >= 60 && !mainChaos.reseting && !STOP) {
    mainChaos.overCanv.clear();
    mainChaos.step();
    count = 0;
  }
  percentdiv.html(percentslider.value());
  // noLoop();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   // reset();
// }
