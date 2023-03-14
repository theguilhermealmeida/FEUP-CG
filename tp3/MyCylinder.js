import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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

		var angle = 2 * Math.PI / this.slices;
        const incZ = 1.0 / this.stacks;

		// Create vertices, normals and indices
        for (let i = 0; i <= this.stacks; i++) {
            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(j*angle);
                const y = Math.sin(j*angle);
				const z = i * incZ;

                this.vertices.push(x, y, z);

                const normal = [x, y, 0];


				// normalize
				var mod = Math.sqrt(normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2]);

				normal[0] /= mod;
				normal[1] /= mod;
				normal[2] /= mod;

				this.normals.push(normal[0], normal[1], normal[2]);

				// Indices
                if (i < this.stacks && j < this.slices) {
                    const idx0 = j + i * (this.slices + 1);
                    const idx1 = idx0 + 1;
                    const idx2 = idx0 + this.slices + 1;
                    const idx3 = idx2 + 1;

                    this.indices.push(idx0, idx1, idx2);
                    this.indices.push(idx2, idx1, idx3);
                }

        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
    }
}

