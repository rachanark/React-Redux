import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewCategory} from '../action';
import UploadImage from '../components/UploadImage/UploadImage';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class AddProductColor extends Component {
    constructor(props) {
    super(props);
      this.state ={ shelf:[{label:10,value:10,id:1},{label:12,value:12,id:2},{label:45,value:45,id:3},
      {label:67,value:67,id:4}],
                    color:[{label:'blue',value:'blue',id:1},{label:'green',value:'green',id:2},
                    {label:'red',value:'red',id:3},{label:'pink',value:'pink',id:4}],
                    shelfValue:null,
                    colorValue:null,
                    qty:'',
                    sizes:'',
                    details:[],
                    images:[],
                    init:{
                      shelf:[{label:10,value:10,id:1},{label:12,value:12,id:2},{label:45,value:45,id:3},
                      {label:67,value:67,id:4}],
                      color:[{label:'blue',value:'blue',id:1},{label:'green',value:'green',id:2},
                      {label:'red',value:'red',id:3},{label:'pink',value:'pink',id:4}],
                      shelfValue:null,
                      colorValue:null,
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
    console.log(this.state);
    var x={
      color:this.state.colorValue,
      details:this.state.details,
      productImages:this.state.images
    }
     console.log(x);
    this.state=this.state.init;
    this.state.init=this.state;
    this.setState(this.state);
    this.props.fun(x);
   // console.log(x);
  }
  handleColorChange= (selectedOption) => {
    console.log(selectedOption);
    this.state.colorValue= selectedOption;
    this.setState(this.state);
  }
   handleShelfChange = (selectedOption) => {
    console.log(selectedOption);
    this.state.shelfValue=selectedOption;
    this.setState(this.state);
   }
  /* handleShelfChange(event) {
     console.log(event.target);
    this.state.shelfValue= event.target.value;
    this.setState(this.state);
  }*/
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
      this.state.colorValue =null;
      this.state.shelfValue=null;
      this.state.qty='';
      this.state.sizes='';
       this.setState(this.state);
   // event.preventDefault();
  }
  showDetails(){
    //console.log(this.state.details)
    let c=-1;
   return this.state.details.map((detail, index)=>{
         console.log("c");
         console.log(index);
        return (<div key={index}>
          <div style={{display:'inline'}}>Shelf:{detail.shelf.id}, Size:{detail.size}, Quantity:{detail.quantity}
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
 /* setOptions(val){
    if(val=="shelf")
     return this.state.shelf.map((value)=>{
        return <option key={value} value={value}>{value}</option>
      });
    if(val=="color")
        return this.state.color.map((value)=>{
        return <option key={value} value={value}>{value}</option>
      });
  }*/
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
     width:100,
     height:20
    };
    return (
      <div>
          <table><tbody>
          <tr>
          <td>ColorName</td>
          <td style={{width:100}}>
           <Select value={this.state.colorValue} clearable={false} onChange={this.handleColorChange} 
           options={this.state.color} />
          </td>
          </tr>
          <tr>
          <td>Shelf</td>
          <td><Select value={this.state.shelfValue} clearable={false} 
          onChange={this.handleShelfChange} options={this.state.shelf} /></td>
          <td>Quantity</td>
          <td><input type="text" style={FieldStyle} value={this.state.qty} onChange={this.handleQtyChange} /></td>
          <td>Size</td>
          <td><input type="text" style={FieldStyle} value={this.state.sizes} onChange={this.handleSizeChange} /></td>
          <td><button onClick={this.handleSubmit}>ADD</button></td>
          </tr></tbody>
          </table>
          <div>{this.showDetails()}</div>
          <UploadImage setImg={this.setImages} img={this.state.images} /><br/><br/>
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

/*<select value={this.state.shelfValue} style={FieldStyle} onChange={this.handleShelfChange}>
          {this.setOptions("shelf")}</select>*/