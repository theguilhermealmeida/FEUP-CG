import { CGFobject } from "../../lib/CGF.js";
import { MyCylinder } from "../MyCylinder.js";
/**
 * MyBird 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cylinder = new MyCylinder(scene, 7,5);

       
	}

	display(){
        

        var deg2rad=Math.PI/180.0;
        var a_rad=45.0*deg2rad;
        var d_rad = 90.0*deg2rad;
      

        this.scene.pushMatrix();
        this.scene.translate(0.0,1.5,0.0);
            // cylinder 4
          this.scene.pushMatrix();
          this.scene.translate(1.3,-0.7,0);
          this.scene.rotate(-d_rad, 0,1,0);
          this.scene.rotate(a_rad, 1,0,0);
          this.scene.rotate(-d_rad, 0,0,1);
          this.scene.scale(1.0,1.0,1.0);
          this.scene.feather.apply();
          this.cylinder.display();
          this.scene.popMatrix();

         // cylinder 5 
          this.scene.pushMatrix();
          this.scene.translate(-1.1,-1.7,0);
          this.scene.rotate(-d_rad, 0,1,0);
          this.scene.rotate(190*deg2rad, 1,0,0);
          this.scene.scale(1.0,1.0,2.0);
          this.scene.rotate(-12*deg2rad, 0,0,1);
          this.scene.feather.apply();
          this.cylinder.display();
          this.scene.popMatrix();

          // cylinder 6
          this.scene.pushMatrix();
          this.scene.translate(0.3,-1.7,0);
          this.scene.rotate(-d_rad, 0,1,0);
          this.scene.rotate(225*deg2rad, 1,0,0);
          this.scene.rotate(-12*deg2rad, 0,0,1);
          this.scene.scale(1.0,1.0,0.7);
          this.scene.feather.apply();
          this.cylinder.display();
          this.scene.popMatrix();

        this.scene.popMatrix();

    }
}