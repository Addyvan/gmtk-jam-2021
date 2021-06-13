import * as THREE from "three"
import { Matrix3 } from "three";
import player from "../player";
import {groupToGrid} from "../utils"

function rotate(pos:THREE.Vector3,nrot:number){
    let R = new Matrix3()
    R.set(1,0,0,0,1,0,0,0,1);
    if (nrot==1){
        R.set(0,0,1,0,1,0,-1,0,0);
    }
    if (nrot==2){
        R.set(-1,0,0,0,1,0,0,0,-1);
    }
    if (nrot==3){
        R.set(0,0,-1,0,1,0,1,0,0);
    }
    pos.applyMatrix3(R);
    return pos;
}

function scoring(voxels: Array<THREE.Vector3>) : number {
    let fscore: number = 0;
    for (let nrot=0;nrot<4;nrot++){
        let score: number = 0;
        for (let i=0; i< voxels.length; i++){
            let voxel = new THREE.Vector3(voxels[i].x,voxels[i].y,voxels[i].z);
            console.log('voxel',voxel);
            for (let j=0; j<player.children.length; j++){
                let shape: any = player.children[j]
                const box = new THREE.Box3();
                let p1 = shape.position.clone();
                p1 = rotate(p1,nrot);
                console.log('p1',p1);
                let epsilon = 0.1;
                let x = (p1.x <= voxel.x+epsilon) && (p1.x >= voxel.x-epsilon);
                let y = (p1.y <= voxel.y+epsilon) && (p1.y >= voxel.y-epsilon);
                let z = (p1.z <= voxel.z+epsilon) && (p1.z >= voxel.z-epsilon);
                console.log(x && y && z)
                score += Number(x && y && z);
            }
        }
        if (score > fscore){
            fscore = score;
        }
    }
    fscore /= voxels.length;
    return fscore;
}

export default scoring;