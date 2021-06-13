import * as THREE from "three";
import Level from "./levelInterface";

const level3 : Level = {
    passScore: 1,
    color: 0xd600ff,
    time: 26,
    shapes: [ 
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-3,0,-40),
            time: 1,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-1,0,-40),
            time: 2,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-2,0,-40),
            time: 4,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-2,0,-40),
            time: 4,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(0,0,-40),
            time: 5,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(0,0,-40),
            time: 6,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(3,0,-40),
            time: 7,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(0,0,-40),
            time: 8,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(0,0,-40),
            time: 9,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-1,0,-40),
            time: 10,
            speed: 1,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(2,0,-40),
            time: 12,
            speed: 1.25,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(2,0,-40),
            time: 12,
            speed: 1.25,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(-2,0,-40),
            time: 13,
            speed: 1.25,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(0,0,-40),
            time: 15,
            speed: 1.25,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(4,0,-40),
            time: 18,
            speed: 1.25,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(2,0,-40),
            time: 18,
            speed: 1.25,
            spawned: false
        },
        {
            type: "cube",
            spec: {
                width: 1,
                height: 1
            },
            location: new THREE.Vector3(0,0,-40),
            time: 19,
            speed: 1.25,
            spawned: false
        }
    ],
    reference: [
        new THREE.Vector3(0,2,0),
        new THREE.Vector3(0,2,1),
        new THREE.Vector3(0,2,2),
        new THREE.Vector3(1,2,0),
        new THREE.Vector3(1,2,1),
        new THREE.Vector3(1,2,2),
        new THREE.Vector3(2,2,0),
        new THREE.Vector3(2,2,1),
        new THREE.Vector3(2,2,2),
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0,1,0),
        new THREE.Vector3(2,0,0),
        new THREE.Vector3(2,1,0),
        new THREE.Vector3(0,0,2),
        new THREE.Vector3(0,1,2),
        new THREE.Vector3(2,0,2),
        new THREE.Vector3(2,1,2),
    ],
};

export default level3;
