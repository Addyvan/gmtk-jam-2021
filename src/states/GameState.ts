import bl from "blengine";
import * as THREE from "three";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import State from "../State";
import loader from "../loader";

// systems
import CollisionSystem from "../systems/CollisionSystem";
import MovementSystem from "../systems/MovementSystem";
import ShapeMovementSystem from "../systems/ShapeMovementSystem";
import SpawnSystem from "../systems/SpawnSystem";

import gameManager, {Timer} from "../GameManager";
import createGrid from "../tasks/createGrid";

import {
    bloomComposer,
    finalComposer,
    darkenNonBloomed,
    restoreMaterial
} from "../postprocessing";

const initGameState = () => {
    
    // loader.models["floor.glb"].gltf.scene.scale.set(6,6,6);
    // bl.scene.add(loader.models["floor.glb"].gltf.scene);

    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }
    
    createGrid(bl.scene);

    bl.scene.fog = new THREE.FogExp2(0xd600ff, 0.02);
    bl.scene.background = new THREE.Color('#d600ff');

    const geometry = new THREE.BoxGeometry(150, 10, 80, 1,1,1);
    const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    const floor = new THREE.Mesh( geometry, material );

    floor.position.y = -5;
    
    bl.scene.add(floor)
    
}



const update = (dt : number) => {
    
    let elem : any = document.getElementById("game-timer");
    if (elem !== undefined && elem !== null) {
        elem.value = ((gameManager.timer.end - gameManager.timer.time) / gameManager.timer.end) * 100;
    }
    
    MovementSystem.update(dt);
    CollisionSystem.update(dt);
    ShapeMovementSystem.update(dt);
    SpawnSystem.update(dt);

}



export const render = () => {

    bl.scene.traverse( darkenNonBloomed );
    bloomComposer.render();
    bl.scene.traverse( restoreMaterial );

    finalComposer.render();
    // bl.renderer.render(bl.scene, bl.camera)
}

const transitionIn = () => {
    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "block";
    }
    gameManager.timer = new Timer(gameManager.currentLevel.time);

}

const transitionOut = () => {
    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }
}

const GameState = new State(
    update, 
    render,
    transitionIn,
    transitionOut
    );

export default GameState;

export {
    initGameState
};
