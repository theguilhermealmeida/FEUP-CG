import {CGFobject, CGFtexture} from '../lib/CGF.js';
import {MyQuad} from "./MyQuad.js";


/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */


export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, topTexture, frontTexture, rightTexture, backTexture, leftTexture, bottomTexture) {		
        super(scene);
        this.square = new MyQuad(scene);
        this.textures2 = [];
        this.textures = ['images/'+topTexture, 'images/'+frontTexture, 'images/'+rightTexture,'images/'+ backTexture, 'images/'+leftTexture, 'images/'+bottomTexture];
	}
	
	display(){
          const pi = 3.1415926535897932384626433832795;
        
          var a_rad=90.0*Math.PI/180.0;
          for (let i = 0; i < 6; i++) {
            this.textures2.push(new CGFtexture(this.scene, this.textures[i]));
          }

          //Front 
          this.scene.pushMatrix();
          this.scene.translate(0,0,0.5);
          this.textures2[1].bind();
          this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
          this.square.display();
          this.scene.popMatrix();
      
          //Back
          this.scene.pushMatrix();
          this.scene.translate(0,0,-0.5);
          this.scene.rotate(pi,0,1,0);
          this.textures2[3].bind();
          this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
          this.square.display();
          this.scene.popMatrix();
          
          //Left
          this.scene.pushMatrix();
          this.scene.rotate(a_rad+pi,0,1,0);
          this.scene.translate(0,0,0.5);
          this.textures2[4].bind();
          this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
          this.square.display();
          this.scene.popMatrix();

          //Right
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,0,1,0);
          this.scene.translate(0,0,0.5);
          this.textures2[2].bind();
          this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
          this.square.display();
          this.scene.popMatrix();
          
          //Top
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,-1,0,0);
          this.scene.translate(0,0,0.5);
          this.textures2[0].bind();
          this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
          this.square.display();
          this.scene.popMatrix();

          //Bottom
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,1,0,0);
          this.scene.translate(0,0,0.5);
          this.textures2[5].bind();
          this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
          this.square.display();
          this.scene.popMatrix();
      
          
      
    }
}