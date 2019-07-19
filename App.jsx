import React from 'react'
import { addProduct, deleteProduct, fixProduct, fetchProduct, getProduct, updateProduct, addTocart, addCart} from './main.js'
import './styles/product-styles.css'
import {connect} from 'react-redux'
import { Table } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Helmet from 'react-helmet';
import Popup from "reactjs-popup";
import Modal from 'react-modal';
import Pagination from "react-js-pagination";
import StarRatingComponent from 'react-star-rating-component';
import { Gradient } from 'react-gradient';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            data1: [
                { id: 1, repoKey: 12, author: 'asdaszxcxz', descip: 'asdasd' },
                { id: 2, repoKey: 124, author: 'dgfgdf', descip: 'zczxc' },
                { id: 3, repoKey: 23, author: 'aasd', descip: 'cvbcv' },
                { id: 4, repoKey: 22, author: 'qwqw', descip: 'qweqweqw' }
            ],
            modalIsOpen: false,
            activePage: 2,
            rating: 1
        }
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }

    // afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     this.subtitle.style.color = '#f00';
    // }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    // componentDidMount(){
    //     this.props.dispatch(fetchProduct())
    // }

    // componentWillReceiveProps(props){
    //     this.setState(props.editedProduct)
    // }

    // handleSave(){
    //     if(this.state._id===undefined || this.state._id===''){
    //         this.props.dispatch(addProduct(this.state))
    //     }
    //     else{
    //         this.props.dispatch(updateProduct(this.state))            
    //     }
    // }

    // handleDelete(_id) {
    //     if (confirm('Do you want to delete?')) {
    //         this.props.dispatch(deleteProduct(_id))
    //     }
    // }

    // handleView(_id){
    //     this.props.dispatch({type:'VIEW_PRODUCT',payload: _id})
    //     //View the only product without interfere with the fetched data
    // }
    // handleUpdate(_id) {
    //     this.props.dispatch(getProduct(_id))
    // }
    
    // handleChange(e) {
    //     let change = {}
    //     change[e.target.name] = e.target.value
    //     this.setState(change)
    // }

    // handleAddToCart(_id){
        
    //     this.props.dispatch(addCart(_id))
    // }
    
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
        const { rating } = this.state;
        return (
            <div>
                {/* <Helmet bodyAttributes={{style: 'background-color : #fff'}}/> */}
                <Col md="auto">
                    <h1 id='title'>Github Repo Ranking</h1>
                    <div style={{backgroundColor: "#D97E1C"}}>
                    
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
                    </Table >
                    {/* <Popup trigger={<button> Trigger</button>} position="right center">
                        <div>Popup content here !!</div>
                    </Popup> */}
                    <button onClick={this.openModal}>Feedback</button>
                        <Modal
                        isOpen={this.state.modalIsOpen}
                        // onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        >
                            {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
                            <StarRatingComponent
                            name="rate1" 
                            starCount={10}
                            value={rating}
                            onStarClick={this.onStarClick.bind(this)}
                            />
                            
                            <div>What was wrong?</div>
                            <form>
                                <input />
                            </form>
                            <button onClick={this.closeModal}>close</button>
                        </Modal>
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={450}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
                        </div>
                </Col>
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