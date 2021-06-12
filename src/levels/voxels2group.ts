import * as THREE from "three";

function voxels2group(reference: Array<THREE.Vector3>){
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({color:0xffffff})
    const shape = new THREE.Mesh(geometry,material);
    for (let i=0; i<reference.length; i++){
        let s = shape.clone();
        s.position.set(reference[i].x,reference[i].y,reference[i].z)
        group.add(s)
    }
    return group
}