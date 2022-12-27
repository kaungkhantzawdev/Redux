const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
// initialState
const initialState = {
    loading: true,
    users: [],
    error: ''
}

// action type 
const request = 'request'
const success = 'success'
const failure = 'failure'

//function
const fetchRequest = () => {
    return {
        type: request
    }
}

const fetchSuccess = users => {
    return {
        type: success,
        payload: users
    }
}

const fetchFailure = error => {
    return {
        type: failure,
        payload: error
    }
}

//action

const reducer = (state = initialState, action) => {
    switch(action.type){
        case request:
            return {
                ...state,
                loading: true
            }

        case success:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        
        case failure:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default: return state
    }
}


const fetchUsers = () => {
         
    return (dispatch) => {
        dispatch(fetchRequest())
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                const data = json.map(user => user.userId)
                console.log('hello')
                dispatch(fetchSuccess(data))
            })
            .catch(err => {
                dispatch(fetchFailure(err.message))
            })
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        //     .then(res => {
        //         const data = res.map(user => user.userId)
        //         console.log('hello')
        //         dispatch(fetchSuccess(data))
        //     })
        //     .catch(err => {
        //         dispatch(fetchFailure(err.message))
        //     })
    }
    
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => { console.log('data', store.getState())})
store.dispatch(fetchUsers())