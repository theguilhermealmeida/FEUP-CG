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
import { MyBirdWings } from "./MyBirdWings.js";
/**
 * MyBird 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene) {
		super(scene);
        this.birdHead = new MyBirdHead(scene);
        this.birdBody = new MyBirdBody(scene);
        this.birdTail = new MyBirdTail(scene);
        this.birdWings = new MyBirdWings(scene);

	}


	display(){
        

        var deg2rad=Math.PI/180.0;
        var a_rad=45.0*deg2rad;
        var b_rad=180.0*deg2rad;
        var c_rad=135.0*deg2rad;
        var cos_a = Math.cos(a_rad);
        var sin_a = Math.sin(a_rad);
      
          //Square  
          this.scene.pushMatrix();
          this.birdHead.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.birdBody.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.birdTail.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.birdWings.display();
          this.scene.popMatrix();
      
    }
}