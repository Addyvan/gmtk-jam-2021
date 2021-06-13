import * as THREE from "three";
import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import player from "../player";

import {groupToWorld, worldToGroup} from "../utils";

import box_sphere from "../physics/box-sphere";
import sphere_sphere, {Sphere} from "../physics/sphere-sphere";
import box_box from "../physics/box-box";

import {h} from "./MovementSystem";

let IS_FIRST = true;

const collisions = ({dt, entities} : any) => {
    
    for (let i = 0; i < player.children.length; i++) {

        let shapeA : any = player.children[i];
        entities.forEach((entityBID : number) => {
            let shapeB = ecs.GetComponent(entityBID, "shape");
            let collided : boolean = false;

            if ((shapeA.geometry.type === "BoxGeometry") && (shapeB.geometry.type === "BoxGeometry")) {

                const boxA = new THREE.Box3();
                const boxB = new THREE.Box3();
                shapeA.geometry.computeBoundingBox();
                shapeB.geometry.computeBoundingBox();
                boxA.copy(shapeA.geometry.boundingBox).applyMatrix4(shapeA.matrixWorld);
                boxB.copy(shapeB.geometry.boundingBox).applyMatrix4(shapeB.matrixWorld);
                let posA = shapeA.position.clone();
                let posB = shapeB.position.clone();

                let res: any = box_box(boxA, boxB, posA, posB);
                collided = res[0];
                
            }

            if ((shapeA.geometry.type === "SphereGeometry") && (shapeB.geometry.type === "SphereGeometry")) {



                const sphereA : Sphere = {
                    radius: shapeA.geometry.parameters.radius,
                    center: groupToWorld(shapeA.position)
                };

                const sphereB : Sphere = {
                    radius: shapeB.geometry.parameters.radius,
                    center: shapeB.position.clone()
                }

                collided = sphere_sphere(sphereA, sphereB);
                
            }

            if (
                (shapeA.geometry.type === "BoxGeometry") && (shapeB.geometry.type === "SphereGeometry")
                ||
                (shapeA.geometry.type === "SphereGeometry") && (shapeB.geometry.type === "BoxGeometry")
            ) {
                let box : THREE.Box3 = new THREE.Box3;
                let s : Sphere;

                if (shapeA.geometry.type === "BoxGeometry") {
                    shapeA.geometry.computeBoundingBox();
                    box = box.copy(shapeA.geometry.boundingBox).applyMatrix4(shapeA.matrixWorld);

                    s = {
                        radius: shapeB.geometry.parameters.radius,
                        center: shapeB.position.clone()
                    }
                } else {
                    shapeB.geometry.computeBoundingBox();
                    box = box.copy(shapeB.geometry.boundingBox).applyMatrix4(shapeB.matrixWorld);

                    s = {
                        radius: shapeA.geometry.parameters.radius,
                        center: groupToWorld(shapeA.position)
                    }
                }

                collided = box_sphere(box, s);

            }
            
            if (collided){
                if (!IS_FIRST) {
                    ecs.RemoveComponent(entityBID, "shape");
                    let pos = worldToGroup(shapeB.position); 
                    shapeB.material.color = shapeA.material.color

                    shapeB.position.set(pos.x,pos.y,pos.z);
                    
                    player.add(shapeB);

                    // after we glue we need to check which object is now the lowest

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
