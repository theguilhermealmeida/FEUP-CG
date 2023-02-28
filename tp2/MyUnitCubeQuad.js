import {CGFobject} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.square = new MyQuad(scene);
	}
	
	display(){
        
          var a_rad=90.0*Math.PI/180.0;

          //Front 
          this.scene.pushMatrix();
          this.scene.translate(0,0,0.5);
          this.square.display();
          this.scene.popMatrix();
      
          //Back
          this.scene.pushMatrix();
          this.scene.translate(0,0,-0.5);
          this.square.display();
          this.scene.popMatrix();
          
          //Left
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,0,1,0)
          this.scene.translate(0,0,-0.5);
          this.square.display();
          this.scene.popMatrix();

          //Right
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,0,1,0)
          this.scene.translate(0,0,0.5);
          this.square.display();
          this.scene.popMatrix();
          
          //Top
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,1,0,0)
          this.scene.translate(0,0,-0.5);
          this.square.display();
          this.scene.popMatrix();

          //Bottom
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,1,0,0)
          this.scene.translate(0,0,0.5);
          this.square.display();
          this.scene.popMatrix();
      
          
      
    }
}