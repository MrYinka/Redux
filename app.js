const redux  =  require('redux');
//Creating the store
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';

const buyCake = () => {
    return {
        type:BUY_CAKE
    }
}


//Application state

const initialState = {
    numOfCakes: 10
}


//Reducer
const reducer = (state = initialState, action) =>{
    switch (action.type){
        case BUY_CAKE : return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }

        default: return state
    }
}

//Creating the Redux store holding the application state
const store = createStore(reducer);
//Displaying the initial store state
console.log('Initial State:', store.getState());
//App Subscribing to the store and unsubscribing afterwards
const unsubscribe = store.subscribe(() => console.log('Updated State:', store.getState()));
//Allows the store to be updated! Dispatching an action describing the type. i.e what happened
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

//Unsubscribing to any change in the store
unsubscribe();


