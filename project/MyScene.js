import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./bird/MyBird.js";
import { MySphere } from "./MySphere.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./bird/MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./tree/MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./tree/MyTreeRowPatch.js";


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

    // local variables
    this.numberOfEggs = 5;
    this.eggY = 0.7;
    this.eggs = [];
    this.initEggs();

    this.birdHeight = 10;
    this.treeScale = 12;

    this.turn = false;
    this.move = false;

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.bird = new MyBird(this, 0, 0, 0, this.birdHeight, 0);
    this.sphere = new MySphere(this, 30, 30, 0);
    this.terrain = new MyTerrain(this, 30);
    this.nest = new MyNest(this, 10, 5, -80, 4.5, -20, 4);
    this.billboard = new MyBillboard(this, 0, 0, 0);

    this.objects = [this.plane, this.panorama, this.bird, this.sphere, this.terrain];
    this.objectIDs = { 'Plane': 0, 'Panorama': 1, 'Bird': 2, 'Sphere': 3, 'Terrain': 4 };

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.displayPanorama = false;
    this.displayBird = false;
    this.displaySphere = false;
    this.displayTerrain = false;


    // textures and materials
    this.testShaders

    this.enableTextures(true);

    this.panoramaC = new CGFappearance(this);
    this.texturePan = new CGFtexture(this, "images/panorama4.jpg");
    this.panoramaC.setTexture(this.texturePan);
    this.panorama = new MyPanorama(this, this.texturePan);

    this.tree = new CGFappearance(this);
    this.treeTex = new CGFtexture(this, "images/tree.png");
    this.tree.setTexture(this.treeTex);

    this.tree2 = new CGFappearance(this);
    this.treeTex2 = new CGFtexture(this, "images/tree2.png");
    this.tree2.setTexture(this.treeTex2);
    
    this.tree3 = new CGFappearance(this);
    this.treeTex3 = new CGFtexture(this, "images/tree3.png");
    this.tree3.setTexture(this.treeTex3);

    this.treeGroupPatch = new MyTreeGroupPatch(this, this.tree, this.tree2, this.tree3, this.treeScale);
    this.treeRowPatch = new MyTreeRowPatch(this, this.tree, this.tree2, this.tree3, this.treeScale);

    this.earth = new CGFappearance(this);
    this.earthT = new CGFtexture(this, "images/earth.jpg");
    this.earth.setTexture(this.earthT);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.brown = new CGFappearance(this);
    this.brown.setAmbient(0.5, 0.5, 0.5, 1);
    this.brown.setDiffuse(0.6, 0.6, 0.6, 1);
    this.brown.setSpecular(0.5, 0.5, 0.5, 1);
    this.brownTexture = new CGFtexture(this, "images/brown.png");
    this.brown.setTexture(this.brownTexture);

    this.red = new CGFappearance(this);
    this.redt = new CGFtexture(this, "images/red.png");
    this.red.setTexture(this.redt);

    this.feather = new CGFappearance(this);
    this.feather.setAmbient(0.5, 0.5, 0.5, 1);
    this.feather.setDiffuse(0.6, 0.6, 0.6, 1);
    this.feather.setSpecular(0.5, 0.5, 0.5, 1);
    this.featherT = new CGFtexture(this, "images/feather2.png");
    this.feather.setTexture(this.featherT);

    this.grey = new CGFappearance(this);
    this.greyT = new CGFtexture(this, "images/grey.png");
    this.grey.setTexture(this.greyT);

    this.yellow = new CGFappearance(this);
    this.yellow.setAmbient(0.4, 0.4, 0.4, 1);
    this.yellow.setDiffuse(0.6, 0.6, 0.6, 1);
    this.yellow.setSpecular(0.9, 0.9, 0.9, 1);
    this.yellowT = new CGFtexture(this, "images/yellow.png");
    this.yellow.setTexture(this.yellowT);

    this.eggC = new CGFappearance(this);
    this.eggC.setAmbient(0.4, 0.4, 0.4, 1);
    this.eggC.setDiffuse(0.6, 0.6, 0.6, 1);
    this.eggC.setSpecular(0.9, 0.9, 0.9, 1);
    this.eggT = new CGFtexture(this, "images/eggtex.png");
    this.eggC.setTexture(this.eggT);

    this.nestC = new CGFappearance(this);
    this.nestT = new CGFtexture(this, "images/nest.png");
    this.nestC.setTexture(this.nestT);

    this.setUpdatePeriod(30);

  }

  randomInt(min, max) {
    return Math.random() * (max - min) + min;
  }

  initEggs() {

    for (let i = 0; i < this.numberOfEggs; i++) {
      var x = this.randomInt(85, 110);
      var z = this.randomInt(-30, 20);

      const egg = new MyBirdEgg(this, 20, 20, 1.25, x, this.eggY, z, 0.7);
      this.eggs.push(egg);
    }
  }

  resetEggs() {
    this.eggs = [];
    this.initEggs();
  }

  checkEggNestCollision() {
    for (const egg of this.eggs) {
      console.log(egg.x, egg.z, this.nest.x, this.nest.z, this.bird.X, this.bird.Z);
      if (egg.x > this.nest.x - 5 && egg.x < this.nest.x + 5 && egg.z > this.nest.z - 5 && egg.z < this.nest.z + 5) {
        this.nest.addEgg(egg);
        this.eggs.splice(this.eggs.indexOf(egg), 1);
      }
    }
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


  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.move = true;
      this.bird.accelerate(this.move);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyS")) {
      this.move = false;
      this.bird.accelerate(this.move);
      text += " S ";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      this.turn = true;
      this.bird.turn(this.turn);
      text += " A ";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyD")) {
      this.turn = false;
      this.bird.turn(this.turn);
      text += " D ";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      this.bird.reset();
      this.resetEggs();
      this.nest.reset();
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      this.bird.down();
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyO")) {
      text += " O ";
      this.bird.drop();
      keysPressed = true;
    }

    if (keysPressed)
      console.log(text);
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
    if (this.displayPlane) {
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0, -100, 0);
      this.scale(400, 400, 400);
      this.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();
    }

    if (this.displayPanorama) {
      this.panorama.display();
    }

    if (this.displaySphere) {
      this.earth.apply();
      this.sphere.display();
    }

    if (this.displayTerrain) {
      this.terrain.display();
      for (const egg of this.eggs) {
        egg.display();
      }
      this.nest.display();
      this.pushMatrix();
        this.translate(-40, this.treeScale / 2, 60);
        this.treeGroupPatch.display();
      this.popMatrix();


      this.pushMatrix();
        this.translate(0, this.treeScale / 2, 30);
        this.treeRowPatch.display();
      this.popMatrix();
      
      this.pushMatrix();
        this.translate(70, this.treeScale / 2, 30);
        this.treeRowPatch.display();
      this.popMatrix();
    }

    if (this.displayBird) {
      this.pushMatrix();
      this.bird.display();
      this.popMatrix();
    }

    
  }

  update(t) {
    this.checkKeys();
    this.bird.update(t);
  }
}
