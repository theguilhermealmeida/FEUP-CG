import {CGFobject} from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks) {
                super(scene);

                this.slices = slices;
                this.stacks = stacks;

				this.initBuffers();
}
	
	initBuffers() {


		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var angle_alpha = 2 * Math.PI / this.slices;
		var angle_beta = Math.PI / this.stacks;
		

		for (let i = 0; i <= this.stacks; i++) {
			var beta = angle_beta * i;
			for (let j = 0; j <= this.slices; j++) {
				var alpha = angle_alpha * j;

				var x = Math.sin(beta) * Math.cos(alpha);
				var y = Math.sin(beta) * Math.sin(alpha);
				var z = Math.cos(beta);

				this.vertices.push(x, z, y);

				var normal = [x, y, z];
				var mod = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);

				normal[0] /= mod;
				normal[1] /= mod;
				normal[2] /= mod;

				this.normals.push(normal[0], normal[1], normal[2]);

				if (i < this.stacks && j < this.slices) {
					var a = i * (this.slices + 1) + j;
					var b = a + this.slices + 1;

					this.indices.push(a, b + 1, b);
					this.indices.push(a, a + 1, b+1);
				}
			}
		}

		var incS = 1.0 / this.slices;
		var incT = 1.0 / this.stacks;

		for (let i = 0; i <= this.stacks; i++) {
			for (let j = 0; j <= this.slices; j++) {
				var s = j * incS;
				var t = i * incT;
				this.texCoords.push(-s, t);
			}
		}
	


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

