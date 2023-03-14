import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import {MyTriangle} from "./MyTriangle.js";
import {MyParallelogram} from "./MyParallelogram.js";
import {MyTriangleBig} from "./MyTriangleBig.js";
import {MyTriangleSmall} from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.bigTriangle = new MyTriangleBig(scene);
        this.smallTriangle = new MyTriangleSmall(scene);
        
        // this.customMaterialValues = {
        //   'Ambient': '#0000ff',
        //   'Diffuse': '#ff0000',
        //   'Specular': '#000000',
        //   'Shininess': 10
        // }

        this.coloursTangram();

	}

  hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
    }

  //   updateCustomMaterial() {
  //     this.scene.customMaterial.setAmbient(...this.hexToRgbA(this.customMaterialValues['Ambient']));
  //     this.scene.customMaterial.setDiffuse(...this.hexToRgbA(this.customMaterialValues['Diffuse']));
  //     this.scene.customMaterial.setSpecular(...this.hexToRgbA(this.customMaterialValues['Specular']));

  //     this.scene.customMaterial.setShininess(this.customMaterialValues['Shininess']);

  // };

  coloursTangram(){
    this.materials = [];
      
    this.scene.blue = new CGFappearance(this.scene);
    this.scene.blue.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.scene.blue.setDiffuse(0.2, 0.2, 0.8, 1.0);
    this.scene.blue.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.scene.blue.setShininess(50.0);

    this.scene.red = new CGFappearance(this.scene);
    this.scene.red.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.scene.red.setDiffuse(0.8, 0.2, 0.2, 1.0);
    this.scene.red.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.scene.red.setShininess(50.0);

    this.scene.green = new CGFappearance(this.scene);
    this.scene.green.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.scene.green.setDiffuse(0.2, 0.8, 0.2, 1.0);
    this.scene.green.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.scene.green.setShininess(50.0);

    this.scene.purple = new CGFappearance(this.scene);
    this.scene.purple.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.scene.purple.setDiffuse(0.8, 0.2, 0.8, 1.0);
    this.scene.purple.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.scene.purple.setShininess(50.0);

    this.scene.yellow = new CGFappearance(this.scene);
    this.scene.yellow.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.scene.yellow.setDiffuse(0.8, 0.8, 0.2, 1.0);
    this.scene.yellow.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.scene.yellow.setShininess(50.0);

    this.scene.pink = new CGFappearance(this.scene);
    this.scene.pink.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.scene.pink.setDiffuse(0.8, 0.4, 0.6, 1.0);
    this.scene.pink.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.scene.pink.setShininess(50.0);

    this.scene.orange = new CGFappearance(this.scene);
    this.scene.orange.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.scene.orange.setDiffuse(0.8, 0.4, 0.2, 1.0);
    this.scene.orange.setSpecular(1.0, 1.0, 1.0, 1.0);
    this.scene.orange.setShininess(50.0);

    // this.scene.customMaterial = new CGFappearance(this);
    // this.updateCustomMaterial();
    this.materials = [this.scene.blue, this.scene.red, this.scene.green, this.scene.purple, this.scene.yellow, this.scene.pink, this.scene.orange]; 

  }

  enableNormalViz() {
    this.diamond.enableNormalViz();
    this.triangle.enableNormalViz();
    this.parallelogram.enableNormalViz();
    this.bigTriangle.enableNormalViz();
    this.smallTriangle.enableNormalViz(); 
  }

  disableNormalViz() {
    this.diamond.disableNormalViz();
    this.triangle.disableNormalViz();
    this.parallelogram.disableNormalViz();
    this.bigTriangle.disableNormalViz();
    this.smallTriangle.disableNormalViz(); 
  }
	
	display(){
        

        var deg2rad=Math.PI/180.0;
        var a_rad=45.0*deg2rad;
        var b_rad=180.0*deg2rad;
        var c_rad=135.0*deg2rad;
        var cos_a = Math.cos(a_rad);
        var sin_a = Math.sin(a_rad);
        var rot_diamond = [
            cos_a, sin_a, 0.0, 0.0,
            -sin_a, cos_a, 0.0, 0.0,
            0.0,0.0,1.0,0.0,
            0.0,0.0,0.0,1.0
          ]
        var tra_diamond = [
            1.0,0.0,0.0,0.0,
            0.0,1.0,0.0,0.0,
            0.0,0.0,1.0,0.0,
            0.0,1.0,0.0,1.0
        ]
      
          //Square  
          this.scene.pushMatrix();
          this.scene.multMatrix(rot_diamond);
          this.scene.multMatrix(tra_diamond);
          this.diamond.display();
          this.scene.popMatrix();
      
          //Small Triangle on the right of the Square
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,0,0,1);
          this.scene.translate(1,0,0);  
          this.materials[3].apply();
          this.smallTriangle.display();	
          this.scene.popMatrix();
          
          //Parallelogram
          this.scene.pushMatrix();
          this.scene.rotate(b_rad,1,0,0);
          this.scene.rotate(-a_rad,0,0,1);
          this.materials[4].apply();
          this.parallelogram.display();
          this.scene.popMatrix();
      
          //Triangle on the right of the Paralleogram       
          this.scene.pushMatrix();
          this.scene.translate(2*Math.sqrt(2),0,0);
          this.scene.rotate(-a_rad,0,0,1);
          this.materials[5].apply();
          this.triangle.display();
          this.scene.popMatrix();
      
          //Small Triangle below the Square    
          this.scene.pushMatrix();
          this.scene.rotate(a_rad,0,0,1);
          this.scene.translate(-1,0,0);  
          this.materials[1].apply();
          this.smallTriangle.display();	
          this.scene.popMatrix();
      
          //Further right Big Triangle
          this.scene.pushMatrix();
          this.scene.translate(Math.sqrt(8)/2+2*Math.sqrt(2),0,0); 
          this.scene.rotate(c_rad,0,0,1);
          this.materials[6].apply();
          this.bigTriangle.display();	
          this.scene.popMatrix();
      
          //Further left Big Triangle
          this.scene.pushMatrix();
          this.scene.translate(-Math.sqrt(8)/2-Math.sqrt(2),0,0); 
          this.scene.rotate(-c_rad,0,0,1);
          this.materials[0].apply();
          this.bigTriangle.display();	
          this.scene.popMatrix();
      
    }
}