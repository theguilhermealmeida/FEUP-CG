import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama} from "./MyPanorama.js";
import { MyPrism} from "./MyPrism.js";
import { MyDiamond} from "./MyDiamond.js";
import { MyParallelogram} from "./MyParallelogram.js";
import { MyQuad} from "./MyQuad.js";
import { MyTangram} from "./MyTangram.js";
import { MyTriangle} from "./MyTriangle.js";
import { MyTriangleBig} from "./MyTriangleBig.js";
import { MyTriangleSmall} from "./MyTriangleSmall.js";
import { MyUnitCube} from "./MyUnitCube.js";
import { MyTrapeze} from "./MyTrapeze.js";
import { MyTrapezeSolid} from "./MyTrapezeSolid.js";
import { MyBird } from "./bird/MyBird.js";
import { MySphere } from "./MySphere.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.prism = new MyPrism(this, 5, 5);
    this.diamond = new MyDiamond(this);
    this.parallelogram = new MyParallelogram(this);
    this.quad = new MyQuad(this);
    this.tangram = new MyTangram(this);
    this.triangle = new MyTriangle(this);
    this.triangleBig = new MyTriangleBig(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.unitCube = new MyUnitCube(this);
    this.trapeze = new MyTrapeze(this);
    this.trapezeSolid = new MyTrapezeSolid(this);
    this.bird = new MyBird(this);
    this.sphere = new MySphere(this, 30, 30, 1);



    this.objects = [this.plane, this.panorama, this.prism, this.diamond, this.parallelogram, this.quad, this.tangram, this.triangle, this.triangleBig, this.triangleSmall, this.unitCube, this.trapeze, this.bird, this.sphere];
    this.objectIDs = { 'Plane': 0 , 'Panorama': 1, 'Prism': 2, 'Diamond' : 3, 'Parallelogram' : 4, 'Quad' : 5, 'Tangram' : 6, 'Triangle' : 7, 'TriangleBig' : 8, 'TriangleSmall' : 9, 'UnitCube' : 10 , 'Trapeze' : 11, 'Bird' : 12, 'Sphere' : 13} 
    
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displayPlane = false;
    this.displayPanorama = false;
    this.displayPrism = false;
    this.displayDiamond = false;
    this.displayParallelogram = false;
    this.displayQuad = false;
    this.displayTangram = false;
    this.displayTriangle = false;
    this.displayTriangleBig = false;
    this.displayTriangleSmall = false;
    this.displayUnitCube = false;
    this.displayTrapeze = false;
    this.displayTrapezeSolid = false;
    this.displayBird = true;
    this.displaySphere = false;

    this.enableTextures(true);

    this.texturePan = new CGFtexture(this, "images/panorama4.jpg");
    this.panorama = new MyPanorama(this, this.texturePan);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.brown = new CGFappearance(this);
    this.brown.setAmbient(0.4, 0.4, 0.4, 1);
    this.brown.setDiffuse(0.6, 0.6, 0.6, 1);
    this.brown.setSpecular(0.1, 0.1, 0.1, 1);
    this.brownTexture = new CGFtexture(this, "images/brown.png");
    this.brown.setTexture(this.brownTexture);

    this.red = new CGFappearance(this);
    this.redt = new CGFtexture(this, "images/red.png");
    this.red.setTexture(this.redt);

    this.feather = new CGFappearance(this);
    this.feather.setAmbient(0.4, 0.4, 0.4, 1);
    this.feather.setDiffuse(0.6, 0.6, 0.6, 1);
    this.feather.setSpecular(0.1, 0.1, 0.1, 1);
    this.featherT = new CGFtexture(this, "images/feather2.png");
    this.feather.setTexture(this.featherT);
    
    this.grey = new CGFappearance(this);
    this.greyT = new CGFtexture(this, "images/grey.png");
    this.grey.setTexture(this.greyT);

    this.yellow = new CGFappearance(this);
    this.yellowT = new CGFtexture(this, "images/yellow.png");
    this.yellow.setTexture(this.yellowT);

  
  }
  initLights() {
    this.lights[0].setPosition(5, 5, 5, 1);
    this.lights[0].setAmbient(0.7, 0.7, 0.7, 1.0);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
    if (this.displayPlane){
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
    }

    if (this.displayPanorama) {
      // this.sphereMaterial.apply();
      this.panorama.display();
    }

    if (this.displayPrism) {
      this.prism.display();
    }

    if (this.displayDiamond) {
      this.diamond.display();
    }

    if (this.displayParallelogram) {
      this.parallelogram.display();
    }

    if (this.displayQuad) {
      this.quad.display();
    }

    if (this.displayTangram) {
      this.tangram.display();
    }

    if (this.displayTriangle) {
      this.triangle.display();
    }

    if (this.displayTriangleBig) {
      this.triangleBig.display();
    }

    if (this.displayTriangleSmall) {
      this.triangleSmall.display();
    }
    
    if (this.displayUnitCube) {
      this.unitCube.display();
    }

    if (this.displayTrapeze) {
      this.trapeze.display();
    }

    if (this.displayTrapezeSolid) {
      this.trapezeSolid.display();
    }
     
    if (this.displayBird) {
      this.pushMatrix();
      this.translate(0,5,0);
      this.bird.display();
      this.popMatrix();
    }

    if (this.displaySphere) {
      this.sphere.display();
    }



    // ---- END Primitive drawing section
  }
}
