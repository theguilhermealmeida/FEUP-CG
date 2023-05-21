import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - x-coordinate of the billboard position
 * @param y - y-coordinate of the billboard position
 * @param z - z-coordinate of the billboard position
 */
export class MyBillboard extends CGFobject {
  constructor(scene, x, y, z, texture, scale) {
    super(scene);
    this.quad = new MyQuad(scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.texture = texture;
    if (scale == null) this.scale = 10;
    else this.scale = scale;
  }
  

  display() {
    const cameraPosition = this.scene.camera.position;
    const billboardToCamera = [cameraPosition[0] - this.x, cameraPosition[1] - this.y, cameraPosition[2] - this.z];

    const angle = Math.atan2(billboardToCamera[0], billboardToCamera[2]);
    const axis = [0, 1, 0]; // Rotate around the y-axis to stay perpendicular to the XZ plane

    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(angle, axis[0], axis[1], axis[2]);
    this.texture.apply();
    this.scene.scale(this.scale, this.scale, this.scale);
    this.quad.display();
    this.scene.popMatrix();

  }
}
