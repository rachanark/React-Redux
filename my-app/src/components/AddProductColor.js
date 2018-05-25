import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewCategory} from '../action';
import UploadImage from '../components/UploadImage/UploadImage'

class AddProductColor extends Component {
    constructor(props) {
    super(props);
      this.state ={ shelf:[10,12,45,67],
                    color:['blue','green','red','pink'],
                    shelfValue:10,
                    colorValue:'blue',
                    qty:'',
                    sizes:'',
                    details:[],
                    images:[],
                    init:{
                      shelf:[10,12,45,67],
                    color:['blue','green','red','pink'],
                    shelfValue:10,
                    colorValue:'blue',
                    qty:'',
                    sizes:'',
                    details:[],
                    images:[],
                    init:{}
                    }
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleShelfChange = this.handleShelfChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this,'');
    this.setImages = this.setImages.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeDetail=this.removeDetail.bind(this);
   // setImages
  }
  handleClick(event){
    var x={
      color:this.state.colorValue,
      details:this.state.details,
      productImages:this.state.images
    }
    this.state=this.state.init;
    this.state.init=this.state;
    this.setState(this.state);
    this.props.fun(x);
   // console.log(x);
  }
  handleColorChange(event) {
    this.state.colorValue= event.target.value;
    this.setState(this.state);
  }
   handleShelfChange(event) {
    this.state.shelfValue= event.target.value;
    this.setState(this.state);
  }
    handleQtyChange(event) {
    this.state.qty= event.target.value;
    this.setState(this.state);
  }
    handleSizeChange(event) {
    this.state.sizes= event.target.value;
    this.setState(this.state);
  }

  handleSubmit(event) {
   // console.log(this.props);
    var x={
        size:this.state.sizes,
        shelf:this.state.shelfValue,
        quantity:this.state.qty
    }
      this.state.details.push(x);
      this.state.colorValue ='blue';
      this.state.shelfValue=10;
      this.state.qty='';
      this.state.sizes='';
       this.setState(this.state);
   // event.preventDefault();
  }
  showDetails(){
    //console.log(this.state.details)
    let c=-1;
   return this.state.details.map((detail)=>{
         c++;
         console.log("c");
         console.log(c);
        return (<div>
          <div style={{display:'inline'}}>Shelf:{detail.shelf}, Size:{detail.size}, Quantity:{detail.quantity}
          </div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Azzfiyd3n-VTnU7pOn-85Q-UAeUU4d-fmK9l7_-dl4XIBS_E" 
                      style={{width:20,height:20}}  onClick={() =>this.removeDetail(detail)} />
          </div>);
    });
  }
  removeDetail(detail){
      var xdetail=JSON.stringify(detail);
      for(var i=0;i<this.state.details.length;i++){
        var y=JSON.stringify(this.state.details[i]);
        if(y===xdetail){
              this.state.details.splice(i,1); 
              this.setState(this.state);
              break;
            }

       }
  }
  setOptions(val){
    if(val=="shelf")
     return this.state.shelf.map((value)=>{
        return <option key={value} value={value}>{value}</option>
      });
    if(val=="color")
        return this.state.color.map((value)=>{
        return <option key={value} value={value}>{value}</option>
      });
  }
  setImages(x){
      this.state.images.push(x);
      alert(x+"added");
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
          ColorName:<select style={FieldStyle} value={this.state.colorValue} onChange={this.handleColorChange}>
          {this.setOptions("color")}</select><br/>
          Shelf:  <select value={this.state.shelfValue} style={FieldStyle} onChange={this.handleShelfChange}>
          {this.setOptions("shelf")}</select>
          Quantity: <input type="text" style={FieldStyle} value={this.state.qty} onChange={this.handleQtyChange} />
          Size: <input type="text" style={FieldStyle} value={this.state.sizes} onChange={this.handleSizeChange} />
          &nbsp;&nbsp;<button onClick={this.handleSubmit}>ADD</button>
          <div>{this.showDetails()}</div>
          <UploadImage setImg={this.setImages} /><br/><br/>
          <input type="submit" value="ADD COLOR" onClick={this.handleClick} />
      </div>
    );
  }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({addNewCategory: addNewCategory}, dispatch);
}

function mapStateToProps(state) {
    return {
       Category: state.Category,
        selectedCategory:state.selectedCategory,
        Track:state.Track
    };
}

export default connect(mapStateToProps, matchDispatchToProps)(AddProductColor);