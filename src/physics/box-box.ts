import * as THREE from "three";

function box_box(boxA : THREE.Box3, boxB : THREE.Box3) : boolean {
    
    let x1 = ((boxB.max.x <= boxA.max.x) && (boxB.max.x >= boxA.min.x)) || ((boxB.min.x <= boxA.max.x) && (boxB.min.x >= boxA.min.x));
    let y1 = ((boxB.max.y <= boxA.max.y) && (boxB.max.y >= boxA.min.y)) || ((boxB.min.y <= boxA.max.y) && (boxB.min.y >= boxA.min.y));
    let z1 = ((boxB.max.z <= boxA.max.z) && (boxB.max.z >= boxA.min.z)) || ((boxB.min.z <= boxA.max.z) && (boxB.min.z >= boxA.min.z));
    let x2 = ((boxA.max.x <= boxB.max.x) && (boxA.max.x >= boxB.min.x)) || ((boxA.min.x <= boxB.max.x) && (boxA.min.x >= boxB.min.x));
    let y2 = ((boxA.max.y <= boxB.max.y) && (boxA.max.y >= boxB.min.y)) || ((boxA.min.y <= boxB.max.y) && (boxA.min.y >= boxB.min.y));
    let z2 = ((boxA.max.z <= boxB.max.z) && (boxA.max.z >= boxB.min.z)) || ((boxA.min.z <= boxB.max.z) && (boxA.min.z >= boxB.min.z));
    
    return (x1 && y1 && z1) || (x2 && y2 && z2) ;
}

export default box_box;

