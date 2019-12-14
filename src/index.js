import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import Provider from "react-redux/es/components/Provider";

const initialState = {
    email: '',
    isLoggedIn: false,
    productsInShoppingCart: [],
    subtotal: 0,
    billingAddressList: [],

};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'setUserEmail':
            return {
                ...state,
                email: action.email,
            };
        case 'setLoggedIn':
            return {
                ...state,
                isLoggedIn: action.boolean,
            };
        case 'addProdToShoppingC':
            return {
                ...state,
                productsInShoppingCart: [...state.productsInShoppingCart, action.wrappedProduct]
            };
        case 'removeProdFromShoppingC':
            return {
                ...state,
                productsInShoppingCart: state.productsInShoppingCart.filter((wrappedProduct) => wrappedProduct.uniqueId !== action.uniqueId)
            };
        case 'setSubtotal':
            return {
                ...state,
                subtotal: action.subtotal
            };
        case 'setBillingAddressList':
            return {
                ...state,
                billingAddressList: action.billingAddressList
            };
        default:
            return state;

    }
}

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

export const store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
