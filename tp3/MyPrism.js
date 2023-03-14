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

        const ang = 2 * Math.PI / this.slices;
        const incZ = 1.0 / this.stacks;

		// Create vertices
        for (let i = 0; i <= this.stacks; i++) {
            const z = i * incZ;
            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(j * ang);
                const y = Math.sin(j * ang);
                this.vertices.push(x, y, z);
				const normalAngle = Math.PI / 2 - Math.atan2(y, x);
				this.normals.push(Math.cos(normalAngle), Math.sin(normalAngle), 0);
            }
        }

        // Create indices for lateral faces
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const a = i * (this.slices + 1) + j;
                const b = a + 1;
                const c = (i + 1) * (this.slices + 1) + j;
                const d = c + 1;
                this.indices.push(a, b, c);
                this.indices.push(d, c, b);
			}
		}


		// Create normals for each vertex
		// for (let i = 0; i <= this.stacks; i++) {
		// 	for (let j = 0; j <= this.slices; j++) {
		// 		const x = Math.cos(j * ang);
		// 		const y = Math.sin(j * ang);
		// 		const normal = [x, y, 0];
		// 		this.normals.push(normal[0]);
		// 		this.normals.push(normal[1]);
		// 		this.normals.push(normal[2]);
		// 	}
		// }
	
		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

