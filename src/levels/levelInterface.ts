
interface ShapeSpawn {
    type: string;
    spec: any;
    location: THREE.Vector3;
    time: number;
    spawned: boolean;
}

export interface Level {
    shapes: Array<ShapeSpawn>;
    reference: Array<THREE.Vector3>;
};

export default Level;
