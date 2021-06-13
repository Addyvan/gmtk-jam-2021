import bl from "blengine";
import * as THREE from "three";
import State from "../State";
import loader from "../loader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import createLights from "../tasks/createLights";

import gameManager, {Timer} from "../GameManager";

let scene : THREE.Scene;
let camera : THREE.PerspectiveCamera;
let controls : OrbitControls;

const initPreviewState = () => {
    camera = bl.camera.clone();

    camera.position.set(0, 7.5, 10);
    camera.lookAt(0,0,0);
    scene = new THREE.Scene();

    controls = new OrbitControls( camera, bl.renderer.domElement );

    createLights(scene);
}

const update = (dt : number) => {
    controls.update();

    let elem : any = document.getElementById("preview-timer");
    if (elem !== undefined && elem !== null) {
        elem.value = ((gameManager.timer.end - gameManager.timer.time) / gameManager.timer.end) * 100;
    }
    
}

const render = (dt : number) => {
    bl.renderer.render(scene, camera);
}

const transitionIn = () => {
    // hide ui
    let elem = document.getElementById("preview");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "block";
    }

    console.log(elem);

    gameManager.timer = new Timer(7.5);

    scene.add(gameManager.currentReference);

    if (gameManager.currentLevelIndex > 0) {
        let elem = document.getElementById("preview-tutorial");
        if (elem !== undefined && elem !== null) {
            elem.style.display = "none";
        }
    }
}

const transitionOut = () => {
    // hide ui
    let elem = document.getElementById("preview");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }

    scene.remove(gameManager.currentReference);
}

const PreviewState = new State(
    update, 
    render,
    transitionIn,
    transitionOut
    );

export default PreviewState;

export {
    initPreviewState
};
