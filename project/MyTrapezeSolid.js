import { CGFobject } from '../lib/CGF.js';
import { MyTrapeze } from './MyTrapeze.js';
import { MyDiamond } from './MyDiamond.js';

/**
 * MyTrapezeSolid
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTrapezeSolid extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		// Create four trapeze objects for the sides
		this.trapeze1 = new MyTrapeze(this.scene);
		this.trapeze2 = new MyTrapeze(this.scene);
		this.trapeze3 = new MyTrapeze(this.scene);
		this.trapeze4 = new MyTrapeze(this.scene);

		// Create two square objects for the top and bottom sides
		this.squareTop = new MyDiamond(this.scene);
		this.squareBottom = new MyDiamond(this.scene);

		// Set the transformation matrices for positioning the sides and squares
	}

	display() {
        var deg2rad=Math.PI/180.0;
        var a_rad=45.0*deg2rad;
        var d_rad=90.0*deg2rad;
        var b_rad=180.0*deg2rad;
        var c_rad=135.0*deg2rad;
        var cos_a = Math.cos(a_rad);
        var sin_a = Math.sin(a_rad);
		// Display the four trapeze objects for the sides
        // this.scene.pushMatrix();
        //   this.scene.rotate(a_rad,0,0,1);
        //   this.scene.translate(-1,0,0);  
        //   this.smallTriangle.texCoords = [
        //     0.5,0.5,
        //     0.25,0.75,
        //     0.75,0.75
        //   ]
        //   this.smallTriangle.updateTexCoordsGLBuffers();
        //   this.smallTriangle.display();	
        //   this.scene.popMatrix();
      
        //   //Further right Big Triangle
        //   this.scene.pushMatrix();
        //   this.scene.translate(Math.sqrt(8)/2+2*Math.sqrt(2),0,0); 
        //   this.scene.rotate(c_rad,0,0,1);
        //   this.bigTriangle.texCoords = [1,1,1,0,0.5,0.5];
        //   this.bigTriangle.updateTexCoordsGLBuffers();
        //   this.bigTriangle.display();	
        //   this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.rotate(d_rad,0,1,0);
        this.scene.translate(0,0,1.5);
        // this.scene.translate(0,-1.5,0);
        this.scene.rotate(-10*deg2rad,1,0,0);
        this.scene.translate(0,1.5,0);
        this.trapeze1.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.translate(0,0,1.5);
        // this.scene.translate(0,-2,0);
        this.scene.rotate(-10*deg2rad,1,0,0);
        this.scene.translate(0,1.5,0);
        this.trapeze2.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.rotate(b_rad,0,1,0);
        this.scene.translate(0,0,1.5);
        this.trapeze3.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.rotate(-d_rad,0,1,0);
        this.scene.translate(0,0,1.5);
        this.trapeze4.display();
        this.scene.popMatrix();
    
        // Display the square objects for the top and bottom sides
        // this.scene.pushMatrix();
        // this.squareTop.display();
        // this.scene.popMatrix();
    
        // this.scene.pushMatrix();
        // this.squareBottom.display();
        // this.scene.popMatrix();
    }
}