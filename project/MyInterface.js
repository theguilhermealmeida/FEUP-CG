import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayPlane').name('Display Plane');
        this.gui.add(this.scene, 'displayPanorama').name('Display Panorama');
        this.gui.add(this.scene, 'displayPrism').name('Display Prism');
        this.gui.add(this.scene, 'displayDiamond').name('Display Diamond');
        this.gui.add(this.scene, 'displayParallelogram').name('Display Parallelogram');
        this.gui.add(this.scene, 'displayQuad').name('Display Quad');
        this.gui.add(this.scene, 'displayTangram').name('Display Tangram');
        this.gui.add(this.scene, 'displayTriangle').name('Display Triangle');
        this.gui.add(this.scene, 'displayTriangleBig').name('Display Triangle Big');
        this.gui.add(this.scene, 'displayTriangleSmall').name('Display Triangle Small');
        this.gui.add(this.scene, 'displayUnitCube').name('Display Unit Cube');
        this.gui.add(this.scene, 'displayTrapeze').name('Display Trapeze');
        this.gui.add(this.scene, 'displayTrapezeSolid').name('Display Trapeze Solid');
        this.gui.add(this.scene, 'displayBird').name('Display Bird');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        //Checkbox element in GUI

        //Slider element in GUI

        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');

        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        this.initKeys();


        return true;
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard=function(){};
        this.activeKeys = {};
    }
    processKeyDown(event){
        this.activeKeys[event.code]=true
    }
    processKeyUp(event){
        this.activeKeys[event.code]=false
    }
    isKeyPressed(keyCode){
        return this.activeKeys[keyCode] || false ;
    }   


    
}