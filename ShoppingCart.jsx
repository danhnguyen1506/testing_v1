import React from 'react'
import {fetchCart, deleteCart} from './main.js'
import './styles/product-styles.css'

export default class ShoppingCart extends React.Component{

    handleDeleteCart(_id){
        if(confirm('Do you want to delete this cart?')){
            this.props.dispatch(deleteCart(_id))
        }
    }

    render(){
        return(
            <div>
                <div>
                    <h3>Shopping Cart</h3>
                </div>
                {this.props.shoppingcart.map((s)=>
                <div className="list">
                <table style={{width:"100%", textAlign:"left"}}>
                    <thead>
                    <tr>
                        <td>Product</td>
                        <td>Price</td>
                    </tr>
                    </thead>
                    <tbody>
                   
                    <tr>
                        <td>{s.name}</td>
                        <td>{s.price}</td>
                    </tr>
                    </tbody>    
                </table>
                <div>
                    <button type='button' className="button" value='Delete' onClick={() => this.handleDeleteCart(s._id)}>Delete</button>
                </div>
                </div>
                )}
            </div>
    
        )
    }
}