import React from 'react'
import {add, deletee,fix,fetchC} from './main.js'
import './styles/product-styles.css'

export default class Categories extends React.Component {

    constructor() {
        super()

        this.state ={
            id: '', name: ''
        }
    }
    handleChange(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    addC() {
        this.props.dispatch(add({
            name: this.state.name, id: this.state.id
        }))
    }

    handleDeleteC(_id) {
        if (confirm('Do you want to delete?')) {
            this.props.dispatch({
                type: 'DELETE_PRODUCT',
                payload: _id
            })
            this.props.dispatch(deletee(_id))
        }
    }

    handleViewC(_id){
        this.props.dispatch({type:'VIEW',payload: _id})
        //View the only product without interfere with the fetched data
    }

    handleUpdateC(_id) {
    var id = prompt('product ID')
    var name = prompt('name of the product')
    this.props.dispatch(fix({_id ,name: name, id: id}))
    }

    render() {
        return (
            <div className="container">
                <div className='header'>
                <h1>Categories Form</h1>
                </div>
                <table style={{ width:"50%",borderWidth:"2px", borderColor:"#dddddd"}}>
                    <tbody>
                    <tr>
                    <td>ID</td>
                    <td><input type="text" name='id' value={this.state.id}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name='name' value={this.state.name}
                        onChange={this.handleChange.bind(this)} /></td>
                    </tr>
                

                    </tbody>
                </table>
                <div className="footer">
                <input type='button' className='button' value='Add Product' onClick={this.addC.bind(this)}/>
                
                </div>
            
                <div className='header'><h1>Categories List</h1></div>
                    {this.props.categories.map((i) =>
                    
                    <div className="list">
                            <br/>
                            <table style={{width:"100%", textAlign:"left"}}>
                            <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                
                            </tr>
                            <tr>
                                <td>{i.id}</td>
                                <td>{i.name}</td>
                                
                            </tr>
                            </tbody>
                            </table>
            
                        
                        <br/>
                            <div className="footer">
                            <button type='button' className="button" value='Delete' onClick={() => this.handleDeleteC(i._id)}>Delete</button>
                            <button type='button' className="button" value='Update' onClick={() => this.handleUpdateC(i._id)}>Update</button>
                            <button type='button' className="button" value='View' onClick={() => this.handleViewC(i._id)}>View</button>
                            </div>
                        </div>
                        
                    )}
                
            </div>
            
        )
    }
}

