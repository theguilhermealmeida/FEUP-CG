import { CGFobject } from '../../lib/CGF.js';
import { MySemiSphere } from './MySemiSphere.js';

export class MyNest extends CGFobject {
  constructor(scene, slices, stacks, x, y, z, radius) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.z = z;
    this.eggs = [];

    this.semisphere = new MySemiSphere(scene, slices, stacks, radius);
  }

  addEgg(egg) {
    console.log("Adding egg to nest");
    this.eggs.push(egg);
    var eggPosX = this.x;
    var eggPosY = this.scene.eggY;
    var eggPosZ = this.z;
    switch (this.eggs.length) {
        case 1:
          egg.x = this.x;
          egg.y = this.scene.eggY;
          egg.z = this.z;
          break;
        case 2:
          egg.x = this.x + 1;     
          egg.y = this.scene.eggY;
          egg.z = this.z + 1;
          break;
        case 3:
          egg.x = this.x - 1;
          egg.y = this.scene.eggY;
          egg.z = this.z - 1;
          break;
        case 4:
          egg.x = this.x + 1;
          egg.y = this.scene.eggY;
          egg.z = this.z - 1;
          break;
        case 5:
          egg.x = this.x - 1;
          egg.y = this.scene.eggY;
          egg.z = this.z + 1;
          break;
        default:
          egg.x = this.x;
          egg.y = this.scene.eggY;
          egg.z = this.z;
          break;
        }
  }

  reset() {
    this.eggs = [];
  }


  display() {
    for (const egg of this.eggs) {
      egg.display();
    }

    this.scene.pushMatrix();
      this.scene.scale(1, 0.5, 1);
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI, 1, 0, 0);
      this.scene.nestC.apply();
      this.semisphere.display();
    this.scene.popMatrix();
  }
}
