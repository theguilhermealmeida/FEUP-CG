import { CGFobject } from "../../lib/CGF.js";
import { MyTriangle } from "../MyTriangle.js";
/**
 * MyBird 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdWingLB extends CGFobject {
	constructor(scene) {
		super(scene);
        this.triangle = new MyTriangle(scene);

       
	}
    


	display(){
        

        var deg2rad=Math.PI/180.0;
        var b_rad=180.0*deg2rad;
        var d_rad = 90.0*deg2rad;
      
            // left wing 2
            this.scene.pushMatrix();
            this.scene.translate(0.0,0.0,-3.5)
            this.scene.rotate(b_rad,0,0,1);
            this.scene.rotate(d_rad,0,1,0);
            this.scene.rotate(-d_rad,1,0,0);
            this.scene.scale(1.5,1.0,1.0);
            this.scene.feather.apply();
            this.triangle.display();
            this.scene.popMatrix();
    }
}