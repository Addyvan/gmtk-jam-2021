import bl from "blengine";
import * as THREE from "three";
import State from "../State";
import loader from "../loader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import createLights from "../tasks/createLights";
import renderText from "../tasks/renderText";

let scene : THREE.Scene;
let camera : THREE.PerspectiveCamera;
let controls : OrbitControls;
let g1 : any;
let container : any = {};

const initScoreScreenState = () => {

    let elem = document.getElementById("score");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }

    camera = bl.camera.clone();

    camera.position.set(0, 20, 20);
    scene = new THREE.Scene();

    let modelA = loader.models["level1.glb"].gltf.scene.clone();
    modelA.scale.set(3,3,3);
    scene.add(modelA);
    modelA.position.set(-10, 0, 0);

    let modelB = loader.models["level1.glb"].gltf.scene.clone();
    modelB.scale.set(3,3,3);

    modelB.position.set(10, 0, 0);
    scene.add(modelB);


    controls = new OrbitControls( camera, bl.renderer.domElement );

    createLights(scene);

    g1 = new THREE.Group();
    renderText("Your Model", new THREE.Vector3(-10, 8, 0), 0.01, scene, container, "t1");
    renderText("Reference Model", new THREE.Vector3(10, 8, 0), 0.01, scene, container, "t2");
    
    scene.add(g1);
}

const update = (dt : number) => {
    if (container["t1"] !== undefined) {
        // container["t1"].lookAt(camera);
        let dirVec = new THREE.Vector3(0, -1, 0);
        let forwardVec : any = dirVec.applyQuaternion(camera.quaternion);
        forwardVec = new THREE.Vector2(forwardVec.x, forwardVec.z).normalize();
        forwardVec = new THREE.Vector3(forwardVec.x, 0, forwardVec.y);
        forwardVec.y = 0;
        let orientationTarget : number = 0;

        // case 1
        if (forwardVec.x < 0 && forwardVec.z > 0) {
            orientationTarget = 2 * Math.PI - Math.atan( Math.abs(forwardVec.x) / forwardVec.z);
        }

        // case 2
        if (forwardVec.x > 0 && forwardVec.z > 0) {
            orientationTarget = Math.atan(forwardVec.x / forwardVec.z);
        }

        // case 3
        if (forwardVec.x < 0 && forwardVec.z < 0) {
            orientationTarget = Math.PI  + Math.atan(Math.abs(forwardVec.x / forwardVec.z));
        }

        // case 4
        if (forwardVec.x > 0 && forwardVec.z < 0) {
            orientationTarget = Math.PI - Math.atan(forwardVec.x / Math.abs(forwardVec.z));
        }

        container["t1"].rotation.y = orientationTarget;
    }

    if (container["t2"] !== undefined) {
        let dirVec = new THREE.Vector3(0, -1, 0);
        let forwardVec : any = dirVec.applyQuaternion(camera.quaternion);
        forwardVec = new THREE.Vector2(forwardVec.x, forwardVec.z).normalize();
        forwardVec = new THREE.Vector3(forwardVec.x, 0, forwardVec.y);
        forwardVec.y = 0;
        let orientationTarget : number = 0;

        // case 1
        if (forwardVec.x < 0 && forwardVec.z > 0) {
            orientationTarget = 2 * Math.PI - Math.atan( Math.abs(forwardVec.x) / forwardVec.z);
        }

        // case 2
        if (forwardVec.x > 0 && forwardVec.z > 0) {
            orientationTarget = Math.atan(forwardVec.x / forwardVec.z);
        }

        // case 3
        if (forwardVec.x < 0 && forwardVec.z < 0) {
            orientationTarget = Math.PI  + Math.atan(Math.abs(forwardVec.x / forwardVec.z));
        }

        // case 4
        if (forwardVec.x > 0 && forwardVec.z < 0) {
            orientationTarget = Math.PI - Math.atan(forwardVec.x / Math.abs(forwardVec.z));
        }

        container["t2"].rotation.y = orientationTarget;
    }
    
}

const render = (dt : number) => {
    bl.renderer.render(scene, camera);
}

const transitionIn = () => {
    // hide ui
    let elem = document.getElementById("score");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "block";
    }

}

const transitionOut = () => {
    // hide ui
    let elem = document.getElementById("score");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }
}

const ScoreScreenState = new State(
    update, 
    render,
    transitionIn,
    transitionOut
    );

export default ScoreScreenState;

export {
    initScoreScreenState
};
