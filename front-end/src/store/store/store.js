import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from "../reducers/productReducuers";
const initialState ={};
const reducer = combineReducers({
    ProductList: productListReducer,
})

const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(thunk)));
export default store;
