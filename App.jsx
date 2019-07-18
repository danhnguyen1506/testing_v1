import React from 'react'
import { addProduct, deleteProduct, fixProduct, fetchProduct, getProduct, updateProduct, addTocart, addCart} from './main.js'
import './styles/product-styles.css'
import {connect} from 'react-redux'
import { Table } from 'react-bootstrap';

class App extends React.Component {

    constructor() {
        super()
        this.state ={
            data1: [
                { id: 1, repoKey: 12, author: 'asdaszxcxz', descip: 'asdasd' },
                { id: 2, repoKey: 124, author: 'dgfgdf', descip: 'zczxc' },
                { id: 3, repoKey: 23, author: 'aasd', descip: 'cvbcv' },
                { id: 4, repoKey: 22, author: 'qwqw', descip: 'qweqweqw' }
            ]
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchProduct())
    }

    componentWillReceiveProps(props){
        this.setState(props.editedProduct)
    }

    handleSave(){
        if(this.state._id===undefined || this.state._id===''){
            this.props.dispatch(addProduct(this.state))
        }
        else{
            this.props.dispatch(updateProduct(this.state))            
        }
    }

    handleDelete(_id) {
        if (confirm('Do you want to delete?')) {
            this.props.dispatch(deleteProduct(_id))
        }
    }

    handleView(_id){
        this.props.dispatch({type:'VIEW_PRODUCT',payload: _id})
        //View the only product without interfere with the fetched data
    }
    handleUpdate(_id) {
        this.props.dispatch(getProduct(_id))
    }
    
    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    handleAddToCart(_id){
        
        this.props.dispatch(addCart(_id))
    }
    
    renderTableData() {
        return this.state.data1.map((data, index) => {
           const { id, repoKey, author, descip } = data //destructuring
           return (
              <tr key={id}>
                 <td>{id}</td>
                 <td>{repoKey}</td>
                 <td>{author}</td>
                 <td>{descip}</td>
              </tr>
           )
        })
    }
    
    render() {
        return (
            <div>
                <h1 id='title'>Data Table</h1>
                <Table striped bordered hover id='data1'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Repo key</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Create at</th>
                            <th>Health score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

function mapStatetoProps(centralState){
    return {
        products: centralState.products,
        editedProduct: centralState.editedProduct,
        addCart: centralState.addCart,
    }
}

export default connect(mapStatetoProps)(App)