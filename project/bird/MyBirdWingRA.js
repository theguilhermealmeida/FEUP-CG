import { CGFobject, CGFappearance, CGFtexture} from "../../lib/CGF.js";
import { MyQuad } from "../MyQuad.js";
/**
 * MyBird 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdWingRA extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(scene);

       
	}


	display(){
        

        var deg2rad=Math.PI/180.0;
        var b_rad=180.0*deg2rad;
        var d_rad = 90.0*deg2rad;
      

            // right wing

            this.scene.pushMatrix();
            this.scene.translate(0.0,0.0,1.0);
            this.scene.rotate(-b_rad,0,0,1);
            this.scene.rotate(-d_rad,0,1,0);
            this.scene.rotate(d_rad,1,0,0);
            this.scene.scale(2.0,2.0,1.0);
            this.scene.feather.apply();
            this.quad.display();
            this.scene.popMatrix();
        
    }
}