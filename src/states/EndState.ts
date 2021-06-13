import bl from "blengine";
import * as THREE from "three";
import State from "../State";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import createLights from "../tasks/createLights";

import gameManager, {Timer} from "../GameManager";

const update = (dt : number) => {
    
}

const render = (dt : number) => {

}

const transitionIn = () => {
    let elem = document.getElementById("end");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "block";
    }
}

const transitionOut = () => {
    // hide ui
    let elem = document.getElementById("end");
    if (elem !== undefined && elem !== null) {
        elem.style.display = "none";
    }

}

const EndState = new State(
    update, 
    render,
    transitionIn,
    transitionOut
    );

export default EndState;
