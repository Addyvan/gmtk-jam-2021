import bl from "blengine";
import * as THREE from "three";
import ecs, {Signature, System} from "blecs";
import level1 from "./level1"

// speed component might be nice
const spawn = ({dt, entities} : any) => {
    // 2% spawn rate per frame
    if (Math.random() > 0.99 && level1.shapes.length > 0) {
        let e = ecs.CreateEntity();
        let spawn = level1.shapes.pop()
        console.log(spawn)
        let geometry : any;
        if (spawn?.type === "sphere"){  
            geometry = new THREE.SphereGeometry(spawn?.radius);
        } else {
            geometry = new THREE.BoxGeometry(spawn?.width,spawn?.height);
        }
        const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff } );
        const shape = new THREE.Mesh( geometry, material );
        shape.position.set( (Math.random() -0.5) * 20, 0.5 +  Math.random(), Math.random() * 10 - 80);
        bl.scene.add(shape);
        ecs.AddComponent(e, "shape", shape);
    }
}

const SpawnSystem = new System(spawn);
let sig = new Signature();
ecs.RegisterSystem("spawnSystem", SpawnSystem);
ecs.SetSystemSignature("spawnSystem", sig);

export default SpawnSystem;
