import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {OnLoad} from '../action';
import {GET_PRODUCT_LIST,GET_CATEGORY_TREE} from '../ApiConstants';
import axios from 'axios';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {Link} from "react-router-dom";

class ProductList extends Component {

    constructor(props) {
      super(props);
      this.state = {listProduct: null,categoryList:[],categoryValue:null};
        this.editProductDetails = this.editProductDetails.bind(this);
    }

 listCategory(category){
  if(category.subcategory!=null){
  for(var i=0;i<category.subcategory.length;i++){
    this.state.categoryList.push({
      label:category.subcategory[i].categoryName,
      value:category.subcategory[i].categoryId,
      id:category.subcategory[i].categoryId,
    });
    if(category.subcategory[i].subcategory!=null && category.subcategory[i].subcategory.length>=1){
      this.listCategory(category.subcategory[i])
      }
    }
  }
  this.setState(this.state);
 }

componentDidUpdate(prevProps,prevstates){
  if(this.props!=prevProps)
    this.getCategoryList();
  }
  componentWillMount(){
    this.getCategoryList();
  }

 getCategoryList(){
      if(this.props.Category!=null){
        this.state.categoryList=[{
      label:'All',
      value:'All',
      id:-1,
    }];
        this.setState(this.state);
        this.listCategory(this.props.Category);
        this.setState(this.state);
         }
  }
    getProductColor(product){
     return product.colors.map((color)=>{
       return <div style={{display:'inline-block'}}>{color.colorId}</div>
     });
    }
    editProductDetails(product) {
        console.log(this.props);
        this.props.history.push({
          pathname: '/admin/product/' + product.productId
        })
    }
    getProductCategory(product){
      return product.categoryIds.map((category)=>{
                       return <div>{category}</div>
                     });
    }

    showList(){
      if(this.state.listProduct!=null)
        return this.state.listProduct.map((product)=>{
                       return (   <tr>
                          <td>{product.productId}</td>
                          <td>{product.title}</td>
                          <td>{product.description}</td>
                          <td>{this.getProductCategory(product)}</td>
                          <td>{this.getProductColor(product)}</td>
                          <td>
                            <Link to={`/admin/editProduct/${product.productId}`}>Edit</Link>
                          </td>
                        </tr>
                     );
               
        });
        else
          return "";
    }
    handleCategoryChange= (selectedOption) => {
    var x= selectedOption.id;
    this.state.categoryValue=selectedOption;
    this.getProductByCategory(x);
  }

    getProductByCategory(x){
      if(x!=undefined)
      axios.get(GET_PRODUCT_LIST+x).then(res =>{
            this.state.listProduct=res.data;
            this.setState(this.state);
          // this.props.getProductList(res,this.props.Category,this.props.Track,this.props.MasterDataReducer);
         }).catch(function (error) {
        console.log(error);
      });
  }


      render() {
      if(this.props.Category==null){
      axios.get(GET_CATEGORY_TREE).then(res =>{
            var x= {   name:'main',
                        levelId:'1',
                        subcategory:res.data 
                    };
           this.props.OnLoad(x,['1'],this.props.MasterDataReducer);
         }).catch(function (error) {
        console.log(error);
         });
    }
       if(this.state.listProduct!=null){
        if(this.state.listProduct.error){
          return ( <div>
          <div style={{margin: '0 auto', width: '300px'}}>
                      <span style={{float:'left', margin: '0px 25px 0 50px'}}>Category:</span>
                      <Select style={{width:120, float:'left'}} value={this.state.categoryValue} clearable={false} onChange={this.handleCategoryChange} 
                          options={this.state.categoryList} />
                          </div>
                          <div style={{height: '10px'}}>
                 </div>
                          <div style={{width: '100%', marginTop: '50px'}}>
                          <center>
                     <h3 style={{marginTop: '50px'}}>Oops! No products available in this category</h3>
                     </center>
                   </div></div>);
        }
        if(this.state.listProduct.length>0)
        return (
          <div>
          <div style={{margin: '0 auto', width: '300px'}}>
             <span style={{float:'left', margin: '0px 25px 0 50px'}}>Category:</span>
             <Select style={{width:120, float:'left'}} value={this.state.categoryValue} clearable={false} onChange={this.handleCategoryChange} 
                 options={this.state.categoryList} />
                 </div>
          <div style={{height: '10px'}}>
                 </div>
            <div style={{width: '100%', marginTop: '50px'}}>
            <table style={{width:'85%', margin: '0 auto'}} className="table table-bordered">
            <tbody>
            <tr>
            <td>Product Id</td>
            <td>Title</td>
            <td>Description</td>
            <td>Category</td>
            <td>Color</td>
            <td>Action</td>
            </tr>
            {this.showList()}
            </tbody>
            </table>
            </div>
            </div>
        );
        else
          return "";
      }
      else{
          this.getProductByCategory(-1);
           return "";
      }
        
    }

}

function mapStateToProps(state) {
    return {
       Category: state.Category,
       MasterDataReducer:state.MasterDataReducer,
       Track:state.Track
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({OnLoad: OnLoad}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ProductList);
