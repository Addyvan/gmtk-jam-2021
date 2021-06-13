import * as THREE from "three";

function voxels2group(reference: Array<THREE.Vector3>){
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff});
    const shape = new THREE.Mesh(geometry,material);
    const wireframe = new THREE.WireframeGeometry( geometry );

    const line : any = new THREE.LineSegments( wireframe );
    line.material.depthTest = true;
    line.material.opacity = 1;
    line.material.transparent = true;
    
    for (let i=0; i<reference.length; i++){
        material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff});


        let s = shape.clone();
        let l = line.clone();
        s.position.set(reference[i].x,reference[i].y,reference[i].z);
        l.position.set(reference[i].x,reference[i].y,reference[i].z);
        group.add(s);
        group.add( l );
    }
    return group;
}

export default voxels2group;
