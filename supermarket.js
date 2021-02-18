const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStrore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();


//Cake Action
const BUY_CAKE = "BUY_CAKE";
//Cake Action Creator
const buyCake = () => {
    return {
        type: BUY_CAKE
    }
}

//Ice Cream Action
const BUY_ICECREAM = "BUY_ICECREAM";

//Ice Cream Action Creator
const buyIceCream = () => {
    return {
        type: BUY_ICECREAM
    }
}

//Initializing Cake State
const initialCakeNumber = {
    numOfCakes: 10
}

const cakeReducer = (state = initialCakeNumber, action) => {
    switch (action.type){
        case BUY_CAKE : return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}


//Initializing Cake State
const initialIceCreamNumber = {
    numOfIceCreams: 20
}

const IceCreamReducer = (state = initialIceCreamNumber, action) => {
    switch (action.type){
        case BUY_ICECREAM : return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }

        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: IceCreamReducer
});


const store = createStrore(rootReducer, applyMiddleware(logger));
console.log('Initial Cake State:', store.getState());
const unsubscribe =  store.subscribe(()=> {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();

