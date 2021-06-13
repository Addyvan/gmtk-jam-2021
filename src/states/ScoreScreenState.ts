import bl from "blengine";
import * as THREE from "three";
import State from "../State";
import loader from "../loader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import createLights from "../tasks/createLights";
import renderText from "../tasks/renderText";

import level1 from "../levels/level1";
import scoring from "../tasks/scoring";
import gameManager, {Timer} from "../GameManager";

import player from "../player";

let scene : THREE.Scene;
let camera : THREE.PerspectiveCamera;
let controls : OrbitControls;
let g2 : any =  new THREE.Group();
let container : any = {};

const initScoreScreenState = () => {

    let elem = document.getElementById("score");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }

    camera = bl.camera.clone();

    camera.position.set(0, 20, 20);
    scene = new THREE.Scene();

    controls = new OrbitControls( camera, bl.renderer.domElement );

    createLights(scene);
    
    renderText("Your Attempt", new THREE.Vector3(-10, 8, 0), 0.01, g2, container, "t1");
    renderText("Goal", new THREE.Vector3(10, 8, 0), 0.01, g2, container, "t2");
    
    scene.add(g2);
}

const update = (dt : number) => {

    // g2.rotation.y += dt / 5;
    camera.position.y = Math.max(0.01, camera.position.y);

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

    // scene.add(gameManager.currentReference);

    g2 = new THREE.Group();
    // let modelA = loader.models["level1.glb"].gltf.scene.clone();
    // modelA.scale.set(3,3,3);

    let p = player.clone();
    p.rotation.y = 0;
    p.position.set(-10, 0, 0);
    g2.add(p);
    

    let modelB = loader.models["level1.glb"].gltf.scene.clone();
    modelB.scale.set(3,3,3);

    let r = gameManager.currentReference.clone();
    r.position.set(10, 0, 0);
    g2.add(r);

    scene.add(g2);

    let scoreElem = document.getElementById("score-number");
    if (scoreElem !== undefined && scoreElem !== null) {
        scoreElem.innerText = ( Math.round(scoring(gameManager.currentLevel.reference) * 100) ).toString();
    }
        
}

const transitionOut = () => {
    // hide ui
    let elem = document.getElementById("score");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }
    scene.remove(g2);

    
    player.children.forEach((c : any) => {
        player.remove(c);
    });

    // TODO: remove player stuff
    //player = new THREE.Group();
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
