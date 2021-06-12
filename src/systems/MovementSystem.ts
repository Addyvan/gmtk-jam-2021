import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import * as THREE from "three";

import player from "../player";

const SPEED = 5;
const GRAVITY = -60;
let IS_JUMPING = true;

let velocity = new THREE.Vector3(0, 0, 0);


let YZgridHelperA = new THREE.GridHelper( 10, 3, 0xff0000, 0xff0000 );
YZgridHelperA.rotation.x = Math.PI/2;
YZgridHelperA.rotation.z = Math.PI/2;
YZgridHelperA.position.x -= 2.5;

let YZgridHelperB = YZgridHelperA.clone();

YZgridHelperA.position.set(-9, 5, -1.5);
YZgridHelperB.position.set(9, 5, -1.5);

bl.scene.add(YZgridHelperA);
bl.scene.add(YZgridHelperB);

let YXgridHelperA = new THREE.GridHelper( 18, 5, 0xff0000, 0xff0000 );
YXgridHelperA.rotation.x = Math.PI/2;
YXgridHelperA.position.z -= 2.5;

bl.scene.add(YXgridHelperA);

let YXgridHelperB = YXgridHelperA.clone();
bl.scene.add(YXgridHelperB);

YXgridHelperA.position.set(0, 5, -6.5);
YXgridHelperB.position.set(0, 5, 2);

const movement = ({dt, entities} : any) => {
    

    if (bl.controls.GetKey("d")) {
        velocity.x = SPEED;
    }

    if (bl.controls.GetKey("a")) {
        velocity.x = -SPEED;
    }

    if (bl.controls.GetKey("w")) {
        velocity.z = -SPEED;
    }

    if (bl.controls.GetKey("s")) {
        velocity.z = SPEED;
    }

    if (bl.controls.GetKey("e")) {
        player.rotation.y -= dt * SPEED;
    }

    if (bl.controls.GetKey("q")) {
        player.rotation.y += dt * SPEED;
    }

    if (bl.controls.GetKey(" ")) {
        if ( !(player.position.y > 0 ) && !(IS_JUMPING) ) {
            velocity.y = 20;
            IS_JUMPING = true;
        }
    }
    
    player.position.x += velocity.x * dt;
    player.position.z += velocity.z * dt;
    player.position.y = Math.max(player.position.y + velocity.y * dt, 0);

    let showGrids = false;
    if (player.position.x < -8.5) {
        player.position.x = -8.5;
    }

    if (player.position.x > 8.5) {
        player.position.x = 8.5;
    }

    if (player.position.z < -6) {
        player.position.z = -6;
    }

    if (player.position.z > 2) {
        player.position.z = 2;
    }

    if (Math.abs(player.position.x) > 8) {
        showGrids= true;
    }

    if (player.position.z < -5.5 || player.position.z > 1.5) {
        showGrids= true;
    }

    if (showGrids == true) {
        YZgridHelperA.visible = true;
        YZgridHelperB.visible = true;
        YXgridHelperA.visible = true;
        YXgridHelperB.visible = true;
    } else {
        YZgridHelperA.visible = false;
        YZgridHelperB.visible = false;
        YXgridHelperA.visible = false;
        YXgridHelperB.visible = false;
    }

    // deccelerate x,z
    velocity.x = 0.85 * velocity.x;
    velocity.z = 0.85 * velocity.z;

    // deccelerate
    velocity.y += dt * GRAVITY;


    // update camera position
    bl.camera.position.z = player.position.z + 10;
    bl.camera.position.x = player.position.x;

    if (IS_JUMPING && ( velocity.y < -1 ) && player.position.y === 0 ) {
        IS_JUMPING = false;
    }


}

const MovementSystem = new System(movement);
let sig = new Signature();
// "subscribe" to entities which have a position component
ecs.RegisterSystem("movementSystem", MovementSystem);
ecs.SetSystemSignature("movementSystem", sig);

export default MovementSystem;
