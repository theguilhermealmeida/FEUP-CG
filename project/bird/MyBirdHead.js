import { CGFobject } from "../../lib/CGF.js";
import { MyCylinder } from "../MyCylinder.js";
import { MyPrism } from "../MyPrism.js";
import { MySphere } from "../MySphere.js";
/**
 * MyBird 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdHead extends CGFobject {
	constructor(scene) {
		super(scene);
        this.prism1 = new MyPrism(scene,7);
        this.prism2 = new MyPrism(scene, 20);
        this.sphere = new MySphere(scene,10, 10, 0);
        this.cylinder = new MyCylinder(scene, 7,5);

       
	}
    

	display(){
        

        var deg2rad=Math.PI/180.0;
        var a_rad=45.0*deg2rad;
        var d_rad = 90.0*deg2rad;
      
        this.scene.pushMatrix();
        this.scene.translate(0.0,1.5,0.0);
          // right eye
          this.scene.pushMatrix();
          this.scene.translate(3.2,0.5,0.4);
          this.scene.scale(0.001,0.001,0.001);
          this.scene.grey.apply();
          this.sphere.display();
          this.scene.popMatrix();

          // left eye
          this.scene.pushMatrix();
          this.scene.translate(3.2,0.5,-0.4);
          this.scene.scale(0.001,0.001,0.001);
          this.scene.grey.apply();
          this.sphere.display();
          this.scene.popMatrix();

        // cylinder 1
          this.scene.pushMatrix();
          this.scene.translate(3,0,0);
          this.scene.rotate(-d_rad, 0,1,0);
          this.scene.rotate(-d_rad, 0,0,1);
          this.scene.feather.apply();
          this.cylinder.display();
          this.scene.popMatrix();

          // prism head
          this.scene.pushMatrix();
          this.scene.translate(3,0,0);
          this.scene.rotate(-d_rad, 0,0,1);
          this.scene.brown.apply();
          this.prism1.display();
          this.scene.popMatrix();

          // cylinder 2
          this.scene.pushMatrix();
          this.scene.translate(2,0,0);
          this.scene.rotate(-d_rad, 0,1,0);
          this.scene.rotate(a_rad, 1,0,0);
          this.scene.rotate(-d_rad, 0,0,1);
          this.scene.feather.apply();
          this.cylinder.display();
          this.scene.popMatrix();

          // cylinder 3
          this.scene.pushMatrix();
          this.scene.translate(0,0.1,0);
          this.scene.translate(2.5,0,0);
          this.scene.rotate(-d_rad, 0,1,0);
          this.scene.rotate(20*deg2rad, 1,0,0);
          this.scene.rotate(-d_rad, 0,0,1);
          this.scene.feather.apply();
          this.cylinder.display();
          this.scene.popMatrix();

          // prism focinho
          this.scene.pushMatrix();
          this.scene.scale(1.3,0.5,0.5);
          this.scene.translate(2.5,0,0);
          this.scene.rotate(-d_rad, 0,0,1);
          this.scene.yellow.apply();
          this.prism2.display();
          this.scene.popMatrix();



        this.scene.popMatrix();
    }
}