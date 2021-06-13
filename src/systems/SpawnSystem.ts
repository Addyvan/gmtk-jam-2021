import bl from "blengine";
import * as THREE from "three";
import ecs, {Signature, System} from "blecs";

import level1 from "../levels/level1";

import gameManager from "../GameManager";

interface ShapeSpawn {
    type: string;
    spec: any;
    location: THREE.Vector3;
    time: number;
    spawned: boolean;
}
let geometry : any;
// speed component might be nice
const spawn = ({dt, entities} : any) => {

    let l = gameManager.currentLevel;

    l.shapes.forEach((s : any) => {

        if (gameManager.timer.time > s.time && !(s.spawned)) {
            switch(s.type) {
                case "sphere": {
                    geometry = new THREE.SphereGeometry(s.spec.radius);
                } break;
                case "cube": {
                    geometry = new THREE.BoxGeometry(s.spec.width,s.spec.height);
                } break;
            }

            s.spawned = true;

            let c : number;

            switch (s.location.y) {
                case 0: c = 0x00ff9f; break;
                case 1: c = 0x00b8ff; break;
                case 2: c = 0x001eff; break;
                case 3: c = 0xbd00ff; break;
                case 4: c = 0xd600ff; break;
                default: throw Error(`HEIGHT ${s.location.y} not allowed in level! See spawn system code`);
            } 

            const material = new THREE.MeshPhongMaterial( { color: c } );
            const shape = new THREE.Mesh( geometry, material );
            shape.position.set( s.location.x, s.location.y, s.location.z );

            
            bl.scene.add(shape);
            let e = ecs.CreateEntity();
            ecs.AddComponent(e, "shape", shape);
            ecs.AddComponent(e, "params", {speed: s.speed});

        }
        
    });
    
    
}

const SpawnSystem = new System(spawn);
let sig = new Signature();
ecs.RegisterSystem("spawnSystem", SpawnSystem);
ecs.SetSystemSignature("spawnSystem", sig);

export default SpawnSystem;
