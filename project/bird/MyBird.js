import { CGFobject, CGFappearance, CGFtexture } from "../../lib/CGF.js";
// import { MyDiamond } from "./MyDiamond.js";
// import {MyTriangle} from "./MyTriangle.js";
// import {MyParallelogram} from "./MyParallelogram.js";
// import {MyTriangleBig} from "./MyTriangleBig.js";
// import {MyTriangleSmall} from "./MyTriangleSmall.js";
// import { MyPrism } from "../MyPrism.js";
import { MyBirdHead } from "./MyBirdHead.js";
import { MyBirdBody } from "./MyBirdBody.js";
import { MyBirdTail } from "./MyBirdTail.js";
import { MyBirdWingLA } from "./MyBirdWingLA.js";
import { MyBirdWingLB } from "./MyBirdWingLB.js";
import { MyBirdWingRA } from "./MyBirdWingRA.js";
import { MyBirdWingRB } from "./MyBirdWingRB.js";
/**
 * MyBird 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene, orientation, speed, x, y, z) {
		super(scene);
        this.birdHead = new MyBirdHead(scene);
        this.birdBody = new MyBirdBody(scene);
        this.birdTail = new MyBirdTail(scene);
        this.birdWingsLA = new MyBirdWingLA(scene,1);
        this.birdWingsLB = new MyBirdWingLB(scene,0);
        this.birdWingsRA = new MyBirdWingRA(scene,1);
        this.birdWingsRB = new MyBirdWingRB(scene,0);

        this.orientation = orientation;
        this.speed = speed;
        this.accelerateKey = false;
        this.disaccelerateKey = false;
        this.rotationAngle = 0;
        this.rotateKeyL = false;
        this.rotateKeyR = false;

        this.X = x;
        this.Y = y;
        this.Z = z;

        this.oldTime = 0;
        this.newTime = 0;

	}

  accelerate(v){
    if (v && this.speed < 8) { 
      this.accelerateKey = true; 
			this.speed = this.speed + 1;
    }
		else if( !v && this.speed > 0) {
      this.desaccelerateKey = true;
			this.speed = (this.speed - 1);
    }
  }

  turn(v) {
		if (v) {
      this.rotateKeyR = true;
			this.orientation = this.orientation + (10 * Math.PI)/300;
      if (this.rotationAngle > -Math.PI/4)
        this.rotationAngle = this.rotationAngle - (10 * Math.PI)/300;
      else
        this.rotationAngle = -Math.PI/4;
      }
		else {
      this.rotateKeyL = true;
			this.orientation = this.orientation - (10 *Math.PI) /300;
      if (this.rotationAngle < Math.PI/4)
        this.rotationAngle = this.rotationAngle + (10 * Math.PI)/300;
      else
        this.rotationAngle = Math.PI/4;
    }
  }

  reset(){
    this.X = 0;
    this.Y = 3;
    this.Z = 0;
    this.speed = 0;
    this.orientation = 0;
    this.rotateKeyR = false;
    this.rotateKeyL = false;
    this.rotationAngle = 0;
  }

  update(t){  
    if (this.speed < 0) this.speed = 0;
    if (!this.accelerateKey && !this.disaccelerateKey && this.speed > 0){
      this.speed = this.speed - 0.3;
    } 

    if (!this.rotateKeyR && this.rotationAngle < 0){
      this.rotationAngle = this.rotationAngle + (10 * Math.PI)/300;
    }

    if (!this.rotateKeyL && this.rotationAngle > 0){
      this.rotationAngle = this.rotationAngle - (10 * Math.PI)/300;
    }

    this.oldTime = this.oldTime || 0;
    this.deltaTime = t - this.oldTime;
    this.oldTime = t;

    this.X = this.X + Math.cos(this.orientation) * (this.speed / 500) * this.deltaTime * this.scene.speedFactor ;
		this.Z = this.Z - Math.sin(this.orientation) * (this.speed / 500) * this.deltaTime * this.scene.speedFactor ;	

    this.newTime = t;
    this.accelerateKey = false;
    this.desaccelerateKey = false;
    this.rotateKeyR = false;
    this.rotateKeyL = false;  
  }


	display(){

        if (this.speed != 0) 
          var angle = Math.sin((2*this.newTime*this.scene.speedFactor)/(1000/(2*Math.PI)) + Math.PI / 6)*0.35;
        else 
          var angle = Math.sin((this.scene.speedFactor*this.newTime)/(1000/(2*Math.PI)) + Math.PI / 6)*0.35;

        console.log(angle);
      
      
        this.scene.pushMatrix();
        this.scene.translate(this.X, this.Y, this.Z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.rotate(this.rotationAngle, 1,0,0);

          this.scene.pushMatrix();
          this.scene.translate(0, Math.sin(this.scene.speedFactor*this.newTime/(1000/(2*Math.PI)))*0.25, 0);
          this.birdHead.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(0, Math.sin(this.scene.speedFactor*this.newTime/(1000/(2*Math.PI)))*0.25, 0);
          this.birdBody.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(0, Math.sin(this.scene.speedFactor*this.newTime/(1000/(2*Math.PI)))*0.25, 0);
          this.birdTail.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.rotate(angle, 1, 0, 0);
          this.birdWingsRA.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.rotate(angle, 1, 0, 0);
          this.birdWingsRB.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.rotate(-angle, 1, 0, 0);
          this.birdWingsLA.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.rotate(-angle, 1, 0, 0);
          this.birdWingsLB.display();
          this.scene.popMatrix();

        this.scene.popMatrix();
    }
}