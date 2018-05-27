import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddProductColor from '../components/AddProductColor'
import UploadImage from '../components/UploadImage/UploadImage'
import ImageCarousel from '../components/ImageCarousel/ImageCarousel'
import {bindActionCreators} from 'redux';
import {OnLoad} from '../action';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class ProductPage extends Component {
 // let Colordiv={display:'none'};
 listCategory(category){
  for(var i=0;i<category.subcategory;i++){
    this.state.categoryList.push({
      label:category.subcategory[i].name,
      value:category.subcategory[i].name,
      id:category.subcategory[i].levelId,
    });
    if(category.subcategory[i].subcategory.length>=1){
      this.listCategory(category.subcategory[i])
    }
  }
 // this.setState(this.state);
 }
 getCategoryList(){
    this.listCategory(this.props.Category)
    return this.state.categoryList;
 }
 constructor(props) {
    super(props);
    this.state = {value: '',colorstyle:{
    	display:'none'
    },val:[],ProductColor:[],categoryList:[]};
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleClick(event) {
   this.state.val.push(1);
   this.state.colorstyle={
      display:'block'
    }
    this.setState( this.state);
    event.preventDefault();
  }
  handleColor(x){
    this.state.ProductColor.push({color:this.state.colorValue,
                                  details:this.state.details,
                                  productImages:this.state.images});
    this.setState(this.state);
    this.state.colorstyle={
      display:'none'
    }
    console.log("Color ");
    console.log(this.state.ProductColor);
  }
  showColorDetails(x){
     return x.map((val)=>{
       return <div>Shelf:{val.shelf} Qty:{val.qty} Size:{val.size}</div>
     });
  }
  showColor(){
      return  this.state.ProductColor.map((color)=>{
        return (<div>
                    <div>
                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}} onClick={() =>this.removeColor(color)} />
                   </div>
                    <div>
                      Color:{color.color}<br/>
                     {this.showColorDetails(color.details)}
                    </div>
                   </div>);

      });
  }
  removeColor(color){
      var xdetail=JSON.stringify(color);
      for(var i=0;i<this.state.ProductColor.length;i++){
        var y=JSON.stringify(this.state.ProductColor[i]);
        if(y===xdetail){
              this.state.ProductColor.splice(i,1); 
              this.setState(this.state);
              break;
            }

       }
       console.log("removed color");
  }
  saveColor(x){
       this.state.ProductColor.push(x);
       this.setState(this.state);
  }
  componentWillMount(){
    this.listCategory(this.props.Category)
    this.setState(this.state);
  }

    render() {
    	var buttonStyle={
      width:25,
      height:25
    };
    var FieldStyle={
     width:80,
     height:20
    };
         
        return (
            <div>
	            <div>
                <table><tbody>
                <tr>
                <td>Title </td>
                <td><input type="text" value={this.state.value} onChange={this.handleChange} /></td>
                <td>Category</td>
                <td style={{width:100}}>
                 <Select value={this.state.categoryValue} clearable={false} onChange={this.handleCategoryChange} 
                 options={this.state.categoryList} />
                </td>
                </tr>
                <tr>
                <td>Description </td>
                <td><input type="text" value={this.state.value} onChange={this.handleChange} /></td>
                <td>Keywords</td>
                <td><input type="text" value={this.state.value} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                <td>Color</td>
                <td><input type="submit" style={buttonStyle} value="+" onClick={this.handleClick} /></td>
                </tr></tbody>
                </table>
	             </div>
              <div>{this.showColor()}</div>
              <div style={this.state.colorstyle}><AddProductColor fun={this.handleColor}/></div>
              <br/>
              <br/>
              <input type="submit" value="SAVE PRODUCT" onClick={this.handleClick} />
            </div>

        );
    }

}

function mapStateToProps(state) {
    return {
        Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({OnLoad:OnLoad}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ProductPage);
