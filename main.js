import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import Order from './Order.jsx'
import Categories from './Categories.jsx'
import ChangeView from './ChangeView.jsx'
import ShoppingCart from './ShoppingCart.jsx'
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Root from './Root.jsx'

//Products
function products(state = [], action) {
    if (action.type === 'FETCH_PRODUCT_SUCCESS') {
        return action.payload
    }
    else if (action.type === 'ADD_PRODUCT_SUCCESS') {
        return [...state, action.payload]
    }
    else if (action.type === 'DELETE_PRODUCT') {
        console.log(action.type)
        return state.filter((s) => s._id !== action.payload)
    }
    else if (action.type === 'VIEW_PRODUCT') {  
        var newState = state.filter((s) => s._id == action.payload)
        return newState
    }
    else if (action.type === 'ADD_TO_CART'){
        return [...state, action.payload]
        console.log(action.payload)
    }
    else { return state }
}

function editedProduct(
    state={id: '', name: '', price: '', description: '',
    brand: '', producer: '', imageUrl: '', inventory: ''}, action){
    if(action.type==='EDIT_PRODUCT'){
        console.log(action.payload)
        return action.payload
    }
    else{
        return state
    }
}

export function addCart(id){
    return (dispatch, getState)=>{
        if(getState().products.inventory > 0){
            this.props.dispatch(addTocart(id))
        }
    }
}
export function addTocart(id) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/shoppingCarts`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(id)
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({ type: 'ADD_TO_CART', payload: id })
            })
    }
}

export function fetchProduct() {
    return function (dispatch) {
        fetch('http://bestlab.us:8080/products')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH_PRODUCT_SUCCESS',
                    payload: data
                })
            })
    }
}

export function addProduct(product) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/products`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(product)
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: data })
            })
    }
}


export function deleteProduct(id) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/products/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'delete',
        })
        .then(res=>res.json())
        .then(data=>dispatch({type: 'DELETE_PRODUCT', payload: id}))
    }
}

export function getProduct(id){
    return function(dispatch){
        fetch(`http://bestlab.us:8080/products/${id}`,{
            method: 'get',
        })
        .then(res=>res.json())
        .then(data=>dispatch({type: 'EDIT_PRODUCT', payload: data}))
    }
} 

export function updateProduct(product){
    return function(dispatch){
        fetch(`http://bestlab.us:8080/products/`,{
            method: 'put',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data=>dispatch(fetchProduct()))
    }
}

//Categories
function categories(state = [], action) {

    if (action.type == 'FETCH') {
        return action.payload
    }
    else if (action.type == 'ADD') {
        return [...state, action.payload]
    }
    else if (action.type === 'DELETE') {
        console.log(action.type)
        return state.filter((s) => s._id !== action.payload)
    }
    else if (action.type === 'VIEW') {  
        var newState = state.filter((s) => s._id == action.payload)
        return newState
    }

    else { return state }

}

function fetchC() {
    return function (dispatch) {
        fetch('http://bestlab.us:8080/productTypes')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH',
                    payload: data
                })
            })
    }
}

export function add(product) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/productTypes`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(product)
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({ type: 'ADD', payload: data })
            })
    }
}


export function deletee(_id) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/productTypes/${_id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'delete',
        })
        .then((res) => {
            return res.json()})
        
    }
}



export function fix(_id) {
    return function(dispatch){
        fetch(`http://bestlab.us:8080/productTypes`,{
            headers:{ 'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(_id)
        })
        .then((res) => {
            return res.json()
        })
    }

}
//Orders
function orders(state = [], action) {

    if (action.type == 'FETCH_ORDER_SUCCESS') {
        return action.payload
    }
    else if (action.type == 'ADD_ORDER_SUCCESS') {
        return [...state, action.payload]
    }
    else if (action.type === 'DELETE_ORDER') {
        console.log(action.type)
        return state.filter((s) => s._id !== action.payload)
    }
    else if (action.type === 'VIEW_ORDER') {  
        var newState = state.filter((s) => s._id == action.payload)
        return newState
    }

    else { return state }

}

function fetchOrder() {
    return function (dispatch) {
        fetch("http://bestlab.us:8080/orders")
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH_ORDER_SUCCESS',
                    payload: data
                })
            })
    }
}

export function addOrder(order) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/orders`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(order)
        })
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({ type: 'ADD_ORDER_SUCCESS', payload: data })
            })
    }
}


export function deleteOrder(id) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/orders/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'delete',
        })
        .then((res) => {
            return res.json()
        })
    }
}

export function fixOrder(id) {
    return function(dispatch){
        fetch(`http://bestlab.us:8080/orders`,{
            headers:{ 
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(id)
        })
        .then((res) => {
            return res.json()
        })
    }
}

//ShoppingCart
function shoppingcart(state = [], action) { 
        if (action.type === 'FETCH_CART_SUCCESS') {
            return action.payload
        }
        else if (action.type === 'DELETE_CART') {
            console.log(action.type)
            return state.filter((s) => s._id !== action.payload)
        }
        else { return state }
}

// function fetchCart() {
//     return function (dispatch) {
//         fetch(`http://bestlab.us:8080/shoppingCart`)
//             .then((res)=>res.json())
//             .then(data=>dispatch({type: 'FETCH_CART_SUCCESS', payload: data})
//             )
//     }
// }

function fetchCart() {
    return function (dispatch) {
        fetch('http://bestlab.us:8080/shoppingCarts')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dispatch({
                    type: 'FETCH_CART_SUCCESS',
                    payload: data
                })
            })
    }
}

export function deleteCart(id) {
    return function (dispatch) {
        fetch(`http://bestlab.us:8080/shoppingCarts/${id}`, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'delete',
        })
        .then(res=>res.json())
        .then(data=>dispatch({type: 'DELETE_CART', payload: id}))
    }
}

var centralState = combineReducers({ addCart,products, editedProduct, categories, orders, shoppingcart })
var store = createStore(centralState, applyMiddleware(thunk))

store.dispatch({ type: 'LOAD_PRODUCT' })
store.dispatch(fetchProduct()) 
store.dispatch(fetchOrder()) 
store.dispatch(fetchC())
store.dispatch(fetchCart())

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>, document.getElementById('app')

)