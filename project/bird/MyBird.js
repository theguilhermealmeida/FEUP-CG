import { CGFobject } from "../../lib/CGF.js";
import { MyBirdHead } from "./MyBirdHead.js";
import { MyBirdBody } from "./MyBirdBody.js";
import { MyBirdTail } from "./MyBirdTail.js";
import { MyBirdWingLA } from "./MyBirdWingLA.js";
import { MyBirdWingLB } from "./MyBirdWingLB.js";
import { MyBirdWingRA } from "./MyBirdWingRA.js";
import { MyBirdWingRB } from "./MyBirdWingRB.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
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
    this.birdWingsLA = new MyBirdWingLA(scene, 1);
    this.birdWingsLB = new MyBirdWingLB(scene, 0);
    this.birdWingsRA = new MyBirdWingRA(scene, 1);
    this.birdWingsRB = new MyBirdWingRB(scene, 0);

    this.orientation = orientation;
    this.speed = speed;
    this.accelerateKey = false;
    this.disaccelerateKey = false;
    this.rotationAngle = 0;
    this.rotateKeyL = false;
    this.rotateKeyR = false;
    this.downKey = false;
    this.goUp = false;
    this.initialHeight = y;

    this.egg = null;
    this.eggsMargin = 5;
    this.eggHeld = false;
    this.dropEgg = false;
    this.eggYonBird = 1.7;
    this.initialVx;
    this.initialVy;
    this.initialVz;

    this.X = x;
    this.Y = y;
    this.Z = z;

    this.oldTime = 0;
    this.newTime = 0;

  }


  drop() {
    if (this.eggHeld) {
      this.initialVx = Math.cos(this.orientation) * (this.speed / 500) * this.deltaTime * this.scene.speedFactor;
      this.initialVy = 0;
      this.initialVz = -Math.sin(this.orientation) * (this.speed / 500) * this.deltaTime * this.scene.speedFactor;
      this.egg.vx = this.initialVx;
      this.egg.vy = this.initialVy;
      this.egg.vz = this.initialVz;
      this.egg.x = this.X;
      this.egg.y = this.Y - this.eggYonBird;
      this.egg.z = this.Z;
      this.dropEgg = true;
    }
  }
  down() {
    this.downKey = true;
  }

  accelerate(v) {
    if (v && this.speed < 8) {
      this.accelerateKey = true;
      this.speed = this.speed + 1;
    }
    else if (!v && this.speed > 0) {
      this.desaccelerateKey = true;
      this.speed = (this.speed - 1);
    }
  }

  turn(v) {
    if (v) {
      this.rotateKeyR = true;
      this.orientation = this.orientation + (10 * Math.PI) / 300;
      if (this.rotationAngle > -Math.PI / 4)
        this.rotationAngle = this.rotationAngle - (10 * Math.PI) / 300;
      else
        this.rotationAngle = -Math.PI / 4;
    }
    else {
      this.rotateKeyL = true;
      this.orientation = this.orientation - (10 * Math.PI) / 300;
      if (this.rotationAngle < Math.PI / 4)
        this.rotationAngle = this.rotationAngle + (10 * Math.PI) / 300;
      else
        this.rotationAngle = Math.PI / 4;
    }
  }

  reset() {
    this.X = 0;
    this.Y = this.initialHeight;
    this.Z = 0;
    this.speed = 0;
    this.orientation = 0;
    this.rotateKeyR = false;
    this.rotateKeyL = false;
    this.rotationAngle = 0;
    this.eggHeld = false;
    this.egg = null;
    this.dropEgg = false;
  }

  update(t) {

    // speed section
    if (this.speed < 0) this.speed = 0;
    if (!this.accelerateKey && !this.disaccelerateKey && this.speed > 0) {
      this.speed = this.speed - 0.3;
    }


    // rotation section
    if (!this.rotateKeyR && this.rotationAngle < 0) {
      this.rotationAngle = this.rotationAngle + (10 * Math.PI) / 300;
    }

    if (!this.rotateKeyL && this.rotationAngle > 0) {
      this.rotationAngle = this.rotationAngle - (10 * Math.PI) / 300;
    }

    // up/down section
    if (this.downKey && this.Y > 1) {
      this.Y = this.Y - this.deltaTime * (1 / 100);
      this.goUp = false;
    }
    else if (this.downKey && this.Y <= 1) {
      this.goUp = true;
      this.downKey = false;
      this.checkEggCollision();
    }
    if (this.goUp && this.Y < this.initialHeight) {
      this.Y = this.Y + this.deltaTime * (1 / 100);
    }
    if (this.Y >= this.initialHeight) {
      this.goUp = false;
    }

    if (this.dropEgg) {
      this.eggHeld = false;
      this.egg.vy -= this.deltaTime * (1 / 100); 
      this.egg.x += this.egg.vx * this.deltaTime * this.scene.speedFactor * (1 / 80);
      this.egg.y += this.egg.vy * this.deltaTime * this.scene.speedFactor * (1 / 100);
      this.egg.z += this.egg.vz * this.deltaTime * this.scene.speedFactor * (1 / 80);
      
      if (this.egg.y < 0) { 
        this.egg.y = 0;
        const newEgg = new MyBirdEgg(this.scene, this.egg.slices, this.egg.stacks, this.egg.enlongationFactor, this.egg.x, this.scene.eggY, this.egg.z, this.egg.radius); 
        this.scene.eggs.push(newEgg);
        this.scene.checkEggNestCollision();
        this.dropEgg = false;
        this.egg = null;
      }
    }

    // time section
    this.oldTime = this.oldTime || 0;
    this.deltaTime = t - this.oldTime;
    this.oldTime = t;

    // position section
    this.X = this.X + Math.cos(this.orientation) * (this.speed / 500) * this.deltaTime * this.scene.speedFactor;
    this.Z = this.Z - Math.sin(this.orientation) * (this.speed / 500) * this.deltaTime * this.scene.speedFactor;


    this.newTime = t;
    this.accelerateKey = false;
    this.desaccelerateKey = false;
    this.rotateKeyR = false;
    this.rotateKeyL = false;
  }

  checkEggCollision() {
    if (!this.eggHeld) {
      const eggs = this.scene.eggs;
      for (const egg of eggs) {
        if (egg.x > this.X - this.eggsMargin && egg.x < this.X + this.eggsMargin && egg.z > this.Z - this.eggsMargin && egg.z < this.Z + this.eggsMargin) {
          this.egg = egg;
          this.egg.x = 0;
          this.egg.y = 0;
          this.egg.z = 0;
          this.scene.eggs.splice(this.scene.eggs.indexOf(egg), 1);
          this.eggHeld = true;
          break;
        }
      }
    }
  }


  display() {


    if (this.speed != 0) {
      var wingMotion = Math.sin((2 * this.newTime * this.scene.speedFactor) / (1000 / (2 * Math.PI)) + Math.PI / 6) * 0.35;
      var bodyMotion = Math.sin(2*this.scene.speedFactor * this.newTime / (1000 / (2 * Math.PI))) * 0.25;
    }
    else {
      var wingMotion = Math.sin((this.scene.speedFactor * this.newTime) / (1000 / (2 * Math.PI)) + Math.PI / 6) * 0.35;
      var bodyMotion = Math.sin(this.scene.speedFactor * this.newTime / (1000 / (2 * Math.PI))) * 0.25;
    }

    if (this.dropEgg) { 
      this.scene.pushMatrix();
      this.egg.display();
      this.scene.popMatrix();
    }

    this.scene.pushMatrix();
    this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
    console.log(this.X, this.Y, this.Z);

    this.scene.pushMatrix();
    this.scene.translate(this.X, this.Y, this.Z);
    this.scene.rotate(this.orientation, 0, 1, 0);
    this.scene.rotate(this.rotationAngle, 1, 0, 0);

    if (this.eggHeld) {
      this.scene.pushMatrix();
      this.scene.translate(0, Math.sin(this.scene.speedFactor * this.newTime / (1000 / (2 * Math.PI))) * 0.25, 0);
      this.scene.translate(0,-this.eggYonBird,0);
      this.egg.display();
      this.scene.popMatrix();
    }


    this.scene.pushMatrix();
    this.scene.translate(0, bodyMotion, 0);
    this.birdHead.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, bodyMotion, 0);
    this.birdBody.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, bodyMotion, 0);
    this.birdTail.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(wingMotion, 1, 0, 0);
    this.birdWingsRA.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(wingMotion, 1, 0, 0);
    this.birdWingsRB.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-wingMotion, 1, 0, 0);
    this.birdWingsLA.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-wingMotion, 1, 0, 0);
    this.birdWingsLB.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
    this.scene.popMatrix();
  }
}