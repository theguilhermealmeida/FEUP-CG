import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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

		var angle = 0;
		var deltaAngle = 2 * Math.PI / this.slices;
        const incZ = 1.0 / this.stacks;

		// Create vertices and normals
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(angle);
                const y = Math.sin(angle);
				const z = i * incZ;

                this.vertices.push(x, y, z);
				this.vertices.push(Math.cos(angle + deltaAngle), Math.sin(angle + deltaAngle), z);
				this.vertices.push(x,y, z + incZ);
				this.vertices.push(Math.cos(angle + deltaAngle), Math.sin(angle + deltaAngle), z + incZ);


				const normal = [x + Math.cos(angle + deltaAngle), y + Math.sin(angle + deltaAngle), 0];

				// normalize
				var mod = Math.sqrt(normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2]);

				normal[0] /= mod;
				normal[1] /= mod;
				normal[2] /= mod;

				this.normals.push(normal[0], normal[1], normal[2]);
				this.normals.push(normal[0], normal[1], normal[2]);
				this.normals.push(normal[0], normal[1], normal[2]);
				this.normals.push(normal[0], normal[1], normal[2]);

				// Indices
                const idx0 = this.vertices.length / 3 - 4;
				const idx1 = idx0 + 1;
                const idx2 = idx0 + 2;
                const idx3 = idx0 + 3;

                if (i < this.stacks && j < this.slices) {
                    this.indices.push(idx0, idx1, idx2);
                    this.indices.push(idx2, idx1, idx3);
                }

				angle += deltaAngle;
			}
        }


		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

