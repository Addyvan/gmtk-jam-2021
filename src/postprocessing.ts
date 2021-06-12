import * as THREE from "three";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import {render} from "./gameLoop";

import bl from "blengine";
import {render} from "./states/GameState";

export const _VS = `
varying vec2 vUv;

void main() {

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`;

export const _FS = `
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;

varying vec2 vUv;

void main() {

    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

}
`;

let bloomComposer : any;
let finalComposer : any;
let bloomLayer : any;
let darkMaterial : any;

let materials : any = {};

function initPostprocessing() {
    const renderScene = new RenderPass( bl.scene, bl.camera );

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = 0;
    bloomPass.strength = 0.2;
    bloomPass.radius = 1;

    bloomComposer = new EffectComposer( bl.renderer );
    bloomComposer.renderToScreen = false;
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

    darkMaterial = new THREE.MeshBasicMaterial( { color: "black" } );
    bloomLayer = new THREE.Layers();
    bloomLayer.set( 1 );

    const width = window.innerWidth;
    const height = window.innerHeight;

    bl.camera.aspect = width / height;
    bl.camera.updateProjectionMatrix();

    bl.renderer.setSize( width, height );

    bloomComposer.setSize( width, height );
    finalComposer.setSize( width, height );

    window.onresize = function () {

        const width = window.innerWidth;
        const height = window.innerHeight;

        bl.camera.aspect = width / height;
        bl.camera.updateProjectionMatrix();

        bl.renderer.setSize( width, height );

        bloomComposer.setSize( width, height );
        finalComposer.setSize( width, height );

        render();

    };

}

initPostprocessing();

export function darkenNonBloomed( obj : any) {

    if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {

        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;

    }

}

export function restoreMaterial( obj : any ) {

    if ( materials[ obj.uuid ] ) {

        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];

    }

}

export {
    bloomComposer,
    finalComposer,
    bloomLayer,
    darkMaterial
}