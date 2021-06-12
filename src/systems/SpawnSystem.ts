import bl from "blengine";
import * as THREE from "three";
import ecs, {Signature, System} from "blecs";

const spawn = ({dt, entities} : any) => {
    
    // 2% spawn rate per frame
    if (Math.random() > 5) {
        let e = ecs.CreateEntity();
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial( { color: Math.random() * 0xff0000 } );
        const cube = new THREE.Mesh( geometry, material );

        cube.position.set(Math.random() * 10 - 2.5, 0.5 +  Math.random(), Math.random() * 10 - 2.5);

        bl.scene.add(cube);

        ecs.AddComponent(e, "shape", cube);
    }

}

const SpawnSystem = new System(spawn);
let sig = new Signature();
ecs.RegisterSystem("spawnSystem", SpawnSystem);
ecs.SetSystemSignature("spawnSystem", sig);

export default SpawnSystem;
