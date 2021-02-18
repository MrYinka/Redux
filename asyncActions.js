const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleWare = redux.applyMiddleware;
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios');




//Defining the concept, The Concept: State? Action? Reducer?

//Step 1: State
const initialState = {
    data: [],
    loading: false,
    error: false
}


//Step 2 Actions
const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const DATA_SUCCESS = 'DATA_SUCCESS';
const DATA_ERROR = 'DATA_ERROR';

const fetchData = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

const dataSuccess = data => {
    return {
        type: DATA_SUCCESS,
        payload: data
    }
}

const dataError = error => {
    return {
        type: DATA_ERROR,
        payload: error
    }
}


//Step 3: reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST : return {
            ...state,
            loading: true,
        }
        case DATA_SUCCESS: return {
            ...state,
            data: action.payload,
            error: ''
        }

        case DATA_ERROR: return {
            loading: false,
            data: [],
            error: action.payload
        }

        default : return state

    }
}

//Redux-Thunk Allows a Function Creator to return a function instead of an action
//This function can perform side effects such as Async Task
const fetchAPIData = () => {
    return function(dispatch){
        dispatch(fetchData())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data
                const users = response.data.map(e => e.id);
                //Dispatching Fetch Users Success Action
                dispatch(dataSuccess(users));
            })
            .catch(error => {
                //response.error
                dispatch(dataError(error.message))

            })
    }
}

//Creating a strore
const store = createStore(reducer, applyMiddleWare(thunkMiddleWare));
const unsubscribe = store.subscribe(()=> console.log('Initial State', store.getState()));
store.dispatch(fetchAPIData());
// unsubscribe();




