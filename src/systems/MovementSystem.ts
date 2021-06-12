import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import * as THREE from "three";

const SPEED = 5;
const GRAVITY = -9.8;
let IS_JUMPING = true;

let velocity = new THREE.Vector3(0, 0, 0);

const movement = ({dt, entities} : any) => {
    entities.forEach((entityAID : number) => {
        let group = ecs.GetComponent(entityAID, "player");

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

        if (bl.controls.GetKey(" ")) {
            if ( !(group.position.y > 0 ) && !(IS_JUMPING) ) {
                velocity.y = 5;
                IS_JUMPING = true;
            }
        }
        
        group.position.x += velocity.x * dt;
        group.position.z += velocity.z * dt;
        group.position.y = Math.max(group.position.y + velocity.y * dt, 0);
        

        // deccelerate x,z
        velocity.x = 0.85 * velocity.x;
        velocity.z = 0.85 * velocity.z;

        // deccelerate
        velocity.y += dt * GRAVITY;


        // update camera position
        bl.camera.position.z = group.position.z + 10;
        bl.camera.position.x = group.position.x;

        if (IS_JUMPING && ( velocity.y < -1 ) && group.position.y === 0 ) {
            IS_JUMPING = false;
        }

    });
}

const MovementSystem = new System(movement);
let sig = new Signature();
// "subscribe" to entities which have a position component
sig.set(ecs.GetComponentType("player"), 1);
ecs.RegisterSystem("movementSystem", MovementSystem);
ecs.SetSystemSignature("movementSystem", sig);

export default MovementSystem;
