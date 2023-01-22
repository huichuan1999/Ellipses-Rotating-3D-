/* Huichuan WANG
10-11-2022
A 3d Saturn
*/
let positions = [],
    sizes = [],
    rotations = [],
    numBoxes = 50;

function setup() {
  createCanvas(800,800, WEBGL);
  createEasyCam();
  document.oncontextmenu = ()=>false;
  frameRate(30);
  
  // generate all the data first
  for(let i = 0 ; i < numBoxes ; i++){

    // generate a random box
    let r = createVector(noise(0.3)*20,noise(0.3)*20,noise(0.3)*20);

    //positions.push(p);
    positions.push(r);
    rotations.push(r);
    sizes.push(r);
  }
}

function draw() {
  // always redraw
  background(0);

  // ** put your code below this **/
  
  //lights
  ambientLight(10);
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(100, 100, 100, -dirX, -dirY, -1);
  lights();
  
  for(let i = 0 ; i < numBoxes ; i++){
    let _sz = sizes[i].copy();
    _sz.z += mouseY * 1;
    PossiblyEvenBetterBox(_sz, positions[i], rotations[i]);
    
    rotateX(frameCount * 0.001);
    rotateY(frameCount * 0.001);
    stroke(10);
    fill(255);
    sphere(70,6,6);
  }
}

/* Function to draw a box inside of vector coordinates, with the baseline always at 0 */
function PossiblyEvenBetterBox(sz, pos, rot){
  push();
  noStroke();
  //strokeWeight(1);
  translate(pos.x, pos.y, pos.z  + sz.z/2);
  rotateX(rot.x);
  rotateY(rot.y);
  rotateZ(rot.z);
  fill(255);
  ellipsoid(sz.x, sz.y/2, sz.z,6,6);
  pop();
}

/* draw a box, baseline in middle */
function betterBox(sz, pos, rot){
  push();
  translate(pos.x, pos.y, pos.z);
  rotateX(rot.x);
  rotateY(rot.y);
  rotateZ(rot.z);
  box(sz.x, sz.y, sz.z);
  pop();
}

/* This draws the axis on the 3D plane */
function drawAxis(){
  push();
  strokeWeight(3);
  let sz = 300;
  // draw the lines
  stroke(255,0,0); // R
  line(0,0,0,sz,0,0); // X
  stroke(0,255,0); // G
  line(0,0,0,0,sz,0); // Y
  stroke(0,0,255); //B
  line(0,0,0,0,0,sz); // Z

  // draw the tips
  strokeWeight(12);
  stroke(255,0,0); // R
  point(sz,0,0); // X
  stroke(0,255,0); // G
  point(0,sz,0); // Y
  stroke(0,0,255); //B
  point(0,0,sz); // Z

  pop();
}

/* draw a grid with variable width height and size */
function drawGrid(rows, cols, sz){
  push();
  stroke(255);
  // move to negative edge of the grid
  translate(-rows*0.5*sz,-cols*0.5*sz );

  // draw the rows
  for(let i = 0; i < rows+1; i++){
    line(i *sz, 0 ,i*sz, cols*sz);
  }
  // draw the columns
  for(let j = 0; j < cols+1; j++){
    line(0,j *sz, rows*sz ,j*sz);
  }

  pop();
}