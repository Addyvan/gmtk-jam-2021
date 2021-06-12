import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import * as THREE from "three";

import player from "../player";

const SPEED = 5;
const GRAVITY = -60;
let IS_JUMPING = true;

let velocity = new THREE.Vector3(0, 0, 0);

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
