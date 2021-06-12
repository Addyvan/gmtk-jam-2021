import * as THREE from "three";
import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import player from "../player";

const collisions = ({dt, entities} : any) => {
    entities.forEach((entityAID : number) => {
        let shapeA = ecs.GetComponent(entityAID, "shape");
      
        entities.forEach((entityBID : number) => {
            let shapeB = ecs.GetComponent(entityBID, "shape");
            
            if (entityAID !== entityBID) {
                const boxA = new THREE.Box3();
                const boxB = new THREE.Box3();
                shapeA.geometry.computeBoundingBox();
                shapeB.geometry.computeBoundingBox();
                boxA.copy(shapeA.geometry.boundingBox).applyMatrix4(shapeA.matrixWorld);
                boxB.copy(shapeB.geometry.boundingBox).applyMatrix4(shapeB.matrixWorld);
                let x = ((boxB.max.x <= boxA.max.x) && (boxB.max.x >= boxA.min.x)) || ((boxB.min.x <= boxA.max.x) && (boxB.min.x >= boxA.min.x));
                let y = ((boxB.max.y <= boxA.max.y) && (boxB.max.y >= boxA.min.y)) || ((boxB.min.y <= boxA.max.y) && (boxB.min.y >= boxA.min.y));
                let z = ((boxB.max.z <= boxA.max.z) && (boxB.max.z >= boxA.min.z)) || ((boxB.min.z <= boxA.max.z) && (boxB.min.z >= boxA.min.z));
                let collide = x && y && z;
                console.log(collide)
                if (collide){
                    ecs.RemoveComponent(entityBID,"shape")
                    bl.scene.remove(shapeB.name)
                }
            }
        });

    });
}

const CollisionSystem = new System(collisions);
let sig = new Signature();
// "subscribe" to entities which have a position component
sig.set(ecs.GetComponentType("shape"), 1);
ecs.RegisterSystem("collisionSystem", CollisionSystem);
ecs.SetSystemSignature("collisionSystem", sig);

export default CollisionSystem;
