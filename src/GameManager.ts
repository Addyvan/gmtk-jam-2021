import * as THREE from "three";
import bl from "blengine";
import State from "./State";

import {
    level1
} from "./levels";
import Level from "./levels/levelInterface";

export class Timer {

    time : number;
    end : number;

    finished : boolean;

    constructor(end : number) {
        this.time = 0;
        this.end = end;
        this.finished = false;
    }

    update(dt : number) {
        this.time += dt;

        if (this.time > this.end) {
            this.finished = true;
        }
    }

}



class GameManager {

    gameState : string;
    states : any;
    timer : Timer;
    
    currentLevel : Level;

    constructor() {
        this.gameState = "preview";

        this.timer = new Timer(1);

        this.states = {}

        this.currentLevel = level1;
    }

    setState(name : string, state : State) {
        this.states[name] = state;
    }

    /**
     * Transition from game state to another
     * @param from - hash of from state in this.states
     * @param to - hash of to state in this.states
     */
    transition(from : string, to : string) {

        this.states[from].transitionOut();
        this.states[to].transitionIn();

        this.gameState = to;
    }

    update(dt : number) {

        if (this.gameState === "mainmenu") {
            return;
        }

        this.timer.update(dt);

        if (this.timer.finished) {

            switch (this.gameState) {

                case "preview": {
                    this.transition("preview", "game");
                }; break;
                case "game": {
                    this.transition("game", "score");
                }; break;

            }

        }

        this.states[this.gameState].update(dt);
        this.states[this.gameState].render();
    }

}

const gameManager = new GameManager();

export default gameManager;
