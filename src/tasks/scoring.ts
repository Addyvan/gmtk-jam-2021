import * as THREE from "three"
import { Matrix3 } from "three";
import player from "../player";

function rotate(pos:THREE.Vector3,theta:number){
    let R = new Matrix3()
    theta *= 180/Math.PI;
    R.set(Math.cos(theta),0,Math.sin(theta),0,1,0,-Math.sin(theta),0,Math.cos(theta));
    pos.applyMatrix3(R);
    return pos;
}

function scoring(voxels:Array<Array<number>>) : number {
    let fscore: number = 0;
    let score: number = 0;
    for (let nrot=0;nrot<36;nrot++){
        for (let i=0; i< voxels.length; i++){
            let voxel = new THREE.Vector3(voxels[i][0],voxels[i][1],voxels[i][2]);
            for (let j=0; j<player.children.length; j++){
                let shape: any = player.children[j]
                let box = new THREE.Box3();
                shape.position = rotate(shape.position,10);
                shape.geometry.computeBoundingBox();
                box.copy(shape.geometry.BoundingBox).applyMatrix4(shape.matrixWorld);
                score += Number(box.containsPoint(voxel));
            }
        }
        if (score > fscore){
            fscore = score;
        }
    }
    fscore /= voxels.length;
    fscore *= 100;
    return fscore;
}

export default scoring;