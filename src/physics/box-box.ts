import * as THREE from "three";

function box_box(boxA : THREE.Box3, boxB : THREE.Box3, posA : THREE.Vector3, posB : THREE.Vector3) {
    
    let x1 = ((boxB.max.x <= boxA.max.x) && (boxB.max.x >= boxA.min.x)) || ((boxB.min.x <= boxA.max.x) && (boxB.min.x >= boxA.min.x));
    let y1 = ((boxB.max.y <= boxA.max.y) && (boxB.max.y >= boxA.min.y)) || ((boxB.min.y <= boxA.max.y) && (boxB.min.y >= boxA.min.y));
    let z1 = ((boxB.max.z <= boxA.max.z) && (boxB.max.z >= boxA.min.z)) || ((boxB.min.z <= boxA.max.z) && (boxB.min.z >= boxA.min.z));
    let x2 = ((boxA.max.x <= boxB.max.x) && (boxA.max.x >= boxB.min.x)) || ((boxA.min.x <= boxB.max.x) && (boxA.min.x >= boxB.min.x));
    let y2 = ((boxA.max.y <= boxB.max.y) && (boxA.max.y >= boxB.min.y)) || ((boxA.min.y <= boxB.max.y) && (boxA.min.y >= boxB.min.y));
    let z2 = ((boxA.max.z <= boxB.max.z) && (boxA.max.z >= boxB.min.z)) || ((boxA.min.z <= boxB.max.z) && (boxA.min.z >= boxB.min.z));

    let collided = (x1 && y1 && z1) || (x2 && y2 && z2) ;
    // let side : string = "";
    // if (collided){
    //     let topA = new THREE.Vector3(posA.x,boxA.max.y,posA.z);
    //     let bottomA = new THREE.Vector3(posA.x,boxA.min.y,posA.z);
    //     let frontA = new THREE.Vector3(posA.x,posA.y,boxA.min.z);
    //     let backA = new THREE.Vector3(posA.x,posA.y,boxA.max.z);
    //     let rightA = new THREE.Vector3(boxA.max.x,posA.y,posA.z);
    //     let leftA = new THREE.Vector3(boxA.min.x,posA.y,posA.z);

    //     let dtop = posB.distanceTo(topA);
    //     let dbottom = posB.distanceTo(bottomA);
    //     let dfront = posB.distanceTo(frontA);
    //     let dback = posB.distanceTo(backA);
    //     let dright = posB.distanceTo(rightA)
    //     let dleft = posB.distanceTo(leftA)

    //     let d = dtop;
    //     side = "top";

    //     if (dbottom < d){
    //         side = "bottom";
    //         d = dbottom;
    //     } 
    //     if (dfront < d){
    //         side = "front";
    //         d = dfront;
    //     }
    //     if (dback < d){
    //         side = "back";
    //         d = dback;
    //     }
    //     if (dright<d){
    //         side = "right";
    //         d = dright;
    //     }
    //     if (dleft<d){
    //         side = "left";
    //         d = dleft;
    //     }
    // }
    
    return collided
}

export default box_box;

