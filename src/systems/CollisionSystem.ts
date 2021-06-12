import * as THREE from "three";
import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import player from "../player";

let IS_FIRST = true;

const collisions = ({dt, entities} : any) => {
    
    for (let i = 0; i < player.children.length; i++) {

        let shapeA : any = player.children[i];
        entities.forEach((entityBID : number) => {
            let shapeB = ecs.GetComponent(entityBID, "shape");
            let collide = false
            if ((shapeA.geometry.type === "SphereGeometry") && (shapeB.geometry.type === "SphereGeometry")){
                let p1 : THREE.Vector3 = shapeA.position.clone().add(player.position);
                let p2 : THREE.Vector3 = shapeB.position;
                let r1 : number = 0.5;
                let r2 : number = 0.5;
                let d = p1.distanceTo(p2);
                collide = d < (r1 + r2);
            } else if ((shapeA.geometry.type === "BoxGeometry") && (shapeB.geometry.type === "SphereGeometry")){
                const boxA = new THREE.Box3();
                shapeA.geometry.computeBoundingBox();
                boxA.copy(shapeA.geometry.boundingBox).applyMatrix4(shapeA.matrixWorld);
                let q: THREE.Vector3 = shapeB.position.clone();
                if (q.x <= boxA.min.x){
                    q.x = boxA.min.x
                } else if (q.x >= boxA.max.x){
                    q.x = boxA.max.x
                }
                if (q.y <= boxA.min.y){
                    q.y = boxA.min.y
                } else if (q.x >= boxA.max.y){
                    q.y = boxA.max.y
                }
                if (q.z <= boxA.min.z){
                    q.z = boxA.min.z
                } else if (q.z >= boxA.max.z){
                    q.z = boxA.max.z
                }
                let d = shapeB.position.distanceTo(q)
                collide = d < 1
            } else if ((shapeA.geometry.type === "SphereGeometry") && (shapeB.geometry.type === "BoxGeometry")){
                const boxB = new THREE.Box3();
                shapeB.geometry.computeBoundingBox();
                boxB.copy(shapeB.geometry.boundingBox).applyMatrix4(shapeB.matrixWorld);
                let q: THREE.Vector3 = shapeA.position.clone();
                if (q.x <= boxB.min.x){
                    q.x = boxB.min.x
                } else if (q.x >= boxB.max.x){
                    q.x = boxB.max.x
                }
                if (q.y <= boxB.min.y){
                    q.y = boxB.min.y
                } else if (q.x >= boxB.max.y){
                    q.y = boxB.max.y
                }
                if (q.z <= boxB.min.z){
                    q.z = boxB.min.z
                } else if (q.z >= boxB.max.z){
                    q.z = boxB.max.z
                }
                let d = shapeA.position.distanceTo(q)
                collide = d < 1
            } else if ((shapeA.geometry.type === "BoxGeometry") && (shapeB.geometry.type === "BoxGeometry")) { 
                const boxA = new THREE.Box3();
                const boxB = new THREE.Box3();
                shapeA.geometry.computeBoundingBox();
                shapeB.geometry.computeBoundingBox();
                boxA.copy(shapeA.geometry.boundingBox).applyMatrix4(shapeA.matrixWorld);
                boxB.copy(shapeB.geometry.boundingBox).applyMatrix4(shapeB.matrixWorld);
                let x1 = ((boxB.max.x <= boxA.max.x) && (boxB.max.x >= boxA.min.x)) || ((boxB.min.x <= boxA.max.x) && (boxB.min.x >= boxA.min.x));
                let y1 = ((boxB.max.y <= boxA.max.y) && (boxB.max.y >= boxA.min.y)) || ((boxB.min.y <= boxA.max.y) && (boxB.min.y >= boxA.min.y));
                let z1 = ((boxB.max.z <= boxA.max.z) && (boxB.max.z >= boxA.min.z)) || ((boxB.min.z <= boxA.max.z) && (boxB.min.z >= boxA.min.z));
                let x2 = ((boxA.max.x <= boxB.max.x) && (boxA.max.x >= boxB.min.x)) || ((boxA.min.x <= boxB.max.x) && (boxA.min.x >= boxB.min.x));
                let y2 = ((boxA.max.y <= boxB.max.y) && (boxA.max.y >= boxB.min.y)) || ((boxA.min.y <= boxB.max.y) && (boxA.min.y >= boxB.min.y));
                let z2 = ((boxA.max.z <= boxB.max.z) && (boxA.max.z >= boxB.min.z)) || ((boxA.min.z <= boxB.max.z) && (boxA.min.z >= boxB.min.z));
                collide = (x1 && y1 && z1) || (x2 && y2 && z2) ;
            }
            if (collide){
                if (!IS_FIRST) {
                    ecs.RemoveComponent(entityBID, "shape");
                    let pos = new THREE.Vector3(
                        shapeB.position.x-player.position.x,
                        shapeB.position.y-player.position.y,
                        shapeB.position.z-player.position.z,)
                    console.log(pos)
                    shapeB.material.color = shapeA.material.color
                    shapeB.position.set(pos.x,pos.y,pos.z);
                    player.add(shapeB);
                } else {
                    IS_FIRST = false;
                }
            }
        }); 
    }  
}

const CollisionSystem = new System(collisions);
let sig = new Signature();
// "subscribe" to entities which have a position component
sig.set(ecs.GetComponentType("shape"), 1);
ecs.RegisterSystem("collisionSystem", CollisionSystem);
ecs.SetSystemSignature("collisionSystem", sig);

export default CollisionSystem;
