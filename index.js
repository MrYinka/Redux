const redux = require('redux');
const createStore = redux.createStore;

const BUY_ICECREAM = 'BUY_ICECREAM';

const buy_IceCream = () => {
    return {
        type: BUY_ICECREAM
    }
}

//Initiating a store state
const initialState = {
    numOfIceCream : 20
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case BUY_ICECREAM : return {
            ...state,
            numOfIceCream: state.numOfIceCream - 1
        }

        default : return state;
    }
}


const store = createStore(reducer);
console.log('Initial State:', store.getState());
const unsbscribe =  store.subscribe(()=> console.log('Updated State:', store.getState()));
store.dispatch(buy_IceCream())
store.dispatch(buy_IceCream())
store.dispatch(buy_IceCream())
unsbscribe();




