import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import {MyPlane} from './MyPlane.js';

/**
* MyTerrain
* @constructor
 * @param scene - Reference to MyScene object
 * @param nDivs - number of divisions in both directions of the surface
 * @param minS - minimum texture coordinate in S
 * @param maxS - maximum texture coordinate in S
 * @param minT - minimum texture coordinate in T
 * @param maxT - maximum texture coordinate in T
*/
export class MyTerrain extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		
		this.plane = new MyPlane(scene, 20);

		this.mountainMaterial = new CGFappearance(this.scene);

		this.mountainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.mountainMaterial.setTexture(this.mountainTexture);
        this.mountainMaterial.setTextureWrap('REPEAT', 'REPEAT');

		this.mountainHeightmap = new CGFtexture(this.scene, "images/heightmap3.jpg");
        this.mountainGradient = new CGFtexture(this.scene, "images/altimetry.png");

        this.mountainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.mountainShader.setUniformsValues({ uSampler2: 1 , uSampler3: 2});
        
	}

	display() {
		this.scene.pushMatrix();

            // ---- set mountain shader as active shader
            this.scene.setActiveShader(this.mountainShader);

            // ---- bind additional texture to texture unit 1
            this.mountainHeightmap.bind(1);
            this.mountainGradient.bind(2);

            // ---- display
            this.mountainMaterial.apply();
            this.scene.translate(0,-36,0);
            this.scene.scale(400,400,400);
            this.scene.rotate(-Math.PI/2.0,1,0,0);
            this.plane.display();
            
            // ---- set default shader as active shader
            this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
	}
	

}


