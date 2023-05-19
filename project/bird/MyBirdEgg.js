import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyBirdEgg extends CGFobject {
  constructor(scene, slices, stacks, enlongationFactor, x, y, z, radius) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.enlongationFactor = enlongationFactor;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx;
    this.vy;
    this.vz;

    this.texCoords = [];

    this.sphere = new MySphere(scene, slices, stacks, 0, radius);
  }

  


  display() {
    this.scene.pushMatrix();
      this.scene.scale(1,this.enlongationFactor,1);
      this.scene.translate(this.x, this.y, this.z);
      this.scene.eggC.apply();
      this.sphere.display();
    this.scene.popMatrix();
  }
}
