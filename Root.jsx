import React from 'react'
import App from './App.jsx'
import ChangeView from './ChangeView.jsx'
import Order from './Order.jsx'
import About from './About.jsx'
import Categories from './Categories.jsx'
import ShoppingCart from './ShoppingCart.jsx'
import {connect} from 'react-redux'
import YourCart from './YourCart.jsx'

class Root extends React.Component{
    render(){
        let currentPath = window.location.pathname
        return(
            <div>
                {/* <div className="tag">
                    <a href='/home'>Home</a> |
                    <a href='/about'>about</a> |
                    <a href="/changeView">ChangeView</a> |
                    <a href='/categories'>Categories</a> |
                    <a href='/order'>Order</a> |
                    <a href='/shoppingcart'>ShoppingCart</a> |
                    <a href='/YourCart'>YourCart</a>
                </div>    */}

                    {/* {currentPath.includes('/about')?
                    <About />:
                    currentPath.includes('/changeView')?
                    <ChangeView dispatch={this.props.dispatch} products={this.props.products} />:
                    currentPath.includes('/categories')?
                    <Categories dispatch={this.props.dispatch} categories={this.props.categories} />:
                    currentPath.includes('/order')?
                    <Order dispatch={this.props.dispatch} orders={this.props.orders} />:
                    currentPath.includes('/shoppingcart')?
                    <ShoppingCart dispatch={this.props.dispatch} shoppingcart={this.props.shoppingcart} />:
                    currentPath.includes('/YourCart')?
                    <YourCart dispatch={this.props.dispatch} products={this.props.products}/>: */}
                    <App dispatch={this.props.dispatch} products={this.props.products} />

                }
            </div>    
        )
    }
}
//


function mapStateToProps(centralState) {
    return {
        products: centralState.products,
        categories: centralState.categories,
        orders: centralState.orders,
        shoppingcart: centralState.shoppingcart,
    }
}
export default connect(mapStateToProps)(Root)
