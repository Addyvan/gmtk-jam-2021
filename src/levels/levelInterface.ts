
interface ShapeSpawn {
    type: string;
    spec: any;
    location: THREE.Vector3;
    time: number;
    spawned: boolean;
    speed: number;
}

export interface Level {
    passScore: number;
    time: number;
    shapes: Array<ShapeSpawn>;
    reference: Array<THREE.Vector3>;
};

export default Level;
