import * as THREE from "three";
import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import CollisionSystem from "./systems/CollisionSystem";
import MovementSystem from "./systems/MovementSystem";
import Loader from "./loader";
import { sleep } from "./utils";

import player from "./player";

let ASSETS = [
    "floor.glb"
];


async function main() {

    // load models

    const loader : Loader = new Loader();

    for (let i = 0; i < ASSETS.length; i++) {
        loader.load(ASSETS[i]);
    }

    while (true) {

        
        let allLoaded : boolean = true;
        for (let i = 0; i < ASSETS.length; i++) {
            if (loader.models[ASSETS[i]] === undefined) {
                allLoaded = false;
            }
        }

        if (allLoaded) {
            break;
        }
        

        await sleep(50);
    }
    
    for (let i = 0; i < ASSETS.length; i++) {
        loader.models[ASSETS[i]].gltf.scene.scale.set(6,6,6);
        bl.scene.add(loader.models[ASSETS[i]].gltf.scene);
    }

    bl.camera.position.z = 10;
    bl.camera.position.y = 7.5;

    let e = ecs.CreateEntity();

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xff0000 } );
    const cube = new THREE.Mesh( geometry, material );
    
    player.add(cube);
    bl.scene.add(player);

    cube.position.set(0, 0.5, 0);

    bl.camera.lookAt(0,0,0);

    const dirLight2 = new THREE.DirectionalLight( 0xffffff, .5 );
    dirLight2.position.set( - 150, 75, - 150 );
    bl.scene.add( dirLight2 );

    const ambientLight = new THREE.AmbientLight( 0xffffff, 1.25 ); // soft white light
    bl.scene.add( ambientLight );

    ecs.AddComponent(e, "shape", cube);

    //addShape();
    //addShape();
    //addShape();
    //addShape();
    addShape();

    update();
}

function addShape() {
    let e = ecs.CreateEntity();
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xff0000 } );
    const cube = new THREE.Mesh( geometry, material );

    cube.position.set(Math.random() * 10 - 2.5, 0.5 +  Math.random(), Math.random() * 10 - 2.5);

    bl.scene.add(cube);

    ecs.AddComponent(e, "shape", cube);
}

function update() {

    requestAnimationFrame( () => update() );
    let dt : number = bl.clock.getDelta();

    
    CollisionSystem.update(dt);
    MovementSystem.update(dt);

    bl.renderer.render(bl.scene, bl.camera);

}

export default main;
