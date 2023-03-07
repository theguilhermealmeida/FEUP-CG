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
			// front
			-0.5, 0.5, 0.5,	//0
			-0.5, -0.5, 0.5,//1
			0.5, -0.5, 0.5,//2
			0.5, 0.5, 0.5,//3

			// right
			0.5, 0.5, 0.5,//3
			0.5, -0.5, 0.5,//2
			0.5, -0.5, -0.5,//5
			0.5, 0.5, -0.5,//4


			// back 
			0.5, 0.5, -0.5,//4
			0.5, -0.5, -0.5,//5
			-0.5, -0.5, -0.5,//6
			-0.5, 0.5, -0.5,//7

			
			// left
			-0.5, 0.5, -0.5,//7
			-0.5, -0.5, -0.5,//6
			-0.5, -0.5, 0.5,//1
			-0.5, 0.5, 0.5,	//0


			// top
			-0.5, 0.5, -0.5,//7
			-0.5, 0.5, 0.5,	//0
			0.5, 0.5, 0.5,//3
			0.5, 0.5, -0.5,//4


			// bottom
			-0.5, -0.5, 0.5,//1
			-0.5, -0.5, -0.5,//6
			0.5, -0.5, -0.5,//5
			0.5, -0.5, 0.5,//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2, //front 1
			2, 3, 0, //front 2
			4, 5, 6, //right 1
			6, 7, 4, //right 2 
			8, 9, 10, //back 1 
			10, 11, 8, //back 2 
			12, 13, 14, //left 1
			14, 15, 12, //left 2
			16, 17, 18, //top 1
			18, 19, 16, //top 2 
			20, 21, 22, //bottom 1 
			22, 23, 20 //bottom 2 
		];


		this.normals = [
			// front
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			// right
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			// back 
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			// left
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			// top
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			// bottom
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

