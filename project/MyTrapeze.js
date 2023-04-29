import {CGFobject} from '../lib/CGF.js';
/**
 * MyTrapeze 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTrapeze extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 1, 0, // 0 - Bottom left vertex
			-1.5, -1, 0, // 1 - Top left vertex
			1.5, -1, 0, // 2 - Top right vertex
			1, 1, 0, // 3 - Bottom right vertex
		];

		// Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 3
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

		this.texCoords = [
			0, 1,
			0, 0,
			3 / 4, 0,
			1, 1
		];

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

