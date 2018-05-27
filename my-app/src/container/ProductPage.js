import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddProductColor from '../components/AddProductColor'
import UploadImage from '../components/UploadImage/UploadImage'
import ImageCarousel from '../components/ImageCarousel/ImageCarousel'
import {bindActionCreators} from 'redux';
import {OnLoad,OnLoadMaster} from '../action';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';


class ProductPage extends Component {
 // let Colordiv={display:'none'};
 listCategory(category){
  if(category.subcategory!=null){
  for(var i=0;i<category.subcategory.length;i++){
    this.state.categoryList.push({
      label:category.subcategory[i].name,
      value:category.subcategory[i].name,
      id:category.subcategory[i].levelId,
    });
    if(category.subcategory[i].subcategory.length>=1){
      this.listCategory(category.subcategory[i])
      }
    }
  }
 // this.setState(this.state);
 }
 componentWillMount() {
    this.getCategoryList();
  }
 getCategoryList(){
  if(this.props.Category!=null){
    this.state.categoryList=[];
     this.setState(this.state);
    this.listCategory(this.props.Category);
     this.setState(this.state);

  }
     }
 constructor(props) {
    super(props);

    this.state = {titleValue: '',descriptionValue: '',keywordValue: '',categoryValue:null,colorstyle:{
    	display:'none'
    },finalColor:[],ProductColor:[],categoryList:[]};
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleSaveProduct=this.handleSaveProduct.bind(this);
  }
  getInitState(){
    return {titleValue: '',descriptionValue: '',keywordValue: '',categoryValue:null,colorstyle:{
      display:'none'
    },finalColor:[],ProductColor:[],categoryList:[]};
  }
handleCategoryChange= (selectedOption) => {
    console.log(selectedOption);
     console.log("selectedOption");
    this.state.categoryValue= selectedOption;
    this.setState(this.state);
    console.log(this.state.categoryValue);
  }

  handleSaveProduct(){
    var x={
        title:this.state.titleValue,
        description:this.state.descriptionValue,
        categoryIds:null,
        colors:this.state.finalColor
    }
    console.log("Save Product");
    axios.post('https://acinventory-204612.appspot.com/rest/createCat',x).then(res =>{
                    console.log("Saved Successfully")
                }); 
    this.setState(this.getInitState());
    console.log(x);
  }
  handleTitleChange(event) {
    this.state.titleValue=event.target.value
    this.setState(this.state);
  }
   handleDescriptionChange(event) {
      this.state.descriptionValue=event.target.value
    this.setState(this.state);
  }
   handleKeywordChange(event) {
    this.state.keywordValue=event.target.value
    this.setState(this.state);
  }
  handleClick(event) {
   this.state.colorstyle={
      display:'block'
    }
    this.setState( this.state);
    event.preventDefault();
  }
  handleColor(x){
    this.state.ProductColor.push({color:x.color,
                                  details:x.details,
                                  productImages:x.productImages});
    console.log(this.state.ProductColor);
    var dtt=[];
    for(var i=0;i<x.details.length;i++){
      dtt.push({
        size:{"sizeId":x.details[i].size},
        ShelfLocation:{"shelfId":x.details[i].shelf.id},
        quantity:x.details[i].quantity
      });
    }
    this.state.finalColor.push({colorId:x.color.id,
                                  details:dtt,
                                  productImages:x.productImages});
    this.setState(this.state);
    this.state.colorstyle={
      display:'none'
    }
    console.log("Color ");
    console.log(this.state.ProductColor);
  }
  showColorDetails(x){
     return x.map((val)=>{
       return <tr>
               <td>Shelf:{val.shelf.label}</td>
               <td>Quantity:{val.quantity}</td>
               <td>Size:{val.size}</td>
              </tr>
     });
  }
  showColor(){
      if(this.state.ProductColor.length>=1){
        return  this.state.ProductColor.map((color)=>{
        return (<tr>
                    <td>
                      {color.color.label}
                    </td>
                    <td>
                    <table><tbody>
                     {this.showColorDetails(color.details)}
                    </tbody></table>
                    </td>
                    <td>
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}} onClick={() =>this.removeColor(color)} />
                   </td>
                </tr>);

      });
      }
      else
        return "";
  }
  removeColor(color){
      var xdetail=JSON.stringify(color);
      for(var i=0;i<this.state.ProductColor.length;i++){
        var y=JSON.stringify(this.state.ProductColor[i]);
        if(y===xdetail){
              this.state.ProductColor.splice(i,1); 
              this.state.finalColor.splice(i,1); 
              this.setState(this.state);
              break;
            }

       }
       console.log(this.state.ProductColor);
       console.log(this.state.finalColor);
       console.log("removed color");
  }
  saveColor(x){
       this.state.ProductColor.push(x);
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
    if(this.props.MasterDataReducer==null){
      axios.get('https://acinventory-204612.appspot.com/rest/getMasterData').then(res =>{
            console.log("Response Master");
            console.log(res.data);
           this.props.OnLoadMaster(this.props.Category,this.props.Track,res.data);
         });
    }
         
        return (
            <div>
	            <div style={{margin:10}}>
                <table><tbody>
                <tr>
                <td>Title </td>
                <td><input className="form-control" type="text" value={this.state.titleValue} onChange={this.handleTitleChange} /></td>
                <td>Category</td>
                <td style={{width:100}}>
                 <Select value={this.state.categoryValue} clearable={false} onChange={this.handleCategoryChange} 
                 options={this.state.categoryList} />
                </td>
                </tr>
                <tr>
                <td>Description </td>
                <td><input className="form-control" type="text" value={this.state.descriptionValue} onChange={this.handleDescriptionChange} /></td>
                <td>Keywords</td>
                <td><input className="form-control" type="text" value={this.state.keywordValue} onChange={this.handleKeywordChange} /></td>
                </tr></tbody>
                </table>
                <table><tbody><tr bgcolor="blue">
                              <td style={{border: '1px solid white',color:'white'}}>Color</td>
                              <td style={{border: '1px solid white',color:'white'}}>Details</td>
                              </tr>{this.showColor()}</tbody></table><br/>
                <span style={{margin:20}}>Color</span>
                <input className="btn" type="submit" value="+" onClick={this.handleClick}/>
	             </div>
              <div style={this.state.colorstyle}><AddProductColor fun={this.handleColor}/></div>
              <input className="btn" type="submit" value="SAVE PRODUCT" onClick={this.handleSaveProduct} />
            </div>

        );
    }

}

function mapStateToProps(state) {
    return {
        Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track,
        MasterDataReducer:state.MasterDataReducer
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({OnLoad:OnLoad,OnLoadMaster:OnLoadMaster}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ProductPage);
