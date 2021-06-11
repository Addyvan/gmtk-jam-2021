import bl from "blengine";
import ecs, {Signature, System} from "blecs";

const collisions = ({dt, entities} : any) => {
    entities.forEach((entityAID : number) => {
        let shapeA = ecs.GetComponent(entityAID, "shape");
      
        entities.forEach((entityBID : number) => {
            let shapeB = ecs.GetComponent(entityAID, "shape");

            if (entityAID !== entityBID) {
                // IMPLEMENT ME

            }

        });

    });
}

const CollisionSystem = new System(collisions);
let sig = new Signature();
// "subscribe" to entities which have a position component
sig.set(ecs.GetComponentType("shape"), 1);
ecs.RegisterSystem("collisionSystem", CollisionSystem);
ecs.SetSystemSignature("collisionSystem", sig);

export default CollisionSystem;
