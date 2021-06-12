import * as THREE from "three";

const player = new THREE.Group();

const playerVoxelGrid : any = [];

for (let i = 0; i < 16; i++) {
    playerVoxelGrid.append([]);
    for (let j = 0; j < 16; j++) {
        playerVoxelGrid[i].append([]);
        for (let k = 0; k < 16; k++) {
            playerVoxelGrid[i][j] = 0;
        }
    }
}

export {
    playerVoxelGrid
}

export default player;
