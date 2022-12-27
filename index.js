const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers


const BUY_CATE = 'BUY_CATE'
const BUY_ICE = 'BUY_ICE'


function buyCate(){
    return {
        type: BUY_CATE,
        info: 'first redux action'
    }
}

function buyIce(){
    return {
        type: BUY_ICE,
        info: 'sec redux action'
    }
}



// const initialState = {
//     numberOfCakes: 10,
//     numberOfIces: 20
// }

// const reducer = (state = initialState, action) => {
//     switch(action.type){
//         case BUY_CATE:
//            return {
//             ...state,
//              numberOfCakes: state.numberOfCakes - 1
//             };
//         case BUY_ICE:
//            return {
//             ...state,
//              numberOfIces: state.numberOfIces - 1
//             };

//         default: return state
//     }
// }

const cakeInitialState = {
    numberOfCakes: 10,
}

const cakeReducer = (state = cakeInitialState, action) => {
    switch(action.type){
        case BUY_CATE:
           return {
            ...state,
             numberOfCakes: state.numberOfCakes - 1
            };
        default: return state
    }
}

const IceInitialState = {
    numberOfIces: 20,
}

const IceReducer = (state = IceInitialState, action) => {
    switch(action.type){
        case BUY_ICE:
           return {
            ...state,
             numberOfIces: state.numberOfIces - 1
            };
        default: return state
    }
}


const rootReducer = combineReducers({
    cake: cakeReducer,
    ice: IceReducer
})

const store = createStore(rootReducer)
console.log('initial state', store.getState())
const unscribe = store.subscribe(() => { console.log('Updated state', store.getState()) })
store.dispatch(buyCate())
store.dispatch(buyCate())
store.dispatch(buyCate())
store.dispatch(buyCate())

store.dispatch(buyIce())
store.dispatch(buyIce())


unscribe()
