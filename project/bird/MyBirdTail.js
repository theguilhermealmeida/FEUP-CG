import { CGFobject } from "../../lib/CGF.js";
import { MyCylinder } from "../MyCylinder.js";
import { MyPrism } from "../MyPrism.js";
import { MySphere } from "../MySphere.js";
import { MyTriangle } from "../MyTriangle.js";
/**
 * MyBird 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdTail extends CGFobject {
	constructor(scene) {
		super(scene);
        this.prism1 = new MyPrism(scene,7);
        this.triangle = new MyTriangle(scene);

       
	}
    
	display(){
        

        var deg2rad=Math.PI/180.0;
        var a_rad=45.0*deg2rad;
        var d_rad = 90.0*deg2rad;

        this.scene.pushMatrix();
        this.scene.translate(0.0,1.5,0.0);

         // prism tail
         this.scene.pushMatrix();
         this.scene.translate(-1.1,-1.7,0);
         this.scene.rotate(100*deg2rad, 0,0,1);
         this.scene.rotate(-232*deg2rad, 0,1,0);
         this.scene.brown.apply();
         this.prism1.display();
         this.scene.popMatrix();
      
        // left tail
        this.scene.pushMatrix();
        this.scene.rotate(10*deg2rad,0,1,0);
        this.scene.translate(-2, -2, 0);
        this.scene.rotate(140,0,0,1);
        this.scene.rotate(d_rad, 0,1,0);
        this.scene.scale(0.8,2.0,1.0);
        this.scene.yellow.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // right tail
        this.scene.pushMatrix();
        this.scene.rotate(-10*deg2rad,0,1,0);
        this.scene.translate(-2, -2, 0);
        this.scene.rotate(140,0,0,1);
        this.scene.rotate(-d_rad, 0,1,0);
        this.scene.scale(0.8,2.0,1.0);
        this.scene.yellow.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}