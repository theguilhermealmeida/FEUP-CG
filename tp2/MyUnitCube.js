import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, 0.5,	//0
			-0.5, -0.5, 0.5,//1
			0.5, -0.5, 0.5,//2
			0.5, 0.5, 0.5,//3
			0.5, 0.5, -0.5,//4
			0.5, -0.5, -0.5,//5
			-0.5, -0.5, -0.5,//6
			-0.5, 0.5, -0.5,//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2, //front 1
			2, 3, 0, //front 2
			3, 2, 5, //right 1
			5, 4, 3, //right 2 
			4, 5, 6, //back 1 
			6, 7, 4, //back 2 
			7, 6, 1, //left 1
			1, 0, 7, //left 2
			7, 0, 3, //top 1
			3, 4, 7, //top 2 
			1, 6, 5, //bottom 1 
			5, 2, 1, //bottom 2 
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

