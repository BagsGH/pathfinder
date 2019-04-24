import {applyMiddleware, createStore} from "redux";
import {createLogger} from 'redux-logger';
import rootReducer from "../reducers/rootReducer";

export function newStore() {
    let store;
    if (process.env.NODE_ENV === 'development') {
        store = createStore(
            rootReducer,
            applyMiddleware(createLogger({
                predicate: (getState, action) => true,
                collapsed: (getState, action) => false
            }))
        )
    } else {
        store = createStore(rootReducer);
    }
    return store;
}

export default newStore();