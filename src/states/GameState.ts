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
import player from "../player";

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

    floor.position.y = -5.6;
    
    bl.scene.add(floor);
    
}

let TUTORIAL1 = true;
let TUTORIAL2 = true;

const update = (dt : number) => {
    
    MovementSystem.update(dt);
    CollisionSystem.update(dt);
    ShapeMovementSystem.update(dt);
    SpawnSystem.update(dt);

    if (gameManager.currentLevelIndex === 0) {
        if (TUTORIAL1) {
            if (gameManager.timer.time > 10) {
                let elem = document.getElementById("game-tutorial-1");
                if (elem !== undefined && elem !== null) {
                    elem.style.display = "none";
                }
                TUTORIAL1 = false;
            }
        }
    }

    if (gameManager.currentLevelIndex === 1) {
        if (TUTORIAL2) {
            if (gameManager.timer.time > 10) {
                let elem = document.getElementById("game-tutorial-2");
                if (elem !== undefined && elem !== null) {
                    elem.style.display = "none";
                }
                TUTORIAL2 = false;
            }
        }
    }

}



export const render = () => {

    bl.scene.traverse( darkenNonBloomed );
    bloomComposer.render();
    bl.scene.traverse( restoreMaterial );

    finalComposer.render();
    // bl.renderer.render(bl.scene, bl.camera)
}

const transitionIn = () => {

    player.position.set(0,0,0);

    for (let i = 0; i < gameManager.currentLevel.shapes.length; i++) {
        gameManager.currentLevel.shapes[i].spawned = false;
    }


    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "block";
    }

    if (gameManager.currentLevelIndex > 0) {
        bl.scene.fog = new THREE.FogExp2(0x0000ff, 0.02);
        bl.scene.background = new THREE.Color('#0000ff');
    }

    while (player.children.length > 0) {
        for (let i = 0; i < player.children.length; i++) {
            player.remove(player.children[i]);
        }
    }
    
    if ( player.children.length > 0 ) {
        throw new Error("FUCK");
    }

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
    const s = new THREE.Mesh( geometry, material );
    player.add(s);

    const wireframe = new THREE.WireframeGeometry( geometry );
    const line : any = new THREE.LineSegments( wireframe );
    line.material.depthTest = true;
    line.material.opacity = 1;
    line.material.transparent = true;
    line.position.set( s.position.x, s.position.y, s.position.z );
    player.add(line);



    gameManager.timer = new Timer(gameManager.currentLevel.time);

    if (gameManager.currentLevelIndex > 0) {
        let elem = document.getElementById("game-tutorial-1");
        if (elem !== undefined && elem !== null) {
            elem.style.display = "none";
        }
    }

    if (gameManager.currentLevelIndex === 1 ) {
        let elem = document.getElementById("game-tutorial-2");
        if (elem !== undefined && elem !== null) {
            elem.style.display = "block";
        }
    } else {
        let elem = document.getElementById("game-tutorial-2");
        if (elem !== undefined && elem !== null) {
            elem.style.display = "none";
        }
    }

    if (gameManager.currentLevelIndex === 2 ) {
        let elem = document.getElementById("game-tutorial-3");
        if (elem !== undefined && elem !== null) {
            elem.style.display = "block";
        }
    } else {
        let elem = document.getElementById("game-tutorial-3");
        if (elem !== undefined && elem !== null) {
            elem.style.display = "none";
        }
    }

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
