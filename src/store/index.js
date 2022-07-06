import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk"
import Mode from './mode/rtlmode'
import Layout from './layout/reducer'

const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    layout: Layout,
    mode: Mode,
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk))
  );
  
export default store