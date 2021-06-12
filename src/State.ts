
class State {

    update : CallableFunction;
    render : CallableFunction;
    transitionIn : CallableFunction;
    transitionOut : CallableFunction;

    constructor(
        update : CallableFunction,
        render : CallableFunction,
        transitionIn : CallableFunction,
        transitionOut : CallableFunction
    ) {
        this.update = update;
        this.render = render;
        this.transitionIn = transitionIn;
        this.transitionOut = transitionOut;
    }

}

export default State;
