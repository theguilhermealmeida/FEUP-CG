import {CGFobject, CGFappearance} from '../lib/CGF.js';
import {MySphere} from './MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
                super(scene);

				this.texture = texture;

				this.initBuffers();
}
	
	initBuffers() {

		this.sphereMaterial = new CGFappearance(this.scene);
		this.sphereMaterial.setAmbient(0.9, 0.9, 0.9, 1);
		this.sphereMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.sphereMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.sphereMaterial.setShininess(10.0);
		this.sphereMaterial.setTexture(this.texture);
		this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		// this.primitiveType = this.scene.gl.TRIANGLES;

		// this.initGLBuffers();
	}

	display() {
		this.sphere = new MySphere(this.scene, 30, 30, 1);	
		this.sphereMaterial.apply();
		this.sphere.display();
	}
}

