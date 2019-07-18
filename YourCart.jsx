import React from 'react'

export default class YourCart extends React.Component{

    handleDeleteCart(id){
        if(confirm("Do you want to delete this cart?")){
            this.props.dispatch({type: 'DELETE_PRODUCT_SUCCESS', payload: id})
        }
    }

    render(){
        const {total} = this.props
        return(
            <div>
                {this.props.products.map(s=>
                <li>{s.name} - &#36;{s.price} | 
                <button onClick={()=>this.handleDeleteCart(s.id)}>DeleteCart</button>
                </li>
                )}
                <h2>Your Cart</h2>
                {/* <div>{node}</div> */}
                <p>Total: &#36;{total}</p>               
            </div>
        )
    }
}