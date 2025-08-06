let capture;
let poseNet;
let noseX = 0;
let noseY = 0;

let leyeX = 0;
let leyeY = 0;

let reyeX = 0;
let reyeY = 0;

let singlePose , skeleton;

function setup() {
  createCanvas(800, 500);
  capture = createCapture(VIDEO);
  capture.size(800, 500);
  capture.hide(); // Hide the HTML video element

  poseNet = ml5.poseNet(capture, modelLoaded);
  poseNet.on('pose', receivedPoses);

}

function modelLoaded() {
  console.log('PoseNet model loaded');
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton =poses[0].skeleton;

  }
}

function draw() {
  image(capture, 0, 0, width, height);

  if (singlePose) {
    fill(255,0,0);
    for (let i=0 ; i<singlePose.keypoints.length ;i++) {
        ellipse(singlePose.keypoints[i].position.x , singlePose.keypoints[i].position.y , 20);
    }
    
    stroke(255,255,255);
    strokeWeight(3);
    for(let j=0 ;j<skeleton.length ;j++) {
        line( skeleton[j][0].position.x ,skeleton[j][0].position.y , skeleton[j][1].position.x ,skeleton[j][1].position.y   )
    }

  }
}
