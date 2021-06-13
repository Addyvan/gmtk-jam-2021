import * as THREE from "three";
import bl from "blengine";
import ecs, {Signature, System} from "blecs";
import player from "../player";

import {groupToWorld, worldToGroup, groupToGrid} from "../utils";

import box_sphere from "../physics/box-sphere";
import sphere_sphere, {Sphere} from "../physics/sphere-sphere";
import box_box from "../physics/box-box";
import gameManager from "../GameManager";

let faceOffsets = [
    new THREE.Vector3(1,0,0),
    new THREE.Vector3(-1,0,0),
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(0,-1,0),
    new THREE.Vector3(0,0,1),
    new THREE.Vector3(0,0,-1),
];


let IS_FIRST = true;
const collisions = ({dt, entities} : any) => {
    
    for (let i = 0; i < player.children.length; i++) {

        let shapeA : any = player.children[i];
        if (shapeA.geometry.type !== "WireframeGeometry") {
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

                    collided = box_box(boxA, boxB, posA, posB);
                    
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

                        let pos = worldToGroup(shapeB.position);
                        let p = groupToGrid(pos);

                        // I hate this but it works
                        // arrrrggg
                        if (
                            p[0] == shapeA.position.x &&
                            p[1] == shapeA.position.y &&
                            p[2] == shapeA.position.z
                        ) {
                            for (let i =0; i < player.children.length; i++) {
                                player.children[i].position.y += 1;
                            }
                        }

                        let d = shapeA.position.distanceTo(new THREE.Vector3(p[0], p[1], p[2]));
                        // if not diagonal
                        // AND
                        // if not above the player
                        if (d <= 1) {
                            ecs.RemoveComponent(entityBID, "shape");

                            shapeB.material.color = shapeA.material.color;

                            // trigger *zip* sounds
                            window.audioManager.startTrack("collide");
                            
                            if (p[1] < gameManager.base) {
                                for (let i =0; i < player.children.length; i++) {
                                    player.children[i].position.y += 1;
                                }

                                p[1] += 1;
                            }
                            
                            shapeB.position.set(p[0],p[1],p[2]);
                            player.add(shapeB);

                            const wireframe = new THREE.WireframeGeometry( shapeB.geometry );
                            const line : any = new THREE.LineSegments( wireframe );
                            line.material.depthTest = true;
                            line.material.opacity = 1;
                            line.material.transparent = true;
                            line.position.set( p[0],p[1],p[2] );
                            player.add(line);
                            
                        }

                    } else {
                        IS_FIRST = false;
                    }
                }
            });
        }
    }  
}

const CollisionSystem = new System(collisions);
let sig = new Signature();
// "subscribe" to entities which have a position component
sig.set(ecs.GetComponentType("shape"), 1);
ecs.RegisterSystem("collisionSystem", CollisionSystem);
ecs.SetSystemSignature("collisionSystem", sig);

export default CollisionSystem;
