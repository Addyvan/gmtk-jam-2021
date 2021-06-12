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

let renderScene : any;
let bloomPass : any;
let bloomComposer : any;
let finalComposer : any;

const _VS = `
varying vec2 vUv;

void main() {

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`;

const _FS = `
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;

varying vec2 vUv;

void main() {

    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

}
`;

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );
let materials : any = {};

const initGameState = () => {
    
    // loader.models["floor.glb"].gltf.scene.scale.set(6,6,6);
    // bl.scene.add(loader.models["floor.glb"].gltf.scene);

    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }
    
    createGrid(bl.scene);

    bl.scene.fog = new THREE.FogExp2(0xd600ff, 0.025);
    bl.scene.background = new THREE.Color('#d600ff');

    const geometry = new THREE.BoxGeometry(20, 10, 80, 1,1,1);
    const material = new THREE.MeshPhongMaterial( { color: 0x000000 } );
    const floor = new THREE.Mesh( geometry, material );

    floor.position.y = -5;
    
    bl.scene.add(floor)

    renderScene = new RenderPass( bl.scene, bl.camera );
    bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = 0;
    bloomPass.strength = 1;
    bloomPass.radius = 0.5;

    bloomComposer = new EffectComposer( bl.renderer );
    bloomComposer.addPass( renderScene );
    bloomComposer.addPass( bloomPass );

    const finalPass = new ShaderPass(
        new THREE.ShaderMaterial( {
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture }
            },
            vertexShader: _VS,
            fragmentShader: _FS,
            defines: {}
        } ), "baseTexture"
    );
    finalPass.needsSwap = true;

    finalComposer = new EffectComposer( bl.renderer );
    finalComposer.addPass( renderScene );
    finalComposer.addPass( finalPass );
    
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

const darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
function darkenNonBloomed( obj : any) {

    if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {

        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;

    }

}

function restoreMaterial( obj : any ) {

    if ( materials[ obj.uuid ] ) {

        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];

    }

}

const render = (dt : number) => {

    bl.scene.traverse( darkenNonBloomed );
    bloomComposer.render();
    bl.scene.traverse( restoreMaterial );

    finalComposer.render();
    // bl.renderer.render(bl.scene, bl.camera);
}

const transitionIn = () => {
    // hide ui
    let elem = document.getElementById("game");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "block";
    }
    gameManager.timer = new Timer(90);

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
