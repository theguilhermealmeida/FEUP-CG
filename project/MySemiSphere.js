import { CGFobject } from '../lib/CGF.js';
/**
 * MySemiSphere 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySemiSphere extends CGFobject {
	constructor(scene, slices, stacks, radius) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.texCoords = [];
		if (radius == null) this.radius = 200;
		else this.radius = radius;

		this.initBuffers();
	}

	initBuffers() {


		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var angle_alpha = 2 * Math.PI / this.slices;
		var angle_beta = Math.PI / this.stacks / 2;


		for (let i = 0; i <= this.stacks; i++) {
			var beta = angle_beta * i;
			for (let j = 0; j <= this.slices; j++) {
				var alpha = angle_alpha * j;

				var x = Math.sin(beta) * Math.cos(alpha);
				var y = Math.cos(beta);
				var z = Math.sin(beta) * Math.sin(alpha);

				this.vertices.push(x * this.radius, y * this.radius, z * this.radius);

				var normal = [x, y, z];
				var mod = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);

				normal[0] /= mod;
				normal[1] /= mod;
				normal[2] /= mod;

				this.normals.push(normal[0], normal[1], normal[2]);
				this.normals.push(-normal[0], -normal[1], -normal[2]);

				if (i < this.stacks && j < this.slices) {
					var a = i * (this.slices + 1) + j;
					var b = a + this.slices + 1;

					this.indices.push(b, b + 1, a);
					this.indices.push(b + 1, a + 1, a);
					this.indices.push(a, a + 1, b + 1);
					this.indices.push(a, b + 1, b);
				}
			}
		}

		// var incS = 1.0 / this.slices;
		// var incT = 1.0 / this.stacks;

		// for (let i = 0; i <= this.stacks; i++) {
		// 	for (let j = 0; j <= this.slices; j++) {
		// 		var s = j * incS;
		// 		var t = 1 - i / this.stacks; // Updated texture coordinate calculation
		// 		this.texCoords.push(s, t);
		// 	}
		// }

		var incS = 1.0 / this.slices;
		var incT = 1.0 / (2 * this.stacks); // Divide the stacks by 2 for the top and bottom hemispheres

		for (let i = 0; i <= this.stacks; i++) {
			for (let j = 0; j <= this.slices; j++) {
				var s = j * incS;

				// For the top hemisphere, use the original calculation
				var tTop = i * incT;
				this.texCoords.push(s, tTop);

				// For the bottom hemisphere, adjust the t coordinate to start from the bottom
				var tBottom = (i + this.stacks) * incT;
				this.texCoords.push(s, tBottom);
			}
		}


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}

