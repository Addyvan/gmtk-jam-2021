import * as THREE from "three"
import { Matrix3 } from "three";
import player from "../player";

function translate(pos:THREE.Vector3, nt:number){

    let translation = new THREE.Vector3(0,0,0);

    if (nt==1){
        translation.x = 1;
    }
    if (nt==2){
        translation.x = 2;
    }
    if (nt==3){
        translation.x += -1;
    }
    if (nt==4){
        translation.x += -2;
    }
    if (nt==5){
        translation.y += 1;
    }
    if (nt==6){
        translation.y += 2;
    }
    if (nt==7){
        translation.y += -1;
    }
    if (nt==8){
        translation.y += -2;
    }
    if (nt==9){
        translation.z += 1;
    }
    if (nt==10){
        translation.z += 2;
    }
    if (nt==11){
        translation.z += -1;
    }
    if (nt==12){
        translation.z += -2;
    }
    pos.add(translation);
}

function rotate(pos:THREE.Vector3,nrot:number){

    let R = new Matrix3()
    R.set(1,0,0,0,1,0,0,0,1);
    // about x-axis
    if (nrot==1){
        R.set(1,0,0,0,0,-1,0,1,0);
    }
    if (nrot==2){
        R.set(1,0,0,0,-1,0,0,0,-1);
    }
    if (nrot==3){
        R.set(1,0,0,0,0,1,0,-1,0);
    }
    // about y-axis
    if (nrot==4){
        R.set(0,0,1,0,1,0,-1,0,0);
    }
    if (nrot==5){
        R.set(-1,0,0,0,1,0,0,0,-1);
    }
    if (nrot==6){
        R.set(0,0,-1,0,1,0,1,0,0);
    }
    // about z-axis
    if (nrot==7){
        R.set(0,-1,0,1,0,0,0,0,1);
    }
    if (nrot==8){
        R.set(1,0,0,0,1,0,0,0,1);
    }
    if (nrot==9){
        R.set(0,1,0,-1,0,0,0,0,1);
    }
    pos.applyMatrix3(R);
}


function scoring(voxels: Array<THREE.Vector3>) : any {
    let fscore: number = 0;
    for (let nt=0;nt<13;nt++){

        for (let nrot=0;nrot<10;nrot++){

            let score: number = 0;

            for (let i=0; i< voxels.length; i++){

                let voxel = new THREE.Vector3(voxels[i].x,voxels[i].y,voxels[i].z);

                for (let j=0; j<player.children.length; j++){

                    
                    let shape: any = player.children[j];
                    console.log(shape.geometry.type);
                    if (shape.geometry.type !== "WireframeGeometry") {
                        const box = new THREE.Box3();
                        let p1 = shape.position.clone();
                        console.log('p1 before translation',p1);
                        translate(p1, nt);
                        console.log('p1 after translation',p1);
                        rotate(p1, nrot);
                        let epsilon = 0.1;
                        let x = (p1.x <= voxel.x+epsilon) && (p1.x >= voxel.x-epsilon);
                        let y = (p1.y <= voxel.y+epsilon) && (p1.y >= voxel.y-epsilon);
                        let z = (p1.z <= voxel.z+epsilon) && (p1.z >= voxel.z-epsilon);

                        let s = Number(x && y && z);
                        score += s;
                        // if (s !== 1) {
                        //     console.log("ICIT", s);
                        //     score -= 1;
                        // }
                    }
                    

                }

            }

            if (score > fscore){
                fscore = score;
            }
        }
    }
    // console.log(fscore,player.children.length,voxels.length)
    fscore /= voxels.length;
    return fscore;
}

export default scoring;
