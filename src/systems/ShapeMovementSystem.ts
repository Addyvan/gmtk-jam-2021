import bl from "blengine";
import ecs, {Signature, System} from "blecs";

const SHAPE_MOVE_SPEED = 5;

const shapeMovement = ({dt, entities} : any) => {
        
    entities.forEach((entityID : number) => {
        let shape = ecs.GetComponent(entityID, "shape");
        
        shape.position.z += dt * SHAPE_MOVE_SPEED;

        if (shape.position.z > 10) {
            ecs.RemoveComponent(entityID, "shape");
            bl.scene.remove(shape);
        }
        
    }); 
    
}

const ShapeMovementSystem = new System(shapeMovement);
let sig = new Signature();
// "subscribe" to entities which have a position component
sig.set(ecs.GetComponentType("shape"), 1);
ecs.RegisterSystem("shapeMovementSystem", ShapeMovementSystem);
ecs.SetSystemSignature("shapeMovementSystem", sig);

export default ShapeMovementSystem;
