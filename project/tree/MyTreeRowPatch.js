import { CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyBillboard } from '../MyBillboard.js';
/**
 * MyTreeRowPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture1 - First tree texture
 * @param texture2 - Second tree texture
 * @param texture3 - Third tree texture
 */
export class MyTreeRowPatch {
    constructor(scene, texture1, texture2, texture3, scale) {
      this.scene = scene;
      this.texture1 = texture1;
      this.texture2 = texture2;
      this.texture3 = texture3;
      this.textures = [this.texture1, this.texture2, this.texture3];
      this.maxOffset = 2; // Maximum offset value for each tree
      if (scale == null) this.scale = 10;
      else this.scale = scale;
  
      this.trees = [];
      const treePositions = [
        [-30, 0, 0], [-20, 0, 0], [-10, 0, 0],
        [10, 0, 0],  [20, 0, 0],  [30, 0, 0]
      ];
  
      treePositions.forEach(position => {
        const offsetX = Math.random() * this.maxOffset * 2 - this.maxOffset;
        const offsetZ = Math.random() * this.maxOffset * 2 - this.maxOffset;
        const treeTexture = this.getRandomTreeTexture();
        const tree = new MyBillboard(scene, position[0] + offsetX, position[1], position[2] + offsetZ, treeTexture, this.scale);        
        this.trees.push(tree);
      });
    }
  
    getRandomTreeTexture() {
      const randomIndex = Math.floor(Math.random() * this.textures.length);
      console.log(this.textures[randomIndex]);
      return this.textures[randomIndex];
    }
  
    display() {
      for (const tree of this.trees) {
        this.scene.pushMatrix();
          tree.display();
        this.scene.popMatrix();
      }
    }
  }