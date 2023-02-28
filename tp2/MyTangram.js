import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import {MyTriangle} from "./MyTriangle.js";
import {MyParallelogram} from "./MyParallelogram.js";
import {MyTriangleBig} from "./MyTriangleBig.js";
import {MyTriangleSmall} from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.bigTriangle = new MyTriangleBig(scene);
        this.smallTriangle = new MyTriangleSmall(scene);
	}
	
	display(){
        

        var deg2rad=Math.PI/180.0;
        var a_rad=45.0*deg2rad;
        var b_rad=180.0*deg2rad;
        var c_rad=135.0*deg2rad;
        var cos_a = Math.cos(a_rad);
        var sin_a = Math.sin(a_rad);
        var rot_diamond = [
            cos_a, sin_a, 0.0, 0.0,
            -sin_a, cos_a, 0.0, 0.0,
            0.0,0.0,1.0,0.0,
            0.0,0.0,0.0,1.0
          ]
        var tra_diamond = [
            1.0,0.0,0.0,0.0,
            0.0,1.0,0.0,0.0,
            0.0,0.0,1.0,0.0,
            0.0,1.0,0.0,1.0
        ]
      
          //Square  
          this.scene.pushMatrix();
          this.scene.multMatrix(rot_diamond);
          this.scene.multMatrix(tra_diamond);
          this.diamond.display();
          this.scene.popMatrix();
      
          //Small Triangle on the right of the Square
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,0,0,1);
          this.scene.translate(1,0,0);  
          this.smallTriangle.display();	
          this.scene.popMatrix();
          
          //Parallelogram
          this.scene.pushMatrix();
          this.scene.rotate(b_rad,1,0,0);
          this.scene.rotate(-a_rad,0,0,1);
          this.parallelogram.display();
          this.scene.popMatrix();
      
          //Triangle on the right of the Paralleogram       
          this.scene.pushMatrix();
          this.scene.translate(2*Math.sqrt(2),0,0);
          this.scene.rotate(-a_rad,0,0,1);
          this.triangle.display();
          this.scene.popMatrix();
      
          //Small Triangle below the Square    
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,0,0,1);
          this.scene.translate(-1,0,0);  
          this.smallTriangle.display();	
          this.scene.popMatrix();
      
          //Further right Big Triangle
          this.scene.pushMatrix();
          this.scene.translate(Math.sqrt(8)/2+2*Math.sqrt(2),0,0); 
          this.scene.rotate(c_rad,0,0,1);
          this.bigTriangle.display();	
          this.scene.popMatrix();
      
          //Further left Big Triangle
          this.scene.pushMatrix();
          this.scene.translate(-Math.sqrt(8)/2-Math.sqrt(2),0,0); 
          this.scene.rotate(-c_rad,0,0,1);
          this.bigTriangle.display();	
          this.scene.popMatrix();
      
    }
}