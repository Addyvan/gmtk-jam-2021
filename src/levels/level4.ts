import * as THREE from "three";
import Level from "./levelInterface";

const level4 : Level = {
    passScore: 1,
    color: 0x0000ff,
    time: 37.5,
    shapes: [ 
        {
            time: 3,
            location: new THREE.Vector3(0,0,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 6,
            location: new THREE.Vector3(0,0,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 9,
            location: new THREE.Vector3(0,0,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 12,
            location: new THREE.Vector3(0,3,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 15,
            location: new THREE.Vector3(0,3,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 18,
            location: new THREE.Vector3(-1,3,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 21,
            location: new THREE.Vector3(1,3,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 24,
            location: new THREE.Vector3(0,3,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 27,
            location: new THREE.Vector3(-1,3,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
        {
            time: 30,
            location: new THREE.Vector3(1,3,-40),
            speed: 1,
            type: "cube",
            spec: {width: 1,height: 1},
            spawned: false
        },
    ],
    reference: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 3, 0),
        new THREE.Vector3(1, 3, 0),
        new THREE.Vector3(0, 3, -1),
        new THREE.Vector3(0, 3, 1),
        new THREE.Vector3(-1, 3, 0)
    ],
};

export default level4;
